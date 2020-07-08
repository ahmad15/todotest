const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { todoCreateHandler } = require('../../../../src/handlers/todo');
const { insertTodoReq, insertTodoRes } = require('../../../fixtures');

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Insert todo', () => {
  const sandbox = sinon.createSandbox();

  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: insertTodoReq
    };
    mockResponse = {
      send: sandbox.stub(),
      locals: {
        todoService: {
          insertTodo: sandbox.stub()
        }
      }
    };
  });

  afterEach(() => {
    mockRequest = null;
    mockResponse = null;
    sandbox.restore();
  });

  it('should send insert todo result ', async () => {
    mockResponse.locals.todoService.insertTodo.returns(insertTodoRes);
    await todoCreateHandler(mockRequest, mockResponse);

    expect(mockResponse.send).to.have.been.calledOnce;
    expect(mockResponse.send).to.have.been.calledWith(insertTodoRes);
  });
});
