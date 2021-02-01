import express from "express";

const app = express();

const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to port ${PORT}`);
});
export default app;
