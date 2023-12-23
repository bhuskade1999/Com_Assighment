const app = require("./app");

const { connectDatabase } = require("./imp/database");

connectDatabase(); //accessing database

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
