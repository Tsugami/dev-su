import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI as string, {});

app.listen(PORT);
