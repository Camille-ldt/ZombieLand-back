BEGIN;

-- Insertion des données dans la table users
INSERT INTO users (firstname, lastname, phone_number, email, password, created_at) VALUES
('John', 'Doe', '1234567890', 'john.doe@example.com', 'password123', now()),
('Jane', 'Smith', '0987654321', 'jane.smith@example.com', 'password456', now()),
('Alice', 'Johnson', '1122334455', 'alice.johnson@example.com', 'password789', now());

-- Insertion des données dans la table role
INSERT INTO role (name, created_at) VALUES
('Admin', now()),
('User', now()),
('Guest', now());

-- Insertion des données dans la table category
INSERT INTO category (name, created_at) VALUES
('Thrill', now()),
('Family', now()),
('Adventure', now());

-- Insertion des données dans la table activity
INSERT INTO activity (title, description, category_id, created_at) VALUES
('Haunted House', 'A spooky haunted house experience.', 1, now()),
('Roller Coaster', 'A thrilling ride with twists and turns.', 1, now()),
('Ferris Wheel', 'A classic family-friendly attraction.', 2, now());

-- Insertion des données dans la table multimedia
INSERT INTO multimedia (name, url, created_at) VALUES
('Haunted House Image', 'https://example.com/haunted_house.jpg', now()),
('Roller Coaster Image', 'https://example.com/roller_coaster.jpg', now()),
('Ferris Wheel Image', 'https://example.com/ferris_wheel.jpg', now());

-- Insertion des données dans la table reservation
INSERT INTO reservation (number_reservation, date_start, date_end, number_tickets, user_id, created_at) VALUES
(1, '2024-10-01', '2024-10-02', 2, 1, now()),
(2, '2024-11-05', '2024-11-06', 4, 2, now()),
(3, '2024-12-15', '2024-12-16', 1, 3, now());

-- Insertion des données dans la table avis
INSERT INTO avis (note, comment, user_id, created_at) VALUES
(5, 'Amazing experience!', 1, now()),
(4, 'Great for the family!', 2, now()),
(3, 'Scary, but fun!', 1, now());

-- Insertion des données dans la table payment
INSERT INTO payment (amount, status, date_amount, reservation_id, stripe_payment_id) VALUES
(100.00, 'Completed', now(), 1, 'sp_abc123'),
(75.00, 'Completed', now(), 2, 'sp_def456'),
(50.00, 'Pending', now(), 3, 'sp_ghi789');

-- Insertion des données dans la table period
INSERT INTO period (name, date_start, date_end, price, created_at) VALUES
('Peak Season', '2024-07-01', '2024-08-31', 150.00, now()),
('Off Season', '2024-09-01', '2024-11-30', 100.00, now()),
('Holiday Season', '2024-12-01', '2024-12-31', 200.00, now());

-- Insertion des données dans la table de jointure user_role
INSERT INTO user_role (user_id, role_id) VALUES
(1, 1), -- John Doe as Admin
(2, 2), -- Jane Smith as User
(3, 3); -- Alice Johnson as Guest

-- Insertion des données dans la table de jointure activity_avis
INSERT INTO activity_avis (activity_id, avis_id) VALUES
(1, 1), -- Haunted House with review 1
(2, 2), -- Roller Coaster with review 2
(3, 3); -- Ferris Wheel with review 3

-- Insertion des données dans la table de jointure activity_multimedia
INSERT INTO activity_multimedia (activity_id, multimedia_id) VALUES
(1, 1), -- Haunted House with Haunted House Image
(2, 2), -- Roller Coaster with Roller Coaster Image
(3, 3); -- Ferris Wheel with Ferris Wheel Image

COMMIT;