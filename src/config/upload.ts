import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Endereço da pasta de upload'
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        // Esse método define como o nome do arquivo será composto
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;
            callback(null, filename);
        },
    }),
};
