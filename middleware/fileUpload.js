import multer from 'multer';
import path from 'path';

const validate_images = ['image/png', 'image/jpeg'];

const fileUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('uploads/images'));
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            const fileName = Date.now() + ext;
            cb(null, fileName);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = validate_images.includes(file.mimetype);
        if (!isValid) {
            return cb(new Error('Format Image tidak sesuai'), false);
        }
        cb(null, true); 
    }
});

export default fileUpload;
