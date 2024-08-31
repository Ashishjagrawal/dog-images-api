
import request from 'supertest';
import mongoose from 'mongoose';
import path from 'path';
import app from '../app';
import { Dog } from '../models/Dog';
import { User } from '../models/User';

let token: string;
let dogId: string;
jest.setTimeout(300000);
beforeAll(async () => {
    process.env.PORT = '7000';
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dog-pics-test', {
        autoCreate: true,
    });

    const userId: string = Math.random().toString(36).substr(2, 9) + Date.now().toString(36)

    const registerRes = await request(app)
        .post('/auth/register')
        .send({ username: userId, password: 'password1' });

    if (registerRes.status !== 201) {
        throw new Error(`Failed to register user. Status: ${registerRes.status}`);
    }

    const loginRes = await request(app)
        .post('/auth/login')
        .send({ username: userId, password: 'password1' });

    if (loginRes.status !== 200) {
        throw new Error(`Failed to login. Status: ${loginRes.status}, Response: ${loginRes.body}`);
    }

    token = loginRes.body.token;

    if (!token) {
        throw new Error('Failed to retrieve the token after login.');
    }

    // console.log('Token:', token);
});

afterAll(async () => {
    await Dog.deleteMany({});
    await User.deleteMany({})
    await mongoose.connection.close();
});

describe('Dog API', () => {
    it('should upload a dog picture', async () => {
        const res = await request(app)
            .post('/api/dogs')
            .set('Authorization', `Bearer ${token}`)
            .attach('image', path.resolve(__dirname, './dog.jpeg'));


        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('fileName');
        dogId = res.body._id;
    });

    it('should fetch all dog pictures', async () => {
        const res = await request(app).get('/api/dogs');

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should fetch a dog picture by ID', async () => {

        const res = await request(app).get(`/api/dogs/${dogId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id', dogId);
    });

    it('should update a dog picture', async () => {

        const res = await request(app)
            .put(`/api/dogs/${dogId}`)
            .set('Authorization', `Bearer ${token}`)
            .attach('image', path.resolve(__dirname, './dog.jpeg'));

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id', dogId);
        expect(res.body).toHaveProperty('fileName');
    });

    it('should delete a dog picture', async () => {

        const res = await request(app)
            .delete(`/api/dogs/${dogId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(204);
    });

    it('should not upload a dog picture without authorization', async () => {
        const res = await request(app)
            .post('/api/dogs')
            .attach('image', path.resolve(__dirname, './dog.jpeg'));

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });

    it('should not fetch a dog picture with invalid ID', async () => {
        const res = await request(app).get('/api/dogs/66d0a425172e483ded2390ff');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
    });

    it('should not update a dog picture without authorization', async () => {
        const res = await request(app)
            .put(`/api/dogs/${dogId}`)
            .attach('image', path.resolve(__dirname, './dog.jpeg'));

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });

    it('should not delete a dog picture without authorization', async () => {
        const res = await request(app)
            .delete(`/api/dogs/${dogId}`);

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
});