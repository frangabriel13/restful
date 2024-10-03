// const { Service } = require('../db');

// const getServices = async (req, res) => {
//   try {
//     const services = await Service.findAll();
//     res.status(200).json(services);
//   } catch(error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

// const getServiceId = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const service = await Service.findByPk(id);
//     if(!service) {
//      return res.status(404).json({ message: 'No se encontró ningun servicio con ese ID' })
//     }
//     res.status(200).json(service);
//   } catch(error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' })
//   }
// }

// const createService = async (req, res) => {
//   const { name, price, features, disclaimers, isActive } = req.body;
//   try {
//     const newService = await Service.create({
//       name,
//       price,
//       features,
//       disclaimers,
//       isActive,
//     })
//     res.status(201).json(newService);
//   } catch(error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' })
//   }
// }

// const updateService = async (req, res) => {
//   const { id } = req.params;
//   const { name, price, features, disclaimers, isActive } = req.body;
//   console.log('req.body', req.body);
//   try {
//     const service = await Service.findByPk(id);
//     if(!service) {
//       return res.status(404).json({ message: 'No se encontró ningun servicio con ese ID' })
//     }
//     await service.update({
//       name,
//       price,
//       features,
//       disclaimers,
//       isActive,
//     })
//     res.status(200).json(service);
//   } catch(error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' })
//   }
// }

// const deleteService = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const service = await Service.findByPk(id);
//     if(!service) {
//       return res.status(404).json({ message: 'No se encontró ningun servicio con ese ID' })
//     }
//     await service.destroy();
//     res.status(200).json({ message: 'Servicio eliminado con éxito' });
//   } catch(error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' })
//   }
// }


// module.exports = {
//   getServices,
//   getServiceId,
//   createService,
//   updateService,
//   deleteService,
// }

const { Service } = require('../db');

// const getServices = async (req, res) => {
//   const { lang } = req.params;
//   try {
//     const services = await Service.findAll();
//     const localizedServices = services.map(service => ({
//       id: service.id,
//       name: service.name[lang],
//       description: service.description[lang],
//       features: service.features[lang],
//       disclaimers: service.disclaimers[lang],
//       isActive: service.isActive
//     }));
//     res.status(200).json(localizedServices);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getServiceId = async (req, res) => {
  const { lang, id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'No se encontró ningun servicio con ese ID' });
    }
    const localizedService = {
      id: service.id,
      name: service.name[lang],
      description: service.description[lang],
      features: service.features[lang],
      disclaimers: service.disclaimers[lang],
      isActive: service.isActive
    };
    res.status(200).json(localizedService);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createService = async (req, res) => {
  console.log('req.body', req.body);
  const { name, price, features, disclaimers, isActive } = req.body;
  try {
    const newService = await Service.create({
      name: {
        es: name.es,
        en: name.en,
      },
      features: {
        es: features.es,
        en: features.en,
      },
      disclaimers: {
        es: disclaimers.es,
        en: disclaimers.en,
      },
      isActive,
      price,
    });
    res.status(201).json(newService);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateService = async (req, res) => {
  console.log('req.body', req.body);
  const { id } = req.params;
  const { name, price, features, disclaimers, isActive } = req.body;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'No se encontró ningun servicio con ese ID' });
    }
    await service.update({
      name: {
        es: name.es,
        en: name.en,
      },
      price,
      features: {
        es: features.es,
        en: features.en,
      },
      disclaimers: {
        es: disclaimers.es,
        en: disclaimers.en,
      },
      isActive,
    });
    res.status(200).json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'No se encontró ningun servicio con ese ID' });
    }
    await service.destroy();
    res.status(200).json({ message: 'Servicio eliminado con éxito' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getServices,
  getServiceId,
  createService,
  updateService,
  deleteService
};