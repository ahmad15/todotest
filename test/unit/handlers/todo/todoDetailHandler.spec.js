const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { todoDetailHandler } = require('../../../../src/handlers/todo');
const { listTodoRes } = require('../../../fixtures');

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Detail', () => {
  const sandbox = sinon.createSandbox();

  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      params: {
        id: "id"
      }
    };
    mockResponse = {
      send: sandbox.stub(),
      locals: {
        todoService: {
          getDetailTodo: sandbox.stub()
        }
      }
    };
  });

  afterEach(() => {
    mockRequest = null;
    mockResponse = null;
    sandbox.restore();
  });

  it('should send the todo result on get todo detail', async () => {
    mockResponse.locals.todoService.getDetailTodo.returns(listTodoRes);
    await todoDetailHandler(mockRequest, mockResponse);

    expect(mockResponse.send).to.have.been.calledOnce;
    expect(mockResponse.send).to.have.been.calledWith(listTodoRes);
  });
});
