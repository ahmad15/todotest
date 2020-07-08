/**
 * handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const todoListHandler = async (req, res) => {
  const listTodo = await res.locals.todoService.getListTodo();
  return res.send(listTodo);
};

module.exports = todoListHandler;
