const { FuneralHome } = require('../db');

const getFuneralHomes = async (req, res) => {
  try {
    const funeralHomes = await FuneralHome.findAll();
    res.status(200).json(funeralHomes);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getFuneralHomeById = async (req, res) => {
  const { id } = req.params;
  try {
    const funeralHome = await FuneralHome.findByPk(id);
    if(!funeralHome) {
      return res.status(404).json({ message: 'No se encontró ninguna funeraria con ese ID' });
    }
    res.status(200).json(funeralHome);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createFuneralHome = async (req, res) => {
  const { name } = req.body;
  try {
    const newFuneralHome = await FuneralHome.create({
      name,
    });
    res.status(201).json(newFuneralHome);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateFuneralHome = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const funeralHome = await FuneralHome.findByPk(id);
    if(!funeralHome) {
      return res.status(404).json({ message: 'No se encontró ninguna funeraria con ese ID' });
    }
    await funeralHome.update({
      name,
    });
    res.status(200).json(funeralHome);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteFuneralHome = async (req, res) => {
  const { id } = req.params;
  try {
    const funeralHome = await FuneralHome.findByPk(id);
    if(!funeralHome) {
      return res.status(404).json({ message: 'No se encontró ninguna funeraria con ese ID' });
    }
    await funeralHome.destroy();
    res.status(200).json({ message: 'Funeraria eliminada' });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getFuneralHomes,
  getFuneralHomeById,
  createFuneralHome,
  updateFuneralHome,
  deleteFuneralHome,
};