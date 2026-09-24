
const app = require("./src/app");

let portNo = process.env.port || 3000;

app.listen(portNo, () => {
  console.log(`Server is running on port ${portNo}`);
});

