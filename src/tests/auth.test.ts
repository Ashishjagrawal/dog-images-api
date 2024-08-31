import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { User } from '../models/User';


let userName: string;
beforeAll(async () => {
    process.env.PORT = '7000';
    await mongoose.connect(process.env.MONGO_URI_TESTS || 'mongodb://localhost:27017/dog-pics-test', {
        autoCreate: true
    });
});


afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

beforeEach(async () => {
    userName = Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
});


describe('Auth API', () => {

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                username: userName,
                password: 'testpassword',
            });
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty('username', userName);

    });

    it('should login a user and return a token', async () => {

        await request(app)
            .post('/auth/register')
            .send({
                username: userName,
                password: 'password1',
            });

        const res = await request(app)
            .post('/auth/login')
            .send({
                username: userName,
                password: 'password1',
            });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not register a user with missing username', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                password: 'password1',
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    it('should not register a user with missing password', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                username: 'testuser2',
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    it('should not login a user with wrong password', async () => {
        await request(app)
            .post('/auth/register')
            .send({
                username: 'loginuser2',
                password: 'password1',
            });

        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'loginuser2',
                password: 'wrongpassword',
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    it('should not login a user with non-existing username', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'nonexistinguser',
                password: 'password1',
            });

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
    });

    it('should not register a user with an existing username', async () => {
        await request(app)
            .post('/auth/register')
            .send({
                username: 'duplicateuser',
                password: 'password1',
            });

        const res = await request(app)
            .post('/auth/register')
            .send({
                username: 'duplicateuser',
                password: 'password1',
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});