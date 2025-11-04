const axios = require("axios");

const apiClient = axios.create({
  timeout: 100000,
});

module.exports = apiClient;
