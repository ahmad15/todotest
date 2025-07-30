/**
 * handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const todoDetailHandler = async (req, res) => {
  const { id } = req.params;
  const detailTodo = await res.locals.todoService.getDetailTodo(id);
  return res.send(detailTodo);
};

module.exports = todoDetailHandler;
