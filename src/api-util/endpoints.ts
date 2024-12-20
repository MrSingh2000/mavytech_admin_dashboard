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
  downloadxls: '/useraccount/xls',
  search: '/useraccount/search',
};

const flagged = {
  fetchAll: '/flagged',
  reject: '/flagged',
  accept: '/flagged',
};
const auth = {
  login: '/auth/admin-login',
  passwordReset: '/auth/reset-password',
};

const appConstants = {
  get: '/appconstants',
  update: '/appconstants',
};

const withdrawalRequest = {
  get: '/wallet/withdraw',
  update: '/wallet/update',
};

const learning = {
  createVideo: '/learning/video', //post
  createPlaylist: '/learning/playlist', //post
  getVideos: '/learning/videos', //get
  getPlaylist: '/learning/playlists', //get
  removeVideo: '/learning/video', // ':id' , delete
  removePlaylist: '/learning/playlist', // ':id' , delete
  addVideoToPlaylist: '/learning', // /learning/_playlistId_/_videoId_ , PUT
  removeVideoFromPlaylist: '/learning/remove', // /learning/remove/_playlistId_/_videoId_ , PUT
  userLearning: '/learning/user', // GET
};

const connect = {
  toggleDisable: '/userconnect/disable',
  deleteUser: '/userconnect/delete',
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
  withdrawalRequest,
  learning,
  connect,
};

export default endpoints;
