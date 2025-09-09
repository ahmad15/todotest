/**
 * handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const userUpdateHandler = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const updateUser = await res.locals.userService.updateUserProfile(id, payload);

  return res.send(updateUser);
};

module.exports = userUpdateHandler;
