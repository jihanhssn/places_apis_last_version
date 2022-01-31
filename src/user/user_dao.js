const models = require('../../models/index');
const Op = models.Sequelize.Op;
const User = models.users;

exports.getAllUsers = async (pageNumber, pageSize) => {
  let offset = pageNumber * pageSize;
  let users = await User.findAll({
    offset: offset,
    limit: pageSize,
  });

  return Promise.resolve(users);
};

exports.getAll = async () => {
  let users = await User.findAll();
  users = users.map(user => user.toJSON());
  return Promise.resolve(users);
};

exports.getById = async (userId) => {
  let user = await User.findOne({
    where: {
      user_id: userId
    },
  });

  if (user) {
    user = user.toJSON();
  }

  return Promise.resolve(user);
};

exports.getByMobile = async (mobile) => {
  let user = await User.findOne({
    where: {
      mobile: mobile
    },
  });

  if (user) {
    user = user.toJSON()
  }

  return Promise.resolve(user);
};

exports.createNewUser = async (user) => {
  let dto = {
    user_id: user.user_id,
    role_id: user.role_id,
    full_name: user.full_name,
    mobile: user.mobile,
    s3_id: user.s3_id,
  };

  return User.create(dto)
};