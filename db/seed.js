import db from "#db/client";
import { createFile, createFolder } from "./query/file-folder-queries.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
const folderNames = ['documents', 'photos', 'videos'];

const documentsFiles = [
    { name: 'resume.pdf', size: 45000 },
    { name: 'cover_letter.docx', size: 32000 },
    { name: 'project_proposal.txt', size: 12000 },
    { name: 'meeting_notes.md', size: 8000 },
    { name: 'budget_2024.xlsx', size: 56000 }
];
const photosFiles = [
    { name: 'vacation_beach.jpg', size: 2500000 },
    { name: 'family_portrait.png', size: 1800000 },
    { name: 'sunset_view.jpg', size: 2200000 },
    { name: 'birthday_party.jpg', size: 1900000 },
    { name: 'graduation.jpg', size: 2100000 }
];

const videosFiles = [
    { name: 'tutorial.mp4', size: 15000000 },
    { name: 'presentation.mov', size: 12000000 },
    { name: 'demo_clip.mp4', size: 8500000 },
    { name: 'interview.avi', size: 18000000 },
    { name: 'webinar_recording.mp4', size: 22000000 }
];
// create Foloder
const documentFolder = await createFolder(folderNames[0]);
const photoFolder = await createFolder(folderNames[1]);
const videoFolder = await createFolder(folderNames[2]);

//Documents
for(const file of documentsFiles){
    await createFile({
        name: file.name, 
        size: file.size, 
        folderId: documentFolder.id
    });
}
//Photos
for(const file of photosFiles){
    await createFile({
        name: file.name, 
        size: file.size, 
        folderId: photoFolder.id
    });
}
//Vidoes
for(const file of videosFiles){
    await createFile({
        name: file.name, 
        size: file.size, 
        folderId: videoFolder.id
    });
}
}