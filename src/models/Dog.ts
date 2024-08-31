import { Schema, model, Document } from 'mongoose';

export interface IDog extends Document {
    fileName: string;
    data: Buffer
    contentType: string;
    createdAt: Date;
    updatedAt: Date;
}

const dogSchema = new Schema<IDog>({
    fileName: { type: String, required: true },
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true }
}, { timestamps: true });

export const Dog = model<IDog>('Dog', dogSchema);