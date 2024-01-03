const express = require("express");
const router = express.Router();
const {
  createCycle,
  getCycles,
  getCycle,
  deleteCycle,
  updateCycle,
} = require("../controllers/cycleController");

const requireAuth = require('../middleware/requireAuth');

// require auth for all routes
router.use(requireAuth);

// GET all cycles
router.get("/", getCycles);

// POST a new cycle
router.post("/", createCycle);

// GET a single cycle
router.get("/:id", getCycle);

// DELETE a cycle
router.delete("/:id", deleteCycle);

// UPDATE a cycle
router.patch("/:id", updateCycle);

module.exports = router;

// GET /cycles  - gets all cycle documents
// POST /cycles - Creates a new cycle document
// GET /cycles/:id - Gets a single cycle document
// DELETE /cycles/:id - deletes a single cycle
// PATCH/PUT /cycles/:id - updates a single cycle
