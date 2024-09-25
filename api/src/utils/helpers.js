const statusExcel = {
  'Nuevo': 'new',
  'En seguimiento': 'inProgress',
  'Pendiente': 'pending',
  'Vendidos': 'sold',
  'No vendidos': 'notSold'
};

const mapStatus = (excelStatus) => {
  return statusExcel[excelStatus] || 'pending';
};


module.exports = {
  mapStatus,
};