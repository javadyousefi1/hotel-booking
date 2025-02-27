import * as fs from 'fs';
import * as path from 'path';

export function createFolderIfNotExists(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Folder created: ${folderPath}`);
    } else {
        // console.log(`Folder already exists: ${folderPath}`);
    }
}


export function checkUploadImageFolderStatus() {
    const uploadsPath = path.join(__dirname, 'uploads');
    const imagesPath = path.join(uploadsPath, 'images');
    // Create folders
    createFolderIfNotExists(uploadsPath);
    createFolderIfNotExists(imagesPath);
}
