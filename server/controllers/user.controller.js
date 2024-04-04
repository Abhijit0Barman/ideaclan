const UserModel = require("../models/user.model");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await UserModel.find({});
  return res.send(allDbUsers);
}

const handleGetUserById = async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  if (!user) return res.status(404).json({ err: "Does Not Exist" });
  return res.json(user);
};

const handleUpdateUserById = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  const user = await UserModel.findByIdAndUpdate(id, {
    name,
    email,
  });
  return res.json(user);
};

async function handleDeleteUserById(req, res) {
  const id = req.params.id;
  await UserModel.findByIdAndDelete(id);
  return res.json(user);
}

const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  const { name, email } = body;
  if (!body || !email || !name) {
    return res.status(400).json({ error: "All fields is required" });
  }

  const result = await UserModel.create({
    name,
    email: email,
  });
  // console.log(result);
  return res.status(201).json({ msg: "successfull", id: result._id });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
