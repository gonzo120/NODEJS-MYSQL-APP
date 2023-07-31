ALTER TABLE links CHANGE crated_at created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP();


DESCRIBE links;
