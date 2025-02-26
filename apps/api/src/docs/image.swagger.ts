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

/**
 * @swagger
 * /image/getAllImages:
 *   get:
 *     summary: get all images in system
 *     tags: [Image]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           default: "1" 
 *       - name: perPage
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           default: "10" 
 *     responses:
 *       201:
 *         description: image list gets successfully
 *       400:
 *         description: Invalid request
 */