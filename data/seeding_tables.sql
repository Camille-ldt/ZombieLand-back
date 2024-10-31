BEGIN;

-- Insertion des données dans la table users
INSERT INTO users (firstname, lastname, phone_number, email, password, created_at) VALUES
('John', 'Doe', '1234567890', 'john.doe@example.com', 'password123', now()),
('Jane', 'Smith', '0987654321', 'jane.smith@example.com', 'password456', now()),
('Alice', 'Johnson', '1122334455', 'alice.johnson@example.com', 'password789', now());

-- Insertion des données dans la table role
INSERT INTO role (name, created_at) VALUES
('Admin', now()),
('Super admin', now());


-- Insertion des données dans la table category
INSERT INTO category (name, created_at) VALUES
('Aventures de Survie', now()),
('Frissons et Horreur', now()),
('Défense et Combat', now()),
('Immersion Totale', now()),
('Pause et Détente', now()),

-- Insertion des données dans la table activity
INSERT INTO activity (title, description, category_id, created_at) VALUES
('Survie en zone infectée', 'Parcourez un labyrinthe hanté, armez-vous de courage et d’un pistolet laser, et tentez d’échapper aux zombies à chaque tournant. Saurez-vous sortir indemne de la zone infectée ?', 1, now()),
('L’évasion de la ville morte', 'Prisonnier d''une ville en ruines, résolvez des énigmes et travaillez en équipe pour échapper aux zombies avant que le temps ne s’écoule. Allez-vous trouver la sortie ?', 1, now()),
('Train fantôme : L''apocalypse zombie', 'Montez à bord et plongez dans un voyage effrayant à travers une ville dévastée, où les zombies surgissent à chaque virage. Oserez-vous affronter la terreur de l’apocalypse ?', 2, now()),
('Course de survie', 'Défiez vos limites dans une course semée d’obstacles où des zombies assoiffés de sang tenteront de vous capturer. Courez pour survivre !', 2, now()),
('Tir au zombie', 'Armez-vous et testez votre précision ! Visez les zombies et montrez votre talent de tireur d’élite dans ce stand de tir terrifiant. Les zombies n’attendent que vous !', 2, now()),
('Hôpital abandonné', 'Explorez un ancien hôpital envahi par des zombies assoiffés de chair fraîche. Couloirs sombres et frissons garantis : oserez-vous entrer ?', 2, now()),
('Manège du chaos', 'Attachez-vous bien pour un grand huit apocalyptique à travers une ville en ruines, où zombies et chaos vous guettent à chaque virage !', 2, now()),
('Zone de quarantaine', 'Entrez dans une zone sous haute surveillance où survivants et soldats vous partagent leurs histoires de survie. Une immersion totale dans l’horreur de l’épidémie zombie.', 2, now()),
('Cimetière des revenants', 'Avec un casque VR, plongez dans un cimetière hanté et affrontez des zombies en réalité virtuelle. Parviendrez-vous à survivre dans cette aventure terrifiante ?', 2, now()),
('Le dernier refuge', 'Reprenez des forces dans un bunker de survivants et savourez un repas dans un décor de dernier bastion face à l’apocalypse. Bienvenue au dernier refuge humain.', 2, now()),
('Zombies vs. Survivants : Laser Game', 'Choisissez votre camp : survivants ou zombies ? Dans cette bataille épique en laser game, seuls les plus rapides et rusés sortiront victorieux !', 2, now()),
('Projection : Film post-apocalyptique zombie en 4D', 'Vivez l''horreur d’un film de zombies en 4D, avec sièges mouvants et effets spéciaux pour une immersion totale. Préparez-vous à trembler d''effroi !', 2, now()),
('L''attaque nocturne des zombies', 'Terminez la journée en beauté avec un spectacle spectaculaire où des hordes de zombies envahissent le parc. Effets spéciaux, pyrotechnie et frissons garantis !', 2, now()),
('Atelier de maquillage zombie', 'Transformez-vous en véritable zombie grâce à nos maquilleurs professionnels. Rejoignez les morts-vivants et immortalisez l’instant !', 2, now()),
('Séance photo avec les zombies', 'Capturez un souvenir inoubliable avec des zombies plus vrais que nature dans un décor apocalyptique. Oserez-vous sourire aux côtés des morts-vivants ?', 2, now());

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