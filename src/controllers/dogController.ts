import { NextFunction, Request, Response } from 'express';
import { createDog, getDogs, getDogById, updateDog, deleteDog } from '../services/dogService';
import { compressImage } from '../utils/imageUtils';
import { IDog } from '../models/Dog';

export const uploadDog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file: IDog = await compressImage(req);

        const dog = await createDog(file);
        res.status(201).json(dog);
    } catch (err) {
        //Use middleware to handle errors
        next(err)
    }
};

export const getAllDogs = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const dogs = await getDogs();
        return res.status(200).json(dogs);
    } catch (err) {
        //Use middleware to handle errors
        return next(err)
    }
};

export const getDog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dog = await getDogById(req.params.id);
        if (!dog) return next({ status: 404, message: 'Dog not found' })

        return res.status(200).json(dog);
    } catch (err) {
        //Use middleware to handle errors
        return next(err)
    }
};

export const updateDogImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = await compressImage(req);
        const dog = await updateDog(req.params.id, file);
        if (!dog) return next({ status: 404, message: 'Dog not found' })
        return res.status(200).json(dog);


    } catch (err) {
        //Use middleware to handle errors
        return next(err)
    }
};

export const deleteDogImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dog = await deleteDog(req.params.id);
        if (!dog) return next({ status: 404, message: 'Dog not found' })

        return res.status(204).send({ message: 'Dog image deleted successfully.' });
    } catch (err) {
        //Use middleware to handle errors
        return next(err)
    }
};