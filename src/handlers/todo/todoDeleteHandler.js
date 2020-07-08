/**
 * handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const todoDeleteHandler = async (req, res) => {
  const { id } = req.params;
  const deleteTodo = await res.locals.todoService.deleteTodo(id);
  return res.send(deleteTodo);
};

module.exports = todoDeleteHandler;
