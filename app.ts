import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import userRoutes from "./rutas";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
