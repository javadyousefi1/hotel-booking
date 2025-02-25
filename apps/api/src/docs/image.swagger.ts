/**
 * @swagger
 * /image/saveImage:
 *   post:
 *     summary: Upload an image file
 *     tags: [Image]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
