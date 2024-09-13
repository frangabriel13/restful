const { Order, Service, User, FuneralHome } = require('../db');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if(!order) {
      return res.status(404).json({ message: 'No se encontró ninguna orden con ese ID' });
    }
    res.status(200).json(order);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createOrder = async (req, res) => {
  const { contactDate, contactName, phoneNumber, email, comission, relationship, deceasedName, status, statusDate, serviceId, price, insurance, tracking, age, funeralHomeId, userId } = req.body;
  try {
    const service = await Service.findByPk(serviceId);
    if(!service) {
      return res.status(404).json({ message: 'No se encontró ningun servicio con ese ID' });
    }

    const user = await User.findByPk(userId);
    if(!user) {
      return res.status(404).json({ message: 'No se encontró ningun usuario con ese ID' });
    }

    const funeralHome = await FuneralHome.findByPk(funeralHomeId);
    if(!funeralHome) {
      return res.status(404).json({ message: 'No se encontró ninguna funeraria con ese ID' });
    }

    const newOrder = await Order.create({
      contactDate,
      contactName,
      phoneNumber,
      email,
      comission,
      relationship,
      deceasedName,
      status,
      statusDate,
      serviceId,
      price,
      insurance,
      tracking,
      age,
      userId,
      funeralHomeId,
    });
    res.status(201).json(newOrder);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { contactDate, contactName, phoneNumber, email, comission, relationship, deceasedName, status, statusDate, serviceId, userId, funeralHomeId } = req.body;
  try {
    const order = await Order.findByPk(id);
    if(!order) {
      return res.status(404).json({ message: 'No se encontró ninguna orden con ese ID' });
    }

    if (serviceId) {
      const service = await Service.findByPk(serviceId);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      order.serviceId = serviceId;
    }

    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      order.userId = userId;
    }

    if (funeralHomeId) {
      const funeralHome = await FuneralHome.findByPk(funeralHomeId);
      if (!funeralHome) {
        return res.status(404).json({ error: 'Funeral Home not found' });
      }
      order.funeralHomeId = funeralHomeId;
    }

    await order.update({
      contactDate,
      contactName,
      phoneNumber,
      email,
      comission,
      relationship,
      deceasedName,
      status,
      statusDate,
      serviceId,
      userId,
      funeralHomeId,
    });
    res.status(200).json(order);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if(!order) {
      return res.status(404).json({ message: 'No se encontró ninguna orden con ese ID' });
    }
    await order.destroy();
    res.status(200).json({ message: 'Orden eliminada correctamente' });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};