import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {  // Explicitly type req and res
  res.send('Hello, TypeScript with Express!');
});

if (process.env.VERCEL !== "true") {
  app.listen(2424, () => {
    console.log("Server is running on http://localhost:2424");
  });
}
module.exports = app;