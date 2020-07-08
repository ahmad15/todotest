const sinon = require('sinon');
const { expect } = require('chai');
const randomstring = require('randomstring');
const { common: { createHandler } } = require('../../../../src/handlers');

describe('createHandler', () => {
  let stub;
  let req;
  let res;
  let next;
  let func;

  beforeEach(() => {
    stub = sinon.stub();
    // req = randomstring.generate();
    res = {
      status: () => {
        return { send: sinon.stub() };
      },
      locals: {
        logger: {
          error: sinon.stub()
        }
      }
    };
    req = {
      app: {
        locals: {
          logger: {
            error: sinon.stub()
          }
        }
      }
    };
    next = sinon.stub().returns();
    func = createHandler(stub);
  });

  it('should return a function that calls `next`', async () => {
    const nextResponse = randomstring.generate();

    stub.resolves();
    next.returns(nextResponse);

    const response = await func(req, res, next);

    expect(stub.calledWith(req, res)).to.equal(true);
    expect(next.calledWith(undefined)).to.equal(true);
    expect(response).to.equal(nextResponse);
  });

  it('should calls next with the error', async () => {
    const error = randomstring.generate();
    stub.rejects(error);
    await func(req, res, next);
    expect(next.args).to.be.empty;
  });
});
