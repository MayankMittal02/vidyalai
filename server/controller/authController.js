const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const asycnWrapper = require("../middleware/asyncWrapper");

const register = asycnWrapper(async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({
      data: token,
      success: true,
      message: "User registered in successfully",
    });
});

const login = asycnWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.send({ message: "Invalid Credentials", success: false });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.send({ message: "Invalid password", success: false });
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    data: token,
    success: true,
    message: "User logged in successfully",
  });
});

module.exports = { register, login };
