const equipment = {
  create: '/equipment/create',
  fetchAll: '/equipment/getAll',
  fetchSingle: '/equipment/get',
  update: '/equipment/update',
  delete: '/equipment/delete',
};

const  document= {
  create: '/documents',
  fetchAll: '/documents',
  delete: '/documents',
};

const  advertisement= {
  create: '/advertisement/create',
  fetchAll: '/advertisement/all',
  delete: '/advertisement/remove',
  update: '/advertisement'
};

const approval= {
  fetchAll: '/equipment/approvals',
  update: '/equipment/approvals'
};

const endpoints = {
  equipment,
  document,
  advertisement,
  approval

};

export default endpoints;
