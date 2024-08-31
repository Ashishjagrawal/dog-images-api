import { Router } from 'express';
import multer from 'multer';
import { uploadDog, getAllDogs, getDog, updateDogImage, deleteDogImage } from '../controllers/dogController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Dogs
 *   description: Dog management
 */

/**
 * @swagger
 * /api/dogs:
 *   post:
 *     summary: Upload a dog picture
 *     tags: [Dogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Dog picture uploaded successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/dogs', authMiddleware, upload.single('image'), uploadDog);

/**
 * @swagger
 * /api/dogs:
 *   get:
 *     summary: Get All Dog images
 *     tags: [Dogs]
 *     responses:
 *       200:
 *         description: Dogs retrieved successfully
 *       404:
 *         description: Dogs not found
 */
router.get('/dogs', getAllDogs);

/**
 * @swagger
 * /api/dogs/{id}:
 *   get:
 *     summary: Get dog picture by ID
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dog ID
 *     responses:
 *       200:
 *         description: Dog picture retrieved successfully
 *       404:
 *         description: Dog not found
 */
router.get('/dogs/:id', getDog);

/**
 * @swagger
 * /api/dogs/{id}:
 *   put:
 *     summary: Update a dog picture
 *     tags: [Dogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dog ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Dog picture updated successfully
 *       404:
 *         description: Dog not found
 *       401:
 *         description: Unauthorized
 */
router.put('/dogs/:id', authMiddleware, upload.single('image'), updateDogImage);

/**
 * @swagger
 * /api/dogs/{id}:
 *   delete:
 *     summary: Delete a dog picture
 *     tags: [Dogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dog ID
 *     responses:
 *       204:
 *         description: Dog picture deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dog not found
 */
router.delete('/dogs/:id', authMiddleware, deleteDogImage);

export default router;