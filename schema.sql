-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    coins INTEGER DEFAULT 1000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Cards table
CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    team VARCHAR(255) NOT NULL,
    league VARCHAR(255) NOT NULL,
    overall INTEGER NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    image_url TEXT
);

-- Create UserCards table (for collected cards)
CREATE TABLE user_cards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    card_id INTEGER REFERENCES cards(id),
    quantity INTEGER DEFAULT 1,
    acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Pack Types table
CREATE TABLE pack_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    total_cards INTEGER NOT NULL,
    description TEXT
);

-- Insert pack types
INSERT INTO pack_types (name, price, total_cards, description) VALUES
('Basic Pack', 500, 5, 'Contains 5 cards with one guaranteed gold card'),
('Premium Pack', 1000, 8, 'Contains 8 cards with four guaranteed gold cards'),
('Ultimate Pack', 2000, 10, 'Contains 10 cards with one guaranteed 85+ rated card'); 