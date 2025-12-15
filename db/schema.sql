
DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE files (
    id serial PRIMARY KEY,
    name text NOT NULL,
    size integer NOT NULL,
    folder_id integer REFERENCES folders(id) ON DELETE CASCADE   
);