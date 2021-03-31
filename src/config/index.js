const config = {
  dev     : process.env.NODE_ENV !== 'production',
  backend : process.env.NODE_ENV !== 'production' ? 'http://localhost:8089' : 'http://localhost:8089',
};

module.exports = {
  config,
};
