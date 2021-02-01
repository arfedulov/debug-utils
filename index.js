'use strict';

const getTime = () => new Date().toISOString();
const formatLogMsg = (msg) => `${getTime()} # ${msg}`;

const loggerFunction = {
    get: (target, propName) => console.trace(formatLogMsg(`accessing property ${propName}`)),
    set: (target, propName, value) => console.trace(formatLogMsg(`writing property ${propName} = ${value}`)),
    deleteProperty: (target, propName) => console.trace(formatLogMsg(`deleting property ${propName}`)),
};

const handlers = {
    get(target, propName) {
        loggerFunction.get(...arguments);
        return Reflect.get(...arguments);
    },
    set(target, propName, value) {
        loggerFunction.set(...arguments);
        return Reflect.set(...arguments);
    },
    deleteProperty(target, propName) {
        loggerFunction.deleteProperty(...arguments);
        return Reflect.deleteProperty(...arguments);
    }
};

/**
 * Create a proxy with logging traps
 * @param target - Original object
 * @param traps - A list of logging traps (Default: ['get', 'set', 'deleteProperty'])
 * @returns proxy object
 */
const loggingProxy = (target, traps = ['get', 'set', 'deleteProperty']) =>
    new Proxy(target, traps.reduce((acc, trap) => {
        acc[trap] = handlers[trap];
        return acc;
}, {}));

module.exports = {
    loggingProxy
};
