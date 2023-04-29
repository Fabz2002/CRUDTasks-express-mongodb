import Task from "../models/Task";

export const renderTasks = async (req, res) => {
  const tasks = await Task.find().lean(); //find() para buscar los datos de la tabla , lean() to give the results as a javascript object instead of mongoose documents
  res.render("index", { tasks: tasks });
};
