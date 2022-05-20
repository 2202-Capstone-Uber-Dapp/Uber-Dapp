module.exports.authorizeUser = (socket, next) => {
  if (!socket.request.session && !socket.request.session.user_id) {
    console.log('Bad request!');
    next(new Error('Not authorized'));
  } else {
    next();
  }
};
