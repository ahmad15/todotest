const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { throwIfMissing } = require('../helpers/throwIf');
const CustomError = require('../helpers/customError');

/**
 * Wallet User Model class
 */
class User {
  /**
   * constructors
   * @param {object} opts - opts parameters
   */
  constructor(opts) {
    Object.assign(this, opts);
    throwIfMissing(
      this.config,
      'must supply opts.config'
    );
    throwIfMissing(
      this.userDbConnector,
      'must supply opts.userDbConnector'
    );
  }

  /**
   * getUser
   *
   * @returns {object} object result
   * if update additional info is success
   *
   */
  async getListUser() {
    const users = await this.userDbConnector.getListUser();
    if (users.rows.length > 0) {
      return users.rows;
    }
    throw new CustomError('No User found', 'DATA_NOT_FOUND', 404);
  }

  /**
   * getDetailUser
   *
   * @param {string} string id
   * @returns {object} object result
   * if update additional info is success
   *
   */
  async getDetailUser(id) {
    const users = await this.userDbConnector.getDetailUser(id);
    if (users.rows.length > 0) {
      return users.rows[0];
    }
    throw new CustomError('No User found', 'DATA_NOT_FOUND', 404);
  }

  /**
   * getAuthUser
   *
   * @param {string} string email
   * @param {string} string password
   * @returns {object} object result
   * if update additional info is success
   *
   */
  async getAuthUser(email, password) {
    const { jwt: { expired, secret } } = this.config;
    const users = await this.userDbConnector.getAuthUser(email);

    if (users.rows.length > 0) {
      const user = users.rows[0];
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if(!passwordIsValid) {
        throw new CustomError('Email or Password is not valid', 'DATA_FAILED', 401);
      }

      // create a token
      var token = jwt.sign({ id: user.id, email: user.email, name: user.name }, secret, {
        expiresIn: parseInt(expired)
      });

      return {
        tokenId: token
      };
    }
    throw new CustomError('No User found', 'DATA_NOT_FOUND', 404);
  }

  /**
   * insertUser
   *
   * @param {payload} object payload
   * @returns {object} object result
   *
   */
  async insertUser(payload) {
    const users = await this.userDbConnector.insertUser(payload);
    if (users.rowCount > 0) {
      return new CustomError('Successfuly insert todo data', 'SUCCESS', 200);
    }
    throw new CustomError('Something error', 'INTERNAL_SERVER_ERROR', 500);
  }

  /**
   * updateUser
   *
   * @param {string} string id
   * @param {payload} object payload
   * @returns {object} object result
   *
   */
  async updateUser(id, payload) {
    const users = await this.userDbConnector.updateUser(id, payload);
    if (users.rowCount > 0) {
      return new CustomError('Successfuly update todo data', 'SUCCESS', 200);
    }
    throw new CustomError('Something error', 'INTERNAL_SERVER_ERROR', 500);
  }

  /**
   * deleteUser
   *
   * @param {string} string id
   * @returns {object} object result
   *
   */
  async deleteUser(id) {
    const users = await this.userDbConnector.deleteUser(id);
    if (users) {
      return new CustomError('Successfuly remove todo data', 'SUCCESS', 200);
    }
    throw new CustomError('Something error', 'INTERNAL_SERVER_ERROR', 500);
  }

}

module.exports = User;
