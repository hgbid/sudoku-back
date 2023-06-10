const ivm = require("isolated-vm");
const isolate = new ivm.Isolate({ memoryLimit: 128 });
const context = await isolate.createContext();
const script = await isolate.compileScript('globalVar = "Hello, World!";');
await script.run(context);
const result = await context.globalReference.getSync("globalVar");
console.log(result); // "Hello, World!"
