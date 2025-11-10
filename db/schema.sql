-- Core schema (for reference / future migration tool)

-- Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'sitter')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sitter Profiles
CREATE TABLE IF NOT EXISTS sitter_profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  bio TEXT NOT NULL,
  base_rate NUMERIC(10,2) NOT NULL,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  rating NUMERIC(3,2)
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES users(id),
  sitter_id UUID NOT NULL REFERENCES sitter_profiles(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending','confirmed','cancelled','completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES bookings(id),
  reviewer_id UUID NOT NULL REFERENCES users(id),
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT
);


