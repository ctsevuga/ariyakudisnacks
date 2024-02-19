import express from 'express';
import {
  authUser,
  registerUser,
  forgot,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  profileAddress,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers).put(forgot);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
  router.put('/address/:id', profileAddress);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
