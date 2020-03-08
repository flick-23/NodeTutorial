const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();
var cpuInfo = os.cpus();
var hostName = os.hostname();

console.log("Total Memory : ",totalMemory);
// console.log(`Total Memory ${totalMemory}`); alternative for above line 

console.log("FreeMemory   : ",freeMemory);
console.log("Cpu Info     : ",cpuInfo);
console.log("Host Name    : ",hostName);