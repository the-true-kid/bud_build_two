-- Drop tables if they exist
DROP TABLE IF EXISTS user_plant CASCADE;
DROP TABLE IF EXISTS user_plants CASCADE;
DROP TABLE IF EXISTS plants CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed data for users table
INSERT INTO users (username, email, password, created_at, updated_at)
VALUES 
    ('john_doe', 'john.doe@example.com', 'hashedpassword1', NOW(), NOW()),
    ('jane_smith', 'jane.smith@example.com', 'hashedpassword2', NOW(), NOW());

-- Create the plants table
CREATE TABLE plants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    water_intervals INT NOT NULL,
    care_info TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed data for plants table
INSERT INTO plants (name, water_intervals, care_info, created_at, updated_at)
VALUES 
    ('Fern', 7, 'Keep soil moist but not soggy. Avoid direct sunlight.', NOW(), NOW()),
    ('Cactus', 14, 'Requires full sunlight. Water sparingly.', NOW(), NOW()),
    ('Basil', 3, 'Keep in a sunny spot and water regularly.', NOW(), NOW());

-- Create the user_plant table
CREATE TABLE user_plants (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plant_id INT NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed data for user_plant table
INSERT INTO user_plants (user_id, plant_id, created_at, updated_at)
VALUES 
    (1, 1, NOW(), NOW()),
    (1, 2, NOW(), NOW()),
    (2, 3, NOW(), NOW());
