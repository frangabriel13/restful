const { User } = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if(!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json(user);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;
  try {
    const user = await User.findByPk(id);
    if(!user) {
      res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    if(email) user.email = email;
    if(password) user.password = hashedPassword;
    if(role) user.role = role;
    await user.save();
    // await user.update({
    //   email,
    //   password: hashedPassword,
    //   role,
    // });
    res.status(200).json(user);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if(!user) {
      res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'superAdmin') {
      const superAdminCount = await User.count({ where: { role: 'superAdmin' } });
      if (superAdminCount <= 1) {
        return res.status(400).json({ message: 'Debe haber al menos un superAdmin.' });
      }
    }
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const generateRegistrationToken = async (req, res) => {
  const { name } = req.body;
  try {
    const token = jwt.sign({ name }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, name });
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
  generateRegistrationToken,
};