import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { createBooking, getBooking, deleteBooking, getOccupiedSeat, confirmPayment, listBookings } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/', authMiddleware, createBooking);
bookingRouter.get('/confirm-payment', confirmPayment);
bookingRouter.get('/', listBookings);
bookingRouter.get('/occupied', getOccupiedSeat);

bookingRouter.get('/my', authMiddleware, getBooking);
bookingRouter.delete('/:id', deleteBooking);


export default bookingRouter;