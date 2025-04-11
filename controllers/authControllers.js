import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const profileImage = req.file ? req.file.filename : null;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, profileImage });
    await newUser.save();
    res.status(201).json({ msg: "User resgistered successfully" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res, status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: { email: user.email, profileImage: user.profileImage },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
