import multer from "multer";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { Router } from "express";

const blogrouter = Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
blogrouter.post("/", upload.single("image"), createBlog);
blogrouter.get("/", getBlogs);
blogrouter.get("/:id", getBlogById);
blogrouter.put("/:id", upload.single("image"), updateBlog);
blogrouter.delete("/:id", deleteBlog);

export default blogrouter;
