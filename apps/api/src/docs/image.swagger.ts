/**
* @swagger
* /image/saveImage:
*   post:
*     summary: Upload multiple image files
*     tags: [Image]
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               file:
*                 type: array
*                 items:
*                   type: string
*                   format: binary
*     responses:
*       201:
*         description: Images uploaded successfully
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