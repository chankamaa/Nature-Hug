import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.route('/signup-request').post(userController.signUpRequest);
router.route('/signup-verify').post(userController.signUpVerify);
router.route('/login').post(userController.signIn);
router.route('/view-user/:id').get(userController.getUserDetails);
router.route('/update-user/:id').put(userController.updateUser);
router.route('/delete-user/:id').delete(userController.deleteUser);

export default router;
