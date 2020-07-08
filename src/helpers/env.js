const { isFalse } = require('./conditionals');
const {
  throwIfNotString,
  throwIfNotNumber,
  throwIfNotInteger,
  throwIfNotBoolean,
  throwIfNotArray
} = require('./throwIf');

/**
 * Returns parsed value (JSON.parse), or raw value if parsing fails
 * @param {string} raw - raw
 * @returns {any} parsed value, or raw value
 */
const parseEnvVar = (raw) => {
  try {
    return JSON.parse(raw);
  } catch (e) {
    return raw; // will be string, or undefined
  }
};

/**
 * Load a String value from an environment variable.
 * This function will throw if the value is not String.
 *
 * @param {string} key – case-sensitive key
 * @param {Object} env – optional environment, useful for testing, defaults to process.env
 * @param {boolean} insecure – optional insecure, defaults to false
 * @throws {TypeError}
 * @returns {string} the value of the environment variable if found in env
 */
const getString = (key, env = process.env, insecure = false) => {
  const value = env[key];

  if (isFalse(insecure)) {
    throwIfNotString(
      value,
      `Environment variable '${key}' has to be of type String, found ${typeof value}`,
      TypeError
    );
  }

  return value;
};

/**
 * Load a Number (Int, Float) value from an environment variable.
 * This function will throw if the value is not Number.
 *
 * @param {string} key – case-sensitive key
 * @param {Object} env – optional environment, useful for testing, defaults to process.env
 * @param {boolean} insecure – optional insecure, defaults to false
 * @throws {TypeError}
 * @returns {number} the value of the environment variable if found in env.
 */
const getNumber = (key, env = process.env, insecure = false) => {
  const value = env[key];
  const parsedValue = parseEnvVar(value);

  if (isFalse(insecure)) {
    throwIfNotNumber(
      parsedValue,
      `Environment variable '${key}' has to be of type Number, found ${typeof parsedValue}`,
      TypeError
    );
  }

  return parsedValue;
};

/**
 * Load a Integer value from an environment variable.
 * This function will throw if the value is not Integer.
 *
 * @param {string} key – case-sensitive key
 * @param {Object} env – optional environment, useful for testing, defaults to process.env
 * @param {boolean} insecure – optional insecure, defaults to false
 * @throws {TypeError}
 * @returns {Int} the value of the environment variable if found in env
 */
const getInteger = (key, env = process.env, insecure = false) => {
  const value = env[key];
  const parsedValue = parseEnvVar(value);

  if (isFalse(insecure)) {
    throwIfNotInteger(
      parsedValue,
      `Environment variable '${key}' has to be of type Integer, found ${typeof parsedValue}`,
      TypeError
    );
  }

  return parsedValue;
};

/**
 * Load a Boolean value from an environment variable.
 * This function will throw if the value is not Boolean.
 *
 * @param {string} key – case-sensitive key
 * @param {Object} env – optional environment, useful for testing, defaults to process.env
 * @param {boolean} insecure – optional insecure, defaults to false
 * @throws {TypeError}
 * @returns {boolean} the value of the environment variable if found in env
 */
const getBoolean = (key, env = process.env, insecure = false) => {
  const value = env[key];
  const parsedValue = parseEnvVar(value);

  if (isFalse(insecure)) {
    throwIfNotBoolean(
      parsedValue,
      `Environment variable '${key}' has to be of type Boolean, found ${typeof parsedValue}`,
      TypeError
    );
  }

  return parsedValue;
};

/**
 * Load an Array value from an environment variable.
 * This function will throw if the value is not Boolean.
 *
 * @param {string} key – case-sensitive key
 * @param {Object} env – optional environment, useful for testing, defaults to process.env
 * @param {boolean} insecure – optional insecure, defaults to false
 * @throws {TypeError}
 * @returns {array} the value of the environment variable if found in env
 */
const getArray = (key, env = process.env, insecure = false) => {
  const value = env[key];
  const parsedValue = parseEnvVar(value);

  if (isFalse(insecure)) {
    throwIfNotArray(
      parsedValue,
      `Environment variable '${key}' has to be of type Array, found ${typeof parsedValue}`,
      TypeError
    );
  }

  return parsedValue;
};

module.exports = {
  getString,
  getNumber,
  getInteger,
  getBoolean,
  getArray
};
