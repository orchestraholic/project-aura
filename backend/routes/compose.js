import { Router } from "express";
import { generateComposition } from "../services/music21Bridge.js";

const router = Router();

router.post("/", async (req, res) => {
  const { level, mood, period, seating } = req.body || {};

  if (!level || !mood?.start || !period || !seating) {
    return res.status(400).json({ error: "Missing level, mood, period, or seating." });
  }

  try {
    const result = await generateComposition({ level, mood, period, seating });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(501).json({ error: "Composition generation isn't wired up yet." });
  }
});

export default router;
