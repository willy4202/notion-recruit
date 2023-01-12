const { Client } = require("@notionhq/client");

module.exports = new Client({
  auth: process.env.VUE_APP_INTEGRATION,
});
