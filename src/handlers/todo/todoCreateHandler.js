/**
 * handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const todoCreateHandler = async (req, res) => {
  const insertTodo = await res.locals.todoService.insertTodo(req.body);
  return res.send(insertTodo);
};

module.exports = todoCreateHandler;
