/**
 * handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const userDetailHandler = async (req, res) => {
  const { id } = req.params;
  const detailUser = await res.locals.userService.getDetailUser(id);

  return res.send(detailUser);
};

module.exports = userDetailHandler;
