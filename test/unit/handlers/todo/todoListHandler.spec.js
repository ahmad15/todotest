const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { todoListHandler } = require('../../../../src/handlers/todo');
const { listTodoRes } = require('../../../fixtures');

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('List todo', () => {
  const sandbox = sinon.createSandbox();

  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      send: sandbox.stub(),
      locals: {
        todoService: {
          getListTodo: sandbox.stub()
        }
      }
    };
  });

  afterEach(() => {
    mockRequest = null;
    mockResponse = null;
    sandbox.restore();
  });

  it('should send the todo result on get todo list', async () => {
    mockResponse.locals.todoService.getListTodo.returns(listTodoRes);
    await todoListHandler(mockRequest, mockResponse);

    expect(mockResponse.send).to.have.been.calledOnce;
    expect(mockResponse.send).to.have.been.calledWith(listTodoRes);
  });
});
