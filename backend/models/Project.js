const mongoose = require('mongoose');
const Task = require('./Task');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, default: '', maxlength: 1000 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

projectSchema.pre('findOneAndDelete', async function cascadeDelete(next) {
  const filter = this.getFilter();
  if (filter && filter._id) {
    await Task.deleteMany({ project: filter._id });
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
