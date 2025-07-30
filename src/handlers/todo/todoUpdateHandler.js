/**
 * handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const todoUpdateHandler = async (req, res) => {
  const { id } = req.params;
  const { filename, mimetype, size } = req.file;
  const filepath = req.file.path;
  const payload = {
    ...req.body,
    filename, mimetype, size,
    filepath
  };

  const updateTodo = await res.locals.todoService.updateTodo(id, payload);

  return res.send(updateTodo);
};

module.exports = todoUpdateHandler;
