-- Inserción de Vacunas comunes de Argentina
INSERT INTO Vaccines (id, name, description, recommendedAgeWeeks) VALUES (nextval('Vaccines_SEQ'), 'Sextuple', 'Protege contra Moquillo, Parvovirus, Hepatitis, Leptospirosis y Parainfluenza', 6);
INSERT INTO Vaccines (id, name, description, recommendedAgeWeeks) VALUES (nextval('Vaccines_SEQ'), 'Triple Felina', 'Protege contra Calicivirus, Rinotraqueitis y Panleucopenia', 8);
INSERT INTO Vaccines (id, name, description, recommendedAgeWeeks) VALUES (nextval('Vaccines_SEQ'), 'Antirrábica', 'Vacuna obligatoria anual contra la Rabia', 12);
INSERT INTO Vaccines (id, name, description, recommendedAgeWeeks) VALUES (nextval('Vaccines_SEQ'), 'KC (Tos de las perreras)', 'Protege contra Bordetella y Parainfluenza', 8);

-- Inserción de Razas
INSERT INTO Breeds (id, name, species) VALUES (nextval('Breeds_SEQ'), 'Labrador Retriever', 'DOG');
INSERT INTO Breeds (id, name, species) VALUES (nextval('Breeds_SEQ'), 'Golden Retriever', 'DOG');
INSERT INTO Breeds (id, name, species) VALUES (nextval('Breeds_SEQ'), 'Pastor Alemán', 'DOG');
INSERT INTO Breeds (id, name, species) VALUES (nextval('Breeds_SEQ'), 'Criollo Perro', 'DOG');
INSERT INTO Breeds (id, name, species) VALUES (nextval('Breeds_SEQ'), 'Persa', 'CAT');
INSERT INTO Breeds (id, name, species) VALUES (nextval('Breeds_SEQ'), 'Maine Coon', 'CAT');
INSERT INTO Breeds (id, name, species) VALUES (nextval('Breeds_SEQ'), 'Criollo Gato', 'CAT');

-- Usuario Administrador Inicial
-- Contraseña admin123 (hash simulado)
INSERT INTO Users (id, username, password, role) VALUES (nextval('Users_SEQ'), 'admin', '$2a$10$e0MYzXyjpJS7Pd0RVvHwHeFv3.H7fS.G3m4U6M2e8.6O.O.O.O.O.', 'ADMIN');
