exports.getChats = (req, res, next) => {
  console.log(res.locals.user);
  res.status(200).json({
    success: true,
    user: `${res.locals.user.username}`,
  });
};

exports.sendChat = (req, res, next) => {};
