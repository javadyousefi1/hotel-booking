/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login for user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User login successfully
 *       400:
 *         description: Invalid request
 */
/**
 * @swagger
 * /auth/checkAuth:
 *   get:
 *     summary: get current user info
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User login successfully
 *       400:
 *         description: Invalid request
 */
/**
 * @swagger
 * /auth/log-out:
 *   post:
 *     summary: logout user
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User logout successfully
 *       400:
 *         description: Invalid request
 */
/**