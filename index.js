const app = require("./app");
const { PORT } = require("./utils/env");

const port = process.env.PORT || PORT;
const server = app.listen(port, function () {
  console.log(`Express server listening on port ${port}`);
});
