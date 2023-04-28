import { Router } from "express";
import Task from "../models/Task";

const router = Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find().lean(); //find() para buscar los datos de la tabla , lean() to give the results as a javascript object instead of mongoose documents
  res.render("index", { tasks: tasks });
});

router.get("/about", (req, res) => {
  res.render("about.hbs");
});
router.get("/edit/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).lean();
    res.render("edit", { task: task });
  } catch (err) {
    console.log(err.message);
  }
});
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndUpdate(id, req.body);
  res.redirect("/");
});
router.post("/tasks/add", async (req, res) => {
  try {
    const task = Task(req.body);
    await task.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

export default router;
