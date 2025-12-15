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
    SELECT * FROM files
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