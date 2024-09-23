const statusExcel = {
  'Nuevo': 'new',
  'En seguimiento': 'inProgress',
  'Pendiente': 'pending',
  'Vendidos': 'sold',
  'No vendidos': 'notSold'
};

const mapStatus = (excelStatus) => {
  return statusExcel[excelStatus] || null;
};


module.exports = {
  mapStatus,
};