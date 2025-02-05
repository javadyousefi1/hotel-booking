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
/**
 * @swagger
 * /auth/changeUserRole:
 *   post:
 *     summary: change the user current role
 *     tags: [Auth]
 *     requestBody:
 *       description: Object containing role updates
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: admin
 *             example:
 *               role: ["admin", "user"]
 *     responses:
 *       201:
 *         description: User role successfully updated
 *       400:
 *         description: Invalid request
 */