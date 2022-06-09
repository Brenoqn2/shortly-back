import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import authRouter from "./routes/auth.js";
import urlsRouter from "./routes/urls.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
