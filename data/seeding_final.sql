BEGIN;

-- Insertion des données dans la table users
INSERT INTO users (firstname, lastname, phone_number, email, password, created_at) VALUES
('John', 'Doe', '1234567890', 'john.doe@gmail.com', 'password123', now()),
('Jane', 'Smith', '0987654321', 'jane.smith@hotmail.fr', 'password456', now()),
('Alice', 'Johnson', '1122334455', 'alice.johnson@gmail.com', 'password789', now()),
('Michael', 'Brown', '3344556677', 'michael.brown@hotmail.fr', 'password321', now()),
('Emily', 'Davis', '4455667788', 'emily.davis@gmail.com', 'password654', now()),
('David', 'Wilson', '5566778899', 'david.wilson@hotmail.fr', 'password987', now()),
('Sarah', 'Miller', '6677889900', 'sarah.miller@gmail.com', 'password432', now()),
('Chris', 'Anderson', '7788990011', 'chris.anderson@hotmail.fr', 'password876', now()),
('Laura', 'Taylor', '8899001122', 'laura.taylor@gmail.com', 'password765', now()),
('Daniel', 'Thomas', '9900112233', 'daniel.thomas@hotmail.fr', 'password234', now()),
('Jessica', 'Moore', '0011223344', 'jessica.moore@gmail.com', 'password567', now()),
('Matthew', 'Jackson', '1122334455', 'matthew.jackson@hotmail.fr', 'password678', now()),
('Sophia', 'Martin', '2233445566', 'sophia.martin@gmail.com', 'password890', now()),
('Ethan', 'Garcia', '3344556677', 'ethan.garcia@hotmail.fr', 'password901', now()),
('Olivia', 'Martinez', '4455667788', 'olivia.martinez@gmail.com', 'password1234', now()),
('Jacob', 'Hernandez', '5566778899', 'jacob.hernandez@hotmail.fr', 'password345', now()),
('Ava', 'Lopez', '6677889900', 'ava.lopez@gmail.com', 'password5678', now()),
('Lucas', 'Gonzalez', '7788990011', 'lucas.gonzalez@hotmail.fr', 'password8901', now()),
('Mia', 'Perez', '8899001122', 'mia.perez@gmail.com', 'password456', now()),
('Mason', 'Clark', '9900112233', 'mason.clark@hotmail.fr', 'password7890', now()),
('Isabella', 'Lewis', '0011223344', 'isabella.lewis@gmail.com', 'password9876', now()),
('James', 'Young', '1122334455', 'james.young@hotmail.fr', 'password3456', now()),
('Amelia', 'Hall', '2233445566', 'amelia.hall@gmail.com', 'password6789', now()),
('Alexander', 'Allen', '3344556677', 'alexander.allen@hotmail.fr', 'password9012', now()),
('Charlotte', 'Wright', '4455667788', 'charlotte.wright@gmail.com', 'password12345', now()),
('Henry', 'King', '5566778899', 'henry.king@hotmail.fr', 'password54321', now()),
('Victoria', 'Scott', '6677889900', 'victoria.scott@gmail.com', 'password56789', now()),
('Oliver', 'Adams', '7788990011', 'oliver.adams@hotmail.fr', 'password87654', now()),
('Ella', 'Baker', '8899001122', 'ella.baker@gmail.com', 'password23456', now()),
('Liam', 'Gonzalez', '9900112233', 'liam.gonzalez@hotmail.fr', 'password98765', now()),
('Harper', 'Nelson', '0011223344', 'harper.nelson@gmail.com', 'password89012', now());

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
(5, 'Une expérience incroyable, parfaite pour se défouler entre potes après les cours !', 1, now()),
(4, 'Les zombies sont super réalistes, j’y suis allé juste après le déjeuner, c’était parfait.', 2, now()),
(3, 'Très immersif, mais je trouve que 18h, c’est un peu tôt pour fermer.', 3, now()),
(5, 'Enfin un parc pensé pour les jeunes, on s’est éclatés !', 4, now()),
(4, 'J’ai adoré l’ambiance en pleine journée, surtout les zones extérieures.', 5, now()),
(5, 'Les attractions sont variées, et ça change des sorties habituelles.', 6, now()),
(2, 'Un peu déçu qu’il n’y ait pas d’options pour les soirées, mais c’était bien quand même.', 7, now()),
(3, 'Les zombies étaient top, mais il faudrait plus de snacks pour la pause de midi.', 8, now()),
(4, 'L’ambiance est dingue, et les horaires conviennent bien aux étudiants.', 9, now()),
(5, 'Le manoir hanté est la meilleure attraction, on y a passé presque toute l’après-midi.', 10, now()),
(4, 'Les horaires sont parfaits pour profiter de la lumière du jour, super expérience.', 11, now()),
(5, 'Une journée inoubliable, on en parle encore avec mes amis.', 12, now()),
(3, 'Bien, mais ça manque d’options pour manger après les attractions.', 13, now()),
(4, 'Les décors sont hyper réalistes, parfait pour une journée off.', 14, now()),
(5, 'Le parcours est super bien pensé, surtout pour notre tranche d’âge.', 15, now()),
(2, 'Je trouve que ça manque un peu d’activités calmes pour se reposer.', 16, now()),
(5, 'J’ai adoré, surtout qu’on était entre jeunes, ça rend l’expérience encore plus cool.', 17, now()),
(4, 'Super ambiance, mais ce serait encore mieux si ça ouvrait un peu plus tôt.', 18, now()),
(3, 'L’entrée est un peu chère, mais ça reste une bonne activité pour une journée.', 19, now()),
(5, 'Les effets spéciaux sont juste bluffants, surtout le matin quand il y a moins de monde.', 20, now()),
(4, 'Le staff est super sympa, et les zombies jouent vraiment bien leur rôle.', 21, now()),
(3, 'Bonne expérience, mais les pauses sont difficiles à gérer avec les horaires serrés.', 22, now()),
(5, 'Idéal pour les jeunes adultes, on a tous adoré !', 23, now()),
(4, 'Les scénarios des attractions sont vraiment bien adaptés pour notre âge.', 24, now()),
(5, 'On a passé une journée de folie, merci pour ce parc original.', 25, now()),
(3, 'Les attractions sont bonnes, mais ce serait bien d’avoir plus de choix en après-midi.', 26, now()),
(4, 'Les horaires permettent de bien profiter, et le décor est au top.', 27, now()),
(5, 'Une journée entière à hurler et à rire, on y retourne bientôt !', 28, now()),
(4, 'Les zombies sont incroyables, dommage que ça ferme si tôt.', 29, now()),
(3, 'Bonne ambiance, mais plus d’animations en fin d’après-midi seraient appréciées.', 30, now());


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