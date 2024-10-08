const { Order, Service, User, FuneralHome } = require('../db');
const { Op, Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { mapStatus, parseTracking } = require('../utils/helpers');

const getOrders = async (req, res) => {
  const { page = 1, limit = 12, status, service, user, search, funeralHome, additionalStatus } = req.query;
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
    if (additionalStatus) {
      where.status = additionalStatus;
    }
    if (service) {
      where.serviceId = service;
    }
    if (user) {
      where.userId = user;
    }
    if (funeralHome) {
      where.funeralHomeId = funeralHome;
    }
    if (search) {
      where[Op.or] = [
        { contactName: { [Op.iLike]: `%${search}%` } },
        { deceasedName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        Sequelize.literal(`"tracking"::text ILIKE '%${search}%'`),
      ];
    }

    if (status === 'inProgress') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      where.updatedAt = { [Op.lt]: oneWeekAgo };
    }

    const totalOrders = await Order.count({ where });

    const orders = await Order.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      where,
      order: [['updatedAt', 'DESC']],
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
      createdBy: createdBy || 'system',
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

    const trackingWithCreatedBy = (tracking || []).map((track) => ({
      ...track,
      createdBy: track.createdBy || updateBy || 'system',
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
      tracking: trackingWithCreatedBy,
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

// const createOrdersFromExcel = async (req, res) => {
//   const filePath = req.file.path;

//   try {
//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const rows = xlsx.utils.sheet_to_json(sheet);

//     const orders = [];

//     for(const row of rows) {
//       let {
//         'Status': excelStatus,
//         'Dia de contacto': contactDate,
//         'Funeraria': funeralHomeName,
//         'Seguimiento': tracking,
//         'PRECIO': price,
//         'Contact Name': contactName,
//         'Phone Number': phoneNumber,
//         'Email': email,
//         'Relationship': relationship,
//         'Deceased Name': deceasedName,
//         'Service Type': serviceName,
//         'Asignado A:': userName,
//         'COMISION': comission,
//       } = row;

//       contactName = contactName || 'No';
//       phoneNumber = phoneNumber || '000-000-0000';
//       email = email || 'No';
//       relationship = relationship || 'No';
//       deceasedName = deceasedName || 'No';
//       price = price || 'No';

//       const status = mapStatus(excelStatus) || 'pending';

//       const statusDate = {
//         date: new Date(),
//         updatedBy: 'system', // Puedes cambiar 'system' por el usuario que creó la orden si está disponible
//       };

//       let userId = null;
//       if (userName && typeof userName === 'string') {
//         const user = await User.findOne({
//           where: Sequelize.where(
//             Sequelize.fn('LOWER', Sequelize.col('name')),
//             Sequelize.fn('LOWER', userName)
//           )
//         });
//         userId = user ? user.id : null;
//       }

//       let funeralHomeId = null;
//       if (funeralHomeName && typeof funeralHomeName === 'string') {
//         const funeralHome = await FuneralHome.findOne({
//           where: Sequelize.where(
//             Sequelize.fn('LOWER', Sequelize.col('name')),
//             Sequelize.fn('LOWER', funeralHomeName)
//           )
//         });
//         funeralHomeId = funeralHome ? funeralHome.id : null;
//       }

//       let serviceId = null;
//       if (serviceName && typeof serviceName === 'string') {
//         const services = await Service.findAll();
//         const service = services.find(service => 
//           service.name.es.toLowerCase() === serviceName.toLowerCase() ||
//           service.name.en.toLowerCase() === serviceName.toLowerCase()
//         );
//         serviceId = service ? service.id : null;
//       }

//       const newOrder = {
//         status,
//         statusDate,
//         contactName,
//         phoneNumber,
//         email,
//         comission,
//         relationship,
//         deceasedName,
//         serviceId,
//         price,
//         insurance: null,
//         tracking: parseTracking(tracking),
//         age: null,
//         userId,
//         funeralHomeId,
//         source: null,
//       }

//       orders.push(newOrder);
//     }
    
//     const createdOrders = await Order.bulkCreate(orders);
//     res.status(201).json(createdOrders);
//   } catch(error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   } finally {
//     fs.unlinkSync(filePath);
//   }
// };
const createOrdersFromExcel = async (req, res) => {
  const filePath = req.file.path;

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const orders = [];

    for (const row of rows) {
      let {
        'Status': excelStatus,
        'Contact Name': contactName,
        'Phone Number': phoneNumber,
        'Email': email,
        'Relationship': relationship,
        'Deceased Name': deceasedName,
        'Service Type': serviceName,
        'Price': price,
        'Comission': comission,
        'Tracking': tracking,
        'User': userName,
        'Funeral Home': funeralHomeName,
        'Status Date': statusDate,
        'Updated By': updatedBy,
        'Contact Date': contactDate,
        'Insurance': insurance,
        'Age': age,
        'Source': source,
      } = row;

      contactName = contactName || 'No';
      phoneNumber = phoneNumber || '000-000-0000';
      email = email || 'No';
      relationship = relationship || 'No';
      deceasedName = deceasedName || 'No';
      price = price || 'No';
      insurance = insurance || null;
      age = age || null;
      source = source || null;

      const status = mapStatus(excelStatus) || 'pending';

      const statusDateObj = {
        date: statusDate ? new Date(statusDate) : new Date(),
        updatedBy: updatedBy || 'system', // Puedes cambiar 'system' por el usuario que creó la orden si está disponible
      };

      let userId = null;
      if (userName && typeof userName === 'string') {
        const user = await User.findOne({
          where: Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('name')),
            Sequelize.fn('LOWER', userName)
          )
        });
        userId = user ? user.id : null;
      }

      let funeralHomeId = null;
      if (funeralHomeName && typeof funeralHomeName === 'string') {
        const funeralHome = await FuneralHome.findOne({
          where: Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('name')),
            Sequelize.fn('LOWER', funeralHomeName)
          )
        });
        funeralHomeId = funeralHome ? funeralHome.id : null;
      }

      let serviceId = null;
      if (serviceName && typeof serviceName === 'string') {
        const services = await Service.findAll();
        const service = services.find(service => 
          service.name.es.toLowerCase() === serviceName.toLowerCase() ||
          service.name.en.toLowerCase() === serviceName.toLowerCase()
        );
        serviceId = service ? service.id : null;
      }

      const newOrder = {
        status,
        statusDate: statusDateObj,
        contactName,
        phoneNumber,
        email,
        comission,
        relationship,
        deceasedName,
        serviceId,
        price,
        insurance,
        tracking: parseTracking(tracking),
        age,
        userId,
        funeralHomeId,
        source,
        createdAt: contactDate ? new Date(contactDate) : new Date(), // Usar contactDate como createdAt
      };

      orders.push(newOrder);
    }

    const createdOrders = await Order.bulkCreate(orders);
    res.status(201).json(createdOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    fs.unlinkSync(filePath);
  }
};

const exportOrdersToExcel = async (req, res) => {
  try {
    // Obtener las órdenes desde la base de datos
    const orders = await Order.findAll({
      include: [
        { model: User, as: 'user' },
        { model: FuneralHome, as: 'funeralHome' },
        { model: Service, as: 'service' }
      ]
    });

    // Convertir las órdenes a un formato adecuado para la exportación
    const data = orders.map(order => ({
      'Status': order.status,
      'Contact Name': order.contactName,
      'Phone Number': order.phoneNumber,
      'Email': order.email,
      'Relationship': order.relationship,
      'Deceased Name': order.deceasedName,
      'Service Type': order.service ? order.service.name.en : 'No',
      'Price': order.price,
      'Comission': order.comission,
      'Tracking': order.tracking ? order.tracking.map(t => t.track).join('/ ') : 'No',
      'User': order.user ? order.user.name : 'No',
      'Funeral Home': order.funeralHome ? order.funeralHome.name : 'No',
      'Status Date': order.statusDate.date,
      'Updated By': order.statusDate.updatedBy,
      'Contact Date': order.createdAt ? order.createdAt.toISOString().split('T')[0] : 'No',
      'Insurance': order.insurance,
      'Age': order.age,
      'Source': order.source,
    }));

    // Crear un nuevo libro de trabajo y una hoja de cálculo
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);

    // Agregar la hoja de cálculo al libro de trabajo
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Orders');

    // Definir la ruta del archivo
    const filePath = path.join(__dirname, 'orders.xlsx');

    // Escribir el archivo Excel en el sistema de archivos
    xlsx.writeFile(workbook, filePath);

    // Enviar el archivo al cliente como una respuesta de descarga
    res.download(filePath, 'orders.xlsx', (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al descargar el archivo' });
      }

      // Eliminar el archivo después de enviarlo
      fs.unlinkSync(filePath);
    });
  } catch (error) {
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
  createOrdersFromExcel,
  exportOrdersToExcel,
};