import  log4js  from "log4js";

log4js.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerFile: { type: 'file', filename: 'info.log' },
        miLoggerFile2: { type: 'file', filename: 'info2.log' }
    },
    categories: {
        default: { appenders: ["miLoggerConsole"], level: "trace" },
        consola: { appenders: ["miLoggerConsole"], level: "debug" },
        archivo: { appenders: ["miLoggerFile"], level: "info" },
        todos: { appenders: ["miLoggerConsole", "miLoggerFile"], level: "info" }
    }
})

const loggerTodos = log4js.getLogger('todos');
const loggerConsola = log4js.getLogger('consola');
// loggerTodos.trace("Entering cheese testing");
// loggerTodos.debug("Got cheese.");
// loggerTodos.info("Cheese is Comté.");
// loggerTodos.warn("Cheese is quite smelly.");
// loggerTodos.error("Cheese is too ripe!");
// loggerTodos.fatal("Cheese was breeding ground for listeria.");

export {loggerTodos,loggerConsola}