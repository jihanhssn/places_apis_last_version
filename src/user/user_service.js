const UserDao = require('./user_dao');

exports.getAllUsers = async (pageNumber, pageSize) => {
  return UserDao.getAllUsers(pageNumber, pageSize);
};

exports.getById = async (userId) => {
  return UserDao.getById(userId);
};

exports.getByMobile = async (mobile) => {
  return UserDao.getByMobile(mobile);
};

exports.createNewUser = async (user) => {
  return UserDao.createNewUser(user);
};
