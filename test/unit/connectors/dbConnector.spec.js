const sinon = require('sinon');
const { expect } = require('chai');
const randomstring = require('randomstring');

const connectPostgreSQL = require('../../../src/connectors/dbConnector');

describe('connectPostgreSQL', () => {
  it('should call `connectPostgreSQL`', async () => {
    const db = randomstring.generate();
    const dbConfig = {
      host: randomstring.generate(),
      port: randomstring.generate(),
      database: randomstring.generate(),
      user: randomstring.generate(),
      password: randomstring.generate()
    };
    const logger = {
      info: sinon.stub()
    };

    const returnValue = await connectPostgreSQL(dbConfig, logger);
    expect(returnValue).to.not.be.undefined;
  });
});
