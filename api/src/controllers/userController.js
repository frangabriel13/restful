const { User } = require('../db.js');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {};

const createUser = async (req, res) => {};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if(!user) {
      res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};