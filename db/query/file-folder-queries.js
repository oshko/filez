import db from "../client.js";

export async function getFolders() {
    const sql = `
    SELECT * FROM folders
    `;

    const { rows: folders} = await db.query(sql);
    return folders;
};
export async function getFiles() {
    const sql = `
    SELECT files.*, folders.name AS folder_name
    FROM files
    JOIN folders ON files.folder_id = folders.id
    `;

    const { rows: files} = await db.query(sql);
    return files;
};

export async function createFolder(name) {
    const sql = `
    INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *
    `;
    const { rows: [folder] } = await db.query(sql, [name]);
    return folder;
}

export async function createFile({name, size, folderId}) {
    const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;

    const {rows: [file]} = await db.query(sql, [name, size, folderId]);
    return file;
}

export async function getFolderById(id) {
    const sql = `
    SELECT
        folders.id,
        folders.name,
        COALESCE(json_agg(files.*) FILTER (WHERE files.id IS NOT NULL), '[]') AS files
    FROM folders
    LEFT JOIN files ON folders.id = files.folder_id
    WHERE folders.id = $1
    GROUP BY folders.id
    `;

    const {rows: [folder]} = await db.query(sql, [id]);
    return folder;
}