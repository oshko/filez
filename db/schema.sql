CREATE TABLE folders (
    id serial PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE files (
    id serial PRIMARY KEY,
    name text NOT NULL,
    size integer NOT NULL,
    forder_id integer REFERENCES folders(id)    
);