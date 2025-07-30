const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();

const { TodoDbConnector } = require('../../../src/connectors');

describe('todoDbConnector', () => {
  let sandbox;
  let MockArgs;
  let MockParams;
  let queryStub;
  let connector;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    MockParams = {
      id: 'id',
    };
    queryStub = {
      query: sandbox.stub().resolves()
    }
    MockArgs = {
      logger: { error: sandbox.stub().resolves() },
      db: sandbox.stub().returns(queryStub)
    };
    connector = new TodoDbConnector(MockArgs);
  });

  afterEach(() => {
    sandbox.restore();
    MockArgs = null;
    MockParams = null;
    queryStub = null;
    connector = null;
  });

  describe('constructor', () => {
    it('should throw if params not supply opts.logger', () => {
      expect(() => new TodoDbConnector()).to.throw(
        Error,
        'must supply opts.logger'
      );
    });

    it('should throw if params not supply opts.db', () => {
      MockArgs = {
        logger: { error: sandbox.stub().resolves() }
      };
      expect(() => new TodoDbConnector(MockArgs)).to.throw(
        Error,
        'must supply opts.db'
      );
    });
  });

  // describe('Get List Todo', () => {
  //   it('should return result when get todo list', async () => {
  //     returnValue = await connector.getListTodo();
  //     expect(returnValue).to.not.be.undefined;
  //   });
  // });

});
