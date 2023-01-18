import { c as commonjsGlobal, v as require$$1, w as elliptic$1, x as getAugmentedNamespace, h as getDefaultExportFromCjs } from "./_page-a9965d2d.js";
import { a as abstractLevel, m as moduleError, b as browser } from "./browser-cdef6114.js";
import { b as bignumberExports$1, r as requireUtil } from "./bignumber-bfee6961.js";
import { b as base64Js } from "./index-9d4233a1.js";
import { a as asn1, b as bnExports$1, s as safeBufferExports } from "./asn1-706e32d3.js";
import { b as buffer } from "./index-4cd244b0.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var cjs$1 = {};
var ConsoleLogger$1 = {};
var LoggerSettings = {};
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.lvlToOrder = exports2.LogLevelOrder = void 0;
  exports2.LogLevelOrder = {
    silly: 0,
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    fatal: 6,
    none: 7
  };
  function lvlToOrder(logLevel) {
    return exports2.LogLevelOrder[logLevel];
  }
  exports2.lvlToOrder = lvlToOrder;
})(LoggerSettings);
Object.defineProperty(ConsoleLogger$1, "__esModule", { value: true });
ConsoleLogger$1.ConsoleLogger = void 0;
const LoggerSettings_1 = LoggerSettings;
class ConsoleLogger {
  constructor(moduleName, settings) {
    this.moduleName = moduleName;
    this.settings = settings;
  }
  trace(message, ...optionalParams) {
    if (this.shouldLog("trace")) {
      console.debug(this.message("trace", message), optionalParams);
    }
  }
  error(message, ...optionalParams) {
    if (this.shouldLog("error")) {
      console.error(this.message("error", message), optionalParams);
    }
  }
  info(message, ...optionalParams) {
    if (this.shouldLog("info")) {
      console.info(this.message("info", message), optionalParams);
    }
  }
  silly(message, ...optionalParams) {
    if (this.shouldLog("silly")) {
      console.debug(this.message("silly", message), optionalParams);
    }
  }
  debug(message, ...optionalParams) {
    if (this.shouldLog("debug")) {
      console.debug(this.message("debug", message), optionalParams);
    }
  }
  warn(message, ...optionalParams) {
    if (this.shouldLog("warn")) {
      console.warn(this.message("warn", message), optionalParams);
    }
  }
  log(message, ...optionalParams) {
    if (this.shouldLog("info")) {
      console.info(this.message("info", message), optionalParams);
    }
  }
  fatal(message, ...optionalParams) {
    if (this.shouldLog("fatal")) {
      console.error(this.message("fatal", message), optionalParams);
    }
  }
  shouldLog(logLevel) {
    return (0, LoggerSettings_1.lvlToOrder)(logLevel) >= (0, LoggerSettings_1.lvlToOrder)(this.settings.minLevel);
  }
  setSettings(settings) {
    this.settings = settings;
  }
  message(lvl, message) {
    return `${new Date().toISOString()} ${lvl.toUpperCase()} [${this.moduleName}] ${message}`;
  }
}
ConsoleLogger$1.ConsoleLogger = ConsoleLogger;
var ConsoleLoggerFactory$1 = {};
Object.defineProperty(ConsoleLoggerFactory$1, "__esModule", { value: true });
ConsoleLoggerFactory$1.ConsoleLoggerFactory = void 0;
const ConsoleLogger_1 = ConsoleLogger$1;
class ConsoleLoggerFactory {
  constructor() {
    this.registeredLoggers = {};
    this.registeredOptions = {};
    this.defOptions = {
      minLevel: "info"
    };
    this.setOptions = this.setOptions.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.create = this.create.bind(this);
    this.logLevel = this.logLevel.bind(this);
  }
  setOptions(newOptions, moduleName) {
    if (!moduleName) {
      this.defOptions = newOptions;
      Object.keys(this.registeredLoggers).forEach((key2) => {
        this.registeredLoggers[key2].setSettings({
          ...this.registeredLoggers[key2].settings,
          ...newOptions
        });
      });
    } else {
      if (this.registeredLoggers[moduleName]) {
        this.registeredLoggers[moduleName].setSettings({
          ...this.registeredLoggers[moduleName].settings,
          ...newOptions
        });
      } else {
        this.registeredOptions[moduleName] = {
          ...this.defOptions,
          ...newOptions
        };
      }
    }
  }
  getOptions(moduleName) {
    if (!moduleName) {
      return this.defOptions;
    } else {
      if (this.registeredLoggers[moduleName]) {
        return this.registeredLoggers[moduleName].settings;
      } else if (this.registeredOptions[moduleName]) {
        return this.registeredOptions[moduleName];
      } else {
        return this.defOptions;
      }
    }
  }
  logLevel(level, moduleName) {
    this.setOptions({ minLevel: level }, moduleName);
  }
  create(moduleName = "SWC") {
    if (!Object.prototype.hasOwnProperty.call(this.registeredLoggers, moduleName)) {
      this.registeredLoggers[moduleName] = new ConsoleLogger_1.ConsoleLogger(moduleName, this.getOptions(moduleName));
    }
    return this.registeredLoggers[moduleName];
  }
}
ConsoleLoggerFactory$1.ConsoleLoggerFactory = ConsoleLoggerFactory;
var WarpLogger = {};
Object.defineProperty(WarpLogger, "__esModule", { value: true });
var LoggerFactory$1 = {};
Object.defineProperty(LoggerFactory$1, "__esModule", { value: true });
LoggerFactory$1.LoggerFactory = void 0;
const ConsoleLoggerFactory_1 = ConsoleLoggerFactory$1;
class LoggerFactory {
  constructor() {
  }
  setOptions(newOptions, moduleName) {
    LoggerFactory.INST.setOptions(newOptions, moduleName);
  }
  getOptions(moduleName) {
    return LoggerFactory.INST.getOptions(moduleName);
  }
  logLevel(level, moduleName) {
    LoggerFactory.INST.logLevel(level, moduleName);
  }
  create(moduleName) {
    return LoggerFactory.INST.create(moduleName);
  }
  static use(logger) {
    LoggerFactory.INST = logger;
  }
}
LoggerFactory$1.LoggerFactory = LoggerFactory;
LoggerFactory.INST = new ConsoleLoggerFactory_1.ConsoleLoggerFactory();
var Benchmark$1 = {};
Object.defineProperty(Benchmark$1, "__esModule", { value: true });
Benchmark$1.Benchmark = void 0;
class Benchmark {
  static measure() {
    return new Benchmark();
  }
  constructor() {
    this.start = Date.now();
    this.end = null;
  }
  reset() {
    this.start = Date.now();
    this.end = null;
  }
  stop() {
    this.end = Date.now();
  }
  elapsed(rawValue = false) {
    if (this.end === null) {
      this.end = Date.now();
    }
    const result = this.end - this.start;
    return rawValue ? result : `${(this.end - this.start).toFixed(0)}ms`;
  }
}
Benchmark$1.Benchmark = Benchmark;
var SortKeyCache = {};
Object.defineProperty(SortKeyCache, "__esModule", { value: true });
SortKeyCache.SortKeyCacheResult = SortKeyCache.CacheKey = void 0;
class CacheKey {
  constructor(contractTxId, sortKey) {
    this.contractTxId = contractTxId;
    this.sortKey = sortKey;
  }
}
SortKeyCache.CacheKey = CacheKey;
class SortKeyCacheResult {
  constructor(sortKey, cachedValue) {
    this.sortKey = sortKey;
    this.cachedValue = cachedValue;
  }
}
SortKeyCache.SortKeyCacheResult = SortKeyCacheResult;
var WarpCache = {};
Object.defineProperty(WarpCache, "__esModule", { value: true });
var LevelDbCache$1 = {};
var memoryLevel = {};
var rbtree = createRBTree;
var RED = 0;
var BLACK = 1;
function RBNode(color, key2, value, left, right, count) {
  this._color = color;
  this.key = key2;
  this.value = value;
  this.left = left;
  this.right = right;
  this._count = count;
}
function cloneNode(node) {
  return new RBNode(node._color, node.key, node.value, node.left, node.right, node._count);
}
function repaint(color, node) {
  return new RBNode(color, node.key, node.value, node.left, node.right, node._count);
}
function recount(node) {
  node._count = 1 + (node.left ? node.left._count : 0) + (node.right ? node.right._count : 0);
}
function RedBlackTree(compare2, root2) {
  this._compare = compare2;
  this.root = root2;
}
var proto = RedBlackTree.prototype;
Object.defineProperty(proto, "keys", {
  get: function() {
    var result = [];
    this.forEach(function(k, v) {
      result.push(k);
    });
    return result;
  }
});
Object.defineProperty(proto, "values", {
  get: function() {
    var result = [];
    this.forEach(function(k, v) {
      result.push(v);
    });
    return result;
  }
});
Object.defineProperty(proto, "length", {
  get: function() {
    if (this.root) {
      return this.root._count;
    }
    return 0;
  }
});
proto.insert = function(key2, value) {
  var cmp = this._compare;
  var n = this.root;
  var n_stack = [];
  var d_stack = [];
  while (n) {
    var d = cmp(key2, n.key);
    n_stack.push(n);
    d_stack.push(d);
    if (d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  n_stack.push(new RBNode(RED, key2, value, null, null, 1));
  for (var s = n_stack.length - 2; s >= 0; --s) {
    var n = n_stack[s];
    if (d_stack[s] <= 0) {
      n_stack[s] = new RBNode(n._color, n.key, n.value, n_stack[s + 1], n.right, n._count + 1);
    } else {
      n_stack[s] = new RBNode(n._color, n.key, n.value, n.left, n_stack[s + 1], n._count + 1);
    }
  }
  for (var s = n_stack.length - 1; s > 1; --s) {
    var p = n_stack[s - 1];
    var n = n_stack[s];
    if (p._color === BLACK || n._color === BLACK) {
      break;
    }
    var pp = n_stack[s - 2];
    if (pp.left === p) {
      if (p.left === n) {
        var y = pp.right;
        if (y && y._color === RED) {
          p._color = BLACK;
          pp.right = repaint(BLACK, y);
          pp._color = RED;
          s -= 1;
        } else {
          pp._color = RED;
          pp.left = p.right;
          p._color = BLACK;
          p.right = pp;
          n_stack[s - 2] = p;
          n_stack[s - 1] = n;
          recount(pp);
          recount(p);
          if (s >= 3) {
            var ppp = n_stack[s - 3];
            if (ppp.left === pp) {
              ppp.left = p;
            } else {
              ppp.right = p;
            }
          }
          break;
        }
      } else {
        var y = pp.right;
        if (y && y._color === RED) {
          p._color = BLACK;
          pp.right = repaint(BLACK, y);
          pp._color = RED;
          s -= 1;
        } else {
          p.right = n.left;
          pp._color = RED;
          pp.left = n.right;
          n._color = BLACK;
          n.left = p;
          n.right = pp;
          n_stack[s - 2] = n;
          n_stack[s - 1] = p;
          recount(pp);
          recount(p);
          recount(n);
          if (s >= 3) {
            var ppp = n_stack[s - 3];
            if (ppp.left === pp) {
              ppp.left = n;
            } else {
              ppp.right = n;
            }
          }
          break;
        }
      }
    } else {
      if (p.right === n) {
        var y = pp.left;
        if (y && y._color === RED) {
          p._color = BLACK;
          pp.left = repaint(BLACK, y);
          pp._color = RED;
          s -= 1;
        } else {
          pp._color = RED;
          pp.right = p.left;
          p._color = BLACK;
          p.left = pp;
          n_stack[s - 2] = p;
          n_stack[s - 1] = n;
          recount(pp);
          recount(p);
          if (s >= 3) {
            var ppp = n_stack[s - 3];
            if (ppp.right === pp) {
              ppp.right = p;
            } else {
              ppp.left = p;
            }
          }
          break;
        }
      } else {
        var y = pp.left;
        if (y && y._color === RED) {
          p._color = BLACK;
          pp.left = repaint(BLACK, y);
          pp._color = RED;
          s -= 1;
        } else {
          p.left = n.right;
          pp._color = RED;
          pp.right = n.left;
          n._color = BLACK;
          n.right = p;
          n.left = pp;
          n_stack[s - 2] = n;
          n_stack[s - 1] = p;
          recount(pp);
          recount(p);
          recount(n);
          if (s >= 3) {
            var ppp = n_stack[s - 3];
            if (ppp.right === pp) {
              ppp.right = n;
            } else {
              ppp.left = n;
            }
          }
          break;
        }
      }
    }
  }
  n_stack[0]._color = BLACK;
  return new RedBlackTree(cmp, n_stack[0]);
};
function doVisitFull(visit, node) {
  if (node.left) {
    var v = doVisitFull(visit, node.left);
    if (v) {
      return v;
    }
  }
  var v = visit(node.key, node.value);
  if (v) {
    return v;
  }
  if (node.right) {
    return doVisitFull(visit, node.right);
  }
}
function doVisitHalf(lo, compare2, visit, node) {
  var l = compare2(lo, node.key);
  if (l <= 0) {
    if (node.left) {
      var v = doVisitHalf(lo, compare2, visit, node.left);
      if (v) {
        return v;
      }
    }
    var v = visit(node.key, node.value);
    if (v) {
      return v;
    }
  }
  if (node.right) {
    return doVisitHalf(lo, compare2, visit, node.right);
  }
}
function doVisit(lo, hi, compare2, visit, node) {
  var l = compare2(lo, node.key);
  var h = compare2(hi, node.key);
  var v;
  if (l <= 0) {
    if (node.left) {
      v = doVisit(lo, hi, compare2, visit, node.left);
      if (v) {
        return v;
      }
    }
    if (h > 0) {
      v = visit(node.key, node.value);
      if (v) {
        return v;
      }
    }
  }
  if (h > 0 && node.right) {
    return doVisit(lo, hi, compare2, visit, node.right);
  }
}
proto.forEach = function rbTreeForEach(visit, lo, hi) {
  if (!this.root) {
    return;
  }
  switch (arguments.length) {
    case 1:
      return doVisitFull(visit, this.root);
    case 2:
      return doVisitHalf(lo, this._compare, visit, this.root);
    case 3:
      if (this._compare(lo, hi) >= 0) {
        return;
      }
      return doVisit(lo, hi, this._compare, visit, this.root);
  }
};
Object.defineProperty(proto, "begin", {
  get: function() {
    var stack = [];
    var n = this.root;
    while (n) {
      stack.push(n);
      n = n.left;
    }
    return new RedBlackTreeIterator(this, stack);
  }
});
Object.defineProperty(proto, "end", {
  get: function() {
    var stack = [];
    var n = this.root;
    while (n) {
      stack.push(n);
      n = n.right;
    }
    return new RedBlackTreeIterator(this, stack);
  }
});
proto.at = function(idx) {
  if (idx < 0) {
    return new RedBlackTreeIterator(this, []);
  }
  var n = this.root;
  var stack = [];
  while (true) {
    stack.push(n);
    if (n.left) {
      if (idx < n.left._count) {
        n = n.left;
        continue;
      }
      idx -= n.left._count;
    }
    if (!idx) {
      return new RedBlackTreeIterator(this, stack);
    }
    idx -= 1;
    if (n.right) {
      if (idx >= n.right._count) {
        break;
      }
      n = n.right;
    } else {
      break;
    }
  }
  return new RedBlackTreeIterator(this, []);
};
proto.ge = function(key2) {
  var cmp = this._compare;
  var n = this.root;
  var stack = [];
  var last_ptr = 0;
  while (n) {
    var d = cmp(key2, n.key);
    stack.push(n);
    if (d <= 0) {
      last_ptr = stack.length;
    }
    if (d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  stack.length = last_ptr;
  return new RedBlackTreeIterator(this, stack);
};
proto.gt = function(key2) {
  var cmp = this._compare;
  var n = this.root;
  var stack = [];
  var last_ptr = 0;
  while (n) {
    var d = cmp(key2, n.key);
    stack.push(n);
    if (d < 0) {
      last_ptr = stack.length;
    }
    if (d < 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  stack.length = last_ptr;
  return new RedBlackTreeIterator(this, stack);
};
proto.lt = function(key2) {
  var cmp = this._compare;
  var n = this.root;
  var stack = [];
  var last_ptr = 0;
  while (n) {
    var d = cmp(key2, n.key);
    stack.push(n);
    if (d > 0) {
      last_ptr = stack.length;
    }
    if (d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  stack.length = last_ptr;
  return new RedBlackTreeIterator(this, stack);
};
proto.le = function(key2) {
  var cmp = this._compare;
  var n = this.root;
  var stack = [];
  var last_ptr = 0;
  while (n) {
    var d = cmp(key2, n.key);
    stack.push(n);
    if (d >= 0) {
      last_ptr = stack.length;
    }
    if (d < 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  stack.length = last_ptr;
  return new RedBlackTreeIterator(this, stack);
};
proto.find = function(key2) {
  var cmp = this._compare;
  var n = this.root;
  var stack = [];
  while (n) {
    var d = cmp(key2, n.key);
    stack.push(n);
    if (d === 0) {
      return new RedBlackTreeIterator(this, stack);
    }
    if (d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  return new RedBlackTreeIterator(this, []);
};
proto.remove = function(key2) {
  var iter = this.find(key2);
  if (iter) {
    return iter.remove();
  }
  return this;
};
proto.get = function(key2) {
  var cmp = this._compare;
  var n = this.root;
  while (n) {
    var d = cmp(key2, n.key);
    if (d === 0) {
      return n.value;
    }
    if (d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  return;
};
function RedBlackTreeIterator(tree, stack) {
  this.tree = tree;
  this._stack = stack;
}
var iproto = RedBlackTreeIterator.prototype;
Object.defineProperty(iproto, "valid", {
  get: function() {
    return this._stack.length > 0;
  }
});
Object.defineProperty(iproto, "node", {
  get: function() {
    if (this._stack.length > 0) {
      return this._stack[this._stack.length - 1];
    }
    return null;
  },
  enumerable: true
});
iproto.clone = function() {
  return new RedBlackTreeIterator(this.tree, this._stack.slice());
};
function swapNode(n, v) {
  n.key = v.key;
  n.value = v.value;
  n.left = v.left;
  n.right = v.right;
  n._color = v._color;
  n._count = v._count;
}
function fixDoubleBlack(stack) {
  var n, p, s, z;
  for (var i = stack.length - 1; i >= 0; --i) {
    n = stack[i];
    if (i === 0) {
      n._color = BLACK;
      return;
    }
    p = stack[i - 1];
    if (p.left === n) {
      s = p.right;
      if (s.right && s.right._color === RED) {
        s = p.right = cloneNode(s);
        z = s.right = cloneNode(s.right);
        p.right = s.left;
        s.left = p;
        s.right = z;
        s._color = p._color;
        n._color = BLACK;
        p._color = BLACK;
        z._color = BLACK;
        recount(p);
        recount(s);
        if (i > 1) {
          var pp = stack[i - 2];
          if (pp.left === p) {
            pp.left = s;
          } else {
            pp.right = s;
          }
        }
        stack[i - 1] = s;
        return;
      } else if (s.left && s.left._color === RED) {
        s = p.right = cloneNode(s);
        z = s.left = cloneNode(s.left);
        p.right = z.left;
        s.left = z.right;
        z.left = p;
        z.right = s;
        z._color = p._color;
        p._color = BLACK;
        s._color = BLACK;
        n._color = BLACK;
        recount(p);
        recount(s);
        recount(z);
        if (i > 1) {
          var pp = stack[i - 2];
          if (pp.left === p) {
            pp.left = z;
          } else {
            pp.right = z;
          }
        }
        stack[i - 1] = z;
        return;
      }
      if (s._color === BLACK) {
        if (p._color === RED) {
          p._color = BLACK;
          p.right = repaint(RED, s);
          return;
        } else {
          p.right = repaint(RED, s);
          continue;
        }
      } else {
        s = cloneNode(s);
        p.right = s.left;
        s.left = p;
        s._color = p._color;
        p._color = RED;
        recount(p);
        recount(s);
        if (i > 1) {
          var pp = stack[i - 2];
          if (pp.left === p) {
            pp.left = s;
          } else {
            pp.right = s;
          }
        }
        stack[i - 1] = s;
        stack[i] = p;
        if (i + 1 < stack.length) {
          stack[i + 1] = n;
        } else {
          stack.push(n);
        }
        i = i + 2;
      }
    } else {
      s = p.left;
      if (s.left && s.left._color === RED) {
        s = p.left = cloneNode(s);
        z = s.left = cloneNode(s.left);
        p.left = s.right;
        s.right = p;
        s.left = z;
        s._color = p._color;
        n._color = BLACK;
        p._color = BLACK;
        z._color = BLACK;
        recount(p);
        recount(s);
        if (i > 1) {
          var pp = stack[i - 2];
          if (pp.right === p) {
            pp.right = s;
          } else {
            pp.left = s;
          }
        }
        stack[i - 1] = s;
        return;
      } else if (s.right && s.right._color === RED) {
        s = p.left = cloneNode(s);
        z = s.right = cloneNode(s.right);
        p.left = z.right;
        s.right = z.left;
        z.right = p;
        z.left = s;
        z._color = p._color;
        p._color = BLACK;
        s._color = BLACK;
        n._color = BLACK;
        recount(p);
        recount(s);
        recount(z);
        if (i > 1) {
          var pp = stack[i - 2];
          if (pp.right === p) {
            pp.right = z;
          } else {
            pp.left = z;
          }
        }
        stack[i - 1] = z;
        return;
      }
      if (s._color === BLACK) {
        if (p._color === RED) {
          p._color = BLACK;
          p.left = repaint(RED, s);
          return;
        } else {
          p.left = repaint(RED, s);
          continue;
        }
      } else {
        s = cloneNode(s);
        p.left = s.right;
        s.right = p;
        s._color = p._color;
        p._color = RED;
        recount(p);
        recount(s);
        if (i > 1) {
          var pp = stack[i - 2];
          if (pp.right === p) {
            pp.right = s;
          } else {
            pp.left = s;
          }
        }
        stack[i - 1] = s;
        stack[i] = p;
        if (i + 1 < stack.length) {
          stack[i + 1] = n;
        } else {
          stack.push(n);
        }
        i = i + 2;
      }
    }
  }
}
iproto.remove = function() {
  var stack = this._stack;
  if (stack.length === 0) {
    return this.tree;
  }
  var cstack = new Array(stack.length);
  var n = stack[stack.length - 1];
  cstack[cstack.length - 1] = new RBNode(n._color, n.key, n.value, n.left, n.right, n._count);
  for (var i = stack.length - 2; i >= 0; --i) {
    var n = stack[i];
    if (n.left === stack[i + 1]) {
      cstack[i] = new RBNode(n._color, n.key, n.value, cstack[i + 1], n.right, n._count);
    } else {
      cstack[i] = new RBNode(n._color, n.key, n.value, n.left, cstack[i + 1], n._count);
    }
  }
  n = cstack[cstack.length - 1];
  if (n.left && n.right) {
    var split = cstack.length;
    n = n.left;
    while (n.right) {
      cstack.push(n);
      n = n.right;
    }
    var v = cstack[split - 1];
    cstack.push(new RBNode(n._color, v.key, v.value, n.left, n.right, n._count));
    cstack[split - 1].key = n.key;
    cstack[split - 1].value = n.value;
    for (var i = cstack.length - 2; i >= split; --i) {
      n = cstack[i];
      cstack[i] = new RBNode(n._color, n.key, n.value, n.left, cstack[i + 1], n._count);
    }
    cstack[split - 1].left = cstack[split];
  }
  n = cstack[cstack.length - 1];
  if (n._color === RED) {
    var p = cstack[cstack.length - 2];
    if (p.left === n) {
      p.left = null;
    } else if (p.right === n) {
      p.right = null;
    }
    cstack.pop();
    for (var i = 0; i < cstack.length; ++i) {
      cstack[i]._count--;
    }
    return new RedBlackTree(this.tree._compare, cstack[0]);
  } else {
    if (n.left || n.right) {
      if (n.left) {
        swapNode(n, n.left);
      } else if (n.right) {
        swapNode(n, n.right);
      }
      n._color = BLACK;
      for (var i = 0; i < cstack.length - 1; ++i) {
        cstack[i]._count--;
      }
      return new RedBlackTree(this.tree._compare, cstack[0]);
    } else if (cstack.length === 1) {
      return new RedBlackTree(this.tree._compare, null);
    } else {
      for (var i = 0; i < cstack.length; ++i) {
        cstack[i]._count--;
      }
      var parent = cstack[cstack.length - 2];
      fixDoubleBlack(cstack);
      if (parent.left === n) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
  }
  return new RedBlackTree(this.tree._compare, cstack[0]);
};
Object.defineProperty(iproto, "key", {
  get: function() {
    if (this._stack.length > 0) {
      return this._stack[this._stack.length - 1].key;
    }
    return;
  },
  enumerable: true
});
Object.defineProperty(iproto, "value", {
  get: function() {
    if (this._stack.length > 0) {
      return this._stack[this._stack.length - 1].value;
    }
    return;
  },
  enumerable: true
});
Object.defineProperty(iproto, "index", {
  get: function() {
    var idx = 0;
    var stack = this._stack;
    if (stack.length === 0) {
      var r = this.tree.root;
      if (r) {
        return r._count;
      }
      return 0;
    } else if (stack[stack.length - 1].left) {
      idx = stack[stack.length - 1].left._count;
    }
    for (var s = stack.length - 2; s >= 0; --s) {
      if (stack[s + 1] === stack[s].right) {
        ++idx;
        if (stack[s].left) {
          idx += stack[s].left._count;
        }
      }
    }
    return idx;
  },
  enumerable: true
});
iproto.next = function() {
  var stack = this._stack;
  if (stack.length === 0) {
    return;
  }
  var n = stack[stack.length - 1];
  if (n.right) {
    n = n.right;
    while (n) {
      stack.push(n);
      n = n.left;
    }
  } else {
    stack.pop();
    while (stack.length > 0 && stack[stack.length - 1].right === n) {
      n = stack[stack.length - 1];
      stack.pop();
    }
  }
};
Object.defineProperty(iproto, "hasNext", {
  get: function() {
    var stack = this._stack;
    if (stack.length === 0) {
      return false;
    }
    if (stack[stack.length - 1].right) {
      return true;
    }
    for (var s = stack.length - 1; s > 0; --s) {
      if (stack[s - 1].left === stack[s]) {
        return true;
      }
    }
    return false;
  }
});
iproto.update = function(value) {
  var stack = this._stack;
  if (stack.length === 0) {
    throw new Error("Can't update empty node!");
  }
  var cstack = new Array(stack.length);
  var n = stack[stack.length - 1];
  cstack[cstack.length - 1] = new RBNode(n._color, n.key, value, n.left, n.right, n._count);
  for (var i = stack.length - 2; i >= 0; --i) {
    n = stack[i];
    if (n.left === stack[i + 1]) {
      cstack[i] = new RBNode(n._color, n.key, n.value, cstack[i + 1], n.right, n._count);
    } else {
      cstack[i] = new RBNode(n._color, n.key, n.value, n.left, cstack[i + 1], n._count);
    }
  }
  return new RedBlackTree(this.tree._compare, cstack[0]);
};
iproto.prev = function() {
  var stack = this._stack;
  if (stack.length === 0) {
    return;
  }
  var n = stack[stack.length - 1];
  if (n.left) {
    n = n.left;
    while (n) {
      stack.push(n);
      n = n.right;
    }
  } else {
    stack.pop();
    while (stack.length > 0 && stack[stack.length - 1].left === n) {
      n = stack[stack.length - 1];
      stack.pop();
    }
  }
};
Object.defineProperty(iproto, "hasPrev", {
  get: function() {
    var stack = this._stack;
    if (stack.length === 0) {
      return false;
    }
    if (stack[stack.length - 1].left) {
      return true;
    }
    for (var s = stack.length - 1; s > 0; --s) {
      if (stack[s - 1].right === stack[s]) {
        return true;
      }
    }
    return false;
  }
});
function defaultCompare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
function createRBTree(compare2) {
  return new RedBlackTree(compare2 || defaultCompare, null);
}
const {
  AbstractLevel,
  AbstractIterator,
  AbstractKeyIterator,
  AbstractValueIterator
} = abstractLevel;
const ModuleError = moduleError;
const createRBT = rbtree;
const rangeOptions = /* @__PURE__ */ new Set(["gt", "gte", "lt", "lte"]);
const kNone = Symbol("none");
const kTree = Symbol("tree");
const kIterator = Symbol("iterator");
const kLowerBound = Symbol("lowerBound");
const kUpperBound = Symbol("upperBound");
const kOutOfRange = Symbol("outOfRange");
const kReverse = Symbol("reverse");
const kOptions = Symbol("options");
const kTest = Symbol("test");
const kAdvance = Symbol("advance");
const kInit = Symbol("init");
function compare(a, b) {
  if (typeof a === "string") {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  const length = Math.min(a.byteLength, b.byteLength);
  for (let i = 0; i < length; i++) {
    const cmp = a[i] - b[i];
    if (cmp !== 0)
      return cmp;
  }
  return a.byteLength - b.byteLength;
}
function gt(value) {
  return compare(value, this[kUpperBound]) > 0;
}
function gte(value) {
  return compare(value, this[kUpperBound]) >= 0;
}
function lt(value) {
  return compare(value, this[kUpperBound]) < 0;
}
function lte(value) {
  return compare(value, this[kUpperBound]) <= 0;
}
class MemoryIterator extends AbstractIterator {
  constructor(db, options) {
    super(db, options);
    this[kInit](db[kTree], options);
  }
  _next(callback) {
    if (!this[kIterator].valid)
      return this.nextTick(callback);
    const key2 = this[kIterator].key;
    const value = this[kIterator].value;
    if (!this[kTest](key2))
      return this.nextTick(callback);
    this[kIterator][this[kAdvance]]();
    this.nextTick(callback, null, key2, value);
  }
  _nextv(size, options, callback) {
    const it = this[kIterator];
    const entries = [];
    while (it.valid && entries.length < size && this[kTest](it.key)) {
      entries.push([it.key, it.value]);
      it[this[kAdvance]]();
    }
    this.nextTick(callback, null, entries);
  }
  _all(options, callback) {
    const size = this.limit - this.count;
    const it = this[kIterator];
    const entries = [];
    while (it.valid && entries.length < size && this[kTest](it.key)) {
      entries.push([it.key, it.value]);
      it[this[kAdvance]]();
    }
    this.nextTick(callback, null, entries);
  }
}
class MemoryKeyIterator extends AbstractKeyIterator {
  constructor(db, options) {
    super(db, options);
    this[kInit](db[kTree], options);
  }
  _next(callback) {
    if (!this[kIterator].valid)
      return this.nextTick(callback);
    const key2 = this[kIterator].key;
    if (!this[kTest](key2))
      return this.nextTick(callback);
    this[kIterator][this[kAdvance]]();
    this.nextTick(callback, null, key2);
  }
  _nextv(size, options, callback) {
    const it = this[kIterator];
    const keys = [];
    while (it.valid && keys.length < size && this[kTest](it.key)) {
      keys.push(it.key);
      it[this[kAdvance]]();
    }
    this.nextTick(callback, null, keys);
  }
  _all(options, callback) {
    const size = this.limit - this.count;
    const it = this[kIterator];
    const keys = [];
    while (it.valid && keys.length < size && this[kTest](it.key)) {
      keys.push(it.key);
      it[this[kAdvance]]();
    }
    this.nextTick(callback, null, keys);
  }
}
class MemoryValueIterator extends AbstractValueIterator {
  constructor(db, options) {
    super(db, options);
    this[kInit](db[kTree], options);
  }
  _next(callback) {
    if (!this[kIterator].valid)
      return this.nextTick(callback);
    const key2 = this[kIterator].key;
    const value = this[kIterator].value;
    if (!this[kTest](key2))
      return this.nextTick(callback);
    this[kIterator][this[kAdvance]]();
    this.nextTick(callback, null, value);
  }
  _nextv(size, options, callback) {
    const it = this[kIterator];
    const values = [];
    while (it.valid && values.length < size && this[kTest](it.key)) {
      values.push(it.value);
      it[this[kAdvance]]();
    }
    this.nextTick(callback, null, values);
  }
  _all(options, callback) {
    const size = this.limit - this.count;
    const it = this[kIterator];
    const values = [];
    while (it.valid && values.length < size && this[kTest](it.key)) {
      values.push(it.value);
      it[this[kAdvance]]();
    }
    this.nextTick(callback, null, values);
  }
}
for (const Ctor of [MemoryIterator, MemoryKeyIterator, MemoryValueIterator]) {
  Ctor.prototype[kInit] = function(tree, options) {
    this[kReverse] = options.reverse;
    this[kOptions] = options;
    if (!this[kReverse]) {
      this[kAdvance] = "next";
      this[kLowerBound] = "gte" in options ? options.gte : "gt" in options ? options.gt : kNone;
      this[kUpperBound] = "lte" in options ? options.lte : "lt" in options ? options.lt : kNone;
      if (this[kLowerBound] === kNone) {
        this[kIterator] = tree.begin;
      } else if ("gte" in options) {
        this[kIterator] = tree.ge(this[kLowerBound]);
      } else {
        this[kIterator] = tree.gt(this[kLowerBound]);
      }
      if (this[kUpperBound] !== kNone) {
        this[kTest] = "lte" in options ? lte : lt;
      }
    } else {
      this[kAdvance] = "prev";
      this[kLowerBound] = "lte" in options ? options.lte : "lt" in options ? options.lt : kNone;
      this[kUpperBound] = "gte" in options ? options.gte : "gt" in options ? options.gt : kNone;
      if (this[kLowerBound] === kNone) {
        this[kIterator] = tree.end;
      } else if ("lte" in options) {
        this[kIterator] = tree.le(this[kLowerBound]);
      } else {
        this[kIterator] = tree.lt(this[kLowerBound]);
      }
      if (this[kUpperBound] !== kNone) {
        this[kTest] = "gte" in options ? gte : gt;
      }
    }
  };
  Ctor.prototype[kTest] = function() {
    return true;
  };
  Ctor.prototype[kOutOfRange] = function(target) {
    if (!this[kTest](target)) {
      return true;
    } else if (this[kLowerBound] === kNone) {
      return false;
    } else if (!this[kReverse]) {
      if ("gte" in this[kOptions]) {
        return compare(target, this[kLowerBound]) < 0;
      } else {
        return compare(target, this[kLowerBound]) <= 0;
      }
    } else {
      if ("lte" in this[kOptions]) {
        return compare(target, this[kLowerBound]) > 0;
      } else {
        return compare(target, this[kLowerBound]) >= 0;
      }
    }
  };
  Ctor.prototype._seek = function(target, options) {
    if (this[kOutOfRange](target)) {
      this[kIterator] = this[kIterator].tree.end;
      this[kIterator].next();
    } else if (this[kReverse]) {
      this[kIterator] = this[kIterator].tree.le(target);
    } else {
      this[kIterator] = this[kIterator].tree.ge(target);
    }
  };
}
class MemoryLevel extends AbstractLevel {
  constructor(location2, options, _) {
    if (typeof location2 === "object" && location2 !== null) {
      options = location2;
    }
    if (typeof location2 === "function" || typeof options === "function" || typeof _ === "function") {
      throw new ModuleError("The levelup-style callback argument has been removed", {
        code: "LEVEL_LEGACY"
      });
    }
    let { storeEncoding, ...forward } = options || {};
    storeEncoding = storeEncoding || "buffer";
    if (!["buffer", "view", "utf8"].includes(storeEncoding)) {
      throw new ModuleError("The storeEncoding option must be 'buffer', 'view' or 'utf8'", {
        code: "LEVEL_ENCODING_NOT_SUPPORTED"
      });
    }
    super({
      seek: true,
      permanence: false,
      createIfMissing: false,
      errorIfExists: false,
      encodings: { [storeEncoding]: true }
    }, forward);
    this[kTree] = createRBT(compare);
  }
  _put(key2, value, options, callback) {
    const it = this[kTree].find(key2);
    if (it.valid) {
      this[kTree] = it.update(value);
    } else {
      this[kTree] = this[kTree].insert(key2, value);
    }
    this.nextTick(callback);
  }
  _get(key2, options, callback) {
    const value = this[kTree].get(key2);
    if (typeof value === "undefined") {
      return this.nextTick(callback, new Error("NotFound"));
    }
    this.nextTick(callback, null, value);
  }
  _getMany(keys, options, callback) {
    this.nextTick(callback, null, keys.map((key2) => this[kTree].get(key2)));
  }
  _del(key2, options, callback) {
    this[kTree] = this[kTree].remove(key2);
    this.nextTick(callback);
  }
  _batch(operations, options, callback) {
    let tree = this[kTree];
    for (const op of operations) {
      const key2 = op.key;
      const it = tree.find(key2);
      if (op.type === "put") {
        tree = it.valid ? it.update(op.value) : tree.insert(key2, op.value);
      } else {
        tree = it.remove();
      }
    }
    this[kTree] = tree;
    this.nextTick(callback);
  }
  _clear(options, callback) {
    if (options.limit === -1 && !Object.keys(options).some(isRangeOption)) {
      this[kTree] = createRBT(compare);
      return this.nextTick(callback);
    }
    const iterator2 = this._keys({ ...options });
    const limit = iterator2.limit;
    let count = 0;
    const loop2 = () => {
      for (let i = 0; i < 500; i++) {
        if (++count > limit)
          return callback();
        if (!iterator2[kIterator].valid)
          return callback();
        if (!iterator2[kTest](iterator2[kIterator].key))
          return callback();
        this[kTree] = this[kTree].remove(iterator2[kIterator].key);
        iterator2[kIterator][iterator2[kAdvance]]();
      }
      this.nextTick(loop2);
    };
    this.nextTick(loop2);
  }
  _iterator(options) {
    return new MemoryIterator(this, options);
  }
  _keys(options) {
    return new MemoryKeyIterator(this, options);
  }
  _values(options) {
    return new MemoryValueIterator(this, options);
  }
}
memoryLevel.MemoryLevel = MemoryLevel;
if (typeof process !== "undefined" && !process.browser && typeof commonjsGlobal !== "undefined" && typeof commonjsGlobal.setImmediate === "function") {
  const setImmediate = commonjsGlobal.setImmediate;
  MemoryLevel.prototype.nextTick = function(fn, ...args) {
    if (args.length === 0) {
      setImmediate(fn);
    } else {
      setImmediate(() => fn(...args));
    }
  };
}
function isRangeOption(k) {
  return rangeOptions.has(k);
}
Object.defineProperty(LevelDbCache$1, "__esModule", { value: true });
LevelDbCache$1.LevelDbCache = void 0;
const level_1 = browser;
const memory_level_1 = memoryLevel;
const LoggerFactory_1$b = LoggerFactory$1;
class LevelDbCache {
  // Lazy initialization upon first access
  get db() {
    if (!this._db) {
      if (this.cacheOptions.inMemory) {
        this._db = new memory_level_1.MemoryLevel({ valueEncoding: "json" });
      } else {
        if (!this.cacheOptions.dbLocation) {
          throw new Error("LevelDb cache configuration error - no db location specified");
        }
        const dbLocation = this.cacheOptions.dbLocation;
        this.logger.info(`Using location ${dbLocation}`);
        this._db = new level_1.Level(dbLocation, { valueEncoding: "json" });
      }
    }
    return this._db;
  }
  constructor(cacheOptions) {
    this.cacheOptions = cacheOptions;
    this.logger = LoggerFactory_1$b.LoggerFactory.INST.create("LevelDbCache");
  }
  async get(contractTxId, sortKey, returnDeepCopy) {
    const contractCache = this.db.sublevel(contractTxId, { valueEncoding: "json" });
    await contractCache.open();
    try {
      const result = await contractCache.get(sortKey);
      return {
        sortKey,
        cachedValue: result
      };
    } catch (e) {
      if (e.code == "LEVEL_NOT_FOUND") {
        return null;
      } else {
        throw e;
      }
    }
  }
  async getLast(contractTxId) {
    const contractCache = this.db.sublevel(contractTxId, { valueEncoding: "json" });
    await contractCache.open();
    const keys = await contractCache.keys({ reverse: true, limit: 1 }).all();
    if (keys.length) {
      return {
        sortKey: keys[0],
        cachedValue: await contractCache.get(keys[0])
      };
    } else {
      return null;
    }
  }
  async getLessOrEqual(contractTxId, sortKey) {
    const contractCache = this.db.sublevel(contractTxId, { valueEncoding: "json" });
    await contractCache.open();
    const keys = await contractCache.keys({ reverse: true, lte: sortKey, limit: 1 }).all();
    if (keys.length) {
      return {
        sortKey: keys[0],
        cachedValue: await contractCache.get(keys[0])
      };
    } else {
      return null;
    }
  }
  async put(stateCacheKey, value) {
    const contractCache = this.db.sublevel(stateCacheKey.contractTxId, { valueEncoding: "json" });
    await contractCache.open();
    await contractCache.put(stateCacheKey.sortKey, value);
  }
  async delete(contractTxId) {
    const contractCache = this.db.sublevel(contractTxId, { valueEncoding: "json" });
    await contractCache.open();
    await contractCache.clear();
  }
  close() {
    return this.db.close();
  }
  async dump() {
    const result = await this.db.iterator().all();
    return result;
  }
  // TODO: this implementation is sub-optimal
  // the lastSortKey should be probably memoized during "put"
  async getLastSortKey() {
    let lastSortKey = "";
    await this.db.open();
    const keys = await this.db.keys().all();
    for (const key2 of keys) {
      const sortKey = key2.substring(45);
      if (sortKey.localeCompare(lastSortKey) > 0) {
        lastSortKey = sortKey;
      }
    }
    return lastSortKey == "" ? null : lastSortKey;
  }
  async allContracts() {
    await this.db.open();
    const keys = await this.db.keys().all();
    const result = /* @__PURE__ */ new Set();
    keys.forEach((k) => result.add(k.substring(1, 44)));
    return Array.from(result);
  }
  storage() {
    return this.db;
  }
  async getNumEntries() {
    const keys = await this.db.keys().all();
    return keys.length;
  }
  /**
     Let's assume that given contract cache contains these sortKeys: [a, b, c, d, e, f]
     Let's assume entriesStored = 2
     After pruning, the cache should be left with these keys: [e,f].
  
     const entries = await contractCache.keys({ reverse: true, limit: entriesStored }).all();
     This would return in this case entries [f, e] (notice the "reverse: true").
  
     await contractCache.clear({ lt: entries[entries.length - 1] });
     This effectively means: await contractCache.clear({ lt: e });
     -> hence the entries [a,b,c,d] are removed and left are the [e,f]
    */
  async prune(entriesStored = 5) {
    if (!entriesStored || entriesStored <= 0) {
      entriesStored = 1;
    }
    const contracts = await this.allContracts();
    for (let i = 0; i < contracts.length; i++) {
      const contractCache = this.db.sublevel(contracts[i], { valueEncoding: "json" });
      await contractCache.open();
      const entries = await contractCache.keys({ reverse: true, limit: entriesStored }).all();
      if (!entries || entries.length < entriesStored) {
        continue;
      }
      await contractCache.clear({ lt: entries[entries.length - 1] });
      await contractCache.close();
    }
    return null;
  }
}
LevelDbCache$1.LevelDbCache = LevelDbCache;
var MemCache$1 = {};
Object.defineProperty(MemCache$1, "__esModule", { value: true });
MemCache$1.MemCache = void 0;
class MemCache {
  constructor() {
    this.storage = {};
  }
  clearAll() {
    Object.keys(this.storage).forEach((key2) => {
      delete this.storage[key2];
    });
  }
  contains(key2) {
    return Object.prototype.hasOwnProperty.call(this.storage, key2);
  }
  get(key2) {
    return this.storage[key2];
  }
  put(key2, value) {
    this.storage[key2] = value;
  }
  remove(key2) {
    delete this.storage[key2];
  }
}
MemCache$1.MemCache = MemCache;
var DefinitionLoader = {};
Object.defineProperty(DefinitionLoader, "__esModule", { value: true });
var ExecutorFactory = {};
Object.defineProperty(ExecutorFactory, "__esModule", { value: true });
var InteractionsLoader = {};
Object.defineProperty(InteractionsLoader, "__esModule", { value: true });
var InteractionsSorter = {};
Object.defineProperty(InteractionsSorter, "__esModule", { value: true });
var StateEvaluator = {};
Object.defineProperty(StateEvaluator, "__esModule", { value: true });
StateEvaluator.DefaultEvaluationOptions = StateEvaluator.EvalStateResult = void 0;
class EvalStateResult {
  constructor(state, validity, errorMessages) {
    this.state = state;
    this.validity = validity;
    this.errorMessages = errorMessages;
  }
}
StateEvaluator.EvalStateResult = EvalStateResult;
class DefaultEvaluationOptions {
  constructor() {
    this.ignoreExceptions = true;
    this.waitForConfirmation = false;
    this.updateCacheForEachInteraction = false;
    this.internalWrites = false;
    this.maxCallDepth = 7;
    this.maxInteractionEvaluationTimeSeconds = 60;
    this.stackTrace = {
      saveState: false
    };
    this.sequencerUrl = `https://d1o5nlqr4okus2.cloudfront.net/`;
    this.gasLimit = Number.MAX_SAFE_INTEGER;
    this.useVM2 = false;
    this.unsafeClient = "throw";
    this.allowBigInt = false;
    this.walletBalanceUrl = "http://nyc-1.dev.arweave.net:1984/";
    this.mineArLocalBlocks = true;
    this.throwOnInternalWriteError = true;
    this.cacheEveryNInteractions = -1;
  }
}
StateEvaluator.DefaultEvaluationOptions = DefaultEvaluationOptions;
var ContractDefinitionLoader = {};
var SmartWeaveTags = {};
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.SmartWeaveTags = void 0;
  (function(SmartWeaveTags2) {
    SmartWeaveTags2["APP_NAME"] = "App-Name";
    SmartWeaveTags2["APP_VERSION"] = "App-Version";
    SmartWeaveTags2["CONTRACT_TX_ID"] = "Contract";
    SmartWeaveTags2["INPUT"] = "Input";
    SmartWeaveTags2["CONTENT_TYPE"] = "Content-Type";
    SmartWeaveTags2["CONTRACT_SRC_TX_ID"] = "Contract-Src";
    SmartWeaveTags2["SDK"] = "SDK";
    SmartWeaveTags2["MIN_FEE"] = "Min-Fee";
    SmartWeaveTags2["INIT_STATE"] = "Init-State";
    SmartWeaveTags2["INIT_STATE_TX"] = "Init-State-TX";
    SmartWeaveTags2["INTERACT_WRITE"] = "Interact-Write";
    SmartWeaveTags2["WASM_LANG"] = "Wasm-Lang";
    SmartWeaveTags2["WASM_LANG_VERSION"] = "Wasm-Lang-Version";
    SmartWeaveTags2["WASM_META"] = "Wasm-Meta";
    SmartWeaveTags2["REQUEST_VRF"] = "Request-Vrf";
    SmartWeaveTags2["SIGNATURE_TYPE"] = "Signature-Type";
    SmartWeaveTags2["WARP_TESTNET"] = "Warp-Testnet";
    SmartWeaveTags2["MANIFEST"] = "Contract-Manifest";
  })(exports2.SmartWeaveTags || (exports2.SmartWeaveTags = {}));
})(SmartWeaveTags);
var ArweaveWrapper = {};
var web = {};
var common$1 = {};
var ar$1 = {};
Object.defineProperty(ar$1, "__esModule", { value: true });
const bignumber_js_1$1 = bignumberExports$1;
let Ar$1 = class Ar2 {
  constructor() {
    this.BigNum = (value, decimals) => {
      let instance = bignumber_js_1$1.BigNumber.clone({ DECIMAL_PLACES: decimals });
      return new instance(value);
    };
  }
  winstonToAr(winstonString, { formatted = false, decimals = 12, trim: trim2 = true } = {}) {
    let number = this.stringToBigNum(winstonString, decimals).shiftedBy(-12);
    return formatted ? number.toFormat(decimals) : number.toFixed(decimals);
  }
  arToWinston(arString, { formatted = false } = {}) {
    let number = this.stringToBigNum(arString).shiftedBy(12);
    return formatted ? number.toFormat() : number.toFixed(0);
  }
  compare(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    let b = this.stringToBigNum(winstonStringB);
    return a.comparedTo(b);
  }
  isEqual(winstonStringA, winstonStringB) {
    return this.compare(winstonStringA, winstonStringB) === 0;
  }
  isLessThan(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    let b = this.stringToBigNum(winstonStringB);
    return a.isLessThan(b);
  }
  isGreaterThan(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    let b = this.stringToBigNum(winstonStringB);
    return a.isGreaterThan(b);
  }
  add(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    this.stringToBigNum(winstonStringB);
    return a.plus(winstonStringB).toFixed(0);
  }
  sub(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    this.stringToBigNum(winstonStringB);
    return a.minus(winstonStringB).toFixed(0);
  }
  stringToBigNum(stringValue, decimalPlaces = 12) {
    return this.BigNum(stringValue, decimalPlaces);
  }
};
ar$1.default = Ar$1;
var api$1 = {};
var axiosExports$1 = {};
var axios$2 = {
  get exports() {
    return axiosExports$1;
  },
  set exports(v) {
    axiosExports$1 = v;
  }
};
var axiosExports = {};
var axios$1 = {
  get exports() {
    return axiosExports;
  },
  set exports(v) {
    axiosExports = v;
  }
};
var bind$2 = function bind2(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$1 = bind$2;
var toString$1 = Object.prototype.toString;
var kindOf = function(cache) {
  return function(thing) {
    var str = toString$1.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function kindOfTest(type2) {
  type2 = type2.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type2;
  };
}
function isArray(val) {
  return Array.isArray(val);
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}
function isObject$1(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (kindOf(val) !== "object") {
    return false;
  }
  var prototype2 = Object.getPrototypeOf(val);
  return prototype2 === null || prototype2 === Object.prototype;
}
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob$1 = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
function isFunction(val) {
  return toString$1.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject$1(val) && isFunction(val.pipe);
}
function isFormData(thing) {
  var pattern = "[object FormData]";
  return thing && (typeof FormData === "function" && thing instanceof FormData || toString$1.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}
var isURLSearchParams = kindOfTest("URLSearchParams");
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key2 in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key2)) {
        fn.call(null, obj[key2], key2, obj);
      }
    }
  }
}
function merge() {
  var result = {};
  function assignValue(val, key2) {
    if (isPlainObject(result[key2]) && isPlainObject(val)) {
      result[key2] = merge(result[key2], val);
    } else if (isPlainObject(val)) {
      result[key2] = merge({}, val);
    } else if (isArray(val)) {
      result[key2] = val.slice();
    } else {
      result[key2] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key2) {
    if (thisArg && typeof val === "function") {
      a[key2] = bind$1(val, thisArg);
    } else {
      a[key2] = val;
    }
  });
  return a;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
function inherits(constructor, superConstructor, props, descriptors2) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}
function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};
  destObj = destObj || {};
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
}
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}
function toArray(thing) {
  if (!thing)
    return null;
  var i = thing.length;
  if (isUndefined(i))
    return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}
var isTypedArray = function(TypedArray) {
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
var utils$f = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject: isObject$1,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob: isBlob$1,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  isTypedArray,
  isFileList
};
var utils$e = utils$f;
function encode$2(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$1 = function buildURL2(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$e.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$e.forEach(params, function serialize(val, key2) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$e.isArray(val)) {
        key2 = key2 + "[]";
      } else {
        val = [val];
      }
      utils$e.forEach(val, function parseValue(v) {
        if (utils$e.isDate(v)) {
          v = v.toISOString();
        } else if (utils$e.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode$2(key2) + "=" + encode$2(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$d = utils$f;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$d.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$c = utils$f;
var normalizeHeaderName$1 = function normalizeHeaderName2(headers, normalizedName) {
  utils$c.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
var utils$b = utils$f;
function AxiosError$2(message, code2, config2, request2, response) {
  Error.call(this);
  this.message = message;
  this.name = "AxiosError";
  code2 && (this.code = code2);
  config2 && (this.config = config2);
  request2 && (this.request = request2);
  response && (this.response = response);
}
utils$b.inherits(AxiosError$2, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError$2.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
  // eslint-disable-next-line func-names
].forEach(function(code2) {
  descriptors[code2] = { value: code2 };
});
Object.defineProperties(AxiosError$2, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError$2.from = function(error2, code2, config2, request2, response, customProps) {
  var axiosError = Object.create(prototype);
  utils$b.toFlatObject(error2, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });
  AxiosError$2.call(axiosError, error2.message, code2, config2, request2, response);
  axiosError.name = error2.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_1 = AxiosError$2;
var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var utils$a = utils$f;
function toFormData$1(obj, formData) {
  formData = formData || new FormData();
  var stack = [];
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils$a.isDate(value)) {
      return value.toISOString();
    }
    if (utils$a.isArrayBuffer(value) || utils$a.isTypedArray(value)) {
      return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function build(data2, parentKey) {
    if (utils$a.isPlainObject(data2) || utils$a.isArray(data2)) {
      if (stack.indexOf(data2) !== -1) {
        throw Error("Circular reference detected in " + parentKey);
      }
      stack.push(data2);
      utils$a.forEach(data2, function each(value, key2) {
        if (utils$a.isUndefined(value))
          return;
        var fullKey = parentKey ? parentKey + "." + key2 : key2;
        var arr;
        if (value && !parentKey && typeof value === "object") {
          if (utils$a.endsWith(key2, "{}")) {
            value = JSON.stringify(value);
          } else if (utils$a.endsWith(key2, "[]") && (arr = utils$a.toArray(value))) {
            arr.forEach(function(el) {
              !utils$a.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }
        build(value, fullKey);
      });
      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data2));
    }
  }
  build(obj);
  return formData;
}
var toFormData_1 = toFormData$1;
var settle;
var hasRequiredSettle;
function requireSettle() {
  if (hasRequiredSettle)
    return settle;
  hasRequiredSettle = 1;
  var AxiosError2 = AxiosError_1;
  settle = function settle2(resolve, reject, response) {
    var validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError2(
        "Request failed with status code " + response.status,
        [AxiosError2.ERR_BAD_REQUEST, AxiosError2.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  };
  return settle;
}
var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies)
    return cookies;
  hasRequiredCookies = 1;
  var utils2 = utils$f;
  cookies = utils2.isStandardBrowserEnv() ? (
    // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write2(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils2.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils2.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils2.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read2(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write2() {
        },
        read: function read2() {
          return null;
        },
        remove: function remove() {
        }
      };
    }()
  );
  return cookies;
}
var isAbsoluteURL$1 = function isAbsoluteURL2(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs$1 = function combineURLs2(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL = isAbsoluteURL$1;
var combineURLs = combineURLs$1;
var buildFullPath$1 = function buildFullPath2(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};
var parseHeaders;
var hasRequiredParseHeaders;
function requireParseHeaders() {
  if (hasRequiredParseHeaders)
    return parseHeaders;
  hasRequiredParseHeaders = 1;
  var utils2 = utils$f;
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  parseHeaders = function parseHeaders2(headers) {
    var parsed = {};
    var key2;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils2.forEach(headers.split("\n"), function parser(line) {
      i = line.indexOf(":");
      key2 = utils2.trim(line.substr(0, i)).toLowerCase();
      val = utils2.trim(line.substr(i + 1));
      if (key2) {
        if (parsed[key2] && ignoreDuplicateOf.indexOf(key2) >= 0) {
          return;
        }
        if (key2 === "set-cookie") {
          parsed[key2] = (parsed[key2] ? parsed[key2] : []).concat([val]);
        } else {
          parsed[key2] = parsed[key2] ? parsed[key2] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
  return parseHeaders;
}
var isURLSameOrigin;
var hasRequiredIsURLSameOrigin;
function requireIsURLSameOrigin() {
  if (hasRequiredIsURLSameOrigin)
    return isURLSameOrigin;
  hasRequiredIsURLSameOrigin = 1;
  var utils2 = utils$f;
  isURLSameOrigin = utils2.isStandardBrowserEnv() ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin2(requestURL) {
        var parsed = utils2.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return function isURLSameOrigin2() {
        return true;
      };
    }()
  );
  return isURLSameOrigin;
}
var CanceledError_1;
var hasRequiredCanceledError;
function requireCanceledError() {
  if (hasRequiredCanceledError)
    return CanceledError_1;
  hasRequiredCanceledError = 1;
  var AxiosError2 = AxiosError_1;
  var utils2 = utils$f;
  function CanceledError2(message) {
    AxiosError2.call(this, message == null ? "canceled" : message, AxiosError2.ERR_CANCELED);
    this.name = "CanceledError";
  }
  utils2.inherits(CanceledError2, AxiosError2, {
    __CANCEL__: true
  });
  CanceledError_1 = CanceledError2;
  return CanceledError_1;
}
var parseProtocol;
var hasRequiredParseProtocol;
function requireParseProtocol() {
  if (hasRequiredParseProtocol)
    return parseProtocol;
  hasRequiredParseProtocol = 1;
  parseProtocol = function parseProtocol2(url) {
    var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  };
  return parseProtocol;
}
var xhr;
var hasRequiredXhr;
function requireXhr() {
  if (hasRequiredXhr)
    return xhr;
  hasRequiredXhr = 1;
  var utils2 = utils$f;
  var settle2 = requireSettle();
  var cookies2 = requireCookies();
  var buildURL3 = buildURL$1;
  var buildFullPath3 = buildFullPath$1;
  var parseHeaders2 = requireParseHeaders();
  var isURLSameOrigin2 = requireIsURLSameOrigin();
  var transitionalDefaults2 = transitional;
  var AxiosError2 = AxiosError_1;
  var CanceledError2 = requireCanceledError();
  var parseProtocol2 = requireParseProtocol();
  xhr = function xhrAdapter(config2) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config2.data;
      var requestHeaders = config2.headers;
      var responseType = config2.responseType;
      var onCanceled;
      function done() {
        if (config2.cancelToken) {
          config2.cancelToken.unsubscribe(onCanceled);
        }
        if (config2.signal) {
          config2.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils2.isFormData(requestData) && utils2.isStandardBrowserEnv()) {
        delete requestHeaders["Content-Type"];
      }
      var request2 = new XMLHttpRequest();
      if (config2.auth) {
        var username = config2.auth.username || "";
        var password = config2.auth.password ? unescape(encodeURIComponent(config2.auth.password)) : "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath3(config2.baseURL, config2.url);
      request2.open(config2.method.toUpperCase(), buildURL3(fullPath, config2.params, config2.paramsSerializer), true);
      request2.timeout = config2.timeout;
      function onloadend() {
        if (!request2) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
        var response = {
          data: responseData,
          status: request2.status,
          statusText: request2.statusText,
          headers: responseHeaders,
          config: config2,
          request: request2
        };
        settle2(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request2 = null;
      }
      if ("onloadend" in request2) {
        request2.onloadend = onloadend;
      } else {
        request2.onreadystatechange = function handleLoad() {
          if (!request2 || request2.readyState !== 4) {
            return;
          }
          if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request2.onabort = function handleAbort() {
        if (!request2) {
          return;
        }
        reject(new AxiosError2("Request aborted", AxiosError2.ECONNABORTED, config2, request2));
        request2 = null;
      };
      request2.onerror = function handleError() {
        reject(new AxiosError2("Network Error", AxiosError2.ERR_NETWORK, config2, request2, request2));
        request2 = null;
      };
      request2.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = config2.timeout ? "timeout of " + config2.timeout + "ms exceeded" : "timeout exceeded";
        var transitional3 = config2.transitional || transitionalDefaults2;
        if (config2.timeoutErrorMessage) {
          timeoutErrorMessage = config2.timeoutErrorMessage;
        }
        reject(new AxiosError2(
          timeoutErrorMessage,
          transitional3.clarifyTimeoutError ? AxiosError2.ETIMEDOUT : AxiosError2.ECONNABORTED,
          config2,
          request2
        ));
        request2 = null;
      };
      if (utils2.isStandardBrowserEnv()) {
        var xsrfValue = (config2.withCredentials || isURLSameOrigin2(fullPath)) && config2.xsrfCookieName ? cookies2.read(config2.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config2.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request2) {
        utils2.forEach(requestHeaders, function setRequestHeader(val, key2) {
          if (typeof requestData === "undefined" && key2.toLowerCase() === "content-type") {
            delete requestHeaders[key2];
          } else {
            request2.setRequestHeader(key2, val);
          }
        });
      }
      if (!utils2.isUndefined(config2.withCredentials)) {
        request2.withCredentials = !!config2.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request2.responseType = config2.responseType;
      }
      if (typeof config2.onDownloadProgress === "function") {
        request2.addEventListener("progress", config2.onDownloadProgress);
      }
      if (typeof config2.onUploadProgress === "function" && request2.upload) {
        request2.upload.addEventListener("progress", config2.onUploadProgress);
      }
      if (config2.cancelToken || config2.signal) {
        onCanceled = function(cancel) {
          if (!request2) {
            return;
          }
          reject(!cancel || cancel && cancel.type ? new CanceledError2() : cancel);
          request2.abort();
          request2 = null;
        };
        config2.cancelToken && config2.cancelToken.subscribe(onCanceled);
        if (config2.signal) {
          config2.signal.aborted ? onCanceled() : config2.signal.addEventListener("abort", onCanceled);
        }
      }
      if (!requestData) {
        requestData = null;
      }
      var protocol = parseProtocol2(fullPath);
      if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
        reject(new AxiosError2("Unsupported protocol " + protocol + ":", AxiosError2.ERR_BAD_REQUEST, config2));
        return;
      }
      request2.send(requestData);
    });
  };
  return xhr;
}
var _null;
var hasRequired_null;
function require_null() {
  if (hasRequired_null)
    return _null;
  hasRequired_null = 1;
  _null = null;
  return _null;
}
var utils$9 = utils$f;
var normalizeHeaderName = normalizeHeaderName$1;
var AxiosError$1 = AxiosError_1;
var transitionalDefaults = transitional;
var toFormData = toFormData_1;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$9.isUndefined(headers) && utils$9.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = requireXhr();
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = requireXhr();
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder2) {
  if (utils$9.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$9.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder2 || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName(headers, "Accept");
    normalizeHeaderName(headers, "Content-Type");
    if (utils$9.isFormData(data2) || utils$9.isArrayBuffer(data2) || utils$9.isBuffer(data2) || utils$9.isStream(data2) || utils$9.isFile(data2) || utils$9.isBlob(data2)) {
      return data2;
    }
    if (utils$9.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$9.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    var isObjectPayload = utils$9.isObject(data2);
    var contentType = headers && headers["Content-Type"];
    var isFileList2;
    if ((isFileList2 = utils$9.isFileList(data2)) || isObjectPayload && contentType === "multipart/form-data") {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList2 ? { "files[]": data2 } : data2, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional3 = this.transitional || defaults$3.transitional;
    var silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
    var forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$9.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: require_null()
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$9.forEach(["delete", "get", "head"], function forEachMethodNoData(method2) {
  defaults$3.headers[method2] = {};
});
utils$9.forEach(["post", "put", "patch"], function forEachMethodWithData(method2) {
  defaults$3.headers[method2] = utils$9.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;
var utils$8 = utils$f;
var defaults$2 = defaults_1;
var transformData$1 = function transformData2(data2, headers, fns) {
  var context = this || defaults$2;
  utils$8.forEach(fns, function transform(fn) {
    data2 = fn.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1;
var hasRequiredIsCancel;
function requireIsCancel() {
  if (hasRequiredIsCancel)
    return isCancel$1;
  hasRequiredIsCancel = 1;
  isCancel$1 = function isCancel2(value) {
    return !!(value && value.__CANCEL__);
  };
  return isCancel$1;
}
var utils$7 = utils$f;
var transformData = transformData$1;
var isCancel = requireIsCancel();
var defaults$1 = defaults_1;
var CanceledError = requireCanceledError();
function throwIfCancellationRequested(config2) {
  if (config2.cancelToken) {
    config2.cancelToken.throwIfRequested();
  }
  if (config2.signal && config2.signal.aborted) {
    throw new CanceledError();
  }
}
var dispatchRequest$1 = function dispatchRequest2(config2) {
  throwIfCancellationRequested(config2);
  config2.headers = config2.headers || {};
  config2.data = transformData.call(
    config2,
    config2.data,
    config2.headers,
    config2.transformRequest
  );
  config2.headers = utils$7.merge(
    config2.headers.common || {},
    config2.headers[config2.method] || {},
    config2.headers
  );
  utils$7.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function cleanHeaderConfig(method2) {
      delete config2.headers[method2];
    }
  );
  var adapter = config2.adapter || defaults$1.adapter;
  return adapter(config2).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config2);
    response.data = transformData.call(
      config2,
      response.data,
      response.headers,
      config2.transformResponse
    );
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config2);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config2,
          reason.response.data,
          reason.response.headers,
          config2.transformResponse
        );
      }
    }
    return Promise.reject(reason);
  });
};
var utils$6 = utils$f;
var mergeConfig$2 = function mergeConfig2(config1, config2) {
  config2 = config2 || {};
  var config3 = {};
  function getMergedValue(target, source) {
    if (utils$6.isPlainObject(target) && utils$6.isPlainObject(source)) {
      return utils$6.merge(target, source);
    } else if (utils$6.isPlainObject(source)) {
      return utils$6.merge({}, source);
    } else if (utils$6.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(prop) {
    if (!utils$6.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$6.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$6.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$6.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$6.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "beforeRedirect": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$6.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge2 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge2(prop);
    utils$6.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config3[prop] = configValue);
  });
  return config3;
};
var data$1;
var hasRequiredData;
function requireData() {
  if (hasRequiredData)
    return data$1;
  hasRequiredData = 1;
  data$1 = {
    "version": "0.27.2"
  };
  return data$1;
}
var VERSION = requireData().version;
var AxiosError = AxiosError_1;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type2, i) {
  validators$1[type2] = function validator2(thing) {
    return typeof thing === type2 || "a" + (i < 1 ? "n " : " ") + type2;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$5 = utils$f;
var buildURL = buildURL$1;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var buildFullPath = buildFullPath$1;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(configOrUrl, config2) {
  if (typeof configOrUrl === "string") {
    config2 = config2 || {};
    config2.url = configOrUrl;
  } else {
    config2 = configOrUrl || {};
  }
  config2 = mergeConfig$1(this.defaults, config2);
  if (config2.method) {
    config2.method = config2.method.toLowerCase();
  } else if (this.defaults.method) {
    config2.method = this.defaults.method.toLowerCase();
  } else {
    config2.method = "get";
  }
  var transitional3 = config2.transitional;
  if (transitional3 !== void 0) {
    validator.assertOptions(transitional3, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config2) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config2);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config2;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error2) {
      onRejected(error2);
      break;
    }
  }
  try {
    promise = dispatchRequest(newConfig);
  } catch (error2) {
    return Promise.reject(error2);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config2) {
  config2 = mergeConfig$1(this.defaults, config2);
  var fullPath = buildFullPath(config2.baseURL, config2.url);
  return buildURL(fullPath, config2.params, config2.paramsSerializer);
};
utils$5.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method2) {
  Axios$1.prototype[method2] = function(url, config2) {
    return this.request(mergeConfig$1(config2 || {}, {
      method: method2,
      url,
      data: (config2 || {}).data
    }));
  };
});
utils$5.forEach(["post", "put", "patch"], function forEachMethodWithData2(method2) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config2) {
      return this.request(mergeConfig$1(config2 || {}, {
        method: method2,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios$1.prototype[method2] = generateHTTPMethod();
  Axios$1.prototype[method2 + "Form"] = generateHTTPMethod(true);
});
var Axios_1 = Axios$1;
var CancelToken_1;
var hasRequiredCancelToken;
function requireCancelToken() {
  if (hasRequiredCancelToken)
    return CancelToken_1;
  hasRequiredCancelToken = 1;
  var CanceledError2 = requireCanceledError();
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;
    this.promise.then(function(cancel) {
      if (!token._listeners)
        return;
      var i;
      var l = token._listeners.length;
      for (i = 0; i < l; i++) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = function(onfulfilled) {
      var _resolve;
      var promise = new Promise(function(resolve) {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError2(message);
      resolvePromise(token.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  };
  CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    var index2 = this._listeners.indexOf(listener);
    if (index2 !== -1) {
      this._listeners.splice(index2, 1);
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  };
  CancelToken_1 = CancelToken;
  return CancelToken_1;
}
var spread;
var hasRequiredSpread;
function requireSpread() {
  if (hasRequiredSpread)
    return spread;
  hasRequiredSpread = 1;
  spread = function spread2(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  return spread;
}
var isAxiosError;
var hasRequiredIsAxiosError;
function requireIsAxiosError() {
  if (hasRequiredIsAxiosError)
    return isAxiosError;
  hasRequiredIsAxiosError = 1;
  var utils2 = utils$f;
  isAxiosError = function isAxiosError2(payload) {
    return utils2.isObject(payload) && payload.isAxiosError === true;
  };
  return isAxiosError;
}
var utils$4 = utils$f;
var bind = bind$2;
var Axios = Axios_1;
var mergeConfig = mergeConfig$2;
var defaults = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);
  utils$4.extend(instance, Axios.prototype, context);
  utils$4.extend(instance, context);
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios = createInstance(defaults);
axios.Axios = Axios;
axios.CanceledError = requireCanceledError();
axios.CancelToken = requireCancelToken();
axios.isCancel = requireIsCancel();
axios.VERSION = requireData().version;
axios.toFormData = toFormData_1;
axios.AxiosError = AxiosError_1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = requireSpread();
axios.isAxiosError = requireIsAxiosError();
axios$1.exports = axios;
axiosExports.default = axios;
(function(module2) {
  module2.exports = axiosExports;
})(axios$2);
Object.defineProperty(api$1, "__esModule", { value: true });
const axios_1$1 = axiosExports$1;
let Api$1 = class Api2 {
  constructor(config2) {
    this.METHOD_GET = "GET";
    this.METHOD_POST = "POST";
    this.applyConfig(config2);
  }
  applyConfig(config2) {
    this.config = this.mergeDefaults(config2);
  }
  getConfig() {
    return this.config;
  }
  mergeDefaults(config2) {
    const protocol = config2.protocol || "http";
    const port = config2.port || (protocol === "https" ? 443 : 80);
    return {
      host: config2.host || "127.0.0.1",
      protocol,
      port,
      timeout: config2.timeout || 2e4,
      logging: config2.logging || false,
      logger: config2.logger || console.log,
      network: config2.network
    };
  }
  async get(endpoint, config2) {
    try {
      return await this.request().get(endpoint, config2);
    } catch (error2) {
      if (error2.response && error2.response.status) {
        return error2.response;
      }
      throw error2;
    }
  }
  async post(endpoint, body, config2) {
    try {
      return await this.request().post(endpoint, body, config2);
    } catch (error2) {
      if (error2.response && error2.response.status) {
        return error2.response;
      }
      throw error2;
    }
  }
  /**
   * Get an AxiosInstance with the base configuration setup to fire off
   * a request to the network.
   */
  request() {
    const headers = {};
    if (this.config.network) {
      headers["x-network"] = this.config.network;
    }
    let instance = axios_1$1.default.create({
      baseURL: `${this.config.protocol}://${this.config.host}:${this.config.port}`,
      timeout: this.config.timeout,
      maxContentLength: 1024 * 1024 * 512,
      headers
    });
    if (this.config.logging) {
      instance.interceptors.request.use((request2) => {
        this.config.logger(`Requesting: ${request2.baseURL}/${request2.url}`);
        return request2;
      });
      instance.interceptors.response.use((response) => {
        this.config.logger(`Response:   ${response.config.url} - ${response.status}`);
        return response;
      });
    }
    return instance;
  }
};
api$1.default = Api$1;
var webcryptoDriver = {};
var utils$3 = {};
Object.defineProperty(utils$3, "__esModule", { value: true });
utils$3.b64UrlDecode = utils$3.b64UrlEncode = utils$3.bufferTob64Url = utils$3.bufferTob64 = utils$3.b64UrlToBuffer = utils$3.stringToB64Url = utils$3.stringToBuffer = utils$3.bufferToString = utils$3.b64UrlToString = utils$3.concatBuffers = void 0;
const B64js$1 = base64Js;
function concatBuffers$1(buffers) {
  let total_length = 0;
  for (let i = 0; i < buffers.length; i++) {
    total_length += buffers[i].byteLength;
  }
  let temp = new Uint8Array(total_length);
  let offset = 0;
  temp.set(new Uint8Array(buffers[0]), offset);
  offset += buffers[0].byteLength;
  for (let i = 1; i < buffers.length; i++) {
    temp.set(new Uint8Array(buffers[i]), offset);
    offset += buffers[i].byteLength;
  }
  return temp;
}
utils$3.concatBuffers = concatBuffers$1;
function b64UrlToString$1(b64UrlString) {
  let buffer2 = b64UrlToBuffer$1(b64UrlString);
  return bufferToString$1(buffer2);
}
utils$3.b64UrlToString = b64UrlToString$1;
function bufferToString$1(buffer2) {
  if (typeof TextDecoder == "undefined") {
    const TextDecoder2 = requireUtil().TextDecoder;
    return new TextDecoder2("utf-8", { fatal: true }).decode(buffer2);
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(buffer2);
}
utils$3.bufferToString = bufferToString$1;
function stringToBuffer$1(string) {
  if (typeof TextEncoder == "undefined") {
    const TextEncoder2 = requireUtil().TextEncoder;
    return new TextEncoder2().encode(string);
  }
  return new TextEncoder().encode(string);
}
utils$3.stringToBuffer = stringToBuffer$1;
function stringToB64Url$1(string) {
  return bufferTob64Url$1(stringToBuffer$1(string));
}
utils$3.stringToB64Url = stringToB64Url$1;
function b64UrlToBuffer$1(b64UrlString) {
  return new Uint8Array(B64js$1.toByteArray(b64UrlDecode$1(b64UrlString)));
}
utils$3.b64UrlToBuffer = b64UrlToBuffer$1;
function bufferTob64$1(buffer2) {
  return B64js$1.fromByteArray(new Uint8Array(buffer2));
}
utils$3.bufferTob64 = bufferTob64$1;
function bufferTob64Url$1(buffer2) {
  return b64UrlEncode$1(bufferTob64$1(buffer2));
}
utils$3.bufferTob64Url = bufferTob64Url$1;
function b64UrlEncode$1(b64UrlString) {
  return b64UrlString.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
}
utils$3.b64UrlEncode = b64UrlEncode$1;
function b64UrlDecode$1(b64UrlString) {
  b64UrlString = b64UrlString.replace(/\-/g, "+").replace(/\_/g, "/");
  let padding;
  b64UrlString.length % 4 == 0 ? padding = 0 : padding = 4 - b64UrlString.length % 4;
  return b64UrlString.concat("=".repeat(padding));
}
utils$3.b64UrlDecode = b64UrlDecode$1;
Object.defineProperty(webcryptoDriver, "__esModule", { value: true });
const ArweaveUtils$6 = utils$3;
class WebCryptoDriver {
  constructor() {
    this.keyLength = 4096;
    this.publicExponent = 65537;
    this.hashAlgorithm = "sha256";
    if (!this.detectWebCrypto()) {
      throw new Error("SubtleCrypto not available!");
    }
    this.driver = crypto.subtle;
  }
  async generateJWK() {
    let cryptoKey = await this.driver.generateKey({
      name: "RSA-PSS",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: {
        name: "SHA-256"
      }
    }, true, ["sign"]);
    let jwk = await this.driver.exportKey("jwk", cryptoKey.privateKey);
    return {
      kty: jwk.kty,
      e: jwk.e,
      n: jwk.n,
      d: jwk.d,
      p: jwk.p,
      q: jwk.q,
      dp: jwk.dp,
      dq: jwk.dq,
      qi: jwk.qi
    };
  }
  async sign(jwk, data2, { saltLength } = {}) {
    let signature = await this.driver.sign({
      name: "RSA-PSS",
      saltLength: 32
    }, await this.jwkToCryptoKey(jwk), data2);
    return new Uint8Array(signature);
  }
  async hash(data2, algorithm2 = "SHA-256") {
    let digest = await this.driver.digest(algorithm2, data2);
    return new Uint8Array(digest);
  }
  async verify(publicModulus, data2, signature) {
    const publicKey = {
      kty: "RSA",
      e: "AQAB",
      n: publicModulus
    };
    const key2 = await this.jwkToPublicCryptoKey(publicKey);
    const digest = await this.driver.digest("SHA-256", data2);
    const salt0 = await this.driver.verify({
      name: "RSA-PSS",
      saltLength: 0
    }, key2, signature, data2);
    const salt32 = await this.driver.verify({
      name: "RSA-PSS",
      saltLength: 32
    }, key2, signature, data2);
    const saltN = await this.driver.verify({
      name: "RSA-PSS",
      saltLength: Math.ceil((key2.algorithm.modulusLength - 1) / 8) - digest.byteLength - 2
    }, key2, signature, data2);
    return salt0 || salt32 || saltN;
  }
  async jwkToCryptoKey(jwk) {
    return this.driver.importKey("jwk", jwk, {
      name: "RSA-PSS",
      hash: {
        name: "SHA-256"
      }
    }, false, ["sign"]);
  }
  async jwkToPublicCryptoKey(publicJwk) {
    return this.driver.importKey("jwk", publicJwk, {
      name: "RSA-PSS",
      hash: {
        name: "SHA-256"
      }
    }, false, ["verify"]);
  }
  detectWebCrypto() {
    if (typeof crypto === "undefined") {
      return false;
    }
    const subtle = crypto === null || crypto === void 0 ? void 0 : crypto.subtle;
    if (subtle === void 0) {
      return false;
    }
    const names = [
      "generateKey",
      "importKey",
      "exportKey",
      "digest",
      "sign"
    ];
    return names.every((name) => typeof subtle[name] === "function");
  }
  async encrypt(data2, key2, salt) {
    const initialKey = await this.driver.importKey("raw", typeof key2 == "string" ? ArweaveUtils$6.stringToBuffer(key2) : key2, {
      name: "PBKDF2",
      length: 32
    }, false, ["deriveKey"]);
    const derivedkey = await this.driver.deriveKey({
      name: "PBKDF2",
      salt: salt ? ArweaveUtils$6.stringToBuffer(salt) : ArweaveUtils$6.stringToBuffer("salt"),
      iterations: 1e5,
      hash: "SHA-256"
    }, initialKey, {
      name: "AES-CBC",
      length: 256
    }, false, ["encrypt", "decrypt"]);
    const iv = new Uint8Array(16);
    crypto.getRandomValues(iv);
    const encryptedData = await this.driver.encrypt({
      name: "AES-CBC",
      iv
    }, derivedkey, data2);
    return ArweaveUtils$6.concatBuffers([iv, encryptedData]);
  }
  async decrypt(encrypted, key2, salt) {
    const initialKey = await this.driver.importKey("raw", typeof key2 == "string" ? ArweaveUtils$6.stringToBuffer(key2) : key2, {
      name: "PBKDF2",
      length: 32
    }, false, ["deriveKey"]);
    const derivedkey = await this.driver.deriveKey({
      name: "PBKDF2",
      salt: salt ? ArweaveUtils$6.stringToBuffer(salt) : ArweaveUtils$6.stringToBuffer("salt"),
      iterations: 1e5,
      hash: "SHA-256"
    }, initialKey, {
      name: "AES-CBC",
      length: 256
    }, false, ["encrypt", "decrypt"]);
    const iv = encrypted.slice(0, 16);
    const data2 = await this.driver.decrypt({
      name: "AES-CBC",
      iv
    }, derivedkey, encrypted.slice(16));
    return ArweaveUtils$6.concatBuffers([data2]);
  }
}
webcryptoDriver.default = WebCryptoDriver;
var network$1 = {};
Object.defineProperty(network$1, "__esModule", { value: true });
let Network$1 = class Network2 {
  constructor(api2) {
    this.api = api2;
  }
  getInfo() {
    return this.api.get(`info`).then((response) => {
      return response.data;
    });
  }
  getPeers() {
    return this.api.get(`peers`).then((response) => {
      return response.data;
    });
  }
};
network$1.default = Network$1;
var transactions$1 = {};
var error$1 = {};
Object.defineProperty(error$1, "__esModule", { value: true });
error$1.getError = void 0;
let ArweaveError$1 = class ArweaveError2 extends Error {
  constructor(type2, optional = {}) {
    if (optional.message) {
      super(optional.message);
    } else {
      super();
    }
    this.type = type2;
    this.response = optional.response;
  }
  getType() {
    return this.type;
  }
};
error$1.default = ArweaveError$1;
function getError$1(resp) {
  let data2 = resp.data;
  if (typeof resp.data === "string") {
    try {
      data2 = JSON.parse(resp.data);
    } catch (e) {
    }
  }
  if (resp.data instanceof ArrayBuffer || resp.data instanceof Uint8Array) {
    try {
      data2 = JSON.parse(data2.toString());
    } catch (e) {
    }
  }
  return data2 ? data2.error || data2 : resp.statusText || "unknown";
}
error$1.getError = getError$1;
var transaction$1 = {};
var deepHash$1 = {};
var hasRequiredDeepHash$1;
function requireDeepHash$1() {
  if (hasRequiredDeepHash$1)
    return deepHash$1;
  hasRequiredDeepHash$1 = 1;
  Object.defineProperty(deepHash$1, "__esModule", { value: true });
  const common_1 = requireCommon$1();
  async function deepHash2(data2) {
    if (Array.isArray(data2)) {
      const tag2 = common_1.default.utils.concatBuffers([
        common_1.default.utils.stringToBuffer("list"),
        common_1.default.utils.stringToBuffer(data2.length.toString())
      ]);
      return await deepHashChunks(data2, await common_1.default.crypto.hash(tag2, "SHA-384"));
    }
    const tag = common_1.default.utils.concatBuffers([
      common_1.default.utils.stringToBuffer("blob"),
      common_1.default.utils.stringToBuffer(data2.byteLength.toString())
    ]);
    const taggedHash = common_1.default.utils.concatBuffers([
      await common_1.default.crypto.hash(tag, "SHA-384"),
      await common_1.default.crypto.hash(data2, "SHA-384")
    ]);
    return await common_1.default.crypto.hash(taggedHash, "SHA-384");
  }
  deepHash$1.default = deepHash2;
  async function deepHashChunks(chunks2, acc) {
    if (chunks2.length < 1) {
      return acc;
    }
    const hashPair = common_1.default.utils.concatBuffers([
      acc,
      await deepHash2(chunks2[0])
    ]);
    const newAcc = await common_1.default.crypto.hash(hashPair, "SHA-384");
    return await deepHashChunks(chunks2.slice(1), newAcc);
  }
  return deepHash$1;
}
var merkle$1 = {};
var hasRequiredMerkle$1;
function requireMerkle$1() {
  if (hasRequiredMerkle$1)
    return merkle$1;
  hasRequiredMerkle$1 = 1;
  (function(exports2) {
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.debug = exports2.validatePath = exports2.arrayCompare = exports2.bufferToInt = exports2.intToBuffer = exports2.arrayFlatten = exports2.generateProofs = exports2.buildLayers = exports2.generateTransactionChunks = exports2.generateTree = exports2.computeRootHash = exports2.generateLeaves = exports2.chunkData = exports2.MIN_CHUNK_SIZE = exports2.MAX_CHUNK_SIZE = void 0;
    const common_1 = requireCommon$1();
    const utils_12 = utils$3;
    exports2.MAX_CHUNK_SIZE = 256 * 1024;
    exports2.MIN_CHUNK_SIZE = 32 * 1024;
    const NOTE_SIZE = 32;
    const HASH_SIZE = 32;
    async function chunkData(data2) {
      let chunks2 = [];
      let rest = data2;
      let cursor = 0;
      while (rest.byteLength >= exports2.MAX_CHUNK_SIZE) {
        let chunkSize = exports2.MAX_CHUNK_SIZE;
        let nextChunkSize = rest.byteLength - exports2.MAX_CHUNK_SIZE;
        if (nextChunkSize > 0 && nextChunkSize < exports2.MIN_CHUNK_SIZE) {
          chunkSize = Math.ceil(rest.byteLength / 2);
        }
        const chunk = rest.slice(0, chunkSize);
        const dataHash = await common_1.default.crypto.hash(chunk);
        cursor += chunk.byteLength;
        chunks2.push({
          dataHash,
          minByteRange: cursor - chunk.byteLength,
          maxByteRange: cursor
        });
        rest = rest.slice(chunkSize);
      }
      chunks2.push({
        dataHash: await common_1.default.crypto.hash(rest),
        minByteRange: cursor,
        maxByteRange: cursor + rest.byteLength
      });
      return chunks2;
    }
    exports2.chunkData = chunkData;
    async function generateLeaves(chunks2) {
      return Promise.all(chunks2.map(async ({ dataHash, minByteRange, maxByteRange }) => {
        return {
          type: "leaf",
          id: await hash(await Promise.all([hash(dataHash), hash(intToBuffer(maxByteRange))])),
          dataHash,
          minByteRange,
          maxByteRange
        };
      }));
    }
    exports2.generateLeaves = generateLeaves;
    async function computeRootHash(data2) {
      const rootNode = await generateTree(data2);
      return rootNode.id;
    }
    exports2.computeRootHash = computeRootHash;
    async function generateTree(data2) {
      const rootNode = await buildLayers(await generateLeaves(await chunkData(data2)));
      return rootNode;
    }
    exports2.generateTree = generateTree;
    async function generateTransactionChunks(data2) {
      const chunks2 = await chunkData(data2);
      const leaves = await generateLeaves(chunks2);
      const root2 = await buildLayers(leaves);
      const proofs = await generateProofs(root2);
      const lastChunk = chunks2.slice(-1)[0];
      if (lastChunk.maxByteRange - lastChunk.minByteRange === 0) {
        chunks2.splice(chunks2.length - 1, 1);
        proofs.splice(proofs.length - 1, 1);
      }
      return {
        data_root: root2.id,
        chunks: chunks2,
        proofs
      };
    }
    exports2.generateTransactionChunks = generateTransactionChunks;
    async function buildLayers(nodes, level = 0) {
      if (nodes.length < 2) {
        const root2 = nodes[0];
        return root2;
      }
      const nextLayer = [];
      for (let i = 0; i < nodes.length; i += 2) {
        nextLayer.push(await hashBranch(nodes[i], nodes[i + 1]));
      }
      return buildLayers(nextLayer, level + 1);
    }
    exports2.buildLayers = buildLayers;
    function generateProofs(root2) {
      const proofs = resolveBranchProofs(root2);
      if (!Array.isArray(proofs)) {
        return [proofs];
      }
      return arrayFlatten(proofs);
    }
    exports2.generateProofs = generateProofs;
    function resolveBranchProofs(node, proof = new Uint8Array(), depth = 0) {
      if (node.type == "leaf") {
        return {
          offset: node.maxByteRange - 1,
          proof: (0, utils_12.concatBuffers)([
            proof,
            node.dataHash,
            intToBuffer(node.maxByteRange)
          ])
        };
      }
      if (node.type == "branch") {
        const partialProof = (0, utils_12.concatBuffers)([
          proof,
          node.leftChild.id,
          node.rightChild.id,
          intToBuffer(node.byteRange)
        ]);
        return [
          resolveBranchProofs(node.leftChild, partialProof, depth + 1),
          resolveBranchProofs(node.rightChild, partialProof, depth + 1)
        ];
      }
      throw new Error(`Unexpected node type`);
    }
    function arrayFlatten(input) {
      const flat = [];
      input.forEach((item) => {
        if (Array.isArray(item)) {
          flat.push(...arrayFlatten(item));
        } else {
          flat.push(item);
        }
      });
      return flat;
    }
    exports2.arrayFlatten = arrayFlatten;
    async function hashBranch(left, right) {
      if (!right) {
        return left;
      }
      let branch = {
        type: "branch",
        id: await hash([
          await hash(left.id),
          await hash(right.id),
          await hash(intToBuffer(left.maxByteRange))
        ]),
        byteRange: left.maxByteRange,
        maxByteRange: right.maxByteRange,
        leftChild: left,
        rightChild: right
      };
      return branch;
    }
    async function hash(data2) {
      if (Array.isArray(data2)) {
        data2 = common_1.default.utils.concatBuffers(data2);
      }
      return new Uint8Array(await common_1.default.crypto.hash(data2));
    }
    function intToBuffer(note) {
      const buffer2 = new Uint8Array(NOTE_SIZE);
      for (var i = buffer2.length - 1; i >= 0; i--) {
        var byte = note % 256;
        buffer2[i] = byte;
        note = (note - byte) / 256;
      }
      return buffer2;
    }
    exports2.intToBuffer = intToBuffer;
    function bufferToInt(buffer2) {
      let value = 0;
      for (var i = 0; i < buffer2.length; i++) {
        value *= 256;
        value += buffer2[i];
      }
      return value;
    }
    exports2.bufferToInt = bufferToInt;
    const arrayCompare = (a, b) => a.every((value, index2) => b[index2] === value);
    exports2.arrayCompare = arrayCompare;
    async function validatePath(id, dest, leftBound, rightBound, path) {
      if (rightBound <= 0) {
        return false;
      }
      if (dest >= rightBound) {
        return validatePath(id, 0, rightBound - 1, rightBound, path);
      }
      if (dest < 0) {
        return validatePath(id, 0, 0, rightBound, path);
      }
      if (path.length == HASH_SIZE + NOTE_SIZE) {
        const pathData = path.slice(0, HASH_SIZE);
        const endOffsetBuffer = path.slice(pathData.length, pathData.length + NOTE_SIZE);
        const pathDataHash = await hash([
          await hash(pathData),
          await hash(endOffsetBuffer)
        ]);
        let result = (0, exports2.arrayCompare)(id, pathDataHash);
        if (result) {
          return {
            offset: rightBound - 1,
            leftBound,
            rightBound,
            chunkSize: rightBound - leftBound
          };
        }
        return false;
      }
      const left = path.slice(0, HASH_SIZE);
      const right = path.slice(left.length, left.length + HASH_SIZE);
      const offsetBuffer = path.slice(left.length + right.length, left.length + right.length + NOTE_SIZE);
      const offset = bufferToInt(offsetBuffer);
      const remainder = path.slice(left.length + right.length + offsetBuffer.length);
      const pathHash = await hash([
        await hash(left),
        await hash(right),
        await hash(offsetBuffer)
      ]);
      if ((0, exports2.arrayCompare)(id, pathHash)) {
        if (dest < offset) {
          return await validatePath(left, dest, leftBound, Math.min(rightBound, offset), remainder);
        }
        return await validatePath(right, dest, Math.max(leftBound, offset), rightBound, remainder);
      }
      return false;
    }
    exports2.validatePath = validatePath;
    async function debug(proof, output = "") {
      if (proof.byteLength < 1) {
        return output;
      }
      const left = proof.slice(0, HASH_SIZE);
      const right = proof.slice(left.length, left.length + HASH_SIZE);
      const offsetBuffer = proof.slice(left.length + right.length, left.length + right.length + NOTE_SIZE);
      const offset = bufferToInt(offsetBuffer);
      const remainder = proof.slice(left.length + right.length + offsetBuffer.length);
      const pathHash = await hash([
        await hash(left),
        await hash(right),
        await hash(offsetBuffer)
      ]);
      const updatedOutput = `${output}
${JSON.stringify(Buffer.from(left))},${JSON.stringify(Buffer.from(right))},${offset} => ${JSON.stringify(pathHash)}`;
      return debug(remainder, updatedOutput);
    }
    exports2.debug = debug;
  })(merkle$1);
  return merkle$1;
}
var hasRequiredTransaction$1;
function requireTransaction$1() {
  if (hasRequiredTransaction$1)
    return transaction$1;
  hasRequiredTransaction$1 = 1;
  Object.defineProperty(transaction$1, "__esModule", { value: true });
  transaction$1.Tag = void 0;
  const ArweaveUtils2 = utils$3;
  const deepHash_1 = requireDeepHash$1();
  const merkle_1 = requireMerkle$1();
  class BaseObject {
    get(field, options) {
      if (!Object.getOwnPropertyNames(this).includes(field)) {
        throw new Error(`Field "${field}" is not a property of the Arweave Transaction class.`);
      }
      if (this[field] instanceof Uint8Array) {
        if (options && options.decode && options.string) {
          return ArweaveUtils2.bufferToString(this[field]);
        }
        if (options && options.decode && !options.string) {
          return this[field];
        }
        return ArweaveUtils2.bufferTob64Url(this[field]);
      }
      if (options && options.decode == true) {
        if (options && options.string) {
          return ArweaveUtils2.b64UrlToString(this[field]);
        }
        return ArweaveUtils2.b64UrlToBuffer(this[field]);
      }
      return this[field];
    }
  }
  class Tag extends BaseObject {
    constructor(name, value, decode2 = false) {
      super();
      this.name = name;
      this.value = value;
    }
  }
  transaction$1.Tag = Tag;
  class Transaction2 extends BaseObject {
    constructor(attributes = {}) {
      super();
      this.format = 2;
      this.id = "";
      this.last_tx = "";
      this.owner = "";
      this.tags = [];
      this.target = "";
      this.quantity = "0";
      this.data_size = "0";
      this.data = new Uint8Array();
      this.data_root = "";
      this.reward = "0";
      this.signature = "";
      Object.assign(this, attributes);
      if (typeof this.data === "string") {
        this.data = ArweaveUtils2.b64UrlToBuffer(this.data);
      }
      if (attributes.tags) {
        this.tags = attributes.tags.map((tag) => {
          return new Tag(tag.name, tag.value);
        });
      }
    }
    addTag(name, value) {
      this.tags.push(new Tag(ArweaveUtils2.stringToB64Url(name), ArweaveUtils2.stringToB64Url(value)));
    }
    toJSON() {
      return {
        format: this.format,
        id: this.id,
        last_tx: this.last_tx,
        owner: this.owner,
        tags: this.tags,
        target: this.target,
        quantity: this.quantity,
        data: ArweaveUtils2.bufferTob64Url(this.data),
        data_size: this.data_size,
        data_root: this.data_root,
        data_tree: this.data_tree,
        reward: this.reward,
        signature: this.signature
      };
    }
    setOwner(owner) {
      this.owner = owner;
    }
    setSignature({ id, owner, reward, tags, signature }) {
      this.id = id;
      this.owner = owner;
      if (reward)
        this.reward = reward;
      if (tags)
        this.tags = tags;
      this.signature = signature;
    }
    async prepareChunks(data2) {
      if (!this.chunks && data2.byteLength > 0) {
        this.chunks = await (0, merkle_1.generateTransactionChunks)(data2);
        this.data_root = ArweaveUtils2.bufferTob64Url(this.chunks.data_root);
      }
      if (!this.chunks && data2.byteLength === 0) {
        this.chunks = {
          chunks: [],
          data_root: new Uint8Array(),
          proofs: []
        };
        this.data_root = "";
      }
    }
    // Returns a chunk in a format suitable for posting to /chunk.
    // Similar to `prepareChunks()` this does not operate `this.data`,
    // instead using the data passed in.
    getChunk(idx, data2) {
      if (!this.chunks) {
        throw new Error(`Chunks have not been prepared`);
      }
      const proof = this.chunks.proofs[idx];
      const chunk = this.chunks.chunks[idx];
      return {
        data_root: this.data_root,
        data_size: this.data_size,
        data_path: ArweaveUtils2.bufferTob64Url(proof.proof),
        offset: proof.offset.toString(),
        chunk: ArweaveUtils2.bufferTob64Url(data2.slice(chunk.minByteRange, chunk.maxByteRange))
      };
    }
    async getSignatureData() {
      switch (this.format) {
        case 1:
          let tags = this.tags.reduce((accumulator, tag) => {
            return ArweaveUtils2.concatBuffers([
              accumulator,
              tag.get("name", { decode: true, string: false }),
              tag.get("value", { decode: true, string: false })
            ]);
          }, new Uint8Array());
          return ArweaveUtils2.concatBuffers([
            this.get("owner", { decode: true, string: false }),
            this.get("target", { decode: true, string: false }),
            this.get("data", { decode: true, string: false }),
            ArweaveUtils2.stringToBuffer(this.quantity),
            ArweaveUtils2.stringToBuffer(this.reward),
            this.get("last_tx", { decode: true, string: false }),
            tags
          ]);
        case 2:
          if (!this.data_root) {
            await this.prepareChunks(this.data);
          }
          const tagList = this.tags.map((tag) => [
            tag.get("name", { decode: true, string: false }),
            tag.get("value", { decode: true, string: false })
          ]);
          return await (0, deepHash_1.default)([
            ArweaveUtils2.stringToBuffer(this.format.toString()),
            this.get("owner", { decode: true, string: false }),
            this.get("target", { decode: true, string: false }),
            ArweaveUtils2.stringToBuffer(this.quantity),
            ArweaveUtils2.stringToBuffer(this.reward),
            this.get("last_tx", { decode: true, string: false }),
            tagList,
            ArweaveUtils2.stringToBuffer(this.data_size),
            this.get("data_root", { decode: true, string: false })
          ]);
        default:
          throw new Error(`Unexpected transaction format: ${this.format}`);
      }
    }
  }
  transaction$1.default = Transaction2;
  return transaction$1;
}
var transactionUploader$1 = {};
var hasRequiredTransactionUploader$1;
function requireTransactionUploader$1() {
  if (hasRequiredTransactionUploader$1)
    return transactionUploader$1;
  hasRequiredTransactionUploader$1 = 1;
  Object.defineProperty(transactionUploader$1, "__esModule", { value: true });
  transactionUploader$1.TransactionUploader = void 0;
  const transaction_1 = requireTransaction$1();
  const ArweaveUtils2 = utils$3;
  const error_12 = error$1;
  const merkle_1 = requireMerkle$1();
  const MAX_CHUNKS_IN_BODY = 1;
  const FATAL_CHUNK_UPLOAD_ERRORS = [
    "invalid_json",
    "chunk_too_big",
    "data_path_too_big",
    "offset_too_big",
    "data_size_too_big",
    "chunk_proof_ratio_not_attractive",
    "invalid_proof"
  ];
  const ERROR_DELAY = 1e3 * 40;
  class TransactionUploader {
    get isComplete() {
      return this.txPosted && this.chunkIndex === this.transaction.chunks.chunks.length;
    }
    get totalChunks() {
      return this.transaction.chunks.chunks.length;
    }
    get uploadedChunks() {
      return this.chunkIndex;
    }
    get pctComplete() {
      return Math.trunc(this.uploadedChunks / this.totalChunks * 100);
    }
    constructor(api2, transaction2) {
      this.api = api2;
      this.chunkIndex = 0;
      this.txPosted = false;
      this.lastRequestTimeEnd = 0;
      this.totalErrors = 0;
      this.lastResponseStatus = 0;
      this.lastResponseError = "";
      if (!transaction2.id) {
        throw new Error(`Transaction is not signed`);
      }
      if (!transaction2.chunks) {
        throw new Error(`Transaction chunks not prepared`);
      }
      this.data = transaction2.data;
      this.transaction = new transaction_1.default(Object.assign({}, transaction2, { data: new Uint8Array(0) }));
    }
    /**
     * Uploads the next part of the transaction.
     * On the first call this posts the transaction
     * itself and on any subsequent calls uploads the
     * next chunk until it completes.
     */
    async uploadChunk(chunkIndex_) {
      if (this.isComplete) {
        throw new Error(`Upload is already complete`);
      }
      if (this.lastResponseError !== "") {
        this.totalErrors++;
      } else {
        this.totalErrors = 0;
      }
      if (this.totalErrors === 100) {
        throw new Error(`Unable to complete upload: ${this.lastResponseStatus}: ${this.lastResponseError}`);
      }
      let delay = this.lastResponseError === "" ? 0 : Math.max(this.lastRequestTimeEnd + ERROR_DELAY - Date.now(), ERROR_DELAY);
      if (delay > 0) {
        delay = delay - delay * Math.random() * 0.3;
        await new Promise((res) => setTimeout(res, delay));
      }
      this.lastResponseError = "";
      if (!this.txPosted) {
        await this.postTransaction();
        return;
      }
      if (chunkIndex_) {
        this.chunkIndex = chunkIndex_;
      }
      const chunk = this.transaction.getChunk(chunkIndex_ || this.chunkIndex, this.data);
      const chunkOk = await (0, merkle_1.validatePath)(this.transaction.chunks.data_root, parseInt(chunk.offset), 0, parseInt(chunk.data_size), ArweaveUtils2.b64UrlToBuffer(chunk.data_path));
      if (!chunkOk) {
        throw new Error(`Unable to validate chunk ${this.chunkIndex}`);
      }
      const resp = await this.api.post(`chunk`, this.transaction.getChunk(this.chunkIndex, this.data)).catch((e) => {
        console.error(e.message);
        return { status: -1, data: { error: e.message } };
      });
      this.lastRequestTimeEnd = Date.now();
      this.lastResponseStatus = resp.status;
      if (this.lastResponseStatus == 200) {
        this.chunkIndex++;
      } else {
        this.lastResponseError = (0, error_12.getError)(resp);
        if (FATAL_CHUNK_UPLOAD_ERRORS.includes(this.lastResponseError)) {
          throw new Error(`Fatal error uploading chunk ${this.chunkIndex}: ${this.lastResponseError}`);
        }
      }
    }
    /**
     * Reconstructs an upload from its serialized state and data.
     * Checks if data matches the expected data_root.
     *
     * @param serialized
     * @param data
     */
    static async fromSerialized(api2, serialized, data2) {
      if (!serialized || typeof serialized.chunkIndex !== "number" || typeof serialized.transaction !== "object") {
        throw new Error(`Serialized object does not match expected format.`);
      }
      var transaction2 = new transaction_1.default(serialized.transaction);
      if (!transaction2.chunks) {
        await transaction2.prepareChunks(data2);
      }
      const upload = new TransactionUploader(api2, transaction2);
      upload.chunkIndex = serialized.chunkIndex;
      upload.lastRequestTimeEnd = serialized.lastRequestTimeEnd;
      upload.lastResponseError = serialized.lastResponseError;
      upload.lastResponseStatus = serialized.lastResponseStatus;
      upload.txPosted = serialized.txPosted;
      upload.data = data2;
      if (upload.transaction.data_root !== serialized.transaction.data_root) {
        throw new Error(`Data mismatch: Uploader doesn't match provided data.`);
      }
      return upload;
    }
    /**
     * Reconstruct an upload from the tx metadata, ie /tx/<id>.
     *
     * @param api
     * @param id
     * @param data
     */
    static async fromTransactionId(api2, id) {
      const resp = await api2.get(`tx/${id}`);
      if (resp.status !== 200) {
        throw new Error(`Tx ${id} not found: ${resp.status}`);
      }
      const transaction2 = resp.data;
      transaction2.data = new Uint8Array(0);
      const serialized = {
        txPosted: true,
        chunkIndex: 0,
        lastResponseError: "",
        lastRequestTimeEnd: 0,
        lastResponseStatus: 0,
        transaction: transaction2
      };
      return serialized;
    }
    toJSON() {
      return {
        chunkIndex: this.chunkIndex,
        transaction: this.transaction,
        lastRequestTimeEnd: this.lastRequestTimeEnd,
        lastResponseStatus: this.lastResponseStatus,
        lastResponseError: this.lastResponseError,
        txPosted: this.txPosted
      };
    }
    // POST to /tx
    async postTransaction() {
      const uploadInBody = this.totalChunks <= MAX_CHUNKS_IN_BODY;
      if (uploadInBody) {
        this.transaction.data = this.data;
        const resp2 = await this.api.post(`tx`, this.transaction).catch((e) => {
          console.error(e);
          return { status: -1, data: { error: e.message } };
        });
        this.lastRequestTimeEnd = Date.now();
        this.lastResponseStatus = resp2.status;
        this.transaction.data = new Uint8Array(0);
        if (resp2.status >= 200 && resp2.status < 300) {
          this.txPosted = true;
          this.chunkIndex = MAX_CHUNKS_IN_BODY;
          return;
        }
        this.lastResponseError = (0, error_12.getError)(resp2);
        throw new Error(`Unable to upload transaction: ${resp2.status}, ${this.lastResponseError}`);
      }
      const resp = await this.api.post(`tx`, this.transaction);
      this.lastRequestTimeEnd = Date.now();
      this.lastResponseStatus = resp.status;
      if (!(resp.status >= 200 && resp.status < 300)) {
        this.lastResponseError = (0, error_12.getError)(resp);
        throw new Error(`Unable to upload transaction: ${resp.status}, ${this.lastResponseError}`);
      }
      this.txPosted = true;
    }
  }
  transactionUploader$1.TransactionUploader = TransactionUploader;
  return transactionUploader$1;
}
var hasRequiredTransactions$1;
function requireTransactions$1() {
  if (hasRequiredTransactions$1)
    return transactions$1;
  hasRequiredTransactions$1 = 1;
  var __await = commonjsGlobal && commonjsGlobal.__await || function(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  };
  var __asyncGenerator = commonjsGlobal && commonjsGlobal.__asyncGenerator || function(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function verb(n) {
      if (g[n])
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle2(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle2(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle2(f, v) {
      if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]);
    }
  };
  Object.defineProperty(transactions$1, "__esModule", { value: true });
  const error_12 = error$1;
  const transaction_1 = requireTransaction$1();
  const ArweaveUtils2 = utils$3;
  const transaction_uploader_1 = requireTransactionUploader$1();
  class Transactions {
    constructor(api2, crypto2, chunks2) {
      this.api = api2;
      this.crypto = crypto2;
      this.chunks = chunks2;
    }
    getTransactionAnchor() {
      return this.api.get(`tx_anchor`, { transformResponse: [] }).then((response) => {
        return response.data;
      });
    }
    getPrice(byteSize, targetAddress) {
      let endpoint = targetAddress ? `price/${byteSize}/${targetAddress}` : `price/${byteSize}`;
      return this.api.get(endpoint, {
        transformResponse: [
          /**
           * We need to specify a response transformer to override
           * the default JSON.parse behavior, as this causes
           * winston to be converted to a number and we want to
           * return it as a winston string.
           * @param data
           */
          function(data2) {
            return data2;
          }
        ]
      }).then((response) => {
        return response.data;
      });
    }
    async get(id) {
      const response = await this.api.get(`tx/${id}`);
      if (response.status == 200) {
        const data_size = parseInt(response.data.data_size);
        if (response.data.format >= 2 && data_size > 0 && data_size <= 1024 * 1024 * 12) {
          const data2 = await this.getData(id);
          return new transaction_1.default(Object.assign(Object.assign({}, response.data), { data: data2 }));
        }
        return new transaction_1.default(Object.assign(Object.assign({}, response.data), { format: response.data.format || 1 }));
      }
      if (response.status == 404) {
        throw new error_12.default(
          "TX_NOT_FOUND"
          /* ArweaveErrorType.TX_NOT_FOUND */
        );
      }
      if (response.status == 410) {
        throw new error_12.default(
          "TX_FAILED"
          /* ArweaveErrorType.TX_FAILED */
        );
      }
      throw new error_12.default(
        "TX_INVALID"
        /* ArweaveErrorType.TX_INVALID */
      );
    }
    fromRaw(attributes) {
      return new transaction_1.default(attributes);
    }
    async search(tagName, tagValue) {
      return this.api.post(`arql`, {
        op: "equals",
        expr1: tagName,
        expr2: tagValue
      }).then((response) => {
        if (!response.data) {
          return [];
        }
        return response.data;
      });
    }
    getStatus(id) {
      return this.api.get(`tx/${id}/status`).then((response) => {
        if (response.status == 200) {
          return {
            status: 200,
            confirmed: response.data
          };
        }
        return {
          status: response.status,
          confirmed: null
        };
      });
    }
    async getData(id, options) {
      let data2 = void 0;
      try {
        data2 = await this.chunks.downloadChunkedData(id);
      } catch (error2) {
        console.error(`Error while trying to download chunked data for ${id}`);
        console.error(error2);
      }
      if (!data2) {
        console.warn(`Falling back to gateway cache for ${id}`);
        try {
          data2 = (await this.api.get(`/${id}`)).data;
        } catch (error2) {
          console.error(`Error while trying to download contiguous data from gateway cache for ${id}`);
          console.error(error2);
        }
      }
      if (!data2) {
        throw new Error(`${id} was not found!`);
      }
      if (options && options.decode && !options.string) {
        return data2;
      }
      if (options && options.decode && options.string) {
        return ArweaveUtils2.bufferToString(data2);
      }
      return ArweaveUtils2.bufferTob64Url(data2);
    }
    async sign(transaction2, jwk, options) {
      if (!jwk && typeof arweaveWallet !== "object") {
        throw new Error(`A new Arweave transaction must provide the jwk parameter.`);
      } else if (!jwk || jwk === "use_wallet") {
        try {
          const existingPermissions = await arweaveWallet.getPermissions();
          if (!existingPermissions.includes("SIGN_TRANSACTION"))
            await arweaveWallet.connect(["SIGN_TRANSACTION"]);
        } catch (_a) {
        }
        const signedTransaction = await arweaveWallet.sign(transaction2, options);
        transaction2.setSignature({
          id: signedTransaction.id,
          owner: signedTransaction.owner,
          reward: signedTransaction.reward,
          tags: signedTransaction.tags,
          signature: signedTransaction.signature
        });
      } else {
        transaction2.setOwner(jwk.n);
        let dataToSign = await transaction2.getSignatureData();
        let rawSignature = await this.crypto.sign(jwk, dataToSign, options);
        let id = await this.crypto.hash(rawSignature);
        transaction2.setSignature({
          id: ArweaveUtils2.bufferTob64Url(id),
          owner: jwk.n,
          signature: ArweaveUtils2.bufferTob64Url(rawSignature)
        });
      }
    }
    async verify(transaction2) {
      const signaturePayload = await transaction2.getSignatureData();
      const rawSignature = transaction2.get("signature", {
        decode: true,
        string: false
      });
      const expectedId = ArweaveUtils2.bufferTob64Url(await this.crypto.hash(rawSignature));
      if (transaction2.id !== expectedId) {
        throw new Error(`Invalid transaction signature or ID! The transaction ID doesn't match the expected SHA-256 hash of the signature.`);
      }
      return this.crypto.verify(transaction2.owner, signaturePayload, rawSignature);
    }
    async post(transaction2) {
      if (typeof transaction2 === "string") {
        transaction2 = new transaction_1.default(JSON.parse(transaction2));
      } else if (typeof transaction2.readInt32BE === "function") {
        transaction2 = new transaction_1.default(JSON.parse(transaction2.toString()));
      } else if (typeof transaction2 === "object" && !(transaction2 instanceof transaction_1.default)) {
        transaction2 = new transaction_1.default(transaction2);
      }
      if (!(transaction2 instanceof transaction_1.default)) {
        throw new Error(`Must be Transaction object`);
      }
      if (!transaction2.chunks) {
        await transaction2.prepareChunks(transaction2.data);
      }
      const uploader = await this.getUploader(transaction2, transaction2.data);
      try {
        while (!uploader.isComplete) {
          await uploader.uploadChunk();
        }
      } catch (e) {
        if (uploader.lastResponseStatus > 0) {
          return {
            status: uploader.lastResponseStatus,
            statusText: uploader.lastResponseError,
            data: {
              error: uploader.lastResponseError
            }
          };
        }
        throw e;
      }
      return {
        status: 200,
        statusText: "OK",
        data: {}
      };
    }
    /**
     * Gets an uploader than can be used to upload a transaction chunk by chunk, giving progress
     * and the ability to resume.
     *
     * Usage example:
     *
     * ```
     * const uploader = arweave.transactions.getUploader(transaction);
     * while (!uploader.isComplete) {
     *   await uploader.uploadChunk();
     *   console.log(`${uploader.pctComplete}%`);
     * }
     * ```
     *
     * @param upload a Transaction object, a previously save progress object, or a transaction id.
     * @param data the data of the transaction. Required when resuming an upload.
     */
    async getUploader(upload, data2) {
      let uploader;
      if (data2 instanceof ArrayBuffer) {
        data2 = new Uint8Array(data2);
      }
      if (upload instanceof transaction_1.default) {
        if (!data2) {
          data2 = upload.data;
        }
        if (!(data2 instanceof Uint8Array)) {
          throw new Error("Data format is invalid");
        }
        if (!upload.chunks) {
          await upload.prepareChunks(data2);
        }
        uploader = new transaction_uploader_1.TransactionUploader(this.api, upload);
        if (!uploader.data || uploader.data.length === 0) {
          uploader.data = data2;
        }
      } else {
        if (typeof upload === "string") {
          upload = await transaction_uploader_1.TransactionUploader.fromTransactionId(this.api, upload);
        }
        if (!data2 || !(data2 instanceof Uint8Array)) {
          throw new Error(`Must provide data when resuming upload`);
        }
        uploader = await transaction_uploader_1.TransactionUploader.fromSerialized(this.api, upload, data2);
      }
      return uploader;
    }
    /**
     * Async generator version of uploader
     *
     * Usage example:
     *
     * ```
     * for await (const uploader of arweave.transactions.upload(tx)) {
     *  console.log(`${uploader.pctComplete}%`);
     * }
     * ```
     *
     * @param upload a Transaction object, a previously save uploader, or a transaction id.
     * @param data the data of the transaction. Required when resuming an upload.
     */
    upload(upload, data2) {
      return __asyncGenerator(this, arguments, function* upload_1() {
        const uploader = yield __await(this.getUploader(upload, data2));
        while (!uploader.isComplete) {
          yield __await(uploader.uploadChunk());
          yield yield __await(uploader);
        }
        return yield __await(uploader);
      });
    }
  }
  transactions$1.default = Transactions;
  return transactions$1;
}
var wallets$1 = {};
Object.defineProperty(wallets$1, "__esModule", { value: true });
const ArweaveUtils$5 = utils$3;
let Wallets$1 = class Wallets2 {
  constructor(api2, crypto2) {
    this.api = api2;
    this.crypto = crypto2;
  }
  /**
   * Get the wallet balance for the given address.
   *
   * @param {string} address - The arweave address to get the balance for.
   *
   * @returns {Promise<string>} - Promise which resolves with a winston string balance.
   */
  getBalance(address) {
    return this.api.get(`wallet/${address}/balance`, {
      transformResponse: [
        /**
         * We need to specify a response transformer to override
         * the default JSON.parse behaviour, as this causes
         * balances to be converted to a number and we want to
         * return it as a winston string.
         * @param data
         */
        function(data2) {
          return data2;
        }
      ]
    }).then((response) => {
      return response.data;
    });
  }
  /**
   * Get the last transaction ID for the given wallet address.
   *
   * @param {string} address - The arweave address to get the transaction for.
   *
   * @returns {Promise<string>} - Promise which resolves with a transaction ID.
   */
  getLastTransactionID(address) {
    return this.api.get(`wallet/${address}/last_tx`).then((response) => {
      return response.data;
    });
  }
  generate() {
    return this.crypto.generateJWK();
  }
  async jwkToAddress(jwk) {
    if (!jwk || jwk === "use_wallet") {
      return this.getAddress();
    } else {
      return this.getAddress(jwk);
    }
  }
  async getAddress(jwk) {
    if (!jwk || jwk === "use_wallet") {
      try {
        await arweaveWallet.connect(["ACCESS_ADDRESS"]);
      } catch (_a) {
      }
      return arweaveWallet.getActiveAddress();
    } else {
      return this.ownerToAddress(jwk.n);
    }
  }
  async ownerToAddress(owner) {
    return ArweaveUtils$5.bufferTob64Url(await this.crypto.hash(ArweaveUtils$5.b64UrlToBuffer(owner)));
  }
};
wallets$1.default = Wallets$1;
var silo$1 = {};
Object.defineProperty(silo$1, "__esModule", { value: true });
silo$1.SiloResource = void 0;
const ArweaveUtils$4 = utils$3;
let Silo$1 = class Silo2 {
  constructor(api2, crypto2, transactions2) {
    this.api = api2;
    this.crypto = crypto2;
    this.transactions = transactions2;
  }
  async get(siloURI) {
    if (!siloURI) {
      throw new Error(`No Silo URI specified`);
    }
    const resource = await this.parseUri(siloURI);
    const ids = await this.transactions.search("Silo-Name", resource.getAccessKey());
    if (ids.length == 0) {
      throw new Error(`No data could be found for the Silo URI: ${siloURI}`);
    }
    const transaction2 = await this.transactions.get(ids[0]);
    if (!transaction2) {
      throw new Error(`No data could be found for the Silo URI: ${siloURI}`);
    }
    const encrypted = transaction2.get("data", { decode: true, string: false });
    return this.crypto.decrypt(encrypted, resource.getEncryptionKey());
  }
  async readTransactionData(transaction2, siloURI) {
    if (!siloURI) {
      throw new Error(`No Silo URI specified`);
    }
    const resource = await this.parseUri(siloURI);
    const encrypted = transaction2.get("data", { decode: true, string: false });
    return this.crypto.decrypt(encrypted, resource.getEncryptionKey());
  }
  async parseUri(siloURI) {
    const parsed = siloURI.match(/^([a-z0-9-_]+)\.([0-9]+)/i);
    if (!parsed) {
      throw new Error(`Invalid Silo name, must be a name in the format of [a-z0-9]+.[0-9]+, e.g. 'bubble.7'`);
    }
    const siloName = parsed[1];
    const hashIterations = Math.pow(2, parseInt(parsed[2]));
    const digest = await this.hash(ArweaveUtils$4.stringToBuffer(siloName), hashIterations);
    const accessKey = ArweaveUtils$4.bufferTob64(digest.slice(0, 15));
    const encryptionkey = await this.hash(digest.slice(16, 31), 1);
    return new SiloResource$1(siloURI, accessKey, encryptionkey);
  }
  async hash(input, iterations) {
    let digest = await this.crypto.hash(input);
    for (let count = 0; count < iterations - 1; count++) {
      digest = await this.crypto.hash(digest);
    }
    return digest;
  }
};
silo$1.default = Silo$1;
let SiloResource$1 = class SiloResource2 {
  constructor(uri, accessKey, encryptionKey) {
    this.uri = uri;
    this.accessKey = accessKey;
    this.encryptionKey = encryptionKey;
  }
  getUri() {
    return this.uri;
  }
  getAccessKey() {
    return this.accessKey;
  }
  getEncryptionKey() {
    return this.encryptionKey;
  }
};
silo$1.SiloResource = SiloResource$1;
var chunks$1 = {};
Object.defineProperty(chunks$1, "__esModule", { value: true });
const error_1$3 = error$1;
const ArweaveUtils$3 = utils$3;
let Chunks$1 = class Chunks2 {
  constructor(api2) {
    this.api = api2;
  }
  async getTransactionOffset(id) {
    const resp = await this.api.get(`tx/${id}/offset`);
    if (resp.status === 200) {
      return resp.data;
    }
    throw new Error(`Unable to get transaction offset: ${(0, error_1$3.getError)(resp)}`);
  }
  async getChunk(offset) {
    const resp = await this.api.get(`chunk/${offset}`);
    if (resp.status === 200) {
      return resp.data;
    }
    throw new Error(`Unable to get chunk: ${(0, error_1$3.getError)(resp)}`);
  }
  async getChunkData(offset) {
    const chunk = await this.getChunk(offset);
    const buf = ArweaveUtils$3.b64UrlToBuffer(chunk.chunk);
    return buf;
  }
  firstChunkOffset(offsetResponse) {
    return parseInt(offsetResponse.offset) - parseInt(offsetResponse.size) + 1;
  }
  async downloadChunkedData(id) {
    const offsetResponse = await this.getTransactionOffset(id);
    const size = parseInt(offsetResponse.size);
    const endOffset = parseInt(offsetResponse.offset);
    const startOffset = endOffset - size + 1;
    const data2 = new Uint8Array(size);
    let byte = 0;
    while (byte < size) {
      if (this.api.config.logging) {
        console.log(`[chunk] ${byte}/${size}`);
      }
      let chunkData;
      try {
        chunkData = await this.getChunkData(startOffset + byte);
      } catch (error2) {
        console.error(`[chunk] Failed to fetch chunk at offset ${startOffset + byte}`);
        console.error(`[chunk] This could indicate that the chunk wasn't uploaded or hasn't yet seeded properly to a particular gateway/node`);
      }
      if (chunkData) {
        data2.set(chunkData, byte);
        byte += chunkData.length;
      } else {
        throw new Error(`Couldn't complete data download at ${byte}/${size}`);
      }
    }
    return data2;
  }
};
chunks$1.default = Chunks$1;
var blocks$1 = {};
Object.defineProperty(blocks$1, "__esModule", { value: true });
const error_1$2 = error$1;
let Blocks$1 = class Blocks2 {
  constructor(api2, network2) {
    this.api = api2;
    this.network = network2;
  }
  /**
   * Gets a block by its "indep_hash"
   */
  async get(indepHash) {
    const response = await this.api.get(`${Blocks$1.ENDPOINT}${indepHash}`);
    if (response.status === 200) {
      return response.data;
    } else {
      if (response.status === 404) {
        throw new error_1$2.default(
          "BLOCK_NOT_FOUND"
          /* ArweaveErrorType.BLOCK_NOT_FOUND */
        );
      } else {
        throw new Error(`Error while loading block data: ${response}`);
      }
    }
  }
  /**
   * Gets current block data (ie. block with indep_hash = Network.getInfo().current)
   */
  async getCurrent() {
    const { current } = await this.network.getInfo();
    return await this.get(current);
  }
};
blocks$1.default = Blocks$1;
Blocks$1.ENDPOINT = "block/hash/";
var hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1)
    return common$1;
  hasRequiredCommon$1 = 1;
  Object.defineProperty(common$1, "__esModule", { value: true });
  const ar_1 = ar$1;
  const api_1 = api$1;
  const node_driver_1 = webcryptoDriver;
  const network_1 = network$1;
  const transactions_1 = requireTransactions$1();
  const wallets_1 = wallets$1;
  const transaction_1 = requireTransaction$1();
  const ArweaveUtils2 = utils$3;
  const silo_1 = silo$1;
  const chunks_1 = chunks$1;
  const blocks_1 = blocks$1;
  class Arweave {
    constructor(apiConfig) {
      this.api = new api_1.default(apiConfig);
      this.wallets = new wallets_1.default(this.api, Arweave.crypto);
      this.chunks = new chunks_1.default(this.api);
      this.transactions = new transactions_1.default(this.api, Arweave.crypto, this.chunks);
      this.silo = new silo_1.default(this.api, this.crypto, this.transactions);
      this.network = new network_1.default(this.api);
      this.blocks = new blocks_1.default(this.api, this.network);
      this.ar = new ar_1.default();
    }
    /** @deprecated */
    get crypto() {
      return Arweave.crypto;
    }
    /** @deprecated */
    get utils() {
      return Arweave.utils;
    }
    getConfig() {
      return {
        api: this.api.getConfig(),
        crypto: null
      };
    }
    async createTransaction(attributes, jwk) {
      const transaction2 = {};
      Object.assign(transaction2, attributes);
      if (!attributes.data && !(attributes.target && attributes.quantity)) {
        throw new Error(`A new Arweave transaction must have a 'data' value, or 'target' and 'quantity' values.`);
      }
      if (attributes.owner == void 0) {
        if (jwk && jwk !== "use_wallet") {
          transaction2.owner = jwk.n;
        }
      }
      if (attributes.last_tx == void 0) {
        transaction2.last_tx = await this.transactions.getTransactionAnchor();
      }
      if (typeof attributes.data === "string") {
        attributes.data = ArweaveUtils2.stringToBuffer(attributes.data);
      }
      if (attributes.data instanceof ArrayBuffer) {
        attributes.data = new Uint8Array(attributes.data);
      }
      if (attributes.data && !(attributes.data instanceof Uint8Array)) {
        throw new Error("Expected data to be a string, Uint8Array or ArrayBuffer");
      }
      if (attributes.reward == void 0) {
        const length = attributes.data ? attributes.data.byteLength : 0;
        transaction2.reward = await this.transactions.getPrice(length, transaction2.target);
      }
      transaction2.data_root = "";
      transaction2.data_size = attributes.data ? attributes.data.byteLength.toString() : "0";
      transaction2.data = attributes.data || new Uint8Array(0);
      const createdTransaction = new transaction_1.default(transaction2);
      await createdTransaction.getSignatureData();
      return createdTransaction;
    }
    async createSiloTransaction(attributes, jwk, siloUri) {
      const transaction2 = {};
      Object.assign(transaction2, attributes);
      if (!attributes.data) {
        throw new Error(`Silo transactions must have a 'data' value`);
      }
      if (!siloUri) {
        throw new Error(`No Silo URI specified.`);
      }
      if (attributes.target || attributes.quantity) {
        throw new Error(`Silo transactions can only be used for storing data, sending AR to other wallets isn't supported.`);
      }
      if (attributes.owner == void 0) {
        if (!jwk || !jwk.n) {
          throw new Error(`A new Arweave transaction must either have an 'owner' attribute, or you must provide the jwk parameter.`);
        }
        transaction2.owner = jwk.n;
      }
      if (attributes.last_tx == void 0) {
        transaction2.last_tx = await this.transactions.getTransactionAnchor();
      }
      const siloResource = await this.silo.parseUri(siloUri);
      if (typeof attributes.data == "string") {
        const encrypted = await this.crypto.encrypt(ArweaveUtils2.stringToBuffer(attributes.data), siloResource.getEncryptionKey());
        transaction2.reward = await this.transactions.getPrice(encrypted.byteLength);
        transaction2.data = ArweaveUtils2.bufferTob64Url(encrypted);
      }
      if (attributes.data instanceof Uint8Array) {
        const encrypted = await this.crypto.encrypt(attributes.data, siloResource.getEncryptionKey());
        transaction2.reward = await this.transactions.getPrice(encrypted.byteLength);
        transaction2.data = ArweaveUtils2.bufferTob64Url(encrypted);
      }
      const siloTransaction = new transaction_1.default(transaction2);
      siloTransaction.addTag("Silo-Name", siloResource.getAccessKey());
      siloTransaction.addTag("Silo-Version", `0.1.0`);
      return siloTransaction;
    }
    arql(query) {
      return this.api.post("/arql", query).then((response) => response.data || []);
    }
  }
  common$1.default = Arweave;
  Arweave.crypto = new node_driver_1.default();
  Arweave.utils = ArweaveUtils2;
  return common$1;
}
(function(exports2) {
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports3) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
        __createBinding2(exports3, m, p);
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  const common_1 = requireCommon$1();
  common_1.default.init = function(apiConfig = {}) {
    function getDefaultConfig() {
      const defaults2 = {
        host: "arweave.net",
        port: 443,
        protocol: "https"
      };
      if (typeof location !== "object" || !location.protocol || !location.hostname) {
        return defaults2;
      }
      const currentProtocol = location.protocol.replace(":", "");
      const currentHost = location.hostname;
      const currentPort = location.port ? parseInt(location.port) : currentProtocol == "https" ? 443 : 80;
      const isLocal = ["localhost", "127.0.0.1"].includes(currentHost) || currentProtocol == "file";
      if (isLocal) {
        return defaults2;
      }
      return {
        host: currentHost,
        port: currentPort,
        protocol: currentProtocol
      };
    }
    const defaultConfig = getDefaultConfig();
    const protocol = apiConfig.protocol || defaultConfig.protocol;
    const host = apiConfig.host || defaultConfig.host;
    const port = apiConfig.port || defaultConfig.port;
    return new common_1.default(Object.assign(Object.assign({}, apiConfig), {
      host,
      protocol,
      port
    }));
  };
  if (typeof globalThis === "object") {
    globalThis.Arweave = common_1.default;
  } else if (typeof self === "object") {
    self.Arweave = common_1.default;
  }
  __exportStar(requireCommon$1(), exports2);
  exports2.default = common_1.default;
})(web);
var transaction = {};
var utils$2 = {};
var __createBinding$5 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$5 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$5 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding$5(result, mod, k);
  }
  __setModuleDefault$5(result, mod);
  return result;
};
Object.defineProperty(utils$2, "__esModule", { value: true });
utils$2.b64UrlDecode = utils$2.b64UrlEncode = utils$2.bufferTob64Url = utils$2.bufferTob64 = utils$2.b64UrlToBuffer = utils$2.stringToB64Url = utils$2.stringToBuffer = utils$2.bufferToString = utils$2.b64UrlToString = utils$2.concatBuffers = void 0;
const B64js = __importStar$5(base64Js);
function concatBuffers(buffers) {
  let total_length = 0;
  for (let i = 0; i < buffers.length; i++) {
    total_length += buffers[i].byteLength;
  }
  let temp = new Uint8Array(total_length);
  let offset = 0;
  temp.set(new Uint8Array(buffers[0]), offset);
  offset += buffers[0].byteLength;
  for (let i = 1; i < buffers.length; i++) {
    temp.set(new Uint8Array(buffers[i]), offset);
    offset += buffers[i].byteLength;
  }
  return temp;
}
utils$2.concatBuffers = concatBuffers;
function b64UrlToString(b64UrlString) {
  let buffer2 = b64UrlToBuffer(b64UrlString);
  return bufferToString(buffer2);
}
utils$2.b64UrlToString = b64UrlToString;
function bufferToString(buffer2) {
  if (typeof TextDecoder == "undefined") {
    const TextDecoder2 = requireUtil().TextDecoder;
    return new TextDecoder2("utf-8", { fatal: true }).decode(buffer2);
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(buffer2);
}
utils$2.bufferToString = bufferToString;
function stringToBuffer(string) {
  if (typeof TextEncoder == "undefined") {
    const TextEncoder2 = requireUtil().TextEncoder;
    return new TextEncoder2().encode(string);
  }
  return new TextEncoder().encode(string);
}
utils$2.stringToBuffer = stringToBuffer;
function stringToB64Url(string) {
  return bufferTob64Url(stringToBuffer(string));
}
utils$2.stringToB64Url = stringToB64Url;
function b64UrlToBuffer(b64UrlString) {
  return new Uint8Array(B64js.toByteArray(b64UrlDecode(b64UrlString)));
}
utils$2.b64UrlToBuffer = b64UrlToBuffer;
function bufferTob64(buffer2) {
  return B64js.fromByteArray(new Uint8Array(buffer2));
}
utils$2.bufferTob64 = bufferTob64;
function bufferTob64Url(buffer2) {
  return b64UrlEncode(bufferTob64(buffer2));
}
utils$2.bufferTob64Url = bufferTob64Url;
function b64UrlEncode(b64UrlString) {
  return b64UrlString.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
}
utils$2.b64UrlEncode = b64UrlEncode;
function b64UrlDecode(b64UrlString) {
  b64UrlString = b64UrlString.replace(/\-/g, "+").replace(/\_/g, "/");
  let padding;
  b64UrlString.length % 4 == 0 ? padding = 0 : padding = 4 - b64UrlString.length % 4;
  return b64UrlString.concat("=".repeat(padding));
}
utils$2.b64UrlDecode = b64UrlDecode;
var deepHash = {};
var common = {};
var ar = {};
Object.defineProperty(ar, "__esModule", { value: true });
const bignumber_js_1 = bignumberExports$1;
class Ar {
  constructor() {
    this.BigNum = (value, decimals) => {
      let instance = bignumber_js_1.BigNumber.clone({ DECIMAL_PLACES: decimals });
      return new instance(value);
    };
  }
  winstonToAr(winstonString, { formatted = false, decimals = 12, trim: trim2 = true } = {}) {
    let number = this.stringToBigNum(winstonString, decimals).shiftedBy(-12);
    return formatted ? number.toFormat(decimals) : number.toFixed(decimals);
  }
  arToWinston(arString, { formatted = false } = {}) {
    let number = this.stringToBigNum(arString).shiftedBy(12);
    return formatted ? number.toFormat() : number.toFixed(0);
  }
  compare(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    let b = this.stringToBigNum(winstonStringB);
    return a.comparedTo(b);
  }
  isEqual(winstonStringA, winstonStringB) {
    return this.compare(winstonStringA, winstonStringB) === 0;
  }
  isLessThan(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    let b = this.stringToBigNum(winstonStringB);
    return a.isLessThan(b);
  }
  isGreaterThan(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    let b = this.stringToBigNum(winstonStringB);
    return a.isGreaterThan(b);
  }
  add(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    this.stringToBigNum(winstonStringB);
    return a.plus(winstonStringB).toFixed(0);
  }
  sub(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    this.stringToBigNum(winstonStringB);
    return a.minus(winstonStringB).toFixed(0);
  }
  stringToBigNum(stringValue, decimalPlaces = 12) {
    return this.BigNum(stringValue, decimalPlaces);
  }
}
ar.default = Ar;
var api = {};
var __importDefault$3 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(api, "__esModule", { value: true });
const axios_1 = __importDefault$3(axiosExports$1);
class Api {
  constructor(config2) {
    this.METHOD_GET = "GET";
    this.METHOD_POST = "POST";
    this.applyConfig(config2);
  }
  applyConfig(config2) {
    this.config = this.mergeDefaults(config2);
  }
  getConfig() {
    return this.config;
  }
  mergeDefaults(config2) {
    const protocol = config2.protocol || "http";
    const port = config2.port || (protocol === "https" ? 443 : 80);
    return {
      host: config2.host || "127.0.0.1",
      protocol,
      port,
      timeout: config2.timeout || 2e4,
      logging: config2.logging || false,
      logger: config2.logger || console.log,
      network: config2.network
    };
  }
  async get(endpoint, config2) {
    try {
      return await this.request().get(endpoint, config2);
    } catch (error2) {
      if (error2.response && error2.response.status) {
        return error2.response;
      }
      throw error2;
    }
  }
  async post(endpoint, body, config2) {
    try {
      return await this.request().post(endpoint, body, config2);
    } catch (error2) {
      if (error2.response && error2.response.status) {
        return error2.response;
      }
      throw error2;
    }
  }
  /**
   * Get an AxiosInstance with the base configuration setup to fire off
   * a request to the network.
   */
  request() {
    const headers = {};
    if (this.config.network) {
      headers["x-network"] = this.config.network;
    }
    let instance = axios_1.default.create({
      baseURL: `${this.config.protocol}://${this.config.host}:${this.config.port}`,
      timeout: this.config.timeout,
      maxContentLength: 1024 * 1024 * 512,
      headers
    });
    if (this.config.logging) {
      instance.interceptors.request.use((request2) => {
        this.config.logger(`Requesting: ${request2.baseURL}/${request2.url}`);
        return request2;
      });
      instance.interceptors.response.use((response) => {
        this.config.logger(`Response:   ${response.config.url} - ${response.status}`);
        return response;
      });
    }
    return instance;
  }
}
api.default = Api;
var nodeDriver = {};
var pem = {};
var __createBinding$4 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$4 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$4 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding$4(result, mod, k);
  }
  __setModuleDefault$4(result, mod);
  return result;
};
Object.defineProperty(pem, "__esModule", { value: true });
pem.jwkTopem = pem.pemTojwk = void 0;
const asn = __importStar$4(asn1);
function urlize(base64) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hex2b64url(str) {
  return urlize(Buffer.from(str, "hex").toString("base64"));
}
var RSAPublicKey = asn.define("RSAPublicKey", function() {
  this.seq().obj(this.key("n").int(), this.key("e").int());
});
var AlgorithmIdentifier = asn.define("AlgorithmIdentifier", function() {
  this.seq().obj(this.key("algorithm").objid(), this.key("parameters").optional().any());
});
var PublicKeyInfo = asn.define("PublicKeyInfo", function() {
  this.seq().obj(this.key("algorithm").use(AlgorithmIdentifier), this.key("publicKey").bitstr());
});
var Version = asn.define("Version", function() {
  this.int({
    0: "two-prime",
    1: "multi"
  });
});
var OtherPrimeInfos = asn.define("OtherPrimeInfos", function() {
  this.seq().obj(this.key("ri").int(), this.key("di").int(), this.key("ti").int());
});
var RSAPrivateKey = asn.define("RSAPrivateKey", function() {
  this.seq().obj(this.key("version").use(Version), this.key("n").int(), this.key("e").int(), this.key("d").int(), this.key("p").int(), this.key("q").int(), this.key("dp").int(), this.key("dq").int(), this.key("qi").int(), this.key("other").optional().use(OtherPrimeInfos));
});
var PrivateKeyInfo = asn.define("PrivateKeyInfo", function() {
  this.seq().obj(this.key("version").use(Version), this.key("algorithm").use(AlgorithmIdentifier), this.key("privateKey").bitstr());
});
function addExtras(obj, extras) {
  extras = extras || {};
  Object.keys(extras).forEach(function(key2) {
    obj[key2] = extras[key2];
  });
  return obj;
}
function pad(hex) {
  return hex.length % 2 === 1 ? "0" + hex : hex;
}
function decodeRsaPublic(buffer2, extras) {
  var key2 = RSAPublicKey.decode(buffer2, "der");
  var e = pad(key2.e.toString(16));
  var jwk = {
    kty: "RSA",
    n: bn2base64url(key2.n),
    e: hex2b64url(e)
  };
  return addExtras(jwk, extras);
}
function decodeRsaPrivate(buffer2, extras) {
  var key2 = RSAPrivateKey.decode(buffer2, "der");
  var e = pad(key2.e.toString(16));
  var jwk = {
    kty: "RSA",
    n: bn2base64url(key2.n),
    e: hex2b64url(e),
    d: bn2base64url(key2.d),
    p: bn2base64url(key2.p),
    q: bn2base64url(key2.q),
    dp: bn2base64url(key2.dp),
    dq: bn2base64url(key2.dq),
    qi: bn2base64url(key2.qi)
  };
  return addExtras(jwk, extras);
}
function decodePublic(buffer2, extras) {
  var info = PublicKeyInfo.decode(buffer2, "der");
  return decodeRsaPublic(info.publicKey.data, extras);
}
function decodePrivate(buffer2, extras) {
  var info = PrivateKeyInfo.decode(buffer2, "der");
  return decodeRsaPrivate(info.privateKey.data, extras);
}
function getDecoder(header) {
  var match = /^-----BEGIN (RSA )?(PUBLIC|PRIVATE) KEY-----$/.exec(header);
  if (!match) {
    return null;
  }
  var isRSA = !!match[1];
  var isPrivate = match[2] === "PRIVATE";
  if (isPrivate) {
    return isRSA ? decodeRsaPrivate : decodePrivate;
  } else {
    return isRSA ? decodeRsaPublic : decodePublic;
  }
}
function parse(jwk) {
  return {
    n: string2bn(jwk.n),
    e: string2bn(jwk.e),
    d: jwk.d && string2bn(jwk.d),
    p: jwk.p && string2bn(jwk.p),
    q: jwk.q && string2bn(jwk.q),
    dp: jwk.dp && string2bn(jwk.dp),
    dq: jwk.dq && string2bn(jwk.dq),
    qi: jwk.qi && string2bn(jwk.qi)
  };
}
function bn2base64url(bn2) {
  return hex2b64url(pad(bn2.toString(16)));
}
function base64url2bn(str) {
  return new asn.bignum(Buffer.from(str, "base64"));
}
function string2bn(str) {
  if (/^[0-9]+$/.test(str)) {
    return new asn.bignum(str, 10);
  }
  return base64url2bn(str);
}
function pemTojwk(pem2, extras) {
  var text = pem2.toString().split(/(\r\n|\r|\n)+/g);
  text = text.filter(function(line) {
    return line.trim().length !== 0;
  });
  var decoder2 = getDecoder(text[0]);
  text = text.slice(1, -1).join("");
  return decoder2(Buffer.from(text.replace(/[^\w\d\+\/=]+/g, ""), "base64"), extras);
}
pem.pemTojwk = pemTojwk;
function jwkTopem(json) {
  var jwk = parse(json);
  var isPrivate = !!jwk.d;
  var t = isPrivate ? "PRIVATE" : "PUBLIC";
  var header = "-----BEGIN RSA " + t + " KEY-----\n";
  var footer = "\n-----END RSA " + t + " KEY-----\n";
  var data2 = Buffer.alloc(0);
  if (isPrivate) {
    jwk.version = "two-prime";
    data2 = RSAPrivateKey.encode(jwk, "der");
  } else {
    data2 = RSAPublicKey.encode(jwk, "der");
  }
  var body = data2.toString("base64").match(/.{1,64}/g).join("\n");
  return header + body + footer;
}
pem.jwkTopem = jwkTopem;
var __createBinding$3 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$3 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$3 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding$3(result, mod, k);
  }
  __setModuleDefault$3(result, mod);
  return result;
};
Object.defineProperty(nodeDriver, "__esModule", { value: true });
const pem_1 = pem;
const crypto$1 = __importStar$3(require$$1);
class NodeCryptoDriver {
  constructor() {
    this.keyLength = 4096;
    this.publicExponent = 65537;
    this.hashAlgorithm = "sha256";
    this.encryptionAlgorithm = "aes-256-cbc";
  }
  generateJWK() {
    if (typeof crypto$1.generateKeyPair != "function") {
      throw new Error("Keypair generation not supported in this version of Node, only supported in versions 10+");
    }
    return new Promise((resolve, reject) => {
      crypto$1.generateKeyPair("rsa", {
        modulusLength: this.keyLength,
        publicExponent: this.publicExponent,
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem"
        },
        publicKeyEncoding: { type: "pkcs1", format: "pem" }
      }, (err, publicKey, privateKey) => {
        if (err) {
          reject(err);
        }
        resolve(this.pemToJWK(privateKey));
      });
    });
  }
  sign(jwk, data2, { saltLength } = {}) {
    return new Promise((resolve, reject) => {
      resolve(crypto$1.createSign(this.hashAlgorithm).update(data2).sign({
        key: this.jwkToPem(jwk),
        padding: crypto$1.constants.RSA_PKCS1_PSS_PADDING,
        saltLength
      }));
    });
  }
  verify(publicModulus, data2, signature) {
    return new Promise((resolve, reject) => {
      const publicKey = {
        kty: "RSA",
        e: "AQAB",
        n: publicModulus
      };
      const pem2 = this.jwkToPem(publicKey);
      resolve(crypto$1.createVerify(this.hashAlgorithm).update(data2).verify({
        key: pem2,
        padding: crypto$1.constants.RSA_PKCS1_PSS_PADDING
      }, signature));
    });
  }
  hash(data2, algorithm2 = "SHA-256") {
    return new Promise((resolve, reject) => {
      resolve(crypto$1.createHash(this.parseHashAlgorithm(algorithm2)).update(data2).digest());
    });
  }
  /**
   * If a key is passed as a buffer it *must* be exactly 32 bytes.
   * If a key is passed as a string then any length may be used.
   *
   * @param {Buffer} data
   * @param {(string | Buffer)} key
   * @returns {Promise<Uint8Array>}
   */
  async encrypt(data2, key2, salt) {
    const derivedKey = crypto$1.pbkdf2Sync(key2, salt = salt ? salt : "salt", 1e5, 32, this.hashAlgorithm);
    const iv = crypto$1.randomBytes(16);
    const cipher = crypto$1.createCipheriv(this.encryptionAlgorithm, derivedKey, iv);
    const encrypted = Buffer.concat([iv, cipher.update(data2), cipher.final()]);
    return encrypted;
  }
  /**
   * If a key is passed as a buffer it *must* be exactly 32 bytes.
   * If a key is passed as a string then any length may be used.
   *
   * @param {Buffer} encrypted
   * @param {(string | Buffer)} key
   * @returns {Promise<Uint8Array>}
   */
  async decrypt(encrypted, key2, salt) {
    try {
      const derivedKey = crypto$1.pbkdf2Sync(key2, salt = salt ? salt : "salt", 1e5, 32, this.hashAlgorithm);
      const iv = encrypted.slice(0, 16);
      const data2 = encrypted.slice(16);
      const decipher = crypto$1.createDecipheriv(this.encryptionAlgorithm, derivedKey, iv);
      const decrypted = Buffer.concat([
        decipher.update(data2),
        decipher.final()
      ]);
      return decrypted;
    } catch (error2) {
      throw new Error("Failed to decrypt");
    }
  }
  jwkToPem(jwk) {
    return (0, pem_1.jwkTopem)(jwk);
  }
  pemToJWK(pem2) {
    let jwk = (0, pem_1.pemTojwk)(pem2);
    return jwk;
  }
  parseHashAlgorithm(algorithm2) {
    switch (algorithm2) {
      case "SHA-256":
        return "sha256";
      case "SHA-384":
        return "sha384";
      default:
        throw new Error(`Algorithm not supported: ${algorithm2}`);
    }
  }
}
nodeDriver.default = NodeCryptoDriver;
var network = {};
Object.defineProperty(network, "__esModule", { value: true });
class Network {
  constructor(api2) {
    this.api = api2;
  }
  getInfo() {
    return this.api.get(`info`).then((response) => {
      return response.data;
    });
  }
  getPeers() {
    return this.api.get(`peers`).then((response) => {
      return response.data;
    });
  }
}
network.default = Network;
var transactions = {};
var error = {};
Object.defineProperty(error, "__esModule", { value: true });
error.getError = void 0;
class ArweaveError extends Error {
  constructor(type2, optional = {}) {
    if (optional.message) {
      super(optional.message);
    } else {
      super();
    }
    this.type = type2;
    this.response = optional.response;
  }
  getType() {
    return this.type;
  }
}
error.default = ArweaveError;
function getError(resp) {
  let data2 = resp.data;
  if (typeof resp.data === "string") {
    try {
      data2 = JSON.parse(resp.data);
    } catch (e) {
    }
  }
  if (resp.data instanceof ArrayBuffer || resp.data instanceof Uint8Array) {
    try {
      data2 = JSON.parse(data2.toString());
    } catch (e) {
    }
  }
  return data2 ? data2.error || data2 : resp.statusText || "unknown";
}
error.getError = getError;
var transactionUploader = {};
var merkle = {};
var hasRequiredMerkle;
function requireMerkle() {
  if (hasRequiredMerkle)
    return merkle;
  hasRequiredMerkle = 1;
  (function(exports2) {
    var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.debug = exports2.validatePath = exports2.arrayCompare = exports2.bufferToInt = exports2.intToBuffer = exports2.arrayFlatten = exports2.generateProofs = exports2.buildLayers = exports2.generateTransactionChunks = exports2.generateTree = exports2.computeRootHash = exports2.generateLeaves = exports2.chunkData = exports2.MIN_CHUNK_SIZE = exports2.MAX_CHUNK_SIZE = void 0;
    const common_1 = __importDefault2(requireCommon());
    const utils_12 = utils$2;
    exports2.MAX_CHUNK_SIZE = 256 * 1024;
    exports2.MIN_CHUNK_SIZE = 32 * 1024;
    const NOTE_SIZE = 32;
    const HASH_SIZE = 32;
    async function chunkData(data2) {
      let chunks2 = [];
      let rest = data2;
      let cursor = 0;
      while (rest.byteLength >= exports2.MAX_CHUNK_SIZE) {
        let chunkSize = exports2.MAX_CHUNK_SIZE;
        let nextChunkSize = rest.byteLength - exports2.MAX_CHUNK_SIZE;
        if (nextChunkSize > 0 && nextChunkSize < exports2.MIN_CHUNK_SIZE) {
          chunkSize = Math.ceil(rest.byteLength / 2);
        }
        const chunk = rest.slice(0, chunkSize);
        const dataHash = await common_1.default.crypto.hash(chunk);
        cursor += chunk.byteLength;
        chunks2.push({
          dataHash,
          minByteRange: cursor - chunk.byteLength,
          maxByteRange: cursor
        });
        rest = rest.slice(chunkSize);
      }
      chunks2.push({
        dataHash: await common_1.default.crypto.hash(rest),
        minByteRange: cursor,
        maxByteRange: cursor + rest.byteLength
      });
      return chunks2;
    }
    exports2.chunkData = chunkData;
    async function generateLeaves(chunks2) {
      return Promise.all(chunks2.map(async ({ dataHash, minByteRange, maxByteRange }) => {
        return {
          type: "leaf",
          id: await hash(await Promise.all([hash(dataHash), hash(intToBuffer(maxByteRange))])),
          dataHash,
          minByteRange,
          maxByteRange
        };
      }));
    }
    exports2.generateLeaves = generateLeaves;
    async function computeRootHash(data2) {
      const rootNode = await generateTree(data2);
      return rootNode.id;
    }
    exports2.computeRootHash = computeRootHash;
    async function generateTree(data2) {
      const rootNode = await buildLayers(await generateLeaves(await chunkData(data2)));
      return rootNode;
    }
    exports2.generateTree = generateTree;
    async function generateTransactionChunks(data2) {
      const chunks2 = await chunkData(data2);
      const leaves = await generateLeaves(chunks2);
      const root2 = await buildLayers(leaves);
      const proofs = await generateProofs(root2);
      const lastChunk = chunks2.slice(-1)[0];
      if (lastChunk.maxByteRange - lastChunk.minByteRange === 0) {
        chunks2.splice(chunks2.length - 1, 1);
        proofs.splice(proofs.length - 1, 1);
      }
      return {
        data_root: root2.id,
        chunks: chunks2,
        proofs
      };
    }
    exports2.generateTransactionChunks = generateTransactionChunks;
    async function buildLayers(nodes, level = 0) {
      if (nodes.length < 2) {
        const root2 = nodes[0];
        return root2;
      }
      const nextLayer = [];
      for (let i = 0; i < nodes.length; i += 2) {
        nextLayer.push(await hashBranch(nodes[i], nodes[i + 1]));
      }
      return buildLayers(nextLayer, level + 1);
    }
    exports2.buildLayers = buildLayers;
    function generateProofs(root2) {
      const proofs = resolveBranchProofs(root2);
      if (!Array.isArray(proofs)) {
        return [proofs];
      }
      return arrayFlatten(proofs);
    }
    exports2.generateProofs = generateProofs;
    function resolveBranchProofs(node, proof = new Uint8Array(), depth = 0) {
      if (node.type == "leaf") {
        return {
          offset: node.maxByteRange - 1,
          proof: (0, utils_12.concatBuffers)([
            proof,
            node.dataHash,
            intToBuffer(node.maxByteRange)
          ])
        };
      }
      if (node.type == "branch") {
        const partialProof = (0, utils_12.concatBuffers)([
          proof,
          node.leftChild.id,
          node.rightChild.id,
          intToBuffer(node.byteRange)
        ]);
        return [
          resolveBranchProofs(node.leftChild, partialProof, depth + 1),
          resolveBranchProofs(node.rightChild, partialProof, depth + 1)
        ];
      }
      throw new Error(`Unexpected node type`);
    }
    function arrayFlatten(input) {
      const flat = [];
      input.forEach((item) => {
        if (Array.isArray(item)) {
          flat.push(...arrayFlatten(item));
        } else {
          flat.push(item);
        }
      });
      return flat;
    }
    exports2.arrayFlatten = arrayFlatten;
    async function hashBranch(left, right) {
      if (!right) {
        return left;
      }
      let branch = {
        type: "branch",
        id: await hash([
          await hash(left.id),
          await hash(right.id),
          await hash(intToBuffer(left.maxByteRange))
        ]),
        byteRange: left.maxByteRange,
        maxByteRange: right.maxByteRange,
        leftChild: left,
        rightChild: right
      };
      return branch;
    }
    async function hash(data2) {
      if (Array.isArray(data2)) {
        data2 = common_1.default.utils.concatBuffers(data2);
      }
      return new Uint8Array(await common_1.default.crypto.hash(data2));
    }
    function intToBuffer(note) {
      const buffer2 = new Uint8Array(NOTE_SIZE);
      for (var i = buffer2.length - 1; i >= 0; i--) {
        var byte = note % 256;
        buffer2[i] = byte;
        note = (note - byte) / 256;
      }
      return buffer2;
    }
    exports2.intToBuffer = intToBuffer;
    function bufferToInt(buffer2) {
      let value = 0;
      for (var i = 0; i < buffer2.length; i++) {
        value *= 256;
        value += buffer2[i];
      }
      return value;
    }
    exports2.bufferToInt = bufferToInt;
    const arrayCompare = (a, b) => a.every((value, index2) => b[index2] === value);
    exports2.arrayCompare = arrayCompare;
    async function validatePath(id, dest, leftBound, rightBound, path) {
      if (rightBound <= 0) {
        return false;
      }
      if (dest >= rightBound) {
        return validatePath(id, 0, rightBound - 1, rightBound, path);
      }
      if (dest < 0) {
        return validatePath(id, 0, 0, rightBound, path);
      }
      if (path.length == HASH_SIZE + NOTE_SIZE) {
        const pathData = path.slice(0, HASH_SIZE);
        const endOffsetBuffer = path.slice(pathData.length, pathData.length + NOTE_SIZE);
        const pathDataHash = await hash([
          await hash(pathData),
          await hash(endOffsetBuffer)
        ]);
        let result = (0, exports2.arrayCompare)(id, pathDataHash);
        if (result) {
          return {
            offset: rightBound - 1,
            leftBound,
            rightBound,
            chunkSize: rightBound - leftBound
          };
        }
        return false;
      }
      const left = path.slice(0, HASH_SIZE);
      const right = path.slice(left.length, left.length + HASH_SIZE);
      const offsetBuffer = path.slice(left.length + right.length, left.length + right.length + NOTE_SIZE);
      const offset = bufferToInt(offsetBuffer);
      const remainder = path.slice(left.length + right.length + offsetBuffer.length);
      const pathHash = await hash([
        await hash(left),
        await hash(right),
        await hash(offsetBuffer)
      ]);
      if ((0, exports2.arrayCompare)(id, pathHash)) {
        if (dest < offset) {
          return await validatePath(left, dest, leftBound, Math.min(rightBound, offset), remainder);
        }
        return await validatePath(right, dest, Math.max(leftBound, offset), rightBound, remainder);
      }
      return false;
    }
    exports2.validatePath = validatePath;
    async function debug(proof, output = "") {
      if (proof.byteLength < 1) {
        return output;
      }
      const left = proof.slice(0, HASH_SIZE);
      const right = proof.slice(left.length, left.length + HASH_SIZE);
      const offsetBuffer = proof.slice(left.length + right.length, left.length + right.length + NOTE_SIZE);
      const offset = bufferToInt(offsetBuffer);
      const remainder = proof.slice(left.length + right.length + offsetBuffer.length);
      const pathHash = await hash([
        await hash(left),
        await hash(right),
        await hash(offsetBuffer)
      ]);
      const updatedOutput = `${output}
${JSON.stringify(Buffer.from(left))},${JSON.stringify(Buffer.from(right))},${offset} => ${JSON.stringify(pathHash)}`;
      return debug(remainder, updatedOutput);
    }
    exports2.debug = debug;
  })(merkle);
  return merkle;
}
var hasRequiredTransactionUploader;
function requireTransactionUploader() {
  if (hasRequiredTransactionUploader)
    return transactionUploader;
  hasRequiredTransactionUploader = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(transactionUploader, "__esModule", { value: true });
  transactionUploader.TransactionUploader = void 0;
  const transaction_1 = __importDefault2(requireTransaction());
  const ArweaveUtils2 = __importStar2(utils$2);
  const error_12 = error;
  const merkle_1 = requireMerkle();
  const MAX_CHUNKS_IN_BODY = 1;
  const FATAL_CHUNK_UPLOAD_ERRORS = [
    "invalid_json",
    "chunk_too_big",
    "data_path_too_big",
    "offset_too_big",
    "data_size_too_big",
    "chunk_proof_ratio_not_attractive",
    "invalid_proof"
  ];
  const ERROR_DELAY = 1e3 * 40;
  class TransactionUploader {
    get isComplete() {
      return this.txPosted && this.chunkIndex === this.transaction.chunks.chunks.length;
    }
    get totalChunks() {
      return this.transaction.chunks.chunks.length;
    }
    get uploadedChunks() {
      return this.chunkIndex;
    }
    get pctComplete() {
      return Math.trunc(this.uploadedChunks / this.totalChunks * 100);
    }
    constructor(api2, transaction2) {
      this.api = api2;
      this.chunkIndex = 0;
      this.txPosted = false;
      this.lastRequestTimeEnd = 0;
      this.totalErrors = 0;
      this.lastResponseStatus = 0;
      this.lastResponseError = "";
      if (!transaction2.id) {
        throw new Error(`Transaction is not signed`);
      }
      if (!transaction2.chunks) {
        throw new Error(`Transaction chunks not prepared`);
      }
      this.data = transaction2.data;
      this.transaction = new transaction_1.default(Object.assign({}, transaction2, { data: new Uint8Array(0) }));
    }
    /**
     * Uploads the next part of the transaction.
     * On the first call this posts the transaction
     * itself and on any subsequent calls uploads the
     * next chunk until it completes.
     */
    async uploadChunk(chunkIndex_) {
      if (this.isComplete) {
        throw new Error(`Upload is already complete`);
      }
      if (this.lastResponseError !== "") {
        this.totalErrors++;
      } else {
        this.totalErrors = 0;
      }
      if (this.totalErrors === 100) {
        throw new Error(`Unable to complete upload: ${this.lastResponseStatus}: ${this.lastResponseError}`);
      }
      let delay = this.lastResponseError === "" ? 0 : Math.max(this.lastRequestTimeEnd + ERROR_DELAY - Date.now(), ERROR_DELAY);
      if (delay > 0) {
        delay = delay - delay * Math.random() * 0.3;
        await new Promise((res) => setTimeout(res, delay));
      }
      this.lastResponseError = "";
      if (!this.txPosted) {
        await this.postTransaction();
        return;
      }
      if (chunkIndex_) {
        this.chunkIndex = chunkIndex_;
      }
      const chunk = this.transaction.getChunk(chunkIndex_ || this.chunkIndex, this.data);
      const chunkOk = await (0, merkle_1.validatePath)(this.transaction.chunks.data_root, parseInt(chunk.offset), 0, parseInt(chunk.data_size), ArweaveUtils2.b64UrlToBuffer(chunk.data_path));
      if (!chunkOk) {
        throw new Error(`Unable to validate chunk ${this.chunkIndex}`);
      }
      const resp = await this.api.post(`chunk`, this.transaction.getChunk(this.chunkIndex, this.data)).catch((e) => {
        console.error(e.message);
        return { status: -1, data: { error: e.message } };
      });
      this.lastRequestTimeEnd = Date.now();
      this.lastResponseStatus = resp.status;
      if (this.lastResponseStatus == 200) {
        this.chunkIndex++;
      } else {
        this.lastResponseError = (0, error_12.getError)(resp);
        if (FATAL_CHUNK_UPLOAD_ERRORS.includes(this.lastResponseError)) {
          throw new Error(`Fatal error uploading chunk ${this.chunkIndex}: ${this.lastResponseError}`);
        }
      }
    }
    /**
     * Reconstructs an upload from its serialized state and data.
     * Checks if data matches the expected data_root.
     *
     * @param serialized
     * @param data
     */
    static async fromSerialized(api2, serialized, data2) {
      if (!serialized || typeof serialized.chunkIndex !== "number" || typeof serialized.transaction !== "object") {
        throw new Error(`Serialized object does not match expected format.`);
      }
      var transaction2 = new transaction_1.default(serialized.transaction);
      if (!transaction2.chunks) {
        await transaction2.prepareChunks(data2);
      }
      const upload = new TransactionUploader(api2, transaction2);
      upload.chunkIndex = serialized.chunkIndex;
      upload.lastRequestTimeEnd = serialized.lastRequestTimeEnd;
      upload.lastResponseError = serialized.lastResponseError;
      upload.lastResponseStatus = serialized.lastResponseStatus;
      upload.txPosted = serialized.txPosted;
      upload.data = data2;
      if (upload.transaction.data_root !== serialized.transaction.data_root) {
        throw new Error(`Data mismatch: Uploader doesn't match provided data.`);
      }
      return upload;
    }
    /**
     * Reconstruct an upload from the tx metadata, ie /tx/<id>.
     *
     * @param api
     * @param id
     * @param data
     */
    static async fromTransactionId(api2, id) {
      const resp = await api2.get(`tx/${id}`);
      if (resp.status !== 200) {
        throw new Error(`Tx ${id} not found: ${resp.status}`);
      }
      const transaction2 = resp.data;
      transaction2.data = new Uint8Array(0);
      const serialized = {
        txPosted: true,
        chunkIndex: 0,
        lastResponseError: "",
        lastRequestTimeEnd: 0,
        lastResponseStatus: 0,
        transaction: transaction2
      };
      return serialized;
    }
    toJSON() {
      return {
        chunkIndex: this.chunkIndex,
        transaction: this.transaction,
        lastRequestTimeEnd: this.lastRequestTimeEnd,
        lastResponseStatus: this.lastResponseStatus,
        lastResponseError: this.lastResponseError,
        txPosted: this.txPosted
      };
    }
    // POST to /tx
    async postTransaction() {
      const uploadInBody = this.totalChunks <= MAX_CHUNKS_IN_BODY;
      if (uploadInBody) {
        this.transaction.data = this.data;
        const resp2 = await this.api.post(`tx`, this.transaction).catch((e) => {
          console.error(e);
          return { status: -1, data: { error: e.message } };
        });
        this.lastRequestTimeEnd = Date.now();
        this.lastResponseStatus = resp2.status;
        this.transaction.data = new Uint8Array(0);
        if (resp2.status >= 200 && resp2.status < 300) {
          this.txPosted = true;
          this.chunkIndex = MAX_CHUNKS_IN_BODY;
          return;
        }
        this.lastResponseError = (0, error_12.getError)(resp2);
        throw new Error(`Unable to upload transaction: ${resp2.status}, ${this.lastResponseError}`);
      }
      const resp = await this.api.post(`tx`, this.transaction);
      this.lastRequestTimeEnd = Date.now();
      this.lastResponseStatus = resp.status;
      if (!(resp.status >= 200 && resp.status < 300)) {
        this.lastResponseError = (0, error_12.getError)(resp);
        throw new Error(`Unable to upload transaction: ${resp.status}, ${this.lastResponseError}`);
      }
      this.txPosted = true;
    }
  }
  transactionUploader.TransactionUploader = TransactionUploader;
  return transactionUploader;
}
var hasRequiredTransactions;
function requireTransactions() {
  if (hasRequiredTransactions)
    return transactions;
  hasRequiredTransactions = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __await = commonjsGlobal && commonjsGlobal.__await || function(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  };
  var __asyncGenerator = commonjsGlobal && commonjsGlobal.__asyncGenerator || function(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function verb(n) {
      if (g[n])
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle2(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle2(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle2(f, v) {
      if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]);
    }
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(transactions, "__esModule", { value: true });
  const error_12 = __importDefault2(error);
  const transaction_1 = __importDefault2(requireTransaction());
  const ArweaveUtils2 = __importStar2(utils$2);
  const transaction_uploader_1 = requireTransactionUploader();
  class Transactions {
    constructor(api2, crypto2, chunks2) {
      this.api = api2;
      this.crypto = crypto2;
      this.chunks = chunks2;
    }
    getTransactionAnchor() {
      return this.api.get(`tx_anchor`, { transformResponse: [] }).then((response) => {
        return response.data;
      });
    }
    getPrice(byteSize, targetAddress) {
      let endpoint = targetAddress ? `price/${byteSize}/${targetAddress}` : `price/${byteSize}`;
      return this.api.get(endpoint, {
        transformResponse: [
          /**
           * We need to specify a response transformer to override
           * the default JSON.parse behavior, as this causes
           * winston to be converted to a number and we want to
           * return it as a winston string.
           * @param data
           */
          function(data2) {
            return data2;
          }
        ]
      }).then((response) => {
        return response.data;
      });
    }
    async get(id) {
      const response = await this.api.get(`tx/${id}`);
      if (response.status == 200) {
        const data_size = parseInt(response.data.data_size);
        if (response.data.format >= 2 && data_size > 0 && data_size <= 1024 * 1024 * 12) {
          const data2 = await this.getData(id);
          return new transaction_1.default(Object.assign(Object.assign({}, response.data), { data: data2 }));
        }
        return new transaction_1.default(Object.assign(Object.assign({}, response.data), { format: response.data.format || 1 }));
      }
      if (response.status == 404) {
        throw new error_12.default(
          "TX_NOT_FOUND"
          /* ArweaveErrorType.TX_NOT_FOUND */
        );
      }
      if (response.status == 410) {
        throw new error_12.default(
          "TX_FAILED"
          /* ArweaveErrorType.TX_FAILED */
        );
      }
      throw new error_12.default(
        "TX_INVALID"
        /* ArweaveErrorType.TX_INVALID */
      );
    }
    fromRaw(attributes) {
      return new transaction_1.default(attributes);
    }
    async search(tagName, tagValue) {
      return this.api.post(`arql`, {
        op: "equals",
        expr1: tagName,
        expr2: tagValue
      }).then((response) => {
        if (!response.data) {
          return [];
        }
        return response.data;
      });
    }
    getStatus(id) {
      return this.api.get(`tx/${id}/status`).then((response) => {
        if (response.status == 200) {
          return {
            status: 200,
            confirmed: response.data
          };
        }
        return {
          status: response.status,
          confirmed: null
        };
      });
    }
    async getData(id, options) {
      let data2 = void 0;
      try {
        data2 = await this.chunks.downloadChunkedData(id);
      } catch (error2) {
        console.error(`Error while trying to download chunked data for ${id}`);
        console.error(error2);
      }
      if (!data2) {
        console.warn(`Falling back to gateway cache for ${id}`);
        try {
          data2 = (await this.api.get(`/${id}`)).data;
        } catch (error2) {
          console.error(`Error while trying to download contiguous data from gateway cache for ${id}`);
          console.error(error2);
        }
      }
      if (!data2) {
        throw new Error(`${id} was not found!`);
      }
      if (options && options.decode && !options.string) {
        return data2;
      }
      if (options && options.decode && options.string) {
        return ArweaveUtils2.bufferToString(data2);
      }
      return ArweaveUtils2.bufferTob64Url(data2);
    }
    async sign(transaction2, jwk, options) {
      if (!jwk && typeof arweaveWallet !== "object") {
        throw new Error(`A new Arweave transaction must provide the jwk parameter.`);
      } else if (!jwk || jwk === "use_wallet") {
        try {
          const existingPermissions = await arweaveWallet.getPermissions();
          if (!existingPermissions.includes("SIGN_TRANSACTION"))
            await arweaveWallet.connect(["SIGN_TRANSACTION"]);
        } catch (_a) {
        }
        const signedTransaction = await arweaveWallet.sign(transaction2, options);
        transaction2.setSignature({
          id: signedTransaction.id,
          owner: signedTransaction.owner,
          reward: signedTransaction.reward,
          tags: signedTransaction.tags,
          signature: signedTransaction.signature
        });
      } else {
        transaction2.setOwner(jwk.n);
        let dataToSign = await transaction2.getSignatureData();
        let rawSignature = await this.crypto.sign(jwk, dataToSign, options);
        let id = await this.crypto.hash(rawSignature);
        transaction2.setSignature({
          id: ArweaveUtils2.bufferTob64Url(id),
          owner: jwk.n,
          signature: ArweaveUtils2.bufferTob64Url(rawSignature)
        });
      }
    }
    async verify(transaction2) {
      const signaturePayload = await transaction2.getSignatureData();
      const rawSignature = transaction2.get("signature", {
        decode: true,
        string: false
      });
      const expectedId = ArweaveUtils2.bufferTob64Url(await this.crypto.hash(rawSignature));
      if (transaction2.id !== expectedId) {
        throw new Error(`Invalid transaction signature or ID! The transaction ID doesn't match the expected SHA-256 hash of the signature.`);
      }
      return this.crypto.verify(transaction2.owner, signaturePayload, rawSignature);
    }
    async post(transaction2) {
      if (typeof transaction2 === "string") {
        transaction2 = new transaction_1.default(JSON.parse(transaction2));
      } else if (typeof transaction2.readInt32BE === "function") {
        transaction2 = new transaction_1.default(JSON.parse(transaction2.toString()));
      } else if (typeof transaction2 === "object" && !(transaction2 instanceof transaction_1.default)) {
        transaction2 = new transaction_1.default(transaction2);
      }
      if (!(transaction2 instanceof transaction_1.default)) {
        throw new Error(`Must be Transaction object`);
      }
      if (!transaction2.chunks) {
        await transaction2.prepareChunks(transaction2.data);
      }
      const uploader = await this.getUploader(transaction2, transaction2.data);
      try {
        while (!uploader.isComplete) {
          await uploader.uploadChunk();
        }
      } catch (e) {
        if (uploader.lastResponseStatus > 0) {
          return {
            status: uploader.lastResponseStatus,
            statusText: uploader.lastResponseError,
            data: {
              error: uploader.lastResponseError
            }
          };
        }
        throw e;
      }
      return {
        status: 200,
        statusText: "OK",
        data: {}
      };
    }
    /**
     * Gets an uploader than can be used to upload a transaction chunk by chunk, giving progress
     * and the ability to resume.
     *
     * Usage example:
     *
     * ```
     * const uploader = arweave.transactions.getUploader(transaction);
     * while (!uploader.isComplete) {
     *   await uploader.uploadChunk();
     *   console.log(`${uploader.pctComplete}%`);
     * }
     * ```
     *
     * @param upload a Transaction object, a previously save progress object, or a transaction id.
     * @param data the data of the transaction. Required when resuming an upload.
     */
    async getUploader(upload, data2) {
      let uploader;
      if (data2 instanceof ArrayBuffer) {
        data2 = new Uint8Array(data2);
      }
      if (upload instanceof transaction_1.default) {
        if (!data2) {
          data2 = upload.data;
        }
        if (!(data2 instanceof Uint8Array)) {
          throw new Error("Data format is invalid");
        }
        if (!upload.chunks) {
          await upload.prepareChunks(data2);
        }
        uploader = new transaction_uploader_1.TransactionUploader(this.api, upload);
        if (!uploader.data || uploader.data.length === 0) {
          uploader.data = data2;
        }
      } else {
        if (typeof upload === "string") {
          upload = await transaction_uploader_1.TransactionUploader.fromTransactionId(this.api, upload);
        }
        if (!data2 || !(data2 instanceof Uint8Array)) {
          throw new Error(`Must provide data when resuming upload`);
        }
        uploader = await transaction_uploader_1.TransactionUploader.fromSerialized(this.api, upload, data2);
      }
      return uploader;
    }
    /**
     * Async generator version of uploader
     *
     * Usage example:
     *
     * ```
     * for await (const uploader of arweave.transactions.upload(tx)) {
     *  console.log(`${uploader.pctComplete}%`);
     * }
     * ```
     *
     * @param upload a Transaction object, a previously save uploader, or a transaction id.
     * @param data the data of the transaction. Required when resuming an upload.
     */
    upload(upload, data2) {
      return __asyncGenerator(this, arguments, function* upload_1() {
        const uploader = yield __await(this.getUploader(upload, data2));
        while (!uploader.isComplete) {
          yield __await(uploader.uploadChunk());
          yield yield __await(uploader);
        }
        return yield __await(uploader);
      });
    }
  }
  transactions.default = Transactions;
  return transactions;
}
var wallets = {};
var __createBinding$2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding$2(result, mod, k);
  }
  __setModuleDefault$2(result, mod);
  return result;
};
Object.defineProperty(wallets, "__esModule", { value: true });
const ArweaveUtils$2 = __importStar$2(utils$2);
class Wallets {
  constructor(api2, crypto2) {
    this.api = api2;
    this.crypto = crypto2;
  }
  /**
   * Get the wallet balance for the given address.
   *
   * @param {string} address - The arweave address to get the balance for.
   *
   * @returns {Promise<string>} - Promise which resolves with a winston string balance.
   */
  getBalance(address) {
    return this.api.get(`wallet/${address}/balance`, {
      transformResponse: [
        /**
         * We need to specify a response transformer to override
         * the default JSON.parse behaviour, as this causes
         * balances to be converted to a number and we want to
         * return it as a winston string.
         * @param data
         */
        function(data2) {
          return data2;
        }
      ]
    }).then((response) => {
      return response.data;
    });
  }
  /**
   * Get the last transaction ID for the given wallet address.
   *
   * @param {string} address - The arweave address to get the transaction for.
   *
   * @returns {Promise<string>} - Promise which resolves with a transaction ID.
   */
  getLastTransactionID(address) {
    return this.api.get(`wallet/${address}/last_tx`).then((response) => {
      return response.data;
    });
  }
  generate() {
    return this.crypto.generateJWK();
  }
  async jwkToAddress(jwk) {
    if (!jwk || jwk === "use_wallet") {
      return this.getAddress();
    } else {
      return this.getAddress(jwk);
    }
  }
  async getAddress(jwk) {
    if (!jwk || jwk === "use_wallet") {
      try {
        await arweaveWallet.connect(["ACCESS_ADDRESS"]);
      } catch (_a) {
      }
      return arweaveWallet.getActiveAddress();
    } else {
      return this.ownerToAddress(jwk.n);
    }
  }
  async ownerToAddress(owner) {
    return ArweaveUtils$2.bufferTob64Url(await this.crypto.hash(ArweaveUtils$2.b64UrlToBuffer(owner)));
  }
}
wallets.default = Wallets;
var silo = {};
var __createBinding$1 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$1 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$1 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding$1(result, mod, k);
  }
  __setModuleDefault$1(result, mod);
  return result;
};
Object.defineProperty(silo, "__esModule", { value: true });
silo.SiloResource = void 0;
const ArweaveUtils$1 = __importStar$1(utils$2);
class Silo {
  constructor(api2, crypto2, transactions2) {
    this.api = api2;
    this.crypto = crypto2;
    this.transactions = transactions2;
  }
  async get(siloURI) {
    if (!siloURI) {
      throw new Error(`No Silo URI specified`);
    }
    const resource = await this.parseUri(siloURI);
    const ids = await this.transactions.search("Silo-Name", resource.getAccessKey());
    if (ids.length == 0) {
      throw new Error(`No data could be found for the Silo URI: ${siloURI}`);
    }
    const transaction2 = await this.transactions.get(ids[0]);
    if (!transaction2) {
      throw new Error(`No data could be found for the Silo URI: ${siloURI}`);
    }
    const encrypted = transaction2.get("data", { decode: true, string: false });
    return this.crypto.decrypt(encrypted, resource.getEncryptionKey());
  }
  async readTransactionData(transaction2, siloURI) {
    if (!siloURI) {
      throw new Error(`No Silo URI specified`);
    }
    const resource = await this.parseUri(siloURI);
    const encrypted = transaction2.get("data", { decode: true, string: false });
    return this.crypto.decrypt(encrypted, resource.getEncryptionKey());
  }
  async parseUri(siloURI) {
    const parsed = siloURI.match(/^([a-z0-9-_]+)\.([0-9]+)/i);
    if (!parsed) {
      throw new Error(`Invalid Silo name, must be a name in the format of [a-z0-9]+.[0-9]+, e.g. 'bubble.7'`);
    }
    const siloName = parsed[1];
    const hashIterations = Math.pow(2, parseInt(parsed[2]));
    const digest = await this.hash(ArweaveUtils$1.stringToBuffer(siloName), hashIterations);
    const accessKey = ArweaveUtils$1.bufferTob64(digest.slice(0, 15));
    const encryptionkey = await this.hash(digest.slice(16, 31), 1);
    return new SiloResource(siloURI, accessKey, encryptionkey);
  }
  async hash(input, iterations) {
    let digest = await this.crypto.hash(input);
    for (let count = 0; count < iterations - 1; count++) {
      digest = await this.crypto.hash(digest);
    }
    return digest;
  }
}
silo.default = Silo;
class SiloResource {
  constructor(uri, accessKey, encryptionKey) {
    this.uri = uri;
    this.accessKey = accessKey;
    this.encryptionKey = encryptionKey;
  }
  getUri() {
    return this.uri;
  }
  getAccessKey() {
    return this.accessKey;
  }
  getEncryptionKey() {
    return this.encryptionKey;
  }
}
silo.SiloResource = SiloResource;
var chunks = {};
var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(chunks, "__esModule", { value: true });
const error_1$1 = error;
const ArweaveUtils = __importStar(utils$2);
class Chunks {
  constructor(api2) {
    this.api = api2;
  }
  async getTransactionOffset(id) {
    const resp = await this.api.get(`tx/${id}/offset`);
    if (resp.status === 200) {
      return resp.data;
    }
    throw new Error(`Unable to get transaction offset: ${(0, error_1$1.getError)(resp)}`);
  }
  async getChunk(offset) {
    const resp = await this.api.get(`chunk/${offset}`);
    if (resp.status === 200) {
      return resp.data;
    }
    throw new Error(`Unable to get chunk: ${(0, error_1$1.getError)(resp)}`);
  }
  async getChunkData(offset) {
    const chunk = await this.getChunk(offset);
    const buf = ArweaveUtils.b64UrlToBuffer(chunk.chunk);
    return buf;
  }
  firstChunkOffset(offsetResponse) {
    return parseInt(offsetResponse.offset) - parseInt(offsetResponse.size) + 1;
  }
  async downloadChunkedData(id) {
    const offsetResponse = await this.getTransactionOffset(id);
    const size = parseInt(offsetResponse.size);
    const endOffset = parseInt(offsetResponse.offset);
    const startOffset = endOffset - size + 1;
    const data2 = new Uint8Array(size);
    let byte = 0;
    while (byte < size) {
      if (this.api.config.logging) {
        console.log(`[chunk] ${byte}/${size}`);
      }
      let chunkData;
      try {
        chunkData = await this.getChunkData(startOffset + byte);
      } catch (error2) {
        console.error(`[chunk] Failed to fetch chunk at offset ${startOffset + byte}`);
        console.error(`[chunk] This could indicate that the chunk wasn't uploaded or hasn't yet seeded properly to a particular gateway/node`);
      }
      if (chunkData) {
        data2.set(chunkData, byte);
        byte += chunkData.length;
      } else {
        throw new Error(`Couldn't complete data download at ${byte}/${size}`);
      }
    }
    return data2;
  }
}
chunks.default = Chunks;
var blocks = {};
var __importDefault$2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(blocks, "__esModule", { value: true });
const error_1 = __importDefault$2(error);
class Blocks {
  constructor(api2, network2) {
    this.api = api2;
    this.network = network2;
  }
  /**
   * Gets a block by its "indep_hash"
   */
  async get(indepHash) {
    const response = await this.api.get(`${Blocks.ENDPOINT}${indepHash}`);
    if (response.status === 200) {
      return response.data;
    } else {
      if (response.status === 404) {
        throw new error_1.default(
          "BLOCK_NOT_FOUND"
          /* ArweaveErrorType.BLOCK_NOT_FOUND */
        );
      } else {
        throw new Error(`Error while loading block data: ${response}`);
      }
    }
  }
  /**
   * Gets current block data (ie. block with indep_hash = Network.getInfo().current)
   */
  async getCurrent() {
    const { current } = await this.network.getInfo();
    return await this.get(current);
  }
}
blocks.default = Blocks;
Blocks.ENDPOINT = "block/hash/";
var hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon)
    return common;
  hasRequiredCommon = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(common, "__esModule", { value: true });
  const ar_1 = __importDefault2(ar);
  const api_1 = __importDefault2(api);
  const node_driver_1 = __importDefault2(nodeDriver);
  const network_1 = __importDefault2(network);
  const transactions_1 = __importDefault2(requireTransactions());
  const wallets_1 = __importDefault2(wallets);
  const transaction_1 = __importDefault2(requireTransaction());
  const ArweaveUtils2 = __importStar2(utils$2);
  const silo_1 = __importDefault2(silo);
  const chunks_1 = __importDefault2(chunks);
  const blocks_1 = __importDefault2(blocks);
  class Arweave {
    constructor(apiConfig) {
      this.api = new api_1.default(apiConfig);
      this.wallets = new wallets_1.default(this.api, Arweave.crypto);
      this.chunks = new chunks_1.default(this.api);
      this.transactions = new transactions_1.default(this.api, Arweave.crypto, this.chunks);
      this.silo = new silo_1.default(this.api, this.crypto, this.transactions);
      this.network = new network_1.default(this.api);
      this.blocks = new blocks_1.default(this.api, this.network);
      this.ar = new ar_1.default();
    }
    /** @deprecated */
    get crypto() {
      return Arweave.crypto;
    }
    /** @deprecated */
    get utils() {
      return Arweave.utils;
    }
    getConfig() {
      return {
        api: this.api.getConfig(),
        crypto: null
      };
    }
    async createTransaction(attributes, jwk) {
      const transaction2 = {};
      Object.assign(transaction2, attributes);
      if (!attributes.data && !(attributes.target && attributes.quantity)) {
        throw new Error(`A new Arweave transaction must have a 'data' value, or 'target' and 'quantity' values.`);
      }
      if (attributes.owner == void 0) {
        if (jwk && jwk !== "use_wallet") {
          transaction2.owner = jwk.n;
        }
      }
      if (attributes.last_tx == void 0) {
        transaction2.last_tx = await this.transactions.getTransactionAnchor();
      }
      if (typeof attributes.data === "string") {
        attributes.data = ArweaveUtils2.stringToBuffer(attributes.data);
      }
      if (attributes.data instanceof ArrayBuffer) {
        attributes.data = new Uint8Array(attributes.data);
      }
      if (attributes.data && !(attributes.data instanceof Uint8Array)) {
        throw new Error("Expected data to be a string, Uint8Array or ArrayBuffer");
      }
      if (attributes.reward == void 0) {
        const length = attributes.data ? attributes.data.byteLength : 0;
        transaction2.reward = await this.transactions.getPrice(length, transaction2.target);
      }
      transaction2.data_root = "";
      transaction2.data_size = attributes.data ? attributes.data.byteLength.toString() : "0";
      transaction2.data = attributes.data || new Uint8Array(0);
      const createdTransaction = new transaction_1.default(transaction2);
      await createdTransaction.getSignatureData();
      return createdTransaction;
    }
    async createSiloTransaction(attributes, jwk, siloUri) {
      const transaction2 = {};
      Object.assign(transaction2, attributes);
      if (!attributes.data) {
        throw new Error(`Silo transactions must have a 'data' value`);
      }
      if (!siloUri) {
        throw new Error(`No Silo URI specified.`);
      }
      if (attributes.target || attributes.quantity) {
        throw new Error(`Silo transactions can only be used for storing data, sending AR to other wallets isn't supported.`);
      }
      if (attributes.owner == void 0) {
        if (!jwk || !jwk.n) {
          throw new Error(`A new Arweave transaction must either have an 'owner' attribute, or you must provide the jwk parameter.`);
        }
        transaction2.owner = jwk.n;
      }
      if (attributes.last_tx == void 0) {
        transaction2.last_tx = await this.transactions.getTransactionAnchor();
      }
      const siloResource = await this.silo.parseUri(siloUri);
      if (typeof attributes.data == "string") {
        const encrypted = await this.crypto.encrypt(ArweaveUtils2.stringToBuffer(attributes.data), siloResource.getEncryptionKey());
        transaction2.reward = await this.transactions.getPrice(encrypted.byteLength);
        transaction2.data = ArweaveUtils2.bufferTob64Url(encrypted);
      }
      if (attributes.data instanceof Uint8Array) {
        const encrypted = await this.crypto.encrypt(attributes.data, siloResource.getEncryptionKey());
        transaction2.reward = await this.transactions.getPrice(encrypted.byteLength);
        transaction2.data = ArweaveUtils2.bufferTob64Url(encrypted);
      }
      const siloTransaction = new transaction_1.default(transaction2);
      siloTransaction.addTag("Silo-Name", siloResource.getAccessKey());
      siloTransaction.addTag("Silo-Version", `0.1.0`);
      return siloTransaction;
    }
    arql(query) {
      return this.api.post("/arql", query).then((response) => response.data || []);
    }
  }
  common.default = Arweave;
  Arweave.crypto = new node_driver_1.default();
  Arweave.utils = ArweaveUtils2;
  return common;
}
var hasRequiredDeepHash;
function requireDeepHash() {
  if (hasRequiredDeepHash)
    return deepHash;
  hasRequiredDeepHash = 1;
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(deepHash, "__esModule", { value: true });
  const common_1 = __importDefault2(requireCommon());
  async function deepHash$12(data2) {
    if (Array.isArray(data2)) {
      const tag2 = common_1.default.utils.concatBuffers([
        common_1.default.utils.stringToBuffer("list"),
        common_1.default.utils.stringToBuffer(data2.length.toString())
      ]);
      return await deepHashChunks(data2, await common_1.default.crypto.hash(tag2, "SHA-384"));
    }
    const tag = common_1.default.utils.concatBuffers([
      common_1.default.utils.stringToBuffer("blob"),
      common_1.default.utils.stringToBuffer(data2.byteLength.toString())
    ]);
    const taggedHash = common_1.default.utils.concatBuffers([
      await common_1.default.crypto.hash(tag, "SHA-384"),
      await common_1.default.crypto.hash(data2, "SHA-384")
    ]);
    return await common_1.default.crypto.hash(taggedHash, "SHA-384");
  }
  deepHash.default = deepHash$12;
  async function deepHashChunks(chunks2, acc) {
    if (chunks2.length < 1) {
      return acc;
    }
    const hashPair = common_1.default.utils.concatBuffers([
      acc,
      await deepHash$12(chunks2[0])
    ]);
    const newAcc = await common_1.default.crypto.hash(hashPair, "SHA-384");
    return await deepHashChunks(chunks2.slice(1), newAcc);
  }
  return deepHash;
}
var hasRequiredTransaction;
function requireTransaction() {
  if (hasRequiredTransaction)
    return transaction;
  hasRequiredTransaction = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(transaction, "__esModule", { value: true });
  transaction.Tag = void 0;
  const ArweaveUtils2 = __importStar2(utils$2);
  const deepHash_1 = __importDefault2(requireDeepHash());
  const merkle_1 = requireMerkle();
  class BaseObject {
    get(field, options) {
      if (!Object.getOwnPropertyNames(this).includes(field)) {
        throw new Error(`Field "${field}" is not a property of the Arweave Transaction class.`);
      }
      if (this[field] instanceof Uint8Array) {
        if (options && options.decode && options.string) {
          return ArweaveUtils2.bufferToString(this[field]);
        }
        if (options && options.decode && !options.string) {
          return this[field];
        }
        return ArweaveUtils2.bufferTob64Url(this[field]);
      }
      if (options && options.decode == true) {
        if (options && options.string) {
          return ArweaveUtils2.b64UrlToString(this[field]);
        }
        return ArweaveUtils2.b64UrlToBuffer(this[field]);
      }
      return this[field];
    }
  }
  class Tag extends BaseObject {
    constructor(name, value, decode2 = false) {
      super();
      this.name = name;
      this.value = value;
    }
  }
  transaction.Tag = Tag;
  class Transaction2 extends BaseObject {
    constructor(attributes = {}) {
      super();
      this.format = 2;
      this.id = "";
      this.last_tx = "";
      this.owner = "";
      this.tags = [];
      this.target = "";
      this.quantity = "0";
      this.data_size = "0";
      this.data = new Uint8Array();
      this.data_root = "";
      this.reward = "0";
      this.signature = "";
      Object.assign(this, attributes);
      if (typeof this.data === "string") {
        this.data = ArweaveUtils2.b64UrlToBuffer(this.data);
      }
      if (attributes.tags) {
        this.tags = attributes.tags.map((tag) => {
          return new Tag(tag.name, tag.value);
        });
      }
    }
    addTag(name, value) {
      this.tags.push(new Tag(ArweaveUtils2.stringToB64Url(name), ArweaveUtils2.stringToB64Url(value)));
    }
    toJSON() {
      return {
        format: this.format,
        id: this.id,
        last_tx: this.last_tx,
        owner: this.owner,
        tags: this.tags,
        target: this.target,
        quantity: this.quantity,
        data: ArweaveUtils2.bufferTob64Url(this.data),
        data_size: this.data_size,
        data_root: this.data_root,
        data_tree: this.data_tree,
        reward: this.reward,
        signature: this.signature
      };
    }
    setOwner(owner) {
      this.owner = owner;
    }
    setSignature({ id, owner, reward, tags, signature }) {
      this.id = id;
      this.owner = owner;
      if (reward)
        this.reward = reward;
      if (tags)
        this.tags = tags;
      this.signature = signature;
    }
    async prepareChunks(data2) {
      if (!this.chunks && data2.byteLength > 0) {
        this.chunks = await (0, merkle_1.generateTransactionChunks)(data2);
        this.data_root = ArweaveUtils2.bufferTob64Url(this.chunks.data_root);
      }
      if (!this.chunks && data2.byteLength === 0) {
        this.chunks = {
          chunks: [],
          data_root: new Uint8Array(),
          proofs: []
        };
        this.data_root = "";
      }
    }
    // Returns a chunk in a format suitable for posting to /chunk.
    // Similar to `prepareChunks()` this does not operate `this.data`,
    // instead using the data passed in.
    getChunk(idx, data2) {
      if (!this.chunks) {
        throw new Error(`Chunks have not been prepared`);
      }
      const proof = this.chunks.proofs[idx];
      const chunk = this.chunks.chunks[idx];
      return {
        data_root: this.data_root,
        data_size: this.data_size,
        data_path: ArweaveUtils2.bufferTob64Url(proof.proof),
        offset: proof.offset.toString(),
        chunk: ArweaveUtils2.bufferTob64Url(data2.slice(chunk.minByteRange, chunk.maxByteRange))
      };
    }
    async getSignatureData() {
      switch (this.format) {
        case 1:
          let tags = this.tags.reduce((accumulator, tag) => {
            return ArweaveUtils2.concatBuffers([
              accumulator,
              tag.get("name", { decode: true, string: false }),
              tag.get("value", { decode: true, string: false })
            ]);
          }, new Uint8Array());
          return ArweaveUtils2.concatBuffers([
            this.get("owner", { decode: true, string: false }),
            this.get("target", { decode: true, string: false }),
            this.get("data", { decode: true, string: false }),
            ArweaveUtils2.stringToBuffer(this.quantity),
            ArweaveUtils2.stringToBuffer(this.reward),
            this.get("last_tx", { decode: true, string: false }),
            tags
          ]);
        case 2:
          if (!this.data_root) {
            await this.prepareChunks(this.data);
          }
          const tagList = this.tags.map((tag) => [
            tag.get("name", { decode: true, string: false }),
            tag.get("value", { decode: true, string: false })
          ]);
          return await (0, deepHash_1.default)([
            ArweaveUtils2.stringToBuffer(this.format.toString()),
            this.get("owner", { decode: true, string: false }),
            this.get("target", { decode: true, string: false }),
            ArweaveUtils2.stringToBuffer(this.quantity),
            ArweaveUtils2.stringToBuffer(this.reward),
            this.get("last_tx", { decode: true, string: false }),
            tagList,
            ArweaveUtils2.stringToBuffer(this.data_size),
            this.get("data_root", { decode: true, string: false })
          ]);
        default:
          throw new Error(`Unexpected transaction format: ${this.format}`);
      }
    }
  }
  transaction.default = Transaction2;
  return transaction;
}
var npmBrowser$1 = {};
window.global = window;
commonjsGlobal.fetch = window.fetch;
npmBrowser$1.Buffer = buffer.Buffer;
var WarpFactory = {};
var CacheableExecutorFactory$1 = {};
Object.defineProperty(CacheableExecutorFactory$1, "__esModule", { value: true });
CacheableExecutorFactory$1.CacheableExecutorFactory = void 0;
const LoggerFactory_1$a = LoggerFactory$1;
class CacheableExecutorFactory {
  constructor(arweave, baseImplementation, cache) {
    this.arweave = arweave;
    this.baseImplementation = baseImplementation;
    this.cache = cache;
    this.logger = LoggerFactory_1$a.LoggerFactory.INST.create("CacheableExecutorFactory");
  }
  async create(contractDefinition, evaluationOptions, warp) {
    return await this.baseImplementation.create(contractDefinition, evaluationOptions, warp);
  }
}
CacheableExecutorFactory$1.CacheableExecutorFactory = CacheableExecutorFactory;
var Evolve$1 = {};
var errors = {};
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.SmartWeaveError = exports2.SmartWeaveErrorType = void 0;
  (function(SmartWeaveErrorType) {
    SmartWeaveErrorType["CONTRACT_NOT_FOUND"] = "CONTRACT_NOT_FOUND";
  })(exports2.SmartWeaveErrorType || (exports2.SmartWeaveErrorType = {}));
  class SmartWeaveError extends Error {
    constructor(type2, optional = {}) {
      if (optional.message) {
        super(optional.message);
      } else {
        super();
      }
      this.type = type2;
      this.otherInfo = optional;
    }
    getType() {
      return this.type;
    }
  }
  exports2.SmartWeaveError = SmartWeaveError;
})(errors);
Object.defineProperty(Evolve$1, "__esModule", { value: true });
Evolve$1.Evolve = void 0;
const LoggerFactory_1$9 = LoggerFactory$1;
const errors_1 = errors;
function isEvolveCompatible(state) {
  if (!state) {
    return false;
  }
  const settings = evalSettings(state);
  return state.evolve !== void 0 || settings.has("evolve");
}
class Evolve {
  constructor() {
    this.logger = LoggerFactory_1$9.LoggerFactory.INST.create("Evolve");
    this.modify = this.modify.bind(this);
  }
  async modify(state, executionContext) {
    const { definitionLoader, executorFactory } = executionContext.warp;
    const contractTxId = executionContext.contractDefinition.txId;
    const evolvedSrcTxId = Evolve.evolvedSrcTxId(state);
    const currentSrcTxId = executionContext.contractDefinition.srcTxId;
    if (evolvedSrcTxId) {
      if (currentSrcTxId !== evolvedSrcTxId) {
        try {
          this.logger.info("Evolving to: ", evolvedSrcTxId);
          const newContractDefinition = await definitionLoader.load(contractTxId, evolvedSrcTxId);
          const newHandler = await executorFactory.create(newContractDefinition, executionContext.evaluationOptions, executionContext.warp);
          executionContext.contractDefinition = newContractDefinition;
          executionContext.handler = newHandler;
          executionContext.handler.initState(state);
          this.logger.debug("evolved to:", {
            evolve: evolvedSrcTxId,
            newSrcTxId: executionContext.contractDefinition.srcTxId,
            currentSrcTxId,
            contract: executionContext.contractDefinition.txId
          });
          return executionContext;
        } catch (e) {
          if (e.name === "ContractError" && e.subtype === "unsafeClientSkip") {
            throw e;
          } else {
            throw new errors_1.SmartWeaveError(errors_1.SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
              message: `Error while evolving ${contractTxId} from ${currentSrcTxId} to ${evolvedSrcTxId}: ${e}`,
              requestedTxId: contractTxId
            });
          }
        }
      }
    }
    return executionContext;
  }
  static evolvedSrcTxId(state) {
    if (!isEvolveCompatible(state)) {
      return void 0;
    }
    const settings = evalSettings(state);
    const evolve = state.evolve || settings.get("evolve");
    let canEvolve = state.canEvolve || settings.get("canEvolve");
    if (canEvolve === void 0 || canEvolve === null) {
      canEvolve = true;
    }
    if (evolve && /[a-z0-9_-]{43}/i.test(evolve) && canEvolve) {
      return evolve;
    }
    return void 0;
  }
}
Evolve$1.Evolve = Evolve;
function evalSettings(state) {
  let settings = /* @__PURE__ */ new Map();
  if (state.settings) {
    if (isIterable(state.settings)) {
      settings = new Map(state.settings);
    } else if (isObject(state.settings)) {
      settings = new Map(Object.entries(state.settings));
    }
  }
  return settings;
}
function isIterable(obj) {
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}
function isObject(obj) {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
var CacheableStateEvaluator$1 = {};
var utils$1 = {};
var cjs = {};
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  var toStringFunction = Function.prototype.toString;
  var create = Object.create;
  var toStringObject = Object.prototype.toString;
  var LegacyCache = (
    /** @class */
    function() {
      function LegacyCache2() {
        this._keys = [];
        this._values = [];
      }
      LegacyCache2.prototype.has = function(key2) {
        return !!~this._keys.indexOf(key2);
      };
      LegacyCache2.prototype.get = function(key2) {
        return this._values[this._keys.indexOf(key2)];
      };
      LegacyCache2.prototype.set = function(key2, value) {
        this._keys.push(key2);
        this._values.push(value);
      };
      return LegacyCache2;
    }()
  );
  function createCacheLegacy() {
    return new LegacyCache();
  }
  function createCacheModern() {
    return /* @__PURE__ */ new WeakMap();
  }
  var createCache = typeof WeakMap !== "undefined" ? createCacheModern : createCacheLegacy;
  function getCleanClone(prototype2) {
    if (!prototype2) {
      return create(null);
    }
    var Constructor = prototype2.constructor;
    if (Constructor === Object) {
      return prototype2 === Object.prototype ? {} : create(prototype2);
    }
    if (~toStringFunction.call(Constructor).indexOf("[native code]")) {
      try {
        return new Constructor();
      } catch (_a2) {
      }
    }
    return create(prototype2);
  }
  function getRegExpFlagsLegacy(regExp) {
    var flags = "";
    if (regExp.global) {
      flags += "g";
    }
    if (regExp.ignoreCase) {
      flags += "i";
    }
    if (regExp.multiline) {
      flags += "m";
    }
    if (regExp.unicode) {
      flags += "u";
    }
    if (regExp.sticky) {
      flags += "y";
    }
    return flags;
  }
  function getRegExpFlagsModern(regExp) {
    return regExp.flags;
  }
  var getRegExpFlags = /test/g.flags === "g" ? getRegExpFlagsModern : getRegExpFlagsLegacy;
  function getTagLegacy(value) {
    var type2 = toStringObject.call(value);
    return type2.substring(8, type2.length - 1);
  }
  function getTagModern(value) {
    return value[Symbol.toStringTag] || getTagLegacy(value);
  }
  var getTag = typeof Symbol !== "undefined" ? getTagModern : getTagLegacy;
  var defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var _a = Object.prototype, hasOwnProperty = _a.hasOwnProperty, propertyIsEnumerable = _a.propertyIsEnumerable;
  var SUPPORTS_SYMBOL = typeof getOwnPropertySymbols === "function";
  function getStrictPropertiesModern(object) {
    return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
  }
  var getStrictProperties = SUPPORTS_SYMBOL ? getStrictPropertiesModern : getOwnPropertyNames;
  function copyOwnPropertiesStrict(value, clone, state) {
    var properties = getStrictProperties(value);
    for (var index3 = 0, length_1 = properties.length, property = void 0, descriptor = void 0; index3 < length_1; ++index3) {
      property = properties[index3];
      if (property === "callee" || property === "caller") {
        continue;
      }
      descriptor = getOwnPropertyDescriptor(value, property);
      if (!descriptor) {
        clone[property] = state.copier(value[property], state);
        continue;
      }
      if (!descriptor.get && !descriptor.set) {
        descriptor.value = state.copier(descriptor.value, state);
      }
      try {
        defineProperty(clone, property, descriptor);
      } catch (error2) {
        clone[property] = descriptor.value;
      }
    }
    return clone;
  }
  function copyArrayLoose(array, state) {
    var clone = new state.Constructor();
    state.cache.set(array, clone);
    for (var index3 = 0, length_2 = array.length; index3 < length_2; ++index3) {
      clone[index3] = state.copier(array[index3], state);
    }
    return clone;
  }
  function copyArrayStrict(array, state) {
    var clone = new state.Constructor();
    state.cache.set(array, clone);
    return copyOwnPropertiesStrict(array, clone, state);
  }
  function copyArrayBuffer(arrayBuffer, _state) {
    return arrayBuffer.slice(0);
  }
  function copyBlob(blob, _state) {
    return blob.slice(0, blob.size, blob.type);
  }
  function copyDataView(dataView, state) {
    return new state.Constructor(copyArrayBuffer(dataView.buffer));
  }
  function copyDate(date, state) {
    return new state.Constructor(date.getTime());
  }
  function copyMapLoose(map, state) {
    var clone = new state.Constructor();
    state.cache.set(map, clone);
    map.forEach(function(value, key2) {
      clone.set(key2, state.copier(value, state));
    });
    return clone;
  }
  function copyMapStrict(map, state) {
    return copyOwnPropertiesStrict(map, copyMapLoose(map, state), state);
  }
  function copyObjectLooseLegacy(object, state) {
    var clone = getCleanClone(state.prototype);
    state.cache.set(object, clone);
    for (var key2 in object) {
      if (hasOwnProperty.call(object, key2)) {
        clone[key2] = state.copier(object[key2], state);
      }
    }
    return clone;
  }
  function copyObjectLooseModern(object, state) {
    var clone = getCleanClone(state.prototype);
    state.cache.set(object, clone);
    for (var key2 in object) {
      if (hasOwnProperty.call(object, key2)) {
        clone[key2] = state.copier(object[key2], state);
      }
    }
    var symbols = getOwnPropertySymbols(object);
    for (var index3 = 0, length_3 = symbols.length, symbol = void 0; index3 < length_3; ++index3) {
      symbol = symbols[index3];
      if (propertyIsEnumerable.call(object, symbol)) {
        clone[symbol] = state.copier(object[symbol], state);
      }
    }
    return clone;
  }
  var copyObjectLoose = SUPPORTS_SYMBOL ? copyObjectLooseModern : copyObjectLooseLegacy;
  function copyObjectStrict(object, state) {
    var clone = getCleanClone(state.prototype);
    state.cache.set(object, clone);
    return copyOwnPropertiesStrict(object, clone, state);
  }
  function copyPrimitiveWrapper(primitiveObject, state) {
    return new state.Constructor(primitiveObject.valueOf());
  }
  function copyRegExp(regExp, state) {
    var clone = new state.Constructor(regExp.source, getRegExpFlags(regExp));
    clone.lastIndex = regExp.lastIndex;
    return clone;
  }
  function copySelf(value, _state) {
    return value;
  }
  function copySetLoose(set, state) {
    var clone = new state.Constructor();
    state.cache.set(set, clone);
    set.forEach(function(value) {
      clone.add(state.copier(value, state));
    });
    return clone;
  }
  function copySetStrict(set, state) {
    return copyOwnPropertiesStrict(set, copySetLoose(set, state), state);
  }
  var isArray2 = Array.isArray;
  var assign = Object.assign, getPrototypeOf = Object.getPrototypeOf;
  var DEFAULT_LOOSE_OPTIONS = {
    array: copyArrayLoose,
    arrayBuffer: copyArrayBuffer,
    blob: copyBlob,
    dataView: copyDataView,
    date: copyDate,
    error: copySelf,
    map: copyMapLoose,
    object: copyObjectLoose,
    regExp: copyRegExp,
    set: copySetLoose
  };
  var DEFAULT_STRICT_OPTIONS = assign({}, DEFAULT_LOOSE_OPTIONS, {
    array: copyArrayStrict,
    map: copyMapStrict,
    object: copyObjectStrict,
    set: copySetStrict
  });
  function getTagSpecificCopiers(options) {
    return {
      Arguments: options.object,
      Array: options.array,
      ArrayBuffer: options.arrayBuffer,
      Blob: options.blob,
      Boolean: copyPrimitiveWrapper,
      DataView: options.dataView,
      Date: options.date,
      Error: options.error,
      Float32Array: options.arrayBuffer,
      Float64Array: options.arrayBuffer,
      Int8Array: options.arrayBuffer,
      Int16Array: options.arrayBuffer,
      Int32Array: options.arrayBuffer,
      Map: options.map,
      Number: copyPrimitiveWrapper,
      Object: options.object,
      Promise: copySelf,
      RegExp: options.regExp,
      Set: options.set,
      String: copyPrimitiveWrapper,
      WeakMap: copySelf,
      WeakSet: copySelf,
      Uint8Array: options.arrayBuffer,
      Uint8ClampedArray: options.arrayBuffer,
      Uint16Array: options.arrayBuffer,
      Uint32Array: options.arrayBuffer,
      Uint64Array: options.arrayBuffer
    };
  }
  function createCopier(options) {
    var normalizedOptions = assign({}, DEFAULT_LOOSE_OPTIONS, options);
    var tagSpecificCopiers = getTagSpecificCopiers(normalizedOptions);
    var array = tagSpecificCopiers.Array, object = tagSpecificCopiers.Object;
    function copier(value, state) {
      state.prototype = state.Constructor = void 0;
      if (!value || typeof value !== "object") {
        return value;
      }
      if (state.cache.has(value)) {
        return state.cache.get(value);
      }
      state.prototype = value.__proto__ || getPrototypeOf(value);
      state.Constructor = state.prototype && state.prototype.constructor;
      if (!state.Constructor || state.Constructor === Object) {
        return object(value, state);
      }
      if (isArray2(value)) {
        return array(value, state);
      }
      var tagSpecificCopier = tagSpecificCopiers[getTag(value)];
      if (tagSpecificCopier) {
        return tagSpecificCopier(value, state);
      }
      return typeof value.then === "function" ? value : object(value, state);
    }
    return function copy(value) {
      return copier(value, {
        Constructor: void 0,
        cache: createCache(),
        copier,
        prototype: void 0
      });
    };
  }
  function createStrictCopier(options) {
    return createCopier(assign({}, DEFAULT_STRICT_OPTIONS, options));
  }
  var copyStrict = createStrictCopier({});
  var index2 = createCopier({});
  exports2.copyStrict = copyStrict;
  exports2.createCopier = createCopier;
  exports2.createStrictCopier = createStrictCopier;
  exports2["default"] = index2;
})(cjs);
(function(exports2) {
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.isBrowser = exports2.isomorphicRandomUUID = exports2.bufToBn = exports2.indent = exports2.stripTrailingSlash = exports2.timeout = exports2.descS = exports2.desc = exports2.ascS = exports2.asc = exports2.mapReviver = exports2.mapReplacer = exports2.deepCopy = exports2.sleep = void 0;
  const fast_copy_1 = __importDefault2(cjs);
  const crypto_1 = require$$1;
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  exports2.sleep = sleep;
  const deepCopy = (input) => {
    return (0, fast_copy_1.default)(input);
  };
  exports2.deepCopy = deepCopy;
  const mapReplacer = (key2, value) => {
    if (value instanceof Map) {
      return {
        dataType: "Map",
        value: Array.from(value.entries())
      };
    } else {
      return value;
    }
  };
  exports2.mapReplacer = mapReplacer;
  const mapReviver = (key2, value) => {
    if (typeof value === "object" && value !== null) {
      if (value.dataType === "Map") {
        return new Map(value.value);
      }
    }
    return value;
  };
  exports2.mapReviver = mapReviver;
  const asc = (a, b) => a - b;
  exports2.asc = asc;
  const ascS = (a, b) => +a - +b;
  exports2.ascS = ascS;
  const desc = (a, b) => b - a;
  exports2.desc = desc;
  const descS = (a, b) => +b - +a;
  exports2.descS = descS;
  function timeout(s) {
    let timeoutId = null;
    const timeoutPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        reject("timeout");
      }, s * 1e3);
    });
    return {
      timeoutId,
      timeoutPromise
    };
  }
  exports2.timeout = timeout;
  function stripTrailingSlash(str) {
    return str.endsWith("/") ? str.slice(0, -1) : str;
  }
  exports2.stripTrailingSlash = stripTrailingSlash;
  function indent(callDepth) {
    return `[d:${callDepth}]`.padEnd(callDepth * 2, "-").concat("> ");
  }
  exports2.indent = indent;
  function bufToBn(buf) {
    const hex = [];
    const u8 = Uint8Array.from(buf);
    u8.forEach(function(i) {
      let h = i.toString(16);
      if (h.length % 2) {
        h = "0" + h;
      }
      hex.push(h);
    });
    return BigInt("0x" + hex.join(""));
  }
  exports2.bufToBn = bufToBn;
  function isomorphicRandomUUID() {
    if ((0, exports2.isBrowser)() && self.crypto) {
      return self.crypto.randomUUID();
    } else {
      return (0, crypto_1.randomUUID)();
    }
  }
  exports2.isomorphicRandomUUID = isomorphicRandomUUID;
  exports2.isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
})(utils$1);
var DefaultStateEvaluator$1 = {};
var sha256Exports = {};
var sha256$1 = {
  get exports() {
    return sha256Exports;
  },
  set exports(v) {
    sha256Exports = v;
  }
};
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function(module) {
  (function() {
    var ERROR = "input is invalid type";
    var WINDOW = typeof window === "object";
    var root = WINDOW ? window : {};
    if (root.JS_SHA256_NO_WINDOW) {
      WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === "object";
    var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
    if (NODE_JS) {
      root = commonjsGlobal;
    } else if (WEB_WORKER) {
      root = self;
    }
    var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && true && module.exports;
    var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
    var HEX_CHARS = "0123456789abcdef".split("");
    var EXTRA = [-2147483648, 8388608, 32768, 128];
    var SHIFT = [24, 16, 8, 0];
    var K = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ];
    var OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"];
    var blocks = [];
    if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
      Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
    }
    if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
      ArrayBuffer.isView = function(obj) {
        return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
      };
    }
    var createOutputMethod = function(outputType, is2242) {
      return function(message) {
        return new Sha256(is2242, true).update(message)[outputType]();
      };
    };
    var createMethod = function(is2242) {
      var method2 = createOutputMethod("hex", is2242);
      if (NODE_JS) {
        method2 = nodeWrap(method2, is2242);
      }
      method2.create = function() {
        return new Sha256(is2242);
      };
      method2.update = function(message) {
        return method2.create().update(message);
      };
      for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
        var type2 = OUTPUT_TYPES[i];
        method2[type2] = createOutputMethod(type2, is2242);
      }
      return method2;
    };
    var nodeWrap = function(method, is224) {
      var crypto = eval("require('crypto')");
      var Buffer = eval("require('buffer').Buffer");
      var algorithm = is224 ? "sha224" : "sha256";
      var nodeMethod = function(message) {
        if (typeof message === "string") {
          return crypto.createHash(algorithm).update(message, "utf8").digest("hex");
        } else {
          if (message === null || message === void 0) {
            throw new Error(ERROR);
          } else if (message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          }
        }
        if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer) {
          return crypto.createHash(algorithm).update(new Buffer(message)).digest("hex");
        } else {
          return method(message);
        }
      };
      return nodeMethod;
    };
    var createHmacOutputMethod = function(outputType, is2242) {
      return function(key2, message) {
        return new HmacSha256(key2, is2242, true).update(message)[outputType]();
      };
    };
    var createHmacMethod = function(is2242) {
      var method2 = createHmacOutputMethod("hex", is2242);
      method2.create = function(key2) {
        return new HmacSha256(key2, is2242);
      };
      method2.update = function(key2, message) {
        return method2.create(key2).update(message);
      };
      for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
        var type2 = OUTPUT_TYPES[i];
        method2[type2] = createHmacOutputMethod(type2, is2242);
      }
      return method2;
    };
    function Sha256(is2242, sharedMemory) {
      if (sharedMemory) {
        blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        this.blocks = blocks;
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      if (is2242) {
        this.h0 = 3238371032;
        this.h1 = 914150663;
        this.h2 = 812702999;
        this.h3 = 4144912697;
        this.h4 = 4290775857;
        this.h5 = 1750603025;
        this.h6 = 1694076839;
        this.h7 = 3204075428;
      } else {
        this.h0 = 1779033703;
        this.h1 = 3144134277;
        this.h2 = 1013904242;
        this.h3 = 2773480762;
        this.h4 = 1359893119;
        this.h5 = 2600822924;
        this.h6 = 528734635;
        this.h7 = 1541459225;
      }
      this.block = this.start = this.bytes = this.hBytes = 0;
      this.finalized = this.hashed = false;
      this.first = true;
      this.is224 = is2242;
    }
    Sha256.prototype.update = function(message) {
      if (this.finalized) {
        return;
      }
      var notString, type2 = typeof message;
      if (type2 !== "string") {
        if (type2 === "object") {
          if (message === null) {
            throw new Error(ERROR);
          } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (!Array.isArray(message)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
              throw new Error(ERROR);
            }
          }
        } else {
          throw new Error(ERROR);
        }
        notString = true;
      }
      var code2, index2 = 0, i, length = message.length, blocks2 = this.blocks;
      while (index2 < length) {
        if (this.hashed) {
          this.hashed = false;
          blocks2[0] = this.block;
          blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
        }
        if (notString) {
          for (i = this.start; index2 < length && i < 64; ++index2) {
            blocks2[i >> 2] |= message[index2] << SHIFT[i++ & 3];
          }
        } else {
          for (i = this.start; index2 < length && i < 64; ++index2) {
            code2 = message.charCodeAt(index2);
            if (code2 < 128) {
              blocks2[i >> 2] |= code2 << SHIFT[i++ & 3];
            } else if (code2 < 2048) {
              blocks2[i >> 2] |= (192 | code2 >> 6) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code2 & 63) << SHIFT[i++ & 3];
            } else if (code2 < 55296 || code2 >= 57344) {
              blocks2[i >> 2] |= (224 | code2 >> 12) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code2 >> 6 & 63) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code2 & 63) << SHIFT[i++ & 3];
            } else {
              code2 = 65536 + ((code2 & 1023) << 10 | message.charCodeAt(++index2) & 1023);
              blocks2[i >> 2] |= (240 | code2 >> 18) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code2 >> 12 & 63) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code2 >> 6 & 63) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code2 & 63) << SHIFT[i++ & 3];
            }
          }
        }
        this.lastByteIndex = i;
        this.bytes += i - this.start;
        if (i >= 64) {
          this.block = blocks2[16];
          this.start = i - 64;
          this.hash();
          this.hashed = true;
        } else {
          this.start = i;
        }
      }
      if (this.bytes > 4294967295) {
        this.hBytes += this.bytes / 4294967296 << 0;
        this.bytes = this.bytes % 4294967296;
      }
      return this;
    };
    Sha256.prototype.finalize = function() {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks2 = this.blocks, i = this.lastByteIndex;
      blocks2[16] = this.block;
      blocks2[i >> 2] |= EXTRA[i & 3];
      this.block = blocks2[16];
      if (i >= 56) {
        if (!this.hashed) {
          this.hash();
        }
        blocks2[0] = this.block;
        blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
      }
      blocks2[14] = this.hBytes << 3 | this.bytes >>> 29;
      blocks2[15] = this.bytes << 3;
      this.hash();
    };
    Sha256.prototype.hash = function() {
      var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6, h = this.h7, blocks2 = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;
      for (j = 16; j < 64; ++j) {
        t1 = blocks2[j - 15];
        s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
        t1 = blocks2[j - 2];
        s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
        blocks2[j] = blocks2[j - 16] + s0 + blocks2[j - 7] + s1 << 0;
      }
      bc = b & c;
      for (j = 0; j < 64; j += 4) {
        if (this.first) {
          if (this.is224) {
            ab = 300032;
            t1 = blocks2[0] - 1413257819;
            h = t1 - 150054599 << 0;
            d = t1 + 24177077 << 0;
          } else {
            ab = 704751109;
            t1 = blocks2[0] - 210244248;
            h = t1 - 1521486534 << 0;
            d = t1 + 143694565 << 0;
          }
          this.first = false;
        } else {
          s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
          s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
          ab = a & b;
          maj = ab ^ a & c ^ bc;
          ch = e & f ^ ~e & g;
          t1 = h + s1 + ch + K[j] + blocks2[j];
          t2 = s0 + maj;
          h = d + t1 << 0;
          d = t1 + t2 << 0;
        }
        s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
        s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
        da = d & a;
        maj = da ^ d & b ^ ab;
        ch = h & e ^ ~h & f;
        t1 = g + s1 + ch + K[j + 1] + blocks2[j + 1];
        t2 = s0 + maj;
        g = c + t1 << 0;
        c = t1 + t2 << 0;
        s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
        s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
        cd = c & d;
        maj = cd ^ c & a ^ da;
        ch = g & h ^ ~g & e;
        t1 = f + s1 + ch + K[j + 2] + blocks2[j + 2];
        t2 = s0 + maj;
        f = b + t1 << 0;
        b = t1 + t2 << 0;
        s0 = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
        s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
        bc = b & c;
        maj = bc ^ b & d ^ cd;
        ch = f & g ^ ~f & h;
        t1 = e + s1 + ch + K[j + 3] + blocks2[j + 3];
        t2 = s0 + maj;
        e = a + t1 << 0;
        a = t1 + t2 << 0;
      }
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
      this.h4 = this.h4 + e << 0;
      this.h5 = this.h5 + f << 0;
      this.h6 = this.h6 + g << 0;
      this.h7 = this.h7 + h << 0;
    };
    Sha256.prototype.hex = function() {
      this.finalize();
      var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
      var hex = HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >> 28 & 15] + HEX_CHARS[h4 >> 24 & 15] + HEX_CHARS[h4 >> 20 & 15] + HEX_CHARS[h4 >> 16 & 15] + HEX_CHARS[h4 >> 12 & 15] + HEX_CHARS[h4 >> 8 & 15] + HEX_CHARS[h4 >> 4 & 15] + HEX_CHARS[h4 & 15] + HEX_CHARS[h5 >> 28 & 15] + HEX_CHARS[h5 >> 24 & 15] + HEX_CHARS[h5 >> 20 & 15] + HEX_CHARS[h5 >> 16 & 15] + HEX_CHARS[h5 >> 12 & 15] + HEX_CHARS[h5 >> 8 & 15] + HEX_CHARS[h5 >> 4 & 15] + HEX_CHARS[h5 & 15] + HEX_CHARS[h6 >> 28 & 15] + HEX_CHARS[h6 >> 24 & 15] + HEX_CHARS[h6 >> 20 & 15] + HEX_CHARS[h6 >> 16 & 15] + HEX_CHARS[h6 >> 12 & 15] + HEX_CHARS[h6 >> 8 & 15] + HEX_CHARS[h6 >> 4 & 15] + HEX_CHARS[h6 & 15];
      if (!this.is224) {
        hex += HEX_CHARS[h7 >> 28 & 15] + HEX_CHARS[h7 >> 24 & 15] + HEX_CHARS[h7 >> 20 & 15] + HEX_CHARS[h7 >> 16 & 15] + HEX_CHARS[h7 >> 12 & 15] + HEX_CHARS[h7 >> 8 & 15] + HEX_CHARS[h7 >> 4 & 15] + HEX_CHARS[h7 & 15];
      }
      return hex;
    };
    Sha256.prototype.toString = Sha256.prototype.hex;
    Sha256.prototype.digest = function() {
      this.finalize();
      var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
      var arr = [
        h0 >> 24 & 255,
        h0 >> 16 & 255,
        h0 >> 8 & 255,
        h0 & 255,
        h1 >> 24 & 255,
        h1 >> 16 & 255,
        h1 >> 8 & 255,
        h1 & 255,
        h2 >> 24 & 255,
        h2 >> 16 & 255,
        h2 >> 8 & 255,
        h2 & 255,
        h3 >> 24 & 255,
        h3 >> 16 & 255,
        h3 >> 8 & 255,
        h3 & 255,
        h4 >> 24 & 255,
        h4 >> 16 & 255,
        h4 >> 8 & 255,
        h4 & 255,
        h5 >> 24 & 255,
        h5 >> 16 & 255,
        h5 >> 8 & 255,
        h5 & 255,
        h6 >> 24 & 255,
        h6 >> 16 & 255,
        h6 >> 8 & 255,
        h6 & 255
      ];
      if (!this.is224) {
        arr.push(h7 >> 24 & 255, h7 >> 16 & 255, h7 >> 8 & 255, h7 & 255);
      }
      return arr;
    };
    Sha256.prototype.array = Sha256.prototype.digest;
    Sha256.prototype.arrayBuffer = function() {
      this.finalize();
      var buffer2 = new ArrayBuffer(this.is224 ? 28 : 32);
      var dataView = new DataView(buffer2);
      dataView.setUint32(0, this.h0);
      dataView.setUint32(4, this.h1);
      dataView.setUint32(8, this.h2);
      dataView.setUint32(12, this.h3);
      dataView.setUint32(16, this.h4);
      dataView.setUint32(20, this.h5);
      dataView.setUint32(24, this.h6);
      if (!this.is224) {
        dataView.setUint32(28, this.h7);
      }
      return buffer2;
    };
    function HmacSha256(key2, is2242, sharedMemory) {
      var i, type2 = typeof key2;
      if (type2 === "string") {
        var bytes = [], length = key2.length, index2 = 0, code2;
        for (i = 0; i < length; ++i) {
          code2 = key2.charCodeAt(i);
          if (code2 < 128) {
            bytes[index2++] = code2;
          } else if (code2 < 2048) {
            bytes[index2++] = 192 | code2 >> 6;
            bytes[index2++] = 128 | code2 & 63;
          } else if (code2 < 55296 || code2 >= 57344) {
            bytes[index2++] = 224 | code2 >> 12;
            bytes[index2++] = 128 | code2 >> 6 & 63;
            bytes[index2++] = 128 | code2 & 63;
          } else {
            code2 = 65536 + ((code2 & 1023) << 10 | key2.charCodeAt(++i) & 1023);
            bytes[index2++] = 240 | code2 >> 18;
            bytes[index2++] = 128 | code2 >> 12 & 63;
            bytes[index2++] = 128 | code2 >> 6 & 63;
            bytes[index2++] = 128 | code2 & 63;
          }
        }
        key2 = bytes;
      } else {
        if (type2 === "object") {
          if (key2 === null) {
            throw new Error(ERROR);
          } else if (ARRAY_BUFFER && key2.constructor === ArrayBuffer) {
            key2 = new Uint8Array(key2);
          } else if (!Array.isArray(key2)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(key2)) {
              throw new Error(ERROR);
            }
          }
        } else {
          throw new Error(ERROR);
        }
      }
      if (key2.length > 64) {
        key2 = new Sha256(is2242, true).update(key2).array();
      }
      var oKeyPad = [], iKeyPad = [];
      for (i = 0; i < 64; ++i) {
        var b = key2[i] || 0;
        oKeyPad[i] = 92 ^ b;
        iKeyPad[i] = 54 ^ b;
      }
      Sha256.call(this, is2242, sharedMemory);
      this.update(iKeyPad);
      this.oKeyPad = oKeyPad;
      this.inner = true;
      this.sharedMemory = sharedMemory;
    }
    HmacSha256.prototype = new Sha256();
    HmacSha256.prototype.finalize = function() {
      Sha256.prototype.finalize.call(this);
      if (this.inner) {
        this.inner = false;
        var innerHash = this.array();
        Sha256.call(this, this.is224, this.sharedMemory);
        this.update(this.oKeyPad);
        this.update(innerHash);
        Sha256.prototype.finalize.call(this);
      }
    };
    var exports = createMethod();
    exports.sha256 = exports;
    exports.sha224 = createMethod(true);
    exports.sha256.hmac = createHmacMethod();
    exports.sha224.hmac = createHmacMethod(true);
    if (COMMON_JS) {
      module.exports = exports;
    } else {
      root.sha256 = exports.sha256;
      root.sha224 = exports.sha224;
    }
  })();
})(sha256$1);
var sha512Exports = {};
var sha512$1 = {
  get exports() {
    return sha512Exports;
  },
  set exports(v) {
    sha512Exports = v;
  }
};
/*
 * [js-sha512]{@link https://github.com/emn178/js-sha512}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2018
 * @license MIT
 */
(function(module2) {
  (function() {
    var INPUT_ERROR = "input is invalid type";
    var FINALIZE_ERROR = "finalize already called";
    var WINDOW2 = typeof window === "object";
    var root2 = WINDOW2 ? window : {};
    if (root2.JS_SHA512_NO_WINDOW) {
      WINDOW2 = false;
    }
    var WEB_WORKER2 = !WINDOW2 && typeof self === "object";
    var NODE_JS2 = !root2.JS_SHA512_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
    if (NODE_JS2) {
      root2 = commonjsGlobal;
    } else if (WEB_WORKER2) {
      root2 = self;
    }
    var COMMON_JS2 = !root2.JS_SHA512_NO_COMMON_JS && true && module2.exports;
    var ARRAY_BUFFER2 = !root2.JS_SHA512_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
    var HEX_CHARS2 = "0123456789abcdef".split("");
    var EXTRA2 = [-2147483648, 8388608, 32768, 128];
    var SHIFT2 = [24, 16, 8, 0];
    var K2 = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    var OUTPUT_TYPES2 = ["hex", "array", "digest", "arrayBuffer"];
    var blocks2 = [];
    if (root2.JS_SHA512_NO_NODE_JS || !Array.isArray) {
      Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
    }
    if (ARRAY_BUFFER2 && (root2.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
      ArrayBuffer.isView = function(obj) {
        return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
      };
    }
    var createOutputMethod2 = function(outputType, bits) {
      return function(message) {
        return new Sha512(bits, true).update(message)[outputType]();
      };
    };
    var createMethod2 = function(bits) {
      var method2 = createOutputMethod2("hex", bits);
      method2.create = function() {
        return new Sha512(bits);
      };
      method2.update = function(message) {
        return method2.create().update(message);
      };
      for (var i = 0; i < OUTPUT_TYPES2.length; ++i) {
        var type2 = OUTPUT_TYPES2[i];
        method2[type2] = createOutputMethod2(type2, bits);
      }
      return method2;
    };
    var createHmacOutputMethod2 = function(outputType, bits) {
      return function(key2, message) {
        return new HmacSha512(key2, bits, true).update(message)[outputType]();
      };
    };
    var createHmacMethod2 = function(bits) {
      var method2 = createHmacOutputMethod2("hex", bits);
      method2.create = function(key2) {
        return new HmacSha512(key2, bits);
      };
      method2.update = function(key2, message) {
        return method2.create(key2).update(message);
      };
      for (var i = 0; i < OUTPUT_TYPES2.length; ++i) {
        var type2 = OUTPUT_TYPES2[i];
        method2[type2] = createHmacOutputMethod2(type2, bits);
      }
      return method2;
    };
    function Sha512(bits, sharedMemory) {
      if (sharedMemory) {
        blocks2[0] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = blocks2[16] = blocks2[17] = blocks2[18] = blocks2[19] = blocks2[20] = blocks2[21] = blocks2[22] = blocks2[23] = blocks2[24] = blocks2[25] = blocks2[26] = blocks2[27] = blocks2[28] = blocks2[29] = blocks2[30] = blocks2[31] = blocks2[32] = 0;
        this.blocks = blocks2;
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      if (bits == 384) {
        this.h0h = 3418070365;
        this.h0l = 3238371032;
        this.h1h = 1654270250;
        this.h1l = 914150663;
        this.h2h = 2438529370;
        this.h2l = 812702999;
        this.h3h = 355462360;
        this.h3l = 4144912697;
        this.h4h = 1731405415;
        this.h4l = 4290775857;
        this.h5h = 2394180231;
        this.h5l = 1750603025;
        this.h6h = 3675008525;
        this.h6l = 1694076839;
        this.h7h = 1203062813;
        this.h7l = 3204075428;
      } else if (bits == 256) {
        this.h0h = 573645204;
        this.h0l = 4230739756;
        this.h1h = 2673172387;
        this.h1l = 3360449730;
        this.h2h = 596883563;
        this.h2l = 1867755857;
        this.h3h = 2520282905;
        this.h3l = 1497426621;
        this.h4h = 2519219938;
        this.h4l = 2827943907;
        this.h5h = 3193839141;
        this.h5l = 1401305490;
        this.h6h = 721525244;
        this.h6l = 746961066;
        this.h7h = 246885852;
        this.h7l = 2177182882;
      } else if (bits == 224) {
        this.h0h = 2352822216;
        this.h0l = 424955298;
        this.h1h = 1944164710;
        this.h1l = 2312950998;
        this.h2h = 502970286;
        this.h2l = 855612546;
        this.h3h = 1738396948;
        this.h3l = 1479516111;
        this.h4h = 258812777;
        this.h4l = 2077511080;
        this.h5h = 2011393907;
        this.h5l = 79989058;
        this.h6h = 1067287976;
        this.h6l = 1780299464;
        this.h7h = 286451373;
        this.h7l = 2446758561;
      } else {
        this.h0h = 1779033703;
        this.h0l = 4089235720;
        this.h1h = 3144134277;
        this.h1l = 2227873595;
        this.h2h = 1013904242;
        this.h2l = 4271175723;
        this.h3h = 2773480762;
        this.h3l = 1595750129;
        this.h4h = 1359893119;
        this.h4l = 2917565137;
        this.h5h = 2600822924;
        this.h5l = 725511199;
        this.h6h = 528734635;
        this.h6l = 4215389547;
        this.h7h = 1541459225;
        this.h7l = 327033209;
      }
      this.bits = bits;
      this.block = this.start = this.bytes = this.hBytes = 0;
      this.finalized = this.hashed = false;
    }
    Sha512.prototype.update = function(message) {
      if (this.finalized) {
        throw new Error(FINALIZE_ERROR);
      }
      var notString, type2 = typeof message;
      if (type2 !== "string") {
        if (type2 === "object") {
          if (message === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER2 && message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (!Array.isArray(message)) {
            if (!ARRAY_BUFFER2 || !ArrayBuffer.isView(message)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var code2, index2 = 0, i, length = message.length, blocks3 = this.blocks;
      while (index2 < length) {
        if (this.hashed) {
          this.hashed = false;
          blocks3[0] = this.block;
          blocks3[1] = blocks3[2] = blocks3[3] = blocks3[4] = blocks3[5] = blocks3[6] = blocks3[7] = blocks3[8] = blocks3[9] = blocks3[10] = blocks3[11] = blocks3[12] = blocks3[13] = blocks3[14] = blocks3[15] = blocks3[16] = blocks3[17] = blocks3[18] = blocks3[19] = blocks3[20] = blocks3[21] = blocks3[22] = blocks3[23] = blocks3[24] = blocks3[25] = blocks3[26] = blocks3[27] = blocks3[28] = blocks3[29] = blocks3[30] = blocks3[31] = blocks3[32] = 0;
        }
        if (notString) {
          for (i = this.start; index2 < length && i < 128; ++index2) {
            blocks3[i >> 2] |= message[index2] << SHIFT2[i++ & 3];
          }
        } else {
          for (i = this.start; index2 < length && i < 128; ++index2) {
            code2 = message.charCodeAt(index2);
            if (code2 < 128) {
              blocks3[i >> 2] |= code2 << SHIFT2[i++ & 3];
            } else if (code2 < 2048) {
              blocks3[i >> 2] |= (192 | code2 >> 6) << SHIFT2[i++ & 3];
              blocks3[i >> 2] |= (128 | code2 & 63) << SHIFT2[i++ & 3];
            } else if (code2 < 55296 || code2 >= 57344) {
              blocks3[i >> 2] |= (224 | code2 >> 12) << SHIFT2[i++ & 3];
              blocks3[i >> 2] |= (128 | code2 >> 6 & 63) << SHIFT2[i++ & 3];
              blocks3[i >> 2] |= (128 | code2 & 63) << SHIFT2[i++ & 3];
            } else {
              code2 = 65536 + ((code2 & 1023) << 10 | message.charCodeAt(++index2) & 1023);
              blocks3[i >> 2] |= (240 | code2 >> 18) << SHIFT2[i++ & 3];
              blocks3[i >> 2] |= (128 | code2 >> 12 & 63) << SHIFT2[i++ & 3];
              blocks3[i >> 2] |= (128 | code2 >> 6 & 63) << SHIFT2[i++ & 3];
              blocks3[i >> 2] |= (128 | code2 & 63) << SHIFT2[i++ & 3];
            }
          }
        }
        this.lastByteIndex = i;
        this.bytes += i - this.start;
        if (i >= 128) {
          this.block = blocks3[32];
          this.start = i - 128;
          this.hash();
          this.hashed = true;
        } else {
          this.start = i;
        }
      }
      if (this.bytes > 4294967295) {
        this.hBytes += this.bytes / 4294967296 << 0;
        this.bytes = this.bytes % 4294967296;
      }
      return this;
    };
    Sha512.prototype.finalize = function() {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks3 = this.blocks, i = this.lastByteIndex;
      blocks3[32] = this.block;
      blocks3[i >> 2] |= EXTRA2[i & 3];
      this.block = blocks3[32];
      if (i >= 112) {
        if (!this.hashed) {
          this.hash();
        }
        blocks3[0] = this.block;
        blocks3[1] = blocks3[2] = blocks3[3] = blocks3[4] = blocks3[5] = blocks3[6] = blocks3[7] = blocks3[8] = blocks3[9] = blocks3[10] = blocks3[11] = blocks3[12] = blocks3[13] = blocks3[14] = blocks3[15] = blocks3[16] = blocks3[17] = blocks3[18] = blocks3[19] = blocks3[20] = blocks3[21] = blocks3[22] = blocks3[23] = blocks3[24] = blocks3[25] = blocks3[26] = blocks3[27] = blocks3[28] = blocks3[29] = blocks3[30] = blocks3[31] = blocks3[32] = 0;
      }
      blocks3[30] = this.hBytes << 3 | this.bytes >>> 29;
      blocks3[31] = this.bytes << 3;
      this.hash();
    };
    Sha512.prototype.hash = function() {
      var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l, h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l, h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l, h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l, blocks3 = this.blocks, j, s0h, s0l, s1h, s1l, c1, c2, c3, c4, abh, abl, dah, dal, cdh, cdl, bch, bcl, majh, majl, t1h, t1l, t2h, t2l, chh, chl;
      for (j = 32; j < 160; j += 2) {
        t1h = blocks3[j - 30];
        t1l = blocks3[j - 29];
        s0h = (t1h >>> 1 | t1l << 31) ^ (t1h >>> 8 | t1l << 24) ^ t1h >>> 7;
        s0l = (t1l >>> 1 | t1h << 31) ^ (t1l >>> 8 | t1h << 24) ^ (t1l >>> 7 | t1h << 25);
        t1h = blocks3[j - 4];
        t1l = blocks3[j - 3];
        s1h = (t1h >>> 19 | t1l << 13) ^ (t1l >>> 29 | t1h << 3) ^ t1h >>> 6;
        s1l = (t1l >>> 19 | t1h << 13) ^ (t1h >>> 29 | t1l << 3) ^ (t1l >>> 6 | t1h << 26);
        t1h = blocks3[j - 32];
        t1l = blocks3[j - 31];
        t2h = blocks3[j - 14];
        t2l = blocks3[j - 13];
        c1 = (t2l & 65535) + (t1l & 65535) + (s0l & 65535) + (s1l & 65535);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (s0l >>> 16) + (s1l >>> 16) + (c1 >>> 16);
        c3 = (t2h & 65535) + (t1h & 65535) + (s0h & 65535) + (s1h & 65535) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (s0h >>> 16) + (s1h >>> 16) + (c3 >>> 16);
        blocks3[j] = c4 << 16 | c3 & 65535;
        blocks3[j + 1] = c2 << 16 | c1 & 65535;
      }
      var ah = h0h, al = h0l, bh = h1h, bl = h1l, ch = h2h, cl = h2l, dh = h3h, dl = h3l, eh = h4h, el = h4l, fh = h5h, fl = h5l, gh = h6h, gl = h6l, hh = h7h, hl = h7l;
      bch = bh & ch;
      bcl = bl & cl;
      for (j = 0; j < 160; j += 8) {
        s0h = (ah >>> 28 | al << 4) ^ (al >>> 2 | ah << 30) ^ (al >>> 7 | ah << 25);
        s0l = (al >>> 28 | ah << 4) ^ (ah >>> 2 | al << 30) ^ (ah >>> 7 | al << 25);
        s1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (el >>> 9 | eh << 23);
        s1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (eh >>> 9 | el << 23);
        abh = ah & bh;
        abl = al & bl;
        majh = abh ^ ah & ch ^ bch;
        majl = abl ^ al & cl ^ bcl;
        chh = eh & fh ^ ~eh & gh;
        chl = el & fl ^ ~el & gl;
        t1h = blocks3[j];
        t1l = blocks3[j + 1];
        t2h = K2[j];
        t2l = K2[j + 1];
        c1 = (t2l & 65535) + (t1l & 65535) + (chl & 65535) + (s1l & 65535) + (hl & 65535);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (hl >>> 16) + (c1 >>> 16);
        c3 = (t2h & 65535) + (t1h & 65535) + (chh & 65535) + (s1h & 65535) + (hh & 65535) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (hh >>> 16) + (c3 >>> 16);
        t1h = c4 << 16 | c3 & 65535;
        t1l = c2 << 16 | c1 & 65535;
        c1 = (majl & 65535) + (s0l & 65535);
        c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
        c3 = (majh & 65535) + (s0h & 65535) + (c2 >>> 16);
        c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
        t2h = c4 << 16 | c3 & 65535;
        t2l = c2 << 16 | c1 & 65535;
        c1 = (dl & 65535) + (t1l & 65535);
        c2 = (dl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (dh & 65535) + (t1h & 65535) + (c2 >>> 16);
        c4 = (dh >>> 16) + (t1h >>> 16) + (c3 >>> 16);
        hh = c4 << 16 | c3 & 65535;
        hl = c2 << 16 | c1 & 65535;
        c1 = (t2l & 65535) + (t1l & 65535);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (t2h & 65535) + (t1h & 65535) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
        dh = c4 << 16 | c3 & 65535;
        dl = c2 << 16 | c1 & 65535;
        s0h = (dh >>> 28 | dl << 4) ^ (dl >>> 2 | dh << 30) ^ (dl >>> 7 | dh << 25);
        s0l = (dl >>> 28 | dh << 4) ^ (dh >>> 2 | dl << 30) ^ (dh >>> 7 | dl << 25);
        s1h = (hh >>> 14 | hl << 18) ^ (hh >>> 18 | hl << 14) ^ (hl >>> 9 | hh << 23);
        s1l = (hl >>> 14 | hh << 18) ^ (hl >>> 18 | hh << 14) ^ (hh >>> 9 | hl << 23);
        dah = dh & ah;
        dal = dl & al;
        majh = dah ^ dh & bh ^ abh;
        majl = dal ^ dl & bl ^ abl;
        chh = hh & eh ^ ~hh & fh;
        chl = hl & el ^ ~hl & fl;
        t1h = blocks3[j + 2];
        t1l = blocks3[j + 3];
        t2h = K2[j + 2];
        t2l = K2[j + 3];
        c1 = (t2l & 65535) + (t1l & 65535) + (chl & 65535) + (s1l & 65535) + (gl & 65535);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (gl >>> 16) + (c1 >>> 16);
        c3 = (t2h & 65535) + (t1h & 65535) + (chh & 65535) + (s1h & 65535) + (gh & 65535) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (gh >>> 16) + (c3 >>> 16);
        t1h = c4 << 16 | c3 & 65535;
        t1l = c2 << 16 | c1 & 65535;
        c1 = (majl & 65535) + (s0l & 65535);
        c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
        c3 = (majh & 65535) + (s0h & 65535) + (c2 >>> 16);
        c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
        t2h = c4 << 16 | c3 & 65535;
        t2l = c2 << 16 | c1 & 65535;
        c1 = (cl & 65535) + (t1l & 65535);
        c2 = (cl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (ch & 65535) + (t1h & 65535) + (c2 >>> 16);
        c4 = (ch >>> 16) + (t1h >>> 16) + (c3 >>> 16);
        gh = c4 << 16 | c3 & 65535;
        gl = c2 << 16 | c1 & 65535;
        c1 = (t2l & 65535) + (t1l & 65535);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (t2h & 65535) + (t1h & 65535) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
        ch = c4 << 16 | c3 & 65535;
        cl = c2 << 16 | c1 & 65535;
        s0h = (ch >>> 28 | cl << 4) ^ (cl >>> 2 | ch << 30) ^ (cl >>> 7 | ch << 25);
        s0l = (cl >>> 28 | ch << 4) ^ (ch >>> 2 | cl << 30) ^ (ch >>> 7 | cl << 25);
        s1h = (gh >>> 14 | gl << 18) ^ (gh >>> 18 | gl << 14) ^ (gl >>> 9 | gh << 23);
        s1l = (gl >>> 14 | gh << 18) ^ (gl >>> 18 | gh << 14) ^ (gh >>> 9 | gl << 23);
        cdh = ch & dh;
        cdl = cl & dl;
        majh = cdh ^ ch & ah ^ dah;
        majl = cdl ^ cl & al ^ dal;
        chh = gh & hh ^ ~gh & eh;
        chl = gl & hl ^ ~gl & el;
        t1h = blocks3[j + 4];
        t1l = blocks3[j + 5];
        t2h = K2[j + 4];
        t2l = K2[j + 5];
        c1 = (t2l & 65535) + (t1l & 65535) + (chl & 65535) + (s1l & 65535) + (fl & 65535);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (fl >>> 16) + (c1 >>> 16);
        c3 = (t2h & 65535) + (t1h & 65535) + (chh & 65535) + (s1h & 65535) + (fh & 65535) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (fh >>> 16) + (c3 >>> 16);
        t1h = c4 << 16 | c3 & 65535;
        t1l = c2 << 16 | c1 & 65535;
        c1 = (majl & 65535) + (s0l & 65535);
        c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
        c3 = (majh & 65535) + (s0h & 65535) + (c2 >>> 16);
        c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
        t2h = c4 << 16 | c3 & 65535;
        t2l = c2 << 16 | c1 & 65535;
        c1 = (bl & 65535) + (t1l & 65535);
        c2 = (bl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (bh & 65535) + (t1h & 65535) + (c2 >>> 16);
        c4 = (bh >>> 16) + (t1h >>> 16) + (c3 >>> 16);
        fh = c4 << 16 | c3 & 65535;
        fl = c2 << 16 | c1 & 65535;
        c1 = (t2l & 65535) + (t1l & 65535);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (t2h & 65535) + (t1h & 65535) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
        bh = c4 << 16 | c3 & 65535;
        bl = c2 << 16 | c1 & 65535;
        s0h = (bh >>> 28 | bl << 4) ^ (bl >>> 2 | bh << 30) ^ (bl >>> 7 | bh << 25);
        s0l = (bl >>> 28 | bh << 4) ^ (bh >>> 2 | bl << 30) ^ (bh >>> 7 | bl << 25);
        s1h = (fh >>> 14 | fl << 18) ^ (fh >>> 18 | fl << 14) ^ (fl >>> 9 | fh << 23);
        s1l = (fl >>> 14 | fh << 18) ^ (fl >>> 18 | fh << 14) ^ (fh >>> 9 | fl << 23);
        bch = bh & ch;
        bcl = bl & cl;
        majh = bch ^ bh & dh ^ cdh;
        majl = bcl ^ bl & dl ^ cdl;
        chh = fh & gh ^ ~fh & hh;
        chl = fl & gl ^ ~fl & hl;
        t1h = blocks3[j + 6];
        t1l = blocks3[j + 7];
        t2h = K2[j + 6];
        t2l = K2[j + 7];
        c1 = (t2l & 65535) + (t1l & 65535) + (chl & 65535) + (s1l & 65535) + (el & 65535);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (el >>> 16) + (c1 >>> 16);
        c3 = (t2h & 65535) + (t1h & 65535) + (chh & 65535) + (s1h & 65535) + (eh & 65535) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (eh >>> 16) + (c3 >>> 16);
        t1h = c4 << 16 | c3 & 65535;
        t1l = c2 << 16 | c1 & 65535;
        c1 = (majl & 65535) + (s0l & 65535);
        c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
        c3 = (majh & 65535) + (s0h & 65535) + (c2 >>> 16);
        c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
        t2h = c4 << 16 | c3 & 65535;
        t2l = c2 << 16 | c1 & 65535;
        c1 = (al & 65535) + (t1l & 65535);
        c2 = (al >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (ah & 65535) + (t1h & 65535) + (c2 >>> 16);
        c4 = (ah >>> 16) + (t1h >>> 16) + (c3 >>> 16);
        eh = c4 << 16 | c3 & 65535;
        el = c2 << 16 | c1 & 65535;
        c1 = (t2l & 65535) + (t1l & 65535);
        c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
        c3 = (t2h & 65535) + (t1h & 65535) + (c2 >>> 16);
        c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
        ah = c4 << 16 | c3 & 65535;
        al = c2 << 16 | c1 & 65535;
      }
      c1 = (h0l & 65535) + (al & 65535);
      c2 = (h0l >>> 16) + (al >>> 16) + (c1 >>> 16);
      c3 = (h0h & 65535) + (ah & 65535) + (c2 >>> 16);
      c4 = (h0h >>> 16) + (ah >>> 16) + (c3 >>> 16);
      this.h0h = c4 << 16 | c3 & 65535;
      this.h0l = c2 << 16 | c1 & 65535;
      c1 = (h1l & 65535) + (bl & 65535);
      c2 = (h1l >>> 16) + (bl >>> 16) + (c1 >>> 16);
      c3 = (h1h & 65535) + (bh & 65535) + (c2 >>> 16);
      c4 = (h1h >>> 16) + (bh >>> 16) + (c3 >>> 16);
      this.h1h = c4 << 16 | c3 & 65535;
      this.h1l = c2 << 16 | c1 & 65535;
      c1 = (h2l & 65535) + (cl & 65535);
      c2 = (h2l >>> 16) + (cl >>> 16) + (c1 >>> 16);
      c3 = (h2h & 65535) + (ch & 65535) + (c2 >>> 16);
      c4 = (h2h >>> 16) + (ch >>> 16) + (c3 >>> 16);
      this.h2h = c4 << 16 | c3 & 65535;
      this.h2l = c2 << 16 | c1 & 65535;
      c1 = (h3l & 65535) + (dl & 65535);
      c2 = (h3l >>> 16) + (dl >>> 16) + (c1 >>> 16);
      c3 = (h3h & 65535) + (dh & 65535) + (c2 >>> 16);
      c4 = (h3h >>> 16) + (dh >>> 16) + (c3 >>> 16);
      this.h3h = c4 << 16 | c3 & 65535;
      this.h3l = c2 << 16 | c1 & 65535;
      c1 = (h4l & 65535) + (el & 65535);
      c2 = (h4l >>> 16) + (el >>> 16) + (c1 >>> 16);
      c3 = (h4h & 65535) + (eh & 65535) + (c2 >>> 16);
      c4 = (h4h >>> 16) + (eh >>> 16) + (c3 >>> 16);
      this.h4h = c4 << 16 | c3 & 65535;
      this.h4l = c2 << 16 | c1 & 65535;
      c1 = (h5l & 65535) + (fl & 65535);
      c2 = (h5l >>> 16) + (fl >>> 16) + (c1 >>> 16);
      c3 = (h5h & 65535) + (fh & 65535) + (c2 >>> 16);
      c4 = (h5h >>> 16) + (fh >>> 16) + (c3 >>> 16);
      this.h5h = c4 << 16 | c3 & 65535;
      this.h5l = c2 << 16 | c1 & 65535;
      c1 = (h6l & 65535) + (gl & 65535);
      c2 = (h6l >>> 16) + (gl >>> 16) + (c1 >>> 16);
      c3 = (h6h & 65535) + (gh & 65535) + (c2 >>> 16);
      c4 = (h6h >>> 16) + (gh >>> 16) + (c3 >>> 16);
      this.h6h = c4 << 16 | c3 & 65535;
      this.h6l = c2 << 16 | c1 & 65535;
      c1 = (h7l & 65535) + (hl & 65535);
      c2 = (h7l >>> 16) + (hl >>> 16) + (c1 >>> 16);
      c3 = (h7h & 65535) + (hh & 65535) + (c2 >>> 16);
      c4 = (h7h >>> 16) + (hh >>> 16) + (c3 >>> 16);
      this.h7h = c4 << 16 | c3 & 65535;
      this.h7l = c2 << 16 | c1 & 65535;
    };
    Sha512.prototype.hex = function() {
      this.finalize();
      var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l, h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l, h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l, h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l, bits = this.bits;
      var hex = HEX_CHARS2[h0h >> 28 & 15] + HEX_CHARS2[h0h >> 24 & 15] + HEX_CHARS2[h0h >> 20 & 15] + HEX_CHARS2[h0h >> 16 & 15] + HEX_CHARS2[h0h >> 12 & 15] + HEX_CHARS2[h0h >> 8 & 15] + HEX_CHARS2[h0h >> 4 & 15] + HEX_CHARS2[h0h & 15] + HEX_CHARS2[h0l >> 28 & 15] + HEX_CHARS2[h0l >> 24 & 15] + HEX_CHARS2[h0l >> 20 & 15] + HEX_CHARS2[h0l >> 16 & 15] + HEX_CHARS2[h0l >> 12 & 15] + HEX_CHARS2[h0l >> 8 & 15] + HEX_CHARS2[h0l >> 4 & 15] + HEX_CHARS2[h0l & 15] + HEX_CHARS2[h1h >> 28 & 15] + HEX_CHARS2[h1h >> 24 & 15] + HEX_CHARS2[h1h >> 20 & 15] + HEX_CHARS2[h1h >> 16 & 15] + HEX_CHARS2[h1h >> 12 & 15] + HEX_CHARS2[h1h >> 8 & 15] + HEX_CHARS2[h1h >> 4 & 15] + HEX_CHARS2[h1h & 15] + HEX_CHARS2[h1l >> 28 & 15] + HEX_CHARS2[h1l >> 24 & 15] + HEX_CHARS2[h1l >> 20 & 15] + HEX_CHARS2[h1l >> 16 & 15] + HEX_CHARS2[h1l >> 12 & 15] + HEX_CHARS2[h1l >> 8 & 15] + HEX_CHARS2[h1l >> 4 & 15] + HEX_CHARS2[h1l & 15] + HEX_CHARS2[h2h >> 28 & 15] + HEX_CHARS2[h2h >> 24 & 15] + HEX_CHARS2[h2h >> 20 & 15] + HEX_CHARS2[h2h >> 16 & 15] + HEX_CHARS2[h2h >> 12 & 15] + HEX_CHARS2[h2h >> 8 & 15] + HEX_CHARS2[h2h >> 4 & 15] + HEX_CHARS2[h2h & 15] + HEX_CHARS2[h2l >> 28 & 15] + HEX_CHARS2[h2l >> 24 & 15] + HEX_CHARS2[h2l >> 20 & 15] + HEX_CHARS2[h2l >> 16 & 15] + HEX_CHARS2[h2l >> 12 & 15] + HEX_CHARS2[h2l >> 8 & 15] + HEX_CHARS2[h2l >> 4 & 15] + HEX_CHARS2[h2l & 15] + HEX_CHARS2[h3h >> 28 & 15] + HEX_CHARS2[h3h >> 24 & 15] + HEX_CHARS2[h3h >> 20 & 15] + HEX_CHARS2[h3h >> 16 & 15] + HEX_CHARS2[h3h >> 12 & 15] + HEX_CHARS2[h3h >> 8 & 15] + HEX_CHARS2[h3h >> 4 & 15] + HEX_CHARS2[h3h & 15];
      if (bits >= 256) {
        hex += HEX_CHARS2[h3l >> 28 & 15] + HEX_CHARS2[h3l >> 24 & 15] + HEX_CHARS2[h3l >> 20 & 15] + HEX_CHARS2[h3l >> 16 & 15] + HEX_CHARS2[h3l >> 12 & 15] + HEX_CHARS2[h3l >> 8 & 15] + HEX_CHARS2[h3l >> 4 & 15] + HEX_CHARS2[h3l & 15];
      }
      if (bits >= 384) {
        hex += HEX_CHARS2[h4h >> 28 & 15] + HEX_CHARS2[h4h >> 24 & 15] + HEX_CHARS2[h4h >> 20 & 15] + HEX_CHARS2[h4h >> 16 & 15] + HEX_CHARS2[h4h >> 12 & 15] + HEX_CHARS2[h4h >> 8 & 15] + HEX_CHARS2[h4h >> 4 & 15] + HEX_CHARS2[h4h & 15] + HEX_CHARS2[h4l >> 28 & 15] + HEX_CHARS2[h4l >> 24 & 15] + HEX_CHARS2[h4l >> 20 & 15] + HEX_CHARS2[h4l >> 16 & 15] + HEX_CHARS2[h4l >> 12 & 15] + HEX_CHARS2[h4l >> 8 & 15] + HEX_CHARS2[h4l >> 4 & 15] + HEX_CHARS2[h4l & 15] + HEX_CHARS2[h5h >> 28 & 15] + HEX_CHARS2[h5h >> 24 & 15] + HEX_CHARS2[h5h >> 20 & 15] + HEX_CHARS2[h5h >> 16 & 15] + HEX_CHARS2[h5h >> 12 & 15] + HEX_CHARS2[h5h >> 8 & 15] + HEX_CHARS2[h5h >> 4 & 15] + HEX_CHARS2[h5h & 15] + HEX_CHARS2[h5l >> 28 & 15] + HEX_CHARS2[h5l >> 24 & 15] + HEX_CHARS2[h5l >> 20 & 15] + HEX_CHARS2[h5l >> 16 & 15] + HEX_CHARS2[h5l >> 12 & 15] + HEX_CHARS2[h5l >> 8 & 15] + HEX_CHARS2[h5l >> 4 & 15] + HEX_CHARS2[h5l & 15];
      }
      if (bits == 512) {
        hex += HEX_CHARS2[h6h >> 28 & 15] + HEX_CHARS2[h6h >> 24 & 15] + HEX_CHARS2[h6h >> 20 & 15] + HEX_CHARS2[h6h >> 16 & 15] + HEX_CHARS2[h6h >> 12 & 15] + HEX_CHARS2[h6h >> 8 & 15] + HEX_CHARS2[h6h >> 4 & 15] + HEX_CHARS2[h6h & 15] + HEX_CHARS2[h6l >> 28 & 15] + HEX_CHARS2[h6l >> 24 & 15] + HEX_CHARS2[h6l >> 20 & 15] + HEX_CHARS2[h6l >> 16 & 15] + HEX_CHARS2[h6l >> 12 & 15] + HEX_CHARS2[h6l >> 8 & 15] + HEX_CHARS2[h6l >> 4 & 15] + HEX_CHARS2[h6l & 15] + HEX_CHARS2[h7h >> 28 & 15] + HEX_CHARS2[h7h >> 24 & 15] + HEX_CHARS2[h7h >> 20 & 15] + HEX_CHARS2[h7h >> 16 & 15] + HEX_CHARS2[h7h >> 12 & 15] + HEX_CHARS2[h7h >> 8 & 15] + HEX_CHARS2[h7h >> 4 & 15] + HEX_CHARS2[h7h & 15] + HEX_CHARS2[h7l >> 28 & 15] + HEX_CHARS2[h7l >> 24 & 15] + HEX_CHARS2[h7l >> 20 & 15] + HEX_CHARS2[h7l >> 16 & 15] + HEX_CHARS2[h7l >> 12 & 15] + HEX_CHARS2[h7l >> 8 & 15] + HEX_CHARS2[h7l >> 4 & 15] + HEX_CHARS2[h7l & 15];
      }
      return hex;
    };
    Sha512.prototype.toString = Sha512.prototype.hex;
    Sha512.prototype.digest = function() {
      this.finalize();
      var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l, h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l, h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l, h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l, bits = this.bits;
      var arr = [
        h0h >> 24 & 255,
        h0h >> 16 & 255,
        h0h >> 8 & 255,
        h0h & 255,
        h0l >> 24 & 255,
        h0l >> 16 & 255,
        h0l >> 8 & 255,
        h0l & 255,
        h1h >> 24 & 255,
        h1h >> 16 & 255,
        h1h >> 8 & 255,
        h1h & 255,
        h1l >> 24 & 255,
        h1l >> 16 & 255,
        h1l >> 8 & 255,
        h1l & 255,
        h2h >> 24 & 255,
        h2h >> 16 & 255,
        h2h >> 8 & 255,
        h2h & 255,
        h2l >> 24 & 255,
        h2l >> 16 & 255,
        h2l >> 8 & 255,
        h2l & 255,
        h3h >> 24 & 255,
        h3h >> 16 & 255,
        h3h >> 8 & 255,
        h3h & 255
      ];
      if (bits >= 256) {
        arr.push(h3l >> 24 & 255, h3l >> 16 & 255, h3l >> 8 & 255, h3l & 255);
      }
      if (bits >= 384) {
        arr.push(
          h4h >> 24 & 255,
          h4h >> 16 & 255,
          h4h >> 8 & 255,
          h4h & 255,
          h4l >> 24 & 255,
          h4l >> 16 & 255,
          h4l >> 8 & 255,
          h4l & 255,
          h5h >> 24 & 255,
          h5h >> 16 & 255,
          h5h >> 8 & 255,
          h5h & 255,
          h5l >> 24 & 255,
          h5l >> 16 & 255,
          h5l >> 8 & 255,
          h5l & 255
        );
      }
      if (bits == 512) {
        arr.push(
          h6h >> 24 & 255,
          h6h >> 16 & 255,
          h6h >> 8 & 255,
          h6h & 255,
          h6l >> 24 & 255,
          h6l >> 16 & 255,
          h6l >> 8 & 255,
          h6l & 255,
          h7h >> 24 & 255,
          h7h >> 16 & 255,
          h7h >> 8 & 255,
          h7h & 255,
          h7l >> 24 & 255,
          h7l >> 16 & 255,
          h7l >> 8 & 255,
          h7l & 255
        );
      }
      return arr;
    };
    Sha512.prototype.array = Sha512.prototype.digest;
    Sha512.prototype.arrayBuffer = function() {
      this.finalize();
      var bits = this.bits;
      var buffer2 = new ArrayBuffer(bits / 8);
      var dataView = new DataView(buffer2);
      dataView.setUint32(0, this.h0h);
      dataView.setUint32(4, this.h0l);
      dataView.setUint32(8, this.h1h);
      dataView.setUint32(12, this.h1l);
      dataView.setUint32(16, this.h2h);
      dataView.setUint32(20, this.h2l);
      dataView.setUint32(24, this.h3h);
      if (bits >= 256) {
        dataView.setUint32(28, this.h3l);
      }
      if (bits >= 384) {
        dataView.setUint32(32, this.h4h);
        dataView.setUint32(36, this.h4l);
        dataView.setUint32(40, this.h5h);
        dataView.setUint32(44, this.h5l);
      }
      if (bits == 512) {
        dataView.setUint32(48, this.h6h);
        dataView.setUint32(52, this.h6l);
        dataView.setUint32(56, this.h7h);
        dataView.setUint32(60, this.h7l);
      }
      return buffer2;
    };
    Sha512.prototype.clone = function() {
      var hash = new Sha512(this.bits, false);
      this.copyTo(hash);
      return hash;
    };
    Sha512.prototype.copyTo = function(hash) {
      var i = 0, attrs = [
        "h0h",
        "h0l",
        "h1h",
        "h1l",
        "h2h",
        "h2l",
        "h3h",
        "h3l",
        "h4h",
        "h4l",
        "h5h",
        "h5l",
        "h6h",
        "h6l",
        "h7h",
        "h7l",
        "start",
        "bytes",
        "hBytes",
        "finalized",
        "hashed",
        "lastByteIndex"
      ];
      for (i = 0; i < attrs.length; ++i) {
        hash[attrs[i]] = this[attrs[i]];
      }
      for (i = 0; i < this.blocks.length; ++i) {
        hash.blocks[i] = this.blocks[i];
      }
    };
    function HmacSha512(key2, bits, sharedMemory) {
      var notString, type2 = typeof key2;
      if (type2 !== "string") {
        if (type2 === "object") {
          if (key2 === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER2 && key2.constructor === ArrayBuffer) {
            key2 = new Uint8Array(key2);
          } else if (!Array.isArray(key2)) {
            if (!ARRAY_BUFFER2 || !ArrayBuffer.isView(key2)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var length = key2.length;
      if (!notString) {
        var bytes = [], length = key2.length, index2 = 0, code2;
        for (var i = 0; i < length; ++i) {
          code2 = key2.charCodeAt(i);
          if (code2 < 128) {
            bytes[index2++] = code2;
          } else if (code2 < 2048) {
            bytes[index2++] = 192 | code2 >> 6;
            bytes[index2++] = 128 | code2 & 63;
          } else if (code2 < 55296 || code2 >= 57344) {
            bytes[index2++] = 224 | code2 >> 12;
            bytes[index2++] = 128 | code2 >> 6 & 63;
            bytes[index2++] = 128 | code2 & 63;
          } else {
            code2 = 65536 + ((code2 & 1023) << 10 | key2.charCodeAt(++i) & 1023);
            bytes[index2++] = 240 | code2 >> 18;
            bytes[index2++] = 128 | code2 >> 12 & 63;
            bytes[index2++] = 128 | code2 >> 6 & 63;
            bytes[index2++] = 128 | code2 & 63;
          }
        }
        key2 = bytes;
      }
      if (key2.length > 128) {
        key2 = new Sha512(bits, true).update(key2).array();
      }
      var oKeyPad = [], iKeyPad = [];
      for (var i = 0; i < 128; ++i) {
        var b = key2[i] || 0;
        oKeyPad[i] = 92 ^ b;
        iKeyPad[i] = 54 ^ b;
      }
      Sha512.call(this, bits, sharedMemory);
      this.update(iKeyPad);
      this.oKeyPad = oKeyPad;
      this.inner = true;
      this.sharedMemory = sharedMemory;
    }
    HmacSha512.prototype = new Sha512();
    HmacSha512.prototype.finalize = function() {
      Sha512.prototype.finalize.call(this);
      if (this.inner) {
        this.inner = false;
        var innerHash = this.array();
        Sha512.call(this, this.bits, this.sharedMemory);
        this.update(this.oKeyPad);
        this.update(innerHash);
        Sha512.prototype.finalize.call(this);
      }
    };
    HmacSha512.prototype.clone = function() {
      var hash = new HmacSha512([], this.bits, false);
      this.copyTo(hash);
      hash.inner = this.inner;
      for (var i = 0; i < this.oKeyPad.length; ++i) {
        hash.oKeyPad[i] = this.oKeyPad[i];
      }
      return hash;
    };
    var exports2 = createMethod2(512);
    exports2.sha512 = exports2;
    exports2.sha384 = createMethod2(384);
    exports2.sha512_256 = createMethod2(256);
    exports2.sha512_224 = createMethod2(224);
    exports2.sha512.hmac = createHmacMethod2(512);
    exports2.sha384.hmac = createHmacMethod2(384);
    exports2.sha512_256.hmac = createHmacMethod2(256);
    exports2.sha512_224.hmac = createHmacMethod2(224);
    if (COMMON_JS2) {
      module2.exports = exports2;
    } else {
      root2.sha512 = exports2.sha512;
      root2.sha384 = exports2.sha384;
      root2.sha512_256 = exports2.sha512_256;
      root2.sha512_224 = exports2.sha512_224;
    }
  })();
})(sha512$1);
const elliptic = elliptic$1;
const BN = bnExports$1;
const { sha256 } = sha256Exports;
const { sha512 } = sha512Exports;
const EC$2 = new elliptic.ec("secp256k1");
function toBytesInt32(num) {
  return new Uint8Array([
    (num & 4278190080) >> 24,
    (num & 16711680) >> 16,
    (num & 65280) >> 8,
    num & 255
  ]);
}
const one = new BN(1);
function Unmarshal(data2) {
  const byteLen = EC$2.n.bitLength() + 7 >> 3;
  EC$2.g.mul(10);
  if ((data2[0] & ~1) != 2) {
    return [null, null];
  }
  if (data2.length != 1 + byteLen)
    return [null, null];
  const tx = new BN(data2.slice(1, 1 + byteLen));
  try {
    const p = EC$2.curve.pointFromX(tx);
    return [p.x, p.y];
  } catch (e) {
    return [null, null];
  }
}
function H1(m) {
  let x = null, y = null;
  const byteLen = EC$2.n.bitLength() + 7 >> 3;
  let i = 0;
  while (x == null && i < 100) {
    const res = sha512.array(new Uint8Array([...toBytesInt32(i), ...m]));
    const r = [2, ...res];
    [x, y] = Unmarshal(r.slice(0, byteLen + 1));
    i++;
  }
  return EC$2.curve.point(x, y);
}
function H2(m) {
  const byteLen = EC$2.n.bitLength() + 7 >> 3;
  let i = 0;
  while (true) {
    const res = sha512.array(new Uint8Array([...toBytesInt32(i), ...m]));
    const k = new BN(res.slice(0, byteLen));
    if (k.cmp(EC$2.curve.n.sub(one)) == -1) {
      return k.add(one);
    }
    i++;
  }
}
function Evaluate(privateKey, m) {
  const currentKey = EC$2.keyFromPrivate(privateKey);
  const r = EC$2.genKeyPair();
  const rBN = r.getPrivate();
  const pointH = H1(m);
  const point = pointH.mul(privateKey);
  const vrf2 = point.encode();
  const rgPoint = EC$2.curve.g.mul(rBN);
  const rhPoint = pointH.mul(rBN);
  const b = [
    ...EC$2.curve.g.encode(),
    ...pointH.encode(),
    ...currentKey.getPublic().encode(),
    ...vrf2,
    ...rgPoint.encode(),
    ...rhPoint.encode()
  ];
  const s = H2(b);
  const t = rBN.sub(s.mul(currentKey.getPrivate())).umod(EC$2.curve.n);
  const index2 = sha256.array(new Uint8Array(vrf2));
  const buf = [
    ...new Array(32 - s.byteLength()).fill(0),
    ...s.toArray(),
    ...new Array(32 - t.byteLength()).fill(0),
    ...t.toArray(),
    ...vrf2
  ];
  return [index2, buf];
}
function ProofHoHash(publicKey, data2, proof) {
  const currentKey = EC$2.keyFromPublic(publicKey);
  if (proof.length !== 64 + 65) {
    throw new Error("invalid vrf");
  }
  const s = proof.slice(0, 32);
  const t = proof.slice(32, 64);
  const vrf2 = proof.slice(64, 64 + 65);
  const uhPoint = decodePoint(vrf2);
  if (!uhPoint) {
    throw new Error("invalid vrf");
  }
  const tgPoint = EC$2.curve.g.mul(t);
  const ksgPoint = currentKey.getPublic().mul(s);
  const tksgPoint = tgPoint.add(ksgPoint);
  const hPoint = H1(data2);
  const thPoint = hPoint.mul(t);
  const shPoint = uhPoint.mul(s);
  const tkshPoint = thPoint.add(shPoint);
  const b = [
    ...EC$2.curve.g.encode(),
    ...hPoint.encode(),
    ...currentKey.getPublic().encode(),
    ...vrf2,
    ...tksgPoint.encode(),
    ...tkshPoint.encode()
  ];
  const h2 = H2(b);
  const buf = [...new Array(32 - h2.byteLength()).fill(0), ...h2.toArray()];
  let equal = true;
  for (let i = 0; i < buf.length; i++) {
    if (s[i] !== buf[i]) {
      equal = false;
    }
  }
  if (!equal) {
    throw new Error("invalid vrf");
  }
  return sha256.array(new Uint8Array(vrf2));
}
function decodePoint(data2) {
  try {
    return EC$2.curve.decodePoint(data2);
  } catch {
    return null;
  }
}
var vrfJs = {
  Evaluate,
  ProofHoHash
};
var StateCache = {};
Object.defineProperty(StateCache, "__esModule", { value: true });
StateCache.canBeCached = void 0;
function canBeCached(tx) {
  if (tx.confirmationStatus === void 0) {
    return true;
  } else {
    return tx.confirmationStatus === "confirmed";
  }
}
StateCache.canBeCached = canBeCached;
var TagsParser$1 = {};
Object.defineProperty(TagsParser$1, "__esModule", { value: true });
TagsParser$1.TagsParser = void 0;
const SmartWeaveTags_1$1 = SmartWeaveTags;
const LoggerFactory_1$8 = LoggerFactory$1;
class TagsParser {
  constructor() {
    this.logger = LoggerFactory_1$8.LoggerFactory.INST.create("TagsParser");
  }
  getInputTag(interactionTransaction, contractTxId) {
    if (TagsParser.hasMultipleInteractions(interactionTransaction)) {
      this.logger.debug("Interaction transaction is using multiple input tx tag format.");
      const contractTagIndex = interactionTransaction.tags.findIndex((tag) => tag.name === SmartWeaveTags_1$1.SmartWeaveTags.CONTRACT_TX_ID && tag.value === contractTxId);
      if (interactionTransaction.tags.length - 1 === contractTagIndex) {
        this.logger.warn("Wrong tags format: 'Contract' is the last tag");
        return void 0;
      }
      const inputTag = interactionTransaction.tags[contractTagIndex + 1];
      if (inputTag.name !== SmartWeaveTags_1$1.SmartWeaveTags.INPUT) {
        this.logger.warn(`No 'Input' tag found after 'Contract' tag. Instead ${inputTag.name} was found`);
        return void 0;
      }
      return inputTag;
    } else {
      return interactionTransaction.tags.find((tag) => tag.name === SmartWeaveTags_1$1.SmartWeaveTags.INPUT);
    }
  }
  isInteractWrite(interactionTransaction, contractTxId) {
    return interactionTransaction.tags.some((tag) => tag.name === SmartWeaveTags_1$1.SmartWeaveTags.INTERACT_WRITE && tag.value === contractTxId);
  }
  getInteractWritesContracts(interactionTransaction) {
    return interactionTransaction.tags.filter((tag) => tag.name === SmartWeaveTags_1$1.SmartWeaveTags.INTERACT_WRITE).map((t) => t.value);
  }
  getContractTag(interactionTransaction) {
    var _a;
    return (_a = interactionTransaction.tags.find((tag) => tag.name === SmartWeaveTags_1$1.SmartWeaveTags.CONTRACT_TX_ID)) === null || _a === void 0 ? void 0 : _a.value;
  }
  getContractsWithInputs(interactionTransaction) {
    const result = /* @__PURE__ */ new Map();
    const contractTags = interactionTransaction.tags.filter((tag) => tag.name === SmartWeaveTags_1$1.SmartWeaveTags.CONTRACT_TX_ID);
    contractTags.forEach((contractTag) => {
      result.set(contractTag.value, this.getInputTag(interactionTransaction, contractTag.value));
    });
    return result;
  }
  isEvmSigned(interactionTransaction) {
    return interactionTransaction.tags.some((tag) => tag.name === SmartWeaveTags_1$1.SmartWeaveTags.SIGNATURE_TYPE && tag.value === "ethereum");
  }
  static hasMultipleInteractions(interactionTransaction) {
    return interactionTransaction.tags.filter((tag) => tag.name === SmartWeaveTags_1$1.SmartWeaveTags.CONTRACT_TX_ID).length > 1;
  }
  decodeTags(tx) {
    const tags = tx.get("tags");
    const result = [];
    for (const tag of tags) {
      try {
        const name = tag.get("name", { decode: true, string: true });
        const value = tag.get("value", { decode: true, string: true });
        result.push({ name, value });
      } catch (e) {
      }
    }
    return result;
  }
  getTag(tx, name) {
    const tags = tx.get("tags");
    for (const tag of tags) {
      try {
        if (tag.get("name", { decode: true, string: true }) === name) {
          return tag.get("value", { decode: true, string: true });
        }
      } catch (e) {
      }
    }
    return false;
  }
}
TagsParser$1.TagsParser = TagsParser;
var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(DefaultStateEvaluator$1, "__esModule", { value: true });
DefaultStateEvaluator$1.DefaultStateEvaluator = void 0;
const vrf_js_1$1 = vrfJs;
const elliptic_1$1 = __importDefault$1(elliptic$1);
const SortKeyCache_1$1 = SortKeyCache;
const Benchmark_1 = Benchmark$1;
const LoggerFactory_1$7 = LoggerFactory$1;
const utils_1$5 = utils$1;
const StateEvaluator_1$1 = StateEvaluator;
const StateCache_1 = StateCache;
const TagsParser_1$1 = TagsParser$1;
const EC$1 = new elliptic_1$1.default.ec("secp256k1");
class DefaultStateEvaluator {
  constructor(arweave, executionContextModifiers = []) {
    this.arweave = arweave;
    this.executionContextModifiers = executionContextModifiers;
    this.logger = LoggerFactory_1$7.LoggerFactory.INST.create("DefaultStateEvaluator");
    this.tagsParser = new TagsParser_1$1.TagsParser();
  }
  async eval(executionContext, currentTx) {
    return this.doReadState(executionContext.sortedInteractions, new StateEvaluator_1$1.EvalStateResult(executionContext.contractDefinition.initState, {}, {}), executionContext, currentTx);
  }
  async doReadState(missingInteractions, baseState, executionContext, currentTx) {
    var _a;
    const { ignoreExceptions, stackTrace, internalWrites, cacheEveryNInteractions } = executionContext.evaluationOptions;
    const { contract, contractDefinition, sortedInteractions, warp } = executionContext;
    let currentState = baseState.state;
    let currentSortKey = null;
    const validity = baseState.validity;
    const errorMessages = baseState.errorMessages;
    executionContext === null || executionContext === void 0 ? void 0 : executionContext.handler.initState(currentState);
    const depth = executionContext.contract.callDepth();
    this.logger.debug(`${(0, utils_1$5.indent)(depth)}Evaluating state for ${contractDefinition.txId} [${missingInteractions.length} non-cached of ${sortedInteractions.length} all]`);
    let errorMessage = null;
    let lastConfirmedTxState = null;
    const missingInteractionsLength = missingInteractions.length;
    executionContext.handler.initState(currentState);
    const evmSignatureVerificationPlugin = warp.hasPlugin("evm-signature-verification") ? warp.loadPlugin("evm-signature-verification") : null;
    const progressPlugin = warp.hasPlugin("evaluation-progress") ? warp.loadPlugin("evaluation-progress") : null;
    let shouldBreakAfterEvolve = false;
    for (let i = 0; i < missingInteractionsLength; i++) {
      if (shouldBreakAfterEvolve) {
        break;
      }
      const missingInteraction = missingInteractions[i];
      const singleInteractionBenchmark = Benchmark_1.Benchmark.measure();
      currentSortKey = missingInteraction.sortKey;
      if (missingInteraction.vrf) {
        if (!this.verifyVrf(missingInteraction.vrf, missingInteraction.sortKey, this.arweave)) {
          throw new Error("Vrf verification failed.");
        }
      }
      if (evmSignatureVerificationPlugin && this.tagsParser.isEvmSigned(missingInteraction)) {
        try {
          if (!await evmSignatureVerificationPlugin.process(missingInteraction)) {
            this.logger.warn(`Interaction ${missingInteraction.id} was not verified, skipping.`);
            continue;
          }
        } catch (e) {
          this.logger.error(e);
          continue;
        }
      }
      this.logger.debug(`${(0, utils_1$5.indent)(depth)}[${contractDefinition.txId}][${missingInteraction.id}][${missingInteraction.block.height}]: ${missingInteractions.indexOf(missingInteraction) + 1}/${missingInteractions.length} [of all:${sortedInteractions.length}]`);
      const isInteractWrite = this.tagsParser.isInteractWrite(missingInteraction, contractDefinition.txId);
      if (isInteractWrite && internalWrites) {
        const writingContractTxId = this.tagsParser.getContractTag(missingInteraction);
        this.logger.debug(`${(0, utils_1$5.indent)(depth)}Internal Write - Loading writing contract`, writingContractTxId);
        const interactionCall = contract.getCallStack().addInteractionData({ interaction: null, interactionTx: missingInteraction, currentTx });
        const writingContract = executionContext.warp.contract(writingContractTxId, executionContext.contract, {
          callingInteraction: missingInteraction,
          callType: "read"
        });
        await this.onContractCall(missingInteraction, executionContext, new StateEvaluator_1$1.EvalStateResult(currentState, validity, errorMessages));
        this.logger.debug(`${(0, utils_1$5.indent)(depth)}Reading state of the calling contract at`, missingInteraction.sortKey);
        let newState = null;
        try {
          await writingContract.readState(missingInteraction.sortKey, [
            ...currentTx || [],
            {
              contractTxId: contractDefinition.txId,
              interactionTxId: missingInteraction.id
            }
          ]);
          newState = await this.internalWriteState(contractDefinition.txId, missingInteraction.sortKey);
        } catch (e) {
          if (e.name == "ContractError" && e.subtype == "unsafeClientSkip") {
            this.logger.warn("Skipping unsafe contract in internal write");
            errorMessages[missingInteraction.id] = e;
            if ((0, StateCache_1.canBeCached)(missingInteraction)) {
              const toCache = new StateEvaluator_1$1.EvalStateResult(currentState, validity, errorMessages);
              lastConfirmedTxState = {
                tx: missingInteraction,
                state: toCache
              };
            }
          } else {
            throw e;
          }
        }
        if (newState !== null) {
          currentState = newState.cachedValue.state;
          executionContext === null || executionContext === void 0 ? void 0 : executionContext.handler.initState(currentState);
          validity[missingInteraction.id] = newState.cachedValue.validity[missingInteraction.id];
          if ((_a = newState.cachedValue.errorMessages) === null || _a === void 0 ? void 0 : _a[missingInteraction.id]) {
            errorMessages[missingInteraction.id] = newState.cachedValue.errorMessages[missingInteraction.id];
          }
          const toCache = new StateEvaluator_1$1.EvalStateResult(currentState, validity, errorMessages);
          await this.onStateUpdate(missingInteraction, executionContext, toCache);
          if ((0, StateCache_1.canBeCached)(missingInteraction)) {
            lastConfirmedTxState = {
              tx: missingInteraction,
              state: toCache
            };
          }
        } else {
          validity[missingInteraction.id] = false;
        }
        interactionCall.update({
          cacheHit: false,
          outputState: stackTrace.saveState ? currentState : void 0,
          executionTime: singleInteractionBenchmark.elapsed(true),
          valid: validity[missingInteraction.id],
          errorMessage,
          gasUsed: 0
          // TODO...
        });
      } else {
        const inputTag = this.tagsParser.getInputTag(missingInteraction, executionContext.contractDefinition.txId);
        if (!inputTag) {
          this.logger.error(`${(0, utils_1$5.indent)(depth)}Skipping tx - Input tag not found for ${missingInteraction.id}`);
          continue;
        }
        const input = this.parseInput(inputTag);
        if (!input) {
          this.logger.error(`${(0, utils_1$5.indent)(depth)}Skipping tx - invalid Input tag - ${missingInteraction.id}`);
          continue;
        }
        const interaction = {
          input,
          caller: missingInteraction.owner.address
        };
        const interactionData = {
          interaction,
          interactionTx: missingInteraction,
          currentTx
        };
        const interactionCall = contract.getCallStack().addInteractionData(interactionData);
        const result = await executionContext.handler.handle(executionContext, new StateEvaluator_1$1.EvalStateResult(currentState, validity, errorMessages), interactionData);
        errorMessage = result.errorMessage;
        if (result.type !== "ok") {
          errorMessages[missingInteraction.id] = errorMessage;
        }
        this.logResult(result, missingInteraction, executionContext);
        this.logger.debug(`${(0, utils_1$5.indent)(depth)}Interaction evaluation`, singleInteractionBenchmark.elapsed());
        interactionCall.update({
          cacheHit: false,
          outputState: stackTrace.saveState ? currentState : void 0,
          executionTime: singleInteractionBenchmark.elapsed(true),
          valid: validity[missingInteraction.id],
          errorMessage,
          gasUsed: result.gasUsed
        });
        if (result.type === "exception" && ignoreExceptions !== true) {
          throw new Error(`Exception while processing ${JSON.stringify(interaction)}:
${result.errorMessage}`);
        }
        validity[missingInteraction.id] = result.type === "ok";
        currentState = result.state;
        const toCache = new StateEvaluator_1$1.EvalStateResult(currentState, validity, errorMessages);
        if ((0, StateCache_1.canBeCached)(missingInteraction)) {
          lastConfirmedTxState = {
            tx: missingInteraction,
            state: toCache
          };
        }
        await this.onStateUpdate(missingInteraction, executionContext, toCache, cacheEveryNInteractions % i == 0);
      }
      if (progressPlugin) {
        progressPlugin.process({
          contractTxId: contractDefinition.txId,
          allInteractions: missingInteractionsLength,
          currentInteraction: i,
          lastInteractionProcessingTime: singleInteractionBenchmark.elapsed()
        });
      }
      try {
        for (const { modify } of this.executionContextModifiers) {
          executionContext = await modify(currentState, executionContext);
        }
      } catch (e) {
        if (e.name == "ContractError" && e.subtype == "unsafeClientSkip") {
          validity[missingInteraction.id] = false;
          errorMessages[missingInteraction.id] = e.message;
          shouldBreakAfterEvolve = true;
        } else {
          throw e;
        }
      }
    }
    const evalStateResult = new StateEvaluator_1$1.EvalStateResult(currentState, validity, errorMessages);
    if (lastConfirmedTxState !== null) {
      await this.onStateEvaluated(lastConfirmedTxState.tx, executionContext, lastConfirmedTxState.state);
    }
    return new SortKeyCache_1$1.SortKeyCacheResult(currentSortKey, evalStateResult);
  }
  verifyVrf(vrf2, sortKey, arweave) {
    const keys = EC$1.keyFromPublic(vrf2.pubkey, "hex");
    let hash;
    try {
      hash = (0, vrf_js_1$1.ProofHoHash)(keys.getPublic(), arweave.utils.stringToBuffer(sortKey), arweave.utils.b64UrlToBuffer(vrf2.proof));
    } catch (e) {
      return false;
    }
    return arweave.utils.bufferTob64Url(hash) == vrf2.index;
  }
  logResult(result, currentTx, executionContext) {
    if (result.type === "exception") {
      this.logger.error(`Executing of interaction: [${executionContext.contractDefinition.txId} -> ${currentTx.id}] threw exception:`, `${result.errorMessage}`);
    }
    if (result.type === "error") {
      this.logger.warn(`Executing of interaction: [${executionContext.contractDefinition.txId} -> ${currentTx.id}] returned error:`, result.errorMessage);
    }
  }
  parseInput(inputTag) {
    try {
      return JSON.parse(inputTag.value);
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }
}
DefaultStateEvaluator$1.DefaultStateEvaluator = DefaultStateEvaluator;
var LexicographicalInteractionsSorter = {};
var utils = {};
Object.defineProperty(utils, "__esModule", { value: true });
utils.arrayToHex = void 0;
function arrayToHex(arr) {
  let str = "";
  for (const a of arr) {
    str += ("0" + a.toString(16)).slice(-2);
  }
  return str;
}
utils.arrayToHex = arrayToHex;
var WarpGatewayInteractionsLoader = {};
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.WarpGatewayInteractionsLoader = exports2.SourceType = void 0;
  const Benchmark_12 = Benchmark$1;
  const LoggerFactory_12 = LoggerFactory$1;
  const utils_12 = utils$1;
  (function(SourceType) {
    SourceType["ARWEAVE"] = "arweave";
    SourceType["WARP_SEQUENCER"] = "redstone-sequencer";
  })(exports2.SourceType || (exports2.SourceType = {}));
  class WarpGatewayInteractionsLoader2 {
    constructor(baseUrl, confirmationStatus = null, source = null) {
      this.baseUrl = baseUrl;
      this.confirmationStatus = confirmationStatus;
      this.source = source;
      this.logger = LoggerFactory_12.LoggerFactory.INST.create("WarpGatewayInteractionsLoader");
      this.baseUrl = (0, utils_12.stripTrailingSlash)(baseUrl);
      Object.assign(this, confirmationStatus);
      this.source = source;
    }
    async load(contractId, fromSortKey, toSortKey, evaluationOptions) {
      this.logger.debug("Loading interactions: for ", { contractId, fromSortKey, toSortKey });
      const interactions = [];
      let page = 0;
      let limit = 0;
      let items = 0;
      const benchmarkTotalTime = Benchmark_12.Benchmark.measure();
      do {
        const benchmarkRequestTime = Benchmark_12.Benchmark.measure();
        const url = `${this.baseUrl}/gateway/v2/interactions-sort-key`;
        const response = await fetch(`${url}?${new URLSearchParams({
          contractId,
          ...fromSortKey ? { from: fromSortKey } : "",
          ...toSortKey ? { to: toSortKey } : "",
          page: (++page).toString(),
          fromSdk: "true",
          ...this.confirmationStatus && this.confirmationStatus.confirmed ? { confirmationStatus: "confirmed" } : "",
          ...this.confirmationStatus && this.confirmationStatus.notCorrupted ? { confirmationStatus: "not_corrupted" } : "",
          ...this.source ? { source: this.source } : ""
        })}`).then((res) => {
          return res.ok ? res.json() : Promise.reject(res);
        }).catch((error2) => {
          var _a;
          if ((_a = error2.body) === null || _a === void 0 ? void 0 : _a.message) {
            this.logger.error(error2.body.message);
          }
          throw new Error(`Unable to retrieve transactions. Warp gateway responded with status ${error2.status}.`);
        });
        this.logger.debug(`Loading interactions: page ${page} loaded in ${benchmarkRequestTime.elapsed()}`);
        interactions.push(...response.interactions);
        limit = response.paging.limit;
        items = response.paging.items;
        this.logger.debug(`Loaded interactions length: ${interactions.length}, from: ${fromSortKey}, to: ${toSortKey}`);
      } while (items == limit);
      this.logger.debug("All loaded interactions:", {
        from: fromSortKey,
        to: toSortKey,
        loaded: interactions.length,
        time: benchmarkTotalTime.elapsed()
      });
      return interactions;
    }
    type() {
      return "warp";
    }
    clearCache() {
    }
  }
  exports2.WarpGatewayInteractionsLoader = WarpGatewayInteractionsLoader2;
})(WarpGatewayInteractionsLoader);
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.LexicographicalInteractionsSorter = exports2.lastPossibleKey = exports2.genesisSortKey = exports2.sortingLast = exports2.sortingFirst = void 0;
  const utils_12 = utils;
  const LoggerFactory_12 = LoggerFactory$1;
  const WarpGatewayInteractionsLoader_1 = WarpGatewayInteractionsLoader;
  const firstSortKeyMs = "".padEnd(13, "0");
  const lastSortKeyMs = "".padEnd(13, "9");
  const defaultArweaveMs = "".padEnd(13, "0");
  exports2.sortingFirst = "".padEnd(64, "0");
  exports2.sortingLast = "".padEnd(64, "z");
  exports2.genesisSortKey = `${"".padStart(12, "0")},${firstSortKeyMs},${exports2.sortingFirst}`;
  exports2.lastPossibleKey = `${"".padStart(12, "9")},${lastSortKeyMs},${exports2.sortingLast}`;
  class LexicographicalInteractionsSorter2 {
    constructor(arweave) {
      this.arweave = arweave;
      this.logger = LoggerFactory_12.LoggerFactory.INST.create("LexicographicalInteractionsSorter");
    }
    async sort(transactions2) {
      const copy = [...transactions2];
      const addKeysFuncs = copy.map((tx) => this.addSortKey(tx));
      await Promise.all(addKeysFuncs);
      return copy.sort((a, b) => a.node.sortKey.localeCompare(b.node.sortKey));
    }
    async createSortKey(blockId, transactionId, blockHeight, dummy = false) {
      const blockHashBytes = this.arweave.utils.b64UrlToBuffer(blockId);
      const txIdBytes = this.arweave.utils.b64UrlToBuffer(transactionId);
      const concatenated = this.arweave.utils.concatBuffers([blockHashBytes, txIdBytes]);
      const hashed = (0, utils_12.arrayToHex)(await this.arweave.crypto.hash(concatenated));
      const blockHeightString = `${blockHeight}`.padStart(12, "0");
      const arweaveMs = dummy ? lastSortKeyMs : defaultArweaveMs;
      return `${blockHeightString},${arweaveMs},${hashed}`;
    }
    extractBlockHeight(sortKey) {
      return sortKey ? parseInt(sortKey.split(",")[0]) : null;
    }
    async addSortKey(txInfo) {
      const { node } = txInfo;
      if (txInfo.node.sortKey !== void 0 && txInfo.node.source == WarpGatewayInteractionsLoader_1.SourceType.WARP_SEQUENCER) {
        this.logger.debug("Using sortKey from sequencer", txInfo.node.sortKey);
      } else {
        txInfo.node.sortKey = await this.createSortKey(node.block.id, node.id, node.block.height);
      }
    }
    generateLastSortKey(blockHeight) {
      const blockHeightString = `${blockHeight}`.padStart(12, "0");
      return `${blockHeightString},${lastSortKeyMs},${exports2.sortingLast}`;
    }
  }
  exports2.LexicographicalInteractionsSorter = LexicographicalInteractionsSorter2;
})(LexicographicalInteractionsSorter);
Object.defineProperty(CacheableStateEvaluator$1, "__esModule", { value: true });
CacheableStateEvaluator$1.CacheableStateEvaluator = void 0;
const SortKeyCache_1 = SortKeyCache;
const LoggerFactory_1$6 = LoggerFactory$1;
const utils_1$4 = utils$1;
const StateEvaluator_1 = StateEvaluator;
const DefaultStateEvaluator_1 = DefaultStateEvaluator$1;
const LexicographicalInteractionsSorter_1 = LexicographicalInteractionsSorter;
class CacheableStateEvaluator extends DefaultStateEvaluator_1.DefaultStateEvaluator {
  constructor(arweave, cache, executionContextModifiers = []) {
    super(arweave, executionContextModifiers);
    this.cache = cache;
    this.cLogger = LoggerFactory_1$6.LoggerFactory.INST.create("CacheableStateEvaluator");
  }
  async eval(executionContext, currentTx) {
    var _a, _b, _c, _d;
    const cachedState = executionContext.cachedState;
    if (cachedState && cachedState.sortKey == executionContext.requestedSortKey) {
      this.cLogger.info(`Exact cache hit for sortKey ${(_a = executionContext === null || executionContext === void 0 ? void 0 : executionContext.contractDefinition) === null || _a === void 0 ? void 0 : _a.txId}:${cachedState.sortKey}`);
      (_b = executionContext.handler) === null || _b === void 0 ? void 0 : _b.initState(cachedState.cachedValue.state);
      return cachedState;
    }
    const missingInteractions = executionContext.sortedInteractions;
    const contractTxId = executionContext.contractDefinition.txId;
    if (!contractTxId) {
      throw new Error("Contract tx id not set in the execution context");
    }
    for (const entry of currentTx || []) {
      if (entry.contractTxId === executionContext.contractDefinition.txId) {
        const index2 = missingInteractions.findIndex((tx) => tx.id === entry.interactionTxId);
        if (index2 !== -1) {
          this.cLogger.debug("Inf. Loop fix - removing interaction", {
            height: missingInteractions[index2].block.height,
            contractTxId: entry.contractTxId,
            interactionTxId: entry.interactionTxId,
            sortKey: missingInteractions[index2].sortKey
          });
          missingInteractions.splice(index2);
        }
      }
    }
    if (missingInteractions.length == 0) {
      this.cLogger.info(`No missing interactions ${contractTxId}`);
      if (cachedState) {
        (_c = executionContext.handler) === null || _c === void 0 ? void 0 : _c.initState(cachedState.cachedValue.state);
        return cachedState;
      } else {
        (_d = executionContext.handler) === null || _d === void 0 ? void 0 : _d.initState(executionContext.contractDefinition.initState);
        this.cLogger.debug("Inserting initial state into cache");
        const stateToCache = new StateEvaluator_1.EvalStateResult(executionContext.contractDefinition.initState, {}, {});
        await this.cache.put(new SortKeyCache_1.CacheKey(contractTxId, LexicographicalInteractionsSorter_1.genesisSortKey), stateToCache);
        return new SortKeyCache_1.SortKeyCacheResult(LexicographicalInteractionsSorter_1.genesisSortKey, stateToCache);
      }
    }
    const baseState = cachedState == null ? executionContext.contractDefinition.initState : cachedState.cachedValue.state;
    const baseValidity = cachedState == null ? {} : cachedState.cachedValue.validity;
    const baseErrorMessages = cachedState == null ? {} : cachedState.cachedValue.errorMessages;
    return await this.doReadState(missingInteractions, new StateEvaluator_1.EvalStateResult(baseState, baseValidity, baseErrorMessages || {}), executionContext, currentTx);
  }
  async onStateEvaluated(transaction2, executionContext, state) {
    const contractTxId = executionContext.contractDefinition.txId;
    this.cLogger.debug(`${(0, utils_1$4.indent)(executionContext.contract.callDepth())}onStateEvaluated: cache update for contract ${contractTxId} [${transaction2.sortKey}]`);
    await this.putInCache(contractTxId, transaction2, state);
  }
  async onStateUpdate(transaction2, executionContext, state, force = false) {
    if (executionContext.evaluationOptions.updateCacheForEachInteraction || force) {
      this.cLogger.debug(`onStateUpdate: cache update for contract ${executionContext.contractDefinition.txId} [${transaction2.sortKey}]`, {
        contract: executionContext.contractDefinition.txId,
        state: state.state,
        sortKey: transaction2.sortKey
      });
      await this.putInCache(executionContext.contractDefinition.txId, transaction2, state);
    }
  }
  async latestAvailableState(contractTxId, sortKey) {
    this.cLogger.debug("Searching for", { contractTxId, sortKey });
    if (sortKey) {
      const stateCache = await this.cache.getLessOrEqual(contractTxId, sortKey);
      if (stateCache) {
        this.cLogger.debug(`Latest available state at ${contractTxId}: ${stateCache.sortKey}`);
      }
      return stateCache;
    } else {
      return await this.cache.getLast(contractTxId);
    }
  }
  async onInternalWriteStateUpdate(transaction2, contractTxId, state) {
    this.cLogger.debug("Internal write state update:", {
      sortKey: transaction2.sortKey,
      dry: transaction2.dry,
      contractTxId,
      state: state.state
    });
    await this.putInCache(contractTxId, transaction2, state);
  }
  async onContractCall(transaction2, executionContext, state) {
    var _a;
    if (((_a = executionContext.sortedInteractions) === null || _a === void 0 ? void 0 : _a.length) == 0) {
      return;
    }
    const txIndex = executionContext.sortedInteractions.indexOf(transaction2);
    if (txIndex < 1) {
      return;
    }
    await this.putInCache(executionContext.contractDefinition.txId, executionContext.sortedInteractions[txIndex - 1], state);
  }
  async putInCache(contractTxId, transaction2, state) {
    if (transaction2.dry) {
      return;
    }
    if (transaction2.confirmationStatus !== void 0 && transaction2.confirmationStatus !== "confirmed") {
      return;
    }
    const stateToCache = new StateEvaluator_1.EvalStateResult(state.state, state.validity, state.errorMessages || {});
    this.cLogger.debug("Putting into cache", {
      contractTxId,
      transaction: transaction2.id,
      sortKey: transaction2.sortKey,
      dry: transaction2.dry
    });
    await this.cache.put(new SortKeyCache_1.CacheKey(contractTxId, transaction2.sortKey), stateToCache);
  }
  async syncState(contractTxId, sortKey, state, validity) {
    const stateToCache = new StateEvaluator_1.EvalStateResult(state, validity, {});
    await this.cache.put(new SortKeyCache_1.CacheKey(contractTxId, sortKey), stateToCache);
  }
  async dumpCache() {
    return await this.cache.dump();
  }
  async internalWriteState(contractTxId, sortKey) {
    return await this.cache.get(contractTxId, sortKey);
  }
  async hasContractCached(contractTxId) {
    return await this.cache.getLast(contractTxId) != null;
  }
  async lastCachedSortKey() {
    return await this.cache.getLastSortKey();
  }
  async allCachedContracts() {
    return await this.cache.allContracts();
  }
  setCache(cache) {
    this.cache = cache;
  }
  getCache() {
    return this.cache;
  }
}
CacheableStateEvaluator$1.CacheableStateEvaluator = CacheableStateEvaluator;
var HandlerExecutorFactory = {};
var umdExports = {};
var umd = {
  get exports() {
    return umdExports;
  },
  set exports(v) {
    umdExports = v;
  }
};
(function(module2, exports2) {
  var loader = function(exports3) {
    Object.defineProperty(exports3, "__esModule", {
      value: true
    });
    exports3.default = void 0;
    exports3.demangle = demangle;
    exports3.instantiate = instantiate;
    exports3.instantiateStreaming = instantiateStreaming;
    exports3.instantiateSync = instantiateSync;
    const ID_OFFSET = -8;
    const SIZE_OFFSET = -4;
    const ARRAYBUFFER_ID = 0;
    const STRING_ID = 1;
    const ARRAYBUFFERVIEW = 1 << 0;
    const ARRAY = 1 << 1;
    const STATICARRAY = 1 << 2;
    const VAL_ALIGN_OFFSET = 6;
    const VAL_SIGNED = 1 << 11;
    const VAL_FLOAT = 1 << 12;
    const VAL_MANAGED = 1 << 14;
    const ARRAYBUFFERVIEW_BUFFER_OFFSET = 0;
    const ARRAYBUFFERVIEW_DATASTART_OFFSET = 4;
    const ARRAYBUFFERVIEW_BYTELENGTH_OFFSET = 8;
    const ARRAYBUFFERVIEW_SIZE = 12;
    const ARRAY_LENGTH_OFFSET = 12;
    const ARRAY_SIZE = 16;
    const E_NO_EXPORT_TABLE = "Operation requires compiling with --exportTable";
    const E_NO_EXPORT_RUNTIME = "Operation requires compiling with --exportRuntime";
    const F_NO_EXPORT_RUNTIME = () => {
      throw Error(E_NO_EXPORT_RUNTIME);
    };
    const BIGINT = typeof BigUint64Array !== "undefined";
    const THIS = Symbol();
    const STRING_SMALLSIZE = 192;
    const STRING_CHUNKSIZE = 1024;
    const utf16 = new TextDecoder("utf-16le", {
      fatal: true
    });
    Object.hasOwn = Object.hasOwn || function(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    function getStringImpl(buffer2, ptr) {
      let len = new Uint32Array(buffer2)[ptr + SIZE_OFFSET >>> 2] >>> 1;
      const wtf16 = new Uint16Array(buffer2, ptr, len);
      if (len <= STRING_SMALLSIZE)
        return String.fromCharCode(...wtf16);
      try {
        return utf16.decode(wtf16);
      } catch {
        let str = "", off = 0;
        while (len - off > STRING_CHUNKSIZE) {
          str += String.fromCharCode(...wtf16.subarray(off, off += STRING_CHUNKSIZE));
        }
        return str + String.fromCharCode(...wtf16.subarray(off));
      }
    }
    function preInstantiate(imports) {
      const extendedExports = {};
      function getString(memory, ptr) {
        if (!memory)
          return "<yet unknown>";
        return getStringImpl(memory.buffer, ptr);
      }
      const env = imports.env = imports.env || {};
      env.abort = env.abort || function abort(msg, file, line, colm) {
        const memory = extendedExports.memory || env.memory;
        throw Error(`abort: ${getString(memory, msg)} at ${getString(memory, file)}:${line}:${colm}`);
      };
      env.trace = env.trace || function trace(msg, n, ...args) {
        const memory = extendedExports.memory || env.memory;
        console.log(`trace: ${getString(memory, msg)}${n ? " " : ""}${args.slice(0, n).join(", ")}`);
      };
      env.seed = env.seed || Date.now;
      imports.Math = imports.Math || Math;
      imports.Date = imports.Date || Date;
      return extendedExports;
    }
    function postInstantiate(extendedExports, instance) {
      const exports4 = instance.exports;
      const memory = exports4.memory;
      const table = exports4.table;
      const __new = exports4.__new || F_NO_EXPORT_RUNTIME;
      const __pin = exports4.__pin || F_NO_EXPORT_RUNTIME;
      const __unpin = exports4.__unpin || F_NO_EXPORT_RUNTIME;
      const __collect = exports4.__collect || F_NO_EXPORT_RUNTIME;
      const __rtti_base = exports4.__rtti_base;
      const getRttiCount = __rtti_base ? (arr) => arr[__rtti_base >>> 2] : F_NO_EXPORT_RUNTIME;
      extendedExports.__new = __new;
      extendedExports.__pin = __pin;
      extendedExports.__unpin = __unpin;
      extendedExports.__collect = __collect;
      function getRttInfo(id) {
        const U32 = new Uint32Array(memory.buffer);
        if ((id >>>= 0) >= getRttiCount(U32))
          throw Error(`invalid id: ${id}`);
        return U32[(__rtti_base + 4 >>> 2) + (id << 1)];
      }
      function getRttBase(id) {
        const U32 = new Uint32Array(memory.buffer);
        if ((id >>>= 0) >= getRttiCount(U32))
          throw Error(`invalid id: ${id}`);
        return U32[(__rtti_base + 4 >>> 2) + (id << 1) + 1];
      }
      function getArrayInfo(id) {
        const info = getRttInfo(id);
        if (!(info & (ARRAYBUFFERVIEW | ARRAY | STATICARRAY)))
          throw Error(`not an array: ${id}, flags=${info}`);
        return info;
      }
      function getValueAlign(info) {
        return 31 - Math.clz32(info >>> VAL_ALIGN_OFFSET & 31);
      }
      function __newString(str) {
        if (str == null)
          return 0;
        const length = str.length;
        const ptr = __new(length << 1, STRING_ID);
        const U16 = new Uint16Array(memory.buffer);
        for (var i = 0, p = ptr >>> 1; i < length; ++i)
          U16[p + i] = str.charCodeAt(i);
        return ptr;
      }
      extendedExports.__newString = __newString;
      function __newArrayBuffer(buf) {
        if (buf == null)
          return 0;
        const bufview = new Uint8Array(buf);
        const ptr = __new(bufview.length, ARRAYBUFFER_ID);
        const U8 = new Uint8Array(memory.buffer);
        U8.set(bufview, ptr);
        return ptr;
      }
      extendedExports.__newArrayBuffer = __newArrayBuffer;
      function __getString(ptr) {
        if (!ptr)
          return null;
        const buffer2 = memory.buffer;
        const id = new Uint32Array(buffer2)[ptr + ID_OFFSET >>> 2];
        if (id !== STRING_ID)
          throw Error(`not a string: ${ptr}`);
        return getStringImpl(buffer2, ptr);
      }
      extendedExports.__getString = __getString;
      function getView(alignLog2, signed2, float) {
        const buffer2 = memory.buffer;
        if (float) {
          switch (alignLog2) {
            case 2:
              return new Float32Array(buffer2);
            case 3:
              return new Float64Array(buffer2);
          }
        } else {
          switch (alignLog2) {
            case 0:
              return new (signed2 ? Int8Array : Uint8Array)(buffer2);
            case 1:
              return new (signed2 ? Int16Array : Uint16Array)(buffer2);
            case 2:
              return new (signed2 ? Int32Array : Uint32Array)(buffer2);
            case 3:
              return new (signed2 ? BigInt64Array : BigUint64Array)(buffer2);
          }
        }
        throw Error(`unsupported align: ${alignLog2}`);
      }
      function __newArray(id, valuesOrCapacity = 0) {
        const input = valuesOrCapacity;
        const info = getArrayInfo(id);
        const align = getValueAlign(info);
        const isArrayLike = typeof input !== "number";
        const length = isArrayLike ? input.length : input;
        const buf = __new(length << align, info & STATICARRAY ? id : ARRAYBUFFER_ID);
        let result;
        if (info & STATICARRAY) {
          result = buf;
        } else {
          __pin(buf);
          const arr = __new(info & ARRAY ? ARRAY_SIZE : ARRAYBUFFERVIEW_SIZE, id);
          __unpin(buf);
          const U32 = new Uint32Array(memory.buffer);
          U32[arr + ARRAYBUFFERVIEW_BUFFER_OFFSET >>> 2] = buf;
          U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2] = buf;
          U32[arr + ARRAYBUFFERVIEW_BYTELENGTH_OFFSET >>> 2] = length << align;
          if (info & ARRAY)
            U32[arr + ARRAY_LENGTH_OFFSET >>> 2] = length;
          result = arr;
        }
        if (isArrayLike) {
          const view = getView(align, info & VAL_SIGNED, info & VAL_FLOAT);
          const start2 = buf >>> align;
          if (info & VAL_MANAGED) {
            for (let i = 0; i < length; ++i) {
              view[start2 + i] = input[i];
            }
          } else {
            view.set(input, start2);
          }
        }
        return result;
      }
      extendedExports.__newArray = __newArray;
      function __getArrayView(arr) {
        const U32 = new Uint32Array(memory.buffer);
        const id = U32[arr + ID_OFFSET >>> 2];
        const info = getArrayInfo(id);
        const align = getValueAlign(info);
        let buf = info & STATICARRAY ? arr : U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
        const length = info & ARRAY ? U32[arr + ARRAY_LENGTH_OFFSET >>> 2] : U32[buf + SIZE_OFFSET >>> 2] >>> align;
        return getView(align, info & VAL_SIGNED, info & VAL_FLOAT).subarray(buf >>>= align, buf + length);
      }
      extendedExports.__getArrayView = __getArrayView;
      function __getArray(arr) {
        const input = __getArrayView(arr);
        const len = input.length;
        const out = new Array(len);
        for (let i = 0; i < len; i++)
          out[i] = input[i];
        return out;
      }
      extendedExports.__getArray = __getArray;
      function __getArrayBuffer(ptr) {
        const buffer2 = memory.buffer;
        const length = new Uint32Array(buffer2)[ptr + SIZE_OFFSET >>> 2];
        return buffer2.slice(ptr, ptr + length);
      }
      extendedExports.__getArrayBuffer = __getArrayBuffer;
      function __getFunction(ptr) {
        if (!table)
          throw Error(E_NO_EXPORT_TABLE);
        const index2 = new Uint32Array(memory.buffer)[ptr >>> 2];
        return table.get(index2);
      }
      extendedExports.__getFunction = __getFunction;
      function getTypedArray(Type, alignLog2, ptr) {
        return new Type(getTypedArrayView(Type, alignLog2, ptr));
      }
      function getTypedArrayView(Type, alignLog2, ptr) {
        const buffer2 = memory.buffer;
        const U32 = new Uint32Array(buffer2);
        return new Type(buffer2, U32[ptr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2], U32[ptr + ARRAYBUFFERVIEW_BYTELENGTH_OFFSET >>> 2] >>> alignLog2);
      }
      function attachTypedArrayFunctions(ctor, name, align) {
        extendedExports[`__get${name}`] = getTypedArray.bind(null, ctor, align);
        extendedExports[`__get${name}View`] = getTypedArrayView.bind(null, ctor, align);
      }
      [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array].forEach((ctor) => {
        attachTypedArrayFunctions(ctor, ctor.name, 31 - Math.clz32(ctor.BYTES_PER_ELEMENT));
      });
      if (BIGINT) {
        [BigUint64Array, BigInt64Array].forEach((ctor) => {
          attachTypedArrayFunctions(ctor, ctor.name.slice(3), 3);
        });
      }
      function __instanceof(ptr, baseId) {
        const U32 = new Uint32Array(memory.buffer);
        let id = U32[ptr + ID_OFFSET >>> 2];
        if (id <= getRttiCount(U32)) {
          do {
            if (id == baseId)
              return true;
            id = getRttBase(id);
          } while (id);
        }
        return false;
      }
      extendedExports.__instanceof = __instanceof;
      extendedExports.memory = extendedExports.memory || memory;
      extendedExports.table = extendedExports.table || table;
      return demangle(exports4, extendedExports);
    }
    function isResponse(src) {
      return typeof Response !== "undefined" && src instanceof Response;
    }
    function isModule(src) {
      return src instanceof WebAssembly.Module;
    }
    async function instantiate(source, imports = {}) {
      if (isResponse(source = await source))
        return instantiateStreaming(source, imports);
      const module3 = isModule(source) ? source : await WebAssembly.compile(source);
      const extended = preInstantiate(imports);
      const instance = await WebAssembly.instantiate(module3, imports);
      const exports4 = postInstantiate(extended, instance);
      return {
        module: module3,
        instance,
        exports: exports4
      };
    }
    function instantiateSync(source, imports = {}) {
      const module3 = isModule(source) ? source : new WebAssembly.Module(source);
      const extended = preInstantiate(imports);
      const instance = new WebAssembly.Instance(module3, imports);
      const exports4 = postInstantiate(extended, instance);
      return {
        module: module3,
        instance,
        exports: exports4
      };
    }
    async function instantiateStreaming(source, imports = {}) {
      if (!WebAssembly.instantiateStreaming) {
        return instantiate(isResponse(source = await source) ? source.arrayBuffer() : source, imports);
      }
      const extended = preInstantiate(imports);
      const result = await WebAssembly.instantiateStreaming(source, imports);
      const exports4 = postInstantiate(extended, result.instance);
      return {
        ...result,
        exports: exports4
      };
    }
    function demangle(exports4, extendedExports = {}) {
      const setArgumentsLength = exports4["__argumentsLength"] ? (length) => {
        exports4["__argumentsLength"].value = length;
      } : exports4["__setArgumentsLength"] || exports4["__setargc"] || (() => {
      });
      for (let internalName of Object.keys(exports4)) {
        const elem = exports4[internalName];
        let parts = internalName.split(".");
        let curr = extendedExports;
        while (parts.length > 1) {
          let part = parts.shift();
          if (!Object.hasOwn(curr, part))
            curr[part] = {};
          curr = curr[part];
        }
        let name = parts[0];
        let hash = name.indexOf("#");
        if (hash >= 0) {
          const className = name.substring(0, hash);
          const classElem = curr[className];
          if (typeof classElem === "undefined" || !classElem.prototype) {
            const ctor = function(...args) {
              return ctor.wrap(ctor.prototype.constructor(0, ...args));
            };
            ctor.prototype = {
              valueOf() {
                return this[THIS];
              }
            };
            ctor.wrap = function(thisValue) {
              return Object.create(ctor.prototype, {
                [THIS]: {
                  value: thisValue,
                  writable: false
                }
              });
            };
            if (classElem)
              Object.getOwnPropertyNames(classElem).forEach((name2) => Object.defineProperty(ctor, name2, Object.getOwnPropertyDescriptor(classElem, name2)));
            curr[className] = ctor;
          }
          name = name.substring(hash + 1);
          curr = curr[className].prototype;
          if (/^(get|set):/.test(name)) {
            if (!Object.hasOwn(curr, name = name.substring(4))) {
              let getter = exports4[internalName.replace("set:", "get:")];
              let setter = exports4[internalName.replace("get:", "set:")];
              Object.defineProperty(curr, name, {
                get() {
                  return getter(this[THIS]);
                },
                set(value) {
                  setter(this[THIS], value);
                },
                enumerable: true
              });
            }
          } else {
            if (name === "constructor") {
              (curr[name] = function(...args) {
                setArgumentsLength(args.length);
                return elem(...args);
              }).original = elem;
            } else {
              (curr[name] = function(...args) {
                setArgumentsLength(args.length);
                return elem(this[THIS], ...args);
              }).original = elem;
            }
          }
        } else {
          if (/^(get|set):/.test(name)) {
            if (!Object.hasOwn(curr, name = name.substring(4))) {
              Object.defineProperty(curr, name, {
                get: exports4[internalName.replace("set:", "get:")],
                set: exports4[internalName.replace("get:", "set:")],
                enumerable: true
              });
            }
          } else if (typeof elem === "function" && elem !== setArgumentsLength) {
            (curr[name] = (...args) => {
              setArgumentsLength(args.length);
              return elem(...args);
            }).original = elem;
          } else {
            curr[name] = elem;
          }
        }
      }
      return extendedExports;
    }
    var _default = {
      instantiate,
      instantiateSync,
      instantiateStreaming,
      demangle
    };
    exports3.default = _default;
    return "default" in exports3 ? exports3.default : exports3;
  }({});
  module2.exports = loader;
})(umd);
var asWasmImports$1 = {};
Object.defineProperty(asWasmImports$1, "__esModule", { value: true });
asWasmImports$1.asWasmImports = void 0;
const LoggerFactory_1$5 = LoggerFactory$1;
const asWasmImports = (swGlobal, wasmInstance) => {
  const wasmLogger = LoggerFactory_1$5.LoggerFactory.INST.create("WASM:AS");
  return {
    metering: {
      usegas: swGlobal.useGas
    },
    console: {
      "console.log": function(msgPtr) {
        wasmLogger.debug(`${swGlobal.contract.id}: ${wasmInstance.exports.__getString(msgPtr)}`);
      },
      "console.logO": function(msgPtr, objPtr) {
        wasmLogger.debug(`${swGlobal.contract.id}: ${wasmInstance.exports.__getString(msgPtr)}`, JSON.parse(wasmInstance.exports.__getString(objPtr)));
      }
    },
    block: {
      "Block.height": function() {
        return swGlobal.block.height;
      },
      "Block.indep_hash": function() {
        return wasmInstance.exports.__newString(swGlobal.block.indep_hash);
      },
      "Block.timestamp": function() {
        return swGlobal.block.timestamp;
      }
    },
    transaction: {
      "Transaction.id": function() {
        return wasmInstance.exports.__newString(swGlobal.transaction.id);
      },
      "Transaction.owner": function() {
        return wasmInstance.exports.__newString(swGlobal.transaction.owner);
      },
      "Transaction.target": function() {
        return wasmInstance.exports.__newString(swGlobal.transaction.target);
      }
    },
    contract: {
      "Contract.id": function() {
        return wasmInstance.exports.__newString(swGlobal.contract.id);
      },
      "Contract.owner": function() {
        return wasmInstance.exports.__newString(swGlobal.contract.owner);
      }
    },
    api: {
      _readContractState: (fnIndex, contractTxIdPtr) => {
        const contractTxId = wasmInstance.exports.__getString(contractTxIdPtr);
        const callbackFn = getFn(fnIndex);
        console.log("Simulating read state of", contractTxId);
        return setTimeout(() => {
          console.log("calling callback");
          callbackFn(wasmInstance.exports.__newString(JSON.stringify({
            contractTxId
          })));
        }, 1e3);
      },
      clearTimeout
    },
    env: {
      abort(messagePtr, fileNamePtr, line, column) {
        const message = wasmInstance.exports.__getString(messagePtr);
        wasmLogger.error("--------------------- Error message from AssemblyScript ----------------------\n");
        wasmLogger.error("  " + message);
        wasmLogger.error('    In file "' + wasmInstance.exports.__getString(fileNamePtr) + '"');
        wasmLogger.error(`    on line ${line}, column ${column}.`);
        wasmLogger.error("------------------------------------------------------------------------------\n");
        throw new Error(message);
      }
    }
  };
  function getFn(idx) {
    return wasmInstance.exports.table.get(idx);
  }
};
asWasmImports$1.asWasmImports = asWasmImports;
var rustWasmImports$1 = {};
Object.defineProperty(rustWasmImports$1, "__esModule", { value: true });
rustWasmImports$1.rustWasmImports = void 0;
const LoggerFactory_1$4 = LoggerFactory$1;
const rustWasmImports = (swGlobal, wbindgenImports, wasmInstance, dtorValue) => {
  const wasmLogger = LoggerFactory_1$4.LoggerFactory.INST.create("WASM:Rust");
  const rawImports = {
    metering: {
      usegas: swGlobal.useGas
    },
    console: {
      log: function(value) {
        wasmLogger.debug(`${swGlobal.contract.id}: ${value}`);
      }
    },
    Block: {
      height: function() {
        return swGlobal.block.height;
      },
      indep_hash: function() {
        return swGlobal.block.indep_hash;
      },
      timestamp: function() {
        return swGlobal.block.timestamp;
      }
    },
    Transaction: {
      id: function() {
        return swGlobal.transaction.id;
      },
      owner: function() {
        return swGlobal.transaction.owner;
      },
      target: function() {
        return swGlobal.transaction.target;
      }
    },
    Contract: {
      id: function() {
        return swGlobal.contract.id;
      },
      owner: function() {
        return swGlobal.contract.owner;
      }
    },
    SmartWeave: {
      caller: function() {
        return swGlobal.caller;
      },
      readContractState: async function(contractTxId) {
        return await swGlobal.contracts.readContractState(contractTxId);
      },
      write: async function(contractId, input) {
        return await swGlobal.contracts.write(contractId, input);
      }
    },
    Vrf: {
      value: function() {
        return swGlobal.vrf.value;
      },
      randomInt: function(maxValue) {
        return swGlobal.vrf.randomInt(maxValue);
      }
    }
  };
  const baseImports = {
    __wbg_log_: function(arg0, arg1) {
      rawImports.console.log(getStringFromWasm0(arg0, arg1));
    },
    __wbindgen_json_parse: function(arg0, arg1) {
      var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbindgen_json_serialize: function(arg0, arg1) {
      const obj = getObject(arg1);
      var ret = JSON.stringify(obj === void 0 ? null : obj);
      var ptr0 = passStringToWasm0(ret, wasmInstance.exports.__wbindgen_malloc, wasmInstance.exports.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbindgen_object_drop_ref: function(arg0) {
      takeObject(arg0);
    },
    __wbindgen_cb_drop: function(arg0) {
      const obj = takeObject(arg0).original;
      if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
      }
      var ret = false;
      return ret;
    },
    __wbg_readContractState: function(arg0, arg1) {
      var ret = rawImports.SmartWeave.readContractState(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbg_viewContractState: function(arg0, arg1) {
    },
    __wbg_caller: function(arg0) {
      var ret = rawImports.SmartWeave.caller();
      var ptr0 = passStringToWasm0(ret, wasmInstance.exports.__wbindgen_malloc, wasmInstance.exports.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_write: function(arg0, arg1, arg2) {
      var ret = rawImports.SmartWeave.write(getStringFromWasm0(arg0, arg1), takeObject(arg2));
      return addHeapObject(ret);
    },
    __wbg_refreshState: function(arg0, arg1) {
    },
    __wbg_indephash: function(arg0) {
      var ret = rawImports.Block.indep_hash();
      var ptr0 = passStringToWasm0(ret, wasmInstance.exports.__wbindgen_malloc, wasmInstance.exports.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_height: function() {
      var ret = rawImports.Block.height();
      return ret;
    },
    __wbg_timestamp: function() {
      var ret = rawImports.Block.timestamp();
      return ret;
    },
    __wbg_id: function(arg0) {
      var ret = rawImports.Transaction.id();
      var ptr0 = passStringToWasm0(ret, wasmInstance.exports.__wbindgen_malloc, wasmInstance.exports.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_contractOwner: function(arg0) {
      var ret = rawImports.Contract.owner();
      var ptr0 = passStringToWasm0(ret, wasmInstance.exports.__wbindgen_malloc, wasmInstance.exports.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_contractId: function(arg0) {
      var ret = rawImports.Contract.id();
      var ptr0 = passStringToWasm0(ret, wasmInstance.exports.__wbindgen_malloc, wasmInstance.exports.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_owner: function(arg0) {
      var ret = rawImports.Transaction.owner();
      var ptr0 = passStringToWasm0(ret, wasmInstance.exports.__wbindgen_malloc, wasmInstance.exports.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_target: function(arg0) {
      var ret = rawImports.Transaction.target();
      var ptr0 = passStringToWasm0(ret, wasmInstance.exports.__wbindgen_malloc, wasmInstance.exports.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_call: function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_new: function(arg0, arg1) {
      try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = (arg02, arg12) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return __wbg_adapter_42(a, state0.b, arg02, arg12);
          } finally {
            state0.a = a;
          }
        };
        var ret = new Promise(cb0);
        return addHeapObject(ret);
      } finally {
        state0.a = state0.b = 0;
      }
    },
    __wbg_resolve: function(arg0) {
      var ret = Promise.resolve(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_then_a: function(arg0, arg1) {
      var ret = getObject(arg0).then(getObject(arg1));
      return addHeapObject(ret);
    },
    __wbg_then_5: function(arg0, arg1, arg2) {
      var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    },
    __wbindgen_debug_string: function(arg0, arg1) {
      var ret = debugString(getObject(arg1));
      var ptr0 = passStringToWasm0(ret, wasmInstance.exports.__wbindgen_malloc, wasmInstance.exports.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbindgen_throw: function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbindgen_closure_wrapper: function(arg0, arg1, arg2) {
      var ret = makeMutClosure(arg0, arg1, dtorValue, __wbg_adapter_14);
      return addHeapObject(ret);
    },
    __wbindgen_string_new: function(arg0, arg1) {
      var ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    },
    __wbg_value: function(arg0) {
      var ret = rawImports.Vrf.value();
      var ptr0 = passStringToWasm0(ret, wasmInstance.exports.__wbindgen_malloc, wasmInstance.exports.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_randomInt: function(arg0) {
      var ret = rawImports.Vrf.randomInt(arg0);
      return ret;
    }
  };
  const baseImportsKeys = Object.keys(baseImports);
  let module2 = wbindgenImports.reduce((acc, wbindgenKey) => {
    const baseImportsKey = baseImportsKeys.find((key2) => wbindgenKey.startsWith(key2));
    if (baseImportsKey === void 0) {
      throw new Error(`Cannot find import mapping for ${wbindgenKey}`);
    }
    acc[wbindgenKey] = baseImports[baseImportsKey];
    return acc;
  }, {});
  let imports = {};
  imports["__wbindgen_placeholder__"] = module2;
  let cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
  cachedTextDecoder.decode();
  let cachegetUint8Memory0 = null;
  function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasmInstance.exports.memory.buffer) {
      cachegetUint8Memory0 = new Uint8Array(wasmInstance.exports.memory.buffer);
    }
    return cachegetUint8Memory0;
  }
  function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }
  const heap = new Array(32).fill(void 0);
  heap.push(void 0, null, true, false);
  let heap_next = heap.length;
  function addHeapObject(obj) {
    if (heap_next === heap.length)
      heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
  }
  function getObject(idx) {
    return heap[idx];
  }
  let WASM_VECTOR_LEN = 0;
  let cachedTextEncoder = new TextEncoder("utf-8");
  const encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  } : function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === void 0) {
      const buf = cachedTextEncoder.encode(arg);
      const ptr2 = malloc(buf.length);
      getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
      WASM_VECTOR_LEN = buf.length;
      return ptr2;
    }
    let len = arg.length;
    let ptr = malloc(len);
    const mem = getUint8Memory0();
    let offset = 0;
    for (; offset < len; offset++) {
      const code2 = arg.charCodeAt(offset);
      if (code2 > 127)
        break;
      mem[ptr + offset] = code2;
    }
    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, len = offset + arg.length * 3);
      const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
      const ret = encodeString(arg, view);
      offset += ret.written;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
  }
  let cachegetInt32Memory0 = null;
  function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasmInstance.exports.memory.buffer) {
      cachegetInt32Memory0 = new Int32Array(wasmInstance.exports.memory.buffer);
    }
    return cachegetInt32Memory0;
  }
  function dropObject(idx) {
    if (idx < 36)
      return;
    heap[idx] = heap_next;
    heap_next = idx;
  }
  function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
  }
  function debugString(val) {
    const type2 = typeof val;
    if (type2 == "number" || type2 == "boolean" || val == null) {
      return `${val}`;
    }
    if (type2 == "string") {
      return `"${val}"`;
    }
    if (type2 == "symbol") {
      const description = val.description;
      if (description == null) {
        return "Symbol";
      } else {
        return `Symbol(${description})`;
      }
    }
    if (type2 == "function") {
      const name = val.name;
      if (typeof name == "string" && name.length > 0) {
        return `Function(${name})`;
      } else {
        return "Function";
      }
    }
    if (Array.isArray(val)) {
      const length = val.length;
      let debug = "[";
      if (length > 0) {
        debug += debugString(val[0]);
      }
      for (let i = 1; i < length; i++) {
        debug += ", " + debugString(val[i]);
      }
      debug += "]";
      return debug;
    }
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
      className = builtInMatches[1];
    } else {
      return toString.call(val);
    }
    if (className == "Object") {
      try {
        return "Object(" + JSON.stringify(val) + ")";
      } catch (_) {
        return "Object";
      }
    }
    if (val instanceof Error) {
      return `${val.name}: ${val.message}
${val.stack}`;
    }
    return className;
  }
  function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
      state.cnt++;
      const a = state.a;
      state.a = 0;
      try {
        return f(a, state.b, ...args);
      } finally {
        if (--state.cnt === 0) {
          wasmInstance.exports.__wbindgen_export_2.get(state.dtor)(a, state.b);
        } else {
          state.a = a;
        }
      }
    };
    real.original = state;
    return real;
  }
  function __wbg_adapter_14(arg0, arg1, arg2) {
    wasmInstance.modifiedExports._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__(arg0, arg1, addHeapObject(arg2));
  }
  module2.handle = function(interaction) {
    var ret = wasmInstance.exports.handle(addHeapObject(interaction));
    return takeObject(ret);
  };
  let stack_pointer = 32;
  function addBorrowedObject(obj) {
    if (stack_pointer == 1)
      throw new Error("out of js stack");
    heap[--stack_pointer] = obj;
    return stack_pointer;
  }
  module2.initState = function(state) {
    try {
      wasmInstance.exports.initState(addBorrowedObject(state));
    } finally {
      heap[stack_pointer++] = void 0;
    }
  };
  module2.currentState = function() {
    var ret = wasmInstance.exports.currentState();
    return takeObject(ret);
  };
  module2.lang = function() {
    try {
      const retptr = wasmInstance.exports.__wbindgen_add_to_stack_pointer(-16);
      wasmInstance.exports.lang(retptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasmInstance.exports.__wbindgen_add_to_stack_pointer(16);
      wasmInstance.exports.__wbindgen_free(r0, r1);
    }
  };
  module2.type = function() {
    var ret = wasmInstance.exports.type();
    return ret;
  };
  function handleError(f, args) {
    try {
      return f.apply(this, args);
    } catch (e) {
      wasmInstance.exports.__wbindgen_exn_store(addHeapObject(e));
    }
  }
  function __wbg_adapter_42(arg0, arg1, arg2, arg3) {
    wasmInstance.modifiedExports.wasm_bindgen__convert__closures__invoke2_mut__(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
  }
  class StateWrapper {
    __destroy_into_raw() {
      const ptr = this.ptr;
      this.ptr = 0;
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasmInstance.exports.__wbg_statewrapper_free(ptr);
    }
  }
  module2.StateWrapper = StateWrapper;
  imports.metering = rawImports.metering;
  return { imports, exports: module2 };
};
rustWasmImports$1.rustWasmImports = rustWasmImports;
var goWasmImports = {};
Object.defineProperty(goWasmImports, "__esModule", { value: true });
goWasmImports.Go = void 0;
const LoggerFactory_1$3 = LoggerFactory$1;
const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");
let logLine = [];
let globalJsModule;
(function(global) {
  globalJsModule = global;
  globalJsModule.redstone = {
    go: {}
  };
}).call(commonjsGlobal, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
class Go {
  constructor(swGlobal) {
    this._callbackTimeouts = /* @__PURE__ */ new Map();
    this._nextCallbackTimeoutID = 1;
    const wasmLogger = LoggerFactory_1$3.LoggerFactory.INST.create("WASM:Go");
    let go = this;
    globalJsModule.redstone.go = {
      WasmModule: {
        registerWasmModule: function(moduleId) {
          go._id = moduleId;
          go.exports = globalJsModule[moduleId];
          delete globalJsModule[moduleId];
          globalJsModule.redstone.go[moduleId] = {};
          globalJsModule.redstone.go[moduleId].imports = {
            console: {
              log: function(...args) {
                wasmLogger.debug(args[0], ...args.slice(1));
              }
            },
            Transaction: {
              id: function() {
                return swGlobal.transaction.id;
              },
              owner: function() {
                return swGlobal.transaction.owner;
              },
              target: function() {
                return swGlobal.transaction.target;
              }
            },
            Block: {
              indep_hash: function() {
                return swGlobal.block.indep_hash;
              },
              height: function() {
                return swGlobal.block.height;
              },
              timestamp: function() {
                return swGlobal.block.timestamp;
              }
            },
            Contract: {
              id: function() {
                return swGlobal.contract.id;
              },
              owner: function() {
                return swGlobal.contract.owner;
              }
            },
            SmartWeave: {
              readContractState: async function(contractTxId) {
                return await swGlobal.contracts.readContractState(contractTxId);
              }
            }
          };
        }
      }
    };
    const mem = () => {
      return new DataView(this._inst.exports.memory.buffer);
    };
    const setInt64 = (addr, v) => {
      mem().setUint32(addr + 0, v, true);
      mem().setUint32(addr + 4, Math.floor(v / 4294967296), true);
    };
    const loadValue = (addr) => {
      const f = mem().getFloat64(addr, true);
      if (f === 0) {
        return void 0;
      }
      if (!isNaN(f)) {
        return f;
      }
      const id = mem().getUint32(addr, true);
      return this._values[id];
    };
    const storeValue = (addr, v) => {
      const nanHead = 2146959360;
      if (typeof v === "number") {
        if (isNaN(v)) {
          mem().setUint32(addr + 4, nanHead, true);
          mem().setUint32(addr, 0, true);
          return;
        }
        if (v === 0) {
          mem().setUint32(addr + 4, nanHead, true);
          mem().setUint32(addr, 1, true);
          return;
        }
        mem().setFloat64(addr, v, true);
        return;
      }
      switch (v) {
        case void 0:
          mem().setFloat64(addr, 0, true);
          return;
        case null:
          mem().setUint32(addr + 4, nanHead, true);
          mem().setUint32(addr, 2, true);
          return;
        case true:
          mem().setUint32(addr + 4, nanHead, true);
          mem().setUint32(addr, 3, true);
          return;
        case false:
          mem().setUint32(addr + 4, nanHead, true);
          mem().setUint32(addr, 4, true);
          return;
      }
      let id = this._ids.get(v);
      if (id === void 0) {
        id = this._idPool.pop();
        if (id === void 0) {
          id = this._values.length;
        }
        this._values[id] = v;
        this._goRefCounts[id] = 0;
        this._ids.set(v, id);
      }
      this._goRefCounts[id]++;
      let typeFlag = 1;
      switch (typeof v) {
        case "string":
          typeFlag = 2;
          break;
        case "symbol":
          typeFlag = 3;
          break;
        case "function":
          typeFlag = 4;
          break;
      }
      mem().setUint32(addr + 4, nanHead | typeFlag, true);
      mem().setUint32(addr, id, true);
    };
    const loadSlice = (array, len, cap = null) => {
      return new Uint8Array(this._inst.exports.memory.buffer, array, len);
    };
    const loadSliceOfValues = (array, len, cap) => {
      const a = new Array(len);
      for (let i = 0; i < len; i++) {
        a[i] = loadValue(array + i * 8);
      }
      return a;
    };
    const loadString = (ptr, len) => {
      return decoder.decode(new DataView(this._inst.exports.memory.buffer, ptr, len));
    };
    const timeOrigin = Date.now() - performance.now();
    this.importObject = {
      wasi_snapshot_preview1: {
        // https://github.com/WebAssembly/WASI/blob/main/phases/snapshot/docs.md#fd_write
        fd_write: function(fd, iovs_ptr, iovs_len, nwritten_ptr) {
          let nwritten = 0;
          if (fd == 1) {
            for (let iovs_i = 0; iovs_i < iovs_len; iovs_i++) {
              let iov_ptr = iovs_ptr + iovs_i * 8;
              let ptr = mem().getUint32(iov_ptr + 0, true);
              let len = mem().getUint32(iov_ptr + 4, true);
              nwritten += len;
              for (let i = 0; i < len; i++) {
                let c = mem().getUint8(ptr + i);
                if (c == 13)
                  ;
                else if (c == 10) {
                  let line = decoder.decode(new Uint8Array(logLine));
                  logLine = [];
                  console.log(line);
                } else {
                  logLine.push(c);
                }
              }
            }
          } else {
            console.error("invalid file descriptor:", fd);
          }
          mem().setUint32(nwritten_ptr, nwritten, true);
          return 0;
        },
        fd_close: () => 0,
        fd_fdstat_get: () => 0,
        fd_seek: () => 0,
        proc_exit: (code2) => {
          if (commonjsGlobal.process) {
            process.exit(code2);
          } else {
            throw "trying to exit with code " + code2;
          }
        },
        random_get: (bufPtr, bufLen) => {
          crypto.getRandomValues(loadSlice(bufPtr, bufLen, null));
          return 0;
        }
      },
      env: {
        // func ticks() float64
        "runtime.ticks": () => {
          return timeOrigin + performance.now();
        },
        // func sleepTicks(timeout float64)
        "runtime.sleepTicks": (timeout) => {
          setTimeout(this._inst.exports.go_scheduler, timeout);
        },
        // func finalizeRef(v ref)
        // https://github.com/tinygo-org/tinygo/issues/1140#issuecomment-718145455
        "syscall/js.finalizeRef": (v_addr) => {
          const id = mem().getUint32(v_addr, true);
          this._goRefCounts[id]--;
          if (this._goRefCounts[id] === 0) {
            const v = this._values[id];
            this._values[id] = null;
            this._ids.delete(v);
            this._idPool.push(id);
          }
        },
        // func stringVal(value string) ref
        "syscall/js.stringVal": (ret_ptr, value_ptr, value_len) => {
          const s = loadString(value_ptr, value_len);
          storeValue(ret_ptr, s);
        },
        // func valueGet(v ref, p string) ref
        "syscall/js.valueGet": (retval, v_addr, p_ptr, p_len) => {
          let prop = loadString(p_ptr, p_len);
          let value = loadValue(v_addr);
          let result = Reflect.get(value, prop);
          storeValue(retval, result);
        },
        // func valueSet(v ref, p string, x ref)
        "syscall/js.valueSet": (v_addr, p_ptr, p_len, x_addr) => {
          const v = loadValue(v_addr);
          const p = loadString(p_ptr, p_len);
          const x = loadValue(x_addr);
          Reflect.set(v, p, x);
        },
        // func valueDelete(v ref, p string)
        "syscall/js.valueDelete": (v_addr, p_ptr, p_len) => {
          const v = loadValue(v_addr);
          const p = loadString(p_ptr, p_len);
          Reflect.deleteProperty(v, p);
        },
        // func valueIndex(v ref, i int) ref
        "syscall/js.valueIndex": (ret_addr, v_addr, i) => {
          storeValue(ret_addr, Reflect.get(loadValue(v_addr), i));
        },
        // valueSetIndex(v ref, i int, x ref)
        "syscall/js.valueSetIndex": (v_addr, i, x_addr) => {
          Reflect.set(loadValue(v_addr), i, loadValue(x_addr));
        },
        // func valueCall(v ref, m string, args []ref) (ref, bool)
        "syscall/js.valueCall": (ret_addr, v_addr, m_ptr, m_len, args_ptr, args_len, args_cap) => {
          const v = loadValue(v_addr);
          const name = loadString(m_ptr, m_len);
          const args = loadSliceOfValues(args_ptr, args_len);
          try {
            const m = Reflect.get(v, name);
            storeValue(ret_addr, Reflect.apply(m, v, args));
            mem().setUint8(ret_addr + 8, 1);
          } catch (err) {
            storeValue(ret_addr, err);
            mem().setUint8(ret_addr + 8, 0);
          }
        },
        // func valueInvoke(v ref, args []ref) (ref, bool)
        "syscall/js.valueInvoke": (ret_addr, v_addr, args_ptr, args_len, args_cap) => {
          try {
            const v = loadValue(v_addr);
            const args = loadSliceOfValues(args_ptr, args_len, args_cap);
            storeValue(ret_addr, Reflect.apply(v, void 0, args));
            mem().setUint8(ret_addr + 8, 1);
          } catch (err) {
            storeValue(ret_addr, err);
            mem().setUint8(ret_addr + 8, 0);
          }
        },
        // func valueNew(v ref, args []ref) (ref, bool)
        "syscall/js.valueNew": (ret_addr, v_addr, args_ptr, args_len, args_cap) => {
          const v = loadValue(v_addr);
          const args = loadSliceOfValues(args_ptr, args_len);
          try {
            storeValue(ret_addr, Reflect.construct(v, args));
            mem().setUint8(ret_addr + 8, 1);
          } catch (err) {
            storeValue(ret_addr, err);
            mem().setUint8(ret_addr + 8, 0);
          }
        },
        // func valueLength(v ref) int
        "syscall/js.valueLength": (v_addr) => {
          return loadValue(v_addr).length;
        },
        // valuePrepareString(v ref) (ref, int)
        "syscall/js.valuePrepareString": (ret_addr, v_addr) => {
          const s = String(loadValue(v_addr));
          const str = encoder.encode(s);
          storeValue(ret_addr, str);
          setInt64(ret_addr + 8, str.length);
        },
        // valueLoadString(v ref, b []byte)
        "syscall/js.valueLoadString": (v_addr, slice_ptr, slice_len, slice_cap) => {
          const str = loadValue(v_addr);
          loadSlice(slice_ptr, slice_len, slice_cap).set(str);
        },
        // func valueInstanceOf(v ref, t ref) bool
        "syscall/js.valueInstanceOf": (v_addr, t_addr) => {
          return loadValue(v_addr) instanceof loadValue(t_addr);
        },
        // func copyBytesToGo(dst []byte, src ref) (int, bool)
        "syscall/js.copyBytesToGo": (ret_addr, dest_addr, dest_len, dest_cap, source_addr) => {
          let num_bytes_copied_addr = ret_addr;
          let returned_status_addr = ret_addr + 4;
          const dst = loadSlice(dest_addr, dest_len);
          const src = loadValue(source_addr);
          if (!(src instanceof Uint8Array)) {
            mem().setUint8(returned_status_addr, 0);
            return;
          }
          const toCopy = src.subarray(0, dst.length);
          dst.set(toCopy);
          setInt64(num_bytes_copied_addr, toCopy.length);
          mem().setUint8(returned_status_addr, 1);
        },
        // copyBytesToJS(dst ref, src []byte) (int, bool)
        // Originally copied from upstream Go project, then modified:
        //   https://github.com/golang/go/blob/3f995c3f3b43033013013e6c7ccc93a9b1411ca9/misc/wasm/wasm_exec.js#L404-L416
        "syscall/js.copyBytesToJS": (ret_addr, dest_addr, source_addr, source_len, source_cap) => {
          let num_bytes_copied_addr = ret_addr;
          let returned_status_addr = ret_addr + 4;
          const dst = loadValue(dest_addr);
          const src = loadSlice(source_addr, source_len);
          if (!(dst instanceof Uint8Array)) {
            mem().setUint8(returned_status_addr, 0);
            return;
          }
          const toCopy = src.subarray(0, dst.length);
          dst.set(toCopy);
          setInt64(num_bytes_copied_addr, toCopy.length);
          mem().setUint8(returned_status_addr, 1);
        }
      }
    };
  }
  async run(instance) {
    this._inst = instance;
    this._values = [
      // JS values that Go currently has references to, indexed by reference id
      NaN,
      0,
      null,
      true,
      false,
      commonjsGlobal,
      this
    ];
    this._goRefCounts = [];
    this._ids = /* @__PURE__ */ new Map();
    this._idPool = [];
    this.exited = false;
    new DataView(this._inst.exports.memory.buffer);
    while (true) {
      const callbackPromise = new Promise((resolve) => {
        this._resolveCallbackPromise = () => {
          if (this.exited) {
            throw new Error("bad callback: Go program has already exited");
          }
          setTimeout(resolve, 0);
        };
      });
      this._inst.exports._start();
      if (this.exited) {
        break;
      }
      await callbackPromise;
    }
  }
  _resume() {
    if (this.exited) {
      throw new Error("Go program has already exited");
    }
    this._inst.exports.resume();
    if (this.exited) {
      this._resolveExitPromise();
    }
  }
  _makeFuncWrapper(id) {
    const go = this;
    return function() {
      const event = { id, this: this, args: arguments };
      go._pendingEvent = event;
      go._resume();
      return event.result;
    };
  }
  _resolveExitPromise() {
  }
}
goWasmImports.Go = Go;
var smartweaveGlobal = {};
Object.defineProperty(smartweaveGlobal, "__esModule", { value: true });
smartweaveGlobal.SmartWeaveGlobal = void 0;
class SmartWeaveGlobal {
  constructor(arweave, contract, evaluationOptions) {
    this.gasUsed = 0;
    this.gasLimit = Number.MAX_SAFE_INTEGER;
    this.unsafeClient = arweave;
    this.arweave = {
      ar: arweave.ar,
      utils: arweave.utils,
      wallets: arweave.wallets,
      crypto: arweave.crypto
    };
    this.evaluationOptions = evaluationOptions;
    this.contract = contract;
    this.transaction = new Transaction(this);
    this.block = new Block(this);
    this.contracts = {
      readContractState: (contractId, height, returnValidity) => {
        throw new Error("Not implemented - should be set by HandlerApi implementor");
      },
      viewContractState: (contractId, input) => {
        throw new Error("Not implemented - should be set by HandlerApi implementor");
      },
      write: (contractId, input, throwOnError) => {
        throw new Error("Not implemented - should be set by HandlerApi implementor");
      },
      refreshState: () => {
        throw new Error("Not implemented - should be set by HandlerApi implementor");
      }
    };
    this.vrf = new Vrf(this);
    this.useGas = this.useGas.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.extensions = {};
  }
  useGas(gas) {
    if (gas < 0) {
      throw new Error(`[RE:GNE] Gas number exception - gas < 0.`);
    }
    this.gasUsed += gas;
    if (this.gasUsed > this.gasLimit) {
      throw new Error(`[RE:OOG] Out of gas! Used: ${this.gasUsed}, limit: ${this.gasLimit}`);
    }
  }
  async getBalance(address, height) {
    if (!this._activeTx) {
      throw new Error("Cannot read balance - active tx is not set.");
    }
    if (!this.block.height) {
      throw new Error("Cannot read balance - block height not set.");
    }
    const effectiveHeight = height || this.block.height;
    return await fetch(`${this.evaluationOptions.walletBalanceUrl}block/height/${effectiveHeight}/wallet/${address}/balance`).then((res) => {
      return res.ok ? res.text() : Promise.reject(res);
    }).catch((error2) => {
      var _a;
      throw new Error(`Unable to read wallet balance. ${error2.status}. ${(_a = error2.body) === null || _a === void 0 ? void 0 : _a.message}`);
    });
  }
}
smartweaveGlobal.SmartWeaveGlobal = SmartWeaveGlobal;
class Transaction {
  constructor(smartWeaveGlobal) {
    this.smartWeaveGlobal = smartWeaveGlobal;
  }
  get id() {
    if (!this.smartWeaveGlobal._activeTx) {
      throw new Error("No current Tx");
    }
    return this.smartWeaveGlobal._activeTx.id;
  }
  get owner() {
    if (!this.smartWeaveGlobal._activeTx) {
      throw new Error("No current Tx");
    }
    return this.smartWeaveGlobal._activeTx.owner.address;
  }
  get target() {
    if (!this.smartWeaveGlobal._activeTx) {
      throw new Error("No current Tx");
    }
    return this.smartWeaveGlobal._activeTx.recipient;
  }
  get tags() {
    if (!this.smartWeaveGlobal._activeTx) {
      throw new Error("No current Tx");
    }
    return this.smartWeaveGlobal._activeTx.tags;
  }
  get quantity() {
    if (!this.smartWeaveGlobal._activeTx) {
      throw new Error("No current Tx");
    }
    return this.smartWeaveGlobal._activeTx.quantity.winston;
  }
  get reward() {
    if (!this.smartWeaveGlobal._activeTx) {
      throw new Error("No current Tx");
    }
    return this.smartWeaveGlobal._activeTx.fee.winston;
  }
}
class Block {
  constructor(smartWeaveGlobal) {
    this.smartWeaveGlobal = smartWeaveGlobal;
  }
  get height() {
    if (!this.smartWeaveGlobal._activeTx) {
      throw new Error("No current Tx");
    }
    return this.smartWeaveGlobal._activeTx.block.height;
  }
  get indep_hash() {
    if (!this.smartWeaveGlobal._activeTx) {
      throw new Error("No current Tx");
    }
    return this.smartWeaveGlobal._activeTx.block.id;
  }
  get timestamp() {
    if (!this.smartWeaveGlobal._activeTx) {
      throw new Error("No current tx");
    }
    return this.smartWeaveGlobal._activeTx.block.timestamp;
  }
}
class Vrf {
  constructor(smartWeaveGlobal) {
    this.smartWeaveGlobal = smartWeaveGlobal;
  }
  get data() {
    return this.smartWeaveGlobal._activeTx.vrf;
  }
  // returns the original generated random number as a BigInt string;
  get value() {
    return this.smartWeaveGlobal._activeTx.vrf.bigint;
  }
  // returns a random value in a range from 1 to maxValue
  randomInt(maxValue) {
    if (!Number.isInteger(maxValue)) {
      throw new Error("Integer max value required for random integer generation");
    }
    const result = BigInt(this.smartWeaveGlobal._activeTx.vrf.bigint) % BigInt(maxValue) + BigInt(1);
    if (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER) {
      throw new Error("Random int cannot be cast to number");
    }
    return Number(result);
  }
}
var JsHandlerApi = {};
var AbstractContractHandler = {};
var hasRequiredAbstractContractHandler;
function requireAbstractContractHandler() {
  if (hasRequiredAbstractContractHandler)
    return AbstractContractHandler;
  hasRequiredAbstractContractHandler = 1;
  Object.defineProperty(AbstractContractHandler, "__esModule", { value: true });
  AbstractContractHandler.AbstractContractHandler = void 0;
  const LoggerFactory_12 = LoggerFactory$1;
  const utils_12 = utils$1;
  const HandlerExecutorFactory_1 = requireHandlerExecutorFactory();
  let AbstractContractHandler$1 = class AbstractContractHandler {
    constructor(swGlobal, contractDefinition) {
      this.swGlobal = swGlobal;
      this.contractDefinition = contractDefinition;
      this.logger = LoggerFactory_12.LoggerFactory.INST.create("ContractHandler");
      this.assignReadContractState = this.assignReadContractState.bind(this);
      this.assignViewContractState = this.assignViewContractState.bind(this);
      this.assignWrite = this.assignWrite.bind(this);
      this.assignRefreshState = this.assignRefreshState.bind(this);
    }
    async dispose() {
    }
    assignWrite(executionContext, currentTx) {
      this.swGlobal.contracts.write = async (contractTxId, input, throwOnError) => {
        if (!executionContext.evaluationOptions.internalWrites) {
          throw new Error("Internal writes feature switched off. Change EvaluationOptions.internalWrites flag to 'true'");
        }
        const effectiveThrowOnError = throwOnError == void 0 ? executionContext.evaluationOptions.throwOnInternalWriteError : throwOnError;
        const debugData = {
          from: this.contractDefinition.txId,
          to: contractTxId,
          input
        };
        this.logger.debug("swGlobal.write call:", debugData);
        const calleeContract = executionContext.warp.contract(contractTxId, executionContext.contract, {
          callingInteraction: this.swGlobal._activeTx,
          callType: "write"
        });
        const result = await calleeContract.dryWriteFromTx(input, this.swGlobal._activeTx, [
          ...currentTx || [],
          {
            contractTxId: this.contractDefinition.txId,
            interactionTxId: this.swGlobal.transaction.id
          }
        ]);
        this.logger.debug("Cache result?:", !this.swGlobal._activeTx.dry);
        const shouldAutoThrow = result.type !== "ok" && effectiveThrowOnError && (!this.swGlobal._activeTx.dry || this.swGlobal._activeTx.dry && this.swGlobal._activeTx.strict);
        const effectiveErrorMessage = shouldAutoThrow ? `Internal write auto error for call [${JSON.stringify(debugData)}]: ${result.errorMessage}` : result.errorMessage;
        await executionContext.warp.stateEvaluator.onInternalWriteStateUpdate(this.swGlobal._activeTx, contractTxId, {
          state: result.state,
          validity: {
            ...result.originalValidity,
            [this.swGlobal._activeTx.id]: result.type == "ok"
          },
          errorMessages: {
            ...result.originalErrorMessages,
            [this.swGlobal._activeTx.id]: effectiveErrorMessage
          }
        });
        if (shouldAutoThrow) {
          throw new HandlerExecutorFactory_1.ContractError(effectiveErrorMessage);
        }
        return result;
      };
    }
    assignViewContractState(executionContext) {
      this.swGlobal.contracts.viewContractState = async (contractTxId, input) => {
        this.logger.debug("swGlobal.viewContractState call:", {
          from: this.contractDefinition.txId,
          to: contractTxId,
          input
        });
        const childContract = executionContext.warp.contract(contractTxId, executionContext.contract, {
          callingInteraction: this.swGlobal._activeTx,
          callType: "view"
        });
        return await childContract.viewStateForTx(input, this.swGlobal._activeTx);
      };
    }
    assignReadContractState(executionContext, currentTx, currentResult, interactionTx) {
      this.swGlobal.contracts.readContractState = async (contractTxId, returnValidity) => {
        var _a, _b, _c;
        this.logger.debug("swGlobal.readContractState call:", {
          from: this.contractDefinition.txId,
          to: contractTxId,
          sortKey: interactionTx.sortKey,
          transaction: this.swGlobal.transaction.id
        });
        const { stateEvaluator } = executionContext.warp;
        const childContract = executionContext.warp.contract(contractTxId, executionContext.contract, {
          callingInteraction: interactionTx,
          callType: "read"
        });
        await stateEvaluator.onContractCall(interactionTx, executionContext, currentResult);
        const stateWithValidity = await childContract.readState(interactionTx.sortKey, [
          ...currentTx || [],
          {
            contractTxId: this.contractDefinition.txId,
            interactionTxId: this.swGlobal.transaction.id
          }
        ]);
        if ((_a = stateWithValidity === null || stateWithValidity === void 0 ? void 0 : stateWithValidity.cachedValue) === null || _a === void 0 ? void 0 : _a.errorMessages) {
          const errorKeys = Reflect.ownKeys((_b = stateWithValidity === null || stateWithValidity === void 0 ? void 0 : stateWithValidity.cachedValue) === null || _b === void 0 ? void 0 : _b.errorMessages);
          if (errorKeys.length) {
            const lastErrorKey = errorKeys[errorKeys.length - 1];
            const lastErrorMessage = (_c = stateWithValidity === null || stateWithValidity === void 0 ? void 0 : stateWithValidity.cachedValue) === null || _c === void 0 ? void 0 : _c.errorMessages[lastErrorKey];
            if (lastErrorMessage.startsWith("[SkipUnsafeError]")) {
              throw new HandlerExecutorFactory_1.ContractError(lastErrorMessage);
            }
          }
        }
        return returnValidity ? {
          state: (0, utils_12.deepCopy)(stateWithValidity.cachedValue.state),
          validity: stateWithValidity.cachedValue.validity,
          errorMessages: stateWithValidity.cachedValue.errorMessages
        } : (0, utils_12.deepCopy)(stateWithValidity.cachedValue.state);
      };
    }
    assignRefreshState(executionContext) {
      this.swGlobal.contracts.refreshState = async () => {
        const stateEvaluator = executionContext.warp.stateEvaluator;
        const result = await stateEvaluator.latestAvailableState(this.swGlobal.contract.id, this.swGlobal._activeTx.sortKey);
        return result === null || result === void 0 ? void 0 : result.cachedValue.state;
      };
    }
  };
  AbstractContractHandler.AbstractContractHandler = AbstractContractHandler$1;
  return AbstractContractHandler;
}
var hasRequiredJsHandlerApi;
function requireJsHandlerApi() {
  if (hasRequiredJsHandlerApi)
    return JsHandlerApi;
  hasRequiredJsHandlerApi = 1;
  Object.defineProperty(JsHandlerApi, "__esModule", { value: true });
  JsHandlerApi.JsHandlerApi = void 0;
  const utils_12 = utils$1;
  const AbstractContractHandler_1 = requireAbstractContractHandler();
  let JsHandlerApi$1 = class JsHandlerApi extends AbstractContractHandler_1.AbstractContractHandler {
    constructor(swGlobal, contractDefinition, contractFunction) {
      super(swGlobal, contractDefinition);
      this.contractFunction = contractFunction;
    }
    async handle(executionContext, currentResult, interactionData) {
      const { timeoutId, timeoutPromise } = (0, utils_12.timeout)(executionContext.evaluationOptions.maxInteractionEvaluationTimeSeconds);
      try {
        const { interaction, interactionTx, currentTx } = interactionData;
        const stateCopy = (0, utils_12.deepCopy)(currentResult.state);
        this.swGlobal._activeTx = interactionTx;
        this.swGlobal.caller = interaction.caller;
        this.assignReadContractState(executionContext, currentTx, currentResult, interactionTx);
        this.assignViewContractState(executionContext);
        this.assignWrite(executionContext, currentTx);
        this.assignRefreshState(executionContext);
        const { warp } = executionContext;
        const extensionPlugins = warp.matchPlugins(`^smartweave-extension-`);
        extensionPlugins.forEach((ex) => {
          const extension = warp.loadPlugin(ex);
          extension.process(this.swGlobal.extensions);
        });
        const handlerResult = await Promise.race([timeoutPromise, this.contractFunction(stateCopy, interaction)]);
        if (handlerResult && (handlerResult.state !== void 0 || handlerResult.result !== void 0)) {
          return {
            type: "ok",
            result: handlerResult.result,
            state: handlerResult.state || currentResult.state
          };
        }
        throw new Error(`Unexpected result from contract: ${JSON.stringify(handlerResult)}`);
      } catch (err) {
        switch (err.name) {
          case "ContractError":
            return {
              type: "error",
              errorMessage: err.message,
              state: currentResult.state,
              // note: previous version was writing error message to a "result" field,
              // which fucks-up the HandlerResult type definition -
              // HandlerResult.result had to be declared as 'Result | string' - and that led to a poor dev exp.
              // TODO: this might be breaking change!
              result: null
            };
          default:
            return {
              type: "exception",
              errorMessage: `${err && err.stack || err && err.message || err}`,
              state: currentResult.state,
              result: null
            };
        }
      } finally {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
      }
    }
    initState(state) {
    }
  };
  JsHandlerApi.JsHandlerApi = JsHandlerApi$1;
  return JsHandlerApi;
}
var WasmHandlerApi = {};
var safeStableStringifyExports = {};
var safeStableStringify = {
  get exports() {
    return safeStableStringifyExports;
  },
  set exports(v) {
    safeStableStringifyExports = v;
  }
};
(function(module2, exports2) {
  const { hasOwnProperty } = Object.prototype;
  const stringify = configure();
  stringify.configure = configure;
  stringify.stringify = stringify;
  stringify.default = stringify;
  exports2.stringify = stringify;
  exports2.configure = configure;
  module2.exports = stringify;
  const strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
  const strEscapeSequencesReplacer = new RegExp(strEscapeSequencesRegExp, "g");
  const meta = [
    "\\u0000",
    "\\u0001",
    "\\u0002",
    "\\u0003",
    "\\u0004",
    "\\u0005",
    "\\u0006",
    "\\u0007",
    "\\b",
    "\\t",
    "\\n",
    "\\u000b",
    "\\f",
    "\\r",
    "\\u000e",
    "\\u000f",
    "\\u0010",
    "\\u0011",
    "\\u0012",
    "\\u0013",
    "\\u0014",
    "\\u0015",
    "\\u0016",
    "\\u0017",
    "\\u0018",
    "\\u0019",
    "\\u001a",
    "\\u001b",
    "\\u001c",
    "\\u001d",
    "\\u001e",
    "\\u001f",
    "",
    "",
    '\\"',
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\\\"
  ];
  function escapeFn(str) {
    if (str.length === 2) {
      const charCode2 = str.charCodeAt(1);
      return `${str[0]}\\u${charCode2.toString(16)}`;
    }
    const charCode = str.charCodeAt(0);
    return meta.length > charCode ? meta[charCode] : `\\u${charCode.toString(16)}`;
  }
  function strEscape(str) {
    if (str.length < 5e3 && !strEscapeSequencesRegExp.test(str)) {
      return str;
    }
    if (str.length > 100) {
      return str.replace(strEscapeSequencesReplacer, escapeFn);
    }
    let result = "";
    let last = 0;
    for (let i = 0; i < str.length; i++) {
      const point = str.charCodeAt(i);
      if (point === 34 || point === 92 || point < 32) {
        result += `${str.slice(last, i)}${meta[point]}`;
        last = i + 1;
      } else if (point >= 55296 && point <= 57343) {
        if (point <= 56319 && i + 1 < str.length) {
          const nextPoint = str.charCodeAt(i + 1);
          if (nextPoint >= 56320 && nextPoint <= 57343) {
            i++;
            continue;
          }
        }
        result += `${str.slice(last, i)}\\u${point.toString(16)}`;
        last = i + 1;
      }
    }
    result += str.slice(last);
    return result;
  }
  function insertSort(array) {
    if (array.length > 200) {
      return array.sort();
    }
    for (let i = 1; i < array.length; i++) {
      const currentValue = array[i];
      let position = i;
      while (position !== 0 && array[position - 1] > currentValue) {
        array[position] = array[position - 1];
        position--;
      }
      array[position] = currentValue;
    }
    return array;
  }
  const typedArrayPrototypeGetSymbolToStringTag = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(
      Object.getPrototypeOf(
        new Int8Array()
      )
    ),
    Symbol.toStringTag
  ).get;
  function isTypedArrayWithEntries(value) {
    return typedArrayPrototypeGetSymbolToStringTag.call(value) !== void 0 && value.length !== 0;
  }
  function stringifyTypedArray(array, separator, maximumBreadth) {
    if (array.length < maximumBreadth) {
      maximumBreadth = array.length;
    }
    const whitespace = separator === "," ? "" : " ";
    let res = `"0":${whitespace}${array[0]}`;
    for (let i = 1; i < maximumBreadth; i++) {
      res += `${separator}"${i}":${whitespace}${array[i]}`;
    }
    return res;
  }
  function getCircularValueOption(options) {
    if (hasOwnProperty.call(options, "circularValue")) {
      const circularValue = options.circularValue;
      if (typeof circularValue === "string") {
        return `"${circularValue}"`;
      }
      if (circularValue == null) {
        return circularValue;
      }
      if (circularValue === Error || circularValue === TypeError) {
        return {
          toString() {
            throw new TypeError("Converting circular structure to JSON");
          }
        };
      }
      throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined');
    }
    return '"[Circular]"';
  }
  function getBooleanOption(options, key2) {
    let value;
    if (hasOwnProperty.call(options, key2)) {
      value = options[key2];
      if (typeof value !== "boolean") {
        throw new TypeError(`The "${key2}" argument must be of type boolean`);
      }
    }
    return value === void 0 ? true : value;
  }
  function getPositiveIntegerOption(options, key2) {
    let value;
    if (hasOwnProperty.call(options, key2)) {
      value = options[key2];
      if (typeof value !== "number") {
        throw new TypeError(`The "${key2}" argument must be of type number`);
      }
      if (!Number.isInteger(value)) {
        throw new TypeError(`The "${key2}" argument must be an integer`);
      }
      if (value < 1) {
        throw new RangeError(`The "${key2}" argument must be >= 1`);
      }
    }
    return value === void 0 ? Infinity : value;
  }
  function getItemCount(number) {
    if (number === 1) {
      return "1 item";
    }
    return `${number} items`;
  }
  function getUniqueReplacerSet(replacerArray) {
    const replacerSet = /* @__PURE__ */ new Set();
    for (const value of replacerArray) {
      if (typeof value === "string" || typeof value === "number") {
        replacerSet.add(String(value));
      }
    }
    return replacerSet;
  }
  function getStrictOption(options) {
    if (hasOwnProperty.call(options, "strict")) {
      const value = options.strict;
      if (typeof value !== "boolean") {
        throw new TypeError('The "strict" argument must be of type boolean');
      }
      if (value) {
        return (value2) => {
          let message = `Object can not safely be stringified. Received type ${typeof value2}`;
          if (typeof value2 !== "function")
            message += ` (${value2.toString()})`;
          throw new Error(message);
        };
      }
    }
  }
  function configure(options) {
    options = { ...options };
    const fail = getStrictOption(options);
    if (fail) {
      if (options.bigint === void 0) {
        options.bigint = false;
      }
      if (!("circularValue" in options)) {
        options.circularValue = Error;
      }
    }
    const circularValue = getCircularValueOption(options);
    const bigint = getBooleanOption(options, "bigint");
    const deterministic = getBooleanOption(options, "deterministic");
    const maximumDepth = getPositiveIntegerOption(options, "maximumDepth");
    const maximumBreadth = getPositiveIntegerOption(options, "maximumBreadth");
    function stringifyFnReplacer(key2, parent, stack, replacer, spacer, indentation) {
      let value = parent[key2];
      if (typeof value === "object" && value !== null && typeof value.toJSON === "function") {
        value = value.toJSON(key2);
      }
      value = replacer.call(parent, key2, value);
      switch (typeof value) {
        case "string":
          return `"${strEscape(value)}"`;
        case "object": {
          if (value === null) {
            return "null";
          }
          if (stack.indexOf(value) !== -1) {
            return circularValue;
          }
          let res = "";
          let join = ",";
          const originalIndentation = indentation;
          if (Array.isArray(value)) {
            if (value.length === 0) {
              return "[]";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Array]"';
            }
            stack.push(value);
            if (spacer !== "") {
              indentation += spacer;
              res += `
${indentation}`;
              join = `,
${indentation}`;
            }
            const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
            let i = 0;
            for (; i < maximumValuesToStringify - 1; i++) {
              const tmp2 = stringifyFnReplacer(i, value, stack, replacer, spacer, indentation);
              res += tmp2 !== void 0 ? tmp2 : "null";
              res += join;
            }
            const tmp = stringifyFnReplacer(i, value, stack, replacer, spacer, indentation);
            res += tmp !== void 0 ? tmp : "null";
            if (value.length - 1 > maximumBreadth) {
              const removedKeys = value.length - maximumBreadth - 1;
              res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
            }
            if (spacer !== "") {
              res += `
${originalIndentation}`;
            }
            stack.pop();
            return `[${res}]`;
          }
          let keys = Object.keys(value);
          const keyLength = keys.length;
          if (keyLength === 0) {
            return "{}";
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Object]"';
          }
          let whitespace = "";
          let separator = "";
          if (spacer !== "") {
            indentation += spacer;
            join = `,
${indentation}`;
            whitespace = " ";
          }
          let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
          if (isTypedArrayWithEntries(value)) {
            res += stringifyTypedArray(value, join, maximumBreadth);
            keys = keys.slice(value.length);
            maximumPropertiesToStringify -= value.length;
            separator = join;
          }
          if (deterministic) {
            keys = insertSort(keys);
          }
          stack.push(value);
          for (let i = 0; i < maximumPropertiesToStringify; i++) {
            const key3 = keys[i];
            const tmp = stringifyFnReplacer(key3, value, stack, replacer, spacer, indentation);
            if (tmp !== void 0) {
              res += `${separator}"${strEscape(key3)}":${whitespace}${tmp}`;
              separator = join;
            }
          }
          if (keyLength > maximumBreadth) {
            const removedKeys = keyLength - maximumBreadth;
            res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
            separator = join;
          }
          if (spacer !== "" && separator.length > 1) {
            res = `
${indentation}${res}
${originalIndentation}`;
          }
          stack.pop();
          return `{${res}}`;
        }
        case "number":
          return isFinite(value) ? String(value) : fail ? fail(value) : "null";
        case "boolean":
          return value === true ? "true" : "false";
        case "undefined":
          return void 0;
        case "bigint":
          if (bigint) {
            return String(value);
          }
        default:
          return fail ? fail(value) : void 0;
      }
    }
    function stringifyArrayReplacer(key2, value, stack, replacer, spacer, indentation) {
      if (typeof value === "object" && value !== null && typeof value.toJSON === "function") {
        value = value.toJSON(key2);
      }
      switch (typeof value) {
        case "string":
          return `"${strEscape(value)}"`;
        case "object": {
          if (value === null) {
            return "null";
          }
          if (stack.indexOf(value) !== -1) {
            return circularValue;
          }
          const originalIndentation = indentation;
          let res = "";
          let join = ",";
          if (Array.isArray(value)) {
            if (value.length === 0) {
              return "[]";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Array]"';
            }
            stack.push(value);
            if (spacer !== "") {
              indentation += spacer;
              res += `
${indentation}`;
              join = `,
${indentation}`;
            }
            const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
            let i = 0;
            for (; i < maximumValuesToStringify - 1; i++) {
              const tmp2 = stringifyArrayReplacer(i, value[i], stack, replacer, spacer, indentation);
              res += tmp2 !== void 0 ? tmp2 : "null";
              res += join;
            }
            const tmp = stringifyArrayReplacer(i, value[i], stack, replacer, spacer, indentation);
            res += tmp !== void 0 ? tmp : "null";
            if (value.length - 1 > maximumBreadth) {
              const removedKeys = value.length - maximumBreadth - 1;
              res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
            }
            if (spacer !== "") {
              res += `
${originalIndentation}`;
            }
            stack.pop();
            return `[${res}]`;
          }
          if (replacer.size === 0) {
            return "{}";
          }
          stack.push(value);
          let whitespace = "";
          if (spacer !== "") {
            indentation += spacer;
            join = `,
${indentation}`;
            whitespace = " ";
          }
          let separator = "";
          for (const key3 of replacer) {
            const tmp = stringifyArrayReplacer(key3, value[key3], stack, replacer, spacer, indentation);
            if (tmp !== void 0) {
              res += `${separator}"${strEscape(key3)}":${whitespace}${tmp}`;
              separator = join;
            }
          }
          if (spacer !== "" && separator.length > 1) {
            res = `
${indentation}${res}
${originalIndentation}`;
          }
          stack.pop();
          return `{${res}}`;
        }
        case "number":
          return isFinite(value) ? String(value) : fail ? fail(value) : "null";
        case "boolean":
          return value === true ? "true" : "false";
        case "undefined":
          return void 0;
        case "bigint":
          if (bigint) {
            return String(value);
          }
        default:
          return fail ? fail(value) : void 0;
      }
    }
    function stringifyIndent(key2, value, stack, spacer, indentation) {
      switch (typeof value) {
        case "string":
          return `"${strEscape(value)}"`;
        case "object": {
          if (value === null) {
            return "null";
          }
          if (typeof value.toJSON === "function") {
            value = value.toJSON(key2);
            if (typeof value !== "object") {
              return stringifyIndent(key2, value, stack, spacer, indentation);
            }
            if (value === null) {
              return "null";
            }
          }
          if (stack.indexOf(value) !== -1) {
            return circularValue;
          }
          const originalIndentation = indentation;
          if (Array.isArray(value)) {
            if (value.length === 0) {
              return "[]";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Array]"';
            }
            stack.push(value);
            indentation += spacer;
            let res2 = `
${indentation}`;
            const join2 = `,
${indentation}`;
            const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
            let i = 0;
            for (; i < maximumValuesToStringify - 1; i++) {
              const tmp2 = stringifyIndent(i, value[i], stack, spacer, indentation);
              res2 += tmp2 !== void 0 ? tmp2 : "null";
              res2 += join2;
            }
            const tmp = stringifyIndent(i, value[i], stack, spacer, indentation);
            res2 += tmp !== void 0 ? tmp : "null";
            if (value.length - 1 > maximumBreadth) {
              const removedKeys = value.length - maximumBreadth - 1;
              res2 += `${join2}"... ${getItemCount(removedKeys)} not stringified"`;
            }
            res2 += `
${originalIndentation}`;
            stack.pop();
            return `[${res2}]`;
          }
          let keys = Object.keys(value);
          const keyLength = keys.length;
          if (keyLength === 0) {
            return "{}";
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Object]"';
          }
          indentation += spacer;
          const join = `,
${indentation}`;
          let res = "";
          let separator = "";
          let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
          if (isTypedArrayWithEntries(value)) {
            res += stringifyTypedArray(value, join, maximumBreadth);
            keys = keys.slice(value.length);
            maximumPropertiesToStringify -= value.length;
            separator = join;
          }
          if (deterministic) {
            keys = insertSort(keys);
          }
          stack.push(value);
          for (let i = 0; i < maximumPropertiesToStringify; i++) {
            const key3 = keys[i];
            const tmp = stringifyIndent(key3, value[key3], stack, spacer, indentation);
            if (tmp !== void 0) {
              res += `${separator}"${strEscape(key3)}": ${tmp}`;
              separator = join;
            }
          }
          if (keyLength > maximumBreadth) {
            const removedKeys = keyLength - maximumBreadth;
            res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
            separator = join;
          }
          if (separator !== "") {
            res = `
${indentation}${res}
${originalIndentation}`;
          }
          stack.pop();
          return `{${res}}`;
        }
        case "number":
          return isFinite(value) ? String(value) : fail ? fail(value) : "null";
        case "boolean":
          return value === true ? "true" : "false";
        case "undefined":
          return void 0;
        case "bigint":
          if (bigint) {
            return String(value);
          }
        default:
          return fail ? fail(value) : void 0;
      }
    }
    function stringifySimple(key2, value, stack) {
      switch (typeof value) {
        case "string":
          return `"${strEscape(value)}"`;
        case "object": {
          if (value === null) {
            return "null";
          }
          if (typeof value.toJSON === "function") {
            value = value.toJSON(key2);
            if (typeof value !== "object") {
              return stringifySimple(key2, value, stack);
            }
            if (value === null) {
              return "null";
            }
          }
          if (stack.indexOf(value) !== -1) {
            return circularValue;
          }
          let res = "";
          if (Array.isArray(value)) {
            if (value.length === 0) {
              return "[]";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Array]"';
            }
            stack.push(value);
            const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
            let i = 0;
            for (; i < maximumValuesToStringify - 1; i++) {
              const tmp2 = stringifySimple(i, value[i], stack);
              res += tmp2 !== void 0 ? tmp2 : "null";
              res += ",";
            }
            const tmp = stringifySimple(i, value[i], stack);
            res += tmp !== void 0 ? tmp : "null";
            if (value.length - 1 > maximumBreadth) {
              const removedKeys = value.length - maximumBreadth - 1;
              res += `,"... ${getItemCount(removedKeys)} not stringified"`;
            }
            stack.pop();
            return `[${res}]`;
          }
          let keys = Object.keys(value);
          const keyLength = keys.length;
          if (keyLength === 0) {
            return "{}";
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Object]"';
          }
          let separator = "";
          let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
          if (isTypedArrayWithEntries(value)) {
            res += stringifyTypedArray(value, ",", maximumBreadth);
            keys = keys.slice(value.length);
            maximumPropertiesToStringify -= value.length;
            separator = ",";
          }
          if (deterministic) {
            keys = insertSort(keys);
          }
          stack.push(value);
          for (let i = 0; i < maximumPropertiesToStringify; i++) {
            const key3 = keys[i];
            const tmp = stringifySimple(key3, value[key3], stack);
            if (tmp !== void 0) {
              res += `${separator}"${strEscape(key3)}":${tmp}`;
              separator = ",";
            }
          }
          if (keyLength > maximumBreadth) {
            const removedKeys = keyLength - maximumBreadth;
            res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
          }
          stack.pop();
          return `{${res}}`;
        }
        case "number":
          return isFinite(value) ? String(value) : fail ? fail(value) : "null";
        case "boolean":
          return value === true ? "true" : "false";
        case "undefined":
          return void 0;
        case "bigint":
          if (bigint) {
            return String(value);
          }
        default:
          return fail ? fail(value) : void 0;
      }
    }
    function stringify2(value, replacer, space) {
      if (arguments.length > 1) {
        let spacer = "";
        if (typeof space === "number") {
          spacer = " ".repeat(Math.min(space, 10));
        } else if (typeof space === "string") {
          spacer = space.slice(0, 10);
        }
        if (replacer != null) {
          if (typeof replacer === "function") {
            return stringifyFnReplacer("", { "": value }, [], replacer, spacer, "");
          }
          if (Array.isArray(replacer)) {
            return stringifyArrayReplacer("", value, [], getUniqueReplacerSet(replacer), spacer, "");
          }
        }
        if (spacer.length !== 0) {
          return stringifyIndent("", value, [], spacer, "");
        }
      }
      return stringifySimple("", value, []);
    }
    return stringify2;
  }
})(safeStableStringify, safeStableStringifyExports);
var hasRequiredWasmHandlerApi;
function requireWasmHandlerApi() {
  if (hasRequiredWasmHandlerApi)
    return WasmHandlerApi;
  hasRequiredWasmHandlerApi = 1;
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(WasmHandlerApi, "__esModule", { value: true });
  WasmHandlerApi.WasmHandlerApi = void 0;
  const safe_stable_stringify_1 = __importDefault2(safeStableStringifyExports);
  const AbstractContractHandler_1 = requireAbstractContractHandler();
  let WasmHandlerApi$1 = class WasmHandlerApi extends AbstractContractHandler_1.AbstractContractHandler {
    constructor(swGlobal, contractDefinition, wasmExports) {
      super(swGlobal, contractDefinition);
      this.wasmExports = wasmExports;
    }
    async handle(executionContext, currentResult, interactionData) {
      try {
        const { interaction, interactionTx, currentTx } = interactionData;
        this.swGlobal._activeTx = interactionTx;
        this.swGlobal.caller = interaction.caller;
        this.swGlobal.gasLimit = executionContext.evaluationOptions.gasLimit;
        this.swGlobal.gasUsed = 0;
        this.assignReadContractState(executionContext, currentTx, currentResult, interactionTx);
        this.assignWrite(executionContext, currentTx);
        const handlerResult = await this.doHandle(interaction);
        return {
          type: "ok",
          result: handlerResult,
          state: this.doGetCurrentState(),
          gasUsed: this.swGlobal.gasUsed
        };
      } catch (e) {
        const result = {
          errorMessage: e.message,
          state: currentResult.state,
          result: null
        };
        if (e.message.startsWith("[RE:")) {
          this.logger.fatal(e);
          return {
            ...result,
            type: "exception"
          };
        } else {
          return {
            ...result,
            type: "error"
          };
        }
      }
    }
    initState(state) {
      switch (this.contractDefinition.srcWasmLang) {
        case "assemblyscript": {
          const statePtr = this.wasmExports.__newString((0, safe_stable_stringify_1.default)(state));
          this.wasmExports.initState(statePtr);
          break;
        }
        case "rust": {
          this.wasmExports.initState(state);
          break;
        }
        case "go": {
          this.wasmExports.initState((0, safe_stable_stringify_1.default)(state));
          break;
        }
        default: {
          throw new Error(`Support for ${this.contractDefinition.srcWasmLang} not implemented yet.`);
        }
      }
    }
    async doHandle(action) {
      switch (this.contractDefinition.srcWasmLang) {
        case "assemblyscript": {
          const actionPtr = this.wasmExports.__newString((0, safe_stable_stringify_1.default)(action.input));
          const resultPtr = this.wasmExports.handle(actionPtr);
          const result = this.wasmExports.__getString(resultPtr);
          return JSON.parse(result);
        }
        case "rust": {
          let handleResult2 = await this.wasmExports.handle(action.input);
          if (!handleResult2) {
            return;
          }
          if (Object.prototype.hasOwnProperty.call(handleResult2, "Ok")) {
            return handleResult2.Ok;
          } else {
            this.logger.debug("Error from rust", handleResult2.Err);
            let errorKey;
            let errorArgs = "";
            if (typeof handleResult2.Err === "string" || handleResult2.Err instanceof String) {
              errorKey = handleResult2.Err;
            } else {
              errorKey = Object.keys(handleResult2.Err)[0];
              errorArgs = " " + handleResult2.Err[errorKey];
            }
            if (errorKey == "RuntimeError") {
              throw new Error(`[RE:RE]${errorArgs}`);
            } else {
              throw new Error(`[CE:${errorKey}${errorArgs}]`);
            }
          }
        }
        case "go": {
          const result = await this.wasmExports.handle((0, safe_stable_stringify_1.default)(action.input));
          return JSON.parse(result);
        }
        default: {
          throw new Error(`Support for ${this.contractDefinition.srcWasmLang} not implemented yet.`);
        }
      }
    }
    doGetCurrentState() {
      switch (this.contractDefinition.srcWasmLang) {
        case "assemblyscript": {
          const currentStatePtr = this.wasmExports.currentState();
          return JSON.parse(this.wasmExports.__getString(currentStatePtr));
        }
        case "rust": {
          return this.wasmExports.currentState();
        }
        case "go": {
          const result = this.wasmExports.currentState();
          return JSON.parse(result);
        }
        default: {
          throw new Error(`Support for ${this.contractDefinition.srcWasmLang} not implemented yet.`);
        }
      }
    }
  };
  WasmHandlerApi.WasmHandlerApi = WasmHandlerApi$1;
  return WasmHandlerApi;
}
var normalizeSource = {};
Object.defineProperty(normalizeSource, "__esModule", { value: true });
normalizeSource.normalizeContractSource = void 0;
const utils_1$3 = utils$1;
function normalizeContractSource(contractSrc, useVM2) {
  const lines = contractSrc.trim().split("\n");
  const first = lines[0];
  const last = lines[lines.length - 1];
  if ((/\(\s*\(\)\s*=>\s*{/g.test(first) || /\s*\(\s*function\s*\(\)\s*{/g.test(first)) && /}\s*\)\s*\(\)\s*;/g.test(last)) {
    lines.shift();
    lines.pop();
    contractSrc = lines.join("\n");
  }
  contractSrc = contractSrc.replace(/export\s+async\s+function\s+handle/gmu, "async function handle").replace(/export\s+function\s+handle/gmu, "function handle");
  if (useVM2) {
    return `
    ${contractSrc}
    module.exports = handle;`;
  } else {
    return `
    const window=void 0,document=void 0,Function=void 0,eval=void 0,globalThis=void 0;
    const [SmartWeave, BigNumber, logger${(0, utils_1$3.isBrowser)() ? ", Buffer, atob, btoa" : ""}] = arguments;
    class ContractError extends Error { constructor(message) { super(message); this.name = 'ContractError' } };
    function ContractAssert(cond, message) { if (!cond) throw new ContractError(message) };
    ${contractSrc};
    return handle;
  `;
  }
}
normalizeSource.normalizeContractSource = normalizeContractSource;
var bignumberExports = {};
var bignumber = {
  get exports() {
    return bignumberExports;
  },
  set exports(v) {
    bignumberExports = v;
  }
};
(function(module2) {
  (function(globalObject) {
    var BigNumber, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
    function clone(configObject) {
      var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
        prefix: "",
        groupSize: 3,
        secondaryGroupSize: 0,
        groupSeparator: ",",
        decimalSeparator: ".",
        fractionGroupSize: 0,
        fractionGroupSeparator: " ",
        suffix: ""
      }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
      function BigNumber2(v, b) {
        var alphabet, c, caseChanged, e, i, isNum, len, str, x = this;
        if (!(x instanceof BigNumber2))
          return new BigNumber2(v, b);
        if (b == null) {
          if (v && v._isBigNumber === true) {
            x.s = v.s;
            if (!v.c || v.e > MAX_EXP) {
              x.c = x.e = null;
            } else if (v.e < MIN_EXP) {
              x.c = [x.e = 0];
            } else {
              x.e = v.e;
              x.c = v.c.slice();
            }
            return;
          }
          if ((isNum = typeof v == "number") && v * 0 == 0) {
            x.s = 1 / v < 0 ? (v = -v, -1) : 1;
            if (v === ~~v) {
              for (e = 0, i = v; i >= 10; i /= 10, e++)
                ;
              if (e > MAX_EXP) {
                x.c = x.e = null;
              } else {
                x.e = e;
                x.c = [v];
              }
              return;
            }
            str = String(v);
          } else {
            if (!isNumeric.test(str = String(v)))
              return parseNumeric(x, str, isNum);
            x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
          }
          if ((e = str.indexOf(".")) > -1)
            str = str.replace(".", "");
          if ((i = str.search(/e/i)) > 0) {
            if (e < 0)
              e = i;
            e += +str.slice(i + 1);
            str = str.substring(0, i);
          } else if (e < 0) {
            e = str.length;
          }
        } else {
          intCheck(b, 2, ALPHABET.length, "Base");
          if (b == 10 && alphabetHasNormalDecimalDigits) {
            x = new BigNumber2(v);
            return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
          }
          str = String(v);
          if (isNum = typeof v == "number") {
            if (v * 0 != 0)
              return parseNumeric(x, str, isNum, b);
            x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
            if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
              throw Error(tooManyDigits + v);
            }
          } else {
            x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
          }
          alphabet = ALPHABET.slice(0, b);
          e = i = 0;
          for (len = str.length; i < len; i++) {
            if (alphabet.indexOf(c = str.charAt(i)) < 0) {
              if (c == ".") {
                if (i > e) {
                  e = len;
                  continue;
                }
              } else if (!caseChanged) {
                if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                  caseChanged = true;
                  i = -1;
                  e = 0;
                  continue;
                }
              }
              return parseNumeric(x, String(v), isNum, b);
            }
          }
          isNum = false;
          str = convertBase(str, b, 10, x.s);
          if ((e = str.indexOf(".")) > -1)
            str = str.replace(".", "");
          else
            e = str.length;
        }
        for (i = 0; str.charCodeAt(i) === 48; i++)
          ;
        for (len = str.length; str.charCodeAt(--len) === 48; )
          ;
        if (str = str.slice(i, ++len)) {
          len -= i;
          if (isNum && BigNumber2.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
            throw Error(tooManyDigits + x.s * v);
          }
          if ((e = e - i - 1) > MAX_EXP) {
            x.c = x.e = null;
          } else if (e < MIN_EXP) {
            x.c = [x.e = 0];
          } else {
            x.e = e;
            x.c = [];
            i = (e + 1) % LOG_BASE;
            if (e < 0)
              i += LOG_BASE;
            if (i < len) {
              if (i)
                x.c.push(+str.slice(0, i));
              for (len -= LOG_BASE; i < len; ) {
                x.c.push(+str.slice(i, i += LOG_BASE));
              }
              i = LOG_BASE - (str = str.slice(i)).length;
            } else {
              i -= len;
            }
            for (; i--; str += "0")
              ;
            x.c.push(+str);
          }
        } else {
          x.c = [x.e = 0];
        }
      }
      BigNumber2.clone = clone;
      BigNumber2.ROUND_UP = 0;
      BigNumber2.ROUND_DOWN = 1;
      BigNumber2.ROUND_CEIL = 2;
      BigNumber2.ROUND_FLOOR = 3;
      BigNumber2.ROUND_HALF_UP = 4;
      BigNumber2.ROUND_HALF_DOWN = 5;
      BigNumber2.ROUND_HALF_EVEN = 6;
      BigNumber2.ROUND_HALF_CEIL = 7;
      BigNumber2.ROUND_HALF_FLOOR = 8;
      BigNumber2.EUCLID = 9;
      BigNumber2.config = BigNumber2.set = function(obj) {
        var p, v;
        if (obj != null) {
          if (typeof obj == "object") {
            if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
              v = obj[p];
              intCheck(v, 0, MAX, p);
              DECIMAL_PLACES = v;
            }
            if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
              v = obj[p];
              intCheck(v, 0, 8, p);
              ROUNDING_MODE = v;
            }
            if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
              v = obj[p];
              if (v && v.pop) {
                intCheck(v[0], -MAX, 0, p);
                intCheck(v[1], 0, MAX, p);
                TO_EXP_NEG = v[0];
                TO_EXP_POS = v[1];
              } else {
                intCheck(v, -MAX, MAX, p);
                TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
              }
            }
            if (obj.hasOwnProperty(p = "RANGE")) {
              v = obj[p];
              if (v && v.pop) {
                intCheck(v[0], -MAX, -1, p);
                intCheck(v[1], 1, MAX, p);
                MIN_EXP = v[0];
                MAX_EXP = v[1];
              } else {
                intCheck(v, -MAX, MAX, p);
                if (v) {
                  MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
                } else {
                  throw Error(bignumberError + p + " cannot be zero: " + v);
                }
              }
            }
            if (obj.hasOwnProperty(p = "CRYPTO")) {
              v = obj[p];
              if (v === !!v) {
                if (v) {
                  if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                    CRYPTO = v;
                  } else {
                    CRYPTO = !v;
                    throw Error(bignumberError + "crypto unavailable");
                  }
                } else {
                  CRYPTO = v;
                }
              } else {
                throw Error(bignumberError + p + " not true or false: " + v);
              }
            }
            if (obj.hasOwnProperty(p = "MODULO_MODE")) {
              v = obj[p];
              intCheck(v, 0, 9, p);
              MODULO_MODE = v;
            }
            if (obj.hasOwnProperty(p = "POW_PRECISION")) {
              v = obj[p];
              intCheck(v, 0, MAX, p);
              POW_PRECISION = v;
            }
            if (obj.hasOwnProperty(p = "FORMAT")) {
              v = obj[p];
              if (typeof v == "object")
                FORMAT = v;
              else
                throw Error(bignumberError + p + " not an object: " + v);
            }
            if (obj.hasOwnProperty(p = "ALPHABET")) {
              v = obj[p];
              if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
                alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
                ALPHABET = v;
              } else {
                throw Error(bignumberError + p + " invalid: " + v);
              }
            }
          } else {
            throw Error(bignumberError + "Object expected: " + obj);
          }
        }
        return {
          DECIMAL_PLACES,
          ROUNDING_MODE,
          EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
          RANGE: [MIN_EXP, MAX_EXP],
          CRYPTO,
          MODULO_MODE,
          POW_PRECISION,
          FORMAT,
          ALPHABET
        };
      };
      BigNumber2.isBigNumber = function(v) {
        if (!v || v._isBigNumber !== true)
          return false;
        if (!BigNumber2.DEBUG)
          return true;
        var i, n, c = v.c, e = v.e, s = v.s;
        out:
          if ({}.toString.call(c) == "[object Array]") {
            if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
              if (c[0] === 0) {
                if (e === 0 && c.length === 1)
                  return true;
                break out;
              }
              i = (e + 1) % LOG_BASE;
              if (i < 1)
                i += LOG_BASE;
              if (String(c[0]).length == i) {
                for (i = 0; i < c.length; i++) {
                  n = c[i];
                  if (n < 0 || n >= BASE || n !== mathfloor(n))
                    break out;
                }
                if (n !== 0)
                  return true;
              }
            }
          } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
            return true;
          }
        throw Error(bignumberError + "Invalid BigNumber: " + v);
      };
      BigNumber2.maximum = BigNumber2.max = function() {
        return maxOrMin(arguments, P.lt);
      };
      BigNumber2.minimum = BigNumber2.min = function() {
        return maxOrMin(arguments, P.gt);
      };
      BigNumber2.random = function() {
        var pow2_53 = 9007199254740992;
        var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
          return mathfloor(Math.random() * pow2_53);
        } : function() {
          return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
        };
        return function(dp) {
          var a, b, e, k, v, i = 0, c = [], rand = new BigNumber2(ONE);
          if (dp == null)
            dp = DECIMAL_PLACES;
          else
            intCheck(dp, 0, MAX);
          k = mathceil(dp / LOG_BASE);
          if (CRYPTO) {
            if (crypto.getRandomValues) {
              a = crypto.getRandomValues(new Uint32Array(k *= 2));
              for (; i < k; ) {
                v = a[i] * 131072 + (a[i + 1] >>> 11);
                if (v >= 9e15) {
                  b = crypto.getRandomValues(new Uint32Array(2));
                  a[i] = b[0];
                  a[i + 1] = b[1];
                } else {
                  c.push(v % 1e14);
                  i += 2;
                }
              }
              i = k / 2;
            } else if (crypto.randomBytes) {
              a = crypto.randomBytes(k *= 7);
              for (; i < k; ) {
                v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                if (v >= 9e15) {
                  crypto.randomBytes(7).copy(a, i);
                } else {
                  c.push(v % 1e14);
                  i += 7;
                }
              }
              i = k / 7;
            } else {
              CRYPTO = false;
              throw Error(bignumberError + "crypto unavailable");
            }
          }
          if (!CRYPTO) {
            for (; i < k; ) {
              v = random53bitInt();
              if (v < 9e15)
                c[i++] = v % 1e14;
            }
          }
          k = c[--i];
          dp %= LOG_BASE;
          if (k && dp) {
            v = POWS_TEN[LOG_BASE - dp];
            c[i] = mathfloor(k / v) * v;
          }
          for (; c[i] === 0; c.pop(), i--)
            ;
          if (i < 0) {
            c = [e = 0];
          } else {
            for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE)
              ;
            for (i = 1, v = c[0]; v >= 10; v /= 10, i++)
              ;
            if (i < LOG_BASE)
              e -= LOG_BASE - i;
          }
          rand.e = e;
          rand.c = c;
          return rand;
        };
      }();
      BigNumber2.sum = function() {
        var i = 1, args = arguments, sum = new BigNumber2(args[0]);
        for (; i < args.length; )
          sum = sum.plus(args[i++]);
        return sum;
      };
      convertBase = function() {
        var decimal = "0123456789";
        function toBaseOut(str, baseIn, baseOut, alphabet) {
          var j, arr = [0], arrL, i = 0, len = str.length;
          for (; i < len; ) {
            for (arrL = arr.length; arrL--; arr[arrL] *= baseIn)
              ;
            arr[0] += alphabet.indexOf(str.charAt(i++));
            for (j = 0; j < arr.length; j++) {
              if (arr[j] > baseOut - 1) {
                if (arr[j + 1] == null)
                  arr[j + 1] = 0;
                arr[j + 1] += arr[j] / baseOut | 0;
                arr[j] %= baseOut;
              }
            }
          }
          return arr.reverse();
        }
        return function(str, baseIn, baseOut, sign, callerIsToString) {
          var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
          if (i >= 0) {
            k = POW_PRECISION;
            POW_PRECISION = 0;
            str = str.replace(".", "");
            y = new BigNumber2(baseIn);
            x = y.pow(str.length - i);
            POW_PRECISION = k;
            y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, "0"), 10, baseOut, decimal);
            y.e = y.c.length;
          }
          xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
          e = k = xc.length;
          for (; xc[--k] == 0; xc.pop())
            ;
          if (!xc[0])
            return alphabet.charAt(0);
          if (i < 0) {
            --e;
          } else {
            x.c = xc;
            x.e = e;
            x.s = sign;
            x = div(x, y, dp, rm, baseOut);
            xc = x.c;
            r = x.r;
            e = x.e;
          }
          d = e + dp + 1;
          i = xc[d];
          k = baseOut / 2;
          r = r || d < 0 || xc[d + 1] != null;
          r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
          if (d < 1 || !xc[0]) {
            str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
          } else {
            xc.length = d;
            if (r) {
              for (--baseOut; ++xc[--d] > baseOut; ) {
                xc[d] = 0;
                if (!d) {
                  ++e;
                  xc = [1].concat(xc);
                }
              }
            }
            for (k = xc.length; !xc[--k]; )
              ;
            for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++]))
              ;
            str = toFixedPoint(str, e, alphabet.charAt(0));
          }
          return str;
        };
      }();
      div = function() {
        function multiply(x, k, base) {
          var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
          for (x = x.slice(); i--; ) {
            xlo = x[i] % SQRT_BASE;
            xhi = x[i] / SQRT_BASE | 0;
            m = khi * xlo + xhi * klo;
            temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
            carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
            x[i] = temp % base;
          }
          if (carry)
            x = [carry].concat(x);
          return x;
        }
        function compare3(a, b, aL, bL) {
          var i, cmp;
          if (aL != bL) {
            cmp = aL > bL ? 1 : -1;
          } else {
            for (i = cmp = 0; i < aL; i++) {
              if (a[i] != b[i]) {
                cmp = a[i] > b[i] ? 1 : -1;
                break;
              }
            }
          }
          return cmp;
        }
        function subtract(a, b, aL, base) {
          var i = 0;
          for (; aL--; ) {
            a[aL] -= i;
            i = a[aL] < b[aL] ? 1 : 0;
            a[aL] = i * base + a[aL] - b[aL];
          }
          for (; !a[0] && a.length > 1; a.splice(0, 1))
            ;
        }
        return function(x, y, dp, rm, base) {
          var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
          if (!xc || !xc[0] || !yc || !yc[0]) {
            return new BigNumber2(
              // Return NaN if either NaN, or both Infinity or 0.
              !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
                // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                xc && xc[0] == 0 || !yc ? s * 0 : s / 0
              )
            );
          }
          q = new BigNumber2(s);
          qc = q.c = [];
          e = x.e - y.e;
          s = dp + e + 1;
          if (!base) {
            base = BASE;
            e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
            s = s / LOG_BASE | 0;
          }
          for (i = 0; yc[i] == (xc[i] || 0); i++)
            ;
          if (yc[i] > (xc[i] || 0))
            e--;
          if (s < 0) {
            qc.push(1);
            more = true;
          } else {
            xL = xc.length;
            yL = yc.length;
            i = 0;
            s += 2;
            n = mathfloor(base / (yc[0] + 1));
            if (n > 1) {
              yc = multiply(yc, n, base);
              xc = multiply(xc, n, base);
              yL = yc.length;
              xL = xc.length;
            }
            xi = yL;
            rem = xc.slice(0, yL);
            remL = rem.length;
            for (; remL < yL; rem[remL++] = 0)
              ;
            yz = yc.slice();
            yz = [0].concat(yz);
            yc0 = yc[0];
            if (yc[1] >= base / 2)
              yc0++;
            do {
              n = 0;
              cmp = compare3(yc, rem, yL, remL);
              if (cmp < 0) {
                rem0 = rem[0];
                if (yL != remL)
                  rem0 = rem0 * base + (rem[1] || 0);
                n = mathfloor(rem0 / yc0);
                if (n > 1) {
                  if (n >= base)
                    n = base - 1;
                  prod = multiply(yc, n, base);
                  prodL = prod.length;
                  remL = rem.length;
                  while (compare3(prod, rem, prodL, remL) == 1) {
                    n--;
                    subtract(prod, yL < prodL ? yz : yc, prodL, base);
                    prodL = prod.length;
                    cmp = 1;
                  }
                } else {
                  if (n == 0) {
                    cmp = n = 1;
                  }
                  prod = yc.slice();
                  prodL = prod.length;
                }
                if (prodL < remL)
                  prod = [0].concat(prod);
                subtract(rem, prod, remL, base);
                remL = rem.length;
                if (cmp == -1) {
                  while (compare3(yc, rem, yL, remL) < 1) {
                    n++;
                    subtract(rem, yL < remL ? yz : yc, remL, base);
                    remL = rem.length;
                  }
                }
              } else if (cmp === 0) {
                n++;
                rem = [0];
              }
              qc[i++] = n;
              if (rem[0]) {
                rem[remL++] = xc[xi] || 0;
              } else {
                rem = [xc[xi]];
                remL = 1;
              }
            } while ((xi++ < xL || rem[0] != null) && s--);
            more = rem[0] != null;
            if (!qc[0])
              qc.splice(0, 1);
          }
          if (base == BASE) {
            for (i = 1, s = qc[0]; s >= 10; s /= 10, i++)
              ;
            round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
          } else {
            q.e = e;
            q.r = +more;
          }
          return q;
        };
      }();
      function format(n, i, rm, id) {
        var c0, e, ne, len, str;
        if (rm == null)
          rm = ROUNDING_MODE;
        else
          intCheck(rm, 0, 8);
        if (!n.c)
          return n.toString();
        c0 = n.c[0];
        ne = n.e;
        if (i == null) {
          str = coeffToString(n.c);
          str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
        } else {
          n = round(new BigNumber2(n), i, rm);
          e = n.e;
          str = coeffToString(n.c);
          len = str.length;
          if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
            for (; len < i; str += "0", len++)
              ;
            str = toExponential(str, e);
          } else {
            i -= ne;
            str = toFixedPoint(str, e, "0");
            if (e + 1 > len) {
              if (--i > 0)
                for (str += "."; i--; str += "0")
                  ;
            } else {
              i += e - len;
              if (i > 0) {
                if (e + 1 == len)
                  str += ".";
                for (; i--; str += "0")
                  ;
              }
            }
          }
        }
        return n.s < 0 && c0 ? "-" + str : str;
      }
      function maxOrMin(args, method2) {
        var n, i = 1, m = new BigNumber2(args[0]);
        for (; i < args.length; i++) {
          n = new BigNumber2(args[i]);
          if (!n.s) {
            m = n;
            break;
          } else if (method2.call(m, n)) {
            m = n;
          }
        }
        return m;
      }
      function normalise(n, c, e) {
        var i = 1, j = c.length;
        for (; !c[--j]; c.pop())
          ;
        for (j = c[0]; j >= 10; j /= 10, i++)
          ;
        if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
          n.c = n.e = null;
        } else if (e < MIN_EXP) {
          n.c = [n.e = 0];
        } else {
          n.e = e;
          n.c = c;
        }
        return n;
      }
      parseNumeric = function() {
        var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
        return function(x, str, isNum, b) {
          var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
          if (isInfinityOrNaN.test(s)) {
            x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
          } else {
            if (!isNum) {
              s = s.replace(basePrefix, function(m, p1, p2) {
                base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                return !b || b == base ? p1 : m;
              });
              if (b) {
                base = b;
                s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
              }
              if (str != s)
                return new BigNumber2(s, base);
            }
            if (BigNumber2.DEBUG) {
              throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
            }
            x.s = null;
          }
          x.c = x.e = null;
        };
      }();
      function round(x, sd, rm, r) {
        var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
        if (xc) {
          out: {
            for (d = 1, k = xc[0]; k >= 10; k /= 10, d++)
              ;
            i = sd - d;
            if (i < 0) {
              i += LOG_BASE;
              j = sd;
              n = xc[ni = 0];
              rd = n / pows10[d - j - 1] % 10 | 0;
            } else {
              ni = mathceil((i + 1) / LOG_BASE);
              if (ni >= xc.length) {
                if (r) {
                  for (; xc.length <= ni; xc.push(0))
                    ;
                  n = rd = 0;
                  d = 1;
                  i %= LOG_BASE;
                  j = i - LOG_BASE + 1;
                } else {
                  break out;
                }
              } else {
                n = k = xc[ni];
                for (d = 1; k >= 10; k /= 10, d++)
                  ;
                i %= LOG_BASE;
                j = i - LOG_BASE + d;
                rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
              }
            }
            r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
            // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
            // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
            xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
            r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
            (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
            if (sd < 1 || !xc[0]) {
              xc.length = 0;
              if (r) {
                sd -= x.e + 1;
                xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                x.e = -sd || 0;
              } else {
                xc[0] = x.e = 0;
              }
              return x;
            }
            if (i == 0) {
              xc.length = ni;
              k = 1;
              ni--;
            } else {
              xc.length = ni + 1;
              k = pows10[LOG_BASE - i];
              xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
            }
            if (r) {
              for (; ; ) {
                if (ni == 0) {
                  for (i = 1, j = xc[0]; j >= 10; j /= 10, i++)
                    ;
                  j = xc[0] += k;
                  for (k = 1; j >= 10; j /= 10, k++)
                    ;
                  if (i != k) {
                    x.e++;
                    if (xc[0] == BASE)
                      xc[0] = 1;
                  }
                  break;
                } else {
                  xc[ni] += k;
                  if (xc[ni] != BASE)
                    break;
                  xc[ni--] = 0;
                  k = 1;
                }
              }
            }
            for (i = xc.length; xc[--i] === 0; xc.pop())
              ;
          }
          if (x.e > MAX_EXP) {
            x.c = x.e = null;
          } else if (x.e < MIN_EXP) {
            x.c = [x.e = 0];
          }
        }
        return x;
      }
      function valueOf(n) {
        var str, e = n.e;
        if (e === null)
          return n.toString();
        str = coeffToString(n.c);
        str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
        return n.s < 0 ? "-" + str : str;
      }
      P.absoluteValue = P.abs = function() {
        var x = new BigNumber2(this);
        if (x.s < 0)
          x.s = 1;
        return x;
      };
      P.comparedTo = function(y, b) {
        return compare2(this, new BigNumber2(y, b));
      };
      P.decimalPlaces = P.dp = function(dp, rm) {
        var c, n, v, x = this;
        if (dp != null) {
          intCheck(dp, 0, MAX);
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          return round(new BigNumber2(x), dp + x.e + 1, rm);
        }
        if (!(c = x.c))
          return null;
        n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
        if (v = c[v])
          for (; v % 10 == 0; v /= 10, n--)
            ;
        if (n < 0)
          n = 0;
        return n;
      };
      P.dividedBy = P.div = function(y, b) {
        return div(this, new BigNumber2(y, b), DECIMAL_PLACES, ROUNDING_MODE);
      };
      P.dividedToIntegerBy = P.idiv = function(y, b) {
        return div(this, new BigNumber2(y, b), 0, 1);
      };
      P.exponentiatedBy = P.pow = function(n, m) {
        var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
        n = new BigNumber2(n);
        if (n.c && !n.isInteger()) {
          throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
        }
        if (m != null)
          m = new BigNumber2(m);
        nIsBig = n.e > 14;
        if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
          y = new BigNumber2(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
          return m ? y.mod(m) : y;
        }
        nIsNeg = n.s < 0;
        if (m) {
          if (m.c ? !m.c[0] : !m.s)
            return new BigNumber2(NaN);
          isModExp = !nIsNeg && x.isInteger() && m.isInteger();
          if (isModExp)
            x = x.mod(m);
        } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
          k = x.s < 0 && isOdd(n) ? -0 : 0;
          if (x.e > -1)
            k = 1 / k;
          return new BigNumber2(nIsNeg ? 1 / k : k);
        } else if (POW_PRECISION) {
          k = mathceil(POW_PRECISION / LOG_BASE + 2);
        }
        if (nIsBig) {
          half = new BigNumber2(0.5);
          if (nIsNeg)
            n.s = 1;
          nIsOdd = isOdd(n);
        } else {
          i = Math.abs(+valueOf(n));
          nIsOdd = i % 2;
        }
        y = new BigNumber2(ONE);
        for (; ; ) {
          if (nIsOdd) {
            y = y.times(x);
            if (!y.c)
              break;
            if (k) {
              if (y.c.length > k)
                y.c.length = k;
            } else if (isModExp) {
              y = y.mod(m);
            }
          }
          if (i) {
            i = mathfloor(i / 2);
            if (i === 0)
              break;
            nIsOdd = i % 2;
          } else {
            n = n.times(half);
            round(n, n.e + 1, 1);
            if (n.e > 14) {
              nIsOdd = isOdd(n);
            } else {
              i = +valueOf(n);
              if (i === 0)
                break;
              nIsOdd = i % 2;
            }
          }
          x = x.times(x);
          if (k) {
            if (x.c && x.c.length > k)
              x.c.length = k;
          } else if (isModExp) {
            x = x.mod(m);
          }
        }
        if (isModExp)
          return y;
        if (nIsNeg)
          y = ONE.div(y);
        return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
      };
      P.integerValue = function(rm) {
        var n = new BigNumber2(this);
        if (rm == null)
          rm = ROUNDING_MODE;
        else
          intCheck(rm, 0, 8);
        return round(n, n.e + 1, rm);
      };
      P.isEqualTo = P.eq = function(y, b) {
        return compare2(this, new BigNumber2(y, b)) === 0;
      };
      P.isFinite = function() {
        return !!this.c;
      };
      P.isGreaterThan = P.gt = function(y, b) {
        return compare2(this, new BigNumber2(y, b)) > 0;
      };
      P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
        return (b = compare2(this, new BigNumber2(y, b))) === 1 || b === 0;
      };
      P.isInteger = function() {
        return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
      };
      P.isLessThan = P.lt = function(y, b) {
        return compare2(this, new BigNumber2(y, b)) < 0;
      };
      P.isLessThanOrEqualTo = P.lte = function(y, b) {
        return (b = compare2(this, new BigNumber2(y, b))) === -1 || b === 0;
      };
      P.isNaN = function() {
        return !this.s;
      };
      P.isNegative = function() {
        return this.s < 0;
      };
      P.isPositive = function() {
        return this.s > 0;
      };
      P.isZero = function() {
        return !!this.c && this.c[0] == 0;
      };
      P.minus = function(y, b) {
        var i, j, t, xLTy, x = this, a = x.s;
        y = new BigNumber2(y, b);
        b = y.s;
        if (!a || !b)
          return new BigNumber2(NaN);
        if (a != b) {
          y.s = -b;
          return x.plus(y);
        }
        var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
        if (!xe || !ye) {
          if (!xc || !yc)
            return xc ? (y.s = -b, y) : new BigNumber2(yc ? x : NaN);
          if (!xc[0] || !yc[0]) {
            return yc[0] ? (y.s = -b, y) : new BigNumber2(xc[0] ? x : (
              // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
              ROUNDING_MODE == 3 ? -0 : 0
            ));
          }
        }
        xe = bitFloor(xe);
        ye = bitFloor(ye);
        xc = xc.slice();
        if (a = xe - ye) {
          if (xLTy = a < 0) {
            a = -a;
            t = xc;
          } else {
            ye = xe;
            t = yc;
          }
          t.reverse();
          for (b = a; b--; t.push(0))
            ;
          t.reverse();
        } else {
          j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
          for (a = b = 0; b < j; b++) {
            if (xc[b] != yc[b]) {
              xLTy = xc[b] < yc[b];
              break;
            }
          }
        }
        if (xLTy) {
          t = xc;
          xc = yc;
          yc = t;
          y.s = -y.s;
        }
        b = (j = yc.length) - (i = xc.length);
        if (b > 0)
          for (; b--; xc[i++] = 0)
            ;
        b = BASE - 1;
        for (; j > a; ) {
          if (xc[--j] < yc[j]) {
            for (i = j; i && !xc[--i]; xc[i] = b)
              ;
            --xc[i];
            xc[j] += BASE;
          }
          xc[j] -= yc[j];
        }
        for (; xc[0] == 0; xc.splice(0, 1), --ye)
          ;
        if (!xc[0]) {
          y.s = ROUNDING_MODE == 3 ? -1 : 1;
          y.c = [y.e = 0];
          return y;
        }
        return normalise(y, xc, ye);
      };
      P.modulo = P.mod = function(y, b) {
        var q, s, x = this;
        y = new BigNumber2(y, b);
        if (!x.c || !y.s || y.c && !y.c[0]) {
          return new BigNumber2(NaN);
        } else if (!y.c || x.c && !x.c[0]) {
          return new BigNumber2(x);
        }
        if (MODULO_MODE == 9) {
          s = y.s;
          y.s = 1;
          q = div(x, y, 0, 3);
          y.s = s;
          q.s *= s;
        } else {
          q = div(x, y, 0, MODULO_MODE);
        }
        y = x.minus(q.times(y));
        if (!y.c[0] && MODULO_MODE == 1)
          y.s = x.s;
        return y;
      };
      P.multipliedBy = P.times = function(y, b) {
        var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber2(y, b)).c;
        if (!xc || !yc || !xc[0] || !yc[0]) {
          if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
            y.c = y.e = y.s = null;
          } else {
            y.s *= x.s;
            if (!xc || !yc) {
              y.c = y.e = null;
            } else {
              y.c = [0];
              y.e = 0;
            }
          }
          return y;
        }
        e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
        y.s *= x.s;
        xcL = xc.length;
        ycL = yc.length;
        if (xcL < ycL) {
          zc = xc;
          xc = yc;
          yc = zc;
          i = xcL;
          xcL = ycL;
          ycL = i;
        }
        for (i = xcL + ycL, zc = []; i--; zc.push(0))
          ;
        base = BASE;
        sqrtBase = SQRT_BASE;
        for (i = ycL; --i >= 0; ) {
          c = 0;
          ylo = yc[i] % sqrtBase;
          yhi = yc[i] / sqrtBase | 0;
          for (k = xcL, j = i + k; j > i; ) {
            xlo = xc[--k] % sqrtBase;
            xhi = xc[k] / sqrtBase | 0;
            m = yhi * xlo + xhi * ylo;
            xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
            c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
            zc[j--] = xlo % base;
          }
          zc[j] = c;
        }
        if (c) {
          ++e;
        } else {
          zc.splice(0, 1);
        }
        return normalise(y, zc, e);
      };
      P.negated = function() {
        var x = new BigNumber2(this);
        x.s = -x.s || null;
        return x;
      };
      P.plus = function(y, b) {
        var t, x = this, a = x.s;
        y = new BigNumber2(y, b);
        b = y.s;
        if (!a || !b)
          return new BigNumber2(NaN);
        if (a != b) {
          y.s = -b;
          return x.minus(y);
        }
        var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
        if (!xe || !ye) {
          if (!xc || !yc)
            return new BigNumber2(a / 0);
          if (!xc[0] || !yc[0])
            return yc[0] ? y : new BigNumber2(xc[0] ? x : a * 0);
        }
        xe = bitFloor(xe);
        ye = bitFloor(ye);
        xc = xc.slice();
        if (a = xe - ye) {
          if (a > 0) {
            ye = xe;
            t = yc;
          } else {
            a = -a;
            t = xc;
          }
          t.reverse();
          for (; a--; t.push(0))
            ;
          t.reverse();
        }
        a = xc.length;
        b = yc.length;
        if (a - b < 0) {
          t = yc;
          yc = xc;
          xc = t;
          b = a;
        }
        for (a = 0; b; ) {
          a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
          xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
        }
        if (a) {
          xc = [a].concat(xc);
          ++ye;
        }
        return normalise(y, xc, ye);
      };
      P.precision = P.sd = function(sd, rm) {
        var c, n, v, x = this;
        if (sd != null && sd !== !!sd) {
          intCheck(sd, 1, MAX);
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          return round(new BigNumber2(x), sd, rm);
        }
        if (!(c = x.c))
          return null;
        v = c.length - 1;
        n = v * LOG_BASE + 1;
        if (v = c[v]) {
          for (; v % 10 == 0; v /= 10, n--)
            ;
          for (v = c[0]; v >= 10; v /= 10, n++)
            ;
        }
        if (sd && x.e + 1 > n)
          n = x.e + 1;
        return n;
      };
      P.shiftedBy = function(k) {
        intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
        return this.times("1e" + k);
      };
      P.squareRoot = P.sqrt = function() {
        var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
        if (s !== 1 || !c || !c[0]) {
          return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
        }
        s = Math.sqrt(+valueOf(x));
        if (s == 0 || s == 1 / 0) {
          n = coeffToString(c);
          if ((n.length + e) % 2 == 0)
            n += "0";
          s = Math.sqrt(+n);
          e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
          if (s == 1 / 0) {
            n = "5e" + e;
          } else {
            n = s.toExponential();
            n = n.slice(0, n.indexOf("e") + 1) + e;
          }
          r = new BigNumber2(n);
        } else {
          r = new BigNumber2(s + "");
        }
        if (r.c[0]) {
          e = r.e;
          s = e + dp;
          if (s < 3)
            s = 0;
          for (; ; ) {
            t = r;
            r = half.times(t.plus(div(x, t, dp, 1)));
            if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
              if (r.e < e)
                --s;
              n = n.slice(s - 3, s + 1);
              if (n == "9999" || !rep && n == "4999") {
                if (!rep) {
                  round(t, t.e + DECIMAL_PLACES + 2, 0);
                  if (t.times(t).eq(x)) {
                    r = t;
                    break;
                  }
                }
                dp += 4;
                s += 4;
                rep = 1;
              } else {
                if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                  round(r, r.e + DECIMAL_PLACES + 2, 1);
                  m = !r.times(r).eq(x);
                }
                break;
              }
            }
          }
        }
        return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
      };
      P.toExponential = function(dp, rm) {
        if (dp != null) {
          intCheck(dp, 0, MAX);
          dp++;
        }
        return format(this, dp, rm, 1);
      };
      P.toFixed = function(dp, rm) {
        if (dp != null) {
          intCheck(dp, 0, MAX);
          dp = dp + this.e + 1;
        }
        return format(this, dp, rm);
      };
      P.toFormat = function(dp, rm, format2) {
        var str, x = this;
        if (format2 == null) {
          if (dp != null && rm && typeof rm == "object") {
            format2 = rm;
            rm = null;
          } else if (dp && typeof dp == "object") {
            format2 = dp;
            dp = rm = null;
          } else {
            format2 = FORMAT;
          }
        } else if (typeof format2 != "object") {
          throw Error(bignumberError + "Argument not an object: " + format2);
        }
        str = x.toFixed(dp, rm);
        if (x.c) {
          var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
          if (g2) {
            i = g1;
            g1 = g2;
            g2 = i;
            len -= i;
          }
          if (g1 > 0 && len > 0) {
            i = len % g1 || g1;
            intPart = intDigits.substr(0, i);
            for (; i < len; i += g1)
              intPart += groupSeparator + intDigits.substr(i, g1);
            if (g2 > 0)
              intPart += groupSeparator + intDigits.slice(i);
            if (isNeg)
              intPart = "-" + intPart;
          }
          str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(new RegExp("\\d{" + g2 + "}\\B", "g"), "$&" + (format2.fractionGroupSeparator || "")) : fractionPart) : intPart;
        }
        return (format2.prefix || "") + str + (format2.suffix || "");
      };
      P.toFraction = function(md) {
        var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
        if (md != null) {
          n = new BigNumber2(md);
          if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
            throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
          }
        }
        if (!xc)
          return new BigNumber2(x);
        d = new BigNumber2(ONE);
        n1 = d0 = new BigNumber2(ONE);
        d1 = n0 = new BigNumber2(ONE);
        s = coeffToString(xc);
        e = d.e = s.length - x.e - 1;
        d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
        md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
        exp = MAX_EXP;
        MAX_EXP = 1 / 0;
        n = new BigNumber2(s);
        n0.c[0] = 0;
        for (; ; ) {
          q = div(n, d, 0, 1);
          d2 = d0.plus(q.times(d1));
          if (d2.comparedTo(md) == 1)
            break;
          d0 = d1;
          d1 = d2;
          n1 = n0.plus(q.times(d2 = n1));
          n0 = d2;
          d = n.minus(q.times(d2 = d));
          n = d2;
        }
        d2 = div(md.minus(d0), d1, 0, 1);
        n0 = n0.plus(d2.times(n1));
        d0 = d0.plus(d2.times(d1));
        n0.s = n1.s = x.s;
        e = e * 2;
        r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
        MAX_EXP = exp;
        return r;
      };
      P.toNumber = function() {
        return +valueOf(this);
      };
      P.toPrecision = function(sd, rm) {
        if (sd != null)
          intCheck(sd, 1, MAX);
        return format(this, sd, rm, 2);
      };
      P.toString = function(b) {
        var str, n = this, s = n.s, e = n.e;
        if (e === null) {
          if (s) {
            str = "Infinity";
            if (s < 0)
              str = "-" + str;
          } else {
            str = "NaN";
          }
        } else {
          if (b == null) {
            str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
          } else if (b === 10 && alphabetHasNormalDecimalDigits) {
            n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
            str = toFixedPoint(coeffToString(n.c), n.e, "0");
          } else {
            intCheck(b, 2, ALPHABET.length, "Base");
            str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
          }
          if (s < 0 && n.c[0])
            str = "-" + str;
        }
        return str;
      };
      P.valueOf = P.toJSON = function() {
        return valueOf(this);
      };
      P._isBigNumber = true;
      if (configObject != null)
        BigNumber2.set(configObject);
      return BigNumber2;
    }
    function bitFloor(n) {
      var i = n | 0;
      return n > 0 || n === i ? i : i - 1;
    }
    function coeffToString(a) {
      var s, z, i = 1, j = a.length, r = a[0] + "";
      for (; i < j; ) {
        s = a[i++] + "";
        z = LOG_BASE - s.length;
        for (; z--; s = "0" + s)
          ;
        r += s;
      }
      for (j = r.length; r.charCodeAt(--j) === 48; )
        ;
      return r.slice(0, j + 1 || 1);
    }
    function compare2(x, y) {
      var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
      if (!i || !j)
        return null;
      a = xc && !xc[0];
      b = yc && !yc[0];
      if (a || b)
        return a ? b ? 0 : -j : i;
      if (i != j)
        return i;
      a = i < 0;
      b = k == l;
      if (!xc || !yc)
        return b ? 0 : !xc ^ a ? 1 : -1;
      if (!b)
        return k > l ^ a ? 1 : -1;
      j = (k = xc.length) < (l = yc.length) ? k : l;
      for (i = 0; i < j; i++)
        if (xc[i] != yc[i])
          return xc[i] > yc[i] ^ a ? 1 : -1;
      return k == l ? 0 : k > l ^ a ? 1 : -1;
    }
    function intCheck(n, min, max, name) {
      if (n < min || n > max || n !== mathfloor(n)) {
        throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
      }
    }
    function isOdd(n) {
      var k = n.c.length - 1;
      return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
    }
    function toExponential(str, e) {
      return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
    }
    function toFixedPoint(str, e, z) {
      var len, zs;
      if (e < 0) {
        for (zs = z + "."; ++e; zs += z)
          ;
        str = zs + str;
      } else {
        len = str.length;
        if (++e > len) {
          for (zs = z, e -= len; --e; zs += z)
            ;
          str += zs;
        } else if (e < len) {
          str = str.slice(0, e) + "." + str.slice(e);
        }
      }
      return str;
    }
    BigNumber = clone();
    BigNumber["default"] = BigNumber.BigNumber = BigNumber;
    if (module2.exports) {
      module2.exports = BigNumber;
    } else {
      if (!globalObject) {
        globalObject = typeof self != "undefined" && self ? self : window;
      }
      globalObject.BigNumber = BigNumber;
    }
  })(commonjsGlobal);
})(bignumber);
var hasRequiredHandlerExecutorFactory;
function requireHandlerExecutorFactory() {
  if (hasRequiredHandlerExecutorFactory)
    return HandlerExecutorFactory;
  hasRequiredHandlerExecutorFactory = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(HandlerExecutorFactory, "__esModule", { value: true });
  HandlerExecutorFactory.HandlerExecutorFactory = HandlerExecutorFactory.ContractError = void 0;
  const loader_1 = __importDefault2(umdExports);
  const as_wasm_imports_1 = asWasmImports$1;
  const rust_wasm_imports_1 = rustWasmImports$1;
  const go_wasm_imports_1 = goWasmImports;
  const vm2 = __importStar2(require$$1);
  const smartweave_global_1 = smartweaveGlobal;
  const Benchmark_12 = Benchmark$1;
  const LoggerFactory_12 = LoggerFactory$1;
  const JsHandlerApi_1 = requireJsHandlerApi();
  const WasmHandlerApi_1 = requireWasmHandlerApi();
  const normalize_source_1 = normalizeSource;
  const MemCache_1 = MemCache$1;
  const bignumber_1 = __importDefault2(bignumberExports);
  const utils_12 = utils$1;
  const redstone_isomorphic_12 = npmBrowser$1;
  class ContractError extends Error {
    constructor(message, subtype) {
      super(message);
      this.subtype = subtype;
      this.name = "ContractError";
    }
  }
  HandlerExecutorFactory.ContractError = ContractError;
  let HandlerExecutorFactory$1 = class HandlerExecutorFactory {
    constructor(arweave) {
      this.arweave = arweave;
      this.logger = LoggerFactory_12.LoggerFactory.INST.create("HandlerExecutorFactory");
      this.cache = new MemCache_1.MemCache();
    }
    async create(contractDefinition, evaluationOptions, warp) {
      const swGlobal = new smartweave_global_1.SmartWeaveGlobal(this.arweave, {
        id: contractDefinition.txId,
        owner: contractDefinition.owner
      }, evaluationOptions);
      if (contractDefinition.contractType == "wasm") {
        this.logger.info("Creating handler for wasm contract", contractDefinition.txId);
        const benchmark = Benchmark_12.Benchmark.measure();
        let wasmInstance;
        let jsExports = null;
        const wasmResponse = generateResponse(contractDefinition.srcBinary);
        switch (contractDefinition.srcWasmLang) {
          case "assemblyscript": {
            const wasmInstanceExports = {
              exports: null
            };
            wasmInstance = await loader_1.default.instantiateStreaming(wasmResponse, (0, as_wasm_imports_1.asWasmImports)(swGlobal, wasmInstanceExports));
            wasmInstanceExports.exports = wasmInstance.exports;
            break;
          }
          case "rust": {
            const wasmInstanceExports = {
              exports: null,
              modifiedExports: {
                wasm_bindgen__convert__closures__invoke2_mut__: null,
                _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__: null
              }
            };
            const wasmModule = await getWasmModule(wasmResponse, contractDefinition.srcBinary);
            const moduleImports = WebAssembly.Module.imports(wasmModule);
            const wbindgenImports = moduleImports.filter((imp) => {
              return imp.module === "__wbindgen_placeholder__";
            }).map((imp) => imp.name);
            const { imports, exports: exports2 } = (0, rust_wasm_imports_1.rustWasmImports)(swGlobal, wbindgenImports, wasmInstanceExports, contractDefinition.metadata.dtor);
            jsExports = exports2;
            wasmInstance = await WebAssembly.instantiate(wasmModule, imports);
            wasmInstanceExports.exports = wasmInstance.exports;
            const moduleExports = Object.keys(wasmInstance.exports);
            moduleExports.forEach((moduleExport) => {
              if (moduleExport.startsWith("wasm_bindgen__convert__closures__invoke2_mut__")) {
                wasmInstanceExports.modifiedExports.wasm_bindgen__convert__closures__invoke2_mut__ = wasmInstance.exports[moduleExport];
              }
              if (moduleExport.startsWith("_dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__")) {
                wasmInstanceExports.modifiedExports._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__ = wasmInstance.exports[moduleExport];
              }
            });
            break;
          }
          case "go": {
            const go = new go_wasm_imports_1.Go(swGlobal);
            go.importObject.metering = {
              usegas: function(value) {
                swGlobal.useGas(value);
              }
            };
            const wasmModule = await getWasmModule(wasmResponse, contractDefinition.srcBinary);
            wasmInstance = await WebAssembly.instantiate(wasmModule, go.importObject);
            go.run(wasmInstance);
            jsExports = go.exports;
            break;
          }
          default: {
            throw new Error(`Support for ${contractDefinition.srcWasmLang} not implemented yet.`);
          }
        }
        this.logger.info(`WASM ${contractDefinition.srcWasmLang} handler created in ${benchmark.elapsed()}`);
        return new WasmHandlerApi_1.WasmHandlerApi(swGlobal, contractDefinition, jsExports || wasmInstance.exports);
      } else {
        const normalizedSource = (0, normalize_source_1.normalizeContractSource)(contractDefinition.src, evaluationOptions.useVM2);
        if (normalizedSource.includes("unsafeClient")) {
          switch (evaluationOptions.unsafeClient) {
            case "allow": {
              this.logger.warn(`Reading unsafe contract ${contractDefinition.txId}, evaluation is non-deterministic!`);
              break;
            }
            case "throw":
              throw new Error(`[SkipUnsafeError] Using unsafeClient is not allowed by default. Use EvaluationOptions.unsafeClient flag to evaluate ${contractDefinition.txId}.`);
            case "skip": {
              throw new ContractError(`[SkipUnsafeError] Skipping evaluation of the unsafe contract ${contractDefinition.txId}.`, "unsafeClientSkip");
            }
            default:
              throw new Error(`Unknown unsafeClient setting ${evaluationOptions.unsafeClient}`);
          }
        }
        if (!evaluationOptions.allowBigInt) {
          if (normalizedSource.includes("BigInt")) {
            throw new Error("Using BigInt is not allowed by default. Use EvaluationOptions.allowBigInt flag.");
          }
        }
        if (evaluationOptions.useVM2) {
          const vmScript = new vm2.VMScript(normalizedSource);
          const typedArrays = {
            Int8Array,
            Uint8Array,
            Uint8ClampedArray,
            Int16Array,
            Uint16Array,
            Int32Array,
            Uint32Array,
            Float32Array,
            Float64Array,
            BigInt64Array,
            BigUint64Array
          };
          const vm = new vm2.NodeVM({
            console: "off",
            sandbox: {
              SmartWeave: swGlobal,
              BigNumber: bignumber_1.default,
              logger: this.logger,
              ContractError,
              ContractAssert: function(cond, message) {
                if (!cond)
                  throw new ContractError(message);
              },
              //https://github.com/patriksimek/vm2/issues/484#issuecomment-1327479592
              ...typedArrays
            },
            compiler: "javascript",
            eval: false,
            wasm: false,
            allowAsync: true,
            wrapper: "commonjs"
          });
          return new JsHandlerApi_1.JsHandlerApi(swGlobal, contractDefinition, vm.run(vmScript));
        } else if (warp.hasPlugin("ivm-handler-api")) {
          const ivmPlugin = warp.loadPlugin("ivm-handler-api");
          return ivmPlugin.process({
            contractSource: contractDefinition.src,
            evaluationOptions,
            arweave: this.arweave,
            swGlobal,
            contractDefinition
          });
        } else {
          const contractFunction = new Function(normalizedSource);
          const handler = (0, utils_12.isBrowser)() ? contractFunction(swGlobal, bignumber_1.default, LoggerFactory_12.LoggerFactory.INST.create(swGlobal.contract.id), redstone_isomorphic_12.Buffer, atob, btoa) : contractFunction(swGlobal, bignumber_1.default, LoggerFactory_12.LoggerFactory.INST.create(swGlobal.contract.id));
          return new JsHandlerApi_1.JsHandlerApi(swGlobal, contractDefinition, handler);
        }
      }
    }
  };
  HandlerExecutorFactory.HandlerExecutorFactory = HandlerExecutorFactory$1;
  function generateResponse(wasmBinary) {
    const init = { status: 200, statusText: "OK", headers: { "Content-Type": "application/wasm" } };
    return new Response(wasmBinary, init);
  }
  async function getWasmModule(wasmResponse, binary) {
    if (WebAssembly.compileStreaming) {
      return await WebAssembly.compileStreaming(wasmResponse);
    } else {
      return await WebAssembly.compile(binary);
    }
  }
  return HandlerExecutorFactory;
}
var Warp = {};
var DefaultCreateContract = {};
var WarpFetchWrapper$1 = {};
Object.defineProperty(WarpFetchWrapper$1, "__esModule", { value: true });
WarpFetchWrapper$1.WarpFetchWrapper = void 0;
const LoggerFactory_1$2 = LoggerFactory$1;
class WarpFetchWrapper {
  constructor(warp) {
    this.warp = warp;
    this.name = "WarpFetchWrapper";
    this.logger = LoggerFactory_1$2.LoggerFactory.INST.create(this.name);
    this.warp = warp;
  }
  fetch(input, init) {
    let fetchOptions;
    if (this.warp.hasPlugin("fetch-options")) {
      const fetchOptionsPlugin = this.warp.loadPlugin("fetch-options");
      try {
        const updatedFetchOptions = fetchOptionsPlugin.process({ input, init: init || {} });
        fetchOptions = { ...init, ...updatedFetchOptions };
      } catch (e) {
        if (e.message) {
          this.logger.error(e.message);
        }
        throw new Error(`Unable to process fetch options: ${e.message}`);
      }
    } else {
      fetchOptions = init;
    }
    return fetch(input, fetchOptions);
  }
}
WarpFetchWrapper$1.WarpFetchWrapper = WarpFetchWrapper;
var Signature$1 = {};
Object.defineProperty(Signature$1, "__esModule", { value: true });
Signature$1.Signature = void 0;
class Signature {
  constructor(warp, walletOrSignature) {
    this.warp = warp;
    if (this.isCustomSignature(walletOrSignature)) {
      this.assertEnvForCustomSigner(walletOrSignature);
      this.signer = walletOrSignature.signer;
      this.type = walletOrSignature.type;
    } else {
      this.assignDefaultSigner(walletOrSignature);
    }
  }
  checkNonArweaveSigningAvailability(bundling) {
    if (this.type !== "arweave" && !bundling) {
      throw new Error(`Unable to use signing function of type: ${this.type} when bundling is disabled.`);
    }
  }
  assignDefaultSigner(walletOrSignature) {
    this.signer = async (tx) => {
      await this.warp.arweave.transactions.sign(tx, walletOrSignature);
    };
    this.type = "arweave";
  }
  assertEnvForCustomSigner(walletOrSignature) {
    if (walletOrSignature.type !== "arweave" && (!(this.warp.environment == "mainnet") || !(this.warp.interactionsLoader.type() == "warp"))) {
      throw new Error(`Unable to use signing function of type: ${walletOrSignature.type} when not in mainnet environment or bundling is disabled.`);
    }
  }
  isCustomSignature(signature) {
    return signature.signer !== void 0;
  }
}
Signature$1.Signature = Signature;
var CreateContract = {};
Object.defineProperty(CreateContract, "__esModule", { value: true });
CreateContract.BUNDLR_NODES = CreateContract.emptyTransfer = void 0;
CreateContract.emptyTransfer = {
  target: "",
  winstonQty: "0"
};
CreateContract.BUNDLR_NODES = ["node1", "node2"];
var SourceImpl = {};
var redstoneWasmMetering = {};
var redstoneWasmJsonToolkit = {};
var wasm2jsonExports = {};
var wasm2json$1 = {
  get exports() {
    return wasm2jsonExports;
  },
  set exports(v) {
    wasm2jsonExports = v;
  }
};
var leb128$1 = {};
var bnExports = {};
var bn = {
  get exports() {
    return bnExports;
  },
  set exports(v) {
    bnExports = v;
  }
};
(function(module2) {
  (function(module3, exports2) {
    function assert(val, msg) {
      if (!val)
        throw new Error(msg || "Assertion failed");
    }
    function inherits2(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
    function BN2(number, base, endian) {
      if (BN2.isBN(number)) {
        return number;
      }
      this.negative = 0;
      this.words = null;
      this.length = 0;
      this.red = null;
      if (number !== null) {
        if (base === "le" || base === "be") {
          endian = base;
          base = 10;
        }
        this._init(number || 0, base || 10, endian || "be");
      }
    }
    if (typeof module3 === "object") {
      module3.exports = BN2;
    } else {
      exports2.BN = BN2;
    }
    BN2.BN = BN2;
    BN2.wordSize = 26;
    var Buffer2;
    try {
      if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
        Buffer2 = window.Buffer;
      } else {
        Buffer2 = require$$1.Buffer;
      }
    } catch (e) {
    }
    BN2.isBN = function isBN(num) {
      if (num instanceof BN2) {
        return true;
      }
      return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
    };
    BN2.max = function max(left, right) {
      if (left.cmp(right) > 0)
        return left;
      return right;
    };
    BN2.min = function min(left, right) {
      if (left.cmp(right) < 0)
        return left;
      return right;
    };
    BN2.prototype._init = function init(number, base, endian) {
      if (typeof number === "number") {
        return this._initNumber(number, base, endian);
      }
      if (typeof number === "object") {
        return this._initArray(number, base, endian);
      }
      if (base === "hex") {
        base = 16;
      }
      assert(base === (base | 0) && base >= 2 && base <= 36);
      number = number.toString().replace(/\s+/g, "");
      var start2 = 0;
      if (number[0] === "-") {
        start2++;
        this.negative = 1;
      }
      if (start2 < number.length) {
        if (base === 16) {
          this._parseHex(number, start2, endian);
        } else {
          this._parseBase(number, base, start2);
          if (endian === "le") {
            this._initArray(this.toArray(), base, endian);
          }
        }
      }
    };
    BN2.prototype._initNumber = function _initNumber(number, base, endian) {
      if (number < 0) {
        this.negative = 1;
        number = -number;
      }
      if (number < 67108864) {
        this.words = [number & 67108863];
        this.length = 1;
      } else if (number < 4503599627370496) {
        this.words = [
          number & 67108863,
          number / 67108864 & 67108863
        ];
        this.length = 2;
      } else {
        assert(number < 9007199254740992);
        this.words = [
          number & 67108863,
          number / 67108864 & 67108863,
          1
        ];
        this.length = 3;
      }
      if (endian !== "le")
        return;
      this._initArray(this.toArray(), base, endian);
    };
    BN2.prototype._initArray = function _initArray(number, base, endian) {
      assert(typeof number.length === "number");
      if (number.length <= 0) {
        this.words = [0];
        this.length = 1;
        return this;
      }
      this.length = Math.ceil(number.length / 3);
      this.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        this.words[i] = 0;
      }
      var j, w;
      var off = 0;
      if (endian === "be") {
        for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
          w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
          this.words[j] |= w << off & 67108863;
          this.words[j + 1] = w >>> 26 - off & 67108863;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
      } else if (endian === "le") {
        for (i = 0, j = 0; i < number.length; i += 3) {
          w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
          this.words[j] |= w << off & 67108863;
          this.words[j + 1] = w >>> 26 - off & 67108863;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
      }
      return this.strip();
    };
    function parseHex4Bits(string, index2) {
      var c = string.charCodeAt(index2);
      if (c >= 65 && c <= 70) {
        return c - 55;
      } else if (c >= 97 && c <= 102) {
        return c - 87;
      } else {
        return c - 48 & 15;
      }
    }
    function parseHexByte(string, lowerBound, index2) {
      var r = parseHex4Bits(string, index2);
      if (index2 - 1 >= lowerBound) {
        r |= parseHex4Bits(string, index2 - 1) << 4;
      }
      return r;
    }
    BN2.prototype._parseHex = function _parseHex(number, start2, endian) {
      this.length = Math.ceil((number.length - start2) / 6);
      this.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        this.words[i] = 0;
      }
      var off = 0;
      var j = 0;
      var w;
      if (endian === "be") {
        for (i = number.length - 1; i >= start2; i -= 2) {
          w = parseHexByte(number, start2, i) << off;
          this.words[j] |= w & 67108863;
          if (off >= 18) {
            off -= 18;
            j += 1;
            this.words[j] |= w >>> 26;
          } else {
            off += 8;
          }
        }
      } else {
        var parseLength = number.length - start2;
        for (i = parseLength % 2 === 0 ? start2 + 1 : start2; i < number.length; i += 2) {
          w = parseHexByte(number, start2, i) << off;
          this.words[j] |= w & 67108863;
          if (off >= 18) {
            off -= 18;
            j += 1;
            this.words[j] |= w >>> 26;
          } else {
            off += 8;
          }
        }
      }
      this.strip();
    };
    function parseBase(str, start2, end, mul) {
      var r = 0;
      var len = Math.min(str.length, end);
      for (var i = start2; i < len; i++) {
        var c = str.charCodeAt(i) - 48;
        r *= mul;
        if (c >= 49) {
          r += c - 49 + 10;
        } else if (c >= 17) {
          r += c - 17 + 10;
        } else {
          r += c;
        }
      }
      return r;
    }
    BN2.prototype._parseBase = function _parseBase(number, base, start2) {
      this.words = [0];
      this.length = 1;
      for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
        limbLen++;
      }
      limbLen--;
      limbPow = limbPow / base | 0;
      var total = number.length - start2;
      var mod = total % limbLen;
      var end = Math.min(total, total - mod) + start2;
      var word = 0;
      for (var i = start2; i < end; i += limbLen) {
        word = parseBase(number, i, i + limbLen, base);
        this.imuln(limbPow);
        if (this.words[0] + word < 67108864) {
          this.words[0] += word;
        } else {
          this._iaddn(word);
        }
      }
      if (mod !== 0) {
        var pow = 1;
        word = parseBase(number, i, number.length, base);
        for (i = 0; i < mod; i++) {
          pow *= base;
        }
        this.imuln(pow);
        if (this.words[0] + word < 67108864) {
          this.words[0] += word;
        } else {
          this._iaddn(word);
        }
      }
      this.strip();
    };
    BN2.prototype.copy = function copy(dest) {
      dest.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        dest.words[i] = this.words[i];
      }
      dest.length = this.length;
      dest.negative = this.negative;
      dest.red = this.red;
    };
    BN2.prototype.clone = function clone() {
      var r = new BN2(null);
      this.copy(r);
      return r;
    };
    BN2.prototype._expand = function _expand(size) {
      while (this.length < size) {
        this.words[this.length++] = 0;
      }
      return this;
    };
    BN2.prototype.strip = function strip() {
      while (this.length > 1 && this.words[this.length - 1] === 0) {
        this.length--;
      }
      return this._normSign();
    };
    BN2.prototype._normSign = function _normSign() {
      if (this.length === 1 && this.words[0] === 0) {
        this.negative = 0;
      }
      return this;
    };
    BN2.prototype.inspect = function inspect() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    };
    var zeros = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ];
    var groupSizes = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ];
    var groupBases = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    BN2.prototype.toString = function toString2(base, padding) {
      base = base || 10;
      padding = padding | 0 || 1;
      var out;
      if (base === 16 || base === "hex") {
        out = "";
        var off = 0;
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = this.words[i];
          var word = ((w << off | carry) & 16777215).toString(16);
          carry = w >>> 24 - off & 16777215;
          if (carry !== 0 || i !== this.length - 1) {
            out = zeros[6 - word.length] + word + out;
          } else {
            out = word + out;
          }
          off += 2;
          if (off >= 26) {
            off -= 26;
            i--;
          }
        }
        if (carry !== 0) {
          out = carry.toString(16) + out;
        }
        while (out.length % padding !== 0) {
          out = "0" + out;
        }
        if (this.negative !== 0) {
          out = "-" + out;
        }
        return out;
      }
      if (base === (base | 0) && base >= 2 && base <= 36) {
        var groupSize = groupSizes[base];
        var groupBase = groupBases[base];
        out = "";
        var c = this.clone();
        c.negative = 0;
        while (!c.isZero()) {
          var r = c.modn(groupBase).toString(base);
          c = c.idivn(groupBase);
          if (!c.isZero()) {
            out = zeros[groupSize - r.length] + r + out;
          } else {
            out = r + out;
          }
        }
        if (this.isZero()) {
          out = "0" + out;
        }
        while (out.length % padding !== 0) {
          out = "0" + out;
        }
        if (this.negative !== 0) {
          out = "-" + out;
        }
        return out;
      }
      assert(false, "Base should be between 2 and 36");
    };
    BN2.prototype.toNumber = function toNumber() {
      var ret = this.words[0];
      if (this.length === 2) {
        ret += this.words[1] * 67108864;
      } else if (this.length === 3 && this.words[2] === 1) {
        ret += 4503599627370496 + this.words[1] * 67108864;
      } else if (this.length > 2) {
        assert(false, "Number can only safely store up to 53 bits");
      }
      return this.negative !== 0 ? -ret : ret;
    };
    BN2.prototype.toJSON = function toJSON2() {
      return this.toString(16);
    };
    BN2.prototype.toBuffer = function toBuffer(endian, length) {
      assert(typeof Buffer2 !== "undefined");
      return this.toArrayLike(Buffer2, endian, length);
    };
    BN2.prototype.toArray = function toArray2(endian, length) {
      return this.toArrayLike(Array, endian, length);
    };
    BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
      var byteLength = this.byteLength();
      var reqLength = length || Math.max(1, byteLength);
      assert(byteLength <= reqLength, "byte array longer than desired length");
      assert(reqLength > 0, "Requested array length <= 0");
      this.strip();
      var littleEndian = endian === "le";
      var res = new ArrayType(reqLength);
      var b, i;
      var q = this.clone();
      if (!littleEndian) {
        for (i = 0; i < reqLength - byteLength; i++) {
          res[i] = 0;
        }
        for (i = 0; !q.isZero(); i++) {
          b = q.andln(255);
          q.iushrn(8);
          res[reqLength - i - 1] = b;
        }
      } else {
        for (i = 0; !q.isZero(); i++) {
          b = q.andln(255);
          q.iushrn(8);
          res[i] = b;
        }
        for (; i < reqLength; i++) {
          res[i] = 0;
        }
      }
      return res;
    };
    if (Math.clz32) {
      BN2.prototype._countBits = function _countBits(w) {
        return 32 - Math.clz32(w);
      };
    } else {
      BN2.prototype._countBits = function _countBits(w) {
        var t = w;
        var r = 0;
        if (t >= 4096) {
          r += 13;
          t >>>= 13;
        }
        if (t >= 64) {
          r += 7;
          t >>>= 7;
        }
        if (t >= 8) {
          r += 4;
          t >>>= 4;
        }
        if (t >= 2) {
          r += 2;
          t >>>= 2;
        }
        return r + t;
      };
    }
    BN2.prototype._zeroBits = function _zeroBits(w) {
      if (w === 0)
        return 26;
      var t = w;
      var r = 0;
      if ((t & 8191) === 0) {
        r += 13;
        t >>>= 13;
      }
      if ((t & 127) === 0) {
        r += 7;
        t >>>= 7;
      }
      if ((t & 15) === 0) {
        r += 4;
        t >>>= 4;
      }
      if ((t & 3) === 0) {
        r += 2;
        t >>>= 2;
      }
      if ((t & 1) === 0) {
        r++;
      }
      return r;
    };
    BN2.prototype.bitLength = function bitLength() {
      var w = this.words[this.length - 1];
      var hi = this._countBits(w);
      return (this.length - 1) * 26 + hi;
    };
    function toBitArray(num) {
      var w = new Array(num.bitLength());
      for (var bit = 0; bit < w.length; bit++) {
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
      }
      return w;
    }
    BN2.prototype.zeroBits = function zeroBits() {
      if (this.isZero())
        return 0;
      var r = 0;
      for (var i = 0; i < this.length; i++) {
        var b = this._zeroBits(this.words[i]);
        r += b;
        if (b !== 26)
          break;
      }
      return r;
    };
    BN2.prototype.byteLength = function byteLength() {
      return Math.ceil(this.bitLength() / 8);
    };
    BN2.prototype.toTwos = function toTwos(width) {
      if (this.negative !== 0) {
        return this.abs().inotn(width).iaddn(1);
      }
      return this.clone();
    };
    BN2.prototype.fromTwos = function fromTwos(width) {
      if (this.testn(width - 1)) {
        return this.notn(width).iaddn(1).ineg();
      }
      return this.clone();
    };
    BN2.prototype.isNeg = function isNeg() {
      return this.negative !== 0;
    };
    BN2.prototype.neg = function neg() {
      return this.clone().ineg();
    };
    BN2.prototype.ineg = function ineg() {
      if (!this.isZero()) {
        this.negative ^= 1;
      }
      return this;
    };
    BN2.prototype.iuor = function iuor(num) {
      while (this.length < num.length) {
        this.words[this.length++] = 0;
      }
      for (var i = 0; i < num.length; i++) {
        this.words[i] = this.words[i] | num.words[i];
      }
      return this.strip();
    };
    BN2.prototype.ior = function ior(num) {
      assert((this.negative | num.negative) === 0);
      return this.iuor(num);
    };
    BN2.prototype.or = function or(num) {
      if (this.length > num.length)
        return this.clone().ior(num);
      return num.clone().ior(this);
    };
    BN2.prototype.uor = function uor(num) {
      if (this.length > num.length)
        return this.clone().iuor(num);
      return num.clone().iuor(this);
    };
    BN2.prototype.iuand = function iuand(num) {
      var b;
      if (this.length > num.length) {
        b = num;
      } else {
        b = this;
      }
      for (var i = 0; i < b.length; i++) {
        this.words[i] = this.words[i] & num.words[i];
      }
      this.length = b.length;
      return this.strip();
    };
    BN2.prototype.iand = function iand(num) {
      assert((this.negative | num.negative) === 0);
      return this.iuand(num);
    };
    BN2.prototype.and = function and(num) {
      if (this.length > num.length)
        return this.clone().iand(num);
      return num.clone().iand(this);
    };
    BN2.prototype.uand = function uand(num) {
      if (this.length > num.length)
        return this.clone().iuand(num);
      return num.clone().iuand(this);
    };
    BN2.prototype.iuxor = function iuxor(num) {
      var a;
      var b;
      if (this.length > num.length) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }
      for (var i = 0; i < b.length; i++) {
        this.words[i] = a.words[i] ^ b.words[i];
      }
      if (this !== a) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }
      this.length = a.length;
      return this.strip();
    };
    BN2.prototype.ixor = function ixor(num) {
      assert((this.negative | num.negative) === 0);
      return this.iuxor(num);
    };
    BN2.prototype.xor = function xor(num) {
      if (this.length > num.length)
        return this.clone().ixor(num);
      return num.clone().ixor(this);
    };
    BN2.prototype.uxor = function uxor(num) {
      if (this.length > num.length)
        return this.clone().iuxor(num);
      return num.clone().iuxor(this);
    };
    BN2.prototype.inotn = function inotn(width) {
      assert(typeof width === "number" && width >= 0);
      var bytesNeeded = Math.ceil(width / 26) | 0;
      var bitsLeft = width % 26;
      this._expand(bytesNeeded);
      if (bitsLeft > 0) {
        bytesNeeded--;
      }
      for (var i = 0; i < bytesNeeded; i++) {
        this.words[i] = ~this.words[i] & 67108863;
      }
      if (bitsLeft > 0) {
        this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
      }
      return this.strip();
    };
    BN2.prototype.notn = function notn(width) {
      return this.clone().inotn(width);
    };
    BN2.prototype.setn = function setn(bit, val) {
      assert(typeof bit === "number" && bit >= 0);
      var off = bit / 26 | 0;
      var wbit = bit % 26;
      this._expand(off + 1);
      if (val) {
        this.words[off] = this.words[off] | 1 << wbit;
      } else {
        this.words[off] = this.words[off] & ~(1 << wbit);
      }
      return this.strip();
    };
    BN2.prototype.iadd = function iadd(num) {
      var r;
      if (this.negative !== 0 && num.negative === 0) {
        this.negative = 0;
        r = this.isub(num);
        this.negative ^= 1;
        return this._normSign();
      } else if (this.negative === 0 && num.negative !== 0) {
        num.negative = 0;
        r = this.isub(num);
        num.negative = 1;
        return r._normSign();
      }
      var a, b;
      if (this.length > num.length) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }
      var carry = 0;
      for (var i = 0; i < b.length; i++) {
        r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
        this.words[i] = r & 67108863;
        carry = r >>> 26;
      }
      for (; carry !== 0 && i < a.length; i++) {
        r = (a.words[i] | 0) + carry;
        this.words[i] = r & 67108863;
        carry = r >>> 26;
      }
      this.length = a.length;
      if (carry !== 0) {
        this.words[this.length] = carry;
        this.length++;
      } else if (a !== this) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }
      return this;
    };
    BN2.prototype.add = function add(num) {
      var res;
      if (num.negative !== 0 && this.negative === 0) {
        num.negative = 0;
        res = this.sub(num);
        num.negative ^= 1;
        return res;
      } else if (num.negative === 0 && this.negative !== 0) {
        this.negative = 0;
        res = num.sub(this);
        this.negative = 1;
        return res;
      }
      if (this.length > num.length)
        return this.clone().iadd(num);
      return num.clone().iadd(this);
    };
    BN2.prototype.isub = function isub(num) {
      if (num.negative !== 0) {
        num.negative = 0;
        var r = this.iadd(num);
        num.negative = 1;
        return r._normSign();
      } else if (this.negative !== 0) {
        this.negative = 0;
        this.iadd(num);
        this.negative = 1;
        return this._normSign();
      }
      var cmp = this.cmp(num);
      if (cmp === 0) {
        this.negative = 0;
        this.length = 1;
        this.words[0] = 0;
        return this;
      }
      var a, b;
      if (cmp > 0) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }
      var carry = 0;
      for (var i = 0; i < b.length; i++) {
        r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
        carry = r >> 26;
        this.words[i] = r & 67108863;
      }
      for (; carry !== 0 && i < a.length; i++) {
        r = (a.words[i] | 0) + carry;
        carry = r >> 26;
        this.words[i] = r & 67108863;
      }
      if (carry === 0 && i < a.length && a !== this) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }
      this.length = Math.max(this.length, i);
      if (a !== this) {
        this.negative = 1;
      }
      return this.strip();
    };
    BN2.prototype.sub = function sub(num) {
      return this.clone().isub(num);
    };
    function smallMulTo(self2, num, out) {
      out.negative = num.negative ^ self2.negative;
      var len = self2.length + num.length | 0;
      out.length = len;
      len = len - 1 | 0;
      var a = self2.words[0] | 0;
      var b = num.words[0] | 0;
      var r = a * b;
      var lo = r & 67108863;
      var carry = r / 67108864 | 0;
      out.words[0] = lo;
      for (var k = 1; k < len; k++) {
        var ncarry = carry >>> 26;
        var rword = carry & 67108863;
        var maxJ = Math.min(k, num.length - 1);
        for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
          var i = k - j | 0;
          a = self2.words[i] | 0;
          b = num.words[j] | 0;
          r = a * b + rword;
          ncarry += r / 67108864 | 0;
          rword = r & 67108863;
        }
        out.words[k] = rword | 0;
        carry = ncarry | 0;
      }
      if (carry !== 0) {
        out.words[k] = carry | 0;
      } else {
        out.length--;
      }
      return out.strip();
    }
    var comb10MulTo = function comb10MulTo2(self2, num, out) {
      var a = self2.words;
      var b = num.words;
      var o = out.words;
      var c = 0;
      var lo;
      var mid;
      var hi;
      var a0 = a[0] | 0;
      var al0 = a0 & 8191;
      var ah0 = a0 >>> 13;
      var a1 = a[1] | 0;
      var al1 = a1 & 8191;
      var ah1 = a1 >>> 13;
      var a2 = a[2] | 0;
      var al2 = a2 & 8191;
      var ah2 = a2 >>> 13;
      var a3 = a[3] | 0;
      var al3 = a3 & 8191;
      var ah3 = a3 >>> 13;
      var a4 = a[4] | 0;
      var al4 = a4 & 8191;
      var ah4 = a4 >>> 13;
      var a5 = a[5] | 0;
      var al5 = a5 & 8191;
      var ah5 = a5 >>> 13;
      var a6 = a[6] | 0;
      var al6 = a6 & 8191;
      var ah6 = a6 >>> 13;
      var a7 = a[7] | 0;
      var al7 = a7 & 8191;
      var ah7 = a7 >>> 13;
      var a8 = a[8] | 0;
      var al8 = a8 & 8191;
      var ah8 = a8 >>> 13;
      var a9 = a[9] | 0;
      var al9 = a9 & 8191;
      var ah9 = a9 >>> 13;
      var b0 = b[0] | 0;
      var bl0 = b0 & 8191;
      var bh0 = b0 >>> 13;
      var b1 = b[1] | 0;
      var bl1 = b1 & 8191;
      var bh1 = b1 >>> 13;
      var b2 = b[2] | 0;
      var bl2 = b2 & 8191;
      var bh2 = b2 >>> 13;
      var b3 = b[3] | 0;
      var bl3 = b3 & 8191;
      var bh3 = b3 >>> 13;
      var b4 = b[4] | 0;
      var bl4 = b4 & 8191;
      var bh4 = b4 >>> 13;
      var b5 = b[5] | 0;
      var bl5 = b5 & 8191;
      var bh5 = b5 >>> 13;
      var b6 = b[6] | 0;
      var bl6 = b6 & 8191;
      var bh6 = b6 >>> 13;
      var b7 = b[7] | 0;
      var bl7 = b7 & 8191;
      var bh7 = b7 >>> 13;
      var b8 = b[8] | 0;
      var bl8 = b8 & 8191;
      var bh8 = b8 >>> 13;
      var b9 = b[9] | 0;
      var bl9 = b9 & 8191;
      var bh9 = b9 >>> 13;
      out.negative = self2.negative ^ num.negative;
      out.length = 19;
      lo = Math.imul(al0, bl0);
      mid = Math.imul(al0, bh0);
      mid = mid + Math.imul(ah0, bl0) | 0;
      hi = Math.imul(ah0, bh0);
      var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
      w0 &= 67108863;
      lo = Math.imul(al1, bl0);
      mid = Math.imul(al1, bh0);
      mid = mid + Math.imul(ah1, bl0) | 0;
      hi = Math.imul(ah1, bh0);
      lo = lo + Math.imul(al0, bl1) | 0;
      mid = mid + Math.imul(al0, bh1) | 0;
      mid = mid + Math.imul(ah0, bl1) | 0;
      hi = hi + Math.imul(ah0, bh1) | 0;
      var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
      w1 &= 67108863;
      lo = Math.imul(al2, bl0);
      mid = Math.imul(al2, bh0);
      mid = mid + Math.imul(ah2, bl0) | 0;
      hi = Math.imul(ah2, bh0);
      lo = lo + Math.imul(al1, bl1) | 0;
      mid = mid + Math.imul(al1, bh1) | 0;
      mid = mid + Math.imul(ah1, bl1) | 0;
      hi = hi + Math.imul(ah1, bh1) | 0;
      lo = lo + Math.imul(al0, bl2) | 0;
      mid = mid + Math.imul(al0, bh2) | 0;
      mid = mid + Math.imul(ah0, bl2) | 0;
      hi = hi + Math.imul(ah0, bh2) | 0;
      var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
      w2 &= 67108863;
      lo = Math.imul(al3, bl0);
      mid = Math.imul(al3, bh0);
      mid = mid + Math.imul(ah3, bl0) | 0;
      hi = Math.imul(ah3, bh0);
      lo = lo + Math.imul(al2, bl1) | 0;
      mid = mid + Math.imul(al2, bh1) | 0;
      mid = mid + Math.imul(ah2, bl1) | 0;
      hi = hi + Math.imul(ah2, bh1) | 0;
      lo = lo + Math.imul(al1, bl2) | 0;
      mid = mid + Math.imul(al1, bh2) | 0;
      mid = mid + Math.imul(ah1, bl2) | 0;
      hi = hi + Math.imul(ah1, bh2) | 0;
      lo = lo + Math.imul(al0, bl3) | 0;
      mid = mid + Math.imul(al0, bh3) | 0;
      mid = mid + Math.imul(ah0, bl3) | 0;
      hi = hi + Math.imul(ah0, bh3) | 0;
      var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
      w3 &= 67108863;
      lo = Math.imul(al4, bl0);
      mid = Math.imul(al4, bh0);
      mid = mid + Math.imul(ah4, bl0) | 0;
      hi = Math.imul(ah4, bh0);
      lo = lo + Math.imul(al3, bl1) | 0;
      mid = mid + Math.imul(al3, bh1) | 0;
      mid = mid + Math.imul(ah3, bl1) | 0;
      hi = hi + Math.imul(ah3, bh1) | 0;
      lo = lo + Math.imul(al2, bl2) | 0;
      mid = mid + Math.imul(al2, bh2) | 0;
      mid = mid + Math.imul(ah2, bl2) | 0;
      hi = hi + Math.imul(ah2, bh2) | 0;
      lo = lo + Math.imul(al1, bl3) | 0;
      mid = mid + Math.imul(al1, bh3) | 0;
      mid = mid + Math.imul(ah1, bl3) | 0;
      hi = hi + Math.imul(ah1, bh3) | 0;
      lo = lo + Math.imul(al0, bl4) | 0;
      mid = mid + Math.imul(al0, bh4) | 0;
      mid = mid + Math.imul(ah0, bl4) | 0;
      hi = hi + Math.imul(ah0, bh4) | 0;
      var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
      w4 &= 67108863;
      lo = Math.imul(al5, bl0);
      mid = Math.imul(al5, bh0);
      mid = mid + Math.imul(ah5, bl0) | 0;
      hi = Math.imul(ah5, bh0);
      lo = lo + Math.imul(al4, bl1) | 0;
      mid = mid + Math.imul(al4, bh1) | 0;
      mid = mid + Math.imul(ah4, bl1) | 0;
      hi = hi + Math.imul(ah4, bh1) | 0;
      lo = lo + Math.imul(al3, bl2) | 0;
      mid = mid + Math.imul(al3, bh2) | 0;
      mid = mid + Math.imul(ah3, bl2) | 0;
      hi = hi + Math.imul(ah3, bh2) | 0;
      lo = lo + Math.imul(al2, bl3) | 0;
      mid = mid + Math.imul(al2, bh3) | 0;
      mid = mid + Math.imul(ah2, bl3) | 0;
      hi = hi + Math.imul(ah2, bh3) | 0;
      lo = lo + Math.imul(al1, bl4) | 0;
      mid = mid + Math.imul(al1, bh4) | 0;
      mid = mid + Math.imul(ah1, bl4) | 0;
      hi = hi + Math.imul(ah1, bh4) | 0;
      lo = lo + Math.imul(al0, bl5) | 0;
      mid = mid + Math.imul(al0, bh5) | 0;
      mid = mid + Math.imul(ah0, bl5) | 0;
      hi = hi + Math.imul(ah0, bh5) | 0;
      var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
      w5 &= 67108863;
      lo = Math.imul(al6, bl0);
      mid = Math.imul(al6, bh0);
      mid = mid + Math.imul(ah6, bl0) | 0;
      hi = Math.imul(ah6, bh0);
      lo = lo + Math.imul(al5, bl1) | 0;
      mid = mid + Math.imul(al5, bh1) | 0;
      mid = mid + Math.imul(ah5, bl1) | 0;
      hi = hi + Math.imul(ah5, bh1) | 0;
      lo = lo + Math.imul(al4, bl2) | 0;
      mid = mid + Math.imul(al4, bh2) | 0;
      mid = mid + Math.imul(ah4, bl2) | 0;
      hi = hi + Math.imul(ah4, bh2) | 0;
      lo = lo + Math.imul(al3, bl3) | 0;
      mid = mid + Math.imul(al3, bh3) | 0;
      mid = mid + Math.imul(ah3, bl3) | 0;
      hi = hi + Math.imul(ah3, bh3) | 0;
      lo = lo + Math.imul(al2, bl4) | 0;
      mid = mid + Math.imul(al2, bh4) | 0;
      mid = mid + Math.imul(ah2, bl4) | 0;
      hi = hi + Math.imul(ah2, bh4) | 0;
      lo = lo + Math.imul(al1, bl5) | 0;
      mid = mid + Math.imul(al1, bh5) | 0;
      mid = mid + Math.imul(ah1, bl5) | 0;
      hi = hi + Math.imul(ah1, bh5) | 0;
      lo = lo + Math.imul(al0, bl6) | 0;
      mid = mid + Math.imul(al0, bh6) | 0;
      mid = mid + Math.imul(ah0, bl6) | 0;
      hi = hi + Math.imul(ah0, bh6) | 0;
      var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
      w6 &= 67108863;
      lo = Math.imul(al7, bl0);
      mid = Math.imul(al7, bh0);
      mid = mid + Math.imul(ah7, bl0) | 0;
      hi = Math.imul(ah7, bh0);
      lo = lo + Math.imul(al6, bl1) | 0;
      mid = mid + Math.imul(al6, bh1) | 0;
      mid = mid + Math.imul(ah6, bl1) | 0;
      hi = hi + Math.imul(ah6, bh1) | 0;
      lo = lo + Math.imul(al5, bl2) | 0;
      mid = mid + Math.imul(al5, bh2) | 0;
      mid = mid + Math.imul(ah5, bl2) | 0;
      hi = hi + Math.imul(ah5, bh2) | 0;
      lo = lo + Math.imul(al4, bl3) | 0;
      mid = mid + Math.imul(al4, bh3) | 0;
      mid = mid + Math.imul(ah4, bl3) | 0;
      hi = hi + Math.imul(ah4, bh3) | 0;
      lo = lo + Math.imul(al3, bl4) | 0;
      mid = mid + Math.imul(al3, bh4) | 0;
      mid = mid + Math.imul(ah3, bl4) | 0;
      hi = hi + Math.imul(ah3, bh4) | 0;
      lo = lo + Math.imul(al2, bl5) | 0;
      mid = mid + Math.imul(al2, bh5) | 0;
      mid = mid + Math.imul(ah2, bl5) | 0;
      hi = hi + Math.imul(ah2, bh5) | 0;
      lo = lo + Math.imul(al1, bl6) | 0;
      mid = mid + Math.imul(al1, bh6) | 0;
      mid = mid + Math.imul(ah1, bl6) | 0;
      hi = hi + Math.imul(ah1, bh6) | 0;
      lo = lo + Math.imul(al0, bl7) | 0;
      mid = mid + Math.imul(al0, bh7) | 0;
      mid = mid + Math.imul(ah0, bl7) | 0;
      hi = hi + Math.imul(ah0, bh7) | 0;
      var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
      w7 &= 67108863;
      lo = Math.imul(al8, bl0);
      mid = Math.imul(al8, bh0);
      mid = mid + Math.imul(ah8, bl0) | 0;
      hi = Math.imul(ah8, bh0);
      lo = lo + Math.imul(al7, bl1) | 0;
      mid = mid + Math.imul(al7, bh1) | 0;
      mid = mid + Math.imul(ah7, bl1) | 0;
      hi = hi + Math.imul(ah7, bh1) | 0;
      lo = lo + Math.imul(al6, bl2) | 0;
      mid = mid + Math.imul(al6, bh2) | 0;
      mid = mid + Math.imul(ah6, bl2) | 0;
      hi = hi + Math.imul(ah6, bh2) | 0;
      lo = lo + Math.imul(al5, bl3) | 0;
      mid = mid + Math.imul(al5, bh3) | 0;
      mid = mid + Math.imul(ah5, bl3) | 0;
      hi = hi + Math.imul(ah5, bh3) | 0;
      lo = lo + Math.imul(al4, bl4) | 0;
      mid = mid + Math.imul(al4, bh4) | 0;
      mid = mid + Math.imul(ah4, bl4) | 0;
      hi = hi + Math.imul(ah4, bh4) | 0;
      lo = lo + Math.imul(al3, bl5) | 0;
      mid = mid + Math.imul(al3, bh5) | 0;
      mid = mid + Math.imul(ah3, bl5) | 0;
      hi = hi + Math.imul(ah3, bh5) | 0;
      lo = lo + Math.imul(al2, bl6) | 0;
      mid = mid + Math.imul(al2, bh6) | 0;
      mid = mid + Math.imul(ah2, bl6) | 0;
      hi = hi + Math.imul(ah2, bh6) | 0;
      lo = lo + Math.imul(al1, bl7) | 0;
      mid = mid + Math.imul(al1, bh7) | 0;
      mid = mid + Math.imul(ah1, bl7) | 0;
      hi = hi + Math.imul(ah1, bh7) | 0;
      lo = lo + Math.imul(al0, bl8) | 0;
      mid = mid + Math.imul(al0, bh8) | 0;
      mid = mid + Math.imul(ah0, bl8) | 0;
      hi = hi + Math.imul(ah0, bh8) | 0;
      var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
      w8 &= 67108863;
      lo = Math.imul(al9, bl0);
      mid = Math.imul(al9, bh0);
      mid = mid + Math.imul(ah9, bl0) | 0;
      hi = Math.imul(ah9, bh0);
      lo = lo + Math.imul(al8, bl1) | 0;
      mid = mid + Math.imul(al8, bh1) | 0;
      mid = mid + Math.imul(ah8, bl1) | 0;
      hi = hi + Math.imul(ah8, bh1) | 0;
      lo = lo + Math.imul(al7, bl2) | 0;
      mid = mid + Math.imul(al7, bh2) | 0;
      mid = mid + Math.imul(ah7, bl2) | 0;
      hi = hi + Math.imul(ah7, bh2) | 0;
      lo = lo + Math.imul(al6, bl3) | 0;
      mid = mid + Math.imul(al6, bh3) | 0;
      mid = mid + Math.imul(ah6, bl3) | 0;
      hi = hi + Math.imul(ah6, bh3) | 0;
      lo = lo + Math.imul(al5, bl4) | 0;
      mid = mid + Math.imul(al5, bh4) | 0;
      mid = mid + Math.imul(ah5, bl4) | 0;
      hi = hi + Math.imul(ah5, bh4) | 0;
      lo = lo + Math.imul(al4, bl5) | 0;
      mid = mid + Math.imul(al4, bh5) | 0;
      mid = mid + Math.imul(ah4, bl5) | 0;
      hi = hi + Math.imul(ah4, bh5) | 0;
      lo = lo + Math.imul(al3, bl6) | 0;
      mid = mid + Math.imul(al3, bh6) | 0;
      mid = mid + Math.imul(ah3, bl6) | 0;
      hi = hi + Math.imul(ah3, bh6) | 0;
      lo = lo + Math.imul(al2, bl7) | 0;
      mid = mid + Math.imul(al2, bh7) | 0;
      mid = mid + Math.imul(ah2, bl7) | 0;
      hi = hi + Math.imul(ah2, bh7) | 0;
      lo = lo + Math.imul(al1, bl8) | 0;
      mid = mid + Math.imul(al1, bh8) | 0;
      mid = mid + Math.imul(ah1, bl8) | 0;
      hi = hi + Math.imul(ah1, bh8) | 0;
      lo = lo + Math.imul(al0, bl9) | 0;
      mid = mid + Math.imul(al0, bh9) | 0;
      mid = mid + Math.imul(ah0, bl9) | 0;
      hi = hi + Math.imul(ah0, bh9) | 0;
      var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
      w9 &= 67108863;
      lo = Math.imul(al9, bl1);
      mid = Math.imul(al9, bh1);
      mid = mid + Math.imul(ah9, bl1) | 0;
      hi = Math.imul(ah9, bh1);
      lo = lo + Math.imul(al8, bl2) | 0;
      mid = mid + Math.imul(al8, bh2) | 0;
      mid = mid + Math.imul(ah8, bl2) | 0;
      hi = hi + Math.imul(ah8, bh2) | 0;
      lo = lo + Math.imul(al7, bl3) | 0;
      mid = mid + Math.imul(al7, bh3) | 0;
      mid = mid + Math.imul(ah7, bl3) | 0;
      hi = hi + Math.imul(ah7, bh3) | 0;
      lo = lo + Math.imul(al6, bl4) | 0;
      mid = mid + Math.imul(al6, bh4) | 0;
      mid = mid + Math.imul(ah6, bl4) | 0;
      hi = hi + Math.imul(ah6, bh4) | 0;
      lo = lo + Math.imul(al5, bl5) | 0;
      mid = mid + Math.imul(al5, bh5) | 0;
      mid = mid + Math.imul(ah5, bl5) | 0;
      hi = hi + Math.imul(ah5, bh5) | 0;
      lo = lo + Math.imul(al4, bl6) | 0;
      mid = mid + Math.imul(al4, bh6) | 0;
      mid = mid + Math.imul(ah4, bl6) | 0;
      hi = hi + Math.imul(ah4, bh6) | 0;
      lo = lo + Math.imul(al3, bl7) | 0;
      mid = mid + Math.imul(al3, bh7) | 0;
      mid = mid + Math.imul(ah3, bl7) | 0;
      hi = hi + Math.imul(ah3, bh7) | 0;
      lo = lo + Math.imul(al2, bl8) | 0;
      mid = mid + Math.imul(al2, bh8) | 0;
      mid = mid + Math.imul(ah2, bl8) | 0;
      hi = hi + Math.imul(ah2, bh8) | 0;
      lo = lo + Math.imul(al1, bl9) | 0;
      mid = mid + Math.imul(al1, bh9) | 0;
      mid = mid + Math.imul(ah1, bl9) | 0;
      hi = hi + Math.imul(ah1, bh9) | 0;
      var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
      w10 &= 67108863;
      lo = Math.imul(al9, bl2);
      mid = Math.imul(al9, bh2);
      mid = mid + Math.imul(ah9, bl2) | 0;
      hi = Math.imul(ah9, bh2);
      lo = lo + Math.imul(al8, bl3) | 0;
      mid = mid + Math.imul(al8, bh3) | 0;
      mid = mid + Math.imul(ah8, bl3) | 0;
      hi = hi + Math.imul(ah8, bh3) | 0;
      lo = lo + Math.imul(al7, bl4) | 0;
      mid = mid + Math.imul(al7, bh4) | 0;
      mid = mid + Math.imul(ah7, bl4) | 0;
      hi = hi + Math.imul(ah7, bh4) | 0;
      lo = lo + Math.imul(al6, bl5) | 0;
      mid = mid + Math.imul(al6, bh5) | 0;
      mid = mid + Math.imul(ah6, bl5) | 0;
      hi = hi + Math.imul(ah6, bh5) | 0;
      lo = lo + Math.imul(al5, bl6) | 0;
      mid = mid + Math.imul(al5, bh6) | 0;
      mid = mid + Math.imul(ah5, bl6) | 0;
      hi = hi + Math.imul(ah5, bh6) | 0;
      lo = lo + Math.imul(al4, bl7) | 0;
      mid = mid + Math.imul(al4, bh7) | 0;
      mid = mid + Math.imul(ah4, bl7) | 0;
      hi = hi + Math.imul(ah4, bh7) | 0;
      lo = lo + Math.imul(al3, bl8) | 0;
      mid = mid + Math.imul(al3, bh8) | 0;
      mid = mid + Math.imul(ah3, bl8) | 0;
      hi = hi + Math.imul(ah3, bh8) | 0;
      lo = lo + Math.imul(al2, bl9) | 0;
      mid = mid + Math.imul(al2, bh9) | 0;
      mid = mid + Math.imul(ah2, bl9) | 0;
      hi = hi + Math.imul(ah2, bh9) | 0;
      var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
      w11 &= 67108863;
      lo = Math.imul(al9, bl3);
      mid = Math.imul(al9, bh3);
      mid = mid + Math.imul(ah9, bl3) | 0;
      hi = Math.imul(ah9, bh3);
      lo = lo + Math.imul(al8, bl4) | 0;
      mid = mid + Math.imul(al8, bh4) | 0;
      mid = mid + Math.imul(ah8, bl4) | 0;
      hi = hi + Math.imul(ah8, bh4) | 0;
      lo = lo + Math.imul(al7, bl5) | 0;
      mid = mid + Math.imul(al7, bh5) | 0;
      mid = mid + Math.imul(ah7, bl5) | 0;
      hi = hi + Math.imul(ah7, bh5) | 0;
      lo = lo + Math.imul(al6, bl6) | 0;
      mid = mid + Math.imul(al6, bh6) | 0;
      mid = mid + Math.imul(ah6, bl6) | 0;
      hi = hi + Math.imul(ah6, bh6) | 0;
      lo = lo + Math.imul(al5, bl7) | 0;
      mid = mid + Math.imul(al5, bh7) | 0;
      mid = mid + Math.imul(ah5, bl7) | 0;
      hi = hi + Math.imul(ah5, bh7) | 0;
      lo = lo + Math.imul(al4, bl8) | 0;
      mid = mid + Math.imul(al4, bh8) | 0;
      mid = mid + Math.imul(ah4, bl8) | 0;
      hi = hi + Math.imul(ah4, bh8) | 0;
      lo = lo + Math.imul(al3, bl9) | 0;
      mid = mid + Math.imul(al3, bh9) | 0;
      mid = mid + Math.imul(ah3, bl9) | 0;
      hi = hi + Math.imul(ah3, bh9) | 0;
      var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
      w12 &= 67108863;
      lo = Math.imul(al9, bl4);
      mid = Math.imul(al9, bh4);
      mid = mid + Math.imul(ah9, bl4) | 0;
      hi = Math.imul(ah9, bh4);
      lo = lo + Math.imul(al8, bl5) | 0;
      mid = mid + Math.imul(al8, bh5) | 0;
      mid = mid + Math.imul(ah8, bl5) | 0;
      hi = hi + Math.imul(ah8, bh5) | 0;
      lo = lo + Math.imul(al7, bl6) | 0;
      mid = mid + Math.imul(al7, bh6) | 0;
      mid = mid + Math.imul(ah7, bl6) | 0;
      hi = hi + Math.imul(ah7, bh6) | 0;
      lo = lo + Math.imul(al6, bl7) | 0;
      mid = mid + Math.imul(al6, bh7) | 0;
      mid = mid + Math.imul(ah6, bl7) | 0;
      hi = hi + Math.imul(ah6, bh7) | 0;
      lo = lo + Math.imul(al5, bl8) | 0;
      mid = mid + Math.imul(al5, bh8) | 0;
      mid = mid + Math.imul(ah5, bl8) | 0;
      hi = hi + Math.imul(ah5, bh8) | 0;
      lo = lo + Math.imul(al4, bl9) | 0;
      mid = mid + Math.imul(al4, bh9) | 0;
      mid = mid + Math.imul(ah4, bl9) | 0;
      hi = hi + Math.imul(ah4, bh9) | 0;
      var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
      w13 &= 67108863;
      lo = Math.imul(al9, bl5);
      mid = Math.imul(al9, bh5);
      mid = mid + Math.imul(ah9, bl5) | 0;
      hi = Math.imul(ah9, bh5);
      lo = lo + Math.imul(al8, bl6) | 0;
      mid = mid + Math.imul(al8, bh6) | 0;
      mid = mid + Math.imul(ah8, bl6) | 0;
      hi = hi + Math.imul(ah8, bh6) | 0;
      lo = lo + Math.imul(al7, bl7) | 0;
      mid = mid + Math.imul(al7, bh7) | 0;
      mid = mid + Math.imul(ah7, bl7) | 0;
      hi = hi + Math.imul(ah7, bh7) | 0;
      lo = lo + Math.imul(al6, bl8) | 0;
      mid = mid + Math.imul(al6, bh8) | 0;
      mid = mid + Math.imul(ah6, bl8) | 0;
      hi = hi + Math.imul(ah6, bh8) | 0;
      lo = lo + Math.imul(al5, bl9) | 0;
      mid = mid + Math.imul(al5, bh9) | 0;
      mid = mid + Math.imul(ah5, bl9) | 0;
      hi = hi + Math.imul(ah5, bh9) | 0;
      var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
      w14 &= 67108863;
      lo = Math.imul(al9, bl6);
      mid = Math.imul(al9, bh6);
      mid = mid + Math.imul(ah9, bl6) | 0;
      hi = Math.imul(ah9, bh6);
      lo = lo + Math.imul(al8, bl7) | 0;
      mid = mid + Math.imul(al8, bh7) | 0;
      mid = mid + Math.imul(ah8, bl7) | 0;
      hi = hi + Math.imul(ah8, bh7) | 0;
      lo = lo + Math.imul(al7, bl8) | 0;
      mid = mid + Math.imul(al7, bh8) | 0;
      mid = mid + Math.imul(ah7, bl8) | 0;
      hi = hi + Math.imul(ah7, bh8) | 0;
      lo = lo + Math.imul(al6, bl9) | 0;
      mid = mid + Math.imul(al6, bh9) | 0;
      mid = mid + Math.imul(ah6, bl9) | 0;
      hi = hi + Math.imul(ah6, bh9) | 0;
      var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
      w15 &= 67108863;
      lo = Math.imul(al9, bl7);
      mid = Math.imul(al9, bh7);
      mid = mid + Math.imul(ah9, bl7) | 0;
      hi = Math.imul(ah9, bh7);
      lo = lo + Math.imul(al8, bl8) | 0;
      mid = mid + Math.imul(al8, bh8) | 0;
      mid = mid + Math.imul(ah8, bl8) | 0;
      hi = hi + Math.imul(ah8, bh8) | 0;
      lo = lo + Math.imul(al7, bl9) | 0;
      mid = mid + Math.imul(al7, bh9) | 0;
      mid = mid + Math.imul(ah7, bl9) | 0;
      hi = hi + Math.imul(ah7, bh9) | 0;
      var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
      w16 &= 67108863;
      lo = Math.imul(al9, bl8);
      mid = Math.imul(al9, bh8);
      mid = mid + Math.imul(ah9, bl8) | 0;
      hi = Math.imul(ah9, bh8);
      lo = lo + Math.imul(al8, bl9) | 0;
      mid = mid + Math.imul(al8, bh9) | 0;
      mid = mid + Math.imul(ah8, bl9) | 0;
      hi = hi + Math.imul(ah8, bh9) | 0;
      var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
      w17 &= 67108863;
      lo = Math.imul(al9, bl9);
      mid = Math.imul(al9, bh9);
      mid = mid + Math.imul(ah9, bl9) | 0;
      hi = Math.imul(ah9, bh9);
      var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
      w18 &= 67108863;
      o[0] = w0;
      o[1] = w1;
      o[2] = w2;
      o[3] = w3;
      o[4] = w4;
      o[5] = w5;
      o[6] = w6;
      o[7] = w7;
      o[8] = w8;
      o[9] = w9;
      o[10] = w10;
      o[11] = w11;
      o[12] = w12;
      o[13] = w13;
      o[14] = w14;
      o[15] = w15;
      o[16] = w16;
      o[17] = w17;
      o[18] = w18;
      if (c !== 0) {
        o[19] = c;
        out.length++;
      }
      return out;
    };
    if (!Math.imul) {
      comb10MulTo = smallMulTo;
    }
    function bigMulTo(self2, num, out) {
      out.negative = num.negative ^ self2.negative;
      out.length = self2.length + num.length;
      var carry = 0;
      var hncarry = 0;
      for (var k = 0; k < out.length - 1; k++) {
        var ncarry = hncarry;
        hncarry = 0;
        var rword = carry & 67108863;
        var maxJ = Math.min(k, num.length - 1);
        for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
          var i = k - j;
          var a = self2.words[i] | 0;
          var b = num.words[j] | 0;
          var r = a * b;
          var lo = r & 67108863;
          ncarry = ncarry + (r / 67108864 | 0) | 0;
          lo = lo + rword | 0;
          rword = lo & 67108863;
          ncarry = ncarry + (lo >>> 26) | 0;
          hncarry += ncarry >>> 26;
          ncarry &= 67108863;
        }
        out.words[k] = rword;
        carry = ncarry;
        ncarry = hncarry;
      }
      if (carry !== 0) {
        out.words[k] = carry;
      } else {
        out.length--;
      }
      return out.strip();
    }
    function jumboMulTo(self2, num, out) {
      var fftm = new FFTM();
      return fftm.mulp(self2, num, out);
    }
    BN2.prototype.mulTo = function mulTo(num, out) {
      var res;
      var len = this.length + num.length;
      if (this.length === 10 && num.length === 10) {
        res = comb10MulTo(this, num, out);
      } else if (len < 63) {
        res = smallMulTo(this, num, out);
      } else if (len < 1024) {
        res = bigMulTo(this, num, out);
      } else {
        res = jumboMulTo(this, num, out);
      }
      return res;
    };
    function FFTM(x, y) {
      this.x = x;
      this.y = y;
    }
    FFTM.prototype.makeRBT = function makeRBT(N) {
      var t = new Array(N);
      var l = BN2.prototype._countBits(N) - 1;
      for (var i = 0; i < N; i++) {
        t[i] = this.revBin(i, l, N);
      }
      return t;
    };
    FFTM.prototype.revBin = function revBin(x, l, N) {
      if (x === 0 || x === N - 1)
        return x;
      var rb = 0;
      for (var i = 0; i < l; i++) {
        rb |= (x & 1) << l - i - 1;
        x >>= 1;
      }
      return rb;
    };
    FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
      for (var i = 0; i < N; i++) {
        rtws[i] = rws[rbt[i]];
        itws[i] = iws[rbt[i]];
      }
    };
    FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
      this.permute(rbt, rws, iws, rtws, itws, N);
      for (var s = 1; s < N; s <<= 1) {
        var l = s << 1;
        var rtwdf = Math.cos(2 * Math.PI / l);
        var itwdf = Math.sin(2 * Math.PI / l);
        for (var p = 0; p < N; p += l) {
          var rtwdf_ = rtwdf;
          var itwdf_ = itwdf;
          for (var j = 0; j < s; j++) {
            var re = rtws[p + j];
            var ie = itws[p + j];
            var ro = rtws[p + j + s];
            var io = itws[p + j + s];
            var rx = rtwdf_ * ro - itwdf_ * io;
            io = rtwdf_ * io + itwdf_ * ro;
            ro = rx;
            rtws[p + j] = re + ro;
            itws[p + j] = ie + io;
            rtws[p + j + s] = re - ro;
            itws[p + j + s] = ie - io;
            if (j !== l) {
              rx = rtwdf * rtwdf_ - itwdf * itwdf_;
              itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
              rtwdf_ = rx;
            }
          }
        }
      }
    };
    FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
      var N = Math.max(m, n) | 1;
      var odd = N & 1;
      var i = 0;
      for (N = N / 2 | 0; N; N = N >>> 1) {
        i++;
      }
      return 1 << i + 1 + odd;
    };
    FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
      if (N <= 1)
        return;
      for (var i = 0; i < N / 2; i++) {
        var t = rws[i];
        rws[i] = rws[N - i - 1];
        rws[N - i - 1] = t;
        t = iws[i];
        iws[i] = -iws[N - i - 1];
        iws[N - i - 1] = -t;
      }
    };
    FFTM.prototype.normalize13b = function normalize13b(ws, N) {
      var carry = 0;
      for (var i = 0; i < N / 2; i++) {
        var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
        ws[i] = w & 67108863;
        if (w < 67108864) {
          carry = 0;
        } else {
          carry = w / 67108864 | 0;
        }
      }
      return ws;
    };
    FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
      var carry = 0;
      for (var i = 0; i < len; i++) {
        carry = carry + (ws[i] | 0);
        rws[2 * i] = carry & 8191;
        carry = carry >>> 13;
        rws[2 * i + 1] = carry & 8191;
        carry = carry >>> 13;
      }
      for (i = 2 * len; i < N; ++i) {
        rws[i] = 0;
      }
      assert(carry === 0);
      assert((carry & ~8191) === 0);
    };
    FFTM.prototype.stub = function stub(N) {
      var ph = new Array(N);
      for (var i = 0; i < N; i++) {
        ph[i] = 0;
      }
      return ph;
    };
    FFTM.prototype.mulp = function mulp(x, y, out) {
      var N = 2 * this.guessLen13b(x.length, y.length);
      var rbt = this.makeRBT(N);
      var _ = this.stub(N);
      var rws = new Array(N);
      var rwst = new Array(N);
      var iwst = new Array(N);
      var nrws = new Array(N);
      var nrwst = new Array(N);
      var niwst = new Array(N);
      var rmws = out.words;
      rmws.length = N;
      this.convert13b(x.words, x.length, rws, N);
      this.convert13b(y.words, y.length, nrws, N);
      this.transform(rws, _, rwst, iwst, N, rbt);
      this.transform(nrws, _, nrwst, niwst, N, rbt);
      for (var i = 0; i < N; i++) {
        var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
        iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
        rwst[i] = rx;
      }
      this.conjugate(rwst, iwst, N);
      this.transform(rwst, iwst, rmws, _, N, rbt);
      this.conjugate(rmws, _, N);
      this.normalize13b(rmws, N);
      out.negative = x.negative ^ y.negative;
      out.length = x.length + y.length;
      return out.strip();
    };
    BN2.prototype.mul = function mul(num) {
      var out = new BN2(null);
      out.words = new Array(this.length + num.length);
      return this.mulTo(num, out);
    };
    BN2.prototype.mulf = function mulf(num) {
      var out = new BN2(null);
      out.words = new Array(this.length + num.length);
      return jumboMulTo(this, num, out);
    };
    BN2.prototype.imul = function imul(num) {
      return this.clone().mulTo(num, this);
    };
    BN2.prototype.imuln = function imuln(num) {
      assert(typeof num === "number");
      assert(num < 67108864);
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = (this.words[i] | 0) * num;
        var lo = (w & 67108863) + (carry & 67108863);
        carry >>= 26;
        carry += w / 67108864 | 0;
        carry += lo >>> 26;
        this.words[i] = lo & 67108863;
      }
      if (carry !== 0) {
        this.words[i] = carry;
        this.length++;
      }
      return this;
    };
    BN2.prototype.muln = function muln(num) {
      return this.clone().imuln(num);
    };
    BN2.prototype.sqr = function sqr() {
      return this.mul(this);
    };
    BN2.prototype.isqr = function isqr() {
      return this.imul(this.clone());
    };
    BN2.prototype.pow = function pow(num) {
      var w = toBitArray(num);
      if (w.length === 0)
        return new BN2(1);
      var res = this;
      for (var i = 0; i < w.length; i++, res = res.sqr()) {
        if (w[i] !== 0)
          break;
      }
      if (++i < w.length) {
        for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
          if (w[i] === 0)
            continue;
          res = res.mul(q);
        }
      }
      return res;
    };
    BN2.prototype.iushln = function iushln(bits) {
      assert(typeof bits === "number" && bits >= 0);
      var r = bits % 26;
      var s = (bits - r) / 26;
      var carryMask = 67108863 >>> 26 - r << 26 - r;
      var i;
      if (r !== 0) {
        var carry = 0;
        for (i = 0; i < this.length; i++) {
          var newCarry = this.words[i] & carryMask;
          var c = (this.words[i] | 0) - newCarry << r;
          this.words[i] = c | carry;
          carry = newCarry >>> 26 - r;
        }
        if (carry) {
          this.words[i] = carry;
          this.length++;
        }
      }
      if (s !== 0) {
        for (i = this.length - 1; i >= 0; i--) {
          this.words[i + s] = this.words[i];
        }
        for (i = 0; i < s; i++) {
          this.words[i] = 0;
        }
        this.length += s;
      }
      return this.strip();
    };
    BN2.prototype.ishln = function ishln(bits) {
      assert(this.negative === 0);
      return this.iushln(bits);
    };
    BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
      assert(typeof bits === "number" && bits >= 0);
      var h;
      if (hint) {
        h = (hint - hint % 26) / 26;
      } else {
        h = 0;
      }
      var r = bits % 26;
      var s = Math.min((bits - r) / 26, this.length);
      var mask = 67108863 ^ 67108863 >>> r << r;
      var maskedWords = extended;
      h -= s;
      h = Math.max(0, h);
      if (maskedWords) {
        for (var i = 0; i < s; i++) {
          maskedWords.words[i] = this.words[i];
        }
        maskedWords.length = s;
      }
      if (s === 0)
        ;
      else if (this.length > s) {
        this.length -= s;
        for (i = 0; i < this.length; i++) {
          this.words[i] = this.words[i + s];
        }
      } else {
        this.words[0] = 0;
        this.length = 1;
      }
      var carry = 0;
      for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
        var word = this.words[i] | 0;
        this.words[i] = carry << 26 - r | word >>> r;
        carry = word & mask;
      }
      if (maskedWords && carry !== 0) {
        maskedWords.words[maskedWords.length++] = carry;
      }
      if (this.length === 0) {
        this.words[0] = 0;
        this.length = 1;
      }
      return this.strip();
    };
    BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
      assert(this.negative === 0);
      return this.iushrn(bits, hint, extended);
    };
    BN2.prototype.shln = function shln(bits) {
      return this.clone().ishln(bits);
    };
    BN2.prototype.ushln = function ushln(bits) {
      return this.clone().iushln(bits);
    };
    BN2.prototype.shrn = function shrn(bits) {
      return this.clone().ishrn(bits);
    };
    BN2.prototype.ushrn = function ushrn(bits) {
      return this.clone().iushrn(bits);
    };
    BN2.prototype.testn = function testn(bit) {
      assert(typeof bit === "number" && bit >= 0);
      var r = bit % 26;
      var s = (bit - r) / 26;
      var q = 1 << r;
      if (this.length <= s)
        return false;
      var w = this.words[s];
      return !!(w & q);
    };
    BN2.prototype.imaskn = function imaskn(bits) {
      assert(typeof bits === "number" && bits >= 0);
      var r = bits % 26;
      var s = (bits - r) / 26;
      assert(this.negative === 0, "imaskn works only with positive numbers");
      if (this.length <= s) {
        return this;
      }
      if (r !== 0) {
        s++;
      }
      this.length = Math.min(s, this.length);
      if (r !== 0) {
        var mask = 67108863 ^ 67108863 >>> r << r;
        this.words[this.length - 1] &= mask;
      }
      return this.strip();
    };
    BN2.prototype.maskn = function maskn(bits) {
      return this.clone().imaskn(bits);
    };
    BN2.prototype.iaddn = function iaddn(num) {
      assert(typeof num === "number");
      assert(num < 67108864);
      if (num < 0)
        return this.isubn(-num);
      if (this.negative !== 0) {
        if (this.length === 1 && (this.words[0] | 0) < num) {
          this.words[0] = num - (this.words[0] | 0);
          this.negative = 0;
          return this;
        }
        this.negative = 0;
        this.isubn(num);
        this.negative = 1;
        return this;
      }
      return this._iaddn(num);
    };
    BN2.prototype._iaddn = function _iaddn(num) {
      this.words[0] += num;
      for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
        this.words[i] -= 67108864;
        if (i === this.length - 1) {
          this.words[i + 1] = 1;
        } else {
          this.words[i + 1]++;
        }
      }
      this.length = Math.max(this.length, i + 1);
      return this;
    };
    BN2.prototype.isubn = function isubn(num) {
      assert(typeof num === "number");
      assert(num < 67108864);
      if (num < 0)
        return this.iaddn(-num);
      if (this.negative !== 0) {
        this.negative = 0;
        this.iaddn(num);
        this.negative = 1;
        return this;
      }
      this.words[0] -= num;
      if (this.length === 1 && this.words[0] < 0) {
        this.words[0] = -this.words[0];
        this.negative = 1;
      } else {
        for (var i = 0; i < this.length && this.words[i] < 0; i++) {
          this.words[i] += 67108864;
          this.words[i + 1] -= 1;
        }
      }
      return this.strip();
    };
    BN2.prototype.addn = function addn(num) {
      return this.clone().iaddn(num);
    };
    BN2.prototype.subn = function subn(num) {
      return this.clone().isubn(num);
    };
    BN2.prototype.iabs = function iabs() {
      this.negative = 0;
      return this;
    };
    BN2.prototype.abs = function abs() {
      return this.clone().iabs();
    };
    BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
      var len = num.length + shift;
      var i;
      this._expand(len);
      var w;
      var carry = 0;
      for (i = 0; i < num.length; i++) {
        w = (this.words[i + shift] | 0) + carry;
        var right = (num.words[i] | 0) * mul;
        w -= right & 67108863;
        carry = (w >> 26) - (right / 67108864 | 0);
        this.words[i + shift] = w & 67108863;
      }
      for (; i < this.length - shift; i++) {
        w = (this.words[i + shift] | 0) + carry;
        carry = w >> 26;
        this.words[i + shift] = w & 67108863;
      }
      if (carry === 0)
        return this.strip();
      assert(carry === -1);
      carry = 0;
      for (i = 0; i < this.length; i++) {
        w = -(this.words[i] | 0) + carry;
        carry = w >> 26;
        this.words[i] = w & 67108863;
      }
      this.negative = 1;
      return this.strip();
    };
    BN2.prototype._wordDiv = function _wordDiv(num, mode) {
      var shift = this.length - num.length;
      var a = this.clone();
      var b = num;
      var bhi = b.words[b.length - 1] | 0;
      var bhiBits = this._countBits(bhi);
      shift = 26 - bhiBits;
      if (shift !== 0) {
        b = b.ushln(shift);
        a.iushln(shift);
        bhi = b.words[b.length - 1] | 0;
      }
      var m = a.length - b.length;
      var q;
      if (mode !== "mod") {
        q = new BN2(null);
        q.length = m + 1;
        q.words = new Array(q.length);
        for (var i = 0; i < q.length; i++) {
          q.words[i] = 0;
        }
      }
      var diff = a.clone()._ishlnsubmul(b, 1, m);
      if (diff.negative === 0) {
        a = diff;
        if (q) {
          q.words[m] = 1;
        }
      }
      for (var j = m - 1; j >= 0; j--) {
        var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
        qj = Math.min(qj / bhi | 0, 67108863);
        a._ishlnsubmul(b, qj, j);
        while (a.negative !== 0) {
          qj--;
          a.negative = 0;
          a._ishlnsubmul(b, 1, j);
          if (!a.isZero()) {
            a.negative ^= 1;
          }
        }
        if (q) {
          q.words[j] = qj;
        }
      }
      if (q) {
        q.strip();
      }
      a.strip();
      if (mode !== "div" && shift !== 0) {
        a.iushrn(shift);
      }
      return {
        div: q || null,
        mod: a
      };
    };
    BN2.prototype.divmod = function divmod(num, mode, positive) {
      assert(!num.isZero());
      if (this.isZero()) {
        return {
          div: new BN2(0),
          mod: new BN2(0)
        };
      }
      var div, mod, res;
      if (this.negative !== 0 && num.negative === 0) {
        res = this.neg().divmod(num, mode);
        if (mode !== "mod") {
          div = res.div.neg();
        }
        if (mode !== "div") {
          mod = res.mod.neg();
          if (positive && mod.negative !== 0) {
            mod.iadd(num);
          }
        }
        return {
          div,
          mod
        };
      }
      if (this.negative === 0 && num.negative !== 0) {
        res = this.divmod(num.neg(), mode);
        if (mode !== "mod") {
          div = res.div.neg();
        }
        return {
          div,
          mod: res.mod
        };
      }
      if ((this.negative & num.negative) !== 0) {
        res = this.neg().divmod(num.neg(), mode);
        if (mode !== "div") {
          mod = res.mod.neg();
          if (positive && mod.negative !== 0) {
            mod.isub(num);
          }
        }
        return {
          div: res.div,
          mod
        };
      }
      if (num.length > this.length || this.cmp(num) < 0) {
        return {
          div: new BN2(0),
          mod: this
        };
      }
      if (num.length === 1) {
        if (mode === "div") {
          return {
            div: this.divn(num.words[0]),
            mod: null
          };
        }
        if (mode === "mod") {
          return {
            div: null,
            mod: new BN2(this.modn(num.words[0]))
          };
        }
        return {
          div: this.divn(num.words[0]),
          mod: new BN2(this.modn(num.words[0]))
        };
      }
      return this._wordDiv(num, mode);
    };
    BN2.prototype.div = function div(num) {
      return this.divmod(num, "div", false).div;
    };
    BN2.prototype.mod = function mod(num) {
      return this.divmod(num, "mod", false).mod;
    };
    BN2.prototype.umod = function umod(num) {
      return this.divmod(num, "mod", true).mod;
    };
    BN2.prototype.divRound = function divRound(num) {
      var dm = this.divmod(num);
      if (dm.mod.isZero())
        return dm.div;
      var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
      var half = num.ushrn(1);
      var r2 = num.andln(1);
      var cmp = mod.cmp(half);
      if (cmp < 0 || r2 === 1 && cmp === 0)
        return dm.div;
      return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
    };
    BN2.prototype.modn = function modn(num) {
      assert(num <= 67108863);
      var p = (1 << 26) % num;
      var acc = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        acc = (p * acc + (this.words[i] | 0)) % num;
      }
      return acc;
    };
    BN2.prototype.idivn = function idivn(num) {
      assert(num <= 67108863);
      var carry = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        var w = (this.words[i] | 0) + carry * 67108864;
        this.words[i] = w / num | 0;
        carry = w % num;
      }
      return this.strip();
    };
    BN2.prototype.divn = function divn(num) {
      return this.clone().idivn(num);
    };
    BN2.prototype.egcd = function egcd(p) {
      assert(p.negative === 0);
      assert(!p.isZero());
      var x = this;
      var y = p.clone();
      if (x.negative !== 0) {
        x = x.umod(p);
      } else {
        x = x.clone();
      }
      var A = new BN2(1);
      var B = new BN2(0);
      var C = new BN2(0);
      var D = new BN2(1);
      var g = 0;
      while (x.isEven() && y.isEven()) {
        x.iushrn(1);
        y.iushrn(1);
        ++g;
      }
      var yp = y.clone();
      var xp = x.clone();
      while (!x.isZero()) {
        for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
          ;
        if (i > 0) {
          x.iushrn(i);
          while (i-- > 0) {
            if (A.isOdd() || B.isOdd()) {
              A.iadd(yp);
              B.isub(xp);
            }
            A.iushrn(1);
            B.iushrn(1);
          }
        }
        for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
          ;
        if (j > 0) {
          y.iushrn(j);
          while (j-- > 0) {
            if (C.isOdd() || D.isOdd()) {
              C.iadd(yp);
              D.isub(xp);
            }
            C.iushrn(1);
            D.iushrn(1);
          }
        }
        if (x.cmp(y) >= 0) {
          x.isub(y);
          A.isub(C);
          B.isub(D);
        } else {
          y.isub(x);
          C.isub(A);
          D.isub(B);
        }
      }
      return {
        a: C,
        b: D,
        gcd: y.iushln(g)
      };
    };
    BN2.prototype._invmp = function _invmp(p) {
      assert(p.negative === 0);
      assert(!p.isZero());
      var a = this;
      var b = p.clone();
      if (a.negative !== 0) {
        a = a.umod(p);
      } else {
        a = a.clone();
      }
      var x1 = new BN2(1);
      var x2 = new BN2(0);
      var delta = b.clone();
      while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
        for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
          ;
        if (i > 0) {
          a.iushrn(i);
          while (i-- > 0) {
            if (x1.isOdd()) {
              x1.iadd(delta);
            }
            x1.iushrn(1);
          }
        }
        for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
          ;
        if (j > 0) {
          b.iushrn(j);
          while (j-- > 0) {
            if (x2.isOdd()) {
              x2.iadd(delta);
            }
            x2.iushrn(1);
          }
        }
        if (a.cmp(b) >= 0) {
          a.isub(b);
          x1.isub(x2);
        } else {
          b.isub(a);
          x2.isub(x1);
        }
      }
      var res;
      if (a.cmpn(1) === 0) {
        res = x1;
      } else {
        res = x2;
      }
      if (res.cmpn(0) < 0) {
        res.iadd(p);
      }
      return res;
    };
    BN2.prototype.gcd = function gcd(num) {
      if (this.isZero())
        return num.abs();
      if (num.isZero())
        return this.abs();
      var a = this.clone();
      var b = num.clone();
      a.negative = 0;
      b.negative = 0;
      for (var shift = 0; a.isEven() && b.isEven(); shift++) {
        a.iushrn(1);
        b.iushrn(1);
      }
      do {
        while (a.isEven()) {
          a.iushrn(1);
        }
        while (b.isEven()) {
          b.iushrn(1);
        }
        var r = a.cmp(b);
        if (r < 0) {
          var t = a;
          a = b;
          b = t;
        } else if (r === 0 || b.cmpn(1) === 0) {
          break;
        }
        a.isub(b);
      } while (true);
      return b.iushln(shift);
    };
    BN2.prototype.invm = function invm(num) {
      return this.egcd(num).a.umod(num);
    };
    BN2.prototype.isEven = function isEven() {
      return (this.words[0] & 1) === 0;
    };
    BN2.prototype.isOdd = function isOdd() {
      return (this.words[0] & 1) === 1;
    };
    BN2.prototype.andln = function andln(num) {
      return this.words[0] & num;
    };
    BN2.prototype.bincn = function bincn(bit) {
      assert(typeof bit === "number");
      var r = bit % 26;
      var s = (bit - r) / 26;
      var q = 1 << r;
      if (this.length <= s) {
        this._expand(s + 1);
        this.words[s] |= q;
        return this;
      }
      var carry = q;
      for (var i = s; carry !== 0 && i < this.length; i++) {
        var w = this.words[i] | 0;
        w += carry;
        carry = w >>> 26;
        w &= 67108863;
        this.words[i] = w;
      }
      if (carry !== 0) {
        this.words[i] = carry;
        this.length++;
      }
      return this;
    };
    BN2.prototype.isZero = function isZero() {
      return this.length === 1 && this.words[0] === 0;
    };
    BN2.prototype.cmpn = function cmpn(num) {
      var negative = num < 0;
      if (this.negative !== 0 && !negative)
        return -1;
      if (this.negative === 0 && negative)
        return 1;
      this.strip();
      var res;
      if (this.length > 1) {
        res = 1;
      } else {
        if (negative) {
          num = -num;
        }
        assert(num <= 67108863, "Number is too big");
        var w = this.words[0] | 0;
        res = w === num ? 0 : w < num ? -1 : 1;
      }
      if (this.negative !== 0)
        return -res | 0;
      return res;
    };
    BN2.prototype.cmp = function cmp(num) {
      if (this.negative !== 0 && num.negative === 0)
        return -1;
      if (this.negative === 0 && num.negative !== 0)
        return 1;
      var res = this.ucmp(num);
      if (this.negative !== 0)
        return -res | 0;
      return res;
    };
    BN2.prototype.ucmp = function ucmp(num) {
      if (this.length > num.length)
        return 1;
      if (this.length < num.length)
        return -1;
      var res = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        var a = this.words[i] | 0;
        var b = num.words[i] | 0;
        if (a === b)
          continue;
        if (a < b) {
          res = -1;
        } else if (a > b) {
          res = 1;
        }
        break;
      }
      return res;
    };
    BN2.prototype.gtn = function gtn(num) {
      return this.cmpn(num) === 1;
    };
    BN2.prototype.gt = function gt2(num) {
      return this.cmp(num) === 1;
    };
    BN2.prototype.gten = function gten(num) {
      return this.cmpn(num) >= 0;
    };
    BN2.prototype.gte = function gte2(num) {
      return this.cmp(num) >= 0;
    };
    BN2.prototype.ltn = function ltn(num) {
      return this.cmpn(num) === -1;
    };
    BN2.prototype.lt = function lt2(num) {
      return this.cmp(num) === -1;
    };
    BN2.prototype.lten = function lten(num) {
      return this.cmpn(num) <= 0;
    };
    BN2.prototype.lte = function lte2(num) {
      return this.cmp(num) <= 0;
    };
    BN2.prototype.eqn = function eqn(num) {
      return this.cmpn(num) === 0;
    };
    BN2.prototype.eq = function eq(num) {
      return this.cmp(num) === 0;
    };
    BN2.red = function red(num) {
      return new Red(num);
    };
    BN2.prototype.toRed = function toRed(ctx) {
      assert(!this.red, "Already a number in reduction context");
      assert(this.negative === 0, "red works only with positives");
      return ctx.convertTo(this)._forceRed(ctx);
    };
    BN2.prototype.fromRed = function fromRed() {
      assert(this.red, "fromRed works only with numbers in reduction context");
      return this.red.convertFrom(this);
    };
    BN2.prototype._forceRed = function _forceRed(ctx) {
      this.red = ctx;
      return this;
    };
    BN2.prototype.forceRed = function forceRed(ctx) {
      assert(!this.red, "Already a number in reduction context");
      return this._forceRed(ctx);
    };
    BN2.prototype.redAdd = function redAdd(num) {
      assert(this.red, "redAdd works only with red numbers");
      return this.red.add(this, num);
    };
    BN2.prototype.redIAdd = function redIAdd(num) {
      assert(this.red, "redIAdd works only with red numbers");
      return this.red.iadd(this, num);
    };
    BN2.prototype.redSub = function redSub(num) {
      assert(this.red, "redSub works only with red numbers");
      return this.red.sub(this, num);
    };
    BN2.prototype.redISub = function redISub(num) {
      assert(this.red, "redISub works only with red numbers");
      return this.red.isub(this, num);
    };
    BN2.prototype.redShl = function redShl(num) {
      assert(this.red, "redShl works only with red numbers");
      return this.red.shl(this, num);
    };
    BN2.prototype.redMul = function redMul(num) {
      assert(this.red, "redMul works only with red numbers");
      this.red._verify2(this, num);
      return this.red.mul(this, num);
    };
    BN2.prototype.redIMul = function redIMul(num) {
      assert(this.red, "redMul works only with red numbers");
      this.red._verify2(this, num);
      return this.red.imul(this, num);
    };
    BN2.prototype.redSqr = function redSqr() {
      assert(this.red, "redSqr works only with red numbers");
      this.red._verify1(this);
      return this.red.sqr(this);
    };
    BN2.prototype.redISqr = function redISqr() {
      assert(this.red, "redISqr works only with red numbers");
      this.red._verify1(this);
      return this.red.isqr(this);
    };
    BN2.prototype.redSqrt = function redSqrt() {
      assert(this.red, "redSqrt works only with red numbers");
      this.red._verify1(this);
      return this.red.sqrt(this);
    };
    BN2.prototype.redInvm = function redInvm() {
      assert(this.red, "redInvm works only with red numbers");
      this.red._verify1(this);
      return this.red.invm(this);
    };
    BN2.prototype.redNeg = function redNeg() {
      assert(this.red, "redNeg works only with red numbers");
      this.red._verify1(this);
      return this.red.neg(this);
    };
    BN2.prototype.redPow = function redPow(num) {
      assert(this.red && !num.red, "redPow(normalNum)");
      this.red._verify1(this);
      return this.red.pow(this, num);
    };
    var primes = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function MPrime(name, p) {
      this.name = name;
      this.p = new BN2(p, 16);
      this.n = this.p.bitLength();
      this.k = new BN2(1).iushln(this.n).isub(this.p);
      this.tmp = this._tmp();
    }
    MPrime.prototype._tmp = function _tmp() {
      var tmp = new BN2(null);
      tmp.words = new Array(Math.ceil(this.n / 13));
      return tmp;
    };
    MPrime.prototype.ireduce = function ireduce(num) {
      var r = num;
      var rlen;
      do {
        this.split(r, this.tmp);
        r = this.imulK(r);
        r = r.iadd(this.tmp);
        rlen = r.bitLength();
      } while (rlen > this.n);
      var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
      if (cmp === 0) {
        r.words[0] = 0;
        r.length = 1;
      } else if (cmp > 0) {
        r.isub(this.p);
      } else {
        if (r.strip !== void 0) {
          r.strip();
        } else {
          r._strip();
        }
      }
      return r;
    };
    MPrime.prototype.split = function split(input, out) {
      input.iushrn(this.n, 0, out);
    };
    MPrime.prototype.imulK = function imulK(num) {
      return num.imul(this.k);
    };
    function K256() {
      MPrime.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    inherits2(K256, MPrime);
    K256.prototype.split = function split(input, output) {
      var mask = 4194303;
      var outLen = Math.min(input.length, 9);
      for (var i = 0; i < outLen; i++) {
        output.words[i] = input.words[i];
      }
      output.length = outLen;
      if (input.length <= 9) {
        input.words[0] = 0;
        input.length = 1;
        return;
      }
      var prev = input.words[9];
      output.words[output.length++] = prev & mask;
      for (i = 10; i < input.length; i++) {
        var next = input.words[i] | 0;
        input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
        prev = next;
      }
      prev >>>= 22;
      input.words[i - 10] = prev;
      if (prev === 0 && input.length > 10) {
        input.length -= 10;
      } else {
        input.length -= 9;
      }
    };
    K256.prototype.imulK = function imulK(num) {
      num.words[num.length] = 0;
      num.words[num.length + 1] = 0;
      num.length += 2;
      var lo = 0;
      for (var i = 0; i < num.length; i++) {
        var w = num.words[i] | 0;
        lo += w * 977;
        num.words[i] = lo & 67108863;
        lo = w * 64 + (lo / 67108864 | 0);
      }
      if (num.words[num.length - 1] === 0) {
        num.length--;
        if (num.words[num.length - 1] === 0) {
          num.length--;
        }
      }
      return num;
    };
    function P224() {
      MPrime.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    inherits2(P224, MPrime);
    function P192() {
      MPrime.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    inherits2(P192, MPrime);
    function P25519() {
      MPrime.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    inherits2(P25519, MPrime);
    P25519.prototype.imulK = function imulK(num) {
      var carry = 0;
      for (var i = 0; i < num.length; i++) {
        var hi = (num.words[i] | 0) * 19 + carry;
        var lo = hi & 67108863;
        hi >>>= 26;
        num.words[i] = lo;
        carry = hi;
      }
      if (carry !== 0) {
        num.words[num.length++] = carry;
      }
      return num;
    };
    BN2._prime = function prime(name) {
      if (primes[name])
        return primes[name];
      var prime2;
      if (name === "k256") {
        prime2 = new K256();
      } else if (name === "p224") {
        prime2 = new P224();
      } else if (name === "p192") {
        prime2 = new P192();
      } else if (name === "p25519") {
        prime2 = new P25519();
      } else {
        throw new Error("Unknown prime " + name);
      }
      primes[name] = prime2;
      return prime2;
    };
    function Red(m) {
      if (typeof m === "string") {
        var prime = BN2._prime(m);
        this.m = prime.p;
        this.prime = prime;
      } else {
        assert(m.gtn(1), "modulus must be greater than 1");
        this.m = m;
        this.prime = null;
      }
    }
    Red.prototype._verify1 = function _verify1(a) {
      assert(a.negative === 0, "red works only with positives");
      assert(a.red, "red works only with red numbers");
    };
    Red.prototype._verify2 = function _verify2(a, b) {
      assert((a.negative | b.negative) === 0, "red works only with positives");
      assert(
        a.red && a.red === b.red,
        "red works only with red numbers"
      );
    };
    Red.prototype.imod = function imod(a) {
      if (this.prime)
        return this.prime.ireduce(a)._forceRed(this);
      return a.umod(this.m)._forceRed(this);
    };
    Red.prototype.neg = function neg(a) {
      if (a.isZero()) {
        return a.clone();
      }
      return this.m.sub(a)._forceRed(this);
    };
    Red.prototype.add = function add(a, b) {
      this._verify2(a, b);
      var res = a.add(b);
      if (res.cmp(this.m) >= 0) {
        res.isub(this.m);
      }
      return res._forceRed(this);
    };
    Red.prototype.iadd = function iadd(a, b) {
      this._verify2(a, b);
      var res = a.iadd(b);
      if (res.cmp(this.m) >= 0) {
        res.isub(this.m);
      }
      return res;
    };
    Red.prototype.sub = function sub(a, b) {
      this._verify2(a, b);
      var res = a.sub(b);
      if (res.cmpn(0) < 0) {
        res.iadd(this.m);
      }
      return res._forceRed(this);
    };
    Red.prototype.isub = function isub(a, b) {
      this._verify2(a, b);
      var res = a.isub(b);
      if (res.cmpn(0) < 0) {
        res.iadd(this.m);
      }
      return res;
    };
    Red.prototype.shl = function shl(a, num) {
      this._verify1(a);
      return this.imod(a.ushln(num));
    };
    Red.prototype.imul = function imul(a, b) {
      this._verify2(a, b);
      return this.imod(a.imul(b));
    };
    Red.prototype.mul = function mul(a, b) {
      this._verify2(a, b);
      return this.imod(a.mul(b));
    };
    Red.prototype.isqr = function isqr(a) {
      return this.imul(a, a.clone());
    };
    Red.prototype.sqr = function sqr(a) {
      return this.mul(a, a);
    };
    Red.prototype.sqrt = function sqrt(a) {
      if (a.isZero())
        return a.clone();
      var mod3 = this.m.andln(3);
      assert(mod3 % 2 === 1);
      if (mod3 === 3) {
        var pow = this.m.add(new BN2(1)).iushrn(2);
        return this.pow(a, pow);
      }
      var q = this.m.subn(1);
      var s = 0;
      while (!q.isZero() && q.andln(1) === 0) {
        s++;
        q.iushrn(1);
      }
      assert(!q.isZero());
      var one2 = new BN2(1).toRed(this);
      var nOne = one2.redNeg();
      var lpow = this.m.subn(1).iushrn(1);
      var z = this.m.bitLength();
      z = new BN2(2 * z * z).toRed(this);
      while (this.pow(z, lpow).cmp(nOne) !== 0) {
        z.redIAdd(nOne);
      }
      var c = this.pow(z, q);
      var r = this.pow(a, q.addn(1).iushrn(1));
      var t = this.pow(a, q);
      var m = s;
      while (t.cmp(one2) !== 0) {
        var tmp = t;
        for (var i = 0; tmp.cmp(one2) !== 0; i++) {
          tmp = tmp.redSqr();
        }
        assert(i < m);
        var b = this.pow(c, new BN2(1).iushln(m - i - 1));
        r = r.redMul(b);
        c = b.redSqr();
        t = t.redMul(c);
        m = i;
      }
      return r;
    };
    Red.prototype.invm = function invm(a) {
      var inv = a._invmp(this.m);
      if (inv.negative !== 0) {
        inv.negative = 0;
        return this.imod(inv).redNeg();
      } else {
        return this.imod(inv);
      }
    };
    Red.prototype.pow = function pow(a, num) {
      if (num.isZero())
        return new BN2(1).toRed(this);
      if (num.cmpn(1) === 0)
        return a.clone();
      var windowSize = 4;
      var wnd = new Array(1 << windowSize);
      wnd[0] = new BN2(1).toRed(this);
      wnd[1] = a;
      for (var i = 2; i < wnd.length; i++) {
        wnd[i] = this.mul(wnd[i - 1], a);
      }
      var res = wnd[0];
      var current = 0;
      var currentLen = 0;
      var start2 = num.bitLength() % 26;
      if (start2 === 0) {
        start2 = 26;
      }
      for (i = num.length - 1; i >= 0; i--) {
        var word = num.words[i];
        for (var j = start2 - 1; j >= 0; j--) {
          var bit = word >> j & 1;
          if (res !== wnd[0]) {
            res = this.sqr(res);
          }
          if (bit === 0 && current === 0) {
            currentLen = 0;
            continue;
          }
          current <<= 1;
          current |= bit;
          currentLen++;
          if (currentLen !== windowSize && (i !== 0 || j !== 0))
            continue;
          res = this.mul(res, wnd[current]);
          currentLen = 0;
          current = 0;
        }
        start2 = 26;
      }
      return res;
    };
    Red.prototype.convertTo = function convertTo(num) {
      var r = num.umod(this.m);
      return r === num ? r.clone() : r;
    };
    Red.prototype.convertFrom = function convertFrom(num) {
      var res = num.clone();
      res.red = null;
      return res;
    };
    BN2.mont = function mont(num) {
      return new Mont(num);
    };
    function Mont(m) {
      Red.call(this, m);
      this.shift = this.m.bitLength();
      if (this.shift % 26 !== 0) {
        this.shift += 26 - this.shift % 26;
      }
      this.r = new BN2(1).iushln(this.shift);
      this.r2 = this.imod(this.r.sqr());
      this.rinv = this.r._invmp(this.m);
      this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
      this.minv = this.minv.umod(this.r);
      this.minv = this.r.sub(this.minv);
    }
    inherits2(Mont, Red);
    Mont.prototype.convertTo = function convertTo(num) {
      return this.imod(num.ushln(this.shift));
    };
    Mont.prototype.convertFrom = function convertFrom(num) {
      var r = this.imod(num.mul(this.rinv));
      r.red = null;
      return r;
    };
    Mont.prototype.imul = function imul(a, b) {
      if (a.isZero() || b.isZero()) {
        a.words[0] = 0;
        a.length = 1;
        return a;
      }
      var t = a.imul(b);
      var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
      var u = t.isub(c).iushrn(this.shift);
      var res = u;
      if (u.cmp(this.m) >= 0) {
        res = u.isub(this.m);
      } else if (u.cmpn(0) < 0) {
        res = u.iadd(this.m);
      }
      return res._forceRed(this);
    };
    Mont.prototype.mul = function mul(a, b) {
      if (a.isZero() || b.isZero())
        return new BN2(0)._forceRed(this);
      var t = a.mul(b);
      var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
      var u = t.isub(c).iushrn(this.shift);
      var res = u;
      if (u.cmp(this.m) >= 0) {
        res = u.isub(this.m);
      } else if (u.cmpn(0) < 0) {
        res = u.iadd(this.m);
      }
      return res._forceRed(this);
    };
    Mont.prototype.invm = function invm(a) {
      var res = this.imod(a._invmp(this.m).mul(this.r2));
      return res._forceRed(this);
    };
  })(module2, commonjsGlobal);
})(bn);
const Buffer$4 = safeBufferExports.Buffer;
var bufferPipe$1 = class BufferPipe {
  /**
   * Creates a new instance of a pipe
   * @param {Buffer} buf - an optional buffer to start with
   */
  constructor(buf = Buffer$4.from([])) {
    this.buffer = buf;
  }
  /**
   * read `num` number of bytes from the pipe
   * @param {Number} num
   * @return {Buffer}
   */
  read(num) {
    const data2 = this.buffer.subarray(0, num);
    this.buffer = this.buffer.subarray(num);
    return data2;
  }
  /**
   * Wites a buffer to the pipe
   * @param {Buffer} buf
   */
  write(buf) {
    buf = Buffer$4.from(buf);
    this.buffer = Buffer$4.concat([this.buffer, buf]);
  }
};
const Bn$1 = bnExports;
const Pipe$2 = bufferPipe$1;
var unsigned = {
  encode: encode$1,
  decode: decode$1,
  read: read$1,
  readBn: readBn$1,
  write: write$1
};
function read$1(stream) {
  return readBn$1(stream).toString();
}
function readBn$1(stream) {
  const num = new Bn$1(0);
  let shift = 0;
  let byt;
  while (true) {
    byt = stream.read(1)[0];
    num.ior(new Bn$1(byt & 127).shln(shift));
    if (byt >> 7 === 0) {
      break;
    } else {
      shift += 7;
    }
  }
  return num;
}
function write$1(number, stream) {
  const num = new Bn$1(number);
  while (true) {
    const i = num.maskn(7).toNumber();
    num.ishrn(7);
    if (num.isZero()) {
      stream.write([i]);
      break;
    } else {
      stream.write([i | 128]);
    }
  }
}
function encode$1(num) {
  const stream = new Pipe$2();
  write$1(num, stream);
  return stream.buffer;
}
function decode$1(buffer2) {
  const stream = new Pipe$2(buffer2);
  return read$1(stream);
}
const Bn = bnExports;
const Pipe$1 = bufferPipe$1;
var signed = {
  encode,
  decode,
  write,
  read,
  readBn
};
function read(stream) {
  return readBn(stream).toString();
}
function readBn(stream) {
  const num = new Bn(0);
  let shift = 0;
  let byt;
  while (true) {
    byt = stream.read(1)[0];
    num.ior(new Bn(byt & 127).shln(shift));
    shift += 7;
    if (byt >> 7 === 0) {
      break;
    }
  }
  if (byt & 64) {
    num.setn(shift);
  }
  return num.fromTwos(shift);
}
function write(number, stream) {
  let num = new Bn(number);
  const isNeg = num.isNeg();
  if (isNeg) {
    num = num.toTwos(num.bitLength() + 8);
  }
  while (true) {
    const i = num.maskn(7).toNumber();
    num.ishrn(7);
    if (isNegOne(num) && (i & 64) !== 0 || num.isZero() && (i & 64) === 0) {
      stream.write([i]);
      break;
    } else {
      stream.write([i | 128]);
    }
  }
  function isNegOne(num2) {
    return isNeg && num2.toString(2).indexOf("0") < 0;
  }
}
function encode(num) {
  const stream = new Pipe$1();
  write(num, stream);
  return stream.buffer;
}
function decode(buffer2) {
  const stream = new Pipe$1(buffer2);
  return read(stream);
}
leb128$1.unsigned = unsigned;
leb128$1.signed = signed;
const Buffer$3 = safeBufferExports.Buffer;
var bufferPipe = class BufferPipe2 {
  /**
   * Creates a new instance of a pipe
   * @param {Buffer} buf - an optional buffer to start with
   */
  constructor(buf = Buffer$3.from([])) {
    this.buffer = buf;
    this._bytesRead = 0;
    this._bytesWrote = 0;
  }
  /**
   * read `num` number of bytes from the pipe
   * @param {Number} num
   * @return {Buffer}
   */
  read(num) {
    this._bytesRead += num;
    const data2 = this.buffer.slice(0, num);
    this.buffer = this.buffer.slice(num);
    return data2;
  }
  /**
   * Wites a buffer to the pipe
   * @param {Buffer} buf
   */
  write(buf) {
    buf = Buffer$3.from(buf);
    this._bytesWrote += buf.length;
    this.buffer = Buffer$3.concat([this.buffer, buf]);
  }
  /**
   * Whether or not there is more data to read from the buffer
   * returns {Boolean}
   */
  get end() {
    return !this.buffer.length;
  }
  /**
   * returns the number of bytes read from the stream
   * @return {Integer}
   */
  get bytesRead() {
    return this._bytesRead;
  }
  /**
   * returns the number of bytes wrote to the stream
   * @return {Integer}
   */
  get bytesWrote() {
    return this._bytesWrote;
  }
};
const block = "block_type";
const loop = "block_type";
const br = "varuint32";
const br_if = "varuint32";
const br_table = "br_table";
const call = "varuint32";
const call_indirect = "call_indirect";
const get_local = "varuint32";
const set_local = "varuint32";
const tee_local = "varuint32";
const get_global = "varuint32";
const set_global = "varuint32";
const load = "memory_immediate";
const load8_s = "memory_immediate";
const load8_u = "memory_immediate";
const load16_s = "memory_immediate";
const load16_u = "memory_immediate";
const load32_s = "memory_immediate";
const load32_u = "memory_immediate";
const store = "memory_immediate";
const store8 = "memory_immediate";
const store16 = "memory_immediate";
const store32 = "memory_immediate";
const current_memory = "varuint1";
const grow_memory = "varuint1";
const i32 = "varint32";
const i64 = "varint64";
const f32 = "uint32";
const f64 = "uint64";
const require$$0$1 = {
  block,
  loop,
  "if": "block_type",
  br,
  br_if,
  br_table,
  call,
  call_indirect,
  get_local,
  set_local,
  tee_local,
  get_global,
  set_global,
  load,
  load8_s,
  load8_u,
  load16_s,
  load16_u,
  load32_s,
  load32_u,
  store,
  store8,
  store16,
  store32,
  current_memory,
  grow_memory,
  i32,
  i64,
  f32,
  f64
};
const leb$1 = leb128$1;
const Stream$1 = bufferPipe;
const OP_IMMEDIATES$1 = require$$0$1;
const _exports$1 = wasm2json$1.exports = (buf, filter) => {
  const stream = new Stream$1(buf);
  return _exports$1.parse(stream, filter);
};
const LANGUAGE_TYPES$1 = _exports$1.LANGUAGE_TYPES = {
  127: "i32",
  126: "i64",
  125: "f32",
  124: "f64",
  112: "anyFunc",
  96: "func",
  64: "block_type"
};
const EXTERNAL_KIND$1 = _exports$1.EXTERNAL_KIND = {
  0: "function",
  1: "table",
  2: "memory",
  3: "global"
};
_exports$1.parsePreramble = (stream) => {
  const obj = {};
  obj.name = "preramble";
  obj.magic = [...stream.read(4)];
  obj.version = [...stream.read(4)];
  return obj;
};
_exports$1.parseSectionHeader = (stream) => {
  const id = stream.read(1)[0];
  const size = leb$1.unsigned.readBn(stream).toNumber();
  return {
    id,
    name: SECTION_IDS$1[id],
    size
  };
};
const OPCODES$1 = _exports$1.OPCODES = {
  // flow control
  0: "unreachable",
  1: "nop",
  2: "block",
  3: "loop",
  4: "if",
  5: "else",
  11: "end",
  12: "br",
  13: "br_if",
  14: "br_table",
  15: "return",
  // calls
  16: "call",
  17: "call_indirect",
  // Parametric operators
  26: "drop",
  27: "select",
  // Varibale access
  32: "get_local",
  33: "set_local",
  34: "tee_local",
  35: "get_global",
  36: "set_global",
  // Memory-related operators
  40: "i32.load",
  41: "i64.load",
  42: "f32.load",
  43: "f64.load",
  44: "i32.load8_s",
  45: "i32.load8_u",
  46: "i32.load16_s",
  47: "i32.load16_u",
  48: "i64.load8_s",
  49: "i64.load8_u",
  50: "i64.load16_s",
  51: "i64.load16_u",
  52: "i64.load32_s",
  53: "i64.load32_u",
  54: "i32.store",
  55: "i64.store",
  56: "f32.store",
  57: "f64.store",
  58: "i32.store8",
  59: "i32.store16",
  60: "i64.store8",
  61: "i64.store16",
  62: "i64.store32",
  63: "current_memory",
  64: "grow_memory",
  // Constants
  65: "i32.const",
  66: "i64.const",
  67: "f32.const",
  68: "f64.const",
  // Comparison operators
  69: "i32.eqz",
  70: "i32.eq",
  71: "i32.ne",
  72: "i32.lt_s",
  73: "i32.lt_u",
  74: "i32.gt_s",
  75: "i32.gt_u",
  76: "i32.le_s",
  77: "i32.le_u",
  78: "i32.ge_s",
  79: "i32.ge_u",
  80: "i64.eqz",
  81: "i64.eq",
  82: "i64.ne",
  83: "i64.lt_s",
  84: "i64.lt_u",
  85: "i64.gt_s",
  86: "i64.gt_u",
  87: "i64.le_s",
  88: "i64.le_u",
  89: "i64.ge_s",
  90: "i64.ge_u",
  91: "f32.eq",
  92: "f32.ne",
  93: "f32.lt",
  94: "f32.gt",
  95: "f32.le",
  96: "f32.ge",
  97: "f64.eq",
  98: "f64.ne",
  99: "f64.lt",
  100: "f64.gt",
  101: "f64.le",
  102: "f64.ge",
  // Numeric operators
  103: "i32.clz",
  104: "i32.ctz",
  105: "i32.popcnt",
  106: "i32.add",
  107: "i32.sub",
  108: "i32.mul",
  109: "i32.div_s",
  110: "i32.div_u",
  111: "i32.rem_s",
  112: "i32.rem_u",
  113: "i32.and",
  114: "i32.or",
  115: "i32.xor",
  116: "i32.shl",
  117: "i32.shr_s",
  118: "i32.shr_u",
  119: "i32.rotl",
  120: "i32.rotr",
  121: "i64.clz",
  122: "i64.ctz",
  123: "i64.popcnt",
  124: "i64.add",
  125: "i64.sub",
  126: "i64.mul",
  127: "i64.div_s",
  128: "i64.div_u",
  129: "i64.rem_s",
  130: "i64.rem_u",
  131: "i64.and",
  132: "i64.or",
  133: "i64.xor",
  134: "i64.shl",
  135: "i64.shr_s",
  136: "i64.shr_u",
  137: "i64.rotl",
  138: "i64.rotr",
  139: "f32.abs",
  140: "f32.neg",
  141: "f32.ceil",
  142: "f32.floor",
  143: "f32.trunc",
  144: "f32.nearest",
  145: "f32.sqrt",
  146: "f32.add",
  147: "f32.sub",
  148: "f32.mul",
  149: "f32.div",
  150: "f32.min",
  151: "f32.max",
  152: "f32.copysign",
  153: "f64.abs",
  154: "f64.neg",
  155: "f64.ceil",
  156: "f64.floor",
  157: "f64.trunc",
  158: "f64.nearest",
  159: "f64.sqrt",
  160: "f64.add",
  161: "f64.sub",
  162: "f64.mul",
  163: "f64.div",
  164: "f64.min",
  165: "f64.max",
  166: "f64.copysign",
  // Conversions
  167: "i32.wrap/i64",
  168: "i32.trunc_s/f32",
  169: "i32.trunc_u/f32",
  170: "i32.trunc_s/f64",
  171: "i32.trunc_u/f64",
  172: "i64.extend_s/i32",
  173: "i64.extend_u/i32",
  174: "i64.trunc_s/f32",
  175: "i64.trunc_u/f32",
  176: "i64.trunc_s/f64",
  177: "i64.trunc_u/f64",
  178: "f32.convert_s/i32",
  179: "f32.convert_u/i32",
  180: "f32.convert_s/i64",
  181: "f32.convert_u/i64",
  182: "f32.demote/f64",
  183: "f64.convert_s/i32",
  184: "f64.convert_u/i32",
  185: "f64.convert_s/i64",
  186: "f64.convert_u/i64",
  187: "f64.promote/f32",
  // Reinterpretations
  188: "i32.reinterpret/f32",
  189: "i64.reinterpret/f64",
  190: "f32.reinterpret/i32",
  191: "f64.reinterpret/i64",
  // Narrow-Width Integer Sign Extension
  192: "i32.extend8_s",
  193: "i32.extend16_s",
  194: "i64.extend8_s",
  195: "i64.extend16_s",
  196: "i64.extend32_s"
};
const SECTION_IDS$1 = _exports$1.SECTION_IDS = {
  0: "custom",
  1: "type",
  2: "import",
  3: "function",
  4: "table",
  5: "memory",
  6: "global",
  7: "export",
  8: "start",
  9: "element",
  10: "code",
  11: "data"
};
_exports$1.immediataryParsers = {
  "varuint1": (stream) => {
    const int1 = stream.read(1)[0];
    return int1;
  },
  "varuint32": (stream) => {
    const int32 = leb$1.unsigned.read(stream);
    return int32;
  },
  "varint32": (stream) => {
    const int32 = leb$1.signed.read(stream);
    return int32;
  },
  "varint64": (stream) => {
    const int64 = leb$1.signed.read(stream);
    return int64;
  },
  "uint32": (stream) => {
    return [...stream.read(4)];
  },
  "uint64": (stream) => {
    return [...stream.read(8)];
  },
  "block_type": (stream) => {
    const type2 = stream.read(1)[0];
    return LANGUAGE_TYPES$1[type2];
  },
  "br_table": (stream) => {
    const json = {
      targets: []
    };
    const num = leb$1.unsigned.readBn(stream).toNumber();
    for (let i = 0; i < num; i++) {
      const target = leb$1.unsigned.readBn(stream).toNumber();
      json.targets.push(target);
    }
    json.defaultTarget = leb$1.unsigned.readBn(stream).toNumber();
    return json;
  },
  "call_indirect": (stream) => {
    const json = {};
    json.index = leb$1.unsigned.readBn(stream).toNumber();
    json.reserved = stream.read(1)[0];
    return json;
  },
  "memory_immediate": (stream) => {
    const json = {};
    json.flags = leb$1.unsigned.readBn(stream).toNumber();
    json.offset = leb$1.unsigned.readBn(stream).toNumber();
    return json;
  }
};
_exports$1.typeParsers = {
  "function": (stream) => {
    return leb$1.unsigned.readBn(stream).toNumber();
  },
  table: (stream) => {
    const entry = {};
    const type2 = stream.read(1)[0];
    entry.elementType = LANGUAGE_TYPES$1[type2];
    entry.limits = _exports$1.typeParsers.memory(stream);
    return entry;
  },
  /**
   * parses a [`global_type`](https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#global_type)
   * @param {Stream} stream
   * @return {Object}
   */
  global: (stream) => {
    const global = {};
    let type2 = stream.read(1)[0];
    global.contentType = LANGUAGE_TYPES$1[type2];
    global.mutability = stream.read(1)[0];
    return global;
  },
  /**
   * Parses a [resizable_limits](https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#resizable_limits)
   * @param {Stream} stream
   * return {Object}
   */
  memory: (stream) => {
    const limits = {};
    limits.flags = leb$1.unsigned.readBn(stream).toNumber();
    limits.intial = leb$1.unsigned.readBn(stream).toNumber();
    if (limits.flags === 1) {
      limits.maximum = leb$1.unsigned.readBn(stream).toNumber();
    }
    return limits;
  },
  /**
   * Parses a [init_expr](https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#resizable_limits)
   * The encoding of an initializer expression is the normal encoding of the
   * expression followed by the end opcode as a delimiter.
   */
  initExpr: (stream) => {
    const op = _exports$1.parseOp(stream);
    stream.read(1);
    return op;
  }
};
const sectionParsers = _exports$1.sectionParsers = {
  "custom": (stream, header) => {
    const json = {
      name: "custom"
    };
    const section = new Stream$1(stream.read(header.size));
    const nameLen = leb$1.unsigned.readBn(section).toNumber();
    const name = section.read(nameLen);
    json.sectionName = Buffer.from(name).toString();
    json.payload = [...section.buffer];
    return json;
  },
  "type": (stream) => {
    const numberOfEntries = leb$1.unsigned.readBn(stream).toNumber();
    const json = {
      name: "type",
      entries: []
    };
    for (let i = 0; i < numberOfEntries; i++) {
      let type2 = stream.read(1)[0];
      const entry = {
        form: LANGUAGE_TYPES$1[type2],
        params: []
      };
      const paramCount = leb$1.unsigned.readBn(stream).toNumber();
      for (let q = 0; q < paramCount; q++) {
        const type3 = stream.read(1)[0];
        entry.params.push(LANGUAGE_TYPES$1[type3]);
      }
      const numOfReturns = leb$1.unsigned.readBn(stream).toNumber();
      if (numOfReturns) {
        type2 = stream.read(1)[0];
        entry.return_type = LANGUAGE_TYPES$1[type2];
      }
      json.entries.push(entry);
    }
    return json;
  },
  "import": (stream) => {
    const numberOfEntries = leb$1.unsigned.readBn(stream).toNumber();
    const json = {
      name: "import",
      entries: []
    };
    for (let i = 0; i < numberOfEntries; i++) {
      const entry = {};
      const moduleLen = leb$1.unsigned.readBn(stream).toNumber();
      entry.moduleStr = Buffer.from(stream.read(moduleLen)).toString();
      const fieldLen = leb$1.unsigned.readBn(stream).toNumber();
      entry.fieldStr = Buffer.from(stream.read(fieldLen)).toString();
      const kind = stream.read(1)[0];
      entry.kind = EXTERNAL_KIND$1[kind];
      entry.type = _exports$1.typeParsers[entry.kind](stream);
      json.entries.push(entry);
    }
    return json;
  },
  "function": (stream) => {
    const numberOfEntries = leb$1.unsigned.readBn(stream).toNumber();
    const json = {
      name: "function",
      entries: []
    };
    for (let i = 0; i < numberOfEntries; i++) {
      const entry = leb$1.unsigned.readBn(stream).toNumber();
      json.entries.push(entry);
    }
    return json;
  },
  "table": (stream) => {
    const numberOfEntries = leb$1.unsigned.readBn(stream).toNumber();
    const json = {
      name: "table",
      entries: []
    };
    for (let i = 0; i < numberOfEntries; i++) {
      const entry = _exports$1.typeParsers.table(stream);
      json.entries.push(entry);
    }
    return json;
  },
  "memory": (stream) => {
    const numberOfEntries = leb$1.unsigned.readBn(stream).toNumber();
    const json = {
      name: "memory",
      entries: []
    };
    for (let i = 0; i < numberOfEntries; i++) {
      const entry = _exports$1.typeParsers.memory(stream);
      json.entries.push(entry);
    }
    return json;
  },
  "global": (stream) => {
    const numberOfEntries = leb$1.unsigned.readBn(stream).toNumber();
    const json = {
      name: "global",
      entries: []
    };
    for (let i = 0; i < numberOfEntries; i++) {
      const entry = {};
      entry.type = _exports$1.typeParsers.global(stream);
      entry.init = _exports$1.typeParsers.initExpr(stream);
      json.entries.push(entry);
    }
    return json;
  },
  "export": (stream) => {
    const numberOfEntries = leb$1.unsigned.readBn(stream).toNumber();
    const json = {
      name: "export",
      entries: []
    };
    for (let i = 0; i < numberOfEntries; i++) {
      const strLength = leb$1.unsigned.readBn(stream).toNumber();
      const entry = {};
      entry.field_str = Buffer.from(stream.read(strLength)).toString();
      const kind = stream.read(1)[0];
      entry.kind = EXTERNAL_KIND$1[kind];
      entry.index = leb$1.unsigned.readBn(stream).toNumber();
      json.entries.push(entry);
    }
    return json;
  },
  "start": (stream) => {
    const json = {
      name: "start"
    };
    json.index = leb$1.unsigned.readBn(stream).toNumber();
    return json;
  },
  "element": (stream) => {
    const numberOfEntries = leb$1.unsigned.readBn(stream).toNumber();
    const json = {
      name: "element",
      entries: []
    };
    for (let i = 0; i < numberOfEntries; i++) {
      const entry = {
        elements: []
      };
      entry.index = leb$1.unsigned.readBn(stream).toNumber();
      entry.offset = _exports$1.typeParsers.initExpr(stream);
      const numElem = leb$1.unsigned.readBn(stream).toNumber();
      for (let i2 = 0; i2 < numElem; i2++) {
        const elem = leb$1.unsigned.readBn(stream).toNumber();
        entry.elements.push(elem);
      }
      json.entries.push(entry);
    }
    return json;
  },
  "code": (stream) => {
    const numberOfEntries = leb$1.unsigned.readBn(stream).toNumber();
    const json = {
      name: "code",
      entries: []
    };
    for (let i = 0; i < numberOfEntries; i++) {
      const codeBody = {
        locals: [],
        code: []
      };
      let bodySize = leb$1.unsigned.readBn(stream).toNumber();
      const endBytes = stream.bytesRead + bodySize;
      const localCount = leb$1.unsigned.readBn(stream).toNumber();
      for (let q = 0; q < localCount; q++) {
        const local = {};
        local.count = leb$1.unsigned.readBn(stream).toNumber();
        const type2 = stream.read(1)[0];
        local.type = LANGUAGE_TYPES$1[type2];
        codeBody.locals.push(local);
      }
      while (stream.bytesRead < endBytes) {
        const op = _exports$1.parseOp(stream);
        codeBody.code.push(op);
      }
      json.entries.push(codeBody);
    }
    return json;
  },
  "data": (stream) => {
    const numberOfEntries = leb$1.unsigned.readBn(stream).toNumber();
    const json = {
      name: "data",
      entries: []
    };
    for (let i = 0; i < numberOfEntries; i++) {
      const entry = {};
      entry.index = leb$1.unsigned.readBn(stream).toNumber();
      entry.offset = _exports$1.typeParsers.initExpr(stream);
      const segmentSize = leb$1.unsigned.readBn(stream).toNumber();
      entry.data = [...stream.read(segmentSize)];
      json.entries.push(entry);
    }
    return json;
  }
};
_exports$1.parseOp = (stream) => {
  const json = {};
  const op = stream.read(1)[0];
  const fullName = OPCODES$1[op];
  let [type2, name] = fullName.split(".");
  if (name === void 0) {
    name = type2;
  } else {
    json.return_type = type2;
  }
  json.name = name;
  const immediates2 = OP_IMMEDIATES$1[name === "const" ? type2 : name];
  if (immediates2) {
    json.immediates = _exports$1.immediataryParsers[immediates2](stream);
  }
  return json;
};
_exports$1.parse = (stream, filter) => {
  const preramble = _exports$1.parsePreramble(stream);
  const json = [preramble];
  while (!stream.end) {
    const header = _exports$1.parseSectionHeader(stream);
    json.push(sectionParsers[header.name](stream, header));
  }
  return json;
};
var json2wasmExports = {};
var json2wasm = {
  get exports() {
    return json2wasmExports;
  },
  set exports(v) {
    json2wasmExports = v;
  }
};
var npmBrowser = {};
commonjsGlobal.fetch = window.fetch;
npmBrowser.buffer = buffer.Buffer;
const Buffer$2 = npmBrowser.Buffer;
const leb = leb128$1;
const Stream = bufferPipe;
const OP_IMMEDIATES = require$$0$1;
const _exports = json2wasm.exports = (json) => {
  return _exports.generate(json).buffer;
};
const LANGUAGE_TYPES = _exports.LANGUAGE_TYPES = {
  i32: 127,
  i64: 126,
  f32: 125,
  f64: 124,
  anyFunc: 112,
  func: 96,
  block_type: 64
};
const EXTERNAL_KIND = _exports.EXTERNAL_KIND = {
  function: 0,
  table: 1,
  memory: 2,
  global: 3
};
const SECTION_IDS = _exports.SECTION_IDS = {
  custom: 0,
  type: 1,
  import: 2,
  function: 3,
  table: 4,
  memory: 5,
  global: 6,
  export: 7,
  start: 8,
  element: 9,
  code: 10,
  data: 11
};
const OPCODES = _exports.OPCODES = {
  unreachable: 0,
  nop: 1,
  block: 2,
  loop: 3,
  if: 4,
  else: 5,
  end: 11,
  br: 12,
  br_if: 13,
  br_table: 14,
  return: 15,
  call: 16,
  call_indirect: 17,
  drop: 26,
  select: 27,
  get_local: 32,
  set_local: 33,
  tee_local: 34,
  get_global: 35,
  set_global: 36,
  "i32.load": 40,
  "i64.load": 41,
  "f32.load": 42,
  "f64.load": 43,
  "i32.load8_s": 44,
  "i32.load8_u": 45,
  "i32.load16_s": 46,
  "i32.load16_u": 47,
  "i64.load8_s": 48,
  "i64.load8_u": 49,
  "i64.load16_s": 50,
  "i64.load16_u": 51,
  "i64.load32_s": 52,
  "i64.load32_u": 53,
  "i32.store": 54,
  "i64.store": 55,
  "f32.store": 56,
  "f64.store": 57,
  "i32.store8": 58,
  "i32.store16": 59,
  "i64.store8": 60,
  "i64.store16": 61,
  "i64.store32": 62,
  current_memory: 63,
  grow_memory: 64,
  "i32.const": 65,
  "i64.const": 66,
  "f32.const": 67,
  "f64.const": 68,
  "i32.eqz": 69,
  "i32.eq": 70,
  "i32.ne": 71,
  "i32.lt_s": 72,
  "i32.lt_u": 73,
  "i32.gt_s": 74,
  "i32.gt_u": 75,
  "i32.le_s": 76,
  "i32.le_u": 77,
  "i32.ge_s": 78,
  "i32.ge_u": 79,
  "i64.eqz": 80,
  "i64.eq": 81,
  "i64.ne": 82,
  "i64.lt_s": 83,
  "i64.lt_u": 84,
  "i64.gt_s": 85,
  "i64.gt_u": 86,
  "i64.le_s": 87,
  "i64.le_u": 88,
  "i64.ge_s": 89,
  "i64.ge_u": 90,
  "f32.eq": 91,
  "f32.ne": 92,
  "f32.lt": 93,
  "f32.gt": 94,
  "f32.le": 95,
  "f32.ge": 96,
  "f64.eq": 97,
  "f64.ne": 98,
  "f64.lt": 99,
  "f64.gt": 100,
  "f64.le": 101,
  "f64.ge": 102,
  "i32.clz": 103,
  "i32.ctz": 104,
  "i32.popcnt": 105,
  "i32.add": 106,
  "i32.sub": 107,
  "i32.mul": 108,
  "i32.div_s": 109,
  "i32.div_u": 110,
  "i32.rem_s": 111,
  "i32.rem_u": 112,
  "i32.and": 113,
  "i32.or": 114,
  "i32.xor": 115,
  "i32.shl": 116,
  "i32.shr_s": 117,
  "i32.shr_u": 118,
  "i32.rotl": 119,
  "i32.rotr": 120,
  "i64.clz": 121,
  "i64.ctz": 122,
  "i64.popcnt": 123,
  "i64.add": 124,
  "i64.sub": 125,
  "i64.mul": 126,
  "i64.div_s": 127,
  "i64.div_u": 128,
  "i64.rem_s": 129,
  "i64.rem_u": 130,
  "i64.and": 131,
  "i64.or": 132,
  "i64.xor": 133,
  "i64.shl": 134,
  "i64.shr_s": 135,
  "i64.shr_u": 136,
  "i64.rotl": 137,
  "i64.rotr": 138,
  "f32.abs": 139,
  "f32.neg": 140,
  "f32.ceil": 141,
  "f32.floor": 142,
  "f32.trunc": 143,
  "f32.nearest": 144,
  "f32.sqrt": 145,
  "f32.add": 146,
  "f32.sub": 147,
  "f32.mul": 148,
  "f32.div": 149,
  "f32.min": 150,
  "f32.max": 151,
  "f32.copysign": 152,
  "f64.abs": 153,
  "f64.neg": 154,
  "f64.ceil": 155,
  "f64.floor": 156,
  "f64.trunc": 157,
  "f64.nearest": 158,
  "f64.sqrt": 159,
  "f64.add": 160,
  "f64.sub": 161,
  "f64.mul": 162,
  "f64.div": 163,
  "f64.min": 164,
  "f64.max": 165,
  "f64.copysign": 166,
  "i32.wrap/i64": 167,
  "i32.trunc_s/f32": 168,
  "i32.trunc_u/f32": 169,
  "i32.trunc_s/f64": 170,
  "i32.trunc_u/f64": 171,
  "i64.extend_s/i32": 172,
  "i64.extend_u/i32": 173,
  "i64.trunc_s/f32": 174,
  "i64.trunc_u/f32": 175,
  "i64.trunc_s/f64": 176,
  "i64.trunc_u/f64": 177,
  "f32.convert_s/i32": 178,
  "f32.convert_u/i32": 179,
  "f32.convert_s/i64": 180,
  "f32.convert_u/i64": 181,
  "f32.demote/f64": 182,
  "f64.convert_s/i32": 183,
  "f64.convert_u/i32": 184,
  "f64.convert_s/i64": 185,
  "f64.convert_u/i64": 186,
  "f64.promote/f32": 187,
  "i32.reinterpret/f32": 188,
  "i64.reinterpret/f64": 189,
  "f32.reinterpret/i32": 190,
  "f64.reinterpret/i64": 191,
  "i32.extend8_s": 192,
  "i32.extend16_s": 193,
  "i64.extend8_s": 194,
  "i64.extend16_s": 195,
  "i64.extend32_s": 196
};
_exports.typeGenerators = {
  function: (json, stream) => {
    leb.unsigned.write(json, stream);
  },
  table: (json, stream) => {
    stream.write([LANGUAGE_TYPES[json.elementType]]);
    _exports.typeGenerators.memory(json.limits, stream);
  },
  /**
   * generates a [`global_type`](https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#global_type)
   */
  global: (json, stream) => {
    stream.write([LANGUAGE_TYPES[json.contentType]]);
    stream.write([json.mutability]);
  },
  /**
   * Generates a [resizable_limits](https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#resizable_limits)
   * @param {Object} json
   * @param {Stream} stream
   */
  memory: (json, stream) => {
    leb.unsigned.write(Number(json.maximum !== void 0), stream);
    leb.unsigned.write(json.intial, stream);
    if (json.maximum !== void 0) {
      leb.unsigned.write(json.maximum, stream);
    }
  },
  /**
   * Generates a [init_expr](https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#resizable_limits)
   * The encoding of an initializer expression is the normal encoding of the
   * expression followed by the end opcode as a delimiter.
   */
  initExpr: (json, stream) => {
    _exports.generateOp(json, stream);
    _exports.generateOp({ name: "end", type: "void" }, stream);
  }
};
_exports.immediataryGenerators = {
  varuint1: (json, stream) => {
    stream.write([json]);
    return stream;
  },
  varuint32: (json, stream) => {
    leb.unsigned.write(json, stream);
    return stream;
  },
  varint32: (json, stream) => {
    leb.signed.write(json, stream);
    return stream;
  },
  varint64: (json, stream) => {
    leb.signed.write(json, stream);
    return stream;
  },
  uint32: (json, stream) => {
    stream.write(json);
    return stream;
  },
  uint64: (json, stream) => {
    stream.write(json);
    return stream;
  },
  block_type: (json, stream) => {
    stream.write([LANGUAGE_TYPES[json]]);
    return stream;
  },
  br_table: (json, stream) => {
    leb.unsigned.write(json.targets.length, stream);
    for (let target of json.targets) {
      leb.unsigned.write(target, stream);
    }
    leb.unsigned.write(json.defaultTarget, stream);
    return stream;
  },
  call_indirect: (json, stream) => {
    leb.unsigned.write(json.index, stream);
    stream.write([json.reserved]);
    return stream;
  },
  memory_immediate: (json, stream) => {
    leb.unsigned.write(json.flags, stream);
    leb.unsigned.write(json.offset, stream);
    return stream;
  }
};
const entryGenerators = {
  type: (entry, stream = new Stream()) => {
    stream.write([LANGUAGE_TYPES[entry.form]]);
    const len = entry.params.length;
    leb.unsigned.write(len, stream);
    if (len !== 0) {
      stream.write(entry.params.map((type2) => LANGUAGE_TYPES[type2]));
    }
    stream.write([entry.return_type ? 1 : 0]);
    if (entry.return_type) {
      stream.write([LANGUAGE_TYPES[entry.return_type]]);
    }
    return stream.buffer;
  },
  import: (entry, stream = new Stream()) => {
    leb.unsigned.write(entry.moduleStr.length, stream);
    stream.write(entry.moduleStr);
    leb.unsigned.write(entry.fieldStr.length, stream);
    stream.write(entry.fieldStr);
    stream.write([EXTERNAL_KIND[entry.kind]]);
    _exports.typeGenerators[entry.kind](entry.type, stream);
  },
  function: (entry, stream = new Stream()) => {
    leb.unsigned.write(entry, stream);
    return stream.buffer;
  },
  table: _exports.typeGenerators.table,
  global: (entry, stream = new Stream()) => {
    _exports.typeGenerators.global(entry.type, stream);
    _exports.typeGenerators.initExpr(entry.init, stream);
    return stream;
  },
  memory: _exports.typeGenerators.memory,
  export: (entry, stream = new Stream()) => {
    const fieldStr = Buffer$2.from(entry.field_str);
    const strLen = fieldStr.length;
    leb.unsigned.write(strLen, stream);
    stream.write(fieldStr);
    stream.write([EXTERNAL_KIND[entry.kind]]);
    leb.unsigned.write(entry.index, stream);
    return stream;
  },
  element: (entry, stream = new Stream()) => {
    leb.unsigned.write(entry.index, stream);
    _exports.typeGenerators.initExpr(entry.offset, stream);
    leb.unsigned.write(entry.elements.length, stream);
    for (let elem of entry.elements) {
      leb.unsigned.write(elem, stream);
    }
    return stream;
  },
  code: (entry, stream = new Stream()) => {
    let codeStream = new Stream();
    leb.unsigned.write(entry.locals.length, codeStream);
    for (let local of entry.locals) {
      leb.unsigned.write(local.count, codeStream);
      codeStream.write([LANGUAGE_TYPES[local.type]]);
    }
    for (let op of entry.code) {
      _exports.generateOp(op, codeStream);
    }
    leb.unsigned.write(codeStream.bytesWrote, stream);
    stream.write(codeStream.buffer);
    return stream;
  },
  data: (entry, stream = new Stream()) => {
    leb.unsigned.write(entry.index, stream);
    _exports.typeGenerators.initExpr(entry.offset, stream);
    leb.unsigned.write(entry.data.length, stream);
    stream.write(entry.data);
    return stream;
  }
};
_exports.entryGenerators = entryGenerators;
_exports.generateSection = function(json, stream = new Stream()) {
  const name = json.name;
  const payload = new Stream();
  stream.write([SECTION_IDS[name]]);
  if (name === "custom") {
    leb.unsigned.write(json.sectionName.length, payload);
    payload.write(json.sectionName);
    payload.write(json.payload);
  } else if (name === "start") {
    leb.unsigned.write(json.index, payload);
  } else {
    leb.unsigned.write(json.entries.length, payload);
    for (let entry of json.entries) {
      entryGenerators[name](entry, payload);
    }
  }
  leb.unsigned.write(payload.bytesWrote, stream);
  stream.write(payload.buffer);
  return stream;
};
_exports.generate = (json, stream = new Stream()) => {
  const [preamble, ...rest] = json;
  _exports.generatePreramble(preamble, stream);
  for (let item of rest) {
    _exports.generateSection(item, stream);
  }
  return stream;
};
_exports.generatePreramble = (json, stream = new Stream()) => {
  stream.write(json.magic);
  stream.write(json.version);
  return stream;
};
_exports.generateOp = (json, stream = new Stream()) => {
  let name = json.name;
  if (json.return_type !== void 0) {
    name = json.return_type + "." + name;
  }
  stream.write([OPCODES[name]]);
  const immediates2 = OP_IMMEDIATES[json.name === "const" ? json.return_type : json.name];
  if (immediates2) {
    _exports.immediataryGenerators[immediates2](json.immediates, stream);
  }
  return stream;
};
const immediates = require$$0$1;
var text2json = (text) => {
  const json = [];
  const textArray = text.split(/\s|\n/);
  while (textArray.length) {
    const textOp = textArray.shift();
    const jsonOp = {};
    let [type2, name] = textOp.split(".");
    if (name === void 0) {
      name = type2;
    } else {
      jsonOp.return_type = type2;
    }
    jsonOp.name = name;
    const immediate = immediates[jsonOp.name === "const" ? jsonOp.return_type : jsonOp.name];
    if (immediate) {
      jsonOp.immediates = immediataryParser(immediate, textArray);
    }
    json.push(jsonOp);
  }
  return json;
};
function immediataryParser(type2, txt) {
  const json = {};
  switch (type2) {
    case "br_table":
      const dests = [];
      while (1) {
        let dest = txt[0];
        if (isNaN(dest))
          break;
        txt.shift();
        dests.push(dest);
      }
      return dests;
    case "call_indirect":
      json.index = txt.shift();
      json.reserved = 0;
      return json;
    case "memory_immediate":
      json.flags = txt.shift();
      json.offset = txt.shift();
      return json;
    default:
      return txt.shift();
  }
}
const Buffer$1 = npmBrowser.Buffer;
const leb128 = leb128$1.unsigned;
const wasm2json = wasm2jsonExports;
const Pipe = bufferPipe;
const SECTIONS = [
  "custom",
  "type",
  "import",
  "function",
  "table",
  "memory",
  "global",
  "export",
  "start",
  "element",
  "code",
  "data"
];
var iterator = class ModuleIterator {
  /**
   * param {Buffer} wasm - a webassembly binary
   */
  constructor(wasm) {
    this._wasm = wasm;
    this._sections = [];
    this._modified = false;
  }
  /**
   * if the orignal wasm module was modified then this will return the modified
   * wasm module
   */
  get wasm() {
    if (this._modified) {
      this._wasm = Buffer$1.concat(this._sections.concat(this._pipe.buffer));
      this._modified = false;
    }
    return this._wasm;
  }
  /**
   * Iterates through the module's sections
   * return {Iterator.<Section>}
   */
  *[Symbol.iterator]() {
    this._pipe = new Pipe(this._wasm);
    this._sections = [this._pipe.read(8)];
    while (!this._pipe.end) {
      const start2 = this._pipe.bytesRead;
      const sectionType = this._pipe.read(1)[0];
      const size = Number(leb128.read(this._pipe));
      const body = this._pipe.read(size);
      const end = this._pipe.bytesRead;
      const section = this._wasm.slice(start2, end);
      const index2 = this._sections.push(section) - 1;
      yield new Section(sectionType, body, this, index2);
    }
  }
  _update(index2, data2) {
    this._modified = true;
    this._sections[index2] = data2;
  }
};
class Section {
  constructor(sectionType, section, it, index2) {
    this._it = it;
    this._index = index2;
    this.type = SECTIONS[sectionType];
    this._type = sectionType;
    this._section = section;
    const pipe = new Pipe(section);
    if (this.type !== "custom") {
      this.count = Number(leb128.read(pipe));
    }
    this._body = pipe.buffer;
  }
  /**
   * Parses the section and return the JSON repesentation of it
   * returns {Object}
   */
  toJSON() {
    return wasm2json.sectionParsers[this.type](new Pipe(this._section));
  }
  /**
   * Appends an array of entries to this section. NOTE: this will modify the
   * parent wasm module.
   * @param {Arrayy.<Buffer>} entries
   */
  appendEntries(entries) {
    this.count += entries.length;
    this._body = Buffer$1.concat([this._body].concat(entries));
    const bodyAndCount = Buffer$1.concat([leb128.encode(this.count), this._body]);
    this._it._update(
      this._index,
      Buffer$1.concat([
        Buffer$1.from([this._type]),
        leb128.encode(bodyAndCount.length),
        bodyAndCount
      ])
    );
  }
}
redstoneWasmJsonToolkit.wasm2json = wasm2jsonExports;
redstoneWasmJsonToolkit.json2wasm = json2wasmExports;
redstoneWasmJsonToolkit.text2json = text2json;
redstoneWasmJsonToolkit.Iterator = iterator;
const start = 0;
const type = {
  params: {
    DEFAULT: 0
  },
  return_type: {
    DEFAULT: 0
  }
};
const code = {
  locals: {
    DEFAULT: 1
  },
  code: {
    get_local: 120,
    set_local: 120,
    tee_local: 120,
    get_global: 120,
    set_global: 120,
    load8_s: 120,
    load8_u: 120,
    load16_s: 120,
    load16_u: 120,
    load32_s: 120,
    load32_u: 120,
    load: 120,
    store8: 120,
    store16: 120,
    store32: 120,
    store: 120,
    grow_memory: 1e4,
    current_memory: 100,
    nop: 1,
    block: 1,
    loop: 1,
    "if": 1,
    then: 90,
    "else": 90,
    br: 90,
    br_if: 90,
    br_table: 120,
    "return": 90,
    call: 90,
    call_indirect: 1e4,
    "const": 1,
    add: 45,
    sub: 45,
    mul: 45,
    div_s: 36e3,
    div_u: 36e3,
    rem_s: 36e3,
    rem_u: 36e3,
    and: 45,
    or: 45,
    xor: 45,
    shl: 67,
    shr_u: 67,
    shr_s: 67,
    rotl: 90,
    rotr: 90,
    eq: 45,
    eqz: 45,
    ne: 45,
    lt_s: 45,
    lt_u: 45,
    le_s: 45,
    le_u: 45,
    gt_s: 45,
    gt_u: 45,
    ge_s: 45,
    ge_u: 45,
    clz: 45,
    ctz: 45,
    popcnt: 45,
    drop: 120,
    select: 120,
    unreachable: 1
  }
};
const data = 0;
const require$$2 = {
  start,
  type,
  "import": 0,
  code,
  data
};
(function(exports2) {
  const toolkit = redstoneWasmJsonToolkit;
  const text2json2 = toolkit.text2json;
  const SECTION_IDS2 = json2wasmExports.SECTION_IDS;
  const defaultCostTable = require$$2;
  function getCost(json, costTable = {}, defaultCost = 0) {
    let cost = 0;
    defaultCost = costTable["DEFAULT"] !== void 0 ? costTable["DEFAULT"] : 0;
    if (Array.isArray(json)) {
      json.forEach((el) => {
        cost += getCost(el, costTable);
      });
    } else if (typeof json === "object") {
      for (const propName in json) {
        const propCost = costTable[propName];
        if (propCost) {
          cost += getCost(json[propName], propCost, defaultCost);
        }
      }
    } else if (costTable[json] === void 0) {
      cost = defaultCost;
    } else {
      cost = costTable[json];
    }
    return cost;
  }
  function meterCodeEntry(entry, costTable, meterFuncIndex, meterType, cost) {
    function meteringStatement(cost2, meteringImportIndex) {
      return text2json2(`${meterType}.const ${cost2} call ${meteringImportIndex}`);
    }
    function remapOp(op, funcIndex) {
      if (op.name === "call" && op.immediates >= funcIndex) {
        op.immediates = (++op.immediates).toString();
      }
    }
    function meterTheMeteringStatement() {
      const code3 = meteringStatement(0, 0);
      return code3.reduce((sum, op) => sum + getCost(op.name, costTable.code), 0);
    }
    const branchingOps = /* @__PURE__ */ new Set([
      "grow_memory",
      "end",
      "br",
      "br_table",
      "br_if",
      "if",
      "else",
      "return",
      "loop"
    ]);
    const meteringOverHead = meterTheMeteringStatement();
    let code2 = entry.code.slice();
    let meteredCode = [];
    cost += getCost(entry.locals, costTable.local);
    while (code2.length) {
      let i = 0;
      while (true) {
        const op = code2[i++];
        remapOp(op, meterFuncIndex);
        cost += getCost(op.name, costTable.code);
        if (branchingOps.has(op.name)) {
          break;
        }
      }
      if (cost !== 0) {
        cost += meteringOverHead;
        meteredCode = meteredCode.concat(meteringStatement(cost, meterFuncIndex));
      }
      meteredCode = meteredCode.concat(code2.slice(0, i));
      code2 = code2.slice(i);
      cost = 0;
    }
    entry.code = meteredCode;
    return entry;
  }
  exports2.meterJSON = (json, opts) => {
    function findSection(module2, sectionName) {
      return module2.find((section) => section.name === sectionName);
    }
    function createSection(module2, name) {
      const newSectionId = SECTION_IDS2[name];
      for (let index2 in module2) {
        const section = module2[index2];
        const sectionId = SECTION_IDS2[section.name];
        if (sectionId) {
          if (newSectionId < sectionId) {
            module2.splice(index2, 0, {
              name,
              entries: []
            });
            return;
          }
        }
      }
    }
    let funcIndex = 0;
    let functionModule, typeModule;
    let { costTable, moduleStr, fieldStr, meterType } = opts;
    if (!costTable)
      costTable = defaultCostTable;
    if (!moduleStr)
      moduleStr = "metering";
    if (!fieldStr)
      fieldStr = "usegas";
    if (!meterType)
      meterType = "i32";
    if (!findSection(json, "type"))
      createSection(json, "type");
    if (!findSection(json, "import"))
      createSection(json, "import");
    const importJson = {
      moduleStr,
      fieldStr,
      kind: "function"
    };
    const importType = {
      form: "func",
      params: [meterType]
    };
    json = json.slice(0);
    for (let section of json) {
      section = Object.assign(section);
      switch (section.name) {
        case "type":
          importJson.type = section.entries.push(importType) - 1;
          typeModule = section;
          break;
        case "function":
          functionModule = section;
          break;
        case "import":
          for (const entry of section.entries) {
            if (entry.moduleStr === moduleStr && entry.fieldStr === fieldStr) {
              throw new Error("importing metering function is not allowed");
            }
            if (entry.kind === "function") {
              funcIndex++;
            }
          }
          section.entries.push(importJson);
          break;
        case "export":
          for (const entry of section.entries) {
            if (entry.kind === "function" && entry.index >= funcIndex) {
              entry.index++;
            }
          }
          break;
        case "element":
          for (const entry of section.entries) {
            entry.elements = entry.elements.map(
              (el) => el >= funcIndex ? ++el : el
            );
          }
          break;
        case "start":
          if (section.index >= funcIndex)
            section.index++;
          break;
        case "code":
          for (const i in section.entries) {
            const entry = section.entries[i];
            const typeIndex = functionModule.entries[i];
            const type2 = typeModule.entries[typeIndex];
            const cost = getCost(type2, costTable.type);
            meterCodeEntry(entry, costTable.code, funcIndex, meterType, cost);
          }
          break;
      }
    }
    return json;
  };
  exports2.meterWASM = (wasm, opts = {}) => {
    let json = toolkit.wasm2json(wasm);
    json = exports2.meterJSON(json, opts);
    return toolkit.json2wasm(json);
  };
})(redstoneWasmMetering);
var wasmBindgenTools = {};
Object.defineProperty(wasmBindgenTools, "__esModule", { value: true });
wasmBindgenTools.matchMutClosureDtor = void 0;
function matchMutClosureDtor(source) {
  const regexp = /(const|var) ret = makeMutClosure\(arg0, arg1, (\d+?), __wbg_adapter/;
  const match = source.match(regexp);
  return match[2];
}
wasmBindgenTools.matchMutClosureDtor = matchMutClosureDtor;
var hasRequiredSourceImpl;
function requireSourceImpl() {
  if (hasRequiredSourceImpl)
    return SourceImpl;
  hasRequiredSourceImpl = 1;
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(SourceImpl, "__esModule", { value: true });
  SourceImpl.SourceImpl = void 0;
  const redstone_wasm_metering_1 = __importDefault2(redstoneWasmMetering);
  const go_wasm_imports_1 = goWasmImports;
  const fs_1 = __importDefault2(require$$1);
  const wasm_bindgen_tools_1 = wasmBindgenTools;
  const SmartWeaveTags_12 = SmartWeaveTags;
  const LoggerFactory_12 = LoggerFactory$1;
  const redstone_isomorphic_12 = npmBrowser$1;
  const Signature_1 = Signature$1;
  const WarpFactory_1 = requireWarpFactory();
  const TagsParser_12 = TagsParser$1;
  const wasmTypeMapping = /* @__PURE__ */ new Map([
    [1, "assemblyscript"],
    [2, "rust"],
    [3, "go"]
    /*[4, 'swift'],
    [5, 'c']*/
  ]);
  let SourceImpl$1 = class SourceImpl {
    constructor(warp) {
      this.warp = warp;
      this.logger = LoggerFactory_12.LoggerFactory.INST.create("Source");
    }
    async createSourceTx(sourceData, wallet) {
      this.logger.debug("Creating new contract source");
      const { src, wasmSrcCodeDir, wasmGlueCode } = sourceData;
      this.signature = new Signature_1.Signature(this.warp, wallet);
      const signer = this.signature.signer;
      const contractType = src instanceof redstone_isomorphic_12.Buffer ? "wasm" : "js";
      let srcTx;
      let wasmLang = null;
      let wasmVersion = null;
      const metadata = {};
      const data2 = [];
      if (contractType == "wasm") {
        const meteredWasmBinary = redstone_wasm_metering_1.default.meterWASM(src, {
          meterType: "i32"
        });
        data2.push(meteredWasmBinary);
        const wasmModule = await WebAssembly.compile(src);
        const moduleImports = WebAssembly.Module.imports(wasmModule);
        let lang;
        if (this.isGoModule(moduleImports)) {
          const go = new go_wasm_imports_1.Go(null);
          const module2 = new WebAssembly.Instance(wasmModule, go.importObject);
          go.run(module2);
          lang = go.exports.lang();
          wasmVersion = go.exports.version();
        } else {
          const module2 = await WebAssembly.instantiate(src, dummyImports(moduleImports));
          if (!module2.instance.exports.lang) {
            throw new Error(`No info about source type in wasm binary. Did you forget to export "lang" function?`);
          }
          lang = module2.instance.exports.lang();
          wasmVersion = module2.instance.exports.version();
          if (!wasmTypeMapping.has(lang)) {
            throw new Error(`Unknown wasm source type ${lang}`);
          }
        }
        wasmLang = wasmTypeMapping.get(lang);
        if (wasmSrcCodeDir == null) {
          throw new Error("No path to original wasm contract source code");
        }
        const zippedSourceCode = await this.zipContents(wasmSrcCodeDir);
        data2.push(zippedSourceCode);
        if (wasmLang == "rust") {
          if (!wasmGlueCode) {
            throw new Error("No path to generated wasm-bindgen js code");
          }
          const wasmBindgenSrc = fs_1.default.readFileSync(wasmGlueCode, "utf-8");
          const dtor = (0, wasm_bindgen_tools_1.matchMutClosureDtor)(wasmBindgenSrc);
          metadata["dtor"] = parseInt(dtor);
          data2.push(redstone_isomorphic_12.Buffer.from(wasmBindgenSrc));
        }
      }
      const allData = contractType == "wasm" ? this.joinBuffers(data2) : src;
      srcTx = await this.warp.arweave.createTransaction({ data: allData });
      srcTx.addTag(SmartWeaveTags_12.SmartWeaveTags.APP_NAME, "SmartWeaveContractSource");
      srcTx.addTag(SmartWeaveTags_12.SmartWeaveTags.APP_VERSION, "0.3.0");
      srcTx.addTag(SmartWeaveTags_12.SmartWeaveTags.SDK, "Warp");
      srcTx.addTag(SmartWeaveTags_12.SmartWeaveTags.CONTENT_TYPE, contractType == "js" ? "application/javascript" : "application/wasm");
      if (contractType == "wasm") {
        srcTx.addTag(SmartWeaveTags_12.SmartWeaveTags.WASM_LANG, wasmLang);
        srcTx.addTag(SmartWeaveTags_12.SmartWeaveTags.WASM_LANG_VERSION, wasmVersion);
        srcTx.addTag(SmartWeaveTags_12.SmartWeaveTags.WASM_META, JSON.stringify(metadata));
      }
      if (this.warp.environment === "testnet") {
        srcTx.addTag(SmartWeaveTags_12.SmartWeaveTags.WARP_TESTNET, "1.0.0");
      }
      await signer(srcTx);
      this.logger.debug("Posting transaction with source");
      return srcTx;
    }
    async saveSourceTx(srcTx, disableBundling = false) {
      this.logger.debug("Saving contract source", srcTx.id);
      if (this.warp.environment == "local") {
        disableBundling = true;
      }
      const effectiveUseBundler = disableBundling == void 0 ? this.warp.definitionLoader.type() == "warp" : !disableBundling;
      const tagsParser = new TagsParser_12.TagsParser();
      const signatureTag = tagsParser.getTag(srcTx, SmartWeaveTags_12.SmartWeaveTags.SIGNATURE_TYPE);
      if (signatureTag && signatureTag != "arweave" && !effectiveUseBundler) {
        throw new Error(`Unable to save source with signature type: ${signatureTag} when bundling is disabled.`);
      }
      let responseOk;
      let response;
      if (!disableBundling) {
        const result = await this.postSource(srcTx);
        this.logger.debug(result);
        responseOk = true;
      } else {
        response = await this.warp.arweave.transactions.post(srcTx);
        responseOk = response.status === 200 || response.status === 208;
      }
      if (responseOk) {
        return srcTx.id;
      } else {
        throw new Error(`Unable to write Contract Source. Arweave responded with status ${response.status}: ${response.statusText}`);
      }
    }
    isGoModule(moduleImports) {
      return moduleImports.some((moduleImport) => {
        return moduleImport.module == "env" && moduleImport.name.startsWith("syscall/js");
      });
    }
    joinBuffers(buffers) {
      const length = buffers.length;
      const result = [];
      result.push(redstone_isomorphic_12.Buffer.from(length.toString()));
      result.push(redstone_isomorphic_12.Buffer.from("|"));
      buffers.forEach((b) => {
        result.push(redstone_isomorphic_12.Buffer.from(b.length.toString()));
        result.push(redstone_isomorphic_12.Buffer.from("|"));
      });
      result.push(...buffers);
      return result.reduce((prev, b) => redstone_isomorphic_12.Buffer.concat([prev, b]));
    }
    async zipContents(source) {
      const archiver = require$$1, streamBuffers = require$$1;
      const outputStreamBuffer = new streamBuffers.WritableStreamBuffer({
        initialSize: 1e3 * 1024,
        incrementAmount: 1e3 * 1024
        // grow by 1000 kilobytes each time buffer overflows.
      });
      const archive = archiver("zip", {
        zlib: { level: 9 }
        // Sets the compression level.
      });
      archive.on("error", function(err) {
        throw err;
      });
      archive.pipe(outputStreamBuffer);
      archive.directory(source.toString(), source.toString());
      await archive.finalize();
      outputStreamBuffer.end();
      return outputStreamBuffer.getContents();
    }
    async postSource(srcTx = null) {
      const response = await fetch(`${WarpFactory_1.WARP_GW_URL}/gateway/sources/deploy`, {
        method: "POST",
        body: JSON.stringify({ srcTx }),
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error while posting contract source. Sequencer responded with status ${response.status} ${response.statusText}`);
      }
    }
  };
  SourceImpl.SourceImpl = SourceImpl$1;
  function dummyImports(moduleImports) {
    const imports = {};
    moduleImports.forEach((moduleImport) => {
      if (!Object.prototype.hasOwnProperty.call(imports, moduleImport.module)) {
        imports[moduleImport.module] = {};
      }
      imports[moduleImport.module][moduleImport.name] = function() {
      };
    });
    return imports;
  }
  return SourceImpl;
}
var hasRequiredDefaultCreateContract;
function requireDefaultCreateContract() {
  if (hasRequiredDefaultCreateContract)
    return DefaultCreateContract;
  hasRequiredDefaultCreateContract = 1;
  Object.defineProperty(DefaultCreateContract, "__esModule", { value: true });
  DefaultCreateContract.DefaultCreateContract = void 0;
  const WarpFetchWrapper_1 = WarpFetchWrapper$1;
  const Signature_1 = Signature$1;
  const SmartWeaveTags_12 = SmartWeaveTags;
  const WarpFactory_1 = requireWarpFactory();
  const LoggerFactory_12 = LoggerFactory$1;
  const CreateContract_1 = CreateContract;
  const SourceImpl_1 = requireSourceImpl();
  let DefaultCreateContract$1 = class DefaultCreateContract {
    constructor(arweave, warp) {
      this.arweave = arweave;
      this.warp = warp;
      this.logger = LoggerFactory_12.LoggerFactory.INST.create("DefaultCreateContract");
      this.deployFromSourceTx = this.deployFromSourceTx.bind(this);
      this.source = new SourceImpl_1.SourceImpl(this.warp);
      this.warpFetchWrapper = new WarpFetchWrapper_1.WarpFetchWrapper(this.warp);
    }
    async deploy(contractData, disableBundling) {
      const { wallet, initState, tags, transfer, data: data2, evaluationManifest } = contractData;
      const effectiveUseBundler = disableBundling == void 0 ? this.warp.definitionLoader.type() == "warp" : !disableBundling;
      const srcTx = await this.source.createSourceTx(contractData, wallet);
      if (!effectiveUseBundler) {
        await this.source.saveSourceTx(srcTx, true);
      }
      this.logger.debug("Creating new contract");
      return await this.deployFromSourceTx({
        srcTxId: srcTx.id,
        wallet,
        initState,
        tags,
        transfer,
        data: data2,
        evaluationManifest
      }, !effectiveUseBundler, srcTx);
    }
    async deployFromSourceTx(contractData, disableBundling, srcTx = null) {
      this.logger.debug("Creating new contract from src tx");
      const { wallet, srcTxId, initState, tags, transfer, data: data2, evaluationManifest } = contractData;
      this.signature = new Signature_1.Signature(this.warp, wallet);
      const signer = this.signature.signer;
      const effectiveUseBundler = disableBundling == void 0 ? this.warp.definitionLoader.type() == "warp" : !disableBundling;
      this.signature.checkNonArweaveSigningAvailability(effectiveUseBundler);
      let contractTX = await this.arweave.createTransaction({ data: (data2 === null || data2 === void 0 ? void 0 : data2.body) || initState });
      if (+(transfer === null || transfer === void 0 ? void 0 : transfer.winstonQty) > 0 && transfer.target.length) {
        this.logger.debug("Creating additional transaction with AR transfer", transfer);
        contractTX = await this.arweave.createTransaction({
          data: (data2 === null || data2 === void 0 ? void 0 : data2.body) || initState,
          target: transfer.target,
          quantity: transfer.winstonQty
        });
      }
      if (tags === null || tags === void 0 ? void 0 : tags.length) {
        for (const tag of tags) {
          contractTX.addTag(tag.name.toString(), tag.value.toString());
        }
      }
      contractTX.addTag(SmartWeaveTags_12.SmartWeaveTags.APP_NAME, "SmartWeaveContract");
      contractTX.addTag(SmartWeaveTags_12.SmartWeaveTags.APP_VERSION, "0.3.0");
      contractTX.addTag(SmartWeaveTags_12.SmartWeaveTags.CONTRACT_SRC_TX_ID, srcTxId);
      contractTX.addTag(SmartWeaveTags_12.SmartWeaveTags.SDK, "RedStone");
      if (data2) {
        contractTX.addTag(SmartWeaveTags_12.SmartWeaveTags.CONTENT_TYPE, data2["Content-Type"]);
        contractTX.addTag(SmartWeaveTags_12.SmartWeaveTags.INIT_STATE, initState);
      } else {
        contractTX.addTag(SmartWeaveTags_12.SmartWeaveTags.CONTENT_TYPE, "application/json");
      }
      if (this.warp.environment === "testnet") {
        contractTX.addTag(SmartWeaveTags_12.SmartWeaveTags.WARP_TESTNET, "1.0.0");
      }
      if (contractData.evaluationManifest) {
        contractTX.addTag(SmartWeaveTags_12.SmartWeaveTags.MANIFEST, JSON.stringify(contractData.evaluationManifest));
      }
      await signer(contractTX);
      let responseOk;
      let response;
      if (effectiveUseBundler) {
        const result = await this.postContract(contractTX, srcTx);
        this.logger.debug(result);
        responseOk = true;
      } else {
        response = await this.arweave.transactions.post(contractTX);
        responseOk = response.status === 200 || response.status === 208;
      }
      if (responseOk) {
        return { contractTxId: contractTX.id, srcTxId };
      } else {
        throw new Error(`Unable to write Contract. Arweave responded with status ${response.status}: ${response.statusText}`);
      }
    }
    async deployBundled(rawDataItem) {
      const response = await fetch(`${WarpFactory_1.WARP_GW_URL}/gateway/contracts/deploy-bundled`, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          Accept: "application/json"
        },
        body: rawDataItem
      });
      if (response.ok) {
        return response.json();
      } else {
        if (typeof response.json === "function") {
          response.json().then((responseError) => {
            if (responseError.message) {
              this.logger.error(responseError.message);
            }
          });
        }
        throw new Error(`Error while deploying data item. Warp Gateway responded with status ${response.status} ${response.statusText}`);
      }
    }
    async register(id, bundlrNode) {
      const response = await fetch(`${WarpFactory_1.WARP_GW_URL}/gateway/contracts/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ id, bundlrNode })
      });
      if (response.ok) {
        return response.json();
      } else {
        if (typeof response.json === "function") {
          response.json().then((responseError) => {
            if (responseError.message) {
              this.logger.error(responseError.message);
            }
          });
        }
        throw new Error(`Error while registering data item. Warp Gateway responded with status ${response.status} ${response.statusText}`);
      }
    }
    async createSourceTx(sourceData, wallet) {
      return this.source.createSourceTx(sourceData, wallet);
    }
    async saveSourceTx(srcTx, disableBundling) {
      return this.source.saveSourceTx(srcTx, disableBundling);
    }
    async postContract(contractTx, srcTx = null) {
      let body = {
        contractTx
      };
      if (srcTx) {
        body = {
          ...body,
          srcTx
        };
      }
      const response = await this.warpFetchWrapper.fetch(`${WarpFactory_1.WARP_GW_URL}/gateway/contracts/deploy`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error while posting contract. Sequencer responded with status ${response.status} ${response.statusText}`);
      }
    }
    isBundlrNodeType(value) {
      return CreateContract_1.BUNDLR_NODES.includes(value);
    }
  };
  DefaultCreateContract.DefaultCreateContract = DefaultCreateContract$1;
  return DefaultCreateContract;
}
var HandlerBasedContract = {};
var ContractCallRecord$1 = {};
Object.defineProperty(ContractCallRecord$1, "__esModule", { value: true });
ContractCallRecord$1.InteractionOutput = ContractCallRecord$1.InteractionInput = ContractCallRecord$1.InteractionCall = ContractCallRecord$1.ContractCallRecord = void 0;
const utils_1$2 = utils$1;
class ContractCallRecord {
  constructor(contractTxId, depth, innerCallType = null) {
    this.contractTxId = contractTxId;
    this.depth = depth;
    this.innerCallType = innerCallType;
    this.interactions = {};
    this.id = (0, utils_1$2.isomorphicRandomUUID)();
  }
  addInteractionData(interactionData) {
    const { interaction, interactionTx } = interactionData;
    const interactionCall = InteractionCall.create(new InteractionInput(interactionTx.id, interactionTx.sortKey, interactionTx.block.height, interactionTx.block.timestamp, interaction === null || interaction === void 0 ? void 0 : interaction.caller, interaction === null || interaction === void 0 ? void 0 : interaction.input.function, interaction === null || interaction === void 0 ? void 0 : interaction.input, interactionTx.dry, {}));
    this.interactions[interactionTx.id] = interactionCall;
    return interactionCall;
  }
  getInteraction(txId) {
    return this.interactions[txId];
  }
  print() {
    return JSON.stringify(this, null, 2);
  }
}
ContractCallRecord$1.ContractCallRecord = ContractCallRecord;
class InteractionCall {
  constructor(interactionInput) {
    this.interactionInput = interactionInput;
  }
  static create(interactionInput) {
    return new InteractionCall(interactionInput);
  }
  update(interactionOutput) {
    this.interactionOutput = interactionOutput;
  }
}
ContractCallRecord$1.InteractionCall = InteractionCall;
class InteractionInput {
  constructor(txId, sortKey, blockHeight, blockTimestamp, caller, functionName, functionArguments, dryWrite, foreignContractCalls = {}) {
    this.txId = txId;
    this.sortKey = sortKey;
    this.blockHeight = blockHeight;
    this.blockTimestamp = blockTimestamp;
    this.caller = caller;
    this.functionName = functionName;
    this.functionArguments = functionArguments;
    this.dryWrite = dryWrite;
    this.foreignContractCalls = foreignContractCalls;
  }
}
ContractCallRecord$1.InteractionInput = InteractionInput;
class InteractionOutput {
  constructor(cacheHit, outputState, executionTime, valid, errorMessage = "", gasUsed) {
    this.cacheHit = cacheHit;
    this.outputState = outputState;
    this.executionTime = executionTime;
    this.valid = valid;
    this.errorMessage = errorMessage;
    this.gasUsed = gasUsed;
  }
}
ContractCallRecord$1.InteractionOutput = InteractionOutput;
var createInteractionTx$1 = {};
Object.defineProperty(createInteractionTx$1, "__esModule", { value: true });
createInteractionTx$1.createDummyTx = createInteractionTx$1.createInteractionTx = void 0;
const SmartWeaveTags_1 = SmartWeaveTags;
const TagsParser_1 = TagsParser$1;
async function createInteractionTx(arweave, signer, contractId, input, tags, target = "", winstonQty = "0", dummy = false, isTestnet, reward) {
  const options = {
    data: Math.random().toString().slice(-4)
  };
  if (target && target.length) {
    options.target = target.toString();
    if (winstonQty && +winstonQty > 0) {
      options.quantity = winstonQty.toString();
    }
  }
  if (dummy) {
    options.reward = "72600854";
    options.last_tx = "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO";
  }
  if (reward && reward.length) {
    options.reward = reward;
  }
  const interactionTx = await arweave.createTransaction(options);
  if (!input) {
    throw new Error(`Input should be a truthy value: ${JSON.stringify(input)}`);
  }
  if (tags && tags.length) {
    for (const tag of tags) {
      interactionTx.addTag(tag.name.toString(), tag.value.toString());
    }
  }
  interactionTx.addTag(SmartWeaveTags_1.SmartWeaveTags.APP_NAME, "SmartWeaveAction");
  interactionTx.addTag(SmartWeaveTags_1.SmartWeaveTags.APP_VERSION, "0.3.0");
  interactionTx.addTag(SmartWeaveTags_1.SmartWeaveTags.SDK, "Warp");
  interactionTx.addTag(SmartWeaveTags_1.SmartWeaveTags.CONTRACT_TX_ID, contractId);
  interactionTx.addTag(SmartWeaveTags_1.SmartWeaveTags.INPUT, JSON.stringify(input));
  if (isTestnet) {
    interactionTx.addTag(SmartWeaveTags_1.SmartWeaveTags.WARP_TESTNET, "1.0.0");
  }
  if (signer) {
    await signer(interactionTx);
  }
  return interactionTx;
}
createInteractionTx$1.createInteractionTx = createInteractionTx;
function createDummyTx(tx, from, block2) {
  const tagsParser = new TagsParser_1.TagsParser();
  const decodedTags = tagsParser.decodeTags(tx);
  return {
    id: tx.id,
    owner: {
      address: from,
      key: ""
    },
    recipient: tx.target,
    tags: decodedTags,
    fee: {
      winston: tx.reward,
      ar: ""
    },
    quantity: {
      winston: tx.quantity,
      ar: ""
    },
    block: {
      id: block2.indep_hash,
      height: block2.height,
      timestamp: block2.timestamp,
      previous: null
    },
    // note: calls within dry runs cannot be cached (per block - like the state cache)!
    // that's super important, as the block height used for
    // the dry-run is the current network block height
    // - and not the block height of the real transaction that
    // will be mined on Arweave.
    // If we start caching results of the dry-runs, we can completely fuck-up
    // the consecutive state evaluations.
    // - that's why we're setting "dry" flag to true here
    // - this prevents the caching layer from saving
    // the state evaluated for such interaction in cache.
    dry: true,
    anchor: null,
    signature: null,
    data: null,
    parent: null,
    bundledIn: null
  };
}
createInteractionTx$1.createDummyTx = createDummyTx;
var InnerWritesEvaluator$1 = {};
Object.defineProperty(InnerWritesEvaluator$1, "__esModule", { value: true });
InnerWritesEvaluator$1.InnerWritesEvaluator = void 0;
class InnerWritesEvaluator {
  eval(callStack) {
    const result = [];
    Object.keys(callStack.interactions).forEach((k) => {
      const interaction = callStack.interactions[k];
      this.evalForeignCalls(callStack.contractTxId, interaction, result);
    });
    return result;
  }
  evalForeignCalls(rootContractTxId, interaction, result) {
    Object.keys(interaction.interactionInput.foreignContractCalls).forEach((foreignContractCallKey) => {
      const foreignContractCall = interaction.interactionInput.foreignContractCalls[foreignContractCallKey];
      Object.keys(foreignContractCall.interactions).forEach((k) => {
        const foreignInteraction = foreignContractCall.interactions[k];
        if (foreignInteraction.interactionInput.dryWrite && !result.includes(foreignContractCall.contractTxId) && rootContractTxId !== foreignContractCall.contractTxId) {
          result.push(foreignContractCall.contractTxId);
        }
        this.evalForeignCalls(rootContractTxId, foreignInteraction, result);
      });
    });
  }
}
InnerWritesEvaluator$1.InnerWritesEvaluator = InnerWritesEvaluator;
var vrf = {};
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(vrf, "__esModule", { value: true });
vrf.generateMockVrf = void 0;
const elliptic_1 = __importDefault(elliptic$1);
const vrf_js_1 = vrfJs;
const utils_1$1 = utils$1;
const EC = new elliptic_1.default.ec("secp256k1");
const key = EC.genKeyPair();
const pubKeyS = key.getPublic(true, "hex");
function generateMockVrf(sortKey, arweave) {
  const data2 = arweave.utils.stringToBuffer(sortKey);
  const [index2, proof] = (0, vrf_js_1.Evaluate)(key.getPrivate().toArray(), data2);
  return {
    index: arweave.utils.bufferTob64Url(index2),
    proof: arweave.utils.bufferTob64Url(proof),
    bigint: (0, utils_1$1.bufToBn)(index2).toString(),
    pubkey: pubKeyS
  };
}
vrf.generateMockVrf = generateMockVrf;
var EvaluationOptionsEvaluator$1 = {};
Object.defineProperty(EvaluationOptionsEvaluator$1, "__esModule", { value: true });
EvaluationOptionsEvaluator$1.EvaluationOptionsEvaluator = void 0;
const utils_1 = utils$1;
class EvaluationOptionsEvaluator {
  /**
   * @param userSetOptions evaluation options set via {@link Contract.setEvaluationOptions}
   * @param manifestOptions evaluation options from the root contract's manifest (i.e. the contract that
   * the user is trying to read - e.g. via warp.contract(<txId>).readState();
   */
  constructor(userSetOptions, manifestOptions) {
    this.saferEvaluationOptions = {
      // CRITICAL!
      internalWrites: (foreignOptions) => {
        if (foreignOptions["internalWrites"] === void 0 || this.rootOptions["internalWrites"] == foreignOptions["internalWrites"]) {
          return this.rootOptions["internalWrites"];
        }
        if (this.rootOptions["internalWrites"] && !foreignOptions["internalWrites"]) {
          return foreignOptions["internalWrites"];
        }
        if (!this.rootOptions["internalWrites"] && foreignOptions["internalWrites"]) {
          return foreignOptions["internalWrites"];
        }
        throw new Error('Could not determine "internalWrites" value ');
      },
      throwOnInternalWriteError: (foreignOptions) => {
        if (foreignOptions["throwOnInternalWriteError"] === void 0) {
          return this.rootOptions["throwOnInternalWriteError"];
        }
        return foreignOptions["throwOnInternalWriteError"];
      },
      // CRITICAL!
      unsafeClient: (foreignOptions) => {
        if (foreignOptions["unsafeClient"] === void 0 || this.rootOptions["unsafeClient"] == foreignOptions["unsafeClient"]) {
          return this.rootOptions["unsafeClient"];
        }
        if (this.rootOptions["unsafeClient"] === "throw" || this.rootOptions["unsafeClient"] === "skip") {
          return this.rootOptions["unsafeClient"];
        }
        if (this.rootOptions["unsafeClient"] === "allow") {
          if (foreignOptions["unsafeClient"] === "throw") {
            return "skip";
          } else {
            return foreignOptions["unsafeClient"];
          }
        }
        throw new Error('Could not determine "unsafeClient" value');
      },
      ignoreExceptions: (foreignOptions) => {
        if (foreignOptions["ignoreExceptions"] === void 0 || this.rootOptions["ignoreExceptions"] == foreignOptions["ignoreExceptions"]) {
          return this.rootOptions["ignoreExceptions"];
        }
        if (this.rootOptions["ignoreExceptions"] && !foreignOptions["ignoreExceptions"]) {
          return this.rootOptions["ignoreExceptions"];
        }
        if (!this.rootOptions["ignoreExceptions"] && foreignOptions["ignoreExceptions"]) {
          return this.rootOptions["ignoreExceptions"];
        }
        throw new Error('Could not determine "ignoreExceptions" value');
      },
      waitForConfirmation: () => this.rootOptions["waitForConfirmation"],
      updateCacheForEachInteraction: () => this.rootOptions["updateCacheForEachInteraction"],
      maxCallDepth: () => this.rootOptions["maxCallDepth"],
      maxInteractionEvaluationTimeSeconds: () => this.rootOptions["maxInteractionEvaluationTimeSeconds"],
      stackTrace: () => this.rootOptions["stackTrace"],
      sequencerUrl: () => this.rootOptions["sequencerUrl"],
      gasLimit: () => this.rootOptions["gasLimit"],
      useVM2: () => this.rootOptions["useVM2"],
      allowBigInt: () => this.rootOptions["allowBigInt"],
      walletBalanceUrl: () => this.rootOptions["walletBalanceUrl"],
      mineArLocalBlocks: () => this.rootOptions["mineArLocalBlocks"],
      cacheEveryNInteractions: () => this.rootOptions["cacheEveryNInteractions"]
    };
    if (manifestOptions) {
      const errors2 = [];
      for (const k in manifestOptions) {
        if (userSetOptions[k] !== manifestOptions[k]) {
          errors2.push(`Option {${k}} differs. EvaluationOptions: [${userSetOptions[k]}], manifest: [${manifestOptions[k]}]. Use contract.setEvaluationOptions({${k}: ${manifestOptions[k]}) to evaluate contract state.`);
        }
      }
      if (errors2.length) {
        throw new Error(errors2.join("\n"));
      }
    }
    this.rootOptions = Object.freeze(Object.assign({}, userSetOptions, manifestOptions || {}));
  }
  /**
   * The idea here is that evaluation of the foreign contract should not be processed with "less secure"
   * evaluation options than those set for the main/root contract (i.e. the one that is being read by the User).
   *
   * Currently, one exception to this rule are the internal writes.
   * Consider the examples below:
   *
   * Example 1:
   * 1. The root contract blocks internal writes
   * 2. The foreign contract allows for internal writes
   * => the internal writes should be allowed during evaluation of the foreign contract
   *
   * Example 2:
   * 1. The root contract has the 'unsafeClient' set to 'skip'
   * 2. The foreign contract has the 'unsafeClient' to 'allow'
   * => the 'unsafeClient' should be set to 'skip' for foreign contract
   *
   * Example 3:
   * 1. The root contract has the 'vm2' set to 'true'
   * 2. The foreign contract has the 'vm2' set to 'false'
   * => the 'vm2' for the foreign contract should be set to 'true'
   *
   * Example 4:
   * 1. The root contract has the 'maxCallDepth' set to 3
   * 2. The foreign contract has the 'maxCallDepth' set to 5
   * => the 'maxCallDepth' for the foreign contract should be set to '3'
   * NOTE: call depth is always verified from the perspective of the root contract!
   *
   * Example 5:
   * 1. The root contract has the 'maxInteractionEvaluationTimeSeconds' set to 10
   * 2. The foreign contract has the 'maxInteractionEvaluationTimeSeconds' set to 60
   * => the 'maxInteractionEvaluationTimeSeconds' for the foreign contract should be set to '10'
   *
   * On the other hand - if the root contract has less secure options than the foreign contract -
   * the more secure options of the foreign contract should be respected.
   * Example:
   * 1. Contract "A" with 'unsafeClient' = 'allow' (and unsafeClient used in its source) is performing
   * write operation on Contract "B" that has 'unsafeClient' set to 'skip'.
   * i.e. Contract A calls SmartWeave.contracts.write on Contract B.
   *
   * In this case the more secure setting of the Contract B should be reflected - and write itself
   * should be blocked (i.e. it should not be even created during the `A.writeInteraction` - when a dry-run
   * is being performed, and we're evaluating a list of internal writes for a newly created interaction).
   *
   * @param foreignContractManifest the manifest of the foreign contract that we want read/write to
   */
  forForeignContract(foreignContractOptions) {
    const options = (0, utils_1.deepCopy)(this.rootOptions);
    if (foreignContractOptions) {
      for (const k in foreignContractOptions) {
        options[k] = this.saferEvaluationOptions[k](foreignContractOptions);
      }
    }
    return Object.freeze(options);
  }
}
EvaluationOptionsEvaluator$1.EvaluationOptionsEvaluator = EvaluationOptionsEvaluator;
var hasRequiredHandlerBasedContract;
function requireHandlerBasedContract() {
  if (hasRequiredHandlerBasedContract)
    return HandlerBasedContract;
  hasRequiredHandlerBasedContract = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(HandlerBasedContract, "__esModule", { value: true });
  HandlerBasedContract.HandlerBasedContract = void 0;
  const safe_stable_stringify_1 = __importDefault2(safeStableStringifyExports);
  const crypto2 = __importStar2(require$$1);
  const ContractCallRecord_1 = ContractCallRecord$1;
  const LexicographicalInteractionsSorter_12 = LexicographicalInteractionsSorter;
  const StateEvaluator_12 = StateEvaluator;
  const SmartWeaveTags_12 = SmartWeaveTags;
  const create_interaction_tx_1 = createInteractionTx$1;
  const Benchmark_12 = Benchmark$1;
  const LoggerFactory_12 = LoggerFactory$1;
  const Evolve_1 = Evolve$1;
  const ArweaveWrapper_1 = requireArweaveWrapper();
  const utils_12 = utils$1;
  const CreateContract_1 = CreateContract;
  const InnerWritesEvaluator_1 = InnerWritesEvaluator$1;
  const vrf_1 = vrf;
  const Signature_1 = Signature$1;
  const EvaluationOptionsEvaluator_1 = EvaluationOptionsEvaluator$1;
  const WarpFetchWrapper_1 = WarpFetchWrapper$1;
  let HandlerBasedContract$1 = class HandlerBasedContract {
    constructor(_contractTxId, warp, _parentContract = null, _innerCallData = null) {
      var _a, _b;
      this._contractTxId = _contractTxId;
      this.warp = warp;
      this._parentContract = _parentContract;
      this._innerCallData = _innerCallData;
      this.logger = LoggerFactory_12.LoggerFactory.INST.create("HandlerBasedContract");
      this.ecLogger = LoggerFactory_12.LoggerFactory.INST.create("ExecutionContext");
      this._innerWritesEvaluator = new InnerWritesEvaluator_1.InnerWritesEvaluator();
      this._benchmarkStats = null;
      this.waitForConfirmation = this.waitForConfirmation.bind(this);
      this._arweaveWrapper = new ArweaveWrapper_1.ArweaveWrapper(warp.arweave);
      this._sorter = new LexicographicalInteractionsSorter_12.LexicographicalInteractionsSorter(warp.arweave);
      if (_parentContract != null) {
        this._evaluationOptions = this.getRoot().evaluationOptions();
        this._callDepth = _parentContract.callDepth() + 1;
        const callingInteraction = _parentContract.getCallStack().getInteraction(_innerCallData.callingInteraction.id);
        if (this._callDepth > this._evaluationOptions.maxCallDepth) {
          throw Error(`Max call depth of ${this._evaluationOptions.maxCallDepth} has been exceeded for interaction ${JSON.stringify(callingInteraction.interactionInput)}`);
        }
        this.logger.debug("Calling interaction", {
          id: _innerCallData.callingInteraction.id,
          sortKey: _innerCallData.callingInteraction.sortKey,
          type: _innerCallData.callType
        });
        if (((_b = (_a = callingInteraction.interactionInput) === null || _a === void 0 ? void 0 : _a.foreignContractCalls[_contractTxId]) === null || _b === void 0 ? void 0 : _b.innerCallType) === "write" && _innerCallData.callType === "read") {
          throw new Error("Calling a readContractState after performing an inner write is wrong - instead use a state from the result of an internal write.");
        }
        const callStack = new ContractCallRecord_1.ContractCallRecord(_contractTxId, this._callDepth, _innerCallData === null || _innerCallData === void 0 ? void 0 : _innerCallData.callType);
        callingInteraction.interactionInput.foreignContractCalls[_contractTxId] = callStack;
        this._callStack = callStack;
        this._rootSortKey = _parentContract.rootSortKey;
      } else {
        this._callDepth = 0;
        this._callStack = new ContractCallRecord_1.ContractCallRecord(_contractTxId, 0);
        this._rootSortKey = null;
        this._evaluationOptions = new StateEvaluator_12.DefaultEvaluationOptions();
      }
      this.getCallStack = this.getCallStack.bind(this);
      this.warpFetchWrapper = new WarpFetchWrapper_1.WarpFetchWrapper(this.warp);
    }
    async readState(sortKeyOrBlockHeight, currentTx, interactions) {
      var _a, _b, _c;
      this.logger.info("Read state for", {
        contractTxId: this._contractTxId,
        currentTx,
        sortKeyOrBlockHeight
      });
      const initBenchmark = Benchmark_12.Benchmark.measure();
      this.maybeResetRootContract();
      if (!this.isRoot() && sortKeyOrBlockHeight == null) {
        throw new Error("SortKey MUST be always set for non-root contract calls");
      }
      const { stateEvaluator } = this.warp;
      const sortKey = typeof sortKeyOrBlockHeight == "number" ? this._sorter.generateLastSortKey(sortKeyOrBlockHeight) : sortKeyOrBlockHeight;
      const executionContext = await this.createExecutionContext(this._contractTxId, sortKey, false, interactions);
      this.logger.info("Execution Context", {
        srcTxId: (_a = executionContext.contractDefinition) === null || _a === void 0 ? void 0 : _a.srcTxId,
        missingInteractions: (_b = executionContext.sortedInteractions) === null || _b === void 0 ? void 0 : _b.length,
        cachedSortKey: (_c = executionContext.cachedState) === null || _c === void 0 ? void 0 : _c.sortKey
      });
      initBenchmark.stop();
      const stateBenchmark = Benchmark_12.Benchmark.measure();
      const result = await stateEvaluator.eval(executionContext, currentTx || []);
      stateBenchmark.stop();
      const total = initBenchmark.elapsed(true) + stateBenchmark.elapsed(true);
      this._benchmarkStats = {
        gatewayCommunication: initBenchmark.elapsed(true),
        stateEvaluation: stateBenchmark.elapsed(true),
        total
      };
      this.logger.info("Benchmark", {
        "Gateway communication  ": initBenchmark.elapsed(),
        "Contract evaluation    ": stateBenchmark.elapsed(),
        "Total:                 ": `${total.toFixed(0)}ms`
      });
      return result;
    }
    async readStateFor(sortKey, interactions) {
      return this.readState(sortKey, void 0, interactions);
    }
    async viewState(input, tags = [], transfer = CreateContract_1.emptyTransfer) {
      this.logger.info("View state for", this._contractTxId);
      return await this.callContract(input, void 0, void 0, tags, transfer);
    }
    async viewStateForTx(input, interactionTx) {
      this.logger.info(`View state for ${this._contractTxId}`, interactionTx);
      return await this.callContractForTx(input, interactionTx);
    }
    async dryWrite(input, caller, tags, transfer) {
      this.logger.info("Dry-write for", this._contractTxId);
      return await this.callContract(input, caller, void 0, tags, transfer);
    }
    async dryWriteFromTx(input, transaction2, currentTx) {
      this.logger.info(`Dry-write from transaction ${transaction2.id} for ${this._contractTxId}`);
      return await this.callContractForTx(input, transaction2, currentTx || []);
    }
    async writeInteraction(input, options) {
      this.logger.info("Write interaction", { input, options });
      if (!this.signature) {
        throw new Error("Wallet not connected. Use 'connect' method first.");
      }
      const { arweave, interactionsLoader, environment } = this.warp;
      await this.warp.definitionLoader.load(this._contractTxId);
      const effectiveTags = (options === null || options === void 0 ? void 0 : options.tags) || [];
      const effectiveTransfer = (options === null || options === void 0 ? void 0 : options.transfer) || CreateContract_1.emptyTransfer;
      const effectiveStrict = (options === null || options === void 0 ? void 0 : options.strict) === true;
      const effectiveVrf = (options === null || options === void 0 ? void 0 : options.vrf) === true;
      const effectiveDisableBundling = (options === null || options === void 0 ? void 0 : options.disableBundling) === true;
      const effectiveReward = options === null || options === void 0 ? void 0 : options.reward;
      const bundleInteraction = interactionsLoader.type() == "warp" && !effectiveDisableBundling;
      this.signature.checkNonArweaveSigningAvailability(bundleInteraction);
      if (bundleInteraction && effectiveTransfer.target != CreateContract_1.emptyTransfer.target && effectiveTransfer.winstonQty != CreateContract_1.emptyTransfer.winstonQty) {
        throw new Error("Ar Transfers are not allowed for bundled interactions");
      }
      if (effectiveVrf && !bundleInteraction && environment === "mainnet") {
        throw new Error("Vrf generation is only available for bundle interaction");
      }
      if (bundleInteraction) {
        return await this.bundleInteraction(input, {
          tags: effectiveTags,
          strict: effectiveStrict,
          vrf: effectiveVrf
        });
      } else {
        const interactionTx = await this.createInteraction(input, effectiveTags, effectiveTransfer, effectiveStrict, false, effectiveVrf && environment !== "mainnet", effectiveReward);
        const response = await arweave.transactions.post(interactionTx);
        if (response.status !== 200) {
          this.logger.error("Error while posting transaction", response);
          return null;
        }
        if (this._evaluationOptions.waitForConfirmation) {
          this.logger.info("Waiting for confirmation of", interactionTx.id);
          const benchmark = Benchmark_12.Benchmark.measure();
          await this.waitForConfirmation(interactionTx.id);
          this.logger.info("Transaction confirmed after", benchmark.elapsed());
        }
        if (this.warp.environment == "local" && this._evaluationOptions.mineArLocalBlocks) {
          await this.warp.testing.mineBlock();
        }
        return { originalTxId: interactionTx.id };
      }
    }
    async bundleInteraction(input, options) {
      this.logger.info("Bundle interaction input", input);
      const interactionTx = await this.createInteraction(input, options.tags, CreateContract_1.emptyTransfer, options.strict, true, options.vrf);
      const response = await this.warpFetchWrapper.fetch(`${this._evaluationOptions.sequencerUrl}gateway/sequencer/register`, {
        method: "POST",
        body: JSON.stringify(interactionTx),
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then((res) => {
        this.logger.debug(res);
        return res.ok ? res.json() : Promise.reject(res);
      }).catch((error2) => {
        var _a;
        this.logger.error(error2);
        if ((_a = error2.body) === null || _a === void 0 ? void 0 : _a.message) {
          this.logger.error(error2.body.message);
        }
        throw new Error(`Unable to bundle interaction: ${JSON.stringify(error2)}`);
      });
      return {
        bundlrResponse: response,
        originalTxId: interactionTx.id
      };
    }
    async createInteraction(input, tags, transfer, strict, bundle = false, vrf2 = false, reward) {
      if (this._evaluationOptions.internalWrites) {
        const handlerResult = await this.callContract(input, void 0, void 0, tags, transfer, strict, vrf2);
        if (strict && handlerResult.type !== "ok") {
          throw Error(`Cannot create interaction: ${handlerResult.errorMessage}`);
        }
        const callStack = this.getCallStack();
        const innerWrites = this._innerWritesEvaluator.eval(callStack);
        this.logger.debug("Input", input);
        this.logger.debug("Callstack", callStack.print());
        innerWrites.forEach((contractTxId) => {
          tags.push({
            name: SmartWeaveTags_12.SmartWeaveTags.INTERACT_WRITE,
            value: contractTxId
          });
        });
        this.logger.debug("Tags with inner calls", tags);
      }
      if (vrf2) {
        tags.push({
          name: SmartWeaveTags_12.SmartWeaveTags.REQUEST_VRF,
          value: "true"
        });
      }
      const interactionTx = await (0, create_interaction_tx_1.createInteractionTx)(this.warp.arweave, this.signature.signer, this._contractTxId, input, tags, transfer.target, transfer.winstonQty, bundle, this.warp.environment === "testnet", reward);
      if (!this._evaluationOptions.internalWrites && strict) {
        const { arweave } = this.warp;
        const caller = this.signature.type == "arweave" ? await arweave.wallets.ownerToAddress(interactionTx.owner) : interactionTx.owner;
        const handlerResult = await this.callContract(input, caller, void 0, tags, transfer, strict, vrf2);
        if (handlerResult.type !== "ok") {
          throw Error(`Cannot create interaction: ${handlerResult.errorMessage}`);
        }
      }
      return interactionTx;
    }
    txId() {
      return this._contractTxId;
    }
    getCallStack() {
      return this._callStack;
    }
    connect(signature) {
      this.signature = new Signature_1.Signature(this.warp, signature);
      return this;
    }
    setEvaluationOptions(options) {
      if (!this.isRoot()) {
        throw new Error("Evaluation options can be set only for the root contract");
      }
      this._evaluationOptions = {
        ...this._evaluationOptions,
        ...options
      };
      return this;
    }
    async waitForConfirmation(transactionId) {
      const { arweave } = this.warp;
      const status = await arweave.transactions.getStatus(transactionId);
      if (status.confirmed === null) {
        this.logger.info(`Transaction ${transactionId} not yet confirmed. Waiting another 20 seconds before next check.`);
        await (0, utils_12.sleep)(2e4);
        await this.waitForConfirmation(transactionId);
      } else {
        this.logger.info(`Transaction ${transactionId} confirmed`, status);
        return status;
      }
    }
    async createExecutionContext(contractTxId, upToSortKey, forceDefinitionLoad = false, interactions) {
      var _a, _b, _c;
      const { definitionLoader, interactionsLoader, stateEvaluator } = this.warp;
      const benchmark = Benchmark_12.Benchmark.measure();
      const cachedState = await stateEvaluator.latestAvailableState(contractTxId, upToSortKey);
      this.logger.debug("cache lookup", benchmark.elapsed());
      benchmark.reset();
      const evolvedSrcTxId = Evolve_1.Evolve.evolvedSrcTxId((_a = cachedState === null || cachedState === void 0 ? void 0 : cachedState.cachedValue) === null || _a === void 0 ? void 0 : _a.state);
      let handler, contractDefinition, sortedInteractions;
      this.logger.debug("Cached state", cachedState, upToSortKey);
      if (cachedState && cachedState.sortKey == upToSortKey) {
        this.logger.debug("State fully cached, not loading interactions.");
        if (forceDefinitionLoad || evolvedSrcTxId || (interactions === null || interactions === void 0 ? void 0 : interactions.length)) {
          contractDefinition = await definitionLoader.load(contractTxId, evolvedSrcTxId);
          handler = await this.safeGetHandler(contractDefinition);
          if (interactions === null || interactions === void 0 ? void 0 : interactions.length) {
            sortedInteractions = this._sorter.sort(interactions.map((i) => ({ node: i, cursor: null })));
          }
        }
      } else {
        if (interactions === null || interactions === void 0 ? void 0 : interactions.length) {
          throw new Error(`Cannot apply requested interactions at ${upToSortKey}`);
        }
        [contractDefinition, sortedInteractions] = await Promise.all([
          definitionLoader.load(contractTxId, evolvedSrcTxId),
          interactions ? Promise.resolve(interactions) : await interactionsLoader.load(
            contractTxId,
            cachedState === null || cachedState === void 0 ? void 0 : cachedState.sortKey,
            // (1) we want to eagerly load dependant contract interactions and put them
            // in the interactions' loader cache
            // see: https://github.com/warp-contracts/warp/issues/198
            this.getToSortKey(upToSortKey),
            this._evaluationOptions
          )
        ]);
        if (cachedState === null || cachedState === void 0 ? void 0 : cachedState.sortKey) {
          sortedInteractions = sortedInteractions.filter((i) => i.sortKey.localeCompare(cachedState === null || cachedState === void 0 ? void 0 : cachedState.sortKey) > 0);
        }
        if (upToSortKey) {
          sortedInteractions = sortedInteractions.filter((i) => i.sortKey.localeCompare(upToSortKey) <= 0);
        }
        this.logger.debug("contract and interactions load", benchmark.elapsed());
        if (this.isRoot() && sortedInteractions.length) {
          this._rootSortKey = sortedInteractions[sortedInteractions.length - 1].sortKey;
        }
        handler = await this.safeGetHandler(contractDefinition);
      }
      if (this.isRoot()) {
        this._eoEvaluator = new EvaluationOptionsEvaluator_1.EvaluationOptionsEvaluator(this.evaluationOptions(), (_b = contractDefinition.manifest) === null || _b === void 0 ? void 0 : _b.evaluationOptions);
      }
      const contractEvaluationOptions = this.isRoot() ? this._eoEvaluator.rootOptions : this.getEoEvaluator().forForeignContract((_c = contractDefinition.manifest) === null || _c === void 0 ? void 0 : _c.evaluationOptions);
      this.ecLogger.debug(`Evaluation options ${contractTxId}:`, contractEvaluationOptions);
      return {
        warp: this.warp,
        contract: this,
        contractDefinition,
        sortedInteractions,
        evaluationOptions: contractEvaluationOptions,
        handler,
        cachedState,
        requestedSortKey: upToSortKey
      };
    }
    async safeGetHandler(contractDefinition) {
      const { executorFactory } = this.warp;
      return await executorFactory.create(contractDefinition, this._evaluationOptions, this.warp);
    }
    getToSortKey(upToSortKey) {
      var _a;
      if ((_a = this._parentContract) === null || _a === void 0 ? void 0 : _a.rootSortKey) {
        if (!upToSortKey) {
          return this._parentContract.rootSortKey;
        }
        return this._parentContract.rootSortKey.localeCompare(upToSortKey) > 0 ? this._parentContract.rootSortKey : upToSortKey;
      } else {
        return upToSortKey;
      }
    }
    async createExecutionContextFromTx(contractTxId, transaction2) {
      const caller = transaction2.owner.address;
      const sortKey = transaction2.sortKey;
      const baseContext = await this.createExecutionContext(contractTxId, sortKey, true);
      return {
        ...baseContext,
        caller
      };
    }
    maybeResetRootContract() {
      if (this.isRoot()) {
        this.logger.debug("Clearing call stack for the root contract");
        this._callStack = new ContractCallRecord_1.ContractCallRecord(this.txId(), 0);
        this._rootSortKey = null;
        this.warp.interactionsLoader.clearCache();
      }
    }
    async callContract(input, caller, sortKey, tags = [], transfer = CreateContract_1.emptyTransfer, strict = false, vrf2 = false) {
      var _a;
      this.logger.info("Call contract input", input);
      this.maybeResetRootContract();
      if (!this.signature) {
        this.logger.warn("Wallet not set.");
      }
      const { arweave, stateEvaluator } = this.warp;
      let executionContext = await this.createExecutionContext(this._contractTxId, sortKey, true);
      const currentBlockData = this.warp.environment == "mainnet" ? await this._arweaveWrapper.warpGwBlock() : await arweave.blocks.getCurrent();
      let effectiveCaller;
      if (caller) {
        effectiveCaller = caller;
      } else if (this.signature) {
        const dummyTx2 = await arweave.createTransaction({
          data: Math.random().toString().slice(-4),
          reward: "72600854",
          last_tx: "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO"
        });
        await this.signature.signer(dummyTx2);
        effectiveCaller = await arweave.wallets.ownerToAddress(dummyTx2.owner);
      } else {
        effectiveCaller = "";
      }
      this.logger.info("effectiveCaller", effectiveCaller);
      executionContext = {
        ...executionContext,
        caller: effectiveCaller
      };
      const evalStateResult = await stateEvaluator.eval(executionContext, []);
      this.logger.info("Current state", evalStateResult.cachedValue.state);
      const interaction = {
        input,
        caller: executionContext.caller
      };
      this.logger.debug("interaction", interaction);
      const tx = await (0, create_interaction_tx_1.createInteractionTx)(arweave, (_a = this.signature) === null || _a === void 0 ? void 0 : _a.signer, this._contractTxId, input, tags, transfer.target, transfer.winstonQty, true, this.warp.environment === "testnet");
      const dummyTx = (0, create_interaction_tx_1.createDummyTx)(tx, executionContext.caller, currentBlockData);
      this.logger.debug("Creating sortKey for", {
        blockId: dummyTx.block.id,
        id: dummyTx.id,
        height: dummyTx.block.height
      });
      dummyTx.sortKey = await this._sorter.createSortKey(dummyTx.block.id, dummyTx.id, dummyTx.block.height, true);
      dummyTx.strict = strict;
      if (vrf2) {
        dummyTx.vrf = (0, vrf_1.generateMockVrf)(dummyTx.sortKey, arweave);
      }
      const handleResult2 = await this.evalInteraction({
        interaction,
        interactionTx: dummyTx,
        currentTx: []
      }, executionContext, evalStateResult.cachedValue);
      if (handleResult2.type !== "ok") {
        this.logger.fatal("Error while interacting with contract", {
          type: handleResult2.type,
          error: handleResult2.errorMessage
        });
      }
      return handleResult2;
    }
    async callContractForTx(input, interactionTx, currentTx) {
      this.maybeResetRootContract();
      const executionContext = await this.createExecutionContextFromTx(this._contractTxId, interactionTx);
      const evalStateResult = await this.warp.stateEvaluator.eval(executionContext, currentTx);
      this.logger.debug("callContractForTx - evalStateResult", {
        result: evalStateResult.cachedValue.state,
        txId: this._contractTxId
      });
      const interaction = {
        input,
        caller: this._parentContract.txId()
      };
      const interactionData = {
        interaction,
        interactionTx,
        currentTx
      };
      const result = await this.evalInteraction(interactionData, executionContext, evalStateResult.cachedValue);
      result.originalValidity = evalStateResult.cachedValue.validity;
      result.originalErrorMessages = evalStateResult.cachedValue.errorMessages;
      return result;
    }
    async evalInteraction(interactionData, executionContext, evalStateResult) {
      const interactionCall = this.getCallStack().addInteractionData(interactionData);
      const benchmark = Benchmark_12.Benchmark.measure();
      const result = await executionContext.handler.handle(executionContext, evalStateResult, interactionData);
      interactionCall.update({
        cacheHit: false,
        outputState: this._evaluationOptions.stackTrace.saveState ? result.state : void 0,
        executionTime: benchmark.elapsed(true),
        valid: result.type === "ok",
        errorMessage: result.errorMessage,
        gasUsed: result.gasUsed
      });
      return result;
    }
    parent() {
      return this._parentContract;
    }
    callDepth() {
      return this._callDepth;
    }
    evaluationOptions() {
      return this._evaluationOptions;
    }
    lastReadStateStats() {
      return this._benchmarkStats;
    }
    stateHash(state) {
      const jsonState = (0, safe_stable_stringify_1.default)(state);
      const hash = crypto2.createHash("sha256");
      hash.update(jsonState);
      return hash.digest("hex");
    }
    async syncState(externalUrl, params) {
      const { stateEvaluator } = this.warp;
      const response = await this.warpFetchWrapper.fetch(`${externalUrl}?${new URLSearchParams({
        id: this._contractTxId,
        ...params
      })}`).then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      }).catch((error2) => {
        var _a, _b;
        if ((_a = error2.body) === null || _a === void 0 ? void 0 : _a.message) {
          this.logger.error(error2.body.message);
        }
        throw new Error(`Unable to retrieve state. ${error2.status}: ${(_b = error2.body) === null || _b === void 0 ? void 0 : _b.message}`);
      });
      await stateEvaluator.syncState(this._contractTxId, response.sortKey, response.state, response.validity);
      return this;
    }
    async evolve(newSrcTxId, options) {
      return await this.writeInteraction({ function: "evolve", value: newSrcTxId }, options);
    }
    get rootSortKey() {
      return this._rootSortKey;
    }
    getRoot() {
      let result = this;
      while (!result.isRoot()) {
        result = result.parent();
      }
      return result;
    }
    getEoEvaluator() {
      const root2 = this.getRoot();
      return root2._eoEvaluator;
    }
    isRoot() {
      return this._parentContract == null;
    }
  };
  HandlerBasedContract.HandlerBasedContract = HandlerBasedContract$1;
  return HandlerBasedContract;
}
var PstContractImpl = {};
var hasRequiredPstContractImpl;
function requirePstContractImpl() {
  if (hasRequiredPstContractImpl)
    return PstContractImpl;
  hasRequiredPstContractImpl = 1;
  Object.defineProperty(PstContractImpl, "__esModule", { value: true });
  PstContractImpl.PstContractImpl = void 0;
  const HandlerBasedContract_1 = requireHandlerBasedContract();
  let PstContractImpl$1 = class PstContractImpl extends HandlerBasedContract_1.HandlerBasedContract {
    async currentBalance(target) {
      const interactionResult = await this.viewState({ function: "balance", target });
      if (interactionResult.type !== "ok") {
        throw Error(interactionResult.errorMessage);
      }
      return interactionResult.result;
    }
    async currentState() {
      return (await super.readState()).cachedValue.state;
    }
    async transfer(transfer, options) {
      return await this.writeInteraction({ function: "transfer", ...transfer }, options);
    }
  };
  PstContractImpl.PstContractImpl = PstContractImpl$1;
  return PstContractImpl;
}
var Testing$1 = {};
Object.defineProperty(Testing$1, "__esModule", { value: true });
Testing$1.Testing = void 0;
class Testing {
  constructor(arweave) {
    this.arweave = arweave;
  }
  async mineBlock() {
    this.validateEnv();
    await this.arweave.api.get("mine");
  }
  async addFunds(wallet) {
    const walletAddress = await this.arweave.wallets.getAddress(wallet);
    await this.arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
  }
  async isArlocal() {
    const response = await fetch(`${this.arweave.api.config.protocol}://${this.arweave.api.config.host}:${this.arweave.api.config.port}/info`).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    }).catch((e) => {
      throw new Error(`Unable to get network info: ${e.message}`);
    });
    return response.network.includes("arlocal");
  }
  async validateEnv() {
    if (!await this.isArlocal()) {
      throw new Error("Testing features are not available in a non testing environment");
    }
  }
}
Testing$1.Testing = Testing;
var WarpBuilder = {};
var DebuggableExecutorFactor = {};
Object.defineProperty(DebuggableExecutorFactor, "__esModule", { value: true });
DebuggableExecutorFactor.DebuggableExecutorFactory = void 0;
class DebuggableExecutorFactory {
  constructor(baseImplementation, sourceCode) {
    this.baseImplementation = baseImplementation;
    this.sourceCode = sourceCode;
  }
  async create(contractDefinition, evaluationOptions, warp) {
    if (Object.prototype.hasOwnProperty.call(this.sourceCode, contractDefinition.txId)) {
      contractDefinition = {
        ...contractDefinition,
        src: this.sourceCode[contractDefinition.txId]
      };
    }
    return await this.baseImplementation.create(contractDefinition, evaluationOptions, warp);
  }
}
DebuggableExecutorFactor.DebuggableExecutorFactory = DebuggableExecutorFactory;
var ArweaveGatewayInteractionsLoader = {};
var hasRequiredArweaveGatewayInteractionsLoader;
function requireArweaveGatewayInteractionsLoader() {
  if (hasRequiredArweaveGatewayInteractionsLoader)
    return ArweaveGatewayInteractionsLoader;
  hasRequiredArweaveGatewayInteractionsLoader = 1;
  Object.defineProperty(ArweaveGatewayInteractionsLoader, "__esModule", { value: true });
  ArweaveGatewayInteractionsLoader.ArweaveGatewayInteractionsLoader = ArweaveGatewayInteractionsLoader.bundledTxsFilter = void 0;
  const SmartWeaveTags_12 = SmartWeaveTags;
  const Benchmark_12 = Benchmark$1;
  const LoggerFactory_12 = LoggerFactory$1;
  const ArweaveWrapper_1 = requireArweaveWrapper();
  const utils_12 = utils$1;
  const LexicographicalInteractionsSorter_12 = LexicographicalInteractionsSorter;
  const vrf_1 = vrf;
  const MAX_REQUEST = 100;
  function bundledTxsFilter(tx) {
    var _a, _b;
    return !((_a = tx.node.parent) === null || _a === void 0 ? void 0 : _a.id) && !((_b = tx.node.bundledIn) === null || _b === void 0 ? void 0 : _b.id);
  }
  ArweaveGatewayInteractionsLoader.bundledTxsFilter = bundledTxsFilter;
  let ArweaveGatewayInteractionsLoader$1 = class ArweaveGatewayInteractionsLoader {
    constructor(arweave, environment) {
      this.arweave = arweave;
      this.environment = environment;
      this.logger = LoggerFactory_12.LoggerFactory.INST.create("ArweaveGatewayInteractionsLoader");
      this.arweaveWrapper = new ArweaveWrapper_1.ArweaveWrapper(arweave);
      this.sorter = new LexicographicalInteractionsSorter_12.LexicographicalInteractionsSorter(arweave);
    }
    async load(contractId, fromSortKey, toSortKey, evaluationOptions) {
      this.logger.debug("Loading interactions for", { contractId, fromSortKey, toSortKey });
      const fromBlockHeight = this.sorter.extractBlockHeight(fromSortKey);
      const toBlockHeight = this.sorter.extractBlockHeight(toSortKey);
      const mainTransactionsVariables = {
        tags: [
          {
            name: SmartWeaveTags_12.SmartWeaveTags.APP_NAME,
            values: ["SmartWeaveAction"]
          },
          {
            name: SmartWeaveTags_12.SmartWeaveTags.CONTRACT_TX_ID,
            values: [contractId]
          }
        ],
        blockFilter: {
          min: fromBlockHeight,
          max: toBlockHeight
        },
        first: MAX_REQUEST
      };
      const loadingBenchmark = Benchmark_12.Benchmark.measure();
      let interactions = await this.loadPages(mainTransactionsVariables);
      loadingBenchmark.stop();
      if (evaluationOptions.internalWrites) {
        const innerWritesVariables = {
          tags: [
            {
              name: SmartWeaveTags_12.SmartWeaveTags.INTERACT_WRITE,
              values: [contractId]
            }
          ],
          blockFilter: {
            min: fromBlockHeight,
            max: toBlockHeight
          },
          first: MAX_REQUEST
        };
        const innerWritesInteractions = await this.loadPages(innerWritesVariables);
        this.logger.debug("Inner writes interactions length:", innerWritesInteractions.length);
        interactions = interactions.concat(innerWritesInteractions);
      }
      interactions = interactions.filter((i) => i.node.block && i.node.block.id && i.node.block.height);
      let sortedInteractions = await this.sorter.sort(interactions);
      if (fromSortKey && toSortKey) {
        sortedInteractions = sortedInteractions.filter((i) => {
          return i.node.sortKey.localeCompare(fromSortKey) > 0 && i.node.sortKey.localeCompare(toSortKey) <= 0;
        });
      } else if (fromSortKey && !toSortKey) {
        sortedInteractions = sortedInteractions.filter((i) => {
          return i.node.sortKey.localeCompare(fromSortKey) > 0;
        });
      } else if (!fromSortKey && toSortKey) {
        sortedInteractions = sortedInteractions.filter((i) => {
          return i.node.sortKey.localeCompare(toSortKey) <= 0;
        });
      }
      this.logger.debug("All loaded interactions:", {
        from: fromSortKey,
        to: toSortKey,
        loaded: sortedInteractions.length,
        time: loadingBenchmark.elapsed()
      });
      const isLocalOrTestnetEnv = this.environment === "local" || this.environment === "testnet";
      return sortedInteractions.map((i) => {
        const interaction = i.node;
        if (isLocalOrTestnetEnv) {
          if (interaction.tags.some((t) => {
            return t.name == SmartWeaveTags_12.SmartWeaveTags.REQUEST_VRF && t.value === "true";
          })) {
            interaction.vrf = (0, vrf_1.generateMockVrf)(interaction.sortKey, this.arweave);
          }
        }
        return interaction;
      });
    }
    async loadPages(variables) {
      let transactions2 = await this.getNextPage(variables);
      const txInfos = transactions2.edges.filter((tx) => bundledTxsFilter(tx));
      while (transactions2.pageInfo.hasNextPage) {
        const cursor = transactions2.edges[MAX_REQUEST - 1].cursor;
        variables = {
          ...variables,
          after: cursor
        };
        transactions2 = await this.getNextPage(variables);
        txInfos.push(...transactions2.edges.filter((tx) => bundledTxsFilter(tx)));
      }
      return txInfos;
    }
    async getNextPage(variables) {
      const benchmark = Benchmark_12.Benchmark.measure();
      let response = await this.arweaveWrapper.gql(ArweaveGatewayInteractionsLoader$1.query, variables);
      this.logger.debug("GQL page load:", benchmark.elapsed());
      while (response.status === 403) {
        this.logger.warn(`GQL rate limiting, waiting ${ArweaveGatewayInteractionsLoader$1._30seconds}ms before next try.`);
        await (0, utils_12.sleep)(ArweaveGatewayInteractionsLoader$1._30seconds);
        response = await this.arweaveWrapper.gql(ArweaveGatewayInteractionsLoader$1.query, variables);
      }
      if (response.status !== 200) {
        throw new Error(`Unable to retrieve transactions. Arweave gateway responded with status ${response.status}.`);
      }
      if (response.data.errors) {
        this.logger.error(response.data.errors);
        throw new Error("Error while loading interaction transactions");
      }
      const data2 = response.data;
      const txs = data2.data.transactions;
      return txs;
    }
    type() {
      return "arweave";
    }
    clearCache() {
    }
  };
  ArweaveGatewayInteractionsLoader.ArweaveGatewayInteractionsLoader = ArweaveGatewayInteractionsLoader$1;
  ArweaveGatewayInteractionsLoader$1.query = `query Transactions($tags: [TagFilter!]!, $blockFilter: BlockFilter!, $first: Int!, $after: String) {
    transactions(tags: $tags, block: $blockFilter, first: $first, sort: HEIGHT_ASC, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          owner { address }
          recipient
          tags {
            name
            value
          }
          block {
            height
            id
            timestamp
          }
          fee { winston }
          quantity { winston }
          parent { id }
          bundledIn { id }
        }
        cursor
      }
    }
  }`;
  ArweaveGatewayInteractionsLoader$1._30seconds = 30 * 1e3;
  return ArweaveGatewayInteractionsLoader;
}
var CacheableInteractionsLoader$1 = {};
Object.defineProperty(CacheableInteractionsLoader$1, "__esModule", { value: true });
CacheableInteractionsLoader$1.CacheableInteractionsLoader = void 0;
const LoggerFactory_1$1 = LoggerFactory$1;
class CacheableInteractionsLoader {
  constructor(delegate) {
    this.delegate = delegate;
    this.logger = LoggerFactory_1$1.LoggerFactory.INST.create("CacheableInteractionsLoader");
    this.interactionsCache = /* @__PURE__ */ new Map();
  }
  async load(contractTxId, fromSortKey, toSortKey, evaluationOptions) {
    this.logger.debug(`Loading interactions for`, {
      contractTxId,
      fromSortKey,
      toSortKey
    });
    if (!this.interactionsCache.has(contractTxId)) {
      const interactions = await this.delegate.load(contractTxId, fromSortKey, toSortKey, evaluationOptions);
      if (interactions.length) {
        this.interactionsCache.set(contractTxId, interactions);
      }
      return interactions;
    } else {
      const cachedInteractions = this.interactionsCache.get(contractTxId);
      if (cachedInteractions === null || cachedInteractions === void 0 ? void 0 : cachedInteractions.length) {
        const lastCachedKey = cachedInteractions[cachedInteractions.length - 1].sortKey;
        if (lastCachedKey.localeCompare(toSortKey) < 0) {
          const missingInteractions = await this.delegate.load(contractTxId, lastCachedKey, toSortKey, evaluationOptions);
          const allInteractions = cachedInteractions.concat(missingInteractions);
          this.interactionsCache.set(contractTxId, allInteractions);
          return allInteractions;
        }
      }
      return cachedInteractions;
    }
  }
  type() {
    return this.delegate.type();
  }
  clearCache() {
    this.interactionsCache.clear();
  }
}
CacheableInteractionsLoader$1.CacheableInteractionsLoader = CacheableInteractionsLoader;
var WarpGatewayContractDefinitionLoader = {};
var ContractDefinition = {};
Object.defineProperty(ContractDefinition, "__esModule", { value: true });
ContractDefinition.ContractCache = ContractDefinition.SrcCache = ContractDefinition.ContractMetadata = void 0;
class ContractMetadata {
}
ContractDefinition.ContractMetadata = ContractMetadata;
class SrcCache {
  constructor(value) {
    this.src = value.src;
    this.srcBinary = value.srcBinary;
    this.srcWasmLang = value.srcWasmLang;
  }
}
ContractDefinition.SrcCache = SrcCache;
class ContractCache {
  constructor(value) {
    this.txId = value.txId;
    this.srcTxId = value.srcTxId;
    this.initState = value.initState;
    this.minFee = value.minFee;
    this.owner = value.owner;
    this.contractType = value.contractType;
    this.metadata = value.metadata;
    this.contractTx = value.contractTx;
    this.srcTx = value.srcTx;
    this.testnet = value.testnet;
  }
}
ContractDefinition.ContractCache = ContractCache;
var WasmSrc$1 = {};
function readBlobAsArrayBuffer(blob) {
  if (blob.arrayBuffer) {
    return blob.arrayBuffer();
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      resolve(reader.result);
    });
    reader.addEventListener("error", reject);
    reader.readAsArrayBuffer(blob);
  });
}
async function readBlobAsUint8Array(blob) {
  const arrayBuffer = await readBlobAsArrayBuffer(blob);
  return new Uint8Array(arrayBuffer);
}
function isBlob(v) {
  return typeof Blob !== "undefined" && v instanceof Blob;
}
function isSharedArrayBuffer(b) {
  return typeof SharedArrayBuffer !== "undefined" && b instanceof SharedArrayBuffer;
}
const isNode = typeof process !== "undefined" && process.versions && typeof process.versions.node !== "undefined" && typeof process.versions.electron === "undefined";
function isTypedArraySameAsArrayBuffer(typedArray) {
  return typedArray.byteOffset === 0 && typedArray.byteLength === typedArray.buffer.byteLength;
}
class ArrayBufferReader {
  constructor(arrayBufferOrView) {
    this.typedArray = arrayBufferOrView instanceof ArrayBuffer || isSharedArrayBuffer(arrayBufferOrView) ? new Uint8Array(arrayBufferOrView) : new Uint8Array(arrayBufferOrView.buffer, arrayBufferOrView.byteOffset, arrayBufferOrView.byteLength);
  }
  async getLength() {
    return this.typedArray.byteLength;
  }
  async read(offset, length) {
    return new Uint8Array(this.typedArray.buffer, this.typedArray.byteOffset + offset, length);
  }
}
class BlobReader {
  constructor(blob) {
    this.blob = blob;
  }
  async getLength() {
    return this.blob.size;
  }
  async read(offset, length) {
    const blob = this.blob.slice(offset, offset + length);
    const arrayBuffer = await readBlobAsArrayBuffer(blob);
    return new Uint8Array(arrayBuffer);
  }
  async sliceAsBlob(offset, length, type2 = "") {
    return this.blob.slice(offset, offset + length, type2);
  }
}
class HTTPRangeReader {
  constructor(url) {
    this.url = url;
  }
  async getLength() {
    if (this.length === void 0) {
      const req = await fetch(this.url, { method: "HEAD" });
      if (!req.ok) {
        throw new Error(`failed http request ${this.url}, status: ${req.status}: ${req.statusText}`);
      }
      this.length = parseInt(req.headers.get("content-length"));
      if (Number.isNaN(this.length)) {
        throw Error("could not get length");
      }
    }
    return this.length;
  }
  async read(offset, size) {
    if (size === 0) {
      return new Uint8Array(0);
    }
    const req = await fetch(this.url, {
      headers: {
        Range: `bytes=${offset}-${offset + size - 1}`
      }
    });
    if (!req.ok) {
      throw new Error(`failed http request ${this.url}, status: ${req.status} offset: ${offset} size: ${size}: ${req.statusText}`);
    }
    const buffer2 = await req.arrayBuffer();
    return new Uint8Array(buffer2);
  }
}
function inflate(data2, buf) {
  var u8 = Uint8Array;
  if (data2[0] == 3 && data2[1] == 0)
    return buf ? buf : new u8(0);
  var bitsF = _bitsF, bitsE = _bitsE, decodeTiny = _decodeTiny, get17 = _get17;
  var noBuf = buf == null;
  if (noBuf)
    buf = new u8(data2.length >>> 2 << 3);
  var BFINAL = 0, BTYPE = 0, HLIT = 0, HDIST = 0, HCLEN = 0, ML = 0, MD = 0;
  var off = 0, pos = 0;
  var lmap, dmap;
  while (BFINAL == 0) {
    BFINAL = bitsF(data2, pos, 1);
    BTYPE = bitsF(data2, pos + 1, 2);
    pos += 3;
    if (BTYPE == 0) {
      if ((pos & 7) != 0)
        pos += 8 - (pos & 7);
      var p8 = (pos >>> 3) + 4, len = data2[p8 - 4] | data2[p8 - 3] << 8;
      if (noBuf)
        buf = _check(buf, off + len);
      buf.set(new u8(data2.buffer, data2.byteOffset + p8, len), off);
      pos = p8 + len << 3;
      off += len;
      continue;
    }
    if (noBuf)
      buf = _check(buf, off + (1 << 17));
    if (BTYPE == 1) {
      lmap = U.flmap;
      dmap = U.fdmap;
      ML = (1 << 9) - 1;
      MD = (1 << 5) - 1;
    }
    if (BTYPE == 2) {
      HLIT = bitsE(data2, pos, 5) + 257;
      HDIST = bitsE(data2, pos + 5, 5) + 1;
      HCLEN = bitsE(data2, pos + 10, 4) + 4;
      pos += 14;
      for (var i = 0; i < 38; i += 2) {
        U.itree[i] = 0;
        U.itree[i + 1] = 0;
      }
      var tl = 1;
      for (var i = 0; i < HCLEN; i++) {
        var l = bitsE(data2, pos + i * 3, 3);
        U.itree[(U.ordr[i] << 1) + 1] = l;
        if (l > tl)
          tl = l;
      }
      pos += 3 * HCLEN;
      makeCodes(U.itree, tl);
      codes2map(U.itree, tl, U.imap);
      lmap = U.lmap;
      dmap = U.dmap;
      pos = decodeTiny(U.imap, (1 << tl) - 1, HLIT + HDIST, data2, pos, U.ttree);
      var mx0 = _copyOut(U.ttree, 0, HLIT, U.ltree);
      ML = (1 << mx0) - 1;
      var mx1 = _copyOut(U.ttree, HLIT, HDIST, U.dtree);
      MD = (1 << mx1) - 1;
      makeCodes(U.ltree, mx0);
      codes2map(U.ltree, mx0, lmap);
      makeCodes(U.dtree, mx1);
      codes2map(U.dtree, mx1, dmap);
    }
    while (true) {
      var code2 = lmap[get17(data2, pos) & ML];
      pos += code2 & 15;
      var lit = code2 >>> 4;
      if (lit >>> 8 == 0) {
        buf[off++] = lit;
      } else if (lit == 256) {
        break;
      } else {
        var end = off + lit - 254;
        if (lit > 264) {
          var ebs = U.ldef[lit - 257];
          end = off + (ebs >>> 3) + bitsE(data2, pos, ebs & 7);
          pos += ebs & 7;
        }
        var dcode = dmap[get17(data2, pos) & MD];
        pos += dcode & 15;
        var dlit = dcode >>> 4;
        var dbs = U.ddef[dlit], dst = (dbs >>> 4) + bitsF(data2, pos, dbs & 15);
        pos += dbs & 15;
        if (noBuf)
          buf = _check(buf, off + (1 << 17));
        while (off < end) {
          buf[off] = buf[off++ - dst];
          buf[off] = buf[off++ - dst];
          buf[off] = buf[off++ - dst];
          buf[off] = buf[off++ - dst];
        }
        off = end;
      }
    }
  }
  return buf.length == off ? buf : buf.slice(0, off);
}
function _check(buf, len) {
  var bl = buf.length;
  if (len <= bl)
    return buf;
  var nbuf = new Uint8Array(Math.max(bl << 1, len));
  nbuf.set(buf, 0);
  return nbuf;
}
function _decodeTiny(lmap, LL, len, data2, pos, tree) {
  var bitsE = _bitsE, get17 = _get17;
  var i = 0;
  while (i < len) {
    var code2 = lmap[get17(data2, pos) & LL];
    pos += code2 & 15;
    var lit = code2 >>> 4;
    if (lit <= 15) {
      tree[i] = lit;
      i++;
    } else {
      var ll = 0, n = 0;
      if (lit == 16) {
        n = 3 + bitsE(data2, pos, 2);
        pos += 2;
        ll = tree[i - 1];
      } else if (lit == 17) {
        n = 3 + bitsE(data2, pos, 3);
        pos += 3;
      } else if (lit == 18) {
        n = 11 + bitsE(data2, pos, 7);
        pos += 7;
      }
      var ni = i + n;
      while (i < ni) {
        tree[i] = ll;
        i++;
      }
    }
  }
  return pos;
}
function _copyOut(src, off, len, tree) {
  var mx = 0, i = 0, tl = tree.length >>> 1;
  while (i < len) {
    var v = src[i + off];
    tree[i << 1] = 0;
    tree[(i << 1) + 1] = v;
    if (v > mx)
      mx = v;
    i++;
  }
  while (i < tl) {
    tree[i << 1] = 0;
    tree[(i << 1) + 1] = 0;
    i++;
  }
  return mx;
}
function makeCodes(tree, MAX_BITS) {
  var max_code = tree.length;
  var code2, bits, n, i, len;
  var bl_count = U.bl_count;
  for (var i = 0; i <= MAX_BITS; i++)
    bl_count[i] = 0;
  for (i = 1; i < max_code; i += 2)
    bl_count[tree[i]]++;
  var next_code = U.next_code;
  code2 = 0;
  bl_count[0] = 0;
  for (bits = 1; bits <= MAX_BITS; bits++) {
    code2 = code2 + bl_count[bits - 1] << 1;
    next_code[bits] = code2;
  }
  for (n = 0; n < max_code; n += 2) {
    len = tree[n + 1];
    if (len != 0) {
      tree[n] = next_code[len];
      next_code[len]++;
    }
  }
}
function codes2map(tree, MAX_BITS, map) {
  var max_code = tree.length;
  var r15 = U.rev15;
  for (var i = 0; i < max_code; i += 2)
    if (tree[i + 1] != 0) {
      var lit = i >> 1;
      var cl = tree[i + 1], val = lit << 4 | cl;
      var rest = MAX_BITS - cl, i0 = tree[i] << rest, i1 = i0 + (1 << rest);
      while (i0 != i1) {
        var p0 = r15[i0] >>> 15 - MAX_BITS;
        map[p0] = val;
        i0++;
      }
    }
}
function revCodes(tree, MAX_BITS) {
  var r15 = U.rev15, imb = 15 - MAX_BITS;
  for (var i = 0; i < tree.length; i += 2) {
    var i0 = tree[i] << MAX_BITS - tree[i + 1];
    tree[i] = r15[i0] >>> imb;
  }
}
function _bitsE(dt, pos, length) {
  return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8) >>> (pos & 7) & (1 << length) - 1;
}
function _bitsF(dt, pos, length) {
  return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16) >>> (pos & 7) & (1 << length) - 1;
}
function _get17(dt, pos) {
  return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16) >>> (pos & 7);
}
const U = function() {
  var u16 = Uint16Array, u32 = Uint32Array;
  return {
    next_code: new u16(16),
    bl_count: new u16(16),
    ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    of0: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999],
    exb: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
    ldef: new u16(32),
    df0: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],
    dxb: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0],
    ddef: new u32(32),
    flmap: new u16(512),
    fltree: [],
    fdmap: new u16(32),
    fdtree: [],
    lmap: new u16(32768),
    ltree: [],
    ttree: [],
    dmap: new u16(32768),
    dtree: [],
    imap: new u16(512),
    itree: [],
    //rev9 : new u16(  512)
    rev15: new u16(1 << 15),
    lhst: new u32(286),
    dhst: new u32(30),
    ihst: new u32(19),
    lits: new u32(15e3),
    strt: new u16(1 << 16),
    prev: new u16(1 << 15)
  };
}();
(function() {
  var len = 1 << 15;
  for (var i = 0; i < len; i++) {
    var x = i;
    x = (x & 2863311530) >>> 1 | (x & 1431655765) << 1;
    x = (x & 3435973836) >>> 2 | (x & 858993459) << 2;
    x = (x & 4042322160) >>> 4 | (x & 252645135) << 4;
    x = (x & 4278255360) >>> 8 | (x & 16711935) << 8;
    U.rev15[i] = (x >>> 16 | x << 16) >>> 17;
  }
  function pushV(tgt, n, sv) {
    while (n-- != 0)
      tgt.push(0, sv);
  }
  for (var i = 0; i < 32; i++) {
    U.ldef[i] = U.of0[i] << 3 | U.exb[i];
    U.ddef[i] = U.df0[i] << 4 | U.dxb[i];
  }
  pushV(U.fltree, 144, 8);
  pushV(U.fltree, 255 - 143, 9);
  pushV(U.fltree, 279 - 255, 7);
  pushV(U.fltree, 287 - 279, 8);
  makeCodes(U.fltree, 9);
  codes2map(U.fltree, 9, U.flmap);
  revCodes(U.fltree, 9);
  pushV(U.fdtree, 32, 5);
  makeCodes(U.fdtree, 5);
  codes2map(U.fdtree, 5, U.fdmap);
  revCodes(U.fdtree, 5);
  pushV(U.itree, 19, 0);
  pushV(U.ltree, 286, 0);
  pushV(U.dtree, 30, 0);
  pushV(U.ttree, 320, 0);
})();
const crc = {
  table: function() {
    var tab = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) {
        if (c & 1)
          c = 3988292384 ^ c >>> 1;
        else
          c = c >>> 1;
      }
      tab[n] = c;
    }
    return tab;
  }(),
  update: function(c, buf, off, len) {
    for (var i = 0; i < len; i++)
      c = crc.table[(c ^ buf[off + i]) & 255] ^ c >>> 8;
    return c;
  },
  crc: function(b, o, l) {
    return crc.update(4294967295, b, o, l) ^ 4294967295;
  }
};
function inflateRaw(file, buf) {
  return inflate(file, buf);
}
const config = {
  numWorkers: 1,
  workerURL: "",
  useWorkers: false
};
let nextId = 0;
let numWorkers = 0;
let canUseWorkers = true;
const workers = [];
const availableWorkers = [];
const waitingForWorkerQueue = [];
const currentlyProcessingIdToRequestMap = /* @__PURE__ */ new Map();
function handleResult(e) {
  makeWorkerAvailable(e.target);
  const { id, error: error2, data: data2 } = e.data;
  const request2 = currentlyProcessingIdToRequestMap.get(id);
  currentlyProcessingIdToRequestMap.delete(id);
  if (error2) {
    request2.reject(error2);
  } else {
    request2.resolve(data2);
  }
}
function startWorker(url) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(url);
    worker.onmessage = (e) => {
      if (e.data === "start") {
        worker.onerror = void 0;
        worker.onmessage = void 0;
        resolve(worker);
      } else {
        reject(new Error(`unexpected message: ${e.data}`));
      }
    };
    worker.onerror = reject;
  });
}
function dynamicRequire(mod, request2) {
  return mod.require(request2);
}
const workerHelper = function() {
  if (isNode) {
    const { Worker: Worker2 } = dynamicRequire(module, "worker_threads");
    return {
      async createWorker(url) {
        return new Worker2(url);
      },
      addEventListener(worker, fn) {
        worker.on("message", (data2) => {
          fn({ target: worker, data: data2 });
        });
      },
      async terminate(worker) {
        await worker.terminate();
      }
    };
  } else {
    return {
      async createWorker(url) {
        try {
          const worker = await startWorker(url);
          return worker;
        } catch (e) {
          console.warn("could not load worker:", url);
        }
        let text;
        try {
          const req = await fetch(url, { mode: "cors" });
          if (!req.ok) {
            throw new Error(`could not load: ${url}`);
          }
          text = await req.text();
          url = URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
          const worker = await startWorker(url);
          config.workerURL = url;
          return worker;
        } catch (e) {
          console.warn("could not load worker via fetch:", url);
        }
        if (text !== void 0) {
          try {
            url = `data:application/javascript;base64,${btoa(text)}`;
            const worker = await startWorker(url);
            config.workerURL = url;
            return worker;
          } catch (e) {
            console.warn("could not load worker via dataURI");
          }
        }
        console.warn("workers will not be used");
        throw new Error("can not start workers");
      },
      addEventListener(worker, fn) {
        worker.addEventListener("message", fn);
      },
      async terminate(worker) {
        worker.terminate();
      }
    };
  }
}();
function makeWorkerAvailable(worker) {
  availableWorkers.push(worker);
  processWaitingForWorkerQueue();
}
async function getAvailableWorker() {
  if (availableWorkers.length === 0 && numWorkers < config.numWorkers) {
    ++numWorkers;
    try {
      const worker = await workerHelper.createWorker(config.workerURL);
      workers.push(worker);
      availableWorkers.push(worker);
      workerHelper.addEventListener(worker, handleResult);
    } catch (e) {
      canUseWorkers = false;
    }
  }
  return availableWorkers.pop();
}
function inflateRawLocal(src, uncompressedSize, type2, resolve) {
  const dst = new Uint8Array(uncompressedSize);
  inflateRaw(src, dst);
  resolve(type2 ? new Blob([dst], { type: type2 }) : dst.buffer);
}
async function processWaitingForWorkerQueue() {
  if (waitingForWorkerQueue.length === 0) {
    return;
  }
  if (config.useWorkers && canUseWorkers) {
    const worker = await getAvailableWorker();
    if (canUseWorkers) {
      if (worker) {
        if (waitingForWorkerQueue.length === 0) {
          makeWorkerAvailable(worker);
          return;
        }
        const { id, src, uncompressedSize, type: type2, resolve, reject } = waitingForWorkerQueue.shift();
        currentlyProcessingIdToRequestMap.set(id, { id, resolve, reject });
        const transferables = [];
        worker.postMessage({
          type: "inflate",
          data: {
            id,
            type: type2,
            src,
            uncompressedSize
          }
        }, transferables);
      }
      return;
    }
  }
  while (waitingForWorkerQueue.length) {
    const { src, uncompressedSize, type: type2, resolve } = waitingForWorkerQueue.shift();
    let data2 = src;
    if (isBlob(src)) {
      data2 = await readBlobAsUint8Array(src);
    }
    inflateRawLocal(data2, uncompressedSize, type2, resolve);
  }
}
function setOptions(options) {
  config.workerURL = options.workerURL || config.workerURL;
  if (options.workerURL) {
    config.useWorkers = true;
  }
  config.useWorkers = options.useWorkers !== void 0 ? options.useWorkers : config.useWorkers;
  config.numWorkers = options.numWorkers || config.numWorkers;
}
function inflateRawAsync(src, uncompressedSize, type2) {
  return new Promise((resolve, reject) => {
    waitingForWorkerQueue.push({ src, uncompressedSize, type: type2, resolve, reject, id: nextId++ });
    processWaitingForWorkerQueue();
  });
}
function clearArray(arr) {
  arr.splice(0, arr.length);
}
async function cleanup() {
  for (const worker of workers) {
    await workerHelper.terminate(worker);
  }
  clearArray(workers);
  clearArray(availableWorkers);
  clearArray(waitingForWorkerQueue);
  currentlyProcessingIdToRequestMap.clear();
  numWorkers = 0;
  canUseWorkers = true;
}
function dosDateTimeToDate(date, time) {
  const day = date & 31;
  const month = (date >> 5 & 15) - 1;
  const year = (date >> 9 & 127) + 1980;
  const millisecond = 0;
  const second = (time & 31) * 2;
  const minute = time >> 5 & 63;
  const hour = time >> 11 & 31;
  return new Date(year, month, day, hour, minute, second, millisecond);
}
class ZipEntry {
  constructor(reader, rawEntry) {
    this._reader = reader;
    this._rawEntry = rawEntry;
    this.name = rawEntry.name;
    this.nameBytes = rawEntry.nameBytes;
    this.size = rawEntry.uncompressedSize;
    this.compressedSize = rawEntry.compressedSize;
    this.comment = rawEntry.comment;
    this.commentBytes = rawEntry.commentBytes;
    this.compressionMethod = rawEntry.compressionMethod;
    this.lastModDate = dosDateTimeToDate(rawEntry.lastModFileDate, rawEntry.lastModFileTime);
    this.isDirectory = rawEntry.uncompressedSize === 0 && rawEntry.name.endsWith("/");
    this.encrypted = !!(rawEntry.generalPurposeBitFlag & 1);
    this.externalFileAttributes = rawEntry.externalFileAttributes;
    this.versionMadeBy = rawEntry.versionMadeBy;
  }
  // returns a promise that returns a Blob for this entry
  async blob(type2 = "application/octet-stream") {
    return await readEntryDataAsBlob(this._reader, this._rawEntry, type2);
  }
  // returns a promise that returns an ArrayBuffer for this entry
  async arrayBuffer() {
    return await readEntryDataAsArrayBuffer(this._reader, this._rawEntry);
  }
  // returns text, assumes the text is valid utf8. If you want more options decode arrayBuffer yourself
  async text() {
    const buffer2 = await this.arrayBuffer();
    return decodeBuffer(new Uint8Array(buffer2));
  }
  // returns text with JSON.parse called on it. If you want more options decode arrayBuffer yourself
  async json() {
    const text = await this.text();
    return JSON.parse(text);
  }
}
const EOCDR_WITHOUT_COMMENT_SIZE = 22;
const MAX_COMMENT_SIZE = 65535;
const EOCDR_SIGNATURE = 101010256;
const ZIP64_EOCDR_SIGNATURE = 101075792;
async function readAs(reader, offset, length) {
  return await reader.read(offset, length);
}
async function readAsBlobOrTypedArray(reader, offset, length, type2) {
  if (reader.sliceAsBlob) {
    return await reader.sliceAsBlob(offset, length, type2);
  }
  return await reader.read(offset, length);
}
const crc$1 = {
  unsigned() {
    return 0;
  }
};
function getUint16LE(uint8View, offset) {
  return uint8View[offset] + uint8View[offset + 1] * 256;
}
function getUint32LE(uint8View, offset) {
  return uint8View[offset] + uint8View[offset + 1] * 256 + uint8View[offset + 2] * 65536 + uint8View[offset + 3] * 16777216;
}
function getUint64LE(uint8View, offset) {
  return getUint32LE(uint8View, offset) + getUint32LE(uint8View, offset + 4) * 4294967296;
}
const utf8Decoder = new TextDecoder();
function decodeBuffer(uint8View, isUTF8) {
  if (isSharedArrayBuffer(uint8View.buffer)) {
    uint8View = new Uint8Array(uint8View);
  }
  return utf8Decoder.decode(uint8View);
}
async function findEndOfCentralDirector(reader, totalLength) {
  const size = Math.min(EOCDR_WITHOUT_COMMENT_SIZE + MAX_COMMENT_SIZE, totalLength);
  const readStart = totalLength - size;
  const data2 = await readAs(reader, readStart, size);
  for (let i = size - EOCDR_WITHOUT_COMMENT_SIZE; i >= 0; --i) {
    if (getUint32LE(data2, i) !== EOCDR_SIGNATURE) {
      continue;
    }
    const eocdr = new Uint8Array(data2.buffer, data2.byteOffset + i, data2.byteLength - i);
    const diskNumber = getUint16LE(eocdr, 4);
    if (diskNumber !== 0) {
      throw new Error(`multi-volume zip files are not supported. This is volume: ${diskNumber}`);
    }
    const entryCount = getUint16LE(eocdr, 10);
    const centralDirectorySize = getUint32LE(eocdr, 12);
    const centralDirectoryOffset = getUint32LE(eocdr, 16);
    const commentLength = getUint16LE(eocdr, 20);
    const expectedCommentLength = eocdr.length - EOCDR_WITHOUT_COMMENT_SIZE;
    if (commentLength !== expectedCommentLength) {
      throw new Error(`invalid comment length. expected: ${expectedCommentLength}, actual: ${commentLength}`);
    }
    const commentBytes = new Uint8Array(eocdr.buffer, eocdr.byteOffset + 22, commentLength);
    const comment = decodeBuffer(commentBytes);
    if (entryCount === 65535 || centralDirectoryOffset === 4294967295) {
      return await readZip64CentralDirectory(reader, readStart + i, comment, commentBytes);
    } else {
      return await readEntries(reader, centralDirectoryOffset, centralDirectorySize, entryCount, comment, commentBytes);
    }
  }
  throw new Error("could not find end of central directory. maybe not zip file");
}
const END_OF_CENTRAL_DIRECTORY_LOCATOR_SIGNATURE = 117853008;
async function readZip64CentralDirectory(reader, offset, comment, commentBytes) {
  const zip64EocdlOffset = offset - 20;
  const eocdl = await readAs(reader, zip64EocdlOffset, 20);
  if (getUint32LE(eocdl, 0) !== END_OF_CENTRAL_DIRECTORY_LOCATOR_SIGNATURE) {
    throw new Error("invalid zip64 end of central directory locator signature");
  }
  const zip64EocdrOffset = getUint64LE(eocdl, 8);
  const zip64Eocdr = await readAs(reader, zip64EocdrOffset, 56);
  if (getUint32LE(zip64Eocdr, 0) !== ZIP64_EOCDR_SIGNATURE) {
    throw new Error("invalid zip64 end of central directory record signature");
  }
  const entryCount = getUint64LE(zip64Eocdr, 32);
  const centralDirectorySize = getUint64LE(zip64Eocdr, 40);
  const centralDirectoryOffset = getUint64LE(zip64Eocdr, 48);
  return readEntries(reader, centralDirectoryOffset, centralDirectorySize, entryCount, comment, commentBytes);
}
const CENTRAL_DIRECTORY_FILE_HEADER_SIGNATURE = 33639248;
async function readEntries(reader, centralDirectoryOffset, centralDirectorySize, rawEntryCount, comment, commentBytes) {
  let readEntryCursor = 0;
  const allEntriesBuffer = await readAs(reader, centralDirectoryOffset, centralDirectorySize);
  const rawEntries = [];
  for (let e = 0; e < rawEntryCount; ++e) {
    const buffer2 = allEntriesBuffer.subarray(readEntryCursor, readEntryCursor + 46);
    const signature = getUint32LE(buffer2, 0);
    if (signature !== CENTRAL_DIRECTORY_FILE_HEADER_SIGNATURE) {
      throw new Error(`invalid central directory file header signature: 0x${signature.toString(16)}`);
    }
    const rawEntry = {
      // 4 - Version made by
      versionMadeBy: getUint16LE(buffer2, 4),
      // 6 - Version needed to extract (minimum)
      versionNeededToExtract: getUint16LE(buffer2, 6),
      // 8 - General purpose bit flag
      generalPurposeBitFlag: getUint16LE(buffer2, 8),
      // 10 - Compression method
      compressionMethod: getUint16LE(buffer2, 10),
      // 12 - File last modification time
      lastModFileTime: getUint16LE(buffer2, 12),
      // 14 - File last modification date
      lastModFileDate: getUint16LE(buffer2, 14),
      // 16 - CRC-32
      crc32: getUint32LE(buffer2, 16),
      // 20 - Compressed size
      compressedSize: getUint32LE(buffer2, 20),
      // 24 - Uncompressed size
      uncompressedSize: getUint32LE(buffer2, 24),
      // 28 - File name length (n)
      fileNameLength: getUint16LE(buffer2, 28),
      // 30 - Extra field length (m)
      extraFieldLength: getUint16LE(buffer2, 30),
      // 32 - File comment length (k)
      fileCommentLength: getUint16LE(buffer2, 32),
      // 34 - Disk number where file starts
      // 36 - Internal file attributes
      internalFileAttributes: getUint16LE(buffer2, 36),
      // 38 - External file attributes
      externalFileAttributes: getUint32LE(buffer2, 38),
      // 42 - Relative offset of local file header
      relativeOffsetOfLocalHeader: getUint32LE(buffer2, 42)
    };
    if (rawEntry.generalPurposeBitFlag & 64) {
      throw new Error("strong encryption is not supported");
    }
    readEntryCursor += 46;
    const data2 = allEntriesBuffer.subarray(readEntryCursor, readEntryCursor + rawEntry.fileNameLength + rawEntry.extraFieldLength + rawEntry.fileCommentLength);
    rawEntry.nameBytes = data2.slice(0, rawEntry.fileNameLength);
    rawEntry.name = decodeBuffer(rawEntry.nameBytes);
    const fileCommentStart = rawEntry.fileNameLength + rawEntry.extraFieldLength;
    const extraFieldBuffer = data2.slice(rawEntry.fileNameLength, fileCommentStart);
    rawEntry.extraFields = [];
    let i = 0;
    while (i < extraFieldBuffer.length - 3) {
      const headerId = getUint16LE(extraFieldBuffer, i + 0);
      const dataSize = getUint16LE(extraFieldBuffer, i + 2);
      const dataStart = i + 4;
      const dataEnd = dataStart + dataSize;
      if (dataEnd > extraFieldBuffer.length) {
        throw new Error("extra field length exceeds extra field buffer size");
      }
      rawEntry.extraFields.push({
        id: headerId,
        data: extraFieldBuffer.slice(dataStart, dataEnd)
      });
      i = dataEnd;
    }
    rawEntry.commentBytes = data2.slice(fileCommentStart, fileCommentStart + rawEntry.fileCommentLength);
    rawEntry.comment = decodeBuffer(rawEntry.commentBytes);
    readEntryCursor += data2.length;
    if (rawEntry.uncompressedSize === 4294967295 || rawEntry.compressedSize === 4294967295 || rawEntry.relativeOffsetOfLocalHeader === 4294967295) {
      const zip64ExtraField = rawEntry.extraFields.find((e2) => e2.id === 1);
      if (!zip64ExtraField) {
        throw new Error("expected zip64 extended information extra field");
      }
      const zip64EiefBuffer = zip64ExtraField.data;
      let index2 = 0;
      if (rawEntry.uncompressedSize === 4294967295) {
        if (index2 + 8 > zip64EiefBuffer.length) {
          throw new Error("zip64 extended information extra field does not include uncompressed size");
        }
        rawEntry.uncompressedSize = getUint64LE(zip64EiefBuffer, index2);
        index2 += 8;
      }
      if (rawEntry.compressedSize === 4294967295) {
        if (index2 + 8 > zip64EiefBuffer.length) {
          throw new Error("zip64 extended information extra field does not include compressed size");
        }
        rawEntry.compressedSize = getUint64LE(zip64EiefBuffer, index2);
        index2 += 8;
      }
      if (rawEntry.relativeOffsetOfLocalHeader === 4294967295) {
        if (index2 + 8 > zip64EiefBuffer.length) {
          throw new Error("zip64 extended information extra field does not include relative header offset");
        }
        rawEntry.relativeOffsetOfLocalHeader = getUint64LE(zip64EiefBuffer, index2);
        index2 += 8;
      }
    }
    const nameField = rawEntry.extraFields.find((e2) => e2.id === 28789 && e2.data.length >= 6 && // too short to be meaningful
    e2.data[0] === 1 && // Version       1 byte      version of this extra field, currently 1
    getUint32LE(e2.data, 1), crc$1.unsigned(rawEntry.nameBytes));
    if (nameField) {
      rawEntry.fileName = decodeBuffer(nameField.data.slice(5));
    }
    if (rawEntry.compressionMethod === 0) {
      let expectedCompressedSize = rawEntry.uncompressedSize;
      if ((rawEntry.generalPurposeBitFlag & 1) !== 0) {
        expectedCompressedSize += 12;
      }
      if (rawEntry.compressedSize !== expectedCompressedSize) {
        throw new Error(`compressed size mismatch for stored file: ${rawEntry.compressedSize} != ${expectedCompressedSize}`);
      }
    }
    rawEntries.push(rawEntry);
  }
  const zip = {
    comment,
    commentBytes
  };
  return {
    zip,
    entries: rawEntries.map((e) => new ZipEntry(reader, e))
  };
}
async function readEntryDataHeader(reader, rawEntry) {
  if (rawEntry.generalPurposeBitFlag & 1) {
    throw new Error("encrypted entries not supported");
  }
  const buffer2 = await readAs(reader, rawEntry.relativeOffsetOfLocalHeader, 30);
  const totalLength = await reader.getLength();
  const signature = getUint32LE(buffer2, 0);
  if (signature !== 67324752) {
    throw new Error(`invalid local file header signature: 0x${signature.toString(16)}`);
  }
  const fileNameLength = getUint16LE(buffer2, 26);
  const extraFieldLength = getUint16LE(buffer2, 28);
  const localFileHeaderEnd = rawEntry.relativeOffsetOfLocalHeader + buffer2.length + fileNameLength + extraFieldLength;
  let decompress;
  if (rawEntry.compressionMethod === 0) {
    decompress = false;
  } else if (rawEntry.compressionMethod === 8) {
    decompress = true;
  } else {
    throw new Error(`unsupported compression method: ${rawEntry.compressionMethod}`);
  }
  const fileDataStart = localFileHeaderEnd;
  const fileDataEnd = fileDataStart + rawEntry.compressedSize;
  if (rawEntry.compressedSize !== 0) {
    if (fileDataEnd > totalLength) {
      throw new Error(`file data overflows file bounds: ${fileDataStart} +  ${rawEntry.compressedSize}  > ${totalLength}`);
    }
  }
  return {
    decompress,
    fileDataStart
  };
}
async function readEntryDataAsArrayBuffer(reader, rawEntry) {
  const { decompress, fileDataStart } = await readEntryDataHeader(reader, rawEntry);
  if (!decompress) {
    const dataView = await readAs(reader, fileDataStart, rawEntry.compressedSize);
    return isTypedArraySameAsArrayBuffer(dataView) ? dataView.buffer : dataView.slice().buffer;
  }
  const typedArrayOrBlob = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize);
  const result = await inflateRawAsync(typedArrayOrBlob, rawEntry.uncompressedSize);
  return result;
}
async function readEntryDataAsBlob(reader, rawEntry, type2) {
  const { decompress, fileDataStart } = await readEntryDataHeader(reader, rawEntry);
  if (!decompress) {
    const typedArrayOrBlob2 = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize, type2);
    if (isBlob(typedArrayOrBlob2)) {
      return typedArrayOrBlob2;
    }
    return new Blob([isSharedArrayBuffer(typedArrayOrBlob2.buffer) ? new Uint8Array(typedArrayOrBlob2) : typedArrayOrBlob2], { type: type2 });
  }
  const typedArrayOrBlob = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize);
  const result = await inflateRawAsync(typedArrayOrBlob, rawEntry.uncompressedSize, type2);
  return result;
}
function setOptions$1(options) {
  setOptions(options);
}
async function unzipRaw(source) {
  let reader;
  if (typeof Blob !== "undefined" && source instanceof Blob) {
    reader = new BlobReader(source);
  } else if (source instanceof ArrayBuffer || source && source.buffer && source.buffer instanceof ArrayBuffer) {
    reader = new ArrayBufferReader(source);
  } else if (isSharedArrayBuffer(source) || isSharedArrayBuffer(source.buffer)) {
    reader = new ArrayBufferReader(source);
  } else if (typeof source === "string") {
    const req = await fetch(source);
    if (!req.ok) {
      throw new Error(`failed http request ${source}, status: ${req.status}: ${req.statusText}`);
    }
    const blob = await req.blob();
    reader = new BlobReader(blob);
  } else if (typeof source.getLength === "function" && typeof source.read === "function") {
    reader = source;
  } else {
    throw new Error("unsupported source type");
  }
  const totalLength = await reader.getLength();
  if (totalLength > Number.MAX_SAFE_INTEGER) {
    throw new Error(`file too large. size: ${totalLength}. Only file sizes up 4503599627370496 bytes are supported`);
  }
  return await findEndOfCentralDirector(reader, totalLength);
}
async function unzip(source) {
  const { zip, entries } = await unzipRaw(source);
  return {
    zip,
    entries: Object.fromEntries(entries.map((v) => [v.name, v]))
  };
}
function cleanup$1() {
  cleanup();
}
const unzipit_module = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HTTPRangeReader,
  cleanup: cleanup$1,
  setOptions: setOptions$1,
  unzip,
  unzipRaw
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(unzipit_module);
Object.defineProperty(WasmSrc$1, "__esModule", { value: true });
WasmSrc$1.WasmSrc = void 0;
const unzipit_1 = require$$0;
const redstone_isomorphic_1 = npmBrowser$1;
const LoggerFactory_1 = LoggerFactory$1;
class WasmSrc {
  constructor(src) {
    this.src = src;
    this.logger = LoggerFactory_1.LoggerFactory.INST.create("WasmSrc");
    this.splitted = this.splitBuffer(src);
    this.logger.debug(`Buffer splitted into ${this.splitted.length} parts`);
  }
  wasmBinary() {
    return this.splitted[0];
  }
  async sourceCode() {
    const { entries } = await (0, unzipit_1.unzip)(this.splitted[1]);
    const result = /* @__PURE__ */ new Map();
    for (const [name, entry] of Object.entries(entries)) {
      if (entry.isDirectory) {
        continue;
      }
      const content = await entry.text();
      result.set(name, content);
    }
    return result;
  }
  additionalCode() {
    if (this.splitted.length == 2) {
      return null;
    }
    return this.splitted[2].toString();
  }
  splitBuffer(inputBuffer) {
    let header = "";
    const elements = parseInt(inputBuffer.toString("utf8", 0, 1));
    this.logger.debug(`Number of elements: ${elements}`);
    const l = inputBuffer.length;
    let delimiters = 0;
    let dataStart = 0;
    for (let i = 2; i < l; i++) {
      const element = inputBuffer.toString("utf8", i, i + 1);
      if (element == "|") {
        delimiters++;
      }
      if (delimiters == elements) {
        dataStart = i + 1;
        break;
      }
      header += element;
    }
    this.logger.debug(`Parsed:`, {
      header,
      dataStart
    });
    const lengths = header.split("|").map((l2) => parseInt(l2));
    this.logger.debug("Lengths", lengths);
    const result = [];
    for (const length of lengths) {
      const buffer2 = redstone_isomorphic_1.Buffer.alloc(length);
      const end = dataStart + length;
      inputBuffer.copy(buffer2, 0, dataStart, end);
      dataStart = end;
      result.push(buffer2);
    }
    return result;
  }
}
WasmSrc$1.WasmSrc = WasmSrc;
var hasRequiredWarpGatewayContractDefinitionLoader;
function requireWarpGatewayContractDefinitionLoader() {
  if (hasRequiredWarpGatewayContractDefinitionLoader)
    return WarpGatewayContractDefinitionLoader;
  hasRequiredWarpGatewayContractDefinitionLoader = 1;
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(WarpGatewayContractDefinitionLoader, "__esModule", { value: true });
  WarpGatewayContractDefinitionLoader.WarpGatewayContractDefinitionLoader = void 0;
  const ContractDefinitionLoader_1 = requireContractDefinitionLoader();
  const redstone_isomorphic_12 = npmBrowser$1;
  const transaction_1 = __importDefault2(requireTransaction());
  const ContractDefinition_1 = ContractDefinition;
  const SmartWeaveTags_12 = SmartWeaveTags;
  const Benchmark_12 = Benchmark$1;
  const LoggerFactory_12 = LoggerFactory$1;
  const ArweaveWrapper_1 = requireArweaveWrapper();
  const utils_12 = utils$1;
  const WasmSrc_1 = WasmSrc$1;
  const TagsParser_12 = TagsParser$1;
  let WarpGatewayContractDefinitionLoader$1 = class WarpGatewayContractDefinitionLoader {
    constructor(baseUrl, arweave, definitionCache, srcCache, env) {
      this.baseUrl = baseUrl;
      this.definitionCache = definitionCache;
      this.srcCache = srcCache;
      this.env = env;
      this.rLogger = LoggerFactory_12.LoggerFactory.INST.create("WarpGatewayContractDefinitionLoader");
      this.baseUrl = (0, utils_12.stripTrailingSlash)(baseUrl);
      this.contractDefinitionLoader = new ContractDefinitionLoader_1.ContractDefinitionLoader(arweave, env);
      this.arweaveWrapper = new ArweaveWrapper_1.ArweaveWrapper(arweave);
      this.tagsParser = new TagsParser_12.TagsParser();
    }
    async load(contractTxId, evolvedSrcTxId) {
      const result = await this.getFromCache(contractTxId, evolvedSrcTxId);
      if (result) {
        this.rLogger.debug("WarpGatewayContractDefinitionLoader: Hit from cache!");
        if (result.contractType == "wasm" && result.srcBinary.data) {
          result.srcBinary = redstone_isomorphic_12.Buffer.from(result.srcBinary.data);
        }
        this.verifyEnv(result);
        return result;
      }
      const benchmark = Benchmark_12.Benchmark.measure();
      const contract = await this.doLoad(contractTxId, evolvedSrcTxId);
      this.rLogger.info(`Contract definition loaded in: ${benchmark.elapsed()}`);
      this.verifyEnv(contract);
      await this.putToCache(contractTxId, contract, evolvedSrcTxId);
      return contract;
    }
    async doLoad(contractTxId, forcedSrcTxId) {
      try {
        const result = await fetch(`${this.baseUrl}/gateway/contract?txId=${contractTxId}${forcedSrcTxId ? `&srcTxId=${forcedSrcTxId}` : ""}`).then((res) => {
          return res.ok ? res.json() : Promise.reject(res);
        }).catch((error2) => {
          var _a, _b;
          if ((_a = error2.body) === null || _a === void 0 ? void 0 : _a.message) {
            this.rLogger.error(error2.body.message);
          }
          throw new Error(`Unable to retrieve contract data. Warp gateway responded with status ${error2.status}:${(_b = error2.body) === null || _b === void 0 ? void 0 : _b.message}`);
        });
        if (result.srcBinary != null && !(result.srcBinary instanceof redstone_isomorphic_12.Buffer)) {
          result.srcBinary = redstone_isomorphic_12.Buffer.from(result.srcBinary.data);
        }
        if (result.srcBinary) {
          const wasmSrc = new WasmSrc_1.WasmSrc(result.srcBinary);
          result.srcBinary = wasmSrc.wasmBinary();
          let sourceTx;
          if (result.srcTx) {
            sourceTx = new transaction_1.default({ ...result.srcTx });
          } else {
            sourceTx = await this.arweaveWrapper.tx(result.srcTxId);
          }
          const srcMetaData = JSON.parse(this.tagsParser.getTag(sourceTx, SmartWeaveTags_12.SmartWeaveTags.WASM_META));
          result.metadata = srcMetaData;
        }
        result.contractType = result.src ? "js" : "wasm";
        return result;
      } catch (e) {
        this.rLogger.warn("Falling back to default contracts loader", e);
        return await this.contractDefinitionLoader.doLoad(contractTxId, forcedSrcTxId);
      }
    }
    async loadContractSource(contractSrcTxId) {
      return await this.contractDefinitionLoader.loadContractSource(contractSrcTxId);
    }
    type() {
      return "warp";
    }
    setCache(cache) {
      this.definitionCache = cache;
    }
    setSrcCache(cacheSrc) {
      this.srcCache = cacheSrc;
    }
    getCache() {
      return this.definitionCache;
    }
    getSrcCache() {
      return this.srcCache;
    }
    verifyEnv(def) {
      if (def.testnet && this.env !== "testnet") {
        throw new Error('Trying to use testnet contract in a non-testnet env. Use the "forTestnet" factory method.');
      }
      if (!def.testnet && this.env === "testnet") {
        throw new Error("Trying to use non-testnet contract in a testnet env.");
      }
    }
    // Gets ContractDefinition and ContractSource from two caches and returns a combined structure
    async getFromCache(contractTxId, srcTxId) {
      const contract = await this.definitionCache.get(contractTxId, "cd");
      if (!contract) {
        return null;
      }
      const src = await this.srcCache.get(srcTxId || contract.cachedValue.srcTxId, "src");
      if (!src) {
        return null;
      }
      return { ...contract.cachedValue, ...src.cachedValue };
    }
    // Divides ContractDefinition into entries in two caches to avoid duplicates
    async putToCache(contractTxId, value, srcTxId) {
      const src = new ContractDefinition_1.SrcCache(value);
      const contract = new ContractDefinition_1.ContractCache(value);
      await this.definitionCache.put({ contractTxId, sortKey: "cd" }, contract);
      await this.srcCache.put({ contractTxId: srcTxId || contract.srcTxId, sortKey: "src" }, src);
    }
  };
  WarpGatewayContractDefinitionLoader.WarpGatewayContractDefinitionLoader = WarpGatewayContractDefinitionLoader$1;
  return WarpGatewayContractDefinitionLoader;
}
var hasRequiredWarpBuilder;
function requireWarpBuilder() {
  if (hasRequiredWarpBuilder)
    return WarpBuilder;
  hasRequiredWarpBuilder = 1;
  Object.defineProperty(WarpBuilder, "__esModule", { value: true });
  WarpBuilder.WarpBuilder = void 0;
  const DebuggableExecutorFactor_1 = DebuggableExecutorFactor;
  const ArweaveGatewayInteractionsLoader_1 = requireArweaveGatewayInteractionsLoader();
  const CacheableInteractionsLoader_1 = CacheableInteractionsLoader$1;
  const ContractDefinitionLoader_1 = requireContractDefinitionLoader();
  const WarpGatewayContractDefinitionLoader_1 = requireWarpGatewayContractDefinitionLoader();
  const WarpGatewayInteractionsLoader_1 = WarpGatewayInteractionsLoader;
  const Warp_1 = requireWarp();
  const LevelDbCache_1 = LevelDbCache$1;
  let WarpBuilder$1 = class WarpBuilder {
    constructor(_arweave, _stateCache, _environment = "custom") {
      this._arweave = _arweave;
      this._stateCache = _stateCache;
      this._environment = _environment;
    }
    setDefinitionLoader(value) {
      this._definitionLoader = value;
      return this;
    }
    setInteractionsLoader(value) {
      this._interactionsLoader = value;
      return this;
    }
    setExecutorFactory(value) {
      this._executorFactory = value;
      return this;
    }
    setStateEvaluator(value) {
      this._stateEvaluator = value;
      return this;
    }
    overwriteSource(sourceCode) {
      if (this._executorFactory == null) {
        throw new Error("Set base ExecutorFactory first");
      }
      this._executorFactory = new DebuggableExecutorFactor_1.DebuggableExecutorFactory(this._executorFactory, sourceCode);
      return this.build();
    }
    useWarpGateway(gatewayOptions, cacheOptions) {
      this._interactionsLoader = new CacheableInteractionsLoader_1.CacheableInteractionsLoader(new WarpGatewayInteractionsLoader_1.WarpGatewayInteractionsLoader(gatewayOptions.address, gatewayOptions.confirmationStatus, gatewayOptions.source));
      const contractsCache = new LevelDbCache_1.LevelDbCache({
        ...cacheOptions,
        dbLocation: `${cacheOptions.dbLocation}/contracts`
      });
      const sourceCache = new LevelDbCache_1.LevelDbCache({
        ...cacheOptions,
        dbLocation: `${cacheOptions.dbLocation}/source`
      });
      this._definitionLoader = new WarpGatewayContractDefinitionLoader_1.WarpGatewayContractDefinitionLoader(gatewayOptions.address, this._arweave, contractsCache, sourceCache, this._environment);
      return this;
    }
    useArweaveGateway() {
      this._definitionLoader = new ContractDefinitionLoader_1.ContractDefinitionLoader(this._arweave, this._environment);
      this._interactionsLoader = new CacheableInteractionsLoader_1.CacheableInteractionsLoader(new ArweaveGatewayInteractionsLoader_1.ArweaveGatewayInteractionsLoader(this._arweave, this._environment));
      return this;
    }
    build() {
      return new Warp_1.Warp(this._arweave, this._definitionLoader, this._interactionsLoader, this._executorFactory, this._stateEvaluator, this._environment);
    }
  };
  WarpBuilder.WarpBuilder = WarpBuilder$1;
  return WarpBuilder;
}
var WarpPlugin = {};
Object.defineProperty(WarpPlugin, "__esModule", { value: true });
WarpPlugin.knownWarpPlugins = WarpPlugin.knownWarpPluginsPartial = void 0;
WarpPlugin.knownWarpPluginsPartial = [`^smartweave-extension-`];
WarpPlugin.knownWarpPlugins = [
  "evm-signature-verification",
  "subscription",
  "ivm-handler-api",
  "evaluation-progress",
  "fetch-options"
];
var hasRequiredWarp;
function requireWarp() {
  if (hasRequiredWarp)
    return Warp;
  hasRequiredWarp = 1;
  Object.defineProperty(Warp, "__esModule", { value: true });
  Warp.Warp = void 0;
  const DefaultCreateContract_1 = requireDefaultCreateContract();
  const HandlerBasedContract_1 = requireHandlerBasedContract();
  const PstContractImpl_1 = requirePstContractImpl();
  const Testing_1 = Testing$1;
  const WarpBuilder_1 = requireWarpBuilder();
  const WarpPlugin_1 = WarpPlugin;
  let Warp$1 = class Warp {
    constructor(arweave, definitionLoader, interactionsLoader, executorFactory, stateEvaluator, environment = "custom") {
      this.arweave = arweave;
      this.definitionLoader = definitionLoader;
      this.interactionsLoader = interactionsLoader;
      this.executorFactory = executorFactory;
      this.stateEvaluator = stateEvaluator;
      this.environment = environment;
      this.plugins = /* @__PURE__ */ new Map();
      this.createContract = new DefaultCreateContract_1.DefaultCreateContract(arweave, this);
      this.testing = new Testing_1.Testing(arweave);
    }
    static builder(arweave, stateCache, environment) {
      return new WarpBuilder_1.WarpBuilder(arweave, stateCache, environment);
    }
    /**
     * Allows to connect to any contract using its transaction id.
     * @param contractTxId
     * @param callingContract
     */
    contract(contractTxId, callingContract, innerCallData) {
      return new HandlerBasedContract_1.HandlerBasedContract(contractTxId, this, callingContract, innerCallData);
    }
    async deploy(contractData, disableBundling) {
      return await this.createContract.deploy(contractData, disableBundling);
    }
    async deployFromSourceTx(contractData, disableBundling) {
      return await this.createContract.deployFromSourceTx(contractData, disableBundling);
    }
    async deployBundled(rawDataItem) {
      return await this.createContract.deployBundled(rawDataItem);
    }
    async register(id, bundlrNode) {
      return await this.createContract.register(id, bundlrNode);
    }
    async createSourceTx(sourceData, wallet) {
      return await this.createContract.createSourceTx(sourceData, wallet);
    }
    async saveSourceTx(srcTx, disableBundling) {
      return await this.createContract.saveSourceTx(srcTx, disableBundling);
    }
    /**
     * Allows to connect to a contract that conforms to the Profit Sharing Token standard
     * @param contractTxId
     */
    pst(contractTxId) {
      return new PstContractImpl_1.PstContractImpl(contractTxId, this);
    }
    useStateCache(stateCache) {
      this.stateEvaluator.setCache(stateCache);
      return this;
    }
    useContractCache(definition, src) {
      this.definitionLoader.setSrcCache(src);
      this.definitionLoader.setCache(definition);
      return this;
    }
    use(plugin) {
      const pluginType = plugin.type();
      if (!this.isPluginType(pluginType)) {
        throw new Error(`Unknown plugin type ${pluginType}.`);
      }
      this.plugins.set(pluginType, plugin);
      return this;
    }
    hasPlugin(type2) {
      return this.plugins.has(type2);
    }
    matchPlugins(type2) {
      const pluginTypes = [...this.plugins.keys()];
      return pluginTypes.filter((p) => p.match(type2));
    }
    loadPlugin(type2) {
      if (!this.hasPlugin(type2)) {
        throw new Error(`Plugin ${type2} not registered.`);
      }
      return this.plugins.get(type2);
    }
    // Close cache connection
    async close() {
      return Promise.all([
        this.definitionLoader.getSrcCache().close(),
        this.definitionLoader.getCache().close(),
        this.stateEvaluator.getCache().close()
      ]).then();
    }
    async generateWallet() {
      const wallet = await this.arweave.wallets.generate();
      if (await this.testing.isArlocal()) {
        await this.testing.addFunds(wallet);
      }
      return {
        jwk: wallet,
        address: await this.arweave.wallets.jwkToAddress(wallet)
      };
    }
    isPluginType(value) {
      return WarpPlugin_1.knownWarpPlugins.includes(value) || WarpPlugin_1.knownWarpPluginsPartial.some((p) => value.match(p));
    }
  };
  Warp.Warp = Warp$1;
  return Warp;
}
var hasRequiredWarpFactory;
function requireWarpFactory() {
  if (hasRequiredWarpFactory)
    return WarpFactory;
  hasRequiredWarpFactory = 1;
  (function(exports2) {
    var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WarpFactory = exports2.defaultCacheOptions = exports2.DEFAULT_LEVEL_DB_LOCATION = exports2.defaultWarpGwOptions = exports2.WARP_GW_URL = void 0;
    const arweave_1 = __importDefault2(web);
    const LevelDbCache_1 = LevelDbCache$1;
    const MemCache_1 = MemCache$1;
    const CacheableExecutorFactory_1 = CacheableExecutorFactory$1;
    const Evolve_1 = Evolve$1;
    const CacheableStateEvaluator_1 = CacheableStateEvaluator$1;
    const HandlerExecutorFactory_1 = requireHandlerExecutorFactory();
    const Warp_1 = requireWarp();
    exports2.WARP_GW_URL = "https://d1o5nlqr4okus2.cloudfront.net";
    exports2.defaultWarpGwOptions = {
      confirmationStatus: { notCorrupted: true },
      source: null,
      address: exports2.WARP_GW_URL
    };
    exports2.DEFAULT_LEVEL_DB_LOCATION = "./cache/warp";
    exports2.defaultCacheOptions = {
      inMemory: false,
      dbLocation: exports2.DEFAULT_LEVEL_DB_LOCATION
    };
    class WarpFactory2 {
      /**
       * creates a Warp instance suitable for testing in a local environment
       * (e.g. usually using ArLocal)
       * @param arweave - an instance of Arweave
       * @param cacheOptions - optional cache options. By default, the in-memory cache is used.
       */
      static forLocal(port = 1984, arweave = arweave_1.default.init({
        host: "localhost",
        port,
        protocol: "http"
      }), cacheOptions = {
        ...exports2.defaultCacheOptions,
        inMemory: true
      }) {
        return this.customArweaveGw(arweave, cacheOptions, "local");
      }
      /**
       * creates a Warp instance suitable for testing
       * with Warp testnet (https://testnet.redstone.tools/)
       */
      static forTestnet(cacheOptions = exports2.defaultCacheOptions, useArweaveGw = false, arweave = arweave_1.default.init({
        host: "arweave.net",
        port: 443,
        protocol: "https"
      })) {
        if (useArweaveGw) {
          return this.customArweaveGw(arweave, cacheOptions, "testnet");
        } else {
          return this.customWarpGw(arweave, exports2.defaultWarpGwOptions, cacheOptions, "testnet");
        }
      }
      /**
       * creates a Warp instance suitable for use with mainnet.
       * By default, the Warp gateway (https://github.com/warp-contracts/gateway#warp-gateway)
       * is being used for:
       * 1. deploying contracts
       * 2. writing new transactions through Warp Sequencer
       * 3. loading contract interactions
       *
       * @param cacheOptions - cache options, defaults {@link defaultCacheOptions}
       * @param useArweaveGw - use arweave.net gateway for deploying contracts,
       * writing and loading interactions
       * @param arweave - custom Arweave instance
       */
      static forMainnet(cacheOptions = exports2.defaultCacheOptions, useArweaveGw = false, arweave = arweave_1.default.init({
        host: "arweave.net",
        port: 443,
        protocol: "https"
      })) {
        if (useArweaveGw) {
          return this.customArweaveGw(arweave, cacheOptions, "mainnet");
        } else {
          return this.customWarpGw(arweave, exports2.defaultWarpGwOptions, cacheOptions, "mainnet");
        }
      }
      /**
       * returns an instance of {@link WarpBuilder} that allows to fully customize the Warp instance.
       * @param arweave
       * @param cacheOptions
       */
      static custom(arweave, cacheOptions, environment) {
        const stateCache = new LevelDbCache_1.LevelDbCache({
          ...cacheOptions,
          dbLocation: `${cacheOptions.dbLocation}/state`
        });
        const executorFactory = new CacheableExecutorFactory_1.CacheableExecutorFactory(arweave, new HandlerExecutorFactory_1.HandlerExecutorFactory(arweave), new MemCache_1.MemCache());
        const stateEvaluator = new CacheableStateEvaluator_1.CacheableStateEvaluator(arweave, stateCache, [new Evolve_1.Evolve()]);
        return Warp_1.Warp.builder(arweave, stateCache, environment).setExecutorFactory(executorFactory).setStateEvaluator(stateEvaluator);
      }
      static customArweaveGw(arweave, cacheOptions = exports2.defaultCacheOptions, environment) {
        return this.custom(arweave, cacheOptions, environment).useArweaveGateway().build();
      }
      static customWarpGw(arweave, gatewayOptions = exports2.defaultWarpGwOptions, cacheOptions = exports2.defaultCacheOptions, environment) {
        return this.custom(arweave, cacheOptions, environment).useWarpGateway(gatewayOptions, cacheOptions).build();
      }
    }
    exports2.WarpFactory = WarpFactory2;
  })(WarpFactory);
  return WarpFactory;
}
var hasRequiredArweaveWrapper;
function requireArweaveWrapper() {
  if (hasRequiredArweaveWrapper)
    return ArweaveWrapper;
  hasRequiredArweaveWrapper = 1;
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(ArweaveWrapper, "__esModule", { value: true });
  ArweaveWrapper.ArweaveWrapper = void 0;
  const arweave_1 = __importDefault2(web);
  const transaction_1 = __importDefault2(requireTransaction());
  const redstone_isomorphic_12 = npmBrowser$1;
  const WarpFactory_1 = requireWarpFactory();
  const LoggerFactory_12 = LoggerFactory$1;
  let ArweaveWrapper$1 = class ArweaveWrapper {
    constructor(arweave) {
      this.arweave = arweave;
      this.logger = LoggerFactory_12.LoggerFactory.INST.create("ArweaveWrapper");
      this.baseUrl = `${arweave.api.config.protocol}://${arweave.api.config.host}:${arweave.api.config.port}`;
      this.logger.debug("baseurl", this.baseUrl);
    }
    async warpGwInfo() {
      return await this.doFetchInfo(`${WarpFactory_1.WARP_GW_URL}/gateway/arweave/info`);
    }
    async warpGwBlock() {
      this.logger.debug("Calling warp gw block info");
      return await this.doFetchInfo(`${WarpFactory_1.WARP_GW_URL}/gateway/arweave/block`);
    }
    async info() {
      return await this.doFetchInfo(`${this.baseUrl}/info`);
    }
    async gql(query, variables) {
      try {
        const data2 = JSON.stringify({
          query,
          variables
        });
        const response = await fetch(`${this.baseUrl}/graphql`, {
          method: "POST",
          body: data2,
          headers: {
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }).then((res) => {
          return res.ok ? res.json() : Promise.reject(res);
        }).catch((error2) => {
          var _a, _b;
          if ((_a = error2.body) === null || _a === void 0 ? void 0 : _a.message) {
            this.logger.error(error2.body.message);
          }
          throw new Error(`Unable to retrieve gql page. ${error2.status}: ${(_b = error2.body) === null || _b === void 0 ? void 0 : _b.message}`);
        });
        return {
          data: response,
          status: 200
        };
      } catch (e) {
        this.logger.error("Error while loading gql", e);
        throw e;
      }
    }
    async tx(id) {
      const response = await fetch(`${this.baseUrl}/tx/${id}`).then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      }).catch((error2) => {
        var _a, _b;
        if ((_a = error2.body) === null || _a === void 0 ? void 0 : _a.message) {
          this.logger.error(error2.body.message);
        }
        throw new Error(`Unable to retrieve tx ${id}. ${error2.status}. ${(_b = error2.body) === null || _b === void 0 ? void 0 : _b.message}`);
      });
      return new transaction_1.default({
        ...response
      });
    }
    async txData(id) {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        this.logger.warn(`Unable to load data from arweave.net/${id} endpoint, falling back to arweave.js`);
        const txData = await this.arweave.transactions.getData(id, {
          decode: true
        });
        return redstone_isomorphic_12.Buffer.from(txData);
      } else {
        const buffer2 = await response.arrayBuffer();
        return redstone_isomorphic_12.Buffer.from(buffer2);
      }
    }
    async txDataString(id) {
      const buffer2 = await this.txData(id);
      return arweave_1.default.utils.bufferToString(buffer2);
    }
    async doFetchInfo(url) {
      try {
        const response = await fetch(url).then((res) => {
          return res.ok ? res.json() : Promise.reject(res);
        }).catch((error2) => {
          var _a, _b;
          if ((_a = error2.body) === null || _a === void 0 ? void 0 : _a.message) {
            this.logger.error(error2.body.message);
          }
          throw new Error(`Unable to retrieve info. ${error2.status}: ${(_b = error2.body) === null || _b === void 0 ? void 0 : _b.message}`);
        });
        return response;
      } catch (e) {
        this.logger.error("Error while loading info", e);
        throw e;
      }
    }
  };
  ArweaveWrapper.ArweaveWrapper = ArweaveWrapper$1;
  return ArweaveWrapper;
}
var hasRequiredContractDefinitionLoader;
function requireContractDefinitionLoader() {
  if (hasRequiredContractDefinitionLoader)
    return ContractDefinitionLoader;
  hasRequiredContractDefinitionLoader = 1;
  Object.defineProperty(ContractDefinitionLoader, "__esModule", { value: true });
  ContractDefinitionLoader.ContractDefinitionLoader = void 0;
  const SmartWeaveTags_12 = SmartWeaveTags;
  const Benchmark_12 = Benchmark$1;
  const LoggerFactory_12 = LoggerFactory$1;
  const ArweaveWrapper_1 = requireArweaveWrapper();
  const TagsParser_12 = TagsParser$1;
  const WasmSrc_1 = WasmSrc$1;
  const supportedSrcContentTypes = ["application/javascript", "application/wasm"];
  let ContractDefinitionLoader$1 = class ContractDefinitionLoader {
    constructor(arweave, env) {
      this.arweave = arweave;
      this.env = env;
      this.logger = LoggerFactory_12.LoggerFactory.INST.create("ContractDefinitionLoader");
      this.arweaveWrapper = new ArweaveWrapper_1.ArweaveWrapper(arweave);
      this.tagsParser = new TagsParser_12.TagsParser();
    }
    async load(contractTxId, evolvedSrcTxId) {
      const benchmark = Benchmark_12.Benchmark.measure();
      const contract = await this.doLoad(contractTxId, evolvedSrcTxId);
      this.logger.info(`Contract definition loaded in: ${benchmark.elapsed()}`);
      return contract;
    }
    async doLoad(contractTxId, forcedSrcTxId) {
      const benchmark = Benchmark_12.Benchmark.measure();
      const contractTx = await this.arweaveWrapper.tx(contractTxId);
      const owner = await this.arweave.wallets.ownerToAddress(contractTx.owner);
      this.logger.debug("Contract tx and owner", benchmark.elapsed());
      benchmark.reset();
      const contractSrcTxId = forcedSrcTxId ? forcedSrcTxId : this.tagsParser.getTag(contractTx, SmartWeaveTags_12.SmartWeaveTags.CONTRACT_SRC_TX_ID);
      const testnet = this.tagsParser.getTag(contractTx, SmartWeaveTags_12.SmartWeaveTags.WARP_TESTNET) || null;
      if (testnet && this.env !== "testnet") {
        throw new Error('Trying to use testnet contract in a non-testnet env. Use the "forTestnet" factory method.');
      }
      if (!testnet && this.env === "testnet") {
        throw new Error("Trying to use non-testnet contract in a testnet env.");
      }
      const minFee = this.tagsParser.getTag(contractTx, SmartWeaveTags_12.SmartWeaveTags.MIN_FEE);
      let manifest = null;
      const rawManifest = this.tagsParser.getTag(contractTx, SmartWeaveTags_12.SmartWeaveTags.MANIFEST);
      if (rawManifest) {
        manifest = JSON.parse(rawManifest);
      }
      this.logger.debug("Tags decoding", benchmark.elapsed());
      benchmark.reset();
      const s = await this.evalInitialState(contractTx);
      this.logger.debug("init state", s);
      const initState = JSON.parse(await this.evalInitialState(contractTx));
      this.logger.debug("Parsing src and init state", benchmark.elapsed());
      const { src, srcBinary, srcWasmLang, contractType, metadata, srcTx } = await this.loadContractSource(contractSrcTxId);
      return {
        txId: contractTxId,
        srcTxId: contractSrcTxId,
        src,
        srcBinary,
        srcWasmLang,
        initState,
        minFee,
        owner,
        contractType,
        metadata,
        manifest,
        contractTx: contractTx.toJSON(),
        srcTx,
        testnet
      };
    }
    async loadContractSource(contractSrcTxId) {
      const benchmark = Benchmark_12.Benchmark.measure();
      const contractSrcTx = await this.arweaveWrapper.tx(contractSrcTxId);
      const srcContentType = this.tagsParser.getTag(contractSrcTx, SmartWeaveTags_12.SmartWeaveTags.CONTENT_TYPE);
      if (!supportedSrcContentTypes.includes(srcContentType)) {
        throw new Error(`Contract source content type ${srcContentType} not supported`);
      }
      const contractType = srcContentType == "application/javascript" ? "js" : "wasm";
      const src = contractType == "js" ? await this.arweaveWrapper.txDataString(contractSrcTxId) : await this.arweaveWrapper.txData(contractSrcTxId);
      let srcWasmLang;
      let wasmSrc;
      let srcMetaData;
      if (contractType == "wasm") {
        wasmSrc = new WasmSrc_1.WasmSrc(src);
        srcWasmLang = this.tagsParser.getTag(contractSrcTx, SmartWeaveTags_12.SmartWeaveTags.WASM_LANG);
        if (!srcWasmLang) {
          throw new Error(`Wasm lang not set for wasm contract src ${contractSrcTxId}`);
        }
        srcMetaData = JSON.parse(this.tagsParser.getTag(contractSrcTx, SmartWeaveTags_12.SmartWeaveTags.WASM_META));
      }
      this.logger.debug("Contract src tx load", benchmark.elapsed());
      benchmark.reset();
      return {
        src: contractType == "js" ? src : null,
        srcBinary: contractType == "wasm" ? wasmSrc.wasmBinary() : null,
        srcWasmLang,
        contractType,
        metadata: srcMetaData,
        srcTx: contractSrcTx.toJSON()
      };
    }
    async evalInitialState(contractTx) {
      if (this.tagsParser.getTag(contractTx, SmartWeaveTags_12.SmartWeaveTags.INIT_STATE)) {
        return this.tagsParser.getTag(contractTx, SmartWeaveTags_12.SmartWeaveTags.INIT_STATE);
      } else if (this.tagsParser.getTag(contractTx, SmartWeaveTags_12.SmartWeaveTags.INIT_STATE_TX)) {
        const stateTX = this.tagsParser.getTag(contractTx, SmartWeaveTags_12.SmartWeaveTags.INIT_STATE_TX);
        return this.arweaveWrapper.txDataString(stateTX);
      } else {
        return this.arweaveWrapper.txDataString(contractTx.id);
      }
    }
    type() {
      return "arweave";
    }
    setCache(cache) {
      throw new Error("No cache implemented for this loader");
    }
    setSrcCache(cache) {
      throw new Error("No cache implemented for this loader");
    }
    getCache() {
      throw new Error("No cache implemented for this loader");
    }
    getSrcCache() {
      throw new Error("No cache implemented for this loader");
    }
  };
  ContractDefinitionLoader.ContractDefinitionLoader = ContractDefinitionLoader$1;
  return ContractDefinitionLoader;
}
var ExecutionContextModifier = {};
Object.defineProperty(ExecutionContextModifier, "__esModule", { value: true });
var ExecutionContext = {};
Object.defineProperty(ExecutionContext, "__esModule", { value: true });
var Contract = {};
Object.defineProperty(Contract, "__esModule", { value: true });
var PstContract = {};
Object.defineProperty(PstContract, "__esModule", { value: true });
var Source = {};
Object.defineProperty(Source, "__esModule", { value: true });
var gqlResult = {};
Object.defineProperty(gqlResult, "__esModule", { value: true });
(function(exports2) {
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports3) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
        __createBinding2(exports3, m, p);
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  __exportStar(ConsoleLogger$1, exports2);
  __exportStar(ConsoleLoggerFactory$1, exports2);
  __exportStar(WarpLogger, exports2);
  __exportStar(LoggerFactory$1, exports2);
  __exportStar(LoggerSettings, exports2);
  __exportStar(Benchmark$1, exports2);
  __exportStar(SortKeyCache, exports2);
  __exportStar(WarpCache, exports2);
  __exportStar(LevelDbCache$1, exports2);
  __exportStar(MemCache$1, exports2);
  __exportStar(DefinitionLoader, exports2);
  __exportStar(ExecutorFactory, exports2);
  __exportStar(InteractionsLoader, exports2);
  __exportStar(InteractionsSorter, exports2);
  __exportStar(StateEvaluator, exports2);
  __exportStar(requireContractDefinitionLoader(), exports2);
  __exportStar(requireWarpGatewayContractDefinitionLoader(), exports2);
  __exportStar(requireArweaveGatewayInteractionsLoader(), exports2);
  __exportStar(WarpGatewayInteractionsLoader, exports2);
  __exportStar(CacheableInteractionsLoader$1, exports2);
  __exportStar(DefaultStateEvaluator$1, exports2);
  __exportStar(CacheableStateEvaluator$1, exports2);
  __exportStar(requireHandlerExecutorFactory(), exports2);
  __exportStar(LexicographicalInteractionsSorter, exports2);
  __exportStar(TagsParser$1, exports2);
  __exportStar(normalizeSource, exports2);
  __exportStar(StateCache, exports2);
  __exportStar(WasmSrc$1, exports2);
  __exportStar(requireAbstractContractHandler(), exports2);
  __exportStar(requireJsHandlerApi(), exports2);
  __exportStar(requireWasmHandlerApi(), exports2);
  __exportStar(ExecutionContextModifier, exports2);
  __exportStar(SmartWeaveTags, exports2);
  __exportStar(ExecutionContext, exports2);
  __exportStar(ContractDefinition, exports2);
  __exportStar(ContractCallRecord$1, exports2);
  __exportStar(requireWarpFactory(), exports2);
  __exportStar(requireWarp(), exports2);
  __exportStar(requireWarpBuilder(), exports2);
  __exportStar(WarpPlugin, exports2);
  __exportStar(Contract, exports2);
  __exportStar(requireHandlerBasedContract(), exports2);
  __exportStar(PstContract, exports2);
  __exportStar(requirePstContractImpl(), exports2);
  __exportStar(InnerWritesEvaluator$1, exports2);
  __exportStar(Signature$1, exports2);
  __exportStar(EvaluationOptionsEvaluator$1, exports2);
  __exportStar(Source, exports2);
  __exportStar(requireSourceImpl(), exports2);
  __exportStar(requireDefaultCreateContract(), exports2);
  __exportStar(CreateContract, exports2);
  __exportStar(gqlResult, exports2);
  __exportStar(smartweaveGlobal, exports2);
  __exportStar(errors, exports2);
  __exportStar(utils, exports2);
  __exportStar(createInteractionTx$1, exports2);
  __exportStar(utils$1, exports2);
  __exportStar(requireArweaveWrapper(), exports2);
})(cjs$1);
const index = /* @__PURE__ */ getDefaultExportFromCjs(cjs$1);
const index$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [cjs$1]);
export {
  index$1 as i
};
//# sourceMappingURL=index-40dd3e1b.js.map
