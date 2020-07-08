/**
 * handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const todoUpdateHandler = async (req, res) => {
  const { id } = req.params;
  const updateTodo = await res.locals.todoService.updateTodo(id, req.body);
  return res.send(updateTodo);
};

module.exports = todoUpdateHandler;
