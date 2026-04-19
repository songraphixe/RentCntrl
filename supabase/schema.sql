-- FairRent Ghana — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Table: rent_records
-- Stores each submitted rent increase case.
CREATE TABLE IF NOT EXISTS rent_records (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  tenant_name    TEXT         NOT NULL,
  landlord_name  TEXT         NOT NULL,
  address        TEXT         NOT NULL,
  neighborhood   TEXT         NOT NULL DEFAULT 'Tema Community 23',
  room_type      TEXT         NOT NULL
                   CHECK (room_type IN ('Studio','1 Bedroom','2 Bedroom','3 Bedroom')),
  previous_rent  NUMERIC(10,2) NOT NULL CHECK (previous_rent > 0),
  proposed_rent  NUMERIC(10,2) NOT NULL CHECK (proposed_rent > 0),
  pct_increase   NUMERIC(6,2)  GENERATED ALWAYS AS (
                   ROUND(((proposed_rent - previous_rent) / previous_rent) * 100, 2)
                 ) STORED,
  effective_date DATE          NOT NULL
);

-- Table: letters_sent
-- Stores generated negotiation and complaint letters.
CREATE TABLE IF NOT EXISTS letters_sent (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  rent_record_id UUID         REFERENCES rent_records(id) ON DELETE CASCADE,
  letter_type    TEXT         NOT NULL
                   CHECK (letter_type IN ('negotiation','complaint')),
  letter_body    TEXT         NOT NULL,
  sent_at        TIMESTAMPTZ
);

-- Table: lease_agreements
-- Stores generated lease agreements.
CREATE TABLE IF NOT EXISTS lease_agreements (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  rent_record_id  UUID         REFERENCES rent_records(id) ON DELETE CASCADE,
  agreed_rent     NUMERIC(10,2) NOT NULL CHECK (agreed_rent > 0),
  lease_start     DATE          NOT NULL,
  duration_months INTEGER       NOT NULL CHECK (duration_months IN (12, 24)),
  renewal_terms   TEXT,
  agreement_body  TEXT          NOT NULL,
  signed_at       TIMESTAMPTZ
);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE rent_records     ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters_sent     ENABLE ROW LEVEL SECURITY;
ALTER TABLE lease_agreements ENABLE ROW LEVEL SECURITY;

-- MVP: allow anonymous insert + select (tighten with auth later)
CREATE POLICY "anon_insert_rent_records"
  ON rent_records FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_select_rent_records"
  ON rent_records FOR SELECT USING (true);

CREATE POLICY "anon_insert_letters"
  ON letters_sent FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_select_letters"
  ON letters_sent FOR SELECT USING (true);

CREATE POLICY "anon_insert_lease"
  ON lease_agreements FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_select_lease"
  ON lease_agreements FOR SELECT USING (true);

-- ============================================================
-- Helpful view: full case summary
-- ============================================================
CREATE OR REPLACE VIEW case_summary AS
SELECT
  r.id,
  r.created_at,
  r.tenant_name,
  r.landlord_name,
  r.address,
  r.neighborhood,
  r.room_type,
  r.previous_rent,
  r.proposed_rent,
  r.pct_increase,
  r.effective_date,
  COUNT(DISTINCT l.id) AS letters_generated,
  COUNT(DISTINCT la.id) AS leases_generated
FROM rent_records r
LEFT JOIN letters_sent    l  ON l.rent_record_id  = r.id
LEFT JOIN lease_agreements la ON la.rent_record_id = r.id
GROUP BY r.id;
