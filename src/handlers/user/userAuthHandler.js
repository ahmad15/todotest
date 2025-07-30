/**
 * handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const userAuthHandler = async (req, res) => {
  const { email, password } = req.body;
  const authUser = await res.locals.userService.getAuthUser(email, password);
  return res.send(authUser);
};

module.exports = userAuthHandler;
