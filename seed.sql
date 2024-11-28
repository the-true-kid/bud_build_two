-- Drop tables if they exist to reset the database
DROP TABLE IF EXISTS UserPlant CASCADE;
DROP TABLE IF EXISTS Plant CASCADE;
DROP TABLE IF EXISTS User CASCADE;

-- Create the User table
CREATE TABLE User (
    id SERIAL PRIMARY KEY,               -- Auto-incrementing ID
    username VARCHAR(255) NOT NULL,      -- Username
    email VARCHAR(255) NOT NULL UNIQUE,  -- Unique email
    password VARCHAR(255) NOT NULL,      -- Password (hashed)
    created_at TIMESTAMP DEFAULT NOW(),  -- Automatically populated timestamp
    updated_at TIMESTAMP DEFAULT NOW()   -- Automatically populated timestamp
);

-- Seed data for User table
INSERT INTO User (username, email, password, created_at, updated_at)
VALUES 
    ('john_doe', 'john.doe@example.com', 'hashedpassword1', NOW(), NOW()),
    ('jane_smith', 'jane.smith@example.com', 'hashedpassword2', NOW(), NOW()),
    ('alex_lee', 'alex.lee@example.com', 'hashedpassword3', NOW(), NOW());

-- Create the Plant table
CREATE TABLE Plant (
    id SERIAL PRIMARY KEY,               -- Auto-incrementing ID
    name VARCHAR(255) NOT NULL,          -- Plant name
    water_intervals INT NOT NULL,        -- Watering intervals
    care_info TEXT,                      -- Optional care information
    created_at TIMESTAMP DEFAULT NOW(),  -- Automatically populated timestamp
    updated_at TIMESTAMP DEFAULT NOW()   -- Automatically populated timestamp
);

-- Seed data for Plant table
INSERT INTO Plant (name, water_intervals, care_info, created_at, updated_at)
VALUES 
    ('Fern', 7, 'Keep soil moist but not soggy. Avoid direct sunlight.', NOW(), NOW()),
    ('Cactus', 14, 'Requires full sunlight. Water sparingly.', NOW(), NOW()),
    ('Basil', 3, 'Keep in a sunny spot and water regularly.', NOW(), NOW());

-- Create the UserPlant table
CREATE TABLE UserPlant (
    id SERIAL PRIMARY KEY,            -- Auto-incrementing ID
    user_id INT NOT NULL,             -- Foreign key referencing User table
    plant_id INT NOT NULL,            -- Foreign key referencing Plant table
    watering_frequency INT NOT NULL DEFAULT 7, -- Watering frequency in days (default 7)
    created_at TIMESTAMP DEFAULT NOW(), -- Automatically populated timestamp
    updated_at TIMESTAMP DEFAULT NOW(), -- Automatically populated timestamp
    FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE,
    FOREIGN KEY (plant_id) REFERENCES Plant (id) ON DELETE CASCADE
);

-- Seed data for UserPlant table
INSERT INTO UserPlant (user_id, plant_id, watering_frequency, created_at, updated_at)
VALUES 
    (1, 1, 7, NOW(), NOW()),  -- User 1's Plant 1
    (2, 2, 14, NOW(), NOW()), -- User 2's Plant 2
    (1, 3, 3, NOW(), NOW());  -- User 1's Plant 3
