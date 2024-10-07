const statusExcel = {
  'Nuevo': 'new',
  'new': 'new',
  'En seguimiento': 'inProgress',
  'inProgress': 'inProgress',
  'Pendiente': 'pending',
  'pending': 'pending',
  'Vendidos': 'sold',
  'sold': 'sold',
  'No vendidos': 'notSold',
  'notSold': 'notSold',
};

const mapStatus = (excelStatus) => {
  return statusExcel[excelStatus] || 'pending';
};

const parseTracking = (tracking) => {
  if (!tracking) return [];

  // Asegurarse de que tracking sea una cadena
  const trackingString = String(tracking);

  return trackingString.split('/').map(entry => {
    const comment = entry.trim();
    return {
      date: new Date(),
      track: comment || 'No comment'
    };
  });
};


module.exports = {
  mapStatus,
  parseTracking,
};