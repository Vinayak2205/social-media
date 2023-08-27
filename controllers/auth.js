const User = require("../models/users");
const { hashPassword, comparePassword } = require("../helpers/auth");

const register = async (req, res) => {
  //   console.log("Register End Point =>", req.body);
  const { name, email, password } = req.body;
  //validations
  if (!name) return res.status(400).send("Name is Required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is required and should be at least 6 characters long");
  const exist = await User.findOne({ email });
  if (exist) res.status(400).send("Email Already exists");
  //hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword });
  try {
    await user.save();
    // console.log("Registered User => ", user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("Register Failed =>", err);
    return res.status(400).send("Error, Try again,");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if our DB has user with that email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("No User Found");
    //check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong Password");
    console.log(user);
    res.status(200).json({
      user: user,
      msg: "User Login successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try Again..");
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    // res.json({ ok: true });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = { register, login, currentUser };
