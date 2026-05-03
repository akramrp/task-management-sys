const Project = require('../models/Project');

exports.getProjects = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      Project.find({ user: req.user.id }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments({ user: req.user.id })
    ]);

    res.json({ data: projects, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (e) { next(e); }
};
exports.createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const project = await Project.create({ title, description, user: req.user.id });
    res.status(201).json(project);
  } catch (e) { next(e); }
};
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (e) { next(e); }
};
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (e) { next(e); }
};
