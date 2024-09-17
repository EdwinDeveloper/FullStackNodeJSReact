import app from './app';
import { connectDB } from './config/db';
import { Request, Response } from 'express';

const PORT = process.env.SERVER_PORT || 3000;

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send({
    code: 200,
    message: `Health services working normally`,
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
