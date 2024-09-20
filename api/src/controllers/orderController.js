const { Order, Service, User, FuneralHome } = require('../db');
const { Op } = require('sequelize');

const getOrders = async (req, res) => {
  const { page = 1, limit = 12, status, service, user, search } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (status) {
      if (status.includes(',')) {
        where.status = { [Op.in]: status.split(',') };
      } else {
        where.status = status;
      }
    }
    if (service) {
      where.serviceId = service;
    }
    if (user) {
      where.userId = user;
    }
    if (search) {
      where[Op.or] = [
        { contactName: { [Op.iLike]: `%${search}%` } },
        { deceasedName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const totalOrders = await Order.count({ where });

    const orders = await Order.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      where,
      include: [
        {
          model: Service,
          attributes: ['name'],
        },
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: FuneralHome,
          attributes: ['name'],
        },
      ],
    });

    res.status(200).json({
      totalOrders,
      orders,
    });
  } catch (error) {
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
  console.log("req.body", req.body);
  let { status, contactName, phoneNumber, email, comission, relationship, deceasedName, serviceId, price, insurance, tracking, age, funeralHomeId, userId, createdBy, source } = req.body;

  // Verificar si userId, funeralHomeId y serviceId son cadenas vacías y asignarles null si es el caso
  userId = userId === '' ? null : userId;
  funeralHomeId = funeralHomeId === '' ? null : funeralHomeId;
  serviceId = serviceId === '' ? null : serviceId;
  age = age === '' ? null : age;

  try {
    let service = null;
    if (serviceId && serviceId !== 'not_sure') {
      service = await Service.findByPk(serviceId);
      if (!service) {
        return res.status(404).json({ message: 'No se encontró ningun servicio con ese ID' });
      }
    }

    let user = null;
    if (userId) {
      user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'No se encontró ningun usuario con ese ID' });
      }
    }

    let funeralHome = null;
    if (funeralHomeId) {
      funeralHome = await FuneralHome.findByPk(funeralHomeId);
      if (!funeralHome) {
        return res.status(404).json({ message: 'No se encontró ninguna funeraria con ese ID' });
      }
    }

    const statusDate = {
      date: new Date(),
      updatedBy: createdBy || 'system',
    };

    const trackingWithDate = (tracking || []).map((track) => ({
      date: new Date(),
      track,
    }));

    const newOrder = await Order.create({
      status,
      statusDate,
      contactName,
      phoneNumber,
      email,
      comission,
      relationship,
      deceasedName,
      serviceId,
      price,
      insurance,
      tracking: trackingWithDate,
      age,
      userId,
      funeralHomeId,
      source,
    });
    res.status(201).json(newOrder);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  let { status, contactName, phoneNumber, email, comission, relationship, deceasedName, serviceId, price, insurance, tracking, age, funeralHomeId, userId, source, updateBy } = req.body;
  console.log("req.body", req.body);

  userId = userId === '' ? null : userId;
  funeralHomeId = funeralHomeId === '' ? null : funeralHomeId;
  serviceId = serviceId === '' ? null : serviceId;
  age = age === '' ? null : age;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
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

    const updateEntry = {
      date: new Date(),
      updatedBy: updateBy || 'system',
    };

    const trackingWithDate = (tracking || []).map((track) => ({
      date: new Date(),
      track,
    }));

    await order.update({
      status,
      // statusDate,
      contactName,
      phoneNumber,
      email,
      comission,
      relationship,
      deceasedName,
      serviceId,
      price,
      insurance,
      tracking: trackingWithDate,
      age,
      userId,
      funeralHomeId,
      source,
      updates: [...order.updates, updateEntry],
    });
    res.status(200).json(order);
  } catch (error) {
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