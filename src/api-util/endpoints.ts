const equipment = {
  create: '/equipment/create',
  fetchAll: '/equipment/getAll',
  fetchSingle: '/equipment/get',
  update: '/equipment/update',
  delete: '/equipment/delete',
  fetchAllByPage: '/equipment/getAllByPage',
};

const document = {
  create: '/documents',
  fetchAll: '/documents',
  delete: '/documents',
};

const advertisement = {
  create: '/advertisement/create',
  fetchAll: '/advertisement/all',
  delete: '/advertisement/remove',
  update: '/advertisement/update',
};

const approval = {
  fetchAll: '/equipment/approvals',
  update: '/equipment/approvals',
};

const users = {
  fetchAll: '/useraccount',
  update: '/useraccount',
};

const flagged = {
  fetchAll: '/flagged',
  reject: '/flagged',
  accept: '/flagged',
};
const auth = {
  login: '/auth/admin-login',
};

const appConstants = {
  get: '/appconstants',
  update: '/appconstants',
};

const endpoints = {
  equipment,
  document,
  advertisement,
  approval,
  users,
  flagged,
  auth,
  appConstants,
};

export default endpoints;
