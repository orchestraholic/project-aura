import "dotenv/config";
import express from "express";
import cors from "cors";
import composeRouter from "./routes/compose.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/compose", composeRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Aura backend listening on http://localhost:${port}`);
});
