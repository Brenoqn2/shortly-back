import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import authRouter from "./routes/auth.js";
import urlsRouter from "./routes/urls.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
