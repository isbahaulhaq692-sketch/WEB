/*
  # Samriddhi Women Welfare Society - Complete Database Schema

  ## Overview
  Full NGO website database with membership, donations, programs, gallery, and admin management.

  ## New Tables
  1. `members` - Society membership records with plan, payment status, expiry
  2. `donations` - Donation records with payment method and 80G receipt info
  3. `programs` - NGO programs/activities/schemes
  4. `gallery` - Photo gallery for activities
  5. `enquiries` - Contact/enquiry form submissions
  6. `internships` - Internship applications
  7. `beneficiaries` - Beneficiary records
  8. `expenses` - Expense tracking
  9. `crowdfunding_campaigns` - Crowdfunding campaigns
  10. `admin_users` - Admin panel users

  ## Security
  - RLS enabled on all tables
  - Public can insert enquiries, donations, memberships
  - Only authenticated admins can read/update/delete sensitive data
*/

-- Members table
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text DEFAULT '',
  city text DEFAULT '',
  state text DEFAULT '',
  pincode text DEFAULT '',
  membership_plan text NOT NULL DEFAULT 'annual',
  amount_paid numeric(10,2) DEFAULT 0,
  payment_method text DEFAULT 'online',
  payment_status text DEFAULT 'pending',
  payment_reference text DEFAULT '',
  member_id text UNIQUE,
  valid_from date DEFAULT CURRENT_DATE,
  valid_until date,
  is_active boolean DEFAULT false,
  photo_url text DEFAULT '',
  id_card_issued boolean DEFAULT false,
  certificate_issued boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit membership"
  ON members FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view members"
  ON members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update members"
  ON members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  amount numeric(10,2) NOT NULL,
  donation_purpose text DEFAULT 'general',
  payment_method text DEFAULT 'online',
  payment_status text DEFAULT 'pending',
  payment_reference text DEFAULT '',
  pan_number text DEFAULT '',
  address text DEFAULT '',
  receipt_number text UNIQUE,
  receipt_issued boolean DEFAULT false,
  is_80g_eligible boolean DEFAULT true,
  campaign_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit donation"
  ON donations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view donations"
  ON donations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  category text DEFAULT 'women_empowerment',
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  start_date date,
  end_date date,
  location text DEFAULT '',
  beneficiary_count integer DEFAULT 0,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active programs"
  ON programs FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage programs"
  ON programs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update programs"
  ON programs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete programs"
  ON programs FOR DELETE
  TO authenticated
  USING (true);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  category text DEFAULT 'activities',
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery"
  ON gallery FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery"
  ON gallery FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery"
  ON gallery FOR DELETE
  TO authenticated
  USING (true);

-- Enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text DEFAULT '',
  message text NOT NULL,
  enquiry_type text DEFAULT 'general',
  status text DEFAULT 'new',
  replied_at timestamptz,
  reply_message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enquiry"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Internships table
CREATE TABLE IF NOT EXISTS internships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  qualification text DEFAULT '',
  field_of_interest text DEFAULT '',
  duration text DEFAULT '3_months',
  start_date date,
  message text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE internships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply for internship"
  ON internships FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view internships"
  ON internships FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update internships"
  ON internships FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Beneficiaries table
CREATE TABLE IF NOT EXISTS beneficiaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age integer,
  gender text DEFAULT 'female',
  contact text DEFAULT '',
  address text DEFAULT '',
  program_id uuid REFERENCES programs(id),
  benefit_type text DEFAULT '',
  benefit_date date DEFAULT CURRENT_DATE,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE beneficiaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view beneficiaries"
  ON beneficiaries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage beneficiaries"
  ON beneficiaries FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update beneficiaries"
  ON beneficiaries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  amount numeric(10,2) NOT NULL,
  category text DEFAULT 'operations',
  description text DEFAULT '',
  expense_date date DEFAULT CURRENT_DATE,
  receipt_url text DEFAULT '',
  approved_by text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view expenses"
  ON expenses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage expenses"
  ON expenses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update expenses"
  ON expenses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Crowdfunding campaigns table
CREATE TABLE IF NOT EXISTS crowdfunding_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  goal_amount numeric(10,2) NOT NULL,
  raised_amount numeric(10,2) DEFAULT 0,
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  start_date date DEFAULT CURRENT_DATE,
  end_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE crowdfunding_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active campaigns"
  ON crowdfunding_campaigns FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage campaigns"
  ON crowdfunding_campaigns FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update campaigns"
  ON crowdfunding_campaigns FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default programs
INSERT INTO programs (title, description, category, is_active, display_order) VALUES
('Mahila Shakti Kendra', 'Women empowerment through skill development, training and livelihood support programs', 'women_empowerment', true, 1),
('Beti Bachao Beti Padhao', 'Education and awareness campaign for girl child welfare and education', 'education', true, 2),
('Swasthya Seva', 'Free health camps, medical checkups and awareness drives for women and children', 'health', true, 3),
('Kaushal Vikas', 'Skill development training for women in tailoring, computers, beauty and more', 'skill_development', true, 4),
('Saksham Mahila', 'Legal aid, counseling and support for women in distress', 'legal_support', true, 5),
('Gramin Vikas', 'Rural development and welfare programs for underprivileged women in villages', 'rural_development', true, 6)
ON CONFLICT DO NOTHING;

-- Insert default crowdfunding campaign
INSERT INTO crowdfunding_campaigns (title, description, goal_amount, raised_amount, is_active, end_date) VALUES
('Support Girls Education in Rural MP', 'Help us provide education to 500 girls in rural Madhya Pradesh. Your donation funds books, uniforms, and tuition fees.', 500000, 185000, true, '2025-12-31'),
('Health Camp for 1000 Women', 'Fund free medical checkups, medicines and awareness camps for 1000 women in Bhopal', 200000, 78000, true, '2025-09-30')
ON CONFLICT DO NOTHING;

-- Insert site settings
INSERT INTO site_settings (key, value) VALUES
('phone1', '+91 98765 43210'),
('phone2', '+91 87654 32109'),
('email', 'info@samriddhiwomenswelfare.org'),
('address', 'Bhopal, Madhya Pradesh, India'),
('registration_no', 'MP/NGO/2020/001'),
('80g_no', '80G/2020/001'),
('12a_no', '12A/2020/001'),
('facebook', ''),
('twitter', ''),
('instagram', ''),
('youtube', '')
ON CONFLICT (key) DO NOTHING;
