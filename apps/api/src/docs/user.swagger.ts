/**
 * @swagger
 * /user/getAllUsers:
 *   get:
 *     summary: get all users in system
 *     tags: [User]
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
 *         description: User list gets successfully
 *       400:
 *         description: Invalid request
 */
/**
 * @swagger
 * /user/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
/**
 * @swagger
 * /user/updateUser:
 *   put:
 *     summary: update user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
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
 * /user/updateUserProfile:
 *   patch:
 *     summary: update user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageId:
 *                 type: number
 *     responses:
 *       201:
 *         description: User profile changed successfully
 *       400:
 *         description: Invalid request
 */