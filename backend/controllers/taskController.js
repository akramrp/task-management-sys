const Task = require('../models/Task');
const Project = require('../models/Project');

exports.getTasks = async (req, res, next) => {
  try {
    const { project, status, search } = req.query;
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skip = (page - 1) * limit;

    const filter = { user: req.user.id };
    if (project) filter.project = project;
    if (status) filter.status = status;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const [tasks, total] = await Promise.all([
      Task.find(filter).populate('project', 'title').sort({ createdAt: -1 }).skip(skip).limit(limit),
      Task.countDocuments(filter)
    ]);

    res.json({ data: tasks, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (e) { next(e); }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, project } = req.body;
    if (!title || !project) return res.status(400).json({ message: 'Title and project are required' });

    const projectExists = await Project.findOne({ _id: project, user: req.user.id });
    if (!projectExists) return res.status(404).json({ message: 'Project not found' });

    const task = await Task.create({ title, description, status, project, user: req.user.id });
    res.status(201).json(task);
  } catch (e) { next(e); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (e) { next(e); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (e) { next(e); }
};
