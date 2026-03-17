import Resume from "../models/Resume.js";
import User from "../models/User.js";

// CREATE
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      user: req.user.id
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: { savedResumes: resume._id },
      $inc: { "usage.resumesCreated": 1 }
    });

    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const getResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user.id }).sort({
    createdAt: -1
  });

  res.json(resumes);
};

// GET SINGLE
export const getResumeById = async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume)
    return res.status(404).json({ message: "Resume not found" });

  res.json(resume);
};

// UPDATE
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { savedResumes: req.params.id }
    });

    res.json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};