DROP TABLE IF EXISTS films;

CREATE TABLE films (
    id serial PRIMARY KEY,
    name varchar(200) NOT NULL,
    year int NOT NULL,
    genre varchar(20),
    rating int
);

INSERT INTO films (name, year, genre, rating)
VALUES
    ('Avatar', 2009, 'action', 7.9),
    ('Inception', 2010, 'action', 8.8),
    ('Shrek', 2001, 'comedy', 7.9),
    ('Aladdin', 1992, 'comedy', 8.0);

DROP TABLE IF EXISTS actors;

CREATE TABLE actors (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL
);

INSERT INTO actors (name)
VALUES
    ('Leonardo Dicaprio'),
    ('Kate Winslet');