/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Type;
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
const VOID0 = void (0), _BOOLEAN = typeof true, _NUMBER = typeof 0, _STRING = typeof "", _SYMBOL = "symbol", _OBJECT = typeof {}, _UNDEFINED = typeof VOID0, _FUNCTION = typeof function () { }, LENGTH = "length";
// Only used for primitives.
const typeInfoRegistry = {};
/**
 * Exposes easy access to type information including inquiring about members.
 */
class TypeInfo {
    constructor(target, onBeforeFreeze) {
        this.isBoolean = false;
        this.isNumber = false;
        this.isString = false;
        this.isTrueNaN = false;
        this.isObject = false;
        this.isFunction = false;
        this.isUndefined = false;
        this.isNull = false;
        this.isPrimitive = false;
        this.isSymbol = false;
        switch (this.type = typeof target) {
            case _BOOLEAN:
                this.isBoolean = true;
                this.isPrimitive = true;
                break;
            case _NUMBER:
                this.isNumber = true;
                this.isTrueNaN = isNaN(target);
                this.isFinite = isFinite(target);
                this.isValidNumber = !this.isTrueNaN;
                this.isPrimitive = true;
                break;
            case _STRING:
                this.isString = true;
                this.isPrimitive = true;
                break;
            case _SYMBOL:
                this.isSymbol = true;
                break;
            case _OBJECT:
                this.target = target;
                if (target === null) {
                    this.isNull = true;
                    this.isNullOrUndefined = true;
                    this.isPrimitive = true;
                }
                else {
                    this.isArray = (target) instanceof (Array);
                    this.isObject = true;
                }
                break;
            case _FUNCTION:
                this.target = target;
                this.isFunction = true;
                break;
            case _UNDEFINED:
                this.isUndefined = true;
                this.isNullOrUndefined = true;
                this.isPrimitive = true;
                break;
            default:
                throw "Fatal type failure.  Unknown type: " + this.type;
        }
        if (onBeforeFreeze)
            onBeforeFreeze(this);
        Object.freeze(this);
    }
    /**
     * Returns a TypeInfo for any member or non-member,
     * where non-members are of type undefined.
     * @param name
     * @returns {TypeInfo}
     */
    member(name) {
        const t = this.target;
        return TypeInfo.getFor(t && (name) in (t)
            ? t[name]
            : VOID0);
    }
    /**
     * Returns a TypeInfo for any target object.
     * If the target object is of a primitive type, it returns the TypeInfo instance assigned to that type.
     * @param target
     * @returns {TypeInfo}
     */
    static getFor(target) {
        const type = typeof target;
        switch (type) {
            case _OBJECT:
            case _FUNCTION:
                return new TypeInfo(target);
        }
        let info = typeInfoRegistry[type];
        if (!info)
            typeInfoRegistry[type] = info = new TypeInfo(target);
        return info;
    }
    /**
     * Returns true if the target matches the type (instanceof).
     * @param type
     * @returns {boolean}
     */
    is(type) {
        return this.target instanceof type;
    }
    /**
     * Returns null if the target does not match the type (instanceof).
     * Otherwise returns the target as the type.
     * @param type
     * @returns {T|null}
     */
    as(type) {
        return this.target instanceof type ? this.target : null;
    }
}
/* unused harmony export TypeInfo */

function Type(target) {
    return new TypeInfo(target);
}
(function (Type) {
    /**
     * typeof true
     * @type {string}
     */
    Type.BOOLEAN = _BOOLEAN;
    /**
     * typeof 0
     * @type {string}
     */
    Type.NUMBER = _NUMBER;
    /**
     * typeof ""
     * @type {string}
     */
    Type.STRING = _STRING;
    /**
     * typeof {}
     * @type {string}
     */
    Type.OBJECT = _OBJECT;
    /**
     * typeof Symbol
     * @type {string}
     */
    Type.SYMBOL = _SYMBOL;
    /**
     * typeof undefined
     * @type {string}
     */
    Type.UNDEFINED = _UNDEFINED;
    /**
     * typeof function
     * @type {string}
     */
    Type.FUNCTION = _FUNCTION;
    /**
     * Returns true if the target matches the type (instanceof).
     * @param target
     * @param type
     * @returns {T|null}
     */
    function is(target, type) {
        return target instanceof type;
    }
    Type.is = is;
    /**
     * Returns null if the target does not match the type (instanceof).
     * Otherwise returns the target as the type.
     * @param target
     * @param type
     * @returns {T|null}
     */
    function as(target, type) {
        return target instanceof type ? target : null;
    }
    Type.as = as;
    /**
     * Returns true if the value parameter is null or undefined.
     * @param value
     * @returns {boolean}
     */
    function isNullOrUndefined(value) {
        return value == null;
    }
    Type.isNullOrUndefined = isNullOrUndefined;
    /**
     * Returns true if the value parameter is a boolean.
     * @param value
     * @returns {boolean}
     */
    function isBoolean(value) {
        return typeof value === _BOOLEAN;
    }
    Type.isBoolean = isBoolean;
    /**
     * Returns true if the value parameter is a number.
     * @param value
     * @param ignoreNaN Default is false. When true, NaN is not considered a number and will return false.
     * @returns {boolean}
     */
    function isNumber(value, ignoreNaN = false) {
        return typeof value === _NUMBER && (!ignoreNaN || !isNaN(value));
    }
    Type.isNumber = isNumber;
    /**
     * Returns true if is a number and is NaN.
     * @param value
     * @returns {boolean}
     */
    function isTrueNaN(value) {
        return typeof value === _NUMBER && isNaN(value);
    }
    Type.isTrueNaN = isTrueNaN;
    /**
     * Returns true if the value parameter is a string.
     * @param value
     * @returns {boolean}
     */
    function isString(value) {
        return typeof value === _STRING;
    }
    Type.isString = isString;
    /**
     * Returns true if the value is a boolean, string, number, null, or undefined.
     * @param value
     * @param allowUndefined if set to true will return true if the value is undefined.
     * @returns {boolean}
     */
    function isPrimitive(value, allowUndefined = false) {
        const t = typeof value;
        switch (t) {
            case _BOOLEAN:
            case _STRING:
            case _NUMBER:
                return true;
            case _UNDEFINED:
                return allowUndefined;
            case _OBJECT:
                return value === null;
        }
        return false;
    }
    Type.isPrimitive = isPrimitive;
    /**
     * For detecting if the value can be used as a key.
     * @param value
     * @param allowUndefined
     * @returns {boolean|boolean}
     */
    function isPrimitiveOrSymbol(value, allowUndefined = false) {
        return typeof value === _SYMBOL ? true : isPrimitive(value, allowUndefined);
    }
    Type.isPrimitiveOrSymbol = isPrimitiveOrSymbol;
    /**
     * Returns true if the value is a string, number, or symbol.
     * @param value
     * @returns {boolean}
     */
    function isPropertyKey(value) {
        const t = typeof value;
        switch (t) {
            case _STRING:
            case _NUMBER:
            case _SYMBOL:
                return true;
        }
        return false;
    }
    Type.isPropertyKey = isPropertyKey;
    /**
     * Returns true if the value parameter is a function.
     * @param value
     * @returns {boolean}
     */
    function isFunction(value) {
        return typeof value === _FUNCTION;
    }
    Type.isFunction = isFunction;
    /**
     * Returns true if the value parameter is an object.
     * @param value
     * @param allowNull If false (default) null is not considered an object.
     * @returns {boolean}
     */
    function isObject(value, allowNull = false) {
        return typeof value === _OBJECT && (allowNull || value !== null);
    }
    Type.isObject = isObject;
    /**
     * Guarantees a number value or NaN instead.
     * @param value
     * @returns {number}
     */
    function numberOrNaN(value) {
        return isNaN(value) ? NaN : value;
    }
    Type.numberOrNaN = numberOrNaN;
    /**
     * Returns a TypeInfo object for the target.
     * @param target
     * @returns {TypeInfo}
     */
    function of(target) {
        return TypeInfo.getFor(target);
    }
    Type.of = of;
    /**
     * Will detect if a member exists (using 'in').
     * Returns true if a property or method exists on the object or its prototype.
     * @param instance
     * @param property Name of the member.
     * @param ignoreUndefined When ignoreUndefined is true, if the member exists but is undefined, it will return false.
     * @returns {boolean}
     */
    function hasMember(instance, property, ignoreUndefined = true) {
        return instance && !isPrimitive(instance) && (property) in (instance) && (ignoreUndefined || instance[property] !== VOID0);
    }
    Type.hasMember = hasMember;
    /**
     * Returns true if the member matches the type.
     * @param instance
     * @param property
     * @param type
     * @returns {boolean}
     */
    function hasMemberOfType(instance, property, type) {
        return hasMember(instance, property) && typeof (instance[property]) === type;
    }
    Type.hasMemberOfType = hasMemberOfType;
    function hasMethod(instance, property) {
        return hasMemberOfType(instance, property, _FUNCTION);
    }
    Type.hasMethod = hasMethod;
    function isArrayLike(instance) {
        /*
         * NOTE:
         *
         * Functions:
         * Enumerating a function although it has a .length property will yield nothing or unexpected results.
         * Effectively, a function is not like an array.
         *
         * Strings:
         * Behave like arrays but don't have the same exact methods.
         */
        return instance instanceof Array
            || Type.isString(instance)
            || !Type.isFunction(instance) && hasMember(instance, LENGTH);
    }
    Type.isArrayLike = isArrayLike;
})(Type || (Type = {}));
Object.freeze(Type);
/* unused harmony default export */ var _unused_webpack_default_export = (Type);
//# sourceMappingURL=Types.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = areEqual;
/* harmony export (immutable) */ __webpack_exports__["b"] = compare;
/* unused harmony export areEquivalent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

var isTrueNaN = __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isTrueNaN;
const VOID0 = void 0;
/**
 * Used for special comparison including NaN.
 * @param a
 * @param b
 * @param strict
 * @returns {boolean|any}
 */
function areEqual(a, b, strict = true) {
    return a === b
        || !strict && a == b
        || isTrueNaN(a) && isTrueNaN(b);
}
const COMPARE_TO = "compareTo";
function compare(a, b, strict = true) {
    if (areEqual(a, b, strict))
        return 0 /* Equal */;
    if (a && __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].hasMember(a, COMPARE_TO))
        return a.compareTo(b); // If a has compareTo, use it.
    else if (b && __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].hasMember(b, COMPARE_TO))
        return -b.compareTo(a); // a doesn't have compareTo? check if b does and invert.
    // Allow for special inequality..
    if (a > b || strict && (a === 0 && b == 0 || a === null && b === VOID0))
        return 1 /* Greater */;
    if (b > a || strict && (b === 0 && a == 0 || b === null && a === VOID0))
        return -1 /* Less */;
    return NaN;
}
/**
 * Determines if two primitives are equal or if two objects have the same key/value combinations.
 * @param a
 * @param b
 * @param nullEquivalency If true, null/undefined will be equivalent to an empty object {}.
 * @param extraDepth
 * @returns {boolean}
 */
function areEquivalent(a, b, nullEquivalency = true, extraDepth = 0) {
    // Take a step by step approach to ensure efficiency.
    if (areEqual(a, b, true))
        return true;
    if (a == null || b == null) {
        if (!nullEquivalency)
            return false;
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isObject(a)) {
            return !Object.keys(a).length;
        }
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isObject(b)) {
            return !Object.keys(b).length;
        }
        return a == null && b == null;
    }
    if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isObject(a) && __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isObject(b)) {
        const aKeys = Object.keys(a), bKeys = Object.keys(b), len = aKeys.length;
        if (len != bKeys.length)
            return false;
        aKeys.sort();
        bKeys.sort();
        for (let i = 0; i < len; i++) {
            let key = aKeys[i];
            if (key !== bKeys[i] || !areEqual(a[key], b[key], true))
                return false;
        }
        // Doesn't track circular references but allows for controlling the amount of recursion.
        if (extraDepth > 0) {
            for (let key of aKeys) {
                if (!areEquivalent(a[key], b[key], nullEquivalency, extraDepth - 1))
                    return false;
            }
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=Compare.js.map

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArgumentException__ = __webpack_require__(3);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'ArgumentNullException';
class ArgumentNullException extends __WEBPACK_IMPORTED_MODULE_0__ArgumentException__["a" /* ArgumentException */] {
    constructor(paramName, message = `'${paramName}' is null (or undefined).`, innerException) {
        super(paramName, message, innerException);
    }
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ArgumentNullException;

/* unused harmony default export */ var _unused_webpack_default_export = (ArgumentNullException);
//# sourceMappingURL=ArgumentNullException.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Text_Utility__ = __webpack_require__(22);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */


// noinspection JSUnusedLocalSymbols
const NAME = 'ArgumentException';
class ArgumentException extends __WEBPACK_IMPORTED_MODULE_0__SystemException__["a" /* SystemException */] {
    // For simplicity and consistency, lets stick with 1 signature.
    constructor(paramName, message, innerException, beforeSealing) {
        let pn = paramName ? ('{' + paramName + '} ') : '';
        super(Object(__WEBPACK_IMPORTED_MODULE_1__Text_Utility__["b" /* trim */])(pn + (message || '')), innerException, (_) => {
            _.paramName = paramName;
            if (beforeSealing)
                beforeSealing(_);
        });
    }
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ArgumentException;

/* unused harmony default export */ var _unused_webpack_default_export = (ArgumentException);
//# sourceMappingURL=ArgumentException.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArgumentException__ = __webpack_require__(3);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'ArgumentOutOfRangeException';
class ArgumentOutOfRangeException extends __WEBPACK_IMPORTED_MODULE_0__ArgumentException__["a" /* ArgumentException */] {
    constructor(paramName, actualValue, message = ' ', innerException) {
        super(paramName, `(${actualValue}) ` + message, innerException, (_) => {
            _.actualValue = actualValue;
        });
    }
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ArgumentOutOfRangeException;

/* unused harmony default export */ var _unused_webpack_default_export = (ArgumentOutOfRangeException);
//# sourceMappingURL=ArgumentOutOfRangeException.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Disposable_DisposableBase__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Disposable_ObjectPool__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__IteratorResult__ = __webpack_require__(15);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */




// noinspection JSUnusedLocalSymbols
const VOID0 = void 0;
let yielderPool;
//noinspection JSUnusedLocalSymbols
function yielder(recycle) {
    if (!yielderPool)
        yielderPool
            = new __WEBPACK_IMPORTED_MODULE_2__Disposable_ObjectPool__["a" /* ObjectPool */](40, () => new Yielder(), y => y.yieldBreak());
    if (!recycle)
        return yielderPool.take();
    yielderPool.add(recycle);
}
class Yielder {
    constructor() {
        this._current = VOID0;
        this._index = NaN;
    }
    get current() { return this._current; } // this class is not entirely local/private.  Still needs protection.
    get index() { return this._index; }
    yieldReturn(value) {
        this._current = value;
        if (isNaN(this._index))
            this._index = 0;
        else
            this._index++;
        return true;
    }
    yieldBreak() {
        this._current = VOID0;
        this._index = NaN;
        return false;
    }
    dispose() {
        this.yieldBreak();
    }
}
const NAME = "EnumeratorBase";
// "Enumerator" is conflict JScript's "Enumerator"
// Naming this class EnumeratorBase to avoid collision with IE.
class EnumeratorBase extends __WEBPACK_IMPORTED_MODULE_1__Disposable_DisposableBase__["a" /* DisposableBase */] {
    constructor(_initializer, _tryGetNext, disposer, isEndless) {
        super();
        this._initializer = _initializer;
        this._tryGetNext = _tryGetNext;
        this._disposableObjectName = NAME;
        this.reset();
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isBoolean(isEndless))
            this._isEndless = isEndless;
        else if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isBoolean(disposer))
            this._isEndless = disposer;
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isFunction(disposer))
            this._disposer = disposer;
    }
    get current() {
        const y = this._yielder;
        return y && y.current;
    }
    get index() {
        const y = this._yielder;
        return y ? y.index : NaN;
    }
    /*
     * Provides a mechanism to indicate if this enumerable never ends.
     * If set to true, some operations that expect a finite result may throw.
     * Explicit false means it has an end.
     * Implicit void means unknown.
     */
    get isEndless() {
        return this._isEndless;
    }
    /**
     * Added for compatibility but only works if the enumerator is active.
     */
    reset() {
        const _ = this;
        _.throwIfDisposed();
        const y = _._yielder;
        _._yielder = null;
        _._state = 0 /* Before */;
        if (y)
            yielder(y); // recycle until actually needed.
    }
    _assertBadState() {
        const _ = this;
        switch (_._state) {
            case 3 /* Faulted */:
                _.throwIfDisposed("This enumerator caused a fault and was disposed.");
                break;
            case 5 /* Disposed */:
                _.throwIfDisposed("This enumerator was manually disposed.");
                break;
        }
    }
    /**
     * Passes the current value to the out callback if the enumerator is active.
     * Note: Will throw ObjectDisposedException if this has faulted or manually disposed.
     */
    tryGetCurrent(out) {
        this._assertBadState();
        if (this._state === 1 /* Active */) {
            out(this.current);
            return true;
        }
        return false;
    }
    get canMoveNext() {
        return this._state < 2 /* Completed */;
    }
    /**
     * Safely moves to the next entry and returns true if there is one.
     * Note: Will throw ObjectDisposedException if this has faulted or manually disposed.
     */
    moveNext() {
        const _ = this;
        _._assertBadState();
        try {
            switch (_._state) {
                case 0 /* Before */:
                    _._yielder = _._yielder || yielder();
                    _._state = 1 /* Active */;
                    const initializer = _._initializer;
                    if (initializer)
                        initializer();
                // fall through
                case 1 /* Active */:
                    if (_._tryGetNext(_._yielder)) {
                        return true;
                    }
                    else {
                        this.dispose();
                        _._state = 2 /* Completed */;
                        return false;
                    }
                default:
                    return false;
            }
        }
        catch (e) {
            this.dispose();
            _._state = 3 /* Faulted */;
            throw e;
        }
    }
    /**
     * Moves to the next entry and emits the value through the out callback.
     * Note: Will throw ObjectDisposedException if this has faulted or manually disposed.
     */
    tryMoveNext(out) {
        if (this.moveNext()) {
            out(this.current);
            return true;
        }
        return false;
    }
    nextValue() {
        return this.moveNext()
            ? this.current
            : VOID0;
    }
    /**
     * Exposed for compatibility with generators.
     */
    next() {
        return this.moveNext()
            ? new __WEBPACK_IMPORTED_MODULE_3__IteratorResult__["a" /* IteratorResult */](this.current, this.index)
            : __WEBPACK_IMPORTED_MODULE_3__IteratorResult__["a" /* IteratorResult */].Done;
    }
    end() {
        this._ensureDisposeState(4 /* Interrupted */);
    }
    'return'(value) {
        const _ = this;
        _._assertBadState();
        try {
            return value === VOID0 || _._state === 2 /* Completed */ || _._state === 4 /* Interrupted */
                ? __WEBPACK_IMPORTED_MODULE_3__IteratorResult__["a" /* IteratorResult */].Done
                : new __WEBPACK_IMPORTED_MODULE_3__IteratorResult__["a" /* IteratorResult */](value, VOID0, true);
        }
        finally {
            _.end();
        }
    }
    _ensureDisposeState(state) {
        const _ = this;
        if (!_.wasDisposed) {
            _.dispose();
            _._state = state;
        }
    }
    _onDispose() {
        const _ = this;
        _._isEndless = false;
        const disposer = _._disposer;
        _._initializer = null;
        _._disposer = null;
        const y = _._yielder;
        _._yielder = null;
        this._state = 5 /* Disposed */;
        if (y)
            yielder(y);
        if (disposer)
            disposer();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EnumeratorBase;

/* unused harmony default export */ var _unused_webpack_default_export = (EnumeratorBase);
//# sourceMappingURL=EnumeratorBase.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Integer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


function Integer(n) {
    return Math.floor(n);
}
(function (Integer) {
    Integer.MAX_32_BIT = 2147483647;
    Integer.MAX_VALUE = 9007199254740991;
    const NUMBER = "number";
    /**
     * Converts any number to its 32bit counterpart.
     * Throws if conversion is not possible.
     * @param n
     * @returns {number}
     */
    function as32Bit(n) {
        const result = n | 0;
        if (isNaN(n))
            throw "'n' is not a number.";
        if (n !== -1 && result === -1)
            throw "'n' is too large to be a 32 bit integer.";
        return result;
    }
    Integer.as32Bit = as32Bit;
    /**
     * Returns true if the value is an integer.
     * @param n
     * @returns {boolean}
     */
    function is(n) {
        return typeof n === NUMBER && isFinite(n) && n === Math.floor(n);
    }
    Integer.is = is;
    /**
     * Returns true if the value is within a 32 bit range.
     * @param n
     * @returns {boolean}
     */
    function is32Bit(n) {
        return n === (n | 0);
    }
    Integer.is32Bit = is32Bit;
    /**
     * Throws if not an integer.
     * @param n
     * @param argumentName
     * @returns {boolean}
     */
    function assert(n, argumentName) {
        let i = is(n);
        if (!i)
            throw new __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__["a" /* ArgumentException */](argumentName || 'n', "Must be a integer.");
        return i;
    }
    Integer.assert = assert;
    /**
     * Throws if less than zero.
     * @param n
     * @param argumentName
     * @returns {boolean}
     */
    function assertZeroOrGreater(n, argumentName) {
        let i = assert(n, argumentName) && n >= 0;
        if (!i)
            throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */](argumentName || 'n', n, "Must be a valid integer greater than or equal to zero.");
        return i;
    }
    Integer.assertZeroOrGreater = assertZeroOrGreater;
    /**
     * Throws if not greater than zero.
     * @param n
     * @param argumentName
     * @returns {boolean}
     */
    function assertPositive(n, argumentName) {
        let i = assert(n, argumentName) && n > 0;
        if (!i)
            throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */](argumentName || 'n', n, "Must be greater than zero.");
        return i;
    }
    Integer.assertPositive = assertPositive;
})(Integer || (Integer = {}));
/* unused harmony default export */ var _unused_webpack_default_export = (Integer);
//# sourceMappingURL=Integer.js.map

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(8);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'InvalidOperationException';
class InvalidOperationException extends __WEBPACK_IMPORTED_MODULE_0__SystemException__["a" /* SystemException */] {
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["InvalidOperationException"] = InvalidOperationException;

/* harmony default export */ __webpack_exports__["default"] = (InvalidOperationException);
//# sourceMappingURL=InvalidOperationException.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exception__ = __webpack_require__(42);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/system.systemexception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'SystemException';
class SystemException extends __WEBPACK_IMPORTED_MODULE_0__Exception__["a" /* Exception */] {
    /*
        constructor(
            message:string = null,
            innerException:Error = null,
            beforeSealing?:(ex:any)=>void)
        {
            super(message, innerException, beforeSealing);
        }
    */
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SystemException;

/* unused harmony default export */ var _unused_webpack_default_export = (SystemException);
//# sourceMappingURL=SystemException.js.map

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ObjectDisposedException__ = __webpack_require__(24);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

class DisposableBase {
    constructor(__finalizer) {
        this.__finalizer = __finalizer;
        this.__wasDisposed = false;
    }
    get wasDisposed() {
        return this.__wasDisposed;
    }
    throwIfDisposed(message, objectName = this._disposableObjectName) {
        if (this.__wasDisposed)
            throw new __WEBPACK_IMPORTED_MODULE_0__ObjectDisposedException__["a" /* ObjectDisposedException */](objectName, message);
        return true;
    }
    dispose() {
        const _ = this;
        if (!_.__wasDisposed) {
            // Preemptively set wasDisposed in order to prevent repeated disposing.
            // NOTE: in true multi-threaded scenarios, this needs to be synchronized.
            _.__wasDisposed = true;
            try {
                _._onDispose(); // Protected override.
            }
            finally {
                if (_.__finalizer) {
                    _.__finalizer();
                    _.__finalizer = void 0;
                }
            }
        }
    }
    // Placeholder for overrides.
    _onDispose() { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DisposableBase;

/* unused harmony default export */ var _unused_webpack_default_export = (DisposableBase);
//# sourceMappingURL=DisposableBase.js.map

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initialize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Integer__ = __webpack_require__(6);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

/**
 * Initializes an array depending on the requested capacity.
 * The returned array will have a .length equal to the value provided.
 * @param length
 * @returns {T[]}
 */
function initialize(length) {
    __WEBPACK_IMPORTED_MODULE_0__Integer__["a" /* Integer */].assert(length, 'length');
    // This logic is based upon JS performance tests that show a significant difference at the level of 65536.
    let array;
    if (length > 65536)
        array = new Array(length);
    else {
        array = [];
        array.length = length;
    }
    return array;
}
//# sourceMappingURL=initialize.js.map

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = throwIfEndless;
/* harmony export (immutable) */ __webpack_exports__["b"] = from;
/* harmony export (immutable) */ __webpack_exports__["c"] = isEnumerable;
/* unused harmony export isEnumerableOrArrayLike */
/* harmony export (immutable) */ __webpack_exports__["d"] = isEnumerator;
/* harmony export (immutable) */ __webpack_exports__["e"] = isIterator;
/* harmony export (immutable) */ __webpack_exports__["a"] = forEach;
/* harmony export (immutable) */ __webpack_exports__["h"] = toArray;
/* harmony export (immutable) */ __webpack_exports__["f"] = map;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Disposable_dispose__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ArrayEnumerator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__IndexEnumerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__InfiniteEnumerator__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__EmptyEnumerator__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__IteratorEnumerator__ = __webpack_require__(30);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */








const STRING_EMPTY = "", ENDLESS_EXCEPTION_MESSAGE = 'Cannot call forEach on an endless enumerable. ' +
    'Would result in an infinite loop that could hang the current process.';
function throwIfEndless(isEndless) {
    if (isEndless)
        throw new __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__["a" /* UnsupportedEnumerableException */](ENDLESS_EXCEPTION_MESSAGE);
    return true;
}
function initArrayFrom(source, max = Infinity) {
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isArrayLike(source)) {
        const len = Math.min(source.length, max);
        if (isFinite(len)) {
            if (len > 65535)
                return new Array(len);
            const result = [];
            result.length = len;
            return result;
        }
    }
    return [];
}
// Could be array, or IEnumerable...
/**
 * Returns the enumerator for the specified collection, enumerator, or iterator.
 * If the source is identified as IEnumerator it will return the source as is.
 * @param source
 * @returns {any}
 */
function from(source) {
    // To simplify and prevent null reference exceptions:
    if (!source)
        return __WEBPACK_IMPORTED_MODULE_6__EmptyEnumerator__["a" /* EmptyEnumerator */];
    if ((source) instanceof (Array))
        return new __WEBPACK_IMPORTED_MODULE_2__ArrayEnumerator__["a" /* ArrayEnumerator */](source);
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isArrayLike(source)) {
        return new __WEBPACK_IMPORTED_MODULE_3__IndexEnumerator__["a" /* IndexEnumerator */](() => {
            return {
                source: source,
                length: source.length,
                pointer: 0,
                step: 1
            };
        });
    }
    if (!__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isPrimitive(source)) {
        if (isEnumerable(source))
            return source.getEnumerator();
        if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isFunction(source))
            return new __WEBPACK_IMPORTED_MODULE_5__InfiniteEnumerator__["a" /* InfiniteEnumerator */](source);
        if (isEnumerator(source))
            return source;
        if (isIterator(source))
            return new __WEBPACK_IMPORTED_MODULE_7__IteratorEnumerator__["a" /* IteratorEnumerator */](source);
    }
    throw new __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__["a" /* UnsupportedEnumerableException */]();
}
function isEnumerable(instance) {
    return __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].hasMemberOfType(instance, "getEnumerator", __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].FUNCTION);
}
function isEnumerableOrArrayLike(instance) {
    return __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isArrayLike(instance) || isEnumerable(instance);
}
function isEnumerator(instance) {
    return __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].hasMemberOfType(instance, "moveNext", __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].FUNCTION);
}
function isIterator(instance) {
    return __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].hasMemberOfType(instance, "next", __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].FUNCTION);
}
function forEach(e, action, max = Infinity) {
    if (e === STRING_EMPTY)
        return 0;
    if (e && max > 0) {
        if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isArrayLike(e)) {
            // Assume e.length is constant or at least doesn't deviate to infinite or NaN.
            throwIfEndless(!isFinite(max) && !isFinite(e.length));
            let i = 0;
            for (; i < Math.min(e.length, max); i++) {
                if (action(e[i], i) === false)
                    break;
            }
            return i;
        }
        if (isEnumerator(e)) {
            throwIfEndless(!isFinite(max) && e.isEndless);
            let i = 0;
            // Return value of action can be anything, but if it is (===) false then the forEach will discontinue.
            while (max > i && e.moveNext()) {
                if (action(e.current, i++) === false)
                    break;
            }
            return i;
        }
        if (isEnumerable(e)) {
            throwIfEndless(!isFinite(max) && e.isEndless);
            // For enumerators that aren't EnumerableBase, ensure dispose is called.
            return Object(__WEBPACK_IMPORTED_MODULE_0__Disposable_dispose__["b" /* using */])(e.getEnumerator(), f => forEach(f, action, max));
        }
        if (isIterator(e)) {
            // For our purpose iterators are endless and a max must be specified before iterating.
            throwIfEndless(!isFinite(max));
            let i = 0, r;
            // Return value of action can be anything, but if it is (===) false then the forEach will discontinue.
            while (max > i && !(r = e.next()).done) {
                if (action(r.value, i++) === false)
                    break;
            }
            return i;
        }
    }
    return -1;
}
/**
 * Converts any enumerable to an array.
 * @param source
 * @param max Stops after max is reached.  Allows for forEach to be called on infinite enumerations.
 * @returns {any}
 */
function toArray(source, max = Infinity) {
    if (source === STRING_EMPTY)
        return [];
    if (!isFinite(max) && (source) instanceof (Array))
        return source.slice();
    const result = initArrayFrom(source, max);
    if (-1 === forEach(source, (e, i) => { result[i] = e; }, max))
        throw new __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__["a" /* UnsupportedEnumerableException */]();
    return result;
}
/**
 * Converts any enumerable to an array of selected values.
 * @param source
 * @param selector
 * @param max Stops after max is reached.  Allows for forEach to be called on infinite enumerations.
 * @returns {TResult[]}
 */
function map(source, selector, max = Infinity) {
    if (source === STRING_EMPTY)
        return [];
    if (!isFinite(max) && (source) instanceof (Array))
        return source.map(selector);
    const result = initArrayFrom(source, max);
    if (-1 === forEach(source, (e, i) => { result[i] = selector(e, i); }, max))
        throw new __WEBPACK_IMPORTED_MODULE_4__UnsupportedEnumerableException__["a" /* UnsupportedEnumerableException */]();
    return result;
}
//# sourceMappingURL=Enumerator.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dispose;
/* harmony export (immutable) */ __webpack_exports__["b"] = using;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

/**
 * Takes any number of disposables as arguments and attempts to dispose them.
 * Any exceptions thrown within a dispose are not trapped.
 * Use 'disposeWithoutException' to automatically trap exceptions.
 *
 * Can accept <any> and will ignore objects that don't have a dispose() method.
 * @param disposables
 */
function dispose(...disposables) {
    // The disposables arguments array is effectively localized so it's safe.
    disposeTheseInternal(disposables, false);
}
(function (dispose) {
    /**
     * Use this when only disposing one object to avoid creation of arrays.
     * @param disposable
     * @param trapExceptions
     */
    function single(disposable, trapExceptions = false) {
        if (disposable)
            disposeSingle(disposable, trapExceptions);
    }
    dispose.single = single;
    function deferred(...disposables) {
        these.deferred(disposables);
    }
    dispose.deferred = deferred;
    /**
     * Takes any number of disposables and traps any errors that occur when disposing.
     * Returns an array of the exceptions thrown.
     * @param disposables
     * @returns {any[]} Returns an array of exceptions that occurred, if there are any.
     */
    function withoutException(...disposables) {
        // The disposables arguments array is effectively localized so it's safe.
        return disposeTheseInternal(disposables, true);
    }
    dispose.withoutException = withoutException;
    /**
     * Takes an array of disposable objects and ensures they are disposed.
     * @param disposables
     * @param trapExceptions If true, prevents exceptions from being thrown when disposing.
     * @returns {any[]} If 'trapExceptions' is true, returns an array of exceptions that occurred, if there are any.
     */
    function these(disposables, trapExceptions) {
        return disposables && disposables.length
            ? disposeTheseInternal(disposables.slice(), trapExceptions)
            : void 0;
    }
    dispose.these = these;
    (function (these) {
        function deferred(disposables, delay = 0) {
            if (disposables && disposables.length) {
                if (!(delay >= 0))
                    delay = 0;
                setTimeout(disposeTheseInternal, delay, disposables.slice(), true);
            }
        }
        these.deferred = deferred;
        /**
         * Use this unsafe method when guaranteed not to cause events that will make modifications to the disposables array.
         * @param disposables
         * @param trapExceptions
         * @returns {any[]}
         */
        function noCopy(disposables, trapExceptions) {
            return disposables && disposables.length
                ? disposeTheseInternal(disposables, trapExceptions)
                : void 0;
        }
        these.noCopy = noCopy;
    })(these = dispose.these || (dispose.these = {}));
})(dispose || (dispose = {}));
/**
 * Just like in C# this 'using' function will ensure the passed disposable is disposed when the closure has finished.
 *
 * Usage:
 * ```typescript
 * using(new DisposableObject(),(myObj)=>{
     *   // do work with myObj
     * });
 * // myObj automatically has it's dispose method called.
 * ```
 *
 * @param disposable Object to be disposed.
 * @param closure Function call to execute.
 * @returns {TReturn} Returns whatever the closure's return value is.
 */
function using(disposable, closure) {
    try {
        return closure(disposable);
    }
    finally {
        disposeSingle(disposable, false);
    }
}
/**
 * This private function makes disposing more robust for when there's no type checking.
 * If trapExceptions is 'true' it catches and returns any exception instead of throwing.
 */
function disposeSingle(disposable, trapExceptions) {
    if (disposable
        && typeof disposable == __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].OBJECT
        && typeof disposable['dispose'] == "function") {
        if (trapExceptions) {
            try {
                disposable.dispose();
            }
            catch (ex) {
                return ex;
            }
        }
        else
            disposable.dispose();
    }
    return null;
}
/**
 * This dispose method assumes it's working on a local arrayCopy and is unsafe for external use.
 */
function disposeTheseInternal(disposables, trapExceptions, index = 0) {
    let exceptions;
    const len = disposables ? disposables.length : 0;
    for (; index < len; index++) {
        let next = disposables[index];
        if (!next)
            continue;
        if (trapExceptions) {
            const ex = disposeSingle(next, true);
            if (ex) {
                if (!exceptions)
                    exceptions = [];
                exceptions.push(ex);
            }
        }
        else {
            let success = false;
            try {
                disposeSingle(next, false);
                success = true;
            }
            finally {
                if (!success && index + 1 < len) {
                    /* If code is 'continued' by the debugger,
                     * need to ensure the rest of the disposables are cared for. */
                    disposeTheseInternal(disposables, false, index + 1);
                }
            }
            // Just in case...  Should never happen, but asserts the intention.
            if (!success)
                break;
        }
    }
    return exceptions;
}
/* unused harmony default export */ var _unused_webpack_default_export = (dispose);
//# sourceMappingURL=dispose.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EnumeratorBase__ = __webpack_require__(5);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

class IndexEnumerator extends __WEBPACK_IMPORTED_MODULE_0__EnumeratorBase__["a" /* EnumeratorBase */] {
    constructor(sourceFactory) {
        let source;
        super(() => {
            source = sourceFactory();
            if (source && source.source) {
                const len = source.length;
                if (len < 0)
                    throw new Error("length must be zero or greater");
                if (!isFinite(len))
                    throw new Error("length must finite number");
                if (len && source.step === 0)
                    throw new Error("Invalid IndexEnumerator step value (0).");
                let pointer = source.pointer;
                if (!pointer)
                    pointer = 0;
                else if (pointer != Math.floor(pointer))
                    throw new Error("Invalid IndexEnumerator pointer value (" + pointer + ") has decimal.");
                source.pointer = pointer;
                let step = source.step;
                if (!step)
                    step = 1;
                else if (step != Math.floor(step))
                    throw new Error("Invalid IndexEnumerator step value (" + step + ") has decimal.");
                source.step = step;
            }
        }, (yielder) => {
            let len = (source && source.source) ? source.length : 0;
            if (!len || isNaN(len))
                return yielder.yieldBreak();
            const current = source.pointer;
            if (source.pointer == null)
                source.pointer = 0; // should never happen but is in place to negate compiler warnings.
            if (!source.step)
                source.step = 1; // should never happen but is in place to negate compiler warnings.
            source.pointer = source.pointer + source.step;
            return (current < len && current >= 0)
                ? yielder.yieldReturn(source.source[current])
                : yielder.yieldBreak();
        }, () => {
            if (source) {
                source.source = null;
            }
        });
        this._isEndless = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IndexEnumerator;

/* unused harmony default export */ var _unused_webpack_default_export = (IndexEnumerator);
//# sourceMappingURL=IndexEnumerator.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
const VOID0 = void 0;
class IteratorResult {
    constructor(value, index, done = false) {
        this.value = value;
        if (typeof index == 'boolean')
            this.done = index;
        else {
            this.index = index;
            this.done = done;
        }
        Object.freeze(this);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IteratorResult;

(function (IteratorResult) {
    IteratorResult.Done = new IteratorResult(VOID0, VOID0, true);
    function GetDone() { return IteratorResult.Done; }
    IteratorResult.GetDone = GetDone;
})(IteratorResult || (IteratorResult = {}));
Object.freeze(IteratorResult);
/* unused harmony default export */ var _unused_webpack_default_export = (IteratorResult);
//# sourceMappingURL=IteratorResult.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
/**
 * Can be used statically or extended for varying different reusable function signatures.
 */
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */ class Functions {
    //noinspection JSMethodCanBeStatic
    /**
     * A typed method for use with simple selection of the parameter.
     * @returns {T}
     */
    Identity(x) { return x; }
    //noinspection JSMethodCanBeStatic
    /**
     * Returns true.
     * @returns {boolean}
     */
    True() { return true; }
    //noinspection JSMethodCanBeStatic
    /**
     * Returns false.
     * @returns {boolean}
     */
    False() { return false; }
    /**
     * Does nothing.
     */
    Blank() { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Functions;

const rootFunctions = new Functions();
// Expose static versions.
(function (Functions) {
    /**
     * A typed method for use with simple selection of the parameter.
     * @returns {boolean}
     */
    Functions.Identity = rootFunctions.Identity;
    /**
     * Returns false.
     * @returns {boolean}
     */
    Functions.True = rootFunctions.True;
    /**
     * Returns false.
     * @returns {boolean}
     */
    Functions.False = rootFunctions.False;
    /**
     * Does nothing.
     */
    Functions.Blank = rootFunctions.Blank;
})(Functions || (Functions = {}));
// Make this read only.  Should still allow for sub-classing since extra methods are added to prototype.
Object.freeze(Functions);
/* unused harmony default export */ var _unused_webpack_default_export = (Functions);
//# sourceMappingURL=Functions.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Enumeration_Enumerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Disposable_DisposableBase__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Environment__ = __webpack_require__(49);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */






//noinspection JSUnusedLocalSymbols
//noinspection SpellCheckingInspection
const NAME = "CollectionBase", CMDC = "Cannot modify a disposed collection.", CMRO = "Cannot modify a read-only collection.";
const LINQ_PATH = "../../System.Linq/Linq";
class CollectionBase extends __WEBPACK_IMPORTED_MODULE_4__Disposable_DisposableBase__["a" /* DisposableBase */] {
    constructor(source, _equalityComparer = __WEBPACK_IMPORTED_MODULE_1__Compare__["a" /* areEqual */]) {
        super();
        this._equalityComparer = _equalityComparer;
        const _ = this;
        _._disposableObjectName = NAME;
        _._importEntries(source);
        _._updateRecursion = 0;
        _._modifiedCount = 0;
        _._version = 0;
    }
    get count() {
        return this.getCount();
    }
    getIsReadOnly() {
        return false;
    }
    //noinspection JSUnusedGlobalSymbols
    get isReadOnly() {
        return this.getIsReadOnly();
    }
    assertModifiable() {
        this.throwIfDisposed(CMDC);
        if (this.getIsReadOnly())
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_InvalidOperationException__["InvalidOperationException"](CMRO);
        return true;
    }
    assertVersion(version) {
        if (version !== this._version)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_InvalidOperationException__["InvalidOperationException"]("Collection was modified.");
        return true;
    }
    _onModified() { }
    _signalModification(increment) {
        const _ = this;
        if (increment)
            _._modifiedCount++;
        if (_._modifiedCount && !this._updateRecursion) {
            _._modifiedCount = 0;
            _._version++;
            try {
                _._onModified();
            }
            catch (ex) {
                // Avoid fatal errors which may have been caused by consumer.
                console.error(ex);
            }
            return true;
        }
        return false;
    }
    _incrementModified() { this._modifiedCount++; }
    //noinspection JSUnusedGlobalSymbols
    get isUpdating() { return this._updateRecursion != 0; }
    /**
     * Takes a closure that if returning true will propagate an update signal.
     * Multiple update operations can be occurring at once or recursively and the onModified signal will only occur once they're done.
     * @param closure
     * @returns {boolean}
     */
    handleUpdate(closure) {
        if (!closure)
            return false;
        const _ = this;
        _.assertModifiable();
        _._updateRecursion++;
        let updated = false;
        try {
            if (updated = closure())
                _._modifiedCount++;
        }
        finally {
            _._updateRecursion--;
        }
        _._signalModification();
        return updated;
    }
    /*
     * Note: for a slight amount more code, we avoid creating functions/closures.
     * Calling handleUpdate is the correct pattern, but if possible avoid creating another function scope.
     */
    /**
     * Adds an entry to the collection.
     * @param entry
     */
    add(entry) {
        const _ = this;
        _.assertModifiable();
        _._updateRecursion++;
        try {
            if (_._addInternal(entry))
                _._modifiedCount++;
        }
        finally {
            _._updateRecursion--;
        }
        _._signalModification();
        return _;
    }
    /**
     * Removes entries from the collection allowing for a limit.
     * For example if the collection not a distinct set, more than one entry could be removed.
     * @param entry The entry to remove.
     * @param max Limit of entries to remove.  Will remove all matches if no max specified.
     * @returns {number} The number of entries removed.
     */
    remove(entry, max = Infinity) {
        const _ = this;
        _.assertModifiable();
        _._updateRecursion++;
        let n = NaN;
        try {
            if (n = _._removeInternal(entry, max))
                _._modifiedCount++;
        }
        finally {
            _._updateRecursion--;
        }
        _._signalModification();
        return n;
    }
    /**
     * Clears the contents of the collection resulting in a count of zero.
     * @returns {number}
     */
    clear() {
        const _ = this;
        _.assertModifiable();
        _._updateRecursion++;
        let n = NaN;
        try {
            if (n = _._clearInternal())
                _._modifiedCount++;
        }
        finally {
            _._updateRecursion--;
        }
        _._signalModification();
        return n;
    }
    _onDispose() {
        super._onDispose();
        this._clearInternal();
        this._version = 0;
        this._updateRecursion = 0;
        this._modifiedCount = 0;
        const l = this._linq;
        this._linq = void 0;
        if (l)
            l.dispose();
    }
    _importEntries(entries) {
        let added = 0;
        if (entries) {
            if ((entries) instanceof (Array)) {
                // Optimize for avoiding a new closure.
                for (let e of entries) {
                    if (this._addInternal(e))
                        added++;
                }
            }
            else {
                Object(__WEBPACK_IMPORTED_MODULE_0__Enumeration_Enumerator__["a" /* forEach */])(entries, e => {
                    if (this._addInternal(e))
                        added++;
                });
            }
        }
        return added;
    }
    /**
     * Safely imports any array enumerator, or enumerable.
     * @param entries
     * @returns {number}
     */
    importEntries(entries) {
        const _ = this;
        if (!entries)
            return 0;
        _.assertModifiable();
        _._updateRecursion++;
        let n = NaN;
        try {
            if (n = _._importEntries(entries))
                _._modifiedCount++;
        }
        finally {
            _._updateRecursion--;
        }
        _._signalModification();
        return n;
    }
    /**
     * Returns an array filtered by the provided predicate.
     * Provided for similarity to JS Array.
     * @param predicate
     * @returns {[]}
     */
    filter(predicate) {
        if (!predicate)
            throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('predicate');
        let count = !this.getCount();
        let result = [];
        if (count) {
            this.forEach((e, i) => {
                if (predicate(e, i))
                    result.push(e);
            });
        }
        return result;
    }
    /**
     * Returns true the first time predicate returns true.  Otherwise false.
     * Useful for searching through a collection.
     * @param predicate
     * @returns {any}
     */
    any(predicate) {
        let count = this.getCount();
        if (!count)
            return false;
        if (!predicate)
            return Boolean(count);
        let found = false;
        this.forEach((e, i) => !(found = predicate(e, i)));
        return found;
    }
    /**
     * Returns true the first time predicate returns true.  Otherwise false.
     * See '.any(predicate)'.  As this method is just just included to have similarity with a JS Array.
     * @param predicate
     * @returns {any}
     */
    some(predicate) {
        return this.any(predicate);
    }
    /**
     * Returns true if the equality comparer resolves true on any element in the collection.
     * @param entry
     * @returns {boolean}
     */
    contains(entry) {
        const equals = this._equalityComparer;
        return this.any(e => equals(entry, e));
    }
    forEach(action, useCopy) {
        if (this.wasDisposed)
            return 0;
        if (useCopy) {
            const a = this.toArray();
            try {
                return Object(__WEBPACK_IMPORTED_MODULE_0__Enumeration_Enumerator__["a" /* forEach */])(a, action);
            }
            finally {
                a.length = 0;
            }
        }
        else {
            return Object(__WEBPACK_IMPORTED_MODULE_0__Enumeration_Enumerator__["a" /* forEach */])(this.getEnumerator(), action);
        }
    }
    /**
     * Copies all values to numerically indexable object.
     * @param target
     * @param index
     * @returns {TTarget}
     */
    copyTo(target, index = 0) {
        if (!target)
            throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('target');
        const count = this.getCount();
        if (count) {
            const newLength = count + index;
            if (target.length < newLength)
                target.length = newLength;
            const e = this.getEnumerator();
            while (e.moveNext()) {
                target[index++] = e.current;
            }
        }
        return target;
    }
    /**
     * Returns an array of the collection contents.
     * @returns {any[]|Array}
     */
    toArray() {
        const count = this.getCount();
        return count
            ? this.copyTo(count > 65536 ? new Array(count) : [])
            : [];
    }
    /**
     * .linq will return an ILinqEnumerable if .linqAsync() has completed successfully or the default module loader is NodeJS+CommonJS.
     * @returns {ILinqEnumerable}
     */
    get linq() {
        this.throwIfDisposed();
        let e = this._linq;
        if (!e) {
            let r;
            try {
                r = eval('require');
            }
            catch (ex) { }
            this._linq = e = r && r(LINQ_PATH).default.from(this);
            if (!e) {
                throw __WEBPACK_IMPORTED_MODULE_5__Environment__["c" /* isRequireJS */]
                    ? `using .linq to load and initialize a ILinqEnumerable is currently only supported within a NodeJS environment.
Import System.Linq/Linq and use Enumerable.from(e) instead.
You can also preload the Linq module as a dependency or use .linqAsync(callback) for AMD/RequireJS.`
                    : "There was a problem importing System.Linq/Linq";
            }
        }
        return e;
    }
    /**
     * .linqAsync() is for use with deferred loading.
     * Ensures an instance of the Linq extensions is available and then passes it to the callback.
     * Returns an ILinqEnumerable if one is already available, otherwise undefined.
     * Passing no parameters will still initiate loading and initializing the ILinqEnumerable which can be useful for pre-loading.
     * Any call to .linqAsync() where an ILinqEnumerable is returned can be assured that any subsequent calls to .linq will return the same instance.
     * @param callback
     * @returns {ILinqEnumerable}
     */
    linqAsync(callback) {
        this.throwIfDisposed();
        let e = this._linq;
        if (!e) {
            if (__WEBPACK_IMPORTED_MODULE_5__Environment__["c" /* isRequireJS */]) {
                eval("require")([LINQ_PATH], (linq) => {
                    // Could end up being called more than once, be sure to check for ._linq before setting...
                    e = this._linq;
                    if (!e)
                        this._linq = e = linq.default.from(this);
                    if (!e)
                        throw "There was a problem importing System.Linq/Linq";
                    if (callback)
                        callback(e);
                    callback = void 0; // In case this is return synchronously..
                });
            }
            else if (__WEBPACK_IMPORTED_MODULE_5__Environment__["b" /* isNodeJS */] && __WEBPACK_IMPORTED_MODULE_5__Environment__["a" /* isCommonJS */]) {
                e = this.linq;
            }
            else {
                throw "Cannot find a compatible loader for importing System.Linq/Linq";
            }
        }
        if (e && callback)
            callback(e);
        return e;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CollectionBase;

//# sourceMappingURL=CollectionBase.js.map

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = copy;
/* harmony export (immutable) */ __webpack_exports__["b"] = copyTo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__initialize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */



/**
 *
 * @param source
 * @param sourceIndex
 * @param length
 * @returns {any}
 */
function copy(source, sourceIndex = 0, length = Infinity) {
    if (!source)
        return source; // may have passed zero? undefined? or null?
    return copyTo(source, Object(__WEBPACK_IMPORTED_MODULE_0__initialize__["a" /* initialize */])(Math.min(length, Math.max(source.length - sourceIndex, 0))), sourceIndex, 0, length);
}
const CBN = 'Cannot be null.', CBL0 = 'Cannot be less than zero.';
/**
 * Copies one array to another.
 * @param source
 * @param destination
 * @param sourceIndex
 * @param destinationIndex
 * @param length An optional limit to stop copying.
 * @returns The destination array.
 */
function copyTo(source, destination, sourceIndex = 0, destinationIndex = 0, length = Infinity) {
    if (!source)
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('source', CBN);
    if (!destination)
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('destination', CBN);
    if (sourceIndex < 0)
        throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('sourceIndex', sourceIndex, CBL0);
    let sourceLength = source.length;
    if (!sourceLength)
        return destination;
    if (sourceIndex >= sourceLength)
        throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('sourceIndex', sourceIndex, 'Must be less than the length of the source array.');
    if (destination.length < 0)
        throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('destinationIndex', destinationIndex, CBL0);
    const maxLength = source.length - sourceIndex;
    if (isFinite(length) && length > maxLength)
        throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('sourceIndex', sourceIndex, 'Source index + length cannot exceed the length of the source array.');
    length = Math.min(length, maxLength);
    const newLength = destinationIndex + length;
    if (newLength > destination.length)
        destination.length = newLength;
    for (let i = 0; i < length; i++) {
        destination[destinationIndex + i] = source[sourceIndex + i];
    }
    return destination;
}
//# sourceMappingURL=copy.js.map

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getHashCode */
/* unused harmony export repeat */
/* unused harmony export fromChars */
/* unused harmony export escapeRegExp */
/* harmony export (immutable) */ __webpack_exports__["b"] = trim;
/* harmony export (immutable) */ __webpack_exports__["a"] = format;
/* unused harmony export supplant */
/* unused harmony export startsWith */
/* unused harmony export endsWith */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

const EMPTY = '';
/* unused harmony export EMPTY */

/**
 * Returns a numerical (integer) hash code of the string.  Can be used for identifying inequality of contents, but two different strings in rare cases will have the same hash code.
 * @param source
 * @returns {number}
 */
function getHashCode(source) {
    let hash = 0 | 0;
    if (source.length == 0)
        return hash;
    for (let i = 0, l = source.length; i < l; i++) {
        let ch = source.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
function repeat(source, count) {
    let result = EMPTY;
    if (!isNaN(count)) {
        for (let i = 0; i < count; i++) {
            result += source;
        }
    }
    return result;
}
function fromChars(chOrChars, count = 1) {
    if ((chOrChars) instanceof (Array)) {
        let result = EMPTY;
        for (let char of chOrChars) {
            result += String.fromCharCode(char);
        }
        return result;
    }
    else {
        return repeat(String.fromCharCode(chOrChars), count);
    }
}
/**
 * Escapes a RegExp sequence.
 * @param source
 * @returns {string}
 */
function escapeRegExp(source) {
    return source.replace(/[-[\]\/{}()*+?.\\^$|]/g, "\\$&");
}
/**
 * Can trim any character or set of characters from the ends of a string.
 * Uses a Regex escapement to replace them with empty.
 * @param source
 * @param chars A string or array of characters desired to be trimmed.
 * @param ignoreCase
 * @returns {string}
 */
function trim(source, chars, ignoreCase) {
    if (chars === EMPTY)
        return source;
    if (chars) {
        const escaped = escapeRegExp((chars) instanceof (Array) ? chars.join() : chars);
        return source.replace(new RegExp('^[' + escaped + ']+|[' + escaped + ']+$', 'g' + (ignoreCase
            ? 'i'
            : '')), EMPTY);
    }
    return source.replace(/^\s+|\s+$/g, EMPTY);
}
/**
 * Takes any arg
 * @param source
 * @param args
 * @returns {string}
 */
function format(source, ...args) {
    return supplant(source, args);
}
//
/**
 * This takes a string and replaces '{string}' with the respected parameter.
 * Also allows for passing an array in order to use '{n}' notation.
 * Not limited to an array's indexes.  For example, {length} is allowed.
 * Based upon Crockford's supplant function.
 * @param source
 * @param params
 * @returns {string}
 */
function supplant(source, params) {
    const oIsArray = (params) instanceof (Array);
    return source.replace(/{([^{}]*)}/g, (a, b) => {
        let n = b;
        if (oIsArray) {
            let i = parseInt(b);
            if (!isNaN(i))
                n = i;
        }
        let r = params[n];
        switch (typeof r) {
            case __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].STRING:
            case __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].NUMBER:
            case __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].BOOLEAN:
                return r;
            default:
                return (r && __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].hasMemberOfType(r, "toString", __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].FUNCTION))
                    ? r.toString()
                    : a;
        }
    });
}
function canMatch(source, match) {
    if (!__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isString(source) || !match)
        return false;
    if (source === match)
        return true;
    if (match.length < source.length)
        return null;
}
/**
 * Returns true if the pattern matches the beginning of the source.
 * @param source
 * @param pattern
 * @returns {boolean}
 */
function startsWith(source, pattern) {
    const m = canMatch(source, pattern);
    return __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isBoolean(m) ? m : source.indexOf(pattern) == 0;
}
/**
 * Returns true if the pattern matches the end of the source.
 * @param source
 * @param pattern
 * @returns {boolean}
 */
function endsWith(source, pattern) {
    const m = canMatch(source, pattern);
    return __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isBoolean(m) ? m : source.lastIndexOf(pattern) == (source.length - pattern.length);
}
//# sourceMappingURL=Utility.js.map

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IndexEnumerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


// noinspection JSUnusedLocalSymbols
class ArrayEnumerator extends __WEBPACK_IMPORTED_MODULE_0__IndexEnumerator__["a" /* IndexEnumerator */] {
    constructor(arrayOrFactory, start = 0, step = 1) {
        super(() => {
            const array = __WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isFunction(arrayOrFactory) ? arrayOrFactory() : arrayOrFactory;
            return {
                source: array,
                pointer: start,
                length: array ? array.length : 0,
                step: step
            };
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ArrayEnumerator;

/* unused harmony default export */ var _unused_webpack_default_export = (ArrayEnumerator);
//# sourceMappingURL=ArrayEnumerator.js.map

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'ObjectDisposedException';
class ObjectDisposedException extends __WEBPACK_IMPORTED_MODULE_0__Exceptions_InvalidOperationException__["InvalidOperationException"] {
    // For simplicity and consistency, lets stick with 1 signature.
    constructor(objectName, message, innerException) {
        super(message || '', innerException, (_) => {
            _.objectName = objectName;
        });
    }
    getName() {
        return NAME;
    }
    toString() {
        const _ = this;
        let oName = _.objectName;
        oName = oName ? ('{' + oName + '} ') : '';
        return '[' + _.name + ': ' + oName + _.message + ']';
    }
    static throwIfDisposed(disposable, objectName, message) {
        if (disposable.wasDisposed)
            throw new ObjectDisposedException(objectName, message);
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectDisposedException;

/* unused harmony default export */ var _unused_webpack_default_export = (ObjectDisposedException);
//# sourceMappingURL=ObjectDisposedException.js.map

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispose__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DisposableBase__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentException__ = __webpack_require__(3);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon ObjectPool from Parallel Extension Extras and other ObjectPool implementations.
 * Uses .add(T) and .take():T
 */





// noinspection JSUnusedLocalSymbols
const OBJECT_POOL = "ObjectPool", _MAX_SIZE = "_maxSize", ABSOLUTE_MAX_SIZE = 65536, MUST_BE_GT1 = "Must be at valid number least 1.", MUST_BE_LTM = `Must be less than or equal to ${ABSOLUTE_MAX_SIZE}.`;
class ObjectPool extends __WEBPACK_IMPORTED_MODULE_1__DisposableBase__["a" /* DisposableBase */] {
    constructor(_maxSize, _generator, _recycler) {
        super();
        this._maxSize = _maxSize;
        this._generator = _generator;
        this._recycler = _recycler;
        /**
         * By default will clear after 5 seconds of non-use.
         */
        this.autoClearTimeout = 5000;
        if (isNaN(_maxSize) || _maxSize < 1)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */](_MAX_SIZE, _maxSize, MUST_BE_GT1);
        if (_maxSize > ABSOLUTE_MAX_SIZE)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */](_MAX_SIZE, _maxSize, MUST_BE_LTM);
        this._localAbsMaxSize = Math.min(_maxSize * 2, ABSOLUTE_MAX_SIZE);
        const _ = this;
        _._disposableObjectName = OBJECT_POOL;
        _._pool = [];
        _._trimmer = new __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__["a" /* TaskHandler */](() => _._trim());
        const clear = () => _._clear();
        _._flusher = new __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__["a" /* TaskHandler */](clear);
        _._autoFlusher = new __WEBPACK_IMPORTED_MODULE_2__Threading_Tasks_TaskHandler__["a" /* TaskHandler */](clear);
    }
    /**
     * Defines the maximum at which trimming should allow.
     * @returns {number}
     */
    get maxSize() {
        return this._maxSize;
    }
    /**
     * Current number of objects in pool.
     * @returns {number}
     */
    get count() {
        const p = this._pool;
        return p ? p.length : 0;
    }
    _trim() {
        const pool = this._pool;
        while (pool.length > this._maxSize) {
            __WEBPACK_IMPORTED_MODULE_0__dispose__["a" /* dispose */].single(pool.pop(), true);
        }
    }
    /**
     * Will trim ensure the pool is less than the maxSize.
     * @param defer A delay before trimming.  Will be overridden by later calls.
     */
    trim(defer) {
        this.throwIfDisposed();
        this._trimmer.start(defer);
    }
    _clear() {
        const _ = this;
        const p = _._pool;
        _._trimmer.cancel();
        _._flusher.cancel();
        _._autoFlusher.cancel();
        __WEBPACK_IMPORTED_MODULE_0__dispose__["a" /* dispose */].these.noCopy(p, true);
        p.length = 0;
    }
    /**
     * Will clear out the pool.
     * Cancels any scheduled trims when executed.
     * @param defer A delay before clearing.  Will be overridden by later calls.
     */
    clear(defer) {
        this.throwIfDisposed();
        this._flusher.start(defer);
    }
    toArrayAndClear() {
        const _ = this;
        _.throwIfDisposed();
        _._trimmer.cancel();
        _._flusher.cancel();
        const p = _._pool;
        _._pool = [];
        return p;
    }
    /**
     * Shortcut for toArrayAndClear();
     */
    dump() {
        return this.toArrayAndClear();
    }
    _onDispose() {
        super._onDispose();
        const _ = this;
        _._generator = null;
        _._recycler = null;
        Object(__WEBPACK_IMPORTED_MODULE_0__dispose__["a" /* dispose */])(_._trimmer, _._flusher, _._autoFlusher);
        _._trimmer = null;
        _._flusher = null;
        _._autoFlusher = null;
        _._pool.length = 0;
        _._pool = null;
    }
    extendAutoClear() {
        const _ = this;
        _.throwIfDisposed();
        const t = _.autoClearTimeout;
        if (isFinite(t) && !_._autoFlusher.isScheduled)
            _._autoFlusher.start(t);
    }
    add(o) {
        const _ = this;
        _.throwIfDisposed();
        if (_._pool.length >= _._localAbsMaxSize) {
            // Getting too big, dispose immediately...
            Object(__WEBPACK_IMPORTED_MODULE_0__dispose__["a" /* dispose */])(o);
        }
        else {
            if (_._recycler)
                _._recycler(o);
            _._pool.push(o);
            const m = _._maxSize;
            if (m < ABSOLUTE_MAX_SIZE && _._pool.length > m)
                _._trimmer.start(500);
        }
        _.extendAutoClear();
    }
    _onTaken() {
        const _ = this, len = _._pool.length;
        if (len <= _._maxSize)
            _._trimmer.cancel();
        if (len)
            _.extendAutoClear();
    }
    tryTake() {
        const _ = this;
        _.throwIfDisposed();
        try {
            return _._pool.pop();
        }
        finally {
            _._onTaken();
        }
    }
    take(factory) {
        const _ = this;
        _.throwIfDisposed();
        if (!_._generator && !factory)
            throw new __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentException__["a" /* ArgumentException */]('factory', "Must provide a factory if on was not provided at construction time.");
        try {
            return _._pool.pop() || factory && factory() || _._generator();
        }
        finally {
            _._onTaken();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectPool;

/* unused harmony default export */ var _unused_webpack_default_export = (ObjectPool);
//# sourceMappingURL=ObjectPool.js.map

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__ = __webpack_require__(8);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'UnsupportedEnumerableException';
class UnsupportedEnumerableException extends __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__["a" /* SystemException */] {
    constructor(message) {
        super(message || "Unsupported enumerable.");
    }
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UnsupportedEnumerableException;

/* unused harmony default export */ var _unused_webpack_default_export = (UnsupportedEnumerableException);
//# sourceMappingURL=UnsupportedEnumerableException.js.map

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__ = __webpack_require__(28);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

/**
 * A simplified stripped down enumerator that until disposed will infinitely return the provided factory.
 * This is analogous to a 'generator' and has a compatible interface.
 */
class InfiniteEnumerator extends __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__["a" /* SimpleEnumerableBase */] {
    /**
     * See InfiniteValueFactory
     * @param _factory
     */
    constructor(_factory) {
        super();
        this._factory = _factory;
    }
    _canMoveNext() {
        return this._factory != null;
    }
    moveNext() {
        const _ = this;
        const f = _._factory;
        if (f) {
            _._current = f(_._current, _.incrementIndex());
            return true;
        }
        return false;
    }
    dispose() {
        super.dispose();
        this._factory = null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InfiniteEnumerator;

/* unused harmony default export */ var _unused_webpack_default_export = (InfiniteEnumerator);
//# sourceMappingURL=InfiniteEnumerator.js.map

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IteratorResult__ = __webpack_require__(15);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

const VOID0 = void 0;
class SimpleEnumerableBase {
    constructor() {
        this.reset();
    }
    get current() {
        return this._current;
    }
    get canMoveNext() {
        return this._canMoveNext();
    }
    tryMoveNext(out) {
        if (this.moveNext()) {
            out(this._current);
            return true;
        }
        return false;
    }
    incrementIndex() {
        let i = this._index;
        this._index = i = isNaN(i) ? 0 : (i + 1);
        return i;
    }
    nextValue() {
        this.moveNext();
        return this._current;
    }
    next() {
        return this.moveNext()
            ? new __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */](this._current, this._index)
            : __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */].Done;
    }
    end() {
        this.dispose();
    }
    'return'(value) {
        try {
            return value !== VOID0 && this._canMoveNext()
                ? new __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */](value, VOID0, true)
                : __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */].Done;
        }
        finally {
            this.dispose();
        }
    }
    reset() {
        this._current = VOID0;
        this._index = NaN;
    }
    dispose() {
        this.reset();
    }
    getIsEndless() {
        return this._canMoveNext();
    }
    get isEndless() {
        return this.getIsEndless();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SimpleEnumerableBase;

/* unused harmony default export */ var _unused_webpack_default_export = (SimpleEnumerableBase);
//# sourceMappingURL=SimpleEnumerableBase.js.map

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IteratorResult__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Functions__ = __webpack_require__(16);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


const VOID0 = void 0;
/**
 * A simplified stripped down enumerable that is always complete and has no results.
 * Frozen and exported as 'empty' to allow for reuse.
 */
const EmptyEnumerator = Object.freeze({
    current: VOID0,
    moveNext: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].False,
    tryMoveNext: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].False,
    nextValue: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].Blank,
    next: __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */].GetDone,
    "return": __WEBPACK_IMPORTED_MODULE_0__IteratorResult__["a" /* IteratorResult */].GetDone,
    end: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].Blank,
    reset: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].Blank,
    dispose: __WEBPACK_IMPORTED_MODULE_1__Functions__["a" /* Functions */].Blank,
    isEndless: false
});
/* harmony export (immutable) */ __webpack_exports__["a"] = EmptyEnumerator;

/* unused harmony default export */ var _unused_webpack_default_export = (EmptyEnumerator);
//# sourceMappingURL=EmptyEnumerator.js.map

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__ = __webpack_require__(28);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

// noinspection JSUnusedLocalSymbols
/**
 * A simplified stripped down enumerator that until disposed will infinitely return the provided factory.
 * This is analogous to a 'generator' and has a compatible interface.
 *
 *
 */
class IteratorEnumerator extends __WEBPACK_IMPORTED_MODULE_0__SimpleEnumerableBase__["a" /* SimpleEnumerableBase */] {
    /**
     * @param _iterator
     * @param _isEndless true and false are explicit where as undefined means 'unknown'.
     */
    constructor(_iterator, _isEndless) {
        super();
        this._iterator = _iterator;
        this._isEndless = _isEndless;
    }
    _canMoveNext() {
        return this._iterator != null;
    }
    moveNext(value) {
        const _ = this;
        const i = _._iterator;
        if (i) {
            const r = arguments.length ? i.next(value) : i.next();
            _._current = r.value;
            if (r.done)
                _.dispose();
            else
                return true;
        }
        return false;
    }
    dispose() {
        super.dispose();
        this._iterator = null;
    }
    getIsEndless() {
        return Boolean(this._isEndless) && super.getIsEndless();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IteratorEnumerator;

/* unused harmony default export */ var _unused_webpack_default_export = (IteratorEnumerator);
//# sourceMappingURL=IteratorEnumerator.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


String.prototype.normalizeNewLine = function () {
    return this.replace(/\r?\n/g, '\r\n');
};

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["Enumerable"] = Enumerable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__System_Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__System_Collections_Array_copy__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__System_Collections_Array_Compare__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__System_Collections_Enumeration_EmptyEnumerator__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__System_Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__System_Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__System_Functions__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__System_Disposable_DisposableBase__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__System_Collections_Enumeration_UnsupportedEnumerableException__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__System_Disposable_ObjectDisposedException__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__System_Collections_Sorting_KeySortedContext__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__System_Collections_Enumeration_IndexEnumerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__System_Collections_Enumeration_IteratorEnumerator__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__System_Collections_Array_initialize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__System_Random__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__System_Collections_Enumeration_InfiniteEnumerator__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__System_Collections_LazyList__ = __webpack_require__(60);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


























var disposeSingle = __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["a" /* dispose */].single;
// noinspection JSUnusedLocalSymbols
// #region Local Constants.
const INVALID_DEFAULT = {}; // create a private unique instance for referencing.
const VOID0 = void 0;
const NULL = null;
function BREAK() {
    return 0 /* Break */;
}
function RETURN() {
    return 1 /* Return */;
}
function isNotNullOrUndefined(e) {
    return e != null;
}
// Leave internal to avoid accidental overwriting.
class LinqFunctions extends __WEBPACK_IMPORTED_MODULE_7__System_Functions__["a" /* Functions */] {
    // noinspection JSMethodCanBeStatic
    Greater(a, b) {
        return a > b ? a : b;
    }
    // noinspection JSMethodCanBeStatic
    Lesser(a, b) {
        return a < b ? a : b;
    }
}
const Functions = Object.freeze(new LinqFunctions());
// For re-use as a factory.
function getEmptyEnumerator() {
    return __WEBPACK_IMPORTED_MODULE_4__System_Collections_Enumeration_EmptyEnumerator__["a" /* EmptyEnumerator */];
}
// #endregion
/*
 * NOTE: About InfiniteEnumerable<T> and Enumerable<T>.
 * There may seem like there's extra overrides here and they may seem unnecessary.
 * But after closer inspection you'll see the type chain is retained and
 * infinite enumerables are prevented from having features that finite ones have.
 *
 * I'm not sure if it's the best option to just use overrides, but it honors the typing properly.
 */
class InfiniteLinqEnumerable extends __WEBPACK_IMPORTED_MODULE_13__System_Disposable_DisposableBase__["a" /* DisposableBase */] {
    constructor(_enumeratorFactory, finalizer) {
        super(finalizer);
        this._enumeratorFactory = _enumeratorFactory;
        this._isEndless = true;
        this._disposableObjectName = "InfiniteLinqEnumerable";
    }
    get isEndless() {
        return this._isEndless;
    }
    // #region IEnumerable<T> Implementation...
    getEnumerator() {
        this.throwIfDisposed();
        return this._enumeratorFactory();
    }
    // #endregion
    // #region IDisposable override...
    _onDispose() {
        super._onDispose(); // Just in case.
        this._enumeratorFactory = null;
    }
    // #endregion
    // Return a default (unfiltered) enumerable.
    asEnumerable() {
        const _ = this;
        _.throwIfDisposed();
        return new InfiniteLinqEnumerable(() => _.getEnumerator());
    }
    doAction(action, initializer, isEndless = this.isEndless, onComplete) {
        const _ = this;
        _.throwIfDisposed();
        const isE = isEndless || undefined; // In case it's null.
        if (!action)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("action");
        return new LinqEnumerable(() => {
            let enumerator;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(!action);
                if (initializer)
                    initializer();
                index = 0;
                enumerator = _.getEnumerator();
                // May need a way to propagate isEndless
            }, (yielder) => {
                throwIfDisposed(!action);
                while (enumerator.moveNext()) {
                    let c = enumerator.current;
                    let actionResult = action(c, index++);
                    if (actionResult === false || actionResult === 0 /* Break */)
                        return yielder.yieldBreak();
                    if (actionResult !== 2 /* Skip */)
                        return yielder.yieldReturn(c);
                    // If actionResult===2, then a signal for skip is received.
                }
                if (onComplete)
                    onComplete(index);
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
            }, isE);
        }, 
        // Using a finalizer value reduces the chance of a circular reference
        // since we could simply reference the enumeration and check e.wasDisposed.
        () => {
            action = NULL;
        }, isE);
    }
    force() {
        this.throwIfDisposed();
        this.doAction(BREAK)
            .getEnumerator()
            .moveNext();
    }
    // #region Indexing/Paging methods.
    skip(count) {
        const _ = this;
        _.throwIfDisposed();
        if (!isFinite(count))
            return new InfiniteLinqEnumerable(getEmptyEnumerator);
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        return this.where((element, index) => index >= count);
    }
    take(count) {
        if (!(count > 0))
            return Enumerable.empty();
        const _ = this;
        _.throwIfDisposed();
        if (!isFinite(count))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('count', count, 'Must be finite.');
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        // Once action returns false, the enumeration will stop.
        return _.doAction((element, index) => index < count, null, false);
    }
    // #region Single Value Return...
    elementAt(index) {
        const v = this.elementAtOrDefault(index, INVALID_DEFAULT);
        if (v === INVALID_DEFAULT)
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('index', index, "is greater than or equal to the number of elements in source");
        return v;
    }
    elementAtOrDefault(index, defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assertZeroOrGreater(index, 'index');
        const n = index;
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e => {
            let i = 0;
            while (e.moveNext()) {
                if (i == n)
                    return e.current;
                i++;
            }
            return defaultValue;
        });
    }
    /* Note: Unlike previous implementations, you could pass a predicate into these methods.
     * But since under the hood it ends up calling .where(predicate) anyway,
     * it may be better to remove this to allow for a cleaner signature/override.
     * JavaScript/TypeScript does not easily allow for a strict method interface like C#.
     * Having to write extra override logic is error prone and confusing to the consumer.
     * Removing the predicate here may also cause the consumer of this method to think more about how they structure their query.
     * The end all difference is that the user must declare .where(predicate) before .first(), .single(), or .last().
     * Otherwise there would need to be much more code to handle these cases (.first(predicate), etc);
     * */
    first() {
        const v = this.firstOrDefault(INVALID_DEFAULT);
        if (v === INVALID_DEFAULT)
            throw new Error("first:The sequence is empty.");
        return v;
    }
    firstOrDefault(defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e => e.moveNext() ? e.current : defaultValue);
    }
    single() {
        const _ = this;
        _.throwIfDisposed();
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e => {
            if (e.moveNext()) {
                let value = e.current;
                if (!e.moveNext())
                    return value;
                throw new Error("single:sequence contains more than one element.");
            }
            throw new Error("single:The sequence is empty.");
        });
    }
    singleOrDefault(defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e => {
            if (e.moveNext()) {
                let value = e.current;
                if (!e.moveNext())
                    return value;
            }
            return defaultValue;
        });
    }
    any() {
        const _ = this;
        _.throwIfDisposed();
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e => e.moveNext());
    }
    isEmpty() {
        return !this.any();
    }
    traverseDepthFirst(childrenSelector, resultSelector = Functions.Identity) {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        const isEndless = _._isEndless; // Is endless is not affirmative if false.
        return new LinqEnumerable(() => {
            // Dev Note: May want to consider using an actual stack and not an array.
            let enumeratorStack;
            let enumerator;
            let len; // Avoid using push/pop since they query .length every time and can be slower.
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
                enumeratorStack = [];
                len = 0;
            }, (yielder) => {
                throwIfDisposed(disposed);
                while (true) {
                    if (enumerator.moveNext()) {
                        let value = resultSelector(enumerator.current, len);
                        enumeratorStack[len++] = enumerator;
                        let c = childrenSelector(enumerator.current);
                        let e = !__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isString(c) && Enumerable.fromAny(c);
                        enumerator = e ? e.getEnumerator() : __WEBPACK_IMPORTED_MODULE_4__System_Collections_Enumeration_EmptyEnumerator__["a" /* EmptyEnumerator */];
                        return yielder.yieldReturn(value);
                    }
                    if (len == 0)
                        return false;
                    enumerator.dispose();
                    enumerator = enumeratorStack[--len];
                    enumeratorStack.length = len;
                }
            }, () => {
                try {
                    if (enumerator)
                        enumerator.dispose();
                }
                finally {
                    if (enumeratorStack) {
                        __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["a" /* dispose */].these.noCopy(enumeratorStack);
                        enumeratorStack.length = 0;
                        enumeratorStack = NULL;
                    }
                }
            }, isEndless);
        }, () => {
            disposed = true;
        }, isEndless);
    }
    flatten() {
        return this.selectMany(entry => {
            let e = !__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isString(entry) && Enumerable.fromAny(entry);
            return e ? e.flatten() : [entry];
        });
    }
    pairwise(selector) {
        const _ = this;
        _.throwIfDisposed();
        if (!selector)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("selector");
        let previous;
        return this.select((value, i) => {
            const result = i ? selector(previous, value, i) : NULL;
            previous = value;
            return result;
        }).skip(1);
    }
    scan(func, seed) {
        const _ = this;
        _.throwIfDisposed();
        if (!func)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("func");
        return (seed === VOID0
            ? this.select((value, i) => seed = i ? func(seed, value, i) : value)
            : this.select((value, i) => seed = func(seed, value, i)));
    }
    // #endregion
    select(selector) {
        return this._filterSelected(selector);
    }
    map(selector) {
        return this._filterSelected(selector);
    }
    /*
    public static IEnumerable<TResult> SelectMany<TSource, TCollection, TResult>(
        this IEnumerable<TSource> source,
        Func<TSource, IEnumerable<TCollection>> collectionSelector,
        Func<TSource, TCollection, TResult> resultSelector)
     */
    _selectMany(collectionSelector, resultSelector) {
        const _ = this;
        _.throwIfDisposed();
        if (!collectionSelector)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("collectionSelector");
        const isEndless = _._isEndless; // Do second enumeration, it will be indeterminate if false.
        if (!resultSelector)
            resultSelector = (a, b) => b;
        return new LinqEnumerable(() => {
            let enumerator;
            let middleEnumerator;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(!collectionSelector);
                enumerator = _.getEnumerator();
                middleEnumerator = VOID0;
                index = 0;
            }, (yielder) => {
                throwIfDisposed(!collectionSelector);
                // Just started, and nothing to enumerate? End.
                if (middleEnumerator === VOID0 && !enumerator.moveNext())
                    return false;
                // moveNext has been called at least once...
                do {
                    // Initialize middle if there isn't one.
                    if (!middleEnumerator) {
                        let middleSeq = collectionSelector(enumerator.current, index++);
                        // Collection is null?  Skip it...
                        if (!middleSeq)
                            continue;
                        middleEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](middleSeq);
                    }
                    if (middleEnumerator.moveNext())
                        return yielder.yieldReturn(resultSelector(enumerator.current, middleEnumerator.current));
                    // else no more in this middle?  Then clear and reset for next...
                    middleEnumerator.dispose();
                    middleEnumerator = null;
                } while (enumerator.moveNext());
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                disposeSingle(middleEnumerator);
                enumerator = NULL;
                middleEnumerator = null;
            }, isEndless);
        }, () => {
            collectionSelector = NULL;
        }, isEndless);
    }
    selectMany(collectionSelector, resultSelector) {
        return this._selectMany(collectionSelector, resultSelector);
    }
    _filterSelected(selector = Functions.Identity, filter) {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        if (!selector)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("selector");
        return new LinqEnumerable(() => {
            let enumerator;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(!selector);
                index = 0;
                enumerator = _.getEnumerator();
            }, (yielder) => {
                throwIfDisposed(disposed);
                while (enumerator.moveNext()) {
                    let i = index++;
                    let result = selector(enumerator.current, i);
                    if (!filter || filter(result, i++))
                        return yielder.yieldReturn(result);
                }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
            }, _._isEndless);
        }, () => {
            disposed = false;
        }, _._isEndless);
    }
    choose(selector = Functions.Identity) {
        return this._filterSelected(selector, isNotNullOrUndefined);
    }
    where(predicate) {
        return this._filterSelected(Functions.Identity, predicate);
    }
    filter(predicate) {
        return this._filterSelected(Functions.Identity, predicate);
    }
    nonNull() {
        return this.where(v => v != null && v != VOID0);
    }
    ofType(type) {
        let typeName;
        switch (type) {
            case Number:
                typeName = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].NUMBER;
                break;
            case String:
                typeName = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].STRING;
                break;
            case Boolean:
                typeName = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].BOOLEAN;
                break;
            case Function:
                typeName = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].FUNCTION;
                break;
            default:
                return this
                    .where(x => x instanceof type);
        }
        return this
            .where(x => isNotNullOrUndefined(x) && typeof x === typeName);
    }
    except(second, compareSelector) {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let enumerator;
            let keys;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
                keys = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector);
                if (second)
                    __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["a" /* forEach */](second, key => { keys.addByKeyValue(key, true); });
            }, (yielder) => {
                throwIfDisposed(disposed);
                while (enumerator.moveNext()) {
                    let current = enumerator.current;
                    if (!keys.containsKey(current)) {
                        keys.addByKeyValue(current, true);
                        return yielder.yieldReturn(current);
                    }
                }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                keys.clear();
            }, isEndless);
        }, () => {
            disposed = true;
        }, isEndless);
    }
    distinct(compareSelector) {
        return this.except(NULL, compareSelector);
    }
    // [0,0,0,1,1,1,2,2,2,0,0,0,1,1] results in [0,1,2,0,1];
    distinctUntilChanged(compareSelector = Functions.Identity) {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let enumerator;
            let compareKey;
            let initial = true;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
            }, (yielder) => {
                throwIfDisposed(disposed);
                while (enumerator.moveNext()) {
                    let key = compareSelector(enumerator.current);
                    if (initial) {
                        initial = false;
                    }
                    else if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(compareKey, key)) {
                        continue;
                    }
                    compareKey = key;
                    return yielder.yieldReturn(enumerator.current);
                }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
            }, isEndless);
        }, () => {
            disposed = true;
        }, isEndless);
    }
    /**
     * Returns a single default value if empty.
     * @param defaultValue
     * @returns {Enumerable}
     */
    defaultIfEmpty(defaultValue) {
        const _ = this;
        const disposed = !_.throwIfDisposed();
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let enumerator;
            let isFirst;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                isFirst = true;
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
            }, (yielder) => {
                throwIfDisposed(disposed);
                if (enumerator.moveNext()) {
                    isFirst = false;
                    return yielder.yieldReturn(enumerator.current);
                }
                else if (isFirst) {
                    isFirst = false;
                    return yielder.yieldReturn(defaultValue);
                }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    zip(second, resultSelector) {
        const _ = this;
        _.throwIfDisposed();
        return new LinqEnumerable(() => {
            let firstEnumerator;
            let secondEnumerator;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                index = 0;
                firstEnumerator = _.getEnumerator();
                secondEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](second);
            }, (yielder) => firstEnumerator.moveNext()
                && secondEnumerator.moveNext()
                && yielder.yieldReturn(resultSelector(firstEnumerator.current, secondEnumerator.current, index++)), () => {
                if (firstEnumerator)
                    firstEnumerator.dispose();
                if (secondEnumerator)
                    secondEnumerator.dispose();
                firstEnumerator = NULL;
                secondEnumerator = NULL;
            });
        });
    }
    zipMultiple(second, resultSelector) {
        const _ = this;
        _.throwIfDisposed();
        if (!second.length)
            return Enumerable.empty();
        return new LinqEnumerable(() => {
            let secondTemp;
            let firstEnumerator;
            let secondEnumerator;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                secondTemp = new __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__["a" /* Queue */](second);
                index = 0;
                firstEnumerator = _.getEnumerator();
                secondEnumerator = NULL;
            }, (yielder) => {
                if (firstEnumerator.moveNext()) {
                    while (true) {
                        while (!secondEnumerator) {
                            if (secondTemp.count) {
                                let next = secondTemp.dequeue();
                                if (next)
                                    secondEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](next);
                            }
                            else
                                return yielder.yieldBreak();
                        }
                        if (secondEnumerator.moveNext())
                            return yielder.yieldReturn(resultSelector(firstEnumerator.current, secondEnumerator.current, index++));
                        secondEnumerator.dispose();
                        secondEnumerator = NULL;
                    }
                }
                return yielder.yieldBreak();
            }, () => {
                if (firstEnumerator)
                    firstEnumerator.dispose();
                if (secondEnumerator)
                    secondEnumerator.dispose();
                if (secondTemp)
                    secondTemp.dispose();
                firstEnumerator = NULL;
                secondEnumerator = NULL;
                secondTemp = NULL;
            });
        });
    }
    // #region Join Methods
    join(inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector = Functions.Identity) {
        const _ = this;
        return new LinqEnumerable(() => {
            let outerEnumerator;
            let lookup;
            let innerElements;
            let innerCount = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                outerEnumerator = _.getEnumerator();
                lookup = Enumerable.from(inner)
                    .toLookup(innerKeySelector, Functions.Identity, compareSelector);
            }, (yielder) => {
                while (true) {
                    if (innerElements) {
                        let innerElement = innerElements[innerCount++];
                        if (innerElement !== VOID0)
                            return yielder.yieldReturn(resultSelector(outerEnumerator.current, innerElement));
                        innerElements = null;
                        innerCount = 0;
                    }
                    if (outerEnumerator.moveNext()) {
                        let key = outerKeySelector(outerEnumerator.current);
                        innerElements = lookup.get(key);
                    }
                    else {
                        return yielder.yieldBreak();
                    }
                }
            }, () => {
                if (outerEnumerator)
                    outerEnumerator.dispose();
                innerElements = null;
                outerEnumerator = NULL;
                lookup = NULL;
            });
        });
    }
    groupJoin(inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector = Functions.Identity) {
        const _ = this;
        return new LinqEnumerable(() => {
            let enumerator;
            let lookup;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                enumerator = _.getEnumerator();
                lookup = Enumerable.from(inner)
                    .toLookup(innerKeySelector, Functions.Identity, compareSelector);
            }, (yielder) => enumerator.moveNext()
                && yielder.yieldReturn(resultSelector(enumerator.current, lookup.get(outerKeySelector(enumerator.current)))), () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
                lookup = NULL;
            });
        });
    }
    merge(enumerables) {
        const _ = this;
        const isEndless = _._isEndless;
        if (!enumerables || enumerables.length == 0)
            return _;
        return new LinqEnumerable(() => {
            let enumerator;
            let queue;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                // 1) First get our values...
                enumerator = _.getEnumerator();
                queue = new __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__["a" /* Queue */](enumerables);
            }, (yielder) => {
                while (true) {
                    while (!enumerator && queue.tryDequeue(value => {
                        enumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](value); // 4) Keep going and on to step 2.  Else fall through to yieldBreak().
                    })) { }
                    if (enumerator && enumerator.moveNext())
                        return yielder.yieldReturn(enumerator.current);
                    if (enumerator) {
                        enumerator.dispose();
                        enumerator = NULL;
                        continue;
                    }
                    return yielder.yieldBreak();
                }
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
                if (queue)
                    queue.dispose();
                queue = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    concat(...enumerables) {
        return this.merge(enumerables);
    }
    union(second, compareSelector = Functions.Identity) {
        const _ = this;
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let firstEnumerator;
            let secondEnumerator;
            let keys;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                firstEnumerator = _.getEnumerator();
                keys = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector); // Acting as a HashSet.
            }, (yielder) => {
                let current;
                if (secondEnumerator === VOID0) {
                    while (firstEnumerator.moveNext()) {
                        current = firstEnumerator.current;
                        if (!keys.containsKey(current)) {
                            keys.addByKeyValue(current, null);
                            return yielder.yieldReturn(current);
                        }
                    }
                    secondEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](second);
                }
                while (secondEnumerator.moveNext()) {
                    current = secondEnumerator.current;
                    if (!keys.containsKey(current)) {
                        keys.addByKeyValue(current, null);
                        return yielder.yieldReturn(current);
                    }
                }
                return false;
            }, () => {
                if (firstEnumerator)
                    firstEnumerator.dispose();
                if (secondEnumerator)
                    secondEnumerator.dispose();
                firstEnumerator = NULL;
                secondEnumerator = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    insertAt(index, other) {
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assertZeroOrGreater(index, 'index');
        const n = index;
        const _ = this;
        _.throwIfDisposed();
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let firstEnumerator;
            let secondEnumerator;
            let count = 0;
            let isEnumerated = false;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                count = 0;
                firstEnumerator = _.getEnumerator();
                secondEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](other);
                isEnumerated = false;
            }, (yielder) => {
                if (count == n) {
                    isEnumerated = true;
                    if (secondEnumerator.moveNext())
                        return yielder.yieldReturn(secondEnumerator.current);
                }
                if (firstEnumerator.moveNext()) {
                    count++;
                    return yielder.yieldReturn(firstEnumerator.current);
                }
                return !isEnumerated
                    && secondEnumerator.moveNext()
                    && yielder.yieldReturn(secondEnumerator.current);
            }, () => {
                if (firstEnumerator)
                    firstEnumerator.dispose();
                firstEnumerator = NULL;
                if (secondEnumerator)
                    secondEnumerator.dispose();
                secondEnumerator = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    alternateMultiple(sequence) {
        const _ = this;
        const isEndless = _._isEndless;
        return new LinqEnumerable(() => {
            let buffer, mode, enumerator, alternateEnumerator;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                // Instead of recalling getEnumerator every time, just reset the existing one.
                alternateEnumerator = new __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__["a" /* ArrayEnumerator */](Enumerable.toArray(sequence)); // Freeze
                enumerator = _.getEnumerator();
                let hasAtLeastOne = enumerator.moveNext();
                mode = hasAtLeastOne
                    ? 1 /* Return */
                    : 0 /* Break */;
                if (hasAtLeastOne)
                    buffer = enumerator.current;
            }, (yielder) => {
                switch (mode) {
                    case 0 /* Break */:
                        return yielder.yieldBreak();
                    case 2 /* Skip */:
                        if (alternateEnumerator.moveNext())
                            return yielder.yieldReturn(alternateEnumerator.current);
                        alternateEnumerator.reset();
                        mode = 1 /* Return */;
                        break;
                }
                let latest = buffer;
                // Set up the next round...
                // Is there another one?  Set the buffer and setup instruct for the next one to be the alternate.
                let another = enumerator.moveNext();
                mode = another
                    ? 2 /* Skip */
                    : 0 /* Break */;
                if (another)
                    buffer = enumerator.current;
                return yielder.yieldReturn(latest);
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                if (alternateEnumerator)
                    alternateEnumerator.dispose();
                enumerator = NULL;
                alternateEnumerator = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    alternateSingle(value) {
        return this.alternateMultiple(Enumerable.make(value));
    }
    alternate(...sequence) {
        return this.alternateMultiple(sequence);
    }
    // #region Error Handling
    catchError(handler) {
        const _ = this;
        const disposed = !_.throwIfDisposed();
        return new LinqEnumerable(() => {
            let enumerator;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                try {
                    throwIfDisposed(disposed);
                    enumerator = _.getEnumerator();
                }
                catch (e) {
                    // Don't init...
                }
            }, (yielder) => {
                if (enumerator)
                    try {
                        throwIfDisposed(disposed);
                        if (enumerator.moveNext())
                            return yielder.yieldReturn(enumerator.current);
                    }
                    catch (e) {
                        handler(e);
                    }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
            });
        });
    }
    finallyAction(action) {
        const _ = this;
        const disposed = !_.throwIfDisposed();
        return new LinqEnumerable(() => {
            let enumerator;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
            }, (yielder) => {
                throwIfDisposed(disposed);
                return (enumerator.moveNext())
                    ? yielder.yieldReturn(enumerator.current)
                    : false;
            }, () => {
                try {
                    if (enumerator)
                        enumerator.dispose();
                    enumerator = NULL;
                }
                finally {
                    action();
                }
            });
        });
    }
    // #endregion
    buffer(size) {
        if (size < 1 || !isFinite(size))
            throw new Error("Invalid buffer size.");
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(size, "size");
        const _ = this;
        const isEndless = _._isEndless;
        let len;
        return new LinqEnumerable(() => {
            let enumerator;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                enumerator = _.getEnumerator();
            }, (yielder) => {
                let array = Object(__WEBPACK_IMPORTED_MODULE_21__System_Collections_Array_initialize__["a" /* initialize */])(size);
                len = 0;
                while (len < size && enumerator.moveNext()) {
                    array[len++] = enumerator.current;
                }
                array.length = len;
                return !!len && yielder.yieldReturn(array);
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
            }, isEndless);
        }, null, isEndless);
    }
    share() {
        const _ = this;
        _.throwIfDisposed();
        let sharedEnumerator;
        return new LinqEnumerable(() => {
            return sharedEnumerator || (sharedEnumerator = _.getEnumerator());
        }, () => {
            if (sharedEnumerator)
                sharedEnumerator.dispose();
            sharedEnumerator = NULL;
        }, _._isEndless);
    }
    memoize() {
        let source = new __WEBPACK_IMPORTED_MODULE_24__System_Collections_LazyList__["a" /* LazyList */](this);
        return (new InfiniteLinqEnumerable(() => source.getEnumerator(), () => {
            source.dispose();
            source = null;
        }));
    }
}
/* harmony export (immutable) */ __webpack_exports__["InfiniteLinqEnumerable"] = InfiniteLinqEnumerable;

/**
 * Enumerable<T> is a wrapper class that allows more primitive enumerables to exhibit LINQ behavior.
 *
 * In C# Enumerable<T> is not an instance but has extensions for IEnumerable<T>.
 * In this case, we use Enumerable<T> as the underlying class that is being chained.
 */
class LinqEnumerable extends InfiniteLinqEnumerable {
    constructor(enumeratorFactory, finalizer, isEndless) {
        super(enumeratorFactory, finalizer);
        this._isEndless = isEndless;
        this._disposableObjectName = "LinqEnumerable";
    }
    // Return a default (unfiltered) enumerable.
    asEnumerable() {
        const _ = this;
        _.throwIfDisposed();
        return new LinqEnumerable(() => _.getEnumerator());
    }
    // #region Indexing/Paging methods.
    skipWhile(predicate) {
        this.throwIfDisposed();
        return this.doAction((element, index) => predicate(element, index)
            ? 2 /* Skip */
            : 1 /* Return */);
    }
    takeWhile(predicate) {
        this.throwIfDisposed();
        if (!predicate)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('predicate');
        return this.doAction((element, index) => predicate(element, index)
            ? 1 /* Return */
            : 0 /* Break */, null, null // We don't know the state if it is endless or not.
        );
    }
    // Is like the inverse of take While with the ability to return the value identified by the predicate.
    takeUntil(predicate, includeUntilValue) {
        this.throwIfDisposed();
        if (!predicate)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('predicate');
        if (!includeUntilValue)
            return this.doAction((element, index) => predicate(element, index)
                ? 0 /* Break */
                : 1 /* Return */, null, null // We don't know the state if it is endless or not.
            );
        let found = false;
        return this.doAction((element, index) => {
            if (found)
                return 0 /* Break */;
            found = predicate(element, index);
            return 1 /* Return */;
        }, () => {
            found = false;
        }, null // We don't know the state if it is endless or not.
        );
    }
    traverseBreadthFirst(childrenSelector, resultSelector = Functions.Identity) {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        const isEndless = _._isEndless; // Is endless is not affirmative if false.
        return new LinqEnumerable(() => {
            let enumerator;
            let nestLevel = 0;
            let buffer, len;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
                nestLevel = 0;
                buffer = [];
                len = 0;
            }, (yielder) => {
                throwIfDisposed(disposed);
                while (true) {
                    if (enumerator.moveNext()) {
                        buffer[len++] = enumerator.current;
                        return yielder.yieldReturn(resultSelector(enumerator.current, nestLevel));
                    }
                    if (!len)
                        return yielder.yieldBreak();
                    let next = Enumerable
                        .from(buffer)
                        .selectMany(childrenSelector);
                    if (!next.any()) {
                        return yielder.yieldBreak();
                    }
                    else {
                        nestLevel++;
                        buffer = [];
                        len = 0;
                        enumerator.dispose();
                        enumerator = next.getEnumerator();
                    }
                }
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
                buffer.length = 0;
            }, isEndless);
        }, () => {
            disposed = true;
        }, isEndless);
    }
    forEach(action, max = Infinity) {
        const _ = this;
        _.throwIfDisposed();
        if (!action)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("action");
        Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(_.isEndless);
        /*
        // It could be just as easy to do the following:
        return enumUtil.forEach(_, action, max);
        // But to be more active about checking for disposal, we use this instead:
        */
        // Return value of action can be anything, but if it is (===) false then the enumUtil.forEach will discontinue.
        return max > 0 ? Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(_.getEnumerator(), e => {
            Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(!isFinite(max) && e.isEndless);
            let i = 0;
            // It is possible that subsequently 'action' could cause the enumeration to dispose, so we have to check each time.
            while (max > i && _.throwIfDisposed() && e.moveNext()) {
                if (action(e.current, i++) === false)
                    break;
            }
            return i;
        }) : 0;
    }
    // #region Conversion Methods
    toArray(predicate) {
        return predicate
            ? this.where(predicate).toArray()
            : this.copyTo([]);
    }
    copyTo(target, index = 0, count = Infinity) {
        this.throwIfDisposed();
        if (!target)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("target");
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assertZeroOrGreater(index);
        // If not exposing an action that could cause dispose, then use enumUtil.forEach utility instead.
        __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["a" /* forEach */](this, (x, i) => {
            target[i + index] = x;
        }, count);
        return target;
    }
    toLookup(keySelector, elementSelector = Functions.Identity, compareSelector = Functions.Identity) {
        const dict = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector);
        this.forEach((x, i) => {
            let key = keySelector(x, i);
            let element = elementSelector(x, i);
            let array = dict.getValue(key);
            if (array !== VOID0)
                array.push(element);
            else
                dict.addByKeyValue(key, [element]);
        });
        return new Lookup(dict);
    }
    toMap(keySelector, elementSelector) {
        const obj = {};
        this.forEach((x, i) => {
            obj[keySelector(x, i)] = elementSelector(x, i);
        });
        return obj;
    }
    toDictionary(keySelector, elementSelector, compareSelector = Functions.Identity) {
        const dict = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector);
        this.forEach((x, i) => dict.addByKeyValue(keySelector(x, i), elementSelector(x, i)));
        return dict;
    }
    toJoinedString(separator = "", selector = Functions.Identity) {
        return this
            .select(selector)
            .toArray()
            .join(separator);
    }
    // #endregion
    takeExceptLast(count = 1) {
        const _ = this;
        if (!(count > 0))
            return _;
        if (!isFinite(count))
            return Enumerable.empty();
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        const c = count;
        return new LinqEnumerable(() => {
            let enumerator;
            let q;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                enumerator = _.getEnumerator();
                q = new __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__["a" /* Queue */]();
            }, (yielder) => {
                while (enumerator.moveNext()) {
                    // Add the next one to the queue.
                    q.enqueue(enumerator.current);
                    // Did we reach our quota?
                    if (q.count > c)
                        // Okay then, start returning results.
                        return yielder.yieldReturn(q.dequeue());
                }
                return false;
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
                if (q)
                    q.dispose();
                q = NULL;
            });
        });
    }
    skipToLast(count) {
        if (!(count > 0))
            return Enumerable.empty();
        const _ = this;
        if (!isFinite(count))
            return _;
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        // This sets up the query so nothing is done until move next is called.
        return _.reverse()
            .take(count)
            .reverse();
    }
    // To help with type guarding.
    select(selector) {
        return super.select(selector);
    }
    map(selector) {
        return super.select(selector);
    }
    selectMany(collectionSelector, resultSelector) {
        return this._selectMany(collectionSelector, resultSelector);
    }
    choose(selector = Functions.Identity) {
        return this._filterSelected(selector, isNotNullOrUndefined);
    }
    reverse() {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(_._isEndless); // Cannot reverse an endless collection...
        return new LinqEnumerable(() => {
            let buffer;
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                _.throwIfDisposed();
                buffer = _.toArray();
                index = buffer.length;
            }, (yielder) => !!index && yielder.yieldReturn(buffer[--index]), () => {
                buffer.length = 0;
            });
        }, () => {
            disposed = true;
        });
    }
    shuffle() {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(_._isEndless); // Cannot shuffle an endless collection...
        return new LinqEnumerable(() => {
            let buffer;
            let capacity;
            let len;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                buffer = _.toArray();
                capacity = len = buffer.length;
            }, (yielder) => {
                // Avoid using major array operations like .slice();
                if (!len)
                    return yielder.yieldBreak();
                let selectedIndex = __WEBPACK_IMPORTED_MODULE_22__System_Random__["a" /* Random */].integer(len);
                let selectedValue = buffer[selectedIndex];
                buffer[selectedIndex] = buffer[--len]; // Take the last one and put it here.
                buffer[len] = NULL; // clear possible reference.
                if (len % 32 == 0)
                    buffer.length = len;
                return yielder.yieldReturn(selectedValue);
            }, () => {
                buffer.length = 0;
            });
        }, () => {
            disposed = true;
        });
    }
    count(predicate) {
        let count = 0;
        this.forEach(predicate
            ? (x, i) => {
                if (predicate(x, i))
                    ++count;
            }
            : () => {
                ++count;
            });
        return count;
    }
    // Akin to '.every' on an array.
    all(predicate) {
        if (!predicate)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("predicate");
        let result = true;
        this.forEach((x, i) => {
            if (!predicate(x, i)) {
                result = false;
                return false; // break
            }
        });
        return result;
    }
    // 'every' has been added here for parity/compatibility with an array.
    every(predicate) {
        return this.all(predicate);
    }
    // Akin to '.some' on an array.
    any(predicate) {
        if (!predicate)
            return super.any();
        let result = false;
        // Splitting the forEach up this way reduces iterative processing.
        // forEach handles the generation and disposal of the enumerator.
        this.forEach((x, i) => {
            result = predicate(x, i); // false = not found and therefore it should continue.  true = found and break;
            return !result;
        });
        return result;
    }
    // 'some' has been added here for parity/compatibility with an array.
    some(predicate) {
        return this.any(predicate);
    }
    contains(value, compareSelector) {
        if (compareSelector) {
            const s = compareSelector(value);
            return this.any(v => Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(compareSelector(v), s));
        }
        return this.any(v => Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(v, value));
    }
    // Originally has an overload for a predicate,
    // but that's a bad idea since this could be an enumeration of functions and therefore fail the intent.
    // Better to chain a where statement first to be more explicit.
    indexOf(value, compareSelector) {
        let found = -1;
        this.forEach(compareSelector
            ? (element, i) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(compareSelector(element, i), compareSelector(value, i), true)) {
                    found = i;
                    return false;
                }
            }
            : (element, i) => {
                // Why?  Because NaN doesn't equal NaN. :P
                if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(element, value, true)) {
                    found = i;
                    return false;
                }
            });
        return found;
    }
    lastIndexOf(value, compareSelector) {
        let result = -1;
        this.forEach(compareSelector
            ? (element, i) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(compareSelector(element, i), compareSelector(value, i), true))
                    result
                        = i;
            }
            : (element, i) => {
                if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(element, value, true))
                    result = i;
            });
        return result;
    }
    intersect(second, compareSelector) {
        const _ = this;
        _.throwIfDisposed();
        if (!second)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("second");
        const isEndless = _.isEndless;
        return new LinqEnumerable(() => {
            let enumerator;
            let keys;
            let outs;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(!second);
                enumerator = _.getEnumerator();
                keys = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector);
                outs = new __WEBPACK_IMPORTED_MODULE_10__System_Collections_Dictionaries_Dictionary__["a" /* Dictionary */](compareSelector);
                __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["a" /* forEach */](second, key => {
                    keys.addByKeyValue(key, true);
                });
            }, (yielder) => {
                while (enumerator.moveNext()) {
                    let current = enumerator.current;
                    if (!outs.containsKey(current) && keys.containsKey(current)) {
                        outs.addByKeyValue(current, true);
                        return yielder.yieldReturn(current);
                    }
                }
                return yielder.yieldBreak();
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                if (keys)
                    enumerator.dispose();
                if (outs)
                    enumerator.dispose();
                enumerator = NULL;
                keys = NULL;
                outs = NULL;
            }, isEndless);
        }, () => {
            second = NULL;
        }, isEndless);
    }
    sequenceEqual(second, equalityComparer = __WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */]) {
        this.throwIfDisposed();
        return Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(this.getEnumerator(), e1 => Object(__WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["b" /* using */])(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](second), e2 => {
            // if both are endless, this will never evaluate.
            Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(e1.isEndless && e2.isEndless);
            while (e1.moveNext()) {
                if (!e2.moveNext() || !equalityComparer(e1.current, e2.current))
                    return false;
            }
            return !e2.moveNext();
        }));
    }
    ofType(type) {
        this.throwIfDisposed();
        return super.ofType(type);
    }
    // #region Ordering Methods
    orderBy(keySelector = Functions.Identity) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this, keySelector, 1 /* Ascending */);
    }
    orderUsing(comparison) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this, null, 1 /* Ascending */, null, comparison);
    }
    orderUsingReversed(comparison) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this, null, -1 /* Descending */, null, comparison);
    }
    orderByDescending(keySelector = Functions.Identity) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this, keySelector, -1 /* Descending */);
    }
    /*
         weightedSample(weightSelector) {
         weightSelector = Utils.createLambda(weightSelector);
         var source = this;
         return new LinqEnumerable<T>(() => {
         var sortedByBound;
         var totalWeight = 0;
         return new EnumeratorBase<T>(
         () => {
         sortedByBound = source
         .choose(function (x) {
         var weight = weightSelector(x);
         if (weight <= 0) return null; // ignore 0
         totalWeight += weight;
         return { value: x, bound: totalWeight }
         })
         .toArray();
         },
         () => {
         if (sortedByBound.length > 0) {
         var draw = (Math.random() * totalWeight) + 1;
         var lower = -1;
         var upper = sortedByBound.length;
         while (upper - lower > 1) {
         var index = ((lower + upper) / 2);
         if (sortedByBound[index].bound >= draw) {
         upper = index;
         }
         else {
         lower = index;
         }
         }
         return (<any>this).yieldReturn(sortedByBound[upper].value);
         }
         return (<any>this).yieldBreak();
         },
         Functions.Blank);
         });
         }
         */
    // #endregion
    buffer(size) {
        return super.buffer(size);
    }
    groupBy(keySelector, elementSelector, compareSelector) {
        if (!elementSelector)
            elementSelector = Functions.Identity; // Allow for 'null' and not just undefined.
        return new LinqEnumerable(() => this
            .toLookup(keySelector, elementSelector, compareSelector)
            .getEnumerator());
    }
    partitionBy(keySelector, elementSelector, resultSelector = (key, elements) => new Grouping(key, elements), compareSelector = Functions.Identity) {
        const _ = this;
        if (!elementSelector)
            elementSelector = Functions.Identity; // Allow for 'null' and not just undefined.
        return new LinqEnumerable(() => {
            let enumerator;
            let key;
            let compareKey;
            let group;
            let len;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(!elementSelector);
                enumerator = _.getEnumerator();
                if (enumerator.moveNext()) {
                    let v = enumerator.current;
                    key = keySelector(v);
                    compareKey = compareSelector(key);
                    group = [elementSelector(v)];
                    len = 1;
                }
                else
                    group = null;
            }, (yielder) => {
                throwIfDisposed(!elementSelector);
                if (!group)
                    return yielder.yieldBreak();
                let hasNext, c;
                while ((hasNext = enumerator.moveNext())) {
                    c = enumerator.current;
                    if (Object(__WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */])(compareKey, compareSelector(keySelector(c))))
                        group[len++] = elementSelector(c);
                    else
                        break;
                }
                let result = resultSelector(key, group);
                if (hasNext) {
                    c = enumerator.current;
                    key = keySelector(c);
                    compareKey = compareSelector(key);
                    group = [elementSelector(c)];
                    len = 1;
                }
                else {
                    group = null;
                }
                return yielder.yieldReturn(result);
            }, () => {
                if (enumerator)
                    enumerator.dispose();
                enumerator = NULL;
                group = null;
            });
        }, () => {
            elementSelector = NULL;
        });
    }
    flatten() {
        return super.flatten();
    }
    pairwise(selector) {
        return super.pairwise(selector);
    }
    aggregate(reduction, initialValue) {
        if (initialValue == VOID0) {
            this.forEach((value, i) => {
                initialValue = i
                    ? reduction(initialValue, value, i)
                    : value;
            });
        }
        else {
            this.forEach((value, i) => {
                initialValue = reduction(initialValue, value, i);
            });
        }
        return initialValue;
    }
    /**
     * Provided as an analog for array.reduce.  Simply a shortcut for aggregate.
     * @param reduction
     * @param initialValue
     */
    reduce(reduction, initialValue) {
        return this.aggregate(reduction, initialValue);
    }
    average(selector = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].numberOrNaN) {
        let count = 0;
        const sum = this.sum((e, i) => {
            count++;
            return selector(e, i);
        });
        return (isNaN(sum) || !count)
            ? NaN
            : (sum / count);
    }
    // If using numbers, it may be useful to call .takeUntil(v=>v==Infinity,true) before calling max. See static versions for numbers.
    max() {
        return this.aggregate(Functions.Greater);
    }
    min() {
        return this.aggregate(Functions.Lesser);
    }
    maxBy(keySelector = Functions.Identity) {
        return this.aggregate((a, b) => (keySelector(a) > keySelector(b)) ? a : b);
    }
    minBy(keySelector = Functions.Identity) {
        return this.aggregate((a, b) => (keySelector(a) < keySelector(b)) ? a : b);
    }
    // Addition...  Only works with numerical enumerations.
    sum(selector = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].numberOrNaN) {
        let sum = 0;
        // This allows for infinity math that doesn't destroy the other values.
        let sumInfinite = 0; // Needs more investigation since we are really trying to retain signs.
        this.forEach((x, i) => {
            let value = selector(x, i);
            if (isNaN(value)) {
                sum = NaN;
                return false;
            }
            if (isFinite(value))
                sum += value;
            else
                sumInfinite +=
                    value > 0 ? (+1) : (-1);
        });
        return isNaN(sum) ? NaN : (sumInfinite ? (sumInfinite * Infinity) : sum);
    }
    // Multiplication...
    product(selector = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].numberOrNaN) {
        let result = 1, exists = false;
        this.forEach((x, i) => {
            exists = true;
            let value = selector(x, i);
            if (isNaN(value)) {
                result = NaN;
                return false;
            }
            if (value == 0) {
                result = 0; // Multiplying by zero will always end in zero.
                return false;
            }
            // Multiplication can never recover from infinity and simply must retain signs.
            // You could cancel out infinity with 1/infinity but no available representation exists.
            result *= value;
        });
        return (exists && isNaN(result)) ? NaN : result;
    }
    /**
     * Takes the first number and divides it by all following.
     * @param selector
     * @returns {number}
     */
    quotient(selector = __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].numberOrNaN) {
        let count = 0;
        let result = NaN;
        this.forEach((x, i) => {
            let value = selector(x, i);
            count++;
            if (count === 1) {
                result = value;
            }
            else {
                if (isNaN(value) || value === 0 || !isFinite(value)) {
                    result = NaN;
                    return false;
                }
                result /= value;
            }
        });
        if (count === 1)
            result = NaN;
        return result;
    }
    // #endregion
    // #region Single Value Return...
    last() {
        const _ = this;
        _.throwIfDisposed();
        let value = VOID0;
        let found = false;
        _.forEach(x => {
            found = true;
            value = x;
        });
        if (!found)
            throw new Error("last:No element satisfies the condition.");
        return value;
    }
    lastOrDefault(defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        let value = VOID0;
        let found = false;
        _.forEach(x => {
            found = true;
            value = x;
        });
        return (!found) ? defaultValue : value;
    }
    // #endregion
    memoize() {
        let source = new __WEBPACK_IMPORTED_MODULE_24__System_Collections_LazyList__["a" /* LazyList */](this);
        return (new LinqEnumerable(() => source.getEnumerator(), () => {
            source.dispose();
            source = null;
        }, this.isEndless));
    }
    throwWhenEmpty() {
        return this.doAction(RETURN, null, this.isEndless, count => {
            if (!count)
                throw "Collection is empty.";
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["LinqEnumerable"] = LinqEnumerable;

// Provided for type guarding.
class FiniteEnumerable extends LinqEnumerable {
    constructor(enumeratorFactory, finalizer) {
        super(enumeratorFactory, finalizer, false);
        this._disposableObjectName = "FiniteEnumerable";
    }
}
/* harmony export (immutable) */ __webpack_exports__["FiniteEnumerable"] = FiniteEnumerable;

class ArrayEnumerable extends FiniteEnumerable {
    constructor(source) {
        super(() => {
            _.throwIfDisposed();
            return new __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__["a" /* ArrayEnumerator */](() => {
                _.throwIfDisposed("The underlying ArrayEnumerable was disposed.", "ArrayEnumerator");
                return _._source; // Should never be null, but ArrayEnumerable if not disposed simply treats null as empty array.
            });
        });
        const _ = this;
        _._disposableObjectName = "ArrayEnumerable";
        _._source = source;
    }
    _onDispose() {
        super._onDispose();
        this._source = NULL;
    }
    get source() {
        return this._source;
    }
    toArray() {
        const _ = this;
        _.throwIfDisposed();
        return __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["h" /* toArray */](_._source);
    }
    asEnumerable() {
        const _ = this;
        _.throwIfDisposed();
        return new ArrayEnumerable(this._source);
    }
    forEach(action, max = Infinity) {
        const _ = this;
        _.throwIfDisposed();
        return __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["a" /* forEach */](_._source, action, max);
    }
    // These methods should ALWAYS check for array length before attempting anything.
    any(predicate) {
        const _ = this;
        _.throwIfDisposed();
        const source = _._source;
        let len = source.length;
        return !!len && (!predicate || super.any(predicate));
    }
    count(predicate) {
        const _ = this;
        _.throwIfDisposed();
        const source = _._source, len = source.length;
        return len && (predicate ? super.count(predicate) : len);
    }
    elementAtOrDefault(index, defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assertZeroOrGreater(index, 'index');
        const source = _._source;
        return index < source.length
            ? source[index]
            : defaultValue;
    }
    last() {
        const _ = this;
        _.throwIfDisposed();
        const source = _._source, len = source.length;
        return (len)
            ? source[len - 1]
            : super.last();
    }
    lastOrDefault(defaultValue) {
        const _ = this;
        _.throwIfDisposed();
        const source = _._source, len = source.length;
        return len
            ? source[len - 1]
            : defaultValue;
    }
    skip(count) {
        const _ = this;
        _.throwIfDisposed();
        if (!(count > 0))
            return _;
        return new LinqEnumerable(() => new __WEBPACK_IMPORTED_MODULE_8__System_Collections_Enumeration_ArrayEnumerator__["a" /* ArrayEnumerator */](() => _._source, count));
    }
    takeExceptLast(count = 1) {
        const _ = this;
        _.throwIfDisposed();
        return _.take(_._source.length - count);
    }
    skipToLast(count) {
        const _ = this;
        _.throwIfDisposed();
        if (!(count > 0))
            return Enumerable.empty();
        if (!isFinite(count))
            return _;
        const len = _._source
            ? _._source.length
            : 0;
        return _.skip(len - count);
    }
    reverse() {
        const _ = this;
        let disposed = !_.throwIfDisposed();
        return new LinqEnumerable(() => {
            _.throwIfDisposed();
            return new __WEBPACK_IMPORTED_MODULE_19__System_Collections_Enumeration_IndexEnumerator__["a" /* IndexEnumerator */](() => {
                let s = _._source;
                throwIfDisposed(disposed || !s);
                return {
                    source: s,
                    pointer: (s.length - 1),
                    length: s.length,
                    step: -1
                };
            });
        }, () => {
            disposed = true;
        });
    }
    memoize() {
        return this.asEnumerable();
    }
    sequenceEqual(second, equalityComparer = __WEBPACK_IMPORTED_MODULE_0__System_Compare__["a" /* areEqual */]) {
        if (__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isArrayLike(second))
            return __WEBPACK_IMPORTED_MODULE_2__System_Collections_Array_Compare__["areEqual"](this.source, second, true, equalityComparer);
        if (second instanceof ArrayEnumerable)
            return second.sequenceEqual(this.source, equalityComparer);
        return super.sequenceEqual(second, equalityComparer);
    }
    toJoinedString(separator = "", selector = Functions.Identity) {
        const s = this._source;
        return !selector && (s) instanceof (Array)
            ? s.join(separator)
            : super.toJoinedString(separator, selector);
    }
}
class Grouping extends ArrayEnumerable {
    constructor(_groupKey, elements) {
        super(elements);
        this._groupKey = _groupKey;
        this._disposableObjectName = "Grouping";
    }
    get key() {
        return this._groupKey;
    }
}
class Lookup {
    constructor(_dictionary) {
        this._dictionary = _dictionary;
    }
    get count() {
        return this._dictionary.count;
    }
    get(key) {
        return this._dictionary.getValue(key) || null;
    }
    contains(key) {
        return this._dictionary.containsKey(key);
    }
    getEnumerator() {
        const _ = this;
        let enumerator;
        return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            enumerator = _._dictionary.getEnumerator();
        }, (yielder) => {
            if (!enumerator.moveNext())
                return false;
            let current = enumerator.current;
            return yielder.yieldReturn(new Grouping(current.key, current.value));
        }, () => {
            if (enumerator)
                enumerator.dispose();
            enumerator = NULL;
        });
    }
}
class OrderedEnumerable extends FiniteEnumerable {
    constructor(source, keySelector, order, parent, comparer = __WEBPACK_IMPORTED_MODULE_0__System_Compare__["b" /* compare */]) {
        super(NULL);
        this.source = source;
        this.keySelector = keySelector;
        this.order = order;
        this.parent = parent;
        this.comparer = comparer;
        Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["g" /* throwIfEndless */])(source && source.isEndless);
        this._disposableObjectName = "OrderedEnumerable";
    }
    createOrderedEnumerable(keySelector, order) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this.source, keySelector, order, this);
    }
    thenBy(keySelector) {
        return this.createOrderedEnumerable(keySelector, 1 /* Ascending */);
    }
    thenUsing(comparison) {
        return new OrderedEnumerable(this.source, null, 1 /* Ascending */, this, comparison);
    }
    thenByDescending(keySelector) {
        return this.createOrderedEnumerable(keySelector, -1 /* Descending */);
    }
    thenUsingReversed(comparison) {
        return new OrderedEnumerable(this.source, null, -1 /* Descending */, this, comparison);
    }
    getEnumerator() {
        const _ = this;
        _.throwIfDisposed();
        let buffer;
        let indexes;
        let index = 0;
        return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            _.throwIfDisposed();
            index = 0;
            buffer = Enumerable.toArray(_.source);
            indexes = createSortContext(_)
                .generateSortedIndexes(buffer);
        }, (yielder) => {
            _.throwIfDisposed();
            return (index < indexes.length)
                ? yielder.yieldReturn(buffer[indexes[index++]])
                : false;
        }, () => {
            if (buffer)
                buffer.length = 0;
            buffer = NULL;
            if (indexes)
                indexes.length = 0;
            indexes = NULL;
        }, false);
    }
    _onDispose() {
        const _ = this;
        super._onDispose();
        _.source = NULL;
        _.keySelector = NULL;
        _.order = NULL;
        _.parent = NULL;
    }
}
// A private static helper for the weave function.
function nextEnumerator(queue, e) {
    if (e) {
        if (e.moveNext()) {
            queue.enqueue(e);
        }
        else {
            if (e)
                e.dispose();
            return null;
        }
    }
    return e;
}
/**
 * Recursively builds a SortContext chain.
 * @param orderedEnumerable
 * @param currentContext
 * @returns {any}
 */
function createSortContext(orderedEnumerable, currentContext = null) {
    const context = new __WEBPACK_IMPORTED_MODULE_16__System_Collections_Sorting_KeySortedContext__["a" /* KeySortedContext */](currentContext, orderedEnumerable.keySelector, orderedEnumerable.order, orderedEnumerable.comparer);
    if (orderedEnumerable.parent)
        return createSortContext(orderedEnumerable.parent, context);
    return context;
}
//noinspection JSUnusedLocalSymbols
function throwIfDisposed(disposed) {
    if (disposed)
        throw new __WEBPACK_IMPORTED_MODULE_15__System_Disposable_ObjectDisposedException__["a" /* ObjectDisposedException */]("Enumerable");
    return true;
}
function Enumerable(source, ...additional) {
    return enumerableFrom(source, additional);
}
function enumerableFrom(source, additional) {
    let e = Enumerable.fromAny(source);
    if (!e)
        throw new __WEBPACK_IMPORTED_MODULE_14__System_Collections_Enumeration_UnsupportedEnumerableException__["a" /* UnsupportedEnumerableException */]();
    return (additional && additional.length)
        ? e.merge(additional)
        : e;
}
(function (Enumerable) {
    function from(source, ...additional) {
        return enumerableFrom(source, additional);
    }
    Enumerable.from = from;
    function fromAny(source, defaultEnumerable) {
        if (__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isObject(source) || __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isString(source)) {
            if (source instanceof InfiniteLinqEnumerable)
                return source;
            if (__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isArrayLike(source))
                return new ArrayEnumerable(source);
            if (Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["c" /* isEnumerable */])(source))
                return new LinqEnumerable(() => source.getEnumerator(), null, source.isEndless);
            if (Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["d" /* isEnumerator */])(source))
                return new LinqEnumerable(() => source, null, source.isEndless);
            if (Object(__WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["e" /* isIterator */])(source))
                return fromAny(new __WEBPACK_IMPORTED_MODULE_20__System_Collections_Enumeration_IteratorEnumerator__["a" /* IteratorEnumerator */](source));
        }
        else if (__WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].isFunction(source)) {
            return new InfiniteLinqEnumerable(() => new __WEBPACK_IMPORTED_MODULE_23__System_Collections_Enumeration_InfiniteEnumerator__["a" /* InfiniteEnumerator */](source));
        }
        return defaultEnumerable;
    }
    Enumerable.fromAny = fromAny;
    function fromThese(sources) {
        switch (sources ? sources.length : 0) {
            case 0:
                return empty();
            case 1:
                // Allow for validation and throwing...
                return enumerableFrom(sources[0]);
            default:
                return empty().merge(sources);
        }
    }
    Enumerable.fromThese = fromThese;
    function fromOrEmpty(source) {
        return fromAny(source) || empty();
    }
    Enumerable.fromOrEmpty = fromOrEmpty;
    /**
     * Static helper for converting enumerables to an array.
     * @param source
     * @returns {any}
     */
    function toArray(source) {
        if (source instanceof LinqEnumerable)
            return source.toArray();
        return __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["h" /* toArray */](source);
    }
    Enumerable.toArray = toArray;
    function _choice(values) {
        return new InfiniteLinqEnumerable(() => new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](null, (yielder) => {
            throwIfDisposed(!values);
            return yielder.yieldReturn(__WEBPACK_IMPORTED_MODULE_22__System_Random__["a" /* Random */].select.one(values));
        }, true // Is endless!
        ), () => {
            values.length = 0;
            values = NULL;
        });
    }
    Enumerable._choice = _choice;
    function choice(values) {
        let len = values && values.length;
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!len || !isFinite(len))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('length', length);
        return _choice(Object(__WEBPACK_IMPORTED_MODULE_1__System_Collections_Array_copy__["a" /* copy */])(values));
    }
    Enumerable.choice = choice;
    function chooseFrom(...args) {
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!args.length)
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('length', length);
        return _choice(args);
    }
    Enumerable.chooseFrom = chooseFrom;
    function _cycle(values) {
        return new InfiniteLinqEnumerable(() => {
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                index = 0;
            }, // Reinitialize the value just in case the enumerator is restarted.
            (yielder) => {
                throwIfDisposed(!values);
                if (index >= values.length)
                    index = 0;
                return yielder.yieldReturn(values[index++]);
            }, true // Is endless!
            );
        }, () => {
            values.length = 0;
            values = NULL;
        });
    }
    function cycle(values) {
        let len = values && values.length;
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!len || !isFinite(len))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('length', length);
        // Make a copy to avoid modifying the collection as we go.
        return _cycle(Object(__WEBPACK_IMPORTED_MODULE_1__System_Collections_Array_copy__["a" /* copy */])(values));
    }
    Enumerable.cycle = cycle;
    function cycleThrough(...args) {
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!args.length)
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('length', length);
        return _cycle(args);
    }
    Enumerable.cycleThrough = cycleThrough;
    function empty() {
        // Could be single export function instance, but for safety, we'll make a new one.
        return new FiniteEnumerable(getEmptyEnumerator);
    }
    Enumerable.empty = empty;
    function repeat(element, count = Infinity) {
        if (!(count > 0))
            return Enumerable.empty();
        return isFinite(count) && __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count")
            ? new FiniteEnumerable(() => {
                let c = count;
                let index = 0;
                return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => { index = 0; }, (yielder) => (index++ < c) && yielder.yieldReturn(element), null, false);
            })
            : new LinqEnumerable(() => new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](null, (yielder) => yielder.yieldReturn(element), true // Is endless!
            ));
    }
    Enumerable.repeat = repeat;
    function repeatWithFinalize(initializer, finalizer) {
        if (!initializer)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("initializer");
        return new InfiniteLinqEnumerable(() => {
            let element;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                if (initializer)
                    element = initializer();
            }, (yielder) => {
                return initializer
                    ? yielder.yieldReturn(element)
                    : yielder.yieldBreak();
            }, () => {
                element = NULL;
                if (finalizer)
                    finalizer(element);
            }, true // Is endless!
            );
        }, () => {
            initializer = NULL;
            finalizer = VOID0;
        });
    }
    Enumerable.repeatWithFinalize = repeatWithFinalize;
    /**
     * Creates an enumerable of one element.
     * @param element
     * @returns {FiniteEnumerable<T>}
     */
    function make(element) {
        return repeat(element, 1);
    }
    Enumerable.make = make;
    // start and step can be other than integer.
    function range(start, count, step = 1) {
        if (!isFinite(start))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("start", start, "Must be a finite number.");
        if (!(count > 0))
            return empty();
        if (!step)
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("step", step, "Must be a valid value");
        if (!isFinite(step))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("step", step, "Must be a finite number.");
        __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count");
        return new FiniteEnumerable(() => {
            let value;
            let c = count; // Force integer evaluation.
            let index = 0;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                index = 0;
                value = start;
            }, (yielder) => {
                let result = index++ < c
                    && yielder.yieldReturn(value);
                if (result && index < count)
                    value += step;
                return result;
            }, false);
        });
    }
    Enumerable.range = range;
    function rangeDown(start, count, step = 1) {
        step = Math.abs(step) * -1;
        return range(start, count, step);
    }
    Enumerable.rangeDown = rangeDown;
    // step = -1 behaves the same as toNegativeInfinity;
    function toInfinity(start = 0, step = 1) {
        if (!isFinite(start))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("start", start, "Must be a finite number.");
        if (!step)
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("step", step, "Must be a valid value");
        if (!isFinite(step))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("step", step, "Must be a finite number.");
        return new InfiniteLinqEnumerable(() => {
            let value;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                value = start;
            }, (yielder) => {
                let current = value;
                value += step;
                return yielder.yieldReturn(current);
            }, true // Is endless!
            );
        });
    }
    Enumerable.toInfinity = toInfinity;
    function toNegativeInfinity(start = 0, step = 1) {
        return toInfinity(start, -step);
    }
    Enumerable.toNegativeInfinity = toNegativeInfinity;
    function rangeTo(start, to, step = 1) {
        if (isNaN(to) || !isFinite(to))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("to", to, "Must be a finite number.");
        if (step && !isFinite(step))
            throw new __WEBPACK_IMPORTED_MODULE_18__System_Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("step", step, "Must be a finite non-zero number.");
        // This way we adjust for the delta from start and to so the user can say +/- step and it will work as expected.
        step = Math.abs(step);
        return new FiniteEnumerable(() => {
            let value;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => { value = start; }, start < to
                ? yielder => {
                    let result = value <= to && yielder.yieldReturn(value);
                    if (result)
                        value += step;
                    return result;
                }
                : yielder => {
                    let result = value >= to && yielder.yieldReturn(value);
                    if (result)
                        value -= step;
                    return result;
                }, false);
        });
    }
    Enumerable.rangeTo = rangeTo;
    function matches(input, pattern, flags = "") {
        if (input == null)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("input");
        const type = typeof input;
        if (type != __WEBPACK_IMPORTED_MODULE_5__System_Types__["a" /* Type */].STRING)
            throw new Error("Cannot exec RegExp matches of type '" + type + "'.");
        if (pattern instanceof RegExp) {
            flags += (pattern.ignoreCase) ? "i" : "";
            flags += (pattern.multiline) ? "m" : "";
            pattern = pattern.source;
        }
        if (flags.indexOf("g") === -1)
            flags += "g";
        return new FiniteEnumerable(() => {
            let regex;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                regex = new RegExp(pattern, flags);
            }, (yielder) => {
                // Calling regex.exec consecutively on the same input uses the lastIndex to start the next match.
                let match = regex.exec(input);
                return match != null
                    ? yielder.yieldReturn(match)
                    : yielder.yieldBreak();
            });
        });
    }
    Enumerable.matches = matches;
    function generate(factory, count = Infinity) {
        if (!factory)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("factory");
        if (isNaN(count) || count <= 0)
            return Enumerable.empty();
        return isFinite(count) && __WEBPACK_IMPORTED_MODULE_6__System_Integer__["a" /* Integer */].assert(count, "count")
            ? new FiniteEnumerable(() => {
                let c = count;
                let index = 0;
                return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                    index = 0;
                }, (yielder) => {
                    throwIfDisposed(!factory);
                    let current = index++;
                    return current < c && yielder.yieldReturn(factory(current));
                }, false);
            }, () => {
                factory = NULL;
            })
            : new InfiniteLinqEnumerable(() => {
                let index = 0;
                return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                    index = 0;
                }, (yielder) => {
                    throwIfDisposed(!factory);
                    return yielder.yieldReturn(factory(index++));
                }, true // Is endless!
                );
            }, () => {
                factory = NULL;
            });
    }
    Enumerable.generate = generate;
    var random;
    (function (random) {
        function floats(maxExclusive = 1) {
            return generate(__WEBPACK_IMPORTED_MODULE_22__System_Random__["a" /* Random */].generate(maxExclusive));
        }
        random.floats = floats;
        function integers(boundary, inclusive) {
            return generate(__WEBPACK_IMPORTED_MODULE_22__System_Random__["a" /* Random */].generate.integers(boundary, inclusive));
        }
        random.integers = integers;
    })(random = Enumerable.random || (Enumerable.random = {}));
    function unfold(seed, valueFactory, skipSeed = false) {
        if (!valueFactory)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]("factory");
        return new InfiniteLinqEnumerable(() => {
            let index = 0;
            let value;
            let isFirst;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                index = 0;
                value = seed;
                isFirst = !skipSeed;
            }, (yielder) => {
                throwIfDisposed(!valueFactory);
                let i = index++;
                if (isFirst)
                    isFirst = false;
                else
                    value = valueFactory(value, i);
                return yielder.yieldReturn(value);
            }, true // Is endless!
            );
        }, () => {
            valueFactory = NULL;
        });
    }
    Enumerable.unfold = unfold;
    function forEach(enumerable, action, max = Infinity) {
        // Will properly dispose created enumerable.
        // Will throw if enumerable is endless.
        return __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["a" /* forEach */](enumerable, action, max);
    }
    Enumerable.forEach = forEach;
    function map(enumerable, selector) {
        // Will properly dispose created enumerable.
        // Will throw if enumerable is endless.
        return __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["f" /* map */](enumerable, selector);
    }
    Enumerable.map = map;
    // Slightly optimized versions for numbers.
    function max(values) {
        const v = values
            .takeUntil(v => v == +Infinity, true)
            .aggregate(Functions.Greater);
        return v === VOID0 ? NaN : v;
    }
    Enumerable.max = max;
    function min(values) {
        const v = values
            .takeUntil(v => v == -Infinity, true)
            .aggregate(Functions.Lesser);
        return v === VOID0 ? NaN : v;
    }
    Enumerable.min = min;
    /**
     * Takes any set of collections of the same type and weaves them together.
     * @param enumerables
     * @returns {Enumerable<T>}
     */
    function weave(enumerables) {
        if (!enumerables)
            throw new __WEBPACK_IMPORTED_MODULE_17__System_Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('enumerables');
        let disposed = false;
        return new LinqEnumerable(() => {
            let queue;
            let mainEnumerator;
            let index;
            return new __WEBPACK_IMPORTED_MODULE_9__System_Collections_Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
                throwIfDisposed(disposed);
                index = 0;
                queue = new __WEBPACK_IMPORTED_MODULE_11__System_Collections_Queue__["a" /* Queue */]();
                mainEnumerator = __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](enumerables);
            }, (yielder) => {
                throwIfDisposed(disposed);
                let e = null;
                // First pass...
                if (mainEnumerator) {
                    while (!e && mainEnumerator.moveNext()) {
                        let c = mainEnumerator.current;
                        e = nextEnumerator(queue, c ? __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](c) : NULL);
                    }
                    if (!e)
                        mainEnumerator = null;
                }
                while (!e && queue.tryDequeue(value => {
                    e = nextEnumerator(queue, __WEBPACK_IMPORTED_MODULE_3__System_Collections_Enumeration_Enumerator__["b" /* from */](value));
                })) { }
                return e
                    ? yielder.yieldReturn(e.current)
                    : yielder.yieldBreak();
            }, () => {
                if (queue) {
                    __WEBPACK_IMPORTED_MODULE_12__System_Disposable_dispose__["a" /* dispose */].these.noCopy(queue.dump());
                    queue = NULL;
                }
                if (mainEnumerator)
                    mainEnumerator.dispose();
                mainEnumerator = null;
            });
        }, () => {
            disposed = true;
        });
    }
    Enumerable.weave = weave;
})(Enumerable || (Enumerable = {}));
/* harmony default export */ __webpack_exports__["default"] = (Enumerable);
//# sourceMappingURL=Linq.js.map

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["areAllEqual"] = areAllEqual;
/* harmony export (immutable) */ __webpack_exports__["areEqual"] = areEqual;
/* harmony export (immutable) */ __webpack_exports__["areEquivalent"] = areEquivalent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


/*  validateSize: Utility for quick validation/invalidation of array equality.
    Why this way?  Why not pass a closure for the last return?
    Reason: Performance and avoiding the creation of new functions/closures. */
function validateSize(a, b) {
    // Both valid and are same object, or both are null/undefined.
    if (a && b && a === b || !a && !b)
        return true;
    // At this point, at least one has to be non-null.
    if (!a || !b)
        return false;
    const len = a.length;
    if (len !== b.length)
        return false;
    // If both are arrays and have zero length, they are equal.
    if (len === 0)
        return true;
    // Return the length for downstream processing.
    return len;
}
function areAllEqual(arrays, strict = true, equalityComparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */]) {
    if (!arrays)
        throw new Error("ArgumentNullException: 'arrays' cannot be null.");
    if (arrays.length < 2)
        throw new Error("Cannot compare a set of arrays less than 2.");
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isFunction(strict)) {
        equalityComparer = strict;
        strict = true;
    }
    const first = arrays[0];
    for (let i = 1, l = arrays.length; i < l; i++) {
        if (!areEqual(first, arrays[i], strict, equalityComparer))
            return false;
    }
    return true;
}
function areEqual(a, b, strict = true, equalityComparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */]) {
    const len = validateSize(a, b);
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isBoolean(len))
        return len;
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isFunction(strict)) {
        equalityComparer = strict;
        strict = true;
    }
    for (let i = 0; i < len; i++) {
        if (!equalityComparer(a[i], b[i], strict))
            return false;
    }
    return true;
}
function internalSort(a, comparer) {
    if (!a || a.length < 2)
        return a;
    const len = a.length;
    let b;
    if (len > 65536)
        b = new Array(len);
    else {
        b = [];
        b.length = len;
    }
    for (let i = 0; i < len; i++) {
        b[i] = a[i];
    }
    b.sort(comparer);
    return b;
}
function areEquivalent(a, b, comparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["b" /* compare */]) {
    const len = validateSize(a, b);
    if (__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isBoolean(len))
        return len;
    // There might be a better more performant way to do this, but for the moment, this
    // works quite well.
    a = internalSort(a, comparer);
    b = internalSort(b, comparer);
    for (let i = 0; i < len; i++) {
        if (comparer(a[i], b[i]) !== 0)
            return false;
    }
    return true;
}
//# sourceMappingURL=Compare.js.map

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:import-name
var StringNode_1 = __webpack_require__(39);
exports.StringNode = StringNode_1.StringNode;
__webpack_require__(31);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var NamedNode_1 = __webpack_require__(40);
var StringNode = /** @class */function (_super) {
    __extends(StringNode, _super);
    function StringNode(node) {
        return _super.call(this, node) || this;
    }
    Object.defineProperty(StringNode.prototype, "Value", {
        get: function get() {
            return _super.prototype.getValue.call(this);
        },
        set: function set(value) {
            _super.prototype.setValue.call(this, value);
        },
        enumerable: true,
        configurable: true
    });
    StringNode.prototype.AddFirst = function (value) {
        if (typeof value === 'string') {
            return _super.prototype.AddFirst.call(this, new StringNode(value));
        }
        return _super.prototype.AddFirst.call(this, value);
    };
    StringNode.prototype.AddLast = function (value) {
        if (typeof value === 'string') {
            return _super.prototype.AddLast.call(this, new StringNode(value));
        }
        return _super.prototype.AddLast.call(this, value);
    };
    StringNode.prototype.AddNext = function (value) {
        if (typeof value === 'string') {
            return _super.prototype.AddNext.call(this, new StringNode(value));
        }
        return _super.prototype.AddNext.call(this, value);
    };
    StringNode.prototype.AddPrevious = function (value) {
        if (typeof value === 'string') {
            return _super.prototype.AddPrevious.call(this, new StringNode(value));
        }
        return _super.prototype.AddPrevious.call(this, value);
    };
    return StringNode;
}(NamedNode_1.NamedNode);
exports.StringNode = StringNode;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __webpack_require__(41);
var NamedNode = /** @class */function (_super) {
    __extends(NamedNode, _super);
    function NamedNode(node) {
        var _this = this;
        if (node !== undefined) {
            _this = _super.call(this, node) || this;
        }
        return _this;
    }
    Object.defineProperty(NamedNode.prototype, "Name", {
        get: function get() {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    NamedNode.prototype.set = function (name) {
        this.name = name;
    };
    // #region Traversal
    NamedNode.prototype.Child = function (name) {
        return _super.prototype.Children.call(this).where(function (node) {
            return node.Name === name;
        }).first();
    };
    NamedNode.prototype.Ancestors = function (nameOrInclusiveDepth, inclusiveDepth) {
        if (typeof nameOrInclusiveDepth !== 'string') {
            return _super.prototype.Ancestors.call(this, nameOrInclusiveDepth);
        }
        return _super.prototype.Ancestors.call(this, inclusiveDepth).where(function (node) {
            return node.Name === nameOrInclusiveDepth;
        });
    };
    NamedNode.prototype.AncestorsAndSelf = function (nameOrInclusiveDepth, inclusiveDepth) {
        if (typeof nameOrInclusiveDepth !== 'string') {
            return _super.prototype.AncestorsAndSelf.call(this, nameOrInclusiveDepth);
        }
        return _super.prototype.AncestorsAndSelf.call(this, inclusiveDepth).where(function (node) {
            return node.Name === nameOrInclusiveDepth;
        });
    };
    NamedNode.prototype.Children = function (name) {
        return name === undefined ? _super.prototype.Children.call(this) : _super.prototype.Children.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.NextsFromSelf = function (name) {
        return name === undefined ? _super.prototype.NextsFromSelf.call(this) : _super.prototype.NextsFromSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.NextsFromSelfAndSelf = function (name) {
        return name === undefined ? _super.prototype.NextsFromSelfAndSelf.call(this) : _super.prototype.NextsFromSelfAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.NextsFromLast = function (name) {
        return name === undefined ? _super.prototype.NextsFromLast.call(this) : _super.prototype.NextsFromLast.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.NextsFromLastAndSelf = function (name) {
        return name === undefined ? _super.prototype.NextsFromLastAndSelf.call(this) : _super.prototype.NextsFromLastAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.PrevsFromFirst = function (name) {
        return name === undefined ? _super.prototype.PrevsFromFirst.call(this) : _super.prototype.PrevsFromFirst.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.PrevsFromFirstAndSelf = function (name) {
        return name === undefined ? _super.prototype.PrevsFromFirstAndSelf.call(this) : _super.prototype.PrevsFromFirstAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.PrevsFromSelf = function (name) {
        return name === undefined ? _super.prototype.PrevsFromSelf.call(this) : _super.prototype.PrevsFromSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.PrevsFromSelfAndSelf = function (name) {
        return name === undefined ? _super.prototype.PrevsFromSelfAndSelf.call(this) : _super.prototype.PrevsFromSelfAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.Descendants = function (nameOrInclusiveDepth, inclusiveDepth) {
        if (typeof nameOrInclusiveDepth !== 'string') {
            return _super.prototype.Descendants.call(this, nameOrInclusiveDepth);
        }
        return _super.prototype.Descendants.call(this, inclusiveDepth).where(function (node) {
            return node.Name === nameOrInclusiveDepth;
        });
    };
    NamedNode.prototype.DescendantsAndSelf = function (nameOrInclusiveDepth, inclusiveDepth) {
        if (typeof nameOrInclusiveDepth !== 'string') {
            return _super.prototype.DescendantsAndSelf.call(this, nameOrInclusiveDepth);
        }
        return _super.prototype.DescendantsAndSelf.call(this, inclusiveDepth).where(function (node) {
            return node.Name === nameOrInclusiveDepth;
        });
    };
    NamedNode.prototype.Siblings = function (nameOrInclusiveEachLength, inclusiveEachLength) {
        if (typeof nameOrInclusiveEachLength !== 'string') {
            return _super.prototype.Siblings.call(this, nameOrInclusiveEachLength);
        }
        return _super.prototype.Siblings.call(this, inclusiveEachLength).where(function (node) {
            return node.Name === nameOrInclusiveEachLength;
        });
    };
    NamedNode.prototype.SiblingsAndSelf = function (nameOrInclusiveEachLength, inclusiveEachLength) {
        if (typeof nameOrInclusiveEachLength !== 'string') {
            return _super.prototype.SiblingsAndSelf.call(this, nameOrInclusiveEachLength);
        }
        return _super.prototype.SiblingsAndSelf.call(this, inclusiveEachLength).where(function (node) {
            return node.Name === nameOrInclusiveEachLength;
        });
    };
    NamedNode.prototype.AncestorsAndSiblingsAfterSelf = function (name) {
        return name === undefined ? _super.prototype.AncestorsAndSiblingsAfterSelf.call(this) : _super.prototype.AncestorsAndSiblingsAfterSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.AncestorsAndSiblingsAfterSelfAndSelf = function (name) {
        return name === undefined ? _super.prototype.AncestorsAndSiblingsAfterSelfAndSelf.call(this) : _super.prototype.AncestorsAndSiblingsAfterSelfAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.AncestorsAndSiblingsBeforeSelf = function (name) {
        return name === undefined ? _super.prototype.AncestorsAndSiblingsBeforeSelf.call(this) : _super.prototype.AncestorsAndSiblingsBeforeSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.AncestorsAndSiblingsBeforeSelfAndSelf = function (name) {
        return name === undefined ? _super.prototype.AncestorsAndSiblingsBeforeSelfAndSelf.call(this) : _super.prototype.AncestorsAndSiblingsBeforeSelfAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.AncestorsWithSingleChild = function (name) {
        return name === undefined ? _super.prototype.AncestorsWithSingleChild.call(this) : _super.prototype.AncestorsWithSingleChild.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.AncestorsWithSingleChildAndSelf = function (name) {
        return name === undefined ? _super.prototype.AncestorsWithSingleChildAndSelf.call(this) : _super.prototype.AncestorsWithSingleChildAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.DescendantsOfSingle = function (name) {
        return name === undefined ? _super.prototype.DescendantsOfSingle.call(this) : _super.prototype.DescendantsOfSingle.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.DescendantsOfSingleAndSelf = function (name) {
        return name === undefined ? _super.prototype.DescendantsOfSingleAndSelf.call(this) : _super.prototype.DescendantsOfSingleAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.DescendantsOfFirstChild = function (name) {
        return name === undefined ? _super.prototype.DescendantsOfFirstChild.call(this) : _super.prototype.DescendantsOfFirstChild.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    NamedNode.prototype.DescendantsOfFirstChildAndSelf = function (name) {
        return name === undefined ? _super.prototype.DescendantsOfFirstChildAndSelf.call(this) : _super.prototype.DescendantsOfFirstChildAndSelf.call(this).where(function (node) {
            return node.Name === name;
        });
    };
    return NamedNode;
}(Node_1.Node);
exports.NamedNode = NamedNode;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:import-name
var Linq_1 = __webpack_require__(32);
var StringBuilder_1 = __webpack_require__(62);
var InvalidOperationException_1 = __webpack_require__(7);
__webpack_require__(31);
var Node = /** @class */function () {
    /// Initializes a new instance of the Node class with a default value.
    function Node(value) {
        this.firstChild = null;
        this.parent = null;
        this.cyclicPrev = this.ThisNode;
        this.cyclicNext = this.ThisNode;
        this.Value = value === undefined ? null : value;
    }
    Object.defineProperty(Node.prototype, "ThisNode", {
        get: function get() {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "FirstSibling", {
        get: function get() {
            return this.Parent != null ? this.Parent.FirstChild : this.ThisNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "LastSibling", {
        get: function get() {
            return this.Parent != null ? this.Parent.FirstChild.CyclicPrev : this.ThisNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "FirstChild", {
        get: function get() {
            return this._firstChild;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "firstChild", {
        set: function set(firstChild) {
            this._firstChild = firstChild;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "LastChild", {
        get: function get() {
            return this.FirstChild != null ? this.FirstChild.CyclicPrev : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "Parent", {
        get: function get() {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "parent", {
        set: function set(parent) {
            this._parent = parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "CyclicPrev", {
        get: function get() {
            return this._cyclicPrev;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "cyclicPrev", {
        set: function set(cyclicPrev) {
            this._cyclicPrev = cyclicPrev;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "CyclicNext", {
        get: function get() {
            return this._cyclicNext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "cyclicNext", {
        set: function set(cyclicNext) {
            this._cyclicNext = cyclicNext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "Prev", {
        get: function get() {
            return this.CyclicPrev !== this.LastSibling ? this.CyclicPrev : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "Next", {
        get: function get() {
            return this.CyclicNext !== this.FirstSibling ? this.CyclicNext : null;
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.getValue = function () {
        return this._value;
    };
    Node.prototype.setValue = function (value) {
        this._value = value;
    };
    Object.defineProperty(Node.prototype, "Value", {
        get: function get() {
            return this._value;
        },
        set: function set(value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "ChildrenCount", {
        get: function get() {
            return this.Children().count();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "LengthFromDeepestChild", {
        get: function get() {
            return this.GetLengthFromDeepestChild();
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.GetLengthFromDeepestChild = function () {
        var maxLength = 0;
        this.Children().forEach(function (child) {
            var length = child.GetLengthFromDeepestChild() + 1;
            if (maxLength < length) {
                maxLength = length;
            }
        });
        return maxLength;
    };
    Node.prototype.ChildAtOrNull = function (index) {
        return this.Children().elementAtOrDefault(index);
    };
    Node.prototype.Ancestors = function (inclusiveDepth) {
        return inclusiveDepth === undefined ? this.AncestorsAndSelf().skip(1) : this.Ancestors().take(inclusiveDepth);
    };
    Node.prototype.AncestorsAndSelf = function (inclusiveDepth) {
        if (inclusiveDepth !== undefined) {
            return this.AncestorsAndSelf().take(inclusiveDepth + 1);
        }
        function generator(_this) {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.Parent;
                        _a.label = 3;
                    case 3:
                        if (node != null) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.Children = function () {
        function generator(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.FirstChild;
                        if (!(node !== null)) return [3 /*break*/, 4];
                        terminal = node;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicNext;
                        _a.label = 3;
                    case 3:
                        if (node !== terminal) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.ReverseChildren = function () {
        function generator(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.LastChild;
                        if (node == null) {
                            return [2 /*return*/];
                        }
                        terminal = node;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicPrev;
                        _a.label = 3;
                    case 3:
                        if (node !== terminal) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.NextsFromSelf = function () {
        function generator1(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.CyclicNext;
                        terminal = _this.FirstSibling;
                        _a.label = 1;
                    case 1:
                        if (!(node !== terminal)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicNext;
                        return [3 /*break*/, 1];
                    case 3:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator1(this));
    };
    Node.prototype.NextsFromSelfAndSelf = function () {
        return Linq_1.default.repeat(this.ThisNode, 1).concat(this.NextsFromSelf());
    };
    Node.prototype.NextsFromLast = function () {
        function generator(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.LastSibling;
                        terminal = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        if (!(node !== terminal)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicPrev;
                        return [3 /*break*/, 1];
                    case 3:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.NextsFromLastAndSelf = function () {
        return this.NextsFromLast().concat(Linq_1.default.repeat(this.ThisNode, 1));
    };
    Node.prototype.PrevsFromFirst = function () {
        function generator(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.FirstSibling;
                        terminal = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        if (!(node !== terminal)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicNext;
                        return [3 /*break*/, 1];
                    case 3:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.PrevsFromFirstAndSelf = function () {
        return this.PrevsFromFirst().concat(Linq_1.default.repeat(this.ThisNode, 1));
    };
    Node.prototype.PrevsFromSelf = function () {
        function generator(_this) {
            var node, terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.CyclicPrev;
                        terminal = _this.LastSibling;
                        _a.label = 1;
                    case 1:
                        if (!(node !== terminal)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicPrev;
                        return [3 /*break*/, 1];
                    case 3:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.PrevsFromSelfAndSelf = function () {
        return Linq_1.default.repeat(this.ThisNode, 1).concat(this.PrevsFromSelf());
    };
    Node.prototype.Descendants = function (inclusiveDepth) {
        function generator(_this) {
            var start, cursor, start, cursor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(inclusiveDepth === undefined)) return [3 /*break*/, 8];
                        start = _this.ThisNode;
                        cursor = start;
                        if (!(cursor.FirstChild != null)) return [3 /*break*/, 7];
                        cursor = cursor.FirstChild;
                        return [4 /*yield*/, cursor];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (false) return [3 /*break*/, 7];
                        _a.label = 3;
                    case 3:
                        if (!(cursor.FirstChild != null)) return [3 /*break*/, 5];
                        cursor = cursor.FirstChild;
                        return [4 /*yield*/, cursor];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 5:
                        while (cursor.Next == null) {
                            cursor = cursor.Parent;
                            if (cursor === start) {
                                return [2 /*return*/];
                            }
                        }
                        cursor = cursor.CyclicNext;
                        return [4 /*yield*/, cursor];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 7:
                        return [3 /*break*/, 15];
                    case 8:
                        start = _this.ThisNode;
                        cursor = start;
                        if (!(cursor.FirstChild != null && inclusiveDepth > 0)) return [3 /*break*/, 15];
                        cursor = cursor.FirstChild;
                        inclusiveDepth--;
                        return [4 /*yield*/, cursor];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (false) return [3 /*break*/, 15];
                        _a.label = 11;
                    case 11:
                        if (!(cursor.FirstChild != null && inclusiveDepth > 0)) return [3 /*break*/, 13];
                        cursor = cursor.FirstChild;
                        inclusiveDepth--;
                        return [4 /*yield*/, cursor];
                    case 12:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 13:
                        while (cursor.Next == null) {
                            cursor = cursor.Parent;
                            inclusiveDepth++;
                            if (cursor === start) {
                                return [2 /*return*/];
                            }
                        }
                        cursor = cursor.CyclicNext;
                        return [4 /*yield*/, cursor];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 15:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.DescendantsAndSelf = function (inclusiveDepth) {
        return inclusiveDepth === undefined ? Linq_1.default.repeat(this.ThisNode, 1).concat(this.Descendants()) : Linq_1.default.repeat(this.ThisNode, 1).concat(this.Descendants(inclusiveDepth));
    };
    Node.prototype.Siblings = function (inclusiveEachLength) {
        if (inclusiveEachLength !== undefined) {
            return this.PrevsFromSelf().take(inclusiveEachLength).reverse().concat(this.NextsFromSelf().take(inclusiveEachLength));
        }
        function generator(_this) {
            var first, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        first = _this.FirstSibling;
                        node = first;
                        _a.label = 1;
                    case 1:
                        if (!(node !== _this)) return [3 /*break*/, 3];
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicNext;
                        return [3 /*break*/, 1];
                    case 3:
                        node = node.CyclicNext;
                        _a.label = 4;
                    case 4:
                        if (!(node !== first)) return [3 /*break*/, 6];
                        return [4 /*yield*/, node];
                    case 5:
                        _a.sent();
                        node = node.CyclicNext;
                        return [3 /*break*/, 4];
                    case 6:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.SiblingsAndSelf = function (inclusiveEachLength) {
        if (inclusiveEachLength !== undefined) {
            return this.PrevsFromSelf().take(inclusiveEachLength).reverse().concat(Linq_1.default.repeat(this.ThisNode, 1)).concat(this.NextsFromSelf().take(inclusiveEachLength));
        }
        function generator(_this) {
            var first, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        first = _this.FirstSibling;
                        node = first;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.CyclicNext;
                        _a.label = 3;
                    case 3:
                        if (node !== first) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AncestorsAndSiblingsAfterSelf = function () {
        function generator(_this) {
            var node, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        e = node.NextsFromSelf().getEnumerator();
                        _a.label = 2;
                    case 2:
                        if (!e.moveNext()) return [3 /*break*/, 4];
                        return [4 /*yield*/, e.current];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4:
                        node = node.Parent;
                        _a.label = 5;
                    case 5:
                        if (node != null) return [3 /*break*/, 1];
                        _a.label = 6;
                    case 6:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AncestorsAndSiblingsAfterSelfAndSelf = function () {
        return Linq_1.default.repeat(this.ThisNode, 1).concat(this.AncestorsAndSiblingsAfterSelf());
    };
    Node.prototype.AncestorsAndSiblingsBeforeSelf = function () {
        return this.AncestorsAndSiblingsBeforeSelfAndSelf().skip(1);
    };
    Node.prototype.AncestorsAndSiblingsBeforeSelfAndSelf = function () {
        function generator(_this) {
            var node, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        e = node.PrevsFromSelfAndSelf().getEnumerator();
                        _a.label = 2;
                    case 2:
                        if (!e.moveNext()) return [3 /*break*/, 4];
                        return [4 /*yield*/, e.current];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4:
                        node = node.Parent;
                        _a.label = 5;
                    case 5:
                        if (node != null) return [3 /*break*/, 1];
                        _a.label = 6;
                    case 6:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AncestorWithSingleChild = function () {
        function generator(_this) {
            var node, lastNode;
            return __generator(this, function (_a) {
                node = _this.ThisNode;
                while (node === node.CyclicNext) {
                    lastNode = node;
                    node = node.Parent;
                    if (node == null) {
                        return [2 /*return*/, lastNode];
                    }
                }
                return [2 /*return*/, node];
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AncestorsWithSingleChild = function () {
        function generator(_this) {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        if (!(node === node.CyclicNext)) return [3 /*break*/, 3];
                        node = node.Parent;
                        if (node == null) {
                            return [3 /*break*/, 3];
                        }
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AncestorsWithSingleChildAndSelf = function () {
        function generator(_this) {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        return [4 /*yield*/, node];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(node === node.CyclicNext)) return [3 /*break*/, 4];
                        node = node.Parent;
                        if (node == null) {
                            return [3 /*break*/, 4];
                        }
                        return [4 /*yield*/, node];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.DescendantsOfSingle = function () {
        return this.DescendantsOfSingleAndSelf().skip(1);
    };
    Node.prototype.DescendantsOfSingleAndSelf = function () {
        function generator(_this) {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.FirstChild;
                        _a.label = 3;
                    case 3:
                        if (node != null && node === node.CyclicNext) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.DescendantsOfFirstChild = function () {
        return this.DescendantsOfFirstChildAndSelf().skip(1);
    };
    Node.prototype.DescendantsOfFirstChildAndSelf = function () {
        function generator(_this) {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = _this.ThisNode;
                        _a.label = 1;
                    case 1:
                        return [4 /*yield*/, node];
                    case 2:
                        _a.sent();
                        node = node.FirstChild;
                        _a.label = 3;
                    case 3:
                        if (node != null) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        return [2 /*return*/];
                }
            });
        }
        return Linq_1.default.fromAny(generator(this));
    };
    Node.prototype.AddPrevious = function (node) {
        console.assert(node != null);
        console.assert(node.Parent == null);
        console.assert(this.Parent != null);
        if (this.Parent.FirstChild === this) {
            this.Parent.firstChild = node;
        }
        return this.AddPreviousIgnoringFirstChild(node);
    };
    Node.prototype.AddNext = function (node) {
        console.assert(node != null);
        console.assert(node.Parent == null);
        console.assert(this.Parent != null);
        return this.CyclicNext.AddPreviousIgnoringFirstChild(node);
    };
    Node.prototype.AddFirst = function (node) {
        console.assert(node != null);
        console.assert(node.Parent == null);
        return this.AddFirstPrivate(node);
    };
    Node.prototype.AddFirstPrivate = function (node) {
        this.AddLastPrivate(node);
        this.firstChild = node;
        return node;
    };
    Node.prototype.AddPreviousIgnoringFirstChild = function (node) {
        node.parent = this.Parent;
        node.cyclicNext = this.ThisNode;
        node.cyclicPrev = this.CyclicPrev;
        this.CyclicPrev.cyclicNext = node;
        this.cyclicPrev = node;
        return node;
    };
    Node.prototype.AddLast = function (node) {
        console.assert(node != null);
        console.assert(node.Parent == null);
        return this.AddLastPrivate(node);
    };
    Node.prototype.AddLastPrivate = function (node) {
        var second = this.FirstChild;
        if (second == null) {
            node.parent = this.ThisNode;
            node.cyclicNext = node;
            node.cyclicPrev = node;
            this.firstChild = node;
        } else {
            second.AddPreviousIgnoringFirstChild(node);
        }
        return node;
    };
    Node.prototype.Replace = function (newNode) {
        if (this.Parent == null) {
            throw new InvalidOperationException_1.InvalidOperationException('A root node cannot be replaced.');
        }
        newNode.parent = this.Parent;
        newNode.cyclicNext = this.CyclicNext;
        newNode.cyclicPrev = this.CyclicPrev;
        this.CyclicPrev.cyclicNext = newNode; // prev.next = newNode
        this.CyclicNext.cyclicPrev = newNode;
        newNode.CyclicPrev.cyclicNext = newNode;
        if (this.Parent.FirstChild === this) {
            this.Parent.firstChild = newNode;
        }
        this.cyclicNext = null;
        this.cyclicPrev = null;
        this.parent = null;
    };
    Node.prototype.Remove = function () {
        if (this.Parent == null) {
            throw new InvalidOperationException_1.InvalidOperationException('A root node cannot be removed.');
        }
        var next = this.CyclicNext;
        if (next !== this) {
            this.CyclicPrev.cyclicNext = next;
            next.cyclicPrev = this.CyclicPrev;
            if (this.Parent.FirstChild === this) {
                this.Parent.firstChild = next;
            }
        } else {
            this.Parent.firstChild = null;
        }
        this.cyclicNext = null;
        this.cyclicPrev = null;
        this.parent = null;
    };
    Node.prototype.RemoveRecoverably = function () {
        var _this = this;
        if (this.Parent == null) {
            throw new InvalidOperationException_1.InvalidOperationException('A root node cannot be removed.');
        }
        var next = this.CyclicNext;
        if (next !== this) {
            this.CyclicPrev.cyclicNext = next;
            next.cyclicPrev = this.CyclicPrev;
            if (this.Parent.FirstChild === this) {
                this.Parent.firstChild = next;
                return function () {
                    next.Parent.firstChild = _this.ThisNode;
                    _this.CyclicPrev.cyclicNext = _this.ThisNode;
                    next.cyclicPrev = _this.ThisNode;
                };
            }
            return function () {
                _this.CyclicPrev.cyclicNext = _this.ThisNode;
                next.cyclicPrev = _this.ThisNode;
            };
        }
        var parent = this.Parent;
        parent.firstChild = null;
        return function () {
            parent.firstChild = _this.ThisNode;
        };
    };
    Node.prototype.toString = function () {
        var builder = new StringBuilder_1.StringBuilder();
        this.ToStringPrivate(this.ThisNode, 0, builder);
        return builder.toString();
    };
    Node.prototype.ToStringPrivate = function (node, depth, builder) {
        var _this = this;
        if (node == null) {
            return;
        }
        for (var i = 0; i < depth; i++) {
            builder.append('  ');
        }
        builder.appendLine(!node.Value != null ? node.Value.toString() : '');
        var children = node.Children();
        children.forEach(function (child) {
            _this.ToStringPrivate(child, depth + 1, builder);
        });
    };
    return Node;
}();
exports.Node = Node;

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */
const NAME = 'Exception';
/**
 * Represents errors that occur during application execution.
 */
class Exception {
    /**
     * Initializes a new instance of the Exception class with a specified error message and optionally a reference to the inner exception that is the cause of this exception.
     * @param message
     * @param innerException
     * @param beforeSealing This delegate is used to allow actions to occur just before this constructor finishes.  Since some compilers do not allow the use of 'this' before super.
     */
    constructor(message, innerException, beforeSealing) {
        this.message = message;
        const _ = this;
        this.name = _.getName();
        this.data = {};
        if (innerException)
            _.data['innerException'] = innerException;
        /* Originally intended to use 'get' accessors for properties,
         * But debuggers don't display these readily yet.
         * Object.freeze has to be used carefully, but will prevent overriding values at runtime.
         */
        if (beforeSealing)
            beforeSealing(_);
        // Node has a .stack, let's use it...
        try {
            let stack = eval("new Error()").stack;
            stack = stack
                && stack
                    .replace(/^Error\n/, '')
                    .replace(/(.|\n)+\s+at new.+/, '')
                || '';
            this.stack = _.toStringWithoutBrackets() + stack;
        }
        catch (ex) { }
        Object.freeze(_);
    }
    /**
     * A string representation of the error type.
     * The default is 'Error'.
     */
    getName() { return NAME; }
    /**
     * The string representation of the Exception instance.
     */
    toString() {
        return `[${this.toStringWithoutBrackets()}]`;
    }
    toStringWithoutBrackets() {
        const _ = this;
        const m = _.message;
        return _.name + (m ? (': ' + m) : '');
    }
    /**
     * Clears the data object.
     */
    dispose() {
        const data = this.data;
        for (let k in data) {
            if (data.hasOwnProperty(k))
                delete data[k];
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Exception;

/* unused harmony default export */ var _unused_webpack_default_export = (Exception);
//# sourceMappingURL=Exception.js.map

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TaskHandlerBase__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


// noinspection JSUnusedLocalSymbols
class TaskHandler extends __WEBPACK_IMPORTED_MODULE_0__TaskHandlerBase__["a" /* TaskHandlerBase */] {
    constructor(_action) {
        super();
        this._action = _action;
        if (!_action)
            throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('action');
    }
    _onExecute() {
        this._action();
    }
    _onDispose() {
        super._onDispose();
        this._action = null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TaskHandler;

/* unused harmony default export */ var _unused_webpack_default_export = (TaskHandler);
//# sourceMappingURL=TaskHandler.js.map

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Disposable_DisposableBase__ = __webpack_require__(9);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

// noinspection JSUnusedLocalSymbols
const NAME = "TaskHandlerBase";
/**
 * A simple class for handling potentially repeated executions either deferred or immediate.
 */
class TaskHandlerBase extends __WEBPACK_IMPORTED_MODULE_0__Disposable_DisposableBase__["a" /* DisposableBase */] {
    constructor() {
        super();
        this._disposableObjectName = NAME;
        this._timeoutId = null;
        this._status = 0 /* Created */;
    }
    get isScheduled() {
        return !!this._timeoutId;
    }
    /**
     * Schedules/Reschedules triggering the task.
     * @param defer Optional time to wait until triggering.
     */
    start(defer = 0) {
        this.throwIfDisposed();
        this.cancel();
        this._status = 1 /* WaitingToRun */;
        if (!(defer > 0))
            defer = 0; // A negation is used to catch edge cases.
        if (isFinite(defer))
            this._timeoutId = setTimeout(TaskHandlerBase._handler, defer, this);
    }
    runSynchronously() {
        this.throwIfDisposed();
        TaskHandlerBase._handler(this);
    }
    getStatus() {
        return this._status;
    }
    get status() {
        return this.getStatus();
    }
    // Use a static function here to avoid recreating a new function every time.
    static _handler(d) {
        d.cancel();
        d._status = 2 /* Running */;
        try {
            d._onExecute();
            d._status = 3 /* RanToCompletion */;
        }
        catch (ex) {
            d._status = 5 /* Faulted */;
        }
    }
    _onDispose() {
        this.cancel();
        this._status = null;
    }
    cancel() {
        const id = this._timeoutId;
        if (id) {
            clearTimeout(id);
            this._timeoutId = null;
            this._status = 4 /* Cancelled */;
            return true;
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TaskHandlerBase;

/* unused harmony default export */ var _unused_webpack_default_export = (TaskHandlerBase);
//# sourceMappingURL=TaskHandlerBase.js.map

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinkedNodeList__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Disposable_ObjectPool__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__getIdentifier__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DictionaryBase__ = __webpack_require__(48);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */







// noinspection JSUnusedLocalSymbols
const VOID0 = void 0;
// LinkedList for Dictionary
class HashEntry {
    constructor(key, value, previous, next) {
        this.key = key;
        this.value = value;
        this.previous = previous;
        this.next = next;
    }
}
let linkedListPool;
//noinspection JSUnusedLocalSymbols
function linkedNodeList(recycle) {
    if (!linkedListPool)
        linkedListPool
            = new __WEBPACK_IMPORTED_MODULE_4__Disposable_ObjectPool__["a" /* ObjectPool */](20, () => new __WEBPACK_IMPORTED_MODULE_3__LinkedNodeList__["a" /* LinkedNodeList */](), r => r.clear());
    if (!recycle)
        return linkedListPool.take();
    linkedListPool.add(recycle);
}
class Dictionary extends __WEBPACK_IMPORTED_MODULE_6__DictionaryBase__["a" /* default */] {
    constructor(_keyGenerator) {
        super();
        this._keyGenerator = _keyGenerator;
        this._entries = linkedNodeList();
        this._buckets = {};
    }
    _onDispose() {
        super._onDispose();
        const _ = this;
        _._entries = null;
        _._buckets = null;
        _._hashGenerator = null;
    }
    getCount() {
        return this._entries && this._entries.unsafeCount || 0;
    }
    _getBucket(hash, createIfMissing) {
        if (hash == null || !createIfMissing && !this.getCount())
            return null;
        if (!__WEBPACK_IMPORTED_MODULE_1__Types__["a" /* Type */].isPrimitiveOrSymbol(hash))
            console.warn("Key type not indexable and could cause Dictionary to be extremely slow.");
        const buckets = this._buckets;
        let bucket = buckets[hash];
        if (createIfMissing && !bucket)
            buckets[hash]
                = bucket
                    = linkedNodeList();
        return bucket || null;
    }
    _getBucketEntry(key, hash, bucket) {
        if (key == null || !this.getCount())
            return null;
        const _ = this, comparer = _._keyGenerator, compareKey = comparer ? comparer(key) : key;
        if (!bucket)
            bucket = _._getBucket(hash || Object(__WEBPACK_IMPORTED_MODULE_5__getIdentifier__["a" /* getIdentifier */])(compareKey));
        return bucket
            && (comparer
                ? bucket.find(e => comparer(e.key) === compareKey)
                : bucket.find(e => e.key === compareKey));
    }
    _getEntry(key) {
        const e = this._getBucketEntry(key);
        return e && e.value;
    }
    getValue(key) {
        const e = this._getEntry(key);
        return e ? e.value : VOID0;
    }
    _setValueInternal(key, value) {
        const _ = this;
        const buckets = _._buckets, entries = _._entries, compareKey = _._keyGenerator ? _._keyGenerator(key) : key, hash = Object(__WEBPACK_IMPORTED_MODULE_5__getIdentifier__["a" /* getIdentifier */])(compareKey);
        let bucket = _._getBucket(hash);
        const bucketEntry = bucket && _._getBucketEntry(key, hash, bucket);
        // Entry exits? Delete or update
        if (bucketEntry) {
            const b = bucket;
            if (value === VOID0) {
                let x = b.removeNode(bucketEntry), y = entries.removeNode(bucketEntry.value);
                if (x && !b.count) {
                    delete buckets[hash];
                    linkedNodeList(b);
                    bucket = null;
                }
                if (x !== y)
                    throw "Entries and buckets are out of sync.";
                if (x)
                    return true;
            }
            else {
                // We don't expose the internal hash entries so replacing the value is ok.
                const old = bucketEntry.value.value;
                bucketEntry.value.value = value;
                return !Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(value, old);
            }
        }
        else if (value !== VOID0) {
            if (!bucket)
                bucket = _._getBucket(hash, true);
            if (!bucket)
                throw new Error(`"${hash}" cannot be added to lookup table.`);
            let entry = new HashEntry(key, value);
            entries.addNode(entry);
            bucket.addNode(new HashEntry(key, entry));
            return true;
        }
        return false;
    }
    _clearInternal() {
        const _ = this;
        const buckets = _._buckets;
        // Ensure reset and clean...
        for (let key in buckets) {
            if (buckets.hasOwnProperty(key)) {
                let bucket = buckets[key];
                delete buckets[key];
                linkedNodeList(bucket);
            }
        }
        return _._entries.clear();
    }
    /*
     * Note: super.getEnumerator() works perfectly well,
     * but enumerating the internal linked node list is much more efficient.
     */
    getEnumerator() {
        const _ = this;
        _.throwIfDisposed();
        let ver, currentEntry;
        return new __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            _.throwIfDisposed();
            ver = _._version;
            currentEntry = _._entries.first;
        }, (yielder) => {
            if (currentEntry) {
                _.throwIfDisposed();
                _.assertVersion(ver);
                const result = { key: currentEntry.key, value: currentEntry.value };
                currentEntry = currentEntry.next || null;
                return yielder.yieldReturn(result);
            }
            return yielder.yieldBreak();
        });
    }
    getKeys() {
        const _ = this;
        const result = [];
        let e = _._entries && _._entries.first;
        while (e) {
            result.push(e.key);
            e = e.next;
        }
        return result;
    }
    getValues() {
        const _ = this;
        const result = [];
        let e = _._entries && _._entries.first;
        while (e) {
            result.push(e.value);
            e = e.next;
        }
        return result;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Dictionary;

/* unused harmony default export */ var _unused_webpack_default_export = (Dictionary);
//# sourceMappingURL=Dictionary.js.map

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Text_Utility__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */





// noinspection JSUnusedLocalSymbols
/*****************************
 * IMPORTANT NOTES ABOUT PERFORMANCE:
 * http://jsperf.com/simulating-a-queue
 *
 * Adding to an array is very fast, but modifying is slow.
 * LinkedList wins when modifying contents.
 * http://stackoverflow.com/questions/166884/array-versus-linked-list
 *****************************/
/**
 * This class is useful for managing a list of linked nodes, but it does not protect against modifying individual links.
 * If the consumer modifies a link (sets the previous or next value) it will effectively break the collection.
 *
 * It is possible to declare a node type of any kind as long as it contains a previous and next value that can reference another node.
 * Although not as safe as the included LinkedList, this class has less overhead and is more flexible.
 *
 * The count (or length) of this LinkedNodeList is not tracked since it could be corrupted at any time.
 */
class LinkedNodeList {
    constructor() {
        this._first = null;
        this._last = null;
        this.unsafeCount = 0;
        this._version = 0;
    }
    assertVersion(version) {
        if (version !== this._version)
            throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_InvalidOperationException__["InvalidOperationException"]("Collection was modified.");
        return true;
    }
    /**
     * The first node.  Will be null if the collection is empty.
     */
    get first() {
        return this._first;
    }
    /**
     * The last node.
     */
    get last() {
        return this._last;
    }
    /**
     * Iteratively counts the number of linked nodes and returns the value.
     * @returns {number}
     */
    get count() {
        let next = this._first;
        let i = 0;
        while (next) {
            i++;
            next = next.next;
        }
        return i;
    }
    forEach(action, ignoreVersioning) {
        const _ = this;
        let current = null, next = _.first; // Be sure to track the next node so if current node is removed.
        const version = _._version;
        let index = 0;
        do {
            if (!ignoreVersioning)
                _.assertVersion(version);
            current = next;
            next = current && current.next;
        } while (current
            && action(current, index++) !== false);
        return index;
    }
    map(selector) {
        if (!selector)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('selector');
        const result = [];
        this.forEach((node, i) => {
            result.push(selector(node, i));
        });
        return result;
    }
    /**
     * Erases the linked node's references to each other and returns the number of nodes.
     * @returns {number}
     */
    clear() {
        const _ = this;
        let n, cF = 0, cL = 0;
        // First, clear in the forward direction.
        n = _._first;
        _._first = null;
        while (n) {
            cF++;
            let current = n;
            n = n.next;
            current.next = null;
        }
        // Last, clear in the reverse direction.
        n = _._last;
        _._last = null;
        while (n) {
            cL++;
            let current = n;
            n = n.previous;
            current.previous = null;
        }
        if (cF !== cL)
            console.warn('LinkedNodeList: Forward versus reverse count does not match when clearing. Forward: ' + cF + ", Reverse: " + cL);
        _._version++;
        _.unsafeCount = 0;
        return cF;
    }
    /**
     * Clears the list.
     */
    dispose() {
        this.clear();
    }
    /**
     * Iterates the list to see if a node exists.
     * @param node
     * @returns {boolean}
     */
    contains(node) {
        return this.indexOf(node) != -1;
    }
    /**
     * Gets the index of a particular node.
     * @param index
     */
    getNodeAt(index) {
        if (index < 0)
            return null;
        let next = this._first;
        let i = 0;
        while (next && i++ < index) {
            next = next.next || null;
        }
        return next;
    }
    find(condition) {
        let node = null;
        this.forEach((n, i) => {
            if (condition(n, i)) {
                node = n;
                return false;
            }
        });
        return node;
    }
    /**
     * Iterates the list to find the specified node and returns its index.
     * @param node
     * @returns {boolean}
     */
    indexOf(node) {
        if (node && (node.previous || node.next)) {
            let index = 0;
            let c, n = this._first;
            do {
                c = n;
                if (c === node)
                    return index;
                index++;
            } while ((n = c && c.next));
        }
        return -1;
    }
    /**
     * Removes the first node and returns true if successful.
     * @returns {boolean}
     */
    removeFirst() {
        return !!this._first && this.removeNode(this._first);
    }
    /**
     * Removes the last node and returns true if successful.
     * @returns {boolean}
     */
    removeLast() {
        return !!this._last && this.removeNode(this._last);
    }
    /**
     * Removes the specified node.
     * Returns true if successful and false if not found (already removed).
     * @param node
     * @returns {boolean}
     */
    removeNode(node) {
        if (node == null)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('node');
        const _ = this;
        const prev = node.previous || null, next = node.next || null;
        let a = false, b = false;
        if (prev)
            prev.next = next;
        else if (_._first == node)
            _._first = next;
        else
            a = true;
        if (next)
            next.previous = prev;
        else if (_._last == node)
            _._last = prev;
        else
            b = true;
        if (a !== b) {
            throw new __WEBPACK_IMPORTED_MODULE_2__Exceptions_ArgumentException__["a" /* ArgumentException */]('node', Object(__WEBPACK_IMPORTED_MODULE_0__Text_Utility__["a" /* format */])("Provided node is has no {0} reference but is not the {1} node!", a ? "previous" : "next", a ? "first" : "last"));
        }
        const removed = !a && !b;
        if (removed) {
            _._version++;
            _.unsafeCount--;
            node.previous = null;
            node.next = null;
        }
        return removed;
    }
    /**
     * Adds a node to the end of the list.
     * @param node
     * @returns {LinkedNodeList}
     */
    addNode(node) {
        this.addNodeAfter(node);
        return this;
    }
    /**
     * Inserts a node before the specified 'before' node.
     * If no 'before' node is specified, it inserts it as the first node.
     * @param node
     * @param before
     * @returns {LinkedNodeList}
     */
    addNodeBefore(node, before = null) {
        assertValidDetached(node);
        const _ = this;
        if (!before) {
            before = _._first;
        }
        if (before) {
            let prev = before.previous;
            node.previous = prev;
            node.next = before;
            before.previous = node;
            if (prev)
                prev.next = node;
            if (before == _._first)
                _._first = node;
        }
        else {
            _._first = _._last = node;
        }
        _._version++;
        _.unsafeCount++;
        return this;
    }
    /**
     * Inserts a node after the specified 'after' node.
     * If no 'after' node is specified, it appends it as the last node.
     * @param node
     * @param after
     * @returns {LinkedNodeList}
     */
    addNodeAfter(node, after = null) {
        assertValidDetached(node);
        const _ = this;
        if (!after) {
            after = _._last;
        }
        if (after) {
            let next = after.next;
            node.next = next;
            node.previous = after;
            after.next = node;
            if (next)
                next.previous = node;
            if (after == _._last)
                _._last = node;
        }
        else {
            _._first = _._last = node;
        }
        _._version++;
        _.unsafeCount++;
        return _;
    }
    /**
     * Takes and existing node and replaces it.
     * @param node
     * @param replacement
     * @returns {any}
     */
    replace(node, replacement) {
        if (node == null)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('node');
        if (node == replacement)
            return this;
        assertValidDetached(replacement, 'replacement');
        const _ = this;
        replacement.previous = node.previous;
        replacement.next = node.next;
        if (node.previous)
            node.previous.next = replacement;
        if (node.next)
            node.next.previous = replacement;
        if (node == _._first)
            _._first = replacement;
        if (node == _._last)
            _._last = replacement;
        _._version++;
        return _;
    }
    static valueEnumeratorFrom(list) {
        if (!list)
            throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('list');
        let current, next, version;
        return new __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            // Initialize anchor...
            current = null;
            next = list.first;
            version = list._version;
        }, (yielder) => {
            if (next) {
                list.assertVersion(version);
                current = next;
                next = current && current.next;
                return yielder.yieldReturn(current.value);
            }
            return yielder.yieldBreak();
        });
    }
    static copyValues(list, array, index = 0) {
        if (list && list.first) {
            if (!array)
                throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('array');
            list.forEach((node, i) => {
                array[index + i] = node.value;
            });
        }
        return array;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LinkedNodeList;

function assertValidDetached(node, propName = 'node') {
    if (node == null)
        throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */](propName);
    if (node.next || node.previous)
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_InvalidOperationException__["InvalidOperationException"]("Cannot add a node to a LinkedNodeList that is already linked.");
}
/* unused harmony default export */ var _unused_webpack_default_export = (LinkedNodeList);
//# sourceMappingURL=LinkedNodeList.js.map

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getIdentifier;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

const VOID0 = void 0;
const NULL = "null", GET_SYMBOL = "getSymbol", GET_HASH_CODE = "getHashCode";
function getIdentifier(obj, throwIfUnknown = false) {
    if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isPropertyKey(obj))
        return obj;
    if (obj === null)
        return NULL;
    if (obj === VOID0)
        return __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].UNDEFINED;
    // See ISymbolizable.
    if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].hasMethod(obj, GET_SYMBOL)) {
        return obj.getSymbol();
    }
    // See IHashable.
    if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].hasMethod(obj, GET_HASH_CODE)) {
        return obj.getHashCode();
    }
    if (throwIfUnknown) {
        if (__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isFunction(throwIfUnknown))
            return throwIfUnknown(obj);
        else
            throw "Cannot create known identity.";
    }
    return (typeof obj.toString == __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].FUNCTION)
        ? obj.toString()
        : Object.prototype.toString.call(obj);
}
/* unused harmony default export */ var _unused_webpack_default_export = (getIdentifier);
//# sourceMappingURL=getIdentifier.js.map

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Enumeration_Enumerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CollectionBase__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__KeyNotFoundException__ = __webpack_require__(52);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */








// noinspection JSUnusedLocalSymbols
const VOID0 = void 0;
// Design Note: Should DictionaryAbstractBase be IDisposable?
class DictionaryBase extends __WEBPACK_IMPORTED_MODULE_2__CollectionBase__["a" /* CollectionBase */] {
    constructor(source) {
        super(source);
    }
    //noinspection JSUnusedLocalSymbols
    _onValueModified(key, value, old) {
    }
    _addInternal(item) {
        if (!item)
            throw new __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('item', 'Dictionaries must use a valid key/value pair. \'' + item + '\' is not allowed.');
        return Object(__WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__["a" /* extractKeyValue */])(item, (key, value) => this.addByKeyValue(key, value));
    }
    _clearInternal() {
        const _ = this;
        let count = 0;
        for (let key of _.keys) {
            if (_.removeByKey(key))
                count++;
        }
        return count;
    }
    contains(item) {
        // Should never have a null object in the collection.
        if (!item || !this.getCount())
            return false;
        return Object(__WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__["a" /* extractKeyValue */])(item, (key, value) => {
            // Leave as variable for debugging...
            let v = this.getValue(key);
            return Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(value, v);
        });
    }
    _removeInternal(item) {
        if (!item)
            return 0;
        return Object(__WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__["a" /* extractKeyValue */])(item, (key, value) => {
            // Leave as variable for debugging...
            let v = this.getValue(key);
            return (Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(value, v) && this.removeByKey(key))
                ? 1 : 0;
        });
    }
    get keys() { return this.getKeys(); }
    get values() { return this.getValues(); }
    addByKeyValue(key, value) {
        if (value === VOID0)
            throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__["InvalidOperationException"]("Cannot add 'undefined' as a value.");
        const _ = this;
        if (_.containsKey(key)) {
            const ex = new __WEBPACK_IMPORTED_MODULE_5__Exceptions_InvalidOperationException__["InvalidOperationException"]("Adding a key/value when the key already exists.");
            ex.data['key'] = key;
            ex.data['value'] = value;
            throw ex;
        }
        return _.setValue(key, value);
    }
    getAssuredValue(key) {
        const value = this.getValue(key);
        if (value === VOID0)
            throw new __WEBPACK_IMPORTED_MODULE_7__KeyNotFoundException__["a" /* KeyNotFoundException */](`Key '${key}' not found.`);
        return value;
    }
    tryGetValue(key, out) {
        const value = this.getValue(key);
        if (value !== VOID0) {
            out(value);
            return true;
        }
        return false;
    }
    /**
     * Sets the value of an entry.
     * It's important to know that 'undefined' cannot exist as a value in the dictionary and is used as a flag for removal.
     * @param key
     * @param value
     * @returns {boolean}
     */
    setValue(key, value) {
        // setValue shouldn't need to worry about recursion...
        const _ = this;
        _.assertModifiable();
        let changed = false;
        const old = _.getValue(key); // get the old value here and pass to internal.
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(value, old) && _._setValueInternal(key, value)) {
            changed = true;
            _._onValueModified(key, value, old);
        }
        _._signalModification(changed);
        return changed;
    }
    containsKey(key) {
        return !!this._getEntry(key);
    }
    containsValue(value) {
        const e = this.getEnumerator();
        while (e.moveNext()) {
            if (Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(e.current, value, true)) {
                e.dispose();
                return true;
            }
        }
        return false;
    }
    removeByKey(key) {
        return this.setValue(key, VOID0);
    }
    removeByValue(value) {
        const _ = this;
        let count = 0;
        for (let key of _.getKeys()) {
            if (Object(__WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */])(_.getValue(key), value, true)) {
                _.removeByKey(key);
                count++;
            }
        }
        return count;
    }
    importEntries(pairs) {
        // Allow piping through to trigger onModified properly.
        return super.importEntries(pairs);
    }
    _importEntries(pairs) {
        const _ = this;
        if (!pairs)
            return 0;
        let changed = 0;
        Object(__WEBPACK_IMPORTED_MODULE_1__Enumeration_Enumerator__["a" /* forEach */])(pairs, pair => Object(__WEBPACK_IMPORTED_MODULE_6__KeyValueExtract__["a" /* extractKeyValue */])(pair, (key, value) => {
            if (_._setValueInternal(key, value))
                changed++;
        }));
        return changed;
    }
    getEnumerator() {
        const _ = this;
        _.throwIfDisposed();
        let ver, keys, len, index = 0;
        return new __WEBPACK_IMPORTED_MODULE_3__Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            _.throwIfDisposed();
            ver = _._version; // Track the version since getKeys is a copy.
            keys = _.getKeys();
            len = keys.length;
        }, (yielder) => {
            _.throwIfDisposed();
            _.assertVersion(ver);
            while (index < len) {
                const key = keys[index++], value = _.getValue(key);
                if (value !== VOID0)
                    return yielder.yieldReturn({ key: key, value: value });
            }
            return yielder.yieldBreak();
        });
    }
}
/* unused harmony export DictionaryBase */

/* harmony default export */ __webpack_exports__["a"] = (DictionaryBase);
//# sourceMappingURL=DictionaryBase.js.map

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
// Need to spoof this so WebPack doesn't panic (warnings).
let r;
try {
    r = eval('require');
}
catch (ex) { }
//noinspection JSUnusedGlobalSymbols
const isCommonJS = !!(r && r.resolve);
/* harmony export (immutable) */ __webpack_exports__["a"] = isCommonJS;

//noinspection JSUnusedGlobalSymbols
const isRequireJS = !!(r && r.toUrl && r.defined);
/* harmony export (immutable) */ __webpack_exports__["c"] = isRequireJS;

/*
 * Ensure is in a real Node environment, with a `process.nextTick`.
 * To see through fake Node environments:
 * Mocha test runner - exposes a `process` global without a `nextTick`
 * Browserify - exposes a `process.nexTick` function that uses
 * `setTimeout`. In this case `setImmediate` is preferred because
 * it is faster. Browserify's `process.toString()` yields
 * "[object Object]", while in a real Node environment
 * `process.nextTick()` yields "[object process]".
 */
const isNodeJS = typeof process == "object"
    && process.toString() === "[object process]"
    && process.nextTick != void 0;
/* harmony export (immutable) */ __webpack_exports__["b"] = isNodeJS;

//noinspection JSUnusedAssignment
try {
    Object.freeze(exports);
}
catch (ex) { }
//# sourceMappingURL=Environment.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(50)))

/***/ }),
/* 50 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isKeyValuePair */
/* unused harmony export assertKey */
/* unused harmony export assertTuple */
/* unused harmony export assertNotUndefined */
/* harmony export (immutable) */ __webpack_exports__["a"] = extractKeyValue;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */



const VOID0 = void 0, DOT = '.', KEY = 'key', VALUE = 'value', ITEM = 'item', ITEM_1 = ITEM + '[1]', ITEM_VALUE = ITEM + DOT + VALUE, INVALID_KVP_MESSAGE = 'Invalid type.  Must be a KeyValuePair or Tuple of length 2.', CANNOT_BE_UNDEFINED = 'Cannot equal undefined.';
function isKeyValuePair(kvp) {
    return kvp && kvp.hasOwnProperty(KEY) && kvp.hasOwnProperty(VALUE);
}
function assertKey(key, name = ITEM) {
    assertNotUndefined(key, name + DOT + KEY);
    if (key === null)
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */](name + DOT + KEY);
    return key;
}
function assertTuple(tuple, name = ITEM) {
    if (tuple.length != 2)
        throw new __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__["a" /* ArgumentException */](name, 'KeyValuePair tuples must be of length 2.');
    assertKey(tuple[0], name);
}
function assertNotUndefined(value, name) {
    if (value === VOID0)
        throw new __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__["a" /* ArgumentException */](name, CANNOT_BE_UNDEFINED);
    return value;
}
function extractKeyValue(item, to) {
    let key, value;
    if (__WEBPACK_IMPORTED_MODULE_2__Types__["a" /* Type */].isArrayLike(item)) {
        assertTuple(item);
        key = item[0];
        value = assertNotUndefined(item[1], ITEM_1);
    }
    else if (isKeyValuePair(item)) {
        key = assertKey(item.key);
        value = assertNotUndefined(item.value, ITEM_VALUE);
    }
    else {
        throw new __WEBPACK_IMPORTED_MODULE_0__Exceptions_ArgumentException__["a" /* ArgumentException */](ITEM, INVALID_KVP_MESSAGE);
    }
    return to(key, value);
}
/* unused harmony default export */ var _unused_webpack_default_export = (extractKeyValue);
//# sourceMappingURL=KeyValueExtract.js.map

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__ = __webpack_require__(8);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/system.collections.generic.KeyNotFoundException(v=vs.110).aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'KeyNotFoundException ';
class KeyNotFoundException extends __WEBPACK_IMPORTED_MODULE_0__Exceptions_SystemException__["a" /* SystemException */] {
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyNotFoundException;

/* unused harmony default export */ var _unused_webpack_default_export = (KeyNotFoundException);
//# sourceMappingURL=KeyNotFoundException.js.map

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Array_Utility__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_NotImplementedException__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CollectionBase__ = __webpack_require__(17);
/*!
* @author electricessence / https://github.com/electricessence/
* Based Upon: http://referencesource.microsoft.com/#System/CompMod/system/collections/generic/queue.cs
* Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
*/









// noinspection JSUnusedLocalSymbols
const VOID0 = void 0;
const MINIMUM_GROW = 4;
const SHRINK_THRESHOLD = 32; // Unused?
// var GROW_FACTOR: number = 200;  // double each time
const GROW_FACTOR_HALF = 100;
const DEFAULT_CAPACITY = MINIMUM_GROW;
const emptyArray = Object.freeze([]);
class Queue extends __WEBPACK_IMPORTED_MODULE_8__CollectionBase__["a" /* CollectionBase */] {
    constructor(source, equalityComparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["a" /* areEqual */]) {
        super(VOID0, equalityComparer);
        const _ = this;
        _._head = 0;
        _._tail = 0;
        _._size = 0;
        if (!source)
            _._array = emptyArray;
        else {
            if (__WEBPACK_IMPORTED_MODULE_2__Types__["a" /* Type */].isNumber(source)) {
                const capacity = source;
                assertIntegerZeroOrGreater(capacity, "capacity");
                _._array = capacity
                    ? __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["c" /* initialize */](capacity)
                    : emptyArray;
            }
            else {
                const se = source;
                _._array = __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["c" /* initialize */](__WEBPACK_IMPORTED_MODULE_2__Types__["a" /* Type */].isArrayLike(se)
                    ? se.length
                    : DEFAULT_CAPACITY);
                _._importEntries(se);
            }
        }
        _._capacity = _._array.length;
    }
    getCount() {
        return this._size;
    }
    _addInternal(item) {
        const _ = this;
        const size = _._size;
        let len = _._capacity;
        if (size == len) {
            let newCapacity = len * GROW_FACTOR_HALF;
            if (newCapacity < len + MINIMUM_GROW)
                newCapacity = len + MINIMUM_GROW;
            _.setCapacity(newCapacity);
            len = _._capacity;
        }
        const tail = _._tail;
        _._array[tail] = item;
        _._tail = (tail + 1) % len;
        _._size = size + 1;
        return true;
    }
    //noinspection JSUnusedLocalSymbols
    _removeInternal(item, max) {
        //noinspection HtmlUnknownTag
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_NotImplementedException__["a" /* NotImplementedException */]("ICollection\<T\>.remove is not implemented in Queue\<T\>" +
            " since it would require destroying the underlying array to remove the item.");
    }
    _clearInternal() {
        const _ = this;
        const array = _._array, head = _._head, tail = _._tail, size = _._size;
        if (head < tail)
            __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["a" /* clear */](array, head, tail);
        else {
            __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["a" /* clear */](array, head);
            __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["a" /* clear */](array, 0, tail);
        }
        _._head = 0;
        _._tail = 0;
        _._size = 0;
        _.trimExcess();
        return size;
    }
    _onDispose() {
        super._onDispose();
        const _ = this;
        if (_._array != emptyArray) {
            _._array.length = _._capacity = 0;
            _._array = emptyArray;
        }
    }
    /**
     * Dequeues entries into an array.
     */
    dump(max = Infinity) {
        const _ = this;
        const result = [];
        if (isFinite(max)) {
            __WEBPACK_IMPORTED_MODULE_3__Integer__["a" /* Integer */].assertZeroOrGreater(max);
            if (max !== 0) {
                while (max-- && _._tryDequeueInternal(value => {
                    result.push(value);
                })) { }
            }
        }
        else {
            while (_._tryDequeueInternal(value => {
                result.push(value);
            })) { }
        }
        _.trimExcess();
        _._signalModification();
        return result;
    }
    forEach(action) {
        return super.forEach(action, true);
    }
    setCapacity(capacity) {
        const _ = this;
        assertIntegerZeroOrGreater(capacity, "capacity");
        const array = _._array, len = _._capacity;
        if (capacity > len)
            _.throwIfDisposed();
        if (capacity == len)
            return this;
        const head = _._head, tail = _._tail, size = _._size;
        // Special case where we can simply extend the length of the array. (JavaScript only)
        if (array != emptyArray && capacity > len && head < tail) {
            array.length = _._capacity = capacity;
            _._version++;
            return this;
        }
        // We create a new array because modifying an existing one could be slow.
        const newArray = __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["c" /* initialize */](capacity);
        if (size > 0) {
            if (head < tail) {
                __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["b" /* copyTo */](array, newArray, head, 0, size);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["b" /* copyTo */](array, newArray, head, 0, len - head);
                __WEBPACK_IMPORTED_MODULE_1__Array_Utility__["b" /* copyTo */](array, newArray, 0, len - head, tail);
            }
        }
        _._array = newArray;
        _._capacity = capacity;
        _._head = 0;
        _._tail = (size == capacity) ? 0 : size;
        _._signalModification(true);
        return this;
    }
    enqueue(item) {
        return this.add(item);
    }
    _tryDequeueInternal(out) {
        const _ = this;
        if (!_._size)
            return false;
        const array = _._array, head = _._head;
        const removed = _._array[head];
        array[head] = null;
        _._head = (head + 1) % _._capacity;
        _._size--;
        _._incrementModified();
        out(removed);
        return true;
    }
    dequeue(throwIfEmpty = false) {
        const _ = this;
        _.assertModifiable();
        let result = VOID0;
        if (!this.tryDequeue(value => { result = value; }) && throwIfEmpty)
            throw new __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__["InvalidOperationException"]("Cannot dequeue an empty queue.");
        return result;
    }
    /**
     * Checks to see if the queue has entries an pulls an entry from the head of the queue and passes it to the out handler.
     * @param out The 'out' handler that receives the value if it exists.
     * @returns {boolean} True if a value was retrieved.  False if not.
     */
    tryDequeue(out) {
        const _ = this;
        if (!_._size)
            return false;
        _.assertModifiable();
        // A single dequeue shouldn't need update recursion tracking...
        if (this._tryDequeueInternal(out)) {
            // This may preemptively trigger the _onModified.
            if (_._size < _._capacity / 2)
                _.trimExcess(SHRINK_THRESHOLD);
            _._signalModification();
            return true;
        }
        return false;
    }
    _getElement(index) {
        assertIntegerZeroOrGreater(index, "index");
        const _ = this;
        return _._array[(_._head + index) % _._capacity];
    }
    peek(throwIfEmpty = false) {
        if (this._size == 0) {
            if (throwIfEmpty)
                throw new __WEBPACK_IMPORTED_MODULE_6__Exceptions_InvalidOperationException__["InvalidOperationException"]("Cannot call peek on an empty queue.");
            return VOID0;
        }
        return this._array[this._head];
    }
    trimExcess(threshold) {
        const _ = this;
        const size = _._size;
        if (size < Math.floor(_._capacity * 0.9) && (!threshold && threshold !== 0 || isNaN(threshold) || threshold < size))
            _.setCapacity(size);
    }
    getEnumerator() {
        const _ = this;
        _.throwIfDisposed();
        let index, version, size;
        return new __WEBPACK_IMPORTED_MODULE_4__Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            version = _._version;
            size = _._size;
            index = 0;
        }, (yielder) => {
            _.throwIfDisposed();
            _.assertVersion(version);
            if (index == size)
                return yielder.yieldBreak();
            return yielder.yieldReturn(_._getElement(index++));
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Queue;

function assertZeroOrGreater(value, property) {
    if (value < 0)
        throw new __WEBPACK_IMPORTED_MODULE_7__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */](property, value, "Must be greater than zero");
    return true;
}
function assertIntegerZeroOrGreater(value, property) {
    __WEBPACK_IMPORTED_MODULE_3__Integer__["a" /* Integer */].assert(value, property);
    return assertZeroOrGreater(value, property);
}
/* unused harmony default export */ var _unused_webpack_default_export = (Queue);
//# sourceMappingURL=Queue.js.map

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export indexOf */
/* unused harmony export contains */
/* unused harmony export replace */
/* unused harmony export updateRange */
/* harmony export (immutable) */ __webpack_exports__["a"] = clear;
/* unused harmony export register */
/* unused harmony export findIndex */
/* unused harmony export forEach */
/* unused harmony export applyTo */
/* unused harmony export removeIndex */
/* unused harmony export remove */
/* unused harmony export repeat */
/* unused harmony export range */
/* unused harmony export rangeUntil */
/* unused harmony export distinct */
/* unused harmony export flatten */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentException__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__initialize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__copy__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_6__initialize__["a"]; });
/* unused harmony reexport copy */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__copy__["b"]; });
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */









const CBN = 'Cannot be null.', CB0 = 'Cannot be zero.', CBL0 = 'Cannot be less than zero.', VFN = 'Must be a valid finite number';
/**
 * Checks to see where the provided array contains an item/value.
 * If the array value is null, then -1 is returned.
 * @param array
 * @param item
 * @param {function?} equalityComparer
 * @returns {number}
 */
function indexOf(array, item, equalityComparer = __WEBPACK_IMPORTED_MODULE_2__Compare__["a" /* areEqual */]) {
    const len = array && array.length;
    if (len) {
        // NaN NEVER evaluates its equality so be careful.
        if ((array) instanceof (Array) && !__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isTrueNaN(item))
            return array.indexOf(item);
        for (let i = 0; i < len; i++) {
            // 'areEqual' includes NaN==NaN evaluation.
            if (equalityComparer(array[i], item))
                return i;
        }
    }
    return -1;
}
/**
 * Checks to see if the provided array contains an item.
 * If the array value is null, then false is returned.
 * @param array
 * @param item
 * @param {function?} equalityComparer
 * @returns {boolean}
 */
function contains(array, item, equalityComparer = __WEBPACK_IMPORTED_MODULE_2__Compare__["a" /* areEqual */]) {
    return indexOf(array, item, equalityComparer) != -1;
}
/**
 * Finds and replaces a value from an array.  Will replaces all instances unless a maximum is specified.
 * @param array
 * @param old
 * @param newValue
 * @param max
 * @returns {number}
 */
function replace(array, old, newValue, max = Infinity) {
    if (!array || !array.length || max === 0)
        return 0;
    if (max < 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('max', max, CBL0);
    if (!max)
        max = Infinity; // just in case.
    let count = 0;
    for (let i = 0, len = array.length; i < len; i++) {
        if (array[i] === old) {
            array[i] = newValue;
            ++count;
            if (count == max)
                break;
        }
    }
    return count;
}
/**
 * Replaces values of an array across a range of indexes.
 * @param array
 * @param value
 * @param start
 * @param stop
 */
function updateRange(array, value, start = 0, stop) {
    if (!array)
        return;
    __WEBPACK_IMPORTED_MODULE_1__Integer__["a" /* Integer */].assertZeroOrGreater(start, 'start');
    if (!stop && stop !== 0)
        stop = array.length;
    __WEBPACK_IMPORTED_MODULE_1__Integer__["a" /* Integer */].assert(stop, 'stop');
    if (stop < start)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("stop", stop, "is less than start");
    for (let i = start; i < stop; i++) {
        array[i] = value;
    }
}
/**
 * Clears (sets to null) values of an array across a range of indexes.
 * @param array
 * @param start
 * @param stop
 */
function clear(array, start = 0, stop) {
    updateRange(array, null, start, stop);
}
/**
 * Ensures a value exists within an array.  If not found, adds to the end.
 * @param array
 * @param item
 * @param {function?} equalityComparer
 * @returns {boolean}
 */
function register(array, item, equalityComparer = __WEBPACK_IMPORTED_MODULE_2__Compare__["a" /* areEqual */]) {
    if (!array)
        throw new __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('array', CBN);
    let len = array.length; // avoid querying .length more than once. *
    const ok = !len || !contains(array, item, equalityComparer);
    if (ok)
        array[len] = item; // * push would query length again.
    return ok;
}
/**
 * Returns the first index of which the provided predicate returns true.
 * Returns -1 if always false.
 * @param array
 * @param predicate
 * @returns {number}
 */
function findIndex(array, predicate) {
    if (!array)
        throw new __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('array', CBN);
    if (!__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isFunction(predicate))
        throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentException__["a" /* ArgumentException */]('predicate', 'Must be a function.');
    const len = array.length;
    if (!__WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].isNumber(len, true) || len < 0)
        throw new __WEBPACK_IMPORTED_MODULE_3__Exceptions_ArgumentException__["a" /* ArgumentException */]('array', 'Does not have a valid length.');
    if ((array) instanceof (Array)) {
        for (let i = 0; i < len; i++) {
            if (predicate(array[i], i))
                return i;
        }
    }
    else {
        for (let i = 0; i < len; i++) {
            if ((i) in (array) && predicate(array[i], i))
                return i;
        }
    }
    return -1;
}
function forEach(source, action) {
    if (source && action) {
        // Don't cache the length since it is possible that the underlying array changed.
        for (let i = 0; i < source.length; i++) {
            if (action(source[i], i) === false)
                break;
        }
    }
}
/**
 * Is similar to Array.map() but instead of returning a new array, it updates the existing indexes.
 * Can also be applied to a structure that indexes like an array, but may not be.
 * @param target
 * @param fn
 */
function applyTo(target, fn) {
    if (target && fn) {
        for (let i = 0; i < target.length; i++) {
            target[i] = fn(target[i], i);
        }
    }
}
/**
 * Removes an entry at a specified index.
 * @param array
 * @param index
 * @returns {boolean} True if the value was able to be removed.
 */
function removeIndex(array, index) {
    if (!array)
        throw new __WEBPACK_IMPORTED_MODULE_4__Exceptions_ArgumentNullException__["a" /* ArgumentNullException */]('array', CBN);
    __WEBPACK_IMPORTED_MODULE_1__Integer__["a" /* Integer */].assert(index, 'index');
    if (index < 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('index', index, CBL0);
    const exists = index < array.length;
    if (exists)
        array.splice(index, 1);
    return exists;
}
/**
 * Finds and removes a value from an array.  Will remove all instances unless a maximum is specified.
 * @param array
 * @param value
 * @param max
 * @param {function?} equalityComparer
 * @returns {number} The number of times the value was found and removed.
 */
function remove(array, value, max = Infinity, equalityComparer = __WEBPACK_IMPORTED_MODULE_2__Compare__["a" /* areEqual */]) {
    if (!array || !array.length || max === 0)
        return 0;
    if (max < 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('max', max, CBL0);
    let count = 0;
    if (!max || !isFinite(max)) {
        // Don't track the indexes and remove in reverse.
        for (let i = (array.length - 1); i >= 0; i--) {
            if (equalityComparer(array[i], value)) {
                array.splice(i, 1);
                ++count;
            }
        }
    }
    else {
        // Since the user will expect it to happen in forward order...
        const found = []; // indexes;
        for (let i = 0, len = array.length; i < len; i++) {
            if (equalityComparer(array[i], value)) {
                found.push(i);
                ++count;
                if (count == max)
                    break;
            }
        }
        for (let i = found.length - 1; i >= 0; i--) {
            array.splice(found[i], 1);
        }
    }
    return count;
}
/**
 * Simply repeats a value the number of times specified.
 * @param element
 * @param count
 * @returns {T[]}
 */
function repeat(element, count) {
    __WEBPACK_IMPORTED_MODULE_1__Integer__["a" /* Integer */].assert(count, 'count');
    if (count < 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('count', count, CBL0);
    const result = Object(__WEBPACK_IMPORTED_MODULE_6__initialize__["a" /* initialize */])(count);
    for (let i = 0; i < count; i++) {
        result[i] = element;
    }
    return result;
}
/**
 * Returns a range of numbers based upon the first value and the step value.
 * @param first
 * @param count
 * @param step
 * @returns {number[]}
 */
function range(first, count, step = 1) {
    if (isNaN(first) || !isFinite(first))
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('first', first, VFN);
    if (isNaN(count) || !isFinite(count))
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('count', count, VFN);
    if (count < 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('count', count, CBL0);
    const result = Object(__WEBPACK_IMPORTED_MODULE_6__initialize__["a" /* initialize */])(count);
    for (let i = 0; i < count; i++) {
        result[i] = first;
        first += step;
    }
    return result;
}
/**
 * Returns a range of numbers based upon the first value and the step value excluding any numbers at or beyond the until value.
 * @param first
 * @param until
 * @param step
 * @returns {number[]}
 */
function rangeUntil(first, until, step = 1) {
    if (step == 0)
        throw new __WEBPACK_IMPORTED_MODULE_5__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]('step', step, CB0);
    return range(first, (until - first) / step, step);
}
function distinct(source) {
    if (!source)
        return []; // Allowing for null facilitates regex filtering.
    const seen = {};
    return source.filter(e => !(e in seen) && (seen[e] = true));
}
/**
 * Takes any arrays within an array and inserts the values contained within in place of that array.
 * For every count higher than 0 in recurseDepth it will attempt an additional pass.  Passing Infinity will flatten all arrays contained.
 * @param a
 * @param recurseDepth
 * @returns {any[]}
 */
function flatten(a, recurseDepth = 0) {
    const result = [];
    for (let i = 0; i < a.length; i++) {
        let x = a[i];
        if ((x) instanceof (Array)) {
            if (recurseDepth > 0)
                x = flatten(x, recurseDepth - 1);
            for (let n = 0; n < x.length; n++)
                result.push(x[n]);
        }
        else
            result.push(x);
    }
    return result;
}
//# sourceMappingURL=Utility.js.map

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemException__ = __webpack_require__(8);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

// noinspection JSUnusedLocalSymbols
const NAME = 'NotImplementedException';
class NotImplementedException extends __WEBPACK_IMPORTED_MODULE_0__SystemException__["a" /* SystemException */] {
    getName() {
        return NAME;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NotImplementedException;

/* unused harmony default export */ var _unused_webpack_default_export = (NotImplementedException);
//# sourceMappingURL=NotImplementedException.js.map

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SortContext__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Functions__ = __webpack_require__(16);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */



// noinspection JSUnusedLocalSymbols
class KeySortedContext extends __WEBPACK_IMPORTED_MODULE_1__SortContext__["a" /* SortContext */] {
    constructor(next, _keySelector, order = 1 /* Ascending */, comparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["b" /* compare */]) {
        super(next, comparer, order);
        this._keySelector = _keySelector;
    }
    compare(a, b) {
        const _ = this;
        let ks = _._keySelector;
        if (!ks || ks == __WEBPACK_IMPORTED_MODULE_2__Functions__["a" /* Functions */].Identity)
            return super.compare(a, b);
        // We force <any> here since it can be a Primitive or IComparable<any>
        const d = __WEBPACK_IMPORTED_MODULE_0__Compare__["b" /* compare */](ks(a), ks(b));
        if (d == 0 && _._next)
            return _._next.compare(a, b);
        return _._order * d;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeySortedContext;

/* unused harmony default export */ var _unused_webpack_default_export = (KeySortedContext);
//# sourceMappingURL=KeySortedContext.js.map

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compare__ = __webpack_require__(1);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

class SortContext {
    constructor(_next, _comparer = __WEBPACK_IMPORTED_MODULE_0__Compare__["b" /* compare */], _order = 1 /* Ascending */) {
        this._next = _next;
        this._comparer = _comparer;
        this._order = _order;
    }
    /**
     * Direction of the comparison.
     * @type {Order}
     */
    get order() { return this._order; }
    /**
     * Generates an array of indexes from the source in order of their expected internalSort without modifying the source.
     * @param source
     * @returns {number[]}
     */
    generateSortedIndexes(source) {
        if (source == null)
            return [];
        const result = source.map((s, i) => i);
        result.sort((a, b) => this.compare(source[a], source[b]));
        return result;
    }
    /**
     * Compares two values based upon SortContext parameters.
     * @param a
     * @param b
     * @returns {any}
     */
    compare(a, b) {
        const _ = this;
        const d = _._comparer(a, b);
        if (d == 0 && _._next)
            return _._next.compare(a, b);
        return _._order * d;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SortContext;

/* unused harmony default export */ var _unused_webpack_default_export = (SortContext);
//# sourceMappingURL=SortContext.js.map

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Random; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Integer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Collections_Array_initialize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__ = __webpack_require__(59);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */



var assert = __WEBPACK_IMPORTED_MODULE_0__Integer__["a" /* Integer */].assert;
/**
 * This module only acts as a utility API for getting random numbers from Math.random().
 * If you need repeatable seeded random numbers then you'll need a separate utility.
 * Highly recommended: https://github.com/ckknight/random-js which has typings under @types/random-js.
 */
var Random;
(function (Random) {
    function r(maxExclusive = 1) {
        return Math.floor(Math.random() * maxExclusive);
    }
    function nr(boundary, inclusive) {
        const a = Math.abs(boundary);
        if (a === 0 || a === 1 && !inclusive)
            return 0;
        if (inclusive)
            boundary += boundary / a;
        return r(boundary);
    }
    function arrayCopy(source) {
        const len = source.length;
        const result = Object(__WEBPACK_IMPORTED_MODULE_1__Collections_Array_initialize__["a" /* initialize */])(len);
        for (let i = 0; i < len; i++) {
            result[i] = source[i];
        }
        return result;
    }
    /**
     * Returns a random integer from 0 to the maxExclusive.
     * Negative numbers are allowed.
     *
     * @param maxExclusive
     * @returns {number}
     */
    function integer(maxExclusive) {
        return next(maxExclusive);
    }
    Random.integer = integer;
    /**
     * Returns a function that generates random floating point numbers up to the maxExclusive value.
     * Useful for generating a random and memoizable set for use with other enumerables.
     * @param maxExclusive
     * @returns {()=>number}
     */
    function generate(maxExclusive = 1) {
        return () => r(maxExclusive);
    }
    Random.generate = generate;
    (function (generate) {
        /**
         * Returns a function that generates random integers up to the boundary.
         * Useful for generating a random and memoizable set for use with other enumerables.
         * @param boundary
         * @param inclusive
         * @returns {()=>number}
         */
        function integers(boundary, inclusive) {
            return () => nr(boundary, inclusive);
        }
        generate.integers = integers;
    })(generate = Random.generate || (Random.generate = {}));
    /**
     * Returns a random integer from 0 to the boundary.
     * Return value will be less than the boundary unless inclusive is set to true.
     * Negative numbers are allowed.
     *
     * @param boundary
     * @param inclusive
     * @returns {number}
     */
    function next(boundary, inclusive) {
        assert(boundary, 'boundary');
        return nr(boundary, inclusive);
    }
    Random.next = next;
    (function (next) {
        function integer(boundary, inclusive) {
            return Random.next(boundary, inclusive);
        }
        next.integer = integer;
        function float(boundary = Number.MAX_VALUE) {
            if (isNaN(boundary))
                throw "'boundary' is not a number.";
            return Math.random() * boundary;
        }
        next.float = float;
        function inRange(min, max, inclusive) {
            assert(min, 'min');
            assert(max, 'max');
            let range = max - min;
            if (range === 0)
                return min;
            if (inclusive)
                range += range / Math.abs(range);
            return min + r(range);
        }
        next.inRange = inRange;
    })(next = Random.next || (Random.next = {}));
    /**
     * Returns an array of random integers.
     * @param count
     * @param boundary
     * @param inclusive
     * @returns {number[]}
     */
    function integers(count, boundary, inclusive) {
        assert(count);
        const s = [];
        s.length = count;
        for (let i = 0; i < count; i++) {
            s[i] = nr(boundary, inclusive);
        }
        return s;
    }
    Random.integers = integers;
    /**
     * Shuffles an array.
     * @param target
     * @returns {T}
     */
    function shuffle(target) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__["a" /* shuffle */])(target);
    }
    Random.shuffle = shuffle;
    /**
     * Creates a copy of an array-like  and returns it shuffled.
     * @param source
     * @returns {T[]}
     */
    function copy(source) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__["a" /* shuffle */])(arrayCopy(source));
    }
    Random.copy = copy;
    /**
     * Returns a distinct random set from the source array up to the maxCount or the full length of the array.
     * @param source
     * @param maxCount
     * @returns {any}
     */
    function select(source, maxCount) {
        if (maxCount !== Infinity)
            __WEBPACK_IMPORTED_MODULE_0__Integer__["a" /* Integer */].assertZeroOrGreater(maxCount);
        switch (maxCount) {
            case 0:
                return [];
            case 1:
                return [select.one(source, true)];
            default:
                let result = Object(__WEBPACK_IMPORTED_MODULE_2__Collections_Array_shuffle__["a" /* shuffle */])(arrayCopy(source));
                if (maxCount < result.length)
                    result.length = maxCount;
                return result;
        }
    }
    Random.select = select;
    (function (select) {
        function one(source, throwIfEmpty) {
            if (source && source.length)
                return source[r(source.length)];
            if (throwIfEmpty)
                throw "Cannot select from an empty set.";
        }
        select.one = one;
    })(select = Random.select || (Random.select = {}));
})(Random || (Random = {}));
//# sourceMappingURL=Random.js.map

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = shuffle;
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffle(target) {
    let i = target.length;
    while (--i) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = target[i];
        target[i] = target[j];
        target[j] = temp;
    }
    return target;
}
//# sourceMappingURL=shuffle.js.map

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ReadOnlyCollectionBase__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Integer__ = __webpack_require__(6);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Origin: http://www.fallingcanbedeadly.com/
 * Licensing: MIT
 */




// noinspection JSUnusedLocalSymbols
class LazyList extends __WEBPACK_IMPORTED_MODULE_0__ReadOnlyCollectionBase__["a" /* ReadOnlyCollectionBase */] {
    constructor(source) {
        super();
        this._enumerator = source.getEnumerator();
        this._cached = [];
    }
    _onDispose() {
        super._onDispose();
        const e = this._enumerator;
        this._enumerator = null;
        if (e)
            e.dispose();
        const c = this._cached;
        this._cached = null;
        if (c)
            c.length = 0;
    }
    _getCount() {
        this.finish();
        const c = this._cached;
        return c ? c.length : 0;
    }
    _getEnumerator() {
        let current;
        return new __WEBPACK_IMPORTED_MODULE_2__Enumeration_EnumeratorBase__["a" /* EnumeratorBase */](() => {
            current = 0;
        }, yielder => {
            this.throwIfDisposed();
            const c = this._cached;
            return (current < c.length || this.getNext())
                ? yielder.yieldReturn(c[current++])
                : yielder.yieldBreak();
        });
    }
    get(index) {
        this.throwIfDisposed();
        __WEBPACK_IMPORTED_MODULE_3__Integer__["a" /* Integer */].assertZeroOrGreater(index);
        const c = this._cached;
        while (c.length <= index && this.getNext()) { }
        if (index < c.length)
            return c[index];
        throw new __WEBPACK_IMPORTED_MODULE_1__Exceptions_ArgumentOutOfRangeException__["a" /* ArgumentOutOfRangeException */]("index", "Greater than total count.");
    }
    indexOf(item) {
        this.throwIfDisposed();
        const c = this._cached;
        let result = c.indexOf(item);
        while (result == -1 && this.getNext(value => {
            if (value == item)
                result = c.length - 1;
        })) { }
        return result;
    }
    contains(item) {
        return this.indexOf(item) != -1;
    }
    getNext(out) {
        const e = this._enumerator;
        if (!e)
            return false;
        if (e.moveNext()) {
            const value = e.current;
            this._cached.push(value);
            if (out)
                out(value);
            return true;
        }
        else {
            e.dispose();
            this._enumerator = null;
        }
        return false;
    }
    finish() {
        while (this.getNext()) { }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LazyList;

//# sourceMappingURL=LazyList.js.map

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CollectionBase__ = __webpack_require__(17);
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

// noinspection JSUnusedLocalSymbols
class ReadOnlyCollectionBase extends __WEBPACK_IMPORTED_MODULE_0__CollectionBase__["a" /* CollectionBase */] {
    getCount() {
        return this._getCount();
    }
    getIsReadOnly() {
        return true;
    }
    //noinspection JSUnusedLocalSymbols
    _addInternal(entry) {
        return false;
    }
    //noinspection JSUnusedLocalSymbols
    _removeInternal(entry, max) {
        return 0;
    }
    _clearInternal() {
        return 0;
    }
    getEnumerator() {
        return this._getEnumerator();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ReadOnlyCollectionBase;

/* unused harmony default export */ var _unused_webpack_default_export = (ReadOnlyCollectionBase);
//# sourceMappingURL=ReadOnlyCollectionBase.js.map

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Types__ = __webpack_require__(0);
/*!
 * @author electricessence / https://github.com/electricessence/
 * .NET Reference: http://referencesource.microsoft.com/#mscorlib/system/text/StringBuilder.cs
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

/*****************************
 * IMPORTANT NOTES ABOUT PERFORMANCE:
 * http://jsperf.com/string-concatenation-looped
 * http://jsperf.com/adding-strings-to-an-array
 * http://jsperf.com/string-concatenation-versus-array-operations-with-join
 *
 * It is clearly inefficient to use a StringBuilder or LinkedList to build a string when you have a small set of string portions.
 * StringBuilder will really show it's benefit likely somewhere above 1000 items.
 *****************************/
const EMPTY = "";
const NEWLINE = "\r\n";
class StringBuilder {
    constructor(...initial) {
        this._latest = null;
        this._partArray = [];
        this.appendThese(initial);
    }
    appendSingle(item) {
        if (item != null) {
            const _ = this;
            _._latest = null;
            switch (typeof item) {
                case __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].OBJECT:
                case __WEBPACK_IMPORTED_MODULE_0__Types__["a" /* Type */].FUNCTION:
                    item = item.toString();
                    break;
            }
            _._partArray.push(item); // Other primitive types can keep their format since a number or boolean is a smaller footprint than a string.
        }
    }
    appendThese(items) {
        const _ = this;
        items.forEach(s => _.appendSingle(s));
        return _;
    }
    append(...items) {
        this.appendThese(items);
        return this;
    }
    appendLine(...items) {
        this.appendLines(items);
        return this;
    }
    appendLines(items) {
        const _ = this;
        items.forEach(i => {
            if (i != null) {
                _.appendSingle(i);
                _._partArray.push(NEWLINE);
            }
        });
        return _;
    }
    /** /// These methods can only efficiently be added if not using a single array.
     insert(index: number, value: string, count: number = 1): StringBuilder
     {
    }
     remove(startIndex:number, length:number): StringBuilder
     {
    }
     /**/
    get isEmpty() {
        return this._partArray.length === 0;
    }
    toString() {
        let latest = this._latest;
        if (latest == null)
            this._latest = latest = this._partArray.join(EMPTY);
        return latest;
    }
    join(delimiter) {
        return this._partArray.join(delimiter);
    }
    clear() {
        this._partArray.length = 0;
        this._latest = null;
    }
    dispose() {
        this.clear();
    }
}
/* harmony export (immutable) */ __webpack_exports__["StringBuilder"] = StringBuilder;

/* harmony default export */ __webpack_exports__["default"] = (StringBuilder);
//# sourceMappingURL=StringBuilder.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIDI3YzJmZTAyMDk0Y2Q2NjY3YjIwIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUeXBlcy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxBcmd1bWVudEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVudW1lcmF0b3JCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxJbnRlZ2VyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxTeXN0ZW1FeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXERpc3Bvc2FibGVcXERpc3Bvc2FibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGluaXRpYWxpemUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcRW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcZGlzcG9zZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJbmRleEVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSXRlcmF0b3JSZXN1bHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEZ1bmN0aW9ucy5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXENvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGNvcHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRleHRcXFV0aWxpdHkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcQXJyYXlFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxEaXNwb3NhYmxlXFxPYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcT2JqZWN0UG9vbC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSW5maW5pdGVFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXFNpbXBsZUVudW1lcmFibGVCYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVtcHR5RW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJdGVyYXRvckVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXHNyY1xcU3RyaW5nRXh0ZW5zaW9uLnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtLkxpbnFcXExpbnEuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxBcnJheVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcc3JjXFxpbmRleC50cyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcc3JjXFxTdHJpbmdOb2RlLnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxzcmNcXE5hbWVkTm9kZS50cyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcc3JjXFxOb2RlLnRzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRocmVhZGluZ1xcVGFza3NcXFRhc2tIYW5kbGVyLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUaHJlYWRpbmdcXFRhc2tzXFxUYXNrSGFuZGxlckJhc2UuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxEaWN0aW9uYXJpZXNcXERpY3Rpb25hcnkuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxMaW5rZWROb2RlTGlzdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXERpY3Rpb25hcmllc1xcZ2V0SWRlbnRpZmllci5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXERpY3Rpb25hcmllc1xcRGljdGlvbmFyeUJhc2UuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEVudmlyb25tZW50LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHByb2Nlc3NcXGJyb3dzZXIuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEtleVZhbHVlRXh0cmFjdC5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEtleU5vdEZvdW5kRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcUXVldWUuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxBcnJheVxcVXRpbGl0eS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcTm90SW1wbGVtZW50ZWRFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxTb3J0aW5nXFxLZXlTb3J0ZWRDb250ZXh0LmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcU29ydGluZ1xcU29ydENvbnRleHQuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFJhbmRvbS5qcyIsIkM6XFxkZXZlbG9wXFxUU2ltcGxlVHJlZVxcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEFycmF5XFxzaHVmZmxlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcTGF6eUxpc3QuanMiLCJDOlxcZGV2ZWxvcFxcVFNpbXBsZVRyZWVcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxSZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXFRTaW1wbGVUcmVlXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxUZXh0XFxTdHJpbmdCdWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdJQUFnSSw2REFBNkQsRUFBRTtBQUMvTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7OztBQ3JOQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQzRCO0FBQ1U7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQjtBQUNBLG1DOzs7Ozs7OztBQ3ZGQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxxRDs7Ozs7OztBQ2RBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDdkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUFBO0FBQUE7QUFDQTtBQUNBLDBDOzs7Ozs7Ozs7QUN2Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2dCO0FBQ0Q7QUFDVztBQUNBO0FBQ2U7QUFDWjtBQUNNO0FBQ047QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxlQUFlLEVBQUU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw0QkFBNEIsRUFBRTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7O0FDM0pBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyw4Q0FBOEM7QUFDbkQsQ0FBQywwQkFBMEI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGFBQWE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7O0FDaktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwyQzs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BEO0FBQ0EsQ0FBQyx3Q0FBd0M7QUFDekM7QUFDQTtBQUNBLDBDOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUIsVUFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYSxjQUFjO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7QUM1REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNDO0FBQ2E7QUFDSTtBQUNYO0FBQ21CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCO0FBQ2pEO0FBQ0Esc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHNDOzs7Ozs7O0FDcktBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDBEOzs7Ozs7O0FDakJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsOEM7Ozs7Ozs7QUNwQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsZ0Q7Ozs7Ozs7O0FDakVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDTDtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFBQTtBQUFBO0FBQ0Q7QUFDQSwyQzs7Ozs7OztBQ3hCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQytCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSw4Qzs7Ozs7Ozs7O0FDMUNNLE9BQVUsVUFBaUIsbUJBQUc7QUFDNUIsV0FBSyxLQUFRLFFBQVMsVUFDOUI7QUFBRSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQRjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDK0Q7QUFDaEQ7QUFDZjtBQUNBO0FBQ2lFO0FBQ3ZDO0FBQ1g7QUFDRztBQUNtQjtBQUNYO0FBQ0Q7QUFDSjtBQUNMO0FBQ1M7QUFDQTtBQUNnQjtBQUNQO0FBQ1A7QUFDSztBQUNNO0FBQ1o7QUFDRztBQUNSO0FBQ0o7QUFDWTtBQUNWO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnSUFBcUQsK0JBQStCLEVBQUU7QUFDdEYsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EscUlBQTBEO0FBQzFELHFCQUFxQixJQUFJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNklBQXVEO0FBQ3ZELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlMQUF3RjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlJQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlJQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQSxpQkFBaUI7QUFDakIsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUlBQWlELFdBQVcsRUFBRTtBQUM5RCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUlBQTZDLGVBQWUsRUFBRTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx1REFBdUQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsSUFBSTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUNqQztBQUNBLGdDOzs7Ozs7Ozs7Ozs7QUNqMEVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxPQUFPO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7Ozs7Ozs7QUN0RnVDO0FBQ3ZDLHVDQUEwQztBQUl4QyxxQkFKTyxhQUlHO0FBSFosb0JBQTJCLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRjNCLHNDQUF3QztBQUN4QztBQUFnQywwQkFBNkI7QUFTM0Qsd0JBQStCO2VBQzdCLGtCQUFXLFNBQ2I7QUFBQztBQVRELDBCQUFXLHNCQUFLO2FBQWhCO0FBQ1EsbUJBQUMsaUJBQWMsY0FDdkI7QUFBQzthQUNELGFBQTZCO0FBQzNCLDZCQUFjLG9CQUNoQjtBQUFDOztzQkFIQTs7QUFTTSx5QkFBUSxXQUFmLFVBQXlDO0FBQ3BDLFlBQUMsT0FBWSxVQUFjLFVBQUU7QUFDeEIsbUJBQUMsaUJBQWMsb0JBQUMsSUFBYyxXQUN0QztBQUFDO0FBQ0ssZUFBQyxpQkFBYyxvQkFDdkI7QUFBQztBQUVNLHlCQUFPLFVBQWQsVUFBd0M7QUFDbkMsWUFBQyxPQUFZLFVBQWMsVUFBRTtBQUN4QixtQkFBQyxpQkFBYSxtQkFBQyxJQUFjLFdBQ3JDO0FBQUM7QUFDSyxlQUFDLGlCQUFhLG1CQUN0QjtBQUFDO0FBRU0seUJBQU8sVUFBZCxVQUF3QztBQUNuQyxZQUFDLE9BQVksVUFBYyxVQUFFO0FBQ3hCLG1CQUFDLGlCQUFhLG1CQUFDLElBQWMsV0FDckM7QUFBQztBQUNLLGVBQUMsaUJBQWEsbUJBQ3RCO0FBQUM7QUFFTSx5QkFBVyxjQUFsQixVQUE0QztBQUN2QyxZQUFDLE9BQVksVUFBYyxVQUFFO0FBQ3hCLG1CQUFDLGlCQUFpQix1QkFBQyxJQUFjLFdBQ3pDO0FBQUM7QUFDSyxlQUFDLGlCQUFpQix1QkFDMUI7QUFBQztBQUNILFdBQUM7QUFBQSxFQXhDK0IsWUF3Qy9CO0FBeENZLHFCQUFVLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRXZCLGlDQUE4QjtBQUU5QjtBQUErRSx5QkFBbUI7QUFFaEcsdUJBQWtDO0FBQWxDLG9CQUlDO0FBSEksWUFBSyxTQUFlLFdBQUU7QUFDdkIsc0NBQVcsU0FDYjtBQUFDO2VBQ0g7QUFBQztBQUdELDBCQUFXLHFCQUFJO2FBQWY7QUFDUSxtQkFBSyxLQUNiO0FBQUM7O3NCQUFBOztBQUNTLHdCQUFHLE1BQWIsVUFBeUI7QUFDbkIsYUFBSyxPQUNYO0FBQUM7QUFFbUI7QUFFYix3QkFBSyxRQUFaLFVBQXdCO0FBQ2hCLGdDQUFlLGNBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFBQyxTQUFsRCxFQUNUO0FBQUM7QUFFTSx3QkFBUyxZQUFoQixVQUFzRCxzQkFBd0I7QUFDekUsWUFBQyxPQUEyQix5QkFBYyxVQUFFO0FBQ3ZDLG1CQUFDLGlCQUFlLHFCQUN4QjtBQUFDO0FBQ0ssZ0NBQWdCLHFCQUFnQixnQkFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQXlCO0FBQ3pGLFNBRFM7QUFDUjtBQUVNLHdCQUFnQixtQkFBdkIsVUFBNkQsc0JBQXdCO0FBQ2hGLFlBQUMsT0FBMkIseUJBQWMsVUFBRTtBQUN2QyxtQkFBQyxpQkFBc0IsNEJBQy9CO0FBQUM7QUFDSyxnQ0FBdUIsNEJBQWdCLGdCQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBeUI7QUFDaEcsU0FEUztBQUNSO0FBRU0sd0JBQVEsV0FBZixVQUE0QjtBQUNwQixlQUFLLFNBQ1YsWUFBQyxpQkFBYyxjQUNmLHlCQUFlLGNBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDckQsU0FESTtBQUNIO0FBRU0sd0JBQWEsZ0JBQXBCLFVBQWlDO0FBQ3pCLGVBQUssU0FDVixZQUFDLGlCQUFtQixtQkFDcEIseUJBQW9CLG1CQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQzFELFNBREk7QUFDSDtBQUVNLHdCQUFvQix1QkFBM0IsVUFBd0M7QUFDaEMsZUFBSyxTQUNWLFlBQUMsaUJBQTBCLDBCQUMzQix5QkFBNEIsMEJBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDbEUsU0FESTtBQUNIO0FBRU0sd0JBQWEsZ0JBQXBCLFVBQWlDO0FBQ3pCLGVBQUssU0FDVixZQUFDLGlCQUFtQixtQkFDcEIseUJBQW9CLG1CQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQzFELFNBREk7QUFDSDtBQUVNLHdCQUFvQix1QkFBM0IsVUFBd0M7QUFDaEMsZUFBSyxTQUNWLFlBQUMsaUJBQTBCLDBCQUMzQix5QkFBMkIsMEJBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDakUsU0FESTtBQUNIO0FBRU0sd0JBQWMsaUJBQXJCLFVBQWtDO0FBQzFCLGVBQUssU0FDVixZQUFDLGlCQUFvQixvQkFDckIseUJBQXFCLG9CQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQzNELFNBREk7QUFDSDtBQUVNLHdCQUFxQix3QkFBNUIsVUFBeUM7QUFDakMsZUFBSyxTQUNWLFlBQUMsaUJBQTJCLDJCQUM1Qix5QkFBNEIsMkJBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDbEUsU0FESTtBQUNIO0FBRU0sd0JBQWEsZ0JBQXBCLFVBQWlDO0FBQ3pCLGVBQUssU0FDVixZQUFDLGlCQUFtQixtQkFDcEIseUJBQW9CLG1CQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQzFELFNBREk7QUFDSDtBQUVNLHdCQUFvQix1QkFBM0IsVUFBd0M7QUFDaEMsZUFBSyxTQUNWLFlBQUMsaUJBQTBCLDBCQUMzQix5QkFBMkIsMEJBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDakUsU0FESTtBQUNIO0FBRU0sd0JBQVcsY0FBbEIsVUFBd0Qsc0JBQXdCO0FBQzNFLFlBQUMsT0FBMkIseUJBQWMsVUFBRTtBQUN2QyxtQkFBQyxpQkFBaUIsdUJBQzFCO0FBQUM7QUFDSyxnQ0FBa0IsdUJBQWdCLGdCQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBeUI7QUFDM0YsU0FEUztBQUNSO0FBRU0sd0JBQWtCLHFCQUF6QixVQUErRCxzQkFBd0I7QUFDbEYsWUFBQyxPQUEyQix5QkFBYyxVQUFFO0FBQ3ZDLG1CQUFDLGlCQUF3Qiw4QkFDakM7QUFBQztBQUNLLGdDQUF5Qiw4QkFBZ0IsZ0JBQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUF5QjtBQUNsRyxTQURTO0FBQ1I7QUFFTSx3QkFBUSxXQUFmLFVBQTBELDJCQUE2QjtBQUNsRixZQUFDLE9BQWdDLDhCQUFjLFVBQUU7QUFDNUMsbUJBQUMsaUJBQWMsb0JBQ3ZCO0FBQUM7QUFDSyxnQ0FBZSxvQkFBcUIscUJBQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUE4QjtBQUNsRyxTQURTO0FBQ1I7QUFFTSx3QkFBZSxrQkFBdEIsVUFBaUUsMkJBQTZCO0FBRXpGLFlBQUMsT0FBZ0MsOEJBQWMsVUFBRTtBQUM1QyxtQkFBQyxpQkFBcUIsMkJBQzlCO0FBQUM7QUFDSyxnQ0FBc0IsMkJBQXFCLHFCQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBOEI7QUFDekcsU0FEUztBQUNSO0FBRU0sd0JBQTZCLGdDQUFwQyxVQUFpRDtBQUN6QyxlQUFLLFNBQ1YsWUFBQyxpQkFBbUMsbUNBQ3BDLHlCQUFvQyxtQ0FBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUMxRSxTQURJO0FBQ0g7QUFFTSx3QkFBb0MsdUNBQTNDLFVBQXdEO0FBQ2hELGVBQUssU0FDVixZQUFDLGlCQUEwQywwQ0FDM0MseUJBQTJDLDBDQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQ2pGLFNBREk7QUFDSDtBQUVNLHdCQUE4QixpQ0FBckMsVUFBa0Q7QUFDMUMsZUFBSyxTQUNWLFlBQUMsaUJBQW9DLG9DQUNyQyx5QkFBcUMsb0NBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDM0UsU0FESTtBQUNIO0FBRU0sd0JBQXFDLHdDQUE1QyxVQUF5RDtBQUNqRCxlQUFLLFNBQ1YsWUFBQyxpQkFBMkMsMkNBQzVDLHlCQUE0QywyQ0FBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUNsRixTQURJO0FBQ0g7QUFFTSx3QkFBd0IsMkJBQS9CLFVBQTRDO0FBQ3BDLGVBQUssU0FDVixZQUFDLGlCQUE4Qiw4QkFDL0IseUJBQStCLDhCQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQ3JFLFNBREk7QUFDSDtBQUVNLHdCQUErQixrQ0FBdEMsVUFBbUQ7QUFDM0MsZUFBSyxTQUNWLFlBQUMsaUJBQXFDLHFDQUN0Qyx5QkFBc0MscUNBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDNUUsU0FESTtBQUNIO0FBRU0sd0JBQW1CLHNCQUExQixVQUF1QztBQUMvQixlQUFLLFNBQ1YsWUFBQyxpQkFBeUIseUJBQzFCLHlCQUEwQix5QkFBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUNoRSxTQURJO0FBQ0g7QUFFTSx3QkFBMEIsNkJBQWpDLFVBQThDO0FBQ3RDLGVBQUssU0FDVixZQUFDLGlCQUFnQyxnQ0FDakMseUJBQWlDLGdDQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQ3ZFLFNBREk7QUFDSDtBQUVNLHdCQUF1QiwwQkFBOUIsVUFBMkM7QUFDbkMsZUFBSyxTQUNWLFlBQUMsaUJBQTZCLDZCQUM5Qix5QkFBOEIsNkJBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDcEUsU0FESTtBQUNIO0FBRU0sd0JBQThCLGlDQUFyQyxVQUFrRDtBQUMxQyxlQUFLLFNBQ1YsWUFBQyxpQkFBb0Msb0NBQ3JDLHlCQUFxQyxvQ0FBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUMzRSxTQURJO0FBQ0g7QUFDSCxXQUFDO0FBQUEsRUFsTDhFLE9Ba0w5RTtBQWxMWSxvQkFBUyxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMaUI7QUFDdkMsaUNBQWdFO0FBR2hFLDBDQUFnRjtBQUNoRixzREFBK0c7QUFDL0csb0JBQTJCO0FBQzNCO0FBRXdFO0FBQ3RFLGtCQUFvQztBQUM5QixhQUFXLGFBQVE7QUFDbkIsYUFBTyxTQUFRO0FBQ2YsYUFBVyxhQUFPLEtBQVU7QUFDNUIsYUFBVyxhQUFPLEtBQVU7QUFDNUIsYUFBTSxRQUFRLFVBQWdCLFlBQU8sT0FDM0M7QUFBQztBQVFELDBCQUFZLGdCQUFRO2FBQXBCO0FBQ1EsbUJBQ1I7QUFBQzs7c0JBQUE7O0FBRUQsMEJBQVcsZ0JBQVk7YUFBdkI7QUFDUSxtQkFBSyxLQUFPLFVBQVUsT0FBSyxLQUFPLE9BQWEsYUFBSyxLQUM1RDtBQUFDOztzQkFBQTs7QUFFRCwwQkFBVyxnQkFBVzthQUF0QjtBQUNRLG1CQUFLLEtBQU8sVUFBVSxPQUFLLEtBQU8sT0FBVyxXQUFhLGFBQUssS0FDdkU7QUFBQzs7c0JBQUE7O0FBRUQsMEJBQVcsZ0JBQVU7YUFBckI7QUFDUSxtQkFBSyxLQUNiO0FBQUM7O3NCQUFBOztBQUNELDBCQUFZLGdCQUFVO2FBQXRCLGFBQXVDO0FBQ2pDLGlCQUFZLGNBQ2xCO0FBQUM7O3NCQUFBOztBQUVELDBCQUFXLGdCQUFTO2FBQXBCO0FBQ1EsbUJBQUssS0FBVyxjQUFVLE9BQUssS0FBVyxXQUFhLGFBQy9EO0FBQUM7O3NCQUFBOztBQUVELDBCQUFXLGdCQUFNO2FBQWpCO0FBQ1EsbUJBQUssS0FDYjtBQUFDOztzQkFBQTs7QUFDRCwwQkFBWSxnQkFBTTthQUFsQixhQUErQjtBQUN6QixpQkFBUSxVQUNkO0FBQUM7O3NCQUFBOztBQUVELDBCQUFXLGdCQUFVO2FBQXJCO0FBQ1EsbUJBQUssS0FDYjtBQUFDOztzQkFBQTs7QUFDRCwwQkFBWSxnQkFBVTthQUF0QixhQUF1QztBQUNqQyxpQkFBWSxjQUNsQjtBQUFDOztzQkFBQTs7QUFFRCwwQkFBVyxnQkFBVTthQUFyQjtBQUNRLG1CQUFLLEtBQ2I7QUFBQzs7c0JBQUE7O0FBQ0QsMEJBQVksZ0JBQVU7YUFBdEIsYUFBdUM7QUFDakMsaUJBQVksY0FDbEI7QUFBQzs7c0JBQUE7O0FBQ0QsMEJBQVcsZ0JBQUk7YUFBZjtBQUNRLG1CQUFLLEtBQVcsZUFBUyxLQUFjLGNBQUssS0FBYSxhQUNqRTtBQUFDOztzQkFBQTs7QUFDRCwwQkFBVyxnQkFBSTthQUFmO0FBQ1EsbUJBQUssS0FBVyxlQUFTLEtBQWUsZUFBSyxLQUFhLGFBQ2xFO0FBQUM7O3NCQUFBOztBQUVTLG1CQUFRLFdBQWxCO0FBQ1EsZUFBSyxLQUNiO0FBQUM7QUFDUyxtQkFBUSxXQUFsQixVQUFnQztBQUMxQixhQUFPLFNBQ2I7QUFBQztBQUNELDBCQUFjLGdCQUFLO2FBQW5CO0FBQ1EsbUJBQUssS0FDYjtBQUFDO2FBQ0QsYUFBaUM7QUFDM0IsaUJBQU8sU0FDYjtBQUFDOztzQkFIQTs7QUFLRCwwQkFBVyxnQkFBYTthQUF4QjtBQUNRLG1CQUFLLEtBQVcsV0FDeEI7QUFBQzs7c0JBQUE7O0FBRUQsMEJBQVcsZ0JBQXNCO2FBQWpDO0FBQ1EsbUJBQUssS0FDYjtBQUFDOztzQkFBQTs7QUFHTyxtQkFBeUIsNEJBQWpDO0FBQ0UsWUFBYSxZQUFLO0FBQ2QsYUFBVyxXQUFRLFFBQUMsVUFBSztBQUMzQixnQkFBWSxTQUFRLE1BQTRCLDhCQUFLO0FBQ2xELGdCQUFVLFlBQVUsUUFBRTtBQUNkLDRCQUNYO0FBQ0Y7QUFBRztBQUNHLGVBQ1I7QUFBQztBQUVNLG1CQUFhLGdCQUFwQixVQUFpQztBQUN6QixlQUFLLEtBQVcsV0FBbUIsbUJBQzNDO0FBQUM7QUFFTSxtQkFBUyxZQUFoQixVQUF1QztBQUMvQixlQUFlLG1CQUNwQixZQUFLLEtBQW1CLG1CQUFLLEtBQzdCLEtBQUssS0FBWSxZQUFLLEtBQ3pCO0FBQUM7QUFFTSxtQkFBZ0IsbUJBQXZCLFVBQThDO0FBQ3pDLFlBQWUsbUJBQWUsV0FBRTtBQUMzQixtQkFBSyxLQUFtQixtQkFBSyxLQUFlLGlCQUNwRDtBQUFDO0FBQ0QsMkJBQXlCOzs7OztBQUNmLCtCQUFRLE1BQVU7OztBQUV4Qiw2Q0FBVTs7QUFBViwyQkFBVztBQUNQLCtCQUFPLEtBQVE7Ozs0QkFDUixRQUFTOzs7Ozs7QUFDdkI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBUSxXQUFmO0FBQ0UsMkJBQXlCOzs7OztBQUNmLCtCQUFRLE1BQVk7NEJBQ3hCLEVBQUksU0FBUyxPQUFiLHFCQUFhO0FBQ0QsbUNBQVE7OztBQUVwQiw2Q0FBVTs7QUFBViwyQkFBVztBQUNQLCtCQUFPLEtBQVk7Ozs0QkFDWixTQUFjOzs7Ozs7QUFFOUI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFHTSxtQkFBZSxrQkFBdEI7QUFDRSwyQkFBeUI7Ozs7O0FBQ2YsK0JBQVEsTUFBVztBQUN4Qiw0QkFBSyxRQUFTLE1BQUU7QUFDWCxzQ0FDUjtBQUFDO0FBQ2EsbUNBQVE7OztBQUVwQiw2Q0FBVTs7QUFBViwyQkFBVztBQUNQLCtCQUFPLEtBQVk7Ozs0QkFDWixTQUFjOzs7Ozs7QUFDNUI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBYSxnQkFBcEI7QUFDRSw0QkFBMEI7Ozs7O0FBQ2hCLCtCQUFRLE1BQVk7QUFDZCxtQ0FBUSxNQUFjOzs7NEJBQzdCLEVBQUksU0FBYTtBQUN0Qiw2Q0FBVTs7QUFBViwyQkFBVztBQUNQLCtCQUFPLEtBQVk7Ozs7OztBQUUxQjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVcsV0FDdEM7QUFBQztBQUVNLG1CQUFvQix1QkFBM0I7QUFDUSxlQUFDLE9BQVUsUUFBTyxPQUFLLEtBQVMsVUFBSSxHQUFPLE9BQUssS0FDeEQ7QUFBQztBQUVNLG1CQUFhLGdCQUFwQjtBQUNFLDJCQUF5Qjs7Ozs7QUFDZiwrQkFBUSxNQUFhO0FBQ2YsbUNBQVEsTUFBVTs7OzRCQUN6QixFQUFJLFNBQWE7QUFDdEIsNkNBQVU7O0FBQVYsMkJBQVc7QUFDUCwrQkFBTyxLQUFZOzs7Ozs7QUFFMUI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBb0IsdUJBQTNCO0FBQ1EsZUFBSyxLQUFnQixnQkFBTyxPQUFDLE9BQVUsUUFBTyxPQUFLLEtBQVMsVUFDcEU7QUFBQztBQUVNLG1CQUFjLGlCQUFyQjtBQUNFLDJCQUF5Qjs7Ozs7QUFDZiwrQkFBUSxNQUFjO0FBQ2hCLG1DQUFRLE1BQVU7Ozs0QkFDekIsRUFBSSxTQUFhO0FBQ3RCLDZDQUFVOztBQUFWLDJCQUFXO0FBQ1AsK0JBQU8sS0FBWTs7Ozs7O0FBRTFCO0FBQ0ssZUFBQyxPQUFVLFFBQVEsUUFBVSxVQUNyQztBQUFDO0FBRU0sbUJBQXFCLHdCQUE1QjtBQUNRLGVBQUssS0FBaUIsaUJBQU8sT0FBQyxPQUFVLFFBQU8sT0FBSyxLQUFTLFVBQ3JFO0FBQUM7QUFFTSxtQkFBYSxnQkFBcEI7QUFDRSwyQkFBeUI7Ozs7O0FBQ2YsK0JBQVEsTUFBWTtBQUNkLG1DQUFRLE1BQWE7Ozs0QkFDNUIsRUFBSSxTQUFhO0FBQ3RCLDZDQUFVOztBQUFWLDJCQUFXO0FBQ1AsK0JBQU8sS0FBWTs7Ozs7O0FBRTFCO0FBQ0ssZUFBQyxPQUFVLFFBQVEsUUFBVSxVQUNyQztBQUFDO0FBRU0sbUJBQW9CLHVCQUEzQjtBQUNRLGVBQUMsT0FBVSxRQUFPLE9BQUssS0FBUyxVQUFJLEdBQU8sT0FBSyxLQUN4RDtBQUFDO0FBRU0sbUJBQVcsY0FBbEIsVUFBeUM7QUFDdkMsMkJBQXlCOzs7Ozs0QkFDbkIsRUFBYyxtQkFBYyxZQUE1QixxQkFBNEI7QUFDbkIsZ0NBQVEsTUFBVTtBQUNuQixpQ0FBUzs0QkFDZixFQUFNLE9BQVcsY0FBUSxPQUF6QixxQkFBeUI7QUFDckIsaUNBQVMsT0FBWTtBQUMzQiw2Q0FBWTs7QUFBWiwyQkFBYTs7O2lDQUNGOzs7NEJBQ0YsRUFBTSxPQUFXLGNBQVE7QUFDeEIsaUNBQVMsT0FBWTtBQUMzQiw2Q0FBWTs7QUFBWiwyQkFBYTs7O0FBRWYsK0JBQWEsT0FBSyxRQUFRLE1BQUc7QUFDckIscUNBQVMsT0FBUTtBQUNwQixnQ0FBTyxXQUFXLE9BQUU7QUFDZiwwQ0FDUjtBQUNGO0FBQUM7QUFDSyxpQ0FBUyxPQUFZO0FBQzNCLDZDQUFZOztBQUFaLDJCQUFhOzs7OztBQUlOLGdDQUFRLE1BQVU7QUFDbkIsaUNBQVM7NEJBQ2YsRUFBTSxPQUFXLGNBQVEsUUFBa0IsaUJBQUksSUFBL0MscUJBQStDO0FBQzNDLGlDQUFTLE9BQVk7QUFDVjtBQUNqQiw2Q0FBWTs7QUFBWiwyQkFBYTs7O2lDQUNGOzs7NEJBQ0YsRUFBTSxPQUFXLGNBQVEsUUFBa0IsaUJBQUk7QUFDOUMsaUNBQVMsT0FBWTtBQUNWO0FBQ2pCLDZDQUFZOztBQUFaLDJCQUFhOzs7QUFFZiwrQkFBYSxPQUFLLFFBQVEsTUFBRztBQUNyQixxQ0FBUyxPQUFRO0FBQ047QUFDZCxnQ0FBTyxXQUFXLE9BQUU7QUFDZiwwQ0FDUjtBQUNGO0FBQUM7QUFDSyxpQ0FBUyxPQUFZO0FBQzNCLDZDQUFZOztBQUFaLDJCQUFhOzs7Ozs7QUFJcEI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBa0IscUJBQXpCLFVBQWdEO0FBQ3hDLGVBQWUsbUJBQ2xCLFlBQUMsT0FBVSxRQUFPLE9BQUssS0FBUyxVQUFJLEdBQU8sT0FBSyxLQUNoRCxpQkFBQyxPQUFVLFFBQU8sT0FBSyxLQUFTLFVBQUksR0FBTyxPQUFLLEtBQVksWUFDakU7QUFBQztBQUVNLG1CQUFRLFdBQWYsVUFBMkM7QUFDdEMsWUFBb0Isd0JBQWUsV0FBRTtBQUNoQyxtQkFBSyxLQUFnQixnQkFBSyxLQUFxQixxQkFBVSxVQUN4RCxPQUFLLEtBQWdCLGdCQUFLLEtBQ25DO0FBQUM7QUFDRCwyQkFBeUI7Ozs7O0FBQ1osZ0NBQVEsTUFBYztBQUN6QiwrQkFBUzs7OzRCQUNWLEVBQUksU0FBc0I7QUFDL0IsNkNBQVU7O0FBQVYsMkJBQVc7QUFDUCwrQkFBTyxLQUFZOzs7QUFFckIsK0JBQU8sS0FBWTs7OzRCQUNoQixFQUFJLFNBQVU7QUFDbkIsNkNBQVU7O0FBQVYsMkJBQVc7QUFDUCwrQkFBTyxLQUFZOzs7Ozs7QUFFMUI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBZSxrQkFBdEIsVUFBa0Q7QUFDN0MsWUFBb0Isd0JBQWUsV0FBRTtBQUNoQyxtQkFBSyxLQUFnQixnQkFBSyxLQUFxQixxQkFBVSxVQUM5QyxPQUFDLE9BQVUsUUFBTyxPQUFLLEtBQVMsVUFBSyxJQUNyQyxPQUFLLEtBQWdCLGdCQUFLLEtBQzdDO0FBQUM7QUFDRCwyQkFBeUI7Ozs7O0FBQ1osZ0NBQVEsTUFBYztBQUN6QiwrQkFBUzs7O0FBRWYsNkNBQVU7O0FBQVYsMkJBQVc7QUFDUCwrQkFBTyxLQUFZOzs7NEJBQ1osU0FBVzs7Ozs7O0FBQ3pCO0FBQ0ssZUFBQyxPQUFVLFFBQVEsUUFBVSxVQUNyQztBQUFDO0FBRU0sbUJBQTZCLGdDQUFwQztBQUNFLDJCQUF5Qjs7Ozs7QUFDZiwrQkFBUSxNQUFVOzs7QUFFakIsNEJBQU8sS0FBZ0IsZ0JBQWlCOzs7NkJBQ3ZDLEVBQVc7QUFDakIsNkNBQU8sRUFBUTs7QUFBZiwyQkFBZ0I7OztBQUVkLCtCQUFPLEtBQVE7Ozs0QkFDUixRQUFTOzs7Ozs7QUFDdkI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBb0MsdUNBQTNDO0FBQ1EsZUFBQyxPQUFVLFFBQU8sT0FBSyxLQUFTLFVBQUksR0FBTyxPQUFLLEtBQ3hEO0FBQUM7QUFFTSxtQkFBOEIsaUNBQXJDO0FBQ1EsZUFBSyxLQUF3Qyx3Q0FBSyxLQUMxRDtBQUFDO0FBRU0sbUJBQXFDLHdDQUE1QztBQUNFLDJCQUF5Qjs7Ozs7QUFDZiwrQkFBUSxNQUFVOzs7QUFFakIsNEJBQU8sS0FBdUIsdUJBQWlCOzs7NkJBQzlDLEVBQVc7QUFDakIsNkNBQU8sRUFBUTs7QUFBZiwyQkFBZ0I7OztBQUVkLCtCQUFPLEtBQVE7Ozs0QkFDUixRQUFTOzs7Ozs7QUFDdkI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBdUIsMEJBQTlCO0FBQ0UsMkJBQXlCOzs7QUFDZix1QkFBUSxNQUFVO0FBQzFCLHVCQUFXLFNBQVMsS0FBVyxZQUFHO0FBQ2xCLCtCQUFRO0FBQ2xCLDJCQUFPLEtBQVE7QUFDaEIsd0JBQUssUUFBUyxNQUFFO0FBQ1gsOENBQ1I7QUFDRjtBQUFDO0FBQ0Qsc0NBQVk7O0FBQ2I7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBd0IsMkJBQS9CO0FBQ0UsMkJBQXlCOzs7OztBQUNmLCtCQUFRLE1BQVU7Ozs0QkFDbkIsRUFBSSxTQUFTLEtBQVc7QUFDekIsK0JBQU8sS0FBUTtBQUNoQiw0QkFBSyxRQUFTLE1BQUU7QUFDWCxpREFDUjtBQUFDO0FBQ0QsNkNBQVU7O0FBQVYsMkJBQVc7Ozs7OztBQUVkO0FBQ0ssZUFBQyxPQUFVLFFBQVEsUUFBVSxVQUNyQztBQUFDO0FBRU0sbUJBQStCLGtDQUF0QztBQUNFLDJCQUF5Qjs7Ozs7QUFDZiwrQkFBUSxNQUFVO0FBQzFCLDZDQUFVOztBQUFWLDJCQUFXOzs7NEJBQ0osRUFBSSxTQUFTLEtBQVc7QUFDekIsK0JBQU8sS0FBUTtBQUNoQiw0QkFBSyxRQUFTLE1BQUU7QUFDWCxpREFDUjtBQUFDO0FBQ0QsNkNBQVU7O0FBQVYsMkJBQVc7Ozs7OztBQUVkO0FBQ0ssZUFBQyxPQUFVLFFBQVEsUUFBVSxVQUNyQztBQUFDO0FBRU0sbUJBQW1CLHNCQUExQjtBQUNRLGVBQUssS0FBNkIsNkJBQUssS0FDL0M7QUFBQztBQUVNLG1CQUEwQiw2QkFBakM7QUFDRSwyQkFBeUI7Ozs7O0FBQ2YsK0JBQVEsTUFBVTs7O0FBRXhCLDZDQUFVOztBQUFWLDJCQUFXO0FBQ1AsK0JBQU8sS0FBWTs7OzRCQUNaLFFBQVEsUUFBUSxTQUFTLEtBQVk7Ozs7OztBQUNuRDtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUVNLG1CQUF1QiwwQkFBOUI7QUFDUSxlQUFLLEtBQWlDLGlDQUFLLEtBQ25EO0FBQUM7QUFFTSxtQkFBOEIsaUNBQXJDO0FBQ0UsMkJBQXlCOzs7OztBQUNmLCtCQUFRLE1BQVU7OztBQUV4Qiw2Q0FBVTs7QUFBViwyQkFBVztBQUNQLCtCQUFPLEtBQVk7Ozs0QkFDWixRQUFTOzs7Ozs7QUFDdkI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBVyxjQUFsQixVQUE2QjtBQUNwQixnQkFBTyxPQUFLLFFBQVU7QUFDdEIsZ0JBQU8sT0FBSyxLQUFPLFVBQVU7QUFDN0IsZ0JBQU8sT0FBSyxLQUFPLFVBQVU7QUFDakMsWUFBSyxLQUFPLE9BQVcsZUFBc0IsTUFBRTtBQUM1QyxpQkFBTyxPQUFXLGFBQ3hCO0FBQUM7QUFDSyxlQUFLLEtBQThCLDhCQUMzQztBQUFDO0FBRU0sbUJBQU8sVUFBZCxVQUF5QjtBQUNoQixnQkFBTyxPQUFLLFFBQVU7QUFDdEIsZ0JBQU8sT0FBSyxLQUFPLFVBQVU7QUFDN0IsZ0JBQU8sT0FBSyxLQUFPLFVBQVU7QUFDOUIsZUFBSyxLQUFXLFdBQThCLDhCQUN0RDtBQUFDO0FBRU0sbUJBQVEsV0FBZixVQUEwQjtBQUNqQixnQkFBTyxPQUFLLFFBQVU7QUFDdEIsZ0JBQU8sT0FBSyxLQUFPLFVBQVU7QUFDOUIsZUFBSyxLQUFnQixnQkFDN0I7QUFBQztBQUVPLG1CQUFlLGtCQUF2QixVQUFrQztBQUM1QixhQUFlLGVBQU87QUFDdEIsYUFBVyxhQUFRO0FBQ2pCLGVBQ1I7QUFBQztBQUVPLG1CQUE2QixnQ0FBckMsVUFBZ0Q7QUFDMUMsYUFBTyxTQUFPLEtBQVE7QUFDdEIsYUFBVyxhQUFPLEtBQVU7QUFDNUIsYUFBVyxhQUFPLEtBQVk7QUFDOUIsYUFBVyxXQUFXLGFBQVE7QUFDOUIsYUFBVyxhQUFRO0FBQ2pCLGVBQ1I7QUFBQztBQUVNLG1CQUFPLFVBQWQsVUFBeUI7QUFDaEIsZ0JBQU8sT0FBSyxRQUFVO0FBQ3RCLGdCQUFPLE9BQUssS0FBTyxVQUFVO0FBQzlCLGVBQUssS0FBZSxlQUM1QjtBQUFDO0FBRU8sbUJBQWMsaUJBQXRCLFVBQWlDO0FBQy9CLFlBQVksU0FBTyxLQUFZO0FBQzVCLFlBQU8sVUFBUyxNQUFFO0FBQ2YsaUJBQU8sU0FBTyxLQUFVO0FBQ3hCLGlCQUFXLGFBQVE7QUFDbkIsaUJBQVcsYUFBUTtBQUNuQixpQkFBVyxhQUNqQjtBQUFNLGVBQUU7QUFDQSxtQkFBOEIsOEJBQ3RDO0FBQUM7QUFDSyxlQUNSO0FBQUM7QUFFTSxtQkFBTyxVQUFkLFVBQTRCO0FBQ3ZCLFlBQUssS0FBTyxVQUFTLE1BQUU7QUFDeEIsa0JBQU0sSUFBSSw0QkFBeUIsMEJBQ3JDO0FBQUM7QUFDTSxnQkFBTyxTQUFPLEtBQVE7QUFDdEIsZ0JBQVcsYUFBTyxLQUFZO0FBQzlCLGdCQUFXLGFBQU8sS0FBWTtBQUNqQyxhQUFXLFdBQVcsYUFBVyxTQUF1QjtBQUN4RCxhQUFXLFdBQVcsYUFBVztBQUM5QixnQkFBVyxXQUFXLGFBQVc7QUFDckMsWUFBSyxLQUFPLE9BQVcsZUFBc0IsTUFBRTtBQUM1QyxpQkFBTyxPQUFXLGFBQ3hCO0FBQUM7QUFDRyxhQUFXLGFBQVE7QUFDbkIsYUFBVyxhQUFRO0FBQ25CLGFBQU8sU0FDYjtBQUFDO0FBRU0sbUJBQU0sU0FBYjtBQUNLLFlBQUssS0FBTyxVQUFTLE1BQUU7QUFDeEIsa0JBQU0sSUFBSSw0QkFBeUIsMEJBQ3JDO0FBQUM7QUFDRCxZQUFVLE9BQU8sS0FBWTtBQUMxQixZQUFLLFNBQXNCLE1BQUU7QUFDMUIsaUJBQVcsV0FBVyxhQUFRO0FBQzlCLGlCQUFXLGFBQU8sS0FBWTtBQUMvQixnQkFBSyxLQUFPLE9BQVcsZUFBc0IsTUFBRTtBQUM1QyxxQkFBTyxPQUFXLGFBQ3hCO0FBQ0Y7QUFBTSxlQUFFO0FBQ0YsaUJBQU8sT0FBVyxhQUN4QjtBQUFDO0FBQ0csYUFBVyxhQUFRO0FBQ25CLGFBQVcsYUFBUTtBQUNuQixhQUFPLFNBQ2I7QUFBQztBQUVNLG1CQUFpQixvQkFBeEI7QUFBQSxvQkF3QkM7QUF2QkksWUFBSyxLQUFPLFVBQVMsTUFBRTtBQUN4QixrQkFBTSxJQUFJLDRCQUF5QiwwQkFDckM7QUFBQztBQUNELFlBQVUsT0FBTyxLQUFZO0FBQzFCLFlBQUssU0FBc0IsTUFBRTtBQUMxQixpQkFBVyxXQUFXLGFBQVE7QUFDOUIsaUJBQVcsYUFBTyxLQUFZO0FBQy9CLGdCQUFLLEtBQU8sT0FBVyxlQUFzQixNQUFFO0FBQzVDLHFCQUFPLE9BQVcsYUFBUTtBQUN4Qix1QkFBQztBQUNELHlCQUFPLE9BQVcsYUFBTyxNQUFVO0FBQ25DLDBCQUFXLFdBQVcsYUFBTyxNQUFVO0FBQ3ZDLHlCQUFXLGFBQU8sTUFDeEI7QUFDRjtBQUFDO0FBQ0ssbUJBQUM7QUFDRCxzQkFBVyxXQUFXLGFBQU8sTUFBVTtBQUN2QyxxQkFBVyxhQUFPLE1BQ3hCO0FBQ0Y7QUFBQztBQUNELFlBQVksU0FBTyxLQUFRO0FBQ3JCLGVBQVcsYUFBUTtBQUNuQixlQUFDO0FBQWMsbUJBQVcsYUFBTyxNQUFXO0FBQ3BEO0FBQUM7QUFFTSxtQkFBUSxXQUFmO0FBQ0UsWUFBYSxVQUFHLElBQUksZ0JBQWdCO0FBQ2hDLGFBQWdCLGdCQUFLLEtBQVMsVUFBRyxHQUFXO0FBQzFDLGVBQVEsUUFDaEI7QUFBQztBQUVPLG1CQUFlLGtCQUF2QixVQUFrQyxNQUFhLE9BQXVCO0FBQXRFLG9CQVlDO0FBWEksWUFBSyxRQUFTLE1BQUU7QUFFbkI7QUFBQztBQUNHLGFBQUMsSUFBSyxJQUFJLEdBQUcsSUFBUSxPQUFLLEtBQUc7QUFDeEIsb0JBQU8sT0FDaEI7QUFBQztBQUNNLGdCQUFXLFdBQUMsQ0FBSyxLQUFNLFNBQVUsT0FBSyxLQUFNLE1BQWEsYUFBSztBQUNyRSxZQUFjLFdBQU8sS0FBWTtBQUN6QixpQkFBUSxRQUFDLFVBQUs7QUFDaEIsa0JBQWdCLGdCQUFNLE9BQU8sUUFBSSxHQUN2QztBQUNGO0FBQUM7QUFDSCxXQUFDO0FBQUE7QUFuakJZLGVBQUksSzs7Ozs7OztBQ1BqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtCQUErQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7O0FDdEVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDTTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHVDOzs7Ozs7O0FDdkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7Ozs7Ozs7QUN2RUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ21CO0FBQ0o7QUFDVTtBQUNBO0FBQ0o7QUFDRztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7OztBQ25MQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lCO0FBQ21CO0FBQ1I7QUFDSTtBQUNQO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVOQUFpRixFQUFFLDJCQUEyQixFQUFFO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7O0FDcFdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDbUI7QUFDRDtBQUNPO0FBQ0E7QUFDTztBQUNJO0FBQ1Y7QUFDSztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkMsa0JBQWtCLHlCQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrSEFBbUQsSUFBSTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHlCQUF5QjtBQUN6RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwwQzs7Ozs7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLHVDOzs7Ozs7O0FDaENBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUM0QjtBQUNJO0FBQ2pCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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YjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFBQTtBQUFBO0FBQ0Esb0M7Ozs7Ozs7QUN2RkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0Esa0Q7Ozs7Ozs7O0FDN0JBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHlDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDI3YzJmZTAyMDk0Y2Q2NjY3YjIwIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuY29uc3QgVk9JRDAgPSB2b2lkICgwKSwgX0JPT0xFQU4gPSB0eXBlb2YgdHJ1ZSwgX05VTUJFUiA9IHR5cGVvZiAwLCBfU1RSSU5HID0gdHlwZW9mIFwiXCIsIF9TWU1CT0wgPSBcInN5bWJvbFwiLCBfT0JKRUNUID0gdHlwZW9mIHt9LCBfVU5ERUZJTkVEID0gdHlwZW9mIFZPSUQwLCBfRlVOQ1RJT04gPSB0eXBlb2YgZnVuY3Rpb24gKCkgeyB9LCBMRU5HVEggPSBcImxlbmd0aFwiO1xuLy8gT25seSB1c2VkIGZvciBwcmltaXRpdmVzLlxuY29uc3QgdHlwZUluZm9SZWdpc3RyeSA9IHt9O1xuLyoqXG4gKiBFeHBvc2VzIGVhc3kgYWNjZXNzIHRvIHR5cGUgaW5mb3JtYXRpb24gaW5jbHVkaW5nIGlucXVpcmluZyBhYm91dCBtZW1iZXJzLlxuICovXG5leHBvcnQgY2xhc3MgVHlwZUluZm8ge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgb25CZWZvcmVGcmVlemUpIHtcbiAgICAgICAgdGhpcy5pc0Jvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc051bWJlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RyaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNUcnVlTmFOID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNPYmplY3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0Z1bmN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNVbmRlZmluZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3ltYm9sID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlID0gdHlwZW9mIHRhcmdldCkge1xuICAgICAgICAgICAgY2FzZSBfQk9PTEVBTjpcbiAgICAgICAgICAgICAgICB0aGlzLmlzQm9vbGVhbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9OVU1CRVI6XG4gICAgICAgICAgICAgICAgdGhpcy5pc051bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RydWVOYU4gPSBpc05hTih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGaW5pdGUgPSBpc0Zpbml0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZE51bWJlciA9ICF0aGlzLmlzVHJ1ZU5hTjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX1NUUklORzpcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3RyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX1NZTUJPTDpcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3ltYm9sID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc051bGxPclVuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FycmF5ID0gKHRhcmdldCkgaW5zdGFuY2VvZiAoQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9GVU5DVElPTjpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRnVuY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfVU5ERUZJTkVEOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNVbmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNOdWxsT3JVbmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkZhdGFsIHR5cGUgZmFpbHVyZS4gIFVua25vd24gdHlwZTogXCIgKyB0aGlzLnR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uQmVmb3JlRnJlZXplKVxuICAgICAgICAgICAgb25CZWZvcmVGcmVlemUodGhpcyk7XG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBUeXBlSW5mbyBmb3IgYW55IG1lbWJlciBvciBub24tbWVtYmVyLFxuICAgICAqIHdoZXJlIG5vbi1tZW1iZXJzIGFyZSBvZiB0eXBlIHVuZGVmaW5lZC5cbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEByZXR1cm5zIHtUeXBlSW5mb31cbiAgICAgKi9cbiAgICBtZW1iZXIobmFtZSkge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIHJldHVybiBUeXBlSW5mby5nZXRGb3IodCAmJiAobmFtZSkgaW4gKHQpXG4gICAgICAgICAgICA/IHRbbmFtZV1cbiAgICAgICAgICAgIDogVk9JRDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVHlwZUluZm8gZm9yIGFueSB0YXJnZXQgb2JqZWN0LlxuICAgICAqIElmIHRoZSB0YXJnZXQgb2JqZWN0IGlzIG9mIGEgcHJpbWl0aXZlIHR5cGUsIGl0IHJldHVybnMgdGhlIFR5cGVJbmZvIGluc3RhbmNlIGFzc2lnbmVkIHRvIHRoYXQgdHlwZS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHJldHVybnMge1R5cGVJbmZvfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRGb3IodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdGFyZ2V0O1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgIGNhc2UgX0ZVTkNUSU9OOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVHlwZUluZm8odGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5mbyA9IHR5cGVJbmZvUmVnaXN0cnlbdHlwZV07XG4gICAgICAgIGlmICghaW5mbylcbiAgICAgICAgICAgIHR5cGVJbmZvUmVnaXN0cnlbdHlwZV0gPSBpbmZvID0gbmV3IFR5cGVJbmZvKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhcmdldCBtYXRjaGVzIHRoZSB0eXBlIChpbnN0YW5jZW9mKS5cbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgdHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSB0YXJnZXQgYXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7VHxudWxsfVxuICAgICAqL1xuICAgIGFzKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgdHlwZSA/IHRoaXMudGFyZ2V0IDogbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gVHlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVJbmZvKHRhcmdldCk7XG59XG4oZnVuY3Rpb24gKFR5cGUpIHtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgdHJ1ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5CT09MRUFOID0gX0JPT0xFQU47XG4gICAgLyoqXG4gICAgICogdHlwZW9mIDBcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuTlVNQkVSID0gX05VTUJFUjtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgXCJcIlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5TVFJJTkcgPSBfU1RSSU5HO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiB7fVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5PQkpFQ1QgPSBfT0JKRUNUO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiBTeW1ib2xcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuU1lNQk9MID0gX1NZTUJPTDtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgdW5kZWZpbmVkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLlVOREVGSU5FRCA9IF9VTkRFRklORUQ7XG4gICAgLyoqXG4gICAgICogdHlwZW9mIGZ1bmN0aW9uXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLkZVTkNUSU9OID0gX0ZVTkNUSU9OO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFyZ2V0IG1hdGNoZXMgdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtUfG51bGx9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModGFyZ2V0LCB0eXBlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgICBUeXBlLmlzID0gaXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSB0YXJnZXQgYXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge1R8bnVsbH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcyh0YXJnZXQsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIHR5cGUgPyB0YXJnZXQgOiBudWxsO1xuICAgIH1cbiAgICBUeXBlLmFzID0gYXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGw7XG4gICAgfVxuICAgIFR5cGUuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIGJvb2xlYW4uXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9CT09MRUFOO1xuICAgIH1cbiAgICBUeXBlLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIG51bWJlci5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gaWdub3JlTmFOIERlZmF1bHQgaXMgZmFsc2UuIFdoZW4gdHJ1ZSwgTmFOIGlzIG5vdCBjb25zaWRlcmVkIGEgbnVtYmVyIGFuZCB3aWxsIHJldHVybiBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSwgaWdub3JlTmFOID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX05VTUJFUiAmJiAoIWlnbm9yZU5hTiB8fCAhaXNOYU4odmFsdWUpKTtcbiAgICB9XG4gICAgVHlwZS5pc051bWJlciA9IGlzTnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBpcyBhIG51bWJlciBhbmQgaXMgTmFOLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzVHJ1ZU5hTih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfTlVNQkVSICYmIGlzTmFOKHZhbHVlKTtcbiAgICB9XG4gICAgVHlwZS5pc1RydWVOYU4gPSBpc1RydWVOYU47XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX1NUUklORztcbiAgICB9XG4gICAgVHlwZS5pc1N0cmluZyA9IGlzU3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLCBzdHJpbmcsIG51bWJlciwgbnVsbCwgb3IgdW5kZWZpbmVkLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhbGxvd1VuZGVmaW5lZCBpZiBzZXQgdG8gdHJ1ZSB3aWxsIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWUsIGFsbG93VW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICBjYXNlIF9CT09MRUFOOlxuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBfTlVNQkVSOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgY2FzZSBfVU5ERUZJTkVEOlxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxvd1VuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhc2UgX09CSkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBUeXBlLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG4gICAgLyoqXG4gICAgICogRm9yIGRldGVjdGluZyBpZiB0aGUgdmFsdWUgY2FuIGJlIHVzZWQgYXMgYSBrZXkuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGFsbG93VW5kZWZpbmVkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1ByaW1pdGl2ZU9yU3ltYm9sKHZhbHVlLCBhbGxvd1VuZGVmaW5lZCA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9TWU1CT0wgPyB0cnVlIDogaXNQcmltaXRpdmUodmFsdWUsIGFsbG93VW5kZWZpbmVkKTtcbiAgICB9XG4gICAgVHlwZS5pc1ByaW1pdGl2ZU9yU3ltYm9sID0gaXNQcmltaXRpdmVPclN5bWJvbDtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLCBudW1iZXIsIG9yIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1Byb3BlcnR5S2V5KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgIHN3aXRjaCAodCkge1xuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBfTlVNQkVSOlxuICAgICAgICAgICAgY2FzZSBfU1lNQk9MOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgVHlwZS5pc1Byb3BlcnR5S2V5ID0gaXNQcm9wZXJ0eUtleTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX0ZVTkNUSU9OO1xuICAgIH1cbiAgICBUeXBlLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGFuIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYWxsb3dOdWxsIElmIGZhbHNlIChkZWZhdWx0KSBudWxsIGlzIG5vdCBjb25zaWRlcmVkIGFuIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSwgYWxsb3dOdWxsID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX09CSkVDVCAmJiAoYWxsb3dOdWxsIHx8IHZhbHVlICE9PSBudWxsKTtcbiAgICB9XG4gICAgVHlwZS5pc09iamVjdCA9IGlzT2JqZWN0O1xuICAgIC8qKlxuICAgICAqIEd1YXJhbnRlZXMgYSBudW1iZXIgdmFsdWUgb3IgTmFOIGluc3RlYWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBudW1iZXJPck5hTih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpID8gTmFOIDogdmFsdWU7XG4gICAgfVxuICAgIFR5cGUubnVtYmVyT3JOYU4gPSBudW1iZXJPck5hTjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVHlwZUluZm8gb2JqZWN0IGZvciB0aGUgdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VHlwZUluZm99XG4gICAgICovXG4gICAgZnVuY3Rpb24gb2YodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBUeXBlSW5mby5nZXRGb3IodGFyZ2V0KTtcbiAgICB9XG4gICAgVHlwZS5vZiA9IG9mO1xuICAgIC8qKlxuICAgICAqIFdpbGwgZGV0ZWN0IGlmIGEgbWVtYmVyIGV4aXN0cyAodXNpbmcgJ2luJykuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGEgcHJvcGVydHkgb3IgbWV0aG9kIGV4aXN0cyBvbiB0aGUgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUuXG4gICAgICogQHBhcmFtIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHByb3BlcnR5IE5hbWUgb2YgdGhlIG1lbWJlci5cbiAgICAgKiBAcGFyYW0gaWdub3JlVW5kZWZpbmVkIFdoZW4gaWdub3JlVW5kZWZpbmVkIGlzIHRydWUsIGlmIHRoZSBtZW1iZXIgZXhpc3RzIGJ1dCBpcyB1bmRlZmluZWQsIGl0IHdpbGwgcmV0dXJuIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc01lbWJlcihpbnN0YW5jZSwgcHJvcGVydHksIGlnbm9yZVVuZGVmaW5lZCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlICYmICFpc1ByaW1pdGl2ZShpbnN0YW5jZSkgJiYgKHByb3BlcnR5KSBpbiAoaW5zdGFuY2UpICYmIChpZ25vcmVVbmRlZmluZWQgfHwgaW5zdGFuY2VbcHJvcGVydHldICE9PSBWT0lEMCk7XG4gICAgfVxuICAgIFR5cGUuaGFzTWVtYmVyID0gaGFzTWVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbWVtYmVyIG1hdGNoZXMgdGhlIHR5cGUuXG4gICAgICogQHBhcmFtIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIHByb3BlcnR5LCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBoYXNNZW1iZXIoaW5zdGFuY2UsIHByb3BlcnR5KSAmJiB0eXBlb2YgKGluc3RhbmNlW3Byb3BlcnR5XSkgPT09IHR5cGU7XG4gICAgfVxuICAgIFR5cGUuaGFzTWVtYmVyT2ZUeXBlID0gaGFzTWVtYmVyT2ZUeXBlO1xuICAgIGZ1bmN0aW9uIGhhc01ldGhvZChpbnN0YW5jZSwgcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIGhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgcHJvcGVydHksIF9GVU5DVElPTik7XG4gICAgfVxuICAgIFR5cGUuaGFzTWV0aG9kID0gaGFzTWV0aG9kO1xuICAgIGZ1bmN0aW9uIGlzQXJyYXlMaWtlKGluc3RhbmNlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIE5PVEU6XG4gICAgICAgICAqXG4gICAgICAgICAqIEZ1bmN0aW9uczpcbiAgICAgICAgICogRW51bWVyYXRpbmcgYSBmdW5jdGlvbiBhbHRob3VnaCBpdCBoYXMgYSAubGVuZ3RoIHByb3BlcnR5IHdpbGwgeWllbGQgbm90aGluZyBvciB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgICAqIEVmZmVjdGl2ZWx5LCBhIGZ1bmN0aW9uIGlzIG5vdCBsaWtlIGFuIGFycmF5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBTdHJpbmdzOlxuICAgICAgICAgKiBCZWhhdmUgbGlrZSBhcnJheXMgYnV0IGRvbid0IGhhdmUgdGhlIHNhbWUgZXhhY3QgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBpbnN0YW5jZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICB8fCBUeXBlLmlzU3RyaW5nKGluc3RhbmNlKVxuICAgICAgICAgICAgfHwgIVR5cGUuaXNGdW5jdGlvbihpbnN0YW5jZSkgJiYgaGFzTWVtYmVyKGluc3RhbmNlLCBMRU5HVEgpO1xuICAgIH1cbiAgICBUeXBlLmlzQXJyYXlMaWtlID0gaXNBcnJheUxpa2U7XG59KShUeXBlIHx8IChUeXBlID0ge30pKTtcbk9iamVjdC5mcmVlemUoVHlwZSk7XG5leHBvcnQgZGVmYXVsdCBUeXBlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VHlwZXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9UeXBlc1wiO1xudmFyIGlzVHJ1ZU5hTiA9IFR5cGUuaXNUcnVlTmFOO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG4vKipcbiAqIFVzZWQgZm9yIHNwZWNpYWwgY29tcGFyaXNvbiBpbmNsdWRpbmcgTmFOLlxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcGFyYW0gc3RyaWN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbnxhbnl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVhbChhLCBiLCBzdHJpY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIGEgPT09IGJcbiAgICAgICAgfHwgIXN0cmljdCAmJiBhID09IGJcbiAgICAgICAgfHwgaXNUcnVlTmFOKGEpICYmIGlzVHJ1ZU5hTihiKTtcbn1cbmNvbnN0IENPTVBBUkVfVE8gPSBcImNvbXBhcmVUb1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgc3RyaWN0ID0gdHJ1ZSkge1xuICAgIGlmIChhcmVFcXVhbChhLCBiLCBzdHJpY3QpKVxuICAgICAgICByZXR1cm4gMCAvKiBFcXVhbCAqLztcbiAgICBpZiAoYSAmJiBUeXBlLmhhc01lbWJlcihhLCBDT01QQVJFX1RPKSlcbiAgICAgICAgcmV0dXJuIGEuY29tcGFyZVRvKGIpOyAvLyBJZiBhIGhhcyBjb21wYXJlVG8sIHVzZSBpdC5cbiAgICBlbHNlIGlmIChiICYmIFR5cGUuaGFzTWVtYmVyKGIsIENPTVBBUkVfVE8pKVxuICAgICAgICByZXR1cm4gLWIuY29tcGFyZVRvKGEpOyAvLyBhIGRvZXNuJ3QgaGF2ZSBjb21wYXJlVG8/IGNoZWNrIGlmIGIgZG9lcyBhbmQgaW52ZXJ0LlxuICAgIC8vIEFsbG93IGZvciBzcGVjaWFsIGluZXF1YWxpdHkuLlxuICAgIGlmIChhID4gYiB8fCBzdHJpY3QgJiYgKGEgPT09IDAgJiYgYiA9PSAwIHx8IGEgPT09IG51bGwgJiYgYiA9PT0gVk9JRDApKVxuICAgICAgICByZXR1cm4gMSAvKiBHcmVhdGVyICovO1xuICAgIGlmIChiID4gYSB8fCBzdHJpY3QgJiYgKGIgPT09IDAgJiYgYSA9PSAwIHx8IGIgPT09IG51bGwgJiYgYSA9PT0gVk9JRDApKVxuICAgICAgICByZXR1cm4gLTEgLyogTGVzcyAqLztcbiAgICByZXR1cm4gTmFOO1xufVxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHR3byBwcmltaXRpdmVzIGFyZSBlcXVhbCBvciBpZiB0d28gb2JqZWN0cyBoYXZlIHRoZSBzYW1lIGtleS92YWx1ZSBjb21iaW5hdGlvbnMuXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEBwYXJhbSBudWxsRXF1aXZhbGVuY3kgSWYgdHJ1ZSwgbnVsbC91bmRlZmluZWQgd2lsbCBiZSBlcXVpdmFsZW50IHRvIGFuIGVtcHR5IG9iamVjdCB7fS5cbiAqIEBwYXJhbSBleHRyYURlcHRoXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWl2YWxlbnQoYSwgYiwgbnVsbEVxdWl2YWxlbmN5ID0gdHJ1ZSwgZXh0cmFEZXB0aCA9IDApIHtcbiAgICAvLyBUYWtlIGEgc3RlcCBieSBzdGVwIGFwcHJvYWNoIHRvIGVuc3VyZSBlZmZpY2llbmN5LlxuICAgIGlmIChhcmVFcXVhbChhLCBiLCB0cnVlKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHtcbiAgICAgICAgaWYgKCFudWxsRXF1aXZhbGVuY3kpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChUeXBlLmlzT2JqZWN0KGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gIU9iamVjdC5rZXlzKGEpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVHlwZS5pc09iamVjdChiKSkge1xuICAgICAgICAgICAgcmV0dXJuICFPYmplY3Qua2V5cyhiKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEgPT0gbnVsbCAmJiBiID09IG51bGw7XG4gICAgfVxuICAgIGlmIChUeXBlLmlzT2JqZWN0KGEpICYmIFR5cGUuaXNPYmplY3QoYikpIHtcbiAgICAgICAgY29uc3QgYUtleXMgPSBPYmplY3Qua2V5cyhhKSwgYktleXMgPSBPYmplY3Qua2V5cyhiKSwgbGVuID0gYUtleXMubGVuZ3RoO1xuICAgICAgICBpZiAobGVuICE9IGJLZXlzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgYUtleXMuc29ydCgpO1xuICAgICAgICBiS2V5cy5zb3J0KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBhS2V5c1tpXTtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IGJLZXlzW2ldIHx8ICFhcmVFcXVhbChhW2tleV0sIGJba2V5XSwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvZXNuJ3QgdHJhY2sgY2lyY3VsYXIgcmVmZXJlbmNlcyBidXQgYWxsb3dzIGZvciBjb250cm9sbGluZyB0aGUgYW1vdW50IG9mIHJlY3Vyc2lvbi5cbiAgICAgICAgaWYgKGV4dHJhRGVwdGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgYUtleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFyZUVxdWl2YWxlbnQoYVtrZXldLCBiW2tleV0sIG51bGxFcXVpdmFsZW5jeSwgZXh0cmFEZXB0aCAtIDEpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbXBhcmUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db21wYXJlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0FyZ3VtZW50TnVsbEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnROdWxsRXhjZXB0aW9uIGV4dGVuZHMgQXJndW1lbnRFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgbWVzc2FnZSA9IGAnJHtwYXJhbU5hbWV9JyBpcyBudWxsIChvciB1bmRlZmluZWQpLmAsIGlubmVyRXhjZXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKHBhcmFtTmFtZSwgbWVzc2FnZSwgaW5uZXJFeGNlcHRpb24pO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBBcmd1bWVudE51bGxFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bcmd1bWVudE51bGxFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgdHJpbSB9IGZyb20gXCIuLi9UZXh0L1V0aWxpdHlcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdBcmd1bWVudEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnRFeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIC8vIEZvciBzaW1wbGljaXR5IGFuZCBjb25zaXN0ZW5jeSwgbGV0cyBzdGljayB3aXRoIDEgc2lnbmF0dXJlLlxuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgbWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIGJlZm9yZVNlYWxpbmcpIHtcbiAgICAgICAgbGV0IHBuID0gcGFyYW1OYW1lID8gKCd7JyArIHBhcmFtTmFtZSArICd9ICcpIDogJyc7XG4gICAgICAgIHN1cGVyKHRyaW0ocG4gKyAobWVzc2FnZSB8fCAnJykpLCBpbm5lckV4Y2VwdGlvbiwgKF8pID0+IHtcbiAgICAgICAgICAgIF8ucGFyYW1OYW1lID0gcGFyYW1OYW1lO1xuICAgICAgICAgICAgaWYgKGJlZm9yZVNlYWxpbmcpXG4gICAgICAgICAgICAgICAgYmVmb3JlU2VhbGluZyhfKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50RXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJndW1lbnRFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIGV4dGVuZHMgQXJndW1lbnRFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSwgYWN0dWFsVmFsdWUsIG1lc3NhZ2UgPSAnICcsIGlubmVyRXhjZXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKHBhcmFtTmFtZSwgYCgke2FjdHVhbFZhbHVlfSkgYCArIG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uLCAoXykgPT4ge1xuICAgICAgICAgICAgXy5hY3R1YWxWYWx1ZSA9IGFjdHVhbFZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBPYmplY3RQb29sIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvT2JqZWN0UG9vbFwiO1xuaW1wb3J0IHsgSXRlcmF0b3JSZXN1bHQgfSBmcm9tIFwiLi9JdGVyYXRvclJlc3VsdFwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmxldCB5aWVsZGVyUG9vbDtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5mdW5jdGlvbiB5aWVsZGVyKHJlY3ljbGUpIHtcbiAgICBpZiAoIXlpZWxkZXJQb29sKVxuICAgICAgICB5aWVsZGVyUG9vbFxuICAgICAgICAgICAgPSBuZXcgT2JqZWN0UG9vbCg0MCwgKCkgPT4gbmV3IFlpZWxkZXIoKSwgeSA9PiB5LnlpZWxkQnJlYWsoKSk7XG4gICAgaWYgKCFyZWN5Y2xlKVxuICAgICAgICByZXR1cm4geWllbGRlclBvb2wudGFrZSgpO1xuICAgIHlpZWxkZXJQb29sLmFkZChyZWN5Y2xlKTtcbn1cbmNsYXNzIFlpZWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gVk9JRDA7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gTmFOO1xuICAgIH1cbiAgICBnZXQgY3VycmVudCgpIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7IH0gLy8gdGhpcyBjbGFzcyBpcyBub3QgZW50aXJlbHkgbG9jYWwvcHJpdmF0ZS4gIFN0aWxsIG5lZWRzIHByb3RlY3Rpb24uXG4gICAgZ2V0IGluZGV4KCkgeyByZXR1cm4gdGhpcy5faW5kZXg7IH1cbiAgICB5aWVsZFJldHVybih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gdmFsdWU7XG4gICAgICAgIGlmIChpc05hTih0aGlzLl9pbmRleCkpXG4gICAgICAgICAgICB0aGlzLl9pbmRleCA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX2luZGV4Kys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB5aWVsZEJyZWFrKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gVk9JRDA7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gTmFOO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMueWllbGRCcmVhaygpO1xuICAgIH1cbn1cbmNvbnN0IE5BTUUgPSBcIkVudW1lcmF0b3JCYXNlXCI7XG4vLyBcIkVudW1lcmF0b3JcIiBpcyBjb25mbGljdCBKU2NyaXB0J3MgXCJFbnVtZXJhdG9yXCJcbi8vIE5hbWluZyB0aGlzIGNsYXNzIEVudW1lcmF0b3JCYXNlIHRvIGF2b2lkIGNvbGxpc2lvbiB3aXRoIElFLlxuZXhwb3J0IGNsYXNzIEVudW1lcmF0b3JCYXNlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9pbml0aWFsaXplciwgX3RyeUdldE5leHQsIGRpc3Bvc2VyLCBpc0VuZGxlc3MpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZXIgPSBfaW5pdGlhbGl6ZXI7XG4gICAgICAgIHRoaXMuX3RyeUdldE5leHQgPSBfdHJ5R2V0TmV4dDtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBOQU1FO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIGlmIChUeXBlLmlzQm9vbGVhbihpc0VuZGxlc3MpKVxuICAgICAgICAgICAgdGhpcy5faXNFbmRsZXNzID0gaXNFbmRsZXNzO1xuICAgICAgICBlbHNlIGlmIChUeXBlLmlzQm9vbGVhbihkaXNwb3NlcikpXG4gICAgICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBkaXNwb3NlcjtcbiAgICAgICAgaWYgKFR5cGUuaXNGdW5jdGlvbihkaXNwb3NlcikpXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlciA9IGRpc3Bvc2VyO1xuICAgIH1cbiAgICBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuX3lpZWxkZXI7XG4gICAgICAgIHJldHVybiB5ICYmIHkuY3VycmVudDtcbiAgICB9XG4gICAgZ2V0IGluZGV4KCkge1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5feWllbGRlcjtcbiAgICAgICAgcmV0dXJuIHkgPyB5LmluZGV4IDogTmFOO1xuICAgIH1cbiAgICAvKlxuICAgICAqIFByb3ZpZGVzIGEgbWVjaGFuaXNtIHRvIGluZGljYXRlIGlmIHRoaXMgZW51bWVyYWJsZSBuZXZlciBlbmRzLlxuICAgICAqIElmIHNldCB0byB0cnVlLCBzb21lIG9wZXJhdGlvbnMgdGhhdCBleHBlY3QgYSBmaW5pdGUgcmVzdWx0IG1heSB0aHJvdy5cbiAgICAgKiBFeHBsaWNpdCBmYWxzZSBtZWFucyBpdCBoYXMgYW4gZW5kLlxuICAgICAqIEltcGxpY2l0IHZvaWQgbWVhbnMgdW5rbm93bi5cbiAgICAgKi9cbiAgICBnZXQgaXNFbmRsZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNFbmRsZXNzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRlZCBmb3IgY29tcGF0aWJpbGl0eSBidXQgb25seSB3b3JrcyBpZiB0aGUgZW51bWVyYXRvciBpcyBhY3RpdmUuXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCB5ID0gXy5feWllbGRlcjtcbiAgICAgICAgXy5feWllbGRlciA9IG51bGw7XG4gICAgICAgIF8uX3N0YXRlID0gMCAvKiBCZWZvcmUgKi87XG4gICAgICAgIGlmICh5KVxuICAgICAgICAgICAgeWllbGRlcih5KTsgLy8gcmVjeWNsZSB1bnRpbCBhY3R1YWxseSBuZWVkZWQuXG4gICAgfVxuICAgIF9hc3NlcnRCYWRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHN3aXRjaCAoXy5fc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMyAvKiBGYXVsdGVkICovOlxuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKFwiVGhpcyBlbnVtZXJhdG9yIGNhdXNlZCBhIGZhdWx0IGFuZCB3YXMgZGlzcG9zZWQuXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1IC8qIERpc3Bvc2VkICovOlxuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKFwiVGhpcyBlbnVtZXJhdG9yIHdhcyBtYW51YWxseSBkaXNwb3NlZC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUGFzc2VzIHRoZSBjdXJyZW50IHZhbHVlIHRvIHRoZSBvdXQgY2FsbGJhY2sgaWYgdGhlIGVudW1lcmF0b3IgaXMgYWN0aXZlLlxuICAgICAqIE5vdGU6IFdpbGwgdGhyb3cgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gaWYgdGhpcyBoYXMgZmF1bHRlZCBvciBtYW51YWxseSBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICB0cnlHZXRDdXJyZW50KG91dCkge1xuICAgICAgICB0aGlzLl9hc3NlcnRCYWRTdGF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUgPT09IDEgLyogQWN0aXZlICovKSB7XG4gICAgICAgICAgICBvdXQodGhpcy5jdXJyZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IGNhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUgPCAyIC8qIENvbXBsZXRlZCAqLztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FmZWx5IG1vdmVzIHRvIHRoZSBuZXh0IGVudHJ5IGFuZCByZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgb25lLlxuICAgICAqIE5vdGU6IFdpbGwgdGhyb3cgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gaWYgdGhpcyBoYXMgZmF1bHRlZCBvciBtYW51YWxseSBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBtb3ZlTmV4dCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2Fzc2VydEJhZFN0YXRlKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF8uX3N0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwIC8qIEJlZm9yZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgXy5feWllbGRlciA9IF8uX3lpZWxkZXIgfHwgeWllbGRlcigpO1xuICAgICAgICAgICAgICAgICAgICBfLl9zdGF0ZSA9IDEgLyogQWN0aXZlICovO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbml0aWFsaXplciA9IF8uX2luaXRpYWxpemVyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplcigpO1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgMSAvKiBBY3RpdmUgKi86XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLl90cnlHZXROZXh0KF8uX3lpZWxkZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5fc3RhdGUgPSAyIC8qIENvbXBsZXRlZCAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICBfLl9zdGF0ZSA9IDMgLyogRmF1bHRlZCAqLztcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTW92ZXMgdG8gdGhlIG5leHQgZW50cnkgYW5kIGVtaXRzIHRoZSB2YWx1ZSB0aHJvdWdoIHRoZSBvdXQgY2FsbGJhY2suXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIHRyeU1vdmVOZXh0KG91dCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBvdXQodGhpcy5jdXJyZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbmV4dFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTmV4dCgpXG4gICAgICAgICAgICA/IHRoaXMuY3VycmVudFxuICAgICAgICAgICAgOiBWT0lEMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXhwb3NlZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIGdlbmVyYXRvcnMuXG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZU5leHQoKVxuICAgICAgICAgICAgPyBuZXcgSXRlcmF0b3JSZXN1bHQodGhpcy5jdXJyZW50LCB0aGlzLmluZGV4KVxuICAgICAgICAgICAgOiBJdGVyYXRvclJlc3VsdC5Eb25lO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHRoaXMuX2Vuc3VyZURpc3Bvc2VTdGF0ZSg0IC8qIEludGVycnVwdGVkICovKTtcbiAgICB9XG4gICAgJ3JldHVybicodmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2Fzc2VydEJhZFN0YXRlKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IFZPSUQwIHx8IF8uX3N0YXRlID09PSAyIC8qIENvbXBsZXRlZCAqLyB8fCBfLl9zdGF0ZSA9PT0gNCAvKiBJbnRlcnJ1cHRlZCAqL1xuICAgICAgICAgICAgICAgID8gSXRlcmF0b3JSZXN1bHQuRG9uZVxuICAgICAgICAgICAgICAgIDogbmV3IEl0ZXJhdG9yUmVzdWx0KHZhbHVlLCBWT0lEMCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLmVuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9lbnN1cmVEaXNwb3NlU3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghXy53YXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgXy5kaXNwb3NlKCk7XG4gICAgICAgICAgICBfLl9zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9pc0VuZGxlc3MgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgZGlzcG9zZXIgPSBfLl9kaXNwb3NlcjtcbiAgICAgICAgXy5faW5pdGlhbGl6ZXIgPSBudWxsO1xuICAgICAgICBfLl9kaXNwb3NlciA9IG51bGw7XG4gICAgICAgIGNvbnN0IHkgPSBfLl95aWVsZGVyO1xuICAgICAgICBfLl95aWVsZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSA1IC8qIERpc3Bvc2VkICovO1xuICAgICAgICBpZiAoeSlcbiAgICAgICAgICAgIHlpZWxkZXIoeSk7XG4gICAgICAgIGlmIChkaXNwb3NlcilcbiAgICAgICAgICAgIGRpc3Bvc2VyKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRW51bWVyYXRvckJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbnVtZXJhdG9yQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuZXhwb3J0IGZ1bmN0aW9uIEludGVnZXIobikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG4pO1xufVxuKGZ1bmN0aW9uIChJbnRlZ2VyKSB7XG4gICAgSW50ZWdlci5NQVhfMzJfQklUID0gMjE0NzQ4MzY0NztcbiAgICBJbnRlZ2VyLk1BWF9WQUxVRSA9IDkwMDcxOTkyNTQ3NDA5OTE7XG4gICAgY29uc3QgTlVNQkVSID0gXCJudW1iZXJcIjtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbnkgbnVtYmVyIHRvIGl0cyAzMmJpdCBjb3VudGVycGFydC5cbiAgICAgKiBUaHJvd3MgaWYgY29udmVyc2lvbiBpcyBub3QgcG9zc2libGUuXG4gICAgICogQHBhcmFtIG5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzMzJCaXQobikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuIHwgMDtcbiAgICAgICAgaWYgKGlzTmFOKG4pKVxuICAgICAgICAgICAgdGhyb3cgXCInbicgaXMgbm90IGEgbnVtYmVyLlwiO1xuICAgICAgICBpZiAobiAhPT0gLTEgJiYgcmVzdWx0ID09PSAtMSlcbiAgICAgICAgICAgIHRocm93IFwiJ24nIGlzIHRvbyBsYXJnZSB0byBiZSBhIDMyIGJpdCBpbnRlZ2VyLlwiO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBJbnRlZ2VyLmFzMzJCaXQgPSBhczMyQml0O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKG4pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBuID09PSBOVU1CRVIgJiYgaXNGaW5pdGUobikgJiYgbiA9PT0gTWF0aC5mbG9vcihuKTtcbiAgICB9XG4gICAgSW50ZWdlci5pcyA9IGlzO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgd2l0aGluIGEgMzIgYml0IHJhbmdlLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXMzMkJpdChuKSB7XG4gICAgICAgIHJldHVybiBuID09PSAobiB8IDApO1xuICAgIH1cbiAgICBJbnRlZ2VyLmlzMzJCaXQgPSBpczMyQml0O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBpZiBub3QgYW4gaW50ZWdlci5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnQobiwgYXJndW1lbnROYW1lKSB7XG4gICAgICAgIGxldCBpID0gaXMobik7XG4gICAgICAgIGlmICghaSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBcIk11c3QgYmUgYSBpbnRlZ2VyLlwiKTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIEludGVnZXIuYXNzZXJ0ID0gYXNzZXJ0O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBpZiBsZXNzIHRoYW4gemVyby5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnRaZXJvT3JHcmVhdGVyKG4sIGFyZ3VtZW50TmFtZSkge1xuICAgICAgICBsZXQgaSA9IGFzc2VydChuLCBhcmd1bWVudE5hbWUpICYmIG4gPj0gMDtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBuLCBcIk11c3QgYmUgYSB2YWxpZCBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB6ZXJvLlwiKTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlciA9IGFzc2VydFplcm9PckdyZWF0ZXI7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIG5vdCBncmVhdGVyIHRoYW4gemVyby5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEBwYXJhbSBhcmd1bWVudE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnRQb3NpdGl2ZShuLCBhcmd1bWVudE5hbWUpIHtcbiAgICAgICAgbGV0IGkgPSBhc3NlcnQobiwgYXJndW1lbnROYW1lKSAmJiBuID4gMDtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihhcmd1bWVudE5hbWUgfHwgJ24nLCBuLCBcIk11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uXCIpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgSW50ZWdlci5hc3NlcnRQb3NpdGl2ZSA9IGFzc2VydFBvc2l0aXZlO1xufSkoSW50ZWdlciB8fCAoSW50ZWdlciA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBJbnRlZ2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW50ZWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0ludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBTeXN0ZW1FeGNlcHRpb24gfSBmcm9tIFwiLi9TeXN0ZW1FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIGV4dGVuZHMgU3lzdGVtRXhjZXB0aW9uIHtcbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3N5c3RlbS5zeXN0ZW1leGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdTeXN0ZW1FeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIFN5c3RlbUV4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gICAgLypcbiAgICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBtZXNzYWdlOnN0cmluZyA9IG51bGwsXG4gICAgICAgICAgICBpbm5lckV4Y2VwdGlvbjpFcnJvciA9IG51bGwsXG4gICAgICAgICAgICBiZWZvcmVTZWFsaW5nPzooZXg6YW55KT0+dm9pZClcbiAgICAgICAge1xuICAgICAgICAgICAgc3VwZXIobWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIGJlZm9yZVNlYWxpbmcpO1xuICAgICAgICB9XG4gICAgKi9cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTeXN0ZW1FeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TeXN0ZW1FeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL1N5c3RlbUV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIH0gZnJvbSBcIi4vT2JqZWN0RGlzcG9zZWRFeGNlcHRpb25cIjtcbmV4cG9ydCBjbGFzcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX19maW5hbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5fX2ZpbmFsaXplciA9IF9fZmluYWxpemVyO1xuICAgICAgICB0aGlzLl9fd2FzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IHdhc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX3dhc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICB0aHJvd0lmRGlzcG9zZWQobWVzc2FnZSwgb2JqZWN0TmFtZSA9IHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9fd2FzRGlzcG9zZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24ob2JqZWN0TmFtZSwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLl9fd2FzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIC8vIFByZWVtcHRpdmVseSBzZXQgd2FzRGlzcG9zZWQgaW4gb3JkZXIgdG8gcHJldmVudCByZXBlYXRlZCBkaXNwb3NpbmcuXG4gICAgICAgICAgICAvLyBOT1RFOiBpbiB0cnVlIG11bHRpLXRocmVhZGVkIHNjZW5hcmlvcywgdGhpcyBuZWVkcyB0byBiZSBzeW5jaHJvbml6ZWQuXG4gICAgICAgICAgICBfLl9fd2FzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfLl9vbkRpc3Bvc2UoKTsgLy8gUHJvdGVjdGVkIG92ZXJyaWRlLlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uX19maW5hbGl6ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5fX2ZpbmFsaXplcigpO1xuICAgICAgICAgICAgICAgICAgICBfLl9fZmluYWxpemVyID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBQbGFjZWhvbGRlciBmb3Igb3ZlcnJpZGVzLlxuICAgIF9vbkRpc3Bvc2UoKSB7IH1cbn1cbmV4cG9ydCBkZWZhdWx0IERpc3Bvc2FibGVCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGlzcG9zYWJsZUJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuLi8uLi9JbnRlZ2VyXCI7XG4vKipcbiAqIEluaXRpYWxpemVzIGFuIGFycmF5IGRlcGVuZGluZyBvbiB0aGUgcmVxdWVzdGVkIGNhcGFjaXR5LlxuICogVGhlIHJldHVybmVkIGFycmF5IHdpbGwgaGF2ZSBhIC5sZW5ndGggZXF1YWwgdG8gdGhlIHZhbHVlIHByb3ZpZGVkLlxuICogQHBhcmFtIGxlbmd0aFxuICogQHJldHVybnMge1RbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUobGVuZ3RoKSB7XG4gICAgSW50ZWdlci5hc3NlcnQobGVuZ3RoLCAnbGVuZ3RoJyk7XG4gICAgLy8gVGhpcyBsb2dpYyBpcyBiYXNlZCB1cG9uIEpTIHBlcmZvcm1hbmNlIHRlc3RzIHRoYXQgc2hvdyBhIHNpZ25pZmljYW50IGRpZmZlcmVuY2UgYXQgdGhlIGxldmVsIG9mIDY1NTM2LlxuICAgIGxldCBhcnJheTtcbiAgICBpZiAobGVuZ3RoID4gNjU1MzYpXG4gICAgICAgIGFycmF5ID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgZWxzZSB7XG4gICAgICAgIGFycmF5ID0gW107XG4gICAgICAgIGFycmF5Lmxlbmd0aCA9IGxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5pdGlhbGl6ZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L2luaXRpYWxpemUuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgdXNpbmcgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9kaXNwb3NlXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5pbXBvcnQgeyBBcnJheUVudW1lcmF0b3IgfSBmcm9tIFwiLi9BcnJheUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IEluZGV4RW51bWVyYXRvciB9IGZyb20gXCIuL0luZGV4RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uIH0gZnJvbSBcIi4vVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBJbmZpbml0ZUVudW1lcmF0b3IgfSBmcm9tIFwiLi9JbmZpbml0ZUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IEVtcHR5RW51bWVyYXRvciBhcyBFbXB0eSB9IGZyb20gXCIuL0VtcHR5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgSXRlcmF0b3JFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSXRlcmF0b3JFbnVtZXJhdG9yXCI7XG5jb25zdCBTVFJJTkdfRU1QVFkgPSBcIlwiLCBFTkRMRVNTX0VYQ0VQVElPTl9NRVNTQUdFID0gJ0Nhbm5vdCBjYWxsIGZvckVhY2ggb24gYW4gZW5kbGVzcyBlbnVtZXJhYmxlLiAnICtcbiAgICAnV291bGQgcmVzdWx0IGluIGFuIGluZmluaXRlIGxvb3AgdGhhdCBjb3VsZCBoYW5nIHRoZSBjdXJyZW50IHByb2Nlc3MuJztcbmV4cG9ydCBmdW5jdGlvbiB0aHJvd0lmRW5kbGVzcyhpc0VuZGxlc3MpIHtcbiAgICBpZiAoaXNFbmRsZXNzKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKEVORExFU1NfRVhDRVBUSU9OX01FU1NBR0UpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gaW5pdEFycmF5RnJvbShzb3VyY2UsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKFR5cGUuaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1pbihzb3VyY2UubGVuZ3RoLCBtYXgpO1xuICAgICAgICBpZiAoaXNGaW5pdGUobGVuKSkge1xuICAgICAgICAgICAgaWYgKGxlbiA+IDY1NTM1KVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkobGVuKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgcmVzdWx0Lmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufVxuLy8gQ291bGQgYmUgYXJyYXksIG9yIElFbnVtZXJhYmxlLi4uXG4vKipcbiAqIFJldHVybnMgdGhlIGVudW1lcmF0b3IgZm9yIHRoZSBzcGVjaWZpZWQgY29sbGVjdGlvbiwgZW51bWVyYXRvciwgb3IgaXRlcmF0b3IuXG4gKiBJZiB0aGUgc291cmNlIGlzIGlkZW50aWZpZWQgYXMgSUVudW1lcmF0b3IgaXQgd2lsbCByZXR1cm4gdGhlIHNvdXJjZSBhcyBpcy5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tKHNvdXJjZSkge1xuICAgIC8vIFRvIHNpbXBsaWZ5IGFuZCBwcmV2ZW50IG51bGwgcmVmZXJlbmNlIGV4Y2VwdGlvbnM6XG4gICAgaWYgKCFzb3VyY2UpXG4gICAgICAgIHJldHVybiBFbXB0eTtcbiAgICBpZiAoKHNvdXJjZSkgaW5zdGFuY2VvZiAoQXJyYXkpKVxuICAgICAgICByZXR1cm4gbmV3IEFycmF5RW51bWVyYXRvcihzb3VyY2UpO1xuICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmRleEVudW1lcmF0b3IoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IHNvdXJjZS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgcG9pbnRlcjogMCxcbiAgICAgICAgICAgICAgICBzdGVwOiAxXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCFUeXBlLmlzUHJpbWl0aXZlKHNvdXJjZSkpIHtcbiAgICAgICAgaWYgKGlzRW51bWVyYWJsZShzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgIGlmIChUeXBlLmlzRnVuY3Rpb24oc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgICAgIGlmIChpc0VudW1lcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgIGlmIChpc0l0ZXJhdG9yKHNvdXJjZSkpXG4gICAgICAgICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yRW51bWVyYXRvcihzb3VyY2UpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFbnVtZXJhYmxlKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIFR5cGUuaGFzTWVtYmVyT2ZUeXBlKGluc3RhbmNlLCBcImdldEVudW1lcmF0b3JcIiwgVHlwZS5GVU5DVElPTik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFbnVtZXJhYmxlT3JBcnJheUxpa2UoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gVHlwZS5pc0FycmF5TGlrZShpbnN0YW5jZSkgfHwgaXNFbnVtZXJhYmxlKGluc3RhbmNlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmF0b3IoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gVHlwZS5oYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIFwibW92ZU5leHRcIiwgVHlwZS5GVU5DVElPTik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNJdGVyYXRvcihpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgXCJuZXh0XCIsIFR5cGUuRlVOQ1RJT04pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goZSwgYWN0aW9uLCBtYXggPSBJbmZpbml0eSkge1xuICAgIGlmIChlID09PSBTVFJJTkdfRU1QVFkpXG4gICAgICAgIHJldHVybiAwO1xuICAgIGlmIChlICYmIG1heCA+IDApIHtcbiAgICAgICAgaWYgKFR5cGUuaXNBcnJheUxpa2UoZSkpIHtcbiAgICAgICAgICAgIC8vIEFzc3VtZSBlLmxlbmd0aCBpcyBjb25zdGFudCBvciBhdCBsZWFzdCBkb2Vzbid0IGRldmlhdGUgdG8gaW5maW5pdGUgb3IgTmFOLlxuICAgICAgICAgICAgdGhyb3dJZkVuZGxlc3MoIWlzRmluaXRlKG1heCkgJiYgIWlzRmluaXRlKGUubGVuZ3RoKSk7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICBmb3IgKDsgaSA8IE1hdGgubWluKGUubGVuZ3RoLCBtYXgpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKGVbaV0sIGkpID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFbnVtZXJhdG9yKGUpKSB7XG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiBlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAvLyBSZXR1cm4gdmFsdWUgb2YgYWN0aW9uIGNhbiBiZSBhbnl0aGluZywgYnV0IGlmIGl0IGlzICg9PT0pIGZhbHNlIHRoZW4gdGhlIGZvckVhY2ggd2lsbCBkaXNjb250aW51ZS5cbiAgICAgICAgICAgIHdoaWxlIChtYXggPiBpICYmIGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oZS5jdXJyZW50LCBpKyspID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFbnVtZXJhYmxlKGUpKSB7XG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiBlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICAvLyBGb3IgZW51bWVyYXRvcnMgdGhhdCBhcmVuJ3QgRW51bWVyYWJsZUJhc2UsIGVuc3VyZSBkaXNwb3NlIGlzIGNhbGxlZC5cbiAgICAgICAgICAgIHJldHVybiB1c2luZyhlLmdldEVudW1lcmF0b3IoKSwgZiA9PiBmb3JFYWNoKGYsIGFjdGlvbiwgbWF4KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSXRlcmF0b3IoZSkpIHtcbiAgICAgICAgICAgIC8vIEZvciBvdXIgcHVycG9zZSBpdGVyYXRvcnMgYXJlIGVuZGxlc3MgYW5kIGEgbWF4IG11c3QgYmUgc3BlY2lmaWVkIGJlZm9yZSBpdGVyYXRpbmcuXG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSk7XG4gICAgICAgICAgICBsZXQgaSA9IDAsIHI7XG4gICAgICAgICAgICAvLyBSZXR1cm4gdmFsdWUgb2YgYWN0aW9uIGNhbiBiZSBhbnl0aGluZywgYnV0IGlmIGl0IGlzICg9PT0pIGZhbHNlIHRoZW4gdGhlIGZvckVhY2ggd2lsbCBkaXNjb250aW51ZS5cbiAgICAgICAgICAgIHdoaWxlIChtYXggPiBpICYmICEociA9IGUubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbihyLnZhbHVlLCBpKyspID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG4vKipcbiAqIENvbnZlcnRzIGFueSBlbnVtZXJhYmxlIHRvIGFuIGFycmF5LlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIG1heCBTdG9wcyBhZnRlciBtYXggaXMgcmVhY2hlZC4gIEFsbG93cyBmb3IgZm9yRWFjaCB0byBiZSBjYWxsZWQgb24gaW5maW5pdGUgZW51bWVyYXRpb25zLlxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkoc291cmNlLCBtYXggPSBJbmZpbml0eSkge1xuICAgIGlmIChzb3VyY2UgPT09IFNUUklOR19FTVBUWSlcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIGlmICghaXNGaW5pdGUobWF4KSAmJiAoc291cmNlKSBpbnN0YW5jZW9mIChBcnJheSkpXG4gICAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0QXJyYXlGcm9tKHNvdXJjZSwgbWF4KTtcbiAgICBpZiAoLTEgPT09IGZvckVhY2goc291cmNlLCAoZSwgaSkgPT4geyByZXN1bHRbaV0gPSBlOyB9LCBtYXgpKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQ29udmVydHMgYW55IGVudW1lcmFibGUgdG8gYW4gYXJyYXkgb2Ygc2VsZWN0ZWQgdmFsdWVzLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHNlbGVjdG9yXG4gKiBAcGFyYW0gbWF4IFN0b3BzIGFmdGVyIG1heCBpcyByZWFjaGVkLiAgQWxsb3dzIGZvciBmb3JFYWNoIHRvIGJlIGNhbGxlZCBvbiBpbmZpbml0ZSBlbnVtZXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7VFJlc3VsdFtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwKHNvdXJjZSwgc2VsZWN0b3IsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKHNvdXJjZSA9PT0gU1RSSU5HX0VNUFRZKVxuICAgICAgICByZXR1cm4gW107XG4gICAgaWYgKCFpc0Zpbml0ZShtYXgpICYmIChzb3VyY2UpIGluc3RhbmNlb2YgKEFycmF5KSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5tYXAoc2VsZWN0b3IpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRBcnJheUZyb20oc291cmNlLCBtYXgpO1xuICAgIGlmICgtMSA9PT0gZm9yRWFjaChzb3VyY2UsIChlLCBpKSA9PiB7IHJlc3VsdFtpXSA9IHNlbGVjdG9yKGUsIGkpOyB9LCBtYXgpKVxuICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vVHlwZXNcIjtcbi8qKlxuICogVGFrZXMgYW55IG51bWJlciBvZiBkaXNwb3NhYmxlcyBhcyBhcmd1bWVudHMgYW5kIGF0dGVtcHRzIHRvIGRpc3Bvc2UgdGhlbS5cbiAqIEFueSBleGNlcHRpb25zIHRocm93biB3aXRoaW4gYSBkaXNwb3NlIGFyZSBub3QgdHJhcHBlZC5cbiAqIFVzZSAnZGlzcG9zZVdpdGhvdXRFeGNlcHRpb24nIHRvIGF1dG9tYXRpY2FsbHkgdHJhcCBleGNlcHRpb25zLlxuICpcbiAqIENhbiBhY2NlcHQgPGFueT4gYW5kIHdpbGwgaWdub3JlIG9iamVjdHMgdGhhdCBkb24ndCBoYXZlIGEgZGlzcG9zZSgpIG1ldGhvZC5cbiAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcG9zZSguLi5kaXNwb3NhYmxlcykge1xuICAgIC8vIFRoZSBkaXNwb3NhYmxlcyBhcmd1bWVudHMgYXJyYXkgaXMgZWZmZWN0aXZlbHkgbG9jYWxpemVkIHNvIGl0J3Mgc2FmZS5cbiAgICBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgZmFsc2UpO1xufVxuKGZ1bmN0aW9uIChkaXNwb3NlKSB7XG4gICAgLyoqXG4gICAgICogVXNlIHRoaXMgd2hlbiBvbmx5IGRpc3Bvc2luZyBvbmUgb2JqZWN0IHRvIGF2b2lkIGNyZWF0aW9uIG9mIGFycmF5cy5cbiAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZVxuICAgICAqIEBwYXJhbSB0cmFwRXhjZXB0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNpbmdsZShkaXNwb3NhYmxlLCB0cmFwRXhjZXB0aW9ucyA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChkaXNwb3NhYmxlKVxuICAgICAgICAgICAgZGlzcG9zZVNpbmdsZShkaXNwb3NhYmxlLCB0cmFwRXhjZXB0aW9ucyk7XG4gICAgfVxuICAgIGRpc3Bvc2Uuc2luZ2xlID0gc2luZ2xlO1xuICAgIGZ1bmN0aW9uIGRlZmVycmVkKC4uLmRpc3Bvc2FibGVzKSB7XG4gICAgICAgIHRoZXNlLmRlZmVycmVkKGRpc3Bvc2FibGVzKTtcbiAgICB9XG4gICAgZGlzcG9zZS5kZWZlcnJlZCA9IGRlZmVycmVkO1xuICAgIC8qKlxuICAgICAqIFRha2VzIGFueSBudW1iZXIgb2YgZGlzcG9zYWJsZXMgYW5kIHRyYXBzIGFueSBlcnJvcnMgdGhhdCBvY2N1ciB3aGVuIGRpc3Bvc2luZy5cbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBleGNlcHRpb25zIHRocm93bi5cbiAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZXNcbiAgICAgKiBAcmV0dXJucyB7YW55W119IFJldHVybnMgYW4gYXJyYXkgb2YgZXhjZXB0aW9ucyB0aGF0IG9jY3VycmVkLCBpZiB0aGVyZSBhcmUgYW55LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdpdGhvdXRFeGNlcHRpb24oLi4uZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgLy8gVGhlIGRpc3Bvc2FibGVzIGFyZ3VtZW50cyBhcnJheSBpcyBlZmZlY3RpdmVseSBsb2NhbGl6ZWQgc28gaXQncyBzYWZlLlxuICAgICAgICByZXR1cm4gZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMsIHRydWUpO1xuICAgIH1cbiAgICBkaXNwb3NlLndpdGhvdXRFeGNlcHRpb24gPSB3aXRob3V0RXhjZXB0aW9uO1xuICAgIC8qKlxuICAgICAqIFRha2VzIGFuIGFycmF5IG9mIGRpc3Bvc2FibGUgb2JqZWN0cyBhbmQgZW5zdXJlcyB0aGV5IGFyZSBkaXNwb3NlZC5cbiAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZXNcbiAgICAgKiBAcGFyYW0gdHJhcEV4Y2VwdGlvbnMgSWYgdHJ1ZSwgcHJldmVudHMgZXhjZXB0aW9ucyBmcm9tIGJlaW5nIHRocm93biB3aGVuIGRpc3Bvc2luZy5cbiAgICAgKiBAcmV0dXJucyB7YW55W119IElmICd0cmFwRXhjZXB0aW9ucycgaXMgdHJ1ZSwgcmV0dXJucyBhbiBhcnJheSBvZiBleGNlcHRpb25zIHRoYXQgb2NjdXJyZWQsIGlmIHRoZXJlIGFyZSBhbnkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdGhlc2UoZGlzcG9zYWJsZXMsIHRyYXBFeGNlcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkaXNwb3NhYmxlcyAmJiBkaXNwb3NhYmxlcy5sZW5ndGhcbiAgICAgICAgICAgID8gZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMuc2xpY2UoKSwgdHJhcEV4Y2VwdGlvbnMpXG4gICAgICAgICAgICA6IHZvaWQgMDtcbiAgICB9XG4gICAgZGlzcG9zZS50aGVzZSA9IHRoZXNlO1xuICAgIChmdW5jdGlvbiAodGhlc2UpIHtcbiAgICAgICAgZnVuY3Rpb24gZGVmZXJyZWQoZGlzcG9zYWJsZXMsIGRlbGF5ID0gMCkge1xuICAgICAgICAgICAgaWYgKGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICghKGRlbGF5ID49IDApKVxuICAgICAgICAgICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChkaXNwb3NlVGhlc2VJbnRlcm5hbCwgZGVsYXksIGRpc3Bvc2FibGVzLnNsaWNlKCksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoZXNlLmRlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2UgdGhpcyB1bnNhZmUgbWV0aG9kIHdoZW4gZ3VhcmFudGVlZCBub3QgdG8gY2F1c2UgZXZlbnRzIHRoYXQgd2lsbCBtYWtlIG1vZGlmaWNhdGlvbnMgdG8gdGhlIGRpc3Bvc2FibGVzIGFycmF5LlxuICAgICAgICAgKiBAcGFyYW0gZGlzcG9zYWJsZXNcbiAgICAgICAgICogQHBhcmFtIHRyYXBFeGNlcHRpb25zXG4gICAgICAgICAqIEByZXR1cm5zIHthbnlbXX1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG5vQ29weShkaXNwb3NhYmxlcywgdHJhcEV4Y2VwdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXNwb3NhYmxlcyAmJiBkaXNwb3NhYmxlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICA/IGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCB0cmFwRXhjZXB0aW9ucylcbiAgICAgICAgICAgICAgICA6IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgICB0aGVzZS5ub0NvcHkgPSBub0NvcHk7XG4gICAgfSkodGhlc2UgPSBkaXNwb3NlLnRoZXNlIHx8IChkaXNwb3NlLnRoZXNlID0ge30pKTtcbn0pKGRpc3Bvc2UgfHwgKGRpc3Bvc2UgPSB7fSkpO1xuLyoqXG4gKiBKdXN0IGxpa2UgaW4gQyMgdGhpcyAndXNpbmcnIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBwYXNzZWQgZGlzcG9zYWJsZSBpcyBkaXNwb3NlZCB3aGVuIHRoZSBjbG9zdXJlIGhhcyBmaW5pc2hlZC5cbiAqXG4gKiBVc2FnZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHVzaW5nKG5ldyBEaXNwb3NhYmxlT2JqZWN0KCksKG15T2JqKT0+e1xuICAgICAqICAgLy8gZG8gd29yayB3aXRoIG15T2JqXG4gICAgICogfSk7XG4gKiAvLyBteU9iaiBhdXRvbWF0aWNhbGx5IGhhcyBpdCdzIGRpc3Bvc2UgbWV0aG9kIGNhbGxlZC5cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBkaXNwb3NhYmxlIE9iamVjdCB0byBiZSBkaXNwb3NlZC5cbiAqIEBwYXJhbSBjbG9zdXJlIEZ1bmN0aW9uIGNhbGwgdG8gZXhlY3V0ZS5cbiAqIEByZXR1cm5zIHtUUmV0dXJufSBSZXR1cm5zIHdoYXRldmVyIHRoZSBjbG9zdXJlJ3MgcmV0dXJuIHZhbHVlIGlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNpbmcoZGlzcG9zYWJsZSwgY2xvc3VyZSkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjbG9zdXJlKGRpc3Bvc2FibGUpO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgZGlzcG9zZVNpbmdsZShkaXNwb3NhYmxlLCBmYWxzZSk7XG4gICAgfVxufVxuLyoqXG4gKiBUaGlzIHByaXZhdGUgZnVuY3Rpb24gbWFrZXMgZGlzcG9zaW5nIG1vcmUgcm9idXN0IGZvciB3aGVuIHRoZXJlJ3Mgbm8gdHlwZSBjaGVja2luZy5cbiAqIElmIHRyYXBFeGNlcHRpb25zIGlzICd0cnVlJyBpdCBjYXRjaGVzIGFuZCByZXR1cm5zIGFueSBleGNlcHRpb24gaW5zdGVhZCBvZiB0aHJvd2luZy5cbiAqL1xuZnVuY3Rpb24gZGlzcG9zZVNpbmdsZShkaXNwb3NhYmxlLCB0cmFwRXhjZXB0aW9ucykge1xuICAgIGlmIChkaXNwb3NhYmxlXG4gICAgICAgICYmIHR5cGVvZiBkaXNwb3NhYmxlID09IFR5cGUuT0JKRUNUXG4gICAgICAgICYmIHR5cGVvZiBkaXNwb3NhYmxlWydkaXNwb3NlJ10gPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGlmICh0cmFwRXhjZXB0aW9ucykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkaXNwb3NhYmxlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkaXNwb3NhYmxlLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG4vKipcbiAqIFRoaXMgZGlzcG9zZSBtZXRob2QgYXNzdW1lcyBpdCdzIHdvcmtpbmcgb24gYSBsb2NhbCBhcnJheUNvcHkgYW5kIGlzIHVuc2FmZSBmb3IgZXh0ZXJuYWwgdXNlLlxuICovXG5mdW5jdGlvbiBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgdHJhcEV4Y2VwdGlvbnMsIGluZGV4ID0gMCkge1xuICAgIGxldCBleGNlcHRpb25zO1xuICAgIGNvbnN0IGxlbiA9IGRpc3Bvc2FibGVzID8gZGlzcG9zYWJsZXMubGVuZ3RoIDogMDtcbiAgICBmb3IgKDsgaW5kZXggPCBsZW47IGluZGV4KyspIHtcbiAgICAgICAgbGV0IG5leHQgPSBkaXNwb3NhYmxlc1tpbmRleF07XG4gICAgICAgIGlmICghbmV4dClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiAodHJhcEV4Y2VwdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ID0gZGlzcG9zZVNpbmdsZShuZXh0LCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChleCkge1xuICAgICAgICAgICAgICAgIGlmICghZXhjZXB0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgIGV4Y2VwdGlvbnMucHVzaChleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkaXNwb3NlU2luZ2xlKG5leHQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGlmICghc3VjY2VzcyAmJiBpbmRleCArIDEgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLyogSWYgY29kZSBpcyAnY29udGludWVkJyBieSB0aGUgZGVidWdnZXIsXG4gICAgICAgICAgICAgICAgICAgICAqIG5lZWQgdG8gZW5zdXJlIHRoZSByZXN0IG9mIHRoZSBkaXNwb3NhYmxlcyBhcmUgY2FyZWQgZm9yLiAqL1xuICAgICAgICAgICAgICAgICAgICBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgZmFsc2UsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSnVzdCBpbiBjYXNlLi4uICBTaG91bGQgbmV2ZXIgaGFwcGVuLCBidXQgYXNzZXJ0cyB0aGUgaW50ZW50aW9uLlxuICAgICAgICAgICAgaWYgKCFzdWNjZXNzKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleGNlcHRpb25zO1xufVxuZXhwb3J0IGRlZmF1bHQgZGlzcG9zZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpc3Bvc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL2Rpc3Bvc2UuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi9FbnVtZXJhdG9yQmFzZVwiO1xuZXhwb3J0IGNsYXNzIEluZGV4RW51bWVyYXRvciBleHRlbmRzIEVudW1lcmF0b3JCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VGYWN0b3J5KSB7XG4gICAgICAgIGxldCBzb3VyY2U7XG4gICAgICAgIHN1cGVyKCgpID0+IHtcbiAgICAgICAgICAgIHNvdXJjZSA9IHNvdXJjZUZhY3RvcnkoKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgJiYgc291cmNlLnNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IDApXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImxlbmd0aCBtdXN0IGJlIHplcm8gb3IgZ3JlYXRlclwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKGxlbikpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImxlbmd0aCBtdXN0IGZpbml0ZSBudW1iZXJcIik7XG4gICAgICAgICAgICAgICAgaWYgKGxlbiAmJiBzb3VyY2Uuc3RlcCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBJbmRleEVudW1lcmF0b3Igc3RlcCB2YWx1ZSAoMCkuXCIpO1xuICAgICAgICAgICAgICAgIGxldCBwb2ludGVyID0gc291cmNlLnBvaW50ZXI7XG4gICAgICAgICAgICAgICAgaWYgKCFwb2ludGVyKVxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyID0gMDtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwb2ludGVyICE9IE1hdGguZmxvb3IocG9pbnRlcikpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgSW5kZXhFbnVtZXJhdG9yIHBvaW50ZXIgdmFsdWUgKFwiICsgcG9pbnRlciArIFwiKSBoYXMgZGVjaW1hbC5cIik7XG4gICAgICAgICAgICAgICAgc291cmNlLnBvaW50ZXIgPSBwb2ludGVyO1xuICAgICAgICAgICAgICAgIGxldCBzdGVwID0gc291cmNlLnN0ZXA7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGVwKVxuICAgICAgICAgICAgICAgICAgICBzdGVwID0gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGVwICE9IE1hdGguZmxvb3Ioc3RlcCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgSW5kZXhFbnVtZXJhdG9yIHN0ZXAgdmFsdWUgKFwiICsgc3RlcCArIFwiKSBoYXMgZGVjaW1hbC5cIik7XG4gICAgICAgICAgICAgICAgc291cmNlLnN0ZXAgPSBzdGVwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGxlbiA9IChzb3VyY2UgJiYgc291cmNlLnNvdXJjZSkgPyBzb3VyY2UubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIGlmICghbGVuIHx8IGlzTmFOKGxlbikpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IHNvdXJjZS5wb2ludGVyO1xuICAgICAgICAgICAgaWYgKHNvdXJjZS5wb2ludGVyID09IG51bGwpXG4gICAgICAgICAgICAgICAgc291cmNlLnBvaW50ZXIgPSAwOyAvLyBzaG91bGQgbmV2ZXIgaGFwcGVuIGJ1dCBpcyBpbiBwbGFjZSB0byBuZWdhdGUgY29tcGlsZXIgd2FybmluZ3MuXG4gICAgICAgICAgICBpZiAoIXNvdXJjZS5zdGVwKVxuICAgICAgICAgICAgICAgIHNvdXJjZS5zdGVwID0gMTsgLy8gc2hvdWxkIG5ldmVyIGhhcHBlbiBidXQgaXMgaW4gcGxhY2UgdG8gbmVnYXRlIGNvbXBpbGVyIHdhcm5pbmdzLlxuICAgICAgICAgICAgc291cmNlLnBvaW50ZXIgPSBzb3VyY2UucG9pbnRlciArIHNvdXJjZS5zdGVwO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyZW50IDwgbGVuICYmIGN1cnJlbnQgPj0gMClcbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oc291cmNlLnNvdXJjZVtjdXJyZW50XSlcbiAgICAgICAgICAgICAgICA6IHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgc291cmNlLnNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJbmRleEVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbmRleEVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmRleEVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5leHBvcnQgY2xhc3MgSXRlcmF0b3JSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBpbmRleCwgZG9uZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PSAnYm9vbGVhbicpXG4gICAgICAgICAgICB0aGlzLmRvbmUgPSBpbmRleDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLmRvbmUgPSBkb25lO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gICAgfVxufVxuKGZ1bmN0aW9uIChJdGVyYXRvclJlc3VsdCkge1xuICAgIEl0ZXJhdG9yUmVzdWx0LkRvbmUgPSBuZXcgSXRlcmF0b3JSZXN1bHQoVk9JRDAsIFZPSUQwLCB0cnVlKTtcbiAgICBmdW5jdGlvbiBHZXREb25lKCkgeyByZXR1cm4gSXRlcmF0b3JSZXN1bHQuRG9uZTsgfVxuICAgIEl0ZXJhdG9yUmVzdWx0LkdldERvbmUgPSBHZXREb25lO1xufSkoSXRlcmF0b3JSZXN1bHQgfHwgKEl0ZXJhdG9yUmVzdWx0ID0ge30pKTtcbk9iamVjdC5mcmVlemUoSXRlcmF0b3JSZXN1bHQpO1xuZXhwb3J0IGRlZmF1bHQgSXRlcmF0b3JSZXN1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JdGVyYXRvclJlc3VsdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0l0ZXJhdG9yUmVzdWx0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbi8qKlxuICogQ2FuIGJlIHVzZWQgc3RhdGljYWxseSBvciBleHRlbmRlZCBmb3IgdmFyeWluZyBkaWZmZXJlbnQgcmV1c2FibGUgZnVuY3Rpb24gc2lnbmF0dXJlcy5cbiAqL1xuLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqLyBleHBvcnQgY2xhc3MgRnVuY3Rpb25zIHtcbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogQSB0eXBlZCBtZXRob2QgZm9yIHVzZSB3aXRoIHNpbXBsZSBzZWxlY3Rpb24gb2YgdGhlIHBhcmFtZXRlci5cbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBJZGVudGl0eSh4KSB7IHJldHVybiB4OyB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBUcnVlKCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZhbHNlKCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAvKipcbiAgICAgKiBEb2VzIG5vdGhpbmcuXG4gICAgICovXG4gICAgQmxhbmsoKSB7IH1cbn1cbmNvbnN0IHJvb3RGdW5jdGlvbnMgPSBuZXcgRnVuY3Rpb25zKCk7XG4vLyBFeHBvc2Ugc3RhdGljIHZlcnNpb25zLlxuKGZ1bmN0aW9uIChGdW5jdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBBIHR5cGVkIG1ldGhvZCBmb3IgdXNlIHdpdGggc2ltcGxlIHNlbGVjdGlvbiBvZiB0aGUgcGFyYW1ldGVyLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5JZGVudGl0eSA9IHJvb3RGdW5jdGlvbnMuSWRlbnRpdHk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBGdW5jdGlvbnMuVHJ1ZSA9IHJvb3RGdW5jdGlvbnMuVHJ1ZTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5GYWxzZSA9IHJvb3RGdW5jdGlvbnMuRmFsc2U7XG4gICAgLyoqXG4gICAgICogRG9lcyBub3RoaW5nLlxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5CbGFuayA9IHJvb3RGdW5jdGlvbnMuQmxhbms7XG59KShGdW5jdGlvbnMgfHwgKEZ1bmN0aW9ucyA9IHt9KSk7XG4vLyBNYWtlIHRoaXMgcmVhZCBvbmx5LiAgU2hvdWxkIHN0aWxsIGFsbG93IGZvciBzdWItY2xhc3Npbmcgc2luY2UgZXh0cmEgbWV0aG9kcyBhcmUgYWRkZWQgdG8gcHJvdG90eXBlLlxuT2JqZWN0LmZyZWV6ZShGdW5jdGlvbnMpO1xuZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb25zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RnVuY3Rpb25zLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRnVuY3Rpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tIFwiLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBpc0NvbW1vbkpTLCBpc05vZGVKUywgaXNSZXF1aXJlSlMgfSBmcm9tIFwiLi4vRW52aXJvbm1lbnRcIjtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4vL25vaW5zcGVjdGlvbiBTcGVsbENoZWNraW5nSW5zcGVjdGlvblxuY29uc3QgTkFNRSA9IFwiQ29sbGVjdGlvbkJhc2VcIiwgQ01EQyA9IFwiQ2Fubm90IG1vZGlmeSBhIGRpc3Bvc2VkIGNvbGxlY3Rpb24uXCIsIENNUk8gPSBcIkNhbm5vdCBtb2RpZnkgYSByZWFkLW9ubHkgY29sbGVjdGlvbi5cIjtcbmNvbnN0IExJTlFfUEFUSCA9IFwiLi4vLi4vU3lzdGVtLkxpbnEvTGlucVwiO1xuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25CYXNlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSwgX2VxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9lcXVhbGl0eUNvbXBhcmVyID0gX2VxdWFsaXR5Q29tcGFyZXI7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE5BTUU7XG4gICAgICAgIF8uX2ltcG9ydEVudHJpZXMoc291cmNlKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uID0gMDtcbiAgICAgICAgXy5fbW9kaWZpZWRDb3VudCA9IDA7XG4gICAgICAgIF8uX3ZlcnNpb24gPSAwO1xuICAgIH1cbiAgICBnZXQgY291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvdW50KCk7XG4gICAgfVxuICAgIGdldElzUmVhZE9ubHkoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgZ2V0IGlzUmVhZE9ubHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldElzUmVhZE9ubHkoKTtcbiAgICB9XG4gICAgYXNzZXJ0TW9kaWZpYWJsZSgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoQ01EQyk7XG4gICAgICAgIGlmICh0aGlzLmdldElzUmVhZE9ubHkoKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKENNUk8pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgICAgIGlmICh2ZXJzaW9uICE9PSB0aGlzLl92ZXJzaW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDb2xsZWN0aW9uIHdhcyBtb2RpZmllZC5cIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBfb25Nb2RpZmllZCgpIHsgfVxuICAgIF9zaWduYWxNb2RpZmljYXRpb24oaW5jcmVtZW50KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoaW5jcmVtZW50KVxuICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICBpZiAoXy5fbW9kaWZpZWRDb3VudCAmJiAhdGhpcy5fdXBkYXRlUmVjdXJzaW9uKSB7XG4gICAgICAgICAgICBfLl9tb2RpZmllZENvdW50ID0gMDtcbiAgICAgICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgXy5fb25Nb2RpZmllZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgLy8gQXZvaWQgZmF0YWwgZXJyb3JzIHdoaWNoIG1heSBoYXZlIGJlZW4gY2F1c2VkIGJ5IGNvbnN1bWVyLlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfaW5jcmVtZW50TW9kaWZpZWQoKSB7IHRoaXMuX21vZGlmaWVkQ291bnQrKzsgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIGdldCBpc1VwZGF0aW5nKCkgeyByZXR1cm4gdGhpcy5fdXBkYXRlUmVjdXJzaW9uICE9IDA7IH1cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGNsb3N1cmUgdGhhdCBpZiByZXR1cm5pbmcgdHJ1ZSB3aWxsIHByb3BhZ2F0ZSBhbiB1cGRhdGUgc2lnbmFsLlxuICAgICAqIE11bHRpcGxlIHVwZGF0ZSBvcGVyYXRpb25zIGNhbiBiZSBvY2N1cnJpbmcgYXQgb25jZSBvciByZWN1cnNpdmVseSBhbmQgdGhlIG9uTW9kaWZpZWQgc2lnbmFsIHdpbGwgb25seSBvY2N1ciBvbmNlIHRoZXkncmUgZG9uZS5cbiAgICAgKiBAcGFyYW0gY2xvc3VyZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhbmRsZVVwZGF0ZShjbG9zdXJlKSB7XG4gICAgICAgIGlmICghY2xvc3VyZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgbGV0IHVwZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh1cGRhdGVkID0gY2xvc3VyZSgpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICB9XG4gICAgLypcbiAgICAgKiBOb3RlOiBmb3IgYSBzbGlnaHQgYW1vdW50IG1vcmUgY29kZSwgd2UgYXZvaWQgY3JlYXRpbmcgZnVuY3Rpb25zL2Nsb3N1cmVzLlxuICAgICAqIENhbGxpbmcgaGFuZGxlVXBkYXRlIGlzIHRoZSBjb3JyZWN0IHBhdHRlcm4sIGJ1dCBpZiBwb3NzaWJsZSBhdm9pZCBjcmVhdGluZyBhbm90aGVyIGZ1bmN0aW9uIHNjb3BlLlxuICAgICAqL1xuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZW50cnkgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAgICogQHBhcmFtIGVudHJ5XG4gICAgICovXG4gICAgYWRkKGVudHJ5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoXy5fYWRkSW50ZXJuYWwoZW50cnkpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gXztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBlbnRyaWVzIGZyb20gdGhlIGNvbGxlY3Rpb24gYWxsb3dpbmcgZm9yIGEgbGltaXQuXG4gICAgICogRm9yIGV4YW1wbGUgaWYgdGhlIGNvbGxlY3Rpb24gbm90IGEgZGlzdGluY3Qgc2V0LCBtb3JlIHRoYW4gb25lIGVudHJ5IGNvdWxkIGJlIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIGVudHJ5IFRoZSBlbnRyeSB0byByZW1vdmUuXG4gICAgICogQHBhcmFtIG1heCBMaW1pdCBvZiBlbnRyaWVzIHRvIHJlbW92ZS4gIFdpbGwgcmVtb3ZlIGFsbCBtYXRjaGVzIGlmIG5vIG1heCBzcGVjaWZpZWQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIG51bWJlciBvZiBlbnRyaWVzIHJlbW92ZWQuXG4gICAgICovXG4gICAgcmVtb3ZlKGVudHJ5LCBtYXggPSBJbmZpbml0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICBsZXQgbiA9IE5hTjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChuID0gXy5fcmVtb3ZlSW50ZXJuYWwoZW50cnksIG1heCkpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGNvbnRlbnRzIG9mIHRoZSBjb2xsZWN0aW9uIHJlc3VsdGluZyBpbiBhIGNvdW50IG9mIHplcm8uXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgbGV0IG4gPSBOYU47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobiA9IF8uX2NsZWFySW50ZXJuYWwoKSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fY2xlYXJJbnRlcm5hbCgpO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gMDtcbiAgICAgICAgdGhpcy5fdXBkYXRlUmVjdXJzaW9uID0gMDtcbiAgICAgICAgdGhpcy5fbW9kaWZpZWRDb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLl9saW5xO1xuICAgICAgICB0aGlzLl9saW5xID0gdm9pZCAwO1xuICAgICAgICBpZiAobClcbiAgICAgICAgICAgIGwuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBfaW1wb3J0RW50cmllcyhlbnRyaWVzKSB7XG4gICAgICAgIGxldCBhZGRlZCA9IDA7XG4gICAgICAgIGlmIChlbnRyaWVzKSB7XG4gICAgICAgICAgICBpZiAoKGVudHJpZXMpIGluc3RhbmNlb2YgKEFycmF5KSkge1xuICAgICAgICAgICAgICAgIC8vIE9wdGltaXplIGZvciBhdm9pZGluZyBhIG5ldyBjbG9zdXJlLlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGUgb2YgZW50cmllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWRkSW50ZXJuYWwoZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRlZCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvckVhY2goZW50cmllcywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hZGRJbnRlcm5hbChlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkKys7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkZGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYWZlbHkgaW1wb3J0cyBhbnkgYXJyYXkgZW51bWVyYXRvciwgb3IgZW51bWVyYWJsZS5cbiAgICAgKiBAcGFyYW0gZW50cmllc1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgaW1wb3J0RW50cmllcyhlbnRyaWVzKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIWVudHJpZXMpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICBsZXQgbiA9IE5hTjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChuID0gXy5faW1wb3J0RW50cmllcyhlbnRyaWVzKSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgZmlsdGVyZWQgYnkgdGhlIHByb3ZpZGVkIHByZWRpY2F0ZS5cbiAgICAgKiBQcm92aWRlZCBmb3Igc2ltaWxhcml0eSB0byBKUyBBcnJheS5cbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQHJldHVybnMge1tdfVxuICAgICAqL1xuICAgIGZpbHRlcihwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdwcmVkaWNhdGUnKTtcbiAgICAgICAgbGV0IGNvdW50ID0gIXRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoZSwgaSkpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIHRoZSBmaXJzdCB0aW1lIHByZWRpY2F0ZSByZXR1cm5zIHRydWUuICBPdGhlcndpc2UgZmFsc2UuXG4gICAgICogVXNlZnVsIGZvciBzZWFyY2hpbmcgdGhyb3VnaCBhIGNvbGxlY3Rpb24uXG4gICAgICogQHBhcmFtIHByZWRpY2F0ZVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgYW55KHByZWRpY2F0ZSkge1xuICAgICAgICBsZXQgY291bnQgPSB0aGlzLmdldENvdW50KCk7XG4gICAgICAgIGlmICghY291bnQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4oY291bnQpO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKChlLCBpKSA9PiAhKGZvdW5kID0gcHJlZGljYXRlKGUsIGkpKSk7XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIHRoZSBmaXJzdCB0aW1lIHByZWRpY2F0ZSByZXR1cm5zIHRydWUuICBPdGhlcndpc2UgZmFsc2UuXG4gICAgICogU2VlICcuYW55KHByZWRpY2F0ZSknLiAgQXMgdGhpcyBtZXRob2QgaXMganVzdCBqdXN0IGluY2x1ZGVkIHRvIGhhdmUgc2ltaWxhcml0eSB3aXRoIGEgSlMgQXJyYXkuXG4gICAgICogQHBhcmFtIHByZWRpY2F0ZVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgc29tZShwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW55KHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZXF1YWxpdHkgY29tcGFyZXIgcmVzb2x2ZXMgdHJ1ZSBvbiBhbnkgZWxlbWVudCBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZW50cnlcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjb250YWlucyhlbnRyeSkge1xuICAgICAgICBjb25zdCBlcXVhbHMgPSB0aGlzLl9lcXVhbGl0eUNvbXBhcmVyO1xuICAgICAgICByZXR1cm4gdGhpcy5hbnkoZSA9PiBlcXVhbHMoZW50cnksIGUpKTtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24sIHVzZUNvcHkpIHtcbiAgICAgICAgaWYgKHRoaXMud2FzRGlzcG9zZWQpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgaWYgKHVzZUNvcHkpIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSB0aGlzLnRvQXJyYXkoKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvckVhY2goYSwgYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGEubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JFYWNoKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBhY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvcGllcyBhbGwgdmFsdWVzIHRvIG51bWVyaWNhbGx5IGluZGV4YWJsZSBvYmplY3QuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtUVGFyZ2V0fVxuICAgICAqL1xuICAgIGNvcHlUbyh0YXJnZXQsIGluZGV4ID0gMCkge1xuICAgICAgICBpZiAoIXRhcmdldClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3RhcmdldCcpO1xuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBuZXdMZW5ndGggPSBjb3VudCArIGluZGV4O1xuICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGggPCBuZXdMZW5ndGgpXG4gICAgICAgICAgICAgICAgdGFyZ2V0Lmxlbmd0aCA9IG5ld0xlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGUgPSB0aGlzLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIHdoaWxlIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaW5kZXgrK10gPSBlLmN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgY29sbGVjdGlvbiBjb250ZW50cy5cbiAgICAgKiBAcmV0dXJucyB7YW55W118QXJyYXl9XG4gICAgICovXG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgY29uc3QgY291bnQgPSB0aGlzLmdldENvdW50KCk7XG4gICAgICAgIHJldHVybiBjb3VudFxuICAgICAgICAgICAgPyB0aGlzLmNvcHlUbyhjb3VudCA+IDY1NTM2ID8gbmV3IEFycmF5KGNvdW50KSA6IFtdKVxuICAgICAgICAgICAgOiBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogLmxpbnEgd2lsbCByZXR1cm4gYW4gSUxpbnFFbnVtZXJhYmxlIGlmIC5saW5xQXN5bmMoKSBoYXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseSBvciB0aGUgZGVmYXVsdCBtb2R1bGUgbG9hZGVyIGlzIE5vZGVKUytDb21tb25KUy5cbiAgICAgKiBAcmV0dXJucyB7SUxpbnFFbnVtZXJhYmxlfVxuICAgICAqL1xuICAgIGdldCBsaW5xKCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgZSA9IHRoaXMuX2xpbnE7XG4gICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgbGV0IHI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHIgPSBldmFsKCdyZXF1aXJlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHsgfVxuICAgICAgICAgICAgdGhpcy5fbGlucSA9IGUgPSByICYmIHIoTElOUV9QQVRIKS5kZWZhdWx0LmZyb20odGhpcyk7XG4gICAgICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBpc1JlcXVpcmVKU1xuICAgICAgICAgICAgICAgICAgICA/IGB1c2luZyAubGlucSB0byBsb2FkIGFuZCBpbml0aWFsaXplIGEgSUxpbnFFbnVtZXJhYmxlIGlzIGN1cnJlbnRseSBvbmx5IHN1cHBvcnRlZCB3aXRoaW4gYSBOb2RlSlMgZW52aXJvbm1lbnQuXHJcbkltcG9ydCBTeXN0ZW0uTGlucS9MaW5xIGFuZCB1c2UgRW51bWVyYWJsZS5mcm9tKGUpIGluc3RlYWQuXHJcbllvdSBjYW4gYWxzbyBwcmVsb2FkIHRoZSBMaW5xIG1vZHVsZSBhcyBhIGRlcGVuZGVuY3kgb3IgdXNlIC5saW5xQXN5bmMoY2FsbGJhY2spIGZvciBBTUQvUmVxdWlyZUpTLmBcbiAgICAgICAgICAgICAgICAgICAgOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gaW1wb3J0aW5nIFN5c3RlbS5MaW5xL0xpbnFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogLmxpbnFBc3luYygpIGlzIGZvciB1c2Ugd2l0aCBkZWZlcnJlZCBsb2FkaW5nLlxuICAgICAqIEVuc3VyZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIExpbnEgZXh0ZW5zaW9ucyBpcyBhdmFpbGFibGUgYW5kIHRoZW4gcGFzc2VzIGl0IHRvIHRoZSBjYWxsYmFjay5cbiAgICAgKiBSZXR1cm5zIGFuIElMaW5xRW51bWVyYWJsZSBpZiBvbmUgaXMgYWxyZWFkeSBhdmFpbGFibGUsIG90aGVyd2lzZSB1bmRlZmluZWQuXG4gICAgICogUGFzc2luZyBubyBwYXJhbWV0ZXJzIHdpbGwgc3RpbGwgaW5pdGlhdGUgbG9hZGluZyBhbmQgaW5pdGlhbGl6aW5nIHRoZSBJTGlucUVudW1lcmFibGUgd2hpY2ggY2FuIGJlIHVzZWZ1bCBmb3IgcHJlLWxvYWRpbmcuXG4gICAgICogQW55IGNhbGwgdG8gLmxpbnFBc3luYygpIHdoZXJlIGFuIElMaW5xRW51bWVyYWJsZSBpcyByZXR1cm5lZCBjYW4gYmUgYXNzdXJlZCB0aGF0IGFueSBzdWJzZXF1ZW50IGNhbGxzIHRvIC5saW5xIHdpbGwgcmV0dXJuIHRoZSBzYW1lIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHtJTGlucUVudW1lcmFibGV9XG4gICAgICovXG4gICAgbGlucUFzeW5jKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBlID0gdGhpcy5fbGlucTtcbiAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICBpZiAoaXNSZXF1aXJlSlMpIHtcbiAgICAgICAgICAgICAgICBldmFsKFwicmVxdWlyZVwiKShbTElOUV9QQVRIXSwgKGxpbnEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ291bGQgZW5kIHVwIGJlaW5nIGNhbGxlZCBtb3JlIHRoYW4gb25jZSwgYmUgc3VyZSB0byBjaGVjayBmb3IgLl9saW5xIGJlZm9yZSBzZXR0aW5nLi4uXG4gICAgICAgICAgICAgICAgICAgIGUgPSB0aGlzLl9saW5xO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWUpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9saW5xID0gZSA9IGxpbnEuZGVmYXVsdC5mcm9tKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWUpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIlRoZXJlIHdhcyBhIHByb2JsZW0gaW1wb3J0aW5nIFN5c3RlbS5MaW5xL0xpbnFcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gdm9pZCAwOyAvLyBJbiBjYXNlIHRoaXMgaXMgcmV0dXJuIHN5bmNocm9ub3VzbHkuLlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNOb2RlSlMgJiYgaXNDb21tb25KUykge1xuICAgICAgICAgICAgICAgIGUgPSB0aGlzLmxpbnE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbm5vdCBmaW5kIGEgY29tcGF0aWJsZSBsb2FkZXIgZm9yIGltcG9ydGluZyBTeXN0ZW0uTGlucS9MaW5xXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUgJiYgY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29sbGVjdGlvbkJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9Db2xsZWN0aW9uQmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4vaW5pdGlhbGl6ZVwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbi8qKlxuICpcbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBzb3VyY2VJbmRleFxuICogQHBhcmFtIGxlbmd0aFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHkoc291cmNlLCBzb3VyY2VJbmRleCA9IDAsIGxlbmd0aCA9IEluZmluaXR5KSB7XG4gICAgaWYgKCFzb3VyY2UpXG4gICAgICAgIHJldHVybiBzb3VyY2U7IC8vIG1heSBoYXZlIHBhc3NlZCB6ZXJvPyB1bmRlZmluZWQ/IG9yIG51bGw/XG4gICAgcmV0dXJuIGNvcHlUbyhzb3VyY2UsIGluaXRpYWxpemUoTWF0aC5taW4obGVuZ3RoLCBNYXRoLm1heChzb3VyY2UubGVuZ3RoIC0gc291cmNlSW5kZXgsIDApKSksIHNvdXJjZUluZGV4LCAwLCBsZW5ndGgpO1xufVxuY29uc3QgQ0JOID0gJ0Nhbm5vdCBiZSBudWxsLicsIENCTDAgPSAnQ2Fubm90IGJlIGxlc3MgdGhhbiB6ZXJvLic7XG4vKipcbiAqIENvcGllcyBvbmUgYXJyYXkgdG8gYW5vdGhlci5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBkZXN0aW5hdGlvblxuICogQHBhcmFtIHNvdXJjZUluZGV4XG4gKiBAcGFyYW0gZGVzdGluYXRpb25JbmRleFxuICogQHBhcmFtIGxlbmd0aCBBbiBvcHRpb25hbCBsaW1pdCB0byBzdG9wIGNvcHlpbmcuXG4gKiBAcmV0dXJucyBUaGUgZGVzdGluYXRpb24gYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5VG8oc291cmNlLCBkZXN0aW5hdGlvbiwgc291cmNlSW5kZXggPSAwLCBkZXN0aW5hdGlvbkluZGV4ID0gMCwgbGVuZ3RoID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignc291cmNlJywgQ0JOKTtcbiAgICBpZiAoIWRlc3RpbmF0aW9uKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdkZXN0aW5hdGlvbicsIENCTik7XG4gICAgaWYgKHNvdXJjZUluZGV4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignc291cmNlSW5kZXgnLCBzb3VyY2VJbmRleCwgQ0JMMCk7XG4gICAgbGV0IHNvdXJjZUxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgaWYgKCFzb3VyY2VMZW5ndGgpXG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICBpZiAoc291cmNlSW5kZXggPj0gc291cmNlTGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCAnTXVzdCBiZSBsZXNzIHRoYW4gdGhlIGxlbmd0aCBvZiB0aGUgc291cmNlIGFycmF5LicpO1xuICAgIGlmIChkZXN0aW5hdGlvbi5sZW5ndGggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdkZXN0aW5hdGlvbkluZGV4JywgZGVzdGluYXRpb25JbmRleCwgQ0JMMCk7XG4gICAgY29uc3QgbWF4TGVuZ3RoID0gc291cmNlLmxlbmd0aCAtIHNvdXJjZUluZGV4O1xuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpICYmIGxlbmd0aCA+IG1heExlbmd0aClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignc291cmNlSW5kZXgnLCBzb3VyY2VJbmRleCwgJ1NvdXJjZSBpbmRleCArIGxlbmd0aCBjYW5ub3QgZXhjZWVkIHRoZSBsZW5ndGggb2YgdGhlIHNvdXJjZSBhcnJheS4nKTtcbiAgICBsZW5ndGggPSBNYXRoLm1pbihsZW5ndGgsIG1heExlbmd0aCk7XG4gICAgY29uc3QgbmV3TGVuZ3RoID0gZGVzdGluYXRpb25JbmRleCArIGxlbmd0aDtcbiAgICBpZiAobmV3TGVuZ3RoID4gZGVzdGluYXRpb24ubGVuZ3RoKVxuICAgICAgICBkZXN0aW5hdGlvbi5sZW5ndGggPSBuZXdMZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBkZXN0aW5hdGlvbltkZXN0aW5hdGlvbkluZGV4ICsgaV0gPSBzb3VyY2Vbc291cmNlSW5kZXggKyBpXTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29weS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L2NvcHkuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuZXhwb3J0IGNvbnN0IEVNUFRZID0gJyc7XG4vKipcbiAqIFJldHVybnMgYSBudW1lcmljYWwgKGludGVnZXIpIGhhc2ggY29kZSBvZiB0aGUgc3RyaW5nLiAgQ2FuIGJlIHVzZWQgZm9yIGlkZW50aWZ5aW5nIGluZXF1YWxpdHkgb2YgY29udGVudHMsIGJ1dCB0d28gZGlmZmVyZW50IHN0cmluZ3MgaW4gcmFyZSBjYXNlcyB3aWxsIGhhdmUgdGhlIHNhbWUgaGFzaCBjb2RlLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhhc2hDb2RlKHNvdXJjZSkge1xuICAgIGxldCBoYXNoID0gMCB8IDA7XG4gICAgaWYgKHNvdXJjZS5sZW5ndGggPT0gMClcbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzb3VyY2UubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGxldCBjaCA9IHNvdXJjZS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaDtcbiAgICAgICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0KHNvdXJjZSwgY291bnQpIHtcbiAgICBsZXQgcmVzdWx0ID0gRU1QVFk7XG4gICAgaWYgKCFpc05hTihjb3VudCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUNoYXJzKGNoT3JDaGFycywgY291bnQgPSAxKSB7XG4gICAgaWYgKChjaE9yQ2hhcnMpIGluc3RhbmNlb2YgKEFycmF5KSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gRU1QVFk7XG4gICAgICAgIGZvciAobGV0IGNoYXIgb2YgY2hPckNoYXJzKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcGVhdChTdHJpbmcuZnJvbUNoYXJDb2RlKGNoT3JDaGFycyksIGNvdW50KTtcbiAgICB9XG59XG4vKipcbiAqIEVzY2FwZXMgYSBSZWdFeHAgc2VxdWVuY2UuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHNvdXJjZSkge1xuICAgIHJldHVybiBzb3VyY2UucmVwbGFjZSgvWy1bXFxdXFwve30oKSorPy5cXFxcXiR8XS9nLCBcIlxcXFwkJlwiKTtcbn1cbi8qKlxuICogQ2FuIHRyaW0gYW55IGNoYXJhY3RlciBvciBzZXQgb2YgY2hhcmFjdGVycyBmcm9tIHRoZSBlbmRzIG9mIGEgc3RyaW5nLlxuICogVXNlcyBhIFJlZ2V4IGVzY2FwZW1lbnQgdG8gcmVwbGFjZSB0aGVtIHdpdGggZW1wdHkuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gY2hhcnMgQSBzdHJpbmcgb3IgYXJyYXkgb2YgY2hhcmFjdGVycyBkZXNpcmVkIHRvIGJlIHRyaW1tZWQuXG4gKiBAcGFyYW0gaWdub3JlQ2FzZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc291cmNlLCBjaGFycywgaWdub3JlQ2FzZSkge1xuICAgIGlmIChjaGFycyA9PT0gRU1QVFkpXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgaWYgKGNoYXJzKSB7XG4gICAgICAgIGNvbnN0IGVzY2FwZWQgPSBlc2NhcGVSZWdFeHAoKGNoYXJzKSBpbnN0YW5jZW9mIChBcnJheSkgPyBjaGFycy5qb2luKCkgOiBjaGFycyk7XG4gICAgICAgIHJldHVybiBzb3VyY2UucmVwbGFjZShuZXcgUmVnRXhwKCdeWycgKyBlc2NhcGVkICsgJ10rfFsnICsgZXNjYXBlZCArICddKyQnLCAnZycgKyAoaWdub3JlQ2FzZVxuICAgICAgICAgICAgPyAnaSdcbiAgICAgICAgICAgIDogJycpKSwgRU1QVFkpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlLnJlcGxhY2UoL15cXHMrfFxccyskL2csIEVNUFRZKTtcbn1cbi8qKlxuICogVGFrZXMgYW55IGFyZ1xuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIGFyZ3NcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoc291cmNlLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHN1cHBsYW50KHNvdXJjZSwgYXJncyk7XG59XG4vL1xuLyoqXG4gKiBUaGlzIHRha2VzIGEgc3RyaW5nIGFuZCByZXBsYWNlcyAne3N0cmluZ30nIHdpdGggdGhlIHJlc3BlY3RlZCBwYXJhbWV0ZXIuXG4gKiBBbHNvIGFsbG93cyBmb3IgcGFzc2luZyBhbiBhcnJheSBpbiBvcmRlciB0byB1c2UgJ3tufScgbm90YXRpb24uXG4gKiBOb3QgbGltaXRlZCB0byBhbiBhcnJheSdzIGluZGV4ZXMuICBGb3IgZXhhbXBsZSwge2xlbmd0aH0gaXMgYWxsb3dlZC5cbiAqIEJhc2VkIHVwb24gQ3JvY2tmb3JkJ3Mgc3VwcGxhbnQgZnVuY3Rpb24uXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gcGFyYW1zXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VwcGxhbnQoc291cmNlLCBwYXJhbXMpIHtcbiAgICBjb25zdCBvSXNBcnJheSA9IChwYXJhbXMpIGluc3RhbmNlb2YgKEFycmF5KTtcbiAgICByZXR1cm4gc291cmNlLnJlcGxhY2UoL3soW157fV0qKX0vZywgKGEsIGIpID0+IHtcbiAgICAgICAgbGV0IG4gPSBiO1xuICAgICAgICBpZiAob0lzQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBpID0gcGFyc2VJbnQoYik7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKGkpKVxuICAgICAgICAgICAgICAgIG4gPSBpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByID0gcGFyYW1zW25dO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiByKSB7XG4gICAgICAgICAgICBjYXNlIFR5cGUuU1RSSU5HOlxuICAgICAgICAgICAgY2FzZSBUeXBlLk5VTUJFUjpcbiAgICAgICAgICAgIGNhc2UgVHlwZS5CT09MRUFOOlxuICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKHIgJiYgVHlwZS5oYXNNZW1iZXJPZlR5cGUociwgXCJ0b1N0cmluZ1wiLCBUeXBlLkZVTkNUSU9OKSlcbiAgICAgICAgICAgICAgICAgICAgPyByLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgOiBhO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjYW5NYXRjaChzb3VyY2UsIG1hdGNoKSB7XG4gICAgaWYgKCFUeXBlLmlzU3RyaW5nKHNvdXJjZSkgfHwgIW1hdGNoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHNvdXJjZSA9PT0gbWF0Y2gpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmIChtYXRjaC5sZW5ndGggPCBzb3VyY2UubGVuZ3RoKVxuICAgICAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXR0ZXJuIG1hdGNoZXMgdGhlIGJlZ2lubmluZyBvZiB0aGUgc291cmNlLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHBhdHRlcm5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRzV2l0aChzb3VyY2UsIHBhdHRlcm4pIHtcbiAgICBjb25zdCBtID0gY2FuTWF0Y2goc291cmNlLCBwYXR0ZXJuKTtcbiAgICByZXR1cm4gVHlwZS5pc0Jvb2xlYW4obSkgPyBtIDogc291cmNlLmluZGV4T2YocGF0dGVybikgPT0gMDtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXR0ZXJuIG1hdGNoZXMgdGhlIGVuZCBvZiB0aGUgc291cmNlLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHBhdHRlcm5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5kc1dpdGgoc291cmNlLCBwYXR0ZXJuKSB7XG4gICAgY29uc3QgbSA9IGNhbk1hdGNoKHNvdXJjZSwgcGF0dGVybik7XG4gICAgcmV0dXJuIFR5cGUuaXNCb29sZWFuKG0pID8gbSA6IHNvdXJjZS5sYXN0SW5kZXhPZihwYXR0ZXJuKSA9PSAoc291cmNlLmxlbmd0aCAtIHBhdHRlcm4ubGVuZ3RoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVV0aWxpdHkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UZXh0L1V0aWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgSW5kZXhFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSW5kZXhFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjbGFzcyBBcnJheUVudW1lcmF0b3IgZXh0ZW5kcyBJbmRleEVudW1lcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGFycmF5T3JGYWN0b3J5LCBzdGFydCA9IDAsIHN0ZXAgPSAxKSB7XG4gICAgICAgIHN1cGVyKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5ID0gVHlwZS5pc0Z1bmN0aW9uKGFycmF5T3JGYWN0b3J5KSA/IGFycmF5T3JGYWN0b3J5KCkgOiBhcnJheU9yRmFjdG9yeTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc291cmNlOiBhcnJheSxcbiAgICAgICAgICAgICAgICBwb2ludGVyOiBzdGFydCxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgICAgICAgICAgICBzdGVwOiBzdGVwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBBcnJheUVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BcnJheUVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9BcnJheUVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdPYmplY3REaXNwb3NlZEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gZXh0ZW5kcyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIHtcbiAgICAvLyBGb3Igc2ltcGxpY2l0eSBhbmQgY29uc2lzdGVuY3ksIGxldHMgc3RpY2sgd2l0aCAxIHNpZ25hdHVyZS5cbiAgICBjb25zdHJ1Y3RvcihvYmplY3ROYW1lLCBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbikge1xuICAgICAgICBzdXBlcihtZXNzYWdlIHx8ICcnLCBpbm5lckV4Y2VwdGlvbiwgKF8pID0+IHtcbiAgICAgICAgICAgIF8ub2JqZWN0TmFtZSA9IG9iamVjdE5hbWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgb05hbWUgPSBfLm9iamVjdE5hbWU7XG4gICAgICAgIG9OYW1lID0gb05hbWUgPyAoJ3snICsgb05hbWUgKyAnfSAnKSA6ICcnO1xuICAgICAgICByZXR1cm4gJ1snICsgXy5uYW1lICsgJzogJyArIG9OYW1lICsgXy5tZXNzYWdlICsgJ10nO1xuICAgIH1cbiAgICBzdGF0aWMgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2FibGUsIG9iamVjdE5hbWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGRpc3Bvc2FibGUud2FzRGlzcG9zZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24ob2JqZWN0TmFtZSwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0RGlzcG9zZWRFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL09iamVjdERpc3Bvc2VkRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uIE9iamVjdFBvb2wgZnJvbSBQYXJhbGxlbCBFeHRlbnNpb24gRXh0cmFzIGFuZCBvdGhlciBPYmplY3RQb29sIGltcGxlbWVudGF0aW9ucy5cbiAqIFVzZXMgLmFkZChUKSBhbmQgLnRha2UoKTpUXG4gKi9cbmltcG9ydCB7IGRpc3Bvc2UgfSBmcm9tIFwiLi9kaXNwb3NlXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBUYXNrSGFuZGxlciB9IGZyb20gXCIuLi9UaHJlYWRpbmcvVGFza3MvVGFza0hhbmRsZXJcIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBPQkpFQ1RfUE9PTCA9IFwiT2JqZWN0UG9vbFwiLCBfTUFYX1NJWkUgPSBcIl9tYXhTaXplXCIsIEFCU09MVVRFX01BWF9TSVpFID0gNjU1MzYsIE1VU1RfQkVfR1QxID0gXCJNdXN0IGJlIGF0IHZhbGlkIG51bWJlciBsZWFzdCAxLlwiLCBNVVNUX0JFX0xUTSA9IGBNdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAke0FCU09MVVRFX01BWF9TSVpFfS5gO1xuZXhwb3J0IGNsYXNzIE9iamVjdFBvb2wgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX21heFNpemUsIF9nZW5lcmF0b3IsIF9yZWN5Y2xlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9tYXhTaXplID0gX21heFNpemU7XG4gICAgICAgIHRoaXMuX2dlbmVyYXRvciA9IF9nZW5lcmF0b3I7XG4gICAgICAgIHRoaXMuX3JlY3ljbGVyID0gX3JlY3ljbGVyO1xuICAgICAgICAvKipcbiAgICAgICAgICogQnkgZGVmYXVsdCB3aWxsIGNsZWFyIGFmdGVyIDUgc2Vjb25kcyBvZiBub24tdXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hdXRvQ2xlYXJUaW1lb3V0ID0gNTAwMDtcbiAgICAgICAgaWYgKGlzTmFOKF9tYXhTaXplKSB8fCBfbWF4U2l6ZSA8IDEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKF9NQVhfU0laRSwgX21heFNpemUsIE1VU1RfQkVfR1QxKTtcbiAgICAgICAgaWYgKF9tYXhTaXplID4gQUJTT0xVVEVfTUFYX1NJWkUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKF9NQVhfU0laRSwgX21heFNpemUsIE1VU1RfQkVfTFRNKTtcbiAgICAgICAgdGhpcy5fbG9jYWxBYnNNYXhTaXplID0gTWF0aC5taW4oX21heFNpemUgKiAyLCBBQlNPTFVURV9NQVhfU0laRSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE9CSkVDVF9QT09MO1xuICAgICAgICBfLl9wb29sID0gW107XG4gICAgICAgIF8uX3RyaW1tZXIgPSBuZXcgVGFza0hhbmRsZXIoKCkgPT4gXy5fdHJpbSgpKTtcbiAgICAgICAgY29uc3QgY2xlYXIgPSAoKSA9PiBfLl9jbGVhcigpO1xuICAgICAgICBfLl9mbHVzaGVyID0gbmV3IFRhc2tIYW5kbGVyKGNsZWFyKTtcbiAgICAgICAgXy5fYXV0b0ZsdXNoZXIgPSBuZXcgVGFza0hhbmRsZXIoY2xlYXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBtYXhpbXVtIGF0IHdoaWNoIHRyaW1taW5nIHNob3VsZCBhbGxvdy5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBtYXhTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4U2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBudW1iZXIgb2Ygb2JqZWN0cyBpbiBwb29sLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICBjb25zdCBwID0gdGhpcy5fcG9vbDtcbiAgICAgICAgcmV0dXJuIHAgPyBwLmxlbmd0aCA6IDA7XG4gICAgfVxuICAgIF90cmltKCkge1xuICAgICAgICBjb25zdCBwb29sID0gdGhpcy5fcG9vbDtcbiAgICAgICAgd2hpbGUgKHBvb2wubGVuZ3RoID4gdGhpcy5fbWF4U2l6ZSkge1xuICAgICAgICAgICAgZGlzcG9zZS5zaW5nbGUocG9vbC5wb3AoKSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV2lsbCB0cmltIGVuc3VyZSB0aGUgcG9vbCBpcyBsZXNzIHRoYW4gdGhlIG1heFNpemUuXG4gICAgICogQHBhcmFtIGRlZmVyIEEgZGVsYXkgYmVmb3JlIHRyaW1taW5nLiAgV2lsbCBiZSBvdmVycmlkZGVuIGJ5IGxhdGVyIGNhbGxzLlxuICAgICAqL1xuICAgIHRyaW0oZGVmZXIpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5fdHJpbW1lci5zdGFydChkZWZlcik7XG4gICAgfVxuICAgIF9jbGVhcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHAgPSBfLl9wb29sO1xuICAgICAgICBfLl90cmltbWVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9mbHVzaGVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9hdXRvRmx1c2hlci5jYW5jZWwoKTtcbiAgICAgICAgZGlzcG9zZS50aGVzZS5ub0NvcHkocCwgdHJ1ZSk7XG4gICAgICAgIHAubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2lsbCBjbGVhciBvdXQgdGhlIHBvb2wuXG4gICAgICogQ2FuY2VscyBhbnkgc2NoZWR1bGVkIHRyaW1zIHdoZW4gZXhlY3V0ZWQuXG4gICAgICogQHBhcmFtIGRlZmVyIEEgZGVsYXkgYmVmb3JlIGNsZWFyaW5nLiAgV2lsbCBiZSBvdmVycmlkZGVuIGJ5IGxhdGVyIGNhbGxzLlxuICAgICAqL1xuICAgIGNsZWFyKGRlZmVyKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRoaXMuX2ZsdXNoZXIuc3RhcnQoZGVmZXIpO1xuICAgIH1cbiAgICB0b0FycmF5QW5kQ2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBfLl90cmltbWVyLmNhbmNlbCgpO1xuICAgICAgICBfLl9mbHVzaGVyLmNhbmNlbCgpO1xuICAgICAgICBjb25zdCBwID0gXy5fcG9vbDtcbiAgICAgICAgXy5fcG9vbCA9IFtdO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgZm9yIHRvQXJyYXlBbmRDbGVhcigpO1xuICAgICAqL1xuICAgIGR1bXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvQXJyYXlBbmRDbGVhcigpO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9nZW5lcmF0b3IgPSBudWxsO1xuICAgICAgICBfLl9yZWN5Y2xlciA9IG51bGw7XG4gICAgICAgIGRpc3Bvc2UoXy5fdHJpbW1lciwgXy5fZmx1c2hlciwgXy5fYXV0b0ZsdXNoZXIpO1xuICAgICAgICBfLl90cmltbWVyID0gbnVsbDtcbiAgICAgICAgXy5fZmx1c2hlciA9IG51bGw7XG4gICAgICAgIF8uX2F1dG9GbHVzaGVyID0gbnVsbDtcbiAgICAgICAgXy5fcG9vbC5sZW5ndGggPSAwO1xuICAgICAgICBfLl9wb29sID0gbnVsbDtcbiAgICB9XG4gICAgZXh0ZW5kQXV0b0NsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgdCA9IF8uYXV0b0NsZWFyVGltZW91dDtcbiAgICAgICAgaWYgKGlzRmluaXRlKHQpICYmICFfLl9hdXRvRmx1c2hlci5pc1NjaGVkdWxlZClcbiAgICAgICAgICAgIF8uX2F1dG9GbHVzaGVyLnN0YXJ0KHQpO1xuICAgIH1cbiAgICBhZGQobykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKF8uX3Bvb2wubGVuZ3RoID49IF8uX2xvY2FsQWJzTWF4U2l6ZSkge1xuICAgICAgICAgICAgLy8gR2V0dGluZyB0b28gYmlnLCBkaXNwb3NlIGltbWVkaWF0ZWx5Li4uXG4gICAgICAgICAgICBkaXNwb3NlKG8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKF8uX3JlY3ljbGVyKVxuICAgICAgICAgICAgICAgIF8uX3JlY3ljbGVyKG8pO1xuICAgICAgICAgICAgXy5fcG9vbC5wdXNoKG8pO1xuICAgICAgICAgICAgY29uc3QgbSA9IF8uX21heFNpemU7XG4gICAgICAgICAgICBpZiAobSA8IEFCU09MVVRFX01BWF9TSVpFICYmIF8uX3Bvb2wubGVuZ3RoID4gbSlcbiAgICAgICAgICAgICAgICBfLl90cmltbWVyLnN0YXJ0KDUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5leHRlbmRBdXRvQ2xlYXIoKTtcbiAgICB9XG4gICAgX29uVGFrZW4oKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzLCBsZW4gPSBfLl9wb29sLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA8PSBfLl9tYXhTaXplKVxuICAgICAgICAgICAgXy5fdHJpbW1lci5jYW5jZWwoKTtcbiAgICAgICAgaWYgKGxlbilcbiAgICAgICAgICAgIF8uZXh0ZW5kQXV0b0NsZWFyKCk7XG4gICAgfVxuICAgIHRyeVRha2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIF8uX3Bvb2wucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl9vblRha2VuKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGFrZShmYWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIV8uX2dlbmVyYXRvciAmJiAhZmFjdG9yeSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbignZmFjdG9yeScsIFwiTXVzdCBwcm92aWRlIGEgZmFjdG9yeSBpZiBvbiB3YXMgbm90IHByb3ZpZGVkIGF0IGNvbnN0cnVjdGlvbiB0aW1lLlwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBfLl9wb29sLnBvcCgpIHx8IGZhY3RvcnkgJiYgZmFjdG9yeSgpIHx8IF8uX2dlbmVyYXRvcigpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fb25UYWtlbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0UG9vbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9iamVjdFBvb2wuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9EaXNwb3NhYmxlL09iamVjdFBvb2wuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvU3lzdGVtRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCBcIlVuc3VwcG9ydGVkIGVudW1lcmFibGUuXCIpO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgU2ltcGxlRW51bWVyYWJsZUJhc2UgfSBmcm9tIFwiLi9TaW1wbGVFbnVtZXJhYmxlQmFzZVwiO1xuLyoqXG4gKiBBIHNpbXBsaWZpZWQgc3RyaXBwZWQgZG93biBlbnVtZXJhdG9yIHRoYXQgdW50aWwgZGlzcG9zZWQgd2lsbCBpbmZpbml0ZWx5IHJldHVybiB0aGUgcHJvdmlkZWQgZmFjdG9yeS5cbiAqIFRoaXMgaXMgYW5hbG9nb3VzIHRvIGEgJ2dlbmVyYXRvcicgYW5kIGhhcyBhIGNvbXBhdGlibGUgaW50ZXJmYWNlLlxuICovXG5leHBvcnQgY2xhc3MgSW5maW5pdGVFbnVtZXJhdG9yIGV4dGVuZHMgU2ltcGxlRW51bWVyYWJsZUJhc2Uge1xuICAgIC8qKlxuICAgICAqIFNlZSBJbmZpbml0ZVZhbHVlRmFjdG9yeVxuICAgICAqIEBwYXJhbSBfZmFjdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKF9mYWN0b3J5KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkgPSBfZmFjdG9yeTtcbiAgICB9XG4gICAgX2Nhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmFjdG9yeSAhPSBudWxsO1xuICAgIH1cbiAgICBtb3ZlTmV4dCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGYgPSBfLl9mYWN0b3J5O1xuICAgICAgICBpZiAoZikge1xuICAgICAgICAgICAgXy5fY3VycmVudCA9IGYoXy5fY3VycmVudCwgXy5pbmNyZW1lbnRJbmRleCgpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9mYWN0b3J5ID0gbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJbmZpbml0ZUVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbmZpbml0ZUVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmZpbml0ZUVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgSXRlcmF0b3JSZXN1bHQgfSBmcm9tIFwiLi9JdGVyYXRvclJlc3VsdFwiO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5leHBvcnQgY2xhc3MgU2ltcGxlRW51bWVyYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG4gICAgZ2V0IGNhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FuTW92ZU5leHQoKTtcbiAgICB9XG4gICAgdHJ5TW92ZU5leHQob3V0KSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIG91dCh0aGlzLl9jdXJyZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaW5jcmVtZW50SW5kZXgoKSB7XG4gICAgICAgIGxldCBpID0gdGhpcy5faW5kZXg7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gaSA9IGlzTmFOKGkpID8gMCA6IChpICsgMSk7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICBuZXh0VmFsdWUoKSB7XG4gICAgICAgIHRoaXMubW92ZU5leHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gICAgfVxuICAgIG5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVOZXh0KClcbiAgICAgICAgICAgID8gbmV3IEl0ZXJhdG9yUmVzdWx0KHRoaXMuX2N1cnJlbnQsIHRoaXMuX2luZGV4KVxuICAgICAgICAgICAgOiBJdGVyYXRvclJlc3VsdC5Eb25lO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAncmV0dXJuJyh2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBWT0lEMCAmJiB0aGlzLl9jYW5Nb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgPyBuZXcgSXRlcmF0b3JSZXN1bHQodmFsdWUsIFZPSUQwLCB0cnVlKVxuICAgICAgICAgICAgICAgIDogSXRlcmF0b3JSZXN1bHQuRG9uZTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gVk9JRDA7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gTmFOO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGdldElzRW5kbGVzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nhbk1vdmVOZXh0KCk7XG4gICAgfVxuICAgIGdldCBpc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldElzRW5kbGVzcygpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNpbXBsZUVudW1lcmFibGVCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2ltcGxlRW51bWVyYWJsZUJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9TaW1wbGVFbnVtZXJhYmxlQmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJdGVyYXRvclJlc3VsdCB9IGZyb20gXCIuL0l0ZXJhdG9yUmVzdWx0XCI7XG5pbXBvcnQgeyBGdW5jdGlvbnMgfSBmcm9tIFwiLi4vLi4vRnVuY3Rpb25zXCI7XG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8qKlxuICogQSBzaW1wbGlmaWVkIHN0cmlwcGVkIGRvd24gZW51bWVyYWJsZSB0aGF0IGlzIGFsd2F5cyBjb21wbGV0ZSBhbmQgaGFzIG5vIHJlc3VsdHMuXG4gKiBGcm96ZW4gYW5kIGV4cG9ydGVkIGFzICdlbXB0eScgdG8gYWxsb3cgZm9yIHJldXNlLlxuICovXG5leHBvcnQgY29uc3QgRW1wdHlFbnVtZXJhdG9yID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY3VycmVudDogVk9JRDAsXG4gICAgbW92ZU5leHQ6IEZ1bmN0aW9ucy5GYWxzZSxcbiAgICB0cnlNb3ZlTmV4dDogRnVuY3Rpb25zLkZhbHNlLFxuICAgIG5leHRWYWx1ZTogRnVuY3Rpb25zLkJsYW5rLFxuICAgIG5leHQ6IEl0ZXJhdG9yUmVzdWx0LkdldERvbmUsXG4gICAgXCJyZXR1cm5cIjogSXRlcmF0b3JSZXN1bHQuR2V0RG9uZSxcbiAgICBlbmQ6IEZ1bmN0aW9ucy5CbGFuayxcbiAgICByZXNldDogRnVuY3Rpb25zLkJsYW5rLFxuICAgIGRpc3Bvc2U6IEZ1bmN0aW9ucy5CbGFuayxcbiAgICBpc0VuZGxlc3M6IGZhbHNlXG59KTtcbmV4cG9ydCBkZWZhdWx0IEVtcHR5RW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVtcHR5RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VtcHR5RW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB9IGZyb20gXCIuL1NpbXBsZUVudW1lcmFibGVCYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8qKlxuICogQSBzaW1wbGlmaWVkIHN0cmlwcGVkIGRvd24gZW51bWVyYXRvciB0aGF0IHVudGlsIGRpc3Bvc2VkIHdpbGwgaW5maW5pdGVseSByZXR1cm4gdGhlIHByb3ZpZGVkIGZhY3RvcnkuXG4gKiBUaGlzIGlzIGFuYWxvZ291cyB0byBhICdnZW5lcmF0b3InIGFuZCBoYXMgYSBjb21wYXRpYmxlIGludGVyZmFjZS5cbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgSXRlcmF0b3JFbnVtZXJhdG9yIGV4dGVuZHMgU2ltcGxlRW51bWVyYWJsZUJhc2Uge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBfaXRlcmF0b3JcbiAgICAgKiBAcGFyYW0gX2lzRW5kbGVzcyB0cnVlIGFuZCBmYWxzZSBhcmUgZXhwbGljaXQgd2hlcmUgYXMgdW5kZWZpbmVkIG1lYW5zICd1bmtub3duJy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihfaXRlcmF0b3IsIF9pc0VuZGxlc3MpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faXRlcmF0b3IgPSBfaXRlcmF0b3I7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IF9pc0VuZGxlc3M7XG4gICAgfVxuICAgIF9jYW5Nb3ZlTmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZXJhdG9yICE9IG51bGw7XG4gICAgfVxuICAgIG1vdmVOZXh0KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpID0gXy5faXRlcmF0b3I7XG4gICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICBjb25zdCByID0gYXJndW1lbnRzLmxlbmd0aCA/IGkubmV4dCh2YWx1ZSkgOiBpLm5leHQoKTtcbiAgICAgICAgICAgIF8uX2N1cnJlbnQgPSByLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHIuZG9uZSlcbiAgICAgICAgICAgICAgICBfLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5faXRlcmF0b3IgPSBudWxsO1xuICAgIH1cbiAgICBnZXRJc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuX2lzRW5kbGVzcykgJiYgc3VwZXIuZ2V0SXNFbmRsZXNzKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgSXRlcmF0b3JFbnVtZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SXRlcmF0b3JFbnVtZXJhdG9yLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSXRlcmF0b3JFbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIOOCpOODs+OCv+ODvOODleOCp+OCpOOCuee1seWQiOOBq+OCiOOCi+OCs+OCouOCr+ODqeOCueOBruaLoeW8tVxyXG5kZWNsYXJlIGludGVyZmFjZSBTdHJpbmcge1xyXG4gIG5vcm1hbGl6ZU5ld0xpbmUoKTogc3RyaW5nO1xyXG59XHJcblxyXG5TdHJpbmcucHJvdG90eXBlLm5vcm1hbGl6ZU5ld0xpbmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXFxyP1xcbi9nLCAnXFxyXFxuJyk7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TdHJpbmdFeHRlbnNpb24udHMiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIE9yaWdpbmFsOiBodHRwOi8vbGlucWpzLmNvZGVwbGV4LmNvbS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBhcmVFcXVhbCBhcyBhcmVFcXVhbFZhbHVlcywgY29tcGFyZSBhcyBjb21wYXJlVmFsdWVzIH0gZnJvbSBcIi4uL1N5c3RlbS9Db21wYXJlXCI7XG5pbXBvcnQgeyBjb3B5IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9jb3B5XCI7XG5pbXBvcnQgKiBhcyBBcnJheXMgZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9Db21wYXJlXCI7XG5pbXBvcnQgKiBhcyBlbnVtVXRpbCBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3JcIjtcbmltcG9ydCB7IGlzRW51bWVyYWJsZSwgaXNFbnVtZXJhdG9yLCBpc0l0ZXJhdG9yLCB0aHJvd0lmRW5kbGVzcyB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgRW1wdHlFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbXB0eUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vU3lzdGVtL1R5cGVzXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uL1N5c3RlbS9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBGdW5jdGlvbnMgYXMgQmFzZUZ1bmN0aW9ucyB9IGZyb20gXCIuLi9TeXN0ZW0vRnVuY3Rpb25zXCI7XG5pbXBvcnQgeyBBcnJheUVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0FycmF5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9EaWN0aW9uYXJpZXMvRGljdGlvbmFyeVwiO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL1F1ZXVlXCI7XG5pbXBvcnQgeyBkaXNwb3NlLCB1c2luZyB9IGZyb20gXCIuLi9TeXN0ZW0vRGlzcG9zYWJsZS9kaXNwb3NlXCI7XG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi9TeXN0ZW0vRGlzcG9zYWJsZS9EaXNwb3NhYmxlQmFzZVwiO1xuaW1wb3J0IHsgVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb25cIjtcbmltcG9ydCB7IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9EaXNwb3NhYmxlL09iamVjdERpc3Bvc2VkRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBLZXlTb3J0ZWRDb250ZXh0IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9Tb3J0aW5nL0tleVNvcnRlZENvbnRleHRcIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9TeXN0ZW0vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9TeXN0ZW0vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmltcG9ydCB7IEluZGV4RW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSW5kZXhFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBJdGVyYXRvckVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0l0ZXJhdG9yRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvaW5pdGlhbGl6ZVwiO1xuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIi4uL1N5c3RlbS9SYW5kb21cIjtcbmltcG9ydCB7IEluZmluaXRlRW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSW5maW5pdGVFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBMYXp5TGlzdCB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvTGF6eUxpc3RcIjtcbnZhciBkaXNwb3NlU2luZ2xlID0gZGlzcG9zZS5zaW5nbGU7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8vICNyZWdpb24gTG9jYWwgQ29uc3RhbnRzLlxuY29uc3QgSU5WQUxJRF9ERUZBVUxUID0ge307IC8vIGNyZWF0ZSBhIHByaXZhdGUgdW5pcXVlIGluc3RhbmNlIGZvciByZWZlcmVuY2luZy5cbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuY29uc3QgTlVMTCA9IG51bGw7XG5mdW5jdGlvbiBCUkVBSygpIHtcbiAgICByZXR1cm4gMCAvKiBCcmVhayAqLztcbn1cbmZ1bmN0aW9uIFJFVFVSTigpIHtcbiAgICByZXR1cm4gMSAvKiBSZXR1cm4gKi87XG59XG5mdW5jdGlvbiBpc05vdE51bGxPclVuZGVmaW5lZChlKSB7XG4gICAgcmV0dXJuIGUgIT0gbnVsbDtcbn1cbi8vIExlYXZlIGludGVybmFsIHRvIGF2b2lkIGFjY2lkZW50YWwgb3ZlcndyaXRpbmcuXG5jbGFzcyBMaW5xRnVuY3Rpb25zIGV4dGVuZHMgQmFzZUZ1bmN0aW9ucyB7XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICBHcmVhdGVyKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPiBiID8gYSA6IGI7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgTGVzc2VyKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPCBiID8gYSA6IGI7XG4gICAgfVxufVxuY29uc3QgRnVuY3Rpb25zID0gT2JqZWN0LmZyZWV6ZShuZXcgTGlucUZ1bmN0aW9ucygpKTtcbi8vIEZvciByZS11c2UgYXMgYSBmYWN0b3J5LlxuZnVuY3Rpb24gZ2V0RW1wdHlFbnVtZXJhdG9yKCkge1xuICAgIHJldHVybiBFbXB0eUVudW1lcmF0b3I7XG59XG4vLyAjZW5kcmVnaW9uXG4vKlxuICogTk9URTogQWJvdXQgSW5maW5pdGVFbnVtZXJhYmxlPFQ+IGFuZCBFbnVtZXJhYmxlPFQ+LlxuICogVGhlcmUgbWF5IHNlZW0gbGlrZSB0aGVyZSdzIGV4dHJhIG92ZXJyaWRlcyBoZXJlIGFuZCB0aGV5IG1heSBzZWVtIHVubmVjZXNzYXJ5LlxuICogQnV0IGFmdGVyIGNsb3NlciBpbnNwZWN0aW9uIHlvdSdsbCBzZWUgdGhlIHR5cGUgY2hhaW4gaXMgcmV0YWluZWQgYW5kXG4gKiBpbmZpbml0ZSBlbnVtZXJhYmxlcyBhcmUgcHJldmVudGVkIGZyb20gaGF2aW5nIGZlYXR1cmVzIHRoYXQgZmluaXRlIG9uZXMgaGF2ZS5cbiAqXG4gKiBJJ20gbm90IHN1cmUgaWYgaXQncyB0aGUgYmVzdCBvcHRpb24gdG8ganVzdCB1c2Ugb3ZlcnJpZGVzLCBidXQgaXQgaG9ub3JzIHRoZSB0eXBpbmcgcHJvcGVybHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9lbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyKSB7XG4gICAgICAgIHN1cGVyKGZpbmFsaXplcik7XG4gICAgICAgIHRoaXMuX2VudW1lcmF0b3JGYWN0b3J5ID0gX2VudW1lcmF0b3JGYWN0b3J5O1xuICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiSW5maW5pdGVMaW5xRW51bWVyYWJsZVwiO1xuICAgIH1cbiAgICBnZXQgaXNFbmRsZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNFbmRsZXNzO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIElFbnVtZXJhYmxlPFQ+IEltcGxlbWVudGF0aW9uLi4uXG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudW1lcmF0b3JGYWN0b3J5KCk7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICAvLyAjcmVnaW9uIElEaXNwb3NhYmxlIG92ZXJyaWRlLi4uXG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpOyAvLyBKdXN0IGluIGNhc2UuXG4gICAgICAgIHRoaXMuX2VudW1lcmF0b3JGYWN0b3J5ID0gbnVsbDtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIC8vIFJldHVybiBhIGRlZmF1bHQgKHVuZmlsdGVyZWQpIGVudW1lcmFibGUuXG4gICAgYXNFbnVtZXJhYmxlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IF8uZ2V0RW51bWVyYXRvcigpKTtcbiAgICB9XG4gICAgZG9BY3Rpb24oYWN0aW9uLCBpbml0aWFsaXplciwgaXNFbmRsZXNzID0gdGhpcy5pc0VuZGxlc3MsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRSA9IGlzRW5kbGVzcyB8fCB1bmRlZmluZWQ7IC8vIEluIGNhc2UgaXQncyBudWxsLlxuICAgICAgICBpZiAoIWFjdGlvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJhY3Rpb25cIik7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFhY3Rpb24pO1xuICAgICAgICAgICAgICAgIGlmIChpbml0aWFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXIoKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIC8vIE1heSBuZWVkIGEgd2F5IHRvIHByb3BhZ2F0ZSBpc0VuZGxlc3NcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb25SZXN1bHQgPSBhY3Rpb24oYywgaW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25SZXN1bHQgPT09IGZhbHNlIHx8IGFjdGlvblJlc3VsdCA9PT0gMCAvKiBCcmVhayAqLylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvblJlc3VsdCAhPT0gMiAvKiBTa2lwICovKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oYyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGFjdGlvblJlc3VsdD09PTIsIHRoZW4gYSBzaWduYWwgZm9yIHNraXAgaXMgcmVjZWl2ZWQuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvbkNvbXBsZXRlKVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKGluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSwgaXNFKTtcbiAgICAgICAgfSwgXG4gICAgICAgIC8vIFVzaW5nIGEgZmluYWxpemVyIHZhbHVlIHJlZHVjZXMgdGhlIGNoYW5jZSBvZiBhIGNpcmN1bGFyIHJlZmVyZW5jZVxuICAgICAgICAvLyBzaW5jZSB3ZSBjb3VsZCBzaW1wbHkgcmVmZXJlbmNlIHRoZSBlbnVtZXJhdGlvbiBhbmQgY2hlY2sgZS53YXNEaXNwb3NlZC5cbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgYWN0aW9uID0gTlVMTDtcbiAgICAgICAgfSwgaXNFKTtcbiAgICB9XG4gICAgZm9yY2UoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRoaXMuZG9BY3Rpb24oQlJFQUspXG4gICAgICAgICAgICAuZ2V0RW51bWVyYXRvcigpXG4gICAgICAgICAgICAubW92ZU5leHQoKTtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBJbmRleGluZy9QYWdpbmcgbWV0aG9kcy5cbiAgICBza2lwKGNvdW50KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZShnZXRFbXB0eUVudW1lcmF0b3IpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMud2hlcmUoKGVsZW1lbnQsIGluZGV4KSA9PiBpbmRleCA+PSBjb3VudCk7XG4gICAgfVxuICAgIHRha2UoY291bnQpIHtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2NvdW50JywgY291bnQsICdNdXN0IGJlIGZpbml0ZS4nKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIik7XG4gICAgICAgIC8vIE9uY2UgYWN0aW9uIHJldHVybnMgZmFsc2UsIHRoZSBlbnVtZXJhdGlvbiB3aWxsIHN0b3AuXG4gICAgICAgIHJldHVybiBfLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4gaW5kZXggPCBjb3VudCwgbnVsbCwgZmFsc2UpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIFNpbmdsZSBWYWx1ZSBSZXR1cm4uLi5cbiAgICBlbGVtZW50QXQoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuZWxlbWVudEF0T3JEZWZhdWx0KGluZGV4LCBJTlZBTElEX0RFRkFVTFQpO1xuICAgICAgICBpZiAodiA9PT0gSU5WQUxJRF9ERUZBVUxUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignaW5kZXgnLCBpbmRleCwgXCJpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiBzb3VyY2VcIik7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICBlbGVtZW50QXRPckRlZmF1bHQoaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4LCAnaW5kZXgnKTtcbiAgICAgICAgY29uc3QgbiA9IGluZGV4O1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpID09IG4pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qIE5vdGU6IFVubGlrZSBwcmV2aW91cyBpbXBsZW1lbnRhdGlvbnMsIHlvdSBjb3VsZCBwYXNzIGEgcHJlZGljYXRlIGludG8gdGhlc2UgbWV0aG9kcy5cbiAgICAgKiBCdXQgc2luY2UgdW5kZXIgdGhlIGhvb2QgaXQgZW5kcyB1cCBjYWxsaW5nIC53aGVyZShwcmVkaWNhdGUpIGFueXdheSxcbiAgICAgKiBpdCBtYXkgYmUgYmV0dGVyIHRvIHJlbW92ZSB0aGlzIHRvIGFsbG93IGZvciBhIGNsZWFuZXIgc2lnbmF0dXJlL292ZXJyaWRlLlxuICAgICAqIEphdmFTY3JpcHQvVHlwZVNjcmlwdCBkb2VzIG5vdCBlYXNpbHkgYWxsb3cgZm9yIGEgc3RyaWN0IG1ldGhvZCBpbnRlcmZhY2UgbGlrZSBDIy5cbiAgICAgKiBIYXZpbmcgdG8gd3JpdGUgZXh0cmEgb3ZlcnJpZGUgbG9naWMgaXMgZXJyb3IgcHJvbmUgYW5kIGNvbmZ1c2luZyB0byB0aGUgY29uc3VtZXIuXG4gICAgICogUmVtb3ZpbmcgdGhlIHByZWRpY2F0ZSBoZXJlIG1heSBhbHNvIGNhdXNlIHRoZSBjb25zdW1lciBvZiB0aGlzIG1ldGhvZCB0byB0aGluayBtb3JlIGFib3V0IGhvdyB0aGV5IHN0cnVjdHVyZSB0aGVpciBxdWVyeS5cbiAgICAgKiBUaGUgZW5kIGFsbCBkaWZmZXJlbmNlIGlzIHRoYXQgdGhlIHVzZXIgbXVzdCBkZWNsYXJlIC53aGVyZShwcmVkaWNhdGUpIGJlZm9yZSAuZmlyc3QoKSwgLnNpbmdsZSgpLCBvciAubGFzdCgpLlxuICAgICAqIE90aGVyd2lzZSB0aGVyZSB3b3VsZCBuZWVkIHRvIGJlIG11Y2ggbW9yZSBjb2RlIHRvIGhhbmRsZSB0aGVzZSBjYXNlcyAoLmZpcnN0KHByZWRpY2F0ZSksIGV0Yyk7XG4gICAgICogKi9cbiAgICBmaXJzdCgpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuZmlyc3RPckRlZmF1bHQoSU5WQUxJRF9ERUZBVUxUKTtcbiAgICAgICAgaWYgKHYgPT09IElOVkFMSURfREVGQVVMVClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImZpcnN0OlRoZSBzZXF1ZW5jZSBpcyBlbXB0eS5cIik7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICBmaXJzdE9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiBlLm1vdmVOZXh0KCkgPyBlLmN1cnJlbnQgOiBkZWZhdWx0VmFsdWUpO1xuICAgIH1cbiAgICBzaW5nbGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoIWUubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNpbmdsZTpzZXF1ZW5jZSBjb250YWlucyBtb3JlIHRoYW4gb25lIGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2luZ2xlOlRoZSBzZXF1ZW5jZSBpcyBlbXB0eS5cIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaW5nbGVPckRlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoIWUubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFueSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiBlLm1vdmVOZXh0KCkpO1xuICAgIH1cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuYW55KCk7XG4gICAgfVxuICAgIHRyYXZlcnNlRGVwdGhGaXJzdChjaGlsZHJlblNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzczsgLy8gSXMgZW5kbGVzcyBpcyBub3QgYWZmaXJtYXRpdmUgaWYgZmFsc2UuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gRGV2IE5vdGU6IE1heSB3YW50IHRvIGNvbnNpZGVyIHVzaW5nIGFuIGFjdHVhbCBzdGFjayBhbmQgbm90IGFuIGFycmF5LlxuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3JTdGFjaztcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGxlbjsgLy8gQXZvaWQgdXNpbmcgcHVzaC9wb3Agc2luY2UgdGhleSBxdWVyeSAubGVuZ3RoIGV2ZXJ5IHRpbWUgYW5kIGNhbiBiZSBzbG93ZXIuXG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHJlc3VsdFNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFja1tsZW4rK10gPSBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSBjaGlsZHJlblNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZSA9ICFUeXBlLmlzU3RyaW5nKGMpICYmIEVudW1lcmFibGUuZnJvbUFueShjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBlID8gZS5nZXRFbnVtZXJhdG9yKCkgOiBFbXB0eUVudW1lcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IGVudW1lcmF0b3JTdGFja1stLWxlbl07XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFjay5sZW5ndGggPSBsZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvclN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwb3NlLnRoZXNlLm5vQ29weShlbnVtZXJhdG9yU3RhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2sgPSBOVUxMO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBmbGF0dGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RNYW55KGVudHJ5ID0+IHtcbiAgICAgICAgICAgIGxldCBlID0gIVR5cGUuaXNTdHJpbmcoZW50cnkpICYmIEVudW1lcmFibGUuZnJvbUFueShlbnRyeSk7XG4gICAgICAgICAgICByZXR1cm4gZSA/IGUuZmxhdHRlbigpIDogW2VudHJ5XTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBhaXJ3aXNlKHNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbGVjdG9yXCIpO1xuICAgICAgICBsZXQgcHJldmlvdXM7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGkgPyBzZWxlY3RvcihwcmV2aW91cywgdmFsdWUsIGkpIDogTlVMTDtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KS5za2lwKDEpO1xuICAgIH1cbiAgICBzY2FuKGZ1bmMsIHNlZWQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghZnVuYylcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJmdW5jXCIpO1xuICAgICAgICByZXR1cm4gKHNlZWQgPT09IFZPSUQwXG4gICAgICAgICAgICA/IHRoaXMuc2VsZWN0KCh2YWx1ZSwgaSkgPT4gc2VlZCA9IGkgPyBmdW5jKHNlZWQsIHZhbHVlLCBpKSA6IHZhbHVlKVxuICAgICAgICAgICAgOiB0aGlzLnNlbGVjdCgodmFsdWUsIGkpID0+IHNlZWQgPSBmdW5jKHNlZWQsIHZhbHVlLCBpKSkpO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgc2VsZWN0KHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChzZWxlY3Rvcik7XG4gICAgfVxuICAgIG1hcChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoc2VsZWN0b3IpO1xuICAgIH1cbiAgICAvKlxuICAgIHB1YmxpYyBzdGF0aWMgSUVudW1lcmFibGU8VFJlc3VsdD4gU2VsZWN0TWFueTxUU291cmNlLCBUQ29sbGVjdGlvbiwgVFJlc3VsdD4oXG4gICAgICAgIHRoaXMgSUVudW1lcmFibGU8VFNvdXJjZT4gc291cmNlLFxuICAgICAgICBGdW5jPFRTb3VyY2Us4oCCSUVudW1lcmFibGU8VENvbGxlY3Rpb24+PiBjb2xsZWN0aW9uU2VsZWN0b3IsXG4gICAgICAgIEZ1bmM8VFNvdXJjZSzigIJUQ29sbGVjdGlvbizigIJUUmVzdWx0PiByZXN1bHRTZWxlY3RvcilcbiAgICAgKi9cbiAgICBfc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWNvbGxlY3Rpb25TZWxlY3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJjb2xsZWN0aW9uU2VsZWN0b3JcIik7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzczsgLy8gRG8gc2Vjb25kIGVudW1lcmF0aW9uLCBpdCB3aWxsIGJlIGluZGV0ZXJtaW5hdGUgaWYgZmFsc2UuXG4gICAgICAgIGlmICghcmVzdWx0U2VsZWN0b3IpXG4gICAgICAgICAgICByZXN1bHRTZWxlY3RvciA9IChhLCBiKSA9PiBiO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IG1pZGRsZUVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFjb2xsZWN0aW9uU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gVk9JRDA7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWNvbGxlY3Rpb25TZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgLy8gSnVzdCBzdGFydGVkLCBhbmQgbm90aGluZyB0byBlbnVtZXJhdGU/IEVuZC5cbiAgICAgICAgICAgICAgICBpZiAobWlkZGxlRW51bWVyYXRvciA9PT0gVk9JRDAgJiYgIWVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIG1vdmVOZXh0IGhhcyBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlLi4uXG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIG1pZGRsZSBpZiB0aGVyZSBpc24ndCBvbmUuXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWlkZGxlRW51bWVyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pZGRsZVNlcSA9IGNvbGxlY3Rpb25TZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIGluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29sbGVjdGlvbiBpcyBudWxsPyAgU2tpcCBpdC4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtaWRkbGVTZXEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShtaWRkbGVTZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtaWRkbGVFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIG1pZGRsZUVudW1lcmF0b3IuY3VycmVudCkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIG5vIG1vcmUgaW4gdGhpcyBtaWRkbGU/ICBUaGVuIGNsZWFyIGFuZCByZXNldCBmb3IgbmV4dC4uLlxuICAgICAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgbWlkZGxlRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGRpc3Bvc2VTaW5nbGUobWlkZGxlRW51bWVyYXRvcik7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgbWlkZGxlRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uU2VsZWN0b3IgPSBOVUxMO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBzZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcik7XG4gICAgfVxuICAgIF9maWx0ZXJTZWxlY3RlZChzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSwgZmlsdGVyKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFzZWxlY3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzZWxlY3RvclwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gc2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWx0ZXIgfHwgZmlsdGVyKHJlc3VsdCwgaSsrKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9LCBfLl9pc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB9LCBfLl9pc0VuZGxlc3MpO1xuICAgIH1cbiAgICBjaG9vc2Uoc2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yLCBpc05vdE51bGxPclVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHdoZXJlKHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoRnVuY3Rpb25zLklkZW50aXR5LCBwcmVkaWNhdGUpO1xuICAgIH1cbiAgICBmaWx0ZXIocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChGdW5jdGlvbnMuSWRlbnRpdHksIHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIG5vbk51bGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndoZXJlKHYgPT4gdiAhPSBudWxsICYmIHYgIT0gVk9JRDApO1xuICAgIH1cbiAgICBvZlR5cGUodHlwZSkge1xuICAgICAgICBsZXQgdHlwZU5hbWU7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBOdW1iZXI6XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLk5VTUJFUjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3RyaW5nOlxuICAgICAgICAgICAgICAgIHR5cGVOYW1lID0gVHlwZS5TVFJJTkc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLkJPT0xFQU47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZ1bmN0aW9uOlxuICAgICAgICAgICAgICAgIHR5cGVOYW1lID0gVHlwZS5GVU5DVElPTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgLndoZXJlKHggPT4geCBpbnN0YW5jZW9mIHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICAud2hlcmUoeCA9PiBpc05vdE51bGxPclVuZGVmaW5lZCh4KSAmJiB0eXBlb2YgeCA9PT0gdHlwZU5hbWUpO1xuICAgIH1cbiAgICBleGNlcHQoc2Vjb25kLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQga2V5cztcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGtleXMgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmQpXG4gICAgICAgICAgICAgICAgICAgIGVudW1VdGlsLmZvckVhY2goc2Vjb25kLCBrZXkgPT4geyBrZXlzLmFkZEJ5S2V5VmFsdWUoa2V5LCB0cnVlKTsgfSk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoY3VycmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGtleXMuY2xlYXIoKTtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgZGlzdGluY3QoY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2VwdChOVUxMLCBjb21wYXJlU2VsZWN0b3IpO1xuICAgIH1cbiAgICAvLyBbMCwwLDAsMSwxLDEsMiwyLDIsMCwwLDAsMSwxXSByZXN1bHRzIGluIFswLDEsMiwwLDFdO1xuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBjb21wYXJlS2V5O1xuICAgICAgICAgICAgbGV0IGluaXRpYWwgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gY29tcGFyZVNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJlRXF1YWxWYWx1ZXMoY29tcGFyZUtleSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZUtleSA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHNpbmdsZSBkZWZhdWx0IHZhbHVlIGlmIGVtcHR5LlxuICAgICAqIEBwYXJhbSBkZWZhdWx0VmFsdWVcbiAgICAgKiBAcmV0dXJucyB7RW51bWVyYWJsZX1cbiAgICAgKi9cbiAgICBkZWZhdWx0SWZFbXB0eShkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaXNGaXJzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihkZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgemlwKHNlY29uZCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShzZWNvbmQpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IGZpcnN0RW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgJiYgc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihmaXJzdEVudW1lcmF0b3IuY3VycmVudCwgc2Vjb25kRW51bWVyYXRvci5jdXJyZW50LCBpbmRleCsrKSksICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB6aXBNdWx0aXBsZShzZWNvbmQsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlY29uZC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWNvbmRUZW1wO1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlY29uZFRlbXAgPSBuZXcgUXVldWUoc2Vjb25kKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFzZWNvbmRFbnVtZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZFRlbXAuY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHQgPSBzZWNvbmRUZW1wLmRlcXVldWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGZpcnN0RW51bWVyYXRvci5jdXJyZW50LCBzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQsIGluZGV4KyspKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRUZW1wKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRUZW1wLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIHNlY29uZFRlbXAgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEpvaW4gTWV0aG9kc1xuICAgIGpvaW4oaW5uZXIsIG91dGVyS2V5U2VsZWN0b3IsIGlubmVyS2V5U2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG91dGVyRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBsb29rdXA7XG4gICAgICAgICAgICBsZXQgaW5uZXJFbGVtZW50cztcbiAgICAgICAgICAgIGxldCBpbm5lckNvdW50ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG91dGVyRW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IEVudW1lcmFibGUuZnJvbShpbm5lcilcbiAgICAgICAgICAgICAgICAgICAgLnRvTG9va3VwKGlubmVyS2V5U2VsZWN0b3IsIEZ1bmN0aW9ucy5JZGVudGl0eSwgY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbm5lckVsZW1lbnQgPSBpbm5lckVsZW1lbnRzW2lubmVyQ291bnQrK107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJFbGVtZW50ICE9PSBWT0lEMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihvdXRlckVudW1lcmF0b3IuY3VycmVudCwgaW5uZXJFbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckVsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdXRlckVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IG91dGVyS2V5U2VsZWN0b3Iob3V0ZXJFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJFbGVtZW50cyA9IGxvb2t1cC5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3V0ZXJFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBvdXRlckVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlubmVyRWxlbWVudHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIG91dGVyRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgbG9va3VwID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ3JvdXBKb2luKGlubmVyLCBvdXRlcktleVNlbGVjdG9yLCBpbm5lcktleVNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGxvb2t1cDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBsb29rdXAgPSBFbnVtZXJhYmxlLmZyb20oaW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIC50b0xvb2t1cChpbm5lcktleVNlbGVjdG9yLCBGdW5jdGlvbnMuSWRlbnRpdHksIGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4gZW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIGxvb2t1cC5nZXQob3V0ZXJLZXlTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQpKSkpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1lcmdlKGVudW1lcmFibGVzKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIGlmICghZW51bWVyYWJsZXMgfHwgZW51bWVyYWJsZXMubGVuZ3RoID09IDApXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBxdWV1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIDEpIEZpcnN0IGdldCBvdXIgdmFsdWVzLi4uXG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gbmV3IFF1ZXVlKGVudW1lcmFibGVzKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFlbnVtZXJhdG9yICYmIHF1ZXVlLnRyeURlcXVldWUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20odmFsdWUpOyAvLyA0KSBLZWVwIGdvaW5nIGFuZCBvbiB0byBzdGVwIDIuICBFbHNlIGZhbGwgdGhyb3VnaCB0byB5aWVsZEJyZWFrKCkuXG4gICAgICAgICAgICAgICAgICAgIH0pKSB7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IgJiYgZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUpXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBjb25jYXQoLi4uZW51bWVyYWJsZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVyZ2UoZW51bWVyYWJsZXMpO1xuICAgIH1cbiAgICB1bmlvbihzZWNvbmQsIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaXJzdEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgc2Vjb25kRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXlzO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAga2V5cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7IC8vIEFjdGluZyBhcyBhIEhhc2hTZXQuXG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yID09PSBWT0lEMCkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZmlyc3RFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBmaXJzdEVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgha2V5cy5jb250YWluc0tleShjdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMuYWRkQnlLZXlWYWx1ZShjdXJyZW50LCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShzZWNvbmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgha2V5cy5jb250YWluc0tleShjdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5hZGRCeUtleVZhbHVlKGN1cnJlbnQsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBpbnNlcnRBdChpbmRleCwgb3RoZXIpIHtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4LCAnaW5kZXgnKTtcbiAgICAgICAgY29uc3QgbiA9IGluZGV4O1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaXJzdEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgc2Vjb25kRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICBsZXQgaXNFbnVtZXJhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20ob3RoZXIpO1xuICAgICAgICAgICAgICAgIGlzRW51bWVyYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gbikge1xuICAgICAgICAgICAgICAgICAgICBpc0VudW1lcmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oc2Vjb25kRW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGZpcnN0RW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICFpc0VudW1lcmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgJiYgc2Vjb25kRW51bWVyYXRvci5tb3ZlTmV4dCgpXG4gICAgICAgICAgICAgICAgICAgICYmIHlpZWxkZXIueWllbGRSZXR1cm4oc2Vjb25kRW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgYWx0ZXJuYXRlTXVsdGlwbGUoc2VxdWVuY2UpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYnVmZmVyLCBtb2RlLCBlbnVtZXJhdG9yLCBhbHRlcm5hdGVFbnVtZXJhdG9yO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSW5zdGVhZCBvZiByZWNhbGxpbmcgZ2V0RW51bWVyYXRvciBldmVyeSB0aW1lLCBqdXN0IHJlc2V0IHRoZSBleGlzdGluZyBvbmUuXG4gICAgICAgICAgICAgICAgYWx0ZXJuYXRlRW51bWVyYXRvciA9IG5ldyBBcnJheUVudW1lcmF0b3IoRW51bWVyYWJsZS50b0FycmF5KHNlcXVlbmNlKSk7IC8vIEZyZWV6ZVxuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBsZXQgaGFzQXRMZWFzdE9uZSA9IGVudW1lcmF0b3IubW92ZU5leHQoKTtcbiAgICAgICAgICAgICAgICBtb2RlID0gaGFzQXRMZWFzdE9uZVxuICAgICAgICAgICAgICAgICAgICA/IDEgLyogUmV0dXJuICovXG4gICAgICAgICAgICAgICAgICAgIDogMCAvKiBCcmVhayAqLztcbiAgICAgICAgICAgICAgICBpZiAoaGFzQXRMZWFzdE9uZSlcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwIC8qIEJyZWFrICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDIgLyogU2tpcCAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbHRlcm5hdGVFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oYWx0ZXJuYXRlRW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0ZUVudW1lcmF0b3IucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgPSAxIC8qIFJldHVybiAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbGF0ZXN0ID0gYnVmZmVyO1xuICAgICAgICAgICAgICAgIC8vIFNldCB1cCB0aGUgbmV4dCByb3VuZC4uLlxuICAgICAgICAgICAgICAgIC8vIElzIHRoZXJlIGFub3RoZXIgb25lPyAgU2V0IHRoZSBidWZmZXIgYW5kIHNldHVwIGluc3RydWN0IGZvciB0aGUgbmV4dCBvbmUgdG8gYmUgdGhlIGFsdGVybmF0ZS5cbiAgICAgICAgICAgICAgICBsZXQgYW5vdGhlciA9IGVudW1lcmF0b3IubW92ZU5leHQoKTtcbiAgICAgICAgICAgICAgICBtb2RlID0gYW5vdGhlclxuICAgICAgICAgICAgICAgICAgICA/IDIgLyogU2tpcCAqL1xuICAgICAgICAgICAgICAgICAgICA6IDAgLyogQnJlYWsgKi87XG4gICAgICAgICAgICAgICAgaWYgKGFub3RoZXIpXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihsYXRlc3QpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWx0ZXJuYXRlRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRlRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgYWx0ZXJuYXRlRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBhbHRlcm5hdGVTaW5nbGUodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWx0ZXJuYXRlTXVsdGlwbGUoRW51bWVyYWJsZS5tYWtlKHZhbHVlKSk7XG4gICAgfVxuICAgIGFsdGVybmF0ZSguLi5zZXF1ZW5jZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbHRlcm5hdGVNdWx0aXBsZShzZXF1ZW5jZSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gRXJyb3IgSGFuZGxpbmdcbiAgICBjYXRjaEVycm9yKGhhbmRsZXIpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGluaXQuLi5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmFsbHlBY3Rpb24oYWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpXG4gICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICBidWZmZXIoc2l6ZSkge1xuICAgICAgICBpZiAoc2l6ZSA8IDEgfHwgIWlzRmluaXRlKHNpemUpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBidWZmZXIgc2l6ZS5cIik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KHNpemUsIFwic2l6ZVwiKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgbGV0IGxlbjtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gaW5pdGlhbGl6ZShzaXplKTtcbiAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgICAgIHdoaWxlIChsZW4gPCBzaXplICYmIGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBhcnJheVtsZW4rK10gPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFycmF5Lmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFsZW4gJiYgeWllbGRlci55aWVsZFJldHVybihhcnJheSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgbnVsbCwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgc2hhcmUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgc2hhcmVkRW51bWVyYXRvcjtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2hhcmVkRW51bWVyYXRvciB8fCAoc2hhcmVkRW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNoYXJlZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgc2hhcmVkRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBzaGFyZWRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgfSwgXy5faXNFbmRsZXNzKTtcbiAgICB9XG4gICAgbWVtb2l6ZSgpIHtcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBMYXp5TGlzdCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIChuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiBzb3VyY2UuZ2V0RW51bWVyYXRvcigpLCAoKSA9PiB7XG4gICAgICAgICAgICBzb3VyY2UuZGlzcG9zZSgpO1xuICAgICAgICAgICAgc291cmNlID0gbnVsbDtcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbi8qKlxuICogRW51bWVyYWJsZTxUPiBpcyBhIHdyYXBwZXIgY2xhc3MgdGhhdCBhbGxvd3MgbW9yZSBwcmltaXRpdmUgZW51bWVyYWJsZXMgdG8gZXhoaWJpdCBMSU5RIGJlaGF2aW9yLlxuICpcbiAqIEluIEMjIEVudW1lcmFibGU8VD4gaXMgbm90IGFuIGluc3RhbmNlIGJ1dCBoYXMgZXh0ZW5zaW9ucyBmb3IgSUVudW1lcmFibGU8VD4uXG4gKiBJbiB0aGlzIGNhc2UsIHdlIHVzZSBFbnVtZXJhYmxlPFQ+IGFzIHRoZSB1bmRlcmx5aW5nIGNsYXNzIHRoYXQgaXMgYmVpbmcgY2hhaW5lZC5cbiAqL1xuZXhwb3J0IGNsYXNzIExpbnFFbnVtZXJhYmxlIGV4dGVuZHMgSW5maW5pdGVMaW5xRW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3IoZW51bWVyYXRvckZhY3RvcnksIGZpbmFsaXplciwgaXNFbmRsZXNzKSB7XG4gICAgICAgIHN1cGVyKGVudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIpO1xuICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBpc0VuZGxlc3M7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJMaW5xRW51bWVyYWJsZVwiO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gYSBkZWZhdWx0ICh1bmZpbHRlcmVkKSBlbnVtZXJhYmxlLlxuICAgIGFzRW51bWVyYWJsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gXy5nZXRFbnVtZXJhdG9yKCkpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEluZGV4aW5nL1BhZ2luZyBtZXRob2RzLlxuICAgIHNraXBXaGlsZShwcmVkaWNhdGUpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiBwcmVkaWNhdGUoZWxlbWVudCwgaW5kZXgpXG4gICAgICAgICAgICA/IDIgLyogU2tpcCAqL1xuICAgICAgICAgICAgOiAxIC8qIFJldHVybiAqLyk7XG4gICAgfVxuICAgIHRha2VXaGlsZShwcmVkaWNhdGUpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdwcmVkaWNhdGUnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiBwcmVkaWNhdGUoZWxlbWVudCwgaW5kZXgpXG4gICAgICAgICAgICA/IDEgLyogUmV0dXJuICovXG4gICAgICAgICAgICA6IDAgLyogQnJlYWsgKi8sIG51bGwsIG51bGwgLy8gV2UgZG9uJ3Qga25vdyB0aGUgc3RhdGUgaWYgaXQgaXMgZW5kbGVzcyBvciBub3QuXG4gICAgICAgICk7XG4gICAgfVxuICAgIC8vIElzIGxpa2UgdGhlIGludmVyc2Ugb2YgdGFrZSBXaGlsZSB3aXRoIHRoZSBhYmlsaXR5IHRvIHJldHVybiB0aGUgdmFsdWUgaWRlbnRpZmllZCBieSB0aGUgcHJlZGljYXRlLlxuICAgIHRha2VVbnRpbChwcmVkaWNhdGUsIGluY2x1ZGVVbnRpbFZhbHVlKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigncHJlZGljYXRlJyk7XG4gICAgICAgIGlmICghaW5jbHVkZVVudGlsVmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleClcbiAgICAgICAgICAgICAgICA/IDAgLyogQnJlYWsgKi9cbiAgICAgICAgICAgICAgICA6IDEgLyogUmV0dXJuICovLCBudWxsLCBudWxsIC8vIFdlIGRvbid0IGtub3cgdGhlIHN0YXRlIGlmIGl0IGlzIGVuZGxlc3Mgb3Igbm90LlxuICAgICAgICAgICAgKTtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZvdW5kKVxuICAgICAgICAgICAgICAgIHJldHVybiAwIC8qIEJyZWFrICovO1xuICAgICAgICAgICAgZm91bmQgPSBwcmVkaWNhdGUoZWxlbWVudCwgaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIDEgLyogUmV0dXJuICovO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB9LCBudWxsIC8vIFdlIGRvbid0IGtub3cgdGhlIHN0YXRlIGlmIGl0IGlzIGVuZGxlc3Mgb3Igbm90LlxuICAgICAgICApO1xuICAgIH1cbiAgICB0cmF2ZXJzZUJyZWFkdGhGaXJzdChjaGlsZHJlblNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzczsgLy8gSXMgZW5kbGVzcyBpcyBub3QgYWZmaXJtYXRpdmUgaWYgZmFsc2UuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbmVzdExldmVsID0gMDtcbiAgICAgICAgICAgIGxldCBidWZmZXIsIGxlbjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIG5lc3RMZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgbGVuID0gMDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXJbbGVuKytdID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0U2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBuZXN0TGV2ZWwpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWxlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHQgPSBFbnVtZXJhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAuZnJvbShidWZmZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0TWFueShjaGlsZHJlblNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0LmFueSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXN0TGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IG5leHQuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIWFjdGlvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJhY3Rpb25cIik7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKF8uaXNFbmRsZXNzKTtcbiAgICAgICAgLypcbiAgICAgICAgLy8gSXQgY291bGQgYmUganVzdCBhcyBlYXN5IHRvIGRvIHRoZSBmb2xsb3dpbmc6XG4gICAgICAgIHJldHVybiBlbnVtVXRpbC5mb3JFYWNoKF8sIGFjdGlvbiwgbWF4KTtcbiAgICAgICAgLy8gQnV0IHRvIGJlIG1vcmUgYWN0aXZlIGFib3V0IGNoZWNraW5nIGZvciBkaXNwb3NhbCwgd2UgdXNlIHRoaXMgaW5zdGVhZDpcbiAgICAgICAgKi9cbiAgICAgICAgLy8gUmV0dXJuIHZhbHVlIG9mIGFjdGlvbiBjYW4gYmUgYW55dGhpbmcsIGJ1dCBpZiBpdCBpcyAoPT09KSBmYWxzZSB0aGVuIHRoZSBlbnVtVXRpbC5mb3JFYWNoIHdpbGwgZGlzY29udGludWUuXG4gICAgICAgIHJldHVybiBtYXggPiAwID8gdXNpbmcoXy5nZXRFbnVtZXJhdG9yKCksIGUgPT4ge1xuICAgICAgICAgICAgdGhyb3dJZkVuZGxlc3MoIWlzRmluaXRlKG1heCkgJiYgZS5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgLy8gSXQgaXMgcG9zc2libGUgdGhhdCBzdWJzZXF1ZW50bHkgJ2FjdGlvbicgY291bGQgY2F1c2UgdGhlIGVudW1lcmF0aW9uIHRvIGRpc3Bvc2UsIHNvIHdlIGhhdmUgdG8gY2hlY2sgZWFjaCB0aW1lLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgXy50aHJvd0lmRGlzcG9zZWQoKSAmJiBlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKGUuY3VycmVudCwgaSsrKSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0pIDogMDtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBDb252ZXJzaW9uIE1ldGhvZHNcbiAgICB0b0FycmF5KHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gcHJlZGljYXRlXG4gICAgICAgICAgICA/IHRoaXMud2hlcmUocHJlZGljYXRlKS50b0FycmF5KClcbiAgICAgICAgICAgIDogdGhpcy5jb3B5VG8oW10pO1xuICAgIH1cbiAgICBjb3B5VG8odGFyZ2V0LCBpbmRleCA9IDAsIGNvdW50ID0gSW5maW5pdHkpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCF0YXJnZXQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwidGFyZ2V0XCIpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgpO1xuICAgICAgICAvLyBJZiBub3QgZXhwb3NpbmcgYW4gYWN0aW9uIHRoYXQgY291bGQgY2F1c2UgZGlzcG9zZSwgdGhlbiB1c2UgZW51bVV0aWwuZm9yRWFjaCB1dGlsaXR5IGluc3RlYWQuXG4gICAgICAgIGVudW1VdGlsLmZvckVhY2godGhpcywgKHgsIGkpID0+IHtcbiAgICAgICAgICAgIHRhcmdldFtpICsgaW5kZXhdID0geDtcbiAgICAgICAgfSwgY291bnQpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICB0b0xvb2t1cChrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5LCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZGljdCA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IGtleSA9IGtleVNlbGVjdG9yKHgsIGkpO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlbGVtZW50U2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBsZXQgYXJyYXkgPSBkaWN0LmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICBpZiAoYXJyYXkgIT09IFZPSUQwKVxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGljdC5hZGRCeUtleVZhbHVlKGtleSwgW2VsZW1lbnRdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgTG9va3VwKGRpY3QpO1xuICAgIH1cbiAgICB0b01hcChrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIG9ialtrZXlTZWxlY3Rvcih4LCBpKV0gPSBlbGVtZW50U2VsZWN0b3IoeCwgaSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICB0b0RpY3Rpb25hcnkoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGRpY3QgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IGRpY3QuYWRkQnlLZXlWYWx1ZShrZXlTZWxlY3Rvcih4LCBpKSwgZWxlbWVudFNlbGVjdG9yKHgsIGkpKSk7XG4gICAgICAgIHJldHVybiBkaWN0O1xuICAgIH1cbiAgICB0b0pvaW5lZFN0cmluZyhzZXBhcmF0b3IgPSBcIlwiLCBzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICAgICAgLnNlbGVjdChzZWxlY3RvcilcbiAgICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAgIC5qb2luKHNlcGFyYXRvcik7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICB0YWtlRXhjZXB0TGFzdChjb3VudCA9IDEpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghKGNvdW50ID4gMCkpXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShjb3VudCkpXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgY29uc3QgYyA9IGNvdW50O1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHE7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgcSA9IG5ldyBRdWV1ZSgpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgbmV4dCBvbmUgdG8gdGhlIHF1ZXVlLlxuICAgICAgICAgICAgICAgICAgICBxLmVucXVldWUoZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gRGlkIHdlIHJlYWNoIG91ciBxdW90YT9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHEuY291bnQgPiBjKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2theSB0aGVuLCBzdGFydCByZXR1cm5pbmcgcmVzdWx0cy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHEuZGVxdWV1ZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBpZiAocSlcbiAgICAgICAgICAgICAgICAgICAgcS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgcSA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNraXBUb0xhc3QoY291bnQpIHtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgLy8gVGhpcyBzZXRzIHVwIHRoZSBxdWVyeSBzbyBub3RoaW5nIGlzIGRvbmUgdW50aWwgbW92ZSBuZXh0IGlzIGNhbGxlZC5cbiAgICAgICAgcmV0dXJuIF8ucmV2ZXJzZSgpXG4gICAgICAgICAgICAudGFrZShjb3VudClcbiAgICAgICAgICAgIC5yZXZlcnNlKCk7XG4gICAgfVxuICAgIC8vIFRvIGhlbHAgd2l0aCB0eXBlIGd1YXJkaW5nLlxuICAgIHNlbGVjdChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICB9XG4gICAgbWFwKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBzZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcik7XG4gICAgfVxuICAgIGNob29zZShzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoc2VsZWN0b3IsIGlzTm90TnVsbE9yVW5kZWZpbmVkKTtcbiAgICB9XG4gICAgcmV2ZXJzZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aHJvd0lmRW5kbGVzcyhfLl9pc0VuZGxlc3MpOyAvLyBDYW5ub3QgcmV2ZXJzZSBhbiBlbmRsZXNzIGNvbGxlY3Rpb24uLi5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYnVmZmVyO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBfLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4gISFpbmRleCAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKGJ1ZmZlclstLWluZGV4XSksICgpID0+IHtcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaHVmZmxlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKF8uX2lzRW5kbGVzcyk7IC8vIENhbm5vdCBzaHVmZmxlIGFuIGVuZGxlc3MgY29sbGVjdGlvbi4uLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgICAgICBsZXQgY2FwYWNpdHk7XG4gICAgICAgICAgICBsZXQgbGVuO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBfLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICBjYXBhY2l0eSA9IGxlbiA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEF2b2lkIHVzaW5nIG1ham9yIGFycmF5IG9wZXJhdGlvbnMgbGlrZSAuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWxlbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEluZGV4ID0gUmFuZG9tLmludGVnZXIobGVuKTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRWYWx1ZSA9IGJ1ZmZlcltzZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgICAgICBidWZmZXJbc2VsZWN0ZWRJbmRleF0gPSBidWZmZXJbLS1sZW5dOyAvLyBUYWtlIHRoZSBsYXN0IG9uZSBhbmQgcHV0IGl0IGhlcmUuXG4gICAgICAgICAgICAgICAgYnVmZmVyW2xlbl0gPSBOVUxMOyAvLyBjbGVhciBwb3NzaWJsZSByZWZlcmVuY2UuXG4gICAgICAgICAgICAgICAgaWYgKGxlbiAlIDMyID09IDApXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSBsZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oc2VsZWN0ZWRWYWx1ZSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY291bnQocHJlZGljYXRlKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZm9yRWFjaChwcmVkaWNhdGVcbiAgICAgICAgICAgID8gKHgsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKHgsIGkpKVxuICAgICAgICAgICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuICAgIC8vIEFraW4gdG8gJy5ldmVyeScgb24gYW4gYXJyYXkuXG4gICAgYWxsKHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJwcmVkaWNhdGVcIik7XG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICghcHJlZGljYXRlKHgsIGkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gJ2V2ZXJ5JyBoYXMgYmVlbiBhZGRlZCBoZXJlIGZvciBwYXJpdHkvY29tcGF0aWJpbGl0eSB3aXRoIGFuIGFycmF5LlxuICAgIGV2ZXJ5KHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGwocHJlZGljYXRlKTtcbiAgICB9XG4gICAgLy8gQWtpbiB0byAnLnNvbWUnIG9uIGFuIGFycmF5LlxuICAgIGFueShwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuYW55KCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLy8gU3BsaXR0aW5nIHRoZSBmb3JFYWNoIHVwIHRoaXMgd2F5IHJlZHVjZXMgaXRlcmF0aXZlIHByb2Nlc3NpbmcuXG4gICAgICAgIC8vIGZvckVhY2ggaGFuZGxlcyB0aGUgZ2VuZXJhdGlvbiBhbmQgZGlzcG9zYWwgb2YgdGhlIGVudW1lcmF0b3IuXG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0ID0gcHJlZGljYXRlKHgsIGkpOyAvLyBmYWxzZSA9IG5vdCBmb3VuZCBhbmQgdGhlcmVmb3JlIGl0IHNob3VsZCBjb250aW51ZS4gIHRydWUgPSBmb3VuZCBhbmQgYnJlYWs7XG4gICAgICAgICAgICByZXR1cm4gIXJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vICdzb21lJyBoYXMgYmVlbiBhZGRlZCBoZXJlIGZvciBwYXJpdHkvY29tcGF0aWJpbGl0eSB3aXRoIGFuIGFycmF5LlxuICAgIHNvbWUocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFueShwcmVkaWNhdGUpO1xuICAgIH1cbiAgICBjb250YWlucyh2YWx1ZSwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBjb21wYXJlU2VsZWN0b3IodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW55KHYgPT4gYXJlRXF1YWxWYWx1ZXMoY29tcGFyZVNlbGVjdG9yKHYpLCBzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYW55KHYgPT4gYXJlRXF1YWxWYWx1ZXModiwgdmFsdWUpKTtcbiAgICB9XG4gICAgLy8gT3JpZ2luYWxseSBoYXMgYW4gb3ZlcmxvYWQgZm9yIGEgcHJlZGljYXRlLFxuICAgIC8vIGJ1dCB0aGF0J3MgYSBiYWQgaWRlYSBzaW5jZSB0aGlzIGNvdWxkIGJlIGFuIGVudW1lcmF0aW9uIG9mIGZ1bmN0aW9ucyBhbmQgdGhlcmVmb3JlIGZhaWwgdGhlIGludGVudC5cbiAgICAvLyBCZXR0ZXIgdG8gY2hhaW4gYSB3aGVyZSBzdGF0ZW1lbnQgZmlyc3QgdG8gYmUgbW9yZSBleHBsaWNpdC5cbiAgICBpbmRleE9mKHZhbHVlLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IGZvdW5kID0gLTE7XG4gICAgICAgIHRoaXMuZm9yRWFjaChjb21wYXJlU2VsZWN0b3JcbiAgICAgICAgICAgID8gKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoY29tcGFyZVNlbGVjdG9yKGVsZW1lbnQsIGkpLCBjb21wYXJlU2VsZWN0b3IodmFsdWUsIGkpLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gV2h5PyAgQmVjYXVzZSBOYU4gZG9lc24ndCBlcXVhbCBOYU4uIDpQXG4gICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGVsZW1lbnQsIHZhbHVlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICBsYXN0SW5kZXhPZih2YWx1ZSwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAtMTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGNvbXBhcmVTZWxlY3RvclxuICAgICAgICAgICAgPyAoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlU2VsZWN0b3IoZWxlbWVudCwgaSksIGNvbXBhcmVTZWxlY3Rvcih2YWx1ZSwgaSksIHRydWUpKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoZWxlbWVudCwgdmFsdWUsIHRydWUpKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGludGVyc2VjdChzZWNvbmQsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFzZWNvbmQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic2Vjb25kXCIpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLmlzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXlzO1xuICAgICAgICAgICAgbGV0IG91dHM7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXNlY29uZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGtleXMgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIG91dHMgPSBuZXcgRGljdGlvbmFyeShjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGVudW1VdGlsLmZvckVhY2goc2Vjb25kLCBrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoa2V5LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvdXRzLmNvbnRhaW5zS2V5KGN1cnJlbnQpICYmIGtleXMuY29udGFpbnNLZXkoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHMuYWRkQnlLZXlWYWx1ZShjdXJyZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleXMpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChvdXRzKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBrZXlzID0gTlVMTDtcbiAgICAgICAgICAgICAgICBvdXRzID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHNlY29uZCA9IE5VTEw7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIHNlcXVlbmNlRXF1YWwoc2Vjb25kLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWxWYWx1ZXMpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlMSA9PiB1c2luZyhlbnVtVXRpbC5mcm9tKHNlY29uZCksIGUyID0+IHtcbiAgICAgICAgICAgIC8vIGlmIGJvdGggYXJlIGVuZGxlc3MsIHRoaXMgd2lsbCBuZXZlciBldmFsdWF0ZS5cbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKGUxLmlzRW5kbGVzcyAmJiBlMi5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgd2hpbGUgKGUxLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWUyLm1vdmVOZXh0KCkgfHwgIWVxdWFsaXR5Q29tcGFyZXIoZTEuY3VycmVudCwgZTIuY3VycmVudCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAhZTIubW92ZU5leHQoKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBvZlR5cGUodHlwZSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gc3VwZXIub2ZUeXBlKHR5cGUpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIE9yZGVyaW5nIE1ldGhvZHNcbiAgICBvcmRlckJ5KGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywga2V5U2VsZWN0b3IsIDEgLyogQXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgb3JkZXJVc2luZyhjb21wYXJpc29uKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywgbnVsbCwgMSAvKiBBc2NlbmRpbmcgKi8sIG51bGwsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICBvcmRlclVzaW5nUmV2ZXJzZWQoY29tcGFyaXNvbikge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMsIG51bGwsIC0xIC8qIERlc2NlbmRpbmcgKi8sIG51bGwsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICBvcmRlckJ5RGVzY2VuZGluZyhrZXlTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMsIGtleVNlbGVjdG9yLCAtMSAvKiBEZXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgLypcbiAgICAgICAgIHdlaWdodGVkU2FtcGxlKHdlaWdodFNlbGVjdG9yKSB7XG4gICAgICAgICB3ZWlnaHRTZWxlY3RvciA9IFV0aWxzLmNyZWF0ZUxhbWJkYSh3ZWlnaHRTZWxlY3Rvcik7XG4gICAgICAgICB2YXIgc291cmNlID0gdGhpcztcbiAgICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGU8VD4oKCkgPT4ge1xuICAgICAgICAgdmFyIHNvcnRlZEJ5Qm91bmQ7XG4gICAgICAgICB2YXIgdG90YWxXZWlnaHQgPSAwO1xuICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZTxUPihcbiAgICAgICAgICgpID0+IHtcbiAgICAgICAgIHNvcnRlZEJ5Qm91bmQgPSBzb3VyY2VcbiAgICAgICAgIC5jaG9vc2UoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgIHZhciB3ZWlnaHQgPSB3ZWlnaHRTZWxlY3Rvcih4KTtcbiAgICAgICAgIGlmICh3ZWlnaHQgPD0gMCkgcmV0dXJuIG51bGw7IC8vIGlnbm9yZSAwXG4gICAgICAgICB0b3RhbFdlaWdodCArPSB3ZWlnaHQ7XG4gICAgICAgICByZXR1cm4geyB2YWx1ZTogeCwgYm91bmQ6IHRvdGFsV2VpZ2h0IH1cbiAgICAgICAgIH0pXG4gICAgICAgICAudG9BcnJheSgpO1xuICAgICAgICAgfSxcbiAgICAgICAgICgpID0+IHtcbiAgICAgICAgIGlmIChzb3J0ZWRCeUJvdW5kLmxlbmd0aCA+IDApIHtcbiAgICAgICAgIHZhciBkcmF3ID0gKE1hdGgucmFuZG9tKCkgKiB0b3RhbFdlaWdodCkgKyAxO1xuICAgICAgICAgdmFyIGxvd2VyID0gLTE7XG4gICAgICAgICB2YXIgdXBwZXIgPSBzb3J0ZWRCeUJvdW5kLmxlbmd0aDtcbiAgICAgICAgIHdoaWxlICh1cHBlciAtIGxvd2VyID4gMSkge1xuICAgICAgICAgdmFyIGluZGV4ID0gKChsb3dlciArIHVwcGVyKSAvIDIpO1xuICAgICAgICAgaWYgKHNvcnRlZEJ5Qm91bmRbaW5kZXhdLmJvdW5kID49IGRyYXcpIHtcbiAgICAgICAgIHVwcGVyID0gaW5kZXg7XG4gICAgICAgICB9XG4gICAgICAgICBlbHNlIHtcbiAgICAgICAgIGxvd2VyID0gaW5kZXg7XG4gICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykueWllbGRSZXR1cm4oc29ydGVkQnlCb3VuZFt1cHBlcl0udmFsdWUpO1xuICAgICAgICAgfVxuICAgICAgICAgcmV0dXJuICg8YW55PnRoaXMpLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgIH0sXG4gICAgICAgICBGdW5jdGlvbnMuQmxhbmspO1xuICAgICAgICAgfSk7XG4gICAgICAgICB9XG4gICAgICAgICAqL1xuICAgIC8vICNlbmRyZWdpb25cbiAgICBidWZmZXIoc2l6ZSkge1xuICAgICAgICByZXR1cm4gc3VwZXIuYnVmZmVyKHNpemUpO1xuICAgIH1cbiAgICBncm91cEJ5KGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBpZiAoIWVsZW1lbnRTZWxlY3RvcilcbiAgICAgICAgICAgIGVsZW1lbnRTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eTsgLy8gQWxsb3cgZm9yICdudWxsJyBhbmQgbm90IGp1c3QgdW5kZWZpbmVkLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHRoaXNcbiAgICAgICAgICAgIC50b0xvb2t1cChrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IpXG4gICAgICAgICAgICAuZ2V0RW51bWVyYXRvcigpKTtcbiAgICB9XG4gICAgcGFydGl0aW9uQnkoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IgPSAoa2V5LCBlbGVtZW50cykgPT4gbmV3IEdyb3VwaW5nKGtleSwgZWxlbWVudHMpLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghZWxlbWVudFNlbGVjdG9yKVxuICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5OyAvLyBBbGxvdyBmb3IgJ251bGwnIGFuZCBub3QganVzdCB1bmRlZmluZWQuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQga2V5O1xuICAgICAgICAgICAgbGV0IGNvbXBhcmVLZXk7XG4gICAgICAgICAgICBsZXQgZ3JvdXA7XG4gICAgICAgICAgICBsZXQgbGVuO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFlbGVtZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlTZWxlY3Rvcih2KTtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZUtleSA9IGNvbXBhcmVTZWxlY3RvcihrZXkpO1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IFtlbGVtZW50U2VsZWN0b3IodildO1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFlbGVtZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGlmICghZ3JvdXApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICBsZXQgaGFzTmV4dCwgYztcbiAgICAgICAgICAgICAgICB3aGlsZSAoKGhhc05leHQgPSBlbnVtZXJhdG9yLm1vdmVOZXh0KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlS2V5LCBjb21wYXJlU2VsZWN0b3Ioa2V5U2VsZWN0b3IoYykpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwW2xlbisrXSA9IGVsZW1lbnRTZWxlY3RvcihjKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSByZXN1bHRTZWxlY3RvcihrZXksIGdyb3VwKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBjID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlTZWxlY3RvcihjKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZUtleSA9IGNvbXBhcmVTZWxlY3RvcihrZXkpO1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IFtlbGVtZW50U2VsZWN0b3IoYyldO1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBncm91cCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZsYXR0ZW4oKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5mbGF0dGVuKCk7XG4gICAgfVxuICAgIHBhaXJ3aXNlKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5wYWlyd2lzZShzZWxlY3Rvcik7XG4gICAgfVxuICAgIGFnZ3JlZ2F0ZShyZWR1Y3Rpb24sIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBpZiAoaW5pdGlhbFZhbHVlID09IFZPSUQwKSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gaVxuICAgICAgICAgICAgICAgICAgICA/IHJlZHVjdGlvbihpbml0aWFsVmFsdWUsIHZhbHVlLCBpKVxuICAgICAgICAgICAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gcmVkdWN0aW9uKGluaXRpYWxWYWx1ZSwgdmFsdWUsIGkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluaXRpYWxWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvdmlkZWQgYXMgYW4gYW5hbG9nIGZvciBhcnJheS5yZWR1Y2UuICBTaW1wbHkgYSBzaG9ydGN1dCBmb3IgYWdncmVnYXRlLlxuICAgICAqIEBwYXJhbSByZWR1Y3Rpb25cbiAgICAgKiBAcGFyYW0gaW5pdGlhbFZhbHVlXG4gICAgICovXG4gICAgcmVkdWNlKHJlZHVjdGlvbiwgaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZShyZWR1Y3Rpb24sIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuICAgIGF2ZXJhZ2Uoc2VsZWN0b3IgPSBUeXBlLm51bWJlck9yTmFOKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IHN1bSA9IHRoaXMuc3VtKChlLCBpKSA9PiB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKGUsIGkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIChpc05hTihzdW0pIHx8ICFjb3VudClcbiAgICAgICAgICAgID8gTmFOXG4gICAgICAgICAgICA6IChzdW0gLyBjb3VudCk7XG4gICAgfVxuICAgIC8vIElmIHVzaW5nIG51bWJlcnMsIGl0IG1heSBiZSB1c2VmdWwgdG8gY2FsbCAudGFrZVVudGlsKHY9PnY9PUluZmluaXR5LHRydWUpIGJlZm9yZSBjYWxsaW5nIG1heC4gU2VlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgbnVtYmVycy5cbiAgICBtYXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZShGdW5jdGlvbnMuR3JlYXRlcik7XG4gICAgfVxuICAgIG1pbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKEZ1bmN0aW9ucy5MZXNzZXIpO1xuICAgIH1cbiAgICBtYXhCeShrZXlTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUoKGEsIGIpID0+IChrZXlTZWxlY3RvcihhKSA+IGtleVNlbGVjdG9yKGIpKSA/IGEgOiBiKTtcbiAgICB9XG4gICAgbWluQnkoa2V5U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKChhLCBiKSA9PiAoa2V5U2VsZWN0b3IoYSkgPCBrZXlTZWxlY3RvcihiKSkgPyBhIDogYik7XG4gICAgfVxuICAgIC8vIEFkZGl0aW9uLi4uICBPbmx5IHdvcmtzIHdpdGggbnVtZXJpY2FsIGVudW1lcmF0aW9ucy5cbiAgICBzdW0oc2VsZWN0b3IgPSBUeXBlLm51bWJlck9yTmFOKSB7XG4gICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICAvLyBUaGlzIGFsbG93cyBmb3IgaW5maW5pdHkgbWF0aCB0aGF0IGRvZXNuJ3QgZGVzdHJveSB0aGUgb3RoZXIgdmFsdWVzLlxuICAgICAgICBsZXQgc3VtSW5maW5pdGUgPSAwOyAvLyBOZWVkcyBtb3JlIGludmVzdGlnYXRpb24gc2luY2Ugd2UgYXJlIHJlYWxseSB0cnlpbmcgdG8gcmV0YWluIHNpZ25zLlxuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdG9yKHgsIGkpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHN1bSA9IE5hTjtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNGaW5pdGUodmFsdWUpKVxuICAgICAgICAgICAgICAgIHN1bSArPSB2YWx1ZTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdW1JbmZpbml0ZSArPVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA+IDAgPyAoKzEpIDogKC0xKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpc05hTihzdW0pID8gTmFOIDogKHN1bUluZmluaXRlID8gKHN1bUluZmluaXRlICogSW5maW5pdHkpIDogc3VtKTtcbiAgICB9XG4gICAgLy8gTXVsdGlwbGljYXRpb24uLi5cbiAgICBwcm9kdWN0KHNlbGVjdG9yID0gVHlwZS5udW1iZXJPck5hTikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gMSwgZXhpc3RzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdG9yKHgsIGkpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE5hTjtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDA7IC8vIE11bHRpcGx5aW5nIGJ5IHplcm8gd2lsbCBhbHdheXMgZW5kIGluIHplcm8uXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTXVsdGlwbGljYXRpb24gY2FuIG5ldmVyIHJlY292ZXIgZnJvbSBpbmZpbml0eSBhbmQgc2ltcGx5IG11c3QgcmV0YWluIHNpZ25zLlxuICAgICAgICAgICAgLy8gWW91IGNvdWxkIGNhbmNlbCBvdXQgaW5maW5pdHkgd2l0aCAxL2luZmluaXR5IGJ1dCBubyBhdmFpbGFibGUgcmVwcmVzZW50YXRpb24gZXhpc3RzLlxuICAgICAgICAgICAgcmVzdWx0ICo9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIChleGlzdHMgJiYgaXNOYU4ocmVzdWx0KSkgPyBOYU4gOiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIHRoZSBmaXJzdCBudW1iZXIgYW5kIGRpdmlkZXMgaXQgYnkgYWxsIGZvbGxvd2luZy5cbiAgICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHF1b3RpZW50KHNlbGVjdG9yID0gVHlwZS5udW1iZXJPck5hTikge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gTmFOO1xuICAgICAgICB0aGlzLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdG9yKHgsIGkpO1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gMCB8fCAhaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IE5hTjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgLz0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY291bnQgPT09IDEpXG4gICAgICAgICAgICByZXN1bHQgPSBOYU47XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICAvLyAjcmVnaW9uIFNpbmdsZSBWYWx1ZSBSZXR1cm4uLi5cbiAgICBsYXN0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IHZhbHVlID0gVk9JRDA7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBfLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB2YWx1ZSA9IHg7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWZvdW5kKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGFzdDpObyBlbGVtZW50IHNhdGlzZmllcyB0aGUgY29uZGl0aW9uLlwiKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBsYXN0T3JEZWZhdWx0KGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IHZhbHVlID0gVk9JRDA7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBfLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB2YWx1ZSA9IHg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKCFmb3VuZCkgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIG1lbW9pemUoKSB7XG4gICAgICAgIGxldCBzb3VyY2UgPSBuZXcgTGF6eUxpc3QodGhpcyk7XG4gICAgICAgIHJldHVybiAobmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHNvdXJjZS5nZXRFbnVtZXJhdG9yKCksICgpID0+IHtcbiAgICAgICAgICAgIHNvdXJjZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICBzb3VyY2UgPSBudWxsO1xuICAgICAgICB9LCB0aGlzLmlzRW5kbGVzcykpO1xuICAgIH1cbiAgICB0aHJvd1doZW5FbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oUkVUVVJOLCBudWxsLCB0aGlzLmlzRW5kbGVzcywgY291bnQgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb3VudClcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNvbGxlY3Rpb24gaXMgZW1wdHkuXCI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIFByb3ZpZGVkIGZvciB0eXBlIGd1YXJkaW5nLlxuZXhwb3J0IGNsYXNzIEZpbml0ZUVudW1lcmFibGUgZXh0ZW5kcyBMaW5xRW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3IoZW51bWVyYXRvckZhY3RvcnksIGZpbmFsaXplcikge1xuICAgICAgICBzdXBlcihlbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJGaW5pdGVFbnVtZXJhYmxlXCI7XG4gICAgfVxufVxuY2xhc3MgQXJyYXlFbnVtZXJhYmxlIGV4dGVuZHMgRmluaXRlRW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlKSB7XG4gICAgICAgIHN1cGVyKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5RW51bWVyYXRvcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGUgdW5kZXJseWluZyBBcnJheUVudW1lcmFibGUgd2FzIGRpc3Bvc2VkLlwiLCBcIkFycmF5RW51bWVyYXRvclwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5fc291cmNlOyAvLyBTaG91bGQgbmV2ZXIgYmUgbnVsbCwgYnV0IEFycmF5RW51bWVyYWJsZSBpZiBub3QgZGlzcG9zZWQgc2ltcGx5IHRyZWF0cyBudWxsIGFzIGVtcHR5IGFycmF5LlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkFycmF5RW51bWVyYWJsZVwiO1xuICAgICAgICBfLl9zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fc291cmNlID0gTlVMTDtcbiAgICB9XG4gICAgZ2V0IHNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcbiAgICB9XG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBlbnVtVXRpbC50b0FycmF5KF8uX3NvdXJjZSk7XG4gICAgfVxuICAgIGFzRW51bWVyYWJsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhYmxlKHRoaXMuX3NvdXJjZSk7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uLCBtYXggPSBJbmZpbml0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLmZvckVhY2goXy5fc291cmNlLCBhY3Rpb24sIG1heCk7XG4gICAgfVxuICAgIC8vIFRoZXNlIG1ldGhvZHMgc2hvdWxkIEFMV0FZUyBjaGVjayBmb3IgYXJyYXkgbGVuZ3RoIGJlZm9yZSBhdHRlbXB0aW5nIGFueXRoaW5nLlxuICAgIGFueShwcmVkaWNhdGUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZTtcbiAgICAgICAgbGV0IGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiAhIWxlbiAmJiAoIXByZWRpY2F0ZSB8fCBzdXBlci5hbnkocHJlZGljYXRlKSk7XG4gICAgfVxuICAgIGNvdW50KHByZWRpY2F0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlLCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICByZXR1cm4gbGVuICYmIChwcmVkaWNhdGUgPyBzdXBlci5jb3VudChwcmVkaWNhdGUpIDogbGVuKTtcbiAgICB9XG4gICAgZWxlbWVudEF0T3JEZWZhdWx0KGluZGV4LCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihpbmRleCwgJ2luZGV4Jyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZTtcbiAgICAgICAgcmV0dXJuIGluZGV4IDwgc291cmNlLmxlbmd0aFxuICAgICAgICAgICAgPyBzb3VyY2VbaW5kZXhdXG4gICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgbGFzdCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZSwgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIChsZW4pXG4gICAgICAgICAgICA/IHNvdXJjZVtsZW4gLSAxXVxuICAgICAgICAgICAgOiBzdXBlci5sYXN0KCk7XG4gICAgfVxuICAgIGxhc3RPckRlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBfLl9zb3VyY2UsIGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgICAgICAgID8gc291cmNlW2xlbiAtIDFdXG4gICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgc2tpcChjb3VudCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBBcnJheUVudW1lcmF0b3IoKCkgPT4gXy5fc291cmNlLCBjb3VudCkpO1xuICAgIH1cbiAgICB0YWtlRXhjZXB0TGFzdChjb3VudCA9IDEpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBfLnRha2UoXy5fc291cmNlLmxlbmd0aCAtIGNvdW50KTtcbiAgICB9XG4gICAgc2tpcFRvTGFzdChjb3VudCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIGNvbnN0IGxlbiA9IF8uX3NvdXJjZVxuICAgICAgICAgICAgPyBfLl9zb3VyY2UubGVuZ3RoXG4gICAgICAgICAgICA6IDA7XG4gICAgICAgIHJldHVybiBfLnNraXAobGVuIC0gY291bnQpO1xuICAgIH1cbiAgICByZXZlcnNlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5kZXhFbnVtZXJhdG9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcyA9IF8uX3NvdXJjZTtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQgfHwgIXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogcyxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogKHMubGVuZ3RoIC0gMSksXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aDogcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IC0xXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtZW1vaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hc0VudW1lcmFibGUoKTtcbiAgICB9XG4gICAgc2VxdWVuY2VFcXVhbChzZWNvbmQsIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbFZhbHVlcykge1xuICAgICAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShzZWNvbmQpKVxuICAgICAgICAgICAgcmV0dXJuIEFycmF5cy5hcmVFcXVhbCh0aGlzLnNvdXJjZSwgc2Vjb25kLCB0cnVlLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICAgICAgaWYgKHNlY29uZCBpbnN0YW5jZW9mIEFycmF5RW51bWVyYWJsZSlcbiAgICAgICAgICAgIHJldHVybiBzZWNvbmQuc2VxdWVuY2VFcXVhbCh0aGlzLnNvdXJjZSwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgICAgIHJldHVybiBzdXBlci5zZXF1ZW5jZUVxdWFsKHNlY29uZCwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgfVxuICAgIHRvSm9pbmVkU3RyaW5nKHNlcGFyYXRvciA9IFwiXCIsIHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLl9zb3VyY2U7XG4gICAgICAgIHJldHVybiAhc2VsZWN0b3IgJiYgKHMpIGluc3RhbmNlb2YgKEFycmF5KVxuICAgICAgICAgICAgPyBzLmpvaW4oc2VwYXJhdG9yKVxuICAgICAgICAgICAgOiBzdXBlci50b0pvaW5lZFN0cmluZyhzZXBhcmF0b3IsIHNlbGVjdG9yKTtcbiAgICB9XG59XG5jbGFzcyBHcm91cGluZyBleHRlbmRzIEFycmF5RW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3IoX2dyb3VwS2V5LCBlbGVtZW50cykge1xuICAgICAgICBzdXBlcihlbGVtZW50cyk7XG4gICAgICAgIHRoaXMuX2dyb3VwS2V5ID0gX2dyb3VwS2V5O1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiR3JvdXBpbmdcIjtcbiAgICB9XG4gICAgZ2V0IGtleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyb3VwS2V5O1xuICAgIH1cbn1cbmNsYXNzIExvb2t1cCB7XG4gICAgY29uc3RydWN0b3IoX2RpY3Rpb25hcnkpIHtcbiAgICAgICAgdGhpcy5fZGljdGlvbmFyeSA9IF9kaWN0aW9uYXJ5O1xuICAgIH1cbiAgICBnZXQgY291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaWN0aW9uYXJ5LmNvdW50O1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaWN0aW9uYXJ5LmdldFZhbHVlKGtleSkgfHwgbnVsbDtcbiAgICB9XG4gICAgY29udGFpbnMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaWN0aW9uYXJ5LmNvbnRhaW5zS2V5KGtleSk7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5fZGljdGlvbmFyeS5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKG5ldyBHcm91cGluZyhjdXJyZW50LmtleSwgY3VycmVudC52YWx1ZSkpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5jbGFzcyBPcmRlcmVkRW51bWVyYWJsZSBleHRlbmRzIEZpbml0ZUVudW1lcmFibGUge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSwga2V5U2VsZWN0b3IsIG9yZGVyLCBwYXJlbnQsIGNvbXBhcmVyID0gY29tcGFyZVZhbHVlcykge1xuICAgICAgICBzdXBlcihOVUxMKTtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHRoaXMua2V5U2VsZWN0b3IgPSBrZXlTZWxlY3RvcjtcbiAgICAgICAgdGhpcy5vcmRlciA9IG9yZGVyO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5jb21wYXJlciA9IGNvbXBhcmVyO1xuICAgICAgICB0aHJvd0lmRW5kbGVzcyhzb3VyY2UgJiYgc291cmNlLmlzRW5kbGVzcyk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJPcmRlcmVkRW51bWVyYWJsZVwiO1xuICAgIH1cbiAgICBjcmVhdGVPcmRlcmVkRW51bWVyYWJsZShrZXlTZWxlY3Rvciwgb3JkZXIpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLnNvdXJjZSwga2V5U2VsZWN0b3IsIG9yZGVyLCB0aGlzKTtcbiAgICB9XG4gICAgdGhlbkJ5KGtleVNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU9yZGVyZWRFbnVtZXJhYmxlKGtleVNlbGVjdG9yLCAxIC8qIEFzY2VuZGluZyAqLyk7XG4gICAgfVxuICAgIHRoZW5Vc2luZyhjb21wYXJpc29uKSB7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcy5zb3VyY2UsIG51bGwsIDEgLyogQXNjZW5kaW5nICovLCB0aGlzLCBjb21wYXJpc29uKTtcbiAgICB9XG4gICAgdGhlbkJ5RGVzY2VuZGluZyhrZXlTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVPcmRlcmVkRW51bWVyYWJsZShrZXlTZWxlY3RvciwgLTEgLyogRGVzY2VuZGluZyAqLyk7XG4gICAgfVxuICAgIHRoZW5Vc2luZ1JldmVyc2VkKGNvbXBhcmlzb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLnNvdXJjZSwgbnVsbCwgLTEgLyogRGVzY2VuZGluZyAqLywgdGhpcywgY29tcGFyaXNvbik7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgYnVmZmVyO1xuICAgICAgICBsZXQgaW5kZXhlcztcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgYnVmZmVyID0gRW51bWVyYWJsZS50b0FycmF5KF8uc291cmNlKTtcbiAgICAgICAgICAgIGluZGV4ZXMgPSBjcmVhdGVTb3J0Q29udGV4dChfKVxuICAgICAgICAgICAgICAgIC5nZW5lcmF0ZVNvcnRlZEluZGV4ZXMoYnVmZmVyKTtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICByZXR1cm4gKGluZGV4IDwgaW5kZXhlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGJ1ZmZlcltpbmRleGVzW2luZGV4KytdXSlcbiAgICAgICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYnVmZmVyKVxuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgYnVmZmVyID0gTlVMTDtcbiAgICAgICAgICAgIGlmIChpbmRleGVzKVxuICAgICAgICAgICAgICAgIGluZGV4ZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGluZGV4ZXMgPSBOVUxMO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIF8uc291cmNlID0gTlVMTDtcbiAgICAgICAgXy5rZXlTZWxlY3RvciA9IE5VTEw7XG4gICAgICAgIF8ub3JkZXIgPSBOVUxMO1xuICAgICAgICBfLnBhcmVudCA9IE5VTEw7XG4gICAgfVxufVxuLy8gQSBwcml2YXRlIHN0YXRpYyBoZWxwZXIgZm9yIHRoZSB3ZWF2ZSBmdW5jdGlvbi5cbmZ1bmN0aW9uIG5leHRFbnVtZXJhdG9yKHF1ZXVlLCBlKSB7XG4gICAgaWYgKGUpIHtcbiAgICAgICAgaWYgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgcXVldWUuZW5xdWV1ZShlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChlKVxuICAgICAgICAgICAgICAgIGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGU7XG59XG4vKipcbiAqIFJlY3Vyc2l2ZWx5IGJ1aWxkcyBhIFNvcnRDb250ZXh0IGNoYWluLlxuICogQHBhcmFtIG9yZGVyZWRFbnVtZXJhYmxlXG4gKiBAcGFyYW0gY3VycmVudENvbnRleHRcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVNvcnRDb250ZXh0KG9yZGVyZWRFbnVtZXJhYmxlLCBjdXJyZW50Q29udGV4dCA9IG51bGwpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gbmV3IEtleVNvcnRlZENvbnRleHQoY3VycmVudENvbnRleHQsIG9yZGVyZWRFbnVtZXJhYmxlLmtleVNlbGVjdG9yLCBvcmRlcmVkRW51bWVyYWJsZS5vcmRlciwgb3JkZXJlZEVudW1lcmFibGUuY29tcGFyZXIpO1xuICAgIGlmIChvcmRlcmVkRW51bWVyYWJsZS5wYXJlbnQpXG4gICAgICAgIHJldHVybiBjcmVhdGVTb3J0Q29udGV4dChvcmRlcmVkRW51bWVyYWJsZS5wYXJlbnQsIGNvbnRleHQpO1xuICAgIHJldHVybiBjb250ZXh0O1xufVxuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmZ1bmN0aW9uIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCkge1xuICAgIGlmIChkaXNwb3NlZClcbiAgICAgICAgdGhyb3cgbmV3IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uKFwiRW51bWVyYWJsZVwiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBFbnVtZXJhYmxlKHNvdXJjZSwgLi4uYWRkaXRpb25hbCkge1xuICAgIHJldHVybiBlbnVtZXJhYmxlRnJvbShzb3VyY2UsIGFkZGl0aW9uYWwpO1xufVxuZnVuY3Rpb24gZW51bWVyYWJsZUZyb20oc291cmNlLCBhZGRpdGlvbmFsKSB7XG4gICAgbGV0IGUgPSBFbnVtZXJhYmxlLmZyb21Bbnkoc291cmNlKTtcbiAgICBpZiAoIWUpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbiAgICByZXR1cm4gKGFkZGl0aW9uYWwgJiYgYWRkaXRpb25hbC5sZW5ndGgpXG4gICAgICAgID8gZS5tZXJnZShhZGRpdGlvbmFsKVxuICAgICAgICA6IGU7XG59XG4oZnVuY3Rpb24gKEVudW1lcmFibGUpIHtcbiAgICBmdW5jdGlvbiBmcm9tKHNvdXJjZSwgLi4uYWRkaXRpb25hbCkge1xuICAgICAgICByZXR1cm4gZW51bWVyYWJsZUZyb20oc291cmNlLCBhZGRpdGlvbmFsKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5mcm9tID0gZnJvbTtcbiAgICBmdW5jdGlvbiBmcm9tQW55KHNvdXJjZSwgZGVmYXVsdEVudW1lcmFibGUpIHtcbiAgICAgICAgaWYgKFR5cGUuaXNPYmplY3Qoc291cmNlKSB8fCBUeXBlLmlzU3RyaW5nKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKVxuICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgICAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShzb3VyY2UpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhYmxlKHNvdXJjZSk7XG4gICAgICAgICAgICBpZiAoaXNFbnVtZXJhYmxlKHNvdXJjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBzb3VyY2UuZ2V0RW51bWVyYXRvcigpLCBudWxsLCBzb3VyY2UuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIGlmIChpc0VudW1lcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHNvdXJjZSwgbnVsbCwgc291cmNlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICBpZiAoaXNJdGVyYXRvcihzb3VyY2UpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmcm9tQW55KG5ldyBJdGVyYXRvckVudW1lcmF0b3Ioc291cmNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVHlwZS5pc0Z1bmN0aW9uKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiBuZXcgSW5maW5pdGVFbnVtZXJhdG9yKHNvdXJjZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZhdWx0RW51bWVyYWJsZTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5mcm9tQW55ID0gZnJvbUFueTtcbiAgICBmdW5jdGlvbiBmcm9tVGhlc2Uoc291cmNlcykge1xuICAgICAgICBzd2l0Y2ggKHNvdXJjZXMgPyBzb3VyY2VzLmxlbmd0aCA6IDApIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHkoKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyBmb3IgdmFsaWRhdGlvbiBhbmQgdGhyb3dpbmcuLi5cbiAgICAgICAgICAgICAgICByZXR1cm4gZW51bWVyYWJsZUZyb20oc291cmNlc1swXSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eSgpLm1lcmdlKHNvdXJjZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIEVudW1lcmFibGUuZnJvbVRoZXNlID0gZnJvbVRoZXNlO1xuICAgIGZ1bmN0aW9uIGZyb21PckVtcHR5KHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gZnJvbUFueShzb3VyY2UpIHx8IGVtcHR5KCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZnJvbU9yRW1wdHkgPSBmcm9tT3JFbXB0eTtcbiAgICAvKipcbiAgICAgKiBTdGF0aWMgaGVscGVyIGZvciBjb252ZXJ0aW5nIGVudW1lcmFibGVzIHRvIGFuIGFycmF5LlxuICAgICAqIEBwYXJhbSBzb3VyY2VcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRvQXJyYXkoc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBMaW5xRW51bWVyYWJsZSlcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UudG9BcnJheSgpO1xuICAgICAgICByZXR1cm4gZW51bVV0aWwudG9BcnJheShzb3VyY2UpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnRvQXJyYXkgPSB0b0FycmF5O1xuICAgIGZ1bmN0aW9uIF9jaG9pY2UodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiBuZXcgRW51bWVyYXRvckJhc2UobnVsbCwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghdmFsdWVzKTtcbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKFJhbmRvbS5zZWxlY3Qub25lKHZhbHVlcykpO1xuICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICksICgpID0+IHtcbiAgICAgICAgICAgIHZhbHVlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdmFsdWVzID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuX2Nob2ljZSA9IF9jaG9pY2U7XG4gICAgZnVuY3Rpb24gY2hvaWNlKHZhbHVlcykge1xuICAgICAgICBsZXQgbGVuID0gdmFsdWVzICYmIHZhbHVlcy5sZW5ndGg7XG4gICAgICAgIC8vIFdlIGNvdWxkIHJldHVybiBlbXB0eSBpZiBubyBsZW5ndGgsIGJ1dCB0aGF0IHdvdWxkIGJyZWFrIHRoZSB0eXBpbmcgYW5kIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzLlxuICAgICAgICAvLyBFbmZvcmNpbmcgdGhhdCB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IDEgY2hvaWNlIGlzIGtleS5cbiAgICAgICAgaWYgKCFsZW4gfHwgIWlzRmluaXRlKGxlbikpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdsZW5ndGgnLCBsZW5ndGgpO1xuICAgICAgICByZXR1cm4gX2Nob2ljZShjb3B5KHZhbHVlcykpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmNob2ljZSA9IGNob2ljZTtcbiAgICBmdW5jdGlvbiBjaG9vc2VGcm9tKC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbGVuZ3RoJywgbGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIF9jaG9pY2UoYXJncyk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuY2hvb3NlRnJvbSA9IGNob29zZUZyb207XG4gICAgZnVuY3Rpb24gX2N5Y2xlKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sIC8vIFJlaW5pdGlhbGl6ZSB0aGUgdmFsdWUganVzdCBpbiBjYXNlIHRoZSBlbnVtZXJhdG9yIGlzIHJlc3RhcnRlZC5cbiAgICAgICAgICAgICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCF2YWx1ZXMpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSB2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWVzW2luZGV4KytdKTtcbiAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHZhbHVlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdmFsdWVzID0gTlVMTDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN5Y2xlKHZhbHVlcykge1xuICAgICAgICBsZXQgbGVuID0gdmFsdWVzICYmIHZhbHVlcy5sZW5ndGg7XG4gICAgICAgIC8vIFdlIGNvdWxkIHJldHVybiBlbXB0eSBpZiBubyBsZW5ndGgsIGJ1dCB0aGF0IHdvdWxkIGJyZWFrIHRoZSB0eXBpbmcgYW5kIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzLlxuICAgICAgICAvLyBFbmZvcmNpbmcgdGhhdCB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IDEgY2hvaWNlIGlzIGtleS5cbiAgICAgICAgaWYgKCFsZW4gfHwgIWlzRmluaXRlKGxlbikpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdsZW5ndGgnLCBsZW5ndGgpO1xuICAgICAgICAvLyBNYWtlIGEgY29weSB0byBhdm9pZCBtb2RpZnlpbmcgdGhlIGNvbGxlY3Rpb24gYXMgd2UgZ28uXG4gICAgICAgIHJldHVybiBfY3ljbGUoY29weSh2YWx1ZXMpKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5jeWNsZSA9IGN5Y2xlO1xuICAgIGZ1bmN0aW9uIGN5Y2xlVGhyb3VnaCguLi5hcmdzKSB7XG4gICAgICAgIC8vIFdlIGNvdWxkIHJldHVybiBlbXB0eSBpZiBubyBsZW5ndGgsIGJ1dCB0aGF0IHdvdWxkIGJyZWFrIHRoZSB0eXBpbmcgYW5kIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzLlxuICAgICAgICAvLyBFbmZvcmNpbmcgdGhhdCB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IDEgY2hvaWNlIGlzIGtleS5cbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2xlbmd0aCcsIGxlbmd0aCk7XG4gICAgICAgIHJldHVybiBfY3ljbGUoYXJncyk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuY3ljbGVUaHJvdWdoID0gY3ljbGVUaHJvdWdoO1xuICAgIGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgICAgICAvLyBDb3VsZCBiZSBzaW5nbGUgZXhwb3J0IGZ1bmN0aW9uIGluc3RhbmNlLCBidXQgZm9yIHNhZmV0eSwgd2UnbGwgbWFrZSBhIG5ldyBvbmUuXG4gICAgICAgIHJldHVybiBuZXcgRmluaXRlRW51bWVyYWJsZShnZXRFbXB0eUVudW1lcmF0b3IpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmVtcHR5ID0gZW1wdHk7XG4gICAgZnVuY3Rpb24gcmVwZWF0KGVsZW1lbnQsIGNvdW50ID0gSW5maW5pdHkpIHtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIHJldHVybiBpc0Zpbml0ZShjb3VudCkgJiYgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIilcbiAgICAgICAgICAgID8gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjID0gY291bnQ7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHsgaW5kZXggPSAwOyB9LCAoeWllbGRlcikgPT4gKGluZGV4KysgPCBjKSAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVsZW1lbnQpLCBudWxsLCBmYWxzZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gbmV3IEVudW1lcmF0b3JCYXNlKG51bGwsICh5aWVsZGVyKSA9PiB5aWVsZGVyLnlpZWxkUmV0dXJuKGVsZW1lbnQpLCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICApKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yZXBlYXQgPSByZXBlYXQ7XG4gICAgZnVuY3Rpb24gcmVwZWF0V2l0aEZpbmFsaXplKGluaXRpYWxpemVyLCBmaW5hbGl6ZXIpIHtcbiAgICAgICAgaWYgKCFpbml0aWFsaXplcilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJpbml0aWFsaXplclwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxpemVyKVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gaW5pdGlhbGl6ZXIoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxpemVyXG4gICAgICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICA6IHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChmaW5hbGl6ZXIpXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsaXplcihlbGVtZW50KTtcbiAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGluaXRpYWxpemVyID0gTlVMTDtcbiAgICAgICAgICAgIGZpbmFsaXplciA9IFZPSUQwO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yZXBlYXRXaXRoRmluYWxpemUgPSByZXBlYXRXaXRoRmluYWxpemU7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbnVtZXJhYmxlIG9mIG9uZSBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHJldHVybnMge0Zpbml0ZUVudW1lcmFibGU8VD59XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFrZShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiByZXBlYXQoZWxlbWVudCwgMSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUubWFrZSA9IG1ha2U7XG4gICAgLy8gc3RhcnQgYW5kIHN0ZXAgY2FuIGJlIG90aGVyIHRoYW4gaW50ZWdlci5cbiAgICBmdW5jdGlvbiByYW5nZShzdGFydCwgY291bnQsIHN0ZXAgPSAxKSB7XG4gICAgICAgIGlmICghaXNGaW5pdGUoc3RhcnQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0YXJ0XCIsIHN0YXJ0LCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBlbXB0eSgpO1xuICAgICAgICBpZiAoIXN0ZXApXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSB2YWxpZCB2YWx1ZVwiKTtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShzdGVwKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGaW5pdGVFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBjID0gY291bnQ7IC8vIEZvcmNlIGludGVnZXIgZXZhbHVhdGlvbi5cbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzdGFydDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluZGV4KysgPCBjXG4gICAgICAgICAgICAgICAgICAgICYmIHlpZWxkZXIueWllbGRSZXR1cm4odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgaW5kZXggPCBjb3VudClcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yYW5nZSA9IHJhbmdlO1xuICAgIGZ1bmN0aW9uIHJhbmdlRG93bihzdGFydCwgY291bnQsIHN0ZXAgPSAxKSB7XG4gICAgICAgIHN0ZXAgPSBNYXRoLmFicyhzdGVwKSAqIC0xO1xuICAgICAgICByZXR1cm4gcmFuZ2Uoc3RhcnQsIGNvdW50LCBzdGVwKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yYW5nZURvd24gPSByYW5nZURvd247XG4gICAgLy8gc3RlcCA9IC0xIGJlaGF2ZXMgdGhlIHNhbWUgYXMgdG9OZWdhdGl2ZUluZmluaXR5O1xuICAgIGZ1bmN0aW9uIHRvSW5maW5pdHkoc3RhcnQgPSAwLCBzdGVwID0gMSkge1xuICAgICAgICBpZiAoIWlzRmluaXRlKHN0YXJ0KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGFydFwiLCBzdGFydCwgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIGlmICghc3RlcClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIHZhbGlkIHZhbHVlXCIpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKHN0ZXApKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHN0YXJ0O1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oY3VycmVudCk7XG4gICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS50b0luZmluaXR5ID0gdG9JbmZpbml0eTtcbiAgICBmdW5jdGlvbiB0b05lZ2F0aXZlSW5maW5pdHkoc3RhcnQgPSAwLCBzdGVwID0gMSkge1xuICAgICAgICByZXR1cm4gdG9JbmZpbml0eShzdGFydCwgLXN0ZXApO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnRvTmVnYXRpdmVJbmZpbml0eSA9IHRvTmVnYXRpdmVJbmZpbml0eTtcbiAgICBmdW5jdGlvbiByYW5nZVRvKHN0YXJ0LCB0bywgc3RlcCA9IDEpIHtcbiAgICAgICAgaWYgKGlzTmFOKHRvKSB8fCAhaXNGaW5pdGUodG8pKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInRvXCIsIHRvLCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgaWYgKHN0ZXAgJiYgIWlzRmluaXRlKHN0ZXApKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgZmluaXRlIG5vbi16ZXJvIG51bWJlci5cIik7XG4gICAgICAgIC8vIFRoaXMgd2F5IHdlIGFkanVzdCBmb3IgdGhlIGRlbHRhIGZyb20gc3RhcnQgYW5kIHRvIHNvIHRoZSB1c2VyIGNhbiBzYXkgKy8tIHN0ZXAgYW5kIGl0IHdpbGwgd29yayBhcyBleHBlY3RlZC5cbiAgICAgICAgc3RlcCA9IE1hdGguYWJzKHN0ZXApO1xuICAgICAgICByZXR1cm4gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7IHZhbHVlID0gc3RhcnQ7IH0sIHN0YXJ0IDwgdG9cbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdmFsdWUgPD0gdG8gJiYgeWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBzdGVwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IHlpZWxkZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdmFsdWUgPj0gdG8gJiYgeWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAtPSBzdGVwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUucmFuZ2VUbyA9IHJhbmdlVG87XG4gICAgZnVuY3Rpb24gbWF0Y2hlcyhpbnB1dCwgcGF0dGVybiwgZmxhZ3MgPSBcIlwiKSB7XG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImlucHV0XCIpO1xuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGlucHV0O1xuICAgICAgICBpZiAodHlwZSAhPSBUeXBlLlNUUklORylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBleGVjIFJlZ0V4cCBtYXRjaGVzIG9mIHR5cGUgJ1wiICsgdHlwZSArIFwiJy5cIik7XG4gICAgICAgIGlmIChwYXR0ZXJuIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICBmbGFncyArPSAocGF0dGVybi5pZ25vcmVDYXNlKSA/IFwiaVwiIDogXCJcIjtcbiAgICAgICAgICAgIGZsYWdzICs9IChwYXR0ZXJuLm11bHRpbGluZSkgPyBcIm1cIiA6IFwiXCI7XG4gICAgICAgICAgICBwYXR0ZXJuID0gcGF0dGVybi5zb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZsYWdzLmluZGV4T2YoXCJnXCIpID09PSAtMSlcbiAgICAgICAgICAgIGZsYWdzICs9IFwiZ1wiO1xuICAgICAgICByZXR1cm4gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlZ2V4O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4sIGZsYWdzKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQ2FsbGluZyByZWdleC5leGVjIGNvbnNlY3V0aXZlbHkgb24gdGhlIHNhbWUgaW5wdXQgdXNlcyB0aGUgbGFzdEluZGV4IHRvIHN0YXJ0IHRoZSBuZXh0IG1hdGNoLlxuICAgICAgICAgICAgICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoaW5wdXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaCAhPSBudWxsXG4gICAgICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihtYXRjaClcbiAgICAgICAgICAgICAgICAgICAgOiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5tYXRjaGVzID0gbWF0Y2hlcztcbiAgICBmdW5jdGlvbiBnZW5lcmF0ZShmYWN0b3J5LCBjb3VudCA9IEluZmluaXR5KSB7XG4gICAgICAgIGlmICghZmFjdG9yeSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJmYWN0b3J5XCIpO1xuICAgICAgICBpZiAoaXNOYU4oY291bnQpIHx8IGNvdW50IDw9IDApXG4gICAgICAgICAgICByZXR1cm4gRW51bWVyYWJsZS5lbXB0eSgpO1xuICAgICAgICByZXR1cm4gaXNGaW5pdGUoY291bnQpICYmIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpXG4gICAgICAgICAgICA/IG5ldyBGaW5pdGVFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGNvdW50O1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWZhY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50IDwgYyAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKGZhY3RvcnkoY3VycmVudCkpO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5ID0gTlVMTDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCFmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZmFjdG9yeShpbmRleCsrKSk7XG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmFjdG9yeSA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xuICAgIHZhciByYW5kb207XG4gICAgKGZ1bmN0aW9uIChyYW5kb20pIHtcbiAgICAgICAgZnVuY3Rpb24gZmxvYXRzKG1heEV4Y2x1c2l2ZSA9IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZShSYW5kb20uZ2VuZXJhdGUobWF4RXhjbHVzaXZlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmFuZG9tLmZsb2F0cyA9IGZsb2F0cztcbiAgICAgICAgZnVuY3Rpb24gaW50ZWdlcnMoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlKFJhbmRvbS5nZW5lcmF0ZS5pbnRlZ2Vycyhib3VuZGFyeSwgaW5jbHVzaXZlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmFuZG9tLmludGVnZXJzID0gaW50ZWdlcnM7XG4gICAgfSkocmFuZG9tID0gRW51bWVyYWJsZS5yYW5kb20gfHwgKEVudW1lcmFibGUucmFuZG9tID0ge30pKTtcbiAgICBmdW5jdGlvbiB1bmZvbGQoc2VlZCwgdmFsdWVGYWN0b3J5LCBza2lwU2VlZCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdmFsdWVGYWN0b3J5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImZhY3RvcnlcIik7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgbGV0IGlzRmlyc3Q7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzZWVkO1xuICAgICAgICAgICAgICAgIGlzRmlyc3QgPSAhc2tpcFNlZWQ7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghdmFsdWVGYWN0b3J5KTtcbiAgICAgICAgICAgICAgICBsZXQgaSA9IGluZGV4Kys7XG4gICAgICAgICAgICAgICAgaWYgKGlzRmlyc3QpXG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVGYWN0b3J5KHZhbHVlLCBpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICApO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZUZhY3RvcnkgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS51bmZvbGQgPSB1bmZvbGQ7XG4gICAgZnVuY3Rpb24gZm9yRWFjaChlbnVtZXJhYmxlLCBhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIC8vIFdpbGwgcHJvcGVybHkgZGlzcG9zZSBjcmVhdGVkIGVudW1lcmFibGUuXG4gICAgICAgIC8vIFdpbGwgdGhyb3cgaWYgZW51bWVyYWJsZSBpcyBlbmRsZXNzLlxuICAgICAgICByZXR1cm4gZW51bVV0aWwuZm9yRWFjaChlbnVtZXJhYmxlLCBhY3Rpb24sIG1heCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZm9yRWFjaCA9IGZvckVhY2g7XG4gICAgZnVuY3Rpb24gbWFwKGVudW1lcmFibGUsIHNlbGVjdG9yKSB7XG4gICAgICAgIC8vIFdpbGwgcHJvcGVybHkgZGlzcG9zZSBjcmVhdGVkIGVudW1lcmFibGUuXG4gICAgICAgIC8vIFdpbGwgdGhyb3cgaWYgZW51bWVyYWJsZSBpcyBlbmRsZXNzLlxuICAgICAgICByZXR1cm4gZW51bVV0aWwubWFwKGVudW1lcmFibGUsIHNlbGVjdG9yKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5tYXAgPSBtYXA7XG4gICAgLy8gU2xpZ2h0bHkgb3B0aW1pemVkIHZlcnNpb25zIGZvciBudW1iZXJzLlxuICAgIGZ1bmN0aW9uIG1heCh2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgdiA9IHZhbHVlc1xuICAgICAgICAgICAgLnRha2VVbnRpbCh2ID0+IHYgPT0gK0luZmluaXR5LCB0cnVlKVxuICAgICAgICAgICAgLmFnZ3JlZ2F0ZShGdW5jdGlvbnMuR3JlYXRlcik7XG4gICAgICAgIHJldHVybiB2ID09PSBWT0lEMCA/IE5hTiA6IHY7XG4gICAgfVxuICAgIEVudW1lcmFibGUubWF4ID0gbWF4O1xuICAgIGZ1bmN0aW9uIG1pbih2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgdiA9IHZhbHVlc1xuICAgICAgICAgICAgLnRha2VVbnRpbCh2ID0+IHYgPT0gLUluZmluaXR5LCB0cnVlKVxuICAgICAgICAgICAgLmFnZ3JlZ2F0ZShGdW5jdGlvbnMuTGVzc2VyKTtcbiAgICAgICAgcmV0dXJuIHYgPT09IFZPSUQwID8gTmFOIDogdjtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5taW4gPSBtaW47XG4gICAgLyoqXG4gICAgICogVGFrZXMgYW55IHNldCBvZiBjb2xsZWN0aW9ucyBvZiB0aGUgc2FtZSB0eXBlIGFuZCB3ZWF2ZXMgdGhlbSB0b2dldGhlci5cbiAgICAgKiBAcGFyYW0gZW51bWVyYWJsZXNcbiAgICAgKiBAcmV0dXJucyB7RW51bWVyYWJsZTxUPn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3ZWF2ZShlbnVtZXJhYmxlcykge1xuICAgICAgICBpZiAoIWVudW1lcmFibGVzKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignZW51bWVyYWJsZXMnKTtcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHF1ZXVlO1xuICAgICAgICAgICAgbGV0IG1haW5FbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcXVldWUgPSBuZXcgUXVldWUoKTtcbiAgICAgICAgICAgICAgICBtYWluRW51bWVyYXRvciA9IGVudW1VdGlsLmZyb20oZW51bWVyYWJsZXMpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGxldCBlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyBGaXJzdCBwYXNzLi4uXG4gICAgICAgICAgICAgICAgaWYgKG1haW5FbnVtZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghZSAmJiBtYWluRW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IG1haW5FbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBlID0gbmV4dEVudW1lcmF0b3IocXVldWUsIGMgPyBlbnVtVXRpbC5mcm9tKGMpIDogTlVMTCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkVudW1lcmF0b3IgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoIWUgJiYgcXVldWUudHJ5RGVxdWV1ZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBuZXh0RW51bWVyYXRvcihxdWV1ZSwgZW51bVV0aWwuZnJvbSh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH0pKSB7IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZVxuICAgICAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oZS5jdXJyZW50KVxuICAgICAgICAgICAgICAgICAgICA6IHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwb3NlLnRoZXNlLm5vQ29weShxdWV1ZS5kdW1wKCkpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IE5VTEw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtYWluRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgbWFpbkVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIG1haW5FbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLndlYXZlID0gd2VhdmU7XG59KShFbnVtZXJhYmxlIHx8IChFbnVtZXJhYmxlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEVudW1lcmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MaW5xLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9MaW5xLmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCAqIGFzIFZhbHVlcyBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuLyogIHZhbGlkYXRlU2l6ZTogVXRpbGl0eSBmb3IgcXVpY2sgdmFsaWRhdGlvbi9pbnZhbGlkYXRpb24gb2YgYXJyYXkgZXF1YWxpdHkuXG4gICAgV2h5IHRoaXMgd2F5PyAgV2h5IG5vdCBwYXNzIGEgY2xvc3VyZSBmb3IgdGhlIGxhc3QgcmV0dXJuP1xuICAgIFJlYXNvbjogUGVyZm9ybWFuY2UgYW5kIGF2b2lkaW5nIHRoZSBjcmVhdGlvbiBvZiBuZXcgZnVuY3Rpb25zL2Nsb3N1cmVzLiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVTaXplKGEsIGIpIHtcbiAgICAvLyBCb3RoIHZhbGlkIGFuZCBhcmUgc2FtZSBvYmplY3QsIG9yIGJvdGggYXJlIG51bGwvdW5kZWZpbmVkLlxuICAgIGlmIChhICYmIGIgJiYgYSA9PT0gYiB8fCAhYSAmJiAhYilcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gQXQgdGhpcyBwb2ludCwgYXQgbGVhc3Qgb25lIGhhcyB0byBiZSBub24tbnVsbC5cbiAgICBpZiAoIWEgfHwgIWIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBsZW4gPSBhLmxlbmd0aDtcbiAgICBpZiAobGVuICE9PSBiLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vIElmIGJvdGggYXJlIGFycmF5cyBhbmQgaGF2ZSB6ZXJvIGxlbmd0aCwgdGhleSBhcmUgZXF1YWwuXG4gICAgaWYgKGxlbiA9PT0gMClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gUmV0dXJuIHRoZSBsZW5ndGggZm9yIGRvd25zdHJlYW0gcHJvY2Vzc2luZy5cbiAgICByZXR1cm4gbGVuO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFsbEVxdWFsKGFycmF5cywgc3RyaWN0ID0gdHJ1ZSwgZXF1YWxpdHlDb21wYXJlciA9IFZhbHVlcy5hcmVFcXVhbCkge1xuICAgIGlmICghYXJyYXlzKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudE51bGxFeGNlcHRpb246ICdhcnJheXMnIGNhbm5vdCBiZSBudWxsLlwiKTtcbiAgICBpZiAoYXJyYXlzLmxlbmd0aCA8IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjb21wYXJlIGEgc2V0IG9mIGFycmF5cyBsZXNzIHRoYW4gMi5cIik7XG4gICAgaWYgKFR5cGUuaXNGdW5jdGlvbihzdHJpY3QpKSB7XG4gICAgICAgIGVxdWFsaXR5Q29tcGFyZXIgPSBzdHJpY3Q7XG4gICAgICAgIHN0cmljdCA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGZpcnN0ID0gYXJyYXlzWzBdO1xuICAgIGZvciAobGV0IGkgPSAxLCBsID0gYXJyYXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoIWFyZUVxdWFsKGZpcnN0LCBhcnJheXNbaV0sIHN0cmljdCwgZXF1YWxpdHlDb21wYXJlcikpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWFsKGEsIGIsIHN0cmljdCA9IHRydWUsIGVxdWFsaXR5Q29tcGFyZXIgPSBWYWx1ZXMuYXJlRXF1YWwpIHtcbiAgICBjb25zdCBsZW4gPSB2YWxpZGF0ZVNpemUoYSwgYik7XG4gICAgaWYgKFR5cGUuaXNCb29sZWFuKGxlbikpXG4gICAgICAgIHJldHVybiBsZW47XG4gICAgaWYgKFR5cGUuaXNGdW5jdGlvbihzdHJpY3QpKSB7XG4gICAgICAgIGVxdWFsaXR5Q29tcGFyZXIgPSBzdHJpY3Q7XG4gICAgICAgIHN0cmljdCA9IHRydWU7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCFlcXVhbGl0eUNvbXBhcmVyKGFbaV0sIGJbaV0sIHN0cmljdCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gaW50ZXJuYWxTb3J0KGEsIGNvbXBhcmVyKSB7XG4gICAgaWYgKCFhIHx8IGEubGVuZ3RoIDwgMilcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgY29uc3QgbGVuID0gYS5sZW5ndGg7XG4gICAgbGV0IGI7XG4gICAgaWYgKGxlbiA+IDY1NTM2KVxuICAgICAgICBiID0gbmV3IEFycmF5KGxlbik7XG4gICAgZWxzZSB7XG4gICAgICAgIGIgPSBbXTtcbiAgICAgICAgYi5sZW5ndGggPSBsZW47XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgYltpXSA9IGFbaV07XG4gICAgfVxuICAgIGIuc29ydChjb21wYXJlcik7XG4gICAgcmV0dXJuIGI7XG59XG5leHBvcnQgZnVuY3Rpb24gYXJlRXF1aXZhbGVudChhLCBiLCBjb21wYXJlciA9IFZhbHVlcy5jb21wYXJlKSB7XG4gICAgY29uc3QgbGVuID0gdmFsaWRhdGVTaXplKGEsIGIpO1xuICAgIGlmIChUeXBlLmlzQm9vbGVhbihsZW4pKVxuICAgICAgICByZXR1cm4gbGVuO1xuICAgIC8vIFRoZXJlIG1pZ2h0IGJlIGEgYmV0dGVyIG1vcmUgcGVyZm9ybWFudCB3YXkgdG8gZG8gdGhpcywgYnV0IGZvciB0aGUgbW9tZW50LCB0aGlzXG4gICAgLy8gd29ya3MgcXVpdGUgd2VsbC5cbiAgICBhID0gaW50ZXJuYWxTb3J0KGEsIGNvbXBhcmVyKTtcbiAgICBiID0gaW50ZXJuYWxTb3J0KGIsIGNvbXBhcmVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChjb21wYXJlcihhW2ldLCBiW2ldKSAhPT0gMClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db21wYXJlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvQ29tcGFyZS5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6aW1wb3J0LW5hbWVcclxuaW1wb3J0IHsgU3RyaW5nTm9kZSB9IGZyb20gJy4vU3RyaW5nTm9kZSc7XHJcbmltcG9ydCAnLi9TdHJpbmdFeHRlbnNpb24nO1xyXG5cclxuZXhwb3J0IHtcclxuICBTdHJpbmdOb2RlLFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXgudHMiLCJpbXBvcnQgeyBOYW1lZE5vZGUgfSBmcm9tICcuL05hbWVkTm9kZSc7XHJcbmV4cG9ydCBjbGFzcyBTdHJpbmdOb2RlIGV4dGVuZHMgTmFtZWROb2RlPFN0cmluZ05vZGUsIHN0cmluZz4ge1xyXG5cclxuICBwdWJsaWMgZ2V0IFZhbHVlKCk6c3RyaW5nIHtcclxuICAgIHJldHVybiBzdXBlci5nZXRWYWx1ZSgpO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0IFZhbHVlKHZhbHVlOnN0cmluZykge1xyXG4gICAgc3VwZXIuc2V0VmFsdWUodmFsdWUpO1xyXG4gIH1cclxuICBcclxuICBwdWJsaWMgY29uc3RydWN0b3Iobm9kZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlcihub2RlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBZGRGaXJzdCh2YWx1ZTpzdHJpbmcgfCBTdHJpbmdOb2RlKTpTdHJpbmdOb2RlIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5BZGRGaXJzdChuZXcgU3RyaW5nTm9kZSh2YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkFkZEZpcnN0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBZGRMYXN0KHZhbHVlOnN0cmluZyB8IFN0cmluZ05vZGUpOlN0cmluZ05vZGUge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLkFkZExhc3QobmV3IFN0cmluZ05vZGUodmFsdWUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5BZGRMYXN0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBZGROZXh0KHZhbHVlOnN0cmluZyB8IFN0cmluZ05vZGUpOlN0cmluZ05vZGUge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLkFkZE5leHQobmV3IFN0cmluZ05vZGUodmFsdWUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5BZGROZXh0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBZGRQcmV2aW91cyh2YWx1ZTpzdHJpbmcgfCBTdHJpbmdOb2RlKTpTdHJpbmdOb2RlIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5BZGRQcmV2aW91cyhuZXcgU3RyaW5nTm9kZSh2YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkFkZFByZXZpb3VzKHZhbHVlKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1N0cmluZ05vZGUudHMiLCIvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6aW1wb3J0LW5hbWVcclxuaW1wb3J0IEVudW1lcmFibGUgZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS5MaW5xL0xpbnEnO1xyXG5pbXBvcnQgeyBJTGlucUVudW1lcmFibGUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtLkxpbnEvRW51bWVyYWJsZSc7XHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hbWVkTm9kZTxUTm9kZSBleHRlbmRzIE5hbWVkTm9kZTxUTm9kZSwgVFZhbHVlPiwgVFZhbHVlPiBleHRlbmRzIE5vZGU8VE5vZGUsIFRWYWx1ZT4ge1xyXG5cclxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Iobm9kZT86VFZhbHVlKSB7XHJcbiAgICBpZiAobm9kZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN1cGVyKG5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuYW1lOnN0cmluZztcclxuICBwdWJsaWMgZ2V0IE5hbWUoKTpzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICB9XHJcbiAgcHJvdGVjdGVkIHNldChuYW1lOnN0cmluZykge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIC8vICNyZWdpb24gVHJhdmVyc2FsXHJcblxyXG4gIHB1YmxpYyBDaGlsZChuYW1lOnN0cmluZyk6VE5vZGUge1xyXG4gICAgcmV0dXJuIHN1cGVyLkNoaWxkcmVuKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpLmZpcnN0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzKG5hbWVPckluY2x1c2l2ZURlcHRoPzpzdHJpbmcgfCBudW1iZXIsIGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lT3JJbmNsdXNpdmVEZXB0aCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLkFuY2VzdG9ycyhuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuQW5jZXN0b3JzKGluY2x1c2l2ZURlcHRoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNlbGYobmFtZU9ySW5jbHVzaXZlRGVwdGg/OnN0cmluZyB8IG51bWJlciwgaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZURlcHRoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuQW5jZXN0b3JzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuQW5jZXN0b3JzQW5kU2VsZihpbmNsdXNpdmVEZXB0aCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBDaGlsZHJlbihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuQ2hpbGRyZW4oKSBcclxuICAgIDogc3VwZXIuQ2hpbGRyZW4oKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuTmV4dHNGcm9tU2VsZigpXHJcbiAgICA6IHN1cGVyLk5leHRzRnJvbVNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tU2VsZkFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLk5leHRzRnJvbVNlbGZBbmRTZWxmKClcclxuICAgIDogc3VwZXIuIE5leHRzRnJvbVNlbGZBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIE5leHRzRnJvbUxhc3QobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLk5leHRzRnJvbUxhc3QoKVxyXG4gICAgOiBzdXBlci5OZXh0c0Zyb21MYXN0KCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIE5leHRzRnJvbUxhc3RBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5OZXh0c0Zyb21MYXN0QW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLk5leHRzRnJvbUxhc3RBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFByZXZzRnJvbUZpcnN0KG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5QcmV2c0Zyb21GaXJzdCgpXHJcbiAgICA6IHN1cGVyLlByZXZzRnJvbUZpcnN0KCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFByZXZzRnJvbUZpcnN0QW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuUHJldnNGcm9tRmlyc3RBbmRTZWxmKClcclxuICAgIDogc3VwZXIuUHJldnNGcm9tRmlyc3RBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFByZXZzRnJvbVNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLlByZXZzRnJvbVNlbGYoKVxyXG4gICAgOiBzdXBlci5QcmV2c0Zyb21TZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFByZXZzRnJvbVNlbGZBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5QcmV2c0Zyb21TZWxmQW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLlByZXZzRnJvbVNlbGZBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzKG5hbWVPckluY2x1c2l2ZURlcHRoPzpzdHJpbmcgfCBudW1iZXIsIGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lT3JJbmNsdXNpdmVEZXB0aCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLkRlc2NlbmRhbnRzKG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5EZXNjZW5kYW50cyhpbmNsdXNpdmVEZXB0aCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c0FuZFNlbGYobmFtZU9ySW5jbHVzaXZlRGVwdGg/OnN0cmluZyB8IG51bWJlciwgaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZURlcHRoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuRGVzY2VuZGFudHNBbmRTZWxmKG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5EZXNjZW5kYW50c0FuZFNlbGYoaW5jbHVzaXZlRGVwdGgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgU2libGluZ3MobmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVFYWNoTGVuZ3RoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuU2libGluZ3MobmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuU2libGluZ3MoaW5jbHVzaXZlRWFjaExlbmd0aCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFNpYmxpbmdzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoPzpzdHJpbmcgfCBudW1iZXIsIGluY2x1c2l2ZUVhY2hMZW5ndGg/Om51bWJlcilcclxuICAgIDpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLlNpYmxpbmdzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5TaWJsaW5nc0FuZFNlbGYoaW5jbHVzaXZlRWFjaExlbmd0aCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZigpXHJcbiAgICA6IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGZBbmRTZWxmKClcclxuICAgIDogc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGZBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmKClcclxuICAgIDogc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGZBbmRTZWxmKCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuICBcclxuICBwdWJsaWMgQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5BbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGQoKVxyXG4gICAgOiBzdXBlci5BbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGQoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkQW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLkFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZEFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNPZlNpbmdsZShuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuRGVzY2VuZGFudHNPZlNpbmdsZSgpXHJcbiAgICA6IHN1cGVyLkRlc2NlbmRhbnRzT2ZTaW5nbGUoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNPZlNpbmdsZUFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkRlc2NlbmRhbnRzT2ZTaW5nbGVBbmRTZWxmKClcclxuICAgIDogc3VwZXIuRGVzY2VuZGFudHNPZlNpbmdsZUFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGQobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkKClcclxuICAgIDogc3VwZXIuRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGQoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGRBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5EZXNjZW5kYW50c09mRmlyc3RDaGlsZEFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5EZXNjZW5kYW50c09mRmlyc3RDaGlsZEFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9OYW1lZE5vZGUudHMiLCIvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6aW1wb3J0LW5hbWVcclxuaW1wb3J0IEVudW1lcmFibGUgZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS5MaW5xL0xpbnEnO1xyXG5pbXBvcnQgeyBJTGlucUVudW1lcmFibGUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtLkxpbnEvRW51bWVyYWJsZSc7XHJcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3InO1xyXG5pbXBvcnQgeyBTdHJpbmdCdWlsZGVyIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UZXh0L1N0cmluZ0J1aWxkZXInO1xyXG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtZXM2Ly9TeXN0ZW0vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uJztcclxuaW1wb3J0ICcuL1N0cmluZ0V4dGVuc2lvbic7XHJcbmV4cG9ydCBjbGFzcyBOb2RlPFROb2RlIGV4dGVuZHMgTm9kZTxUTm9kZSwgVFZhbHVlPiwgVFZhbHVlPiB7XHJcbiAgXHJcbiAgLy8vIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBOb2RlIGNsYXNzIHdpdGggYSBkZWZhdWx0IHZhbHVlLlxyXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih2YWx1ZT86IFRWYWx1ZSkge1xyXG4gICAgdGhpcy5maXJzdENoaWxkID0gbnVsbDtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgIHRoaXMuY3ljbGljUHJldiA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICB0aGlzLmN5Y2xpY05leHQgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgdGhpcy5WYWx1ZSA9IHZhbHVlID09PSB1bmRlZmluZWQgPyBudWxsIDogdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9maXJzdENoaWxkOlROb2RlO1xyXG4gIHByaXZhdGUgX3BhcmVudDpUTm9kZTtcclxuICBwcml2YXRlIF9jeWNsaWNQcmV2OlROb2RlO1xyXG4gIHByaXZhdGUgX2N5Y2xpY05leHQ6VE5vZGU7XHJcbiAgcHJpdmF0ZSBfdmFsdWU6VFZhbHVlO1xyXG5cclxuICBwcml2YXRlIGdldCBUaGlzTm9kZSgpOiBUTm9kZSB7XHJcbiAgICByZXR1cm4gPFROb2RlPjxhbnk+dGhpcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgRmlyc3RTaWJsaW5nKCk6VE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuUGFyZW50ICE9IG51bGwgPyB0aGlzLlBhcmVudC5GaXJzdENoaWxkIDogdGhpcy5UaGlzTm9kZTtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIGdldCBMYXN0U2libGluZygpOiBUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5QYXJlbnQgIT0gbnVsbCA/IHRoaXMuUGFyZW50LkZpcnN0Q2hpbGQuQ3ljbGljUHJldiA6IHRoaXMuVGhpc05vZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IEZpcnN0Q2hpbGQoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmlyc3RDaGlsZDtcclxuICB9XHJcbiAgcHJpdmF0ZSBzZXQgZmlyc3RDaGlsZChmaXJzdENoaWxkOlROb2RlKSB7XHJcbiAgICB0aGlzLl9maXJzdENoaWxkID0gZmlyc3RDaGlsZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgTGFzdENoaWxkKCk6VE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuRmlyc3RDaGlsZCAhPSBudWxsID8gdGhpcy5GaXJzdENoaWxkLkN5Y2xpY1ByZXYgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBQYXJlbnQoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gIH1cclxuICBwcml2YXRlIHNldCBwYXJlbnQocGFyZW50OlROb2RlKSB7XHJcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IEN5Y2xpY1ByZXYoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3ljbGljUHJldjtcclxuICB9XHJcbiAgcHJpdmF0ZSBzZXQgY3ljbGljUHJldihjeWNsaWNQcmV2OlROb2RlKSB7XHJcbiAgICB0aGlzLl9jeWNsaWNQcmV2ID0gY3ljbGljUHJldjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgQ3ljbGljTmV4dCgpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLl9jeWNsaWNOZXh0O1xyXG4gIH1cclxuICBwcml2YXRlIHNldCBjeWNsaWNOZXh0KGN5Y2xpY05leHQ6VE5vZGUpIHtcclxuICAgIHRoaXMuX2N5Y2xpY05leHQgPSBjeWNsaWNOZXh0O1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0IFByZXYoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5DeWNsaWNQcmV2ICE9PSB0aGlzLkxhc3RTaWJsaW5nID8gdGhpcy5DeWNsaWNQcmV2IDogbnVsbDtcclxuICB9XHJcbiAgcHVibGljIGdldCBOZXh0KCk6VE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuQ3ljbGljTmV4dCAhPT0gdGhpcy5GaXJzdFNpYmxpbmcgPyB0aGlzLkN5Y2xpY05leHQgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldFZhbHVlKCk6VFZhbHVlIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcbiAgcHJvdGVjdGVkIHNldFZhbHVlKHZhbHVlOiBUVmFsdWUpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByb3RlY3RlZCBnZXQgVmFsdWUoKTpUVmFsdWUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBwcm90ZWN0ZWQgc2V0IFZhbHVlKHZhbHVlOiBUVmFsdWUpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IENoaWxkcmVuQ291bnQoKTpudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuQ2hpbGRyZW4oKS5jb3VudCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBMZW5ndGhGcm9tRGVlcGVzdENoaWxkKCk6bnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLkdldExlbmd0aEZyb21EZWVwZXN0Q2hpbGQoKTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIEdldExlbmd0aEZyb21EZWVwZXN0Q2hpbGQoKTpudW1iZXIge1xyXG4gICAgbGV0IG1heExlbmd0aCA9IDA7XHJcbiAgICB0aGlzLkNoaWxkcmVuKCkuZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIGNvbnN0IGxlbmd0aCA9IGNoaWxkLkdldExlbmd0aEZyb21EZWVwZXN0Q2hpbGQoKSArIDE7XHJcbiAgICAgIGlmIChtYXhMZW5ndGggPCBsZW5ndGgpIHtcclxuICAgICAgICBtYXhMZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1heExlbmd0aDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBDaGlsZEF0T3JOdWxsKGluZGV4Om51bWJlcik6VE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuQ2hpbGRyZW4oKS5lbGVtZW50QXRPckRlZmF1bHQoaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9ycyhpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBpbmNsdXNpdmVEZXB0aCA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyB0aGlzLkFuY2VzdG9yc0FuZFNlbGYoKS5za2lwKDEpIFxyXG4gICAgOiB0aGlzLkFuY2VzdG9ycygpLnRha2UoaW5jbHVzaXZlRGVwdGgpO1xyXG4gIH1cclxuICBcclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2VsZihpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmIChpbmNsdXNpdmVEZXB0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLkFuY2VzdG9yc0FuZFNlbGYoKS50YWtlKGluY2x1c2l2ZURlcHRoICsgMSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLlBhcmVudDtcclxuICAgICAgfSB3aGlsZSAobm9kZSAhPSBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBDaGlsZHJlbigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLkZpcnN0Q2hpbGQ7XHJcbiAgICAgIGlmIChub2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgdGVybWluYWwgPSBub2RlO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNOZXh0O1xyXG4gICAgICAgIH0gd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcblxyXG4gIHB1YmxpYyBSZXZlcnNlQ2hpbGRyZW4oKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5MYXN0Q2hpbGQ7XHJcbiAgICAgIGlmIChub2RlID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdGVybWluYWwgPSBub2RlO1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNQcmV2O1xyXG4gICAgICB9IHdoaWxlIChub2RlICE9PSB0ZXJtaW5hbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcjEoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5DeWNsaWNOZXh0O1xyXG4gICAgICBjb25zdCB0ZXJtaW5hbCA9IF90aGlzLkZpcnN0U2libGluZztcclxuICAgICAgd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKSB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNOZXh0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcjEodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIE5leHRzRnJvbVNlbGZBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkuY29uY2F0KHRoaXMuTmV4dHNGcm9tU2VsZigpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21MYXN0KCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuTGFzdFNpYmxpbmc7XHJcbiAgICAgIGNvbnN0IHRlcm1pbmFsID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIHdoaWxlIChub2RlICE9PSB0ZXJtaW5hbCkge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljUHJldjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIE5leHRzRnJvbUxhc3RBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5OZXh0c0Zyb21MYXN0KCkuY29uY2F0KEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQcmV2c0Zyb21GaXJzdCgpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLkZpcnN0U2libGluZztcclxuICAgICAgY29uc3QgdGVybWluYWwgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKSB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNOZXh0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tRmlyc3RBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5QcmV2c0Zyb21GaXJzdCgpLmNvbmNhdChFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLkN5Y2xpY1ByZXY7XHJcbiAgICAgIGNvbnN0IHRlcm1pbmFsID0gX3RoaXMuTGFzdFNpYmxpbmc7XHJcbiAgICAgIHdoaWxlIChub2RlICE9PSB0ZXJtaW5hbCkge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljUHJldjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFByZXZzRnJvbVNlbGZBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkuY29uY2F0KHRoaXMuUHJldnNGcm9tU2VsZigpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50cyhpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgaWYgKGluY2x1c2l2ZURlcHRoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBzdGFydCA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICAgIGxldCBjdXJzb3IgPSBzdGFydDtcclxuICAgICAgICBpZiAoY3Vyc29yLkZpcnN0Q2hpbGQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICB5aWVsZCBjdXJzb3I7XHJcbiAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICB3aGlsZSAoY3Vyc29yLkZpcnN0Q2hpbGQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIGN1cnNvciA9IGN1cnNvci5GaXJzdENoaWxkO1xyXG4gICAgICAgICAgICAgIHlpZWxkIGN1cnNvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAoY3Vyc29yLk5leHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIGN1cnNvciA9IGN1cnNvci5QYXJlbnQ7XHJcbiAgICAgICAgICAgICAgaWYgKGN1cnNvciA9PT0gc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkN5Y2xpY05leHQ7XHJcbiAgICAgICAgICAgIHlpZWxkIGN1cnNvcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBzdGFydCA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICAgIGxldCBjdXJzb3IgPSBzdGFydDtcclxuICAgICAgICBpZiAoY3Vyc29yLkZpcnN0Q2hpbGQgIT0gbnVsbCAmJiBpbmNsdXNpdmVEZXB0aCA+IDApIHtcclxuICAgICAgICAgIGN1cnNvciA9IGN1cnNvci5GaXJzdENoaWxkO1xyXG4gICAgICAgICAgaW5jbHVzaXZlRGVwdGgtLTtcclxuICAgICAgICAgIHlpZWxkIGN1cnNvcjtcclxuICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChjdXJzb3IuRmlyc3RDaGlsZCAhPSBudWxsICYmIGluY2x1c2l2ZURlcHRoID4gMCkge1xyXG4gICAgICAgICAgICAgIGN1cnNvciA9IGN1cnNvci5GaXJzdENoaWxkO1xyXG4gICAgICAgICAgICAgIGluY2x1c2l2ZURlcHRoLS07XHJcbiAgICAgICAgICAgICAgeWllbGQgY3Vyc29yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlIChjdXJzb3IuTmV4dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLlBhcmVudDtcclxuICAgICAgICAgICAgICBpbmNsdXNpdmVEZXB0aCsrO1xyXG4gICAgICAgICAgICAgIGlmIChjdXJzb3IgPT09IHN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnNvciA9IGN1cnNvci5DeWNsaWNOZXh0O1xyXG4gICAgICAgICAgICB5aWVsZCBjdXJzb3I7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNBbmRTZWxmKGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIGluY2x1c2l2ZURlcHRoID09PSB1bmRlZmluZWRcclxuICAgICAgPyBFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKS5jb25jYXQodGhpcy5EZXNjZW5kYW50cygpKVxyXG4gICAgICA6IEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpLmNvbmNhdCh0aGlzLkRlc2NlbmRhbnRzKGluY2x1c2l2ZURlcHRoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgU2libGluZ3MoaW5jbHVzaXZlRWFjaExlbmd0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmIChpbmNsdXNpdmVFYWNoTGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuUHJldnNGcm9tU2VsZigpLnRha2UoaW5jbHVzaXZlRWFjaExlbmd0aCkucmV2ZXJzZSgpXHJcbiAgICAgIC5jb25jYXQodGhpcy5OZXh0c0Zyb21TZWxmKCkudGFrZShpbmNsdXNpdmVFYWNoTGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGNvbnN0IGZpcnN0ID0gX3RoaXMuRmlyc3RTaWJsaW5nO1xyXG4gICAgICBsZXQgbm9kZSA9IGZpcnN0O1xyXG4gICAgICB3aGlsZSAobm9kZSAhPT0gPFROb2RlPjxhbnk+X3RoaXMpIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgIH1cclxuICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljTmV4dDtcclxuICAgICAgd2hpbGUgKG5vZGUgIT09IGZpcnN0KSB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNOZXh0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgU2libGluZ3NBbmRTZWxmKGluY2x1c2l2ZUVhY2hMZW5ndGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAoaW5jbHVzaXZlRWFjaExlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLlByZXZzRnJvbVNlbGYoKS50YWtlKGluY2x1c2l2ZUVhY2hMZW5ndGgpLnJldmVyc2UoKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKSlcclxuICAgICAgICAgICAgICAgIC5jb25jYXQodGhpcy5OZXh0c0Zyb21TZWxmKCkudGFrZShpbmNsdXNpdmVFYWNoTGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGNvbnN0IGZpcnN0ID0gX3RoaXMuRmlyc3RTaWJsaW5nO1xyXG4gICAgICBsZXQgbm9kZSA9IGZpcnN0O1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNOZXh0O1xyXG4gICAgICB9IHdoaWxlIChub2RlICE9PSBmaXJzdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIGNvbnN0IGUgPSBub2RlLk5leHRzRnJvbVNlbGYoKS5nZXRFbnVtZXJhdG9yKCk7XHJcbiAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xyXG4gICAgICAgICAgeWllbGQgZS5jdXJyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT0gbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKS5jb25jYXQodGhpcy5BbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZigpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLkFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYoKS5za2lwKDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIGNvbnN0IGUgPSBub2RlLlByZXZzRnJvbVNlbGZBbmRTZWxmKCkuZ2V0RW51bWVyYXRvcigpO1xyXG4gICAgICAgIHdoaWxlIChlLm1vdmVOZXh0KCkpIHtcclxuICAgICAgICAgIHlpZWxkIGUuY3VycmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuUGFyZW50O1xyXG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yV2l0aFNpbmdsZUNoaWxkKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIHdoaWxlIChub2RlID09PSBub2RlLkN5Y2xpY05leHQpIHtcclxuICAgICAgICBjb25zdCBsYXN0Tm9kZSA9IG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuUGFyZW50O1xyXG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcclxuICAgICAgICAgIHJldHVybiBsYXN0Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIHdoaWxlIChub2RlID09PSBub2RlLkN5Y2xpY05leHQpIHtcclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGRBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgIHdoaWxlIChub2RlID09PSBub2RlLkN5Y2xpY05leHQpIHtcclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mU2luZ2xlKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5EZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZigpLnNraXAoMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNPZlNpbmdsZUFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuRmlyc3RDaGlsZDtcclxuICAgICAgfSB3aGlsZSAobm9kZSAhPSBudWxsICYmIG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGQoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkQW5kU2VsZigpLnNraXAoMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGRBbmRTZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkZpcnN0Q2hpbGQ7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT0gbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkUHJldmlvdXMobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZSAhPSBudWxsKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUuUGFyZW50ID09IG51bGwpO1xyXG4gICAgY29uc29sZS5hc3NlcnQodGhpcy5QYXJlbnQgIT0gbnVsbCk7XHJcbiAgICBpZiAodGhpcy5QYXJlbnQuRmlyc3RDaGlsZCA9PT0gPFROb2RlPjxhbnk+dGhpcykge1xyXG4gICAgICB0aGlzLlBhcmVudC5maXJzdENoaWxkID0gbm9kZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLkFkZFByZXZpb3VzSWdub3JpbmdGaXJzdENoaWxkKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZE5leHQobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZSAhPSBudWxsKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUuUGFyZW50ID09IG51bGwpO1xyXG4gICAgY29uc29sZS5hc3NlcnQodGhpcy5QYXJlbnQgIT0gbnVsbCk7XHJcbiAgICByZXR1cm4gdGhpcy5DeWNsaWNOZXh0LkFkZFByZXZpb3VzSWdub3JpbmdGaXJzdENoaWxkKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZEZpcnN0KG5vZGU6VE5vZGUpOlROb2RlIHtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUgIT0gbnVsbCk7XHJcbiAgICBjb25zb2xlLmFzc2VydChub2RlLlBhcmVudCA9PSBudWxsKTtcclxuICAgIHJldHVybiB0aGlzLkFkZEZpcnN0UHJpdmF0ZShub2RlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgQWRkRmlyc3RQcml2YXRlKG5vZGU6VE5vZGUpOlROb2RlIHtcclxuICAgIHRoaXMuQWRkTGFzdFByaXZhdGUobm9kZSk7XHJcbiAgICB0aGlzLmZpcnN0Q2hpbGQgPSBub2RlO1xyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIEFkZFByZXZpb3VzSWdub3JpbmdGaXJzdENoaWxkKG5vZGU6VE5vZGUpOlROb2RlIHtcclxuICAgIG5vZGUucGFyZW50ID0gdGhpcy5QYXJlbnQ7XHJcbiAgICBub2RlLmN5Y2xpY05leHQgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgbm9kZS5jeWNsaWNQcmV2ID0gdGhpcy5DeWNsaWNQcmV2O1xyXG4gICAgdGhpcy5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSBub2RlO1xyXG4gICAgdGhpcy5jeWNsaWNQcmV2ID0gbm9kZTtcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZExhc3Qobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZSAhPSBudWxsKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUuUGFyZW50ID09IG51bGwpO1xyXG4gICAgcmV0dXJuIHRoaXMuQWRkTGFzdFByaXZhdGUobm9kZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIEFkZExhc3RQcml2YXRlKG5vZGU6VE5vZGUpOlROb2RlIHtcclxuICAgIGNvbnN0IHNlY29uZCA9IHRoaXMuRmlyc3RDaGlsZDtcclxuICAgIGlmIChzZWNvbmQgPT0gbnVsbCkge1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICAgIG5vZGUuY3ljbGljTmV4dCA9IG5vZGU7XHJcbiAgICAgIG5vZGUuY3ljbGljUHJldiA9IG5vZGU7XHJcbiAgICAgIHRoaXMuZmlyc3RDaGlsZCA9IG5vZGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZWNvbmQuQWRkUHJldmlvdXNJZ25vcmluZ0ZpcnN0Q2hpbGQobm9kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBSZXBsYWNlKG5ld05vZGU6VE5vZGUpOnZvaWQge1xyXG4gICAgaWYgKHRoaXMuUGFyZW50ID09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oJ0Egcm9vdCBub2RlIGNhbm5vdCBiZSByZXBsYWNlZC4nKTtcclxuICAgIH1cclxuICAgIG5ld05vZGUucGFyZW50ID0gdGhpcy5QYXJlbnQ7XHJcbiAgICBuZXdOb2RlLmN5Y2xpY05leHQgPSB0aGlzLkN5Y2xpY05leHQ7XHJcbiAgICBuZXdOb2RlLmN5Y2xpY1ByZXYgPSB0aGlzLkN5Y2xpY1ByZXY7XHJcbiAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IG5ld05vZGU7IC8vIHByZXYubmV4dCA9IG5ld05vZGVcclxuICAgIHRoaXMuQ3ljbGljTmV4dC5jeWNsaWNQcmV2ID0gbmV3Tm9kZTtcclxuICAgIG5ld05vZGUuQ3ljbGljUHJldi5jeWNsaWNOZXh0ID0gbmV3Tm9kZTtcclxuICAgIGlmICh0aGlzLlBhcmVudC5GaXJzdENoaWxkID09PSA8VE5vZGU+PGFueT50aGlzKSB7XHJcbiAgICAgIHRoaXMuUGFyZW50LmZpcnN0Q2hpbGQgPSBuZXdOb2RlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jeWNsaWNOZXh0ID0gbnVsbDtcclxuICAgIHRoaXMuY3ljbGljUHJldiA9IG51bGw7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUmVtb3ZlKCk6dm9pZCB7XHJcbiAgICBpZiAodGhpcy5QYXJlbnQgPT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbignQSByb290IG5vZGUgY2Fubm90IGJlIHJlbW92ZWQuJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXh0ID0gdGhpcy5DeWNsaWNOZXh0O1xyXG4gICAgaWYgKG5leHQgIT09IDxUTm9kZT48YW55PnRoaXMpIHtcclxuICAgICAgdGhpcy5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSBuZXh0O1xyXG4gICAgICBuZXh0LmN5Y2xpY1ByZXYgPSB0aGlzLkN5Y2xpY1ByZXY7XHJcbiAgICAgIGlmICh0aGlzLlBhcmVudC5GaXJzdENoaWxkID09PSA8VE5vZGU+PGFueT50aGlzKSB7XHJcbiAgICAgICAgdGhpcy5QYXJlbnQuZmlyc3RDaGlsZCA9IG5leHQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUGFyZW50LmZpcnN0Q2hpbGQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jeWNsaWNOZXh0ID0gbnVsbDtcclxuICAgIHRoaXMuY3ljbGljUHJldiA9IG51bGw7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUmVtb3ZlUmVjb3ZlcmFibHkoKSB7XHJcbiAgICBpZiAodGhpcy5QYXJlbnQgPT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbignQSByb290IG5vZGUgY2Fubm90IGJlIHJlbW92ZWQuJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXh0ID0gdGhpcy5DeWNsaWNOZXh0O1xyXG4gICAgaWYgKG5leHQgIT09IDxUTm9kZT48YW55PnRoaXMpIHtcclxuICAgICAgdGhpcy5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSBuZXh0O1xyXG4gICAgICBuZXh0LmN5Y2xpY1ByZXYgPSB0aGlzLkN5Y2xpY1ByZXY7XHJcbiAgICAgIGlmICh0aGlzLlBhcmVudC5GaXJzdENoaWxkID09PSA8VE5vZGU+PGFueT50aGlzKSB7XHJcbiAgICAgICAgdGhpcy5QYXJlbnQuZmlyc3RDaGlsZCA9IG5leHQ7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgIG5leHQuUGFyZW50LmZpcnN0Q2hpbGQgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgICAgICAgdGhpcy5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgICAgICAgbmV4dC5jeWNsaWNQcmV2ID0gdGhpcy5UaGlzTm9kZTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgICAgIG5leHQuY3ljbGljUHJldiA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLlBhcmVudDtcclxuICAgIHBhcmVudC5maXJzdENoaWxkID0gbnVsbDtcclxuICAgIHJldHVybiAoKSA9PiB7IHBhcmVudC5maXJzdENoaWxkID0gdGhpcy5UaGlzTm9kZTsgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b1N0cmluZygpOnN0cmluZyB7XHJcbiAgICBjb25zdCBidWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgIHRoaXMuVG9TdHJpbmdQcml2YXRlKHRoaXMuVGhpc05vZGUsIDAsIGJ1aWxkZXIpO1xyXG4gICAgcmV0dXJuIGJ1aWxkZXIudG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgVG9TdHJpbmdQcml2YXRlKG5vZGU6VE5vZGUsZGVwdGg6bnVtYmVyLCBidWlsZGVyOlN0cmluZ0J1aWxkZXIpOnZvaWQgIHtcclxuICAgIGlmIChub2RlID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXB0aDsgaSsrKSB7XHJcbiAgICAgIGJ1aWxkZXIuYXBwZW5kKCcgICcpO1xyXG4gICAgfVxyXG4gICAgYnVpbGRlci5hcHBlbmRMaW5lKCFub2RlLlZhbHVlICE9IG51bGwgPyBub2RlLlZhbHVlLnRvU3RyaW5nKCkgOiAnJyk7XHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuQ2hpbGRyZW4oKTtcclxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICB0aGlzLlRvU3RyaW5nUHJpdmF0ZShjaGlsZCwgZGVwdGggKyAxLCBidWlsZGVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvTm9kZS50cyIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmNvbnN0IE5BTUUgPSAnRXhjZXB0aW9uJztcbi8qKlxuICogUmVwcmVzZW50cyBlcnJvcnMgdGhhdCBvY2N1ciBkdXJpbmcgYXBwbGljYXRpb24gZXhlY3V0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgRXhjZXB0aW9uIGNsYXNzIHdpdGggYSBzcGVjaWZpZWQgZXJyb3IgbWVzc2FnZSBhbmQgb3B0aW9uYWxseSBhIHJlZmVyZW5jZSB0byB0aGUgaW5uZXIgZXhjZXB0aW9uIHRoYXQgaXMgdGhlIGNhdXNlIG9mIHRoaXMgZXhjZXB0aW9uLlxuICAgICAqIEBwYXJhbSBtZXNzYWdlXG4gICAgICogQHBhcmFtIGlubmVyRXhjZXB0aW9uXG4gICAgICogQHBhcmFtIGJlZm9yZVNlYWxpbmcgVGhpcyBkZWxlZ2F0ZSBpcyB1c2VkIHRvIGFsbG93IGFjdGlvbnMgdG8gb2NjdXIganVzdCBiZWZvcmUgdGhpcyBjb25zdHJ1Y3RvciBmaW5pc2hlcy4gIFNpbmNlIHNvbWUgY29tcGlsZXJzIGRvIG5vdCBhbGxvdyB0aGUgdXNlIG9mICd0aGlzJyBiZWZvcmUgc3VwZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIGJlZm9yZVNlYWxpbmcpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHRoaXMubmFtZSA9IF8uZ2V0TmFtZSgpO1xuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICAgICAgaWYgKGlubmVyRXhjZXB0aW9uKVxuICAgICAgICAgICAgXy5kYXRhWydpbm5lckV4Y2VwdGlvbiddID0gaW5uZXJFeGNlcHRpb247XG4gICAgICAgIC8qIE9yaWdpbmFsbHkgaW50ZW5kZWQgdG8gdXNlICdnZXQnIGFjY2Vzc29ycyBmb3IgcHJvcGVydGllcyxcbiAgICAgICAgICogQnV0IGRlYnVnZ2VycyBkb24ndCBkaXNwbGF5IHRoZXNlIHJlYWRpbHkgeWV0LlxuICAgICAgICAgKiBPYmplY3QuZnJlZXplIGhhcyB0byBiZSB1c2VkIGNhcmVmdWxseSwgYnV0IHdpbGwgcHJldmVudCBvdmVycmlkaW5nIHZhbHVlcyBhdCBydW50aW1lLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGJlZm9yZVNlYWxpbmcpXG4gICAgICAgICAgICBiZWZvcmVTZWFsaW5nKF8pO1xuICAgICAgICAvLyBOb2RlIGhhcyBhIC5zdGFjaywgbGV0J3MgdXNlIGl0Li4uXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc3RhY2sgPSBldmFsKFwibmV3IEVycm9yKClcIikuc3RhY2s7XG4gICAgICAgICAgICBzdGFjayA9IHN0YWNrXG4gICAgICAgICAgICAgICAgJiYgc3RhY2tcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL15FcnJvclxcbi8sICcnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKC58XFxuKStcXHMrYXQgbmV3LisvLCAnJylcbiAgICAgICAgICAgICAgICB8fCAnJztcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSBfLnRvU3RyaW5nV2l0aG91dEJyYWNrZXRzKCkgKyBzdGFjaztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXgpIHsgfVxuICAgICAgICBPYmplY3QuZnJlZXplKF8pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgdHlwZS5cbiAgICAgKiBUaGUgZGVmYXVsdCBpcyAnRXJyb3InLlxuICAgICAqL1xuICAgIGdldE5hbWUoKSB7IHJldHVybiBOQU1FOyB9XG4gICAgLyoqXG4gICAgICogVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgRXhjZXB0aW9uIGluc3RhbmNlLlxuICAgICAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYFske3RoaXMudG9TdHJpbmdXaXRob3V0QnJhY2tldHMoKX1dYDtcbiAgICB9XG4gICAgdG9TdHJpbmdXaXRob3V0QnJhY2tldHMoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBtID0gXy5tZXNzYWdlO1xuICAgICAgICByZXR1cm4gXy5uYW1lICsgKG0gPyAoJzogJyArIG0pIDogJycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGRhdGEgb2JqZWN0LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIGZvciAobGV0IGsgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaykpXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRhdGFba107XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVGFza0hhbmRsZXJCYXNlIH0gZnJvbSBcIi4vVGFza0hhbmRsZXJCYXNlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIFRhc2tIYW5kbGVyIGV4dGVuZHMgVGFza0hhbmRsZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfYWN0aW9uKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2FjdGlvbiA9IF9hY3Rpb247XG4gICAgICAgIGlmICghX2FjdGlvbilcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FjdGlvbicpO1xuICAgIH1cbiAgICBfb25FeGVjdXRlKCkge1xuICAgICAgICB0aGlzLl9hY3Rpb24oKTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9hY3Rpb24gPSBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFRhc2tIYW5kbGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFza0hhbmRsZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UaHJlYWRpbmcvVGFza3MvVGFza0hhbmRsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgRGlzcG9zYWJsZUJhc2UgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9EaXNwb3NhYmxlQmFzZVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gXCJUYXNrSGFuZGxlckJhc2VcIjtcbi8qKlxuICogQSBzaW1wbGUgY2xhc3MgZm9yIGhhbmRsaW5nIHBvdGVudGlhbGx5IHJlcGVhdGVkIGV4ZWN1dGlvbnMgZWl0aGVyIGRlZmVycmVkIG9yIGltbWVkaWF0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRhc2tIYW5kbGVyQmFzZSBleHRlbmRzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBOQU1FO1xuICAgICAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSAwIC8qIENyZWF0ZWQgKi87XG4gICAgfVxuICAgIGdldCBpc1NjaGVkdWxlZCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fdGltZW91dElkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY2hlZHVsZXMvUmVzY2hlZHVsZXMgdHJpZ2dlcmluZyB0aGUgdGFzay5cbiAgICAgKiBAcGFyYW0gZGVmZXIgT3B0aW9uYWwgdGltZSB0byB3YWl0IHVudGlsIHRyaWdnZXJpbmcuXG4gICAgICovXG4gICAgc3RhcnQoZGVmZXIgPSAwKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IDEgLyogV2FpdGluZ1RvUnVuICovO1xuICAgICAgICBpZiAoIShkZWZlciA+IDApKVxuICAgICAgICAgICAgZGVmZXIgPSAwOyAvLyBBIG5lZ2F0aW9uIGlzIHVzZWQgdG8gY2F0Y2ggZWRnZSBjYXNlcy5cbiAgICAgICAgaWYgKGlzRmluaXRlKGRlZmVyKSlcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IHNldFRpbWVvdXQoVGFza0hhbmRsZXJCYXNlLl9oYW5kbGVyLCBkZWZlciwgdGhpcyk7XG4gICAgfVxuICAgIHJ1blN5bmNocm9ub3VzbHkoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIFRhc2tIYW5kbGVyQmFzZS5faGFuZGxlcih0aGlzKTtcbiAgICB9XG4gICAgZ2V0U3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xuICAgIH1cbiAgICBnZXQgc3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGF0dXMoKTtcbiAgICB9XG4gICAgLy8gVXNlIGEgc3RhdGljIGZ1bmN0aW9uIGhlcmUgdG8gYXZvaWQgcmVjcmVhdGluZyBhIG5ldyBmdW5jdGlvbiBldmVyeSB0aW1lLlxuICAgIHN0YXRpYyBfaGFuZGxlcihkKSB7XG4gICAgICAgIGQuY2FuY2VsKCk7XG4gICAgICAgIGQuX3N0YXR1cyA9IDIgLyogUnVubmluZyAqLztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGQuX29uRXhlY3V0ZSgpO1xuICAgICAgICAgICAgZC5fc3RhdHVzID0gMyAvKiBSYW5Ub0NvbXBsZXRpb24gKi87XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICBkLl9zdGF0dXMgPSA1IC8qIEZhdWx0ZWQgKi87XG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gbnVsbDtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuX3RpbWVvdXRJZDtcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICAgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1cyA9IDQgLyogQ2FuY2VsbGVkICovO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFRhc2tIYW5kbGVyQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhc2tIYW5kbGVyQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1RocmVhZGluZy9UYXNrcy9UYXNrSGFuZGxlckJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBPcmlnaW5hbDogaHR0cDovL2xpbnFqcy5jb2RlcGxleC5jb20vXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IExpbmtlZE5vZGVMaXN0IH0gZnJvbSBcIi4uL0xpbmtlZE5vZGVMaXN0XCI7XG5pbXBvcnQgeyBPYmplY3RQb29sIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvT2JqZWN0UG9vbFwiO1xuaW1wb3J0IHsgZ2V0SWRlbnRpZmllciB9IGZyb20gXCIuL2dldElkZW50aWZpZXJcIjtcbmltcG9ydCBEaWN0aW9uYXJ5QmFzZSBmcm9tIFwiLi9EaWN0aW9uYXJ5QmFzZVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8vIExpbmtlZExpc3QgZm9yIERpY3Rpb25hcnlcbmNsYXNzIEhhc2hFbnRyeSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCB2YWx1ZSwgcHJldmlvdXMsIG5leHQpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcmV2aW91cyA9IHByZXZpb3VzO1xuICAgICAgICB0aGlzLm5leHQgPSBuZXh0O1xuICAgIH1cbn1cbmxldCBsaW5rZWRMaXN0UG9vbDtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5mdW5jdGlvbiBsaW5rZWROb2RlTGlzdChyZWN5Y2xlKSB7XG4gICAgaWYgKCFsaW5rZWRMaXN0UG9vbClcbiAgICAgICAgbGlua2VkTGlzdFBvb2xcbiAgICAgICAgICAgID0gbmV3IE9iamVjdFBvb2woMjAsICgpID0+IG5ldyBMaW5rZWROb2RlTGlzdCgpLCByID0+IHIuY2xlYXIoKSk7XG4gICAgaWYgKCFyZWN5Y2xlKVxuICAgICAgICByZXR1cm4gbGlua2VkTGlzdFBvb2wudGFrZSgpO1xuICAgIGxpbmtlZExpc3RQb29sLmFkZChyZWN5Y2xlKTtcbn1cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5IGV4dGVuZHMgRGljdGlvbmFyeUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9rZXlHZW5lcmF0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fa2V5R2VuZXJhdG9yID0gX2tleUdlbmVyYXRvcjtcbiAgICAgICAgdGhpcy5fZW50cmllcyA9IGxpbmtlZE5vZGVMaXN0KCk7XG4gICAgICAgIHRoaXMuX2J1Y2tldHMgPSB7fTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fZW50cmllcyA9IG51bGw7XG4gICAgICAgIF8uX2J1Y2tldHMgPSBudWxsO1xuICAgICAgICBfLl9oYXNoR2VuZXJhdG9yID0gbnVsbDtcbiAgICB9XG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbnRyaWVzICYmIHRoaXMuX2VudHJpZXMudW5zYWZlQ291bnQgfHwgMDtcbiAgICB9XG4gICAgX2dldEJ1Y2tldChoYXNoLCBjcmVhdGVJZk1pc3NpbmcpIHtcbiAgICAgICAgaWYgKGhhc2ggPT0gbnVsbCB8fCAhY3JlYXRlSWZNaXNzaW5nICYmICF0aGlzLmdldENvdW50KCkpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCFUeXBlLmlzUHJpbWl0aXZlT3JTeW1ib2woaGFzaCkpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJLZXkgdHlwZSBub3QgaW5kZXhhYmxlIGFuZCBjb3VsZCBjYXVzZSBEaWN0aW9uYXJ5IHRvIGJlIGV4dHJlbWVseSBzbG93LlwiKTtcbiAgICAgICAgY29uc3QgYnVja2V0cyA9IHRoaXMuX2J1Y2tldHM7XG4gICAgICAgIGxldCBidWNrZXQgPSBidWNrZXRzW2hhc2hdO1xuICAgICAgICBpZiAoY3JlYXRlSWZNaXNzaW5nICYmICFidWNrZXQpXG4gICAgICAgICAgICBidWNrZXRzW2hhc2hdXG4gICAgICAgICAgICAgICAgPSBidWNrZXRcbiAgICAgICAgICAgICAgICAgICAgPSBsaW5rZWROb2RlTGlzdCgpO1xuICAgICAgICByZXR1cm4gYnVja2V0IHx8IG51bGw7XG4gICAgfVxuICAgIF9nZXRCdWNrZXRFbnRyeShrZXksIGhhc2gsIGJ1Y2tldCkge1xuICAgICAgICBpZiAoa2V5ID09IG51bGwgfHwgIXRoaXMuZ2V0Q291bnQoKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBfID0gdGhpcywgY29tcGFyZXIgPSBfLl9rZXlHZW5lcmF0b3IsIGNvbXBhcmVLZXkgPSBjb21wYXJlciA/IGNvbXBhcmVyKGtleSkgOiBrZXk7XG4gICAgICAgIGlmICghYnVja2V0KVxuICAgICAgICAgICAgYnVja2V0ID0gXy5fZ2V0QnVja2V0KGhhc2ggfHwgZ2V0SWRlbnRpZmllcihjb21wYXJlS2V5KSk7XG4gICAgICAgIHJldHVybiBidWNrZXRcbiAgICAgICAgICAgICYmIChjb21wYXJlclxuICAgICAgICAgICAgICAgID8gYnVja2V0LmZpbmQoZSA9PiBjb21wYXJlcihlLmtleSkgPT09IGNvbXBhcmVLZXkpXG4gICAgICAgICAgICAgICAgOiBidWNrZXQuZmluZChlID0+IGUua2V5ID09PSBjb21wYXJlS2V5KSk7XG4gICAgfVxuICAgIF9nZXRFbnRyeShrZXkpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuX2dldEJ1Y2tldEVudHJ5KGtleSk7XG4gICAgICAgIHJldHVybiBlICYmIGUudmFsdWU7XG4gICAgfVxuICAgIGdldFZhbHVlKGtleSkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZ2V0RW50cnkoa2V5KTtcbiAgICAgICAgcmV0dXJuIGUgPyBlLnZhbHVlIDogVk9JRDA7XG4gICAgfVxuICAgIF9zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGJ1Y2tldHMgPSBfLl9idWNrZXRzLCBlbnRyaWVzID0gXy5fZW50cmllcywgY29tcGFyZUtleSA9IF8uX2tleUdlbmVyYXRvciA/IF8uX2tleUdlbmVyYXRvcihrZXkpIDoga2V5LCBoYXNoID0gZ2V0SWRlbnRpZmllcihjb21wYXJlS2V5KTtcbiAgICAgICAgbGV0IGJ1Y2tldCA9IF8uX2dldEJ1Y2tldChoYXNoKTtcbiAgICAgICAgY29uc3QgYnVja2V0RW50cnkgPSBidWNrZXQgJiYgXy5fZ2V0QnVja2V0RW50cnkoa2V5LCBoYXNoLCBidWNrZXQpO1xuICAgICAgICAvLyBFbnRyeSBleGl0cz8gRGVsZXRlIG9yIHVwZGF0ZVxuICAgICAgICBpZiAoYnVja2V0RW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBidWNrZXQ7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFZPSUQwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBiLnJlbW92ZU5vZGUoYnVja2V0RW50cnkpLCB5ID0gZW50cmllcy5yZW1vdmVOb2RlKGJ1Y2tldEVudHJ5LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoeCAmJiAhYi5jb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYnVja2V0c1toYXNoXTtcbiAgICAgICAgICAgICAgICAgICAgbGlua2VkTm9kZUxpc3QoYik7XG4gICAgICAgICAgICAgICAgICAgIGJ1Y2tldCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh4ICE9PSB5KVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkVudHJpZXMgYW5kIGJ1Y2tldHMgYXJlIG91dCBvZiBzeW5jLlwiO1xuICAgICAgICAgICAgICAgIGlmICh4KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IGV4cG9zZSB0aGUgaW50ZXJuYWwgaGFzaCBlbnRyaWVzIHNvIHJlcGxhY2luZyB0aGUgdmFsdWUgaXMgb2suXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkID0gYnVja2V0RW50cnkudmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgYnVja2V0RW50cnkudmFsdWUudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWFyZUVxdWFsKHZhbHVlLCBvbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9PSBWT0lEMCkge1xuICAgICAgICAgICAgaWYgKCFidWNrZXQpXG4gICAgICAgICAgICAgICAgYnVja2V0ID0gXy5fZ2V0QnVja2V0KGhhc2gsIHRydWUpO1xuICAgICAgICAgICAgaWYgKCFidWNrZXQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7aGFzaH1cIiBjYW5ub3QgYmUgYWRkZWQgdG8gbG9va3VwIHRhYmxlLmApO1xuICAgICAgICAgICAgbGV0IGVudHJ5ID0gbmV3IEhhc2hFbnRyeShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGVudHJpZXMuYWRkTm9kZShlbnRyeSk7XG4gICAgICAgICAgICBidWNrZXQuYWRkTm9kZShuZXcgSGFzaEVudHJ5KGtleSwgZW50cnkpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBidWNrZXRzID0gXy5fYnVja2V0cztcbiAgICAgICAgLy8gRW5zdXJlIHJlc2V0IGFuZCBjbGVhbi4uLlxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYnVja2V0cykge1xuICAgICAgICAgICAgaWYgKGJ1Y2tldHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGxldCBidWNrZXQgPSBidWNrZXRzW2tleV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIGJ1Y2tldHNba2V5XTtcbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlTGlzdChidWNrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLl9lbnRyaWVzLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qXG4gICAgICogTm90ZTogc3VwZXIuZ2V0RW51bWVyYXRvcigpIHdvcmtzIHBlcmZlY3RseSB3ZWxsLFxuICAgICAqIGJ1dCBlbnVtZXJhdGluZyB0aGUgaW50ZXJuYWwgbGlua2VkIG5vZGUgbGlzdCBpcyBtdWNoIG1vcmUgZWZmaWNpZW50LlxuICAgICAqL1xuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmVyLCBjdXJyZW50RW50cnk7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHZlciA9IF8uX3ZlcnNpb247XG4gICAgICAgICAgICBjdXJyZW50RW50cnkgPSBfLl9lbnRyaWVzLmZpcnN0O1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRFbnRyeSkge1xuICAgICAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcik7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyBrZXk6IGN1cnJlbnRFbnRyeS5rZXksIHZhbHVlOiBjdXJyZW50RW50cnkudmFsdWUgfTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RW50cnkgPSBjdXJyZW50RW50cnkubmV4dCB8fCBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRLZXlzKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBlID0gXy5fZW50cmllcyAmJiBfLl9lbnRyaWVzLmZpcnN0O1xuICAgICAgICB3aGlsZSAoZSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goZS5rZXkpO1xuICAgICAgICAgICAgZSA9IGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBnZXRWYWx1ZXMoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IGUgPSBfLl9lbnRyaWVzICYmIF8uX2VudHJpZXMuZmlyc3Q7XG4gICAgICAgIHdoaWxlIChlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChlLnZhbHVlKTtcbiAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBEaWN0aW9uYXJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGljdGlvbmFyeS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9EaWN0aW9uYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCIuLi9UZXh0L1V0aWxpdHlcIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJTVBPUlRBTlQgTk9URVMgQUJPVVQgUEVSRk9STUFOQ0U6XG4gKiBodHRwOi8vanNwZXJmLmNvbS9zaW11bGF0aW5nLWEtcXVldWVcbiAqXG4gKiBBZGRpbmcgdG8gYW4gYXJyYXkgaXMgdmVyeSBmYXN0LCBidXQgbW9kaWZ5aW5nIGlzIHNsb3cuXG4gKiBMaW5rZWRMaXN0IHdpbnMgd2hlbiBtb2RpZnlpbmcgY29udGVudHMuXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2Njg4NC9hcnJheS12ZXJzdXMtbGlua2VkLWxpc3RcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VmdWwgZm9yIG1hbmFnaW5nIGEgbGlzdCBvZiBsaW5rZWQgbm9kZXMsIGJ1dCBpdCBkb2VzIG5vdCBwcm90ZWN0IGFnYWluc3QgbW9kaWZ5aW5nIGluZGl2aWR1YWwgbGlua3MuXG4gKiBJZiB0aGUgY29uc3VtZXIgbW9kaWZpZXMgYSBsaW5rIChzZXRzIHRoZSBwcmV2aW91cyBvciBuZXh0IHZhbHVlKSBpdCB3aWxsIGVmZmVjdGl2ZWx5IGJyZWFrIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIEl0IGlzIHBvc3NpYmxlIHRvIGRlY2xhcmUgYSBub2RlIHR5cGUgb2YgYW55IGtpbmQgYXMgbG9uZyBhcyBpdCBjb250YWlucyBhIHByZXZpb3VzIGFuZCBuZXh0IHZhbHVlIHRoYXQgY2FuIHJlZmVyZW5jZSBhbm90aGVyIG5vZGUuXG4gKiBBbHRob3VnaCBub3QgYXMgc2FmZSBhcyB0aGUgaW5jbHVkZWQgTGlua2VkTGlzdCwgdGhpcyBjbGFzcyBoYXMgbGVzcyBvdmVyaGVhZCBhbmQgaXMgbW9yZSBmbGV4aWJsZS5cbiAqXG4gKiBUaGUgY291bnQgKG9yIGxlbmd0aCkgb2YgdGhpcyBMaW5rZWROb2RlTGlzdCBpcyBub3QgdHJhY2tlZCBzaW5jZSBpdCBjb3VsZCBiZSBjb3JydXB0ZWQgYXQgYW55IHRpbWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaW5rZWROb2RlTGlzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGFzdCA9IG51bGw7XG4gICAgICAgIHRoaXMudW5zYWZlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gMDtcbiAgICB9XG4gICAgYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgICAgIGlmICh2ZXJzaW9uICE9PSB0aGlzLl92ZXJzaW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDb2xsZWN0aW9uIHdhcyBtb2RpZmllZC5cIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZmlyc3Qgbm9kZS4gIFdpbGwgYmUgbnVsbCBpZiB0aGUgY29sbGVjdGlvbiBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBnZXQgZmlyc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGxhc3Qgbm9kZS5cbiAgICAgKi9cbiAgICBnZXQgbGFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGl2ZWx5IGNvdW50cyB0aGUgbnVtYmVyIG9mIGxpbmtlZCBub2RlcyBhbmQgcmV0dXJucyB0aGUgdmFsdWUuXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgY291bnQoKSB7XG4gICAgICAgIGxldCBuZXh0ID0gdGhpcy5fZmlyc3Q7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIG5leHQgPSBuZXh0Lm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uLCBpZ25vcmVWZXJzaW9uaW5nKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgY3VycmVudCA9IG51bGwsIG5leHQgPSBfLmZpcnN0OyAvLyBCZSBzdXJlIHRvIHRyYWNrIHRoZSBuZXh0IG5vZGUgc28gaWYgY3VycmVudCBub2RlIGlzIHJlbW92ZWQuXG4gICAgICAgIGNvbnN0IHZlcnNpb24gPSBfLl92ZXJzaW9uO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoIWlnbm9yZVZlcnNpb25pbmcpXG4gICAgICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcnNpb24pO1xuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBuZXh0ID0gY3VycmVudCAmJiBjdXJyZW50Lm5leHQ7XG4gICAgICAgIH0gd2hpbGUgKGN1cnJlbnRcbiAgICAgICAgICAgICYmIGFjdGlvbihjdXJyZW50LCBpbmRleCsrKSAhPT0gZmFsc2UpO1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIG1hcChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignc2VsZWN0b3InKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMuZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goc2VsZWN0b3Iobm9kZSwgaSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXJhc2VzIHRoZSBsaW5rZWQgbm9kZSdzIHJlZmVyZW5jZXMgdG8gZWFjaCBvdGhlciBhbmQgcmV0dXJucyB0aGUgbnVtYmVyIG9mIG5vZGVzLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgbiwgY0YgPSAwLCBjTCA9IDA7XG4gICAgICAgIC8vIEZpcnN0LCBjbGVhciBpbiB0aGUgZm9yd2FyZCBkaXJlY3Rpb24uXG4gICAgICAgIG4gPSBfLl9maXJzdDtcbiAgICAgICAgXy5fZmlyc3QgPSBudWxsO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgICAgY0YrKztcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gbjtcbiAgICAgICAgICAgIG4gPSBuLm5leHQ7XG4gICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIExhc3QsIGNsZWFyIGluIHRoZSByZXZlcnNlIGRpcmVjdGlvbi5cbiAgICAgICAgbiA9IF8uX2xhc3Q7XG4gICAgICAgIF8uX2xhc3QgPSBudWxsO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgICAgY0wrKztcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gbjtcbiAgICAgICAgICAgIG4gPSBuLnByZXZpb3VzO1xuICAgICAgICAgICAgY3VycmVudC5wcmV2aW91cyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNGICE9PSBjTClcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTGlua2VkTm9kZUxpc3Q6IEZvcndhcmQgdmVyc3VzIHJldmVyc2UgY291bnQgZG9lcyBub3QgbWF0Y2ggd2hlbiBjbGVhcmluZy4gRm9yd2FyZDogJyArIGNGICsgXCIsIFJldmVyc2U6IFwiICsgY0wpO1xuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gY0Y7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgbGlzdC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBsaXN0IHRvIHNlZSBpZiBhIG5vZGUgZXhpc3RzLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnMobm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKG5vZGUpICE9IC0xO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbmRleCBvZiBhIHBhcnRpY3VsYXIgbm9kZS5cbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKi9cbiAgICBnZXROb2RlQXQoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgbmV4dCA9IHRoaXMuX2ZpcnN0O1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChuZXh0ICYmIGkrKyA8IGluZGV4KSB7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dC5uZXh0IHx8IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfVxuICAgIGZpbmQoY29uZGl0aW9uKSB7XG4gICAgICAgIGxldCBub2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5mb3JFYWNoKChuLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZGl0aW9uKG4sIGkpKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG47XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRoZSBsaXN0IHRvIGZpbmQgdGhlIHNwZWNpZmllZCBub2RlIGFuZCByZXR1cm5zIGl0cyBpbmRleC5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGluZGV4T2Yobm9kZSkge1xuICAgICAgICBpZiAobm9kZSAmJiAobm9kZS5wcmV2aW91cyB8fCBub2RlLm5leHQpKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IGMsIG4gPSB0aGlzLl9maXJzdDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBjID0gbjtcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gbm9kZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9IHdoaWxlICgobiA9IGMgJiYgYy5uZXh0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBmaXJzdCBub2RlIGFuZCByZXR1cm5zIHRydWUgaWYgc3VjY2Vzc2Z1bC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVGaXJzdCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZmlyc3QgJiYgdGhpcy5yZW1vdmVOb2RlKHRoaXMuX2ZpcnN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGFzdCBub2RlIGFuZCByZXR1cm5zIHRydWUgaWYgc3VjY2Vzc2Z1bC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVMYXN0KCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9sYXN0ICYmIHRoaXMucmVtb3ZlTm9kZSh0aGlzLl9sYXN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIG5vZGUuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHN1Y2Nlc3NmdWwgYW5kIGZhbHNlIGlmIG5vdCBmb3VuZCAoYWxyZWFkeSByZW1vdmVkKS5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbm9kZScpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcHJldiA9IG5vZGUucHJldmlvdXMgfHwgbnVsbCwgbmV4dCA9IG5vZGUubmV4dCB8fCBudWxsO1xuICAgICAgICBsZXQgYSA9IGZhbHNlLCBiID0gZmFsc2U7XG4gICAgICAgIGlmIChwcmV2KVxuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV4dDtcbiAgICAgICAgZWxzZSBpZiAoXy5fZmlyc3QgPT0gbm9kZSlcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gbmV4dDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYSA9IHRydWU7XG4gICAgICAgIGlmIChuZXh0KVxuICAgICAgICAgICAgbmV4dC5wcmV2aW91cyA9IHByZXY7XG4gICAgICAgIGVsc2UgaWYgKF8uX2xhc3QgPT0gbm9kZSlcbiAgICAgICAgICAgIF8uX2xhc3QgPSBwcmV2O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBiID0gdHJ1ZTtcbiAgICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbignbm9kZScsIGZvcm1hdChcIlByb3ZpZGVkIG5vZGUgaXMgaGFzIG5vIHswfSByZWZlcmVuY2UgYnV0IGlzIG5vdCB0aGUgezF9IG5vZGUhXCIsIGEgPyBcInByZXZpb3VzXCIgOiBcIm5leHRcIiwgYSA/IFwiZmlyc3RcIiA6IFwibGFzdFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9ICFhICYmICFiO1xuICAgICAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICAgICAgXy51bnNhZmVDb3VudC0tO1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IG51bGw7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMge0xpbmtlZE5vZGVMaXN0fVxuICAgICAqL1xuICAgIGFkZE5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLmFkZE5vZGVBZnRlcihub2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBub2RlIGJlZm9yZSB0aGUgc3BlY2lmaWVkICdiZWZvcmUnIG5vZGUuXG4gICAgICogSWYgbm8gJ2JlZm9yZScgbm9kZSBpcyBzcGVjaWZpZWQsIGl0IGluc2VydHMgaXQgYXMgdGhlIGZpcnN0IG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcGFyYW0gYmVmb3JlXG4gICAgICogQHJldHVybnMge0xpbmtlZE5vZGVMaXN0fVxuICAgICAqL1xuICAgIGFkZE5vZGVCZWZvcmUobm9kZSwgYmVmb3JlID0gbnVsbCkge1xuICAgICAgICBhc3NlcnRWYWxpZERldGFjaGVkKG5vZGUpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFiZWZvcmUpIHtcbiAgICAgICAgICAgIGJlZm9yZSA9IF8uX2ZpcnN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChiZWZvcmUpIHtcbiAgICAgICAgICAgIGxldCBwcmV2ID0gYmVmb3JlLnByZXZpb3VzO1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IHByZXY7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBiZWZvcmU7XG4gICAgICAgICAgICBiZWZvcmUucHJldmlvdXMgPSBub2RlO1xuICAgICAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICAgICAgcHJldi5uZXh0ID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChiZWZvcmUgPT0gXy5fZmlyc3QpXG4gICAgICAgICAgICAgICAgXy5fZmlyc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgXy5fZmlyc3QgPSBfLl9sYXN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQrKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBub2RlIGFmdGVyIHRoZSBzcGVjaWZpZWQgJ2FmdGVyJyBub2RlLlxuICAgICAqIElmIG5vICdhZnRlcicgbm9kZSBpcyBzcGVjaWZpZWQsIGl0IGFwcGVuZHMgaXQgYXMgdGhlIGxhc3Qgbm9kZS5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSBhZnRlclxuICAgICAqIEByZXR1cm5zIHtMaW5rZWROb2RlTGlzdH1cbiAgICAgKi9cbiAgICBhZGROb2RlQWZ0ZXIobm9kZSwgYWZ0ZXIgPSBudWxsKSB7XG4gICAgICAgIGFzc2VydFZhbGlkRGV0YWNoZWQobm9kZSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIWFmdGVyKSB7XG4gICAgICAgICAgICBhZnRlciA9IF8uX2xhc3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFmdGVyKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IGFmdGVyLm5leHQ7XG4gICAgICAgICAgICBub2RlLm5leHQgPSBuZXh0O1xuICAgICAgICAgICAgbm9kZS5wcmV2aW91cyA9IGFmdGVyO1xuICAgICAgICAgICAgYWZ0ZXIubmV4dCA9IG5vZGU7XG4gICAgICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgICAgICBuZXh0LnByZXZpb3VzID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChhZnRlciA9PSBfLl9sYXN0KVxuICAgICAgICAgICAgICAgIF8uX2xhc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgXy5fZmlyc3QgPSBfLl9sYXN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgIF8udW5zYWZlQ291bnQrKztcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIGFuZCBleGlzdGluZyBub2RlIGFuZCByZXBsYWNlcyBpdC5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSByZXBsYWNlbWVudFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgcmVwbGFjZShub2RlLCByZXBsYWNlbWVudCkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbm9kZScpO1xuICAgICAgICBpZiAobm9kZSA9PSByZXBsYWNlbWVudClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBhc3NlcnRWYWxpZERldGFjaGVkKHJlcGxhY2VtZW50LCAncmVwbGFjZW1lbnQnKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJlcGxhY2VtZW50LnByZXZpb3VzID0gbm9kZS5wcmV2aW91cztcbiAgICAgICAgcmVwbGFjZW1lbnQubmV4dCA9IG5vZGUubmV4dDtcbiAgICAgICAgaWYgKG5vZGUucHJldmlvdXMpXG4gICAgICAgICAgICBub2RlLnByZXZpb3VzLm5leHQgPSByZXBsYWNlbWVudDtcbiAgICAgICAgaWYgKG5vZGUubmV4dClcbiAgICAgICAgICAgIG5vZGUubmV4dC5wcmV2aW91cyA9IHJlcGxhY2VtZW50O1xuICAgICAgICBpZiAobm9kZSA9PSBfLl9maXJzdClcbiAgICAgICAgICAgIF8uX2ZpcnN0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIGlmIChub2RlID09IF8uX2xhc3QpXG4gICAgICAgICAgICBfLl9sYXN0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIHN0YXRpYyB2YWx1ZUVudW1lcmF0b3JGcm9tKGxpc3QpIHtcbiAgICAgICAgaWYgKCFsaXN0KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignbGlzdCcpO1xuICAgICAgICBsZXQgY3VycmVudCwgbmV4dCwgdmVyc2lvbjtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGFuY2hvci4uLlxuICAgICAgICAgICAgY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgICBuZXh0ID0gbGlzdC5maXJzdDtcbiAgICAgICAgICAgIHZlcnNpb24gPSBsaXN0Ll92ZXJzaW9uO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBsaXN0LmFzc2VydFZlcnNpb24odmVyc2lvbik7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICAgICAgbmV4dCA9IGN1cnJlbnQgJiYgY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGNvcHlWYWx1ZXMobGlzdCwgYXJyYXksIGluZGV4ID0gMCkge1xuICAgICAgICBpZiAobGlzdCAmJiBsaXN0LmZpcnN0KSB7XG4gICAgICAgICAgICBpZiAoIWFycmF5KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5Jyk7XG4gICAgICAgICAgICBsaXN0LmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBhcnJheVtpbmRleCArIGldID0gbm9kZS52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NlcnRWYWxpZERldGFjaGVkKG5vZGUsIHByb3BOYW1lID0gJ25vZGUnKSB7XG4gICAgaWYgKG5vZGUgPT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihwcm9wTmFtZSk7XG4gICAgaWYgKG5vZGUubmV4dCB8fCBub2RlLnByZXZpb3VzKVxuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNhbm5vdCBhZGQgYSBub2RlIHRvIGEgTGlua2VkTm9kZUxpc3QgdGhhdCBpcyBhbHJlYWR5IGxpbmtlZC5cIik7XG59XG5leHBvcnQgZGVmYXVsdCBMaW5rZWROb2RlTGlzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZE5vZGVMaXN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvTGlua2VkTm9kZUxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5jb25zdCBOVUxMID0gXCJudWxsXCIsIEdFVF9TWU1CT0wgPSBcImdldFN5bWJvbFwiLCBHRVRfSEFTSF9DT0RFID0gXCJnZXRIYXNoQ29kZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldElkZW50aWZpZXIob2JqLCB0aHJvd0lmVW5rbm93biA9IGZhbHNlKSB7XG4gICAgaWYgKFR5cGUuaXNQcm9wZXJ0eUtleShvYmopKVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIGlmIChvYmogPT09IG51bGwpXG4gICAgICAgIHJldHVybiBOVUxMO1xuICAgIGlmIChvYmogPT09IFZPSUQwKVxuICAgICAgICByZXR1cm4gVHlwZS5VTkRFRklORUQ7XG4gICAgLy8gU2VlIElTeW1ib2xpemFibGUuXG4gICAgaWYgKFR5cGUuaGFzTWV0aG9kKG9iaiwgR0VUX1NZTUJPTCkpIHtcbiAgICAgICAgcmV0dXJuIG9iai5nZXRTeW1ib2woKTtcbiAgICB9XG4gICAgLy8gU2VlIElIYXNoYWJsZS5cbiAgICBpZiAoVHlwZS5oYXNNZXRob2Qob2JqLCBHRVRfSEFTSF9DT0RFKSkge1xuICAgICAgICByZXR1cm4gb2JqLmdldEhhc2hDb2RlKCk7XG4gICAgfVxuICAgIGlmICh0aHJvd0lmVW5rbm93bikge1xuICAgICAgICBpZiAoVHlwZS5pc0Z1bmN0aW9uKHRocm93SWZVbmtub3duKSlcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0lmVW5rbm93bihvYmopO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aHJvdyBcIkNhbm5vdCBjcmVhdGUga25vd24gaWRlbnRpdHkuXCI7XG4gICAgfVxuICAgIHJldHVybiAodHlwZW9mIG9iai50b1N0cmluZyA9PSBUeXBlLkZVTkNUSU9OKVxuICAgICAgICA/IG9iai50b1N0cmluZygpXG4gICAgICAgIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG59XG5leHBvcnQgZGVmYXVsdCBnZXRJZGVudGlmaWVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2V0SWRlbnRpZmllci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9nZXRJZGVudGlmaWVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tIFwiLi4vRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkJhc2UgfSBmcm9tIFwiLi4vQ29sbGVjdGlvbkJhc2VcIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBleHRyYWN0S2V5VmFsdWUgfSBmcm9tIFwiLi4vLi4vS2V5VmFsdWVFeHRyYWN0XCI7XG5pbXBvcnQgeyBLZXlOb3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9LZXlOb3RGb3VuZEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8vIERlc2lnbiBOb3RlOiBTaG91bGQgRGljdGlvbmFyeUFic3RyYWN0QmFzZSBiZSBJRGlzcG9zYWJsZT9cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5QmFzZSBleHRlbmRzIENvbGxlY3Rpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoc291cmNlKTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfb25WYWx1ZU1vZGlmaWVkKGtleSwgdmFsdWUsIG9sZCkge1xuICAgIH1cbiAgICBfYWRkSW50ZXJuYWwoaXRlbSkge1xuICAgICAgICBpZiAoIWl0ZW0pXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdpdGVtJywgJ0RpY3Rpb25hcmllcyBtdXN0IHVzZSBhIHZhbGlkIGtleS92YWx1ZSBwYWlyLiBcXCcnICsgaXRlbSArICdcXCcgaXMgbm90IGFsbG93ZWQuJyk7XG4gICAgICAgIHJldHVybiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgKGtleSwgdmFsdWUpID0+IHRoaXMuYWRkQnlLZXlWYWx1ZShrZXksIHZhbHVlKSk7XG4gICAgfVxuICAgIF9jbGVhckludGVybmFsKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIF8ua2V5cykge1xuICAgICAgICAgICAgaWYgKF8ucmVtb3ZlQnlLZXkoa2V5KSlcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gICAgY29udGFpbnMoaXRlbSkge1xuICAgICAgICAvLyBTaG91bGQgbmV2ZXIgaGF2ZSBhIG51bGwgb2JqZWN0IGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICBpZiAoIWl0ZW0gfHwgIXRoaXMuZ2V0Q291bnQoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RLZXlWYWx1ZShpdGVtLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gTGVhdmUgYXMgdmFyaWFibGUgZm9yIGRlYnVnZ2luZy4uLlxuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICByZXR1cm4gYXJlRXF1YWwodmFsdWUsIHYpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3JlbW92ZUludGVybmFsKGl0ZW0pIHtcbiAgICAgICAgaWYgKCFpdGVtKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIHJldHVybiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIC8vIExlYXZlIGFzIHZhcmlhYmxlIGZvciBkZWJ1Z2dpbmcuLi5cbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWYWx1ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIChhcmVFcXVhbCh2YWx1ZSwgdikgJiYgdGhpcy5yZW1vdmVCeUtleShrZXkpKVxuICAgICAgICAgICAgICAgID8gMSA6IDA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQga2V5cygpIHsgcmV0dXJuIHRoaXMuZ2V0S2V5cygpOyB9XG4gICAgZ2V0IHZhbHVlcygpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWVzKCk7IH1cbiAgICBhZGRCeUtleVZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBWT0lEMClcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ2Fubm90IGFkZCAndW5kZWZpbmVkJyBhcyBhIHZhbHVlLlwiKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmIChfLmNvbnRhaW5zS2V5KGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ID0gbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJBZGRpbmcgYSBrZXkvdmFsdWUgd2hlbiB0aGUga2V5IGFscmVhZHkgZXhpc3RzLlwiKTtcbiAgICAgICAgICAgIGV4LmRhdGFbJ2tleSddID0ga2V5O1xuICAgICAgICAgICAgZXguZGF0YVsndmFsdWUnXSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhyb3cgZXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8uc2V0VmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIGdldEFzc3VyZWRWYWx1ZShrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gVk9JRDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgS2V5Tm90Rm91bmRFeGNlcHRpb24oYEtleSAnJHtrZXl9JyBub3QgZm91bmQuYCk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdHJ5R2V0VmFsdWUoa2V5LCBvdXQpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gVk9JRDApIHtcbiAgICAgICAgICAgIG91dCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIGFuIGVudHJ5LlxuICAgICAqIEl0J3MgaW1wb3J0YW50IHRvIGtub3cgdGhhdCAndW5kZWZpbmVkJyBjYW5ub3QgZXhpc3QgYXMgYSB2YWx1ZSBpbiB0aGUgZGljdGlvbmFyeSBhbmQgaXMgdXNlZCBhcyBhIGZsYWcgZm9yIHJlbW92YWwuXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHNldFZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgLy8gc2V0VmFsdWUgc2hvdWxkbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgcmVjdXJzaW9uLi4uXG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgb2xkID0gXy5nZXRWYWx1ZShrZXkpOyAvLyBnZXQgdGhlIG9sZCB2YWx1ZSBoZXJlIGFuZCBwYXNzIHRvIGludGVybmFsLlxuICAgICAgICBpZiAoIWFyZUVxdWFsKHZhbHVlLCBvbGQpICYmIF8uX3NldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgXy5fb25WYWx1ZU1vZGlmaWVkKGtleSwgdmFsdWUsIG9sZCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKGNoYW5nZWQpO1xuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG4gICAgY29udGFpbnNLZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2dldEVudHJ5KGtleSk7XG4gICAgfVxuICAgIGNvbnRhaW5zVmFsdWUodmFsdWUpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICB3aGlsZSAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwoZS5jdXJyZW50LCB2YWx1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJlbW92ZUJ5S2V5KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRWYWx1ZShrZXksIFZPSUQwKTtcbiAgICB9XG4gICAgcmVtb3ZlQnlWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIF8uZ2V0S2V5cygpKSB7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwoXy5nZXRWYWx1ZShrZXkpLCB2YWx1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBfLnJlbW92ZUJ5S2V5KGtleSk7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuICAgIGltcG9ydEVudHJpZXMocGFpcnMpIHtcbiAgICAgICAgLy8gQWxsb3cgcGlwaW5nIHRocm91Z2ggdG8gdHJpZ2dlciBvbk1vZGlmaWVkIHByb3Blcmx5LlxuICAgICAgICByZXR1cm4gc3VwZXIuaW1wb3J0RW50cmllcyhwYWlycyk7XG4gICAgfVxuICAgIF9pbXBvcnRFbnRyaWVzKHBhaXJzKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIXBhaXJzKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGxldCBjaGFuZ2VkID0gMDtcbiAgICAgICAgZm9yRWFjaChwYWlycywgcGFpciA9PiBleHRyYWN0S2V5VmFsdWUocGFpciwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChfLl9zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpKVxuICAgICAgICAgICAgICAgIGNoYW5nZWQrKztcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCB2ZXIsIGtleXMsIGxlbiwgaW5kZXggPSAwO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICB2ZXIgPSBfLl92ZXJzaW9uOyAvLyBUcmFjayB0aGUgdmVyc2lvbiBzaW5jZSBnZXRLZXlzIGlzIGEgY29weS5cbiAgICAgICAgICAgIGtleXMgPSBfLmdldEtleXMoKTtcbiAgICAgICAgICAgIGxlbiA9IGtleXMubGVuZ3RoO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIF8uYXNzZXJ0VmVyc2lvbih2ZXIpO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpbmRleCsrXSwgdmFsdWUgPSBfLmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBWT0lEMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBEaWN0aW9uYXJ5QmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURpY3Rpb25hcnlCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRGljdGlvbmFyaWVzL0RpY3Rpb25hcnlCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbi8vIE5lZWQgdG8gc3Bvb2YgdGhpcyBzbyBXZWJQYWNrIGRvZXNuJ3QgcGFuaWMgKHdhcm5pbmdzKS5cbmxldCByO1xudHJ5IHtcbiAgICByID0gZXZhbCgncmVxdWlyZScpO1xufVxuY2F0Y2ggKGV4KSB7IH1cbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuZXhwb3J0IGNvbnN0IGlzQ29tbW9uSlMgPSAhIShyICYmIHIucmVzb2x2ZSk7XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbmV4cG9ydCBjb25zdCBpc1JlcXVpcmVKUyA9ICEhKHIgJiYgci50b1VybCAmJiByLmRlZmluZWQpO1xuLypcbiAqIEVuc3VyZSBpcyBpbiBhIHJlYWwgTm9kZSBlbnZpcm9ubWVudCwgd2l0aCBhIGBwcm9jZXNzLm5leHRUaWNrYC5cbiAqIFRvIHNlZSB0aHJvdWdoIGZha2UgTm9kZSBlbnZpcm9ubWVudHM6XG4gKiBNb2NoYSB0ZXN0IHJ1bm5lciAtIGV4cG9zZXMgYSBgcHJvY2Vzc2AgZ2xvYmFsIHdpdGhvdXQgYSBgbmV4dFRpY2tgXG4gKiBCcm93c2VyaWZ5IC0gZXhwb3NlcyBhIGBwcm9jZXNzLm5leFRpY2tgIGZ1bmN0aW9uIHRoYXQgdXNlc1xuICogYHNldFRpbWVvdXRgLiBJbiB0aGlzIGNhc2UgYHNldEltbWVkaWF0ZWAgaXMgcHJlZmVycmVkIGJlY2F1c2VcbiAqIGl0IGlzIGZhc3Rlci4gQnJvd3NlcmlmeSdzIGBwcm9jZXNzLnRvU3RyaW5nKClgIHlpZWxkc1xuICogXCJbb2JqZWN0IE9iamVjdF1cIiwgd2hpbGUgaW4gYSByZWFsIE5vZGUgZW52aXJvbm1lbnRcbiAqIGBwcm9jZXNzLm5leHRUaWNrKClgIHlpZWxkcyBcIltvYmplY3QgcHJvY2Vzc11cIi5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZUpTID0gdHlwZW9mIHByb2Nlc3MgPT0gXCJvYmplY3RcIlxuICAgICYmIHByb2Nlc3MudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCJcbiAgICAmJiBwcm9jZXNzLm5leHRUaWNrICE9IHZvaWQgMDtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxudHJ5IHtcbiAgICBPYmplY3QuZnJlZXplKGV4cG9ydHMpO1xufVxuY2F0Y2ggKGV4KSB7IH1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVudmlyb25tZW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRW52aXJvbm1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vVHlwZXNcIjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwLCBET1QgPSAnLicsIEtFWSA9ICdrZXknLCBWQUxVRSA9ICd2YWx1ZScsIElURU0gPSAnaXRlbScsIElURU1fMSA9IElURU0gKyAnWzFdJywgSVRFTV9WQUxVRSA9IElURU0gKyBET1QgKyBWQUxVRSwgSU5WQUxJRF9LVlBfTUVTU0FHRSA9ICdJbnZhbGlkIHR5cGUuICBNdXN0IGJlIGEgS2V5VmFsdWVQYWlyIG9yIFR1cGxlIG9mIGxlbmd0aCAyLicsIENBTk5PVF9CRV9VTkRFRklORUQgPSAnQ2Fubm90IGVxdWFsIHVuZGVmaW5lZC4nO1xuZXhwb3J0IGZ1bmN0aW9uIGlzS2V5VmFsdWVQYWlyKGt2cCkge1xuICAgIHJldHVybiBrdnAgJiYga3ZwLmhhc093blByb3BlcnR5KEtFWSkgJiYga3ZwLmhhc093blByb3BlcnR5KFZBTFVFKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRLZXkoa2V5LCBuYW1lID0gSVRFTSkge1xuICAgIGFzc2VydE5vdFVuZGVmaW5lZChrZXksIG5hbWUgKyBET1QgKyBLRVkpO1xuICAgIGlmIChrZXkgPT09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24obmFtZSArIERPVCArIEtFWSk7XG4gICAgcmV0dXJuIGtleTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRUdXBsZSh0dXBsZSwgbmFtZSA9IElURU0pIHtcbiAgICBpZiAodHVwbGUubGVuZ3RoICE9IDIpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihuYW1lLCAnS2V5VmFsdWVQYWlyIHR1cGxlcyBtdXN0IGJlIG9mIGxlbmd0aCAyLicpO1xuICAgIGFzc2VydEtleSh0dXBsZVswXSwgbmFtZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Tm90VW5kZWZpbmVkKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKHZhbHVlID09PSBWT0lEMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKG5hbWUsIENBTk5PVF9CRV9VTkRFRklORUQpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0S2V5VmFsdWUoaXRlbSwgdG8pIHtcbiAgICBsZXQga2V5LCB2YWx1ZTtcbiAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShpdGVtKSkge1xuICAgICAgICBhc3NlcnRUdXBsZShpdGVtKTtcbiAgICAgICAga2V5ID0gaXRlbVswXTtcbiAgICAgICAgdmFsdWUgPSBhc3NlcnROb3RVbmRlZmluZWQoaXRlbVsxXSwgSVRFTV8xKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNLZXlWYWx1ZVBhaXIoaXRlbSkpIHtcbiAgICAgICAga2V5ID0gYXNzZXJ0S2V5KGl0ZW0ua2V5KTtcbiAgICAgICAgdmFsdWUgPSBhc3NlcnROb3RVbmRlZmluZWQoaXRlbS52YWx1ZSwgSVRFTV9WQUxVRSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oSVRFTSwgSU5WQUxJRF9LVlBfTUVTU0FHRSk7XG4gICAgfVxuICAgIHJldHVybiB0byhrZXksIHZhbHVlKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3RLZXlWYWx1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUtleVZhbHVlRXh0cmFjdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0tleVZhbHVlRXh0cmFjdC5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9zeXN0ZW0uY29sbGVjdGlvbnMuZ2VuZXJpYy5LZXlOb3RGb3VuZEV4Y2VwdGlvbih2PXZzLjExMCkuYXNweFxuICovXG5pbXBvcnQgeyBTeXN0ZW1FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9TeXN0ZW1FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdLZXlOb3RGb3VuZEV4Y2VwdGlvbiAnO1xuZXhwb3J0IGNsYXNzIEtleU5vdEZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgU3lzdGVtRXhjZXB0aW9uIHtcbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBLZXlOb3RGb3VuZEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUtleU5vdEZvdW5kRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvS2V5Tm90Rm91bmRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4qIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiogQmFzZWQgVXBvbjogaHR0cDovL3JlZmVyZW5jZXNvdXJjZS5taWNyb3NvZnQuY29tLyNTeXN0ZW0vQ29tcE1vZC9zeXN0ZW0vY29sbGVjdGlvbnMvZ2VuZXJpYy9xdWV1ZS5jc1xuKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiovXG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi9Db21wYXJlXCI7XG5pbXBvcnQgKiBhcyBBVSBmcm9tIFwiLi9BcnJheS9VdGlsaXR5XCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uL1R5cGVzXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uL0ludGVnZXJcIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvTm90SW1wbGVtZW50ZWRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmltcG9ydCB7IENvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4vQ29sbGVjdGlvbkJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5jb25zdCBNSU5JTVVNX0dST1cgPSA0O1xuY29uc3QgU0hSSU5LX1RIUkVTSE9MRCA9IDMyOyAvLyBVbnVzZWQ/XG4vLyB2YXIgR1JPV19GQUNUT1I6IG51bWJlciA9IDIwMDsgIC8vIGRvdWJsZSBlYWNoIHRpbWVcbmNvbnN0IEdST1dfRkFDVE9SX0hBTEYgPSAxMDA7XG5jb25zdCBERUZBVUxUX0NBUEFDSVRZID0gTUlOSU1VTV9HUk9XO1xuY29uc3QgZW1wdHlBcnJheSA9IE9iamVjdC5mcmVlemUoW10pO1xuZXhwb3J0IGNsYXNzIFF1ZXVlIGV4dGVuZHMgQ29sbGVjdGlvbkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgICAgIHN1cGVyKFZPSUQwLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2hlYWQgPSAwO1xuICAgICAgICBfLl90YWlsID0gMDtcbiAgICAgICAgXy5fc2l6ZSA9IDA7XG4gICAgICAgIGlmICghc291cmNlKVxuICAgICAgICAgICAgXy5fYXJyYXkgPSBlbXB0eUFycmF5O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChUeXBlLmlzTnVtYmVyKHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXBhY2l0eSA9IHNvdXJjZTtcbiAgICAgICAgICAgICAgICBhc3NlcnRJbnRlZ2VyWmVyb09yR3JlYXRlcihjYXBhY2l0eSwgXCJjYXBhY2l0eVwiKTtcbiAgICAgICAgICAgICAgICBfLl9hcnJheSA9IGNhcGFjaXR5XG4gICAgICAgICAgICAgICAgICAgID8gQVUuaW5pdGlhbGl6ZShjYXBhY2l0eSlcbiAgICAgICAgICAgICAgICAgICAgOiBlbXB0eUFycmF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2UgPSBzb3VyY2U7XG4gICAgICAgICAgICAgICAgXy5fYXJyYXkgPSBBVS5pbml0aWFsaXplKFR5cGUuaXNBcnJheUxpa2Uoc2UpXG4gICAgICAgICAgICAgICAgICAgID8gc2UubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIDogREVGQVVMVF9DQVBBQ0lUWSk7XG4gICAgICAgICAgICAgICAgXy5faW1wb3J0RW50cmllcyhzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5fY2FwYWNpdHkgPSBfLl9hcnJheS5sZW5ndGg7XG4gICAgfVxuICAgIGdldENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG4gICAgX2FkZEludGVybmFsKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHNpemUgPSBfLl9zaXplO1xuICAgICAgICBsZXQgbGVuID0gXy5fY2FwYWNpdHk7XG4gICAgICAgIGlmIChzaXplID09IGxlbikge1xuICAgICAgICAgICAgbGV0IG5ld0NhcGFjaXR5ID0gbGVuICogR1JPV19GQUNUT1JfSEFMRjtcbiAgICAgICAgICAgIGlmIChuZXdDYXBhY2l0eSA8IGxlbiArIE1JTklNVU1fR1JPVylcbiAgICAgICAgICAgICAgICBuZXdDYXBhY2l0eSA9IGxlbiArIE1JTklNVU1fR1JPVztcbiAgICAgICAgICAgIF8uc2V0Q2FwYWNpdHkobmV3Q2FwYWNpdHkpO1xuICAgICAgICAgICAgbGVuID0gXy5fY2FwYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFpbCA9IF8uX3RhaWw7XG4gICAgICAgIF8uX2FycmF5W3RhaWxdID0gaXRlbTtcbiAgICAgICAgXy5fdGFpbCA9ICh0YWlsICsgMSkgJSBsZW47XG4gICAgICAgIF8uX3NpemUgPSBzaXplICsgMTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgX3JlbW92ZUludGVybmFsKGl0ZW0sIG1heCkge1xuICAgICAgICAvL25vaW5zcGVjdGlvbiBIdG1sVW5rbm93blRhZ1xuICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oXCJJQ29sbGVjdGlvblxcPFRcXD4ucmVtb3ZlIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiBRdWV1ZVxcPFRcXD5cIiArXG4gICAgICAgICAgICBcIiBzaW5jZSBpdCB3b3VsZCByZXF1aXJlIGRlc3Ryb3lpbmcgdGhlIHVuZGVybHlpbmcgYXJyYXkgdG8gcmVtb3ZlIHRoZSBpdGVtLlwiKTtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBhcnJheSA9IF8uX2FycmF5LCBoZWFkID0gXy5faGVhZCwgdGFpbCA9IF8uX3RhaWwsIHNpemUgPSBfLl9zaXplO1xuICAgICAgICBpZiAoaGVhZCA8IHRhaWwpXG4gICAgICAgICAgICBBVS5jbGVhcihhcnJheSwgaGVhZCwgdGFpbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgQVUuY2xlYXIoYXJyYXksIGhlYWQpO1xuICAgICAgICAgICAgQVUuY2xlYXIoYXJyYXksIDAsIHRhaWwpO1xuICAgICAgICB9XG4gICAgICAgIF8uX2hlYWQgPSAwO1xuICAgICAgICBfLl90YWlsID0gMDtcbiAgICAgICAgXy5fc2l6ZSA9IDA7XG4gICAgICAgIF8udHJpbUV4Y2VzcygpO1xuICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKF8uX2FycmF5ICE9IGVtcHR5QXJyYXkpIHtcbiAgICAgICAgICAgIF8uX2FycmF5Lmxlbmd0aCA9IF8uX2NhcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIF8uX2FycmF5ID0gZW1wdHlBcnJheTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXF1ZXVlcyBlbnRyaWVzIGludG8gYW4gYXJyYXkuXG4gICAgICovXG4gICAgZHVtcChtYXggPSBJbmZpbml0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGlmIChpc0Zpbml0ZShtYXgpKSB7XG4gICAgICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIobWF4KTtcbiAgICAgICAgICAgIGlmIChtYXggIT09IDApIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAobWF4LS0gJiYgXy5fdHJ5RGVxdWV1ZUludGVybmFsKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pKSB7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdoaWxlIChfLl90cnlEZXF1ZXVlSW50ZXJuYWwodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH0pKSB7IH1cbiAgICAgICAgfVxuICAgICAgICBfLnRyaW1FeGNlc3MoKTtcbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGZvckVhY2goYWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5mb3JFYWNoKGFjdGlvbiwgdHJ1ZSk7XG4gICAgfVxuICAgIHNldENhcGFjaXR5KGNhcGFjaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBhc3NlcnRJbnRlZ2VyWmVyb09yR3JlYXRlcihjYXBhY2l0eSwgXCJjYXBhY2l0eVwiKTtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBfLl9hcnJheSwgbGVuID0gXy5fY2FwYWNpdHk7XG4gICAgICAgIGlmIChjYXBhY2l0eSA+IGxlbilcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmIChjYXBhY2l0eSA9PSBsZW4pXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY29uc3QgaGVhZCA9IF8uX2hlYWQsIHRhaWwgPSBfLl90YWlsLCBzaXplID0gXy5fc2l6ZTtcbiAgICAgICAgLy8gU3BlY2lhbCBjYXNlIHdoZXJlIHdlIGNhbiBzaW1wbHkgZXh0ZW5kIHRoZSBsZW5ndGggb2YgdGhlIGFycmF5LiAoSmF2YVNjcmlwdCBvbmx5KVxuICAgICAgICBpZiAoYXJyYXkgIT0gZW1wdHlBcnJheSAmJiBjYXBhY2l0eSA+IGxlbiAmJiBoZWFkIDwgdGFpbCkge1xuICAgICAgICAgICAgYXJyYXkubGVuZ3RoID0gXy5fY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgICAgICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIGNyZWF0ZSBhIG5ldyBhcnJheSBiZWNhdXNlIG1vZGlmeWluZyBhbiBleGlzdGluZyBvbmUgY291bGQgYmUgc2xvdy5cbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBBVS5pbml0aWFsaXplKGNhcGFjaXR5KTtcbiAgICAgICAgaWYgKHNpemUgPiAwKSB7XG4gICAgICAgICAgICBpZiAoaGVhZCA8IHRhaWwpIHtcbiAgICAgICAgICAgICAgICBBVS5jb3B5VG8oYXJyYXksIG5ld0FycmF5LCBoZWFkLCAwLCBzaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEFVLmNvcHlUbyhhcnJheSwgbmV3QXJyYXksIGhlYWQsIDAsIGxlbiAtIGhlYWQpO1xuICAgICAgICAgICAgICAgIEFVLmNvcHlUbyhhcnJheSwgbmV3QXJyYXksIDAsIGxlbiAtIGhlYWQsIHRhaWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF8uX2FycmF5ID0gbmV3QXJyYXk7XG4gICAgICAgIF8uX2NhcGFjaXR5ID0gY2FwYWNpdHk7XG4gICAgICAgIF8uX2hlYWQgPSAwO1xuICAgICAgICBfLl90YWlsID0gKHNpemUgPT0gY2FwYWNpdHkpID8gMCA6IHNpemU7XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbih0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVucXVldWUoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQoaXRlbSk7XG4gICAgfVxuICAgIF90cnlEZXF1ZXVlSW50ZXJuYWwob3V0KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIV8uX3NpemUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gXy5fYXJyYXksIGhlYWQgPSBfLl9oZWFkO1xuICAgICAgICBjb25zdCByZW1vdmVkID0gXy5fYXJyYXlbaGVhZF07XG4gICAgICAgIGFycmF5W2hlYWRdID0gbnVsbDtcbiAgICAgICAgXy5faGVhZCA9IChoZWFkICsgMSkgJSBfLl9jYXBhY2l0eTtcbiAgICAgICAgXy5fc2l6ZS0tO1xuICAgICAgICBfLl9pbmNyZW1lbnRNb2RpZmllZCgpO1xuICAgICAgICBvdXQocmVtb3ZlZCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBkZXF1ZXVlKHRocm93SWZFbXB0eSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFZPSUQwO1xuICAgICAgICBpZiAoIXRoaXMudHJ5RGVxdWV1ZSh2YWx1ZSA9PiB7IHJlc3VsdCA9IHZhbHVlOyB9KSAmJiB0aHJvd0lmRW1wdHkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNhbm5vdCBkZXF1ZXVlIGFuIGVtcHR5IHF1ZXVlLlwiKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgcXVldWUgaGFzIGVudHJpZXMgYW4gcHVsbHMgYW4gZW50cnkgZnJvbSB0aGUgaGVhZCBvZiB0aGUgcXVldWUgYW5kIHBhc3NlcyBpdCB0byB0aGUgb3V0IGhhbmRsZXIuXG4gICAgICogQHBhcmFtIG91dCBUaGUgJ291dCcgaGFuZGxlciB0aGF0IHJlY2VpdmVzIHRoZSB2YWx1ZSBpZiBpdCBleGlzdHMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgYSB2YWx1ZSB3YXMgcmV0cmlldmVkLiAgRmFsc2UgaWYgbm90LlxuICAgICAqL1xuICAgIHRyeURlcXVldWUob3V0KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIV8uX3NpemUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICAvLyBBIHNpbmdsZSBkZXF1ZXVlIHNob3VsZG4ndCBuZWVkIHVwZGF0ZSByZWN1cnNpb24gdHJhY2tpbmcuLi5cbiAgICAgICAgaWYgKHRoaXMuX3RyeURlcXVldWVJbnRlcm5hbChvdXQpKSB7XG4gICAgICAgICAgICAvLyBUaGlzIG1heSBwcmVlbXB0aXZlbHkgdHJpZ2dlciB0aGUgX29uTW9kaWZpZWQuXG4gICAgICAgICAgICBpZiAoXy5fc2l6ZSA8IF8uX2NhcGFjaXR5IC8gMilcbiAgICAgICAgICAgICAgICBfLnRyaW1FeGNlc3MoU0hSSU5LX1RIUkVTSE9MRCk7XG4gICAgICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgX2dldEVsZW1lbnQoaW5kZXgpIHtcbiAgICAgICAgYXNzZXJ0SW50ZWdlclplcm9PckdyZWF0ZXIoaW5kZXgsIFwiaW5kZXhcIik7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICByZXR1cm4gXy5fYXJyYXlbKF8uX2hlYWQgKyBpbmRleCkgJSBfLl9jYXBhY2l0eV07XG4gICAgfVxuICAgIHBlZWsodGhyb3dJZkVtcHR5ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpemUgPT0gMCkge1xuICAgICAgICAgICAgaWYgKHRocm93SWZFbXB0eSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNhbm5vdCBjYWxsIHBlZWsgb24gYW4gZW1wdHkgcXVldWUuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFZPSUQwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9hcnJheVt0aGlzLl9oZWFkXTtcbiAgICB9XG4gICAgdHJpbUV4Y2Vzcyh0aHJlc2hvbGQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHNpemUgPSBfLl9zaXplO1xuICAgICAgICBpZiAoc2l6ZSA8IE1hdGguZmxvb3IoXy5fY2FwYWNpdHkgKiAwLjkpICYmICghdGhyZXNob2xkICYmIHRocmVzaG9sZCAhPT0gMCB8fCBpc05hTih0aHJlc2hvbGQpIHx8IHRocmVzaG9sZCA8IHNpemUpKVxuICAgICAgICAgICAgXy5zZXRDYXBhY2l0eShzaXplKTtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBpbmRleCwgdmVyc2lvbiwgc2l6ZTtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gXy5fdmVyc2lvbjtcbiAgICAgICAgICAgIHNpemUgPSBfLl9zaXplO1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIF8uYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBzaXplKVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKF8uX2dldEVsZW1lbnQoaW5kZXgrKykpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NlcnRaZXJvT3JHcmVhdGVyKHZhbHVlLCBwcm9wZXJ0eSkge1xuICAgIGlmICh2YWx1ZSA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24ocHJvcGVydHksIHZhbHVlLCBcIk11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm9cIik7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBhc3NlcnRJbnRlZ2VyWmVyb09yR3JlYXRlcih2YWx1ZSwgcHJvcGVydHkpIHtcbiAgICBJbnRlZ2VyLmFzc2VydCh2YWx1ZSwgcHJvcGVydHkpO1xuICAgIHJldHVybiBhc3NlcnRaZXJvT3JHcmVhdGVyKHZhbHVlLCBwcm9wZXJ0eSk7XG59XG5leHBvcnQgZGVmYXVsdCBRdWV1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvUXVldWUuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi8uLi9UeXBlc1wiO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuLi8uLi9JbnRlZ2VyXCI7XG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZSB9IGZyb20gXCIuL2luaXRpYWxpemVcIjtcbmltcG9ydCB7IGNvcHksIGNvcHlUbyB9IGZyb20gXCIuL2NvcHlcIjtcbmV4cG9ydCB7IGluaXRpYWxpemUsIGNvcHksIGNvcHlUbyB9O1xuY29uc3QgQ0JOID0gJ0Nhbm5vdCBiZSBudWxsLicsIENCMCA9ICdDYW5ub3QgYmUgemVyby4nLCBDQkwwID0gJ0Nhbm5vdCBiZSBsZXNzIHRoYW4gemVyby4nLCBWRk4gPSAnTXVzdCBiZSBhIHZhbGlkIGZpbml0ZSBudW1iZXInO1xuLyoqXG4gKiBDaGVja3MgdG8gc2VlIHdoZXJlIHRoZSBwcm92aWRlZCBhcnJheSBjb250YWlucyBhbiBpdGVtL3ZhbHVlLlxuICogSWYgdGhlIGFycmF5IHZhbHVlIGlzIG51bGwsIHRoZW4gLTEgaXMgcmV0dXJuZWQuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBpdGVtXG4gKiBAcGFyYW0ge2Z1bmN0aW9uP30gZXF1YWxpdHlDb21wYXJlclxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgIGNvbnN0IGxlbiA9IGFycmF5ICYmIGFycmF5Lmxlbmd0aDtcbiAgICBpZiAobGVuKSB7XG4gICAgICAgIC8vIE5hTiBORVZFUiBldmFsdWF0ZXMgaXRzIGVxdWFsaXR5IHNvIGJlIGNhcmVmdWwuXG4gICAgICAgIGlmICgoYXJyYXkpIGluc3RhbmNlb2YgKEFycmF5KSAmJiAhVHlwZS5pc1RydWVOYU4oaXRlbSkpXG4gICAgICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgLy8gJ2FyZUVxdWFsJyBpbmNsdWRlcyBOYU49PU5hTiBldmFsdWF0aW9uLlxuICAgICAgICAgICAgaWYgKGVxdWFsaXR5Q29tcGFyZXIoYXJyYXlbaV0sIGl0ZW0pKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbi8qKlxuICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgcHJvdmlkZWQgYXJyYXkgY29udGFpbnMgYW4gaXRlbS5cbiAqIElmIHRoZSBhcnJheSB2YWx1ZSBpcyBudWxsLCB0aGVuIGZhbHNlIGlzIHJldHVybmVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gaXRlbVxuICogQHBhcmFtIHtmdW5jdGlvbj99IGVxdWFsaXR5Q29tcGFyZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyKSAhPSAtMTtcbn1cbi8qKlxuICogRmluZHMgYW5kIHJlcGxhY2VzIGEgdmFsdWUgZnJvbSBhbiBhcnJheS4gIFdpbGwgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyB1bmxlc3MgYSBtYXhpbXVtIGlzIHNwZWNpZmllZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIG9sZFxuICogQHBhcmFtIG5ld1ZhbHVlXG4gKiBAcGFyYW0gbWF4XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShhcnJheSwgb2xkLCBuZXdWYWx1ZSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIWFycmF5IHx8ICFhcnJheS5sZW5ndGggfHwgbWF4ID09PSAwKVxuICAgICAgICByZXR1cm4gMDtcbiAgICBpZiAobWF4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbWF4JywgbWF4LCBDQkwwKTtcbiAgICBpZiAoIW1heClcbiAgICAgICAgbWF4ID0gSW5maW5pdHk7IC8vIGp1c3QgaW4gY2FzZS5cbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlbaV0gPT09IG9sZCkge1xuICAgICAgICAgICAgYXJyYXlbaV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICBpZiAoY291bnQgPT0gbWF4KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbn1cbi8qKlxuICogUmVwbGFjZXMgdmFsdWVzIG9mIGFuIGFycmF5IGFjcm9zcyBhIHJhbmdlIG9mIGluZGV4ZXMuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIHN0YXJ0XG4gKiBAcGFyYW0gc3RvcFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUmFuZ2UoYXJyYXksIHZhbHVlLCBzdGFydCA9IDAsIHN0b3ApIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICByZXR1cm47XG4gICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKHN0YXJ0LCAnc3RhcnQnKTtcbiAgICBpZiAoIXN0b3AgJiYgc3RvcCAhPT0gMClcbiAgICAgICAgc3RvcCA9IGFycmF5Lmxlbmd0aDtcbiAgICBJbnRlZ2VyLmFzc2VydChzdG9wLCAnc3RvcCcpO1xuICAgIGlmIChzdG9wIDwgc3RhcnQpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdG9wXCIsIHN0b3AsIFwiaXMgbGVzcyB0aGFuIHN0YXJ0XCIpO1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHN0b3A7IGkrKykge1xuICAgICAgICBhcnJheVtpXSA9IHZhbHVlO1xuICAgIH1cbn1cbi8qKlxuICogQ2xlYXJzIChzZXRzIHRvIG51bGwpIHZhbHVlcyBvZiBhbiBhcnJheSBhY3Jvc3MgYSByYW5nZSBvZiBpbmRleGVzLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gc3RhcnRcbiAqIEBwYXJhbSBzdG9wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcihhcnJheSwgc3RhcnQgPSAwLCBzdG9wKSB7XG4gICAgdXBkYXRlUmFuZ2UoYXJyYXksIG51bGwsIHN0YXJ0LCBzdG9wKTtcbn1cbi8qKlxuICogRW5zdXJlcyBhIHZhbHVlIGV4aXN0cyB3aXRoaW4gYW4gYXJyYXkuICBJZiBub3QgZm91bmQsIGFkZHMgdG8gdGhlIGVuZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGl0ZW1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKGFycmF5LCBpdGVtLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScsIENCTik7XG4gICAgbGV0IGxlbiA9IGFycmF5Lmxlbmd0aDsgLy8gYXZvaWQgcXVlcnlpbmcgLmxlbmd0aCBtb3JlIHRoYW4gb25jZS4gKlxuICAgIGNvbnN0IG9rID0gIWxlbiB8fCAhY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgIGlmIChvaylcbiAgICAgICAgYXJyYXlbbGVuXSA9IGl0ZW07IC8vICogcHVzaCB3b3VsZCBxdWVyeSBsZW5ndGggYWdhaW4uXG4gICAgcmV0dXJuIG9rO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBpbmRleCBvZiB3aGljaCB0aGUgcHJvdmlkZWQgcHJlZGljYXRlIHJldHVybnMgdHJ1ZS5cbiAqIFJldHVybnMgLTEgaWYgYWx3YXlzIGZhbHNlLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gcHJlZGljYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgICBpZiAoIWFycmF5KVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdhcnJheScsIENCTik7XG4gICAgaWYgKCFUeXBlLmlzRnVuY3Rpb24ocHJlZGljYXRlKSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCdwcmVkaWNhdGUnLCAnTXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIGNvbnN0IGxlbiA9IGFycmF5Lmxlbmd0aDtcbiAgICBpZiAoIVR5cGUuaXNOdW1iZXIobGVuLCB0cnVlKSB8fCBsZW4gPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oJ2FycmF5JywgJ0RvZXMgbm90IGhhdmUgYSB2YWxpZCBsZW5ndGguJyk7XG4gICAgaWYgKChhcnJheSkgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaV0sIGkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKGkpIGluIChhcnJheSkgJiYgcHJlZGljYXRlKGFycmF5W2ldLCBpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChzb3VyY2UsIGFjdGlvbikge1xuICAgIGlmIChzb3VyY2UgJiYgYWN0aW9uKSB7XG4gICAgICAgIC8vIERvbid0IGNhY2hlIHRoZSBsZW5ndGggc2luY2UgaXQgaXMgcG9zc2libGUgdGhhdCB0aGUgdW5kZXJseWluZyBhcnJheSBjaGFuZ2VkLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFjdGlvbihzb3VyY2VbaV0sIGkpID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSXMgc2ltaWxhciB0byBBcnJheS5tYXAoKSBidXQgaW5zdGVhZCBvZiByZXR1cm5pbmcgYSBuZXcgYXJyYXksIGl0IHVwZGF0ZXMgdGhlIGV4aXN0aW5nIGluZGV4ZXMuXG4gKiBDYW4gYWxzbyBiZSBhcHBsaWVkIHRvIGEgc3RydWN0dXJlIHRoYXQgaW5kZXhlcyBsaWtlIGFuIGFycmF5LCBidXQgbWF5IG5vdCBiZS5cbiAqIEBwYXJhbSB0YXJnZXRcbiAqIEBwYXJhbSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlUbyh0YXJnZXQsIGZuKSB7XG4gICAgaWYgKHRhcmdldCAmJiBmbikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFyZ2V0W2ldID0gZm4odGFyZ2V0W2ldLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogUmVtb3ZlcyBhbiBlbnRyeSBhdCBhIHNwZWNpZmllZCBpbmRleC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgd2FzIGFibGUgdG8gYmUgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUluZGV4KGFycmF5LCBpbmRleCkge1xuICAgIGlmICghYXJyYXkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5JywgQ0JOKTtcbiAgICBJbnRlZ2VyLmFzc2VydChpbmRleCwgJ2luZGV4Jyk7XG4gICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignaW5kZXgnLCBpbmRleCwgQ0JMMCk7XG4gICAgY29uc3QgZXhpc3RzID0gaW5kZXggPCBhcnJheS5sZW5ndGg7XG4gICAgaWYgKGV4aXN0cylcbiAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gZXhpc3RzO1xufVxuLyoqXG4gKiBGaW5kcyBhbmQgcmVtb3ZlcyBhIHZhbHVlIGZyb20gYW4gYXJyYXkuICBXaWxsIHJlbW92ZSBhbGwgaW5zdGFuY2VzIHVubGVzcyBhIG1heGltdW0gaXMgc3BlY2lmaWVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBtYXhcbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoZSB2YWx1ZSB3YXMgZm91bmQgYW5kIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUoYXJyYXksIHZhbHVlLCBtYXggPSBJbmZpbml0eSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgaWYgKCFhcnJheSB8fCAhYXJyYXkubGVuZ3RoIHx8IG1heCA9PT0gMClcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKG1heCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ21heCcsIG1heCwgQ0JMMCk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAoIW1heCB8fCAhaXNGaW5pdGUobWF4KSkge1xuICAgICAgICAvLyBEb24ndCB0cmFjayB0aGUgaW5kZXhlcyBhbmQgcmVtb3ZlIGluIHJldmVyc2UuXG4gICAgICAgIGZvciAobGV0IGkgPSAoYXJyYXkubGVuZ3RoIC0gMSk7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxpdHlDb21wYXJlcihhcnJheVtpXSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFNpbmNlIHRoZSB1c2VyIHdpbGwgZXhwZWN0IGl0IHRvIGhhcHBlbiBpbiBmb3J3YXJkIG9yZGVyLi4uXG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107IC8vIGluZGV4ZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGVxdWFsaXR5Q29tcGFyZXIoYXJyYXlbaV0sIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGZvdW5kLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gbWF4KVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gZm91bmQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShmb3VuZFtpXSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufVxuLyoqXG4gKiBTaW1wbHkgcmVwZWF0cyBhIHZhbHVlIHRoZSBudW1iZXIgb2YgdGltZXMgc3BlY2lmaWVkLlxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEBwYXJhbSBjb3VudFxuICogQHJldHVybnMge1RbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdChlbGVtZW50LCBjb3VudCkge1xuICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCAnY291bnQnKTtcbiAgICBpZiAoY291bnQgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCBDQkwwKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0aWFsaXplKGNvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gZWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHJhbmdlIG9mIG51bWJlcnMgYmFzZWQgdXBvbiB0aGUgZmlyc3QgdmFsdWUgYW5kIHRoZSBzdGVwIHZhbHVlLlxuICogQHBhcmFtIGZpcnN0XG4gKiBAcGFyYW0gY291bnRcbiAqIEBwYXJhbSBzdGVwXG4gKiBAcmV0dXJucyB7bnVtYmVyW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5nZShmaXJzdCwgY291bnQsIHN0ZXAgPSAxKSB7XG4gICAgaWYgKGlzTmFOKGZpcnN0KSB8fCAhaXNGaW5pdGUoZmlyc3QpKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdmaXJzdCcsIGZpcnN0LCBWRk4pO1xuICAgIGlmIChpc05hTihjb3VudCkgfHwgIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignY291bnQnLCBjb3VudCwgVkZOKTtcbiAgICBpZiAoY291bnQgPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCBDQkwwKTtcbiAgICBjb25zdCByZXN1bHQgPSBpbml0aWFsaXplKGNvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gZmlyc3Q7XG4gICAgICAgIGZpcnN0ICs9IHN0ZXA7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIFJldHVybnMgYSByYW5nZSBvZiBudW1iZXJzIGJhc2VkIHVwb24gdGhlIGZpcnN0IHZhbHVlIGFuZCB0aGUgc3RlcCB2YWx1ZSBleGNsdWRpbmcgYW55IG51bWJlcnMgYXQgb3IgYmV5b25kIHRoZSB1bnRpbCB2YWx1ZS5cbiAqIEBwYXJhbSBmaXJzdFxuICogQHBhcmFtIHVudGlsXG4gKiBAcGFyYW0gc3RlcFxuICogQHJldHVybnMge251bWJlcltdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VVbnRpbChmaXJzdCwgdW50aWwsIHN0ZXAgPSAxKSB7XG4gICAgaWYgKHN0ZXAgPT0gMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignc3RlcCcsIHN0ZXAsIENCMCk7XG4gICAgcmV0dXJuIHJhbmdlKGZpcnN0LCAodW50aWwgLSBmaXJzdCkgLyBzdGVwLCBzdGVwKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkaXN0aW5jdChzb3VyY2UpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIFtdOyAvLyBBbGxvd2luZyBmb3IgbnVsbCBmYWNpbGl0YXRlcyByZWdleCBmaWx0ZXJpbmcuXG4gICAgY29uc3Qgc2VlbiA9IHt9O1xuICAgIHJldHVybiBzb3VyY2UuZmlsdGVyKGUgPT4gIShlIGluIHNlZW4pICYmIChzZWVuW2VdID0gdHJ1ZSkpO1xufVxuLyoqXG4gKiBUYWtlcyBhbnkgYXJyYXlzIHdpdGhpbiBhbiBhcnJheSBhbmQgaW5zZXJ0cyB0aGUgdmFsdWVzIGNvbnRhaW5lZCB3aXRoaW4gaW4gcGxhY2Ugb2YgdGhhdCBhcnJheS5cbiAqIEZvciBldmVyeSBjb3VudCBoaWdoZXIgdGhhbiAwIGluIHJlY3Vyc2VEZXB0aCBpdCB3aWxsIGF0dGVtcHQgYW4gYWRkaXRpb25hbCBwYXNzLiAgUGFzc2luZyBJbmZpbml0eSB3aWxsIGZsYXR0ZW4gYWxsIGFycmF5cyBjb250YWluZWQuXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIHJlY3Vyc2VEZXB0aFxuICogQHJldHVybnMge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhLCByZWN1cnNlRGVwdGggPSAwKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB4ID0gYVtpXTtcbiAgICAgICAgaWYgKCh4KSBpbnN0YW5jZW9mIChBcnJheSkpIHtcbiAgICAgICAgICAgIGlmIChyZWN1cnNlRGVwdGggPiAwKVxuICAgICAgICAgICAgICAgIHggPSBmbGF0dGVuKHgsIHJlY3Vyc2VEZXB0aCAtIDEpO1xuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB4Lmxlbmd0aDsgbisrKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHhbbl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbGl0eS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L1V0aWxpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4vU3lzdGVtRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnTm90SW1wbGVtZW50ZWRFeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIE5vdEltcGxlbWVudGVkRXhjZXB0aW9uIGV4dGVuZHMgU3lzdGVtRXhjZXB0aW9uIHtcbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5vdEltcGxlbWVudGVkRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9Ob3RJbXBsZW1lbnRlZEV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgKiBhcyBWYWx1ZXMgZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IFNvcnRDb250ZXh0IH0gZnJvbSBcIi4vU29ydENvbnRleHRcIjtcbmltcG9ydCB7IEZ1bmN0aW9ucyB9IGZyb20gXCIuLi8uLi9GdW5jdGlvbnNcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIEtleVNvcnRlZENvbnRleHQgZXh0ZW5kcyBTb3J0Q29udGV4dCB7XG4gICAgY29uc3RydWN0b3IobmV4dCwgX2tleVNlbGVjdG9yLCBvcmRlciA9IDEgLyogQXNjZW5kaW5nICovLCBjb21wYXJlciA9IFZhbHVlcy5jb21wYXJlKSB7XG4gICAgICAgIHN1cGVyKG5leHQsIGNvbXBhcmVyLCBvcmRlcik7XG4gICAgICAgIHRoaXMuX2tleVNlbGVjdG9yID0gX2tleVNlbGVjdG9yO1xuICAgIH1cbiAgICBjb21wYXJlKGEsIGIpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBrcyA9IF8uX2tleVNlbGVjdG9yO1xuICAgICAgICBpZiAoIWtzIHx8IGtzID09IEZ1bmN0aW9ucy5JZGVudGl0eSlcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5jb21wYXJlKGEsIGIpO1xuICAgICAgICAvLyBXZSBmb3JjZSA8YW55PiBoZXJlIHNpbmNlIGl0IGNhbiBiZSBhIFByaW1pdGl2ZSBvciBJQ29tcGFyYWJsZTxhbnk+XG4gICAgICAgIGNvbnN0IGQgPSBWYWx1ZXMuY29tcGFyZShrcyhhKSwga3MoYikpO1xuICAgICAgICBpZiAoZCA9PSAwICYmIF8uX25leHQpXG4gICAgICAgICAgICByZXR1cm4gXy5fbmV4dC5jb21wYXJlKGEsIGIpO1xuICAgICAgICByZXR1cm4gXy5fb3JkZXIgKiBkO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEtleVNvcnRlZENvbnRleHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1LZXlTb3J0ZWRDb250ZXh0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvU29ydGluZy9LZXlTb3J0ZWRDb250ZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCAqIGFzIFZhbHVlcyBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuZXhwb3J0IGNsYXNzIFNvcnRDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihfbmV4dCwgX2NvbXBhcmVyID0gVmFsdWVzLmNvbXBhcmUsIF9vcmRlciA9IDEgLyogQXNjZW5kaW5nICovKSB7XG4gICAgICAgIHRoaXMuX25leHQgPSBfbmV4dDtcbiAgICAgICAgdGhpcy5fY29tcGFyZXIgPSBfY29tcGFyZXI7XG4gICAgICAgIHRoaXMuX29yZGVyID0gX29yZGVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXJlY3Rpb24gb2YgdGhlIGNvbXBhcmlzb24uXG4gICAgICogQHR5cGUge09yZGVyfVxuICAgICAqL1xuICAgIGdldCBvcmRlcigpIHsgcmV0dXJuIHRoaXMuX29yZGVyOyB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGFuIGFycmF5IG9mIGluZGV4ZXMgZnJvbSB0aGUgc291cmNlIGluIG9yZGVyIG9mIHRoZWlyIGV4cGVjdGVkIGludGVybmFsU29ydCB3aXRob3V0IG1vZGlmeWluZyB0aGUgc291cmNlLlxuICAgICAqIEBwYXJhbSBzb3VyY2VcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XG4gICAgICovXG4gICAgZ2VuZXJhdGVTb3J0ZWRJbmRleGVzKHNvdXJjZSkge1xuICAgICAgICBpZiAoc291cmNlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHNvdXJjZS5tYXAoKHMsIGkpID0+IGkpO1xuICAgICAgICByZXN1bHQuc29ydCgoYSwgYikgPT4gdGhpcy5jb21wYXJlKHNvdXJjZVthXSwgc291cmNlW2JdKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXBhcmVzIHR3byB2YWx1ZXMgYmFzZWQgdXBvbiBTb3J0Q29udGV4dCBwYXJhbWV0ZXJzLlxuICAgICAqIEBwYXJhbSBhXG4gICAgICogQHBhcmFtIGJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGNvbXBhcmUoYSwgYikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZCA9IF8uX2NvbXBhcmVyKGEsIGIpO1xuICAgICAgICBpZiAoZCA9PSAwICYmIF8uX25leHQpXG4gICAgICAgICAgICByZXR1cm4gXy5fbmV4dC5jb21wYXJlKGEsIGIpO1xuICAgICAgICByZXR1cm4gXy5fb3JkZXIgKiBkO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNvcnRDb250ZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U29ydENvbnRleHQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9Tb3J0aW5nL1NvcnRDb250ZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVRcbiAqL1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gXCIuL0ludGVnZXJcIjtcbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi9Db2xsZWN0aW9ucy9BcnJheS9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBzaHVmZmxlIGFzIGFycmF5U2h1ZmZsZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25zL0FycmF5L3NodWZmbGVcIjtcbnZhciBhc3NlcnQgPSBJbnRlZ2VyLmFzc2VydDtcbi8qKlxuICogVGhpcyBtb2R1bGUgb25seSBhY3RzIGFzIGEgdXRpbGl0eSBBUEkgZm9yIGdldHRpbmcgcmFuZG9tIG51bWJlcnMgZnJvbSBNYXRoLnJhbmRvbSgpLlxuICogSWYgeW91IG5lZWQgcmVwZWF0YWJsZSBzZWVkZWQgcmFuZG9tIG51bWJlcnMgdGhlbiB5b3UnbGwgbmVlZCBhIHNlcGFyYXRlIHV0aWxpdHkuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9ja2tuaWdodC9yYW5kb20tanMgd2hpY2ggaGFzIHR5cGluZ3MgdW5kZXIgQHR5cGVzL3JhbmRvbS1qcy5cbiAqL1xuZXhwb3J0IHZhciBSYW5kb207XG4oZnVuY3Rpb24gKFJhbmRvbSkge1xuICAgIGZ1bmN0aW9uIHIobWF4RXhjbHVzaXZlID0gMSkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4RXhjbHVzaXZlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbnIoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICBjb25zdCBhID0gTWF0aC5hYnMoYm91bmRhcnkpO1xuICAgICAgICBpZiAoYSA9PT0gMCB8fCBhID09PSAxICYmICFpbmNsdXNpdmUpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgaWYgKGluY2x1c2l2ZSlcbiAgICAgICAgICAgIGJvdW5kYXJ5ICs9IGJvdW5kYXJ5IC8gYTtcbiAgICAgICAgcmV0dXJuIHIoYm91bmRhcnkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcnJheUNvcHkoc291cmNlKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGluaXRpYWxpemUobGVuKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBmcm9tIDAgdG8gdGhlIG1heEV4Y2x1c2l2ZS5cbiAgICAgKiBOZWdhdGl2ZSBudW1iZXJzIGFyZSBhbGxvd2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1heEV4Y2x1c2l2ZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gaW50ZWdlcihtYXhFeGNsdXNpdmUpIHtcbiAgICAgICAgcmV0dXJuIG5leHQobWF4RXhjbHVzaXZlKTtcbiAgICB9XG4gICAgUmFuZG9tLmludGVnZXIgPSBpbnRlZ2VyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyByYW5kb20gZmxvYXRpbmcgcG9pbnQgbnVtYmVycyB1cCB0byB0aGUgbWF4RXhjbHVzaXZlIHZhbHVlLlxuICAgICAqIFVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBhIHJhbmRvbSBhbmQgbWVtb2l6YWJsZSBzZXQgZm9yIHVzZSB3aXRoIG90aGVyIGVudW1lcmFibGVzLlxuICAgICAqIEBwYXJhbSBtYXhFeGNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7KCk9Pm51bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZShtYXhFeGNsdXNpdmUgPSAxKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiByKG1heEV4Y2x1c2l2ZSk7XG4gICAgfVxuICAgIFJhbmRvbS5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xuICAgIChmdW5jdGlvbiAoZ2VuZXJhdGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyByYW5kb20gaW50ZWdlcnMgdXAgdG8gdGhlIGJvdW5kYXJ5LlxuICAgICAgICAgKiBVc2VmdWwgZm9yIGdlbmVyYXRpbmcgYSByYW5kb20gYW5kIG1lbW9pemFibGUgc2V0IGZvciB1c2Ugd2l0aCBvdGhlciBlbnVtZXJhYmxlcy5cbiAgICAgICAgICogQHBhcmFtIGJvdW5kYXJ5XG4gICAgICAgICAqIEBwYXJhbSBpbmNsdXNpdmVcbiAgICAgICAgICogQHJldHVybnMgeygpPT5udW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBpbnRlZ2Vycyhib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2VuZXJhdGUuaW50ZWdlcnMgPSBpbnRlZ2VycztcbiAgICB9KShnZW5lcmF0ZSA9IFJhbmRvbS5nZW5lcmF0ZSB8fCAoUmFuZG9tLmdlbmVyYXRlID0ge30pKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgZnJvbSAwIHRvIHRoZSBib3VuZGFyeS5cbiAgICAgKiBSZXR1cm4gdmFsdWUgd2lsbCBiZSBsZXNzIHRoYW4gdGhlIGJvdW5kYXJ5IHVubGVzcyBpbmNsdXNpdmUgaXMgc2V0IHRvIHRydWUuXG4gICAgICogTmVnYXRpdmUgbnVtYmVycyBhcmUgYWxsb3dlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBib3VuZGFyeVxuICAgICAqIEBwYXJhbSBpbmNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5leHQoYm91bmRhcnksIGluY2x1c2l2ZSkge1xuICAgICAgICBhc3NlcnQoYm91bmRhcnksICdib3VuZGFyeScpO1xuICAgICAgICByZXR1cm4gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgfVxuICAgIFJhbmRvbS5uZXh0ID0gbmV4dDtcbiAgICAoZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgZnVuY3Rpb24gaW50ZWdlcihib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gUmFuZG9tLm5leHQoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5pbnRlZ2VyID0gaW50ZWdlcjtcbiAgICAgICAgZnVuY3Rpb24gZmxvYXQoYm91bmRhcnkgPSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4oYm91bmRhcnkpKVxuICAgICAgICAgICAgICAgIHRocm93IFwiJ2JvdW5kYXJ5JyBpcyBub3QgYSBudW1iZXIuXCI7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIGJvdW5kYXJ5O1xuICAgICAgICB9XG4gICAgICAgIG5leHQuZmxvYXQgPSBmbG9hdDtcbiAgICAgICAgZnVuY3Rpb24gaW5SYW5nZShtaW4sIG1heCwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICBhc3NlcnQobWluLCAnbWluJyk7XG4gICAgICAgICAgICBhc3NlcnQobWF4LCAnbWF4Jyk7XG4gICAgICAgICAgICBsZXQgcmFuZ2UgPSBtYXggLSBtaW47XG4gICAgICAgICAgICBpZiAocmFuZ2UgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgICAgIGlmIChpbmNsdXNpdmUpXG4gICAgICAgICAgICAgICAgcmFuZ2UgKz0gcmFuZ2UgLyBNYXRoLmFicyhyYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gbWluICsgcihyYW5nZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5pblJhbmdlID0gaW5SYW5nZTtcbiAgICB9KShuZXh0ID0gUmFuZG9tLm5leHQgfHwgKFJhbmRvbS5uZXh0ID0ge30pKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHJhbmRvbSBpbnRlZ2Vycy5cbiAgICAgKiBAcGFyYW0gY291bnRcbiAgICAgKiBAcGFyYW0gYm91bmRhcnlcbiAgICAgKiBAcGFyYW0gaW5jbHVzaXZlXG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGludGVnZXJzKGNvdW50LCBib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgIGFzc2VydChjb3VudCk7XG4gICAgICAgIGNvbnN0IHMgPSBbXTtcbiAgICAgICAgcy5sZW5ndGggPSBjb3VudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBzW2ldID0gbnIoYm91bmRhcnksIGluY2x1c2l2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIFJhbmRvbS5pbnRlZ2VycyA9IGludGVnZXJzO1xuICAgIC8qKlxuICAgICAqIFNodWZmbGVzIGFuIGFycmF5LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzaHVmZmxlKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gYXJyYXlTaHVmZmxlKHRhcmdldCk7XG4gICAgfVxuICAgIFJhbmRvbS5zaHVmZmxlID0gc2h1ZmZsZTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY29weSBvZiBhbiBhcnJheS1saWtlICBhbmQgcmV0dXJucyBpdCBzaHVmZmxlZC5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHJldHVybnMge1RbXX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb3B5KHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gYXJyYXlTaHVmZmxlKGFycmF5Q29weShzb3VyY2UpKTtcbiAgICB9XG4gICAgUmFuZG9tLmNvcHkgPSBjb3B5O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBkaXN0aW5jdCByYW5kb20gc2V0IGZyb20gdGhlIHNvdXJjZSBhcnJheSB1cCB0byB0aGUgbWF4Q291bnQgb3IgdGhlIGZ1bGwgbGVuZ3RoIG9mIHRoZSBhcnJheS5cbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHBhcmFtIG1heENvdW50XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWxlY3Qoc291cmNlLCBtYXhDb3VudCkge1xuICAgICAgICBpZiAobWF4Q291bnQgIT09IEluZmluaXR5KVxuICAgICAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKG1heENvdW50KTtcbiAgICAgICAgc3dpdGNoIChtYXhDb3VudCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3NlbGVjdC5vbmUoc291cmNlLCB0cnVlKV07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBhcnJheVNodWZmbGUoYXJyYXlDb3B5KHNvdXJjZSkpO1xuICAgICAgICAgICAgICAgIGlmIChtYXhDb3VudCA8IHJlc3VsdC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5sZW5ndGggPSBtYXhDb3VudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFJhbmRvbS5zZWxlY3QgPSBzZWxlY3Q7XG4gICAgKGZ1bmN0aW9uIChzZWxlY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gb25lKHNvdXJjZSwgdGhyb3dJZkVtcHR5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZVtyKHNvdXJjZS5sZW5ndGgpXTtcbiAgICAgICAgICAgIGlmICh0aHJvd0lmRW1wdHkpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJDYW5ub3Qgc2VsZWN0IGZyb20gYW4gZW1wdHkgc2V0LlwiO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdC5vbmUgPSBvbmU7XG4gICAgfSkoc2VsZWN0ID0gUmFuZG9tLnNlbGVjdCB8fCAoUmFuZG9tLnNlbGVjdCA9IHt9KSk7XG59KShSYW5kb20gfHwgKFJhbmRvbSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SYW5kb20uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9SYW5kb20uanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuLyoqXG4gKiBSYW5kb21pemUgYXJyYXkgZWxlbWVudCBvcmRlciBpbi1wbGFjZS5cbiAqIFVzaW5nIER1cnN0ZW5mZWxkIHNodWZmbGUgYWxnb3JpdGhtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2h1ZmZsZSh0YXJnZXQpIHtcbiAgICBsZXQgaSA9IHRhcmdldC5sZW5ndGg7XG4gICAgd2hpbGUgKC0taSkge1xuICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgIGNvbnN0IHRlbXAgPSB0YXJnZXRbaV07XG4gICAgICAgIHRhcmdldFtpXSA9IHRhcmdldFtqXTtcbiAgICAgICAgdGFyZ2V0W2pdID0gdGVtcDtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNodWZmbGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9zaHVmZmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogT3JpZ2luOiBodHRwOi8vd3d3LmZhbGxpbmdjYW5iZWRlYWRseS5jb20vXG4gKiBMaWNlbnNpbmc6IE1JVFxuICovXG5pbXBvcnQgeyBSZWFkT25seUNvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4vUmVhZE9ubHlDb2xsZWN0aW9uQmFzZVwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JCYXNlXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uL0ludGVnZXJcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIExhenlMaXN0IGV4dGVuZHMgUmVhZE9ubHlDb2xsZWN0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2VudW1lcmF0b3IgPSBzb3VyY2UuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICB0aGlzLl9jYWNoZWQgPSBbXTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZW51bWVyYXRvcjtcbiAgICAgICAgdGhpcy5fZW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgIGlmIChlKVxuICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIHRoaXMuX2NhY2hlZCA9IG51bGw7XG4gICAgICAgIGlmIChjKVxuICAgICAgICAgICAgYy5sZW5ndGggPSAwO1xuICAgIH1cbiAgICBfZ2V0Q291bnQoKSB7XG4gICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIHJldHVybiBjID8gYy5sZW5ndGggOiAwO1xuICAgIH1cbiAgICBfZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgY3VycmVudCA9IDA7XG4gICAgICAgIH0sIHlpZWxkZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnJlbnQgPCBjLmxlbmd0aCB8fCB0aGlzLmdldE5leHQoKSlcbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oY1tjdXJyZW50KytdKVxuICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQoaW5kZXgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4KTtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgd2hpbGUgKGMubGVuZ3RoIDw9IGluZGV4ICYmIHRoaXMuZ2V0TmV4dCgpKSB7IH1cbiAgICAgICAgaWYgKGluZGV4IDwgYy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gY1tpbmRleF07XG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJpbmRleFwiLCBcIkdyZWF0ZXIgdGhhbiB0b3RhbCBjb3VudC5cIik7XG4gICAgfVxuICAgIGluZGV4T2YoaXRlbSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBjID0gdGhpcy5fY2FjaGVkO1xuICAgICAgICBsZXQgcmVzdWx0ID0gYy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICB3aGlsZSAocmVzdWx0ID09IC0xICYmIHRoaXMuZ2V0TmV4dCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gaXRlbSlcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjLmxlbmd0aCAtIDE7XG4gICAgICAgIH0pKSB7IH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29udGFpbnMoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKGl0ZW0pICE9IC0xO1xuICAgIH1cbiAgICBnZXROZXh0KG91dCkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZW51bWVyYXRvcjtcbiAgICAgICAgaWYgKCFlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlZC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChvdXQpXG4gICAgICAgICAgICAgICAgb3V0KHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9lbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZpbmlzaCgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dCgpKSB7IH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MYXp5TGlzdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0xhenlMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IENvbGxlY3Rpb25CYXNlIH0gZnJvbSBcIi4vQ29sbGVjdGlvbkJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIFJlYWRPbmx5Q29sbGVjdGlvbkJhc2UgZXh0ZW5kcyBDb2xsZWN0aW9uQmFzZSB7XG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDb3VudCgpO1xuICAgIH1cbiAgICBnZXRJc1JlYWRPbmx5KCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfYWRkSW50ZXJuYWwoZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIF9yZW1vdmVJbnRlcm5hbChlbnRyeSwgbWF4KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBfY2xlYXJJbnRlcm5hbCgpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGdldEVudW1lcmF0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRFbnVtZXJhdG9yKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUmVhZE9ubHlDb2xsZWN0aW9uQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlYWRPbmx5Q29sbGVjdGlvbkJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9SZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogLk5FVCBSZWZlcmVuY2U6IGh0dHA6Ly9yZWZlcmVuY2Vzb3VyY2UubWljcm9zb2Z0LmNvbS8jbXNjb3JsaWIvc3lzdGVtL3RleHQvU3RyaW5nQnVpbGRlci5jc1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vVHlwZXNcIjtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSU1QT1JUQU5UIE5PVEVTIEFCT1VUIFBFUkZPUk1BTkNFOlxuICogaHR0cDovL2pzcGVyZi5jb20vc3RyaW5nLWNvbmNhdGVuYXRpb24tbG9vcGVkXG4gKiBodHRwOi8vanNwZXJmLmNvbS9hZGRpbmctc3RyaW5ncy10by1hbi1hcnJheVxuICogaHR0cDovL2pzcGVyZi5jb20vc3RyaW5nLWNvbmNhdGVuYXRpb24tdmVyc3VzLWFycmF5LW9wZXJhdGlvbnMtd2l0aC1qb2luXG4gKlxuICogSXQgaXMgY2xlYXJseSBpbmVmZmljaWVudCB0byB1c2UgYSBTdHJpbmdCdWlsZGVyIG9yIExpbmtlZExpc3QgdG8gYnVpbGQgYSBzdHJpbmcgd2hlbiB5b3UgaGF2ZSBhIHNtYWxsIHNldCBvZiBzdHJpbmcgcG9ydGlvbnMuXG4gKiBTdHJpbmdCdWlsZGVyIHdpbGwgcmVhbGx5IHNob3cgaXQncyBiZW5lZml0IGxpa2VseSBzb21ld2hlcmUgYWJvdmUgMTAwMCBpdGVtcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IEVNUFRZID0gXCJcIjtcbmNvbnN0IE5FV0xJTkUgPSBcIlxcclxcblwiO1xuZXhwb3J0IGNsYXNzIFN0cmluZ0J1aWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKC4uLmluaXRpYWwpIHtcbiAgICAgICAgdGhpcy5fbGF0ZXN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFydEFycmF5ID0gW107XG4gICAgICAgIHRoaXMuYXBwZW5kVGhlc2UoaW5pdGlhbCk7XG4gICAgfVxuICAgIGFwcGVuZFNpbmdsZShpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICAgICAgXy5fbGF0ZXN0ID0gbnVsbDtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGUuT0JKRUNUOlxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZS5GVU5DVElPTjpcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfLl9wYXJ0QXJyYXkucHVzaChpdGVtKTsgLy8gT3RoZXIgcHJpbWl0aXZlIHR5cGVzIGNhbiBrZWVwIHRoZWlyIGZvcm1hdCBzaW5jZSBhIG51bWJlciBvciBib29sZWFuIGlzIGEgc21hbGxlciBmb290cHJpbnQgdGhhbiBhIHN0cmluZy5cbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRUaGVzZShpdGVtcykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaXRlbXMuZm9yRWFjaChzID0+IF8uYXBwZW5kU2luZ2xlKHMpKTtcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIGFwcGVuZCguLi5pdGVtcykge1xuICAgICAgICB0aGlzLmFwcGVuZFRoZXNlKGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFwcGVuZExpbmUoLi4uaXRlbXMpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRMaW5lcyhpdGVtcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhcHBlbmRMaW5lcyhpdGVtcykge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGlmIChpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBfLmFwcGVuZFNpbmdsZShpKTtcbiAgICAgICAgICAgICAgICBfLl9wYXJ0QXJyYXkucHVzaChORVdMSU5FKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICAvKiogLy8vIFRoZXNlIG1ldGhvZHMgY2FuIG9ubHkgZWZmaWNpZW50bHkgYmUgYWRkZWQgaWYgbm90IHVzaW5nIGEgc2luZ2xlIGFycmF5LlxuICAgICBpbnNlcnQoaW5kZXg6IG51bWJlciwgdmFsdWU6IHN0cmluZywgY291bnQ6IG51bWJlciA9IDEpOiBTdHJpbmdCdWlsZGVyXG4gICAgIHtcbiAgICB9XG4gICAgIHJlbW92ZShzdGFydEluZGV4Om51bWJlciwgbGVuZ3RoOm51bWJlcik6IFN0cmluZ0J1aWxkZXJcbiAgICAge1xuICAgIH1cbiAgICAgLyoqL1xuICAgIGdldCBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFydEFycmF5Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGxldCBsYXRlc3QgPSB0aGlzLl9sYXRlc3Q7XG4gICAgICAgIGlmIChsYXRlc3QgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuX2xhdGVzdCA9IGxhdGVzdCA9IHRoaXMuX3BhcnRBcnJheS5qb2luKEVNUFRZKTtcbiAgICAgICAgcmV0dXJuIGxhdGVzdDtcbiAgICB9XG4gICAgam9pbihkZWxpbWl0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnRBcnJheS5qb2luKGRlbGltaXRlcik7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9wYXJ0QXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fbGF0ZXN0ID0gbnVsbDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFN0cmluZ0J1aWxkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdHJpbmdCdWlsZGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vVGV4dC9TdHJpbmdCdWlsZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSJdLCJzb3VyY2VSb290IjoiIn0=