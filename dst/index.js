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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIDI3YzJmZTAyMDk0Y2Q2NjY3YjIwIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFR5cGVzLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbXBhcmUuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEV4Y2VwdGlvbnNcXEFyZ3VtZW50RXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEV4Y2VwdGlvbnNcXEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEVudW1lcmF0b3JCYXNlLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEludGVnZXIuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxFeGNlcHRpb25zXFxTeXN0ZW1FeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRGlzcG9zYWJsZVxcRGlzcG9zYWJsZUJhc2UuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEFycmF5XFxpbml0aWFsaXplLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcRW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxEaXNwb3NhYmxlXFxkaXNwb3NlLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSW5kZXhFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSXRlcmF0b3JSZXN1bHQuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRnVuY3Rpb25zLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxDb2xsZWN0aW9uQmFzZS5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXGNvcHkuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcVGV4dFxcVXRpbGl0eS5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRW51bWVyYXRpb25cXEFycmF5RW51bWVyYXRvci5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxEaXNwb3NhYmxlXFxPYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxEaXNwb3NhYmxlXFxPYmplY3RQb29sLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcVW5zdXBwb3J0ZWRFbnVtZXJhYmxlRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcSW5maW5pdGVFbnVtZXJhdG9yLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxFbnVtZXJhdGlvblxcU2ltcGxlRW51bWVyYWJsZUJhc2UuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxFbXB0eUVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEVudW1lcmF0aW9uXFxJdGVyYXRvckVudW1lcmF0b3IuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcc3JjXFxTdHJpbmdFeHRlbnNpb24udHMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbS5MaW5xXFxMaW5xLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxBcnJheVxcQ29tcGFyZS5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxzcmNcXGluZGV4LnRzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXHNyY1xcU3RyaW5nTm9kZS50cyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxzcmNcXE5hbWVkTm9kZS50cyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxzcmNcXE5vZGUudHMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRocmVhZGluZ1xcVGFza3NcXFRhc2tIYW5kbGVyLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRocmVhZGluZ1xcVGFza3NcXFRhc2tIYW5kbGVyQmFzZS5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRGljdGlvbmFyaWVzXFxEaWN0aW9uYXJ5LmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxMaW5rZWROb2RlTGlzdC5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcRGljdGlvbmFyaWVzXFxnZXRJZGVudGlmaWVyLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxEaWN0aW9uYXJpZXNcXERpY3Rpb25hcnlCYXNlLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXEVudmlyb25tZW50LmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xccHJvY2Vzc1xcYnJvd3Nlci5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxLZXlWYWx1ZUV4dHJhY3QuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXEtleU5vdEZvdW5kRXhjZXB0aW9uLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxRdWV1ZS5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXFV0aWxpdHkuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcRXhjZXB0aW9uc1xcTm90SW1wbGVtZW50ZWRFeGNlcHRpb24uanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXFNvcnRpbmdcXEtleVNvcnRlZENvbnRleHQuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXFNvcnRpbmdcXFNvcnRDb250ZXh0LmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFJhbmRvbS5qcyIsIkM6XFxkZXZlbG9wXFx0cmVlLnRzXFxub2RlX21vZHVsZXNcXHR5cGVzY3JpcHQtZG90bmV0LWVzNlxcU3lzdGVtXFxDb2xsZWN0aW9uc1xcQXJyYXlcXHNodWZmbGUuanMiLCJDOlxcZGV2ZWxvcFxcdHJlZS50c1xcbm9kZV9tb2R1bGVzXFx0eXBlc2NyaXB0LWRvdG5ldC1lczZcXFN5c3RlbVxcQ29sbGVjdGlvbnNcXExhenlMaXN0LmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXENvbGxlY3Rpb25zXFxSZWFkT25seUNvbGxlY3Rpb25CYXNlLmpzIiwiQzpcXGRldmVsb3BcXHRyZWUudHNcXG5vZGVfbW9kdWxlc1xcdHlwZXNjcmlwdC1kb3RuZXQtZXM2XFxTeXN0ZW1cXFRleHRcXFN0cmluZ0J1aWxkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0lBQWdJLDZEQUE2RCxFQUFFO0FBQy9MO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9CQUFvQjtBQUNyQjtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7QUNqV0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEZBQTBGO0FBQzFGO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7QUMvRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxVQUFVO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLGlEOzs7Ozs7OztBQ2pCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDWDtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msa0JBQWtCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSw2Qzs7Ozs7OztBQ3hCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsWUFBWTtBQUN6QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsdUQ7Ozs7Ozs7Ozs7QUNuQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ1U7QUFDSjtBQUNJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCLEVBQUU7QUFDM0MsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwwQzs7Ozs7Ozs7O0FDck5BO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDNEI7QUFDVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEJBQTBCO0FBQzNCO0FBQ0EsbUM7Ozs7Ozs7O0FDdkZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHFEOzs7Ozs7O0FDZEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7QUN2QkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7OztBQ3ZDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2tCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZ0I7QUFDRDtBQUNXO0FBQ0E7QUFDZTtBQUNaO0FBQ007QUFDTjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZCQUE2QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWUsRUFBRTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDRCQUE0QixFQUFFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7QUMzSkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixNQUFNO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLDhDQUE4QztBQUNuRCxDQUFDLDBCQUEwQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsYUFBYTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7QUNqS0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw0QkFBNEI7QUFDcEQ7QUFDQSxDQUFDLHdDQUF3QztBQUN6QztBQUNBO0FBQ0EsMEM7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhLGNBQWM7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEI7QUFDL0I7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7OztBQzVEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2tCO0FBQ0M7QUFDYTtBQUNJO0FBQ1g7QUFDbUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1QkFBdUI7QUFDakQ7QUFDQSxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQSwwQzs7Ozs7Ozs7Ozs7Ozs7QUNoWEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNxQjtBQUNXO0FBQ007QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxPQUFPO0FBQzdDO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFdBQVc7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxPQUFPO0FBQzdDLHNEQUFzRCxFQUFFO0FBQ3hELHFEQUFxRCxPQUFPO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsS0FBSyxJQUFJO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7QUMzSUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUNYO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7QUNyQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLG1EOzs7Ozs7Ozs7OztBQy9CQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNPO0FBQ0g7QUFDZ0I7QUFDVjtBQUM1QjtBQUNBLHNMQUFzTCxrQkFBa0I7QUFDeE07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7QUNyS0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsMEQ7Ozs7Ozs7QUNqQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUMrQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSw4Qzs7Ozs7OztBQ3BDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ3lCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxnRDs7Ozs7Ozs7QUNqRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUNMO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUFBO0FBQUE7QUFDRDtBQUNBLDJDOzs7Ozs7O0FDeEJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDhDOzs7Ozs7Ozs7QUMxQ00sT0FBVSxVQUFpQixtQkFBRztBQUM1QixXQUFLLEtBQVEsUUFBUyxVQUM5QjtBQUFFLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BGO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMrRDtBQUNoRDtBQUNmO0FBQ0E7QUFDaUU7QUFDdkM7QUFDWDtBQUNHO0FBQ21CO0FBQ1g7QUFDRDtBQUNKO0FBQ0w7QUFDUztBQUNBO0FBQ2dCO0FBQ1A7QUFDUDtBQUNLO0FBQ007QUFDWjtBQUNHO0FBQ1I7QUFDSjtBQUNZO0FBQ1Y7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdJQUFxRCwrQkFBK0IsRUFBRTtBQUN0RixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxxSUFBMEQ7QUFDMUQscUJBQXFCLElBQUk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2SUFBdUQ7QUFDdkQsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUxBQXdGO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUlBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUlBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RCxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBLGlCQUFpQjtBQUNqQixVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5SUFBaUQsV0FBVyxFQUFFO0FBQzlELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxSUFBNkMsZUFBZSxFQUFFO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLHVEQUF1RDtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixJQUFJO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0EsZ0M7Ozs7Ozs7Ozs7OztBQ2owRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7Ozs7Ozs7OztBQ3RGdUM7QUFDdkMsdUNBQTBDO0FBSXhDLHFCQUpPLGFBSUc7QUFIWixvQkFBMkIsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGM0Isc0NBQXdDO0FBQ3hDO0FBQWdDLDBCQUE2QjtBQVMzRCx3QkFBK0I7ZUFDN0Isa0JBQVcsU0FDYjtBQUFDO0FBVEQsMEJBQVcsc0JBQUs7YUFBaEI7QUFDUSxtQkFBQyxpQkFBYyxjQUN2QjtBQUFDO2FBQ0QsYUFBNkI7QUFDM0IsNkJBQWMsb0JBQ2hCO0FBQUM7O3NCQUhBOztBQVNNLHlCQUFRLFdBQWYsVUFBeUM7QUFDcEMsWUFBQyxPQUFZLFVBQWMsVUFBRTtBQUN4QixtQkFBQyxpQkFBYyxvQkFBQyxJQUFjLFdBQ3RDO0FBQUM7QUFDSyxlQUFDLGlCQUFjLG9CQUN2QjtBQUFDO0FBRU0seUJBQU8sVUFBZCxVQUF3QztBQUNuQyxZQUFDLE9BQVksVUFBYyxVQUFFO0FBQ3hCLG1CQUFDLGlCQUFhLG1CQUFDLElBQWMsV0FDckM7QUFBQztBQUNLLGVBQUMsaUJBQWEsbUJBQ3RCO0FBQUM7QUFFTSx5QkFBTyxVQUFkLFVBQXdDO0FBQ25DLFlBQUMsT0FBWSxVQUFjLFVBQUU7QUFDeEIsbUJBQUMsaUJBQWEsbUJBQUMsSUFBYyxXQUNyQztBQUFDO0FBQ0ssZUFBQyxpQkFBYSxtQkFDdEI7QUFBQztBQUVNLHlCQUFXLGNBQWxCLFVBQTRDO0FBQ3ZDLFlBQUMsT0FBWSxVQUFjLFVBQUU7QUFDeEIsbUJBQUMsaUJBQWlCLHVCQUFDLElBQWMsV0FDekM7QUFBQztBQUNLLGVBQUMsaUJBQWlCLHVCQUMxQjtBQUFDO0FBQ0gsV0FBQztBQUFBLEVBeEMrQixZQXdDL0I7QUF4Q1kscUJBQVUsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNFdkIsaUNBQThCO0FBRTlCO0FBQStFLHlCQUFtQjtBQUVoRyx1QkFBa0M7QUFBbEMsb0JBSUM7QUFISSxZQUFLLFNBQWUsV0FBRTtBQUN2QixzQ0FBVyxTQUNiO0FBQUM7ZUFDSDtBQUFDO0FBR0QsMEJBQVcscUJBQUk7YUFBZjtBQUNRLG1CQUFLLEtBQ2I7QUFBQzs7c0JBQUE7O0FBQ1Msd0JBQUcsTUFBYixVQUF5QjtBQUNuQixhQUFLLE9BQ1g7QUFBQztBQUVtQjtBQUViLHdCQUFLLFFBQVosVUFBd0I7QUFDaEIsZ0NBQWUsY0FBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUFDLFNBQWxELEVBQ1Q7QUFBQztBQUVNLHdCQUFTLFlBQWhCLFVBQXNELHNCQUF3QjtBQUN6RSxZQUFDLE9BQTJCLHlCQUFjLFVBQUU7QUFDdkMsbUJBQUMsaUJBQWUscUJBQ3hCO0FBQUM7QUFDSyxnQ0FBZ0IscUJBQWdCLGdCQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBeUI7QUFDekYsU0FEUztBQUNSO0FBRU0sd0JBQWdCLG1CQUF2QixVQUE2RCxzQkFBd0I7QUFDaEYsWUFBQyxPQUEyQix5QkFBYyxVQUFFO0FBQ3ZDLG1CQUFDLGlCQUFzQiw0QkFDL0I7QUFBQztBQUNLLGdDQUF1Qiw0QkFBZ0IsZ0JBQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUF5QjtBQUNoRyxTQURTO0FBQ1I7QUFFTSx3QkFBUSxXQUFmLFVBQTRCO0FBQ3BCLGVBQUssU0FDVixZQUFDLGlCQUFjLGNBQ2YseUJBQWUsY0FBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUNyRCxTQURJO0FBQ0g7QUFFTSx3QkFBYSxnQkFBcEIsVUFBaUM7QUFDekIsZUFBSyxTQUNWLFlBQUMsaUJBQW1CLG1CQUNwQix5QkFBb0IsbUJBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDMUQsU0FESTtBQUNIO0FBRU0sd0JBQW9CLHVCQUEzQixVQUF3QztBQUNoQyxlQUFLLFNBQ1YsWUFBQyxpQkFBMEIsMEJBQzNCLHlCQUE0QiwwQkFBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUNsRSxTQURJO0FBQ0g7QUFFTSx3QkFBYSxnQkFBcEIsVUFBaUM7QUFDekIsZUFBSyxTQUNWLFlBQUMsaUJBQW1CLG1CQUNwQix5QkFBb0IsbUJBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDMUQsU0FESTtBQUNIO0FBRU0sd0JBQW9CLHVCQUEzQixVQUF3QztBQUNoQyxlQUFLLFNBQ1YsWUFBQyxpQkFBMEIsMEJBQzNCLHlCQUEyQiwwQkFBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUNqRSxTQURJO0FBQ0g7QUFFTSx3QkFBYyxpQkFBckIsVUFBa0M7QUFDMUIsZUFBSyxTQUNWLFlBQUMsaUJBQW9CLG9CQUNyQix5QkFBcUIsb0JBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDM0QsU0FESTtBQUNIO0FBRU0sd0JBQXFCLHdCQUE1QixVQUF5QztBQUNqQyxlQUFLLFNBQ1YsWUFBQyxpQkFBMkIsMkJBQzVCLHlCQUE0QiwyQkFBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUNsRSxTQURJO0FBQ0g7QUFFTSx3QkFBYSxnQkFBcEIsVUFBaUM7QUFDekIsZUFBSyxTQUNWLFlBQUMsaUJBQW1CLG1CQUNwQix5QkFBb0IsbUJBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDMUQsU0FESTtBQUNIO0FBRU0sd0JBQW9CLHVCQUEzQixVQUF3QztBQUNoQyxlQUFLLFNBQ1YsWUFBQyxpQkFBMEIsMEJBQzNCLHlCQUEyQiwwQkFBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUNqRSxTQURJO0FBQ0g7QUFFTSx3QkFBVyxjQUFsQixVQUF3RCxzQkFBd0I7QUFDM0UsWUFBQyxPQUEyQix5QkFBYyxVQUFFO0FBQ3ZDLG1CQUFDLGlCQUFpQix1QkFDMUI7QUFBQztBQUNLLGdDQUFrQix1QkFBZ0IsZ0JBQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUF5QjtBQUMzRixTQURTO0FBQ1I7QUFFTSx3QkFBa0IscUJBQXpCLFVBQStELHNCQUF3QjtBQUNsRixZQUFDLE9BQTJCLHlCQUFjLFVBQUU7QUFDdkMsbUJBQUMsaUJBQXdCLDhCQUNqQztBQUFDO0FBQ0ssZ0NBQXlCLDhCQUFnQixnQkFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQXlCO0FBQ2xHLFNBRFM7QUFDUjtBQUVNLHdCQUFRLFdBQWYsVUFBMEQsMkJBQTZCO0FBQ2xGLFlBQUMsT0FBZ0MsOEJBQWMsVUFBRTtBQUM1QyxtQkFBQyxpQkFBYyxvQkFDdkI7QUFBQztBQUNLLGdDQUFlLG9CQUFxQixxQkFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQThCO0FBQ2xHLFNBRFM7QUFDUjtBQUVNLHdCQUFlLGtCQUF0QixVQUFpRSwyQkFBNkI7QUFFekYsWUFBQyxPQUFnQyw4QkFBYyxVQUFFO0FBQzVDLG1CQUFDLGlCQUFxQiwyQkFDOUI7QUFBQztBQUNLLGdDQUFzQiwyQkFBcUIscUJBQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUE4QjtBQUN6RyxTQURTO0FBQ1I7QUFFTSx3QkFBNkIsZ0NBQXBDLFVBQWlEO0FBQ3pDLGVBQUssU0FDVixZQUFDLGlCQUFtQyxtQ0FDcEMseUJBQW9DLG1DQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQzFFLFNBREk7QUFDSDtBQUVNLHdCQUFvQyx1Q0FBM0MsVUFBd0Q7QUFDaEQsZUFBSyxTQUNWLFlBQUMsaUJBQTBDLDBDQUMzQyx5QkFBMkMsMENBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDakYsU0FESTtBQUNIO0FBRU0sd0JBQThCLGlDQUFyQyxVQUFrRDtBQUMxQyxlQUFLLFNBQ1YsWUFBQyxpQkFBb0Msb0NBQ3JDLHlCQUFxQyxvQ0FBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUMzRSxTQURJO0FBQ0g7QUFFTSx3QkFBcUMsd0NBQTVDLFVBQXlEO0FBQ2pELGVBQUssU0FDVixZQUFDLGlCQUEyQywyQ0FDNUMseUJBQTRDLDJDQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQ2xGLFNBREk7QUFDSDtBQUVNLHdCQUF3QiwyQkFBL0IsVUFBNEM7QUFDcEMsZUFBSyxTQUNWLFlBQUMsaUJBQThCLDhCQUMvQix5QkFBK0IsOEJBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDckUsU0FESTtBQUNIO0FBRU0sd0JBQStCLGtDQUF0QyxVQUFtRDtBQUMzQyxlQUFLLFNBQ1YsWUFBQyxpQkFBcUMscUNBQ3RDLHlCQUFzQyxxQ0FBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUM1RSxTQURJO0FBQ0g7QUFFTSx3QkFBbUIsc0JBQTFCLFVBQXVDO0FBQy9CLGVBQUssU0FDVixZQUFDLGlCQUF5Qix5QkFDMUIseUJBQTBCLHlCQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQ2hFLFNBREk7QUFDSDtBQUVNLHdCQUEwQiw2QkFBakMsVUFBOEM7QUFDdEMsZUFBSyxTQUNWLFlBQUMsaUJBQWdDLGdDQUNqQyx5QkFBaUMsZ0NBQUUsTUFBTSxNQUFDLFVBQUk7QUFBSSxtQkFBSSxLQUFLLFNBQVM7QUFDdkUsU0FESTtBQUNIO0FBRU0sd0JBQXVCLDBCQUE5QixVQUEyQztBQUNuQyxlQUFLLFNBQ1YsWUFBQyxpQkFBNkIsNkJBQzlCLHlCQUE4Qiw2QkFBRSxNQUFNLE1BQUMsVUFBSTtBQUFJLG1CQUFJLEtBQUssU0FBUztBQUNwRSxTQURJO0FBQ0g7QUFFTSx3QkFBOEIsaUNBQXJDLFVBQWtEO0FBQzFDLGVBQUssU0FDVixZQUFDLGlCQUFvQyxvQ0FDckMseUJBQXFDLG9DQUFFLE1BQU0sTUFBQyxVQUFJO0FBQUksbUJBQUksS0FBSyxTQUFTO0FBQzNFLFNBREk7QUFDSDtBQUNILFdBQUM7QUFBQSxFQWxMOEUsT0FrTDlFO0FBbExZLG9CQUFTLFU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xpQjtBQUN2QyxpQ0FBZ0U7QUFHaEUsMENBQWdGO0FBQ2hGLHNEQUErRztBQUMvRyxvQkFBMkI7QUFDM0I7QUFFd0U7QUFDdEUsa0JBQW9DO0FBQzlCLGFBQVcsYUFBUTtBQUNuQixhQUFPLFNBQVE7QUFDZixhQUFXLGFBQU8sS0FBVTtBQUM1QixhQUFXLGFBQU8sS0FBVTtBQUM1QixhQUFNLFFBQVEsVUFBZ0IsWUFBTyxPQUMzQztBQUFDO0FBUUQsMEJBQVksZ0JBQVE7YUFBcEI7QUFDUSxtQkFDUjtBQUFDOztzQkFBQTs7QUFFRCwwQkFBVyxnQkFBWTthQUF2QjtBQUNRLG1CQUFLLEtBQU8sVUFBVSxPQUFLLEtBQU8sT0FBYSxhQUFLLEtBQzVEO0FBQUM7O3NCQUFBOztBQUVELDBCQUFXLGdCQUFXO2FBQXRCO0FBQ1EsbUJBQUssS0FBTyxVQUFVLE9BQUssS0FBTyxPQUFXLFdBQWEsYUFBSyxLQUN2RTtBQUFDOztzQkFBQTs7QUFFRCwwQkFBVyxnQkFBVTthQUFyQjtBQUNRLG1CQUFLLEtBQ2I7QUFBQzs7c0JBQUE7O0FBQ0QsMEJBQVksZ0JBQVU7YUFBdEIsYUFBdUM7QUFDakMsaUJBQVksY0FDbEI7QUFBQzs7c0JBQUE7O0FBRUQsMEJBQVcsZ0JBQVM7YUFBcEI7QUFDUSxtQkFBSyxLQUFXLGNBQVUsT0FBSyxLQUFXLFdBQWEsYUFDL0Q7QUFBQzs7c0JBQUE7O0FBRUQsMEJBQVcsZ0JBQU07YUFBakI7QUFDUSxtQkFBSyxLQUNiO0FBQUM7O3NCQUFBOztBQUNELDBCQUFZLGdCQUFNO2FBQWxCLGFBQStCO0FBQ3pCLGlCQUFRLFVBQ2Q7QUFBQzs7c0JBQUE7O0FBRUQsMEJBQVcsZ0JBQVU7YUFBckI7QUFDUSxtQkFBSyxLQUNiO0FBQUM7O3NCQUFBOztBQUNELDBCQUFZLGdCQUFVO2FBQXRCLGFBQXVDO0FBQ2pDLGlCQUFZLGNBQ2xCO0FBQUM7O3NCQUFBOztBQUVELDBCQUFXLGdCQUFVO2FBQXJCO0FBQ1EsbUJBQUssS0FDYjtBQUFDOztzQkFBQTs7QUFDRCwwQkFBWSxnQkFBVTthQUF0QixhQUF1QztBQUNqQyxpQkFBWSxjQUNsQjtBQUFDOztzQkFBQTs7QUFDRCwwQkFBVyxnQkFBSTthQUFmO0FBQ1EsbUJBQUssS0FBVyxlQUFTLEtBQWMsY0FBSyxLQUFhLGFBQ2pFO0FBQUM7O3NCQUFBOztBQUNELDBCQUFXLGdCQUFJO2FBQWY7QUFDUSxtQkFBSyxLQUFXLGVBQVMsS0FBZSxlQUFLLEtBQWEsYUFDbEU7QUFBQzs7c0JBQUE7O0FBRVMsbUJBQVEsV0FBbEI7QUFDUSxlQUFLLEtBQ2I7QUFBQztBQUNTLG1CQUFRLFdBQWxCLFVBQWdDO0FBQzFCLGFBQU8sU0FDYjtBQUFDO0FBQ0QsMEJBQWMsZ0JBQUs7YUFBbkI7QUFDUSxtQkFBSyxLQUNiO0FBQUM7YUFDRCxhQUFpQztBQUMzQixpQkFBTyxTQUNiO0FBQUM7O3NCQUhBOztBQUtELDBCQUFXLGdCQUFhO2FBQXhCO0FBQ1EsbUJBQUssS0FBVyxXQUN4QjtBQUFDOztzQkFBQTs7QUFFRCwwQkFBVyxnQkFBc0I7YUFBakM7QUFDUSxtQkFBSyxLQUNiO0FBQUM7O3NCQUFBOztBQUdPLG1CQUF5Qiw0QkFBakM7QUFDRSxZQUFhLFlBQUs7QUFDZCxhQUFXLFdBQVEsUUFBQyxVQUFLO0FBQzNCLGdCQUFZLFNBQVEsTUFBNEIsOEJBQUs7QUFDbEQsZ0JBQVUsWUFBVSxRQUFFO0FBQ2QsNEJBQ1g7QUFDRjtBQUFHO0FBQ0csZUFDUjtBQUFDO0FBRU0sbUJBQWEsZ0JBQXBCLFVBQWlDO0FBQ3pCLGVBQUssS0FBVyxXQUFtQixtQkFDM0M7QUFBQztBQUVNLG1CQUFTLFlBQWhCLFVBQXVDO0FBQy9CLGVBQWUsbUJBQ3BCLFlBQUssS0FBbUIsbUJBQUssS0FDN0IsS0FBSyxLQUFZLFlBQUssS0FDekI7QUFBQztBQUVNLG1CQUFnQixtQkFBdkIsVUFBOEM7QUFDekMsWUFBZSxtQkFBZSxXQUFFO0FBQzNCLG1CQUFLLEtBQW1CLG1CQUFLLEtBQWUsaUJBQ3BEO0FBQUM7QUFDRCwyQkFBeUI7Ozs7O0FBQ2YsK0JBQVEsTUFBVTs7O0FBRXhCLDZDQUFVOztBQUFWLDJCQUFXO0FBQ1AsK0JBQU8sS0FBUTs7OzRCQUNSLFFBQVM7Ozs7OztBQUN2QjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUVNLG1CQUFRLFdBQWY7QUFDRSwyQkFBeUI7Ozs7O0FBQ2YsK0JBQVEsTUFBWTs0QkFDeEIsRUFBSSxTQUFTLE9BQWIscUJBQWE7QUFDRCxtQ0FBUTs7O0FBRXBCLDZDQUFVOztBQUFWLDJCQUFXO0FBQ1AsK0JBQU8sS0FBWTs7OzRCQUNaLFNBQWM7Ozs7OztBQUU5QjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUdNLG1CQUFlLGtCQUF0QjtBQUNFLDJCQUF5Qjs7Ozs7QUFDZiwrQkFBUSxNQUFXO0FBQ3hCLDRCQUFLLFFBQVMsTUFBRTtBQUNYLHNDQUNSO0FBQUM7QUFDYSxtQ0FBUTs7O0FBRXBCLDZDQUFVOztBQUFWLDJCQUFXO0FBQ1AsK0JBQU8sS0FBWTs7OzRCQUNaLFNBQWM7Ozs7OztBQUM1QjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUVNLG1CQUFhLGdCQUFwQjtBQUNFLDRCQUEwQjs7Ozs7QUFDaEIsK0JBQVEsTUFBWTtBQUNkLG1DQUFRLE1BQWM7Ozs0QkFDN0IsRUFBSSxTQUFhO0FBQ3RCLDZDQUFVOztBQUFWLDJCQUFXO0FBQ1AsK0JBQU8sS0FBWTs7Ozs7O0FBRTFCO0FBQ0ssZUFBQyxPQUFVLFFBQVEsUUFBVyxXQUN0QztBQUFDO0FBRU0sbUJBQW9CLHVCQUEzQjtBQUNRLGVBQUMsT0FBVSxRQUFPLE9BQUssS0FBUyxVQUFJLEdBQU8sT0FBSyxLQUN4RDtBQUFDO0FBRU0sbUJBQWEsZ0JBQXBCO0FBQ0UsMkJBQXlCOzs7OztBQUNmLCtCQUFRLE1BQWE7QUFDZixtQ0FBUSxNQUFVOzs7NEJBQ3pCLEVBQUksU0FBYTtBQUN0Qiw2Q0FBVTs7QUFBViwyQkFBVztBQUNQLCtCQUFPLEtBQVk7Ozs7OztBQUUxQjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUVNLG1CQUFvQix1QkFBM0I7QUFDUSxlQUFLLEtBQWdCLGdCQUFPLE9BQUMsT0FBVSxRQUFPLE9BQUssS0FBUyxVQUNwRTtBQUFDO0FBRU0sbUJBQWMsaUJBQXJCO0FBQ0UsMkJBQXlCOzs7OztBQUNmLCtCQUFRLE1BQWM7QUFDaEIsbUNBQVEsTUFBVTs7OzRCQUN6QixFQUFJLFNBQWE7QUFDdEIsNkNBQVU7O0FBQVYsMkJBQVc7QUFDUCwrQkFBTyxLQUFZOzs7Ozs7QUFFMUI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBcUIsd0JBQTVCO0FBQ1EsZUFBSyxLQUFpQixpQkFBTyxPQUFDLE9BQVUsUUFBTyxPQUFLLEtBQVMsVUFDckU7QUFBQztBQUVNLG1CQUFhLGdCQUFwQjtBQUNFLDJCQUF5Qjs7Ozs7QUFDZiwrQkFBUSxNQUFZO0FBQ2QsbUNBQVEsTUFBYTs7OzRCQUM1QixFQUFJLFNBQWE7QUFDdEIsNkNBQVU7O0FBQVYsMkJBQVc7QUFDUCwrQkFBTyxLQUFZOzs7Ozs7QUFFMUI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBb0IsdUJBQTNCO0FBQ1EsZUFBQyxPQUFVLFFBQU8sT0FBSyxLQUFTLFVBQUksR0FBTyxPQUFLLEtBQ3hEO0FBQUM7QUFFTSxtQkFBVyxjQUFsQixVQUF5QztBQUN2QywyQkFBeUI7Ozs7OzRCQUNuQixFQUFjLG1CQUFjLFlBQTVCLHFCQUE0QjtBQUNuQixnQ0FBUSxNQUFVO0FBQ25CLGlDQUFTOzRCQUNmLEVBQU0sT0FBVyxjQUFRLE9BQXpCLHFCQUF5QjtBQUNyQixpQ0FBUyxPQUFZO0FBQzNCLDZDQUFZOztBQUFaLDJCQUFhOzs7aUNBQ0Y7Ozs0QkFDRixFQUFNLE9BQVcsY0FBUTtBQUN4QixpQ0FBUyxPQUFZO0FBQzNCLDZDQUFZOztBQUFaLDJCQUFhOzs7QUFFZiwrQkFBYSxPQUFLLFFBQVEsTUFBRztBQUNyQixxQ0FBUyxPQUFRO0FBQ3BCLGdDQUFPLFdBQVcsT0FBRTtBQUNmLDBDQUNSO0FBQ0Y7QUFBQztBQUNLLGlDQUFTLE9BQVk7QUFDM0IsNkNBQVk7O0FBQVosMkJBQWE7Ozs7O0FBSU4sZ0NBQVEsTUFBVTtBQUNuQixpQ0FBUzs0QkFDZixFQUFNLE9BQVcsY0FBUSxRQUFrQixpQkFBSSxJQUEvQyxxQkFBK0M7QUFDM0MsaUNBQVMsT0FBWTtBQUNWO0FBQ2pCLDZDQUFZOztBQUFaLDJCQUFhOzs7aUNBQ0Y7Ozs0QkFDRixFQUFNLE9BQVcsY0FBUSxRQUFrQixpQkFBSTtBQUM5QyxpQ0FBUyxPQUFZO0FBQ1Y7QUFDakIsNkNBQVk7O0FBQVosMkJBQWE7OztBQUVmLCtCQUFhLE9BQUssUUFBUSxNQUFHO0FBQ3JCLHFDQUFTLE9BQVE7QUFDTjtBQUNkLGdDQUFPLFdBQVcsT0FBRTtBQUNmLDBDQUNSO0FBQ0Y7QUFBQztBQUNLLGlDQUFTLE9BQVk7QUFDM0IsNkNBQVk7O0FBQVosMkJBQWE7Ozs7OztBQUlwQjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUVNLG1CQUFrQixxQkFBekIsVUFBZ0Q7QUFDeEMsZUFBZSxtQkFDbEIsWUFBQyxPQUFVLFFBQU8sT0FBSyxLQUFTLFVBQUksR0FBTyxPQUFLLEtBQ2hELGlCQUFDLE9BQVUsUUFBTyxPQUFLLEtBQVMsVUFBSSxHQUFPLE9BQUssS0FBWSxZQUNqRTtBQUFDO0FBRU0sbUJBQVEsV0FBZixVQUEyQztBQUN0QyxZQUFvQix3QkFBZSxXQUFFO0FBQ2hDLG1CQUFLLEtBQWdCLGdCQUFLLEtBQXFCLHFCQUFVLFVBQ3hELE9BQUssS0FBZ0IsZ0JBQUssS0FDbkM7QUFBQztBQUNELDJCQUF5Qjs7Ozs7QUFDWixnQ0FBUSxNQUFjO0FBQ3pCLCtCQUFTOzs7NEJBQ1YsRUFBSSxTQUFzQjtBQUMvQiw2Q0FBVTs7QUFBViwyQkFBVztBQUNQLCtCQUFPLEtBQVk7OztBQUVyQiwrQkFBTyxLQUFZOzs7NEJBQ2hCLEVBQUksU0FBVTtBQUNuQiw2Q0FBVTs7QUFBViwyQkFBVztBQUNQLCtCQUFPLEtBQVk7Ozs7OztBQUUxQjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUVNLG1CQUFlLGtCQUF0QixVQUFrRDtBQUM3QyxZQUFvQix3QkFBZSxXQUFFO0FBQ2hDLG1CQUFLLEtBQWdCLGdCQUFLLEtBQXFCLHFCQUFVLFVBQzlDLE9BQUMsT0FBVSxRQUFPLE9BQUssS0FBUyxVQUFLLElBQ3JDLE9BQUssS0FBZ0IsZ0JBQUssS0FDN0M7QUFBQztBQUNELDJCQUF5Qjs7Ozs7QUFDWixnQ0FBUSxNQUFjO0FBQ3pCLCtCQUFTOzs7QUFFZiw2Q0FBVTs7QUFBViwyQkFBVztBQUNQLCtCQUFPLEtBQVk7Ozs0QkFDWixTQUFXOzs7Ozs7QUFDekI7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBNkIsZ0NBQXBDO0FBQ0UsMkJBQXlCOzs7OztBQUNmLCtCQUFRLE1BQVU7OztBQUVqQiw0QkFBTyxLQUFnQixnQkFBaUI7Ozs2QkFDdkMsRUFBVztBQUNqQiw2Q0FBTyxFQUFROztBQUFmLDJCQUFnQjs7O0FBRWQsK0JBQU8sS0FBUTs7OzRCQUNSLFFBQVM7Ozs7OztBQUN2QjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUVNLG1CQUFvQyx1Q0FBM0M7QUFDUSxlQUFDLE9BQVUsUUFBTyxPQUFLLEtBQVMsVUFBSSxHQUFPLE9BQUssS0FDeEQ7QUFBQztBQUVNLG1CQUE4QixpQ0FBckM7QUFDUSxlQUFLLEtBQXdDLHdDQUFLLEtBQzFEO0FBQUM7QUFFTSxtQkFBcUMsd0NBQTVDO0FBQ0UsMkJBQXlCOzs7OztBQUNmLCtCQUFRLE1BQVU7OztBQUVqQiw0QkFBTyxLQUF1Qix1QkFBaUI7Ozs2QkFDOUMsRUFBVztBQUNqQiw2Q0FBTyxFQUFROztBQUFmLDJCQUFnQjs7O0FBRWQsK0JBQU8sS0FBUTs7OzRCQUNSLFFBQVM7Ozs7OztBQUN2QjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUVNLG1CQUF1QiwwQkFBOUI7QUFDRSwyQkFBeUI7OztBQUNmLHVCQUFRLE1BQVU7QUFDMUIsdUJBQVcsU0FBUyxLQUFXLFlBQUc7QUFDbEIsK0JBQVE7QUFDbEIsMkJBQU8sS0FBUTtBQUNoQix3QkFBSyxRQUFTLE1BQUU7QUFDWCw4Q0FDUjtBQUNGO0FBQUM7QUFDRCxzQ0FBWTs7QUFDYjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUVNLG1CQUF3QiwyQkFBL0I7QUFDRSwyQkFBeUI7Ozs7O0FBQ2YsK0JBQVEsTUFBVTs7OzRCQUNuQixFQUFJLFNBQVMsS0FBVztBQUN6QiwrQkFBTyxLQUFRO0FBQ2hCLDRCQUFLLFFBQVMsTUFBRTtBQUNYLGlEQUNSO0FBQUM7QUFDRCw2Q0FBVTs7QUFBViwyQkFBVzs7Ozs7O0FBRWQ7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBK0Isa0NBQXRDO0FBQ0UsMkJBQXlCOzs7OztBQUNmLCtCQUFRLE1BQVU7QUFDMUIsNkNBQVU7O0FBQVYsMkJBQVc7Ozs0QkFDSixFQUFJLFNBQVMsS0FBVztBQUN6QiwrQkFBTyxLQUFRO0FBQ2hCLDRCQUFLLFFBQVMsTUFBRTtBQUNYLGlEQUNSO0FBQUM7QUFDRCw2Q0FBVTs7QUFBViwyQkFBVzs7Ozs7O0FBRWQ7QUFDSyxlQUFDLE9BQVUsUUFBUSxRQUFVLFVBQ3JDO0FBQUM7QUFFTSxtQkFBbUIsc0JBQTFCO0FBQ1EsZUFBSyxLQUE2Qiw2QkFBSyxLQUMvQztBQUFDO0FBRU0sbUJBQTBCLDZCQUFqQztBQUNFLDJCQUF5Qjs7Ozs7QUFDZiwrQkFBUSxNQUFVOzs7QUFFeEIsNkNBQVU7O0FBQVYsMkJBQVc7QUFDUCwrQkFBTyxLQUFZOzs7NEJBQ1osUUFBUSxRQUFRLFNBQVMsS0FBWTs7Ozs7O0FBQ25EO0FBQ0ssZUFBQyxPQUFVLFFBQVEsUUFBVSxVQUNyQztBQUFDO0FBRU0sbUJBQXVCLDBCQUE5QjtBQUNRLGVBQUssS0FBaUMsaUNBQUssS0FDbkQ7QUFBQztBQUVNLG1CQUE4QixpQ0FBckM7QUFDRSwyQkFBeUI7Ozs7O0FBQ2YsK0JBQVEsTUFBVTs7O0FBRXhCLDZDQUFVOztBQUFWLDJCQUFXO0FBQ1AsK0JBQU8sS0FBWTs7OzRCQUNaLFFBQVM7Ozs7OztBQUN2QjtBQUNLLGVBQUMsT0FBVSxRQUFRLFFBQVUsVUFDckM7QUFBQztBQUVNLG1CQUFXLGNBQWxCLFVBQTZCO0FBQ3BCLGdCQUFPLE9BQUssUUFBVTtBQUN0QixnQkFBTyxPQUFLLEtBQU8sVUFBVTtBQUM3QixnQkFBTyxPQUFLLEtBQU8sVUFBVTtBQUNqQyxZQUFLLEtBQU8sT0FBVyxlQUFzQixNQUFFO0FBQzVDLGlCQUFPLE9BQVcsYUFDeEI7QUFBQztBQUNLLGVBQUssS0FBOEIsOEJBQzNDO0FBQUM7QUFFTSxtQkFBTyxVQUFkLFVBQXlCO0FBQ2hCLGdCQUFPLE9BQUssUUFBVTtBQUN0QixnQkFBTyxPQUFLLEtBQU8sVUFBVTtBQUM3QixnQkFBTyxPQUFLLEtBQU8sVUFBVTtBQUM5QixlQUFLLEtBQVcsV0FBOEIsOEJBQ3REO0FBQUM7QUFFTSxtQkFBUSxXQUFmLFVBQTBCO0FBQ2pCLGdCQUFPLE9BQUssUUFBVTtBQUN0QixnQkFBTyxPQUFLLEtBQU8sVUFBVTtBQUM5QixlQUFLLEtBQWdCLGdCQUM3QjtBQUFDO0FBRU8sbUJBQWUsa0JBQXZCLFVBQWtDO0FBQzVCLGFBQWUsZUFBTztBQUN0QixhQUFXLGFBQVE7QUFDakIsZUFDUjtBQUFDO0FBRU8sbUJBQTZCLGdDQUFyQyxVQUFnRDtBQUMxQyxhQUFPLFNBQU8sS0FBUTtBQUN0QixhQUFXLGFBQU8sS0FBVTtBQUM1QixhQUFXLGFBQU8sS0FBWTtBQUM5QixhQUFXLFdBQVcsYUFBUTtBQUM5QixhQUFXLGFBQVE7QUFDakIsZUFDUjtBQUFDO0FBRU0sbUJBQU8sVUFBZCxVQUF5QjtBQUNoQixnQkFBTyxPQUFLLFFBQVU7QUFDdEIsZ0JBQU8sT0FBSyxLQUFPLFVBQVU7QUFDOUIsZUFBSyxLQUFlLGVBQzVCO0FBQUM7QUFFTyxtQkFBYyxpQkFBdEIsVUFBaUM7QUFDL0IsWUFBWSxTQUFPLEtBQVk7QUFDNUIsWUFBTyxVQUFTLE1BQUU7QUFDZixpQkFBTyxTQUFPLEtBQVU7QUFDeEIsaUJBQVcsYUFBUTtBQUNuQixpQkFBVyxhQUFRO0FBQ25CLGlCQUFXLGFBQ2pCO0FBQU0sZUFBRTtBQUNBLG1CQUE4Qiw4QkFDdEM7QUFBQztBQUNLLGVBQ1I7QUFBQztBQUVNLG1CQUFPLFVBQWQsVUFBNEI7QUFDdkIsWUFBSyxLQUFPLFVBQVMsTUFBRTtBQUN4QixrQkFBTSxJQUFJLDRCQUF5QiwwQkFDckM7QUFBQztBQUNNLGdCQUFPLFNBQU8sS0FBUTtBQUN0QixnQkFBVyxhQUFPLEtBQVk7QUFDOUIsZ0JBQVcsYUFBTyxLQUFZO0FBQ2pDLGFBQVcsV0FBVyxhQUFXLFNBQXVCO0FBQ3hELGFBQVcsV0FBVyxhQUFXO0FBQzlCLGdCQUFXLFdBQVcsYUFBVztBQUNyQyxZQUFLLEtBQU8sT0FBVyxlQUFzQixNQUFFO0FBQzVDLGlCQUFPLE9BQVcsYUFDeEI7QUFBQztBQUNHLGFBQVcsYUFBUTtBQUNuQixhQUFXLGFBQVE7QUFDbkIsYUFBTyxTQUNiO0FBQUM7QUFFTSxtQkFBTSxTQUFiO0FBQ0ssWUFBSyxLQUFPLFVBQVMsTUFBRTtBQUN4QixrQkFBTSxJQUFJLDRCQUF5QiwwQkFDckM7QUFBQztBQUNELFlBQVUsT0FBTyxLQUFZO0FBQzFCLFlBQUssU0FBc0IsTUFBRTtBQUMxQixpQkFBVyxXQUFXLGFBQVE7QUFDOUIsaUJBQVcsYUFBTyxLQUFZO0FBQy9CLGdCQUFLLEtBQU8sT0FBVyxlQUFzQixNQUFFO0FBQzVDLHFCQUFPLE9BQVcsYUFDeEI7QUFDRjtBQUFNLGVBQUU7QUFDRixpQkFBTyxPQUFXLGFBQ3hCO0FBQUM7QUFDRyxhQUFXLGFBQVE7QUFDbkIsYUFBVyxhQUFRO0FBQ25CLGFBQU8sU0FDYjtBQUFDO0FBRU0sbUJBQWlCLG9CQUF4QjtBQUFBLG9CQXdCQztBQXZCSSxZQUFLLEtBQU8sVUFBUyxNQUFFO0FBQ3hCLGtCQUFNLElBQUksNEJBQXlCLDBCQUNyQztBQUFDO0FBQ0QsWUFBVSxPQUFPLEtBQVk7QUFDMUIsWUFBSyxTQUFzQixNQUFFO0FBQzFCLGlCQUFXLFdBQVcsYUFBUTtBQUM5QixpQkFBVyxhQUFPLEtBQVk7QUFDL0IsZ0JBQUssS0FBTyxPQUFXLGVBQXNCLE1BQUU7QUFDNUMscUJBQU8sT0FBVyxhQUFRO0FBQ3hCLHVCQUFDO0FBQ0QseUJBQU8sT0FBVyxhQUFPLE1BQVU7QUFDbkMsMEJBQVcsV0FBVyxhQUFPLE1BQVU7QUFDdkMseUJBQVcsYUFBTyxNQUN4QjtBQUNGO0FBQUM7QUFDSyxtQkFBQztBQUNELHNCQUFXLFdBQVcsYUFBTyxNQUFVO0FBQ3ZDLHFCQUFXLGFBQU8sTUFDeEI7QUFDRjtBQUFDO0FBQ0QsWUFBWSxTQUFPLEtBQVE7QUFDckIsZUFBVyxhQUFRO0FBQ25CLGVBQUM7QUFBYyxtQkFBVyxhQUFPLE1BQVc7QUFDcEQ7QUFBQztBQUVNLG1CQUFRLFdBQWY7QUFDRSxZQUFhLFVBQUcsSUFBSSxnQkFBZ0I7QUFDaEMsYUFBZ0IsZ0JBQUssS0FBUyxVQUFHLEdBQVc7QUFDMUMsZUFBUSxRQUNoQjtBQUFDO0FBRU8sbUJBQWUsa0JBQXZCLFVBQWtDLE1BQWEsT0FBdUI7QUFBdEUsb0JBWUM7QUFYSSxZQUFLLFFBQVMsTUFBRTtBQUVuQjtBQUFDO0FBQ0csYUFBQyxJQUFLLElBQUksR0FBRyxJQUFRLE9BQUssS0FBRztBQUN4QixvQkFBTyxPQUNoQjtBQUFDO0FBQ00sZ0JBQVcsV0FBQyxDQUFLLEtBQU0sU0FBVSxPQUFLLEtBQU0sTUFBYSxhQUFLO0FBQ3JFLFlBQWMsV0FBTyxLQUFZO0FBQ3pCLGlCQUFRLFFBQUMsVUFBSztBQUNoQixrQkFBZ0IsZ0JBQU0sT0FBTyxRQUFJLEdBQ3ZDO0FBQ0Y7QUFBQztBQUNILFdBQUM7QUFBQTtBQW5qQlksZUFBSSxLOzs7Ozs7O0FDUGpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0JBQStCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7QUN0RUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUNNO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsdUM7Ozs7Ozs7QUN2QkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSwyQzs7Ozs7Ozs7Ozs7OztBQ3ZFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUI7QUFDSjtBQUNVO0FBQ0E7QUFDSjtBQUNHO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxLQUFLO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7Ozs7O0FDbkxBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDaUI7QUFDbUI7QUFDUjtBQUNJO0FBQ1A7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdU5BQWlGLEVBQUUsMkJBQTJCLEVBQUU7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQzs7Ozs7Ozs7QUNwV0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Qzs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNtQjtBQUNEO0FBQ087QUFDQTtBQUNPO0FBQ0k7QUFDVjtBQUNLO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsZ0JBQWdCLHVCQUF1QjtBQUN2QyxrQkFBa0IseUJBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtIQUFtRCxJQUFJO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QseUJBQXlCO0FBQ3pFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDBDOzs7Ozs7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osdUM7Ozs7Ozs7QUNoQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQzRCO0FBQ0k7QUFDakI7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDNUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLGdEOzs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUI7QUFDbkI7QUFDZTtBQUNHO0FBQ087QUFDUztBQUNFO0FBQ0U7QUFDYjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixJQUFJO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsZ0JBQWdCLEVBQUU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZQQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDRztBQUNDO0FBQ1M7QUFDSTtBQUNNO0FBQ2pCO0FBQ0U7QUFDZjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsVUFBVTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxRQUFRO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsMkNBQTJDLFNBQVM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7QUMvU0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsbUQ7Ozs7Ozs7OztBQ2RBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNzQjtBQUNGO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLDRDOzs7Ozs7O0FDMUJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxpQkFBaUIsb0JBQW9CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsdUM7Ozs7Ozs7Ozs7QUMzQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNrQjtBQUNHO0FBQ2E7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUsscURBQXFEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx5Q0FBeUM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFdBQVc7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssK0NBQStDO0FBQ3BELENBQUMsd0JBQXdCO0FBQ3pCLGtDOzs7Ozs7O0FDNUtBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7QUNsQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDO0FBQ0s7QUFDYjtBQUNQO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUFBO0FBQUE7QUFDQSxvQzs7Ozs7OztBQ3ZGQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ3lCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQSxrRDs7Ozs7Ozs7QUM3QkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0EseUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjdjMmZlMDIwOTRjZDY2NjdiMjAiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5jb25zdCBWT0lEMCA9IHZvaWQgKDApLCBfQk9PTEVBTiA9IHR5cGVvZiB0cnVlLCBfTlVNQkVSID0gdHlwZW9mIDAsIF9TVFJJTkcgPSB0eXBlb2YgXCJcIiwgX1NZTUJPTCA9IFwic3ltYm9sXCIsIF9PQkpFQ1QgPSB0eXBlb2Yge30sIF9VTkRFRklORUQgPSB0eXBlb2YgVk9JRDAsIF9GVU5DVElPTiA9IHR5cGVvZiBmdW5jdGlvbiAoKSB7IH0sIExFTkdUSCA9IFwibGVuZ3RoXCI7XG4vLyBPbmx5IHVzZWQgZm9yIHByaW1pdGl2ZXMuXG5jb25zdCB0eXBlSW5mb1JlZ2lzdHJ5ID0ge307XG4vKipcbiAqIEV4cG9zZXMgZWFzeSBhY2Nlc3MgdG8gdHlwZSBpbmZvcm1hdGlvbiBpbmNsdWRpbmcgaW5xdWlyaW5nIGFib3V0IG1lbWJlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBUeXBlSW5mbyB7XG4gICAgY29uc3RydWN0b3IodGFyZ2V0LCBvbkJlZm9yZUZyZWV6ZSkge1xuICAgICAgICB0aGlzLmlzQm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTnVtYmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdHJpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1RydWVOYU4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc09iamVjdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRnVuY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1VuZGVmaW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTeW1ib2wgPSBmYWxzZTtcbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUgPSB0eXBlb2YgdGFyZ2V0KSB7XG4gICAgICAgICAgICBjYXNlIF9CT09MRUFOOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNCb29sZWFuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJpbWl0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX05VTUJFUjpcbiAgICAgICAgICAgICAgICB0aGlzLmlzTnVtYmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVHJ1ZU5hTiA9IGlzTmFOKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0Zpbml0ZSA9IGlzRmluaXRlKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTnVtYmVyID0gIXRoaXMuaXNUcnVlTmFOO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfU1RSSU5HOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNTdHJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmltaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfU1lNQk9MOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNTeW1ib2wgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfT0JKRUNUOlxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc051bGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTnVsbE9yVW5kZWZpbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQXJyYXkgPSAodGFyZ2V0KSBpbnN0YW5jZW9mIChBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPYmplY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgX0ZVTkNUSU9OOlxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGdW5jdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIF9VTkRFRklORUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5pc1VuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc051bGxPclVuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByaW1pdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IFwiRmF0YWwgdHlwZSBmYWlsdXJlLiAgVW5rbm93biB0eXBlOiBcIiArIHRoaXMudHlwZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob25CZWZvcmVGcmVlemUpXG4gICAgICAgICAgICBvbkJlZm9yZUZyZWV6ZSh0aGlzKTtcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIFR5cGVJbmZvIGZvciBhbnkgbWVtYmVyIG9yIG5vbi1tZW1iZXIsXG4gICAgICogd2hlcmUgbm9uLW1lbWJlcnMgYXJlIG9mIHR5cGUgdW5kZWZpbmVkLlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHJldHVybnMge1R5cGVJbmZvfVxuICAgICAqL1xuICAgIG1lbWJlcihuYW1lKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLnRhcmdldDtcbiAgICAgICAgcmV0dXJuIFR5cGVJbmZvLmdldEZvcih0ICYmIChuYW1lKSBpbiAodClcbiAgICAgICAgICAgID8gdFtuYW1lXVxuICAgICAgICAgICAgOiBWT0lEMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBUeXBlSW5mbyBmb3IgYW55IHRhcmdldCBvYmplY3QuXG4gICAgICogSWYgdGhlIHRhcmdldCBvYmplY3QgaXMgb2YgYSBwcmltaXRpdmUgdHlwZSwgaXQgcmV0dXJucyB0aGUgVHlwZUluZm8gaW5zdGFuY2UgYXNzaWduZWQgdG8gdGhhdCB0eXBlLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyB7VHlwZUluZm99XG4gICAgICovXG4gICAgc3RhdGljIGdldEZvcih0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiB0YXJnZXQ7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBfT0JKRUNUOlxuICAgICAgICAgICAgY2FzZSBfRlVOQ1RJT046XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUeXBlSW5mbyh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbmZvID0gdHlwZUluZm9SZWdpc3RyeVt0eXBlXTtcbiAgICAgICAgaWYgKCFpbmZvKVxuICAgICAgICAgICAgdHlwZUluZm9SZWdpc3RyeVt0eXBlXSA9IGluZm8gPSBuZXcgVHlwZUluZm8odGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFyZ2V0IG1hdGNoZXMgdGhlIHR5cGUgKGluc3RhbmNlb2YpLlxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXModHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIHRhcmdldCBkb2VzIG5vdCBtYXRjaCB0aGUgdHlwZSAoaW5zdGFuY2VvZikuXG4gICAgICogT3RoZXJ3aXNlIHJldHVybnMgdGhlIHRhcmdldCBhcyB0aGUgdHlwZS5cbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtUfG51bGx9XG4gICAgICovXG4gICAgYXModHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQgaW5zdGFuY2VvZiB0eXBlID8gdGhpcy50YXJnZXQgOiBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBUeXBlKHRhcmdldCkge1xuICAgIHJldHVybiBuZXcgVHlwZUluZm8odGFyZ2V0KTtcbn1cbihmdW5jdGlvbiAoVHlwZSkge1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiB0cnVlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLkJPT0xFQU4gPSBfQk9PTEVBTjtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgMFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5OVU1CRVIgPSBfTlVNQkVSO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiBcIlwiXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLlNUUklORyA9IF9TVFJJTkc7XG4gICAgLyoqXG4gICAgICogdHlwZW9mIHt9XG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBUeXBlLk9CSkVDVCA9IF9PQkpFQ1Q7XG4gICAgLyoqXG4gICAgICogdHlwZW9mIFN5bWJvbFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgVHlwZS5TWU1CT0wgPSBfU1lNQk9MO1xuICAgIC8qKlxuICAgICAqIHR5cGVvZiB1bmRlZmluZWRcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuVU5ERUZJTkVEID0gX1VOREVGSU5FRDtcbiAgICAvKipcbiAgICAgKiB0eXBlb2YgZnVuY3Rpb25cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIFR5cGUuRlVOQ1RJT04gPSBfRlVOQ1RJT047XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB0YXJnZXQgbWF0Y2hlcyB0aGUgdHlwZSAoaW5zdGFuY2VvZikuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICogQHJldHVybnMge1R8bnVsbH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh0YXJnZXQsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIHR5cGU7XG4gICAgfVxuICAgIFR5cGUuaXMgPSBpcztcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIHRhcmdldCBkb2VzIG5vdCBtYXRjaCB0aGUgdHlwZSAoaW5zdGFuY2VvZikuXG4gICAgICogT3RoZXJ3aXNlIHJldHVybnMgdGhlIHRhcmdldCBhcyB0aGUgdHlwZS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKiBAcmV0dXJucyB7VHxudWxsfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzKHRhcmdldCwgdHlwZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgdHlwZSA/IHRhcmdldCA6IG51bGw7XG4gICAgfVxuICAgIFR5cGUuYXMgPSBhcztcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbDtcbiAgICB9XG4gICAgVHlwZS5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGEgYm9vbGVhbi5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX0JPT0xFQU47XG4gICAgfVxuICAgIFR5cGUuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGEgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBpZ25vcmVOYU4gRGVmYXVsdCBpcyBmYWxzZS4gV2hlbiB0cnVlLCBOYU4gaXMgbm90IGNvbnNpZGVyZWQgYSBudW1iZXIgYW5kIHdpbGwgcmV0dXJuIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlLCBpZ25vcmVOYU4gPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfTlVNQkVSICYmICghaWdub3JlTmFOIHx8ICFpc05hTih2YWx1ZSkpO1xuICAgIH1cbiAgICBUeXBlLmlzTnVtYmVyID0gaXNOdW1iZXI7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGlzIGEgbnVtYmVyIGFuZCBpcyBOYU4uXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNUcnVlTmFOKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IF9OVU1CRVIgJiYgaXNOYU4odmFsdWUpO1xuICAgIH1cbiAgICBUeXBlLmlzVHJ1ZU5hTiA9IGlzVHJ1ZU5hTjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhcmFtZXRlciBpcyBhIHN0cmluZy5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfU1RSSU5HO1xuICAgIH1cbiAgICBUeXBlLmlzU3RyaW5nID0gaXNTdHJpbmc7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4sIHN0cmluZywgbnVtYmVyLCBudWxsLCBvciB1bmRlZmluZWQuXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGFsbG93VW5kZWZpbmVkIGlmIHNldCB0byB0cnVlIHdpbGwgcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSwgYWxsb3dVbmRlZmluZWQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB0ID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICBzd2l0Y2ggKHQpIHtcbiAgICAgICAgICAgIGNhc2UgX0JPT0xFQU46XG4gICAgICAgICAgICBjYXNlIF9TVFJJTkc6XG4gICAgICAgICAgICBjYXNlIF9OVU1CRVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjYXNlIF9VTkRFRklORUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsbG93VW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FzZSBfT0JKRUNUOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFR5cGUuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcbiAgICAvKipcbiAgICAgKiBGb3IgZGV0ZWN0aW5nIGlmIHRoZSB2YWx1ZSBjYW4gYmUgdXNlZCBhcyBhIGtleS5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYWxsb3dVbmRlZmluZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzUHJpbWl0aXZlT3JTeW1ib2wodmFsdWUsIGFsbG93VW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gX1NZTUJPTCA/IHRydWUgOiBpc1ByaW1pdGl2ZSh2YWx1ZSwgYWxsb3dVbmRlZmluZWQpO1xuICAgIH1cbiAgICBUeXBlLmlzUHJpbWl0aXZlT3JTeW1ib2wgPSBpc1ByaW1pdGl2ZU9yU3ltYm9sO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcsIG51bWJlciwgb3Igc3ltYm9sLlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzUHJvcGVydHlLZXkodmFsdWUpIHtcbiAgICAgICAgY29uc3QgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICBjYXNlIF9TVFJJTkc6XG4gICAgICAgICAgICBjYXNlIF9OVU1CRVI6XG4gICAgICAgICAgICBjYXNlIF9TWU1CT0w6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBUeXBlLmlzUHJvcGVydHlLZXkgPSBpc1Byb3BlcnR5S2V5O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFyYW1ldGVyIGlzIGEgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfRlVOQ1RJT047XG4gICAgfVxuICAgIFR5cGUuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0LlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhbGxvd051bGwgSWYgZmFsc2UgKGRlZmF1bHQpIG51bGwgaXMgbm90IGNvbnNpZGVyZWQgYW4gb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlLCBhbGxvd051bGwgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBfT0JKRUNUICYmIChhbGxvd051bGwgfHwgdmFsdWUgIT09IG51bGwpO1xuICAgIH1cbiAgICBUeXBlLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4gICAgLyoqXG4gICAgICogR3VhcmFudGVlcyBhIG51bWJlciB2YWx1ZSBvciBOYU4gaW5zdGVhZC5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG51bWJlck9yTmFOKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpc05hTih2YWx1ZSkgPyBOYU4gOiB2YWx1ZTtcbiAgICB9XG4gICAgVHlwZS5udW1iZXJPck5hTiA9IG51bWJlck9yTmFOO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBUeXBlSW5mbyBvYmplY3QgZm9yIHRoZSB0YXJnZXQuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEByZXR1cm5zIHtUeXBlSW5mb31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvZih0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIFR5cGVJbmZvLmdldEZvcih0YXJnZXQpO1xuICAgIH1cbiAgICBUeXBlLm9mID0gb2Y7XG4gICAgLyoqXG4gICAgICogV2lsbCBkZXRlY3QgaWYgYSBtZW1iZXIgZXhpc3RzICh1c2luZyAnaW4nKS5cbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYSBwcm9wZXJ0eSBvciBtZXRob2QgZXhpc3RzIG9uIHRoZSBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZS5cbiAgICAgKiBAcGFyYW0gaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgTmFtZSBvZiB0aGUgbWVtYmVyLlxuICAgICAqIEBwYXJhbSBpZ25vcmVVbmRlZmluZWQgV2hlbiBpZ25vcmVVbmRlZmluZWQgaXMgdHJ1ZSwgaWYgdGhlIG1lbWJlciBleGlzdHMgYnV0IGlzIHVuZGVmaW5lZCwgaXQgd2lsbCByZXR1cm4gZmFsc2UuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzTWVtYmVyKGluc3RhbmNlLCBwcm9wZXJ0eSwgaWdub3JlVW5kZWZpbmVkID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UgJiYgIWlzUHJpbWl0aXZlKGluc3RhbmNlKSAmJiAocHJvcGVydHkpIGluIChpbnN0YW5jZSkgJiYgKGlnbm9yZVVuZGVmaW5lZCB8fCBpbnN0YW5jZVtwcm9wZXJ0eV0gIT09IFZPSUQwKTtcbiAgICB9XG4gICAgVHlwZS5oYXNNZW1iZXIgPSBoYXNNZW1iZXI7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBtZW1iZXIgbWF0Y2hlcyB0aGUgdHlwZS5cbiAgICAgKiBAcGFyYW0gaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICAgKiBAcGFyYW0gdHlwZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgcHJvcGVydHksIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGhhc01lbWJlcihpbnN0YW5jZSwgcHJvcGVydHkpICYmIHR5cGVvZiAoaW5zdGFuY2VbcHJvcGVydHldKSA9PT0gdHlwZTtcbiAgICB9XG4gICAgVHlwZS5oYXNNZW1iZXJPZlR5cGUgPSBoYXNNZW1iZXJPZlR5cGU7XG4gICAgZnVuY3Rpb24gaGFzTWV0aG9kKGluc3RhbmNlLCBwcm9wZXJ0eSkge1xuICAgICAgICByZXR1cm4gaGFzTWVtYmVyT2ZUeXBlKGluc3RhbmNlLCBwcm9wZXJ0eSwgX0ZVTkNUSU9OKTtcbiAgICB9XG4gICAgVHlwZS5oYXNNZXRob2QgPSBoYXNNZXRob2Q7XG4gICAgZnVuY3Rpb24gaXNBcnJheUxpa2UoaW5zdGFuY2UpIHtcbiAgICAgICAgLypcbiAgICAgICAgICogTk9URTpcbiAgICAgICAgICpcbiAgICAgICAgICogRnVuY3Rpb25zOlxuICAgICAgICAgKiBFbnVtZXJhdGluZyBhIGZ1bmN0aW9uIGFsdGhvdWdoIGl0IGhhcyBhIC5sZW5ndGggcHJvcGVydHkgd2lsbCB5aWVsZCBub3RoaW5nIG9yIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgICogRWZmZWN0aXZlbHksIGEgZnVuY3Rpb24gaXMgbm90IGxpa2UgYW4gYXJyYXkuXG4gICAgICAgICAqXG4gICAgICAgICAqIFN0cmluZ3M6XG4gICAgICAgICAqIEJlaGF2ZSBsaWtlIGFycmF5cyBidXQgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBleGFjdCBtZXRob2RzLlxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgIHx8IFR5cGUuaXNTdHJpbmcoaW5zdGFuY2UpXG4gICAgICAgICAgICB8fCAhVHlwZS5pc0Z1bmN0aW9uKGluc3RhbmNlKSAmJiBoYXNNZW1iZXIoaW5zdGFuY2UsIExFTkdUSCk7XG4gICAgfVxuICAgIFR5cGUuaXNBcnJheUxpa2UgPSBpc0FycmF5TGlrZTtcbn0pKFR5cGUgfHwgKFR5cGUgPSB7fSkpO1xuT2JqZWN0LmZyZWV6ZShUeXBlKTtcbmV4cG9ydCBkZWZhdWx0IFR5cGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UeXBlcy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1R5cGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL1R5cGVzXCI7XG52YXIgaXNUcnVlTmFOID0gVHlwZS5pc1RydWVOYU47XG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbi8qKlxuICogVXNlZCBmb3Igc3BlY2lhbCBjb21wYXJpc29uIGluY2x1ZGluZyBOYU4uXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEBwYXJhbSBzdHJpY3RcbiAqIEByZXR1cm5zIHtib29sZWFufGFueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFyZUVxdWFsKGEsIGIsIHN0cmljdCA9IHRydWUpIHtcbiAgICByZXR1cm4gYSA9PT0gYlxuICAgICAgICB8fCAhc3RyaWN0ICYmIGEgPT0gYlxuICAgICAgICB8fCBpc1RydWVOYU4oYSkgJiYgaXNUcnVlTmFOKGIpO1xufVxuY29uc3QgQ09NUEFSRV9UTyA9IFwiY29tcGFyZVRvXCI7XG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZShhLCBiLCBzdHJpY3QgPSB0cnVlKSB7XG4gICAgaWYgKGFyZUVxdWFsKGEsIGIsIHN0cmljdCkpXG4gICAgICAgIHJldHVybiAwIC8qIEVxdWFsICovO1xuICAgIGlmIChhICYmIFR5cGUuaGFzTWVtYmVyKGEsIENPTVBBUkVfVE8pKVxuICAgICAgICByZXR1cm4gYS5jb21wYXJlVG8oYik7IC8vIElmIGEgaGFzIGNvbXBhcmVUbywgdXNlIGl0LlxuICAgIGVsc2UgaWYgKGIgJiYgVHlwZS5oYXNNZW1iZXIoYiwgQ09NUEFSRV9UTykpXG4gICAgICAgIHJldHVybiAtYi5jb21wYXJlVG8oYSk7IC8vIGEgZG9lc24ndCBoYXZlIGNvbXBhcmVUbz8gY2hlY2sgaWYgYiBkb2VzIGFuZCBpbnZlcnQuXG4gICAgLy8gQWxsb3cgZm9yIHNwZWNpYWwgaW5lcXVhbGl0eS4uXG4gICAgaWYgKGEgPiBiIHx8IHN0cmljdCAmJiAoYSA9PT0gMCAmJiBiID09IDAgfHwgYSA9PT0gbnVsbCAmJiBiID09PSBWT0lEMCkpXG4gICAgICAgIHJldHVybiAxIC8qIEdyZWF0ZXIgKi87XG4gICAgaWYgKGIgPiBhIHx8IHN0cmljdCAmJiAoYiA9PT0gMCAmJiBhID09IDAgfHwgYiA9PT0gbnVsbCAmJiBhID09PSBWT0lEMCkpXG4gICAgICAgIHJldHVybiAtMSAvKiBMZXNzICovO1xuICAgIHJldHVybiBOYU47XG59XG4vKipcbiAqIERldGVybWluZXMgaWYgdHdvIHByaW1pdGl2ZXMgYXJlIGVxdWFsIG9yIGlmIHR3byBvYmplY3RzIGhhdmUgdGhlIHNhbWUga2V5L3ZhbHVlIGNvbWJpbmF0aW9ucy5cbiAqIEBwYXJhbSBhXG4gKiBAcGFyYW0gYlxuICogQHBhcmFtIG51bGxFcXVpdmFsZW5jeSBJZiB0cnVlLCBudWxsL3VuZGVmaW5lZCB3aWxsIGJlIGVxdWl2YWxlbnQgdG8gYW4gZW1wdHkgb2JqZWN0IHt9LlxuICogQHBhcmFtIGV4dHJhRGVwdGhcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJlRXF1aXZhbGVudChhLCBiLCBudWxsRXF1aXZhbGVuY3kgPSB0cnVlLCBleHRyYURlcHRoID0gMCkge1xuICAgIC8vIFRha2UgYSBzdGVwIGJ5IHN0ZXAgYXBwcm9hY2ggdG8gZW5zdXJlIGVmZmljaWVuY3kuXG4gICAgaWYgKGFyZUVxdWFsKGEsIGIsIHRydWUpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkge1xuICAgICAgICBpZiAoIW51bGxFcXVpdmFsZW5jeSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKFR5cGUuaXNPYmplY3QoYSkpIHtcbiAgICAgICAgICAgIHJldHVybiAhT2JqZWN0LmtleXMoYSkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChUeXBlLmlzT2JqZWN0KGIpKSB7XG4gICAgICAgICAgICByZXR1cm4gIU9iamVjdC5rZXlzKGIpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYSA9PSBudWxsICYmIGIgPT0gbnVsbDtcbiAgICB9XG4gICAgaWYgKFR5cGUuaXNPYmplY3QoYSkgJiYgVHlwZS5pc09iamVjdChiKSkge1xuICAgICAgICBjb25zdCBhS2V5cyA9IE9iamVjdC5rZXlzKGEpLCBiS2V5cyA9IE9iamVjdC5rZXlzKGIpLCBsZW4gPSBhS2V5cy5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gIT0gYktleXMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBhS2V5cy5zb3J0KCk7XG4gICAgICAgIGJLZXlzLnNvcnQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGtleSA9IGFLZXlzW2ldO1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gYktleXNbaV0gfHwgIWFyZUVxdWFsKGFba2V5XSwgYltrZXldLCB0cnVlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9lc24ndCB0cmFjayBjaXJjdWxhciByZWZlcmVuY2VzIGJ1dCBhbGxvd3MgZm9yIGNvbnRyb2xsaW5nIHRoZSBhbW91bnQgb2YgcmVjdXJzaW9uLlxuICAgICAgICBpZiAoZXh0cmFEZXB0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBhS2V5cykge1xuICAgICAgICAgICAgICAgIGlmICghYXJlRXF1aXZhbGVudChhW2tleV0sIGJba2V5XSwgbnVsbEVxdWl2YWxlbmN5LCBleHRyYURlcHRoIC0gMSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tcGFyZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbXBhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnQXJndW1lbnROdWxsRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBBcmd1bWVudE51bGxFeGNlcHRpb24gZXh0ZW5kcyBBcmd1bWVudEV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lLCBtZXNzYWdlID0gYCcke3BhcmFtTmFtZX0nIGlzIG51bGwgKG9yIHVuZGVmaW5lZCkuYCwgaW5uZXJFeGNlcHRpb24pIHtcbiAgICAgICAgc3VwZXIocGFyYW1OYW1lLCBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbik7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFyZ3VtZW50TnVsbEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvQXJndW1lbnROdWxsRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgU3lzdGVtRXhjZXB0aW9uIH0gZnJvbSBcIi4vU3lzdGVtRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyB0cmltIH0gZnJvbSBcIi4uL1RleHQvVXRpbGl0eVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0FyZ3VtZW50RXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBBcmd1bWVudEV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgLy8gRm9yIHNpbXBsaWNpdHkgYW5kIGNvbnNpc3RlbmN5LCBsZXRzIHN0aWNrIHdpdGggMSBzaWduYXR1cmUuXG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lLCBtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbiwgYmVmb3JlU2VhbGluZykge1xuICAgICAgICBsZXQgcG4gPSBwYXJhbU5hbWUgPyAoJ3snICsgcGFyYW1OYW1lICsgJ30gJykgOiAnJztcbiAgICAgICAgc3VwZXIodHJpbShwbiArIChtZXNzYWdlIHx8ICcnKSksIGlubmVyRXhjZXB0aW9uLCAoXykgPT4ge1xuICAgICAgICAgICAgXy5wYXJhbU5hbWUgPSBwYXJhbU5hbWU7XG4gICAgICAgICAgICBpZiAoYmVmb3JlU2VhbGluZylcbiAgICAgICAgICAgICAgICBiZWZvcmVTZWFsaW5nKF8pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQXJndW1lbnRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bcmd1bWVudEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSAnQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gZXh0ZW5kcyBBcmd1bWVudEV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lLCBhY3R1YWxWYWx1ZSwgbWVzc2FnZSA9ICcgJywgaW5uZXJFeGNlcHRpb24pIHtcbiAgICAgICAgc3VwZXIocGFyYW1OYW1lLCBgKCR7YWN0dWFsVmFsdWV9KSBgICsgbWVzc2FnZSwgaW5uZXJFeGNlcHRpb24sIChfKSA9PiB7XG4gICAgICAgICAgICBfLmFjdHVhbFZhbHVlID0gYWN0dWFsVmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gTkFNRTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uLy4uL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IE9iamVjdFBvb2wgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9PYmplY3RQb29sXCI7XG5pbXBvcnQgeyBJdGVyYXRvclJlc3VsdCB9IGZyb20gXCIuL0l0ZXJhdG9yUmVzdWx0XCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xubGV0IHlpZWxkZXJQb29sO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmZ1bmN0aW9uIHlpZWxkZXIocmVjeWNsZSkge1xuICAgIGlmICgheWllbGRlclBvb2wpXG4gICAgICAgIHlpZWxkZXJQb29sXG4gICAgICAgICAgICA9IG5ldyBPYmplY3RQb29sKDQwLCAoKSA9PiBuZXcgWWllbGRlcigpLCB5ID0+IHkueWllbGRCcmVhaygpKTtcbiAgICBpZiAoIXJlY3ljbGUpXG4gICAgICAgIHJldHVybiB5aWVsZGVyUG9vbC50YWtlKCk7XG4gICAgeWllbGRlclBvb2wuYWRkKHJlY3ljbGUpO1xufVxuY2xhc3MgWWllbGRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBOYU47XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkgeyByZXR1cm4gdGhpcy5fY3VycmVudDsgfSAvLyB0aGlzIGNsYXNzIGlzIG5vdCBlbnRpcmVseSBsb2NhbC9wcml2YXRlLiAgU3RpbGwgbmVlZHMgcHJvdGVjdGlvbi5cbiAgICBnZXQgaW5kZXgoKSB7IHJldHVybiB0aGlzLl9pbmRleDsgfVxuICAgIHlpZWxkUmV0dXJuKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSB2YWx1ZTtcbiAgICAgICAgaWYgKGlzTmFOKHRoaXMuX2luZGV4KSlcbiAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5faW5kZXgrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHlpZWxkQnJlYWsoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBOYU47XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy55aWVsZEJyZWFrKCk7XG4gICAgfVxufVxuY29uc3QgTkFNRSA9IFwiRW51bWVyYXRvckJhc2VcIjtcbi8vIFwiRW51bWVyYXRvclwiIGlzIGNvbmZsaWN0IEpTY3JpcHQncyBcIkVudW1lcmF0b3JcIlxuLy8gTmFtaW5nIHRoaXMgY2xhc3MgRW51bWVyYXRvckJhc2UgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggSUUuXG5leHBvcnQgY2xhc3MgRW51bWVyYXRvckJhc2UgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2luaXRpYWxpemVyLCBfdHJ5R2V0TmV4dCwgZGlzcG9zZXIsIGlzRW5kbGVzcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplciA9IF9pbml0aWFsaXplcjtcbiAgICAgICAgdGhpcy5fdHJ5R2V0TmV4dCA9IF90cnlHZXROZXh0O1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE5BTUU7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgaWYgKFR5cGUuaXNCb29sZWFuKGlzRW5kbGVzcykpXG4gICAgICAgICAgICB0aGlzLl9pc0VuZGxlc3MgPSBpc0VuZGxlc3M7XG4gICAgICAgIGVsc2UgaWYgKFR5cGUuaXNCb29sZWFuKGRpc3Bvc2VyKSlcbiAgICAgICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGRpc3Bvc2VyO1xuICAgICAgICBpZiAoVHlwZS5pc0Z1bmN0aW9uKGRpc3Bvc2VyKSlcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VyID0gZGlzcG9zZXI7XG4gICAgfVxuICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5feWllbGRlcjtcbiAgICAgICAgcmV0dXJuIHkgJiYgeS5jdXJyZW50O1xuICAgIH1cbiAgICBnZXQgaW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLl95aWVsZGVyO1xuICAgICAgICByZXR1cm4geSA/IHkuaW5kZXggOiBOYU47XG4gICAgfVxuICAgIC8qXG4gICAgICogUHJvdmlkZXMgYSBtZWNoYW5pc20gdG8gaW5kaWNhdGUgaWYgdGhpcyBlbnVtZXJhYmxlIG5ldmVyIGVuZHMuXG4gICAgICogSWYgc2V0IHRvIHRydWUsIHNvbWUgb3BlcmF0aW9ucyB0aGF0IGV4cGVjdCBhIGZpbml0ZSByZXN1bHQgbWF5IHRocm93LlxuICAgICAqIEV4cGxpY2l0IGZhbHNlIG1lYW5zIGl0IGhhcyBhbiBlbmQuXG4gICAgICogSW1wbGljaXQgdm9pZCBtZWFucyB1bmtub3duLlxuICAgICAqL1xuICAgIGdldCBpc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuZGxlc3M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZGVkIGZvciBjb21wYXRpYmlsaXR5IGJ1dCBvbmx5IHdvcmtzIGlmIHRoZSBlbnVtZXJhdG9yIGlzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICByZXNldCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHkgPSBfLl95aWVsZGVyO1xuICAgICAgICBfLl95aWVsZGVyID0gbnVsbDtcbiAgICAgICAgXy5fc3RhdGUgPSAwIC8qIEJlZm9yZSAqLztcbiAgICAgICAgaWYgKHkpXG4gICAgICAgICAgICB5aWVsZGVyKHkpOyAvLyByZWN5Y2xlIHVudGlsIGFjdHVhbGx5IG5lZWRlZC5cbiAgICB9XG4gICAgX2Fzc2VydEJhZFN0YXRlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgc3dpdGNoIChfLl9zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAzIC8qIEZhdWx0ZWQgKi86XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGlzIGVudW1lcmF0b3IgY2F1c2VkIGEgZmF1bHQgYW5kIHdhcyBkaXNwb3NlZC5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDUgLyogRGlzcG9zZWQgKi86XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoXCJUaGlzIGVudW1lcmF0b3Igd2FzIG1hbnVhbGx5IGRpc3Bvc2VkLlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXNzZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gdGhlIG91dCBjYWxsYmFjayBpZiB0aGUgZW51bWVyYXRvciBpcyBhY3RpdmUuXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIHRyeUdldEN1cnJlbnQob3V0KSB7XG4gICAgICAgIHRoaXMuX2Fzc2VydEJhZFN0YXRlKCk7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gMSAvKiBBY3RpdmUgKi8pIHtcbiAgICAgICAgICAgIG91dCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZSA8IDIgLyogQ29tcGxldGVkICovO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYWZlbHkgbW92ZXMgdG8gdGhlIG5leHQgZW50cnkgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBvbmUuXG4gICAgICogTm90ZTogV2lsbCB0aHJvdyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBpZiB0aGlzIGhhcyBmYXVsdGVkIG9yIG1hbnVhbGx5IGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIG1vdmVOZXh0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fYXNzZXJ0QmFkU3RhdGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN3aXRjaCAoXy5fc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDAgLyogQmVmb3JlICovOlxuICAgICAgICAgICAgICAgICAgICBfLl95aWVsZGVyID0gXy5feWllbGRlciB8fCB5aWVsZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF8uX3N0YXRlID0gMSAvKiBBY3RpdmUgKi87XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxpemVyID0gXy5faW5pdGlhbGl6ZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSAxIC8qIEFjdGl2ZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uX3RyeUdldE5leHQoXy5feWllbGRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLl9zdGF0ZSA9IDIgLyogQ29tcGxldGVkICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIF8uX3N0YXRlID0gMyAvKiBGYXVsdGVkICovO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBlbnRyeSBhbmQgZW1pdHMgdGhlIHZhbHVlIHRocm91Z2ggdGhlIG91dCBjYWxsYmFjay5cbiAgICAgKiBOb3RlOiBXaWxsIHRocm93IE9iamVjdERpc3Bvc2VkRXhjZXB0aW9uIGlmIHRoaXMgaGFzIGZhdWx0ZWQgb3IgbWFudWFsbHkgZGlzcG9zZWQuXG4gICAgICovXG4gICAgdHJ5TW92ZU5leHQob3V0KSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIG91dCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBuZXh0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVOZXh0KClcbiAgICAgICAgICAgID8gdGhpcy5jdXJyZW50XG4gICAgICAgICAgICA6IFZPSUQwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeHBvc2VkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggZ2VuZXJhdG9ycy5cbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTmV4dCgpXG4gICAgICAgICAgICA/IG5ldyBJdGVyYXRvclJlc3VsdCh0aGlzLmN1cnJlbnQsIHRoaXMuaW5kZXgpXG4gICAgICAgICAgICA6IEl0ZXJhdG9yUmVzdWx0LkRvbmU7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlRGlzcG9zZVN0YXRlKDQgLyogSW50ZXJydXB0ZWQgKi8pO1xuICAgIH1cbiAgICAncmV0dXJuJyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5fYXNzZXJ0QmFkU3RhdGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gVk9JRDAgfHwgXy5fc3RhdGUgPT09IDIgLyogQ29tcGxldGVkICovIHx8IF8uX3N0YXRlID09PSA0IC8qIEludGVycnVwdGVkICovXG4gICAgICAgICAgICAgICAgPyBJdGVyYXRvclJlc3VsdC5Eb25lXG4gICAgICAgICAgICAgICAgOiBuZXcgSXRlcmF0b3JSZXN1bHQodmFsdWUsIFZPSUQwLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2Vuc3VyZURpc3Bvc2VTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFfLndhc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBfLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIF8uX3N0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2lzRW5kbGVzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBkaXNwb3NlciA9IF8uX2Rpc3Bvc2VyO1xuICAgICAgICBfLl9pbml0aWFsaXplciA9IG51bGw7XG4gICAgICAgIF8uX2Rpc3Bvc2VyID0gbnVsbDtcbiAgICAgICAgY29uc3QgeSA9IF8uX3lpZWxkZXI7XG4gICAgICAgIF8uX3lpZWxkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IDUgLyogRGlzcG9zZWQgKi87XG4gICAgICAgIGlmICh5KVxuICAgICAgICAgICAgeWllbGRlcih5KTtcbiAgICAgICAgaWYgKGRpc3Bvc2VyKVxuICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBFbnVtZXJhdG9yQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVudW1lcmF0b3JCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5leHBvcnQgZnVuY3Rpb24gSW50ZWdlcihuKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3Iobik7XG59XG4oZnVuY3Rpb24gKEludGVnZXIpIHtcbiAgICBJbnRlZ2VyLk1BWF8zMl9CSVQgPSAyMTQ3NDgzNjQ3O1xuICAgIEludGVnZXIuTUFYX1ZBTFVFID0gOTAwNzE5OTI1NDc0MDk5MTtcbiAgICBjb25zdCBOVU1CRVIgPSBcIm51bWJlclwiO1xuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGFueSBudW1iZXIgdG8gaXRzIDMyYml0IGNvdW50ZXJwYXJ0LlxuICAgICAqIFRocm93cyBpZiBjb252ZXJzaW9uIGlzIG5vdCBwb3NzaWJsZS5cbiAgICAgKiBAcGFyYW0gblxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gYXMzMkJpdChuKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG4gfCAwO1xuICAgICAgICBpZiAoaXNOYU4obikpXG4gICAgICAgICAgICB0aHJvdyBcIiduJyBpcyBub3QgYSBudW1iZXIuXCI7XG4gICAgICAgIGlmIChuICE9PSAtMSAmJiByZXN1bHQgPT09IC0xKVxuICAgICAgICAgICAgdGhyb3cgXCInbicgaXMgdG9vIGxhcmdlIHRvIGJlIGEgMzIgYml0IGludGVnZXIuXCI7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIEludGVnZXIuYXMzMkJpdCA9IGFzMzJCaXQ7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXMobikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG4gPT09IE5VTUJFUiAmJiBpc0Zpbml0ZShuKSAmJiBuID09PSBNYXRoLmZsb29yKG4pO1xuICAgIH1cbiAgICBJbnRlZ2VyLmlzID0gaXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyB3aXRoaW4gYSAzMiBiaXQgcmFuZ2UuXG4gICAgICogQHBhcmFtIG5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpczMyQml0KG4pIHtcbiAgICAgICAgcmV0dXJuIG4gPT09IChuIHwgMCk7XG4gICAgfVxuICAgIEludGVnZXIuaXMzMkJpdCA9IGlzMzJCaXQ7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIG5vdCBhbiBpbnRlZ2VyLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHBhcmFtIGFyZ3VtZW50TmFtZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzc2VydChuLCBhcmd1bWVudE5hbWUpIHtcbiAgICAgICAgbGV0IGkgPSBpcyhuKTtcbiAgICAgICAgaWYgKCFpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKGFyZ3VtZW50TmFtZSB8fCAnbicsIFwiTXVzdCBiZSBhIGludGVnZXIuXCIpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgSW50ZWdlci5hc3NlcnQgPSBhc3NlcnQ7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIGxlc3MgdGhhbiB6ZXJvLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHBhcmFtIGFyZ3VtZW50TmFtZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzc2VydFplcm9PckdyZWF0ZXIobiwgYXJndW1lbnROYW1lKSB7XG4gICAgICAgIGxldCBpID0gYXNzZXJ0KG4sIGFyZ3VtZW50TmFtZSkgJiYgbiA+PSAwO1xuICAgICAgICBpZiAoIWkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKGFyZ3VtZW50TmFtZSB8fCAnbicsIG4sIFwiTXVzdCBiZSBhIHZhbGlkIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8uXCIpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyID0gYXNzZXJ0WmVyb09yR3JlYXRlcjtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgaWYgbm90IGdyZWF0ZXIgdGhhbiB6ZXJvLlxuICAgICAqIEBwYXJhbSBuXG4gICAgICogQHBhcmFtIGFyZ3VtZW50TmFtZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzc2VydFBvc2l0aXZlKG4sIGFyZ3VtZW50TmFtZSkge1xuICAgICAgICBsZXQgaSA9IGFzc2VydChuLCBhcmd1bWVudE5hbWUpICYmIG4gPiAwO1xuICAgICAgICBpZiAoIWkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKGFyZ3VtZW50TmFtZSB8fCAnbicsIG4sIFwiTXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby5cIik7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICBJbnRlZ2VyLmFzc2VydFBvc2l0aXZlID0gYXNzZXJ0UG9zaXRpdmU7XG59KShJbnRlZ2VyIHx8IChJbnRlZ2VyID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEludGVnZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnRlZ2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vSW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L1N5c3RlbS5FeGNlcHRpb24lMjh2PXZzLjExMCUyOS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuL1N5c3RlbUV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vRXhjZXB0aW9ucy9JbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvc3lzdGVtLnN5c3RlbWV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ1N5c3RlbUV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgU3lzdGVtRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgICAvKlxuICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIG1lc3NhZ2U6c3RyaW5nID0gbnVsbCxcbiAgICAgICAgICAgIGlubmVyRXhjZXB0aW9uOkVycm9yID0gbnVsbCxcbiAgICAgICAgICAgIGJlZm9yZVNlYWxpbmc/OihleDphbnkpPT52b2lkKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdXBlcihtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbiwgYmVmb3JlU2VhbGluZyk7XG4gICAgICAgIH1cbiAgICAqL1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFN5c3RlbUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN5c3RlbUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbnMvU3lzdGVtRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gfSBmcm9tIFwiLi9PYmplY3REaXNwb3NlZEV4Y2VwdGlvblwiO1xuZXhwb3J0IGNsYXNzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfX2ZpbmFsaXplcikge1xuICAgICAgICB0aGlzLl9fZmluYWxpemVyID0gX19maW5hbGl6ZXI7XG4gICAgICAgIHRoaXMuX193YXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgd2FzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fd2FzRGlzcG9zZWQ7XG4gICAgfVxuICAgIHRocm93SWZEaXNwb3NlZChtZXNzYWdlLCBvYmplY3ROYW1lID0gdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX193YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbihvYmplY3ROYW1lLCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIV8uX193YXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgLy8gUHJlZW1wdGl2ZWx5IHNldCB3YXNEaXNwb3NlZCBpbiBvcmRlciB0byBwcmV2ZW50IHJlcGVhdGVkIGRpc3Bvc2luZy5cbiAgICAgICAgICAgIC8vIE5PVEU6IGluIHRydWUgbXVsdGktdGhyZWFkZWQgc2NlbmFyaW9zLCB0aGlzIG5lZWRzIHRvIGJlIHN5bmNocm9uaXplZC5cbiAgICAgICAgICAgIF8uX193YXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF8uX29uRGlzcG9zZSgpOyAvLyBQcm90ZWN0ZWQgb3ZlcnJpZGUuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoXy5fX2ZpbmFsaXplcikge1xuICAgICAgICAgICAgICAgICAgICBfLl9fZmluYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF8uX19maW5hbGl6ZXIgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFBsYWNlaG9sZGVyIGZvciBvdmVycmlkZXMuXG4gICAgX29uRGlzcG9zZSgpIHsgfVxufVxuZXhwb3J0IGRlZmF1bHQgRGlzcG9zYWJsZUJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaXNwb3NhYmxlQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uLy4uL0ludGVnZXJcIjtcbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgZGVwZW5kaW5nIG9uIHRoZSByZXF1ZXN0ZWQgY2FwYWNpdHkuXG4gKiBUaGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBoYXZlIGEgLmxlbmd0aCBlcXVhbCB0byB0aGUgdmFsdWUgcHJvdmlkZWQuXG4gKiBAcGFyYW0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7VFtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShsZW5ndGgpIHtcbiAgICBJbnRlZ2VyLmFzc2VydChsZW5ndGgsICdsZW5ndGgnKTtcbiAgICAvLyBUaGlzIGxvZ2ljIGlzIGJhc2VkIHVwb24gSlMgcGVyZm9ybWFuY2UgdGVzdHMgdGhhdCBzaG93IGEgc2lnbmlmaWNhbnQgZGlmZmVyZW5jZSBhdCB0aGUgbGV2ZWwgb2YgNjU1MzYuXG4gICAgbGV0IGFycmF5O1xuICAgIGlmIChsZW5ndGggPiA2NTUzNilcbiAgICAgICAgYXJyYXkgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBlbHNlIHtcbiAgICAgICAgYXJyYXkgPSBbXTtcbiAgICAgICAgYXJyYXkubGVuZ3RoID0gbGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbml0aWFsaXplLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvaW5pdGlhbGl6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyB1c2luZyB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL2Rpc3Bvc2VcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbmltcG9ydCB7IEFycmF5RW51bWVyYXRvciB9IGZyb20gXCIuL0FycmF5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgSW5kZXhFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSW5kZXhFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24gfSBmcm9tIFwiLi9VbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb25cIjtcbmltcG9ydCB7IEluZmluaXRlRW51bWVyYXRvciB9IGZyb20gXCIuL0luZmluaXRlRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgRW1wdHlFbnVtZXJhdG9yIGFzIEVtcHR5IH0gZnJvbSBcIi4vRW1wdHlFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBJdGVyYXRvckVudW1lcmF0b3IgfSBmcm9tIFwiLi9JdGVyYXRvckVudW1lcmF0b3JcIjtcbmNvbnN0IFNUUklOR19FTVBUWSA9IFwiXCIsIEVORExFU1NfRVhDRVBUSU9OX01FU1NBR0UgPSAnQ2Fubm90IGNhbGwgZm9yRWFjaCBvbiBhbiBlbmRsZXNzIGVudW1lcmFibGUuICcgK1xuICAgICdXb3VsZCByZXN1bHQgaW4gYW4gaW5maW5pdGUgbG9vcCB0aGF0IGNvdWxkIGhhbmcgdGhlIGN1cnJlbnQgcHJvY2Vzcy4nO1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93SWZFbmRsZXNzKGlzRW5kbGVzcykge1xuICAgIGlmIChpc0VuZGxlc3MpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oRU5ETEVTU19FWENFUFRJT05fTUVTU0FHRSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBpbml0QXJyYXlGcm9tKHNvdXJjZSwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShzb3VyY2UpKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWluKHNvdXJjZS5sZW5ndGgsIG1heCk7XG4gICAgICAgIGlmIChpc0Zpbml0ZShsZW4pKSB7XG4gICAgICAgICAgICBpZiAobGVuID4gNjU1MzUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShsZW4pO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgICAgICByZXN1bHQubGVuZ3RoID0gbGVuO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vLyBDb3VsZCBiZSBhcnJheSwgb3IgSUVudW1lcmFibGUuLi5cbi8qKlxuICogUmV0dXJucyB0aGUgZW51bWVyYXRvciBmb3IgdGhlIHNwZWNpZmllZCBjb2xsZWN0aW9uLCBlbnVtZXJhdG9yLCBvciBpdGVyYXRvci5cbiAqIElmIHRoZSBzb3VyY2UgaXMgaWRlbnRpZmllZCBhcyBJRW51bWVyYXRvciBpdCB3aWxsIHJldHVybiB0aGUgc291cmNlIGFzIGlzLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb20oc291cmNlKSB7XG4gICAgLy8gVG8gc2ltcGxpZnkgYW5kIHByZXZlbnQgbnVsbCByZWZlcmVuY2UgZXhjZXB0aW9uczpcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIEVtcHR5O1xuICAgIGlmICgoc291cmNlKSBpbnN0YW5jZW9mIChBcnJheSkpXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgaWYgKFR5cGUuaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gbmV3IEluZGV4RW51bWVyYXRvcigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogc291cmNlLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBwb2ludGVyOiAwLFxuICAgICAgICAgICAgICAgIHN0ZXA6IDFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIVR5cGUuaXNQcmltaXRpdmUoc291cmNlKSkge1xuICAgICAgICBpZiAoaXNFbnVtZXJhYmxlKHNvdXJjZSkpXG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgaWYgKFR5cGUuaXNGdW5jdGlvbihzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUVudW1lcmF0b3Ioc291cmNlKTtcbiAgICAgICAgaWYgKGlzRW51bWVyYXRvcihzb3VyY2UpKVxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgaWYgKGlzSXRlcmF0b3Ioc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgSXRlcmF0b3JFbnVtZXJhdG9yKHNvdXJjZSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmFibGUoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gVHlwZS5oYXNNZW1iZXJPZlR5cGUoaW5zdGFuY2UsIFwiZ2V0RW51bWVyYXRvclwiLCBUeXBlLkZVTkNUSU9OKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VudW1lcmFibGVPckFycmF5TGlrZShpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmlzQXJyYXlMaWtlKGluc3RhbmNlKSB8fCBpc0VudW1lcmFibGUoaW5zdGFuY2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRW51bWVyYXRvcihpbnN0YW5jZSkge1xuICAgIHJldHVybiBUeXBlLmhhc01lbWJlck9mVHlwZShpbnN0YW5jZSwgXCJtb3ZlTmV4dFwiLCBUeXBlLkZVTkNUSU9OKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZXJhdG9yKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIFR5cGUuaGFzTWVtYmVyT2ZUeXBlKGluc3RhbmNlLCBcIm5leHRcIiwgVHlwZS5GVU5DVElPTik7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChlLCBhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKGUgPT09IFNUUklOR19FTVBUWSlcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKGUgJiYgbWF4ID4gMCkge1xuICAgICAgICBpZiAoVHlwZS5pc0FycmF5TGlrZShlKSkge1xuICAgICAgICAgICAgLy8gQXNzdW1lIGUubGVuZ3RoIGlzIGNvbnN0YW50IG9yIGF0IGxlYXN0IGRvZXNuJ3QgZGV2aWF0ZSB0byBpbmZpbml0ZSBvciBOYU4uXG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiAhaXNGaW5pdGUoZS5sZW5ndGgpKTtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgTWF0aC5taW4oZS5sZW5ndGgsIG1heCk7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oZVtpXSwgaSkgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VudW1lcmF0b3IoZSkpIHtcbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpICYmIGUuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIC8vIFJldHVybiB2YWx1ZSBvZiBhY3Rpb24gY2FuIGJlIGFueXRoaW5nLCBidXQgaWYgaXQgaXMgKD09PSkgZmFsc2UgdGhlbiB0aGUgZm9yRWFjaCB3aWxsIGRpc2NvbnRpbnVlLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbihlLmN1cnJlbnQsIGkrKykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VudW1lcmFibGUoZSkpIHtcbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpICYmIGUuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIC8vIEZvciBlbnVtZXJhdG9ycyB0aGF0IGFyZW4ndCBFbnVtZXJhYmxlQmFzZSwgZW5zdXJlIGRpc3Bvc2UgaXMgY2FsbGVkLlxuICAgICAgICAgICAgcmV0dXJuIHVzaW5nKGUuZ2V0RW51bWVyYXRvcigpLCBmID0+IGZvckVhY2goZiwgYWN0aW9uLCBtYXgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJdGVyYXRvcihlKSkge1xuICAgICAgICAgICAgLy8gRm9yIG91ciBwdXJwb3NlIGl0ZXJhdG9ycyBhcmUgZW5kbGVzcyBhbmQgYSBtYXggbXVzdCBiZSBzcGVjaWZpZWQgYmVmb3JlIGl0ZXJhdGluZy5cbiAgICAgICAgICAgIHRocm93SWZFbmRsZXNzKCFpc0Zpbml0ZShtYXgpKTtcbiAgICAgICAgICAgIGxldCBpID0gMCwgcjtcbiAgICAgICAgICAgIC8vIFJldHVybiB2YWx1ZSBvZiBhY3Rpb24gY2FuIGJlIGFueXRoaW5nLCBidXQgaWYgaXQgaXMgKD09PSkgZmFsc2UgdGhlbiB0aGUgZm9yRWFjaCB3aWxsIGRpc2NvbnRpbnVlLlxuICAgICAgICAgICAgd2hpbGUgKG1heCA+IGkgJiYgIShyID0gZS5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKHIudmFsdWUsIGkrKykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbi8qKlxuICogQ29udmVydHMgYW55IGVudW1lcmFibGUgdG8gYW4gYXJyYXkuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gbWF4IFN0b3BzIGFmdGVyIG1heCBpcyByZWFjaGVkLiAgQWxsb3dzIGZvciBmb3JFYWNoIHRvIGJlIGNhbGxlZCBvbiBpbmZpbml0ZSBlbnVtZXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheShzb3VyY2UsIG1heCA9IEluZmluaXR5KSB7XG4gICAgaWYgKHNvdXJjZSA9PT0gU1RSSU5HX0VNUFRZKVxuICAgICAgICByZXR1cm4gW107XG4gICAgaWYgKCFpc0Zpbml0ZShtYXgpICYmIChzb3VyY2UpIGluc3RhbmNlb2YgKEFycmF5KSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRBcnJheUZyb20oc291cmNlLCBtYXgpO1xuICAgIGlmICgtMSA9PT0gZm9yRWFjaChzb3VyY2UsIChlLCBpKSA9PiB7IHJlc3VsdFtpXSA9IGU7IH0sIG1heCkpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbnkgZW51bWVyYWJsZSB0byBhbiBhcnJheSBvZiBzZWxlY3RlZCB2YWx1ZXMuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gc2VsZWN0b3JcbiAqIEBwYXJhbSBtYXggU3RvcHMgYWZ0ZXIgbWF4IGlzIHJlYWNoZWQuICBBbGxvd3MgZm9yIGZvckVhY2ggdG8gYmUgY2FsbGVkIG9uIGluZmluaXRlIGVudW1lcmF0aW9ucy5cbiAqIEByZXR1cm5zIHtUUmVzdWx0W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXAoc291cmNlLCBzZWxlY3RvciwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICBpZiAoc291cmNlID09PSBTVFJJTkdfRU1QVFkpXG4gICAgICAgIHJldHVybiBbXTtcbiAgICBpZiAoIWlzRmluaXRlKG1heCkgJiYgKHNvdXJjZSkgaW5zdGFuY2VvZiAoQXJyYXkpKVxuICAgICAgICByZXR1cm4gc291cmNlLm1hcChzZWxlY3Rvcik7XG4gICAgY29uc3QgcmVzdWx0ID0gaW5pdEFycmF5RnJvbShzb3VyY2UsIG1heCk7XG4gICAgaWYgKC0xID09PSBmb3JFYWNoKHNvdXJjZSwgKGUsIGkpID0+IHsgcmVzdWx0W2ldID0gc2VsZWN0b3IoZSwgaSk7IH0sIG1heCkpXG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24oKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuLyoqXG4gKiBUYWtlcyBhbnkgbnVtYmVyIG9mIGRpc3Bvc2FibGVzIGFzIGFyZ3VtZW50cyBhbmQgYXR0ZW1wdHMgdG8gZGlzcG9zZSB0aGVtLlxuICogQW55IGV4Y2VwdGlvbnMgdGhyb3duIHdpdGhpbiBhIGRpc3Bvc2UgYXJlIG5vdCB0cmFwcGVkLlxuICogVXNlICdkaXNwb3NlV2l0aG91dEV4Y2VwdGlvbicgdG8gYXV0b21hdGljYWxseSB0cmFwIGV4Y2VwdGlvbnMuXG4gKlxuICogQ2FuIGFjY2VwdCA8YW55PiBhbmQgd2lsbCBpZ25vcmUgb2JqZWN0cyB0aGF0IGRvbid0IGhhdmUgYSBkaXNwb3NlKCkgbWV0aG9kLlxuICogQHBhcmFtIGRpc3Bvc2FibGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwb3NlKC4uLmRpc3Bvc2FibGVzKSB7XG4gICAgLy8gVGhlIGRpc3Bvc2FibGVzIGFyZ3VtZW50cyBhcnJheSBpcyBlZmZlY3RpdmVseSBsb2NhbGl6ZWQgc28gaXQncyBzYWZlLlxuICAgIGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCBmYWxzZSk7XG59XG4oZnVuY3Rpb24gKGRpc3Bvc2UpIHtcbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyB3aGVuIG9ubHkgZGlzcG9zaW5nIG9uZSBvYmplY3QgdG8gYXZvaWQgY3JlYXRpb24gb2YgYXJyYXlzLlxuICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlXG4gICAgICogQHBhcmFtIHRyYXBFeGNlcHRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2luZ2xlKGRpc3Bvc2FibGUsIHRyYXBFeGNlcHRpb25zID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGRpc3Bvc2FibGUpXG4gICAgICAgICAgICBkaXNwb3NlU2luZ2xlKGRpc3Bvc2FibGUsIHRyYXBFeGNlcHRpb25zKTtcbiAgICB9XG4gICAgZGlzcG9zZS5zaW5nbGUgPSBzaW5nbGU7XG4gICAgZnVuY3Rpb24gZGVmZXJyZWQoLi4uZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgdGhlc2UuZGVmZXJyZWQoZGlzcG9zYWJsZXMpO1xuICAgIH1cbiAgICBkaXNwb3NlLmRlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgLyoqXG4gICAgICogVGFrZXMgYW55IG51bWJlciBvZiBkaXNwb3NhYmxlcyBhbmQgdHJhcHMgYW55IGVycm9ycyB0aGF0IG9jY3VyIHdoZW4gZGlzcG9zaW5nLlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGV4Y2VwdGlvbnMgdGhyb3duLlxuICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICAgICAqIEByZXR1cm5zIHthbnlbXX0gUmV0dXJucyBhbiBhcnJheSBvZiBleGNlcHRpb25zIHRoYXQgb2NjdXJyZWQsIGlmIHRoZXJlIGFyZSBhbnkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gd2l0aG91dEV4Y2VwdGlvbiguLi5kaXNwb3NhYmxlcykge1xuICAgICAgICAvLyBUaGUgZGlzcG9zYWJsZXMgYXJndW1lbnRzIGFycmF5IGlzIGVmZmVjdGl2ZWx5IGxvY2FsaXplZCBzbyBpdCdzIHNhZmUuXG4gICAgICAgIHJldHVybiBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcywgdHJ1ZSk7XG4gICAgfVxuICAgIGRpc3Bvc2Uud2l0aG91dEV4Y2VwdGlvbiA9IHdpdGhvdXRFeGNlcHRpb247XG4gICAgLyoqXG4gICAgICogVGFrZXMgYW4gYXJyYXkgb2YgZGlzcG9zYWJsZSBvYmplY3RzIGFuZCBlbnN1cmVzIHRoZXkgYXJlIGRpc3Bvc2VkLlxuICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICAgICAqIEBwYXJhbSB0cmFwRXhjZXB0aW9ucyBJZiB0cnVlLCBwcmV2ZW50cyBleGNlcHRpb25zIGZyb20gYmVpbmcgdGhyb3duIHdoZW4gZGlzcG9zaW5nLlxuICAgICAqIEByZXR1cm5zIHthbnlbXX0gSWYgJ3RyYXBFeGNlcHRpb25zJyBpcyB0cnVlLCByZXR1cm5zIGFuIGFycmF5IG9mIGV4Y2VwdGlvbnMgdGhhdCBvY2N1cnJlZCwgaWYgdGhlcmUgYXJlIGFueS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0aGVzZShkaXNwb3NhYmxlcywgdHJhcEV4Y2VwdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmxlbmd0aFxuICAgICAgICAgICAgPyBkaXNwb3NlVGhlc2VJbnRlcm5hbChkaXNwb3NhYmxlcy5zbGljZSgpLCB0cmFwRXhjZXB0aW9ucylcbiAgICAgICAgICAgIDogdm9pZCAwO1xuICAgIH1cbiAgICBkaXNwb3NlLnRoZXNlID0gdGhlc2U7XG4gICAgKGZ1bmN0aW9uICh0aGVzZSkge1xuICAgICAgICBmdW5jdGlvbiBkZWZlcnJlZChkaXNwb3NhYmxlcywgZGVsYXkgPSAwKSB7XG4gICAgICAgICAgICBpZiAoZGlzcG9zYWJsZXMgJiYgZGlzcG9zYWJsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoZGVsYXkgPj0gMCkpXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5ID0gMDtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGRpc3Bvc2VUaGVzZUludGVybmFsLCBkZWxheSwgZGlzcG9zYWJsZXMuc2xpY2UoKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhlc2UuZGVmZXJyZWQgPSBkZWZlcnJlZDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZSB0aGlzIHVuc2FmZSBtZXRob2Qgd2hlbiBndWFyYW50ZWVkIG5vdCB0byBjYXVzZSBldmVudHMgdGhhdCB3aWxsIG1ha2UgbW9kaWZpY2F0aW9ucyB0byB0aGUgZGlzcG9zYWJsZXMgYXJyYXkuXG4gICAgICAgICAqIEBwYXJhbSBkaXNwb3NhYmxlc1xuICAgICAgICAgKiBAcGFyYW0gdHJhcEV4Y2VwdGlvbnNcbiAgICAgICAgICogQHJldHVybnMge2FueVtdfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbm9Db3B5KGRpc3Bvc2FibGVzLCB0cmFwRXhjZXB0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmxlbmd0aFxuICAgICAgICAgICAgICAgID8gZGlzcG9zZVRoZXNlSW50ZXJuYWwoZGlzcG9zYWJsZXMsIHRyYXBFeGNlcHRpb25zKVxuICAgICAgICAgICAgICAgIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICAgIHRoZXNlLm5vQ29weSA9IG5vQ29weTtcbiAgICB9KSh0aGVzZSA9IGRpc3Bvc2UudGhlc2UgfHwgKGRpc3Bvc2UudGhlc2UgPSB7fSkpO1xufSkoZGlzcG9zZSB8fCAoZGlzcG9zZSA9IHt9KSk7XG4vKipcbiAqIEp1c3QgbGlrZSBpbiBDIyB0aGlzICd1c2luZycgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHBhc3NlZCBkaXNwb3NhYmxlIGlzIGRpc3Bvc2VkIHdoZW4gdGhlIGNsb3N1cmUgaGFzIGZpbmlzaGVkLlxuICpcbiAqIFVzYWdlOlxuICogYGBgdHlwZXNjcmlwdFxuICogdXNpbmcobmV3IERpc3Bvc2FibGVPYmplY3QoKSwobXlPYmopPT57XG4gICAgICogICAvLyBkbyB3b3JrIHdpdGggbXlPYmpcbiAgICAgKiB9KTtcbiAqIC8vIG15T2JqIGF1dG9tYXRpY2FsbHkgaGFzIGl0J3MgZGlzcG9zZSBtZXRob2QgY2FsbGVkLlxuICogYGBgXG4gKlxuICogQHBhcmFtIGRpc3Bvc2FibGUgT2JqZWN0IHRvIGJlIGRpc3Bvc2VkLlxuICogQHBhcmFtIGNsb3N1cmUgRnVuY3Rpb24gY2FsbCB0byBleGVjdXRlLlxuICogQHJldHVybnMge1RSZXR1cm59IFJldHVybnMgd2hhdGV2ZXIgdGhlIGNsb3N1cmUncyByZXR1cm4gdmFsdWUgaXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2luZyhkaXNwb3NhYmxlLCBjbG9zdXJlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNsb3N1cmUoZGlzcG9zYWJsZSk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBkaXNwb3NlU2luZ2xlKGRpc3Bvc2FibGUsIGZhbHNlKTtcbiAgICB9XG59XG4vKipcbiAqIFRoaXMgcHJpdmF0ZSBmdW5jdGlvbiBtYWtlcyBkaXNwb3NpbmcgbW9yZSByb2J1c3QgZm9yIHdoZW4gdGhlcmUncyBubyB0eXBlIGNoZWNraW5nLlxuICogSWYgdHJhcEV4Y2VwdGlvbnMgaXMgJ3RydWUnIGl0IGNhdGNoZXMgYW5kIHJldHVybnMgYW55IGV4Y2VwdGlvbiBpbnN0ZWFkIG9mIHRocm93aW5nLlxuICovXG5mdW5jdGlvbiBkaXNwb3NlU2luZ2xlKGRpc3Bvc2FibGUsIHRyYXBFeGNlcHRpb25zKSB7XG4gICAgaWYgKGRpc3Bvc2FibGVcbiAgICAgICAgJiYgdHlwZW9mIGRpc3Bvc2FibGUgPT0gVHlwZS5PQkpFQ1RcbiAgICAgICAgJiYgdHlwZW9mIGRpc3Bvc2FibGVbJ2Rpc3Bvc2UnXSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgaWYgKHRyYXBFeGNlcHRpb25zKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogVGhpcyBkaXNwb3NlIG1ldGhvZCBhc3N1bWVzIGl0J3Mgd29ya2luZyBvbiBhIGxvY2FsIGFycmF5Q29weSBhbmQgaXMgdW5zYWZlIGZvciBleHRlcm5hbCB1c2UuXG4gKi9cbmZ1bmN0aW9uIGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCB0cmFwRXhjZXB0aW9ucywgaW5kZXggPSAwKSB7XG4gICAgbGV0IGV4Y2VwdGlvbnM7XG4gICAgY29uc3QgbGVuID0gZGlzcG9zYWJsZXMgPyBkaXNwb3NhYmxlcy5sZW5ndGggOiAwO1xuICAgIGZvciAoOyBpbmRleCA8IGxlbjsgaW5kZXgrKykge1xuICAgICAgICBsZXQgbmV4dCA9IGRpc3Bvc2FibGVzW2luZGV4XTtcbiAgICAgICAgaWYgKCFuZXh0KVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGlmICh0cmFwRXhjZXB0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgZXggPSBkaXNwb3NlU2luZ2xlKG5leHQsIHRydWUpO1xuICAgICAgICAgICAgaWYgKGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGNlcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICBleGNlcHRpb25zID0gW107XG4gICAgICAgICAgICAgICAgZXhjZXB0aW9ucy5wdXNoKGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2VTaW5nbGUobmV4dCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdWNjZXNzICYmIGluZGV4ICsgMSA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICAvKiBJZiBjb2RlIGlzICdjb250aW51ZWQnIGJ5IHRoZSBkZWJ1Z2dlcixcbiAgICAgICAgICAgICAgICAgICAgICogbmVlZCB0byBlbnN1cmUgdGhlIHJlc3Qgb2YgdGhlIGRpc3Bvc2FibGVzIGFyZSBjYXJlZCBmb3IuICovXG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2VUaGVzZUludGVybmFsKGRpc3Bvc2FibGVzLCBmYWxzZSwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBKdXN0IGluIGNhc2UuLi4gIFNob3VsZCBuZXZlciBoYXBwZW4sIGJ1dCBhc3NlcnRzIHRoZSBpbnRlbnRpb24uXG4gICAgICAgICAgICBpZiAoIXN1Y2Nlc3MpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV4Y2VwdGlvbnM7XG59XG5leHBvcnQgZGVmYXVsdCBkaXNwb3NlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlzcG9zZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvZGlzcG9zZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuL0VudW1lcmF0b3JCYXNlXCI7XG5leHBvcnQgY2xhc3MgSW5kZXhFbnVtZXJhdG9yIGV4dGVuZHMgRW51bWVyYXRvckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZUZhY3RvcnkpIHtcbiAgICAgICAgbGV0IHNvdXJjZTtcbiAgICAgICAgc3VwZXIoKCkgPT4ge1xuICAgICAgICAgICAgc291cmNlID0gc291cmNlRmFjdG9yeSgpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSAmJiBzb3VyY2Uuc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgMClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGVuZ3RoIG11c3QgYmUgemVybyBvciBncmVhdGVyXCIpO1xuICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUobGVuKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGVuZ3RoIG11c3QgZmluaXRlIG51bWJlclwiKTtcbiAgICAgICAgICAgICAgICBpZiAobGVuICYmIHNvdXJjZS5zdGVwID09PSAwKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIEluZGV4RW51bWVyYXRvciBzdGVwIHZhbHVlICgwKS5cIik7XG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ZXIgPSBzb3VyY2UucG9pbnRlcjtcbiAgICAgICAgICAgICAgICBpZiAoIXBvaW50ZXIpXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvaW50ZXIgIT0gTWF0aC5mbG9vcihwb2ludGVyKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBJbmRleEVudW1lcmF0b3IgcG9pbnRlciB2YWx1ZSAoXCIgKyBwb2ludGVyICsgXCIpIGhhcyBkZWNpbWFsLlwiKTtcbiAgICAgICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IHBvaW50ZXI7XG4gICAgICAgICAgICAgICAgbGV0IHN0ZXAgPSBzb3VyY2Uuc3RlcDtcbiAgICAgICAgICAgICAgICBpZiAoIXN0ZXApXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAgPSAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0ZXAgIT0gTWF0aC5mbG9vcihzdGVwKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBJbmRleEVudW1lcmF0b3Igc3RlcCB2YWx1ZSAoXCIgKyBzdGVwICsgXCIpIGhhcyBkZWNpbWFsLlwiKTtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc3RlcCA9IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGVuID0gKHNvdXJjZSAmJiBzb3VyY2Uuc291cmNlKSA/IHNvdXJjZS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgaWYgKCFsZW4gfHwgaXNOYU4obGVuKSlcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gc291cmNlLnBvaW50ZXI7XG4gICAgICAgICAgICBpZiAoc291cmNlLnBvaW50ZXIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IDA7IC8vIHNob3VsZCBuZXZlciBoYXBwZW4gYnV0IGlzIGluIHBsYWNlIHRvIG5lZ2F0ZSBjb21waWxlciB3YXJuaW5ncy5cbiAgICAgICAgICAgIGlmICghc291cmNlLnN0ZXApXG4gICAgICAgICAgICAgICAgc291cmNlLnN0ZXAgPSAxOyAvLyBzaG91bGQgbmV2ZXIgaGFwcGVuIGJ1dCBpcyBpbiBwbGFjZSB0byBuZWdhdGUgY29tcGlsZXIgd2FybmluZ3MuXG4gICAgICAgICAgICBzb3VyY2UucG9pbnRlciA9IHNvdXJjZS5wb2ludGVyICsgc291cmNlLnN0ZXA7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnJlbnQgPCBsZW4gJiYgY3VycmVudCA+PSAwKVxuICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihzb3VyY2Uuc291cmNlW2N1cnJlbnRdKVxuICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc291cmNlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZGV4RW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUluZGV4RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0luZGV4RW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmV4cG9ydCBjbGFzcyBJdGVyYXRvclJlc3VsdCB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIGluZGV4LCBkb25lID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09ICdib29sZWFuJylcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IGluZGV4O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IGRvbmU7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgICB9XG59XG4oZnVuY3Rpb24gKEl0ZXJhdG9yUmVzdWx0KSB7XG4gICAgSXRlcmF0b3JSZXN1bHQuRG9uZSA9IG5ldyBJdGVyYXRvclJlc3VsdChWT0lEMCwgVk9JRDAsIHRydWUpO1xuICAgIGZ1bmN0aW9uIEdldERvbmUoKSB7IHJldHVybiBJdGVyYXRvclJlc3VsdC5Eb25lOyB9XG4gICAgSXRlcmF0b3JSZXN1bHQuR2V0RG9uZSA9IEdldERvbmU7XG59KShJdGVyYXRvclJlc3VsdCB8fCAoSXRlcmF0b3JSZXN1bHQgPSB7fSkpO1xuT2JqZWN0LmZyZWV6ZShJdGVyYXRvclJlc3VsdCk7XG5leHBvcnQgZGVmYXVsdCBJdGVyYXRvclJlc3VsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUl0ZXJhdG9yUmVzdWx0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSXRlcmF0b3JSZXN1bHQuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuLyoqXG4gKiBDYW4gYmUgdXNlZCBzdGF0aWNhbGx5IG9yIGV4dGVuZGVkIGZvciB2YXJ5aW5nIGRpZmZlcmVudCByZXVzYWJsZSBmdW5jdGlvbiBzaWduYXR1cmVzLlxuICovXG4vKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovIGV4cG9ydCBjbGFzcyBGdW5jdGlvbnMge1xuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBBIHR5cGVkIG1ldGhvZCBmb3IgdXNlIHdpdGggc2ltcGxlIHNlbGVjdGlvbiBvZiB0aGUgcGFyYW1ldGVyLlxuICAgICAqIEByZXR1cm5zIHtUfVxuICAgICAqL1xuICAgIElkZW50aXR5KHgpIHsgcmV0dXJuIHg7IH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIFRydWUoKSB7IHJldHVybiB0cnVlOyB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgZmFsc2UuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgRmFsc2UoKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIC8qKlxuICAgICAqIERvZXMgbm90aGluZy5cbiAgICAgKi9cbiAgICBCbGFuaygpIHsgfVxufVxuY29uc3Qgcm9vdEZ1bmN0aW9ucyA9IG5ldyBGdW5jdGlvbnMoKTtcbi8vIEV4cG9zZSBzdGF0aWMgdmVyc2lvbnMuXG4oZnVuY3Rpb24gKEZ1bmN0aW9ucykge1xuICAgIC8qKlxuICAgICAqIEEgdHlwZWQgbWV0aG9kIGZvciB1c2Ugd2l0aCBzaW1wbGUgc2VsZWN0aW9uIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgRnVuY3Rpb25zLklkZW50aXR5ID0gcm9vdEZ1bmN0aW9ucy5JZGVudGl0eTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIEZ1bmN0aW9ucy5UcnVlID0gcm9vdEZ1bmN0aW9ucy5UcnVlO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgZmFsc2UuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgRnVuY3Rpb25zLkZhbHNlID0gcm9vdEZ1bmN0aW9ucy5GYWxzZTtcbiAgICAvKipcbiAgICAgKiBEb2VzIG5vdGhpbmcuXG4gICAgICovXG4gICAgRnVuY3Rpb25zLkJsYW5rID0gcm9vdEZ1bmN0aW9ucy5CbGFuaztcbn0pKEZ1bmN0aW9ucyB8fCAoRnVuY3Rpb25zID0ge30pKTtcbi8vIE1ha2UgdGhpcyByZWFkIG9ubHkuICBTaG91bGQgc3RpbGwgYWxsb3cgZm9yIHN1Yi1jbGFzc2luZyBzaW5jZSBleHRyYSBtZXRob2RzIGFyZSBhZGRlZCB0byBwcm90b3R5cGUuXG5PYmplY3QuZnJlZXplKEZ1bmN0aW9ucyk7XG5leHBvcnQgZGVmYXVsdCBGdW5jdGlvbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1GdW5jdGlvbnMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9GdW5jdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gXCIuL0VudW1lcmF0aW9uL0VudW1lcmF0b3JcIjtcbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uL0Rpc3Bvc2FibGUvRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IGlzQ29tbW9uSlMsIGlzTm9kZUpTLCBpc1JlcXVpcmVKUyB9IGZyb20gXCIuLi9FbnZpcm9ubWVudFwiO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbi8vbm9pbnNwZWN0aW9uIFNwZWxsQ2hlY2tpbmdJbnNwZWN0aW9uXG5jb25zdCBOQU1FID0gXCJDb2xsZWN0aW9uQmFzZVwiLCBDTURDID0gXCJDYW5ub3QgbW9kaWZ5IGEgZGlzcG9zZWQgY29sbGVjdGlvbi5cIiwgQ01STyA9IFwiQ2Fubm90IG1vZGlmeSBhIHJlYWQtb25seSBjb2xsZWN0aW9uLlwiO1xuY29uc3QgTElOUV9QQVRIID0gXCIuLi8uLi9TeXN0ZW0uTGlucS9MaW5xXCI7XG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkJhc2UgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlLCBfZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2VxdWFsaXR5Q29tcGFyZXIgPSBfZXF1YWxpdHlDb21wYXJlcjtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gTkFNRTtcbiAgICAgICAgXy5faW1wb3J0RW50cmllcyhzb3VyY2UpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24gPSAwO1xuICAgICAgICBfLl9tb2RpZmllZENvdW50ID0gMDtcbiAgICAgICAgXy5fdmVyc2lvbiA9IDA7XG4gICAgfVxuICAgIGdldCBjb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q291bnQoKTtcbiAgICB9XG4gICAgZ2V0SXNSZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICBnZXQgaXNSZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXNSZWFkT25seSgpO1xuICAgIH1cbiAgICBhc3NlcnRNb2RpZmlhYmxlKCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZChDTURDKTtcbiAgICAgICAgaWYgKHRoaXMuZ2V0SXNSZWFkT25seSgpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oQ01STyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBhc3NlcnRWZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgaWYgKHZlcnNpb24gIT09IHRoaXMuX3ZlcnNpb24pXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNvbGxlY3Rpb24gd2FzIG1vZGlmaWVkLlwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIF9vbk1vZGlmaWVkKCkgeyB9XG4gICAgX3NpZ25hbE1vZGlmaWNhdGlvbihpbmNyZW1lbnQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmIChpbmNyZW1lbnQpXG4gICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIGlmIChfLl9tb2RpZmllZENvdW50ICYmICF0aGlzLl91cGRhdGVSZWN1cnNpb24pIHtcbiAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQgPSAwO1xuICAgICAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfLl9vbk1vZGlmaWVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAvLyBBdm9pZCBmYXRhbCBlcnJvcnMgd2hpY2ggbWF5IGhhdmUgYmVlbiBjYXVzZWQgYnkgY29uc3VtZXIuXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF9pbmNyZW1lbnRNb2RpZmllZCgpIHsgdGhpcy5fbW9kaWZpZWRDb3VudCsrOyB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgZ2V0IGlzVXBkYXRpbmcoKSB7IHJldHVybiB0aGlzLl91cGRhdGVSZWN1cnNpb24gIT0gMDsgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgY2xvc3VyZSB0aGF0IGlmIHJldHVybmluZyB0cnVlIHdpbGwgcHJvcGFnYXRlIGFuIHVwZGF0ZSBzaWduYWwuXG4gICAgICogTXVsdGlwbGUgdXBkYXRlIG9wZXJhdGlvbnMgY2FuIGJlIG9jY3VycmluZyBhdCBvbmNlIG9yIHJlY3Vyc2l2ZWx5IGFuZCB0aGUgb25Nb2RpZmllZCBzaWduYWwgd2lsbCBvbmx5IG9jY3VyIG9uY2UgdGhleSdyZSBkb25lLlxuICAgICAqIEBwYXJhbSBjbG9zdXJlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFuZGxlVXBkYXRlKGNsb3N1cmUpIHtcbiAgICAgICAgaWYgKCFjbG9zdXJlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICBsZXQgdXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHVwZGF0ZWQgPSBjbG9zdXJlKCkpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgIH1cbiAgICAvKlxuICAgICAqIE5vdGU6IGZvciBhIHNsaWdodCBhbW91bnQgbW9yZSBjb2RlLCB3ZSBhdm9pZCBjcmVhdGluZyBmdW5jdGlvbnMvY2xvc3VyZXMuXG4gICAgICogQ2FsbGluZyBoYW5kbGVVcGRhdGUgaXMgdGhlIGNvcnJlY3QgcGF0dGVybiwgYnV0IGlmIHBvc3NpYmxlIGF2b2lkIGNyZWF0aW5nIGFub3RoZXIgZnVuY3Rpb24gc2NvcGUuXG4gICAgICovXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBlbnRyeSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gZW50cnlcbiAgICAgKi9cbiAgICBhZGQoZW50cnkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24rKztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfLl9hZGRJbnRlcm5hbChlbnRyeSkpXG4gICAgICAgICAgICAgICAgXy5fbW9kaWZpZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uLS07XG4gICAgICAgIH1cbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBfO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGVudHJpZXMgZnJvbSB0aGUgY29sbGVjdGlvbiBhbGxvd2luZyBmb3IgYSBsaW1pdC5cbiAgICAgKiBGb3IgZXhhbXBsZSBpZiB0aGUgY29sbGVjdGlvbiBub3QgYSBkaXN0aW5jdCBzZXQsIG1vcmUgdGhhbiBvbmUgZW50cnkgY291bGQgYmUgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0gZW50cnkgVGhlIGVudHJ5IHRvIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0gbWF4IExpbWl0IG9mIGVudHJpZXMgdG8gcmVtb3ZlLiAgV2lsbCByZW1vdmUgYWxsIG1hdGNoZXMgaWYgbm8gbWF4IHNwZWNpZmllZC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGVudHJpZXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICByZW1vdmUoZW50cnksIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIGxldCBuID0gTmFOO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG4gPSBfLl9yZW1vdmVJbnRlcm5hbChlbnRyeSwgbWF4KSlcbiAgICAgICAgICAgICAgICBfLl9tb2RpZmllZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl91cGRhdGVSZWN1cnNpb24tLTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgY29udGVudHMgb2YgdGhlIGNvbGxlY3Rpb24gcmVzdWx0aW5nIGluIGEgY291bnQgb2YgemVyby5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbisrO1xuICAgICAgICBsZXQgbiA9IE5hTjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChuID0gXy5fY2xlYXJJbnRlcm5hbCgpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9jbGVhckludGVybmFsKCk7XG4gICAgICAgIHRoaXMuX3ZlcnNpb24gPSAwO1xuICAgICAgICB0aGlzLl91cGRhdGVSZWN1cnNpb24gPSAwO1xuICAgICAgICB0aGlzLl9tb2RpZmllZENvdW50ID0gMDtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMuX2xpbnE7XG4gICAgICAgIHRoaXMuX2xpbnEgPSB2b2lkIDA7XG4gICAgICAgIGlmIChsKVxuICAgICAgICAgICAgbC5kaXNwb3NlKCk7XG4gICAgfVxuICAgIF9pbXBvcnRFbnRyaWVzKGVudHJpZXMpIHtcbiAgICAgICAgbGV0IGFkZGVkID0gMDtcbiAgICAgICAgaWYgKGVudHJpZXMpIHtcbiAgICAgICAgICAgIGlmICgoZW50cmllcykgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgLy8gT3B0aW1pemUgZm9yIGF2b2lkaW5nIGEgbmV3IGNsb3N1cmUuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hZGRJbnRlcm5hbChlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yRWFjaChlbnRyaWVzLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FkZEludGVybmFsKGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWQrKztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWRkZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhZmVseSBpbXBvcnRzIGFueSBhcnJheSBlbnVtZXJhdG9yLCBvciBlbnVtZXJhYmxlLlxuICAgICAqIEBwYXJhbSBlbnRyaWVzXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBpbXBvcnRFbnRyaWVzKGVudHJpZXMpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghZW50cmllcylcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBfLmFzc2VydE1vZGlmaWFibGUoKTtcbiAgICAgICAgXy5fdXBkYXRlUmVjdXJzaW9uKys7XG4gICAgICAgIGxldCBuID0gTmFOO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG4gPSBfLl9pbXBvcnRFbnRyaWVzKGVudHJpZXMpKVxuICAgICAgICAgICAgICAgIF8uX21vZGlmaWVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX3VwZGF0ZVJlY3Vyc2lvbi0tO1xuICAgICAgICB9XG4gICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBmaWx0ZXJlZCBieSB0aGUgcHJvdmlkZWQgcHJlZGljYXRlLlxuICAgICAqIFByb3ZpZGVkIGZvciBzaW1pbGFyaXR5IHRvIEpTIEFycmF5LlxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcmV0dXJucyB7W119XG4gICAgICovXG4gICAgZmlsdGVyKHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3ByZWRpY2F0ZScpO1xuICAgICAgICBsZXQgY291bnQgPSAhdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShlLCBpKSlcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgdGhlIGZpcnN0IHRpbWUgcHJlZGljYXRlIHJldHVybnMgdHJ1ZS4gIE90aGVyd2lzZSBmYWxzZS5cbiAgICAgKiBVc2VmdWwgZm9yIHNlYXJjaGluZyB0aHJvdWdoIGEgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBhbnkocHJlZGljYXRlKSB7XG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgaWYgKCFjb3VudClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbihjb3VudCk7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvckVhY2goKGUsIGkpID0+ICEoZm91bmQgPSBwcmVkaWNhdGUoZSwgaSkpKTtcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgdGhlIGZpcnN0IHRpbWUgcHJlZGljYXRlIHJldHVybnMgdHJ1ZS4gIE90aGVyd2lzZSBmYWxzZS5cbiAgICAgKiBTZWUgJy5hbnkocHJlZGljYXRlKScuICBBcyB0aGlzIG1ldGhvZCBpcyBqdXN0IGp1c3QgaW5jbHVkZWQgdG8gaGF2ZSBzaW1pbGFyaXR5IHdpdGggYSBKUyBBcnJheS5cbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBzb21lKHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbnkocHJlZGljYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBlcXVhbGl0eSBjb21wYXJlciByZXNvbHZlcyB0cnVlIG9uIGFueSBlbGVtZW50IGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBlbnRyeVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKGVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGVxdWFscyA9IHRoaXMuX2VxdWFsaXR5Q29tcGFyZXI7XG4gICAgICAgIHJldHVybiB0aGlzLmFueShlID0+IGVxdWFscyhlbnRyeSwgZSkpO1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbiwgdXNlQ29weSkge1xuICAgICAgICBpZiAodGhpcy53YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBpZiAodXNlQ29weSkge1xuICAgICAgICAgICAgY29uc3QgYSA9IHRoaXMudG9BcnJheSgpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9yRWFjaChhLCBhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgYS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZvckVhY2godGhpcy5nZXRFbnVtZXJhdG9yKCksIGFjdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29waWVzIGFsbCB2YWx1ZXMgdG8gbnVtZXJpY2FsbHkgaW5kZXhhYmxlIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICogQHJldHVybnMge1RUYXJnZXR9XG4gICAgICovXG4gICAgY29weVRvKHRhcmdldCwgaW5kZXggPSAwKSB7XG4gICAgICAgIGlmICghdGFyZ2V0KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigndGFyZ2V0Jyk7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0xlbmd0aCA9IGNvdW50ICsgaW5kZXg7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCA8IG5ld0xlbmd0aClcbiAgICAgICAgICAgICAgICB0YXJnZXQubGVuZ3RoID0gbmV3TGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgZSA9IHRoaXMuZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpbmRleCsrXSA9IGUuY3VycmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBjb2xsZWN0aW9uIGNvbnRlbnRzLlxuICAgICAqIEByZXR1cm5zIHthbnlbXXxBcnJheX1cbiAgICAgKi9cbiAgICB0b0FycmF5KCkge1xuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgcmV0dXJuIGNvdW50XG4gICAgICAgICAgICA/IHRoaXMuY29weVRvKGNvdW50ID4gNjU1MzYgPyBuZXcgQXJyYXkoY291bnQpIDogW10pXG4gICAgICAgICAgICA6IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAubGlucSB3aWxsIHJldHVybiBhbiBJTGlucUVudW1lcmFibGUgaWYgLmxpbnFBc3luYygpIGhhcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5IG9yIHRoZSBkZWZhdWx0IG1vZHVsZSBsb2FkZXIgaXMgTm9kZUpTK0NvbW1vbkpTLlxuICAgICAqIEByZXR1cm5zIHtJTGlucUVudW1lcmFibGV9XG4gICAgICovXG4gICAgZ2V0IGxpbnEoKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBlID0gdGhpcy5fbGlucTtcbiAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICBsZXQgcjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgciA9IGV2YWwoJ3JlcXVpcmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkgeyB9XG4gICAgICAgICAgICB0aGlzLl9saW5xID0gZSA9IHIgJiYgcihMSU5RX1BBVEgpLmRlZmF1bHQuZnJvbSh0aGlzKTtcbiAgICAgICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgICAgIHRocm93IGlzUmVxdWlyZUpTXG4gICAgICAgICAgICAgICAgICAgID8gYHVzaW5nIC5saW5xIHRvIGxvYWQgYW5kIGluaXRpYWxpemUgYSBJTGlucUVudW1lcmFibGUgaXMgY3VycmVudGx5IG9ubHkgc3VwcG9ydGVkIHdpdGhpbiBhIE5vZGVKUyBlbnZpcm9ubWVudC5cclxuSW1wb3J0IFN5c3RlbS5MaW5xL0xpbnEgYW5kIHVzZSBFbnVtZXJhYmxlLmZyb20oZSkgaW5zdGVhZC5cclxuWW91IGNhbiBhbHNvIHByZWxvYWQgdGhlIExpbnEgbW9kdWxlIGFzIGEgZGVwZW5kZW5jeSBvciB1c2UgLmxpbnFBc3luYyhjYWxsYmFjaykgZm9yIEFNRC9SZXF1aXJlSlMuYFxuICAgICAgICAgICAgICAgICAgICA6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBpbXBvcnRpbmcgU3lzdGVtLkxpbnEvTGlucVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAubGlucUFzeW5jKCkgaXMgZm9yIHVzZSB3aXRoIGRlZmVycmVkIGxvYWRpbmcuXG4gICAgICogRW5zdXJlcyBhbiBpbnN0YW5jZSBvZiB0aGUgTGlucSBleHRlbnNpb25zIGlzIGF2YWlsYWJsZSBhbmQgdGhlbiBwYXNzZXMgaXQgdG8gdGhlIGNhbGxiYWNrLlxuICAgICAqIFJldHVybnMgYW4gSUxpbnFFbnVtZXJhYmxlIGlmIG9uZSBpcyBhbHJlYWR5IGF2YWlsYWJsZSwgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAgICAgKiBQYXNzaW5nIG5vIHBhcmFtZXRlcnMgd2lsbCBzdGlsbCBpbml0aWF0ZSBsb2FkaW5nIGFuZCBpbml0aWFsaXppbmcgdGhlIElMaW5xRW51bWVyYWJsZSB3aGljaCBjYW4gYmUgdXNlZnVsIGZvciBwcmUtbG9hZGluZy5cbiAgICAgKiBBbnkgY2FsbCB0byAubGlucUFzeW5jKCkgd2hlcmUgYW4gSUxpbnFFbnVtZXJhYmxlIGlzIHJldHVybmVkIGNhbiBiZSBhc3N1cmVkIHRoYXQgYW55IHN1YnNlcXVlbnQgY2FsbHMgdG8gLmxpbnEgd2lsbCByZXR1cm4gdGhlIHNhbWUgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHJldHVybnMge0lMaW5xRW51bWVyYWJsZX1cbiAgICAgKi9cbiAgICBsaW5xQXN5bmMoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IGUgPSB0aGlzLl9saW5xO1xuICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgIGlmIChpc1JlcXVpcmVKUykge1xuICAgICAgICAgICAgICAgIGV2YWwoXCJyZXF1aXJlXCIpKFtMSU5RX1BBVEhdLCAobGlucSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBDb3VsZCBlbmQgdXAgYmVpbmcgY2FsbGVkIG1vcmUgdGhhbiBvbmNlLCBiZSBzdXJlIHRvIGNoZWNrIGZvciAuX2xpbnEgYmVmb3JlIHNldHRpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgZSA9IHRoaXMuX2xpbnE7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbnEgPSBlID0gbGlucS5kZWZhdWx0LmZyb20odGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBpbXBvcnRpbmcgU3lzdGVtLkxpbnEvTGlucVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB2b2lkIDA7IC8vIEluIGNhc2UgdGhpcyBpcyByZXR1cm4gc3luY2hyb25vdXNseS4uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc05vZGVKUyAmJiBpc0NvbW1vbkpTKSB7XG4gICAgICAgICAgICAgICAgZSA9IHRoaXMubGlucTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IGZpbmQgYSBjb21wYXRpYmxlIGxvYWRlciBmb3IgaW1wb3J0aW5nIFN5c3RlbS5MaW5xL0xpbnFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZSAmJiBjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db2xsZWN0aW9uQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0NvbGxlY3Rpb25CYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tIFwiLi9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuLyoqXG4gKlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIHNvdXJjZUluZGV4XG4gKiBAcGFyYW0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weShzb3VyY2UsIHNvdXJjZUluZGV4ID0gMCwgbGVuZ3RoID0gSW5maW5pdHkpIHtcbiAgICBpZiAoIXNvdXJjZSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZTsgLy8gbWF5IGhhdmUgcGFzc2VkIHplcm8/IHVuZGVmaW5lZD8gb3IgbnVsbD9cbiAgICByZXR1cm4gY29weVRvKHNvdXJjZSwgaW5pdGlhbGl6ZShNYXRoLm1pbihsZW5ndGgsIE1hdGgubWF4KHNvdXJjZS5sZW5ndGggLSBzb3VyY2VJbmRleCwgMCkpKSwgc291cmNlSW5kZXgsIDAsIGxlbmd0aCk7XG59XG5jb25zdCBDQk4gPSAnQ2Fubm90IGJlIG51bGwuJywgQ0JMMCA9ICdDYW5ub3QgYmUgbGVzcyB0aGFuIHplcm8uJztcbi8qKlxuICogQ29waWVzIG9uZSBhcnJheSB0byBhbm90aGVyLlxuICogQHBhcmFtIHNvdXJjZVxuICogQHBhcmFtIGRlc3RpbmF0aW9uXG4gKiBAcGFyYW0gc291cmNlSW5kZXhcbiAqIEBwYXJhbSBkZXN0aW5hdGlvbkluZGV4XG4gKiBAcGFyYW0gbGVuZ3RoIEFuIG9wdGlvbmFsIGxpbWl0IHRvIHN0b3AgY29weWluZy5cbiAqIEByZXR1cm5zIFRoZSBkZXN0aW5hdGlvbiBhcnJheS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUbyhzb3VyY2UsIGRlc3RpbmF0aW9uLCBzb3VyY2VJbmRleCA9IDAsIGRlc3RpbmF0aW9uSW5kZXggPSAwLCBsZW5ndGggPSBJbmZpbml0eSkge1xuICAgIGlmICghc291cmNlKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdzb3VyY2UnLCBDQk4pO1xuICAgIGlmICghZGVzdGluYXRpb24pXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2Rlc3RpbmF0aW9uJywgQ0JOKTtcbiAgICBpZiAoc291cmNlSW5kZXggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCBDQkwwKTtcbiAgICBsZXQgc291cmNlTGVuZ3RoID0gc291cmNlLmxlbmd0aDtcbiAgICBpZiAoIXNvdXJjZUxlbmd0aClcbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgIGlmIChzb3VyY2VJbmRleCA+PSBzb3VyY2VMZW5ndGgpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ3NvdXJjZUluZGV4Jywgc291cmNlSW5kZXgsICdNdXN0IGJlIGxlc3MgdGhhbiB0aGUgbGVuZ3RoIG9mIHRoZSBzb3VyY2UgYXJyYXkuJyk7XG4gICAgaWYgKGRlc3RpbmF0aW9uLmxlbmd0aCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2Rlc3RpbmF0aW9uSW5kZXgnLCBkZXN0aW5hdGlvbkluZGV4LCBDQkwwKTtcbiAgICBjb25zdCBtYXhMZW5ndGggPSBzb3VyY2UubGVuZ3RoIC0gc291cmNlSW5kZXg7XG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkgJiYgbGVuZ3RoID4gbWF4TGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzb3VyY2VJbmRleCcsIHNvdXJjZUluZGV4LCAnU291cmNlIGluZGV4ICsgbGVuZ3RoIGNhbm5vdCBleGNlZWQgdGhlIGxlbmd0aCBvZiB0aGUgc291cmNlIGFycmF5LicpO1xuICAgIGxlbmd0aCA9IE1hdGgubWluKGxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICBjb25zdCBuZXdMZW5ndGggPSBkZXN0aW5hdGlvbkluZGV4ICsgbGVuZ3RoO1xuICAgIGlmIChuZXdMZW5ndGggPiBkZXN0aW5hdGlvbi5sZW5ndGgpXG4gICAgICAgIGRlc3RpbmF0aW9uLmxlbmd0aCA9IG5ld0xlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uW2Rlc3RpbmF0aW9uSW5kZXggKyBpXSA9IHNvdXJjZVtzb3VyY2VJbmRleCArIGldO1xuICAgIH1cbiAgICByZXR1cm4gZGVzdGluYXRpb247XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3B5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvY29weS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uL1R5cGVzXCI7XG5leHBvcnQgY29uc3QgRU1QVFkgPSAnJztcbi8qKlxuICogUmV0dXJucyBhIG51bWVyaWNhbCAoaW50ZWdlcikgaGFzaCBjb2RlIG9mIHRoZSBzdHJpbmcuICBDYW4gYmUgdXNlZCBmb3IgaWRlbnRpZnlpbmcgaW5lcXVhbGl0eSBvZiBjb250ZW50cywgYnV0IHR3byBkaWZmZXJlbnQgc3RyaW5ncyBpbiByYXJlIGNhc2VzIHdpbGwgaGF2ZSB0aGUgc2FtZSBoYXNoIGNvZGUuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGFzaENvZGUoc291cmNlKSB7XG4gICAgbGV0IGhhc2ggPSAwIHwgMDtcbiAgICBpZiAoc291cmNlLmxlbmd0aCA9PSAwKVxuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHNvdXJjZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbGV0IGNoID0gc291cmNlLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoO1xuICAgICAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXQoc291cmNlLCBjb3VudCkge1xuICAgIGxldCByZXN1bHQgPSBFTVBUWTtcbiAgICBpZiAoIWlzTmFOKGNvdW50KSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tQ2hhcnMoY2hPckNoYXJzLCBjb3VudCA9IDEpIHtcbiAgICBpZiAoKGNoT3JDaGFycykgaW5zdGFuY2VvZiAoQXJyYXkpKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBFTVBUWTtcbiAgICAgICAgZm9yIChsZXQgY2hhciBvZiBjaE9yQ2hhcnMpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVwZWF0KFN0cmluZy5mcm9tQ2hhckNvZGUoY2hPckNoYXJzKSwgY291bnQpO1xuICAgIH1cbn1cbi8qKlxuICogRXNjYXBlcyBhIFJlZ0V4cCBzZXF1ZW5jZS5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc291cmNlKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5yZXBsYWNlKC9bLVtcXF1cXC97fSgpKis/LlxcXFxeJHxdL2csIFwiXFxcXCQmXCIpO1xufVxuLyoqXG4gKiBDYW4gdHJpbSBhbnkgY2hhcmFjdGVyIG9yIHNldCBvZiBjaGFyYWN0ZXJzIGZyb20gdGhlIGVuZHMgb2YgYSBzdHJpbmcuXG4gKiBVc2VzIGEgUmVnZXggZXNjYXBlbWVudCB0byByZXBsYWNlIHRoZW0gd2l0aCBlbXB0eS5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBjaGFycyBBIHN0cmluZyBvciBhcnJheSBvZiBjaGFyYWN0ZXJzIGRlc2lyZWQgdG8gYmUgdHJpbW1lZC5cbiAqIEBwYXJhbSBpZ25vcmVDYXNlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzb3VyY2UsIGNoYXJzLCBpZ25vcmVDYXNlKSB7XG4gICAgaWYgKGNoYXJzID09PSBFTVBUWSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAoY2hhcnMpIHtcbiAgICAgICAgY29uc3QgZXNjYXBlZCA9IGVzY2FwZVJlZ0V4cCgoY2hhcnMpIGluc3RhbmNlb2YgKEFycmF5KSA/IGNoYXJzLmpvaW4oKSA6IGNoYXJzKTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5yZXBsYWNlKG5ldyBSZWdFeHAoJ15bJyArIGVzY2FwZWQgKyAnXSt8WycgKyBlc2NhcGVkICsgJ10rJCcsICdnJyArIChpZ25vcmVDYXNlXG4gICAgICAgICAgICA/ICdpJ1xuICAgICAgICAgICAgOiAnJykpLCBFTVBUWSk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2UucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgRU1QVFkpO1xufVxuLyoqXG4gKiBUYWtlcyBhbnkgYXJnXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gYXJnc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChzb3VyY2UsIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gc3VwcGxhbnQoc291cmNlLCBhcmdzKTtcbn1cbi8vXG4vKipcbiAqIFRoaXMgdGFrZXMgYSBzdHJpbmcgYW5kIHJlcGxhY2VzICd7c3RyaW5nfScgd2l0aCB0aGUgcmVzcGVjdGVkIHBhcmFtZXRlci5cbiAqIEFsc28gYWxsb3dzIGZvciBwYXNzaW5nIGFuIGFycmF5IGluIG9yZGVyIHRvIHVzZSAne259JyBub3RhdGlvbi5cbiAqIE5vdCBsaW1pdGVkIHRvIGFuIGFycmF5J3MgaW5kZXhlcy4gIEZvciBleGFtcGxlLCB7bGVuZ3RofSBpcyBhbGxvd2VkLlxuICogQmFzZWQgdXBvbiBDcm9ja2ZvcmQncyBzdXBwbGFudCBmdW5jdGlvbi5cbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBwYXJhbXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdXBwbGFudChzb3VyY2UsIHBhcmFtcykge1xuICAgIGNvbnN0IG9Jc0FycmF5ID0gKHBhcmFtcykgaW5zdGFuY2VvZiAoQXJyYXkpO1xuICAgIHJldHVybiBzb3VyY2UucmVwbGFjZSgveyhbXnt9XSopfS9nLCAoYSwgYikgPT4ge1xuICAgICAgICBsZXQgbiA9IGI7XG4gICAgICAgIGlmIChvSXNBcnJheSkge1xuICAgICAgICAgICAgbGV0IGkgPSBwYXJzZUludChiKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4oaSkpXG4gICAgICAgICAgICAgICAgbiA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHIgPSBwYXJhbXNbbl07XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHIpIHtcbiAgICAgICAgICAgIGNhc2UgVHlwZS5TVFJJTkc6XG4gICAgICAgICAgICBjYXNlIFR5cGUuTlVNQkVSOlxuICAgICAgICAgICAgY2FzZSBUeXBlLkJPT0xFQU46XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAociAmJiBUeXBlLmhhc01lbWJlck9mVHlwZShyLCBcInRvU3RyaW5nXCIsIFR5cGUuRlVOQ1RJT04pKVxuICAgICAgICAgICAgICAgICAgICA/IHIudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICA6IGE7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNhbk1hdGNoKHNvdXJjZSwgbWF0Y2gpIHtcbiAgICBpZiAoIVR5cGUuaXNTdHJpbmcoc291cmNlKSB8fCAhbWF0Y2gpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoc291cmNlID09PSBtYXRjaClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKG1hdGNoLmxlbmd0aCA8IHNvdXJjZS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBudWxsO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhdHRlcm4gbWF0Y2hlcyB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzb3VyY2UuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gcGF0dGVyblxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydHNXaXRoKHNvdXJjZSwgcGF0dGVybikge1xuICAgIGNvbnN0IG0gPSBjYW5NYXRjaChzb3VyY2UsIHBhdHRlcm4pO1xuICAgIHJldHVybiBUeXBlLmlzQm9vbGVhbihtKSA/IG0gOiBzb3VyY2UuaW5kZXhPZihwYXR0ZXJuKSA9PSAwO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhdHRlcm4gbWF0Y2hlcyB0aGUgZW5kIG9mIHRoZSBzb3VyY2UuXG4gKiBAcGFyYW0gc291cmNlXG4gKiBAcGFyYW0gcGF0dGVyblxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmRzV2l0aChzb3VyY2UsIHBhdHRlcm4pIHtcbiAgICBjb25zdCBtID0gY2FuTWF0Y2goc291cmNlLCBwYXR0ZXJuKTtcbiAgICByZXR1cm4gVHlwZS5pc0Jvb2xlYW4obSkgPyBtIDogc291cmNlLmxhc3RJbmRleE9mKHBhdHRlcm4pID09IChzb3VyY2UubGVuZ3RoIC0gcGF0dGVybi5sZW5ndGgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbGl0eS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1RleHQvVXRpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJbmRleEVudW1lcmF0b3IgfSBmcm9tIFwiLi9JbmRleEVudW1lcmF0b3JcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vLi4vVHlwZXNcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIEFycmF5RW51bWVyYXRvciBleHRlbmRzIEluZGV4RW51bWVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoYXJyYXlPckZhY3RvcnksIHN0YXJ0ID0gMCwgc3RlcCA9IDEpIHtcbiAgICAgICAgc3VwZXIoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXJyYXkgPSBUeXBlLmlzRnVuY3Rpb24oYXJyYXlPckZhY3RvcnkpID8gYXJyYXlPckZhY3RvcnkoKSA6IGFycmF5T3JGYWN0b3J5O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGFycmF5LFxuICAgICAgICAgICAgICAgIHBvaW50ZXI6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGxlbmd0aDogYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICAgICAgICAgIHN0ZXA6IHN0ZXBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFycmF5RW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFycmF5RW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0FycmF5RW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ09iamVjdERpc3Bvc2VkRXhjZXB0aW9uJztcbmV4cG9ydCBjbGFzcyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbiBleHRlbmRzIEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24ge1xuICAgIC8vIEZvciBzaW1wbGljaXR5IGFuZCBjb25zaXN0ZW5jeSwgbGV0cyBzdGljayB3aXRoIDEgc2lnbmF0dXJlLlxuICAgIGNvbnN0cnVjdG9yKG9iamVjdE5hbWUsIG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJycsIGlubmVyRXhjZXB0aW9uLCAoXykgPT4ge1xuICAgICAgICAgICAgXy5vYmplY3ROYW1lID0gb2JqZWN0TmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBvTmFtZSA9IF8ub2JqZWN0TmFtZTtcbiAgICAgICAgb05hbWUgPSBvTmFtZSA/ICgneycgKyBvTmFtZSArICd9ICcpIDogJyc7XG4gICAgICAgIHJldHVybiAnWycgKyBfLm5hbWUgKyAnOiAnICsgb05hbWUgKyBfLm1lc3NhZ2UgKyAnXSc7XG4gICAgfVxuICAgIHN0YXRpYyB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zYWJsZSwgb2JqZWN0TmFtZSwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoZGlzcG9zYWJsZS53YXNEaXNwb3NlZClcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3REaXNwb3NlZEV4Y2VwdGlvbihvYmplY3ROYW1lLCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3REaXNwb3NlZEV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb24gT2JqZWN0UG9vbCBmcm9tIFBhcmFsbGVsIEV4dGVuc2lvbiBFeHRyYXMgYW5kIG90aGVyIE9iamVjdFBvb2wgaW1wbGVtZW50YXRpb25zLlxuICogVXNlcyAuYWRkKFQpIGFuZCAudGFrZSgpOlRcbiAqL1xuaW1wb3J0IHsgZGlzcG9zZSB9IGZyb20gXCIuL2Rpc3Bvc2VcIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4vRGlzcG9zYWJsZUJhc2VcIjtcbmltcG9ydCB7IFRhc2tIYW5kbGVyIH0gZnJvbSBcIi4uL1RocmVhZGluZy9UYXNrcy9UYXNrSGFuZGxlclwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50RXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE9CSkVDVF9QT09MID0gXCJPYmplY3RQb29sXCIsIF9NQVhfU0laRSA9IFwiX21heFNpemVcIiwgQUJTT0xVVEVfTUFYX1NJWkUgPSA2NTUzNiwgTVVTVF9CRV9HVDEgPSBcIk11c3QgYmUgYXQgdmFsaWQgbnVtYmVyIGxlYXN0IDEuXCIsIE1VU1RfQkVfTFRNID0gYE11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICR7QUJTT0xVVEVfTUFYX1NJWkV9LmA7XG5leHBvcnQgY2xhc3MgT2JqZWN0UG9vbCBleHRlbmRzIERpc3Bvc2FibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihfbWF4U2l6ZSwgX2dlbmVyYXRvciwgX3JlY3ljbGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX21heFNpemUgPSBfbWF4U2l6ZTtcbiAgICAgICAgdGhpcy5fZ2VuZXJhdG9yID0gX2dlbmVyYXRvcjtcbiAgICAgICAgdGhpcy5fcmVjeWNsZXIgPSBfcmVjeWNsZXI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCeSBkZWZhdWx0IHdpbGwgY2xlYXIgYWZ0ZXIgNSBzZWNvbmRzIG9mIG5vbi11c2UuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmF1dG9DbGVhclRpbWVvdXQgPSA1MDAwO1xuICAgICAgICBpZiAoaXNOYU4oX21heFNpemUpIHx8IF9tYXhTaXplIDwgMSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oX01BWF9TSVpFLCBfbWF4U2l6ZSwgTVVTVF9CRV9HVDEpO1xuICAgICAgICBpZiAoX21heFNpemUgPiBBQlNPTFVURV9NQVhfU0laRSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oX01BWF9TSVpFLCBfbWF4U2l6ZSwgTVVTVF9CRV9MVE0pO1xuICAgICAgICB0aGlzLl9sb2NhbEFic01heFNpemUgPSBNYXRoLm1pbihfbWF4U2l6ZSAqIDIsIEFCU09MVVRFX01BWF9TSVpFKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gT0JKRUNUX1BPT0w7XG4gICAgICAgIF8uX3Bvb2wgPSBbXTtcbiAgICAgICAgXy5fdHJpbW1lciA9IG5ldyBUYXNrSGFuZGxlcigoKSA9PiBfLl90cmltKCkpO1xuICAgICAgICBjb25zdCBjbGVhciA9ICgpID0+IF8uX2NsZWFyKCk7XG4gICAgICAgIF8uX2ZsdXNoZXIgPSBuZXcgVGFza0hhbmRsZXIoY2xlYXIpO1xuICAgICAgICBfLl9hdXRvRmx1c2hlciA9IG5ldyBUYXNrSGFuZGxlcihjbGVhcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIG1heGltdW0gYXQgd2hpY2ggdHJpbW1pbmcgc2hvdWxkIGFsbG93LlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IG1heFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhTaXplO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IG51bWJlciBvZiBvYmplY3RzIGluIHBvb2wuXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgY291bnQoKSB7XG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLl9wb29sO1xuICAgICAgICByZXR1cm4gcCA/IHAubGVuZ3RoIDogMDtcbiAgICB9XG4gICAgX3RyaW0oKSB7XG4gICAgICAgIGNvbnN0IHBvb2wgPSB0aGlzLl9wb29sO1xuICAgICAgICB3aGlsZSAocG9vbC5sZW5ndGggPiB0aGlzLl9tYXhTaXplKSB7XG4gICAgICAgICAgICBkaXNwb3NlLnNpbmdsZShwb29sLnBvcCgpLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaWxsIHRyaW0gZW5zdXJlIHRoZSBwb29sIGlzIGxlc3MgdGhhbiB0aGUgbWF4U2l6ZS5cbiAgICAgKiBAcGFyYW0gZGVmZXIgQSBkZWxheSBiZWZvcmUgdHJpbW1pbmcuICBXaWxsIGJlIG92ZXJyaWRkZW4gYnkgbGF0ZXIgY2FsbHMuXG4gICAgICovXG4gICAgdHJpbShkZWZlcikge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICB0aGlzLl90cmltbWVyLnN0YXJ0KGRlZmVyKTtcbiAgICB9XG4gICAgX2NsZWFyKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgcCA9IF8uX3Bvb2w7XG4gICAgICAgIF8uX3RyaW1tZXIuY2FuY2VsKCk7XG4gICAgICAgIF8uX2ZsdXNoZXIuY2FuY2VsKCk7XG4gICAgICAgIF8uX2F1dG9GbHVzaGVyLmNhbmNlbCgpO1xuICAgICAgICBkaXNwb3NlLnRoZXNlLm5vQ29weShwLCB0cnVlKTtcbiAgICAgICAgcC5sZW5ndGggPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaWxsIGNsZWFyIG91dCB0aGUgcG9vbC5cbiAgICAgKiBDYW5jZWxzIGFueSBzY2hlZHVsZWQgdHJpbXMgd2hlbiBleGVjdXRlZC5cbiAgICAgKiBAcGFyYW0gZGVmZXIgQSBkZWxheSBiZWZvcmUgY2xlYXJpbmcuICBXaWxsIGJlIG92ZXJyaWRkZW4gYnkgbGF0ZXIgY2FsbHMuXG4gICAgICovXG4gICAgY2xlYXIoZGVmZXIpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5fZmx1c2hlci5zdGFydChkZWZlcik7XG4gICAgfVxuICAgIHRvQXJyYXlBbmRDbGVhcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIF8uX3RyaW1tZXIuY2FuY2VsKCk7XG4gICAgICAgIF8uX2ZsdXNoZXIuY2FuY2VsKCk7XG4gICAgICAgIGNvbnN0IHAgPSBfLl9wb29sO1xuICAgICAgICBfLl9wb29sID0gW107XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCBmb3IgdG9BcnJheUFuZENsZWFyKCk7XG4gICAgICovXG4gICAgZHVtcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9BcnJheUFuZENsZWFyKCk7XG4gICAgfVxuICAgIF9vbkRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uX2dlbmVyYXRvciA9IG51bGw7XG4gICAgICAgIF8uX3JlY3ljbGVyID0gbnVsbDtcbiAgICAgICAgZGlzcG9zZShfLl90cmltbWVyLCBfLl9mbHVzaGVyLCBfLl9hdXRvRmx1c2hlcik7XG4gICAgICAgIF8uX3RyaW1tZXIgPSBudWxsO1xuICAgICAgICBfLl9mbHVzaGVyID0gbnVsbDtcbiAgICAgICAgXy5fYXV0b0ZsdXNoZXIgPSBudWxsO1xuICAgICAgICBfLl9wb29sLmxlbmd0aCA9IDA7XG4gICAgICAgIF8uX3Bvb2wgPSBudWxsO1xuICAgIH1cbiAgICBleHRlbmRBdXRvQ2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCB0ID0gXy5hdXRvQ2xlYXJUaW1lb3V0O1xuICAgICAgICBpZiAoaXNGaW5pdGUodCkgJiYgIV8uX2F1dG9GbHVzaGVyLmlzU2NoZWR1bGVkKVxuICAgICAgICAgICAgXy5fYXV0b0ZsdXNoZXIuc3RhcnQodCk7XG4gICAgfVxuICAgIGFkZChvKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoXy5fcG9vbC5sZW5ndGggPj0gXy5fbG9jYWxBYnNNYXhTaXplKSB7XG4gICAgICAgICAgICAvLyBHZXR0aW5nIHRvbyBiaWcsIGRpc3Bvc2UgaW1tZWRpYXRlbHkuLi5cbiAgICAgICAgICAgIGRpc3Bvc2Uobyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoXy5fcmVjeWNsZXIpXG4gICAgICAgICAgICAgICAgXy5fcmVjeWNsZXIobyk7XG4gICAgICAgICAgICBfLl9wb29sLnB1c2gobyk7XG4gICAgICAgICAgICBjb25zdCBtID0gXy5fbWF4U2l6ZTtcbiAgICAgICAgICAgIGlmIChtIDwgQUJTT0xVVEVfTUFYX1NJWkUgJiYgXy5fcG9vbC5sZW5ndGggPiBtKVxuICAgICAgICAgICAgICAgIF8uX3RyaW1tZXIuc3RhcnQoNTAwKTtcbiAgICAgICAgfVxuICAgICAgICBfLmV4dGVuZEF1dG9DbGVhcigpO1xuICAgIH1cbiAgICBfb25UYWtlbigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXMsIGxlbiA9IF8uX3Bvb2wubGVuZ3RoO1xuICAgICAgICBpZiAobGVuIDw9IF8uX21heFNpemUpXG4gICAgICAgICAgICBfLl90cmltbWVyLmNhbmNlbCgpO1xuICAgICAgICBpZiAobGVuKVxuICAgICAgICAgICAgXy5leHRlbmRBdXRvQ2xlYXIoKTtcbiAgICB9XG4gICAgdHJ5VGFrZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gXy5fcG9vbC5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIF8uX29uVGFrZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0YWtlKGZhY3RvcnkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghXy5fZ2VuZXJhdG9yICYmICFmYWN0b3J5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCdmYWN0b3J5JywgXCJNdXN0IHByb3ZpZGUgYSBmYWN0b3J5IGlmIG9uIHdhcyBub3QgcHJvdmlkZWQgYXQgY29uc3RydWN0aW9uIHRpbWUuXCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIF8uX3Bvb2wucG9wKCkgfHwgZmFjdG9yeSAmJiBmYWN0b3J5KCkgfHwgXy5fZ2VuZXJhdG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBfLl9vblRha2VuKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBPYmplY3RQb29sO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0UG9vbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0Rpc3Bvc2FibGUvT2JqZWN0UG9vbC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBTeXN0ZW1FeGNlcHRpb24gfSBmcm9tIFwiLi4vLi4vRXhjZXB0aW9ucy9TeXN0ZW1FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24nO1xuZXhwb3J0IGNsYXNzIFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbiBleHRlbmRzIFN5c3RlbUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlIHx8IFwiVW5zdXBwb3J0ZWQgZW51bWVyYWJsZS5cIik7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL1Vuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB9IGZyb20gXCIuL1NpbXBsZUVudW1lcmFibGVCYXNlXCI7XG4vKipcbiAqIEEgc2ltcGxpZmllZCBzdHJpcHBlZCBkb3duIGVudW1lcmF0b3IgdGhhdCB1bnRpbCBkaXNwb3NlZCB3aWxsIGluZmluaXRlbHkgcmV0dXJuIHRoZSBwcm92aWRlZCBmYWN0b3J5LlxuICogVGhpcyBpcyBhbmFsb2dvdXMgdG8gYSAnZ2VuZXJhdG9yJyBhbmQgaGFzIGEgY29tcGF0aWJsZSBpbnRlcmZhY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZUVudW1lcmF0b3IgZXh0ZW5kcyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB7XG4gICAgLyoqXG4gICAgICogU2VlIEluZmluaXRlVmFsdWVGYWN0b3J5XG4gICAgICogQHBhcmFtIF9mYWN0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoX2ZhY3RvcnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZmFjdG9yeSA9IF9mYWN0b3J5O1xuICAgIH1cbiAgICBfY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mYWN0b3J5ICE9IG51bGw7XG4gICAgfVxuICAgIG1vdmVOZXh0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZiA9IF8uX2ZhY3Rvcnk7XG4gICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICBfLl9jdXJyZW50ID0gZihfLl9jdXJyZW50LCBfLmluY3JlbWVudEluZGV4KCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkgPSBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZmluaXRlRW51bWVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUluZmluaXRlRW51bWVyYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0luZmluaXRlRW51bWVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBJdGVyYXRvclJlc3VsdCB9IGZyb20gXCIuL0l0ZXJhdG9yUmVzdWx0XCI7XG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmV4cG9ydCBjbGFzcyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZ2V0IGN1cnJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICAgIH1cbiAgICBnZXQgY2FuTW92ZU5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW5Nb3ZlTmV4dCgpO1xuICAgIH1cbiAgICB0cnlNb3ZlTmV4dChvdXQpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgb3V0KHRoaXMuX2N1cnJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpbmNyZW1lbnRJbmRleCgpIHtcbiAgICAgICAgbGV0IGkgPSB0aGlzLl9pbmRleDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBpID0gaXNOYU4oaSkgPyAwIDogKGkgKyAxKTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIG5leHRWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5tb3ZlTmV4dCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZU5leHQoKVxuICAgICAgICAgICAgPyBuZXcgSXRlcmF0b3JSZXN1bHQodGhpcy5fY3VycmVudCwgdGhpcy5faW5kZXgpXG4gICAgICAgICAgICA6IEl0ZXJhdG9yUmVzdWx0LkRvbmU7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgfVxuICAgICdyZXR1cm4nKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IFZPSUQwICYmIHRoaXMuX2Nhbk1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICA/IG5ldyBJdGVyYXRvclJlc3VsdCh2YWx1ZSwgVk9JRDAsIHRydWUpXG4gICAgICAgICAgICAgICAgOiBJdGVyYXRvclJlc3VsdC5Eb25lO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBWT0lEMDtcbiAgICAgICAgdGhpcy5faW5kZXggPSBOYU47XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZ2V0SXNFbmRsZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FuTW92ZU5leHQoKTtcbiAgICB9XG4gICAgZ2V0IGlzRW5kbGVzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXNFbmRsZXNzKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlRW51bWVyYWJsZUJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaW1wbGVFbnVtZXJhYmxlQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL1NpbXBsZUVudW1lcmFibGVCYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEl0ZXJhdG9yUmVzdWx0IH0gZnJvbSBcIi4vSXRlcmF0b3JSZXN1bHRcIjtcbmltcG9ydCB7IEZ1bmN0aW9ucyB9IGZyb20gXCIuLi8uLi9GdW5jdGlvbnNcIjtcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuLyoqXG4gKiBBIHNpbXBsaWZpZWQgc3RyaXBwZWQgZG93biBlbnVtZXJhYmxlIHRoYXQgaXMgYWx3YXlzIGNvbXBsZXRlIGFuZCBoYXMgbm8gcmVzdWx0cy5cbiAqIEZyb3plbiBhbmQgZXhwb3J0ZWQgYXMgJ2VtcHR5JyB0byBhbGxvdyBmb3IgcmV1c2UuXG4gKi9cbmV4cG9ydCBjb25zdCBFbXB0eUVudW1lcmF0b3IgPSBPYmplY3QuZnJlZXplKHtcbiAgICBjdXJyZW50OiBWT0lEMCxcbiAgICBtb3ZlTmV4dDogRnVuY3Rpb25zLkZhbHNlLFxuICAgIHRyeU1vdmVOZXh0OiBGdW5jdGlvbnMuRmFsc2UsXG4gICAgbmV4dFZhbHVlOiBGdW5jdGlvbnMuQmxhbmssXG4gICAgbmV4dDogSXRlcmF0b3JSZXN1bHQuR2V0RG9uZSxcbiAgICBcInJldHVyblwiOiBJdGVyYXRvclJlc3VsdC5HZXREb25lLFxuICAgIGVuZDogRnVuY3Rpb25zLkJsYW5rLFxuICAgIHJlc2V0OiBGdW5jdGlvbnMuQmxhbmssXG4gICAgZGlzcG9zZTogRnVuY3Rpb25zLkJsYW5rLFxuICAgIGlzRW5kbGVzczogZmFsc2Vcbn0pO1xuZXhwb3J0IGRlZmF1bHQgRW1wdHlFbnVtZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW1wdHlFbnVtZXJhdG9yLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW1wdHlFbnVtZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IFNpbXBsZUVudW1lcmFibGVCYXNlIH0gZnJvbSBcIi4vU2ltcGxlRW51bWVyYWJsZUJhc2VcIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLyoqXG4gKiBBIHNpbXBsaWZpZWQgc3RyaXBwZWQgZG93biBlbnVtZXJhdG9yIHRoYXQgdW50aWwgZGlzcG9zZWQgd2lsbCBpbmZpbml0ZWx5IHJldHVybiB0aGUgcHJvdmlkZWQgZmFjdG9yeS5cbiAqIFRoaXMgaXMgYW5hbG9nb3VzIHRvIGEgJ2dlbmVyYXRvcicgYW5kIGhhcyBhIGNvbXBhdGlibGUgaW50ZXJmYWNlLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBJdGVyYXRvckVudW1lcmF0b3IgZXh0ZW5kcyBTaW1wbGVFbnVtZXJhYmxlQmFzZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIF9pdGVyYXRvclxuICAgICAqIEBwYXJhbSBfaXNFbmRsZXNzIHRydWUgYW5kIGZhbHNlIGFyZSBleHBsaWNpdCB3aGVyZSBhcyB1bmRlZmluZWQgbWVhbnMgJ3Vua25vd24nLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKF9pdGVyYXRvciwgX2lzRW5kbGVzcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pdGVyYXRvciA9IF9pdGVyYXRvcjtcbiAgICAgICAgdGhpcy5faXNFbmRsZXNzID0gX2lzRW5kbGVzcztcbiAgICB9XG4gICAgX2Nhbk1vdmVOZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlcmF0b3IgIT0gbnVsbDtcbiAgICB9XG4gICAgbW92ZU5leHQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGkgPSBfLl9pdGVyYXRvcjtcbiAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBhcmd1bWVudHMubGVuZ3RoID8gaS5uZXh0KHZhbHVlKSA6IGkubmV4dCgpO1xuICAgICAgICAgICAgXy5fY3VycmVudCA9IHIudmFsdWU7XG4gICAgICAgICAgICBpZiAoci5kb25lKVxuICAgICAgICAgICAgICAgIF8uZGlzcG9zZSgpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9pdGVyYXRvciA9IG51bGw7XG4gICAgfVxuICAgIGdldElzRW5kbGVzcygpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5faXNFbmRsZXNzKSAmJiBzdXBlci5nZXRJc0VuZGxlc3MoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJdGVyYXRvckVudW1lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JdGVyYXRvckVudW1lcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JdGVyYXRvckVudW1lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8g44Kk44Oz44K/44O844OV44Kn44Kk44K557Wx5ZCI44Gr44KI44KL44Kz44Ki44Kv44Op44K544Gu5ouh5by1XHJcbmRlY2xhcmUgaW50ZXJmYWNlIFN0cmluZyB7XHJcbiAgbm9ybWFsaXplTmV3TGluZSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcblN0cmluZy5wcm90b3R5cGUubm9ybWFsaXplTmV3TGluZSA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gdGhpcy5yZXBsYWNlKC9cXHI/XFxuL2csICdcXHJcXG4nKTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1N0cmluZ0V4dGVuc2lvbi50cyIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogT3JpZ2luYWw6IGh0dHA6Ly9saW5xanMuY29kZXBsZXguY29tL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IGFyZUVxdWFsIGFzIGFyZUVxdWFsVmFsdWVzLCBjb21wYXJlIGFzIGNvbXBhcmVWYWx1ZXMgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbXBhcmVcIjtcbmltcG9ydCB7IGNvcHkgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L2NvcHlcIjtcbmltcG9ydCAqIGFzIEFycmF5cyBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L0NvbXBhcmVcIjtcbmltcG9ydCAqIGFzIGVudW1VdGlsIGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvclwiO1xuaW1wb3J0IHsgaXNFbnVtZXJhYmxlLCBpc0VudW1lcmF0b3IsIGlzSXRlcmF0b3IsIHRocm93SWZFbmRsZXNzIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBFbXB0eUVudW1lcmF0b3IgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL0VtcHR5RW51bWVyYXRvclwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9TeXN0ZW0vVHlwZXNcIjtcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi4vU3lzdGVtL0ludGVnZXJcIjtcbmltcG9ydCB7IEZ1bmN0aW9ucyBhcyBCYXNlRnVuY3Rpb25zIH0gZnJvbSBcIi4uL1N5c3RlbS9GdW5jdGlvbnNcIjtcbmltcG9ydCB7IEFycmF5RW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vQXJyYXlFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0RpY3Rpb25hcmllcy9EaWN0aW9uYXJ5XCI7XG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvUXVldWVcIjtcbmltcG9ydCB7IGRpc3Bvc2UsIHVzaW5nIH0gZnJvbSBcIi4uL1N5c3RlbS9EaXNwb3NhYmxlL2Rpc3Bvc2VcIjtcbmltcG9ydCB7IERpc3Bvc2FibGVCYXNlIH0gZnJvbSBcIi4uL1N5c3RlbS9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG5pbXBvcnQgeyBVbnN1cHBvcnRlZEVudW1lcmFibGVFeGNlcHRpb24gfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0VudW1lcmF0aW9uL1Vuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24gfSBmcm9tIFwiLi4vU3lzdGVtL0Rpc3Bvc2FibGUvT2JqZWN0RGlzcG9zZWRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEtleVNvcnRlZENvbnRleHQgfSBmcm9tIFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL1NvcnRpbmcvS2V5U29ydGVkQ29udGV4dFwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uL1N5c3RlbS9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgSW5kZXhFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmRleEVudW1lcmF0b3JcIjtcbmltcG9ydCB7IEl0ZXJhdG9yRW51bWVyYXRvciB9IGZyb20gXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vSXRlcmF0b3JFbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9pbml0aWFsaXplXCI7XG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vU3lzdGVtL1JhbmRvbVwiO1xuaW1wb3J0IHsgSW5maW5pdGVFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9FbnVtZXJhdGlvbi9JbmZpbml0ZUVudW1lcmF0b3JcIjtcbmltcG9ydCB7IExhenlMaXN0IH0gZnJvbSBcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9MYXp5TGlzdFwiO1xudmFyIGRpc3Bvc2VTaW5nbGUgPSBkaXNwb3NlLnNpbmdsZTtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLy8gI3JlZ2lvbiBMb2NhbCBDb25zdGFudHMuXG5jb25zdCBJTlZBTElEX0RFRkFVTFQgPSB7fTsgLy8gY3JlYXRlIGEgcHJpdmF0ZSB1bmlxdWUgaW5zdGFuY2UgZm9yIHJlZmVyZW5jaW5nLlxuY29uc3QgVk9JRDAgPSB2b2lkIDA7XG5jb25zdCBOVUxMID0gbnVsbDtcbmZ1bmN0aW9uIEJSRUFLKCkge1xuICAgIHJldHVybiAwIC8qIEJyZWFrICovO1xufVxuZnVuY3Rpb24gUkVUVVJOKCkge1xuICAgIHJldHVybiAxIC8qIFJldHVybiAqLztcbn1cbmZ1bmN0aW9uIGlzTm90TnVsbE9yVW5kZWZpbmVkKGUpIHtcbiAgICByZXR1cm4gZSAhPSBudWxsO1xufVxuLy8gTGVhdmUgaW50ZXJuYWwgdG8gYXZvaWQgYWNjaWRlbnRhbCBvdmVyd3JpdGluZy5cbmNsYXNzIExpbnFGdW5jdGlvbnMgZXh0ZW5kcyBCYXNlRnVuY3Rpb25zIHtcbiAgICAvLyBub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIEdyZWF0ZXIoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA+IGIgPyBhIDogYjtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICBMZXNzZXIoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA8IGIgPyBhIDogYjtcbiAgICB9XG59XG5jb25zdCBGdW5jdGlvbnMgPSBPYmplY3QuZnJlZXplKG5ldyBMaW5xRnVuY3Rpb25zKCkpO1xuLy8gRm9yIHJlLXVzZSBhcyBhIGZhY3RvcnkuXG5mdW5jdGlvbiBnZXRFbXB0eUVudW1lcmF0b3IoKSB7XG4gICAgcmV0dXJuIEVtcHR5RW51bWVyYXRvcjtcbn1cbi8vICNlbmRyZWdpb25cbi8qXG4gKiBOT1RFOiBBYm91dCBJbmZpbml0ZUVudW1lcmFibGU8VD4gYW5kIEVudW1lcmFibGU8VD4uXG4gKiBUaGVyZSBtYXkgc2VlbSBsaWtlIHRoZXJlJ3MgZXh0cmEgb3ZlcnJpZGVzIGhlcmUgYW5kIHRoZXkgbWF5IHNlZW0gdW5uZWNlc3NhcnkuXG4gKiBCdXQgYWZ0ZXIgY2xvc2VyIGluc3BlY3Rpb24geW91J2xsIHNlZSB0aGUgdHlwZSBjaGFpbiBpcyByZXRhaW5lZCBhbmRcbiAqIGluZmluaXRlIGVudW1lcmFibGVzIGFyZSBwcmV2ZW50ZWQgZnJvbSBoYXZpbmcgZmVhdHVyZXMgdGhhdCBmaW5pdGUgb25lcyBoYXZlLlxuICpcbiAqIEknbSBub3Qgc3VyZSBpZiBpdCdzIHRoZSBiZXN0IG9wdGlvbiB0byBqdXN0IHVzZSBvdmVycmlkZXMsIGJ1dCBpdCBob25vcnMgdGhlIHR5cGluZyBwcm9wZXJseS5cbiAqL1xuZXhwb3J0IGNsYXNzIEluZmluaXRlTGlucUVudW1lcmFibGUgZXh0ZW5kcyBEaXNwb3NhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2VudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIpIHtcbiAgICAgICAgc3VwZXIoZmluYWxpemVyKTtcbiAgICAgICAgdGhpcy5fZW51bWVyYXRvckZhY3RvcnkgPSBfZW51bWVyYXRvckZhY3Rvcnk7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJJbmZpbml0ZUxpbnFFbnVtZXJhYmxlXCI7XG4gICAgfVxuICAgIGdldCBpc0VuZGxlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuZGxlc3M7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSUVudW1lcmFibGU8VD4gSW1wbGVtZW50YXRpb24uLi5cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZW51bWVyYXRvckZhY3RvcnkoKTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIC8vICNyZWdpb24gSURpc3Bvc2FibGUgb3ZlcnJpZGUuLi5cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7IC8vIEp1c3QgaW4gY2FzZS5cbiAgICAgICAgdGhpcy5fZW51bWVyYXRvckZhY3RvcnkgPSBudWxsO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gUmV0dXJuIGEgZGVmYXVsdCAodW5maWx0ZXJlZCkgZW51bWVyYWJsZS5cbiAgICBhc0VudW1lcmFibGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4gXy5nZXRFbnVtZXJhdG9yKCkpO1xuICAgIH1cbiAgICBkb0FjdGlvbihhY3Rpb24sIGluaXRpYWxpemVyLCBpc0VuZGxlc3MgPSB0aGlzLmlzRW5kbGVzcywgb25Db21wbGV0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFID0gaXNFbmRsZXNzIHx8IHVuZGVmaW5lZDsgLy8gSW4gY2FzZSBpdCdzIG51bGwuXG4gICAgICAgIGlmICghYWN0aW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImFjdGlvblwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWFjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxpemVyKVxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplcigpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgLy8gTWF5IG5lZWQgYSB3YXkgdG8gcHJvcGFnYXRlIGlzRW5kbGVzc1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWFjdGlvbik7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvblJlc3VsdCA9IGFjdGlvbihjLCBpbmRleCsrKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvblJlc3VsdCA9PT0gZmFsc2UgfHwgYWN0aW9uUmVzdWx0ID09PSAwIC8qIEJyZWFrICovKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uUmVzdWx0ICE9PSAyIC8qIFNraXAgKi8pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYWN0aW9uUmVzdWx0PT09MiwgdGhlbiBhIHNpZ25hbCBmb3Igc2tpcCBpcyByZWNlaXZlZC5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUpXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9LCBpc0UpO1xuICAgICAgICB9LCBcbiAgICAgICAgLy8gVXNpbmcgYSBmaW5hbGl6ZXIgdmFsdWUgcmVkdWNlcyB0aGUgY2hhbmNlIG9mIGEgY2lyY3VsYXIgcmVmZXJlbmNlXG4gICAgICAgIC8vIHNpbmNlIHdlIGNvdWxkIHNpbXBseSByZWZlcmVuY2UgdGhlIGVudW1lcmF0aW9uIGFuZCBjaGVjayBlLndhc0Rpc3Bvc2VkLlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBhY3Rpb24gPSBOVUxMO1xuICAgICAgICB9LCBpc0UpO1xuICAgIH1cbiAgICBmb3JjZSgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5kb0FjdGlvbihCUkVBSylcbiAgICAgICAgICAgIC5nZXRFbnVtZXJhdG9yKClcbiAgICAgICAgICAgIC5tb3ZlTmV4dCgpO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIEluZGV4aW5nL1BhZ2luZyBtZXRob2RzLlxuICAgIHNraXAoY291bnQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKGdldEVtcHR5RW51bWVyYXRvcik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICByZXR1cm4gdGhpcy53aGVyZSgoZWxlbWVudCwgaW5kZXgpID0+IGluZGV4ID49IGNvdW50KTtcbiAgICB9XG4gICAgdGFrZShjb3VudCkge1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignY291bnQnLCBjb3VudCwgJ011c3QgYmUgZmluaXRlLicpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKTtcbiAgICAgICAgLy8gT25jZSBhY3Rpb24gcmV0dXJucyBmYWxzZSwgdGhlIGVudW1lcmF0aW9uIHdpbGwgc3RvcC5cbiAgICAgICAgcmV0dXJuIF8uZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiBpbmRleCA8IGNvdW50LCBudWxsLCBmYWxzZSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gU2luZ2xlIFZhbHVlIFJldHVybi4uLlxuICAgIGVsZW1lbnRBdChpbmRleCkge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5lbGVtZW50QXRPckRlZmF1bHQoaW5kZXgsIElOVkFMSURfREVGQVVMVCk7XG4gICAgICAgIGlmICh2ID09PSBJTlZBTElEX0RFRkFVTFQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdpbmRleCcsIGluZGV4LCBcImlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHNvdXJjZVwiKTtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIGVsZW1lbnRBdE9yRGVmYXVsdChpbmRleCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgsICdpbmRleCcpO1xuICAgICAgICBjb25zdCBuID0gaW5kZXg7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyogTm90ZTogVW5saWtlIHByZXZpb3VzIGltcGxlbWVudGF0aW9ucywgeW91IGNvdWxkIHBhc3MgYSBwcmVkaWNhdGUgaW50byB0aGVzZSBtZXRob2RzLlxuICAgICAqIEJ1dCBzaW5jZSB1bmRlciB0aGUgaG9vZCBpdCBlbmRzIHVwIGNhbGxpbmcgLndoZXJlKHByZWRpY2F0ZSkgYW55d2F5LFxuICAgICAqIGl0IG1heSBiZSBiZXR0ZXIgdG8gcmVtb3ZlIHRoaXMgdG8gYWxsb3cgZm9yIGEgY2xlYW5lciBzaWduYXR1cmUvb3ZlcnJpZGUuXG4gICAgICogSmF2YVNjcmlwdC9UeXBlU2NyaXB0IGRvZXMgbm90IGVhc2lseSBhbGxvdyBmb3IgYSBzdHJpY3QgbWV0aG9kIGludGVyZmFjZSBsaWtlIEMjLlxuICAgICAqIEhhdmluZyB0byB3cml0ZSBleHRyYSBvdmVycmlkZSBsb2dpYyBpcyBlcnJvciBwcm9uZSBhbmQgY29uZnVzaW5nIHRvIHRoZSBjb25zdW1lci5cbiAgICAgKiBSZW1vdmluZyB0aGUgcHJlZGljYXRlIGhlcmUgbWF5IGFsc28gY2F1c2UgdGhlIGNvbnN1bWVyIG9mIHRoaXMgbWV0aG9kIHRvIHRoaW5rIG1vcmUgYWJvdXQgaG93IHRoZXkgc3RydWN0dXJlIHRoZWlyIHF1ZXJ5LlxuICAgICAqIFRoZSBlbmQgYWxsIGRpZmZlcmVuY2UgaXMgdGhhdCB0aGUgdXNlciBtdXN0IGRlY2xhcmUgLndoZXJlKHByZWRpY2F0ZSkgYmVmb3JlIC5maXJzdCgpLCAuc2luZ2xlKCksIG9yIC5sYXN0KCkuXG4gICAgICogT3RoZXJ3aXNlIHRoZXJlIHdvdWxkIG5lZWQgdG8gYmUgbXVjaCBtb3JlIGNvZGUgdG8gaGFuZGxlIHRoZXNlIGNhc2VzICguZmlyc3QocHJlZGljYXRlKSwgZXRjKTtcbiAgICAgKiAqL1xuICAgIGZpcnN0KCkge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5maXJzdE9yRGVmYXVsdChJTlZBTElEX0RFRkFVTFQpO1xuICAgICAgICBpZiAodiA9PT0gSU5WQUxJRF9ERUZBVUxUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZmlyc3Q6VGhlIHNlcXVlbmNlIGlzIGVtcHR5LlwiKTtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIGZpcnN0T3JEZWZhdWx0KGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlID0+IGUubW92ZU5leHQoKSA/IGUuY3VycmVudCA6IGRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuICAgIHNpbmdsZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZS5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghZS5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2luZ2xlOnNlcXVlbmNlIGNvbnRhaW5zIG1vcmUgdGhhbiBvbmUgZWxlbWVudC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzaW5nbGU6VGhlIHNlcXVlbmNlIGlzIGVtcHR5LlwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpbmdsZU9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiB1c2luZyh0aGlzLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZS5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghZS5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYW55KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIHVzaW5nKHRoaXMuZ2V0RW51bWVyYXRvcigpLCBlID0+IGUubW92ZU5leHQoKSk7XG4gICAgfVxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hbnkoKTtcbiAgICB9XG4gICAgdHJhdmVyc2VEZXB0aEZpcnN0KGNoaWxkcmVuU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzOyAvLyBJcyBlbmRsZXNzIGlzIG5vdCBhZmZpcm1hdGl2ZSBpZiBmYWxzZS5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBEZXYgTm90ZTogTWF5IHdhbnQgdG8gY29uc2lkZXIgdXNpbmcgYW4gYWN0dWFsIHN0YWNrIGFuZCBub3QgYW4gYXJyYXkuXG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvclN0YWNrO1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbGVuOyAvLyBBdm9pZCB1c2luZyBwdXNoL3BvcCBzaW5jZSB0aGV5IHF1ZXJ5IC5sZW5ndGggZXZlcnkgdGltZSBhbmQgY2FuIGJlIHNsb3dlci5cbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFjayA9IFtdO1xuICAgICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcmVzdWx0U2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50LCBsZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrW2xlbisrXSA9IGVudW1lcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGNoaWxkcmVuU2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlID0gIVR5cGUuaXNTdHJpbmcoYykgJiYgRW51bWVyYWJsZS5mcm9tQW55KGMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IGUgPyBlLmdldEVudW1lcmF0b3IoKSA6IEVtcHR5RW51bWVyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gZW51bWVyYXRvclN0YWNrWy0tbGVuXTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvclN0YWNrLmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yU3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3Bvc2UudGhlc2Uubm9Db3B5KGVudW1lcmF0b3JTdGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yU3RhY2subGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3JTdGFjayA9IE5VTEw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGZsYXR0ZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1hbnkoZW50cnkgPT4ge1xuICAgICAgICAgICAgbGV0IGUgPSAhVHlwZS5pc1N0cmluZyhlbnRyeSkgJiYgRW51bWVyYWJsZS5mcm9tQW55KGVudHJ5KTtcbiAgICAgICAgICAgIHJldHVybiBlID8gZS5mbGF0dGVuKCkgOiBbZW50cnldO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcGFpcndpc2Uoc2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghc2VsZWN0b3IpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic2VsZWN0b3JcIik7XG4gICAgICAgIGxldCBwcmV2aW91cztcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0KCh2YWx1ZSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gaSA/IHNlbGVjdG9yKHByZXZpb3VzLCB2YWx1ZSwgaSkgOiBOVUxMO1xuICAgICAgICAgICAgcHJldmlvdXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pLnNraXAoMSk7XG4gICAgfVxuICAgIHNjYW4oZnVuYywgc2VlZCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFmdW5jKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImZ1bmNcIik7XG4gICAgICAgIHJldHVybiAoc2VlZCA9PT0gVk9JRDBcbiAgICAgICAgICAgID8gdGhpcy5zZWxlY3QoKHZhbHVlLCBpKSA9PiBzZWVkID0gaSA/IGZ1bmMoc2VlZCwgdmFsdWUsIGkpIDogdmFsdWUpXG4gICAgICAgICAgICA6IHRoaXMuc2VsZWN0KCh2YWx1ZSwgaSkgPT4gc2VlZCA9IGZ1bmMoc2VlZCwgdmFsdWUsIGkpKSk7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICBzZWxlY3Qoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgbWFwKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChzZWxlY3Rvcik7XG4gICAgfVxuICAgIC8qXG4gICAgcHVibGljIHN0YXRpYyBJRW51bWVyYWJsZTxUUmVzdWx0PiBTZWxlY3RNYW55PFRTb3VyY2UsIFRDb2xsZWN0aW9uLCBUUmVzdWx0PihcbiAgICAgICAgdGhpcyBJRW51bWVyYWJsZTxUU291cmNlPiBzb3VyY2UsXG4gICAgICAgIEZ1bmM8VFNvdXJjZSzigIJJRW51bWVyYWJsZTxUQ29sbGVjdGlvbj4+IGNvbGxlY3Rpb25TZWxlY3RvcixcbiAgICAgICAgRnVuYzxUU291cmNlLOKAglRDb2xsZWN0aW9uLOKAglRSZXN1bHQ+IHJlc3VsdFNlbGVjdG9yKVxuICAgICAqL1xuICAgIF9zZWxlY3RNYW55KGNvbGxlY3Rpb25TZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghY29sbGVjdGlvblNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImNvbGxlY3Rpb25TZWxlY3RvclwiKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzOyAvLyBEbyBzZWNvbmQgZW51bWVyYXRpb24sIGl0IHdpbGwgYmUgaW5kZXRlcm1pbmF0ZSBpZiBmYWxzZS5cbiAgICAgICAgaWYgKCFyZXN1bHRTZWxlY3RvcilcbiAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yID0gKGEsIGIpID0+IGI7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbWlkZGxlRW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWNvbGxlY3Rpb25TZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IgPSBWT0lEMDtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghY29sbGVjdGlvblNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAvLyBKdXN0IHN0YXJ0ZWQsIGFuZCBub3RoaW5nIHRvIGVudW1lcmF0ZT8gRW5kLlxuICAgICAgICAgICAgICAgIGlmIChtaWRkbGVFbnVtZXJhdG9yID09PSBWT0lEMCAmJiAhZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gbW92ZU5leHQgaGFzIGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2UuLi5cbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgbWlkZGxlIGlmIHRoZXJlIGlzbid0IG9uZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtaWRkbGVFbnVtZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWlkZGxlU2VxID0gY29sbGVjdGlvblNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgaW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb2xsZWN0aW9uIGlzIG51bGw/ICBTa2lwIGl0Li4uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1pZGRsZVNlcSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKG1pZGRsZVNlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pZGRsZUVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgbWlkZGxlRW51bWVyYXRvci5jdXJyZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVsc2Ugbm8gbW9yZSBpbiB0aGlzIG1pZGRsZT8gIFRoZW4gY2xlYXIgYW5kIHJlc2V0IGZvciBuZXh0Li4uXG4gICAgICAgICAgICAgICAgICAgIG1pZGRsZUVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZGlzcG9zZVNpbmdsZShtaWRkbGVFbnVtZXJhdG9yKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBtaWRkbGVFbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25TZWxlY3RvciA9IE5VTEw7XG4gICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIHNlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKTtcbiAgICB9XG4gICAgX2ZpbHRlclNlbGVjdGVkKHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5LCBmaWx0ZXIpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBkaXNwb3NlZCA9ICFfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlbGVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbGVjdG9yXCIpO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBzZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIGkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbHRlciB8fCBmaWx0ZXIocmVzdWx0LCBpKyspKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH0sIF8uX2lzRW5kbGVzcyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIH0sIF8uX2lzRW5kbGVzcyk7XG4gICAgfVxuICAgIGNob29zZShzZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyU2VsZWN0ZWQoc2VsZWN0b3IsIGlzTm90TnVsbE9yVW5kZWZpbmVkKTtcbiAgICB9XG4gICAgd2hlcmUocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChGdW5jdGlvbnMuSWRlbnRpdHksIHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIGZpbHRlcihwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclNlbGVjdGVkKEZ1bmN0aW9ucy5JZGVudGl0eSwgcHJlZGljYXRlKTtcbiAgICB9XG4gICAgbm9uTnVsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2hlcmUodiA9PiB2ICE9IG51bGwgJiYgdiAhPSBWT0lEMCk7XG4gICAgfVxuICAgIG9mVHlwZSh0eXBlKSB7XG4gICAgICAgIGxldCB0eXBlTmFtZTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgICAgICAgICB0eXBlTmFtZSA9IFR5cGUuTlVNQkVSO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTdHJpbmc6XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLlNUUklORztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQm9vbGVhbjpcbiAgICAgICAgICAgICAgICB0eXBlTmFtZSA9IFR5cGUuQk9PTEVBTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRnVuY3Rpb246XG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBUeXBlLkZVTkNUSU9OO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICAgICAgICAgICAgICAud2hlcmUoeCA9PiB4IGluc3RhbmNlb2YgdHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgIC53aGVyZSh4ID0+IGlzTm90TnVsbE9yVW5kZWZpbmVkKHgpICYmIHR5cGVvZiB4ID09PSB0eXBlTmFtZSk7XG4gICAgfVxuICAgIGV4Y2VwdChzZWNvbmQsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXlzO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAga2V5cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZClcbiAgICAgICAgICAgICAgICAgICAgZW51bVV0aWwuZm9yRWFjaChzZWNvbmQsIGtleSA9PiB7IGtleXMuYWRkQnlLZXlWYWx1ZShrZXksIHRydWUpOyB9KTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWtleXMuY29udGFpbnNLZXkoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMuYWRkQnlLZXlWYWx1ZShjdXJyZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAga2V5cy5jbGVhcigpO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBkaXN0aW5jdChjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjZXB0KE5VTEwsIGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgfVxuICAgIC8vIFswLDAsMCwxLDEsMSwyLDIsMiwwLDAsMCwxLDFdIHJlc3VsdHMgaW4gWzAsMSwyLDAsMV07XG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGNvbXBhcmVLZXk7XG4gICAgICAgICAgICBsZXQgaW5pdGlhbCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBjb21wYXJlU2VsZWN0b3IoZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlS2V5LCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb21wYXJlS2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc2luZ2xlIGRlZmF1bHQgdmFsdWUgaWYgZW1wdHkuXG4gICAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZVxuICAgICAqIEByZXR1cm5zIHtFbnVtZXJhYmxlfVxuICAgICAqL1xuICAgIGRlZmF1bHRJZkVtcHR5KGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGlzRmlyc3Q7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZW51bWVyYXRvci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNGaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICB6aXAoc2Vjb25kLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlyc3RFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHNlY29uZEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKHNlY29uZCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4gZmlyc3RFbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAmJiBzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGZpcnN0RW51bWVyYXRvci5jdXJyZW50LCBzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQsIGluZGV4KyspKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHppcE11bHRpcGxlKHNlY29uZCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghc2Vjb25kLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlY29uZFRlbXA7XG4gICAgICAgICAgICBsZXQgZmlyc3RFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHNlY29uZEVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2Vjb25kVGVtcCA9IG5ldyBRdWV1ZShzZWNvbmQpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIXNlY29uZEVudW1lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kVGVtcC5jb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHNlY29uZFRlbXAuZGVxdWV1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKG5leHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0U2VsZWN0b3IoZmlyc3RFbnVtZXJhdG9yLmN1cnJlbnQsIHNlY29uZEVudW1lcmF0b3IuY3VycmVudCwgaW5kZXgrKykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZFRlbXApXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZFRlbXAuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgc2Vjb25kVGVtcCA9IE5VTEw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSm9pbiBNZXRob2RzXG4gICAgam9pbihpbm5lciwgb3V0ZXJLZXlTZWxlY3RvciwgaW5uZXJLZXlTZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgb3V0ZXJFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGxvb2t1cDtcbiAgICAgICAgICAgIGxldCBpbm5lckVsZW1lbnRzO1xuICAgICAgICAgICAgbGV0IGlubmVyQ291bnQgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0ZXJFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgbG9va3VwID0gRW51bWVyYWJsZS5mcm9tKGlubmVyKVxuICAgICAgICAgICAgICAgICAgICAudG9Mb29rdXAoaW5uZXJLZXlTZWxlY3RvciwgRnVuY3Rpb25zLklkZW50aXR5LCBjb21wYXJlU2VsZWN0b3IpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJFbGVtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlubmVyRWxlbWVudCA9IGlubmVyRWxlbWVudHNbaW5uZXJDb3VudCsrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lckVsZW1lbnQgIT09IFZPSUQwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKG91dGVyRW51bWVyYXRvci5jdXJyZW50LCBpbm5lckVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyRWxlbWVudHMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dGVyRW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gb3V0ZXJLZXlTZWxlY3RvcihvdXRlckVudW1lcmF0b3IuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckVsZW1lbnRzID0gbG9va3VwLmdldChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvdXRlckVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIG91dGVyRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaW5uZXJFbGVtZW50cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgb3V0ZXJFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBsb29rdXAgPSBOVUxMO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBncm91cEpvaW4oaW5uZXIsIG91dGVyS2V5U2VsZWN0b3IsIGlubmVyS2V5U2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgbG9va3VwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGxvb2t1cCA9IEVudW1lcmFibGUuZnJvbShpbm5lcilcbiAgICAgICAgICAgICAgICAgICAgLnRvTG9va3VwKGlubmVyS2V5U2VsZWN0b3IsIEZ1bmN0aW9ucy5JZGVudGl0eSwgY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiBlbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdFNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCwgbG9va3VwLmdldChvdXRlcktleVNlbGVjdG9yKGVudW1lcmF0b3IuY3VycmVudCkpKSksICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICAgICAgbG9va3VwID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWVyZ2UoZW51bWVyYWJsZXMpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uX2lzRW5kbGVzcztcbiAgICAgICAgaWYgKCFlbnVtZXJhYmxlcyB8fCBlbnVtZXJhYmxlcy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IHF1ZXVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gMSkgRmlyc3QgZ2V0IG91ciB2YWx1ZXMuLi5cbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSBuZXcgUXVldWUoZW51bWVyYWJsZXMpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWVudW1lcmF0b3IgJiYgcXVldWUudHJ5RGVxdWV1ZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbSh2YWx1ZSk7IC8vIDQpIEtlZXAgZ29pbmcgYW5kIG9uIHRvIHN0ZXAgMi4gIEVsc2UgZmFsbCB0aHJvdWdoIHRvIHlpZWxkQnJlYWsoKS5cbiAgICAgICAgICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvciAmJiBlbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZSlcbiAgICAgICAgICAgICAgICAgICAgcXVldWUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHF1ZXVlID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGNvbmNhdCguLi5lbnVtZXJhYmxlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXJnZShlbnVtZXJhYmxlcyk7XG4gICAgfVxuICAgIHVuaW9uKHNlY29uZCwgY29tcGFyZVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGtleXM7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBrZXlzID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTsgLy8gQWN0aW5nIGFzIGEgSGFzaFNldC5cbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZEVudW1lcmF0b3IgPT09IFZPSUQwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChmaXJzdEVudW1lcmF0b3IubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGZpcnN0RW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5hZGRCeUtleVZhbHVlKGN1cnJlbnQsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudW1lcmF0b3IgPSBlbnVtVXRpbC5mcm9tKHNlY29uZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlIChzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHNlY29uZEVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzLmNvbnRhaW5zS2V5KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzLmFkZEJ5S2V5VmFsdWUoY3VycmVudCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGluc2VydEF0KGluZGV4LCBvdGhlcikge1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgsICdpbmRleCcpO1xuICAgICAgICBjb25zdCBuID0gaW5kZXg7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBpc0VuZGxlc3MgPSBfLl9pc0VuZGxlc3M7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0RW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBzZWNvbmRFbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgIGxldCBpc0VudW1lcmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBmaXJzdEVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRFbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShvdGhlcik7XG4gICAgICAgICAgICAgICAgaXNFbnVtZXJhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzRW51bWVyYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oZmlyc3RFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIWlzRW51bWVyYXRlZFxuICAgICAgICAgICAgICAgICAgICAmJiBzZWNvbmRFbnVtZXJhdG9yLm1vdmVOZXh0KClcbiAgICAgICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybihzZWNvbmRFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZmlyc3RFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBhbHRlcm5hdGVNdWx0aXBsZShzZXF1ZW5jZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBidWZmZXIsIG1vZGUsIGVudW1lcmF0b3IsIGFsdGVybmF0ZUVudW1lcmF0b3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBJbnN0ZWFkIG9mIHJlY2FsbGluZyBnZXRFbnVtZXJhdG9yIGV2ZXJ5IHRpbWUsIGp1c3QgcmVzZXQgdGhlIGV4aXN0aW5nIG9uZS5cbiAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yID0gbmV3IEFycmF5RW51bWVyYXRvcihFbnVtZXJhYmxlLnRvQXJyYXkoc2VxdWVuY2UpKTsgLy8gRnJlZXplXG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGxldCBoYXNBdExlYXN0T25lID0gZW51bWVyYXRvci5tb3ZlTmV4dCgpO1xuICAgICAgICAgICAgICAgIG1vZGUgPSBoYXNBdExlYXN0T25lXG4gICAgICAgICAgICAgICAgICAgID8gMSAvKiBSZXR1cm4gKi9cbiAgICAgICAgICAgICAgICAgICAgOiAwIC8qIEJyZWFrICovO1xuICAgICAgICAgICAgICAgIGlmIChoYXNBdExlYXN0T25lKVxuICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDAgLyogQnJlYWsgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMiAvKiBTa2lwICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsdGVybmF0ZUVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihhbHRlcm5hdGVFbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRlRW51bWVyYXRvci5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDEgLyogUmV0dXJuICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBsYXRlc3QgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgLy8gU2V0IHVwIHRoZSBuZXh0IHJvdW5kLi4uXG4gICAgICAgICAgICAgICAgLy8gSXMgdGhlcmUgYW5vdGhlciBvbmU/ICBTZXQgdGhlIGJ1ZmZlciBhbmQgc2V0dXAgaW5zdHJ1Y3QgZm9yIHRoZSBuZXh0IG9uZSB0byBiZSB0aGUgYWx0ZXJuYXRlLlxuICAgICAgICAgICAgICAgIGxldCBhbm90aGVyID0gZW51bWVyYXRvci5tb3ZlTmV4dCgpO1xuICAgICAgICAgICAgICAgIG1vZGUgPSBhbm90aGVyXG4gICAgICAgICAgICAgICAgICAgID8gMiAvKiBTa2lwICovXG4gICAgICAgICAgICAgICAgICAgIDogMCAvKiBCcmVhayAqLztcbiAgICAgICAgICAgICAgICBpZiAoYW5vdGhlcilcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKGxhdGVzdCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChhbHRlcm5hdGVFbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICBhbHRlcm5hdGVFbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0sIGlzRW5kbGVzcyk7XG4gICAgICAgIH0sIG51bGwsIGlzRW5kbGVzcyk7XG4gICAgfVxuICAgIGFsdGVybmF0ZVNpbmdsZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbHRlcm5hdGVNdWx0aXBsZShFbnVtZXJhYmxlLm1ha2UodmFsdWUpKTtcbiAgICB9XG4gICAgYWx0ZXJuYXRlKC4uLnNlcXVlbmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsdGVybmF0ZU11bHRpcGxlKHNlcXVlbmNlKTtcbiAgICB9XG4gICAgLy8gI3JlZ2lvbiBFcnJvciBIYW5kbGluZ1xuICAgIGNhdGNoRXJyb3IoaGFuZGxlcikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgaW5pdC4uLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluYWxseUFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGVudW1lcmF0b3IubW92ZU5leHQoKSlcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGVudW1lcmF0b3IuY3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gTlVMTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIGJ1ZmZlcihzaXplKSB7XG4gICAgICAgIGlmIChzaXplIDwgMSB8fCAhaXNGaW5pdGUoc2l6ZSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJ1ZmZlciBzaXplLlwiKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnQoc2l6ZSwgXCJzaXplXCIpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzO1xuICAgICAgICBsZXQgbGVuO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBpbml0aWFsaXplKHNpemUpO1xuICAgICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGxlbiA8IHNpemUgJiYgZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5W2xlbisrXSA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJyYXkubGVuZ3RoID0gbGVuO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWxlbiAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKGFycmF5KTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgICAgICB9LCBudWxsLCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBzaGFyZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBzaGFyZWRFbnVtZXJhdG9yO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaGFyZWRFbnVtZXJhdG9yIHx8IChzaGFyZWRFbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCkpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hhcmVkRW51bWVyYXRvcilcbiAgICAgICAgICAgICAgICBzaGFyZWRFbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHNoYXJlZEVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICB9LCBfLl9pc0VuZGxlc3MpO1xuICAgIH1cbiAgICBtZW1vaXplKCkge1xuICAgICAgICBsZXQgc291cmNlID0gbmV3IExhenlMaXN0KHRoaXMpO1xuICAgICAgICByZXR1cm4gKG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHNvdXJjZS5nZXRFbnVtZXJhdG9yKCksICgpID0+IHtcbiAgICAgICAgICAgIHNvdXJjZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICBzb3VyY2UgPSBudWxsO1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuLyoqXG4gKiBFbnVtZXJhYmxlPFQ+IGlzIGEgd3JhcHBlciBjbGFzcyB0aGF0IGFsbG93cyBtb3JlIHByaW1pdGl2ZSBlbnVtZXJhYmxlcyB0byBleGhpYml0IExJTlEgYmVoYXZpb3IuXG4gKlxuICogSW4gQyMgRW51bWVyYWJsZTxUPiBpcyBub3QgYW4gaW5zdGFuY2UgYnV0IGhhcyBleHRlbnNpb25zIGZvciBJRW51bWVyYWJsZTxUPi5cbiAqIEluIHRoaXMgY2FzZSwgd2UgdXNlIEVudW1lcmFibGU8VD4gYXMgdGhlIHVuZGVybHlpbmcgY2xhc3MgdGhhdCBpcyBiZWluZyBjaGFpbmVkLlxuICovXG5leHBvcnQgY2xhc3MgTGlucUVudW1lcmFibGUgZXh0ZW5kcyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihlbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyLCBpc0VuZGxlc3MpIHtcbiAgICAgICAgc3VwZXIoZW51bWVyYXRvckZhY3RvcnksIGZpbmFsaXplcik7XG4gICAgICAgIHRoaXMuX2lzRW5kbGVzcyA9IGlzRW5kbGVzcztcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkxpbnFFbnVtZXJhYmxlXCI7XG4gICAgfVxuICAgIC8vIFJldHVybiBhIGRlZmF1bHQgKHVuZmlsdGVyZWQpIGVudW1lcmFibGUuXG4gICAgYXNFbnVtZXJhYmxlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBfLmdldEVudW1lcmF0b3IoKSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gSW5kZXhpbmcvUGFnaW5nIG1ldGhvZHMuXG4gICAgc2tpcFdoaWxlKHByZWRpY2F0ZSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleClcbiAgICAgICAgICAgID8gMiAvKiBTa2lwICovXG4gICAgICAgICAgICA6IDEgLyogUmV0dXJuICovKTtcbiAgICB9XG4gICAgdGFrZVdoaWxlKHByZWRpY2F0ZSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ3ByZWRpY2F0ZScpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbigoZWxlbWVudCwgaW5kZXgpID0+IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleClcbiAgICAgICAgICAgID8gMSAvKiBSZXR1cm4gKi9cbiAgICAgICAgICAgIDogMCAvKiBCcmVhayAqLywgbnVsbCwgbnVsbCAvLyBXZSBkb24ndCBrbm93IHRoZSBzdGF0ZSBpZiBpdCBpcyBlbmRsZXNzIG9yIG5vdC5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgLy8gSXMgbGlrZSB0aGUgaW52ZXJzZSBvZiB0YWtlIFdoaWxlIHdpdGggdGhlIGFiaWxpdHkgdG8gcmV0dXJuIHRoZSB2YWx1ZSBpZGVudGlmaWVkIGJ5IHRoZSBwcmVkaWNhdGUuXG4gICAgdGFrZVVudGlsKHByZWRpY2F0ZSwgaW5jbHVkZVVudGlsVmFsdWUpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdwcmVkaWNhdGUnKTtcbiAgICAgICAgaWYgKCFpbmNsdWRlVW50aWxWYWx1ZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKChlbGVtZW50LCBpbmRleCkgPT4gcHJlZGljYXRlKGVsZW1lbnQsIGluZGV4KVxuICAgICAgICAgICAgICAgID8gMCAvKiBCcmVhayAqL1xuICAgICAgICAgICAgICAgIDogMSAvKiBSZXR1cm4gKi8sIG51bGwsIG51bGwgLy8gV2UgZG9uJ3Qga25vdyB0aGUgc3RhdGUgaWYgaXQgaXMgZW5kbGVzcyBvciBub3QuXG4gICAgICAgICAgICApO1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoZm91bmQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAgLyogQnJlYWsgKi87XG4gICAgICAgICAgICBmb3VuZCA9IHByZWRpY2F0ZShlbGVtZW50LCBpbmRleCk7XG4gICAgICAgICAgICByZXR1cm4gMSAvKiBSZXR1cm4gKi87XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIH0sIG51bGwgLy8gV2UgZG9uJ3Qga25vdyB0aGUgc3RhdGUgaWYgaXQgaXMgZW5kbGVzcyBvciBub3QuXG4gICAgICAgICk7XG4gICAgfVxuICAgIHRyYXZlcnNlQnJlYWR0aEZpcnN0KGNoaWxkcmVuU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgaXNFbmRsZXNzID0gXy5faXNFbmRsZXNzOyAvLyBJcyBlbmRsZXNzIGlzIG5vdCBhZmZpcm1hdGl2ZSBpZiBmYWxzZS5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBuZXN0TGV2ZWwgPSAwO1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciwgbGVuO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgbmVzdExldmVsID0gMDtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltsZW4rK10gPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihyZXN1bHRTZWxlY3RvcihlbnVtZXJhdG9yLmN1cnJlbnQsIG5lc3RMZXZlbCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IEVudW1lcmFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mcm9tKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RNYW55KGNoaWxkcmVuU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHQuYW55KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lc3RMZXZlbCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gbmV4dC5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB9LCBpc0VuZGxlc3MpO1xuICAgIH1cbiAgICBmb3JFYWNoKGFjdGlvbiwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmICghYWN0aW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImFjdGlvblwiKTtcbiAgICAgICAgdGhyb3dJZkVuZGxlc3MoXy5pc0VuZGxlc3MpO1xuICAgICAgICAvKlxuICAgICAgICAvLyBJdCBjb3VsZCBiZSBqdXN0IGFzIGVhc3kgdG8gZG8gdGhlIGZvbGxvd2luZzpcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLmZvckVhY2goXywgYWN0aW9uLCBtYXgpO1xuICAgICAgICAvLyBCdXQgdG8gYmUgbW9yZSBhY3RpdmUgYWJvdXQgY2hlY2tpbmcgZm9yIGRpc3Bvc2FsLCB3ZSB1c2UgdGhpcyBpbnN0ZWFkOlxuICAgICAgICAqL1xuICAgICAgICAvLyBSZXR1cm4gdmFsdWUgb2YgYWN0aW9uIGNhbiBiZSBhbnl0aGluZywgYnV0IGlmIGl0IGlzICg9PT0pIGZhbHNlIHRoZW4gdGhlIGVudW1VdGlsLmZvckVhY2ggd2lsbCBkaXNjb250aW51ZS5cbiAgICAgICAgcmV0dXJuIG1heCA+IDAgPyB1c2luZyhfLmdldEVudW1lcmF0b3IoKSwgZSA9PiB7XG4gICAgICAgICAgICB0aHJvd0lmRW5kbGVzcyghaXNGaW5pdGUobWF4KSAmJiBlLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAvLyBJdCBpcyBwb3NzaWJsZSB0aGF0IHN1YnNlcXVlbnRseSAnYWN0aW9uJyBjb3VsZCBjYXVzZSB0aGUgZW51bWVyYXRpb24gdG8gZGlzcG9zZSwgc28gd2UgaGF2ZSB0byBjaGVjayBlYWNoIHRpbWUuXG4gICAgICAgICAgICB3aGlsZSAobWF4ID4gaSAmJiBfLnRocm93SWZEaXNwb3NlZCgpICYmIGUubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oZS5jdXJyZW50LCBpKyspID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfSkgOiAwO1xuICAgIH1cbiAgICAvLyAjcmVnaW9uIENvbnZlcnNpb24gTWV0aG9kc1xuICAgIHRvQXJyYXkocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVcbiAgICAgICAgICAgID8gdGhpcy53aGVyZShwcmVkaWNhdGUpLnRvQXJyYXkoKVxuICAgICAgICAgICAgOiB0aGlzLmNvcHlUbyhbXSk7XG4gICAgfVxuICAgIGNvcHlUbyh0YXJnZXQsIGluZGV4ID0gMCwgY291bnQgPSBJbmZpbml0eSkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXRhcmdldClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJ0YXJnZXRcIik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihpbmRleCk7XG4gICAgICAgIC8vIElmIG5vdCBleHBvc2luZyBhbiBhY3Rpb24gdGhhdCBjb3VsZCBjYXVzZSBkaXNwb3NlLCB0aGVuIHVzZSBlbnVtVXRpbC5mb3JFYWNoIHV0aWxpdHkgaW5zdGVhZC5cbiAgICAgICAgZW51bVV0aWwuZm9yRWFjaCh0aGlzLCAoeCwgaSkgPT4ge1xuICAgICAgICAgICAgdGFyZ2V0W2kgKyBpbmRleF0gPSB4O1xuICAgICAgICB9LCBjb3VudCk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIHRvTG9va3VwKGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHksIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBkaWN0ID0gbmV3IERpY3Rpb25hcnkoY29tcGFyZVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5ID0ga2V5U2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGVsZW1lbnRTZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgICAgIGxldCBhcnJheSA9IGRpY3QuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgICAgIGlmIChhcnJheSAhPT0gVk9JRDApXG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkaWN0LmFkZEJ5S2V5VmFsdWUoa2V5LCBbZWxlbWVudF0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBMb29rdXAoZGljdCk7XG4gICAgfVxuICAgIHRvTWFwKGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgb2JqW2tleVNlbGVjdG9yKHgsIGkpXSA9IGVsZW1lbnRTZWxlY3Rvcih4LCBpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHRvRGljdGlvbmFyeShrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBjb21wYXJlU2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgZGljdCA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4gZGljdC5hZGRCeUtleVZhbHVlKGtleVNlbGVjdG9yKHgsIGkpLCBlbGVtZW50U2VsZWN0b3IoeCwgaSkpKTtcbiAgICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgfVxuICAgIHRvSm9pbmVkU3RyaW5nKHNlcGFyYXRvciA9IFwiXCIsIHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICAuc2VsZWN0KHNlbGVjdG9yKVxuICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICAgICAgICAgLmpvaW4oc2VwYXJhdG9yKTtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIHRha2VFeGNlcHRMYXN0KGNvdW50ID0gMSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCEoY291bnQgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICBpZiAoIWlzRmluaXRlKGNvdW50KSlcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICBjb25zdCBjID0gY291bnQ7XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgcTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBxID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBuZXh0IG9uZSB0byB0aGUgcXVldWUuXG4gICAgICAgICAgICAgICAgICAgIHEuZW5xdWV1ZShlbnVtZXJhdG9yLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBEaWQgd2UgcmVhY2ggb3VyIHF1b3RhP1xuICAgICAgICAgICAgICAgICAgICBpZiAocS5jb3VudCA+IGMpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPa2F5IHRoZW4sIHN0YXJ0IHJldHVybmluZyByZXN1bHRzLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocS5kZXF1ZXVlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGlmIChxKVxuICAgICAgICAgICAgICAgICAgICBxLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBxID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2tpcFRvTGFzdChjb3VudCkge1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghaXNGaW5pdGUoY291bnQpKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICAvLyBUaGlzIHNldHMgdXAgdGhlIHF1ZXJ5IHNvIG5vdGhpbmcgaXMgZG9uZSB1bnRpbCBtb3ZlIG5leHQgaXMgY2FsbGVkLlxuICAgICAgICByZXR1cm4gXy5yZXZlcnNlKClcbiAgICAgICAgICAgIC50YWtlKGNvdW50KVxuICAgICAgICAgICAgLnJldmVyc2UoKTtcbiAgICB9XG4gICAgLy8gVG8gaGVscCB3aXRoIHR5cGUgZ3VhcmRpbmcuXG4gICAgc2VsZWN0KHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBtYXAoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNlbGVjdChzZWxlY3Rvcik7XG4gICAgfVxuICAgIHNlbGVjdE1hbnkoY29sbGVjdGlvblNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TWFueShjb2xsZWN0aW9uU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKTtcbiAgICB9XG4gICAgY2hvb3NlKHNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJTZWxlY3RlZChzZWxlY3RvciwgaXNOb3ROdWxsT3JVbmRlZmluZWQpO1xuICAgIH1cbiAgICByZXZlcnNlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGRpc3Bvc2VkID0gIV8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKF8uX2lzRW5kbGVzcyk7IC8vIENhbm5vdCByZXZlcnNlIGFuIGVuZGxlc3MgY29sbGVjdGlvbi4uLlxuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKTtcbiAgICAgICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF8udG9BcnJheSgpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiAhIWluZGV4ICYmIHlpZWxkZXIueWllbGRSZXR1cm4oYnVmZmVyWy0taW5kZXhdKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNodWZmbGUoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhyb3dJZkVuZGxlc3MoXy5faXNFbmRsZXNzKTsgLy8gQ2Fubm90IHNodWZmbGUgYW4gZW5kbGVzcyBjb2xsZWN0aW9uLi4uXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJ1ZmZlcjtcbiAgICAgICAgICAgIGxldCBjYXBhY2l0eTtcbiAgICAgICAgICAgIGxldCBsZW47XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF8udG9BcnJheSgpO1xuICAgICAgICAgICAgICAgIGNhcGFjaXR5ID0gbGVuID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQXZvaWQgdXNpbmcgbWFqb3IgYXJyYXkgb3BlcmF0aW9ucyBsaWtlIC5zbGljZSgpO1xuICAgICAgICAgICAgICAgIGlmICghbGVuKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSW5kZXggPSBSYW5kb20uaW50ZWdlcihsZW4pO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZFZhbHVlID0gYnVmZmVyW3NlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgICAgIGJ1ZmZlcltzZWxlY3RlZEluZGV4XSA9IGJ1ZmZlclstLWxlbl07IC8vIFRha2UgdGhlIGxhc3Qgb25lIGFuZCBwdXQgaXQgaGVyZS5cbiAgICAgICAgICAgICAgICBidWZmZXJbbGVuXSA9IE5VTEw7IC8vIGNsZWFyIHBvc3NpYmxlIHJlZmVyZW5jZS5cbiAgICAgICAgICAgICAgICBpZiAobGVuICUgMzIgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihzZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb3VudChwcmVkaWNhdGUpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5mb3JFYWNoKHByZWRpY2F0ZVxuICAgICAgICAgICAgPyAoeCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoeCwgaSkpXG4gICAgICAgICAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gICAgLy8gQWtpbiB0byAnLmV2ZXJ5JyBvbiBhbiBhcnJheS5cbiAgICBhbGwocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInByZWRpY2F0ZVwiKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFwcmVkaWNhdGUoeCwgaSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyAnZXZlcnknIGhhcyBiZWVuIGFkZGVkIGhlcmUgZm9yIHBhcml0eS9jb21wYXRpYmlsaXR5IHdpdGggYW4gYXJyYXkuXG4gICAgZXZlcnkocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbChwcmVkaWNhdGUpO1xuICAgIH1cbiAgICAvLyBBa2luIHRvICcuc29tZScgb24gYW4gYXJyYXkuXG4gICAgYW55KHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAoIXByZWRpY2F0ZSlcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5hbnkoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAvLyBTcGxpdHRpbmcgdGhlIGZvckVhY2ggdXAgdGhpcyB3YXkgcmVkdWNlcyBpdGVyYXRpdmUgcHJvY2Vzc2luZy5cbiAgICAgICAgLy8gZm9yRWFjaCBoYW5kbGVzIHRoZSBnZW5lcmF0aW9uIGFuZCBkaXNwb3NhbCBvZiB0aGUgZW51bWVyYXRvci5cbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICByZXN1bHQgPSBwcmVkaWNhdGUoeCwgaSk7IC8vIGZhbHNlID0gbm90IGZvdW5kIGFuZCB0aGVyZWZvcmUgaXQgc2hvdWxkIGNvbnRpbnVlLiAgdHJ1ZSA9IGZvdW5kIGFuZCBicmVhaztcbiAgICAgICAgICAgIHJldHVybiAhcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gJ3NvbWUnIGhhcyBiZWVuIGFkZGVkIGhlcmUgZm9yIHBhcml0eS9jb21wYXRpYmlsaXR5IHdpdGggYW4gYXJyYXkuXG4gICAgc29tZShwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW55KHByZWRpY2F0ZSk7XG4gICAgfVxuICAgIGNvbnRhaW5zKHZhbHVlLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgcyA9IGNvbXBhcmVTZWxlY3Rvcih2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbnkodiA9PiBhcmVFcXVhbFZhbHVlcyhjb21wYXJlU2VsZWN0b3IodiksIHMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hbnkodiA9PiBhcmVFcXVhbFZhbHVlcyh2LCB2YWx1ZSkpO1xuICAgIH1cbiAgICAvLyBPcmlnaW5hbGx5IGhhcyBhbiBvdmVybG9hZCBmb3IgYSBwcmVkaWNhdGUsXG4gICAgLy8gYnV0IHRoYXQncyBhIGJhZCBpZGVhIHNpbmNlIHRoaXMgY291bGQgYmUgYW4gZW51bWVyYXRpb24gb2YgZnVuY3Rpb25zIGFuZCB0aGVyZWZvcmUgZmFpbCB0aGUgaW50ZW50LlxuICAgIC8vIEJldHRlciB0byBjaGFpbiBhIHdoZXJlIHN0YXRlbWVudCBmaXJzdCB0byBiZSBtb3JlIGV4cGxpY2l0LlxuICAgIGluZGV4T2YodmFsdWUsIGNvbXBhcmVTZWxlY3Rvcikge1xuICAgICAgICBsZXQgZm91bmQgPSAtMTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGNvbXBhcmVTZWxlY3RvclxuICAgICAgICAgICAgPyAoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhjb21wYXJlU2VsZWN0b3IoZWxlbWVudCwgaSksIGNvbXBhcmVTZWxlY3Rvcih2YWx1ZSwgaSksIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBXaHk/ICBCZWNhdXNlIE5hTiBkb2Vzbid0IGVxdWFsIE5hTi4gOlBcbiAgICAgICAgICAgICAgICBpZiAoYXJlRXF1YWxWYWx1ZXMoZWxlbWVudCwgdmFsdWUsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIGxhc3RJbmRleE9mKHZhbHVlLCBjb21wYXJlU2VsZWN0b3IpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IC0xO1xuICAgICAgICB0aGlzLmZvckVhY2goY29tcGFyZVNlbGVjdG9yXG4gICAgICAgICAgICA/IChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGNvbXBhcmVTZWxlY3RvcihlbGVtZW50LCBpKSwgY29tcGFyZVNlbGVjdG9yKHZhbHVlLCBpKSwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiAoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhcmVFcXVhbFZhbHVlcyhlbGVtZW50LCB2YWx1ZSwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaW50ZXJzZWN0KHNlY29uZCwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXNlY29uZClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzZWNvbmRcIik7XG4gICAgICAgIGNvbnN0IGlzRW5kbGVzcyA9IF8uaXNFbmRsZXNzO1xuICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICAgICAgbGV0IGtleXM7XG4gICAgICAgICAgICBsZXQgb3V0cztcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghc2Vjb25kKTtcbiAgICAgICAgICAgICAgICBlbnVtZXJhdG9yID0gXy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgICAgICAgICAga2V5cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgb3V0cyA9IG5ldyBEaWN0aW9uYXJ5KGNvbXBhcmVTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZW51bVV0aWwuZm9yRWFjaChzZWNvbmQsIGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMuYWRkQnlLZXlWYWx1ZShrZXksIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW51bWVyYXRvci5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW91dHMuY29udGFpbnNLZXkoY3VycmVudCkgJiYga2V5cy5jb250YWluc0tleShjdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cy5hZGRCeUtleVZhbHVlKGN1cnJlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5cylcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKG91dHMpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGtleXMgPSBOVUxMO1xuICAgICAgICAgICAgICAgIG91dHMgPSBOVUxMO1xuICAgICAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgc2Vjb25kID0gTlVMTDtcbiAgICAgICAgfSwgaXNFbmRsZXNzKTtcbiAgICB9XG4gICAgc2VxdWVuY2VFcXVhbChzZWNvbmQsIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbFZhbHVlcykge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gdXNpbmcodGhpcy5nZXRFbnVtZXJhdG9yKCksIGUxID0+IHVzaW5nKGVudW1VdGlsLmZyb20oc2Vjb25kKSwgZTIgPT4ge1xuICAgICAgICAgICAgLy8gaWYgYm90aCBhcmUgZW5kbGVzcywgdGhpcyB3aWxsIG5ldmVyIGV2YWx1YXRlLlxuICAgICAgICAgICAgdGhyb3dJZkVuZGxlc3MoZTEuaXNFbmRsZXNzICYmIGUyLmlzRW5kbGVzcyk7XG4gICAgICAgICAgICB3aGlsZSAoZTEubW92ZU5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmICghZTIubW92ZU5leHQoKSB8fCAhZXF1YWxpdHlDb21wYXJlcihlMS5jdXJyZW50LCBlMi5jdXJyZW50KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICFlMi5tb3ZlTmV4dCgpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIG9mVHlwZSh0eXBlKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBzdXBlci5vZlR5cGUodHlwZSk7XG4gICAgfVxuICAgIC8vICNyZWdpb24gT3JkZXJpbmcgTWV0aG9kc1xuICAgIG9yZGVyQnkoa2V5U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLCBrZXlTZWxlY3RvciwgMSAvKiBBc2NlbmRpbmcgKi8pO1xuICAgIH1cbiAgICBvcmRlclVzaW5nKGNvbXBhcmlzb24pIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLCBudWxsLCAxIC8qIEFzY2VuZGluZyAqLywgbnVsbCwgY29tcGFyaXNvbik7XG4gICAgfVxuICAgIG9yZGVyVXNpbmdSZXZlcnNlZChjb21wYXJpc29uKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywgbnVsbCwgLTEgLyogRGVzY2VuZGluZyAqLywgbnVsbCwgY29tcGFyaXNvbik7XG4gICAgfVxuICAgIG9yZGVyQnlEZXNjZW5kaW5nKGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIHJldHVybiBuZXcgT3JkZXJlZEVudW1lcmFibGUodGhpcywga2V5U2VsZWN0b3IsIC0xIC8qIERlc2NlbmRpbmcgKi8pO1xuICAgIH1cbiAgICAvKlxuICAgICAgICAgd2VpZ2h0ZWRTYW1wbGUod2VpZ2h0U2VsZWN0b3IpIHtcbiAgICAgICAgIHdlaWdodFNlbGVjdG9yID0gVXRpbHMuY3JlYXRlTGFtYmRhKHdlaWdodFNlbGVjdG9yKTtcbiAgICAgICAgIHZhciBzb3VyY2UgPSB0aGlzO1xuICAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZTxUPigoKSA9PiB7XG4gICAgICAgICB2YXIgc29ydGVkQnlCb3VuZDtcbiAgICAgICAgIHZhciB0b3RhbFdlaWdodCA9IDA7XG4gICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlPFQ+KFxuICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgc29ydGVkQnlCb3VuZCA9IHNvdXJjZVxuICAgICAgICAgLmNob29zZShmdW5jdGlvbiAoeCkge1xuICAgICAgICAgdmFyIHdlaWdodCA9IHdlaWdodFNlbGVjdG9yKHgpO1xuICAgICAgICAgaWYgKHdlaWdodCA8PSAwKSByZXR1cm4gbnVsbDsgLy8gaWdub3JlIDBcbiAgICAgICAgIHRvdGFsV2VpZ2h0ICs9IHdlaWdodDtcbiAgICAgICAgIHJldHVybiB7IHZhbHVlOiB4LCBib3VuZDogdG90YWxXZWlnaHQgfVxuICAgICAgICAgfSlcbiAgICAgICAgIC50b0FycmF5KCk7XG4gICAgICAgICB9LFxuICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgaWYgKHNvcnRlZEJ5Qm91bmQubGVuZ3RoID4gMCkge1xuICAgICAgICAgdmFyIGRyYXcgPSAoTWF0aC5yYW5kb20oKSAqIHRvdGFsV2VpZ2h0KSArIDE7XG4gICAgICAgICB2YXIgbG93ZXIgPSAtMTtcbiAgICAgICAgIHZhciB1cHBlciA9IHNvcnRlZEJ5Qm91bmQubGVuZ3RoO1xuICAgICAgICAgd2hpbGUgKHVwcGVyIC0gbG93ZXIgPiAxKSB7XG4gICAgICAgICB2YXIgaW5kZXggPSAoKGxvd2VyICsgdXBwZXIpIC8gMik7XG4gICAgICAgICBpZiAoc29ydGVkQnlCb3VuZFtpbmRleF0uYm91bmQgPj0gZHJhdykge1xuICAgICAgICAgdXBwZXIgPSBpbmRleDtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2Uge1xuICAgICAgICAgbG93ZXIgPSBpbmRleDtcbiAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICAgIHJldHVybiAoPGFueT50aGlzKS55aWVsZFJldHVybihzb3J0ZWRCeUJvdW5kW3VwcGVyXS52YWx1ZSk7XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykueWllbGRCcmVhaygpO1xuICAgICAgICAgfSxcbiAgICAgICAgIEZ1bmN0aW9ucy5CbGFuayk7XG4gICAgICAgICB9KTtcbiAgICAgICAgIH1cbiAgICAgICAgICovXG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIGJ1ZmZlcihzaXplKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5idWZmZXIoc2l6ZSk7XG4gICAgfVxuICAgIGdyb3VwQnkoa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciwgY29tcGFyZVNlbGVjdG9yKSB7XG4gICAgICAgIGlmICghZWxlbWVudFNlbGVjdG9yKVxuICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5OyAvLyBBbGxvdyBmb3IgJ251bGwnIGFuZCBub3QganVzdCB1bmRlZmluZWQuXG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gdGhpc1xuICAgICAgICAgICAgLnRvTG9va3VwKGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGNvbXBhcmVTZWxlY3RvcilcbiAgICAgICAgICAgIC5nZXRFbnVtZXJhdG9yKCkpO1xuICAgIH1cbiAgICBwYXJ0aXRpb25CeShrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciA9IChrZXksIGVsZW1lbnRzKSA9PiBuZXcgR3JvdXBpbmcoa2V5LCBlbGVtZW50cyksIGNvbXBhcmVTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKCFlbGVtZW50U2VsZWN0b3IpXG4gICAgICAgICAgICBlbGVtZW50U2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHk7IC8vIEFsbG93IGZvciAnbnVsbCcgYW5kIG5vdCBqdXN0IHVuZGVmaW5lZC5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW51bWVyYXRvcjtcbiAgICAgICAgICAgIGxldCBrZXk7XG4gICAgICAgICAgICBsZXQgY29tcGFyZUtleTtcbiAgICAgICAgICAgIGxldCBncm91cDtcbiAgICAgICAgICAgIGxldCBsZW47XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWVsZW1lbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZW51bWVyYXRvciA9IF8uZ2V0RW51bWVyYXRvcigpO1xuICAgICAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleVNlbGVjdG9yKHYpO1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJlS2V5ID0gY29tcGFyZVNlbGVjdG9yKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gW2VsZW1lbnRTZWxlY3Rvcih2KV07XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWVsZW1lbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgaWYgKCFncm91cClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgICAgIGxldCBoYXNOZXh0LCBjO1xuICAgICAgICAgICAgICAgIHdoaWxlICgoaGFzTmV4dCA9IGVudW1lcmF0b3IubW92ZU5leHQoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYyA9IGVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZUVxdWFsVmFsdWVzKGNvbXBhcmVLZXksIGNvbXBhcmVTZWxlY3RvcihrZXlTZWxlY3RvcihjKSkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBbbGVuKytdID0gZWxlbWVudFNlbGVjdG9yKGMpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHJlc3VsdFNlbGVjdG9yKGtleSwgZ3JvdXApO1xuICAgICAgICAgICAgICAgIGlmIChoYXNOZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSBlbnVtZXJhdG9yLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleVNlbGVjdG9yKGMpO1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJlS2V5ID0gY29tcGFyZVNlbGVjdG9yKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gW2VsZW1lbnRTZWxlY3RvcihjKV07XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudW1lcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IgPSBOVUxMO1xuICAgICAgICAgICAgICAgIGdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50U2VsZWN0b3IgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmxhdHRlbigpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmZsYXR0ZW4oKTtcbiAgICB9XG4gICAgcGFpcndpc2Uoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnBhaXJ3aXNlKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgYWdncmVnYXRlKHJlZHVjdGlvbiwgaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIGlmIChpbml0aWFsVmFsdWUgPT0gVk9JRDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSBpXG4gICAgICAgICAgICAgICAgICAgID8gcmVkdWN0aW9uKGluaXRpYWxWYWx1ZSwgdmFsdWUsIGkpXG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSByZWR1Y3Rpb24oaW5pdGlhbFZhbHVlLCB2YWx1ZSwgaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5pdGlhbFZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm92aWRlZCBhcyBhbiBhbmFsb2cgZm9yIGFycmF5LnJlZHVjZS4gIFNpbXBseSBhIHNob3J0Y3V0IGZvciBhZ2dyZWdhdGUuXG4gICAgICogQHBhcmFtIHJlZHVjdGlvblxuICAgICAqIEBwYXJhbSBpbml0aWFsVmFsdWVcbiAgICAgKi9cbiAgICByZWR1Y2UocmVkdWN0aW9uLCBpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKHJlZHVjdGlvbiwgaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgYXZlcmFnZShzZWxlY3RvciA9IFR5cGUubnVtYmVyT3JOYU4pIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgc3VtID0gdGhpcy5zdW0oKGUsIGkpID0+IHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoZSwgaSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKGlzTmFOKHN1bSkgfHwgIWNvdW50KVxuICAgICAgICAgICAgPyBOYU5cbiAgICAgICAgICAgIDogKHN1bSAvIGNvdW50KTtcbiAgICB9XG4gICAgLy8gSWYgdXNpbmcgbnVtYmVycywgaXQgbWF5IGJlIHVzZWZ1bCB0byBjYWxsIC50YWtlVW50aWwodj0+dj09SW5maW5pdHksdHJ1ZSkgYmVmb3JlIGNhbGxpbmcgbWF4LiBTZWUgc3RhdGljIHZlcnNpb25zIGZvciBudW1iZXJzLlxuICAgIG1heCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlKEZ1bmN0aW9ucy5HcmVhdGVyKTtcbiAgICB9XG4gICAgbWluKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUoRnVuY3Rpb25zLkxlc3Nlcik7XG4gICAgfVxuICAgIG1heEJ5KGtleVNlbGVjdG9yID0gRnVuY3Rpb25zLklkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZSgoYSwgYikgPT4gKGtleVNlbGVjdG9yKGEpID4ga2V5U2VsZWN0b3IoYikpID8gYSA6IGIpO1xuICAgIH1cbiAgICBtaW5CeShrZXlTZWxlY3RvciA9IEZ1bmN0aW9ucy5JZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGUoKGEsIGIpID0+IChrZXlTZWxlY3RvcihhKSA8IGtleVNlbGVjdG9yKGIpKSA/IGEgOiBiKTtcbiAgICB9XG4gICAgLy8gQWRkaXRpb24uLi4gIE9ubHkgd29ya3Mgd2l0aCBudW1lcmljYWwgZW51bWVyYXRpb25zLlxuICAgIHN1bShzZWxlY3RvciA9IFR5cGUubnVtYmVyT3JOYU4pIHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIGZvciBpbmZpbml0eSBtYXRoIHRoYXQgZG9lc24ndCBkZXN0cm95IHRoZSBvdGhlciB2YWx1ZXMuXG4gICAgICAgIGxldCBzdW1JbmZpbml0ZSA9IDA7IC8vIE5lZWRzIG1vcmUgaW52ZXN0aWdhdGlvbiBzaW5jZSB3ZSBhcmUgcmVhbGx5IHRyeWluZyB0byByZXRhaW4gc2lnbnMuXG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgc3VtID0gTmFOO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0Zpbml0ZSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgc3VtICs9IHZhbHVlO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN1bUluZmluaXRlICs9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID4gMCA/ICgrMSkgOiAoLTEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGlzTmFOKHN1bSkgPyBOYU4gOiAoc3VtSW5maW5pdGUgPyAoc3VtSW5maW5pdGUgKiBJbmZpbml0eSkgOiBzdW0pO1xuICAgIH1cbiAgICAvLyBNdWx0aXBsaWNhdGlvbi4uLlxuICAgIHByb2R1Y3Qoc2VsZWN0b3IgPSBUeXBlLm51bWJlck9yTmFOKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAxLCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICBleGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gTmFOO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMDsgLy8gTXVsdGlwbHlpbmcgYnkgemVybyB3aWxsIGFsd2F5cyBlbmQgaW4gemVyby5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNdWx0aXBsaWNhdGlvbiBjYW4gbmV2ZXIgcmVjb3ZlciBmcm9tIGluZmluaXR5IGFuZCBzaW1wbHkgbXVzdCByZXRhaW4gc2lnbnMuXG4gICAgICAgICAgICAvLyBZb3UgY291bGQgY2FuY2VsIG91dCBpbmZpbml0eSB3aXRoIDEvaW5maW5pdHkgYnV0IG5vIGF2YWlsYWJsZSByZXByZXNlbnRhdGlvbiBleGlzdHMuXG4gICAgICAgICAgICByZXN1bHQgKj0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKGV4aXN0cyAmJiBpc05hTihyZXN1bHQpKSA/IE5hTiA6IHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGFrZXMgdGhlIGZpcnN0IG51bWJlciBhbmQgZGl2aWRlcyBpdCBieSBhbGwgZm9sbG93aW5nLlxuICAgICAqIEBwYXJhbSBzZWxlY3RvclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgcXVvdGllbnQoc2VsZWN0b3IgPSBUeXBlLm51bWJlck9yTmFOKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGxldCByZXN1bHQgPSBOYU47XG4gICAgICAgIHRoaXMuZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0b3IoeCwgaSk7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSAwIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTmFOO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCAvPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjb3VudCA9PT0gMSlcbiAgICAgICAgICAgIHJlc3VsdCA9IE5hTjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIC8vICNyZWdpb24gU2luZ2xlIFZhbHVlIFJldHVybi4uLlxuICAgIGxhc3QoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmFsdWUgPSBWT0lEMDtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIF8uZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbHVlID0geDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZm91bmQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJsYXN0Ok5vIGVsZW1lbnQgc2F0aXNmaWVzIHRoZSBjb25kaXRpb24uXCIpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGxhc3RPckRlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBsZXQgdmFsdWUgPSBWT0lEMDtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIF8uZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbHVlID0geDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoIWZvdW5kKSA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgbWVtb2l6ZSgpIHtcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBMYXp5TGlzdCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIChuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gc291cmNlLmdldEVudW1lcmF0b3IoKSwgKCkgPT4ge1xuICAgICAgICAgICAgc291cmNlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHNvdXJjZSA9IG51bGw7XG4gICAgICAgIH0sIHRoaXMuaXNFbmRsZXNzKSk7XG4gICAgfVxuICAgIHRocm93V2hlbkVtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbihSRVRVUk4sIG51bGwsIHRoaXMuaXNFbmRsZXNzLCBjb3VudCA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvdW50KVxuICAgICAgICAgICAgICAgIHRocm93IFwiQ29sbGVjdGlvbiBpcyBlbXB0eS5cIjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8gUHJvdmlkZWQgZm9yIHR5cGUgZ3VhcmRpbmcuXG5leHBvcnQgY2xhc3MgRmluaXRlRW51bWVyYWJsZSBleHRlbmRzIExpbnFFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihlbnVtZXJhdG9yRmFjdG9yeSwgZmluYWxpemVyKSB7XG4gICAgICAgIHN1cGVyKGVudW1lcmF0b3JGYWN0b3J5LCBmaW5hbGl6ZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIkZpbml0ZUVudW1lcmFibGVcIjtcbiAgICB9XG59XG5jbGFzcyBBcnJheUVudW1lcmFibGUgZXh0ZW5kcyBGaW5pdGVFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXlFbnVtZXJhdG9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZChcIlRoZSB1bmRlcmx5aW5nIEFycmF5RW51bWVyYWJsZSB3YXMgZGlzcG9zZWQuXCIsIFwiQXJyYXlFbnVtZXJhdG9yXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLl9zb3VyY2U7IC8vIFNob3VsZCBuZXZlciBiZSBudWxsLCBidXQgQXJyYXlFbnVtZXJhYmxlIGlmIG5vdCBkaXNwb3NlZCBzaW1wbHkgdHJlYXRzIG51bGwgYXMgZW1wdHkgYXJyYXkuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IFwiQXJyYXlFbnVtZXJhYmxlXCI7XG4gICAgICAgIF8uX3NvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgc3VwZXIuX29uRGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9zb3VyY2UgPSBOVUxMO1xuICAgIH1cbiAgICBnZXQgc291cmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlO1xuICAgIH1cbiAgICB0b0FycmF5KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIGVudW1VdGlsLnRvQXJyYXkoXy5fc291cmNlKTtcbiAgICB9XG4gICAgYXNFbnVtZXJhYmxlKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUVudW1lcmFibGUodGhpcy5fc291cmNlKTtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24sIG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gZW51bVV0aWwuZm9yRWFjaChfLl9zb3VyY2UsIGFjdGlvbiwgbWF4KTtcbiAgICB9XG4gICAgLy8gVGhlc2UgbWV0aG9kcyBzaG91bGQgQUxXQVlTIGNoZWNrIGZvciBhcnJheSBsZW5ndGggYmVmb3JlIGF0dGVtcHRpbmcgYW55dGhpbmcuXG4gICAgYW55KHByZWRpY2F0ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlO1xuICAgICAgICBsZXQgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuICEhbGVuICYmICghcHJlZGljYXRlIHx8IHN1cGVyLmFueShwcmVkaWNhdGUpKTtcbiAgICB9XG4gICAgY291bnQocHJlZGljYXRlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBfLl9zb3VyY2UsIGxlbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBsZW4gJiYgKHByZWRpY2F0ZSA/IHN1cGVyLmNvdW50KHByZWRpY2F0ZSkgOiBsZW4pO1xuICAgIH1cbiAgICBlbGVtZW50QXRPckRlZmF1bHQoaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgSW50ZWdlci5hc3NlcnRaZXJvT3JHcmVhdGVyKGluZGV4LCAnaW5kZXgnKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlO1xuICAgICAgICByZXR1cm4gaW5kZXggPCBzb3VyY2UubGVuZ3RoXG4gICAgICAgICAgICA/IHNvdXJjZVtpbmRleF1cbiAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgICBsYXN0KCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gXy5fc291cmNlLCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICByZXR1cm4gKGxlbilcbiAgICAgICAgICAgID8gc291cmNlW2xlbiAtIDFdXG4gICAgICAgICAgICA6IHN1cGVyLmxhc3QoKTtcbiAgICB9XG4gICAgbGFzdE9yRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IF8uX3NvdXJjZSwgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgICAgICAgPyBzb3VyY2VbbGVuIC0gMV1cbiAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgICBza2lwKGNvdW50KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIF87XG4gICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gbmV3IEFycmF5RW51bWVyYXRvcigoKSA9PiBfLl9zb3VyY2UsIGNvdW50KSk7XG4gICAgfVxuICAgIHRha2VFeGNlcHRMYXN0KGNvdW50ID0gMSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIF8udGFrZShfLl9zb3VyY2UubGVuZ3RoIC0gY291bnQpO1xuICAgIH1cbiAgICBza2lwVG9MYXN0KGNvdW50KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShjb3VudCkpXG4gICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgY29uc3QgbGVuID0gXy5fc291cmNlXG4gICAgICAgICAgICA/IF8uX3NvdXJjZS5sZW5ndGhcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgcmV0dXJuIF8uc2tpcChsZW4gLSBjb3VudCk7XG4gICAgfVxuICAgIHJldmVyc2UoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSAhXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmRleEVudW1lcmF0b3IoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzID0gXy5fc291cmNlO1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCB8fCAhcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBzLFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiAocy5sZW5ndGggLSAxKSxcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogLTFcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1lbW9pemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzRW51bWVyYWJsZSgpO1xuICAgIH1cbiAgICBzZXF1ZW5jZUVxdWFsKHNlY29uZCwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsVmFsdWVzKSB7XG4gICAgICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKHNlY29uZCkpXG4gICAgICAgICAgICByZXR1cm4gQXJyYXlzLmFyZUVxdWFsKHRoaXMuc291cmNlLCBzZWNvbmQsIHRydWUsIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgICAgICBpZiAoc2Vjb25kIGluc3RhbmNlb2YgQXJyYXlFbnVtZXJhYmxlKVxuICAgICAgICAgICAgcmV0dXJuIHNlY29uZC5zZXF1ZW5jZUVxdWFsKHRoaXMuc291cmNlLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNlcXVlbmNlRXF1YWwoc2Vjb25kLCBlcXVhbGl0eUNvbXBhcmVyKTtcbiAgICB9XG4gICAgdG9Kb2luZWRTdHJpbmcoc2VwYXJhdG9yID0gXCJcIiwgc2VsZWN0b3IgPSBGdW5jdGlvbnMuSWRlbnRpdHkpIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuX3NvdXJjZTtcbiAgICAgICAgcmV0dXJuICFzZWxlY3RvciAmJiAocykgaW5zdGFuY2VvZiAoQXJyYXkpXG4gICAgICAgICAgICA/IHMuam9pbihzZXBhcmF0b3IpXG4gICAgICAgICAgICA6IHN1cGVyLnRvSm9pbmVkU3RyaW5nKHNlcGFyYXRvciwgc2VsZWN0b3IpO1xuICAgIH1cbn1cbmNsYXNzIEdyb3VwaW5nIGV4dGVuZHMgQXJyYXlFbnVtZXJhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihfZ3JvdXBLZXksIGVsZW1lbnRzKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRzKTtcbiAgICAgICAgdGhpcy5fZ3JvdXBLZXkgPSBfZ3JvdXBLZXk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVPYmplY3ROYW1lID0gXCJHcm91cGluZ1wiO1xuICAgIH1cbiAgICBnZXQga2V5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3JvdXBLZXk7XG4gICAgfVxufVxuY2xhc3MgTG9va3VwIHtcbiAgICBjb25zdHJ1Y3RvcihfZGljdGlvbmFyeSkge1xuICAgICAgICB0aGlzLl9kaWN0aW9uYXJ5ID0gX2RpY3Rpb25hcnk7XG4gICAgfVxuICAgIGdldCBjb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpY3Rpb25hcnkuY291bnQ7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpY3Rpb25hcnkuZ2V0VmFsdWUoa2V5KSB8fCBudWxsO1xuICAgIH1cbiAgICBjb250YWlucyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpY3Rpb25hcnkuY29udGFpbnNLZXkoa2V5KTtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBlbnVtZXJhdG9yO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIGVudW1lcmF0b3IgPSBfLl9kaWN0aW9uYXJ5LmdldEVudW1lcmF0b3IoKTtcbiAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgIGlmICghZW51bWVyYXRvci5tb3ZlTmV4dCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gZW51bWVyYXRvci5jdXJyZW50O1xuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4obmV3IEdyb3VwaW5nKGN1cnJlbnQua2V5LCBjdXJyZW50LnZhbHVlKSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChlbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgIGVudW1lcmF0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgZW51bWVyYXRvciA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmNsYXNzIE9yZGVyZWRFbnVtZXJhYmxlIGV4dGVuZHMgRmluaXRlRW51bWVyYWJsZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlLCBrZXlTZWxlY3Rvciwgb3JkZXIsIHBhcmVudCwgY29tcGFyZXIgPSBjb21wYXJlVmFsdWVzKSB7XG4gICAgICAgIHN1cGVyKE5VTEwpO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgdGhpcy5rZXlTZWxlY3RvciA9IGtleVNlbGVjdG9yO1xuICAgICAgICB0aGlzLm9yZGVyID0gb3JkZXI7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLmNvbXBhcmVyID0gY29tcGFyZXI7XG4gICAgICAgIHRocm93SWZFbmRsZXNzKHNvdXJjZSAmJiBzb3VyY2UuaXNFbmRsZXNzKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZU9iamVjdE5hbWUgPSBcIk9yZGVyZWRFbnVtZXJhYmxlXCI7XG4gICAgfVxuICAgIGNyZWF0ZU9yZGVyZWRFbnVtZXJhYmxlKGtleVNlbGVjdG9yLCBvcmRlcikge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMuc291cmNlLCBrZXlTZWxlY3Rvciwgb3JkZXIsIHRoaXMpO1xuICAgIH1cbiAgICB0aGVuQnkoa2V5U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlT3JkZXJlZEVudW1lcmFibGUoa2V5U2VsZWN0b3IsIDEgLyogQXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgdGhlblVzaW5nKGNvbXBhcmlzb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPcmRlcmVkRW51bWVyYWJsZSh0aGlzLnNvdXJjZSwgbnVsbCwgMSAvKiBBc2NlbmRpbmcgKi8sIHRoaXMsIGNvbXBhcmlzb24pO1xuICAgIH1cbiAgICB0aGVuQnlEZXNjZW5kaW5nKGtleVNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU9yZGVyZWRFbnVtZXJhYmxlKGtleVNlbGVjdG9yLCAtMSAvKiBEZXNjZW5kaW5nICovKTtcbiAgICB9XG4gICAgdGhlblVzaW5nUmV2ZXJzZWQoY29tcGFyaXNvbikge1xuICAgICAgICByZXR1cm4gbmV3IE9yZGVyZWRFbnVtZXJhYmxlKHRoaXMuc291cmNlLCBudWxsLCAtMSAvKiBEZXNjZW5kaW5nICovLCB0aGlzLCBjb21wYXJpc29uKTtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgIGxldCBpbmRleGVzO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICBidWZmZXIgPSBFbnVtZXJhYmxlLnRvQXJyYXkoXy5zb3VyY2UpO1xuICAgICAgICAgICAgaW5kZXhlcyA9IGNyZWF0ZVNvcnRDb250ZXh0KF8pXG4gICAgICAgICAgICAgICAgLmdlbmVyYXRlU29ydGVkSW5kZXhlcyhidWZmZXIpO1xuICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHJldHVybiAoaW5kZXggPCBpbmRleGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICA/IHlpZWxkZXIueWllbGRSZXR1cm4oYnVmZmVyW2luZGV4ZXNbaW5kZXgrK11dKVxuICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGlmIChidWZmZXIpXG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBidWZmZXIgPSBOVUxMO1xuICAgICAgICAgICAgaWYgKGluZGV4ZXMpXG4gICAgICAgICAgICAgICAgaW5kZXhlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgaW5kZXhlcyA9IE5VTEw7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG4gICAgX29uRGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHN1cGVyLl9vbkRpc3Bvc2UoKTtcbiAgICAgICAgXy5zb3VyY2UgPSBOVUxMO1xuICAgICAgICBfLmtleVNlbGVjdG9yID0gTlVMTDtcbiAgICAgICAgXy5vcmRlciA9IE5VTEw7XG4gICAgICAgIF8ucGFyZW50ID0gTlVMTDtcbiAgICB9XG59XG4vLyBBIHByaXZhdGUgc3RhdGljIGhlbHBlciBmb3IgdGhlIHdlYXZlIGZ1bmN0aW9uLlxuZnVuY3Rpb24gbmV4dEVudW1lcmF0b3IocXVldWUsIGUpIHtcbiAgICBpZiAoZSkge1xuICAgICAgICBpZiAoZS5tb3ZlTmV4dCgpKSB7XG4gICAgICAgICAgICBxdWV1ZS5lbnF1ZXVlKGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGUpXG4gICAgICAgICAgICAgICAgZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZTtcbn1cbi8qKlxuICogUmVjdXJzaXZlbHkgYnVpbGRzIGEgU29ydENvbnRleHQgY2hhaW4uXG4gKiBAcGFyYW0gb3JkZXJlZEVudW1lcmFibGVcbiAqIEBwYXJhbSBjdXJyZW50Q29udGV4dFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU29ydENvbnRleHQob3JkZXJlZEVudW1lcmFibGUsIGN1cnJlbnRDb250ZXh0ID0gbnVsbCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgS2V5U29ydGVkQ29udGV4dChjdXJyZW50Q29udGV4dCwgb3JkZXJlZEVudW1lcmFibGUua2V5U2VsZWN0b3IsIG9yZGVyZWRFbnVtZXJhYmxlLm9yZGVyLCBvcmRlcmVkRW51bWVyYWJsZS5jb21wYXJlcik7XG4gICAgaWYgKG9yZGVyZWRFbnVtZXJhYmxlLnBhcmVudClcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVNvcnRDb250ZXh0KG9yZGVyZWRFbnVtZXJhYmxlLnBhcmVudCwgY29udGV4dCk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG4vL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZnVuY3Rpb24gdGhyb3dJZkRpc3Bvc2VkKGRpc3Bvc2VkKSB7XG4gICAgaWYgKGRpc3Bvc2VkKVxuICAgICAgICB0aHJvdyBuZXcgT2JqZWN0RGlzcG9zZWRFeGNlcHRpb24oXCJFbnVtZXJhYmxlXCIpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIEVudW1lcmFibGUoc291cmNlLCAuLi5hZGRpdGlvbmFsKSB7XG4gICAgcmV0dXJuIGVudW1lcmFibGVGcm9tKHNvdXJjZSwgYWRkaXRpb25hbCk7XG59XG5mdW5jdGlvbiBlbnVtZXJhYmxlRnJvbShzb3VyY2UsIGFkZGl0aW9uYWwpIHtcbiAgICBsZXQgZSA9IEVudW1lcmFibGUuZnJvbUFueShzb3VyY2UpO1xuICAgIGlmICghZSlcbiAgICAgICAgdGhyb3cgbmV3IFVuc3VwcG9ydGVkRW51bWVyYWJsZUV4Y2VwdGlvbigpO1xuICAgIHJldHVybiAoYWRkaXRpb25hbCAmJiBhZGRpdGlvbmFsLmxlbmd0aClcbiAgICAgICAgPyBlLm1lcmdlKGFkZGl0aW9uYWwpXG4gICAgICAgIDogZTtcbn1cbihmdW5jdGlvbiAoRW51bWVyYWJsZSkge1xuICAgIGZ1bmN0aW9uIGZyb20oc291cmNlLCAuLi5hZGRpdGlvbmFsKSB7XG4gICAgICAgIHJldHVybiBlbnVtZXJhYmxlRnJvbShzb3VyY2UsIGFkZGl0aW9uYWwpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZyb20gPSBmcm9tO1xuICAgIGZ1bmN0aW9uIGZyb21Bbnkoc291cmNlLCBkZWZhdWx0RW51bWVyYWJsZSkge1xuICAgICAgICBpZiAoVHlwZS5pc09iamVjdChzb3VyY2UpIHx8IFR5cGUuaXNTdHJpbmcoc291cmNlKSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEluZmluaXRlTGlucUVudW1lcmFibGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKHNvdXJjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheUVudW1lcmFibGUoc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpc0VudW1lcmFibGUoc291cmNlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IExpbnFFbnVtZXJhYmxlKCgpID0+IHNvdXJjZS5nZXRFbnVtZXJhdG9yKCksIG51bGwsIHNvdXJjZS5pc0VuZGxlc3MpO1xuICAgICAgICAgICAgaWYgKGlzRW51bWVyYXRvcihzb3VyY2UpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTGlucUVudW1lcmFibGUoKCkgPT4gc291cmNlLCBudWxsLCBzb3VyY2UuaXNFbmRsZXNzKTtcbiAgICAgICAgICAgIGlmIChpc0l0ZXJhdG9yKHNvdXJjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb21BbnkobmV3IEl0ZXJhdG9yRW51bWVyYXRvcihzb3VyY2UpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChUeXBlLmlzRnVuY3Rpb24oc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBJbmZpbml0ZUVudW1lcmF0b3Ioc291cmNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRFbnVtZXJhYmxlO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmZyb21BbnkgPSBmcm9tQW55O1xuICAgIGZ1bmN0aW9uIGZyb21UaGVzZShzb3VyY2VzKSB7XG4gICAgICAgIHN3aXRjaCAoc291cmNlcyA/IHNvdXJjZXMubGVuZ3RoIDogMCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eSgpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIEFsbG93IGZvciB2YWxpZGF0aW9uIGFuZCB0aHJvd2luZy4uLlxuICAgICAgICAgICAgICAgIHJldHVybiBlbnVtZXJhYmxlRnJvbShzb3VyY2VzWzBdKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5KCkubWVyZ2Uoc291cmNlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgRW51bWVyYWJsZS5mcm9tVGhlc2UgPSBmcm9tVGhlc2U7XG4gICAgZnVuY3Rpb24gZnJvbU9yRW1wdHkoc291cmNlKSB7XG4gICAgICAgIHJldHVybiBmcm9tQW55KHNvdXJjZSkgfHwgZW1wdHkoKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5mcm9tT3JFbXB0eSA9IGZyb21PckVtcHR5O1xuICAgIC8qKlxuICAgICAqIFN0YXRpYyBoZWxwZXIgZm9yIGNvbnZlcnRpbmcgZW51bWVyYWJsZXMgdG8gYW4gYXJyYXkuXG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9BcnJheShzb3VyY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIExpbnFFbnVtZXJhYmxlKVxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS50b0FycmF5KCk7XG4gICAgICAgIHJldHVybiBlbnVtVXRpbC50b0FycmF5KHNvdXJjZSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUudG9BcnJheSA9IHRvQXJyYXk7XG4gICAgZnVuY3Rpb24gX2Nob2ljZSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IG5ldyBFbnVtZXJhdG9yQmFzZShudWxsLCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCF2YWx1ZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oUmFuZG9tLnNlbGVjdC5vbmUodmFsdWVzKSk7XG4gICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgKSwgKCkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB2YWx1ZXMgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5fY2hvaWNlID0gX2Nob2ljZTtcbiAgICBmdW5jdGlvbiBjaG9pY2UodmFsdWVzKSB7XG4gICAgICAgIGxldCBsZW4gPSB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWxlbiB8fCAhaXNGaW5pdGUobGVuKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2xlbmd0aCcsIGxlbmd0aCk7XG4gICAgICAgIHJldHVybiBfY2hvaWNlKGNvcHkodmFsdWVzKSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUuY2hvaWNlID0gY2hvaWNlO1xuICAgIGZ1bmN0aW9uIGNob29zZUZyb20oLi4uYXJncykge1xuICAgICAgICAvLyBXZSBjb3VsZCByZXR1cm4gZW1wdHkgaWYgbm8gbGVuZ3RoLCBidXQgdGhhdCB3b3VsZCBicmVhayB0aGUgdHlwaW5nIGFuZCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAgICAgICAgLy8gRW5mb3JjaW5nIHRoYXQgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAxIGNob2ljZSBpcyBrZXkuXG4gICAgICAgIGlmICghYXJncy5sZW5ndGgpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdsZW5ndGgnLCBsZW5ndGgpO1xuICAgICAgICByZXR1cm4gX2Nob2ljZShhcmdzKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5jaG9vc2VGcm9tID0gY2hvb3NlRnJvbTtcbiAgICBmdW5jdGlvbiBfY3ljbGUodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfSwgLy8gUmVpbml0aWFsaXplIHRoZSB2YWx1ZSBqdXN0IGluIGNhc2UgdGhlIGVudW1lcmF0b3IgaXMgcmVzdGFydGVkLlxuICAgICAgICAgICAgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIXZhbHVlcyk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IHZhbHVlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybih2YWx1ZXNbaW5kZXgrK10pO1xuICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB2YWx1ZXMgPSBOVUxMO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3ljbGUodmFsdWVzKSB7XG4gICAgICAgIGxldCBsZW4gPSB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWxlbiB8fCAhaXNGaW5pdGUobGVuKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2xlbmd0aCcsIGxlbmd0aCk7XG4gICAgICAgIC8vIE1ha2UgYSBjb3B5IHRvIGF2b2lkIG1vZGlmeWluZyB0aGUgY29sbGVjdGlvbiBhcyB3ZSBnby5cbiAgICAgICAgcmV0dXJuIF9jeWNsZShjb3B5KHZhbHVlcykpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmN5Y2xlID0gY3ljbGU7XG4gICAgZnVuY3Rpb24gY3ljbGVUaHJvdWdoKC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gV2UgY291bGQgcmV0dXJuIGVtcHR5IGlmIG5vIGxlbmd0aCwgYnV0IHRoYXQgd291bGQgYnJlYWsgdGhlIHR5cGluZyBhbmQgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICAgIC8vIEVuZm9yY2luZyB0aGF0IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgMSBjaG9pY2UgaXMga2V5LlxuICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbGVuZ3RoJywgbGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIF9jeWNsZShhcmdzKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5jeWNsZVRocm91Z2ggPSBjeWNsZVRocm91Z2g7XG4gICAgZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgICAgIC8vIENvdWxkIGJlIHNpbmdsZSBleHBvcnQgZnVuY3Rpb24gaW5zdGFuY2UsIGJ1dCBmb3Igc2FmZXR5LCB3ZSdsbCBtYWtlIGEgbmV3IG9uZS5cbiAgICAgICAgcmV0dXJuIG5ldyBGaW5pdGVFbnVtZXJhYmxlKGdldEVtcHR5RW51bWVyYXRvcik7XG4gICAgfVxuICAgIEVudW1lcmFibGUuZW1wdHkgPSBlbXB0eTtcbiAgICBmdW5jdGlvbiByZXBlYXQoZWxlbWVudCwgY291bnQgPSBJbmZpbml0eSkge1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIEVudW1lcmFibGUuZW1wdHkoKTtcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKGNvdW50KSAmJiBJbnRlZ2VyLmFzc2VydChjb3VudCwgXCJjb3VudFwiKVxuICAgICAgICAgICAgPyBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjb3VudDtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4geyBpbmRleCA9IDA7IH0sICh5aWVsZGVyKSA9PiAoaW5kZXgrKyA8IGMpICYmIHlpZWxkZXIueWllbGRSZXR1cm4oZWxlbWVudCksIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiBuZXcgRW51bWVyYXRvckJhc2UobnVsbCwgKHlpZWxkZXIpID0+IHlpZWxkZXIueWllbGRSZXR1cm4oZWxlbWVudCksIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICkpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJlcGVhdCA9IHJlcGVhdDtcbiAgICBmdW5jdGlvbiByZXBlYXRXaXRoRmluYWxpemUoaW5pdGlhbGl6ZXIsIGZpbmFsaXplcikge1xuICAgICAgICBpZiAoIWluaXRpYWxpemVyKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImluaXRpYWxpemVyXCIpO1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBpbml0aWFsaXplcigpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZXJcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IE5VTEw7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgZmluYWxpemVyKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSwgdHJ1ZSAvLyBJcyBlbmRsZXNzIVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSBOVUxMO1xuICAgICAgICAgICAgZmluYWxpemVyID0gVk9JRDA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJlcGVhdFdpdGhGaW5hbGl6ZSA9IHJlcGVhdFdpdGhGaW5hbGl6ZTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVudW1lcmFibGUgb2Ygb25lIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJucyB7RmluaXRlRW51bWVyYWJsZTxUPn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYWtlKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHJlcGVhdChlbGVtZW50LCAxKTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5tYWtlID0gbWFrZTtcbiAgICAvLyBzdGFydCBhbmQgc3RlcCBjYW4gYmUgb3RoZXIgdGhhbiBpbnRlZ2VyLlxuICAgIGZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBjb3VudCwgc3RlcCA9IDEpIHtcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShzdGFydCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RhcnRcIiwgc3RhcnQsIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICBpZiAoIShjb3VudCA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICAgIGlmICghc3RlcClcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJzdGVwXCIsIHN0ZXAsIFwiTXVzdCBiZSBhIHZhbGlkIHZhbHVlXCIpO1xuICAgICAgICBpZiAoIWlzRmluaXRlKHN0ZXApKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgZmluaXRlIG51bWJlci5cIik7XG4gICAgICAgIEludGVnZXIuYXNzZXJ0KGNvdW50LCBcImNvdW50XCIpO1xuICAgICAgICByZXR1cm4gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgbGV0IGMgPSBjb3VudDsgLy8gRm9yY2UgaW50ZWdlciBldmFsdWF0aW9uLlxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHN0YXJ0O1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5kZXgrKyA8IGNcbiAgICAgICAgICAgICAgICAgICAgJiYgeWllbGRlci55aWVsZFJldHVybih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiBpbmRleCA8IGNvdW50KVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBzdGVwO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJhbmdlID0gcmFuZ2U7XG4gICAgZnVuY3Rpb24gcmFuZ2VEb3duKHN0YXJ0LCBjb3VudCwgc3RlcCA9IDEpIHtcbiAgICAgICAgc3RlcCA9IE1hdGguYWJzKHN0ZXApICogLTE7XG4gICAgICAgIHJldHVybiByYW5nZShzdGFydCwgY291bnQsIHN0ZXApO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnJhbmdlRG93biA9IHJhbmdlRG93bjtcbiAgICAvLyBzdGVwID0gLTEgYmVoYXZlcyB0aGUgc2FtZSBhcyB0b05lZ2F0aXZlSW5maW5pdHk7XG4gICAgZnVuY3Rpb24gdG9JbmZpbml0eShzdGFydCA9IDAsIHN0ZXAgPSAxKSB7XG4gICAgICAgIGlmICghaXNGaW5pdGUoc3RhcnQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0YXJ0XCIsIHN0YXJ0LCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgaWYgKCFzdGVwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0ZXBcIiwgc3RlcCwgXCJNdXN0IGJlIGEgdmFsaWQgdmFsdWVcIik7XG4gICAgICAgIGlmICghaXNGaW5pdGUoc3RlcCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSBmaW5pdGUgbnVtYmVyLlwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc3RhcnQ7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihjdXJyZW50KTtcbiAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnRvSW5maW5pdHkgPSB0b0luZmluaXR5O1xuICAgIGZ1bmN0aW9uIHRvTmVnYXRpdmVJbmZpbml0eShzdGFydCA9IDAsIHN0ZXAgPSAxKSB7XG4gICAgICAgIHJldHVybiB0b0luZmluaXR5KHN0YXJ0LCAtc3RlcCk7XG4gICAgfVxuICAgIEVudW1lcmFibGUudG9OZWdhdGl2ZUluZmluaXR5ID0gdG9OZWdhdGl2ZUluZmluaXR5O1xuICAgIGZ1bmN0aW9uIHJhbmdlVG8oc3RhcnQsIHRvLCBzdGVwID0gMSkge1xuICAgICAgICBpZiAoaXNOYU4odG8pIHx8ICFpc0Zpbml0ZSh0bykpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwidG9cIiwgdG8sIFwiTXVzdCBiZSBhIGZpbml0ZSBudW1iZXIuXCIpO1xuICAgICAgICBpZiAoc3RlcCAmJiAhaXNGaW5pdGUoc3RlcCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwic3RlcFwiLCBzdGVwLCBcIk11c3QgYmUgYSBmaW5pdGUgbm9uLXplcm8gbnVtYmVyLlwiKTtcbiAgICAgICAgLy8gVGhpcyB3YXkgd2UgYWRqdXN0IGZvciB0aGUgZGVsdGEgZnJvbSBzdGFydCBhbmQgdG8gc28gdGhlIHVzZXIgY2FuIHNheSArLy0gc3RlcCBhbmQgaXQgd2lsbCB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICBzdGVwID0gTWF0aC5hYnMoc3RlcCk7XG4gICAgICAgIHJldHVybiBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHsgdmFsdWUgPSBzdGFydDsgfSwgc3RhcnQgPCB0b1xuICAgICAgICAgICAgICAgID8geWllbGRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZSA8PSB0byAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogeWllbGRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZSA+PSB0byAmJiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIC09IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5yYW5nZVRvID0gcmFuZ2VUbztcbiAgICBmdW5jdGlvbiBtYXRjaGVzKGlucHV0LCBwYXR0ZXJuLCBmbGFncyA9IFwiXCIpIHtcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiaW5wdXRcIik7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgaW5wdXQ7XG4gICAgICAgIGlmICh0eXBlICE9IFR5cGUuU1RSSU5HKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGV4ZWMgUmVnRXhwIG1hdGNoZXMgb2YgdHlwZSAnXCIgKyB0eXBlICsgXCInLlwiKTtcbiAgICAgICAgaWYgKHBhdHRlcm4gaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIGZsYWdzICs9IChwYXR0ZXJuLmlnbm9yZUNhc2UpID8gXCJpXCIgOiBcIlwiO1xuICAgICAgICAgICAgZmxhZ3MgKz0gKHBhdHRlcm4ubXVsdGlsaW5lKSA/IFwibVwiIDogXCJcIjtcbiAgICAgICAgICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmxhZ3MuaW5kZXhPZihcImdcIikgPT09IC0xKVxuICAgICAgICAgICAgZmxhZ3MgKz0gXCJnXCI7XG4gICAgICAgIHJldHVybiBuZXcgRmluaXRlRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVnZXg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAocGF0dGVybiwgZmxhZ3MpO1xuICAgICAgICAgICAgfSwgKHlpZWxkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDYWxsaW5nIHJlZ2V4LmV4ZWMgY29uc2VjdXRpdmVseSBvbiB0aGUgc2FtZSBpbnB1dCB1c2VzIHRoZSBsYXN0SW5kZXggdG8gc3RhcnQgdGhlIG5leHQgbWF0Y2guXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhpbnB1dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgPyB5aWVsZGVyLnlpZWxkUmV0dXJuKG1hdGNoKVxuICAgICAgICAgICAgICAgICAgICA6IHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1hdGNoZXMgPSBtYXRjaGVzO1xuICAgIGZ1bmN0aW9uIGdlbmVyYXRlKGZhY3RvcnksIGNvdW50ID0gSW5maW5pdHkpIHtcbiAgICAgICAgaWYgKCFmYWN0b3J5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImZhY3RvcnlcIik7XG4gICAgICAgIGlmIChpc05hTihjb3VudCkgfHwgY291bnQgPD0gMClcbiAgICAgICAgICAgIHJldHVybiBFbnVtZXJhYmxlLmVtcHR5KCk7XG4gICAgICAgIHJldHVybiBpc0Zpbml0ZShjb3VudCkgJiYgSW50ZWdlci5hc3NlcnQoY291bnQsIFwiY291bnRcIilcbiAgICAgICAgICAgID8gbmV3IEZpbml0ZUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjID0gY291bnQ7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZCghZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPCBjICYmIHlpZWxkZXIueWllbGRSZXR1cm4oZmFjdG9yeShjdXJyZW50KSk7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZhY3RvcnkgPSBOVUxMO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbmV3IEluZmluaXRlTGlucUVudW1lcmFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoIWZhY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybihmYWN0b3J5KGluZGV4KyspKTtcbiAgICAgICAgICAgICAgICB9LCB0cnVlIC8vIElzIGVuZGxlc3MhXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5ID0gTlVMTDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG4gICAgdmFyIHJhbmRvbTtcbiAgICAoZnVuY3Rpb24gKHJhbmRvbSkge1xuICAgICAgICBmdW5jdGlvbiBmbG9hdHMobWF4RXhjbHVzaXZlID0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlKFJhbmRvbS5nZW5lcmF0ZShtYXhFeGNsdXNpdmUpKTtcbiAgICAgICAgfVxuICAgICAgICByYW5kb20uZmxvYXRzID0gZmxvYXRzO1xuICAgICAgICBmdW5jdGlvbiBpbnRlZ2Vycyhib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGUoUmFuZG9tLmdlbmVyYXRlLmludGVnZXJzKGJvdW5kYXJ5LCBpbmNsdXNpdmUpKTtcbiAgICAgICAgfVxuICAgICAgICByYW5kb20uaW50ZWdlcnMgPSBpbnRlZ2VycztcbiAgICB9KShyYW5kb20gPSBFbnVtZXJhYmxlLnJhbmRvbSB8fCAoRW51bWVyYWJsZS5yYW5kb20gPSB7fSkpO1xuICAgIGZ1bmN0aW9uIHVuZm9sZChzZWVkLCB2YWx1ZUZhY3RvcnksIHNraXBTZWVkID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF2YWx1ZUZhY3RvcnkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiZmFjdG9yeVwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpbnFFbnVtZXJhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICBsZXQgaXNGaXJzdDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHNlZWQ7XG4gICAgICAgICAgICAgICAgaXNGaXJzdCA9ICFza2lwU2VlZDtcbiAgICAgICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3dJZkRpc3Bvc2VkKCF2YWx1ZUZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIGxldCBpID0gaW5kZXgrKztcbiAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdClcbiAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZUZhY3RvcnkodmFsdWUsIGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkUmV0dXJuKHZhbHVlKTtcbiAgICAgICAgICAgIH0sIHRydWUgLy8gSXMgZW5kbGVzcyFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHZhbHVlRmFjdG9yeSA9IE5VTEw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLnVuZm9sZCA9IHVuZm9sZDtcbiAgICBmdW5jdGlvbiBmb3JFYWNoKGVudW1lcmFibGUsIGFjdGlvbiwgbWF4ID0gSW5maW5pdHkpIHtcbiAgICAgICAgLy8gV2lsbCBwcm9wZXJseSBkaXNwb3NlIGNyZWF0ZWQgZW51bWVyYWJsZS5cbiAgICAgICAgLy8gV2lsbCB0aHJvdyBpZiBlbnVtZXJhYmxlIGlzIGVuZGxlc3MuXG4gICAgICAgIHJldHVybiBlbnVtVXRpbC5mb3JFYWNoKGVudW1lcmFibGUsIGFjdGlvbiwgbWF4KTtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiBtYXAoZW51bWVyYWJsZSwgc2VsZWN0b3IpIHtcbiAgICAgICAgLy8gV2lsbCBwcm9wZXJseSBkaXNwb3NlIGNyZWF0ZWQgZW51bWVyYWJsZS5cbiAgICAgICAgLy8gV2lsbCB0aHJvdyBpZiBlbnVtZXJhYmxlIGlzIGVuZGxlc3MuXG4gICAgICAgIHJldHVybiBlbnVtVXRpbC5tYXAoZW51bWVyYWJsZSwgc2VsZWN0b3IpO1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1hcCA9IG1hcDtcbiAgICAvLyBTbGlnaHRseSBvcHRpbWl6ZWQgdmVyc2lvbnMgZm9yIG51bWJlcnMuXG4gICAgZnVuY3Rpb24gbWF4KHZhbHVlcykge1xuICAgICAgICBjb25zdCB2ID0gdmFsdWVzXG4gICAgICAgICAgICAudGFrZVVudGlsKHYgPT4gdiA9PSArSW5maW5pdHksIHRydWUpXG4gICAgICAgICAgICAuYWdncmVnYXRlKEZ1bmN0aW9ucy5HcmVhdGVyKTtcbiAgICAgICAgcmV0dXJuIHYgPT09IFZPSUQwID8gTmFOIDogdjtcbiAgICB9XG4gICAgRW51bWVyYWJsZS5tYXggPSBtYXg7XG4gICAgZnVuY3Rpb24gbWluKHZhbHVlcykge1xuICAgICAgICBjb25zdCB2ID0gdmFsdWVzXG4gICAgICAgICAgICAudGFrZVVudGlsKHYgPT4gdiA9PSAtSW5maW5pdHksIHRydWUpXG4gICAgICAgICAgICAuYWdncmVnYXRlKEZ1bmN0aW9ucy5MZXNzZXIpO1xuICAgICAgICByZXR1cm4gdiA9PT0gVk9JRDAgPyBOYU4gOiB2O1xuICAgIH1cbiAgICBFbnVtZXJhYmxlLm1pbiA9IG1pbjtcbiAgICAvKipcbiAgICAgKiBUYWtlcyBhbnkgc2V0IG9mIGNvbGxlY3Rpb25zIG9mIHRoZSBzYW1lIHR5cGUgYW5kIHdlYXZlcyB0aGVtIHRvZ2V0aGVyLlxuICAgICAqIEBwYXJhbSBlbnVtZXJhYmxlc1xuICAgICAqIEByZXR1cm5zIHtFbnVtZXJhYmxlPFQ+fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdlYXZlKGVudW1lcmFibGVzKSB7XG4gICAgICAgIGlmICghZW51bWVyYWJsZXMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdlbnVtZXJhYmxlcycpO1xuICAgICAgICBsZXQgZGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5xRW51bWVyYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcXVldWU7XG4gICAgICAgICAgICBsZXQgbWFpbkVudW1lcmF0b3I7XG4gICAgICAgICAgICBsZXQgaW5kZXg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvd0lmRGlzcG9zZWQoZGlzcG9zZWQpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuICAgICAgICAgICAgICAgIG1haW5FbnVtZXJhdG9yID0gZW51bVV0aWwuZnJvbShlbnVtZXJhYmxlcyk7XG4gICAgICAgICAgICB9LCAoeWllbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93SWZEaXNwb3NlZChkaXNwb3NlZCk7XG4gICAgICAgICAgICAgICAgbGV0IGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vIEZpcnN0IHBhc3MuLi5cbiAgICAgICAgICAgICAgICBpZiAobWFpbkVudW1lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFlICYmIG1haW5FbnVtZXJhdG9yLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjID0gbWFpbkVudW1lcmF0b3IuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUgPSBuZXh0RW51bWVyYXRvcihxdWV1ZSwgYyA/IGVudW1VdGlsLmZyb20oYykgOiBOVUxMKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluRW51bWVyYXRvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlICghZSAmJiBxdWV1ZS50cnlEZXF1ZXVlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IG5leHRFbnVtZXJhdG9yKHF1ZXVlLCBlbnVtVXRpbC5mcm9tKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlXG4gICAgICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihlLmN1cnJlbnQpXG4gICAgICAgICAgICAgICAgICAgIDogeWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2UudGhlc2Uubm9Db3B5KHF1ZXVlLmR1bXAoKSk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gTlVMTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1haW5FbnVtZXJhdG9yKVxuICAgICAgICAgICAgICAgICAgICBtYWluRW51bWVyYXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgbWFpbkVudW1lcmF0b3IgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEVudW1lcmFibGUud2VhdmUgPSB3ZWF2ZTtcbn0pKEVudW1lcmFibGUgfHwgKEVudW1lcmFibGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgRW51bWVyYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbnEuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS5MaW5xL0xpbnEuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0ICogYXMgVmFsdWVzIGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG4vKiAgdmFsaWRhdGVTaXplOiBVdGlsaXR5IGZvciBxdWljayB2YWxpZGF0aW9uL2ludmFsaWRhdGlvbiBvZiBhcnJheSBlcXVhbGl0eS5cbiAgICBXaHkgdGhpcyB3YXk/ICBXaHkgbm90IHBhc3MgYSBjbG9zdXJlIGZvciB0aGUgbGFzdCByZXR1cm4/XG4gICAgUmVhc29uOiBQZXJmb3JtYW5jZSBhbmQgYXZvaWRpbmcgdGhlIGNyZWF0aW9uIG9mIG5ldyBmdW5jdGlvbnMvY2xvc3VyZXMuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVNpemUoYSwgYikge1xuICAgIC8vIEJvdGggdmFsaWQgYW5kIGFyZSBzYW1lIG9iamVjdCwgb3IgYm90aCBhcmUgbnVsbC91bmRlZmluZWQuXG4gICAgaWYgKGEgJiYgYiAmJiBhID09PSBiIHx8ICFhICYmICFiKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBdCB0aGlzIHBvaW50LCBhdCBsZWFzdCBvbmUgaGFzIHRvIGJlIG5vbi1udWxsLlxuICAgIGlmICghYSB8fCAhYilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGxlbiA9IGEubGVuZ3RoO1xuICAgIGlmIChsZW4gIT09IGIubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgLy8gSWYgYm90aCBhcmUgYXJyYXlzIGFuZCBoYXZlIHplcm8gbGVuZ3RoLCB0aGV5IGFyZSBlcXVhbC5cbiAgICBpZiAobGVuID09PSAwKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyBSZXR1cm4gdGhlIGxlbmd0aCBmb3IgZG93bnN0cmVhbSBwcm9jZXNzaW5nLlxuICAgIHJldHVybiBsZW47XG59XG5leHBvcnQgZnVuY3Rpb24gYXJlQWxsRXF1YWwoYXJyYXlzLCBzdHJpY3QgPSB0cnVlLCBlcXVhbGl0eUNvbXBhcmVyID0gVmFsdWVzLmFyZUVxdWFsKSB7XG4gICAgaWYgKCFhcnJheXMpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50TnVsbEV4Y2VwdGlvbjogJ2FycmF5cycgY2Fubm90IGJlIG51bGwuXCIpO1xuICAgIGlmIChhcnJheXMubGVuZ3RoIDwgMilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNvbXBhcmUgYSBzZXQgb2YgYXJyYXlzIGxlc3MgdGhhbiAyLlwiKTtcbiAgICBpZiAoVHlwZS5pc0Z1bmN0aW9uKHN0cmljdCkpIHtcbiAgICAgICAgZXF1YWxpdHlDb21wYXJlciA9IHN0cmljdDtcbiAgICAgICAgc3RyaWN0ID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgZmlyc3QgPSBhcnJheXNbMF07XG4gICAgZm9yIChsZXQgaSA9IDEsIGwgPSBhcnJheXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmICghYXJlRXF1YWwoZmlyc3QsIGFycmF5c1tpXSwgc3RyaWN0LCBlcXVhbGl0eUNvbXBhcmVyKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnQgZnVuY3Rpb24gYXJlRXF1YWwoYSwgYiwgc3RyaWN0ID0gdHJ1ZSwgZXF1YWxpdHlDb21wYXJlciA9IFZhbHVlcy5hcmVFcXVhbCkge1xuICAgIGNvbnN0IGxlbiA9IHZhbGlkYXRlU2l6ZShhLCBiKTtcbiAgICBpZiAoVHlwZS5pc0Jvb2xlYW4obGVuKSlcbiAgICAgICAgcmV0dXJuIGxlbjtcbiAgICBpZiAoVHlwZS5pc0Z1bmN0aW9uKHN0cmljdCkpIHtcbiAgICAgICAgZXF1YWxpdHlDb21wYXJlciA9IHN0cmljdDtcbiAgICAgICAgc3RyaWN0ID0gdHJ1ZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoIWVxdWFsaXR5Q29tcGFyZXIoYVtpXSwgYltpXSwgc3RyaWN0KSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBpbnRlcm5hbFNvcnQoYSwgY29tcGFyZXIpIHtcbiAgICBpZiAoIWEgfHwgYS5sZW5ndGggPCAyKVxuICAgICAgICByZXR1cm4gYTtcbiAgICBjb25zdCBsZW4gPSBhLmxlbmd0aDtcbiAgICBsZXQgYjtcbiAgICBpZiAobGVuID4gNjU1MzYpXG4gICAgICAgIGIgPSBuZXcgQXJyYXkobGVuKTtcbiAgICBlbHNlIHtcbiAgICAgICAgYiA9IFtdO1xuICAgICAgICBiLmxlbmd0aCA9IGxlbjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBiW2ldID0gYVtpXTtcbiAgICB9XG4gICAgYi5zb3J0KGNvbXBhcmVyKTtcbiAgICByZXR1cm4gYjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVpdmFsZW50KGEsIGIsIGNvbXBhcmVyID0gVmFsdWVzLmNvbXBhcmUpIHtcbiAgICBjb25zdCBsZW4gPSB2YWxpZGF0ZVNpemUoYSwgYik7XG4gICAgaWYgKFR5cGUuaXNCb29sZWFuKGxlbikpXG4gICAgICAgIHJldHVybiBsZW47XG4gICAgLy8gVGhlcmUgbWlnaHQgYmUgYSBiZXR0ZXIgbW9yZSBwZXJmb3JtYW50IHdheSB0byBkbyB0aGlzLCBidXQgZm9yIHRoZSBtb21lbnQsIHRoaXNcbiAgICAvLyB3b3JrcyBxdWl0ZSB3ZWxsLlxuICAgIGEgPSBpbnRlcm5hbFNvcnQoYSwgY29tcGFyZXIpO1xuICAgIGIgPSBpbnRlcm5hbFNvcnQoYiwgY29tcGFyZXIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGNvbXBhcmVyKGFbaV0sIGJbaV0pICE9PSAwKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbXBhcmUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheS9Db21wYXJlLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTppbXBvcnQtbmFtZVxyXG5pbXBvcnQgeyBTdHJpbmdOb2RlIH0gZnJvbSAnLi9TdHJpbmdOb2RlJztcclxuaW1wb3J0ICcuL1N0cmluZ0V4dGVuc2lvbic7XHJcblxyXG5leHBvcnQge1xyXG4gIFN0cmluZ05vZGUsXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsImltcG9ydCB7IE5hbWVkTm9kZSB9IGZyb20gJy4vTmFtZWROb2RlJztcclxuZXhwb3J0IGNsYXNzIFN0cmluZ05vZGUgZXh0ZW5kcyBOYW1lZE5vZGU8U3RyaW5nTm9kZSwgc3RyaW5nPiB7XHJcblxyXG4gIHB1YmxpYyBnZXQgVmFsdWUoKTpzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN1cGVyLmdldFZhbHVlKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgVmFsdWUodmFsdWU6c3RyaW5nKSB7XHJcbiAgICBzdXBlci5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihub2RlOiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZEZpcnN0KHZhbHVlOnN0cmluZyB8IFN0cmluZ05vZGUpOlN0cmluZ05vZGUge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLkFkZEZpcnN0KG5ldyBTdHJpbmdOb2RlKHZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuQWRkRmlyc3QodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZExhc3QodmFsdWU6c3RyaW5nIHwgU3RyaW5nTm9kZSk6U3RyaW5nTm9kZSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuQWRkTGFzdChuZXcgU3RyaW5nTm9kZSh2YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkFkZExhc3QodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZE5leHQodmFsdWU6c3RyaW5nIHwgU3RyaW5nTm9kZSk6U3RyaW5nTm9kZSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuQWRkTmV4dChuZXcgU3RyaW5nTm9kZSh2YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkFkZE5leHQodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFkZFByZXZpb3VzKHZhbHVlOnN0cmluZyB8IFN0cmluZ05vZGUpOlN0cmluZ05vZGUge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHN1cGVyLkFkZFByZXZpb3VzKG5ldyBTdHJpbmdOb2RlKHZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuQWRkUHJldmlvdXModmFsdWUpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU3RyaW5nTm9kZS50cyIsIi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTppbXBvcnQtbmFtZVxyXG5pbXBvcnQgRW51bWVyYWJsZSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtLkxpbnEvTGlucSc7XHJcbmltcG9ydCB7IElMaW5xRW51bWVyYWJsZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9FbnVtZXJhYmxlJztcclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmFtZWROb2RlPFROb2RlIGV4dGVuZHMgTmFtZWROb2RlPFROb2RlLCBUVmFsdWU+LCBUVmFsdWU+IGV4dGVuZHMgTm9kZTxUTm9kZSwgVFZhbHVlPiB7XHJcblxyXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihub2RlPzpUVmFsdWUpIHtcclxuICAgIGlmIChub2RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3VwZXIobm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG5hbWU6c3RyaW5nO1xyXG4gIHB1YmxpYyBnZXQgTmFtZSgpOnN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gIH1cclxuICBwcm90ZWN0ZWQgc2V0KG5hbWU6c3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gIH1cclxuXHJcbiAgLy8gI3JlZ2lvbiBUcmF2ZXJzYWxcclxuXHJcbiAgcHVibGljIENoaWxkKG5hbWU6c3RyaW5nKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gc3VwZXIuQ2hpbGRyZW4oKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSkuZmlyc3QoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnMobmFtZU9ySW5jbHVzaXZlRGVwdGg/OnN0cmluZyB8IG51bWJlciwgaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZURlcHRoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuQW5jZXN0b3JzKG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5BbmNlc3RvcnMoaW5jbHVzaXZlRGVwdGgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lT3JJbmNsdXNpdmVEZXB0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVEZXB0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRGVwdGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5BbmNlc3RvcnNBbmRTZWxmKG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5BbmNlc3RvcnNBbmRTZWxmKGluY2x1c2l2ZURlcHRoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIENoaWxkcmVuKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5DaGlsZHJlbigpIFxyXG4gICAgOiBzdXBlci5DaGlsZHJlbigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21TZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5OZXh0c0Zyb21TZWxmKClcclxuICAgIDogc3VwZXIuTmV4dHNGcm9tU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21TZWxmQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuTmV4dHNGcm9tU2VsZkFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci4gTmV4dHNGcm9tU2VsZkFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tTGFzdChuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuTmV4dHNGcm9tTGFzdCgpXHJcbiAgICA6IHN1cGVyLk5leHRzRnJvbUxhc3QoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tTGFzdEFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLk5leHRzRnJvbUxhc3RBbmRTZWxmKClcclxuICAgIDogc3VwZXIuTmV4dHNGcm9tTGFzdEFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tRmlyc3QobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLlByZXZzRnJvbUZpcnN0KClcclxuICAgIDogc3VwZXIuUHJldnNGcm9tRmlyc3QoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tRmlyc3RBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5QcmV2c0Zyb21GaXJzdEFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5QcmV2c0Zyb21GaXJzdEFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuUHJldnNGcm9tU2VsZigpXHJcbiAgICA6IHN1cGVyLlByZXZzRnJvbVNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tU2VsZkFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLlByZXZzRnJvbVNlbGZBbmRTZWxmKClcclxuICAgIDogc3VwZXIuUHJldnNGcm9tU2VsZkFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgRGVzY2VuZGFudHMobmFtZU9ySW5jbHVzaXZlRGVwdGg/OnN0cmluZyB8IG51bWJlciwgaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZURlcHRoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuRGVzY2VuZGFudHMobmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkRlc2NlbmRhbnRzKGluY2x1c2l2ZURlcHRoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzQW5kU2VsZihuYW1lT3JJbmNsdXNpdmVEZXB0aD86c3RyaW5nIHwgbnVtYmVyLCBpbmNsdXNpdmVEZXB0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmICh0eXBlb2YgbmFtZU9ySW5jbHVzaXZlRGVwdGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5EZXNjZW5kYW50c0FuZFNlbGYobmFtZU9ySW5jbHVzaXZlRGVwdGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLkRlc2NlbmRhbnRzQW5kU2VsZihpbmNsdXNpdmVEZXB0aCkud2hlcmUobm9kZSA9PiBub2RlLk5hbWUgPT09IG5hbWVPckluY2x1c2l2ZURlcHRoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBTaWJsaW5ncyhuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoPzpzdHJpbmcgfCBudW1iZXIsIGluY2x1c2l2ZUVhY2hMZW5ndGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5TaWJsaW5ncyhuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5TaWJsaW5ncyhpbmNsdXNpdmVFYWNoTGVuZ3RoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgU2libGluZ3NBbmRTZWxmKG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGg/OnN0cmluZyB8IG51bWJlciwgaW5jbHVzaXZlRWFjaExlbmd0aD86bnVtYmVyKVxyXG4gICAgOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lT3JJbmNsdXNpdmVFYWNoTGVuZ3RoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gc3VwZXIuU2libGluZ3NBbmRTZWxmKG5hbWVPckluY2x1c2l2ZUVhY2hMZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLlNpYmxpbmdzQW5kU2VsZihpbmNsdXNpdmVFYWNoTGVuZ3RoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZU9ySW5jbHVzaXZlRWFjaExlbmd0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmKClcclxuICAgIDogc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NBZnRlclNlbGZBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZkFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZkFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGYoKVxyXG4gICAgOiBzdXBlci5BbmNlc3RvcnNBbmRTaWJsaW5nc0JlZm9yZVNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmQW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLkFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZkFuZFNlbGYoKS53aGVyZShub2RlID0+IG5vZGUuTmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBBbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGQobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZCgpXHJcbiAgICA6IHN1cGVyLkFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZCgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGRBbmRTZWxmKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5BbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGRBbmRTZWxmKClcclxuICAgIDogc3VwZXIuQW5jZXN0b3JzV2l0aFNpbmdsZUNoaWxkQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mU2luZ2xlKG5hbWU/OnN0cmluZyk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gbmFtZSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgPyBzdXBlci5EZXNjZW5kYW50c09mU2luZ2xlKClcclxuICAgIDogc3VwZXIuRGVzY2VuZGFudHNPZlNpbmdsZSgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZihuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuRGVzY2VuZGFudHNPZlNpbmdsZUFuZFNlbGYoKVxyXG4gICAgOiBzdXBlci5EZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mRmlyc3RDaGlsZChuYW1lPzpzdHJpbmcpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIG5hbWUgPT09IHVuZGVmaW5lZCBcclxuICAgID8gc3VwZXIuRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGQoKVxyXG4gICAgOiBzdXBlci5EZXNjZW5kYW50c09mRmlyc3RDaGlsZCgpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mRmlyc3RDaGlsZEFuZFNlbGYobmFtZT86c3RyaW5nKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBuYW1lID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHN1cGVyLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkQW5kU2VsZigpXHJcbiAgICA6IHN1cGVyLkRlc2NlbmRhbnRzT2ZGaXJzdENoaWxkQW5kU2VsZigpLndoZXJlKG5vZGUgPT4gbm9kZS5OYW1lID09PSBuYW1lKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL05hbWVkTm9kZS50cyIsIi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTppbXBvcnQtbmFtZVxyXG5pbXBvcnQgRW51bWVyYWJsZSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtLkxpbnEvTGlucSc7XHJcbmltcG9ydCB7IElMaW5xRW51bWVyYWJsZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0uTGlucS9FbnVtZXJhYmxlJztcclxuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRW51bWVyYXRpb24vRW51bWVyYXRvcic7XHJcbmltcG9ydCB7IFN0cmluZ0J1aWxkZXIgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1RleHQvU3RyaW5nQnVpbGRlcic7XHJcbmltcG9ydCB7IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24gfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1lczYvL1N5c3RlbS9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb24nO1xyXG5pbXBvcnQgJy4vU3RyaW5nRXh0ZW5zaW9uJztcclxuZXhwb3J0IGNsYXNzIE5vZGU8VE5vZGUgZXh0ZW5kcyBOb2RlPFROb2RlLCBUVmFsdWU+LCBUVmFsdWU+IHtcclxuICBcclxuICAvLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIE5vZGUgY2xhc3Mgd2l0aCBhIGRlZmF1bHQgdmFsdWUuXHJcbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHZhbHVlPzogVFZhbHVlKSB7XHJcbiAgICB0aGlzLmZpcnN0Q2hpbGQgPSBudWxsO1xyXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy5jeWNsaWNQcmV2ID0gdGhpcy5UaGlzTm9kZTtcclxuICAgIHRoaXMuY3ljbGljTmV4dCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICB0aGlzLlZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2ZpcnN0Q2hpbGQ6VE5vZGU7XHJcbiAgcHJpdmF0ZSBfcGFyZW50OlROb2RlO1xyXG4gIHByaXZhdGUgX2N5Y2xpY1ByZXY6VE5vZGU7XHJcbiAgcHJpdmF0ZSBfY3ljbGljTmV4dDpUTm9kZTtcclxuICBwcml2YXRlIF92YWx1ZTpUVmFsdWU7XHJcblxyXG4gIHByaXZhdGUgZ2V0IFRoaXNOb2RlKCk6IFROb2RlIHtcclxuICAgIHJldHVybiA8VE5vZGU+PGFueT50aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBGaXJzdFNpYmxpbmcoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5QYXJlbnQgIT0gbnVsbCA/IHRoaXMuUGFyZW50LkZpcnN0Q2hpbGQgOiB0aGlzLlRoaXNOb2RlO1xyXG4gIH1cclxuICBcclxuICBwdWJsaWMgZ2V0IExhc3RTaWJsaW5nKCk6IFROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLlBhcmVudCAhPSBudWxsID8gdGhpcy5QYXJlbnQuRmlyc3RDaGlsZC5DeWNsaWNQcmV2IDogdGhpcy5UaGlzTm9kZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgRmlyc3RDaGlsZCgpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLl9maXJzdENoaWxkO1xyXG4gIH1cclxuICBwcml2YXRlIHNldCBmaXJzdENoaWxkKGZpcnN0Q2hpbGQ6VE5vZGUpIHtcclxuICAgIHRoaXMuX2ZpcnN0Q2hpbGQgPSBmaXJzdENoaWxkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBMYXN0Q2hpbGQoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5GaXJzdENoaWxkICE9IG51bGwgPyB0aGlzLkZpcnN0Q2hpbGQuQ3ljbGljUHJldiA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IFBhcmVudCgpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgc2V0IHBhcmVudChwYXJlbnQ6VE5vZGUpIHtcclxuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgQ3ljbGljUHJldigpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLl9jeWNsaWNQcmV2O1xyXG4gIH1cclxuICBwcml2YXRlIHNldCBjeWNsaWNQcmV2KGN5Y2xpY1ByZXY6VE5vZGUpIHtcclxuICAgIHRoaXMuX2N5Y2xpY1ByZXYgPSBjeWNsaWNQcmV2O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBDeWNsaWNOZXh0KCk6VE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N5Y2xpY05leHQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgc2V0IGN5Y2xpY05leHQoY3ljbGljTmV4dDpUTm9kZSkge1xyXG4gICAgdGhpcy5fY3ljbGljTmV4dCA9IGN5Y2xpY05leHQ7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgUHJldigpOlROb2RlIHtcclxuICAgIHJldHVybiB0aGlzLkN5Y2xpY1ByZXYgIT09IHRoaXMuTGFzdFNpYmxpbmcgPyB0aGlzLkN5Y2xpY1ByZXYgOiBudWxsO1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0IE5leHQoKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5DeWNsaWNOZXh0ICE9PSB0aGlzLkZpcnN0U2libGluZyA/IHRoaXMuQ3ljbGljTmV4dCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0VmFsdWUoKTpUVmFsdWUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBwcm90ZWN0ZWQgc2V0VmFsdWUodmFsdWU6IFRWYWx1ZSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJvdGVjdGVkIGdldCBWYWx1ZSgpOlRWYWx1ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG4gIHByb3RlY3RlZCBzZXQgVmFsdWUodmFsdWU6IFRWYWx1ZSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgQ2hpbGRyZW5Db3VudCgpOm51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5DaGlsZHJlbigpLmNvdW50KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IExlbmd0aEZyb21EZWVwZXN0Q2hpbGQoKTpudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuR2V0TGVuZ3RoRnJvbURlZXBlc3RDaGlsZCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgR2V0TGVuZ3RoRnJvbURlZXBlc3RDaGlsZCgpOm51bWJlciB7XHJcbiAgICBsZXQgbWF4TGVuZ3RoID0gMDtcclxuICAgIHRoaXMuQ2hpbGRyZW4oKS5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgY29uc3QgbGVuZ3RoID0gY2hpbGQuR2V0TGVuZ3RoRnJvbURlZXBlc3RDaGlsZCgpICsgMTtcclxuICAgICAgaWYgKG1heExlbmd0aCA8IGxlbmd0aCkge1xyXG4gICAgICAgIG1heExlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF4TGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIENoaWxkQXRPck51bGwoaW5kZXg6bnVtYmVyKTpUTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5DaGlsZHJlbigpLmVsZW1lbnRBdE9yRGVmYXVsdChpbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzKGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIGluY2x1c2l2ZURlcHRoID09PSB1bmRlZmluZWQgXHJcbiAgICA/IHRoaXMuQW5jZXN0b3JzQW5kU2VsZigpLnNraXAoMSkgXHJcbiAgICA6IHRoaXMuQW5jZXN0b3JzKCkudGFrZShpbmNsdXNpdmVEZXB0aCk7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTZWxmKGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKGluY2x1c2l2ZURlcHRoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuQW5jZXN0b3JzQW5kU2VsZigpLnRha2UoaW5jbHVzaXZlRGVwdGggKyAxKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuUGFyZW50O1xyXG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIENoaWxkcmVuKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuRmlyc3RDaGlsZDtcclxuICAgICAgaWYgKG5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCB0ZXJtaW5hbCA9IG5vZGU7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgICAgfSB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIFJldmVyc2VDaGlsZHJlbigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLkxhc3RDaGlsZDtcclxuICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0ZXJtaW5hbCA9IG5vZGU7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY1ByZXY7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBOZXh0c0Zyb21TZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yMShfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLkN5Y2xpY05leHQ7XHJcbiAgICAgIGNvbnN0IHRlcm1pbmFsID0gX3RoaXMuRmlyc3RTaWJsaW5nO1xyXG4gICAgICB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yMSh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKS5jb25jYXQodGhpcy5OZXh0c0Zyb21TZWxmKCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIE5leHRzRnJvbUxhc3QoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5MYXN0U2libGluZztcclxuICAgICAgY29uc3QgdGVybWluYWwgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKSB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNQcmV2O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTmV4dHNGcm9tTGFzdEFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLk5leHRzRnJvbUxhc3QoKS5jb25jYXQoRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFByZXZzRnJvbUZpcnN0KCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuRmlyc3RTaWJsaW5nO1xyXG4gICAgICBjb25zdCB0ZXJtaW5hbCA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICB3aGlsZSAobm9kZSAhPT0gdGVybWluYWwpIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQcmV2c0Zyb21GaXJzdEFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLlByZXZzRnJvbUZpcnN0KCkuY29uY2F0KEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQcmV2c0Zyb21TZWxmKCk6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICBmdW5jdGlvbiAqZ2VuZXJhdG9yKF90aGlzKSB7XHJcbiAgICAgIGxldCBub2RlID0gX3RoaXMuQ3ljbGljUHJldjtcclxuICAgICAgY29uc3QgdGVybWluYWwgPSBfdGhpcy5MYXN0U2libGluZztcclxuICAgICAgd2hpbGUgKG5vZGUgIT09IHRlcm1pbmFsKSB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5DeWNsaWNQcmV2O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUHJldnNGcm9tU2VsZkFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiBFbnVtZXJhYmxlLnJlcGVhdCh0aGlzLlRoaXNOb2RlLCAxKS5jb25jYXQodGhpcy5QcmV2c0Zyb21TZWxmKCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzKGluY2x1c2l2ZURlcHRoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBpZiAoaW5jbHVzaXZlRGVwdGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgICAgbGV0IGN1cnNvciA9IHN0YXJ0O1xyXG4gICAgICAgIGlmIChjdXJzb3IuRmlyc3RDaGlsZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuRmlyc3RDaGlsZDtcclxuICAgICAgICAgIHlpZWxkIGN1cnNvcjtcclxuICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChjdXJzb3IuRmlyc3RDaGlsZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgeWllbGQgY3Vyc29yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlIChjdXJzb3IuTmV4dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLlBhcmVudDtcclxuICAgICAgICAgICAgICBpZiAoY3Vyc29yID09PSBzdGFydCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuQ3ljbGljTmV4dDtcclxuICAgICAgICAgICAgeWllbGQgY3Vyc29yO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gIFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gX3RoaXMuVGhpc05vZGU7XHJcbiAgICAgICAgbGV0IGN1cnNvciA9IHN0YXJ0O1xyXG4gICAgICAgIGlmIChjdXJzb3IuRmlyc3RDaGlsZCAhPSBudWxsICYmIGluY2x1c2l2ZURlcHRoID4gMCkge1xyXG4gICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICBpbmNsdXNpdmVEZXB0aC0tO1xyXG4gICAgICAgICAgeWllbGQgY3Vyc29yO1xyXG4gICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgd2hpbGUgKGN1cnNvci5GaXJzdENoaWxkICE9IG51bGwgJiYgaW5jbHVzaXZlRGVwdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgaW5jbHVzaXZlRGVwdGgtLTtcclxuICAgICAgICAgICAgICB5aWVsZCBjdXJzb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKGN1cnNvci5OZXh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3IuUGFyZW50O1xyXG4gICAgICAgICAgICAgIGluY2x1c2l2ZURlcHRoKys7XHJcbiAgICAgICAgICAgICAgaWYgKGN1cnNvciA9PT0gc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yLkN5Y2xpY05leHQ7XHJcbiAgICAgICAgICAgIHlpZWxkIGN1cnNvcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c0FuZFNlbGYoaW5jbHVzaXZlRGVwdGg/Om51bWJlcik6SUxpbnFFbnVtZXJhYmxlPFROb2RlPiB7XHJcbiAgICByZXR1cm4gaW5jbHVzaXZlRGVwdGggPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpLmNvbmNhdCh0aGlzLkRlc2NlbmRhbnRzKCkpXHJcbiAgICAgIDogRW51bWVyYWJsZS5yZXBlYXQodGhpcy5UaGlzTm9kZSwgMSkuY29uY2F0KHRoaXMuRGVzY2VuZGFudHMoaW5jbHVzaXZlRGVwdGgpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBTaWJsaW5ncyhpbmNsdXNpdmVFYWNoTGVuZ3RoPzpudW1iZXIpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgaWYgKGluY2x1c2l2ZUVhY2hMZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5QcmV2c0Zyb21TZWxmKCkudGFrZShpbmNsdXNpdmVFYWNoTGVuZ3RoKS5yZXZlcnNlKClcclxuICAgICAgLmNvbmNhdCh0aGlzLk5leHRzRnJvbVNlbGYoKS50YWtlKGluY2x1c2l2ZUVhY2hMZW5ndGgpKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgY29uc3QgZmlyc3QgPSBfdGhpcy5GaXJzdFNpYmxpbmc7XHJcbiAgICAgIGxldCBub2RlID0gZmlyc3Q7XHJcbiAgICAgIHdoaWxlIChub2RlICE9PSA8VE5vZGU+PGFueT5fdGhpcykge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuQ3ljbGljTmV4dDtcclxuICAgICAgfVxyXG4gICAgICBub2RlID0gbm9kZS5DeWNsaWNOZXh0O1xyXG4gICAgICB3aGlsZSAobm9kZSAhPT0gZmlyc3QpIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBTaWJsaW5nc0FuZFNlbGYoaW5jbHVzaXZlRWFjaExlbmd0aD86bnVtYmVyKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGlmIChpbmNsdXNpdmVFYWNoTGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuUHJldnNGcm9tU2VsZigpLnRha2UoaW5jbHVzaXZlRWFjaExlbmd0aCkucmV2ZXJzZSgpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdCh0aGlzLk5leHRzRnJvbVNlbGYoKS50YWtlKGluY2x1c2l2ZUVhY2hMZW5ndGgpKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgY29uc3QgZmlyc3QgPSBfdGhpcy5GaXJzdFNpYmxpbmc7XHJcbiAgICAgIGxldCBub2RlID0gZmlyc3Q7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICB5aWVsZCBub2RlO1xyXG4gICAgICAgIG5vZGUgPSBub2RlLkN5Y2xpY05leHQ7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT09IGZpcnN0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNBbmRTaWJsaW5nc0FmdGVyU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgY29uc3QgZSA9IG5vZGUuTmV4dHNGcm9tU2VsZigpLmdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB3aGlsZSAoZS5tb3ZlTmV4dCgpKSB7XHJcbiAgICAgICAgICB5aWVsZCBlLmN1cnJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUgPSBub2RlLlBhcmVudDtcclxuICAgICAgfSB3aGlsZSAobm9kZSAhPSBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmQW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIEVudW1lcmFibGUucmVwZWF0KHRoaXMuVGhpc05vZGUsIDEpLmNvbmNhdCh0aGlzLkFuY2VzdG9yc0FuZFNpYmxpbmdzQWZ0ZXJTZWxmKCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc0FuZFNpYmxpbmdzQmVmb3JlU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmQW5kU2VsZigpLnNraXAoMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JzQW5kU2libGluZ3NCZWZvcmVTZWxmQW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgY29uc3QgZSA9IG5vZGUuUHJldnNGcm9tU2VsZkFuZFNlbGYoKS5nZXRFbnVtZXJhdG9yKCk7XHJcbiAgICAgICAgd2hpbGUgKGUubW92ZU5leHQoKSkge1xyXG4gICAgICAgICAgeWllbGQgZS5jdXJyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT0gbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRW51bWVyYWJsZS5mcm9tQW55KGdlbmVyYXRvcih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQW5jZXN0b3JXaXRoU2luZ2xlQ2hpbGQoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgd2hpbGUgKG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCkge1xyXG4gICAgICAgIGNvbnN0IGxhc3ROb2RlID0gbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5QYXJlbnQ7XHJcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGxhc3ROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBbmNlc3RvcnNXaXRoU2luZ2xlQ2hpbGQoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgd2hpbGUgKG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCkge1xyXG4gICAgICAgIG5vZGUgPSBub2RlLlBhcmVudDtcclxuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEFuY2VzdG9yc1dpdGhTaW5nbGVDaGlsZEFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgd2hpbGUgKG5vZGUgPT09IG5vZGUuQ3ljbGljTmV4dCkge1xyXG4gICAgICAgIG5vZGUgPSBub2RlLlBhcmVudDtcclxuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEVudW1lcmFibGUuZnJvbUFueShnZW5lcmF0b3IodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERlc2NlbmRhbnRzT2ZTaW5nbGUoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLkRlc2NlbmRhbnRzT2ZTaW5nbGVBbmRTZWxmKCkuc2tpcCgxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mU2luZ2xlQW5kU2VsZigpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgZnVuY3Rpb24gKmdlbmVyYXRvcihfdGhpcykge1xyXG4gICAgICBsZXQgbm9kZSA9IF90aGlzLlRoaXNOb2RlO1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgeWllbGQgbm9kZTtcclxuICAgICAgICBub2RlID0gbm9kZS5GaXJzdENoaWxkO1xyXG4gICAgICB9IHdoaWxlIChub2RlICE9IG51bGwgJiYgbm9kZSA9PT0gbm9kZS5DeWNsaWNOZXh0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mRmlyc3RDaGlsZCgpOklMaW5xRW51bWVyYWJsZTxUTm9kZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuRGVzY2VuZGFudHNPZkZpcnN0Q2hpbGRBbmRTZWxmKCkuc2tpcCgxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBEZXNjZW5kYW50c09mRmlyc3RDaGlsZEFuZFNlbGYoKTpJTGlucUVudW1lcmFibGU8VE5vZGU+IHtcclxuICAgIGZ1bmN0aW9uICpnZW5lcmF0b3IoX3RoaXMpIHtcclxuICAgICAgbGV0IG5vZGUgPSBfdGhpcy5UaGlzTm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIHlpZWxkIG5vZGU7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuRmlyc3RDaGlsZDtcclxuICAgICAgfSB3aGlsZSAobm9kZSAhPSBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbnVtZXJhYmxlLmZyb21BbnkoZ2VuZXJhdG9yKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBBZGRQcmV2aW91cyhub2RlOlROb2RlKTpUTm9kZSB7XHJcbiAgICBjb25zb2xlLmFzc2VydChub2RlICE9IG51bGwpO1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZS5QYXJlbnQgPT0gbnVsbCk7XHJcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLlBhcmVudCAhPSBudWxsKTtcclxuICAgIGlmICh0aGlzLlBhcmVudC5GaXJzdENoaWxkID09PSA8VE5vZGU+PGFueT50aGlzKSB7XHJcbiAgICAgIHRoaXMuUGFyZW50LmZpcnN0Q2hpbGQgPSBub2RlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuQWRkUHJldmlvdXNJZ25vcmluZ0ZpcnN0Q2hpbGQobm9kZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkTmV4dChub2RlOlROb2RlKTpUTm9kZSB7XHJcbiAgICBjb25zb2xlLmFzc2VydChub2RlICE9IG51bGwpO1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZS5QYXJlbnQgPT0gbnVsbCk7XHJcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLlBhcmVudCAhPSBudWxsKTtcclxuICAgIHJldHVybiB0aGlzLkN5Y2xpY05leHQuQWRkUHJldmlvdXNJZ25vcmluZ0ZpcnN0Q2hpbGQobm9kZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkRmlyc3Qobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZSAhPSBudWxsKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KG5vZGUuUGFyZW50ID09IG51bGwpO1xyXG4gICAgcmV0dXJuIHRoaXMuQWRkRmlyc3RQcml2YXRlKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBBZGRGaXJzdFByaXZhdGUobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgdGhpcy5BZGRMYXN0UHJpdmF0ZShub2RlKTtcclxuICAgIHRoaXMuZmlyc3RDaGlsZCA9IG5vZGU7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgQWRkUHJldmlvdXNJZ25vcmluZ0ZpcnN0Q2hpbGQobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgbm9kZS5wYXJlbnQgPSB0aGlzLlBhcmVudDtcclxuICAgIG5vZGUuY3ljbGljTmV4dCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICBub2RlLmN5Y2xpY1ByZXYgPSB0aGlzLkN5Y2xpY1ByZXY7XHJcbiAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IG5vZGU7XHJcbiAgICB0aGlzLmN5Y2xpY1ByZXYgPSBub2RlO1xyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQWRkTGFzdChub2RlOlROb2RlKTpUTm9kZSB7XHJcbiAgICBjb25zb2xlLmFzc2VydChub2RlICE9IG51bGwpO1xyXG4gICAgY29uc29sZS5hc3NlcnQobm9kZS5QYXJlbnQgPT0gbnVsbCk7XHJcbiAgICByZXR1cm4gdGhpcy5BZGRMYXN0UHJpdmF0ZShub2RlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgQWRkTGFzdFByaXZhdGUobm9kZTpUTm9kZSk6VE5vZGUge1xyXG4gICAgY29uc3Qgc2Vjb25kID0gdGhpcy5GaXJzdENoaWxkO1xyXG4gICAgaWYgKHNlY29uZCA9PSBudWxsKSB7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5UaGlzTm9kZTtcclxuICAgICAgbm9kZS5jeWNsaWNOZXh0ID0gbm9kZTtcclxuICAgICAgbm9kZS5jeWNsaWNQcmV2ID0gbm9kZTtcclxuICAgICAgdGhpcy5maXJzdENoaWxkID0gbm9kZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlY29uZC5BZGRQcmV2aW91c0lnbm9yaW5nRmlyc3RDaGlsZChub2RlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFJlcGxhY2UobmV3Tm9kZTpUTm9kZSk6dm9pZCB7XHJcbiAgICBpZiAodGhpcy5QYXJlbnQgPT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbignQSByb290IG5vZGUgY2Fubm90IGJlIHJlcGxhY2VkLicpO1xyXG4gICAgfVxyXG4gICAgbmV3Tm9kZS5wYXJlbnQgPSB0aGlzLlBhcmVudDtcclxuICAgIG5ld05vZGUuY3ljbGljTmV4dCA9IHRoaXMuQ3ljbGljTmV4dDtcclxuICAgIG5ld05vZGUuY3ljbGljUHJldiA9IHRoaXMuQ3ljbGljUHJldjtcclxuICAgIHRoaXMuQ3ljbGljUHJldi5jeWNsaWNOZXh0ID0gbmV3Tm9kZTsgLy8gcHJldi5uZXh0ID0gbmV3Tm9kZVxyXG4gICAgdGhpcy5DeWNsaWNOZXh0LmN5Y2xpY1ByZXYgPSBuZXdOb2RlO1xyXG4gICAgbmV3Tm9kZS5DeWNsaWNQcmV2LmN5Y2xpY05leHQgPSBuZXdOb2RlO1xyXG4gICAgaWYgKHRoaXMuUGFyZW50LkZpcnN0Q2hpbGQgPT09IDxUTm9kZT48YW55PnRoaXMpIHtcclxuICAgICAgdGhpcy5QYXJlbnQuZmlyc3RDaGlsZCA9IG5ld05vZGU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmN5Y2xpY05leHQgPSBudWxsO1xyXG4gICAgdGhpcy5jeWNsaWNQcmV2ID0gbnVsbDtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBSZW1vdmUoKTp2b2lkIHtcclxuICAgIGlmICh0aGlzLlBhcmVudCA9PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKCdBIHJvb3Qgbm9kZSBjYW5ub3QgYmUgcmVtb3ZlZC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG5leHQgPSB0aGlzLkN5Y2xpY05leHQ7XHJcbiAgICBpZiAobmV4dCAhPT0gPFROb2RlPjxhbnk+dGhpcykge1xyXG4gICAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IG5leHQ7XHJcbiAgICAgIG5leHQuY3ljbGljUHJldiA9IHRoaXMuQ3ljbGljUHJldjtcclxuICAgICAgaWYgKHRoaXMuUGFyZW50LkZpcnN0Q2hpbGQgPT09IDxUTm9kZT48YW55PnRoaXMpIHtcclxuICAgICAgICB0aGlzLlBhcmVudC5maXJzdENoaWxkID0gbmV4dDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5QYXJlbnQuZmlyc3RDaGlsZCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0aGlzLmN5Y2xpY05leHQgPSBudWxsO1xyXG4gICAgdGhpcy5jeWNsaWNQcmV2ID0gbnVsbDtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBSZW1vdmVSZWNvdmVyYWJseSgpIHtcclxuICAgIGlmICh0aGlzLlBhcmVudCA9PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKCdBIHJvb3Qgbm9kZSBjYW5ub3QgYmUgcmVtb3ZlZC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG5leHQgPSB0aGlzLkN5Y2xpY05leHQ7XHJcbiAgICBpZiAobmV4dCAhPT0gPFROb2RlPjxhbnk+dGhpcykge1xyXG4gICAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IG5leHQ7XHJcbiAgICAgIG5leHQuY3ljbGljUHJldiA9IHRoaXMuQ3ljbGljUHJldjtcclxuICAgICAgaWYgKHRoaXMuUGFyZW50LkZpcnN0Q2hpbGQgPT09IDxUTm9kZT48YW55PnRoaXMpIHtcclxuICAgICAgICB0aGlzLlBhcmVudC5maXJzdENoaWxkID0gbmV4dDtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgbmV4dC5QYXJlbnQuZmlyc3RDaGlsZCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICAgICAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICAgICAgICBuZXh0LmN5Y2xpY1ByZXYgPSB0aGlzLlRoaXNOb2RlO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICB0aGlzLkN5Y2xpY1ByZXYuY3ljbGljTmV4dCA9IHRoaXMuVGhpc05vZGU7XHJcbiAgICAgICAgbmV4dC5jeWNsaWNQcmV2ID0gdGhpcy5UaGlzTm9kZTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuUGFyZW50O1xyXG4gICAgcGFyZW50LmZpcnN0Q2hpbGQgPSBudWxsO1xyXG4gICAgcmV0dXJuICgpID0+IHsgcGFyZW50LmZpcnN0Q2hpbGQgPSB0aGlzLlRoaXNOb2RlOyB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvU3RyaW5nKCk6c3RyaW5nIHtcclxuICAgIGNvbnN0IGJ1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgdGhpcy5Ub1N0cmluZ1ByaXZhdGUodGhpcy5UaGlzTm9kZSwgMCwgYnVpbGRlcik7XHJcbiAgICByZXR1cm4gYnVpbGRlci50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBUb1N0cmluZ1ByaXZhdGUobm9kZTpUTm9kZSxkZXB0aDpudW1iZXIsIGJ1aWxkZXI6U3RyaW5nQnVpbGRlcik6dm9pZCAge1xyXG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlcHRoOyBpKyspIHtcclxuICAgICAgYnVpbGRlci5hcHBlbmQoJyAgJyk7XHJcbiAgICB9XHJcbiAgICBidWlsZGVyLmFwcGVuZExpbmUoIW5vZGUuVmFsdWUgIT0gbnVsbCA/IG5vZGUuVmFsdWUudG9TdHJpbmcoKSA6ICcnKTtcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5DaGlsZHJlbigpO1xyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIHRoaXMuVG9TdHJpbmdQcml2YXRlKGNoaWxkLCBkZXB0aCArIDEsIGJ1aWxkZXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Ob2RlLnRzIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqIEJhc2VkIHVwb246IGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvU3lzdGVtLkV4Y2VwdGlvbiUyOHY9dnMuMTEwJTI5LmFzcHhcbiAqL1xuY29uc3QgTkFNRSA9ICdFeGNlcHRpb24nO1xuLyoqXG4gKiBSZXByZXNlbnRzIGVycm9ycyB0aGF0IG9jY3VyIGR1cmluZyBhcHBsaWNhdGlvbiBleGVjdXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBFeGNlcHRpb24ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBFeGNlcHRpb24gY2xhc3Mgd2l0aCBhIHNwZWNpZmllZCBlcnJvciBtZXNzYWdlIGFuZCBvcHRpb25hbGx5IGEgcmVmZXJlbmNlIHRvIHRoZSBpbm5lciBleGNlcHRpb24gdGhhdCBpcyB0aGUgY2F1c2Ugb2YgdGhpcyBleGNlcHRpb24uXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0gaW5uZXJFeGNlcHRpb25cbiAgICAgKiBAcGFyYW0gYmVmb3JlU2VhbGluZyBUaGlzIGRlbGVnYXRlIGlzIHVzZWQgdG8gYWxsb3cgYWN0aW9ucyB0byBvY2N1ciBqdXN0IGJlZm9yZSB0aGlzIGNvbnN0cnVjdG9yIGZpbmlzaGVzLiAgU2luY2Ugc29tZSBjb21waWxlcnMgZG8gbm90IGFsbG93IHRoZSB1c2Ugb2YgJ3RoaXMnIGJlZm9yZSBzdXBlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbiwgYmVmb3JlU2VhbGluZykge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgdGhpcy5uYW1lID0gXy5nZXROYW1lKCk7XG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgICAgICBpZiAoaW5uZXJFeGNlcHRpb24pXG4gICAgICAgICAgICBfLmRhdGFbJ2lubmVyRXhjZXB0aW9uJ10gPSBpbm5lckV4Y2VwdGlvbjtcbiAgICAgICAgLyogT3JpZ2luYWxseSBpbnRlbmRlZCB0byB1c2UgJ2dldCcgYWNjZXNzb3JzIGZvciBwcm9wZXJ0aWVzLFxuICAgICAgICAgKiBCdXQgZGVidWdnZXJzIGRvbid0IGRpc3BsYXkgdGhlc2UgcmVhZGlseSB5ZXQuXG4gICAgICAgICAqIE9iamVjdC5mcmVlemUgaGFzIHRvIGJlIHVzZWQgY2FyZWZ1bGx5LCBidXQgd2lsbCBwcmV2ZW50IG92ZXJyaWRpbmcgdmFsdWVzIGF0IHJ1bnRpbWUuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoYmVmb3JlU2VhbGluZylcbiAgICAgICAgICAgIGJlZm9yZVNlYWxpbmcoXyk7XG4gICAgICAgIC8vIE5vZGUgaGFzIGEgLnN0YWNrLCBsZXQncyB1c2UgaXQuLi5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzdGFjayA9IGV2YWwoXCJuZXcgRXJyb3IoKVwiKS5zdGFjaztcbiAgICAgICAgICAgIHN0YWNrID0gc3RhY2tcbiAgICAgICAgICAgICAgICAmJiBzdGFja1xuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXkVycm9yXFxuLywgJycpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oLnxcXG4pK1xccythdCBuZXcuKy8sICcnKVxuICAgICAgICAgICAgICAgIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5zdGFjayA9IF8udG9TdHJpbmdXaXRob3V0QnJhY2tldHMoKSArIHN0YWNrO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkgeyB9XG4gICAgICAgIE9iamVjdC5mcmVlemUoXyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciB0eXBlLlxuICAgICAqIFRoZSBkZWZhdWx0IGlzICdFcnJvcicuXG4gICAgICovXG4gICAgZ2V0TmFtZSgpIHsgcmV0dXJuIE5BTUU7IH1cbiAgICAvKipcbiAgICAgKiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBFeGNlcHRpb24gaW5zdGFuY2UuXG4gICAgICovXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgWyR7dGhpcy50b1N0cmluZ1dpdGhvdXRCcmFja2V0cygpfV1gO1xuICAgIH1cbiAgICB0b1N0cmluZ1dpdGhvdXRCcmFja2V0cygpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IG0gPSBfLm1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBfLm5hbWUgKyAobSA/ICgnOiAnICsgbSkgOiAnJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZGF0YSBvYmplY3QuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrKSlcbiAgICAgICAgICAgICAgICBkZWxldGUgZGF0YVtrXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV4Y2VwdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0V4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUYXNrSGFuZGxlckJhc2UgfSBmcm9tIFwiLi9UYXNrSGFuZGxlckJhc2VcIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5leHBvcnQgY2xhc3MgVGFza0hhbmRsZXIgZXh0ZW5kcyBUYXNrSGFuZGxlckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKF9hY3Rpb24pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYWN0aW9uID0gX2FjdGlvbjtcbiAgICAgICAgaWYgKCFfYWN0aW9uKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignYWN0aW9uJyk7XG4gICAgfVxuICAgIF9vbkV4ZWN1dGUoKSB7XG4gICAgICAgIHRoaXMuX2FjdGlvbigpO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2FjdGlvbiA9IG51bGw7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVGFza0hhbmRsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYXNrSGFuZGxlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1RocmVhZGluZy9UYXNrcy9UYXNrSGFuZGxlci5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBEaXNwb3NhYmxlQmFzZSB9IGZyb20gXCIuLi8uLi9EaXNwb3NhYmxlL0Rpc3Bvc2FibGVCYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IE5BTUUgPSBcIlRhc2tIYW5kbGVyQmFzZVwiO1xuLyoqXG4gKiBBIHNpbXBsZSBjbGFzcyBmb3IgaGFuZGxpbmcgcG90ZW50aWFsbHkgcmVwZWF0ZWQgZXhlY3V0aW9ucyBlaXRoZXIgZGVmZXJyZWQgb3IgaW1tZWRpYXRlLlxuICovXG5leHBvcnQgY2xhc3MgVGFza0hhbmRsZXJCYXNlIGV4dGVuZHMgRGlzcG9zYWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlT2JqZWN0TmFtZSA9IE5BTUU7XG4gICAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IDAgLyogQ3JlYXRlZCAqLztcbiAgICB9XG4gICAgZ2V0IGlzU2NoZWR1bGVkKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl90aW1lb3V0SWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjaGVkdWxlcy9SZXNjaGVkdWxlcyB0cmlnZ2VyaW5nIHRoZSB0YXNrLlxuICAgICAqIEBwYXJhbSBkZWZlciBPcHRpb25hbCB0aW1lIHRvIHdhaXQgdW50aWwgdHJpZ2dlcmluZy5cbiAgICAgKi9cbiAgICBzdGFydChkZWZlciA9IDApIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gMSAvKiBXYWl0aW5nVG9SdW4gKi87XG4gICAgICAgIGlmICghKGRlZmVyID4gMCkpXG4gICAgICAgICAgICBkZWZlciA9IDA7IC8vIEEgbmVnYXRpb24gaXMgdXNlZCB0byBjYXRjaCBlZGdlIGNhc2VzLlxuICAgICAgICBpZiAoaXNGaW5pdGUoZGVmZXIpKVxuICAgICAgICAgICAgdGhpcy5fdGltZW91dElkID0gc2V0VGltZW91dChUYXNrSGFuZGxlckJhc2UuX2hhbmRsZXIsIGRlZmVyLCB0aGlzKTtcbiAgICB9XG4gICAgcnVuU3luY2hyb25vdXNseSgpIHtcbiAgICAgICAgdGhpcy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgVGFza0hhbmRsZXJCYXNlLl9oYW5kbGVyKHRoaXMpO1xuICAgIH1cbiAgICBnZXRTdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXM7XG4gICAgfVxuICAgIGdldCBzdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YXR1cygpO1xuICAgIH1cbiAgICAvLyBVc2UgYSBzdGF0aWMgZnVuY3Rpb24gaGVyZSB0byBhdm9pZCByZWNyZWF0aW5nIGEgbmV3IGZ1bmN0aW9uIGV2ZXJ5IHRpbWUuXG4gICAgc3RhdGljIF9oYW5kbGVyKGQpIHtcbiAgICAgICAgZC5jYW5jZWwoKTtcbiAgICAgICAgZC5fc3RhdHVzID0gMiAvKiBSdW5uaW5nICovO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZC5fb25FeGVjdXRlKCk7XG4gICAgICAgICAgICBkLl9zdGF0dXMgPSAzIC8qIFJhblRvQ29tcGxldGlvbiAqLztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIGQuX3N0YXR1cyA9IDUgLyogRmF1bHRlZCAqLztcbiAgICAgICAgfVxuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSBudWxsO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5fdGltZW91dElkO1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHVzID0gNCAvKiBDYW5jZWxsZWQgKi87XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVGFza0hhbmRsZXJCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFza0hhbmRsZXJCYXNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vVGhyZWFkaW5nL1Rhc2tzL1Rhc2tIYW5kbGVyQmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIE9yaWdpbmFsOiBodHRwOi8vbGlucWpzLmNvZGVwbGV4LmNvbS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBhcmVFcXVhbCB9IGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5pbXBvcnQgeyBFbnVtZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yQmFzZVwiO1xuaW1wb3J0IHsgTGlua2VkTm9kZUxpc3QgfSBmcm9tIFwiLi4vTGlua2VkTm9kZUxpc3RcIjtcbmltcG9ydCB7IE9iamVjdFBvb2wgfSBmcm9tIFwiLi4vLi4vRGlzcG9zYWJsZS9PYmplY3RQb29sXCI7XG5pbXBvcnQgeyBnZXRJZGVudGlmaWVyIH0gZnJvbSBcIi4vZ2V0SWRlbnRpZmllclwiO1xuaW1wb3J0IERpY3Rpb25hcnlCYXNlIGZyb20gXCIuL0RpY3Rpb25hcnlCYXNlXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuLy8gTGlua2VkTGlzdCBmb3IgRGljdGlvbmFyeVxuY2xhc3MgSGFzaEVudHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihrZXksIHZhbHVlLCBwcmV2aW91cywgbmV4dCkge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByZXZpb3VzID0gcHJldmlvdXM7XG4gICAgICAgIHRoaXMubmV4dCA9IG5leHQ7XG4gICAgfVxufVxubGV0IGxpbmtlZExpc3RQb29sO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmZ1bmN0aW9uIGxpbmtlZE5vZGVMaXN0KHJlY3ljbGUpIHtcbiAgICBpZiAoIWxpbmtlZExpc3RQb29sKVxuICAgICAgICBsaW5rZWRMaXN0UG9vbFxuICAgICAgICAgICAgPSBuZXcgT2JqZWN0UG9vbCgyMCwgKCkgPT4gbmV3IExpbmtlZE5vZGVMaXN0KCksIHIgPT4gci5jbGVhcigpKTtcbiAgICBpZiAoIXJlY3ljbGUpXG4gICAgICAgIHJldHVybiBsaW5rZWRMaXN0UG9vbC50YWtlKCk7XG4gICAgbGlua2VkTGlzdFBvb2wuYWRkKHJlY3ljbGUpO1xufVxuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnkgZXh0ZW5kcyBEaWN0aW9uYXJ5QmFzZSB7XG4gICAgY29uc3RydWN0b3IoX2tleUdlbmVyYXRvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9rZXlHZW5lcmF0b3IgPSBfa2V5R2VuZXJhdG9yO1xuICAgICAgICB0aGlzLl9lbnRyaWVzID0gbGlua2VkTm9kZUxpc3QoKTtcbiAgICAgICAgdGhpcy5fYnVja2V0cyA9IHt9O1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBfLl9lbnRyaWVzID0gbnVsbDtcbiAgICAgICAgXy5fYnVja2V0cyA9IG51bGw7XG4gICAgICAgIF8uX2hhc2hHZW5lcmF0b3IgPSBudWxsO1xuICAgIH1cbiAgICBnZXRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudHJpZXMgJiYgdGhpcy5fZW50cmllcy51bnNhZmVDb3VudCB8fCAwO1xuICAgIH1cbiAgICBfZ2V0QnVja2V0KGhhc2gsIGNyZWF0ZUlmTWlzc2luZykge1xuICAgICAgICBpZiAoaGFzaCA9PSBudWxsIHx8ICFjcmVhdGVJZk1pc3NpbmcgJiYgIXRoaXMuZ2V0Q291bnQoKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoIVR5cGUuaXNQcmltaXRpdmVPclN5bWJvbChoYXNoKSlcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIktleSB0eXBlIG5vdCBpbmRleGFibGUgYW5kIGNvdWxkIGNhdXNlIERpY3Rpb25hcnkgdG8gYmUgZXh0cmVtZWx5IHNsb3cuXCIpO1xuICAgICAgICBjb25zdCBidWNrZXRzID0gdGhpcy5fYnVja2V0cztcbiAgICAgICAgbGV0IGJ1Y2tldCA9IGJ1Y2tldHNbaGFzaF07XG4gICAgICAgIGlmIChjcmVhdGVJZk1pc3NpbmcgJiYgIWJ1Y2tldClcbiAgICAgICAgICAgIGJ1Y2tldHNbaGFzaF1cbiAgICAgICAgICAgICAgICA9IGJ1Y2tldFxuICAgICAgICAgICAgICAgICAgICA9IGxpbmtlZE5vZGVMaXN0KCk7XG4gICAgICAgIHJldHVybiBidWNrZXQgfHwgbnVsbDtcbiAgICB9XG4gICAgX2dldEJ1Y2tldEVudHJ5KGtleSwgaGFzaCwgYnVja2V0KSB7XG4gICAgICAgIGlmIChrZXkgPT0gbnVsbCB8fCAhdGhpcy5nZXRDb3VudCgpKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzLCBjb21wYXJlciA9IF8uX2tleUdlbmVyYXRvciwgY29tcGFyZUtleSA9IGNvbXBhcmVyID8gY29tcGFyZXIoa2V5KSA6IGtleTtcbiAgICAgICAgaWYgKCFidWNrZXQpXG4gICAgICAgICAgICBidWNrZXQgPSBfLl9nZXRCdWNrZXQoaGFzaCB8fCBnZXRJZGVudGlmaWVyKGNvbXBhcmVLZXkpKTtcbiAgICAgICAgcmV0dXJuIGJ1Y2tldFxuICAgICAgICAgICAgJiYgKGNvbXBhcmVyXG4gICAgICAgICAgICAgICAgPyBidWNrZXQuZmluZChlID0+IGNvbXBhcmVyKGUua2V5KSA9PT0gY29tcGFyZUtleSlcbiAgICAgICAgICAgICAgICA6IGJ1Y2tldC5maW5kKGUgPT4gZS5rZXkgPT09IGNvbXBhcmVLZXkpKTtcbiAgICB9XG4gICAgX2dldEVudHJ5KGtleSkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5fZ2V0QnVja2V0RW50cnkoa2V5KTtcbiAgICAgICAgcmV0dXJuIGUgJiYgZS52YWx1ZTtcbiAgICB9XG4gICAgZ2V0VmFsdWUoa2V5KSB7XG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLl9nZXRFbnRyeShrZXkpO1xuICAgICAgICByZXR1cm4gZSA/IGUudmFsdWUgOiBWT0lEMDtcbiAgICB9XG4gICAgX3NldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3QgYnVja2V0cyA9IF8uX2J1Y2tldHMsIGVudHJpZXMgPSBfLl9lbnRyaWVzLCBjb21wYXJlS2V5ID0gXy5fa2V5R2VuZXJhdG9yID8gXy5fa2V5R2VuZXJhdG9yKGtleSkgOiBrZXksIGhhc2ggPSBnZXRJZGVudGlmaWVyKGNvbXBhcmVLZXkpO1xuICAgICAgICBsZXQgYnVja2V0ID0gXy5fZ2V0QnVja2V0KGhhc2gpO1xuICAgICAgICBjb25zdCBidWNrZXRFbnRyeSA9IGJ1Y2tldCAmJiBfLl9nZXRCdWNrZXRFbnRyeShrZXksIGhhc2gsIGJ1Y2tldCk7XG4gICAgICAgIC8vIEVudHJ5IGV4aXRzPyBEZWxldGUgb3IgdXBkYXRlXG4gICAgICAgIGlmIChidWNrZXRFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgYiA9IGJ1Y2tldDtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gVk9JRDApIHtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGIucmVtb3ZlTm9kZShidWNrZXRFbnRyeSksIHkgPSBlbnRyaWVzLnJlbW92ZU5vZGUoYnVja2V0RW50cnkudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICh4ICYmICFiLmNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBidWNrZXRzW2hhc2hdO1xuICAgICAgICAgICAgICAgICAgICBsaW5rZWROb2RlTGlzdChiKTtcbiAgICAgICAgICAgICAgICAgICAgYnVja2V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHggIT09IHkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiRW50cmllcyBhbmQgYnVja2V0cyBhcmUgb3V0IG9mIHN5bmMuXCI7XG4gICAgICAgICAgICAgICAgaWYgKHgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgZXhwb3NlIHRoZSBpbnRlcm5hbCBoYXNoIGVudHJpZXMgc28gcmVwbGFjaW5nIHRoZSB2YWx1ZSBpcyBvay5cbiAgICAgICAgICAgICAgICBjb25zdCBvbGQgPSBidWNrZXRFbnRyeS52YWx1ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICBidWNrZXRFbnRyeS52YWx1ZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiAhYXJlRXF1YWwodmFsdWUsIG9sZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgIT09IFZPSUQwKSB7XG4gICAgICAgICAgICBpZiAoIWJ1Y2tldClcbiAgICAgICAgICAgICAgICBidWNrZXQgPSBfLl9nZXRCdWNrZXQoaGFzaCwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoIWJ1Y2tldClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHtoYXNofVwiIGNhbm5vdCBiZSBhZGRlZCB0byBsb29rdXAgdGFibGUuYCk7XG4gICAgICAgICAgICBsZXQgZW50cnkgPSBuZXcgSGFzaEVudHJ5KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgZW50cmllcy5hZGROb2RlKGVudHJ5KTtcbiAgICAgICAgICAgIGJ1Y2tldC5hZGROb2RlKG5ldyBIYXNoRW50cnkoa2V5LCBlbnRyeSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfY2xlYXJJbnRlcm5hbCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGJ1Y2tldHMgPSBfLl9idWNrZXRzO1xuICAgICAgICAvLyBFbnN1cmUgcmVzZXQgYW5kIGNsZWFuLi4uXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBidWNrZXRzKSB7XG4gICAgICAgICAgICBpZiAoYnVja2V0cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJ1Y2tldCA9IGJ1Y2tldHNba2V5XTtcbiAgICAgICAgICAgICAgICBkZWxldGUgYnVja2V0c1trZXldO1xuICAgICAgICAgICAgICAgIGxpbmtlZE5vZGVMaXN0KGJ1Y2tldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8uX2VudHJpZXMuY2xlYXIoKTtcbiAgICB9XG4gICAgLypcbiAgICAgKiBOb3RlOiBzdXBlci5nZXRFbnVtZXJhdG9yKCkgd29ya3MgcGVyZmVjdGx5IHdlbGwsXG4gICAgICogYnV0IGVudW1lcmF0aW5nIHRoZSBpbnRlcm5hbCBsaW5rZWQgbm9kZSBsaXN0IGlzIG11Y2ggbW9yZSBlZmZpY2llbnQuXG4gICAgICovXG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8udGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGxldCB2ZXIsIGN1cnJlbnRFbnRyeTtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgdmVyID0gXy5fdmVyc2lvbjtcbiAgICAgICAgICAgIGN1cnJlbnRFbnRyeSA9IF8uX2VudHJpZXMuZmlyc3Q7XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoY3VycmVudEVudHJ5KSB7XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgICAgICBfLmFzc2VydFZlcnNpb24odmVyKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IGtleTogY3VycmVudEVudHJ5LmtleSwgdmFsdWU6IGN1cnJlbnRFbnRyeS52YWx1ZSB9O1xuICAgICAgICAgICAgICAgIGN1cnJlbnRFbnRyeSA9IGN1cnJlbnRFbnRyeS5uZXh0IHx8IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4ocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldEtleXMoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IGUgPSBfLl9lbnRyaWVzICYmIF8uX2VudHJpZXMuZmlyc3Q7XG4gICAgICAgIHdoaWxlIChlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChlLmtleSk7XG4gICAgICAgICAgICBlID0gZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGdldFZhbHVlcygpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgZSA9IF8uX2VudHJpZXMgJiYgXy5fZW50cmllcy5maXJzdDtcbiAgICAgICAgd2hpbGUgKGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGUudmFsdWUpO1xuICAgICAgICAgICAgZSA9IGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IERpY3Rpb25hcnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaWN0aW9uYXJ5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRGljdGlvbmFyaWVzL0RpY3Rpb25hcnkuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSBcIi4uL1RleHQvVXRpbGl0eVwiO1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50RXhjZXB0aW9uIH0gZnJvbSBcIi4uL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yQmFzZVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIElNUE9SVEFOVCBOT1RFUyBBQk9VVCBQRVJGT1JNQU5DRTpcbiAqIGh0dHA6Ly9qc3BlcmYuY29tL3NpbXVsYXRpbmctYS1xdWV1ZVxuICpcbiAqIEFkZGluZyB0byBhbiBhcnJheSBpcyB2ZXJ5IGZhc3QsIGJ1dCBtb2RpZnlpbmcgaXMgc2xvdy5cbiAqIExpbmtlZExpc3Qgd2lucyB3aGVuIG1vZGlmeWluZyBjb250ZW50cy5cbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY2ODg0L2FycmF5LXZlcnN1cy1saW5rZWQtbGlzdFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWZ1bCBmb3IgbWFuYWdpbmcgYSBsaXN0IG9mIGxpbmtlZCBub2RlcywgYnV0IGl0IGRvZXMgbm90IHByb3RlY3QgYWdhaW5zdCBtb2RpZnlpbmcgaW5kaXZpZHVhbCBsaW5rcy5cbiAqIElmIHRoZSBjb25zdW1lciBtb2RpZmllcyBhIGxpbmsgKHNldHMgdGhlIHByZXZpb3VzIG9yIG5leHQgdmFsdWUpIGl0IHdpbGwgZWZmZWN0aXZlbHkgYnJlYWsgdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogSXQgaXMgcG9zc2libGUgdG8gZGVjbGFyZSBhIG5vZGUgdHlwZSBvZiBhbnkga2luZCBhcyBsb25nIGFzIGl0IGNvbnRhaW5zIGEgcHJldmlvdXMgYW5kIG5leHQgdmFsdWUgdGhhdCBjYW4gcmVmZXJlbmNlIGFub3RoZXIgbm9kZS5cbiAqIEFsdGhvdWdoIG5vdCBhcyBzYWZlIGFzIHRoZSBpbmNsdWRlZCBMaW5rZWRMaXN0LCB0aGlzIGNsYXNzIGhhcyBsZXNzIG92ZXJoZWFkIGFuZCBpcyBtb3JlIGZsZXhpYmxlLlxuICpcbiAqIFRoZSBjb3VudCAob3IgbGVuZ3RoKSBvZiB0aGlzIExpbmtlZE5vZGVMaXN0IGlzIG5vdCB0cmFja2VkIHNpbmNlIGl0IGNvdWxkIGJlIGNvcnJ1cHRlZCBhdCBhbnkgdGltZS5cbiAqL1xuZXhwb3J0IGNsYXNzIExpbmtlZE5vZGVMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZmlyc3QgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy51bnNhZmVDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX3ZlcnNpb24gPSAwO1xuICAgIH1cbiAgICBhc3NlcnRWZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgaWYgKHZlcnNpb24gIT09IHRoaXMuX3ZlcnNpb24pXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkNvbGxlY3Rpb24gd2FzIG1vZGlmaWVkLlwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBmaXJzdCBub2RlLiAgV2lsbCBiZSBudWxsIGlmIHRoZSBjb2xsZWN0aW9uIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIGdldCBmaXJzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbGFzdCBub2RlLlxuICAgICAqL1xuICAgIGdldCBsYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSXRlcmF0aXZlbHkgY291bnRzIHRoZSBudW1iZXIgb2YgbGlua2VkIG5vZGVzIGFuZCByZXR1cm5zIHRoZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBjb3VudCgpIHtcbiAgICAgICAgbGV0IG5leHQgPSB0aGlzLl9maXJzdDtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAobmV4dCkge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgbmV4dCA9IG5leHQubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24sIGlnbm9yZVZlcnNpb25pbmcpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBjdXJyZW50ID0gbnVsbCwgbmV4dCA9IF8uZmlyc3Q7IC8vIEJlIHN1cmUgdG8gdHJhY2sgdGhlIG5leHQgbm9kZSBzbyBpZiBjdXJyZW50IG5vZGUgaXMgcmVtb3ZlZC5cbiAgICAgICAgY29uc3QgdmVyc2lvbiA9IF8uX3ZlcnNpb247XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICghaWdub3JlVmVyc2lvbmluZylcbiAgICAgICAgICAgICAgICBfLmFzc2VydFZlcnNpb24odmVyc2lvbik7XG4gICAgICAgICAgICBjdXJyZW50ID0gbmV4dDtcbiAgICAgICAgICAgIG5leHQgPSBjdXJyZW50ICYmIGN1cnJlbnQubmV4dDtcbiAgICAgICAgfSB3aGlsZSAoY3VycmVudFxuICAgICAgICAgICAgJiYgYWN0aW9uKGN1cnJlbnQsIGluZGV4KyspICE9PSBmYWxzZSk7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgbWFwKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICghc2VsZWN0b3IpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdzZWxlY3RvcicpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKChub2RlLCBpKSA9PiB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChzZWxlY3Rvcihub2RlLCBpKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFcmFzZXMgdGhlIGxpbmtlZCBub2RlJ3MgcmVmZXJlbmNlcyB0byBlYWNoIG90aGVyIGFuZCByZXR1cm5zIHRoZSBudW1iZXIgb2Ygbm9kZXMuXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGxldCBuLCBjRiA9IDAsIGNMID0gMDtcbiAgICAgICAgLy8gRmlyc3QsIGNsZWFyIGluIHRoZSBmb3J3YXJkIGRpcmVjdGlvbi5cbiAgICAgICAgbiA9IF8uX2ZpcnN0O1xuICAgICAgICBfLl9maXJzdCA9IG51bGw7XG4gICAgICAgIHdoaWxlIChuKSB7XG4gICAgICAgICAgICBjRisrO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBuO1xuICAgICAgICAgICAgbiA9IG4ubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTGFzdCwgY2xlYXIgaW4gdGhlIHJldmVyc2UgZGlyZWN0aW9uLlxuICAgICAgICBuID0gXy5fbGFzdDtcbiAgICAgICAgXy5fbGFzdCA9IG51bGw7XG4gICAgICAgIHdoaWxlIChuKSB7XG4gICAgICAgICAgICBjTCsrO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBuO1xuICAgICAgICAgICAgbiA9IG4ucHJldmlvdXM7XG4gICAgICAgICAgICBjdXJyZW50LnByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY0YgIT09IGNMKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdMaW5rZWROb2RlTGlzdDogRm9yd2FyZCB2ZXJzdXMgcmV2ZXJzZSBjb3VudCBkb2VzIG5vdCBtYXRjaCB3aGVuIGNsZWFyaW5nLiBGb3J3YXJkOiAnICsgY0YgKyBcIiwgUmV2ZXJzZTogXCIgKyBjTCk7XG4gICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgXy51bnNhZmVDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiBjRjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBsaXN0LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhlIGxpc3QgdG8gc2VlIGlmIGEgbm9kZSBleGlzdHMuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjb250YWlucyhub2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4T2Yobm9kZSkgIT0gLTE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGluZGV4IG9mIGEgcGFydGljdWxhciBub2RlLlxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqL1xuICAgIGdldE5vZGVBdChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBuZXh0ID0gdGhpcy5fZmlyc3Q7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKG5leHQgJiYgaSsrIDwgaW5kZXgpIHtcbiAgICAgICAgICAgIG5leHQgPSBuZXh0Lm5leHQgfHwgbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICB9XG4gICAgZmluZChjb25kaXRpb24pIHtcbiAgICAgICAgbGV0IG5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmZvckVhY2goKG4sIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kaXRpb24obiwgaSkpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhlIGxpc3QgdG8gZmluZCB0aGUgc3BlY2lmaWVkIG5vZGUgYW5kIHJldHVybnMgaXRzIGluZGV4LlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaW5kZXhPZihub2RlKSB7XG4gICAgICAgIGlmIChub2RlICYmIChub2RlLnByZXZpb3VzIHx8IG5vZGUubmV4dCkpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICBsZXQgYywgbiA9IHRoaXMuX2ZpcnN0O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGMgPSBuO1xuICAgICAgICAgICAgICAgIGlmIChjID09PSBub2RlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIH0gd2hpbGUgKChuID0gYyAmJiBjLm5leHQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGZpcnN0IG5vZGUgYW5kIHJldHVybnMgdHJ1ZSBpZiBzdWNjZXNzZnVsLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHJlbW92ZUZpcnN0KCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9maXJzdCAmJiB0aGlzLnJlbW92ZU5vZGUodGhpcy5fZmlyc3QpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBsYXN0IG5vZGUgYW5kIHJldHVybnMgdHJ1ZSBpZiBzdWNjZXNzZnVsLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHJlbW92ZUxhc3QoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2xhc3QgJiYgdGhpcy5yZW1vdmVOb2RlKHRoaXMuX2xhc3QpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgbm9kZS5cbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgc3VjY2Vzc2Z1bCBhbmQgZmFsc2UgaWYgbm90IGZvdW5kIChhbHJlYWR5IHJlbW92ZWQpLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdub2RlJyk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBwcmV2ID0gbm9kZS5wcmV2aW91cyB8fCBudWxsLCBuZXh0ID0gbm9kZS5uZXh0IHx8IG51bGw7XG4gICAgICAgIGxldCBhID0gZmFsc2UsIGIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXh0O1xuICAgICAgICBlbHNlIGlmIChfLl9maXJzdCA9PSBub2RlKVxuICAgICAgICAgICAgXy5fZmlyc3QgPSBuZXh0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBhID0gdHJ1ZTtcbiAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICBuZXh0LnByZXZpb3VzID0gcHJldjtcbiAgICAgICAgZWxzZSBpZiAoXy5fbGFzdCA9PSBub2RlKVxuICAgICAgICAgICAgXy5fbGFzdCA9IHByZXY7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGIgPSB0cnVlO1xuICAgICAgICBpZiAoYSAhPT0gYikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCdub2RlJywgZm9ybWF0KFwiUHJvdmlkZWQgbm9kZSBpcyBoYXMgbm8gezB9IHJlZmVyZW5jZSBidXQgaXMgbm90IHRoZSB7MX0gbm9kZSFcIiwgYSA/IFwicHJldmlvdXNcIiA6IFwibmV4dFwiLCBhID8gXCJmaXJzdFwiIDogXCJsYXN0XCIpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW1vdmVkID0gIWEgJiYgIWI7XG4gICAgICAgIGlmIChyZW1vdmVkKSB7XG4gICAgICAgICAgICBfLl92ZXJzaW9uKys7XG4gICAgICAgICAgICBfLnVuc2FmZUNvdW50LS07XG4gICAgICAgICAgICBub2RlLnByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgICAgIG5vZGUubmV4dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBub2RlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3QuXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcmV0dXJucyB7TGlua2VkTm9kZUxpc3R9XG4gICAgICovXG4gICAgYWRkTm9kZShub2RlKSB7XG4gICAgICAgIHRoaXMuYWRkTm9kZUFmdGVyKG5vZGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5vZGUgYmVmb3JlIHRoZSBzcGVjaWZpZWQgJ2JlZm9yZScgbm9kZS5cbiAgICAgKiBJZiBubyAnYmVmb3JlJyBub2RlIGlzIHNwZWNpZmllZCwgaXQgaW5zZXJ0cyBpdCBhcyB0aGUgZmlyc3Qgbm9kZS5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEBwYXJhbSBiZWZvcmVcbiAgICAgKiBAcmV0dXJucyB7TGlua2VkTm9kZUxpc3R9XG4gICAgICovXG4gICAgYWRkTm9kZUJlZm9yZShub2RlLCBiZWZvcmUgPSBudWxsKSB7XG4gICAgICAgIGFzc2VydFZhbGlkRGV0YWNoZWQobm9kZSk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoIWJlZm9yZSkge1xuICAgICAgICAgICAgYmVmb3JlID0gXy5fZmlyc3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJlZm9yZSkge1xuICAgICAgICAgICAgbGV0IHByZXYgPSBiZWZvcmUucHJldmlvdXM7XG4gICAgICAgICAgICBub2RlLnByZXZpb3VzID0gcHJldjtcbiAgICAgICAgICAgIG5vZGUubmV4dCA9IGJlZm9yZTtcbiAgICAgICAgICAgIGJlZm9yZS5wcmV2aW91cyA9IG5vZGU7XG4gICAgICAgICAgICBpZiAocHJldilcbiAgICAgICAgICAgICAgICBwcmV2Lm5leHQgPSBub2RlO1xuICAgICAgICAgICAgaWYgKGJlZm9yZSA9PSBfLl9maXJzdClcbiAgICAgICAgICAgICAgICBfLl9maXJzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfLl9maXJzdCA9IF8uX2xhc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgXy51bnNhZmVDb3VudCsrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5vZGUgYWZ0ZXIgdGhlIHNwZWNpZmllZCAnYWZ0ZXInIG5vZGUuXG4gICAgICogSWYgbm8gJ2FmdGVyJyBub2RlIGlzIHNwZWNpZmllZCwgaXQgYXBwZW5kcyBpdCBhcyB0aGUgbGFzdCBub2RlLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHBhcmFtIGFmdGVyXG4gICAgICogQHJldHVybnMge0xpbmtlZE5vZGVMaXN0fVxuICAgICAqL1xuICAgIGFkZE5vZGVBZnRlcihub2RlLCBhZnRlciA9IG51bGwpIHtcbiAgICAgICAgYXNzZXJ0VmFsaWREZXRhY2hlZChub2RlKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghYWZ0ZXIpIHtcbiAgICAgICAgICAgIGFmdGVyID0gXy5fbGFzdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgICAgICAgIGxldCBuZXh0ID0gYWZ0ZXIubmV4dDtcbiAgICAgICAgICAgIG5vZGUubmV4dCA9IG5leHQ7XG4gICAgICAgICAgICBub2RlLnByZXZpb3VzID0gYWZ0ZXI7XG4gICAgICAgICAgICBhZnRlci5uZXh0ID0gbm9kZTtcbiAgICAgICAgICAgIGlmIChuZXh0KVxuICAgICAgICAgICAgICAgIG5leHQucHJldmlvdXMgPSBub2RlO1xuICAgICAgICAgICAgaWYgKGFmdGVyID09IF8uX2xhc3QpXG4gICAgICAgICAgICAgICAgXy5fbGFzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfLl9maXJzdCA9IF8uX2xhc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIF8uX3ZlcnNpb24rKztcbiAgICAgICAgXy51bnNhZmVDb3VudCsrO1xuICAgICAgICByZXR1cm4gXztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGFrZXMgYW5kIGV4aXN0aW5nIG5vZGUgYW5kIHJlcGxhY2VzIGl0LlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHBhcmFtIHJlcGxhY2VtZW50XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICByZXBsYWNlKG5vZGUsIHJlcGxhY2VtZW50KSB7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdub2RlJyk7XG4gICAgICAgIGlmIChub2RlID09IHJlcGxhY2VtZW50KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGFzc2VydFZhbGlkRGV0YWNoZWQocmVwbGFjZW1lbnQsICdyZXBsYWNlbWVudCcpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgcmVwbGFjZW1lbnQucHJldmlvdXMgPSBub2RlLnByZXZpb3VzO1xuICAgICAgICByZXBsYWNlbWVudC5uZXh0ID0gbm9kZS5uZXh0O1xuICAgICAgICBpZiAobm9kZS5wcmV2aW91cylcbiAgICAgICAgICAgIG5vZGUucHJldmlvdXMubmV4dCA9IHJlcGxhY2VtZW50O1xuICAgICAgICBpZiAobm9kZS5uZXh0KVxuICAgICAgICAgICAgbm9kZS5uZXh0LnByZXZpb3VzID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgIGlmIChub2RlID09IF8uX2ZpcnN0KVxuICAgICAgICAgICAgXy5fZmlyc3QgPSByZXBsYWNlbWVudDtcbiAgICAgICAgaWYgKG5vZGUgPT0gXy5fbGFzdClcbiAgICAgICAgICAgIF8uX2xhc3QgPSByZXBsYWNlbWVudDtcbiAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICByZXR1cm4gXztcbiAgICB9XG4gICAgc3RhdGljIHZhbHVlRW51bWVyYXRvckZyb20obGlzdCkge1xuICAgICAgICBpZiAoIWxpc3QpXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdsaXN0Jyk7XG4gICAgICAgIGxldCBjdXJyZW50LCBuZXh0LCB2ZXJzaW9uO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgYW5jaG9yLi4uXG4gICAgICAgICAgICBjdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIG5leHQgPSBsaXN0LmZpcnN0O1xuICAgICAgICAgICAgdmVyc2lvbiA9IGxpc3QuX3ZlcnNpb247XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgICAgIGxpc3QuYXNzZXJ0VmVyc2lvbih2ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbmV4dDtcbiAgICAgICAgICAgICAgICBuZXh0ID0gY3VycmVudCAmJiBjdXJyZW50Lm5leHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oY3VycmVudC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgY29weVZhbHVlcyhsaXN0LCBhcnJheSwgaW5kZXggPSAwKSB7XG4gICAgICAgIGlmIChsaXN0ICYmIGxpc3QuZmlyc3QpIHtcbiAgICAgICAgICAgIGlmICghYXJyYXkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignYXJyYXknKTtcbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGFycmF5W2luZGV4ICsgaV0gPSBub2RlLnZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2VydFZhbGlkRGV0YWNoZWQobm9kZSwgcHJvcE5hbWUgPSAnbm9kZScpIHtcbiAgICBpZiAobm9kZSA9PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKHByb3BOYW1lKTtcbiAgICBpZiAobm9kZS5uZXh0IHx8IG5vZGUucHJldmlvdXMpXG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ2Fubm90IGFkZCBhIG5vZGUgdG8gYSBMaW5rZWROb2RlTGlzdCB0aGF0IGlzIGFscmVhZHkgbGlua2VkLlwiKTtcbn1cbmV4cG9ydCBkZWZhdWx0IExpbmtlZE5vZGVMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlua2VkTm9kZUxpc3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9MaW5rZWROb2RlTGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmNvbnN0IE5VTEwgPSBcIm51bGxcIiwgR0VUX1NZTUJPTCA9IFwiZ2V0U3ltYm9sXCIsIEdFVF9IQVNIX0NPREUgPSBcImdldEhhc2hDb2RlXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0SWRlbnRpZmllcihvYmosIHRocm93SWZVbmtub3duID0gZmFsc2UpIHtcbiAgICBpZiAoVHlwZS5pc1Byb3BlcnR5S2V5KG9iaikpXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgaWYgKG9iaiA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIE5VTEw7XG4gICAgaWYgKG9iaiA9PT0gVk9JRDApXG4gICAgICAgIHJldHVybiBUeXBlLlVOREVGSU5FRDtcbiAgICAvLyBTZWUgSVN5bWJvbGl6YWJsZS5cbiAgICBpZiAoVHlwZS5oYXNNZXRob2Qob2JqLCBHRVRfU1lNQk9MKSkge1xuICAgICAgICByZXR1cm4gb2JqLmdldFN5bWJvbCgpO1xuICAgIH1cbiAgICAvLyBTZWUgSUhhc2hhYmxlLlxuICAgIGlmIChUeXBlLmhhc01ldGhvZChvYmosIEdFVF9IQVNIX0NPREUpKSB7XG4gICAgICAgIHJldHVybiBvYmouZ2V0SGFzaENvZGUoKTtcbiAgICB9XG4gICAgaWYgKHRocm93SWZVbmtub3duKSB7XG4gICAgICAgIGlmIChUeXBlLmlzRnVuY3Rpb24odGhyb3dJZlVua25vd24pKVxuICAgICAgICAgICAgcmV0dXJuIHRocm93SWZVbmtub3duKG9iaik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IGNyZWF0ZSBrbm93biBpZGVudGl0eS5cIjtcbiAgICB9XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqLnRvU3RyaW5nID09IFR5cGUuRlVOQ1RJT04pXG4gICAgICAgID8gb2JqLnRvU3RyaW5nKClcbiAgICAgICAgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGdldElkZW50aWZpZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZXRJZGVudGlmaWVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvRGljdGlvbmFyaWVzL2dldElkZW50aWZpZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgYXJlRXF1YWwgfSBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gXCIuLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uQmFzZSB9IGZyb20gXCIuLi9Db2xsZWN0aW9uQmFzZVwiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbmltcG9ydCB7IGV4dHJhY3RLZXlWYWx1ZSB9IGZyb20gXCIuLi8uLi9LZXlWYWx1ZUV4dHJhY3RcIjtcbmltcG9ydCB7IEtleU5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSBcIi4uL0tleU5vdEZvdW5kRXhjZXB0aW9uXCI7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmNvbnN0IFZPSUQwID0gdm9pZCAwO1xuLy8gRGVzaWduIE5vdGU6IFNob3VsZCBEaWN0aW9uYXJ5QWJzdHJhY3RCYXNlIGJlIElEaXNwb3NhYmxlP1xuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnlCYXNlIGV4dGVuZHMgQ29sbGVjdGlvbkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSkge1xuICAgICAgICBzdXBlcihzb3VyY2UpO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIF9vblZhbHVlTW9kaWZpZWQoa2V5LCB2YWx1ZSwgb2xkKSB7XG4gICAgfVxuICAgIF9hZGRJbnRlcm5hbChpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbSlcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2l0ZW0nLCAnRGljdGlvbmFyaWVzIG11c3QgdXNlIGEgdmFsaWQga2V5L3ZhbHVlIHBhaXIuIFxcJycgKyBpdGVtICsgJ1xcJyBpcyBub3QgYWxsb3dlZC4nKTtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RLZXlWYWx1ZShpdGVtLCAoa2V5LCB2YWx1ZSkgPT4gdGhpcy5hZGRCeUtleVZhbHVlKGtleSwgdmFsdWUpKTtcbiAgICB9XG4gICAgX2NsZWFySW50ZXJuYWwoKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgXy5rZXlzKSB7XG4gICAgICAgICAgICBpZiAoXy5yZW1vdmVCeUtleShrZXkpKVxuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cbiAgICBjb250YWlucyhpdGVtKSB7XG4gICAgICAgIC8vIFNob3VsZCBuZXZlciBoYXZlIGEgbnVsbCBvYmplY3QgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgIGlmICghaXRlbSB8fCAhdGhpcy5nZXRDb3VudCgpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gZXh0cmFjdEtleVZhbHVlKGl0ZW0sIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAvLyBMZWF2ZSBhcyB2YXJpYWJsZSBmb3IgZGVidWdnaW5nLi4uXG4gICAgICAgICAgICBsZXQgdiA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBhcmVFcXVhbCh2YWx1ZSwgdik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfcmVtb3ZlSW50ZXJuYWwoaXRlbSkge1xuICAgICAgICBpZiAoIWl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RLZXlWYWx1ZShpdGVtLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gTGVhdmUgYXMgdmFyaWFibGUgZm9yIGRlYnVnZ2luZy4uLlxuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZhbHVlKGtleSk7XG4gICAgICAgICAgICByZXR1cm4gKGFyZUVxdWFsKHZhbHVlLCB2KSAmJiB0aGlzLnJlbW92ZUJ5S2V5KGtleSkpXG4gICAgICAgICAgICAgICAgPyAxIDogMDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBrZXlzKCkgeyByZXR1cm4gdGhpcy5nZXRLZXlzKCk7IH1cbiAgICBnZXQgdmFsdWVzKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZXMoKTsgfVxuICAgIGFkZEJ5S2V5VmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IFZPSUQwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJDYW5ub3QgYWRkICd1bmRlZmluZWQnIGFzIGEgdmFsdWUuXCIpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgaWYgKF8uY29udGFpbnNLZXkoa2V5KSkge1xuICAgICAgICAgICAgY29uc3QgZXggPSBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkFkZGluZyBhIGtleS92YWx1ZSB3aGVuIHRoZSBrZXkgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgICAgICAgZXguZGF0YVsna2V5J10gPSBrZXk7XG4gICAgICAgICAgICBleC5kYXRhWyd2YWx1ZSddID0gdmFsdWU7XG4gICAgICAgICAgICB0aHJvdyBleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXy5zZXRWYWx1ZShrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgZ2V0QXNzdXJlZFZhbHVlKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBWT0lEMClcbiAgICAgICAgICAgIHRocm93IG5ldyBLZXlOb3RGb3VuZEV4Y2VwdGlvbihgS2V5ICcke2tleX0nIG5vdCBmb3VuZC5gKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICB0cnlHZXRWYWx1ZShrZXksIG91dCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBWT0lEMCkge1xuICAgICAgICAgICAgb3V0KHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgYW4gZW50cnkuXG4gICAgICogSXQncyBpbXBvcnRhbnQgdG8ga25vdyB0aGF0ICd1bmRlZmluZWQnIGNhbm5vdCBleGlzdCBhcyBhIHZhbHVlIGluIHRoZSBkaWN0aW9uYXJ5IGFuZCBpcyB1c2VkIGFzIGEgZmxhZyBmb3IgcmVtb3ZhbC5cbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc2V0VmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgICAgICAvLyBzZXRWYWx1ZSBzaG91bGRuJ3QgbmVlZCB0byB3b3JyeSBhYm91dCByZWN1cnNpb24uLi5cbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvbGQgPSBfLmdldFZhbHVlKGtleSk7IC8vIGdldCB0aGUgb2xkIHZhbHVlIGhlcmUgYW5kIHBhc3MgdG8gaW50ZXJuYWwuXG4gICAgICAgIGlmICghYXJlRXF1YWwodmFsdWUsIG9sZCkgJiYgXy5fc2V0VmFsdWVJbnRlcm5hbChrZXksIHZhbHVlKSkge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICBfLl9vblZhbHVlTW9kaWZpZWQoa2V5LCB2YWx1ZSwgb2xkKTtcbiAgICAgICAgfVxuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oY2hhbmdlZCk7XG4gICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH1cbiAgICBjb250YWluc0tleShrZXkpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZ2V0RW50cnkoa2V5KTtcbiAgICB9XG4gICAgY29udGFpbnNWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBlID0gdGhpcy5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgIHdoaWxlIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIGlmIChhcmVFcXVhbChlLmN1cnJlbnQsIHZhbHVlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgIGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmVtb3ZlQnlLZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFZhbHVlKGtleSwgVk9JRDApO1xuICAgIH1cbiAgICByZW1vdmVCeVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgXy5nZXRLZXlzKCkpIHtcbiAgICAgICAgICAgIGlmIChhcmVFcXVhbChfLmdldFZhbHVlKGtleSksIHZhbHVlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgIF8ucmVtb3ZlQnlLZXkoa2V5KTtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG4gICAgaW1wb3J0RW50cmllcyhwYWlycykge1xuICAgICAgICAvLyBBbGxvdyBwaXBpbmcgdGhyb3VnaCB0byB0cmlnZ2VyIG9uTW9kaWZpZWQgcHJvcGVybHkuXG4gICAgICAgIHJldHVybiBzdXBlci5pbXBvcnRFbnRyaWVzKHBhaXJzKTtcbiAgICB9XG4gICAgX2ltcG9ydEVudHJpZXMocGFpcnMpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghcGFpcnMpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgbGV0IGNoYW5nZWQgPSAwO1xuICAgICAgICBmb3JFYWNoKHBhaXJzLCBwYWlyID0+IGV4dHJhY3RLZXlWYWx1ZShwYWlyLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKF8uX3NldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkpXG4gICAgICAgICAgICAgICAgY2hhbmdlZCsrO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH1cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IHZlciwga2V5cywgbGVuLCBpbmRleCA9IDA7XG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvckJhc2UoKCkgPT4ge1xuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIHZlciA9IF8uX3ZlcnNpb247IC8vIFRyYWNrIHRoZSB2ZXJzaW9uIHNpbmNlIGdldEtleXMgaXMgYSBjb3B5LlxuICAgICAgICAgICAga2V5cyA9IF8uZ2V0S2V5cygpO1xuICAgICAgICAgICAgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcik7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2luZGV4KytdLCB2YWx1ZSA9IF8uZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IFZPSUQwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZFJldHVybih7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGRlci55aWVsZEJyZWFrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IERpY3Rpb25hcnlCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGljdGlvbmFyeUJhc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9EaWN0aW9uYXJpZXMvRGljdGlvbmFyeUJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuLy8gTmVlZCB0byBzcG9vZiB0aGlzIHNvIFdlYlBhY2sgZG9lc24ndCBwYW5pYyAod2FybmluZ3MpLlxubGV0IHI7XG50cnkge1xuICAgIHIgPSBldmFsKCdyZXF1aXJlJyk7XG59XG5jYXRjaCAoZXgpIHsgfVxuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5leHBvcnQgY29uc3QgaXNDb21tb25KUyA9ICEhKHIgJiYgci5yZXNvbHZlKTtcbi8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuZXhwb3J0IGNvbnN0IGlzUmVxdWlyZUpTID0gISEociAmJiByLnRvVXJsICYmIHIuZGVmaW5lZCk7XG4vKlxuICogRW5zdXJlIGlzIGluIGEgcmVhbCBOb2RlIGVudmlyb25tZW50LCB3aXRoIGEgYHByb2Nlc3MubmV4dFRpY2tgLlxuICogVG8gc2VlIHRocm91Z2ggZmFrZSBOb2RlIGVudmlyb25tZW50czpcbiAqIE1vY2hhIHRlc3QgcnVubmVyIC0gZXhwb3NlcyBhIGBwcm9jZXNzYCBnbG9iYWwgd2l0aG91dCBhIGBuZXh0VGlja2BcbiAqIEJyb3dzZXJpZnkgLSBleHBvc2VzIGEgYHByb2Nlc3MubmV4VGlja2AgZnVuY3Rpb24gdGhhdCB1c2VzXG4gKiBgc2V0VGltZW91dGAuIEluIHRoaXMgY2FzZSBgc2V0SW1tZWRpYXRlYCBpcyBwcmVmZXJyZWQgYmVjYXVzZVxuICogaXQgaXMgZmFzdGVyLiBCcm93c2VyaWZ5J3MgYHByb2Nlc3MudG9TdHJpbmcoKWAgeWllbGRzXG4gKiBcIltvYmplY3QgT2JqZWN0XVwiLCB3aGlsZSBpbiBhIHJlYWwgTm9kZSBlbnZpcm9ubWVudFxuICogYHByb2Nlc3MubmV4dFRpY2soKWAgeWllbGRzIFwiW29iamVjdCBwcm9jZXNzXVwiLlxuICovXG5leHBvcnQgY29uc3QgaXNOb2RlSlMgPSB0eXBlb2YgcHJvY2VzcyA9PSBcIm9iamVjdFwiXG4gICAgJiYgcHJvY2Vzcy50b1N0cmluZygpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIlxuICAgICYmIHByb2Nlc3MubmV4dFRpY2sgIT0gdm9pZCAwO1xuLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG50cnkge1xuICAgIE9iamVjdC5mcmVlemUoZXhwb3J0cyk7XG59XG5jYXRjaCAoZXgpIHsgfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW52aXJvbm1lbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FbnZpcm9ubWVudC5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCB7IEFyZ3VtZW50RXhjZXB0aW9uIH0gZnJvbSBcIi4vRXhjZXB0aW9ucy9Bcmd1bWVudEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnROdWxsRXhjZXB0aW9uIH0gZnJvbSBcIi4vRXhjZXB0aW9ucy9Bcmd1bWVudE51bGxFeGNlcHRpb25cIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9UeXBlc1wiO1xuY29uc3QgVk9JRDAgPSB2b2lkIDAsIERPVCA9ICcuJywgS0VZID0gJ2tleScsIFZBTFVFID0gJ3ZhbHVlJywgSVRFTSA9ICdpdGVtJywgSVRFTV8xID0gSVRFTSArICdbMV0nLCBJVEVNX1ZBTFVFID0gSVRFTSArIERPVCArIFZBTFVFLCBJTlZBTElEX0tWUF9NRVNTQUdFID0gJ0ludmFsaWQgdHlwZS4gIE11c3QgYmUgYSBLZXlWYWx1ZVBhaXIgb3IgVHVwbGUgb2YgbGVuZ3RoIDIuJywgQ0FOTk9UX0JFX1VOREVGSU5FRCA9ICdDYW5ub3QgZXF1YWwgdW5kZWZpbmVkLic7XG5leHBvcnQgZnVuY3Rpb24gaXNLZXlWYWx1ZVBhaXIoa3ZwKSB7XG4gICAgcmV0dXJuIGt2cCAmJiBrdnAuaGFzT3duUHJvcGVydHkoS0VZKSAmJiBrdnAuaGFzT3duUHJvcGVydHkoVkFMVUUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEtleShrZXksIG5hbWUgPSBJVEVNKSB7XG4gICAgYXNzZXJ0Tm90VW5kZWZpbmVkKGtleSwgbmFtZSArIERPVCArIEtFWSk7XG4gICAgaWYgKGtleSA9PT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihuYW1lICsgRE9UICsgS0VZKTtcbiAgICByZXR1cm4ga2V5O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFR1cGxlKHR1cGxlLCBuYW1lID0gSVRFTSkge1xuICAgIGlmICh0dXBsZS5sZW5ndGggIT0gMilcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKG5hbWUsICdLZXlWYWx1ZVBhaXIgdHVwbGVzIG11c3QgYmUgb2YgbGVuZ3RoIDIuJyk7XG4gICAgYXNzZXJ0S2V5KHR1cGxlWzBdLCBuYW1lKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb3RVbmRlZmluZWQodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAodmFsdWUgPT09IFZPSUQwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24obmFtZSwgQ0FOTk9UX0JFX1VOREVGSU5FRCk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RLZXlWYWx1ZShpdGVtLCB0bykge1xuICAgIGxldCBrZXksIHZhbHVlO1xuICAgIGlmIChUeXBlLmlzQXJyYXlMaWtlKGl0ZW0pKSB7XG4gICAgICAgIGFzc2VydFR1cGxlKGl0ZW0pO1xuICAgICAgICBrZXkgPSBpdGVtWzBdO1xuICAgICAgICB2YWx1ZSA9IGFzc2VydE5vdFVuZGVmaW5lZChpdGVtWzFdLCBJVEVNXzEpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0tleVZhbHVlUGFpcihpdGVtKSkge1xuICAgICAgICBrZXkgPSBhc3NlcnRLZXkoaXRlbS5rZXkpO1xuICAgICAgICB2YWx1ZSA9IGFzc2VydE5vdFVuZGVmaW5lZChpdGVtLnZhbHVlLCBJVEVNX1ZBTFVFKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihJVEVNLCBJTlZBTElEX0tWUF9NRVNTQUdFKTtcbiAgICB9XG4gICAgcmV0dXJuIHRvKGtleSwgdmFsdWUpO1xufVxuZXhwb3J0IGRlZmF1bHQgZXh0cmFjdEtleVZhbHVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9S2V5VmFsdWVFeHRyYWN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vS2V5VmFsdWVFeHRyYWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKiBCYXNlZCB1cG9uOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3N5c3RlbS5jb2xsZWN0aW9ucy5nZW5lcmljLktleU5vdEZvdW5kRXhjZXB0aW9uKHY9dnMuMTEwKS5hc3B4XG4gKi9cbmltcG9ydCB7IFN5c3RlbUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL1N5c3RlbUV4Y2VwdGlvblwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBOQU1FID0gJ0tleU5vdEZvdW5kRXhjZXB0aW9uICc7XG5leHBvcnQgY2xhc3MgS2V5Tm90Rm91bmRFeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEtleU5vdEZvdW5kRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9S2V5Tm90Rm91bmRFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9LZXlOb3RGb3VuZEV4Y2VwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuKiBCYXNlZCBVcG9uOiBodHRwOi8vcmVmZXJlbmNlc291cmNlLm1pY3Jvc29mdC5jb20vI1N5c3RlbS9Db21wTW9kL3N5c3RlbS9jb2xsZWN0aW9ucy9nZW5lcmljL3F1ZXVlLmNzXG4qIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuKi9cbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uL0NvbXBhcmVcIjtcbmltcG9ydCAqIGFzIEFVIGZyb20gXCIuL0FycmF5L1V0aWxpdHlcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vVHlwZXNcIjtcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi4vSW50ZWdlclwiO1xuaW1wb3J0IHsgRW51bWVyYXRvckJhc2UgfSBmcm9tIFwiLi9FbnVtZXJhdGlvbi9FbnVtZXJhdG9yQmFzZVwiO1xuaW1wb3J0IHsgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Ob3RJbXBsZW1lbnRlZEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0ludmFsaWRPcGVyYXRpb25FeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9FeGNlcHRpb25zL0FyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkJhc2UgfSBmcm9tIFwiLi9Db2xsZWN0aW9uQmFzZVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5jb25zdCBWT0lEMCA9IHZvaWQgMDtcbmNvbnN0IE1JTklNVU1fR1JPVyA9IDQ7XG5jb25zdCBTSFJJTktfVEhSRVNIT0xEID0gMzI7IC8vIFVudXNlZD9cbi8vIHZhciBHUk9XX0ZBQ1RPUjogbnVtYmVyID0gMjAwOyAgLy8gZG91YmxlIGVhY2ggdGltZVxuY29uc3QgR1JPV19GQUNUT1JfSEFMRiA9IDEwMDtcbmNvbnN0IERFRkFVTFRfQ0FQQUNJVFkgPSBNSU5JTVVNX0dST1c7XG5jb25zdCBlbXB0eUFycmF5ID0gT2JqZWN0LmZyZWV6ZShbXSk7XG5leHBvcnQgY2xhc3MgUXVldWUgZXh0ZW5kcyBDb2xsZWN0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc291cmNlLCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICAgICAgc3VwZXIoVk9JRDAsIGVxdWFsaXR5Q29tcGFyZXIpO1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy5faGVhZCA9IDA7XG4gICAgICAgIF8uX3RhaWwgPSAwO1xuICAgICAgICBfLl9zaXplID0gMDtcbiAgICAgICAgaWYgKCFzb3VyY2UpXG4gICAgICAgICAgICBfLl9hcnJheSA9IGVtcHR5QXJyYXk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKFR5cGUuaXNOdW1iZXIoc291cmNlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcGFjaXR5ID0gc291cmNlO1xuICAgICAgICAgICAgICAgIGFzc2VydEludGVnZXJaZXJvT3JHcmVhdGVyKGNhcGFjaXR5LCBcImNhcGFjaXR5XCIpO1xuICAgICAgICAgICAgICAgIF8uX2FycmF5ID0gY2FwYWNpdHlcbiAgICAgICAgICAgICAgICAgICAgPyBBVS5pbml0aWFsaXplKGNhcGFjaXR5KVxuICAgICAgICAgICAgICAgICAgICA6IGVtcHR5QXJyYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZSA9IHNvdXJjZTtcbiAgICAgICAgICAgICAgICBfLl9hcnJheSA9IEFVLmluaXRpYWxpemUoVHlwZS5pc0FycmF5TGlrZShzZSlcbiAgICAgICAgICAgICAgICAgICAgPyBzZS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgOiBERUZBVUxUX0NBUEFDSVRZKTtcbiAgICAgICAgICAgICAgICBfLl9pbXBvcnRFbnRyaWVzKHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfLl9jYXBhY2l0eSA9IF8uX2FycmF5Lmxlbmd0aDtcbiAgICB9XG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cbiAgICBfYWRkSW50ZXJuYWwoaXRlbSkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3Qgc2l6ZSA9IF8uX3NpemU7XG4gICAgICAgIGxldCBsZW4gPSBfLl9jYXBhY2l0eTtcbiAgICAgICAgaWYgKHNpemUgPT0gbGVuKSB7XG4gICAgICAgICAgICBsZXQgbmV3Q2FwYWNpdHkgPSBsZW4gKiBHUk9XX0ZBQ1RPUl9IQUxGO1xuICAgICAgICAgICAgaWYgKG5ld0NhcGFjaXR5IDwgbGVuICsgTUlOSU1VTV9HUk9XKVxuICAgICAgICAgICAgICAgIG5ld0NhcGFjaXR5ID0gbGVuICsgTUlOSU1VTV9HUk9XO1xuICAgICAgICAgICAgXy5zZXRDYXBhY2l0eShuZXdDYXBhY2l0eSk7XG4gICAgICAgICAgICBsZW4gPSBfLl9jYXBhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YWlsID0gXy5fdGFpbDtcbiAgICAgICAgXy5fYXJyYXlbdGFpbF0gPSBpdGVtO1xuICAgICAgICBfLl90YWlsID0gKHRhaWwgKyAxKSAlIGxlbjtcbiAgICAgICAgXy5fc2l6ZSA9IHNpemUgKyAxO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBfcmVtb3ZlSW50ZXJuYWwoaXRlbSwgbWF4KSB7XG4gICAgICAgIC8vbm9pbnNwZWN0aW9uIEh0bWxVbmtub3duVGFnXG4gICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbihcIklDb2xsZWN0aW9uXFw8VFxcPi5yZW1vdmUgaXMgbm90IGltcGxlbWVudGVkIGluIFF1ZXVlXFw8VFxcPlwiICtcbiAgICAgICAgICAgIFwiIHNpbmNlIGl0IHdvdWxkIHJlcXVpcmUgZGVzdHJveWluZyB0aGUgdW5kZXJseWluZyBhcnJheSB0byByZW1vdmUgdGhlIGl0ZW0uXCIpO1xuICAgIH1cbiAgICBfY2xlYXJJbnRlcm5hbCgpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gXy5fYXJyYXksIGhlYWQgPSBfLl9oZWFkLCB0YWlsID0gXy5fdGFpbCwgc2l6ZSA9IF8uX3NpemU7XG4gICAgICAgIGlmIChoZWFkIDwgdGFpbClcbiAgICAgICAgICAgIEFVLmNsZWFyKGFycmF5LCBoZWFkLCB0YWlsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBBVS5jbGVhcihhcnJheSwgaGVhZCk7XG4gICAgICAgICAgICBBVS5jbGVhcihhcnJheSwgMCwgdGFpbCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5faGVhZCA9IDA7XG4gICAgICAgIF8uX3RhaWwgPSAwO1xuICAgICAgICBfLl9zaXplID0gMDtcbiAgICAgICAgXy50cmltRXhjZXNzKCk7XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpZiAoXy5fYXJyYXkgIT0gZW1wdHlBcnJheSkge1xuICAgICAgICAgICAgXy5fYXJyYXkubGVuZ3RoID0gXy5fY2FwYWNpdHkgPSAwO1xuICAgICAgICAgICAgXy5fYXJyYXkgPSBlbXB0eUFycmF5O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlcXVldWVzIGVudHJpZXMgaW50byBhbiBhcnJheS5cbiAgICAgKi9cbiAgICBkdW1wKG1heCA9IEluZmluaXR5KSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgaWYgKGlzRmluaXRlKG1heCkpIHtcbiAgICAgICAgICAgIEludGVnZXIuYXNzZXJ0WmVyb09yR3JlYXRlcihtYXgpO1xuICAgICAgICAgICAgaWYgKG1heCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChtYXgtLSAmJiBfLl90cnlEZXF1ZXVlSW50ZXJuYWwodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKF8uX3RyeURlcXVldWVJbnRlcm5hbCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfSkpIHsgfVxuICAgICAgICB9XG4gICAgICAgIF8udHJpbUV4Y2VzcygpO1xuICAgICAgICBfLl9zaWduYWxNb2RpZmljYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZm9yRWFjaChhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmZvckVhY2goYWN0aW9uLCB0cnVlKTtcbiAgICB9XG4gICAgc2V0Q2FwYWNpdHkoY2FwYWNpdHkpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGFzc2VydEludGVnZXJaZXJvT3JHcmVhdGVyKGNhcGFjaXR5LCBcImNhcGFjaXR5XCIpO1xuICAgICAgICBjb25zdCBhcnJheSA9IF8uX2FycmF5LCBsZW4gPSBfLl9jYXBhY2l0eTtcbiAgICAgICAgaWYgKGNhcGFjaXR5ID4gbGVuKVxuICAgICAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgaWYgKGNhcGFjaXR5ID09IGxlbilcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBjb25zdCBoZWFkID0gXy5faGVhZCwgdGFpbCA9IF8uX3RhaWwsIHNpemUgPSBfLl9zaXplO1xuICAgICAgICAvLyBTcGVjaWFsIGNhc2Ugd2hlcmUgd2UgY2FuIHNpbXBseSBleHRlbmQgdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkuIChKYXZhU2NyaXB0IG9ubHkpXG4gICAgICAgIGlmIChhcnJheSAhPSBlbXB0eUFycmF5ICYmIGNhcGFjaXR5ID4gbGVuICYmIGhlYWQgPCB0YWlsKSB7XG4gICAgICAgICAgICBhcnJheS5sZW5ndGggPSBfLl9jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgICAgICAgICAgXy5fdmVyc2lvbisrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgY3JlYXRlIGEgbmV3IGFycmF5IGJlY2F1c2UgbW9kaWZ5aW5nIGFuIGV4aXN0aW5nIG9uZSBjb3VsZCBiZSBzbG93LlxuICAgICAgICBjb25zdCBuZXdBcnJheSA9IEFVLmluaXRpYWxpemUoY2FwYWNpdHkpO1xuICAgICAgICBpZiAoc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGlmIChoZWFkIDwgdGFpbCkge1xuICAgICAgICAgICAgICAgIEFVLmNvcHlUbyhhcnJheSwgbmV3QXJyYXksIGhlYWQsIDAsIHNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgQVUuY29weVRvKGFycmF5LCBuZXdBcnJheSwgaGVhZCwgMCwgbGVuIC0gaGVhZCk7XG4gICAgICAgICAgICAgICAgQVUuY29weVRvKGFycmF5LCBuZXdBcnJheSwgMCwgbGVuIC0gaGVhZCwgdGFpbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5fYXJyYXkgPSBuZXdBcnJheTtcbiAgICAgICAgXy5fY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgICAgICAgXy5faGVhZCA9IDA7XG4gICAgICAgIF8uX3RhaWwgPSAoc2l6ZSA9PSBjYXBhY2l0eSkgPyAwIDogc2l6ZTtcbiAgICAgICAgXy5fc2lnbmFsTW9kaWZpY2F0aW9uKHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW5xdWV1ZShpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChpdGVtKTtcbiAgICB9XG4gICAgX3RyeURlcXVldWVJbnRlcm5hbChvdXQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghXy5fc2l6ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBfLl9hcnJheSwgaGVhZCA9IF8uX2hlYWQ7XG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSBfLl9hcnJheVtoZWFkXTtcbiAgICAgICAgYXJyYXlbaGVhZF0gPSBudWxsO1xuICAgICAgICBfLl9oZWFkID0gKGhlYWQgKyAxKSAlIF8uX2NhcGFjaXR5O1xuICAgICAgICBfLl9zaXplLS07XG4gICAgICAgIF8uX2luY3JlbWVudE1vZGlmaWVkKCk7XG4gICAgICAgIG91dChyZW1vdmVkKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGRlcXVldWUodGhyb3dJZkVtcHR5ID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIF8uYXNzZXJ0TW9kaWZpYWJsZSgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gVk9JRDA7XG4gICAgICAgIGlmICghdGhpcy50cnlEZXF1ZXVlKHZhbHVlID0+IHsgcmVzdWx0ID0gdmFsdWU7IH0pICYmIHRocm93SWZFbXB0eSlcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ2Fubm90IGRlcXVldWUgYW4gZW1wdHkgcXVldWUuXCIpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBxdWV1ZSBoYXMgZW50cmllcyBhbiBwdWxscyBhbiBlbnRyeSBmcm9tIHRoZSBoZWFkIG9mIHRoZSBxdWV1ZSBhbmQgcGFzc2VzIGl0IHRvIHRoZSBvdXQgaGFuZGxlci5cbiAgICAgKiBAcGFyYW0gb3V0IFRoZSAnb3V0JyBoYW5kbGVyIHRoYXQgcmVjZWl2ZXMgdGhlIHZhbHVlIGlmIGl0IGV4aXN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBhIHZhbHVlIHdhcyByZXRyaWV2ZWQuICBGYWxzZSBpZiBub3QuXG4gICAgICovXG4gICAgdHJ5RGVxdWV1ZShvdXQpIHtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIGlmICghXy5fc2l6ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgXy5hc3NlcnRNb2RpZmlhYmxlKCk7XG4gICAgICAgIC8vIEEgc2luZ2xlIGRlcXVldWUgc2hvdWxkbid0IG5lZWQgdXBkYXRlIHJlY3Vyc2lvbiB0cmFja2luZy4uLlxuICAgICAgICBpZiAodGhpcy5fdHJ5RGVxdWV1ZUludGVybmFsKG91dCkpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgbWF5IHByZWVtcHRpdmVseSB0cmlnZ2VyIHRoZSBfb25Nb2RpZmllZC5cbiAgICAgICAgICAgIGlmIChfLl9zaXplIDwgXy5fY2FwYWNpdHkgLyAyKVxuICAgICAgICAgICAgICAgIF8udHJpbUV4Y2VzcyhTSFJJTktfVEhSRVNIT0xEKTtcbiAgICAgICAgICAgIF8uX3NpZ25hbE1vZGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfZ2V0RWxlbWVudChpbmRleCkge1xuICAgICAgICBhc3NlcnRJbnRlZ2VyWmVyb09yR3JlYXRlcihpbmRleCwgXCJpbmRleFwiKTtcbiAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBfLl9hcnJheVsoXy5faGVhZCArIGluZGV4KSAlIF8uX2NhcGFjaXR5XTtcbiAgICB9XG4gICAgcGVlayh0aHJvd0lmRW1wdHkgPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZSA9PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhyb3dJZkVtcHR5KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwiQ2Fubm90IGNhbGwgcGVlayBvbiBhbiBlbXB0eSBxdWV1ZS5cIik7XG4gICAgICAgICAgICByZXR1cm4gVk9JRDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2FycmF5W3RoaXMuX2hlYWRdO1xuICAgIH1cbiAgICB0cmltRXhjZXNzKHRocmVzaG9sZCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgY29uc3Qgc2l6ZSA9IF8uX3NpemU7XG4gICAgICAgIGlmIChzaXplIDwgTWF0aC5mbG9vcihfLl9jYXBhY2l0eSAqIDAuOSkgJiYgKCF0aHJlc2hvbGQgJiYgdGhyZXNob2xkICE9PSAwIHx8IGlzTmFOKHRocmVzaG9sZCkgfHwgdGhyZXNob2xkIDwgc2l6ZSkpXG4gICAgICAgICAgICBfLnNldENhcGFjaXR5KHNpemUpO1xuICAgIH1cbiAgICBnZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgXy50aHJvd0lmRGlzcG9zZWQoKTtcbiAgICAgICAgbGV0IGluZGV4LCB2ZXJzaW9uLCBzaXplO1xuICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3JCYXNlKCgpID0+IHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBfLl92ZXJzaW9uO1xuICAgICAgICAgICAgc2l6ZSA9IF8uX3NpemU7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0sICh5aWVsZGVyKSA9PiB7XG4gICAgICAgICAgICBfLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgXy5hc3NlcnRWZXJzaW9uKHZlcnNpb24pO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IHNpemUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRCcmVhaygpO1xuICAgICAgICAgICAgcmV0dXJuIHlpZWxkZXIueWllbGRSZXR1cm4oXy5fZ2V0RWxlbWVudChpbmRleCsrKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2VydFplcm9PckdyZWF0ZXIodmFsdWUsIHByb3BlcnR5KSB7XG4gICAgaWYgKHZhbHVlIDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihwcm9wZXJ0eSwgdmFsdWUsIFwiTXVzdCBiZSBncmVhdGVyIHRoYW4gemVyb1wiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGFzc2VydEludGVnZXJaZXJvT3JHcmVhdGVyKHZhbHVlLCBwcm9wZXJ0eSkge1xuICAgIEludGVnZXIuYXNzZXJ0KHZhbHVlLCBwcm9wZXJ0eSk7XG4gICAgcmV0dXJuIGFzc2VydFplcm9PckdyZWF0ZXIodmFsdWUsIHByb3BlcnR5KTtcbn1cbmV4cG9ydCBkZWZhdWx0IFF1ZXVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UXVldWUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9RdWV1ZS5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uLy4uL1R5cGVzXCI7XG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4uLy4uL0ludGVnZXJcIjtcbmltcG9ydCB7IGFyZUVxdWFsIH0gZnJvbSBcIi4uLy4uL0NvbXBhcmVcIjtcbmltcG9ydCB7IEFyZ3VtZW50RXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnRFeGNlcHRpb25cIjtcbmltcG9ydCB7IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiB9IGZyb20gXCIuLi8uLi9FeGNlcHRpb25zL0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL0V4Y2VwdGlvbnMvQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4vaW5pdGlhbGl6ZVwiO1xuaW1wb3J0IHsgY29weSwgY29weVRvIH0gZnJvbSBcIi4vY29weVwiO1xuZXhwb3J0IHsgaW5pdGlhbGl6ZSwgY29weSwgY29weVRvIH07XG5jb25zdCBDQk4gPSAnQ2Fubm90IGJlIG51bGwuJywgQ0IwID0gJ0Nhbm5vdCBiZSB6ZXJvLicsIENCTDAgPSAnQ2Fubm90IGJlIGxlc3MgdGhhbiB6ZXJvLicsIFZGTiA9ICdNdXN0IGJlIGEgdmFsaWQgZmluaXRlIG51bWJlcic7XG4vKipcbiAqIENoZWNrcyB0byBzZWUgd2hlcmUgdGhlIHByb3ZpZGVkIGFycmF5IGNvbnRhaW5zIGFuIGl0ZW0vdmFsdWUuXG4gKiBJZiB0aGUgYXJyYXkgdmFsdWUgaXMgbnVsbCwgdGhlbiAtMSBpcyByZXR1cm5lZC5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIGl0ZW1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBlcXVhbGl0eUNvbXBhcmVyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgY29uc3QgbGVuID0gYXJyYXkgJiYgYXJyYXkubGVuZ3RoO1xuICAgIGlmIChsZW4pIHtcbiAgICAgICAgLy8gTmFOIE5FVkVSIGV2YWx1YXRlcyBpdHMgZXF1YWxpdHkgc28gYmUgY2FyZWZ1bC5cbiAgICAgICAgaWYgKChhcnJheSkgaW5zdGFuY2VvZiAoQXJyYXkpICYmICFUeXBlLmlzVHJ1ZU5hTihpdGVtKSlcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAvLyAnYXJlRXF1YWwnIGluY2x1ZGVzIE5hTj09TmFOIGV2YWx1YXRpb24uXG4gICAgICAgICAgICBpZiAoZXF1YWxpdHlDb21wYXJlcihhcnJheVtpXSwgaXRlbSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuLyoqXG4gKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBwcm92aWRlZCBhcnJheSBjb250YWlucyBhbiBpdGVtLlxuICogSWYgdGhlIGFycmF5IHZhbHVlIGlzIG51bGwsIHRoZW4gZmFsc2UgaXMgcmV0dXJuZWQuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBpdGVtXG4gKiBAcGFyYW0ge2Z1bmN0aW9uP30gZXF1YWxpdHlDb21wYXJlclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWlucyhhcnJheSwgaXRlbSwgZXF1YWxpdHlDb21wYXJlciA9IGFyZUVxdWFsKSB7XG4gICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIpICE9IC0xO1xufVxuLyoqXG4gKiBGaW5kcyBhbmQgcmVwbGFjZXMgYSB2YWx1ZSBmcm9tIGFuIGFycmF5LiAgV2lsbCByZXBsYWNlcyBhbGwgaW5zdGFuY2VzIHVubGVzcyBhIG1heGltdW0gaXMgc3BlY2lmaWVkLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gb2xkXG4gKiBAcGFyYW0gbmV3VmFsdWVcbiAqIEBwYXJhbSBtYXhcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKGFycmF5LCBvbGQsIG5ld1ZhbHVlLCBtYXggPSBJbmZpbml0eSkge1xuICAgIGlmICghYXJyYXkgfHwgIWFycmF5Lmxlbmd0aCB8fCBtYXggPT09IDApXG4gICAgICAgIHJldHVybiAwO1xuICAgIGlmIChtYXggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdtYXgnLCBtYXgsIENCTDApO1xuICAgIGlmICghbWF4KVxuICAgICAgICBtYXggPSBJbmZpbml0eTsgLy8ganVzdCBpbiBjYXNlLlxuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheVtpXSA9PT0gb2xkKSB7XG4gICAgICAgICAgICBhcnJheVtpXSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PSBtYXgpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufVxuLyoqXG4gKiBSZXBsYWNlcyB2YWx1ZXMgb2YgYW4gYXJyYXkgYWNyb3NzIGEgcmFuZ2Ugb2YgaW5kZXhlcy5cbiAqIEBwYXJhbSBhcnJheVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gc3RhcnRcbiAqIEBwYXJhbSBzdG9wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVSYW5nZShhcnJheSwgdmFsdWUsIHN0YXJ0ID0gMCwgc3RvcCkge1xuICAgIGlmICghYXJyYXkpXG4gICAgICAgIHJldHVybjtcbiAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoc3RhcnQsICdzdGFydCcpO1xuICAgIGlmICghc3RvcCAmJiBzdG9wICE9PSAwKVxuICAgICAgICBzdG9wID0gYXJyYXkubGVuZ3RoO1xuICAgIEludGVnZXIuYXNzZXJ0KHN0b3AsICdzdG9wJyk7XG4gICAgaWYgKHN0b3AgPCBzdGFydClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcInN0b3BcIiwgc3RvcCwgXCJpcyBsZXNzIHRoYW4gc3RhcnRcIik7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgc3RvcDsgaSsrKSB7XG4gICAgICAgIGFycmF5W2ldID0gdmFsdWU7XG4gICAgfVxufVxuLyoqXG4gKiBDbGVhcnMgKHNldHMgdG8gbnVsbCkgdmFsdWVzIG9mIGFuIGFycmF5IGFjcm9zcyBhIHJhbmdlIG9mIGluZGV4ZXMuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBzdGFydFxuICogQHBhcmFtIHN0b3BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKGFycmF5LCBzdGFydCA9IDAsIHN0b3ApIHtcbiAgICB1cGRhdGVSYW5nZShhcnJheSwgbnVsbCwgc3RhcnQsIHN0b3ApO1xufVxuLyoqXG4gKiBFbnN1cmVzIGEgdmFsdWUgZXhpc3RzIHdpdGhpbiBhbiBhcnJheS4gIElmIG5vdCBmb3VuZCwgYWRkcyB0byB0aGUgZW5kLlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gaXRlbVxuICogQHBhcmFtIHtmdW5jdGlvbj99IGVxdWFsaXR5Q29tcGFyZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIoYXJyYXksIGl0ZW0sIGVxdWFsaXR5Q29tcGFyZXIgPSBhcmVFcXVhbCkge1xuICAgIGlmICghYXJyYXkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5JywgQ0JOKTtcbiAgICBsZXQgbGVuID0gYXJyYXkubGVuZ3RoOyAvLyBhdm9pZCBxdWVyeWluZyAubGVuZ3RoIG1vcmUgdGhhbiBvbmNlLiAqXG4gICAgY29uc3Qgb2sgPSAhbGVuIHx8ICFjb250YWlucyhhcnJheSwgaXRlbSwgZXF1YWxpdHlDb21wYXJlcik7XG4gICAgaWYgKG9rKVxuICAgICAgICBhcnJheVtsZW5dID0gaXRlbTsgLy8gKiBwdXNoIHdvdWxkIHF1ZXJ5IGxlbmd0aCBhZ2Fpbi5cbiAgICByZXR1cm4gb2s7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGluZGV4IG9mIHdoaWNoIHRoZSBwcm92aWRlZCBwcmVkaWNhdGUgcmV0dXJucyB0cnVlLlxuICogUmV0dXJucyAtMSBpZiBhbHdheXMgZmFsc2UuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSBwcmVkaWNhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSkge1xuICAgIGlmICghYXJyYXkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ2FycmF5JywgQ0JOKTtcbiAgICBpZiAoIVR5cGUuaXNGdW5jdGlvbihwcmVkaWNhdGUpKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oJ3ByZWRpY2F0ZScsICdNdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgY29uc3QgbGVuID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmICghVHlwZS5pc051bWJlcihsZW4sIHRydWUpIHx8IGxlbiA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbignYXJyYXknLCAnRG9lcyBub3QgaGF2ZSBhIHZhbGlkIGxlbmd0aC4nKTtcbiAgICBpZiAoKGFycmF5KSBpbnN0YW5jZW9mIChBcnJheSkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShhcnJheVtpXSwgaSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoaSkgaW4gKGFycmF5KSAmJiBwcmVkaWNhdGUoYXJyYXlbaV0sIGkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKHNvdXJjZSwgYWN0aW9uKSB7XG4gICAgaWYgKHNvdXJjZSAmJiBhY3Rpb24pIHtcbiAgICAgICAgLy8gRG9uJ3QgY2FjaGUgdGhlIGxlbmd0aCBzaW5jZSBpdCBpcyBwb3NzaWJsZSB0aGF0IHRoZSB1bmRlcmx5aW5nIGFycmF5IGNoYW5nZWQuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYWN0aW9uKHNvdXJjZVtpXSwgaSkgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBJcyBzaW1pbGFyIHRvIEFycmF5Lm1hcCgpIGJ1dCBpbnN0ZWFkIG9mIHJldHVybmluZyBhIG5ldyBhcnJheSwgaXQgdXBkYXRlcyB0aGUgZXhpc3RpbmcgaW5kZXhlcy5cbiAqIENhbiBhbHNvIGJlIGFwcGxpZWQgdG8gYSBzdHJ1Y3R1cmUgdGhhdCBpbmRleGVzIGxpa2UgYW4gYXJyYXksIGJ1dCBtYXkgbm90IGJlLlxuICogQHBhcmFtIHRhcmdldFxuICogQHBhcmFtIGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVRvKHRhcmdldCwgZm4pIHtcbiAgICBpZiAodGFyZ2V0ICYmIGZuKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0YXJnZXRbaV0gPSBmbih0YXJnZXRbaV0sIGkpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBSZW1vdmVzIGFuIGVudHJ5IGF0IGEgc3BlY2lmaWVkIGluZGV4LlxuICogQHBhcmFtIGFycmF5XG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSB3YXMgYWJsZSB0byBiZSByZW1vdmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSW5kZXgoYXJyYXksIGluZGV4KSB7XG4gICAgaWYgKCFhcnJheSlcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbignYXJyYXknLCBDQk4pO1xuICAgIEludGVnZXIuYXNzZXJ0KGluZGV4LCAnaW5kZXgnKTtcbiAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdpbmRleCcsIGluZGV4LCBDQkwwKTtcbiAgICBjb25zdCBleGlzdHMgPSBpbmRleCA8IGFycmF5Lmxlbmd0aDtcbiAgICBpZiAoZXhpc3RzKVxuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiBleGlzdHM7XG59XG4vKipcbiAqIEZpbmRzIGFuZCByZW1vdmVzIGEgdmFsdWUgZnJvbSBhbiBhcnJheS4gIFdpbGwgcmVtb3ZlIGFsbCBpbnN0YW5jZXMgdW5sZXNzIGEgbWF4aW11bSBpcyBzcGVjaWZpZWQuXG4gKiBAcGFyYW0gYXJyYXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIG1heFxuICogQHBhcmFtIHtmdW5jdGlvbj99IGVxdWFsaXR5Q29tcGFyZXJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgdGltZXMgdGhlIHZhbHVlIHdhcyBmb3VuZCBhbmQgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShhcnJheSwgdmFsdWUsIG1heCA9IEluZmluaXR5LCBlcXVhbGl0eUNvbXBhcmVyID0gYXJlRXF1YWwpIHtcbiAgICBpZiAoIWFycmF5IHx8ICFhcnJheS5sZW5ndGggfHwgbWF4ID09PSAwKVxuICAgICAgICByZXR1cm4gMDtcbiAgICBpZiAobWF4IDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbignbWF4JywgbWF4LCBDQkwwKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGlmICghbWF4IHx8ICFpc0Zpbml0ZShtYXgpKSB7XG4gICAgICAgIC8vIERvbid0IHRyYWNrIHRoZSBpbmRleGVzIGFuZCByZW1vdmUgaW4gcmV2ZXJzZS5cbiAgICAgICAgZm9yIChsZXQgaSA9IChhcnJheS5sZW5ndGggLSAxKTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmIChlcXVhbGl0eUNvbXBhcmVyKGFycmF5W2ldLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gU2luY2UgdGhlIHVzZXIgd2lsbCBleHBlY3QgaXQgdG8gaGFwcGVuIGluIGZvcndhcmQgb3JkZXIuLi5cbiAgICAgICAgY29uc3QgZm91bmQgPSBbXTsgLy8gaW5kZXhlcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxpdHlDb21wYXJlcihhcnJheVtpXSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZm91bmQucHVzaChpKTtcbiAgICAgICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBtYXgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSBmb3VuZC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGZvdW5kW2ldLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG59XG4vKipcbiAqIFNpbXBseSByZXBlYXRzIGEgdmFsdWUgdGhlIG51bWJlciBvZiB0aW1lcyBzcGVjaWZpZWQuXG4gKiBAcGFyYW0gZWxlbWVudFxuICogQHBhcmFtIGNvdW50XG4gKiBAcmV0dXJucyB7VFtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0KGVsZW1lbnQsIGNvdW50KSB7XG4gICAgSW50ZWdlci5hc3NlcnQoY291bnQsICdjb3VudCcpO1xuICAgIGlmIChjb3VudCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2NvdW50JywgY291bnQsIENCTDApO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRpYWxpemUoY291bnQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gPSBlbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgcmFuZ2Ugb2YgbnVtYmVycyBiYXNlZCB1cG9uIHRoZSBmaXJzdCB2YWx1ZSBhbmQgdGhlIHN0ZXAgdmFsdWUuXG4gKiBAcGFyYW0gZmlyc3RcbiAqIEBwYXJhbSBjb3VudFxuICogQHBhcmFtIHN0ZXBcbiAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlKGZpcnN0LCBjb3VudCwgc3RlcCA9IDEpIHtcbiAgICBpZiAoaXNOYU4oZmlyc3QpIHx8ICFpc0Zpbml0ZShmaXJzdCkpXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2ZpcnN0JywgZmlyc3QsIFZGTik7XG4gICAgaWYgKGlzTmFOKGNvdW50KSB8fCAhaXNGaW5pdGUoY291bnQpKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdjb3VudCcsIGNvdW50LCBWRk4pO1xuICAgIGlmIChjb3VudCA8IDApXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oJ2NvdW50JywgY291bnQsIENCTDApO1xuICAgIGNvbnN0IHJlc3VsdCA9IGluaXRpYWxpemUoY291bnQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gPSBmaXJzdDtcbiAgICAgICAgZmlyc3QgKz0gc3RlcDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogUmV0dXJucyBhIHJhbmdlIG9mIG51bWJlcnMgYmFzZWQgdXBvbiB0aGUgZmlyc3QgdmFsdWUgYW5kIHRoZSBzdGVwIHZhbHVlIGV4Y2x1ZGluZyBhbnkgbnVtYmVycyBhdCBvciBiZXlvbmQgdGhlIHVudGlsIHZhbHVlLlxuICogQHBhcmFtIGZpcnN0XG4gKiBAcGFyYW0gdW50aWxcbiAqIEBwYXJhbSBzdGVwXG4gKiBAcmV0dXJucyB7bnVtYmVyW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5nZVVudGlsKGZpcnN0LCB1bnRpbCwgc3RlcCA9IDEpIHtcbiAgICBpZiAoc3RlcCA9PSAwKVxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCdzdGVwJywgc3RlcCwgQ0IwKTtcbiAgICByZXR1cm4gcmFuZ2UoZmlyc3QsICh1bnRpbCAtIGZpcnN0KSAvIHN0ZXAsIHN0ZXApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RpbmN0KHNvdXJjZSkge1xuICAgIGlmICghc291cmNlKVxuICAgICAgICByZXR1cm4gW107IC8vIEFsbG93aW5nIGZvciBudWxsIGZhY2lsaXRhdGVzIHJlZ2V4IGZpbHRlcmluZy5cbiAgICBjb25zdCBzZWVuID0ge307XG4gICAgcmV0dXJuIHNvdXJjZS5maWx0ZXIoZSA9PiAhKGUgaW4gc2VlbikgJiYgKHNlZW5bZV0gPSB0cnVlKSk7XG59XG4vKipcbiAqIFRha2VzIGFueSBhcnJheXMgd2l0aGluIGFuIGFycmF5IGFuZCBpbnNlcnRzIHRoZSB2YWx1ZXMgY29udGFpbmVkIHdpdGhpbiBpbiBwbGFjZSBvZiB0aGF0IGFycmF5LlxuICogRm9yIGV2ZXJ5IGNvdW50IGhpZ2hlciB0aGFuIDAgaW4gcmVjdXJzZURlcHRoIGl0IHdpbGwgYXR0ZW1wdCBhbiBhZGRpdGlvbmFsIHBhc3MuICBQYXNzaW5nIEluZmluaXR5IHdpbGwgZmxhdHRlbiBhbGwgYXJyYXlzIGNvbnRhaW5lZC5cbiAqIEBwYXJhbSBhXG4gKiBAcGFyYW0gcmVjdXJzZURlcHRoXG4gKiBAcmV0dXJucyB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGEsIHJlY3Vyc2VEZXB0aCA9IDApIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHggPSBhW2ldO1xuICAgICAgICBpZiAoKHgpIGluc3RhbmNlb2YgKEFycmF5KSkge1xuICAgICAgICAgICAgaWYgKHJlY3Vyc2VEZXB0aCA+IDApXG4gICAgICAgICAgICAgICAgeCA9IGZsYXR0ZW4oeCwgcmVjdXJzZURlcHRoIC0gMSk7XG4gICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHgubGVuZ3RoOyBuKyspXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goeFtuXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goeCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VdGlsaXR5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXkvVXRpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICogQmFzZWQgdXBvbjogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9TeXN0ZW0uRXhjZXB0aW9uJTI4dj12cy4xMTAlMjkuYXNweFxuICovXG5pbXBvcnQgeyBTeXN0ZW1FeGNlcHRpb24gfSBmcm9tIFwiLi9TeXN0ZW1FeGNlcHRpb25cIjtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuY29uc3QgTkFNRSA9ICdOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbic7XG5leHBvcnQgY2xhc3MgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24gZXh0ZW5kcyBTeXN0ZW1FeGNlcHRpb24ge1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm90SW1wbGVtZW50ZWRFeGNlcHRpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9FeGNlcHRpb25zL05vdEltcGxlbWVudGVkRXhjZXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogQGF1dGhvciBlbGVjdHJpY2Vzc2VuY2UgLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1xuICogTGljZW5zaW5nOiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9UeXBlU2NyaXB0Lk5FVC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cbmltcG9ydCAqIGFzIFZhbHVlcyBmcm9tIFwiLi4vLi4vQ29tcGFyZVwiO1xuaW1wb3J0IHsgU29ydENvbnRleHQgfSBmcm9tIFwiLi9Tb3J0Q29udGV4dFwiO1xuaW1wb3J0IHsgRnVuY3Rpb25zIH0gZnJvbSBcIi4uLy4uL0Z1bmN0aW9uc1wiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5leHBvcnQgY2xhc3MgS2V5U29ydGVkQ29udGV4dCBleHRlbmRzIFNvcnRDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihuZXh0LCBfa2V5U2VsZWN0b3IsIG9yZGVyID0gMSAvKiBBc2NlbmRpbmcgKi8sIGNvbXBhcmVyID0gVmFsdWVzLmNvbXBhcmUpIHtcbiAgICAgICAgc3VwZXIobmV4dCwgY29tcGFyZXIsIG9yZGVyKTtcbiAgICAgICAgdGhpcy5fa2V5U2VsZWN0b3IgPSBfa2V5U2VsZWN0b3I7XG4gICAgfVxuICAgIGNvbXBhcmUoYSwgYikge1xuICAgICAgICBjb25zdCBfID0gdGhpcztcbiAgICAgICAgbGV0IGtzID0gXy5fa2V5U2VsZWN0b3I7XG4gICAgICAgIGlmICgha3MgfHwga3MgPT0gRnVuY3Rpb25zLklkZW50aXR5KVxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmNvbXBhcmUoYSwgYik7XG4gICAgICAgIC8vIFdlIGZvcmNlIDxhbnk+IGhlcmUgc2luY2UgaXQgY2FuIGJlIGEgUHJpbWl0aXZlIG9yIElDb21wYXJhYmxlPGFueT5cbiAgICAgICAgY29uc3QgZCA9IFZhbHVlcy5jb21wYXJlKGtzKGEpLCBrcyhiKSk7XG4gICAgICAgIGlmIChkID09IDAgJiYgXy5fbmV4dClcbiAgICAgICAgICAgIHJldHVybiBfLl9uZXh0LmNvbXBhcmUoYSwgYik7XG4gICAgICAgIHJldHVybiBfLl9vcmRlciAqIGQ7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgS2V5U29ydGVkQ29udGV4dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUtleVNvcnRlZENvbnRleHQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9Db2xsZWN0aW9ucy9Tb3J0aW5nL0tleVNvcnRlZENvbnRleHQuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0ICogYXMgVmFsdWVzIGZyb20gXCIuLi8uLi9Db21wYXJlXCI7XG5leHBvcnQgY2xhc3MgU29ydENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKF9uZXh0LCBfY29tcGFyZXIgPSBWYWx1ZXMuY29tcGFyZSwgX29yZGVyID0gMSAvKiBBc2NlbmRpbmcgKi8pIHtcbiAgICAgICAgdGhpcy5fbmV4dCA9IF9uZXh0O1xuICAgICAgICB0aGlzLl9jb21wYXJlciA9IF9jb21wYXJlcjtcbiAgICAgICAgdGhpcy5fb3JkZXIgPSBfb3JkZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpcmVjdGlvbiBvZiB0aGUgY29tcGFyaXNvbi5cbiAgICAgKiBAdHlwZSB7T3JkZXJ9XG4gICAgICovXG4gICAgZ2V0IG9yZGVyKCkgeyByZXR1cm4gdGhpcy5fb3JkZXI7IH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYW4gYXJyYXkgb2YgaW5kZXhlcyBmcm9tIHRoZSBzb3VyY2UgaW4gb3JkZXIgb2YgdGhlaXIgZXhwZWN0ZWQgaW50ZXJuYWxTb3J0IHdpdGhvdXQgbW9kaWZ5aW5nIHRoZSBzb3VyY2UuXG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVNvcnRlZEluZGV4ZXMoc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gc291cmNlLm1hcCgocywgaSkgPT4gaSk7XG4gICAgICAgIHJlc3VsdC5zb3J0KChhLCBiKSA9PiB0aGlzLmNvbXBhcmUoc291cmNlW2FdLCBzb3VyY2VbYl0pKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcGFyZXMgdHdvIHZhbHVlcyBiYXNlZCB1cG9uIFNvcnRDb250ZXh0IHBhcmFtZXRlcnMuXG4gICAgICogQHBhcmFtIGFcbiAgICAgKiBAcGFyYW0gYlxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgY29tcGFyZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBjb25zdCBkID0gXy5fY29tcGFyZXIoYSwgYik7XG4gICAgICAgIGlmIChkID09IDAgJiYgXy5fbmV4dClcbiAgICAgICAgICAgIHJldHVybiBfLl9uZXh0LmNvbXBhcmUoYSwgYik7XG4gICAgICAgIHJldHVybiBfLl9vcmRlciAqIGQ7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU29ydENvbnRleHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Tb3J0Q29udGV4dC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL1NvcnRpbmcvU29ydENvbnRleHQuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVFxuICovXG5pbXBvcnQgeyBJbnRlZ2VyIH0gZnJvbSBcIi4vSW50ZWdlclwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25zL0FycmF5L2luaXRpYWxpemVcIjtcbmltcG9ydCB7IHNodWZmbGUgYXMgYXJyYXlTaHVmZmxlIH0gZnJvbSBcIi4vQ29sbGVjdGlvbnMvQXJyYXkvc2h1ZmZsZVwiO1xudmFyIGFzc2VydCA9IEludGVnZXIuYXNzZXJ0O1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBvbmx5IGFjdHMgYXMgYSB1dGlsaXR5IEFQSSBmb3IgZ2V0dGluZyByYW5kb20gbnVtYmVycyBmcm9tIE1hdGgucmFuZG9tKCkuXG4gKiBJZiB5b3UgbmVlZCByZXBlYXRhYmxlIHNlZWRlZCByYW5kb20gbnVtYmVycyB0aGVuIHlvdSdsbCBuZWVkIGEgc2VwYXJhdGUgdXRpbGl0eS5cbiAqIEhpZ2hseSByZWNvbW1lbmRlZDogaHR0cHM6Ly9naXRodWIuY29tL2Nra25pZ2h0L3JhbmRvbS1qcyB3aGljaCBoYXMgdHlwaW5ncyB1bmRlciBAdHlwZXMvcmFuZG9tLWpzLlxuICovXG5leHBvcnQgdmFyIFJhbmRvbTtcbihmdW5jdGlvbiAoUmFuZG9tKSB7XG4gICAgZnVuY3Rpb24gcihtYXhFeGNsdXNpdmUgPSAxKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXhFeGNsdXNpdmUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBucihib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgIGNvbnN0IGEgPSBNYXRoLmFicyhib3VuZGFyeSk7XG4gICAgICAgIGlmIChhID09PSAwIHx8IGEgPT09IDEgJiYgIWluY2x1c2l2ZSlcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBpZiAoaW5jbHVzaXZlKVxuICAgICAgICAgICAgYm91bmRhcnkgKz0gYm91bmRhcnkgLyBhO1xuICAgICAgICByZXR1cm4gcihib3VuZGFyeSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFycmF5Q29weShzb3VyY2UpIHtcbiAgICAgICAgY29uc3QgbGVuID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gaW5pdGlhbGl6ZShsZW4pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHRbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGZyb20gMCB0byB0aGUgbWF4RXhjbHVzaXZlLlxuICAgICAqIE5lZ2F0aXZlIG51bWJlcnMgYXJlIGFsbG93ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWF4RXhjbHVzaXZlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnRlZ2VyKG1heEV4Y2x1c2l2ZSkge1xuICAgICAgICByZXR1cm4gbmV4dChtYXhFeGNsdXNpdmUpO1xuICAgIH1cbiAgICBSYW5kb20uaW50ZWdlciA9IGludGVnZXI7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIHJhbmRvbSBmbG9hdGluZyBwb2ludCBudW1iZXJzIHVwIHRvIHRoZSBtYXhFeGNsdXNpdmUgdmFsdWUuXG4gICAgICogVXNlZnVsIGZvciBnZW5lcmF0aW5nIGEgcmFuZG9tIGFuZCBtZW1vaXphYmxlIHNldCBmb3IgdXNlIHdpdGggb3RoZXIgZW51bWVyYWJsZXMuXG4gICAgICogQHBhcmFtIG1heEV4Y2x1c2l2ZVxuICAgICAqIEByZXR1cm5zIHsoKT0+bnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdlbmVyYXRlKG1heEV4Y2x1c2l2ZSA9IDEpIHtcbiAgICAgICAgcmV0dXJuICgpID0+IHIobWF4RXhjbHVzaXZlKTtcbiAgICB9XG4gICAgUmFuZG9tLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG4gICAgKGZ1bmN0aW9uIChnZW5lcmF0ZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIHJhbmRvbSBpbnRlZ2VycyB1cCB0byB0aGUgYm91bmRhcnkuXG4gICAgICAgICAqIFVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBhIHJhbmRvbSBhbmQgbWVtb2l6YWJsZSBzZXQgZm9yIHVzZSB3aXRoIG90aGVyIGVudW1lcmFibGVzLlxuICAgICAgICAgKiBAcGFyYW0gYm91bmRhcnlcbiAgICAgICAgICogQHBhcmFtIGluY2x1c2l2ZVxuICAgICAgICAgKiBAcmV0dXJucyB7KCk9Pm51bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGludGVnZXJzKGJvdW5kYXJ5LCBpbmNsdXNpdmUpIHtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBucihib3VuZGFyeSwgaW5jbHVzaXZlKTtcbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0ZS5pbnRlZ2VycyA9IGludGVnZXJzO1xuICAgIH0pKGdlbmVyYXRlID0gUmFuZG9tLmdlbmVyYXRlIHx8IChSYW5kb20uZ2VuZXJhdGUgPSB7fSkpO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBmcm9tIDAgdG8gdGhlIGJvdW5kYXJ5LlxuICAgICAqIFJldHVybiB2YWx1ZSB3aWxsIGJlIGxlc3MgdGhhbiB0aGUgYm91bmRhcnkgdW5sZXNzIGluY2x1c2l2ZSBpcyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBOZWdhdGl2ZSBudW1iZXJzIGFyZSBhbGxvd2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGJvdW5kYXJ5XG4gICAgICogQHBhcmFtIGluY2x1c2l2ZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gbmV4dChib3VuZGFyeSwgaW5jbHVzaXZlKSB7XG4gICAgICAgIGFzc2VydChib3VuZGFyeSwgJ2JvdW5kYXJ5Jyk7XG4gICAgICAgIHJldHVybiBucihib3VuZGFyeSwgaW5jbHVzaXZlKTtcbiAgICB9XG4gICAgUmFuZG9tLm5leHQgPSBuZXh0O1xuICAgIChmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICBmdW5jdGlvbiBpbnRlZ2VyKGJvdW5kYXJ5LCBpbmNsdXNpdmUpIHtcbiAgICAgICAgICAgIHJldHVybiBSYW5kb20ubmV4dChib3VuZGFyeSwgaW5jbHVzaXZlKTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0LmludGVnZXIgPSBpbnRlZ2VyO1xuICAgICAgICBmdW5jdGlvbiBmbG9hdChib3VuZGFyeSA9IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgICAgIGlmIChpc05hTihib3VuZGFyeSkpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCInYm91bmRhcnknIGlzIG5vdCBhIG51bWJlci5cIjtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogYm91bmRhcnk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5mbG9hdCA9IGZsb2F0O1xuICAgICAgICBmdW5jdGlvbiBpblJhbmdlKG1pbiwgbWF4LCBpbmNsdXNpdmUpIHtcbiAgICAgICAgICAgIGFzc2VydChtaW4sICdtaW4nKTtcbiAgICAgICAgICAgIGFzc2VydChtYXgsICdtYXgnKTtcbiAgICAgICAgICAgIGxldCByYW5nZSA9IG1heCAtIG1pbjtcbiAgICAgICAgICAgIGlmIChyYW5nZSA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gbWluO1xuICAgICAgICAgICAgaWYgKGluY2x1c2l2ZSlcbiAgICAgICAgICAgICAgICByYW5nZSArPSByYW5nZSAvIE1hdGguYWJzKHJhbmdlKTtcbiAgICAgICAgICAgIHJldHVybiBtaW4gKyByKHJhbmdlKTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0LmluUmFuZ2UgPSBpblJhbmdlO1xuICAgIH0pKG5leHQgPSBSYW5kb20ubmV4dCB8fCAoUmFuZG9tLm5leHQgPSB7fSkpO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgcmFuZG9tIGludGVnZXJzLlxuICAgICAqIEBwYXJhbSBjb3VudFxuICAgICAqIEBwYXJhbSBib3VuZGFyeVxuICAgICAqIEBwYXJhbSBpbmNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XG4gICAgICovXG4gICAgZnVuY3Rpb24gaW50ZWdlcnMoY291bnQsIGJvdW5kYXJ5LCBpbmNsdXNpdmUpIHtcbiAgICAgICAgYXNzZXJ0KGNvdW50KTtcbiAgICAgICAgY29uc3QgcyA9IFtdO1xuICAgICAgICBzLmxlbmd0aCA9IGNvdW50O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHNbaV0gPSBucihib3VuZGFyeSwgaW5jbHVzaXZlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgUmFuZG9tLmludGVnZXJzID0gaW50ZWdlcnM7XG4gICAgLyoqXG4gICAgICogU2h1ZmZsZXMgYW4gYXJyYXkuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEByZXR1cm5zIHtUfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNodWZmbGUodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBhcnJheVNodWZmbGUodGFyZ2V0KTtcbiAgICB9XG4gICAgUmFuZG9tLnNodWZmbGUgPSBzaHVmZmxlO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIGFuIGFycmF5LWxpa2UgIGFuZCByZXR1cm5zIGl0IHNodWZmbGVkLlxuICAgICAqIEBwYXJhbSBzb3VyY2VcbiAgICAgKiBAcmV0dXJucyB7VFtdfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvcHkoc291cmNlKSB7XG4gICAgICAgIHJldHVybiBhcnJheVNodWZmbGUoYXJyYXlDb3B5KHNvdXJjZSkpO1xuICAgIH1cbiAgICBSYW5kb20uY29weSA9IGNvcHk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGRpc3RpbmN0IHJhbmRvbSBzZXQgZnJvbSB0aGUgc291cmNlIGFycmF5IHVwIHRvIHRoZSBtYXhDb3VudCBvciB0aGUgZnVsbCBsZW5ndGggb2YgdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSBzb3VyY2VcbiAgICAgKiBAcGFyYW0gbWF4Q291bnRcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlbGVjdChzb3VyY2UsIG1heENvdW50KSB7XG4gICAgICAgIGlmIChtYXhDb3VudCAhPT0gSW5maW5pdHkpXG4gICAgICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIobWF4Q291bnQpO1xuICAgICAgICBzd2l0Y2ggKG1heENvdW50KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiBbc2VsZWN0Lm9uZShzb3VyY2UsIHRydWUpXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGFycmF5U2h1ZmZsZShhcnJheUNvcHkoc291cmNlKSk7XG4gICAgICAgICAgICAgICAgaWYgKG1heENvdW50IDwgcmVzdWx0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmxlbmd0aCA9IG1heENvdW50O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUmFuZG9tLnNlbGVjdCA9IHNlbGVjdDtcbiAgICAoZnVuY3Rpb24gKHNlbGVjdCkge1xuICAgICAgICBmdW5jdGlvbiBvbmUoc291cmNlLCB0aHJvd0lmRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgJiYgc291cmNlLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlW3Ioc291cmNlLmxlbmd0aCldO1xuICAgICAgICAgICAgaWYgKHRocm93SWZFbXB0eSlcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbm5vdCBzZWxlY3QgZnJvbSBhbiBlbXB0eSBzZXQuXCI7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0Lm9uZSA9IG9uZTtcbiAgICB9KShzZWxlY3QgPSBSYW5kb20uc2VsZWN0IHx8IChSYW5kb20uc2VsZWN0ID0ge30pKTtcbn0pKFJhbmRvbSB8fCAoUmFuZG9tID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJhbmRvbS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL1JhbmRvbS5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIEBhdXRob3IgZWxlY3RyaWNlc3NlbmNlIC8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cmljZXNzZW5jZS9cbiAqIExpY2Vuc2luZzogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvVHlwZVNjcmlwdC5ORVQvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG4vKipcbiAqIFJhbmRvbWl6ZSBhcnJheSBlbGVtZW50IG9yZGVyIGluLXBsYWNlLlxuICogVXNpbmcgRHVyc3RlbmZlbGQgc2h1ZmZsZSBhbGdvcml0aG0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaHVmZmxlKHRhcmdldCkge1xuICAgIGxldCBpID0gdGFyZ2V0Lmxlbmd0aDtcbiAgICB3aGlsZSAoLS1pKSB7XG4gICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgY29uc3QgdGVtcCA9IHRhcmdldFtpXTtcbiAgICAgICAgdGFyZ2V0W2ldID0gdGFyZ2V0W2pdO1xuICAgICAgICB0YXJnZXRbal0gPSB0ZW1wO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2h1ZmZsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5L3NodWZmbGUuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBPcmlnaW46IGh0dHA6Ly93d3cuZmFsbGluZ2NhbmJlZGVhZGx5LmNvbS9cbiAqIExpY2Vuc2luZzogTUlUXG4gKi9cbmltcG9ydCB7IFJlYWRPbmx5Q29sbGVjdGlvbkJhc2UgfSBmcm9tIFwiLi9SZWFkT25seUNvbGxlY3Rpb25CYXNlXCI7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24gfSBmcm9tIFwiLi4vRXhjZXB0aW9ucy9Bcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb25cIjtcbmltcG9ydCB7IEVudW1lcmF0b3JCYXNlIH0gZnJvbSBcIi4vRW51bWVyYXRpb24vRW51bWVyYXRvckJhc2VcIjtcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tIFwiLi4vSW50ZWdlclwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5leHBvcnQgY2xhc3MgTGF6eUxpc3QgZXh0ZW5kcyBSZWFkT25seUNvbGxlY3Rpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZW51bWVyYXRvciA9IHNvdXJjZS5nZXRFbnVtZXJhdG9yKCk7XG4gICAgICAgIHRoaXMuX2NhY2hlZCA9IFtdO1xuICAgIH1cbiAgICBfb25EaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5fb25EaXNwb3NlKCk7XG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLl9lbnVtZXJhdG9yO1xuICAgICAgICB0aGlzLl9lbnVtZXJhdG9yID0gbnVsbDtcbiAgICAgICAgaWYgKGUpXG4gICAgICAgICAgICBlLmRpc3Bvc2UoKTtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgdGhpcy5fY2FjaGVkID0gbnVsbDtcbiAgICAgICAgaWYgKGMpXG4gICAgICAgICAgICBjLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIF9nZXRDb3VudCgpIHtcbiAgICAgICAgdGhpcy5maW5pc2goKTtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgcmV0dXJuIGMgPyBjLmxlbmd0aCA6IDA7XG4gICAgfVxuICAgIF9nZXRFbnVtZXJhdG9yKCkge1xuICAgICAgICBsZXQgY3VycmVudDtcbiAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yQmFzZSgoKSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50ID0gMDtcbiAgICAgICAgfSwgeWllbGRlciA9PiB7XG4gICAgICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuX2NhY2hlZDtcbiAgICAgICAgICAgIHJldHVybiAoY3VycmVudCA8IGMubGVuZ3RoIHx8IHRoaXMuZ2V0TmV4dCgpKVxuICAgICAgICAgICAgICAgID8geWllbGRlci55aWVsZFJldHVybihjW2N1cnJlbnQrK10pXG4gICAgICAgICAgICAgICAgOiB5aWVsZGVyLnlpZWxkQnJlYWsoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldChpbmRleCkge1xuICAgICAgICB0aGlzLnRocm93SWZEaXNwb3NlZCgpO1xuICAgICAgICBJbnRlZ2VyLmFzc2VydFplcm9PckdyZWF0ZXIoaW5kZXgpO1xuICAgICAgICBjb25zdCBjID0gdGhpcy5fY2FjaGVkO1xuICAgICAgICB3aGlsZSAoYy5sZW5ndGggPD0gaW5kZXggJiYgdGhpcy5nZXROZXh0KCkpIHsgfVxuICAgICAgICBpZiAoaW5kZXggPCBjLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBjW2luZGV4XTtcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcImluZGV4XCIsIFwiR3JlYXRlciB0aGFuIHRvdGFsIGNvdW50LlwiKTtcbiAgICB9XG4gICAgaW5kZXhPZihpdGVtKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9jYWNoZWQ7XG4gICAgICAgIGxldCByZXN1bHQgPSBjLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIHdoaWxlIChyZXN1bHQgPT0gLTEgJiYgdGhpcy5nZXROZXh0KHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBpdGVtKVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGMubGVuZ3RoIC0gMTtcbiAgICAgICAgfSkpIHsgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjb250YWlucyhpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4T2YoaXRlbSkgIT0gLTE7XG4gICAgfVxuICAgIGdldE5leHQob3V0KSB7XG4gICAgICAgIGNvbnN0IGUgPSB0aGlzLl9lbnVtZXJhdG9yO1xuICAgICAgICBpZiAoIWUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChlLm1vdmVOZXh0KCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZS5jdXJyZW50O1xuICAgICAgICAgICAgdGhpcy5fY2FjaGVkLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgaWYgKG91dClcbiAgICAgICAgICAgICAgICBvdXQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2VudW1lcmF0b3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZmluaXNoKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0KCkpIHsgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxhenlMaXN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtZG90bmV0LWVzNi9TeXN0ZW0vQ29sbGVjdGlvbnMvTGF6eUxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgQ29sbGVjdGlvbkJhc2UgfSBmcm9tIFwiLi9Db2xsZWN0aW9uQmFzZVwiO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5leHBvcnQgY2xhc3MgUmVhZE9ubHlDb2xsZWN0aW9uQmFzZSBleHRlbmRzIENvbGxlY3Rpb25CYXNlIHtcbiAgICBnZXRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENvdW50KCk7XG4gICAgfVxuICAgIGdldElzUmVhZE9ubHkoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIF9hZGRJbnRlcm5hbChlbnRyeSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgX3JlbW92ZUludGVybmFsKGVudHJ5LCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIF9jbGVhckludGVybmFsKCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgZ2V0RW51bWVyYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEVudW1lcmF0b3IoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBSZWFkT25seUNvbGxlY3Rpb25CYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVhZE9ubHlDb2xsZWN0aW9uQmFzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0LWRvdG5ldC1lczYvU3lzdGVtL0NvbGxlY3Rpb25zL1JlYWRPbmx5Q29sbGVjdGlvbkJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBAYXV0aG9yIGVsZWN0cmljZXNzZW5jZSAvIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJpY2Vzc2VuY2UvXG4gKiAuTkVUIFJlZmVyZW5jZTogaHR0cDovL3JlZmVyZW5jZXNvdXJjZS5taWNyb3NvZnQuY29tLyNtc2NvcmxpYi9zeXN0ZW0vdGV4dC9TdHJpbmdCdWlsZGVyLmNzXG4gKiBMaWNlbnNpbmc6IE1JVCBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RyaWNlc3NlbmNlL1R5cGVTY3JpcHQuTkVUL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9UeXBlc1wiO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJTVBPUlRBTlQgTk9URVMgQUJPVVQgUEVSRk9STUFOQ0U6XG4gKiBodHRwOi8vanNwZXJmLmNvbS9zdHJpbmctY29uY2F0ZW5hdGlvbi1sb29wZWRcbiAqIGh0dHA6Ly9qc3BlcmYuY29tL2FkZGluZy1zdHJpbmdzLXRvLWFuLWFycmF5XG4gKiBodHRwOi8vanNwZXJmLmNvbS9zdHJpbmctY29uY2F0ZW5hdGlvbi12ZXJzdXMtYXJyYXktb3BlcmF0aW9ucy13aXRoLWpvaW5cbiAqXG4gKiBJdCBpcyBjbGVhcmx5IGluZWZmaWNpZW50IHRvIHVzZSBhIFN0cmluZ0J1aWxkZXIgb3IgTGlua2VkTGlzdCB0byBidWlsZCBhIHN0cmluZyB3aGVuIHlvdSBoYXZlIGEgc21hbGwgc2V0IG9mIHN0cmluZyBwb3J0aW9ucy5cbiAqIFN0cmluZ0J1aWxkZXIgd2lsbCByZWFsbHkgc2hvdyBpdCdzIGJlbmVmaXQgbGlrZWx5IHNvbWV3aGVyZSBhYm92ZSAxMDAwIGl0ZW1zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY29uc3QgRU1QVFkgPSBcIlwiO1xuY29uc3QgTkVXTElORSA9IFwiXFxyXFxuXCI7XG5leHBvcnQgY2xhc3MgU3RyaW5nQnVpbGRlciB7XG4gICAgY29uc3RydWN0b3IoLi4uaW5pdGlhbCkge1xuICAgICAgICB0aGlzLl9sYXRlc3QgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJ0QXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5hcHBlbmRUaGVzZShpbml0aWFsKTtcbiAgICB9XG4gICAgYXBwZW5kU2luZ2xlKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgXyA9IHRoaXM7XG4gICAgICAgICAgICBfLl9sYXRlc3QgPSBudWxsO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgaXRlbSkge1xuICAgICAgICAgICAgICAgIGNhc2UgVHlwZS5PQkpFQ1Q6XG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlLkZVTkNUSU9OOlxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF8uX3BhcnRBcnJheS5wdXNoKGl0ZW0pOyAvLyBPdGhlciBwcmltaXRpdmUgdHlwZXMgY2FuIGtlZXAgdGhlaXIgZm9ybWF0IHNpbmNlIGEgbnVtYmVyIG9yIGJvb2xlYW4gaXMgYSBzbWFsbGVyIGZvb3RwcmludCB0aGFuIGEgc3RyaW5nLlxuICAgICAgICB9XG4gICAgfVxuICAgIGFwcGVuZFRoZXNlKGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpdGVtcy5mb3JFYWNoKHMgPT4gXy5hcHBlbmRTaW5nbGUocykpO1xuICAgICAgICByZXR1cm4gXztcbiAgICB9XG4gICAgYXBwZW5kKC4uLml0ZW1zKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kVGhlc2UoaXRlbXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXBwZW5kTGluZSguLi5pdGVtcykge1xuICAgICAgICB0aGlzLmFwcGVuZExpbmVzKGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFwcGVuZExpbmVzKGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IF8gPSB0aGlzO1xuICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIF8uYXBwZW5kU2luZ2xlKGkpO1xuICAgICAgICAgICAgICAgIF8uX3BhcnRBcnJheS5wdXNoKE5FV0xJTkUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIF87XG4gICAgfVxuICAgIC8qKiAvLy8gVGhlc2UgbWV0aG9kcyBjYW4gb25seSBlZmZpY2llbnRseSBiZSBhZGRlZCBpZiBub3QgdXNpbmcgYSBzaW5nbGUgYXJyYXkuXG4gICAgIGluc2VydChpbmRleDogbnVtYmVyLCB2YWx1ZTogc3RyaW5nLCBjb3VudDogbnVtYmVyID0gMSk6IFN0cmluZ0J1aWxkZXJcbiAgICAge1xuICAgIH1cbiAgICAgcmVtb3ZlKHN0YXJ0SW5kZXg6bnVtYmVyLCBsZW5ndGg6bnVtYmVyKTogU3RyaW5nQnVpbGRlclxuICAgICB7XG4gICAgfVxuICAgICAvKiovXG4gICAgZ2V0IGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJ0QXJyYXkubGVuZ3RoID09PSAwO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgbGV0IGxhdGVzdCA9IHRoaXMuX2xhdGVzdDtcbiAgICAgICAgaWYgKGxhdGVzdCA9PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5fbGF0ZXN0ID0gbGF0ZXN0ID0gdGhpcy5fcGFydEFycmF5LmpvaW4oRU1QVFkpO1xuICAgICAgICByZXR1cm4gbGF0ZXN0O1xuICAgIH1cbiAgICBqb2luKGRlbGltaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFydEFycmF5LmpvaW4oZGVsaW1pdGVyKTtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX3BhcnRBcnJheS5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9sYXRlc3QgPSBudWxsO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU3RyaW5nQnVpbGRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0cmluZ0J1aWxkZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1kb3RuZXQtZXM2L1N5c3RlbS9UZXh0L1N0cmluZ0J1aWxkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIl0sInNvdXJjZVJvb3QiOiIifQ==