/**
 * handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const todoCreateHandler = async (req, res) => {
  let payload = req.body;

  if (req.file) {
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;

    payload = {
      ...payload,
      filename, mimetype, size,
      filepath
    };
  }

  const insertTodo = await res.locals.todoService.insertTodo(payload);

  return res.send(insertTodo);
};

module.exports = todoCreateHandler;
