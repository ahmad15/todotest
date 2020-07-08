const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { todoUpdateHandler } = require('../../../../src/handlers/todo');
const { updateTodoReq, insertTodoRes } = require('../../../fixtures');

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Update todo', () => {
  const sandbox = sinon.createSandbox();

  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: updateTodoReq,
      params: "params"
    };
    mockResponse = {
      send: sandbox.stub(),
      locals: {
        todoService: {
          updateTodo: sandbox.stub()
        }
      }
    };
  });

  afterEach(() => {
    mockRequest = null;
    mockResponse = null;
    sandbox.restore();
  });

  it('should send update todo result ', async () => {
    mockResponse.locals.todoService.updateTodo.returns(insertTodoRes);
    await todoUpdateHandler(mockRequest, mockResponse);

    expect(mockResponse.send).to.have.been.calledOnce;
    expect(mockResponse.send).to.have.been.calledWith(insertTodoRes);
  });
});
