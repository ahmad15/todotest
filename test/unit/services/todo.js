const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const CustomError = require('../../../src/helpers/customError');

const { Todo } = require('../../../src/services');
const {
  insertTodoReq, listTodoRes, insertTodoRes, updateTodoReq, detailTodoRes
} = require('../../fixtures');
const { json } = require('express');

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Todo Service', () => {
  const sandbox = sinon.createSandbox();
  let args;
  let services;
  let params;

  beforeEach(() => {
    params = {
      id: 'id'
    };

    args = {
      send: sandbox.stub(),
      todoDbConnector: {
        getListTodo: async () => {
          return { rows: listTodoRes }
        },
        getDetailTodo: async () => {
          return { rows: [detailTodoRes] }
        },
        insertTodo: async () => {
          return { rowCount: 1 }
        },
        updateTodo: async () => {
          return { rowCount: 1 }
        },
        deleteTodo: async () => {
          return { rowCount: 1 }
        }
      }
    };
    services = new Todo(args);
  });

  afterEach(() => {
    sandbox.restore();
    args = null;
    services = null;
  });

  describe('constructor', () => {
    it('should throw if opts.todoDbConnector is not provided', () => {
      args = { config: {} }
      expect(() => new Todo(args)).to.throw(
        Error,
        'must supply opts.todoDbConnector'
      );
    });
  });

  describe('getListTodo', () => {
    it('should return todo list', async () => {
      const result = await services.getListTodo();
      expect(result).to.deep.equal(listTodoRes);
    });

    it('should return empty todo list', async () => {
      args = {
        send: sandbox.stub(),
        todoDbConnector: {
          getListTodo: async () => {
            return { rows: [] }
          }
        }
      };
      services = new Todo(args);
      return services.getListTodo().should.eventually.be.rejected.and.to.be.instanceOf(CustomError);
    });
  });

  describe('getDetailTodo', () => {
    it('should return todo detail', async () => {
      const result = await services.getDetailTodo(params.id);
      expect(result).to.deep.equal(detailTodoRes);
    });

    it('should return empty todo detail', async () => {
      args = {
        send: sandbox.stub(),
        todoDbConnector: {
          getDetailTodo: async () => {
            return { rows: [] }
          }
        }
      };
      services = new Todo(args);
      return services.getDetailTodo().should.eventually.be.rejected.and.to.be.instanceOf(CustomError);
    });
  });

  describe('insertTodo', () => {
    it('should return insert todo', async () => {
      const result = await services.insertTodo(insertTodoReq);
      expect(result).to.haveOwnProperty("code")
    });

    it('should return error insert todo', async () => {
      args = {
        send: sandbox.stub(),
        todoDbConnector: {
          insertTodo: async () => {
            return { rowCount: 0 }
          }
        }
      };
      services = new Todo(args);
      return services.insertTodo(insertTodoReq).should.eventually.be.rejected.and.to.be.instanceOf(CustomError);
    });
  });

  describe('updateTodo', () => {
    it('should return update todo', async () => {
      const result = await services.updateTodo(params.id, updateTodoReq);
      expect(result).to.haveOwnProperty("code")
    });

    it('should return error update todo', async () => {
      args = {
        send: sandbox.stub(),
        todoDbConnector: {
          updateTodo: async () => {
            return { rowCount: 0 }
          }
        }
      };
      services = new Todo(args);
      return services.updateTodo(params.id, updateTodoReq).should.eventually.be.rejected.and.to.be.instanceOf(CustomError);
    });
  });

  describe('deleteTodo', () => {
    it('should return delete todo', async () => {
      const result = await services.deleteTodo(updateTodoReq);
      expect(result).to.haveOwnProperty("code")
    });

    it('should return error delete todo', async () => {
      args = {
        send: sandbox.stub(),
        todoDbConnector: {
          deleteTodo: async () => {
            return null;
          }
        }
      };
      services = new Todo(args);
      return services.deleteTodo(params.id).should.eventually.be.rejected.and.to.be.instanceOf(CustomError);
    });
  });

});
