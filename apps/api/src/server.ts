import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { sittersRouter } from './routes/sitters';
import { bookingsRouter } from './routes/bookings';
import { authRouter } from './routes/auth';
import { reviewsRouter } from './routes/reviews';
import { messagesRouter } from './routes/messages';
import { paymentsRouter } from './routes/payments';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/sitters', sittersRouter);
app.use('/bookings', bookingsRouter);
app.use('/auth', authRouter);
app.use('/reviews', reviewsRouter);
app.use('/messages', messagesRouter);
app.use('/payments', paymentsRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`API listening on http://localhost:${port}`);
});


