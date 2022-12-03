-- insert association
INSERT INTO association (name, description) VALUES ('Association 1', 'Description 1');
INSERT INTO association (name, description) VALUES ('Association 2', 'Description 2');
INSERT INTO association (name, description) VALUES ('Association 3', 'Description 3');
INSERT INTO association (name, description) VALUES ('Association 4', 'Description 4');

-- insert category
INSERT INTO CATEGORY (name, description) VALUES ('Fiction', 'fiction books');
INSERT INTO CATEGORY (name, description) VALUES ('Non-Fiction', 'non-fiction books');
INSERT INTO CATEGORY (name, description) VALUES ('Biography', 'biography books');
INSERT INTO CATEGORY (name, description) VALUES ('History', 'history books');
--
-- Insert into table offer
INSERT INTO OFFER (title, description, is_archived, association_id) VALUES ('The Lord of the Rings', 'Tnon stages es sold.', false,1);
INSERT INTO OFFER (title, description, is_archived, association_id) VALUES ('The Hobbit', 'The  literature.', false, 1);
INSERT INTO OFFER (title, description, is_archived, association_id) VALUES ('The Chronicles of Narnia', 'The Chro S. Lewis. erature and 47 ra the stage, and film.', false, 1);
 --INSERT INTO JOIN TABLE
INSERT INTO OFFER_CATEGORIES (offer_id, categories_id) VALUES (1, 1);
INSERT INTO OFFER_CATEGORIES (offer_id, categories_id) VALUES (2, 1);
INSERT INTO OFFER_CATEGORIES (offer_id, categories_id) VALUES (3, 1);

