// ? Entry File

// * Loading Environment Variables
require("dotenv").config();

// * Run Multiple Instances of NodeJS
const cluster = require("cluster");

if (cluster.isMaster) {
  let cpuCount = require("os").cpus().length;
  console.log("CPU Count: " + cpuCount);
  cluster.fork();
} else {
  require("./server");
}
