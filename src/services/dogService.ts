import { Dog, IDog } from '../models/Dog';

export const createDog = async (data: Partial<IDog>): Promise<IDog> => {
    const dog = new Dog(data);
    return await dog.save();
};

export const getDogs = async (): Promise<IDog[]> => {
    return await Dog.find().sort({ createdAt: -1 });
};

export const getDogById = async (id: string): Promise<IDog | null> => {
    return await Dog.findById(id);
};

export const updateDog = async (id: string, file:Partial<IDog>): Promise<IDog | null> => {
    // console.log("update file",file)
    return await Dog.findByIdAndUpdate(id, { ...file }, { new: true });
};

export const deleteDog = async (id: string): Promise<IDog | null> => {
    return await Dog.findByIdAndDelete(id);
};