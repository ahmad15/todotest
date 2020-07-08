const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { todoDeleteHandler } = require('../../../../src/handlers/todo');
const { insertTodoRes } = require('../../../fixtures');

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Delete todo', () => {
  const sandbox = sinon.createSandbox();

  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      params: "params"
    };
    mockResponse = {
      send: sandbox.stub(),
      locals: {
        todoService: {
          deleteTodo: sandbox.stub()
        }
      }
    };
  });

  afterEach(() => {
    mockRequest = null;
    mockResponse = null;
    sandbox.restore();
  });

  it('should send delete todo result ', async () => {
    mockResponse.locals.todoService.deleteTodo.returns(insertTodoRes);
    await todoDeleteHandler(mockRequest, mockResponse);

    expect(mockResponse.send).to.have.been.calledOnce;
    expect(mockResponse.send).to.have.been.calledWith(insertTodoRes);
  });
});
