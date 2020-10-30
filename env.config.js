function getEnv() {
  // return empty object instead when none was parsed
  if (!parsed) {
    return { parsed: {}, stringified: {} };
  }

  // populate key/value based on parsed env result for DefinePlugin
  const stringified = Object.keys(parsed).reduce((result, key) => {
    // eslint-disable-next-line no-param-reassign
    result[`process.env.${key}`] = JSON.stringify(parsed[key]);
    return result;
  }, {});

  return { parsed, stringified };
}

// export env related
module.exports = {
  getEnv,
};
