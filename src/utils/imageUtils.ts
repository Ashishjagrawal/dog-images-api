import sharp from 'sharp';
import { Request } from 'express';
import { IDog } from '../models/Dog';

export const compressImage = async (req: Request) => {
    if (!req.file) {
        throw new Error('Dog image not provided');
    }

    try {
        const compressedImageBuffer = await sharp(req.file.buffer)
            .resize(800)
            .jpeg({ quality: 80 })
            .toBuffer();

        return {
            fileName: req.file.originalname,
            data: compressedImageBuffer,
            contentType: req.file.mimetype
        } as IDog;
        
    } catch (error) {
        console.log("Error in image processing", error)
        throw new Error('Error processing Dog image');
    }
};