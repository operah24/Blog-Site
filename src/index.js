import "dotenv/config";
import express from "express";
import { connectDatabase } from "./models";
import cors from "cors";
import routes from "./routes";
import morgan from "morgan";

const app = express();
connectDatabase();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.get("/", (req, res) => {
  res.send("OK");
});
app.use("/api/v1", routes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to port ${PORT}`);
});
export default app;
