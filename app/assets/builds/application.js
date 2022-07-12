(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/@popperjs/core/dist/cjs/popper.js
  var require_popper = __commonJS({
    "node_modules/@popperjs/core/dist/cjs/popper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function getWindow(node) {
        if (node == null) {
          return window;
        }
        if (node.toString() !== "[object Window]") {
          var ownerDocument = node.ownerDocument;
          return ownerDocument ? ownerDocument.defaultView || window : window;
        }
        return node;
      }
      function isElement2(node) {
        var OwnElement = getWindow(node).Element;
        return node instanceof OwnElement || node instanceof Element;
      }
      function isHTMLElement(node) {
        var OwnElement = getWindow(node).HTMLElement;
        return node instanceof OwnElement || node instanceof HTMLElement;
      }
      function isShadowRoot(node) {
        if (typeof ShadowRoot === "undefined") {
          return false;
        }
        var OwnElement = getWindow(node).ShadowRoot;
        return node instanceof OwnElement || node instanceof ShadowRoot;
      }
      var max = Math.max;
      var min = Math.min;
      var round = Math.round;
      function getBoundingClientRect(element, includeScale) {
        if (includeScale === void 0) {
          includeScale = false;
        }
        var rect = element.getBoundingClientRect();
        var scaleX = 1;
        var scaleY = 1;
        if (isHTMLElement(element) && includeScale) {
          var offsetHeight = element.offsetHeight;
          var offsetWidth = element.offsetWidth;
          if (offsetWidth > 0) {
            scaleX = round(rect.width) / offsetWidth || 1;
          }
          if (offsetHeight > 0) {
            scaleY = round(rect.height) / offsetHeight || 1;
          }
        }
        return {
          width: rect.width / scaleX,
          height: rect.height / scaleY,
          top: rect.top / scaleY,
          right: rect.right / scaleX,
          bottom: rect.bottom / scaleY,
          left: rect.left / scaleX,
          x: rect.left / scaleX,
          y: rect.top / scaleY
        };
      }
      function getWindowScroll(node) {
        var win = getWindow(node);
        var scrollLeft = win.pageXOffset;
        var scrollTop = win.pageYOffset;
        return {
          scrollLeft,
          scrollTop
        };
      }
      function getHTMLElementScroll(element) {
        return {
          scrollLeft: element.scrollLeft,
          scrollTop: element.scrollTop
        };
      }
      function getNodeScroll(node) {
        if (node === getWindow(node) || !isHTMLElement(node)) {
          return getWindowScroll(node);
        } else {
          return getHTMLElementScroll(node);
        }
      }
      function getNodeName(element) {
        return element ? (element.nodeName || "").toLowerCase() : null;
      }
      function getDocumentElement(element) {
        return ((isElement2(element) ? element.ownerDocument : element.document) || window.document).documentElement;
      }
      function getWindowScrollBarX(element) {
        return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
      }
      function getComputedStyle2(element) {
        return getWindow(element).getComputedStyle(element);
      }
      function isScrollParent(element) {
        var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
        return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
      }
      function isElementScaled(element) {
        var rect = element.getBoundingClientRect();
        var scaleX = round(rect.width) / element.offsetWidth || 1;
        var scaleY = round(rect.height) / element.offsetHeight || 1;
        return scaleX !== 1 || scaleY !== 1;
      }
      function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
        if (isFixed === void 0) {
          isFixed = false;
        }
        var isOffsetParentAnElement = isHTMLElement(offsetParent);
        var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
        var documentElement = getDocumentElement(offsetParent);
        var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
        var scroll = {
          scrollLeft: 0,
          scrollTop: 0
        };
        var offsets = {
          x: 0,
          y: 0
        };
        if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
          if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
            scroll = getNodeScroll(offsetParent);
          }
          if (isHTMLElement(offsetParent)) {
            offsets = getBoundingClientRect(offsetParent, true);
            offsets.x += offsetParent.clientLeft;
            offsets.y += offsetParent.clientTop;
          } else if (documentElement) {
            offsets.x = getWindowScrollBarX(documentElement);
          }
        }
        return {
          x: rect.left + scroll.scrollLeft - offsets.x,
          y: rect.top + scroll.scrollTop - offsets.y,
          width: rect.width,
          height: rect.height
        };
      }
      function getLayoutRect(element) {
        var clientRect = getBoundingClientRect(element);
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        if (Math.abs(clientRect.width - width) <= 1) {
          width = clientRect.width;
        }
        if (Math.abs(clientRect.height - height) <= 1) {
          height = clientRect.height;
        }
        return {
          x: element.offsetLeft,
          y: element.offsetTop,
          width,
          height
        };
      }
      function getParentNode(element) {
        if (getNodeName(element) === "html") {
          return element;
        }
        return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
      }
      function getScrollParent(node) {
        if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
          return node.ownerDocument.body;
        }
        if (isHTMLElement(node) && isScrollParent(node)) {
          return node;
        }
        return getScrollParent(getParentNode(node));
      }
      function listScrollParents(element, list) {
        var _element$ownerDocumen;
        if (list === void 0) {
          list = [];
        }
        var scrollParent = getScrollParent(element);
        var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
        var win = getWindow(scrollParent);
        var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
        var updatedList = list.concat(target);
        return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
      }
      function isTableElement(element) {
        return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
      }
      function getTrueOffsetParent(element) {
        if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
          return null;
        }
        return element.offsetParent;
      }
      function getContainingBlock(element) {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
        var isIE = navigator.userAgent.indexOf("Trident") !== -1;
        if (isIE && isHTMLElement(element)) {
          var elementCss = getComputedStyle2(element);
          if (elementCss.position === "fixed") {
            return null;
          }
        }
        var currentNode = getParentNode(element);
        if (isShadowRoot(currentNode)) {
          currentNode = currentNode.host;
        }
        while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
          var css = getComputedStyle2(currentNode);
          if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
            return currentNode;
          } else {
            currentNode = currentNode.parentNode;
          }
        }
        return null;
      }
      function getOffsetParent(element) {
        var window2 = getWindow(element);
        var offsetParent = getTrueOffsetParent(element);
        while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
          offsetParent = getTrueOffsetParent(offsetParent);
        }
        if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
          return window2;
        }
        return offsetParent || getContainingBlock(element) || window2;
      }
      var top = "top";
      var bottom = "bottom";
      var right = "right";
      var left = "left";
      var auto = "auto";
      var basePlacements = [top, bottom, right, left];
      var start3 = "start";
      var end = "end";
      var clippingParents = "clippingParents";
      var viewport = "viewport";
      var popper = "popper";
      var reference = "reference";
      var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
        return acc.concat([placement + "-" + start3, placement + "-" + end]);
      }, []);
      var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
        return acc.concat([placement, placement + "-" + start3, placement + "-" + end]);
      }, []);
      var beforeRead = "beforeRead";
      var read = "read";
      var afterRead = "afterRead";
      var beforeMain = "beforeMain";
      var main = "main";
      var afterMain = "afterMain";
      var beforeWrite = "beforeWrite";
      var write = "write";
      var afterWrite = "afterWrite";
      var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
      function order(modifiers) {
        var map = /* @__PURE__ */ new Map();
        var visited = /* @__PURE__ */ new Set();
        var result = [];
        modifiers.forEach(function(modifier) {
          map.set(modifier.name, modifier);
        });
        function sort(modifier) {
          visited.add(modifier.name);
          var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
          requires.forEach(function(dep) {
            if (!visited.has(dep)) {
              var depModifier = map.get(dep);
              if (depModifier) {
                sort(depModifier);
              }
            }
          });
          result.push(modifier);
        }
        modifiers.forEach(function(modifier) {
          if (!visited.has(modifier.name)) {
            sort(modifier);
          }
        });
        return result;
      }
      function orderModifiers(modifiers) {
        var orderedModifiers = order(modifiers);
        return modifierPhases.reduce(function(acc, phase) {
          return acc.concat(orderedModifiers.filter(function(modifier) {
            return modifier.phase === phase;
          }));
        }, []);
      }
      function debounce(fn) {
        var pending;
        return function() {
          if (!pending) {
            pending = new Promise(function(resolve) {
              Promise.resolve().then(function() {
                pending = void 0;
                resolve(fn());
              });
            });
          }
          return pending;
        };
      }
      function format(str) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return [].concat(args).reduce(function(p, c) {
          return p.replace(/%s/, c);
        }, str);
      }
      var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
      var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
      var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
      function validateModifiers(modifiers) {
        modifiers.forEach(function(modifier) {
          [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self2) {
            return self2.indexOf(value) === index;
          }).forEach(function(key) {
            switch (key) {
              case "name":
                if (typeof modifier.name !== "string") {
                  console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
                }
                break;
              case "enabled":
                if (typeof modifier.enabled !== "boolean") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
                }
                break;
              case "phase":
                if (modifierPhases.indexOf(modifier.phase) < 0) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
                }
                break;
              case "fn":
                if (typeof modifier.fn !== "function") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
                }
                break;
              case "effect":
                if (modifier.effect != null && typeof modifier.effect !== "function") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
                }
                break;
              case "requires":
                if (modifier.requires != null && !Array.isArray(modifier.requires)) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
                }
                break;
              case "requiresIfExists":
                if (!Array.isArray(modifier.requiresIfExists)) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
                }
                break;
              case "options":
              case "data":
                break;
              default:
                console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
                  return '"' + s + '"';
                }).join(", ") + '; but "' + key + '" was provided.');
            }
            modifier.requires && modifier.requires.forEach(function(requirement) {
              if (modifiers.find(function(mod) {
                return mod.name === requirement;
              }) == null) {
                console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
              }
            });
          });
        });
      }
      function uniqueBy(arr, fn) {
        var identifiers = /* @__PURE__ */ new Set();
        return arr.filter(function(item) {
          var identifier = fn(item);
          if (!identifiers.has(identifier)) {
            identifiers.add(identifier);
            return true;
          }
        });
      }
      function getBasePlacement(placement) {
        return placement.split("-")[0];
      }
      function mergeByName(modifiers) {
        var merged = modifiers.reduce(function(merged2, current) {
          var existing = merged2[current.name];
          merged2[current.name] = existing ? Object.assign({}, existing, current, {
            options: Object.assign({}, existing.options, current.options),
            data: Object.assign({}, existing.data, current.data)
          }) : current;
          return merged2;
        }, {});
        return Object.keys(merged).map(function(key) {
          return merged[key];
        });
      }
      function getViewportRect(element) {
        var win = getWindow(element);
        var html = getDocumentElement(element);
        var visualViewport = win.visualViewport;
        var width = html.clientWidth;
        var height = html.clientHeight;
        var x = 0;
        var y = 0;
        if (visualViewport) {
          width = visualViewport.width;
          height = visualViewport.height;
          if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
          }
        }
        return {
          width,
          height,
          x: x + getWindowScrollBarX(element),
          y
        };
      }
      function getDocumentRect(element) {
        var _element$ownerDocumen;
        var html = getDocumentElement(element);
        var winScroll = getWindowScroll(element);
        var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
        var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
        var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
        var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
        var y = -winScroll.scrollTop;
        if (getComputedStyle2(body || html).direction === "rtl") {
          x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
        }
        return {
          width,
          height,
          x,
          y
        };
      }
      function contains(parent, child) {
        var rootNode = child.getRootNode && child.getRootNode();
        if (parent.contains(child)) {
          return true;
        } else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;
          do {
            if (next && parent.isSameNode(next)) {
              return true;
            }
            next = next.parentNode || next.host;
          } while (next);
        }
        return false;
      }
      function rectToClientRect(rect) {
        return Object.assign({}, rect, {
          left: rect.x,
          top: rect.y,
          right: rect.x + rect.width,
          bottom: rect.y + rect.height
        });
      }
      function getInnerBoundingClientRect(element) {
        var rect = getBoundingClientRect(element);
        rect.top = rect.top + element.clientTop;
        rect.left = rect.left + element.clientLeft;
        rect.bottom = rect.top + element.clientHeight;
        rect.right = rect.left + element.clientWidth;
        rect.width = element.clientWidth;
        rect.height = element.clientHeight;
        rect.x = rect.left;
        rect.y = rect.top;
        return rect;
      }
      function getClientRectFromMixedType(element, clippingParent) {
        return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement2(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
      }
      function getClippingParents(element) {
        var clippingParents2 = listScrollParents(getParentNode(element));
        var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
        var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
        if (!isElement2(clipperElement)) {
          return [];
        }
        return clippingParents2.filter(function(clippingParent) {
          return isElement2(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
        });
      }
      function getClippingRect(element, boundary, rootBoundary) {
        var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
        var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
        var firstClippingParent = clippingParents2[0];
        var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
          var rect = getClientRectFromMixedType(element, clippingParent);
          accRect.top = max(rect.top, accRect.top);
          accRect.right = min(rect.right, accRect.right);
          accRect.bottom = min(rect.bottom, accRect.bottom);
          accRect.left = max(rect.left, accRect.left);
          return accRect;
        }, getClientRectFromMixedType(element, firstClippingParent));
        clippingRect.width = clippingRect.right - clippingRect.left;
        clippingRect.height = clippingRect.bottom - clippingRect.top;
        clippingRect.x = clippingRect.left;
        clippingRect.y = clippingRect.top;
        return clippingRect;
      }
      function getVariation(placement) {
        return placement.split("-")[1];
      }
      function getMainAxisFromPlacement(placement) {
        return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
      }
      function computeOffsets(_ref) {
        var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
        var basePlacement = placement ? getBasePlacement(placement) : null;
        var variation = placement ? getVariation(placement) : null;
        var commonX = reference2.x + reference2.width / 2 - element.width / 2;
        var commonY = reference2.y + reference2.height / 2 - element.height / 2;
        var offsets;
        switch (basePlacement) {
          case top:
            offsets = {
              x: commonX,
              y: reference2.y - element.height
            };
            break;
          case bottom:
            offsets = {
              x: commonX,
              y: reference2.y + reference2.height
            };
            break;
          case right:
            offsets = {
              x: reference2.x + reference2.width,
              y: commonY
            };
            break;
          case left:
            offsets = {
              x: reference2.x - element.width,
              y: commonY
            };
            break;
          default:
            offsets = {
              x: reference2.x,
              y: reference2.y
            };
        }
        var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
        if (mainAxis != null) {
          var len = mainAxis === "y" ? "height" : "width";
          switch (variation) {
            case start3:
              offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
              break;
            case end:
              offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
              break;
          }
        }
        return offsets;
      }
      function getFreshSideObject() {
        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }
      function mergePaddingObject(paddingObject) {
        return Object.assign({}, getFreshSideObject(), paddingObject);
      }
      function expandToHashMap(value, keys) {
        return keys.reduce(function(hashMap, key) {
          hashMap[key] = value;
          return hashMap;
        }, {});
      }
      function detectOverflow(state, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
        var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
        var altContext = elementContext === popper ? reference : popper;
        var popperRect = state.rects.popper;
        var element = state.elements[altBoundary ? altContext : elementContext];
        var clippingClientRect = getClippingRect(isElement2(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
        var referenceClientRect = getBoundingClientRect(state.elements.reference);
        var popperOffsets2 = computeOffsets({
          reference: referenceClientRect,
          element: popperRect,
          strategy: "absolute",
          placement
        });
        var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
        var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
        var overflowOffsets = {
          top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
          bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
          left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
          right: elementClientRect.right - clippingClientRect.right + paddingObject.right
        };
        var offsetData = state.modifiersData.offset;
        if (elementContext === popper && offsetData) {
          var offset2 = offsetData[placement];
          Object.keys(overflowOffsets).forEach(function(key) {
            var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
            var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
            overflowOffsets[key] += offset2[axis] * multiply;
          });
        }
        return overflowOffsets;
      }
      var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
      var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
      var DEFAULT_OPTIONS = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
      };
      function areValidElements() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return !args.some(function(element) {
          return !(element && typeof element.getBoundingClientRect === "function");
        });
      }
      function popperGenerator(generatorOptions) {
        if (generatorOptions === void 0) {
          generatorOptions = {};
        }
        var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
        return function createPopper3(reference2, popper2, options) {
          if (options === void 0) {
            options = defaultOptions2;
          }
          var state = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
            modifiersData: {},
            elements: {
              reference: reference2,
              popper: popper2
            },
            attributes: {},
            styles: {}
          };
          var effectCleanupFns = [];
          var isDestroyed = false;
          var instance = {
            state,
            setOptions: function setOptions(setOptionsAction) {
              var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
              cleanupModifierEffects();
              state.options = Object.assign({}, defaultOptions2, state.options, options2);
              state.scrollParents = {
                reference: isElement2(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
                popper: listScrollParents(popper2)
              };
              var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
              state.orderedModifiers = orderedModifiers.filter(function(m) {
                return m.enabled;
              });
              if (true) {
                var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
                  var name = _ref.name;
                  return name;
                });
                validateModifiers(modifiers);
                if (getBasePlacement(state.options.placement) === auto) {
                  var flipModifier = state.orderedModifiers.find(function(_ref2) {
                    var name = _ref2.name;
                    return name === "flip";
                  });
                  if (!flipModifier) {
                    console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
                  }
                }
                var _getComputedStyle = getComputedStyle2(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
                if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
                  return parseFloat(margin);
                })) {
                  console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
                }
              }
              runModifierEffects();
              return instance.update();
            },
            forceUpdate: function forceUpdate() {
              if (isDestroyed) {
                return;
              }
              var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
              if (!areValidElements(reference3, popper3)) {
                if (true) {
                  console.error(INVALID_ELEMENT_ERROR);
                }
                return;
              }
              state.rects = {
                reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
                popper: getLayoutRect(popper3)
              };
              state.reset = false;
              state.placement = state.options.placement;
              state.orderedModifiers.forEach(function(modifier) {
                return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
              });
              var __debug_loops__ = 0;
              for (var index = 0; index < state.orderedModifiers.length; index++) {
                if (true) {
                  __debug_loops__ += 1;
                  if (__debug_loops__ > 100) {
                    console.error(INFINITE_LOOP_ERROR);
                    break;
                  }
                }
                if (state.reset === true) {
                  state.reset = false;
                  index = -1;
                  continue;
                }
                var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                if (typeof fn === "function") {
                  state = fn({
                    state,
                    options: _options,
                    name,
                    instance
                  }) || state;
                }
              }
            },
            update: debounce(function() {
              return new Promise(function(resolve) {
                instance.forceUpdate();
                resolve(state);
              });
            }),
            destroy: function destroy() {
              cleanupModifierEffects();
              isDestroyed = true;
            }
          };
          if (!areValidElements(reference2, popper2)) {
            if (true) {
              console.error(INVALID_ELEMENT_ERROR);
            }
            return instance;
          }
          instance.setOptions(options).then(function(state2) {
            if (!isDestroyed && options.onFirstUpdate) {
              options.onFirstUpdate(state2);
            }
          });
          function runModifierEffects() {
            state.orderedModifiers.forEach(function(_ref3) {
              var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
              if (typeof effect2 === "function") {
                var cleanupFn = effect2({
                  state,
                  name,
                  instance,
                  options: options2
                });
                var noopFn = function noopFn2() {
                };
                effectCleanupFns.push(cleanupFn || noopFn);
              }
            });
          }
          function cleanupModifierEffects() {
            effectCleanupFns.forEach(function(fn) {
              return fn();
            });
            effectCleanupFns = [];
          }
          return instance;
        };
      }
      var passive = {
        passive: true
      };
      function effect$2(_ref) {
        var state = _ref.state, instance = _ref.instance, options = _ref.options;
        var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
        var window2 = getWindow(state.elements.popper);
        var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
        if (scroll) {
          scrollParents.forEach(function(scrollParent) {
            scrollParent.addEventListener("scroll", instance.update, passive);
          });
        }
        if (resize) {
          window2.addEventListener("resize", instance.update, passive);
        }
        return function() {
          if (scroll) {
            scrollParents.forEach(function(scrollParent) {
              scrollParent.removeEventListener("scroll", instance.update, passive);
            });
          }
          if (resize) {
            window2.removeEventListener("resize", instance.update, passive);
          }
        };
      }
      var eventListeners = {
        name: "eventListeners",
        enabled: true,
        phase: "write",
        fn: function fn() {
        },
        effect: effect$2,
        data: {}
      };
      function popperOffsets(_ref) {
        var state = _ref.state, name = _ref.name;
        state.modifiersData[name] = computeOffsets({
          reference: state.rects.reference,
          element: state.rects.popper,
          strategy: "absolute",
          placement: state.placement
        });
      }
      var popperOffsets$1 = {
        name: "popperOffsets",
        enabled: true,
        phase: "read",
        fn: popperOffsets,
        data: {}
      };
      var unsetSides = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
      };
      function roundOffsetsByDPR(_ref) {
        var x = _ref.x, y = _ref.y;
        var win = window;
        var dpr = win.devicePixelRatio || 1;
        return {
          x: round(x * dpr) / dpr || 0,
          y: round(y * dpr) / dpr || 0
        };
      }
      function mapToStyles(_ref2) {
        var _Object$assign2;
        var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
        var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
        var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
          x,
          y
        }) : {
          x,
          y
        };
        x = _ref3.x;
        y = _ref3.y;
        var hasX = offsets.hasOwnProperty("x");
        var hasY = offsets.hasOwnProperty("y");
        var sideX = left;
        var sideY = top;
        var win = window;
        if (adaptive) {
          var offsetParent = getOffsetParent(popper2);
          var heightProp = "clientHeight";
          var widthProp = "clientWidth";
          if (offsetParent === getWindow(popper2)) {
            offsetParent = getDocumentElement(popper2);
            if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
              heightProp = "scrollHeight";
              widthProp = "scrollWidth";
            }
          }
          offsetParent = offsetParent;
          if (placement === top || (placement === left || placement === right) && variation === end) {
            sideY = bottom;
            var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
            y -= offsetY - popperRect.height;
            y *= gpuAcceleration ? 1 : -1;
          }
          if (placement === left || (placement === top || placement === bottom) && variation === end) {
            sideX = right;
            var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
            x -= offsetX - popperRect.width;
            x *= gpuAcceleration ? 1 : -1;
          }
        }
        var commonStyles = Object.assign({
          position
        }, adaptive && unsetSides);
        var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
          x,
          y
        }) : {
          x,
          y
        };
        x = _ref4.x;
        y = _ref4.y;
        if (gpuAcceleration) {
          var _Object$assign;
          return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
        }
        return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
      }
      function computeStyles(_ref5) {
        var state = _ref5.state, options = _ref5.options;
        var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
        if (true) {
          var transitionProperty = getComputedStyle2(state.elements.popper).transitionProperty || "";
          if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
            return transitionProperty.indexOf(property) >= 0;
          })) {
            console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
          }
        }
        var commonStyles = {
          placement: getBasePlacement(state.placement),
          variation: getVariation(state.placement),
          popper: state.elements.popper,
          popperRect: state.rects.popper,
          gpuAcceleration,
          isFixed: state.options.strategy === "fixed"
        };
        if (state.modifiersData.popperOffsets != null) {
          state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.popperOffsets,
            position: state.options.strategy,
            adaptive,
            roundOffsets
          })));
        }
        if (state.modifiersData.arrow != null) {
          state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.arrow,
            position: "absolute",
            adaptive: false,
            roundOffsets
          })));
        }
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
          "data-popper-placement": state.placement
        });
      }
      var computeStyles$1 = {
        name: "computeStyles",
        enabled: true,
        phase: "beforeWrite",
        fn: computeStyles,
        data: {}
      };
      function applyStyles(_ref) {
        var state = _ref.state;
        Object.keys(state.elements).forEach(function(name) {
          var style = state.styles[name] || {};
          var attributes = state.attributes[name] || {};
          var element = state.elements[name];
          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }
          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function(name2) {
            var value = attributes[name2];
            if (value === false) {
              element.removeAttribute(name2);
            } else {
              element.setAttribute(name2, value === true ? "" : value);
            }
          });
        });
      }
      function effect$1(_ref2) {
        var state = _ref2.state;
        var initialStyles = {
          popper: {
            position: state.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
          },
          arrow: {
            position: "absolute"
          },
          reference: {}
        };
        Object.assign(state.elements.popper.style, initialStyles.popper);
        state.styles = initialStyles;
        if (state.elements.arrow) {
          Object.assign(state.elements.arrow.style, initialStyles.arrow);
        }
        return function() {
          Object.keys(state.elements).forEach(function(name) {
            var element = state.elements[name];
            var attributes = state.attributes[name] || {};
            var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
            var style = styleProperties.reduce(function(style2, property) {
              style2[property] = "";
              return style2;
            }, {});
            if (!isHTMLElement(element) || !getNodeName(element)) {
              return;
            }
            Object.assign(element.style, style);
            Object.keys(attributes).forEach(function(attribute) {
              element.removeAttribute(attribute);
            });
          });
        };
      }
      var applyStyles$1 = {
        name: "applyStyles",
        enabled: true,
        phase: "write",
        fn: applyStyles,
        effect: effect$1,
        requires: ["computeStyles"]
      };
      function distanceAndSkiddingToXY(placement, rects, offset2) {
        var basePlacement = getBasePlacement(placement);
        var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
        var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
          placement
        })) : offset2, skidding = _ref[0], distance = _ref[1];
        skidding = skidding || 0;
        distance = (distance || 0) * invertDistance;
        return [left, right].indexOf(basePlacement) >= 0 ? {
          x: distance,
          y: skidding
        } : {
          x: skidding,
          y: distance
        };
      }
      function offset(_ref2) {
        var state = _ref2.state, options = _ref2.options, name = _ref2.name;
        var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
        var data = placements.reduce(function(acc, placement) {
          acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
          return acc;
        }, {});
        var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
        if (state.modifiersData.popperOffsets != null) {
          state.modifiersData.popperOffsets.x += x;
          state.modifiersData.popperOffsets.y += y;
        }
        state.modifiersData[name] = data;
      }
      var offset$1 = {
        name: "offset",
        enabled: true,
        phase: "main",
        requires: ["popperOffsets"],
        fn: offset
      };
      var hash$1 = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
      };
      function getOppositePlacement(placement) {
        return placement.replace(/left|right|bottom|top/g, function(matched) {
          return hash$1[matched];
        });
      }
      var hash = {
        start: "end",
        end: "start"
      };
      function getOppositeVariationPlacement(placement) {
        return placement.replace(/start|end/g, function(matched) {
          return hash[matched];
        });
      }
      function computeAutoPlacement(state, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
        var variation = getVariation(placement);
        var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
          return getVariation(placement2) === variation;
        }) : basePlacements;
        var allowedPlacements = placements$1.filter(function(placement2) {
          return allowedAutoPlacements.indexOf(placement2) >= 0;
        });
        if (allowedPlacements.length === 0) {
          allowedPlacements = placements$1;
          if (true) {
            console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
          }
        }
        var overflows = allowedPlacements.reduce(function(acc, placement2) {
          acc[placement2] = detectOverflow(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding
          })[getBasePlacement(placement2)];
          return acc;
        }, {});
        return Object.keys(overflows).sort(function(a, b) {
          return overflows[a] - overflows[b];
        });
      }
      function getExpandedFallbackPlacements(placement) {
        if (getBasePlacement(placement) === auto) {
          return [];
        }
        var oppositePlacement = getOppositePlacement(placement);
        return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
      }
      function flip(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        if (state.modifiersData[name]._skip) {
          return;
        }
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
        var preferredPlacement = state.options.placement;
        var basePlacement = getBasePlacement(preferredPlacement);
        var isBasePlacement = basePlacement === preferredPlacement;
        var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
        var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
          return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding,
            flipVariations,
            allowedAutoPlacements
          }) : placement2);
        }, []);
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var checksMap = /* @__PURE__ */ new Map();
        var makeFallbackChecks = true;
        var firstFittingPlacement = placements2[0];
        for (var i = 0; i < placements2.length; i++) {
          var placement = placements2[i];
          var _basePlacement = getBasePlacement(placement);
          var isStartVariation = getVariation(placement) === start3;
          var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
          var len = isVertical ? "width" : "height";
          var overflow = detectOverflow(state, {
            placement,
            boundary,
            rootBoundary,
            altBoundary,
            padding
          });
          var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
          if (referenceRect[len] > popperRect[len]) {
            mainVariationSide = getOppositePlacement(mainVariationSide);
          }
          var altVariationSide = getOppositePlacement(mainVariationSide);
          var checks = [];
          if (checkMainAxis) {
            checks.push(overflow[_basePlacement] <= 0);
          }
          if (checkAltAxis) {
            checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
          }
          if (checks.every(function(check) {
            return check;
          })) {
            firstFittingPlacement = placement;
            makeFallbackChecks = false;
            break;
          }
          checksMap.set(placement, checks);
        }
        if (makeFallbackChecks) {
          var numberOfChecks = flipVariations ? 3 : 1;
          var _loop = function _loop2(_i2) {
            var fittingPlacement = placements2.find(function(placement2) {
              var checks2 = checksMap.get(placement2);
              if (checks2) {
                return checks2.slice(0, _i2).every(function(check) {
                  return check;
                });
              }
            });
            if (fittingPlacement) {
              firstFittingPlacement = fittingPlacement;
              return "break";
            }
          };
          for (var _i = numberOfChecks; _i > 0; _i--) {
            var _ret = _loop(_i);
            if (_ret === "break")
              break;
          }
        }
        if (state.placement !== firstFittingPlacement) {
          state.modifiersData[name]._skip = true;
          state.placement = firstFittingPlacement;
          state.reset = true;
        }
      }
      var flip$1 = {
        name: "flip",
        enabled: true,
        phase: "main",
        fn: flip,
        requiresIfExists: ["offset"],
        data: {
          _skip: false
        }
      };
      function getAltAxis(axis) {
        return axis === "x" ? "y" : "x";
      }
      function within(min$1, value, max$1) {
        return max(min$1, min(value, max$1));
      }
      function withinMaxClamp(min2, value, max2) {
        var v = within(min2, value, max2);
        return v > max2 ? max2 : v;
      }
      function preventOverflow(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
        var overflow = detectOverflow(state, {
          boundary,
          rootBoundary,
          padding,
          altBoundary
        });
        var basePlacement = getBasePlacement(state.placement);
        var variation = getVariation(state.placement);
        var isBasePlacement = !variation;
        var mainAxis = getMainAxisFromPlacement(basePlacement);
        var altAxis = getAltAxis(mainAxis);
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
          placement: state.placement
        })) : tetherOffset;
        var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
          mainAxis: tetherOffsetValue,
          altAxis: tetherOffsetValue
        } : Object.assign({
          mainAxis: 0,
          altAxis: 0
        }, tetherOffsetValue);
        var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
        var data = {
          x: 0,
          y: 0
        };
        if (!popperOffsets2) {
          return;
        }
        if (checkMainAxis) {
          var _offsetModifierState$;
          var mainSide = mainAxis === "y" ? top : left;
          var altSide = mainAxis === "y" ? bottom : right;
          var len = mainAxis === "y" ? "height" : "width";
          var offset2 = popperOffsets2[mainAxis];
          var min$1 = offset2 + overflow[mainSide];
          var max$1 = offset2 - overflow[altSide];
          var additive = tether ? -popperRect[len] / 2 : 0;
          var minLen = variation === start3 ? referenceRect[len] : popperRect[len];
          var maxLen = variation === start3 ? -popperRect[len] : -referenceRect[len];
          var arrowElement = state.elements.arrow;
          var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
            width: 0,
            height: 0
          };
          var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
          var arrowPaddingMin = arrowPaddingObject[mainSide];
          var arrowPaddingMax = arrowPaddingObject[altSide];
          var arrowLen = within(0, referenceRect[len], arrowRect[len]);
          var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
          var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
          var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
          var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
          var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
          var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
          var tetherMax = offset2 + maxOffset - offsetModifierValue;
          var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
          popperOffsets2[mainAxis] = preventedOffset;
          data[mainAxis] = preventedOffset - offset2;
        }
        if (checkAltAxis) {
          var _offsetModifierState$2;
          var _mainSide = mainAxis === "x" ? top : left;
          var _altSide = mainAxis === "x" ? bottom : right;
          var _offset = popperOffsets2[altAxis];
          var _len = altAxis === "y" ? "height" : "width";
          var _min = _offset + overflow[_mainSide];
          var _max = _offset - overflow[_altSide];
          var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
          var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
          var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
          var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
          var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
          popperOffsets2[altAxis] = _preventedOffset;
          data[altAxis] = _preventedOffset - _offset;
        }
        state.modifiersData[name] = data;
      }
      var preventOverflow$1 = {
        name: "preventOverflow",
        enabled: true,
        phase: "main",
        fn: preventOverflow,
        requiresIfExists: ["offset"]
      };
      var toPaddingObject = function toPaddingObject2(padding, state) {
        padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
          placement: state.placement
        })) : padding;
        return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
      };
      function arrow(_ref) {
        var _state$modifiersData$;
        var state = _ref.state, name = _ref.name, options = _ref.options;
        var arrowElement = state.elements.arrow;
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var basePlacement = getBasePlacement(state.placement);
        var axis = getMainAxisFromPlacement(basePlacement);
        var isVertical = [left, right].indexOf(basePlacement) >= 0;
        var len = isVertical ? "height" : "width";
        if (!arrowElement || !popperOffsets2) {
          return;
        }
        var paddingObject = toPaddingObject(options.padding, state);
        var arrowRect = getLayoutRect(arrowElement);
        var minProp = axis === "y" ? top : left;
        var maxProp = axis === "y" ? bottom : right;
        var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
        var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
        var arrowOffsetParent = getOffsetParent(arrowElement);
        var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
        var centerToReference = endDiff / 2 - startDiff / 2;
        var min2 = paddingObject[minProp];
        var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
        var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
        var offset2 = within(min2, center, max2);
        var axisProp = axis;
        state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
      }
      function effect(_ref2) {
        var state = _ref2.state, options = _ref2.options;
        var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
        if (arrowElement == null) {
          return;
        }
        if (typeof arrowElement === "string") {
          arrowElement = state.elements.popper.querySelector(arrowElement);
          if (!arrowElement) {
            return;
          }
        }
        if (true) {
          if (!isHTMLElement(arrowElement)) {
            console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
          }
        }
        if (!contains(state.elements.popper, arrowElement)) {
          if (true) {
            console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
          }
          return;
        }
        state.elements.arrow = arrowElement;
      }
      var arrow$1 = {
        name: "arrow",
        enabled: true,
        phase: "main",
        fn: arrow,
        effect,
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
      };
      function getSideOffsets(overflow, rect, preventedOffsets) {
        if (preventedOffsets === void 0) {
          preventedOffsets = {
            x: 0,
            y: 0
          };
        }
        return {
          top: overflow.top - rect.height - preventedOffsets.y,
          right: overflow.right - rect.width + preventedOffsets.x,
          bottom: overflow.bottom - rect.height + preventedOffsets.y,
          left: overflow.left - rect.width - preventedOffsets.x
        };
      }
      function isAnySideFullyClipped(overflow) {
        return [top, right, bottom, left].some(function(side) {
          return overflow[side] >= 0;
        });
      }
      function hide(_ref) {
        var state = _ref.state, name = _ref.name;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var preventedOffsets = state.modifiersData.preventOverflow;
        var referenceOverflow = detectOverflow(state, {
          elementContext: "reference"
        });
        var popperAltOverflow = detectOverflow(state, {
          altBoundary: true
        });
        var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
        var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
        var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
        var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
        state.modifiersData[name] = {
          referenceClippingOffsets,
          popperEscapeOffsets,
          isReferenceHidden,
          hasPopperEscaped
        };
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
          "data-popper-reference-hidden": isReferenceHidden,
          "data-popper-escaped": hasPopperEscaped
        });
      }
      var hide$1 = {
        name: "hide",
        enabled: true,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: hide
      };
      var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
      var createPopper$1 = /* @__PURE__ */ popperGenerator({
        defaultModifiers: defaultModifiers$1
      });
      var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
      var createPopper2 = /* @__PURE__ */ popperGenerator({
        defaultModifiers
      });
      exports.applyStyles = applyStyles$1;
      exports.arrow = arrow$1;
      exports.computeStyles = computeStyles$1;
      exports.createPopper = createPopper2;
      exports.createPopperLite = createPopper$1;
      exports.defaultModifiers = defaultModifiers;
      exports.detectOverflow = detectOverflow;
      exports.eventListeners = eventListeners;
      exports.flip = flip$1;
      exports.hide = hide$1;
      exports.offset = offset$1;
      exports.popperGenerator = popperGenerator;
      exports.popperOffsets = popperOffsets$1;
      exports.preventOverflow = preventOverflow$1;
    }
  });

  // node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/adapters.js
  var adapters_default;
  var init_adapters = __esm({
    "node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/adapters.js"() {
      adapters_default = {
        logger: self.console,
        WebSocket: self.WebSocket
      };
    }
  });

  // node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/logger.js
  var logger_default;
  var init_logger = __esm({
    "node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/logger.js"() {
      init_adapters();
      logger_default = {
        log(...messages) {
          if (this.enabled) {
            messages.push(Date.now());
            adapters_default.logger.log("[ActionCable]", ...messages);
          }
        }
      };
    }
  });

  // node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/connection_monitor.js
  var now, secondsSince, ConnectionMonitor, connection_monitor_default;
  var init_connection_monitor = __esm({
    "node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/connection_monitor.js"() {
      init_logger();
      now = () => new Date().getTime();
      secondsSince = (time) => (now() - time) / 1e3;
      ConnectionMonitor = class {
        constructor(connection) {
          this.visibilityDidChange = this.visibilityDidChange.bind(this);
          this.connection = connection;
          this.reconnectAttempts = 0;
        }
        start() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            addEventListener("visibilitychange", this.visibilityDidChange);
            logger_default.log(`ConnectionMonitor started. stale threshold = ${this.constructor.staleThreshold} s`);
          }
        }
        stop() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            removeEventListener("visibilitychange", this.visibilityDidChange);
            logger_default.log("ConnectionMonitor stopped");
          }
        }
        isRunning() {
          return this.startedAt && !this.stoppedAt;
        }
        recordPing() {
          this.pingedAt = now();
        }
        recordConnect() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          logger_default.log("ConnectionMonitor recorded connect");
        }
        recordDisconnect() {
          this.disconnectedAt = now();
          logger_default.log("ConnectionMonitor recorded disconnect");
        }
        startPolling() {
          this.stopPolling();
          this.poll();
        }
        stopPolling() {
          clearTimeout(this.pollTimeout);
        }
        poll() {
          this.pollTimeout = setTimeout(() => {
            this.reconnectIfStale();
            this.poll();
          }, this.getPollInterval());
        }
        getPollInterval() {
          const { staleThreshold, reconnectionBackoffRate } = this.constructor;
          const backoff = Math.pow(1 + reconnectionBackoffRate, Math.min(this.reconnectAttempts, 10));
          const jitterMax = this.reconnectAttempts === 0 ? 1 : reconnectionBackoffRate;
          const jitter = jitterMax * Math.random();
          return staleThreshold * 1e3 * backoff * (1 + jitter);
        }
        reconnectIfStale() {
          if (this.connectionIsStale()) {
            logger_default.log(`ConnectionMonitor detected stale connection. reconnectAttempts = ${this.reconnectAttempts}, time stale = ${secondsSince(this.refreshedAt)} s, stale threshold = ${this.constructor.staleThreshold} s`);
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              logger_default.log(`ConnectionMonitor skipping reopening recent disconnect. time disconnected = ${secondsSince(this.disconnectedAt)} s`);
            } else {
              logger_default.log("ConnectionMonitor reopening");
              this.connection.reopen();
            }
          }
        }
        get refreshedAt() {
          return this.pingedAt ? this.pingedAt : this.startedAt;
        }
        connectionIsStale() {
          return secondsSince(this.refreshedAt) > this.constructor.staleThreshold;
        }
        disconnectedRecently() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        }
        visibilityDidChange() {
          if (document.visibilityState === "visible") {
            setTimeout(() => {
              if (this.connectionIsStale() || !this.connection.isOpen()) {
                logger_default.log(`ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = ${document.visibilityState}`);
                this.connection.reopen();
              }
            }, 200);
          }
        }
      };
      ConnectionMonitor.staleThreshold = 6;
      ConnectionMonitor.reconnectionBackoffRate = 0.15;
      connection_monitor_default = ConnectionMonitor;
    }
  });

  // node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/internal.js
  var internal_default;
  var init_internal = __esm({
    "node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/internal.js"() {
      internal_default = {
        "message_types": {
          "welcome": "welcome",
          "disconnect": "disconnect",
          "ping": "ping",
          "confirmation": "confirm_subscription",
          "rejection": "reject_subscription"
        },
        "disconnect_reasons": {
          "unauthorized": "unauthorized",
          "invalid_request": "invalid_request",
          "server_restart": "server_restart"
        },
        "default_mount_path": "/cable",
        "protocols": [
          "actioncable-v1-json",
          "actioncable-unsupported"
        ]
      };
    }
  });

  // node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/connection.js
  var message_types, protocols, supportedProtocols, indexOf, Connection, connection_default;
  var init_connection = __esm({
    "node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/connection.js"() {
      init_adapters();
      init_connection_monitor();
      init_internal();
      init_logger();
      ({ message_types, protocols } = internal_default);
      supportedProtocols = protocols.slice(0, protocols.length - 1);
      indexOf = [].indexOf;
      Connection = class {
        constructor(consumer2) {
          this.open = this.open.bind(this);
          this.consumer = consumer2;
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new connection_monitor_default(this);
          this.disconnected = true;
        }
        send(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        }
        open() {
          if (this.isActive()) {
            logger_default.log(`Attempted to open WebSocket, but existing socket is ${this.getState()}`);
            return false;
          } else {
            logger_default.log(`Opening WebSocket, current state is ${this.getState()}, subprotocols: ${protocols}`);
            if (this.webSocket) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new adapters_default.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        }
        close({ allowReconnect } = { allowReconnect: true }) {
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isOpen()) {
            return this.webSocket.close();
          }
        }
        reopen() {
          logger_default.log(`Reopening WebSocket, current state is ${this.getState()}`);
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error) {
              logger_default.log("Failed to reopen WebSocket", error);
            } finally {
              logger_default.log(`Reopening WebSocket in ${this.constructor.reopenDelay}ms`);
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        }
        getProtocol() {
          if (this.webSocket) {
            return this.webSocket.protocol;
          }
        }
        isOpen() {
          return this.isState("open");
        }
        isActive() {
          return this.isState("open", "connecting");
        }
        isProtocolSupported() {
          return indexOf.call(supportedProtocols, this.getProtocol()) >= 0;
        }
        isState(...states) {
          return indexOf.call(states, this.getState()) >= 0;
        }
        getState() {
          if (this.webSocket) {
            for (let state in adapters_default.WebSocket) {
              if (adapters_default.WebSocket[state] === this.webSocket.readyState) {
                return state.toLowerCase();
              }
            }
          }
          return null;
        }
        installEventHandlers() {
          for (let eventName in this.events) {
            const handler = this.events[eventName].bind(this);
            this.webSocket[`on${eventName}`] = handler;
          }
        }
        uninstallEventHandlers() {
          for (let eventName in this.events) {
            this.webSocket[`on${eventName}`] = function() {
            };
          }
        }
      };
      Connection.reopenDelay = 500;
      Connection.prototype.events = {
        message(event) {
          if (!this.isProtocolSupported()) {
            return;
          }
          const { identifier, message, reason, reconnect, type } = JSON.parse(event.data);
          switch (type) {
            case message_types.welcome:
              this.monitor.recordConnect();
              return this.subscriptions.reload();
            case message_types.disconnect:
              logger_default.log(`Disconnecting. Reason: ${reason}`);
              return this.close({ allowReconnect: reconnect });
            case message_types.ping:
              return this.monitor.recordPing();
            case message_types.confirmation:
              this.subscriptions.confirmSubscription(identifier);
              return this.subscriptions.notify(identifier, "connected");
            case message_types.rejection:
              return this.subscriptions.reject(identifier);
            default:
              return this.subscriptions.notify(identifier, "received", message);
          }
        },
        open() {
          logger_default.log(`WebSocket onopen event, using '${this.getProtocol()}' subprotocol`);
          this.disconnected = false;
          if (!this.isProtocolSupported()) {
            logger_default.log("Protocol is unsupported. Stopping monitor and disconnecting.");
            return this.close({ allowReconnect: false });
          }
        },
        close(event) {
          logger_default.log("WebSocket onclose event");
          if (this.disconnected) {
            return;
          }
          this.disconnected = true;
          this.monitor.recordDisconnect();
          return this.subscriptions.notifyAll("disconnected", { willAttemptReconnect: this.monitor.isRunning() });
        },
        error() {
          logger_default.log("WebSocket onerror event");
        }
      };
      connection_default = Connection;
    }
  });

  // node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/subscription.js
  var extend, Subscription;
  var init_subscription = __esm({
    "node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/subscription.js"() {
      extend = function(object, properties) {
        if (properties != null) {
          for (let key in properties) {
            const value = properties[key];
            object[key] = value;
          }
        }
        return object;
      };
      Subscription = class {
        constructor(consumer2, params = {}, mixin) {
          this.consumer = consumer2;
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }
        perform(action, data = {}) {
          data.action = action;
          return this.send(data);
        }
        send(data) {
          return this.consumer.send({ command: "message", identifier: this.identifier, data: JSON.stringify(data) });
        }
        unsubscribe() {
          return this.consumer.subscriptions.remove(this);
        }
      };
    }
  });

  // node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/subscription_guarantor.js
  var SubscriptionGuarantor, subscription_guarantor_default;
  var init_subscription_guarantor = __esm({
    "node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/subscription_guarantor.js"() {
      init_logger();
      SubscriptionGuarantor = class {
        constructor(subscriptions) {
          this.subscriptions = subscriptions;
          this.pendingSubscriptions = [];
        }
        guarantee(subscription) {
          if (this.pendingSubscriptions.indexOf(subscription) == -1) {
            logger_default.log(`SubscriptionGuarantor guaranteeing ${subscription.identifier}`);
            this.pendingSubscriptions.push(subscription);
          } else {
            logger_default.log(`SubscriptionGuarantor already guaranteeing ${subscription.identifier}`);
          }
          this.startGuaranteeing();
        }
        forget(subscription) {
          logger_default.log(`SubscriptionGuarantor forgetting ${subscription.identifier}`);
          this.pendingSubscriptions = this.pendingSubscriptions.filter((s) => s !== subscription);
        }
        startGuaranteeing() {
          this.stopGuaranteeing();
          this.retrySubscribing();
        }
        stopGuaranteeing() {
          clearTimeout(this.retryTimeout);
        }
        retrySubscribing() {
          this.retryTimeout = setTimeout(() => {
            if (this.subscriptions && typeof this.subscriptions.subscribe === "function") {
              this.pendingSubscriptions.map((subscription) => {
                logger_default.log(`SubscriptionGuarantor resubscribing ${subscription.identifier}`);
                this.subscriptions.subscribe(subscription);
              });
            }
          }, 500);
        }
      };
      subscription_guarantor_default = SubscriptionGuarantor;
    }
  });

  // node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/subscriptions.js
  var Subscriptions;
  var init_subscriptions = __esm({
    "node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/subscriptions.js"() {
      init_subscription();
      init_subscription_guarantor();
      init_logger();
      Subscriptions = class {
        constructor(consumer2) {
          this.consumer = consumer2;
          this.guarantor = new subscription_guarantor_default(this);
          this.subscriptions = [];
        }
        create(channelName, mixin) {
          const channel = channelName;
          const params = typeof channel === "object" ? channel : { channel };
          const subscription = new Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        }
        add(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.subscribe(subscription);
          return subscription;
        }
        remove(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        }
        reject(identifier) {
          return this.findAll(identifier).map((subscription) => {
            this.forget(subscription);
            this.notify(subscription, "rejected");
            return subscription;
          });
        }
        forget(subscription) {
          this.guarantor.forget(subscription);
          this.subscriptions = this.subscriptions.filter((s) => s !== subscription);
          return subscription;
        }
        findAll(identifier) {
          return this.subscriptions.filter((s) => s.identifier === identifier);
        }
        reload() {
          return this.subscriptions.map((subscription) => this.subscribe(subscription));
        }
        notifyAll(callbackName, ...args) {
          return this.subscriptions.map((subscription) => this.notify(subscription, callbackName, ...args));
        }
        notify(subscription, callbackName, ...args) {
          let subscriptions;
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          return subscriptions.map((subscription2) => typeof subscription2[callbackName] === "function" ? subscription2[callbackName](...args) : void 0);
        }
        subscribe(subscription) {
          if (this.sendCommand(subscription, "subscribe")) {
            this.guarantor.guarantee(subscription);
          }
        }
        confirmSubscription(identifier) {
          logger_default.log(`Subscription confirmed ${identifier}`);
          this.findAll(identifier).map((subscription) => this.guarantor.forget(subscription));
        }
        sendCommand(subscription, command) {
          const { identifier } = subscription;
          return this.consumer.send({ command, identifier });
        }
      };
    }
  });

  // node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/consumer.js
  function createWebSocketURL(url) {
    if (typeof url === "function") {
      url = url();
    }
    if (url && !/^wss?:/i.test(url)) {
      const a = document.createElement("a");
      a.href = url;
      a.href = a.href;
      a.protocol = a.protocol.replace("http", "ws");
      return a.href;
    } else {
      return url;
    }
  }
  var Consumer;
  var init_consumer = __esm({
    "node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/consumer.js"() {
      init_connection();
      init_subscriptions();
      Consumer = class {
        constructor(url) {
          this._url = url;
          this.subscriptions = new Subscriptions(this);
          this.connection = new connection_default(this);
        }
        get url() {
          return createWebSocketURL(this._url);
        }
        send(data) {
          return this.connection.send(data);
        }
        connect() {
          return this.connection.open();
        }
        disconnect() {
          return this.connection.close({ allowReconnect: false });
        }
        ensureActiveConnection() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        }
      };
    }
  });

  // node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/index.js
  var src_exports = {};
  __export(src_exports, {
    Connection: () => connection_default,
    ConnectionMonitor: () => connection_monitor_default,
    Consumer: () => Consumer,
    INTERNAL: () => internal_default,
    Subscription: () => Subscription,
    SubscriptionGuarantor: () => subscription_guarantor_default,
    Subscriptions: () => Subscriptions,
    adapters: () => adapters_default,
    createConsumer: () => createConsumer,
    createWebSocketURL: () => createWebSocketURL,
    getConfig: () => getConfig,
    logger: () => logger_default
  });
  function createConsumer(url = getConfig("url") || internal_default.default_mount_path) {
    return new Consumer(url);
  }
  function getConfig(name) {
    const element = document.head.querySelector(`meta[name='action-cable-${name}']`);
    if (element) {
      return element.getAttribute("content");
    }
  }
  var init_src = __esm({
    "node_modules/@hotwired/turbo-rails/node_modules/@rails/actioncable/src/index.js"() {
      init_connection();
      init_connection_monitor();
      init_consumer();
      init_internal();
      init_subscription();
      init_subscriptions();
      init_subscription_guarantor();
      init_adapters();
      init_logger();
    }
  });

  // node_modules/@rails/activestorage/app/assets/javascripts/activestorage.js
  var require_activestorage = __commonJS({
    "node_modules/@rails/activestorage/app/assets/javascripts/activestorage.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.ActiveStorage = {});
      })(exports, function(exports2) {
        "use strict";
        function createCommonjsModule(fn, module2) {
          return module2 = {
            exports: {}
          }, fn(module2, module2.exports), module2.exports;
        }
        var sparkMd5 = createCommonjsModule(function(module2, exports3) {
          (function(factory) {
            {
              module2.exports = factory();
            }
          })(function(undefined2) {
            var hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
            function md5cycle(x, k) {
              var a = x[0], b = x[1], c = x[2], d = x[3];
              a += (b & c | ~b & d) + k[0] - 680876936 | 0;
              a = (a << 7 | a >>> 25) + b | 0;
              d += (a & b | ~a & c) + k[1] - 389564586 | 0;
              d = (d << 12 | d >>> 20) + a | 0;
              c += (d & a | ~d & b) + k[2] + 606105819 | 0;
              c = (c << 17 | c >>> 15) + d | 0;
              b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
              b = (b << 22 | b >>> 10) + c | 0;
              a += (b & c | ~b & d) + k[4] - 176418897 | 0;
              a = (a << 7 | a >>> 25) + b | 0;
              d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
              d = (d << 12 | d >>> 20) + a | 0;
              c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
              c = (c << 17 | c >>> 15) + d | 0;
              b += (c & d | ~c & a) + k[7] - 45705983 | 0;
              b = (b << 22 | b >>> 10) + c | 0;
              a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
              a = (a << 7 | a >>> 25) + b | 0;
              d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
              d = (d << 12 | d >>> 20) + a | 0;
              c += (d & a | ~d & b) + k[10] - 42063 | 0;
              c = (c << 17 | c >>> 15) + d | 0;
              b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
              b = (b << 22 | b >>> 10) + c | 0;
              a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
              a = (a << 7 | a >>> 25) + b | 0;
              d += (a & b | ~a & c) + k[13] - 40341101 | 0;
              d = (d << 12 | d >>> 20) + a | 0;
              c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
              c = (c << 17 | c >>> 15) + d | 0;
              b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
              b = (b << 22 | b >>> 10) + c | 0;
              a += (b & d | c & ~d) + k[1] - 165796510 | 0;
              a = (a << 5 | a >>> 27) + b | 0;
              d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
              d = (d << 9 | d >>> 23) + a | 0;
              c += (d & b | a & ~b) + k[11] + 643717713 | 0;
              c = (c << 14 | c >>> 18) + d | 0;
              b += (c & a | d & ~a) + k[0] - 373897302 | 0;
              b = (b << 20 | b >>> 12) + c | 0;
              a += (b & d | c & ~d) + k[5] - 701558691 | 0;
              a = (a << 5 | a >>> 27) + b | 0;
              d += (a & c | b & ~c) + k[10] + 38016083 | 0;
              d = (d << 9 | d >>> 23) + a | 0;
              c += (d & b | a & ~b) + k[15] - 660478335 | 0;
              c = (c << 14 | c >>> 18) + d | 0;
              b += (c & a | d & ~a) + k[4] - 405537848 | 0;
              b = (b << 20 | b >>> 12) + c | 0;
              a += (b & d | c & ~d) + k[9] + 568446438 | 0;
              a = (a << 5 | a >>> 27) + b | 0;
              d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
              d = (d << 9 | d >>> 23) + a | 0;
              c += (d & b | a & ~b) + k[3] - 187363961 | 0;
              c = (c << 14 | c >>> 18) + d | 0;
              b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
              b = (b << 20 | b >>> 12) + c | 0;
              a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
              a = (a << 5 | a >>> 27) + b | 0;
              d += (a & c | b & ~c) + k[2] - 51403784 | 0;
              d = (d << 9 | d >>> 23) + a | 0;
              c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
              c = (c << 14 | c >>> 18) + d | 0;
              b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
              b = (b << 20 | b >>> 12) + c | 0;
              a += (b ^ c ^ d) + k[5] - 378558 | 0;
              a = (a << 4 | a >>> 28) + b | 0;
              d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
              d = (d << 11 | d >>> 21) + a | 0;
              c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
              c = (c << 16 | c >>> 16) + d | 0;
              b += (c ^ d ^ a) + k[14] - 35309556 | 0;
              b = (b << 23 | b >>> 9) + c | 0;
              a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
              a = (a << 4 | a >>> 28) + b | 0;
              d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
              d = (d << 11 | d >>> 21) + a | 0;
              c += (d ^ a ^ b) + k[7] - 155497632 | 0;
              c = (c << 16 | c >>> 16) + d | 0;
              b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
              b = (b << 23 | b >>> 9) + c | 0;
              a += (b ^ c ^ d) + k[13] + 681279174 | 0;
              a = (a << 4 | a >>> 28) + b | 0;
              d += (a ^ b ^ c) + k[0] - 358537222 | 0;
              d = (d << 11 | d >>> 21) + a | 0;
              c += (d ^ a ^ b) + k[3] - 722521979 | 0;
              c = (c << 16 | c >>> 16) + d | 0;
              b += (c ^ d ^ a) + k[6] + 76029189 | 0;
              b = (b << 23 | b >>> 9) + c | 0;
              a += (b ^ c ^ d) + k[9] - 640364487 | 0;
              a = (a << 4 | a >>> 28) + b | 0;
              d += (a ^ b ^ c) + k[12] - 421815835 | 0;
              d = (d << 11 | d >>> 21) + a | 0;
              c += (d ^ a ^ b) + k[15] + 530742520 | 0;
              c = (c << 16 | c >>> 16) + d | 0;
              b += (c ^ d ^ a) + k[2] - 995338651 | 0;
              b = (b << 23 | b >>> 9) + c | 0;
              a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
              a = (a << 6 | a >>> 26) + b | 0;
              d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
              d = (d << 10 | d >>> 22) + a | 0;
              c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
              c = (c << 15 | c >>> 17) + d | 0;
              b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
              b = (b << 21 | b >>> 11) + c | 0;
              a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
              a = (a << 6 | a >>> 26) + b | 0;
              d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
              d = (d << 10 | d >>> 22) + a | 0;
              c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
              c = (c << 15 | c >>> 17) + d | 0;
              b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
              b = (b << 21 | b >>> 11) + c | 0;
              a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
              a = (a << 6 | a >>> 26) + b | 0;
              d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
              d = (d << 10 | d >>> 22) + a | 0;
              c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
              c = (c << 15 | c >>> 17) + d | 0;
              b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
              b = (b << 21 | b >>> 11) + c | 0;
              a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
              a = (a << 6 | a >>> 26) + b | 0;
              d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
              d = (d << 10 | d >>> 22) + a | 0;
              c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
              c = (c << 15 | c >>> 17) + d | 0;
              b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
              b = (b << 21 | b >>> 11) + c | 0;
              x[0] = a + x[0] | 0;
              x[1] = b + x[1] | 0;
              x[2] = c + x[2] | 0;
              x[3] = d + x[3] | 0;
            }
            function md5blk(s) {
              var md5blks = [], i;
              for (i = 0; i < 64; i += 4) {
                md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
              }
              return md5blks;
            }
            function md5blk_array(a) {
              var md5blks = [], i;
              for (i = 0; i < 64; i += 4) {
                md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
              }
              return md5blks;
            }
            function md51(s) {
              var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
              for (i = 64; i <= n; i += 64) {
                md5cycle(state, md5blk(s.substring(i - 64, i)));
              }
              s = s.substring(i - 64);
              length = s.length;
              tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              for (i = 0; i < length; i += 1) {
                tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
              }
              tail[i >> 2] |= 128 << (i % 4 << 3);
              if (i > 55) {
                md5cycle(state, tail);
                for (i = 0; i < 16; i += 1) {
                  tail[i] = 0;
                }
              }
              tmp = n * 8;
              tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
              lo = parseInt(tmp[2], 16);
              hi = parseInt(tmp[1], 16) || 0;
              tail[14] = lo;
              tail[15] = hi;
              md5cycle(state, tail);
              return state;
            }
            function md51_array(a) {
              var n = a.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
              for (i = 64; i <= n; i += 64) {
                md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
              }
              a = i - 64 < n ? a.subarray(i - 64) : new Uint8Array(0);
              length = a.length;
              tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              for (i = 0; i < length; i += 1) {
                tail[i >> 2] |= a[i] << (i % 4 << 3);
              }
              tail[i >> 2] |= 128 << (i % 4 << 3);
              if (i > 55) {
                md5cycle(state, tail);
                for (i = 0; i < 16; i += 1) {
                  tail[i] = 0;
                }
              }
              tmp = n * 8;
              tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
              lo = parseInt(tmp[2], 16);
              hi = parseInt(tmp[1], 16) || 0;
              tail[14] = lo;
              tail[15] = hi;
              md5cycle(state, tail);
              return state;
            }
            function rhex(n) {
              var s = "", j;
              for (j = 0; j < 4; j += 1) {
                s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
              }
              return s;
            }
            function hex(x) {
              var i;
              for (i = 0; i < x.length; i += 1) {
                x[i] = rhex(x[i]);
              }
              return x.join("");
            }
            if (hex(md51("hello")) !== "5d41402abc4b2a76b9719d911017c592")
              ;
            if (typeof ArrayBuffer !== "undefined" && !ArrayBuffer.prototype.slice) {
              (function() {
                function clamp(val, length) {
                  val = val | 0 || 0;
                  if (val < 0) {
                    return Math.max(val + length, 0);
                  }
                  return Math.min(val, length);
                }
                ArrayBuffer.prototype.slice = function(from, to) {
                  var length = this.byteLength, begin = clamp(from, length), end = length, num, target, targetArray, sourceArray;
                  if (to !== undefined2) {
                    end = clamp(to, length);
                  }
                  if (begin > end) {
                    return new ArrayBuffer(0);
                  }
                  num = end - begin;
                  target = new ArrayBuffer(num);
                  targetArray = new Uint8Array(target);
                  sourceArray = new Uint8Array(this, begin, num);
                  targetArray.set(sourceArray);
                  return target;
                };
              })();
            }
            function toUtf8(str) {
              if (/[\u0080-\uFFFF]/.test(str)) {
                str = unescape(encodeURIComponent(str));
              }
              return str;
            }
            function utf8Str2ArrayBuffer(str, returnUInt8Array) {
              var length = str.length, buff = new ArrayBuffer(length), arr = new Uint8Array(buff), i;
              for (i = 0; i < length; i += 1) {
                arr[i] = str.charCodeAt(i);
              }
              return returnUInt8Array ? arr : buff;
            }
            function arrayBuffer2Utf8Str(buff) {
              return String.fromCharCode.apply(null, new Uint8Array(buff));
            }
            function concatenateArrayBuffers(first, second, returnUInt8Array) {
              var result = new Uint8Array(first.byteLength + second.byteLength);
              result.set(new Uint8Array(first));
              result.set(new Uint8Array(second), first.byteLength);
              return returnUInt8Array ? result : result.buffer;
            }
            function hexToBinaryString(hex2) {
              var bytes = [], length = hex2.length, x;
              for (x = 0; x < length - 1; x += 2) {
                bytes.push(parseInt(hex2.substr(x, 2), 16));
              }
              return String.fromCharCode.apply(String, bytes);
            }
            function SparkMD5() {
              this.reset();
            }
            SparkMD5.prototype.append = function(str) {
              this.appendBinary(toUtf8(str));
              return this;
            };
            SparkMD5.prototype.appendBinary = function(contents) {
              this._buff += contents;
              this._length += contents.length;
              var length = this._buff.length, i;
              for (i = 64; i <= length; i += 64) {
                md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
              }
              this._buff = this._buff.substring(i - 64);
              return this;
            };
            SparkMD5.prototype.end = function(raw) {
              var buff = this._buff, length = buff.length, i, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ret;
              for (i = 0; i < length; i += 1) {
                tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
              }
              this._finish(tail, length);
              ret = hex(this._hash);
              if (raw) {
                ret = hexToBinaryString(ret);
              }
              this.reset();
              return ret;
            };
            SparkMD5.prototype.reset = function() {
              this._buff = "";
              this._length = 0;
              this._hash = [1732584193, -271733879, -1732584194, 271733878];
              return this;
            };
            SparkMD5.prototype.getState = function() {
              return {
                buff: this._buff,
                length: this._length,
                hash: this._hash
              };
            };
            SparkMD5.prototype.setState = function(state) {
              this._buff = state.buff;
              this._length = state.length;
              this._hash = state.hash;
              return this;
            };
            SparkMD5.prototype.destroy = function() {
              delete this._hash;
              delete this._buff;
              delete this._length;
            };
            SparkMD5.prototype._finish = function(tail, length) {
              var i = length, tmp, lo, hi;
              tail[i >> 2] |= 128 << (i % 4 << 3);
              if (i > 55) {
                md5cycle(this._hash, tail);
                for (i = 0; i < 16; i += 1) {
                  tail[i] = 0;
                }
              }
              tmp = this._length * 8;
              tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
              lo = parseInt(tmp[2], 16);
              hi = parseInt(tmp[1], 16) || 0;
              tail[14] = lo;
              tail[15] = hi;
              md5cycle(this._hash, tail);
            };
            SparkMD5.hash = function(str, raw) {
              return SparkMD5.hashBinary(toUtf8(str), raw);
            };
            SparkMD5.hashBinary = function(content, raw) {
              var hash = md51(content), ret = hex(hash);
              return raw ? hexToBinaryString(ret) : ret;
            };
            SparkMD5.ArrayBuffer = function() {
              this.reset();
            };
            SparkMD5.ArrayBuffer.prototype.append = function(arr) {
              var buff = concatenateArrayBuffers(this._buff.buffer, arr, true), length = buff.length, i;
              this._length += arr.byteLength;
              for (i = 64; i <= length; i += 64) {
                md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
              }
              this._buff = i - 64 < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);
              return this;
            };
            SparkMD5.ArrayBuffer.prototype.end = function(raw) {
              var buff = this._buff, length = buff.length, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i, ret;
              for (i = 0; i < length; i += 1) {
                tail[i >> 2] |= buff[i] << (i % 4 << 3);
              }
              this._finish(tail, length);
              ret = hex(this._hash);
              if (raw) {
                ret = hexToBinaryString(ret);
              }
              this.reset();
              return ret;
            };
            SparkMD5.ArrayBuffer.prototype.reset = function() {
              this._buff = new Uint8Array(0);
              this._length = 0;
              this._hash = [1732584193, -271733879, -1732584194, 271733878];
              return this;
            };
            SparkMD5.ArrayBuffer.prototype.getState = function() {
              var state = SparkMD5.prototype.getState.call(this);
              state.buff = arrayBuffer2Utf8Str(state.buff);
              return state;
            };
            SparkMD5.ArrayBuffer.prototype.setState = function(state) {
              state.buff = utf8Str2ArrayBuffer(state.buff, true);
              return SparkMD5.prototype.setState.call(this, state);
            };
            SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
            SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
            SparkMD5.ArrayBuffer.hash = function(arr, raw) {
              var hash = md51_array(new Uint8Array(arr)), ret = hex(hash);
              return raw ? hexToBinaryString(ret) : ret;
            };
            return SparkMD5;
          });
        });
        var classCallCheck = function(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };
        var createClass = function() {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function(Constructor, protoProps, staticProps) {
            if (protoProps)
              defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();
        var fileSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        var FileChecksum = function() {
          createClass(FileChecksum2, null, [{
            key: "create",
            value: function create(file, callback) {
              var instance = new FileChecksum2(file);
              instance.create(callback);
            }
          }]);
          function FileChecksum2(file) {
            classCallCheck(this, FileChecksum2);
            this.file = file;
            this.chunkSize = 2097152;
            this.chunkCount = Math.ceil(this.file.size / this.chunkSize);
            this.chunkIndex = 0;
          }
          createClass(FileChecksum2, [{
            key: "create",
            value: function create(callback) {
              var _this = this;
              this.callback = callback;
              this.md5Buffer = new sparkMd5.ArrayBuffer();
              this.fileReader = new FileReader();
              this.fileReader.addEventListener("load", function(event) {
                return _this.fileReaderDidLoad(event);
              });
              this.fileReader.addEventListener("error", function(event) {
                return _this.fileReaderDidError(event);
              });
              this.readNextChunk();
            }
          }, {
            key: "fileReaderDidLoad",
            value: function fileReaderDidLoad(event) {
              this.md5Buffer.append(event.target.result);
              if (!this.readNextChunk()) {
                var binaryDigest = this.md5Buffer.end(true);
                var base64digest = btoa(binaryDigest);
                this.callback(null, base64digest);
              }
            }
          }, {
            key: "fileReaderDidError",
            value: function fileReaderDidError(event) {
              this.callback("Error reading " + this.file.name);
            }
          }, {
            key: "readNextChunk",
            value: function readNextChunk() {
              if (this.chunkIndex < this.chunkCount || this.chunkIndex == 0 && this.chunkCount == 0) {
                var start4 = this.chunkIndex * this.chunkSize;
                var end = Math.min(start4 + this.chunkSize, this.file.size);
                var bytes = fileSlice.call(this.file, start4, end);
                this.fileReader.readAsArrayBuffer(bytes);
                this.chunkIndex++;
                return true;
              } else {
                return false;
              }
            }
          }]);
          return FileChecksum2;
        }();
        function getMetaValue(name) {
          var element = findElement(document.head, 'meta[name="' + name + '"]');
          if (element) {
            return element.getAttribute("content");
          }
        }
        function findElements(root, selector) {
          if (typeof root == "string") {
            selector = root;
            root = document;
          }
          var elements = root.querySelectorAll(selector);
          return toArray$1(elements);
        }
        function findElement(root, selector) {
          if (typeof root == "string") {
            selector = root;
            root = document;
          }
          return root.querySelector(selector);
        }
        function dispatchEvent2(element, type) {
          var eventInit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          var disabled = element.disabled;
          var bubbles = eventInit.bubbles, cancelable = eventInit.cancelable, detail = eventInit.detail;
          var event = document.createEvent("Event");
          event.initEvent(type, bubbles || true, cancelable || true);
          event.detail = detail || {};
          try {
            element.disabled = false;
            element.dispatchEvent(event);
          } finally {
            element.disabled = disabled;
          }
          return event;
        }
        function toArray$1(value) {
          if (Array.isArray(value)) {
            return value;
          } else if (Array.from) {
            return Array.from(value);
          } else {
            return [].slice.call(value);
          }
        }
        var BlobRecord = function() {
          function BlobRecord2(file, checksum, url) {
            var _this = this;
            classCallCheck(this, BlobRecord2);
            this.file = file;
            this.attributes = {
              filename: file.name,
              content_type: file.type || "application/octet-stream",
              byte_size: file.size,
              checksum
            };
            this.xhr = new XMLHttpRequest();
            this.xhr.open("POST", url, true);
            this.xhr.responseType = "json";
            this.xhr.setRequestHeader("Content-Type", "application/json");
            this.xhr.setRequestHeader("Accept", "application/json");
            this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            var csrfToken = getMetaValue("csrf-token");
            if (csrfToken != void 0) {
              this.xhr.setRequestHeader("X-CSRF-Token", csrfToken);
            }
            this.xhr.addEventListener("load", function(event) {
              return _this.requestDidLoad(event);
            });
            this.xhr.addEventListener("error", function(event) {
              return _this.requestDidError(event);
            });
          }
          createClass(BlobRecord2, [{
            key: "create",
            value: function create(callback) {
              this.callback = callback;
              this.xhr.send(JSON.stringify({
                blob: this.attributes
              }));
            }
          }, {
            key: "requestDidLoad",
            value: function requestDidLoad(event) {
              if (this.status >= 200 && this.status < 300) {
                var response = this.response;
                var direct_upload = response.direct_upload;
                delete response.direct_upload;
                this.attributes = response;
                this.directUploadData = direct_upload;
                this.callback(null, this.toJSON());
              } else {
                this.requestDidError(event);
              }
            }
          }, {
            key: "requestDidError",
            value: function requestDidError(event) {
              this.callback('Error creating Blob for "' + this.file.name + '". Status: ' + this.status);
            }
          }, {
            key: "toJSON",
            value: function toJSON() {
              var result = {};
              for (var key in this.attributes) {
                result[key] = this.attributes[key];
              }
              return result;
            }
          }, {
            key: "status",
            get: function get$$1() {
              return this.xhr.status;
            }
          }, {
            key: "response",
            get: function get$$1() {
              var _xhr = this.xhr, responseType = _xhr.responseType, response = _xhr.response;
              if (responseType == "json") {
                return response;
              } else {
                return JSON.parse(response);
              }
            }
          }]);
          return BlobRecord2;
        }();
        var BlobUpload = function() {
          function BlobUpload2(blob) {
            var _this = this;
            classCallCheck(this, BlobUpload2);
            this.blob = blob;
            this.file = blob.file;
            var _blob$directUploadDat = blob.directUploadData, url = _blob$directUploadDat.url, headers = _blob$directUploadDat.headers;
            this.xhr = new XMLHttpRequest();
            this.xhr.open("PUT", url, true);
            this.xhr.responseType = "text";
            for (var key in headers) {
              this.xhr.setRequestHeader(key, headers[key]);
            }
            this.xhr.addEventListener("load", function(event) {
              return _this.requestDidLoad(event);
            });
            this.xhr.addEventListener("error", function(event) {
              return _this.requestDidError(event);
            });
          }
          createClass(BlobUpload2, [{
            key: "create",
            value: function create(callback) {
              this.callback = callback;
              this.xhr.send(this.file.slice());
            }
          }, {
            key: "requestDidLoad",
            value: function requestDidLoad(event) {
              var _xhr = this.xhr, status = _xhr.status, response = _xhr.response;
              if (status >= 200 && status < 300) {
                this.callback(null, response);
              } else {
                this.requestDidError(event);
              }
            }
          }, {
            key: "requestDidError",
            value: function requestDidError(event) {
              this.callback('Error storing "' + this.file.name + '". Status: ' + this.xhr.status);
            }
          }]);
          return BlobUpload2;
        }();
        var id = 0;
        var DirectUpload = function() {
          function DirectUpload2(file, url, delegate) {
            classCallCheck(this, DirectUpload2);
            this.id = ++id;
            this.file = file;
            this.url = url;
            this.delegate = delegate;
          }
          createClass(DirectUpload2, [{
            key: "create",
            value: function create(callback) {
              var _this = this;
              FileChecksum.create(this.file, function(error, checksum) {
                if (error) {
                  callback(error);
                  return;
                }
                var blob = new BlobRecord(_this.file, checksum, _this.url);
                notify(_this.delegate, "directUploadWillCreateBlobWithXHR", blob.xhr);
                blob.create(function(error2) {
                  if (error2) {
                    callback(error2);
                  } else {
                    var upload = new BlobUpload(blob);
                    notify(_this.delegate, "directUploadWillStoreFileWithXHR", upload.xhr);
                    upload.create(function(error3) {
                      if (error3) {
                        callback(error3);
                      } else {
                        callback(null, blob.toJSON());
                      }
                    });
                  }
                });
              });
            }
          }]);
          return DirectUpload2;
        }();
        function notify(object, methodName) {
          if (object && typeof object[methodName] == "function") {
            for (var _len = arguments.length, messages = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              messages[_key - 2] = arguments[_key];
            }
            return object[methodName].apply(object, messages);
          }
        }
        var DirectUploadController = function() {
          function DirectUploadController2(input, file) {
            classCallCheck(this, DirectUploadController2);
            this.input = input;
            this.file = file;
            this.directUpload = new DirectUpload(this.file, this.url, this);
            this.dispatch("initialize");
          }
          createClass(DirectUploadController2, [{
            key: "start",
            value: function start4(callback) {
              var _this = this;
              var hiddenInput = document.createElement("input");
              hiddenInput.type = "hidden";
              hiddenInput.name = this.input.name;
              this.input.insertAdjacentElement("beforebegin", hiddenInput);
              this.dispatch("start");
              this.directUpload.create(function(error, attributes) {
                if (error) {
                  hiddenInput.parentNode.removeChild(hiddenInput);
                  _this.dispatchError(error);
                } else {
                  hiddenInput.value = attributes.signed_id;
                }
                _this.dispatch("end");
                callback(error);
              });
            }
          }, {
            key: "uploadRequestDidProgress",
            value: function uploadRequestDidProgress(event) {
              var progress = event.loaded / event.total * 100;
              if (progress) {
                this.dispatch("progress", {
                  progress
                });
              }
            }
          }, {
            key: "dispatch",
            value: function dispatch2(name) {
              var detail = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              detail.file = this.file;
              detail.id = this.directUpload.id;
              return dispatchEvent2(this.input, "direct-upload:" + name, {
                detail
              });
            }
          }, {
            key: "dispatchError",
            value: function dispatchError(error) {
              var event = this.dispatch("error", {
                error
              });
              if (!event.defaultPrevented) {
                alert(error);
              }
            }
          }, {
            key: "directUploadWillCreateBlobWithXHR",
            value: function directUploadWillCreateBlobWithXHR(xhr) {
              this.dispatch("before-blob-request", {
                xhr
              });
            }
          }, {
            key: "directUploadWillStoreFileWithXHR",
            value: function directUploadWillStoreFileWithXHR(xhr) {
              var _this2 = this;
              this.dispatch("before-storage-request", {
                xhr
              });
              xhr.upload.addEventListener("progress", function(event) {
                return _this2.uploadRequestDidProgress(event);
              });
            }
          }, {
            key: "url",
            get: function get$$1() {
              return this.input.getAttribute("data-direct-upload-url");
            }
          }]);
          return DirectUploadController2;
        }();
        var inputSelector = "input[type=file][data-direct-upload-url]:not([disabled])";
        var DirectUploadsController = function() {
          function DirectUploadsController2(form) {
            classCallCheck(this, DirectUploadsController2);
            this.form = form;
            this.inputs = findElements(form, inputSelector).filter(function(input) {
              return input.files.length;
            });
          }
          createClass(DirectUploadsController2, [{
            key: "start",
            value: function start4(callback) {
              var _this = this;
              var controllers = this.createDirectUploadControllers();
              var startNextController = function startNextController2() {
                var controller = controllers.shift();
                if (controller) {
                  controller.start(function(error) {
                    if (error) {
                      callback(error);
                      _this.dispatch("end");
                    } else {
                      startNextController2();
                    }
                  });
                } else {
                  callback();
                  _this.dispatch("end");
                }
              };
              this.dispatch("start");
              startNextController();
            }
          }, {
            key: "createDirectUploadControllers",
            value: function createDirectUploadControllers() {
              var controllers = [];
              this.inputs.forEach(function(input) {
                toArray$1(input.files).forEach(function(file) {
                  var controller = new DirectUploadController(input, file);
                  controllers.push(controller);
                });
              });
              return controllers;
            }
          }, {
            key: "dispatch",
            value: function dispatch2(name) {
              var detail = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              return dispatchEvent2(this.form, "direct-uploads:" + name, {
                detail
              });
            }
          }]);
          return DirectUploadsController2;
        }();
        var processingAttribute = "data-direct-uploads-processing";
        var submitButtonsByForm = /* @__PURE__ */ new WeakMap();
        var started = false;
        function start3() {
          if (!started) {
            started = true;
            document.addEventListener("click", didClick, true);
            document.addEventListener("submit", didSubmitForm);
            document.addEventListener("ajax:before", didSubmitRemoteElement);
          }
        }
        function didClick(event) {
          var target = event.target;
          if ((target.tagName == "INPUT" || target.tagName == "BUTTON") && target.type == "submit" && target.form) {
            submitButtonsByForm.set(target.form, target);
          }
        }
        function didSubmitForm(event) {
          handleFormSubmissionEvent(event);
        }
        function didSubmitRemoteElement(event) {
          if (event.target.tagName == "FORM") {
            handleFormSubmissionEvent(event);
          }
        }
        function handleFormSubmissionEvent(event) {
          var form = event.target;
          if (form.hasAttribute(processingAttribute)) {
            event.preventDefault();
            return;
          }
          var controller = new DirectUploadsController(form);
          var inputs = controller.inputs;
          if (inputs.length) {
            event.preventDefault();
            form.setAttribute(processingAttribute, "");
            inputs.forEach(disable);
            controller.start(function(error) {
              form.removeAttribute(processingAttribute);
              if (error) {
                inputs.forEach(enable);
              } else {
                submitForm(form);
              }
            });
          }
        }
        function submitForm(form) {
          var button = submitButtonsByForm.get(form) || findElement(form, "input[type=submit], button[type=submit]");
          if (button) {
            var _button = button, disabled = _button.disabled;
            button.disabled = false;
            button.focus();
            button.click();
            button.disabled = disabled;
          } else {
            button = document.createElement("input");
            button.type = "submit";
            button.style.display = "none";
            form.appendChild(button);
            button.click();
            form.removeChild(button);
          }
          submitButtonsByForm.delete(form);
        }
        function disable(input) {
          input.disabled = true;
        }
        function enable(input) {
          input.disabled = false;
        }
        function autostart() {
          if (window.ActiveStorage) {
            start3();
          }
        }
        setTimeout(autostart, 1);
        exports2.start = start3;
        exports2.DirectUpload = DirectUpload;
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
      });
    }
  });

  // node_modules/bootstrap/js/dist/dom/event-handler.js
  var require_event_handler = __commonJS({
    "node_modules/bootstrap/js/dist/dom/event-handler.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.EventHandler = factory());
      })(exports, function() {
        "use strict";
        const getjQuery2 = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const namespaceRegex2 = /[^.]*(?=\..*)\.|.*/;
        const stripNameRegex2 = /\..*/;
        const stripUidRegex2 = /::\d+$/;
        const eventRegistry2 = {};
        let uidEvent2 = 1;
        const customEvents2 = {
          mouseenter: "mouseover",
          mouseleave: "mouseout"
        };
        const customEventsRegex2 = /^(mouseenter|mouseleave)/i;
        const nativeEvents2 = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
        function getUidEvent2(element, uid) {
          return uid && `${uid}::${uidEvent2++}` || element.uidEvent || uidEvent2++;
        }
        function getEvent2(element) {
          const uid = getUidEvent2(element);
          element.uidEvent = uid;
          eventRegistry2[uid] = eventRegistry2[uid] || {};
          return eventRegistry2[uid];
        }
        function bootstrapHandler2(element, fn) {
          return function handler(event) {
            event.delegateTarget = element;
            if (handler.oneOff) {
              EventHandler2.off(element, event.type, fn);
            }
            return fn.apply(element, [event]);
          };
        }
        function bootstrapDelegationHandler2(element, selector, fn) {
          return function handler(event) {
            const domElements = element.querySelectorAll(selector);
            for (let {
              target
            } = event; target && target !== this; target = target.parentNode) {
              for (let i = domElements.length; i--; ) {
                if (domElements[i] === target) {
                  event.delegateTarget = target;
                  if (handler.oneOff) {
                    EventHandler2.off(element, event.type, selector, fn);
                  }
                  return fn.apply(target, [event]);
                }
              }
            }
            return null;
          };
        }
        function findHandler2(events, handler, delegationSelector = null) {
          const uidEventList = Object.keys(events);
          for (let i = 0, len = uidEventList.length; i < len; i++) {
            const event = events[uidEventList[i]];
            if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
              return event;
            }
          }
          return null;
        }
        function normalizeParams2(originalTypeEvent, handler, delegationFn) {
          const delegation = typeof handler === "string";
          const originalHandler = delegation ? delegationFn : handler;
          let typeEvent = getTypeEvent2(originalTypeEvent);
          const isNative = nativeEvents2.has(typeEvent);
          if (!isNative) {
            typeEvent = originalTypeEvent;
          }
          return [delegation, originalHandler, typeEvent];
        }
        function addHandler2(element, originalTypeEvent, handler, delegationFn, oneOff) {
          if (typeof originalTypeEvent !== "string" || !element) {
            return;
          }
          if (!handler) {
            handler = delegationFn;
            delegationFn = null;
          }
          if (customEventsRegex2.test(originalTypeEvent)) {
            const wrapFn = (fn2) => {
              return function(event) {
                if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                  return fn2.call(this, event);
                }
              };
            };
            if (delegationFn) {
              delegationFn = wrapFn(delegationFn);
            } else {
              handler = wrapFn(handler);
            }
          }
          const [delegation, originalHandler, typeEvent] = normalizeParams2(originalTypeEvent, handler, delegationFn);
          const events = getEvent2(element);
          const handlers = events[typeEvent] || (events[typeEvent] = {});
          const previousFn = findHandler2(handlers, originalHandler, delegation ? handler : null);
          if (previousFn) {
            previousFn.oneOff = previousFn.oneOff && oneOff;
            return;
          }
          const uid = getUidEvent2(originalHandler, originalTypeEvent.replace(namespaceRegex2, ""));
          const fn = delegation ? bootstrapDelegationHandler2(element, handler, delegationFn) : bootstrapHandler2(element, handler);
          fn.delegationSelector = delegation ? handler : null;
          fn.originalHandler = originalHandler;
          fn.oneOff = oneOff;
          fn.uidEvent = uid;
          handlers[uid] = fn;
          element.addEventListener(typeEvent, fn, delegation);
        }
        function removeHandler2(element, events, typeEvent, handler, delegationSelector) {
          const fn = findHandler2(events[typeEvent], handler, delegationSelector);
          if (!fn) {
            return;
          }
          element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
          delete events[typeEvent][fn.uidEvent];
        }
        function removeNamespacedHandlers2(element, events, typeEvent, namespace) {
          const storeElementEvent = events[typeEvent] || {};
          Object.keys(storeElementEvent).forEach((handlerKey) => {
            if (handlerKey.includes(namespace)) {
              const event = storeElementEvent[handlerKey];
              removeHandler2(element, events, typeEvent, event.originalHandler, event.delegationSelector);
            }
          });
        }
        function getTypeEvent2(event) {
          event = event.replace(stripNameRegex2, "");
          return customEvents2[event] || event;
        }
        const EventHandler2 = {
          on(element, event, handler, delegationFn) {
            addHandler2(element, event, handler, delegationFn, false);
          },
          one(element, event, handler, delegationFn) {
            addHandler2(element, event, handler, delegationFn, true);
          },
          off(element, originalTypeEvent, handler, delegationFn) {
            if (typeof originalTypeEvent !== "string" || !element) {
              return;
            }
            const [delegation, originalHandler, typeEvent] = normalizeParams2(originalTypeEvent, handler, delegationFn);
            const inNamespace = typeEvent !== originalTypeEvent;
            const events = getEvent2(element);
            const isNamespace = originalTypeEvent.startsWith(".");
            if (typeof originalHandler !== "undefined") {
              if (!events || !events[typeEvent]) {
                return;
              }
              removeHandler2(element, events, typeEvent, originalHandler, delegation ? handler : null);
              return;
            }
            if (isNamespace) {
              Object.keys(events).forEach((elementEvent) => {
                removeNamespacedHandlers2(element, events, elementEvent, originalTypeEvent.slice(1));
              });
            }
            const storeElementEvent = events[typeEvent] || {};
            Object.keys(storeElementEvent).forEach((keyHandlers) => {
              const handlerKey = keyHandlers.replace(stripUidRegex2, "");
              if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
                const event = storeElementEvent[keyHandlers];
                removeHandler2(element, events, typeEvent, event.originalHandler, event.delegationSelector);
              }
            });
          },
          trigger(element, event, args) {
            if (typeof event !== "string" || !element) {
              return null;
            }
            const $ = getjQuery2();
            const typeEvent = getTypeEvent2(event);
            const inNamespace = event !== typeEvent;
            const isNative = nativeEvents2.has(typeEvent);
            let jQueryEvent;
            let bubbles = true;
            let nativeDispatch = true;
            let defaultPrevented = false;
            let evt = null;
            if (inNamespace && $) {
              jQueryEvent = $.Event(event, args);
              $(element).trigger(jQueryEvent);
              bubbles = !jQueryEvent.isPropagationStopped();
              nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
              defaultPrevented = jQueryEvent.isDefaultPrevented();
            }
            if (isNative) {
              evt = document.createEvent("HTMLEvents");
              evt.initEvent(typeEvent, bubbles, true);
            } else {
              evt = new CustomEvent(event, {
                bubbles,
                cancelable: true
              });
            }
            if (typeof args !== "undefined") {
              Object.keys(args).forEach((key) => {
                Object.defineProperty(evt, key, {
                  get() {
                    return args[key];
                  }
                });
              });
            }
            if (defaultPrevented) {
              evt.preventDefault();
            }
            if (nativeDispatch) {
              element.dispatchEvent(evt);
            }
            if (evt.defaultPrevented && typeof jQueryEvent !== "undefined") {
              jQueryEvent.preventDefault();
            }
            return evt;
          }
        };
        return EventHandler2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/dom/manipulator.js
  var require_manipulator = __commonJS({
    "node_modules/bootstrap/js/dist/dom/manipulator.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Manipulator = factory());
      })(exports, function() {
        "use strict";
        function normalizeData2(val) {
          if (val === "true") {
            return true;
          }
          if (val === "false") {
            return false;
          }
          if (val === Number(val).toString()) {
            return Number(val);
          }
          if (val === "" || val === "null") {
            return null;
          }
          return val;
        }
        function normalizeDataKey2(key) {
          return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
        }
        const Manipulator2 = {
          setDataAttribute(element, key, value) {
            element.setAttribute(`data-bs-${normalizeDataKey2(key)}`, value);
          },
          removeDataAttribute(element, key) {
            element.removeAttribute(`data-bs-${normalizeDataKey2(key)}`);
          },
          getDataAttributes(element) {
            if (!element) {
              return {};
            }
            const attributes = {};
            Object.keys(element.dataset).filter((key) => key.startsWith("bs")).forEach((key) => {
              let pureKey = key.replace(/^bs/, "");
              pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
              attributes[pureKey] = normalizeData2(element.dataset[key]);
            });
            return attributes;
          },
          getDataAttribute(element, key) {
            return normalizeData2(element.getAttribute(`data-bs-${normalizeDataKey2(key)}`));
          },
          offset(element) {
            const rect = element.getBoundingClientRect();
            return {
              top: rect.top + window.pageYOffset,
              left: rect.left + window.pageXOffset
            };
          },
          position(element) {
            return {
              top: element.offsetTop,
              left: element.offsetLeft
            };
          }
        };
        return Manipulator2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/dom/selector-engine.js
  var require_selector_engine = __commonJS({
    "node_modules/bootstrap/js/dist/dom/selector-engine.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.SelectorEngine = factory());
      })(exports, function() {
        "use strict";
        const isElement2 = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const isVisible2 = (element) => {
          if (!isElement2(element) || element.getClientRects().length === 0) {
            return false;
          }
          return getComputedStyle(element).getPropertyValue("visibility") === "visible";
        };
        const isDisabled2 = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const NODE_TEXT2 = 3;
        const SelectorEngine2 = {
          find(selector, element = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
          },
          findOne(selector, element = document.documentElement) {
            return Element.prototype.querySelector.call(element, selector);
          },
          children(element, selector) {
            return [].concat(...element.children).filter((child) => child.matches(selector));
          },
          parents(element, selector) {
            const parents = [];
            let ancestor = element.parentNode;
            while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT2) {
              if (ancestor.matches(selector)) {
                parents.push(ancestor);
              }
              ancestor = ancestor.parentNode;
            }
            return parents;
          },
          prev(element, selector) {
            let previous = element.previousElementSibling;
            while (previous) {
              if (previous.matches(selector)) {
                return [previous];
              }
              previous = previous.previousElementSibling;
            }
            return [];
          },
          next(element, selector) {
            let next = element.nextElementSibling;
            while (next) {
              if (next.matches(selector)) {
                return [next];
              }
              next = next.nextElementSibling;
            }
            return [];
          },
          focusableChildren(element) {
            const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(", ");
            return this.find(focusables, element).filter((el) => !isDisabled2(el) && isVisible2(el));
          }
        };
        return SelectorEngine2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/dom/data.js
  var require_data = __commonJS({
    "node_modules/bootstrap/js/dist/dom/data.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Data = factory());
      })(exports, function() {
        "use strict";
        const elementMap2 = /* @__PURE__ */ new Map();
        const data = {
          set(element, key, instance) {
            if (!elementMap2.has(element)) {
              elementMap2.set(element, /* @__PURE__ */ new Map());
            }
            const instanceMap = elementMap2.get(element);
            if (!instanceMap.has(key) && instanceMap.size !== 0) {
              console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
              return;
            }
            instanceMap.set(key, instance);
          },
          get(element, key) {
            if (elementMap2.has(element)) {
              return elementMap2.get(element).get(key) || null;
            }
            return null;
          },
          remove(element, key) {
            if (!elementMap2.has(element)) {
              return;
            }
            const instanceMap = elementMap2.get(element);
            instanceMap.delete(key);
            if (instanceMap.size === 0) {
              elementMap2.delete(element);
            }
          }
        };
        return data;
      });
    }
  });

  // node_modules/bootstrap/js/dist/base-component.js
  var require_base_component = __commonJS({
    "node_modules/bootstrap/js/dist/base-component.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_data(), require_event_handler()) : typeof define === "function" && define.amd ? define(["./dom/data", "./dom/event-handler"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Base = factory(global.Data, global.EventHandler));
      })(exports, function(Data2, EventHandler2) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const Data__default = /* @__PURE__ */ _interopDefaultLegacy(Data2);
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler2);
        const MILLISECONDS_MULTIPLIER2 = 1e3;
        const TRANSITION_END2 = "transitionend";
        const getTransitionDurationFromElement2 = (element) => {
          if (!element) {
            return 0;
          }
          let {
            transitionDuration,
            transitionDelay
          } = window.getComputedStyle(element);
          const floatTransitionDuration = Number.parseFloat(transitionDuration);
          const floatTransitionDelay = Number.parseFloat(transitionDelay);
          if (!floatTransitionDuration && !floatTransitionDelay) {
            return 0;
          }
          transitionDuration = transitionDuration.split(",")[0];
          transitionDelay = transitionDelay.split(",")[0];
          return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER2;
        };
        const triggerTransitionEnd2 = (element) => {
          element.dispatchEvent(new Event(TRANSITION_END2));
        };
        const isElement2 = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement2 = (obj) => {
          if (isElement2(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const execute2 = (callback) => {
          if (typeof callback === "function") {
            callback();
          }
        };
        const executeAfterTransition2 = (callback, transitionElement, waitForTransition = true) => {
          if (!waitForTransition) {
            execute2(callback);
            return;
          }
          const durationPadding = 5;
          const emulatedDuration = getTransitionDurationFromElement2(transitionElement) + durationPadding;
          let called = false;
          const handler = ({
            target
          }) => {
            if (target !== transitionElement) {
              return;
            }
            called = true;
            transitionElement.removeEventListener(TRANSITION_END2, handler);
            execute2(callback);
          };
          transitionElement.addEventListener(TRANSITION_END2, handler);
          setTimeout(() => {
            if (!called) {
              triggerTransitionEnd2(transitionElement);
            }
          }, emulatedDuration);
        };
        const VERSION2 = "5.1.3";
        class BaseComponent2 {
          constructor(element) {
            element = getElement2(element);
            if (!element) {
              return;
            }
            this._element = element;
            Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
          }
          dispose() {
            Data__default.default.remove(this._element, this.constructor.DATA_KEY);
            EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
            Object.getOwnPropertyNames(this).forEach((propertyName) => {
              this[propertyName] = null;
            });
          }
          _queueCallback(callback, element, isAnimated = true) {
            executeAfterTransition2(callback, element, isAnimated);
          }
          static getInstance(element) {
            return Data__default.default.get(getElement2(element), this.DATA_KEY);
          }
          static getOrCreateInstance(element, config = {}) {
            return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
          }
          static get VERSION() {
            return VERSION2;
          }
          static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!');
          }
          static get DATA_KEY() {
            return `bs.${this.NAME}`;
          }
          static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
          }
        }
        return BaseComponent2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/dropdown.js
  var require_dropdown = __commonJS({
    "node_modules/bootstrap/js/dist/dropdown.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_popper(), require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["@popperjs/core", "./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Dropdown = factory(global.Popper, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
      })(exports, function(Popper2, EventHandler2, Manipulator2, SelectorEngine2, BaseComponent2) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        function _interopNamespace(e) {
          if (e && e.__esModule)
            return e;
          const n = /* @__PURE__ */ Object.create(null);
          if (e) {
            for (const k in e) {
              if (k !== "default") {
                const d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                  enumerable: true,
                  get: () => e[k]
                });
              }
            }
          }
          n.default = e;
          return Object.freeze(n);
        }
        const Popper__namespace = /* @__PURE__ */ _interopNamespace(Popper2);
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler2);
        const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator2);
        const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine2);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent2);
        const toType2 = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getSelector2 = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getElementFromSelector2 = (element) => {
          const selector = getSelector2(element);
          return selector ? document.querySelector(selector) : null;
        };
        const isElement2 = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement2 = (obj) => {
          if (isElement2(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const typeCheckConfig2 = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement2(value) ? "element" : toType2(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const isVisible2 = (element) => {
          if (!isElement2(element) || element.getClientRects().length === 0) {
            return false;
          }
          return getComputedStyle(element).getPropertyValue("visibility") === "visible";
        };
        const isDisabled2 = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const noop2 = () => {
        };
        const getjQuery2 = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks2 = [];
        const onDOMContentLoaded2 = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks2.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks2.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks2.push(callback);
          } else {
            callback();
          }
        };
        const isRTL2 = () => document.documentElement.dir === "rtl";
        const defineJQueryPlugin2 = (plugin) => {
          onDOMContentLoaded2(() => {
            const $ = getjQuery2();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const getNextActiveElement2 = (list, activeElement, shouldGetNext, isCycleAllowed) => {
          let index = list.indexOf(activeElement);
          if (index === -1) {
            return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
          }
          const listLength = list.length;
          index += shouldGetNext ? 1 : -1;
          if (isCycleAllowed) {
            index = (index + listLength) % listLength;
          }
          return list[Math.max(0, Math.min(index, listLength - 1))];
        };
        const NAME2 = "dropdown";
        const DATA_KEY2 = "bs.dropdown";
        const EVENT_KEY2 = `.${DATA_KEY2}`;
        const DATA_API_KEY2 = ".data-api";
        const ESCAPE_KEY2 = "Escape";
        const SPACE_KEY2 = "Space";
        const TAB_KEY2 = "Tab";
        const ARROW_UP_KEY2 = "ArrowUp";
        const ARROW_DOWN_KEY2 = "ArrowDown";
        const RIGHT_MOUSE_BUTTON2 = 2;
        const REGEXP_KEYDOWN2 = new RegExp(`${ARROW_UP_KEY2}|${ARROW_DOWN_KEY2}|${ESCAPE_KEY2}`);
        const EVENT_HIDE2 = `hide${EVENT_KEY2}`;
        const EVENT_HIDDEN2 = `hidden${EVENT_KEY2}`;
        const EVENT_SHOW2 = `show${EVENT_KEY2}`;
        const EVENT_SHOWN2 = `shown${EVENT_KEY2}`;
        const EVENT_CLICK_DATA_API2 = `click${EVENT_KEY2}${DATA_API_KEY2}`;
        const EVENT_KEYDOWN_DATA_API2 = `keydown${EVENT_KEY2}${DATA_API_KEY2}`;
        const EVENT_KEYUP_DATA_API2 = `keyup${EVENT_KEY2}${DATA_API_KEY2}`;
        const CLASS_NAME_SHOW2 = "show";
        const CLASS_NAME_DROPUP2 = "dropup";
        const CLASS_NAME_DROPEND2 = "dropend";
        const CLASS_NAME_DROPSTART2 = "dropstart";
        const CLASS_NAME_NAVBAR2 = "navbar";
        const SELECTOR_DATA_TOGGLE2 = '[data-bs-toggle="dropdown"]';
        const SELECTOR_MENU2 = ".dropdown-menu";
        const SELECTOR_NAVBAR_NAV2 = ".navbar-nav";
        const SELECTOR_VISIBLE_ITEMS2 = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
        const PLACEMENT_TOP2 = isRTL2() ? "top-end" : "top-start";
        const PLACEMENT_TOPEND2 = isRTL2() ? "top-start" : "top-end";
        const PLACEMENT_BOTTOM2 = isRTL2() ? "bottom-end" : "bottom-start";
        const PLACEMENT_BOTTOMEND2 = isRTL2() ? "bottom-start" : "bottom-end";
        const PLACEMENT_RIGHT2 = isRTL2() ? "left-start" : "right-start";
        const PLACEMENT_LEFT2 = isRTL2() ? "right-start" : "left-start";
        const Default2 = {
          offset: [0, 2],
          boundary: "clippingParents",
          reference: "toggle",
          display: "dynamic",
          popperConfig: null,
          autoClose: true
        };
        const DefaultType2 = {
          offset: "(array|string|function)",
          boundary: "(string|element)",
          reference: "(string|element|object)",
          display: "string",
          popperConfig: "(null|object|function)",
          autoClose: "(boolean|string)"
        };
        class Dropdown2 extends BaseComponent__default.default {
          constructor(element, config) {
            super(element);
            this._popper = null;
            this._config = this._getConfig(config);
            this._menu = this._getMenuElement();
            this._inNavbar = this._detectNavbar();
          }
          static get Default() {
            return Default2;
          }
          static get DefaultType() {
            return DefaultType2;
          }
          static get NAME() {
            return NAME2;
          }
          toggle() {
            return this._isShown() ? this.hide() : this.show();
          }
          show() {
            if (isDisabled2(this._element) || this._isShown(this._menu)) {
              return;
            }
            const relatedTarget = {
              relatedTarget: this._element
            };
            const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW2, relatedTarget);
            if (showEvent.defaultPrevented) {
              return;
            }
            const parent = Dropdown2.getParentFromElement(this._element);
            if (this._inNavbar) {
              Manipulator__default.default.setDataAttribute(this._menu, "popper", "none");
            } else {
              this._createPopper(parent);
            }
            if ("ontouchstart" in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV2)) {
              [].concat(...document.body.children).forEach((elem) => EventHandler__default.default.on(elem, "mouseover", noop2));
            }
            this._element.focus();
            this._element.setAttribute("aria-expanded", true);
            this._menu.classList.add(CLASS_NAME_SHOW2);
            this._element.classList.add(CLASS_NAME_SHOW2);
            EventHandler__default.default.trigger(this._element, EVENT_SHOWN2, relatedTarget);
          }
          hide() {
            if (isDisabled2(this._element) || !this._isShown(this._menu)) {
              return;
            }
            const relatedTarget = {
              relatedTarget: this._element
            };
            this._completeHide(relatedTarget);
          }
          dispose() {
            if (this._popper) {
              this._popper.destroy();
            }
            super.dispose();
          }
          update() {
            this._inNavbar = this._detectNavbar();
            if (this._popper) {
              this._popper.update();
            }
          }
          _completeHide(relatedTarget) {
            const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE2, relatedTarget);
            if (hideEvent.defaultPrevented) {
              return;
            }
            if ("ontouchstart" in document.documentElement) {
              [].concat(...document.body.children).forEach((elem) => EventHandler__default.default.off(elem, "mouseover", noop2));
            }
            if (this._popper) {
              this._popper.destroy();
            }
            this._menu.classList.remove(CLASS_NAME_SHOW2);
            this._element.classList.remove(CLASS_NAME_SHOW2);
            this._element.setAttribute("aria-expanded", "false");
            Manipulator__default.default.removeDataAttribute(this._menu, "popper");
            EventHandler__default.default.trigger(this._element, EVENT_HIDDEN2, relatedTarget);
          }
          _getConfig(config) {
            config = {
              ...this.constructor.Default,
              ...Manipulator__default.default.getDataAttributes(this._element),
              ...config
            };
            typeCheckConfig2(NAME2, config, this.constructor.DefaultType);
            if (typeof config.reference === "object" && !isElement2(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
              throw new TypeError(`${NAME2.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            }
            return config;
          }
          _createPopper(parent) {
            if (typeof Popper__namespace === "undefined") {
              throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            }
            let referenceElement = this._element;
            if (this._config.reference === "parent") {
              referenceElement = parent;
            } else if (isElement2(this._config.reference)) {
              referenceElement = getElement2(this._config.reference);
            } else if (typeof this._config.reference === "object") {
              referenceElement = this._config.reference;
            }
            const popperConfig = this._getPopperConfig();
            const isDisplayStatic = popperConfig.modifiers.find((modifier) => modifier.name === "applyStyles" && modifier.enabled === false);
            this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
            if (isDisplayStatic) {
              Manipulator__default.default.setDataAttribute(this._menu, "popper", "static");
            }
          }
          _isShown(element = this._element) {
            return element.classList.contains(CLASS_NAME_SHOW2);
          }
          _getMenuElement() {
            return SelectorEngine__default.default.next(this._element, SELECTOR_MENU2)[0];
          }
          _getPlacement() {
            const parentDropdown = this._element.parentNode;
            if (parentDropdown.classList.contains(CLASS_NAME_DROPEND2)) {
              return PLACEMENT_RIGHT2;
            }
            if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART2)) {
              return PLACEMENT_LEFT2;
            }
            const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
            if (parentDropdown.classList.contains(CLASS_NAME_DROPUP2)) {
              return isEnd ? PLACEMENT_TOPEND2 : PLACEMENT_TOP2;
            }
            return isEnd ? PLACEMENT_BOTTOMEND2 : PLACEMENT_BOTTOM2;
          }
          _detectNavbar() {
            return this._element.closest(`.${CLASS_NAME_NAVBAR2}`) !== null;
          }
          _getOffset() {
            const {
              offset
            } = this._config;
            if (typeof offset === "string") {
              return offset.split(",").map((val) => Number.parseInt(val, 10));
            }
            if (typeof offset === "function") {
              return (popperData) => offset(popperData, this._element);
            }
            return offset;
          }
          _getPopperConfig() {
            const defaultBsPopperConfig = {
              placement: this._getPlacement(),
              modifiers: [{
                name: "preventOverflow",
                options: {
                  boundary: this._config.boundary
                }
              }, {
                name: "offset",
                options: {
                  offset: this._getOffset()
                }
              }]
            };
            if (this._config.display === "static") {
              defaultBsPopperConfig.modifiers = [{
                name: "applyStyles",
                enabled: false
              }];
            }
            return {
              ...defaultBsPopperConfig,
              ...typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig
            };
          }
          _selectMenuItem({
            key,
            target
          }) {
            const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS2, this._menu).filter(isVisible2);
            if (!items.length) {
              return;
            }
            getNextActiveElement2(items, target, key === ARROW_DOWN_KEY2, !items.includes(target)).focus();
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Dropdown2.getOrCreateInstance(this, config);
              if (typeof config !== "string") {
                return;
              }
              if (typeof data[config] === "undefined") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config]();
            });
          }
          static clearMenus(event) {
            if (event && (event.button === RIGHT_MOUSE_BUTTON2 || event.type === "keyup" && event.key !== TAB_KEY2)) {
              return;
            }
            const toggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE2);
            for (let i = 0, len = toggles.length; i < len; i++) {
              const context = Dropdown2.getInstance(toggles[i]);
              if (!context || context._config.autoClose === false) {
                continue;
              }
              if (!context._isShown()) {
                continue;
              }
              const relatedTarget = {
                relatedTarget: context._element
              };
              if (event) {
                const composedPath = event.composedPath();
                const isMenuTarget = composedPath.includes(context._menu);
                if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
                  continue;
                }
                if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY2 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
                  continue;
                }
                if (event.type === "click") {
                  relatedTarget.clickEvent = event;
                }
              }
              context._completeHide(relatedTarget);
            }
          }
          static getParentFromElement(element) {
            return getElementFromSelector2(element) || element.parentNode;
          }
          static dataApiKeydownHandler(event) {
            if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY2 || event.key !== ESCAPE_KEY2 && (event.key !== ARROW_DOWN_KEY2 && event.key !== ARROW_UP_KEY2 || event.target.closest(SELECTOR_MENU2)) : !REGEXP_KEYDOWN2.test(event.key)) {
              return;
            }
            const isActive = this.classList.contains(CLASS_NAME_SHOW2);
            if (!isActive && event.key === ESCAPE_KEY2) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (isDisabled2(this)) {
              return;
            }
            const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE2) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE2)[0];
            const instance = Dropdown2.getOrCreateInstance(getToggleButton);
            if (event.key === ESCAPE_KEY2) {
              instance.hide();
              return;
            }
            if (event.key === ARROW_UP_KEY2 || event.key === ARROW_DOWN_KEY2) {
              if (!isActive) {
                instance.show();
              }
              instance._selectMenuItem(event);
              return;
            }
            if (!isActive || event.key === SPACE_KEY2) {
              Dropdown2.clearMenus();
            }
          }
        }
        EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API2, SELECTOR_DATA_TOGGLE2, Dropdown2.dataApiKeydownHandler);
        EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API2, SELECTOR_MENU2, Dropdown2.dataApiKeydownHandler);
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API2, Dropdown2.clearMenus);
        EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API2, Dropdown2.clearMenus);
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API2, SELECTOR_DATA_TOGGLE2, function(event) {
          event.preventDefault();
          Dropdown2.getOrCreateInstance(this).toggle();
        });
        defineJQueryPlugin2(Dropdown2);
        return Dropdown2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/collapse.js
  var require_collapse = __commonJS({
    "node_modules/bootstrap/js/dist/collapse.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_data(), require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/data", "./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Collapse = factory(global.Data, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
      })(exports, function(Data2, EventHandler2, Manipulator2, SelectorEngine2, BaseComponent2) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const Data__default = /* @__PURE__ */ _interopDefaultLegacy(Data2);
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler2);
        const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator2);
        const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine2);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent2);
        const toType2 = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getSelector2 = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getSelectorFromElement2 = (element) => {
          const selector = getSelector2(element);
          if (selector) {
            return document.querySelector(selector) ? selector : null;
          }
          return null;
        };
        const getElementFromSelector2 = (element) => {
          const selector = getSelector2(element);
          return selector ? document.querySelector(selector) : null;
        };
        const isElement2 = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement2 = (obj) => {
          if (isElement2(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const typeCheckConfig2 = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement2(value) ? "element" : toType2(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const reflow2 = (element) => {
          element.offsetHeight;
        };
        const getjQuery2 = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks2 = [];
        const onDOMContentLoaded2 = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks2.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks2.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks2.push(callback);
          } else {
            callback();
          }
        };
        const defineJQueryPlugin2 = (plugin) => {
          onDOMContentLoaded2(() => {
            const $ = getjQuery2();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const NAME2 = "collapse";
        const DATA_KEY2 = "bs.collapse";
        const EVENT_KEY2 = `.${DATA_KEY2}`;
        const DATA_API_KEY2 = ".data-api";
        const Default2 = {
          toggle: true,
          parent: null
        };
        const DefaultType2 = {
          toggle: "boolean",
          parent: "(null|element)"
        };
        const EVENT_SHOW2 = `show${EVENT_KEY2}`;
        const EVENT_SHOWN2 = `shown${EVENT_KEY2}`;
        const EVENT_HIDE2 = `hide${EVENT_KEY2}`;
        const EVENT_HIDDEN2 = `hidden${EVENT_KEY2}`;
        const EVENT_CLICK_DATA_API2 = `click${EVENT_KEY2}${DATA_API_KEY2}`;
        const CLASS_NAME_SHOW2 = "show";
        const CLASS_NAME_COLLAPSE2 = "collapse";
        const CLASS_NAME_COLLAPSING2 = "collapsing";
        const CLASS_NAME_COLLAPSED2 = "collapsed";
        const CLASS_NAME_DEEPER_CHILDREN2 = `:scope .${CLASS_NAME_COLLAPSE2} .${CLASS_NAME_COLLAPSE2}`;
        const CLASS_NAME_HORIZONTAL2 = "collapse-horizontal";
        const WIDTH2 = "width";
        const HEIGHT2 = "height";
        const SELECTOR_ACTIVES2 = ".collapse.show, .collapse.collapsing";
        const SELECTOR_DATA_TOGGLE2 = '[data-bs-toggle="collapse"]';
        class Collapse2 extends BaseComponent__default.default {
          constructor(element, config) {
            super(element);
            this._isTransitioning = false;
            this._config = this._getConfig(config);
            this._triggerArray = [];
            const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE2);
            for (let i = 0, len = toggleList.length; i < len; i++) {
              const elem = toggleList[i];
              const selector = getSelectorFromElement2(elem);
              const filterElement = SelectorEngine__default.default.find(selector).filter((foundElem) => foundElem === this._element);
              if (selector !== null && filterElement.length) {
                this._selector = selector;
                this._triggerArray.push(elem);
              }
            }
            this._initializeChildren();
            if (!this._config.parent) {
              this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
            }
            if (this._config.toggle) {
              this.toggle();
            }
          }
          static get Default() {
            return Default2;
          }
          static get NAME() {
            return NAME2;
          }
          toggle() {
            if (this._isShown()) {
              this.hide();
            } else {
              this.show();
            }
          }
          show() {
            if (this._isTransitioning || this._isShown()) {
              return;
            }
            let actives = [];
            let activesData;
            if (this._config.parent) {
              const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN2, this._config.parent);
              actives = SelectorEngine__default.default.find(SELECTOR_ACTIVES2, this._config.parent).filter((elem) => !children.includes(elem));
            }
            const container = SelectorEngine__default.default.findOne(this._selector);
            if (actives.length) {
              const tempActiveData = actives.find((elem) => container !== elem);
              activesData = tempActiveData ? Collapse2.getInstance(tempActiveData) : null;
              if (activesData && activesData._isTransitioning) {
                return;
              }
            }
            const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW2);
            if (startEvent.defaultPrevented) {
              return;
            }
            actives.forEach((elemActive) => {
              if (container !== elemActive) {
                Collapse2.getOrCreateInstance(elemActive, {
                  toggle: false
                }).hide();
              }
              if (!activesData) {
                Data__default.default.set(elemActive, DATA_KEY2, null);
              }
            });
            const dimension = this._getDimension();
            this._element.classList.remove(CLASS_NAME_COLLAPSE2);
            this._element.classList.add(CLASS_NAME_COLLAPSING2);
            this._element.style[dimension] = 0;
            this._addAriaAndCollapsedClass(this._triggerArray, true);
            this._isTransitioning = true;
            const complete = () => {
              this._isTransitioning = false;
              this._element.classList.remove(CLASS_NAME_COLLAPSING2);
              this._element.classList.add(CLASS_NAME_COLLAPSE2, CLASS_NAME_SHOW2);
              this._element.style[dimension] = "";
              EventHandler__default.default.trigger(this._element, EVENT_SHOWN2);
            };
            const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            const scrollSize = `scroll${capitalizedDimension}`;
            this._queueCallback(complete, this._element, true);
            this._element.style[dimension] = `${this._element[scrollSize]}px`;
          }
          hide() {
            if (this._isTransitioning || !this._isShown()) {
              return;
            }
            const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE2);
            if (startEvent.defaultPrevented) {
              return;
            }
            const dimension = this._getDimension();
            this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
            reflow2(this._element);
            this._element.classList.add(CLASS_NAME_COLLAPSING2);
            this._element.classList.remove(CLASS_NAME_COLLAPSE2, CLASS_NAME_SHOW2);
            const triggerArrayLength = this._triggerArray.length;
            for (let i = 0; i < triggerArrayLength; i++) {
              const trigger = this._triggerArray[i];
              const elem = getElementFromSelector2(trigger);
              if (elem && !this._isShown(elem)) {
                this._addAriaAndCollapsedClass([trigger], false);
              }
            }
            this._isTransitioning = true;
            const complete = () => {
              this._isTransitioning = false;
              this._element.classList.remove(CLASS_NAME_COLLAPSING2);
              this._element.classList.add(CLASS_NAME_COLLAPSE2);
              EventHandler__default.default.trigger(this._element, EVENT_HIDDEN2);
            };
            this._element.style[dimension] = "";
            this._queueCallback(complete, this._element, true);
          }
          _isShown(element = this._element) {
            return element.classList.contains(CLASS_NAME_SHOW2);
          }
          _getConfig(config) {
            config = {
              ...Default2,
              ...Manipulator__default.default.getDataAttributes(this._element),
              ...config
            };
            config.toggle = Boolean(config.toggle);
            config.parent = getElement2(config.parent);
            typeCheckConfig2(NAME2, config, DefaultType2);
            return config;
          }
          _getDimension() {
            return this._element.classList.contains(CLASS_NAME_HORIZONTAL2) ? WIDTH2 : HEIGHT2;
          }
          _initializeChildren() {
            if (!this._config.parent) {
              return;
            }
            const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN2, this._config.parent);
            SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE2, this._config.parent).filter((elem) => !children.includes(elem)).forEach((element) => {
              const selected = getElementFromSelector2(element);
              if (selected) {
                this._addAriaAndCollapsedClass([element], this._isShown(selected));
              }
            });
          }
          _addAriaAndCollapsedClass(triggerArray, isOpen) {
            if (!triggerArray.length) {
              return;
            }
            triggerArray.forEach((elem) => {
              if (isOpen) {
                elem.classList.remove(CLASS_NAME_COLLAPSED2);
              } else {
                elem.classList.add(CLASS_NAME_COLLAPSED2);
              }
              elem.setAttribute("aria-expanded", isOpen);
            });
          }
          static jQueryInterface(config) {
            return this.each(function() {
              const _config = {};
              if (typeof config === "string" && /show|hide/.test(config)) {
                _config.toggle = false;
              }
              const data = Collapse2.getOrCreateInstance(this, _config);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config]();
              }
            });
          }
        }
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API2, SELECTOR_DATA_TOGGLE2, function(event) {
          if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
            event.preventDefault();
          }
          const selector = getSelectorFromElement2(this);
          const selectorElements = SelectorEngine__default.default.find(selector);
          selectorElements.forEach((element) => {
            Collapse2.getOrCreateInstance(element, {
              toggle: false
            }).toggle();
          });
        });
        defineJQueryPlugin2(Collapse2);
        return Collapse2;
      });
    }
  });

  // node_modules/tom-select/dist/js/tom-select.popular.js
  var require_tom_select_popular = __commonJS({
    "node_modules/tom-select/dist/js/tom-select.popular.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.TomSelect = factory());
      })(exports, function() {
        "use strict";
        function forEvents(events, callback) {
          events.split(/\s+/).forEach((event) => {
            callback(event);
          });
        }
        class MicroEvent {
          constructor() {
            this._events = void 0;
            this._events = {};
          }
          on(events, fct) {
            forEvents(events, (event) => {
              this._events[event] = this._events[event] || [];
              this._events[event].push(fct);
            });
          }
          off(events, fct) {
            var n = arguments.length;
            if (n === 0) {
              this._events = {};
              return;
            }
            forEvents(events, (event) => {
              if (n === 1)
                return delete this._events[event];
              if (event in this._events === false)
                return;
              this._events[event].splice(this._events[event].indexOf(fct), 1);
            });
          }
          trigger(events, ...args) {
            var self2 = this;
            forEvents(events, (event) => {
              if (event in self2._events === false)
                return;
              for (let fct of self2._events[event]) {
                fct.apply(self2, args);
              }
            });
          }
        }
        function MicroPlugin(Interface) {
          Interface.plugins = {};
          return class extends Interface {
            constructor(...args) {
              super(...args);
              this.plugins = {
                names: [],
                settings: {},
                requested: {},
                loaded: {}
              };
            }
            static define(name, fn) {
              Interface.plugins[name] = {
                "name": name,
                "fn": fn
              };
            }
            initializePlugins(plugins) {
              var key, name;
              const self2 = this;
              const queue = [];
              if (Array.isArray(plugins)) {
                plugins.forEach((plugin) => {
                  if (typeof plugin === "string") {
                    queue.push(plugin);
                  } else {
                    self2.plugins.settings[plugin.name] = plugin.options;
                    queue.push(plugin.name);
                  }
                });
              } else if (plugins) {
                for (key in plugins) {
                  if (plugins.hasOwnProperty(key)) {
                    self2.plugins.settings[key] = plugins[key];
                    queue.push(key);
                  }
                }
              }
              while (name = queue.shift()) {
                self2.require(name);
              }
            }
            loadPlugin(name) {
              var self2 = this;
              var plugins = self2.plugins;
              var plugin = Interface.plugins[name];
              if (!Interface.plugins.hasOwnProperty(name)) {
                throw new Error('Unable to find "' + name + '" plugin');
              }
              plugins.requested[name] = true;
              plugins.loaded[name] = plugin.fn.apply(self2, [self2.plugins.settings[name] || {}]);
              plugins.names.push(name);
            }
            require(name) {
              var self2 = this;
              var plugins = self2.plugins;
              if (!self2.plugins.loaded.hasOwnProperty(name)) {
                if (plugins.requested[name]) {
                  throw new Error('Plugin has circular dependency ("' + name + '")');
                }
                self2.loadPlugin(name);
              }
              return plugins.loaded[name];
            }
          };
        }
        var latin_pat;
        const accent_pat = "[\u0300-\u036F\xB7\u02BE]";
        const accent_reg = new RegExp(accent_pat, "gu");
        var diacritic_patterns;
        const latin_convert = {
          "\xE6": "ae",
          "\u2C65": "a",
          "\xF8": "o"
        };
        const convert_pat = new RegExp(Object.keys(latin_convert).join("|"), "gu");
        const code_points = [[0, 65535]];
        const asciifold = (str) => {
          return str.normalize("NFKD").replace(accent_reg, "").toLowerCase().replace(convert_pat, function(foreignletter) {
            return latin_convert[foreignletter];
          });
        };
        const arrayToPattern = (chars, glue = "|") => {
          if (chars.length == 1) {
            return chars[0];
          }
          var longest = 1;
          chars.forEach((a) => {
            longest = Math.max(longest, a.length);
          });
          if (longest == 1) {
            return "[" + chars.join("") + "]";
          }
          return "(?:" + chars.join(glue) + ")";
        };
        const escapeToPattern = (chars) => {
          const escaped = chars.map((diacritic) => escape_regex(diacritic));
          return arrayToPattern(escaped);
        };
        const allSubstrings = (input) => {
          if (input.length === 1)
            return [[input]];
          var result = [];
          allSubstrings(input.substring(1)).forEach(function(subresult) {
            var tmp = subresult.slice(0);
            tmp[0] = input.charAt(0) + tmp[0];
            result.push(tmp);
            tmp = subresult.slice(0);
            tmp.unshift(input.charAt(0));
            result.push(tmp);
          });
          return result;
        };
        const generateDiacritics = (code_points2) => {
          var diacritics = {};
          code_points2.forEach((code_range) => {
            for (let i = code_range[0]; i <= code_range[1]; i++) {
              let diacritic = String.fromCharCode(i);
              let latin = asciifold(diacritic);
              if (latin == diacritic.toLowerCase()) {
                continue;
              }
              if (latin.length > 3) {
                continue;
              }
              if (!(latin in diacritics)) {
                diacritics[latin] = [latin];
              }
              var patt = new RegExp(escapeToPattern(diacritics[latin]), "iu");
              if (diacritic.match(patt)) {
                continue;
              }
              diacritics[latin].push(diacritic);
            }
          });
          let latin_chars = Object.keys(diacritics);
          for (let i = 0; i < latin_chars.length; i++) {
            const latin = latin_chars[i];
            if (diacritics[latin].length < 2) {
              delete diacritics[latin];
            }
          }
          latin_chars = Object.keys(diacritics).sort((a, b) => b.length - a.length);
          latin_pat = new RegExp("(" + escapeToPattern(latin_chars) + accent_pat + "*)", "gu");
          var diacritic_patterns2 = {};
          latin_chars.sort((a, b) => a.length - b.length).forEach((latin) => {
            var substrings = allSubstrings(latin);
            var pattern = substrings.map((sub_pat) => {
              sub_pat = sub_pat.map((l) => {
                if (diacritics.hasOwnProperty(l)) {
                  return escapeToPattern(diacritics[l]);
                }
                return l;
              });
              return arrayToPattern(sub_pat, "");
            });
            diacritic_patterns2[latin] = arrayToPattern(pattern);
          });
          return diacritic_patterns2;
        };
        const diacriticRegexPoints = (regex) => {
          if (diacritic_patterns === void 0) {
            diacritic_patterns = generateDiacritics(code_points);
          }
          const decomposed = regex.normalize("NFKD").toLowerCase();
          return decomposed.split(latin_pat).map((part) => {
            const no_accent = asciifold(part);
            if (no_accent == "") {
              return "";
            }
            if (diacritic_patterns.hasOwnProperty(no_accent)) {
              return diacritic_patterns[no_accent];
            }
            return part;
          }).join("");
        };
        const getAttr = (obj, name) => {
          if (!obj)
            return;
          return obj[name];
        };
        const getAttrNesting = (obj, name) => {
          if (!obj)
            return;
          var part, names = name.split(".");
          while ((part = names.shift()) && (obj = obj[part]))
            ;
          return obj;
        };
        const scoreValue = (value, token, weight) => {
          var score, pos;
          if (!value)
            return 0;
          value = value + "";
          pos = value.search(token.regex);
          if (pos === -1)
            return 0;
          score = token.string.length / value.length;
          if (pos === 0)
            score += 0.5;
          return score * weight;
        };
        const escape_regex = (str) => {
          return (str + "").replace(/([\$\(-\+\.\?\[-\^\{-\}])/g, "\\$1");
        };
        const propToArray = (obj, key) => {
          var value = obj[key];
          if (typeof value == "function")
            return value;
          if (value && !Array.isArray(value)) {
            obj[key] = [value];
          }
        };
        const iterate = (object, callback) => {
          if (Array.isArray(object)) {
            object.forEach(callback);
          } else {
            for (var key in object) {
              if (object.hasOwnProperty(key)) {
                callback(object[key], key);
              }
            }
          }
        };
        const cmp = (a, b) => {
          if (typeof a === "number" && typeof b === "number") {
            return a > b ? 1 : a < b ? -1 : 0;
          }
          a = asciifold(a + "").toLowerCase();
          b = asciifold(b + "").toLowerCase();
          if (a > b)
            return 1;
          if (b > a)
            return -1;
          return 0;
        };
        class Sifter {
          constructor(items, settings) {
            this.items = void 0;
            this.settings = void 0;
            this.items = items;
            this.settings = settings || {
              diacritics: true
            };
          }
          tokenize(query, respect_word_boundaries, weights) {
            if (!query || !query.length)
              return [];
            const tokens = [];
            const words = query.split(/\s+/);
            var field_regex;
            if (weights) {
              field_regex = new RegExp("^(" + Object.keys(weights).map(escape_regex).join("|") + "):(.*)$");
            }
            words.forEach((word) => {
              let field_match;
              let field = null;
              let regex = null;
              if (field_regex && (field_match = word.match(field_regex))) {
                field = field_match[1];
                word = field_match[2];
              }
              if (word.length > 0) {
                if (this.settings.diacritics) {
                  regex = diacriticRegexPoints(word);
                } else {
                  regex = escape_regex(word);
                }
                if (respect_word_boundaries)
                  regex = "\\b" + regex;
              }
              tokens.push({
                string: word,
                regex: regex ? new RegExp(regex, "iu") : null,
                field
              });
            });
            return tokens;
          }
          getScoreFunction(query, options) {
            var search = this.prepareSearch(query, options);
            return this._getScoreFunction(search);
          }
          _getScoreFunction(search) {
            const tokens = search.tokens, token_count = tokens.length;
            if (!token_count) {
              return function() {
                return 0;
              };
            }
            const fields = search.options.fields, weights = search.weights, field_count = fields.length, getAttrFn = search.getAttrFn;
            if (!field_count) {
              return function() {
                return 1;
              };
            }
            const scoreObject = function() {
              if (field_count === 1) {
                return function(token, data) {
                  const field = fields[0].field;
                  return scoreValue(getAttrFn(data, field), token, weights[field]);
                };
              }
              return function(token, data) {
                var sum = 0;
                if (token.field) {
                  const value = getAttrFn(data, token.field);
                  if (!token.regex && value) {
                    sum += 1 / field_count;
                  } else {
                    sum += scoreValue(value, token, 1);
                  }
                } else {
                  iterate(weights, (weight, field) => {
                    sum += scoreValue(getAttrFn(data, field), token, weight);
                  });
                }
                return sum / field_count;
              };
            }();
            if (token_count === 1) {
              return function(data) {
                return scoreObject(tokens[0], data);
              };
            }
            if (search.options.conjunction === "and") {
              return function(data) {
                var i = 0, score, sum = 0;
                for (; i < token_count; i++) {
                  score = scoreObject(tokens[i], data);
                  if (score <= 0)
                    return 0;
                  sum += score;
                }
                return sum / token_count;
              };
            } else {
              return function(data) {
                var sum = 0;
                iterate(tokens, (token) => {
                  sum += scoreObject(token, data);
                });
                return sum / token_count;
              };
            }
          }
          getSortFunction(query, options) {
            var search = this.prepareSearch(query, options);
            return this._getSortFunction(search);
          }
          _getSortFunction(search) {
            var i, n, implicit_score;
            const self2 = this, options = search.options, sort = !search.query && options.sort_empty ? options.sort_empty : options.sort, sort_flds = [], multipliers = [];
            if (typeof sort == "function") {
              return sort.bind(this);
            }
            const get_field = function get_field2(name, result) {
              if (name === "$score")
                return result.score;
              return search.getAttrFn(self2.items[result.id], name);
            };
            if (sort) {
              for (i = 0, n = sort.length; i < n; i++) {
                if (search.query || sort[i].field !== "$score") {
                  sort_flds.push(sort[i]);
                }
              }
            }
            if (search.query) {
              implicit_score = true;
              for (i = 0, n = sort_flds.length; i < n; i++) {
                if (sort_flds[i].field === "$score") {
                  implicit_score = false;
                  break;
                }
              }
              if (implicit_score) {
                sort_flds.unshift({
                  field: "$score",
                  direction: "desc"
                });
              }
            } else {
              for (i = 0, n = sort_flds.length; i < n; i++) {
                if (sort_flds[i].field === "$score") {
                  sort_flds.splice(i, 1);
                  break;
                }
              }
            }
            for (i = 0, n = sort_flds.length; i < n; i++) {
              multipliers.push(sort_flds[i].direction === "desc" ? -1 : 1);
            }
            const sort_flds_count = sort_flds.length;
            if (!sort_flds_count) {
              return null;
            } else if (sort_flds_count === 1) {
              const sort_fld = sort_flds[0].field;
              const multiplier = multipliers[0];
              return function(a, b) {
                return multiplier * cmp(get_field(sort_fld, a), get_field(sort_fld, b));
              };
            } else {
              return function(a, b) {
                var i2, result, field;
                for (i2 = 0; i2 < sort_flds_count; i2++) {
                  field = sort_flds[i2].field;
                  result = multipliers[i2] * cmp(get_field(field, a), get_field(field, b));
                  if (result)
                    return result;
                }
                return 0;
              };
            }
          }
          prepareSearch(query, optsUser) {
            const weights = {};
            var options = Object.assign({}, optsUser);
            propToArray(options, "sort");
            propToArray(options, "sort_empty");
            if (options.fields) {
              propToArray(options, "fields");
              const fields = [];
              options.fields.forEach((field) => {
                if (typeof field == "string") {
                  field = {
                    field,
                    weight: 1
                  };
                }
                fields.push(field);
                weights[field.field] = "weight" in field ? field.weight : 1;
              });
              options.fields = fields;
            }
            return {
              options,
              query: query.toLowerCase().trim(),
              tokens: this.tokenize(query, options.respect_word_boundaries, weights),
              total: 0,
              items: [],
              weights,
              getAttrFn: options.nesting ? getAttrNesting : getAttr
            };
          }
          search(query, options) {
            var self2 = this, score, search;
            search = this.prepareSearch(query, options);
            options = search.options;
            query = search.query;
            const fn_score = options.score || self2._getScoreFunction(search);
            if (query.length) {
              iterate(self2.items, (item, id) => {
                score = fn_score(item);
                if (options.filter === false || score > 0) {
                  search.items.push({
                    "score": score,
                    "id": id
                  });
                }
              });
            } else {
              iterate(self2.items, (_, id) => {
                search.items.push({
                  "score": 1,
                  "id": id
                });
              });
            }
            const fn_sort = self2._getSortFunction(search);
            if (fn_sort)
              search.items.sort(fn_sort);
            search.total = search.items.length;
            if (typeof options.limit === "number") {
              search.items = search.items.slice(0, options.limit);
            }
            return search;
          }
        }
        const getDom = (query) => {
          if (query.jquery) {
            return query[0];
          }
          if (query instanceof HTMLElement) {
            return query;
          }
          if (isHtmlString(query)) {
            let div = document.createElement("div");
            div.innerHTML = query.trim();
            return div.firstChild;
          }
          return document.querySelector(query);
        };
        const isHtmlString = (arg) => {
          if (typeof arg === "string" && arg.indexOf("<") > -1) {
            return true;
          }
          return false;
        };
        const escapeQuery = (query) => {
          return query.replace(/['"\\]/g, "\\$&");
        };
        const triggerEvent = (dom_el, event_name) => {
          var event = document.createEvent("HTMLEvents");
          event.initEvent(event_name, true, false);
          dom_el.dispatchEvent(event);
        };
        const applyCSS = (dom_el, css) => {
          Object.assign(dom_el.style, css);
        };
        const addClasses = (elmts, ...classes) => {
          var norm_classes = classesArray(classes);
          elmts = castAsArray(elmts);
          elmts.map((el) => {
            norm_classes.map((cls) => {
              el.classList.add(cls);
            });
          });
        };
        const removeClasses = (elmts, ...classes) => {
          var norm_classes = classesArray(classes);
          elmts = castAsArray(elmts);
          elmts.map((el) => {
            norm_classes.map((cls) => {
              el.classList.remove(cls);
            });
          });
        };
        const classesArray = (args) => {
          var classes = [];
          iterate(args, (_classes) => {
            if (typeof _classes === "string") {
              _classes = _classes.trim().split(/[\11\12\14\15\40]/);
            }
            if (Array.isArray(_classes)) {
              classes = classes.concat(_classes);
            }
          });
          return classes.filter(Boolean);
        };
        const castAsArray = (arg) => {
          if (!Array.isArray(arg)) {
            arg = [arg];
          }
          return arg;
        };
        const parentMatch = (target, selector, wrapper) => {
          if (wrapper && !wrapper.contains(target)) {
            return;
          }
          while (target && target.matches) {
            if (target.matches(selector)) {
              return target;
            }
            target = target.parentNode;
          }
        };
        const getTail = (list, direction = 0) => {
          if (direction > 0) {
            return list[list.length - 1];
          }
          return list[0];
        };
        const isEmptyObject = (obj) => {
          return Object.keys(obj).length === 0;
        };
        const nodeIndex = (el, amongst) => {
          if (!el)
            return -1;
          amongst = amongst || el.nodeName;
          var i = 0;
          while (el = el.previousElementSibling) {
            if (el.matches(amongst)) {
              i++;
            }
          }
          return i;
        };
        const setAttr = (el, attrs) => {
          iterate(attrs, (val, attr) => {
            if (val == null) {
              el.removeAttribute(attr);
            } else {
              el.setAttribute(attr, "" + val);
            }
          });
        };
        const replaceNode = (existing, replacement) => {
          if (existing.parentNode)
            existing.parentNode.replaceChild(replacement, existing);
        };
        const highlight = (element, regex) => {
          if (regex === null)
            return;
          if (typeof regex === "string") {
            if (!regex.length)
              return;
            regex = new RegExp(regex, "i");
          }
          const highlightText = (node) => {
            var match = node.data.match(regex);
            if (match && node.data.length > 0) {
              var spannode = document.createElement("span");
              spannode.className = "highlight";
              var middlebit = node.splitText(match.index);
              middlebit.splitText(match[0].length);
              var middleclone = middlebit.cloneNode(true);
              spannode.appendChild(middleclone);
              replaceNode(middlebit, spannode);
              return 1;
            }
            return 0;
          };
          const highlightChildren = (node) => {
            if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && (node.className !== "highlight" || node.tagName !== "SPAN")) {
              for (var i = 0; i < node.childNodes.length; ++i) {
                i += highlightRecursive(node.childNodes[i]);
              }
            }
          };
          const highlightRecursive = (node) => {
            if (node.nodeType === 3) {
              return highlightText(node);
            }
            highlightChildren(node);
            return 0;
          };
          highlightRecursive(element);
        };
        const removeHighlight = (el) => {
          var elements = el.querySelectorAll("span.highlight");
          Array.prototype.forEach.call(elements, function(el2) {
            var parent = el2.parentNode;
            parent.replaceChild(el2.firstChild, el2);
            parent.normalize();
          });
        };
        const KEY_A = 65;
        const KEY_RETURN = 13;
        const KEY_ESC = 27;
        const KEY_LEFT = 37;
        const KEY_UP = 38;
        const KEY_RIGHT = 39;
        const KEY_DOWN = 40;
        const KEY_BACKSPACE = 8;
        const KEY_DELETE = 46;
        const KEY_TAB = 9;
        const IS_MAC = typeof navigator === "undefined" ? false : /Mac/.test(navigator.userAgent);
        const KEY_SHORTCUT = IS_MAC ? "metaKey" : "ctrlKey";
        var defaults = {
          options: [],
          optgroups: [],
          plugins: [],
          delimiter: ",",
          splitOn: null,
          persist: true,
          diacritics: true,
          create: null,
          createOnBlur: false,
          createFilter: null,
          highlight: true,
          openOnFocus: true,
          shouldOpen: null,
          maxOptions: 50,
          maxItems: null,
          hideSelected: null,
          duplicates: false,
          addPrecedence: false,
          selectOnTab: false,
          preload: null,
          allowEmptyOption: false,
          loadThrottle: 300,
          loadingClass: "loading",
          dataAttr: null,
          optgroupField: "optgroup",
          valueField: "value",
          labelField: "text",
          disabledField: "disabled",
          optgroupLabelField: "label",
          optgroupValueField: "value",
          lockOptgroupOrder: false,
          sortField: "$order",
          searchField: ["text"],
          searchConjunction: "and",
          mode: null,
          wrapperClass: "ts-wrapper",
          controlClass: "ts-control",
          dropdownClass: "ts-dropdown",
          dropdownContentClass: "ts-dropdown-content",
          itemClass: "item",
          optionClass: "option",
          dropdownParent: null,
          controlInput: '<input type="text" autocomplete="off" size="1" />',
          copyClassesToDropdown: false,
          placeholder: null,
          hidePlaceholder: null,
          shouldLoad: function(query) {
            return query.length > 0;
          },
          render: {}
        };
        const hash_key = (value) => {
          if (typeof value === "undefined" || value === null)
            return null;
          return get_hash(value);
        };
        const get_hash = (value) => {
          if (typeof value === "boolean")
            return value ? "1" : "0";
          return value + "";
        };
        const escape_html = (str) => {
          return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        };
        const loadDebounce = (fn, delay) => {
          var timeout;
          return function(value, callback) {
            var self2 = this;
            if (timeout) {
              self2.loading = Math.max(self2.loading - 1, 0);
              clearTimeout(timeout);
            }
            timeout = setTimeout(function() {
              timeout = null;
              self2.loadedSearches[value] = true;
              fn.call(self2, value, callback);
            }, delay);
          };
        };
        const debounce_events = (self2, types, fn) => {
          var type;
          var trigger = self2.trigger;
          var event_args = {};
          self2.trigger = function() {
            var type2 = arguments[0];
            if (types.indexOf(type2) !== -1) {
              event_args[type2] = arguments;
            } else {
              return trigger.apply(self2, arguments);
            }
          };
          fn.apply(self2, []);
          self2.trigger = trigger;
          for (type of types) {
            if (type in event_args) {
              trigger.apply(self2, event_args[type]);
            }
          }
        };
        const getSelection = (input) => {
          return {
            start: input.selectionStart || 0,
            length: (input.selectionEnd || 0) - (input.selectionStart || 0)
          };
        };
        const preventDefault = (evt, stop = false) => {
          if (evt) {
            evt.preventDefault();
            if (stop) {
              evt.stopPropagation();
            }
          }
        };
        const addEvent = (target, type, callback, options) => {
          target.addEventListener(type, callback, options);
        };
        const isKeyDown = (key_name, evt) => {
          if (!evt) {
            return false;
          }
          if (!evt[key_name]) {
            return false;
          }
          var count = (evt.altKey ? 1 : 0) + (evt.ctrlKey ? 1 : 0) + (evt.shiftKey ? 1 : 0) + (evt.metaKey ? 1 : 0);
          if (count === 1) {
            return true;
          }
          return false;
        };
        const getId = (el, id) => {
          const existing_id = el.getAttribute("id");
          if (existing_id) {
            return existing_id;
          }
          el.setAttribute("id", id);
          return id;
        };
        const addSlashes = (str) => {
          return str.replace(/[\\"']/g, "\\$&");
        };
        const append = (parent, node) => {
          if (node)
            parent.append(node);
        };
        function getSettings(input, settings_user) {
          var settings = Object.assign({}, defaults, settings_user);
          var attr_data = settings.dataAttr;
          var field_label = settings.labelField;
          var field_value = settings.valueField;
          var field_disabled = settings.disabledField;
          var field_optgroup = settings.optgroupField;
          var field_optgroup_label = settings.optgroupLabelField;
          var field_optgroup_value = settings.optgroupValueField;
          var tag_name = input.tagName.toLowerCase();
          var placeholder = input.getAttribute("placeholder") || input.getAttribute("data-placeholder");
          if (!placeholder && !settings.allowEmptyOption) {
            let option = input.querySelector('option[value=""]');
            if (option) {
              placeholder = option.textContent;
            }
          }
          var settings_element = {
            placeholder,
            options: [],
            optgroups: [],
            items: [],
            maxItems: null
          };
          var init_select = () => {
            var tagName;
            var options = settings_element.options;
            var optionsMap = {};
            var group_count = 1;
            var readData = (el) => {
              var data = Object.assign({}, el.dataset);
              var json = attr_data && data[attr_data];
              if (typeof json === "string" && json.length) {
                data = Object.assign(data, JSON.parse(json));
              }
              return data;
            };
            var addOption = (option, group) => {
              var value = hash_key(option.value);
              if (value == null)
                return;
              if (!value && !settings.allowEmptyOption)
                return;
              if (optionsMap.hasOwnProperty(value)) {
                if (group) {
                  var arr = optionsMap[value][field_optgroup];
                  if (!arr) {
                    optionsMap[value][field_optgroup] = group;
                  } else if (!Array.isArray(arr)) {
                    optionsMap[value][field_optgroup] = [arr, group];
                  } else {
                    arr.push(group);
                  }
                }
              } else {
                var option_data = readData(option);
                option_data[field_label] = option_data[field_label] || option.textContent;
                option_data[field_value] = option_data[field_value] || value;
                option_data[field_disabled] = option_data[field_disabled] || option.disabled;
                option_data[field_optgroup] = option_data[field_optgroup] || group;
                option_data.$option = option;
                optionsMap[value] = option_data;
                options.push(option_data);
              }
              if (option.selected) {
                settings_element.items.push(value);
              }
            };
            var addGroup = (optgroup) => {
              var id, optgroup_data;
              optgroup_data = readData(optgroup);
              optgroup_data[field_optgroup_label] = optgroup_data[field_optgroup_label] || optgroup.getAttribute("label") || "";
              optgroup_data[field_optgroup_value] = optgroup_data[field_optgroup_value] || group_count++;
              optgroup_data[field_disabled] = optgroup_data[field_disabled] || optgroup.disabled;
              settings_element.optgroups.push(optgroup_data);
              id = optgroup_data[field_optgroup_value];
              iterate(optgroup.children, (option) => {
                addOption(option, id);
              });
            };
            settings_element.maxItems = input.hasAttribute("multiple") ? null : 1;
            iterate(input.children, (child) => {
              tagName = child.tagName.toLowerCase();
              if (tagName === "optgroup") {
                addGroup(child);
              } else if (tagName === "option") {
                addOption(child);
              }
            });
          };
          var init_textbox = () => {
            const data_raw = input.getAttribute(attr_data);
            if (!data_raw) {
              var value = input.value.trim() || "";
              if (!settings.allowEmptyOption && !value.length)
                return;
              const values = value.split(settings.delimiter);
              iterate(values, (value2) => {
                const option = {};
                option[field_label] = value2;
                option[field_value] = value2;
                settings_element.options.push(option);
              });
              settings_element.items = values;
            } else {
              settings_element.options = JSON.parse(data_raw);
              iterate(settings_element.options, (opt) => {
                settings_element.items.push(opt[field_value]);
              });
            }
          };
          if (tag_name === "select") {
            init_select();
          } else {
            init_textbox();
          }
          return Object.assign({}, defaults, settings_element, settings_user);
        }
        var instance_i = 0;
        class TomSelect3 extends MicroPlugin(MicroEvent) {
          constructor(input_arg, user_settings) {
            super();
            this.control_input = void 0;
            this.wrapper = void 0;
            this.dropdown = void 0;
            this.control = void 0;
            this.dropdown_content = void 0;
            this.focus_node = void 0;
            this.order = 0;
            this.settings = void 0;
            this.input = void 0;
            this.tabIndex = void 0;
            this.is_select_tag = void 0;
            this.rtl = void 0;
            this.inputId = void 0;
            this._destroy = void 0;
            this.sifter = void 0;
            this.isOpen = false;
            this.isDisabled = false;
            this.isRequired = void 0;
            this.isInvalid = false;
            this.isValid = true;
            this.isLocked = false;
            this.isFocused = false;
            this.isInputHidden = false;
            this.isSetup = false;
            this.ignoreFocus = false;
            this.ignoreHover = false;
            this.hasOptions = false;
            this.currentResults = void 0;
            this.lastValue = "";
            this.caretPos = 0;
            this.loading = 0;
            this.loadedSearches = {};
            this.activeOption = null;
            this.activeItems = [];
            this.optgroups = {};
            this.options = {};
            this.userOptions = {};
            this.items = [];
            instance_i++;
            var dir;
            var input = getDom(input_arg);
            if (input.tomselect) {
              throw new Error("Tom Select already initialized on this element");
            }
            input.tomselect = this;
            var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
            dir = computedStyle.getPropertyValue("direction");
            const settings = getSettings(input, user_settings);
            this.settings = settings;
            this.input = input;
            this.tabIndex = input.tabIndex || 0;
            this.is_select_tag = input.tagName.toLowerCase() === "select";
            this.rtl = /rtl/i.test(dir);
            this.inputId = getId(input, "tomselect-" + instance_i);
            this.isRequired = input.required;
            this.sifter = new Sifter(this.options, {
              diacritics: settings.diacritics
            });
            settings.mode = settings.mode || (settings.maxItems === 1 ? "single" : "multi");
            if (typeof settings.hideSelected !== "boolean") {
              settings.hideSelected = settings.mode === "multi";
            }
            if (typeof settings.hidePlaceholder !== "boolean") {
              settings.hidePlaceholder = settings.mode !== "multi";
            }
            var filter = settings.createFilter;
            if (typeof filter !== "function") {
              if (typeof filter === "string") {
                filter = new RegExp(filter);
              }
              if (filter instanceof RegExp) {
                settings.createFilter = (input2) => filter.test(input2);
              } else {
                settings.createFilter = (value) => {
                  return this.settings.duplicates || !this.options[value];
                };
              }
            }
            this.initializePlugins(settings.plugins);
            this.setupCallbacks();
            this.setupTemplates();
            const wrapper = getDom("<div>");
            const control = getDom("<div>");
            const dropdown = this._render("dropdown");
            const dropdown_content = getDom(`<div role="listbox" tabindex="-1">`);
            const classes = this.input.getAttribute("class") || "";
            const inputMode = settings.mode;
            var control_input;
            addClasses(wrapper, settings.wrapperClass, classes, inputMode);
            addClasses(control, settings.controlClass);
            append(wrapper, control);
            addClasses(dropdown, settings.dropdownClass, inputMode);
            if (settings.copyClassesToDropdown) {
              addClasses(dropdown, classes);
            }
            addClasses(dropdown_content, settings.dropdownContentClass);
            append(dropdown, dropdown_content);
            getDom(settings.dropdownParent || wrapper).appendChild(dropdown);
            if (isHtmlString(settings.controlInput)) {
              control_input = getDom(settings.controlInput);
              var attrs = ["autocorrect", "autocapitalize", "autocomplete"];
              iterate(attrs, (attr) => {
                if (input.getAttribute(attr)) {
                  setAttr(control_input, {
                    [attr]: input.getAttribute(attr)
                  });
                }
              });
              control_input.tabIndex = -1;
              control.appendChild(control_input);
              this.focus_node = control_input;
            } else if (settings.controlInput) {
              control_input = getDom(settings.controlInput);
              this.focus_node = control_input;
            } else {
              control_input = getDom("<input/>");
              this.focus_node = control;
            }
            this.wrapper = wrapper;
            this.dropdown = dropdown;
            this.dropdown_content = dropdown_content;
            this.control = control;
            this.control_input = control_input;
            this.setup();
          }
          setup() {
            const self2 = this;
            const settings = self2.settings;
            const control_input = self2.control_input;
            const dropdown = self2.dropdown;
            const dropdown_content = self2.dropdown_content;
            const wrapper = self2.wrapper;
            const control = self2.control;
            const input = self2.input;
            const focus_node = self2.focus_node;
            const passive_event = {
              passive: true
            };
            const listboxId = self2.inputId + "-ts-dropdown";
            setAttr(dropdown_content, {
              id: listboxId
            });
            setAttr(focus_node, {
              role: "combobox",
              "aria-haspopup": "listbox",
              "aria-expanded": "false",
              "aria-controls": listboxId
            });
            const control_id = getId(focus_node, self2.inputId + "-ts-control");
            const query = "label[for='" + escapeQuery(self2.inputId) + "']";
            const label = document.querySelector(query);
            const label_click = self2.focus.bind(self2);
            if (label) {
              addEvent(label, "click", label_click);
              setAttr(label, {
                for: control_id
              });
              const label_id = getId(label, self2.inputId + "-ts-label");
              setAttr(focus_node, {
                "aria-labelledby": label_id
              });
              setAttr(dropdown_content, {
                "aria-labelledby": label_id
              });
            }
            wrapper.style.width = input.style.width;
            if (self2.plugins.names.length) {
              const classes_plugins = "plugin-" + self2.plugins.names.join(" plugin-");
              addClasses([wrapper, dropdown], classes_plugins);
            }
            if ((settings.maxItems === null || settings.maxItems > 1) && self2.is_select_tag) {
              setAttr(input, {
                multiple: "multiple"
              });
            }
            if (settings.placeholder) {
              setAttr(control_input, {
                placeholder: settings.placeholder
              });
            }
            if (!settings.splitOn && settings.delimiter) {
              settings.splitOn = new RegExp("\\s*" + escape_regex(settings.delimiter) + "+\\s*");
            }
            if (settings.load && settings.loadThrottle) {
              settings.load = loadDebounce(settings.load, settings.loadThrottle);
            }
            self2.control_input.type = input.type;
            addEvent(dropdown, "mouseenter", (e) => {
              var target_match = parentMatch(e.target, "[data-selectable]", dropdown);
              if (target_match)
                self2.onOptionHover(e, target_match);
            }, {
              capture: true
            });
            addEvent(dropdown, "click", (evt) => {
              const option = parentMatch(evt.target, "[data-selectable]");
              if (option) {
                self2.onOptionSelect(evt, option);
                preventDefault(evt, true);
              }
            });
            addEvent(control, "click", (evt) => {
              var target_match = parentMatch(evt.target, "[data-ts-item]", control);
              if (target_match && self2.onItemSelect(evt, target_match)) {
                preventDefault(evt, true);
                return;
              }
              if (control_input.value != "") {
                return;
              }
              self2.onClick();
              preventDefault(evt, true);
            });
            addEvent(focus_node, "keydown", (e) => self2.onKeyDown(e));
            addEvent(control_input, "keypress", (e) => self2.onKeyPress(e));
            addEvent(control_input, "input", (e) => self2.onInput(e));
            addEvent(focus_node, "resize", () => self2.positionDropdown(), passive_event);
            addEvent(focus_node, "blur", (e) => self2.onBlur(e));
            addEvent(focus_node, "focus", (e) => self2.onFocus(e));
            addEvent(control_input, "paste", (e) => self2.onPaste(e));
            const doc_mousedown = (evt) => {
              const target = evt.composedPath()[0];
              if (!wrapper.contains(target) && !dropdown.contains(target)) {
                if (self2.isFocused) {
                  self2.blur();
                }
                self2.inputState();
                return;
              }
              if (target == control_input && self2.isOpen) {
                evt.stopPropagation();
              } else {
                preventDefault(evt, true);
              }
            };
            const win_scroll = () => {
              if (self2.isOpen) {
                self2.positionDropdown();
              }
            };
            const win_hover = () => {
              self2.ignoreHover = false;
            };
            addEvent(document, "mousedown", doc_mousedown);
            addEvent(window, "scroll", win_scroll, passive_event);
            addEvent(window, "resize", win_scroll, passive_event);
            addEvent(window, "mousemove", win_hover, passive_event);
            this._destroy = () => {
              document.removeEventListener("mousedown", doc_mousedown);
              window.removeEventListener("mousemove", win_hover);
              window.removeEventListener("scroll", win_scroll);
              window.removeEventListener("resize", win_scroll);
              if (label)
                label.removeEventListener("click", label_click);
            };
            this.revertSettings = {
              innerHTML: input.innerHTML,
              tabIndex: input.tabIndex
            };
            input.tabIndex = -1;
            input.insertAdjacentElement("afterend", self2.wrapper);
            self2.sync(false);
            settings.items = [];
            delete settings.optgroups;
            delete settings.options;
            addEvent(input, "invalid", (e) => {
              if (self2.isValid) {
                self2.isValid = false;
                self2.isInvalid = true;
                self2.refreshState();
              }
            });
            self2.updateOriginalInput();
            self2.refreshItems();
            self2.close(false);
            self2.inputState();
            self2.isSetup = true;
            if (input.disabled) {
              self2.disable();
            } else {
              self2.enable();
            }
            self2.on("change", this.onChange);
            addClasses(input, "tomselected", "ts-hidden-accessible");
            self2.trigger("initialize");
            if (settings.preload === true) {
              self2.preload();
            }
          }
          setupOptions(options = [], optgroups = []) {
            this.addOptions(options);
            iterate(optgroups, (optgroup) => {
              this.registerOptionGroup(optgroup);
            });
          }
          setupTemplates() {
            var self2 = this;
            var field_label = self2.settings.labelField;
            var field_optgroup = self2.settings.optgroupLabelField;
            var templates = {
              "optgroup": (data) => {
                let optgroup = document.createElement("div");
                optgroup.className = "optgroup";
                optgroup.appendChild(data.options);
                return optgroup;
              },
              "optgroup_header": (data, escape) => {
                return '<div class="optgroup-header">' + escape(data[field_optgroup]) + "</div>";
              },
              "option": (data, escape) => {
                return "<div>" + escape(data[field_label]) + "</div>";
              },
              "item": (data, escape) => {
                return "<div>" + escape(data[field_label]) + "</div>";
              },
              "option_create": (data, escape) => {
                return '<div class="create">Add <strong>' + escape(data.input) + "</strong>&hellip;</div>";
              },
              "no_results": () => {
                return '<div class="no-results">No results found</div>';
              },
              "loading": () => {
                return '<div class="spinner"></div>';
              },
              "not_loading": () => {
              },
              "dropdown": () => {
                return "<div></div>";
              }
            };
            self2.settings.render = Object.assign({}, templates, self2.settings.render);
          }
          setupCallbacks() {
            var key, fn;
            var callbacks = {
              "initialize": "onInitialize",
              "change": "onChange",
              "item_add": "onItemAdd",
              "item_remove": "onItemRemove",
              "item_select": "onItemSelect",
              "clear": "onClear",
              "option_add": "onOptionAdd",
              "option_remove": "onOptionRemove",
              "option_clear": "onOptionClear",
              "optgroup_add": "onOptionGroupAdd",
              "optgroup_remove": "onOptionGroupRemove",
              "optgroup_clear": "onOptionGroupClear",
              "dropdown_open": "onDropdownOpen",
              "dropdown_close": "onDropdownClose",
              "type": "onType",
              "load": "onLoad",
              "focus": "onFocus",
              "blur": "onBlur"
            };
            for (key in callbacks) {
              fn = this.settings[callbacks[key]];
              if (fn)
                this.on(key, fn);
            }
          }
          sync(get_settings = true) {
            const self2 = this;
            const settings = get_settings ? getSettings(self2.input, {
              delimiter: self2.settings.delimiter
            }) : self2.settings;
            self2.setupOptions(settings.options, settings.optgroups);
            self2.setValue(settings.items || [], true);
            self2.lastQuery = null;
          }
          onClick() {
            var self2 = this;
            if (self2.activeItems.length > 0) {
              self2.clearActiveItems();
              self2.focus();
              return;
            }
            if (self2.isFocused && self2.isOpen) {
              self2.blur();
            } else {
              self2.focus();
            }
          }
          onMouseDown() {
          }
          onChange() {
            triggerEvent(this.input, "input");
            triggerEvent(this.input, "change");
          }
          onPaste(e) {
            var self2 = this;
            if (self2.isInputHidden || self2.isLocked) {
              preventDefault(e);
              return;
            }
            if (!self2.settings.splitOn) {
              return;
            }
            setTimeout(() => {
              var pastedText = self2.inputValue();
              if (!pastedText.match(self2.settings.splitOn)) {
                return;
              }
              var splitInput = pastedText.trim().split(self2.settings.splitOn);
              iterate(splitInput, (piece) => {
                piece = hash_key(piece);
                if (this.options[piece]) {
                  self2.addItem(piece);
                } else {
                  self2.createItem(piece);
                }
              });
            }, 0);
          }
          onKeyPress(e) {
            var self2 = this;
            if (self2.isLocked) {
              preventDefault(e);
              return;
            }
            var character = String.fromCharCode(e.keyCode || e.which);
            if (self2.settings.create && self2.settings.mode === "multi" && character === self2.settings.delimiter) {
              self2.createItem();
              preventDefault(e);
              return;
            }
          }
          onKeyDown(e) {
            var self2 = this;
            self2.ignoreHover = true;
            if (self2.isLocked) {
              if (e.keyCode !== KEY_TAB) {
                preventDefault(e);
              }
              return;
            }
            switch (e.keyCode) {
              case KEY_A:
                if (isKeyDown(KEY_SHORTCUT, e)) {
                  if (self2.control_input.value == "") {
                    preventDefault(e);
                    self2.selectAll();
                    return;
                  }
                }
                break;
              case KEY_ESC:
                if (self2.isOpen) {
                  preventDefault(e, true);
                  self2.close();
                }
                self2.clearActiveItems();
                return;
              case KEY_DOWN:
                if (!self2.isOpen && self2.hasOptions) {
                  self2.open();
                } else if (self2.activeOption) {
                  let next = self2.getAdjacent(self2.activeOption, 1);
                  if (next)
                    self2.setActiveOption(next);
                }
                preventDefault(e);
                return;
              case KEY_UP:
                if (self2.activeOption) {
                  let prev = self2.getAdjacent(self2.activeOption, -1);
                  if (prev)
                    self2.setActiveOption(prev);
                }
                preventDefault(e);
                return;
              case KEY_RETURN:
                if (self2.canSelect(self2.activeOption)) {
                  self2.onOptionSelect(e, self2.activeOption);
                  preventDefault(e);
                } else if (self2.settings.create && self2.createItem()) {
                  preventDefault(e);
                } else if (document.activeElement == self2.control_input && self2.isOpen) {
                  preventDefault(e);
                }
                return;
              case KEY_LEFT:
                self2.advanceSelection(-1, e);
                return;
              case KEY_RIGHT:
                self2.advanceSelection(1, e);
                return;
              case KEY_TAB:
                if (self2.settings.selectOnTab) {
                  if (self2.canSelect(self2.activeOption)) {
                    self2.onOptionSelect(e, self2.activeOption);
                    preventDefault(e);
                  }
                  if (self2.settings.create && self2.createItem()) {
                    preventDefault(e);
                  }
                }
                return;
              case KEY_BACKSPACE:
              case KEY_DELETE:
                self2.deleteSelection(e);
                return;
            }
            if (self2.isInputHidden && !isKeyDown(KEY_SHORTCUT, e)) {
              preventDefault(e);
            }
          }
          onInput(e) {
            var self2 = this;
            if (self2.isLocked) {
              return;
            }
            var value = self2.inputValue();
            if (self2.lastValue !== value) {
              self2.lastValue = value;
              if (self2.settings.shouldLoad.call(self2, value)) {
                self2.load(value);
              }
              self2.refreshOptions();
              self2.trigger("type", value);
            }
          }
          onOptionHover(evt, option) {
            if (this.ignoreHover)
              return;
            this.setActiveOption(option, false);
          }
          onFocus(e) {
            var self2 = this;
            var wasFocused = self2.isFocused;
            if (self2.isDisabled) {
              self2.blur();
              preventDefault(e);
              return;
            }
            if (self2.ignoreFocus)
              return;
            self2.isFocused = true;
            if (self2.settings.preload === "focus")
              self2.preload();
            if (!wasFocused)
              self2.trigger("focus");
            if (!self2.activeItems.length) {
              self2.showInput();
              self2.refreshOptions(!!self2.settings.openOnFocus);
            }
            self2.refreshState();
          }
          onBlur(e) {
            if (document.hasFocus() === false)
              return;
            var self2 = this;
            if (!self2.isFocused)
              return;
            self2.isFocused = false;
            self2.ignoreFocus = false;
            var deactivate = () => {
              self2.close();
              self2.setActiveItem();
              self2.setCaret(self2.items.length);
              self2.trigger("blur");
            };
            if (self2.settings.create && self2.settings.createOnBlur) {
              self2.createItem(null, false, deactivate);
            } else {
              deactivate();
            }
          }
          onOptionSelect(evt, option) {
            var value, self2 = this;
            if (option.parentElement && option.parentElement.matches("[data-disabled]")) {
              return;
            }
            if (option.classList.contains("create")) {
              self2.createItem(null, true, () => {
                if (self2.settings.closeAfterSelect) {
                  self2.close();
                }
              });
            } else {
              value = option.dataset.value;
              if (typeof value !== "undefined") {
                self2.lastQuery = null;
                self2.addItem(value);
                if (self2.settings.closeAfterSelect) {
                  self2.close();
                }
                if (!self2.settings.hideSelected && evt.type && /click/.test(evt.type)) {
                  self2.setActiveOption(option);
                }
              }
            }
          }
          canSelect(option) {
            if (this.isOpen && option && this.dropdown_content.contains(option)) {
              return true;
            }
            return false;
          }
          onItemSelect(evt, item) {
            var self2 = this;
            if (!self2.isLocked && self2.settings.mode === "multi") {
              preventDefault(evt);
              self2.setActiveItem(item, evt);
              return true;
            }
            return false;
          }
          canLoad(value) {
            if (!this.settings.load)
              return false;
            if (this.loadedSearches.hasOwnProperty(value))
              return false;
            return true;
          }
          load(value) {
            const self2 = this;
            if (!self2.canLoad(value))
              return;
            addClasses(self2.wrapper, self2.settings.loadingClass);
            self2.loading++;
            const callback = self2.loadCallback.bind(self2);
            self2.settings.load.call(self2, value, callback);
          }
          loadCallback(options, optgroups) {
            const self2 = this;
            self2.loading = Math.max(self2.loading - 1, 0);
            self2.lastQuery = null;
            self2.clearActiveOption();
            self2.setupOptions(options, optgroups);
            self2.refreshOptions(self2.isFocused && !self2.isInputHidden);
            if (!self2.loading) {
              removeClasses(self2.wrapper, self2.settings.loadingClass);
            }
            self2.trigger("load", options, optgroups);
          }
          preload() {
            var classList = this.wrapper.classList;
            if (classList.contains("preloaded"))
              return;
            classList.add("preloaded");
            this.load("");
          }
          setTextboxValue(value = "") {
            var input = this.control_input;
            var changed = input.value !== value;
            if (changed) {
              input.value = value;
              triggerEvent(input, "update");
              this.lastValue = value;
            }
          }
          getValue() {
            if (this.is_select_tag && this.input.hasAttribute("multiple")) {
              return this.items;
            }
            return this.items.join(this.settings.delimiter);
          }
          setValue(value, silent) {
            var events = silent ? [] : ["change"];
            debounce_events(this, events, () => {
              this.clear(silent);
              this.addItems(value, silent);
            });
          }
          setMaxItems(value) {
            if (value === 0)
              value = null;
            this.settings.maxItems = value;
            this.refreshState();
          }
          setActiveItem(item, e) {
            var self2 = this;
            var eventName;
            var i, begin, end, swap;
            var last;
            if (self2.settings.mode === "single")
              return;
            if (!item) {
              self2.clearActiveItems();
              if (self2.isFocused) {
                self2.showInput();
              }
              return;
            }
            eventName = e && e.type.toLowerCase();
            if (eventName === "click" && isKeyDown("shiftKey", e) && self2.activeItems.length) {
              last = self2.getLastActive();
              begin = Array.prototype.indexOf.call(self2.control.children, last);
              end = Array.prototype.indexOf.call(self2.control.children, item);
              if (begin > end) {
                swap = begin;
                begin = end;
                end = swap;
              }
              for (i = begin; i <= end; i++) {
                item = self2.control.children[i];
                if (self2.activeItems.indexOf(item) === -1) {
                  self2.setActiveItemClass(item);
                }
              }
              preventDefault(e);
            } else if (eventName === "click" && isKeyDown(KEY_SHORTCUT, e) || eventName === "keydown" && isKeyDown("shiftKey", e)) {
              if (item.classList.contains("active")) {
                self2.removeActiveItem(item);
              } else {
                self2.setActiveItemClass(item);
              }
            } else {
              self2.clearActiveItems();
              self2.setActiveItemClass(item);
            }
            self2.hideInput();
            if (!self2.isFocused) {
              self2.focus();
            }
          }
          setActiveItemClass(item) {
            const self2 = this;
            const last_active = self2.control.querySelector(".last-active");
            if (last_active)
              removeClasses(last_active, "last-active");
            addClasses(item, "active last-active");
            self2.trigger("item_select", item);
            if (self2.activeItems.indexOf(item) == -1) {
              self2.activeItems.push(item);
            }
          }
          removeActiveItem(item) {
            var idx = this.activeItems.indexOf(item);
            this.activeItems.splice(idx, 1);
            removeClasses(item, "active");
          }
          clearActiveItems() {
            removeClasses(this.activeItems, "active");
            this.activeItems = [];
          }
          setActiveOption(option, scroll = true) {
            if (option === this.activeOption) {
              return;
            }
            this.clearActiveOption();
            if (!option)
              return;
            this.activeOption = option;
            setAttr(this.focus_node, {
              "aria-activedescendant": option.getAttribute("id")
            });
            setAttr(option, {
              "aria-selected": "true"
            });
            addClasses(option, "active");
            if (scroll)
              this.scrollToOption(option);
          }
          scrollToOption(option, behavior) {
            if (!option)
              return;
            const content = this.dropdown_content;
            const height_menu = content.clientHeight;
            const scrollTop = content.scrollTop || 0;
            const height_item = option.offsetHeight;
            const y = option.getBoundingClientRect().top - content.getBoundingClientRect().top + scrollTop;
            if (y + height_item > height_menu + scrollTop) {
              this.scroll(y - height_menu + height_item, behavior);
            } else if (y < scrollTop) {
              this.scroll(y, behavior);
            }
          }
          scroll(scrollTop, behavior) {
            const content = this.dropdown_content;
            if (behavior) {
              content.style.scrollBehavior = behavior;
            }
            content.scrollTop = scrollTop;
            content.style.scrollBehavior = "";
          }
          clearActiveOption() {
            if (this.activeOption) {
              removeClasses(this.activeOption, "active");
              setAttr(this.activeOption, {
                "aria-selected": null
              });
            }
            this.activeOption = null;
            setAttr(this.focus_node, {
              "aria-activedescendant": null
            });
          }
          selectAll() {
            const self2 = this;
            if (self2.settings.mode === "single")
              return;
            const activeItems = self2.controlChildren();
            if (!activeItems.length)
              return;
            self2.hideInput();
            self2.close();
            self2.activeItems = activeItems;
            iterate(activeItems, (item) => {
              self2.setActiveItemClass(item);
            });
          }
          inputState() {
            var self2 = this;
            if (!self2.control.contains(self2.control_input))
              return;
            setAttr(self2.control_input, {
              placeholder: self2.settings.placeholder
            });
            if (self2.activeItems.length > 0 || !self2.isFocused && self2.settings.hidePlaceholder && self2.items.length > 0) {
              self2.setTextboxValue();
              self2.isInputHidden = true;
            } else {
              if (self2.settings.hidePlaceholder && self2.items.length > 0) {
                setAttr(self2.control_input, {
                  placeholder: ""
                });
              }
              self2.isInputHidden = false;
            }
            self2.wrapper.classList.toggle("input-hidden", self2.isInputHidden);
          }
          hideInput() {
            this.inputState();
          }
          showInput() {
            this.inputState();
          }
          inputValue() {
            return this.control_input.value.trim();
          }
          focus() {
            var self2 = this;
            if (self2.isDisabled)
              return;
            self2.ignoreFocus = true;
            if (self2.control_input.offsetWidth) {
              self2.control_input.focus();
            } else {
              self2.focus_node.focus();
            }
            setTimeout(() => {
              self2.ignoreFocus = false;
              self2.onFocus();
            }, 0);
          }
          blur() {
            this.focus_node.blur();
            this.onBlur();
          }
          getScoreFunction(query) {
            return this.sifter.getScoreFunction(query, this.getSearchOptions());
          }
          getSearchOptions() {
            var settings = this.settings;
            var sort = settings.sortField;
            if (typeof settings.sortField === "string") {
              sort = [{
                field: settings.sortField
              }];
            }
            return {
              fields: settings.searchField,
              conjunction: settings.searchConjunction,
              sort,
              nesting: settings.nesting
            };
          }
          search(query) {
            var i, result, calculateScore;
            var self2 = this;
            var options = this.getSearchOptions();
            if (self2.settings.score) {
              calculateScore = self2.settings.score.call(self2, query);
              if (typeof calculateScore !== "function") {
                throw new Error('Tom Select "score" setting must be a function that returns a function');
              }
            }
            if (query !== self2.lastQuery) {
              self2.lastQuery = query;
              result = self2.sifter.search(query, Object.assign(options, {
                score: calculateScore
              }));
              self2.currentResults = result;
            } else {
              result = Object.assign({}, self2.currentResults);
            }
            if (self2.settings.hideSelected) {
              for (i = result.items.length - 1; i >= 0; i--) {
                let hashed = hash_key(result.items[i].id);
                if (hashed && self2.items.indexOf(hashed) !== -1) {
                  result.items.splice(i, 1);
                }
              }
            }
            return result;
          }
          refreshOptions(triggerDropdown = true) {
            var i, j, k, n, optgroup, optgroups, html, has_create_option, active_value, active_group;
            var create;
            const groups = {};
            const groups_order = [];
            var self2 = this;
            var query = self2.inputValue();
            var results = self2.search(query);
            var active_option = null;
            var show_dropdown = self2.settings.shouldOpen || false;
            var dropdown_content = self2.dropdown_content;
            if (self2.activeOption) {
              active_value = self2.activeOption.dataset.value;
              active_group = self2.activeOption.closest("[data-group]");
            }
            n = results.items.length;
            if (typeof self2.settings.maxOptions === "number") {
              n = Math.min(n, self2.settings.maxOptions);
            }
            if (n > 0) {
              show_dropdown = true;
            }
            for (i = 0; i < n; i++) {
              let opt_value = results.items[i].id;
              let option = self2.options[opt_value];
              let option_el = self2.getOption(opt_value, true);
              if (!self2.settings.hideSelected) {
                option_el.classList.toggle("selected", self2.items.includes(opt_value));
              }
              optgroup = option[self2.settings.optgroupField] || "";
              optgroups = Array.isArray(optgroup) ? optgroup : [optgroup];
              for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
                optgroup = optgroups[j];
                if (!self2.optgroups.hasOwnProperty(optgroup)) {
                  optgroup = "";
                }
                if (!groups.hasOwnProperty(optgroup)) {
                  groups[optgroup] = document.createDocumentFragment();
                  groups_order.push(optgroup);
                }
                if (j > 0) {
                  option_el = option_el.cloneNode(true);
                  setAttr(option_el, {
                    id: option.$id + "-clone-" + j,
                    "aria-selected": null
                  });
                  option_el.classList.add("ts-cloned");
                  removeClasses(option_el, "active");
                }
                if (!active_option && active_value == opt_value) {
                  if (active_group) {
                    if (active_group.dataset.group === optgroup) {
                      active_option = option_el;
                    }
                  } else {
                    active_option = option_el;
                  }
                }
                groups[optgroup].appendChild(option_el);
              }
            }
            if (this.settings.lockOptgroupOrder) {
              groups_order.sort((a, b) => {
                var a_order = self2.optgroups[a] && self2.optgroups[a].$order || 0;
                var b_order = self2.optgroups[b] && self2.optgroups[b].$order || 0;
                return a_order - b_order;
              });
            }
            html = document.createDocumentFragment();
            iterate(groups_order, (optgroup2) => {
              if (self2.optgroups.hasOwnProperty(optgroup2) && groups[optgroup2].children.length) {
                let group_options = document.createDocumentFragment();
                let header = self2.render("optgroup_header", self2.optgroups[optgroup2]);
                append(group_options, header);
                append(group_options, groups[optgroup2]);
                let group_html = self2.render("optgroup", {
                  group: self2.optgroups[optgroup2],
                  options: group_options
                });
                append(html, group_html);
              } else {
                append(html, groups[optgroup2]);
              }
            });
            dropdown_content.innerHTML = "";
            append(dropdown_content, html);
            if (self2.settings.highlight) {
              removeHighlight(dropdown_content);
              if (results.query.length && results.tokens.length) {
                iterate(results.tokens, (tok) => {
                  highlight(dropdown_content, tok.regex);
                });
              }
            }
            var add_template = (template) => {
              let content = self2.render(template, {
                input: query
              });
              if (content) {
                show_dropdown = true;
                dropdown_content.insertBefore(content, dropdown_content.firstChild);
              }
              return content;
            };
            if (self2.loading) {
              add_template("loading");
            } else if (!self2.settings.shouldLoad.call(self2, query)) {
              add_template("not_loading");
            } else if (results.items.length === 0) {
              add_template("no_results");
            }
            has_create_option = self2.canCreate(query);
            if (has_create_option) {
              create = add_template("option_create");
            }
            self2.hasOptions = results.items.length > 0 || has_create_option;
            if (show_dropdown) {
              if (results.items.length > 0) {
                if (!active_option && self2.settings.mode === "single" && self2.items.length) {
                  active_option = self2.getOption(self2.items[0]);
                }
                if (!dropdown_content.contains(active_option)) {
                  let active_index = 0;
                  if (create && !self2.settings.addPrecedence) {
                    active_index = 1;
                  }
                  active_option = self2.selectable()[active_index];
                }
              } else if (create) {
                active_option = create;
              }
              if (triggerDropdown && !self2.isOpen) {
                self2.open();
                self2.scrollToOption(active_option, "auto");
              }
              self2.setActiveOption(active_option);
            } else {
              self2.clearActiveOption();
              if (triggerDropdown && self2.isOpen) {
                self2.close(false);
              }
            }
          }
          selectable() {
            return this.dropdown_content.querySelectorAll("[data-selectable]");
          }
          addOption(data, user_created = false) {
            const self2 = this;
            if (Array.isArray(data)) {
              self2.addOptions(data, user_created);
              return false;
            }
            const key = hash_key(data[self2.settings.valueField]);
            if (key === null || self2.options.hasOwnProperty(key)) {
              return false;
            }
            data.$order = data.$order || ++self2.order;
            data.$id = self2.inputId + "-opt-" + data.$order;
            self2.options[key] = data;
            self2.lastQuery = null;
            if (user_created) {
              self2.userOptions[key] = user_created;
              self2.trigger("option_add", key, data);
            }
            return key;
          }
          addOptions(data, user_created = false) {
            iterate(data, (dat) => {
              this.addOption(dat, user_created);
            });
          }
          registerOption(data) {
            return this.addOption(data);
          }
          registerOptionGroup(data) {
            var key = hash_key(data[this.settings.optgroupValueField]);
            if (key === null)
              return false;
            data.$order = data.$order || ++this.order;
            this.optgroups[key] = data;
            return key;
          }
          addOptionGroup(id, data) {
            var hashed_id;
            data[this.settings.optgroupValueField] = id;
            if (hashed_id = this.registerOptionGroup(data)) {
              this.trigger("optgroup_add", hashed_id, data);
            }
          }
          removeOptionGroup(id) {
            if (this.optgroups.hasOwnProperty(id)) {
              delete this.optgroups[id];
              this.clearCache();
              this.trigger("optgroup_remove", id);
            }
          }
          clearOptionGroups() {
            this.optgroups = {};
            this.clearCache();
            this.trigger("optgroup_clear");
          }
          updateOption(value, data) {
            const self2 = this;
            var item_new;
            var index_item;
            const value_old = hash_key(value);
            const value_new = hash_key(data[self2.settings.valueField]);
            if (value_old === null)
              return;
            if (!self2.options.hasOwnProperty(value_old))
              return;
            if (typeof value_new !== "string")
              throw new Error("Value must be set in option data");
            const option = self2.getOption(value_old);
            const item = self2.getItem(value_old);
            data.$order = data.$order || self2.options[value_old].$order;
            delete self2.options[value_old];
            self2.uncacheValue(value_new);
            self2.options[value_new] = data;
            if (option) {
              if (self2.dropdown_content.contains(option)) {
                const option_new = self2._render("option", data);
                replaceNode(option, option_new);
                if (self2.activeOption === option) {
                  self2.setActiveOption(option_new);
                }
              }
              option.remove();
            }
            if (item) {
              index_item = self2.items.indexOf(value_old);
              if (index_item !== -1) {
                self2.items.splice(index_item, 1, value_new);
              }
              item_new = self2._render("item", data);
              if (item.classList.contains("active"))
                addClasses(item_new, "active");
              replaceNode(item, item_new);
            }
            self2.lastQuery = null;
          }
          removeOption(value, silent) {
            const self2 = this;
            value = get_hash(value);
            self2.uncacheValue(value);
            delete self2.userOptions[value];
            delete self2.options[value];
            self2.lastQuery = null;
            self2.trigger("option_remove", value);
            self2.removeItem(value, silent);
          }
          clearOptions(filter) {
            const boundFilter = (filter || this.clearFilter).bind(this);
            this.loadedSearches = {};
            this.userOptions = {};
            this.clearCache();
            const selected = {};
            iterate(this.options, (option, key) => {
              if (boundFilter(option, key)) {
                selected[key] = this.options[key];
              }
            });
            this.options = this.sifter.items = selected;
            this.lastQuery = null;
            this.trigger("option_clear");
          }
          clearFilter(option, value) {
            if (this.items.indexOf(value) >= 0) {
              return true;
            }
            return false;
          }
          getOption(value, create = false) {
            const hashed = hash_key(value);
            if (hashed !== null && this.options.hasOwnProperty(hashed)) {
              const option = this.options[hashed];
              if (option.$div) {
                return option.$div;
              }
              if (create) {
                return this._render("option", option);
              }
            }
            return null;
          }
          getAdjacent(option, direction, type = "option") {
            var self2 = this, all;
            if (!option) {
              return null;
            }
            if (type == "item") {
              all = self2.controlChildren();
            } else {
              all = self2.dropdown_content.querySelectorAll("[data-selectable]");
            }
            for (let i = 0; i < all.length; i++) {
              if (all[i] != option) {
                continue;
              }
              if (direction > 0) {
                return all[i + 1];
              }
              return all[i - 1];
            }
            return null;
          }
          getItem(item) {
            if (typeof item == "object") {
              return item;
            }
            var value = hash_key(item);
            return value !== null ? this.control.querySelector(`[data-value="${addSlashes(value)}"]`) : null;
          }
          addItems(values, silent) {
            var self2 = this;
            var items = Array.isArray(values) ? values : [values];
            items = items.filter((x) => self2.items.indexOf(x) === -1);
            for (let i = 0, n = items.length; i < n; i++) {
              self2.isPending = i < n - 1;
              self2.addItem(items[i], silent);
            }
          }
          addItem(value, silent) {
            var events = silent ? [] : ["change", "dropdown_close"];
            debounce_events(this, events, () => {
              var item, wasFull;
              const self2 = this;
              const inputMode = self2.settings.mode;
              const hashed = hash_key(value);
              if (hashed && self2.items.indexOf(hashed) !== -1) {
                if (inputMode === "single") {
                  self2.close();
                }
                if (inputMode === "single" || !self2.settings.duplicates) {
                  return;
                }
              }
              if (hashed === null || !self2.options.hasOwnProperty(hashed))
                return;
              if (inputMode === "single")
                self2.clear(silent);
              if (inputMode === "multi" && self2.isFull())
                return;
              item = self2._render("item", self2.options[hashed]);
              if (self2.control.contains(item)) {
                item = item.cloneNode(true);
              }
              wasFull = self2.isFull();
              self2.items.splice(self2.caretPos, 0, hashed);
              self2.insertAtCaret(item);
              if (self2.isSetup) {
                if (!self2.isPending && self2.settings.hideSelected) {
                  let option = self2.getOption(hashed);
                  let next = self2.getAdjacent(option, 1);
                  if (next) {
                    self2.setActiveOption(next);
                  }
                }
                if (!self2.isPending && !self2.settings.closeAfterSelect) {
                  self2.refreshOptions(self2.isFocused && inputMode !== "single");
                }
                if (self2.settings.closeAfterSelect != false && self2.isFull()) {
                  self2.close();
                } else if (!self2.isPending) {
                  self2.positionDropdown();
                }
                self2.trigger("item_add", hashed, item);
                if (!self2.isPending) {
                  self2.updateOriginalInput({
                    silent
                  });
                }
              }
              if (!self2.isPending || !wasFull && self2.isFull()) {
                self2.inputState();
                self2.refreshState();
              }
            });
          }
          removeItem(item = null, silent) {
            const self2 = this;
            item = self2.getItem(item);
            if (!item)
              return;
            var i, idx;
            const value = item.dataset.value;
            i = nodeIndex(item);
            item.remove();
            if (item.classList.contains("active")) {
              idx = self2.activeItems.indexOf(item);
              self2.activeItems.splice(idx, 1);
              removeClasses(item, "active");
            }
            self2.items.splice(i, 1);
            self2.lastQuery = null;
            if (!self2.settings.persist && self2.userOptions.hasOwnProperty(value)) {
              self2.removeOption(value, silent);
            }
            if (i < self2.caretPos) {
              self2.setCaret(self2.caretPos - 1);
            }
            self2.updateOriginalInput({
              silent
            });
            self2.refreshState();
            self2.positionDropdown();
            self2.trigger("item_remove", value, item);
          }
          createItem(input = null, triggerDropdown = true, callback = () => {
          }) {
            var self2 = this;
            var caret = self2.caretPos;
            var output;
            input = input || self2.inputValue();
            if (!self2.canCreate(input)) {
              callback();
              return false;
            }
            self2.lock();
            var created = false;
            var create = (data) => {
              self2.unlock();
              if (!data || typeof data !== "object")
                return callback();
              var value = hash_key(data[self2.settings.valueField]);
              if (typeof value !== "string") {
                return callback();
              }
              self2.setTextboxValue();
              self2.addOption(data, true);
              self2.setCaret(caret);
              self2.addItem(value);
              callback(data);
              created = true;
            };
            if (typeof self2.settings.create === "function") {
              output = self2.settings.create.call(this, input, create);
            } else {
              output = {
                [self2.settings.labelField]: input,
                [self2.settings.valueField]: input
              };
            }
            if (!created) {
              create(output);
            }
            return true;
          }
          refreshItems() {
            var self2 = this;
            self2.lastQuery = null;
            if (self2.isSetup) {
              self2.addItems(self2.items);
            }
            self2.updateOriginalInput();
            self2.refreshState();
          }
          refreshState() {
            const self2 = this;
            self2.refreshValidityState();
            const isFull = self2.isFull();
            const isLocked = self2.isLocked;
            self2.wrapper.classList.toggle("rtl", self2.rtl);
            const wrap_classList = self2.wrapper.classList;
            wrap_classList.toggle("focus", self2.isFocused);
            wrap_classList.toggle("disabled", self2.isDisabled);
            wrap_classList.toggle("required", self2.isRequired);
            wrap_classList.toggle("invalid", !self2.isValid);
            wrap_classList.toggle("locked", isLocked);
            wrap_classList.toggle("full", isFull);
            wrap_classList.toggle("input-active", self2.isFocused && !self2.isInputHidden);
            wrap_classList.toggle("dropdown-active", self2.isOpen);
            wrap_classList.toggle("has-options", isEmptyObject(self2.options));
            wrap_classList.toggle("has-items", self2.items.length > 0);
          }
          refreshValidityState() {
            var self2 = this;
            if (!self2.input.validity) {
              return;
            }
            self2.isValid = self2.input.validity.valid;
            self2.isInvalid = !self2.isValid;
          }
          isFull() {
            return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
          }
          updateOriginalInput(opts = {}) {
            const self2 = this;
            var option, label;
            const empty_option = self2.input.querySelector('option[value=""]');
            if (self2.is_select_tag) {
              let AddSelected = function(option_el, value, label2) {
                if (!option_el) {
                  option_el = getDom('<option value="' + escape_html(value) + '">' + escape_html(label2) + "</option>");
                }
                if (option_el != empty_option) {
                  self2.input.append(option_el);
                }
                selected.push(option_el);
                if (option_el != empty_option || has_selected > 0) {
                  option_el.selected = true;
                }
                return option_el;
              };
              const selected = [];
              const has_selected = self2.input.querySelectorAll("option:checked").length;
              self2.input.querySelectorAll("option:checked").forEach((option_el) => {
                option_el.selected = false;
              });
              if (self2.items.length == 0 && self2.settings.mode == "single") {
                AddSelected(empty_option, "", "");
              } else {
                self2.items.forEach((value) => {
                  option = self2.options[value];
                  label = option[self2.settings.labelField] || "";
                  if (selected.includes(option.$option)) {
                    const reuse_opt = self2.input.querySelector(`option[value="${addSlashes(value)}"]:not(:checked)`);
                    AddSelected(reuse_opt, value, label);
                  } else {
                    option.$option = AddSelected(option.$option, value, label);
                  }
                });
              }
            } else {
              self2.input.value = self2.getValue();
            }
            if (self2.isSetup) {
              if (!opts.silent) {
                self2.trigger("change", self2.getValue());
              }
            }
          }
          open() {
            var self2 = this;
            if (self2.isLocked || self2.isOpen || self2.settings.mode === "multi" && self2.isFull())
              return;
            self2.isOpen = true;
            setAttr(self2.focus_node, {
              "aria-expanded": "true"
            });
            self2.refreshState();
            applyCSS(self2.dropdown, {
              visibility: "hidden",
              display: "block"
            });
            self2.positionDropdown();
            applyCSS(self2.dropdown, {
              visibility: "visible",
              display: "block"
            });
            self2.focus();
            self2.trigger("dropdown_open", self2.dropdown);
          }
          close(setTextboxValue = true) {
            var self2 = this;
            var trigger = self2.isOpen;
            if (setTextboxValue) {
              self2.setTextboxValue();
              if (self2.settings.mode === "single" && self2.items.length) {
                self2.hideInput();
              }
            }
            self2.isOpen = false;
            setAttr(self2.focus_node, {
              "aria-expanded": "false"
            });
            applyCSS(self2.dropdown, {
              display: "none"
            });
            if (self2.settings.hideSelected) {
              self2.clearActiveOption();
            }
            self2.refreshState();
            if (trigger)
              self2.trigger("dropdown_close", self2.dropdown);
          }
          positionDropdown() {
            if (this.settings.dropdownParent !== "body") {
              return;
            }
            var context = this.control;
            var rect = context.getBoundingClientRect();
            var top = context.offsetHeight + rect.top + window.scrollY;
            var left = rect.left + window.scrollX;
            applyCSS(this.dropdown, {
              width: rect.width + "px",
              top: top + "px",
              left: left + "px"
            });
          }
          clear(silent) {
            var self2 = this;
            if (!self2.items.length)
              return;
            var items = self2.controlChildren();
            iterate(items, (item) => {
              self2.removeItem(item, true);
            });
            self2.showInput();
            if (!silent)
              self2.updateOriginalInput();
            self2.trigger("clear");
          }
          insertAtCaret(el) {
            const self2 = this;
            const caret = self2.caretPos;
            const target = self2.control;
            target.insertBefore(el, target.children[caret]);
            self2.setCaret(caret + 1);
          }
          deleteSelection(e) {
            var direction, selection, caret, tail;
            var self2 = this;
            direction = e && e.keyCode === KEY_BACKSPACE ? -1 : 1;
            selection = getSelection(self2.control_input);
            const rm_items = [];
            if (self2.activeItems.length) {
              tail = getTail(self2.activeItems, direction);
              caret = nodeIndex(tail);
              if (direction > 0) {
                caret++;
              }
              iterate(self2.activeItems, (item) => rm_items.push(item));
            } else if ((self2.isFocused || self2.settings.mode === "single") && self2.items.length) {
              const items = self2.controlChildren();
              if (direction < 0 && selection.start === 0 && selection.length === 0) {
                rm_items.push(items[self2.caretPos - 1]);
              } else if (direction > 0 && selection.start === self2.inputValue().length) {
                rm_items.push(items[self2.caretPos]);
              }
            }
            if (!self2.shouldDelete(rm_items, e)) {
              return false;
            }
            preventDefault(e, true);
            if (typeof caret !== "undefined") {
              self2.setCaret(caret);
            }
            while (rm_items.length) {
              self2.removeItem(rm_items.pop());
            }
            self2.showInput();
            self2.positionDropdown();
            self2.refreshOptions(false);
            return true;
          }
          shouldDelete(items, evt) {
            const values = items.map((item) => item.dataset.value);
            if (!values.length || typeof this.settings.onDelete === "function" && this.settings.onDelete(values, evt) === false) {
              return false;
            }
            return true;
          }
          advanceSelection(direction, e) {
            var last_active, adjacent, self2 = this;
            if (self2.rtl)
              direction *= -1;
            if (self2.inputValue().length)
              return;
            if (isKeyDown(KEY_SHORTCUT, e) || isKeyDown("shiftKey", e)) {
              last_active = self2.getLastActive(direction);
              if (last_active) {
                if (!last_active.classList.contains("active")) {
                  adjacent = last_active;
                } else {
                  adjacent = self2.getAdjacent(last_active, direction, "item");
                }
              } else if (direction > 0) {
                adjacent = self2.control_input.nextElementSibling;
              } else {
                adjacent = self2.control_input.previousElementSibling;
              }
              if (adjacent) {
                if (adjacent.classList.contains("active")) {
                  self2.removeActiveItem(last_active);
                }
                self2.setActiveItemClass(adjacent);
              }
            } else {
              self2.moveCaret(direction);
            }
          }
          moveCaret(direction) {
          }
          getLastActive(direction) {
            let last_active = this.control.querySelector(".last-active");
            if (last_active) {
              return last_active;
            }
            var result = this.control.querySelectorAll(".active");
            if (result) {
              return getTail(result, direction);
            }
          }
          setCaret(new_pos) {
            this.caretPos = this.items.length;
          }
          controlChildren() {
            return Array.from(this.control.querySelectorAll("[data-ts-item]"));
          }
          lock() {
            this.isLocked = true;
            this.refreshState();
          }
          unlock() {
            this.isLocked = false;
            this.refreshState();
          }
          disable() {
            var self2 = this;
            self2.input.disabled = true;
            self2.control_input.disabled = true;
            self2.focus_node.tabIndex = -1;
            self2.isDisabled = true;
            this.close();
            self2.lock();
          }
          enable() {
            var self2 = this;
            self2.input.disabled = false;
            self2.control_input.disabled = false;
            self2.focus_node.tabIndex = self2.tabIndex;
            self2.isDisabled = false;
            self2.unlock();
          }
          destroy() {
            var self2 = this;
            var revertSettings = self2.revertSettings;
            self2.trigger("destroy");
            self2.off();
            self2.wrapper.remove();
            self2.dropdown.remove();
            self2.input.innerHTML = revertSettings.innerHTML;
            self2.input.tabIndex = revertSettings.tabIndex;
            removeClasses(self2.input, "tomselected", "ts-hidden-accessible");
            self2._destroy();
            delete self2.input.tomselect;
          }
          render(templateName, data) {
            if (typeof this.settings.render[templateName] !== "function") {
              return null;
            }
            return this._render(templateName, data);
          }
          _render(templateName, data) {
            var value = "", id, html;
            const self2 = this;
            if (templateName === "option" || templateName == "item") {
              value = get_hash(data[self2.settings.valueField]);
            }
            html = self2.settings.render[templateName].call(this, data, escape_html);
            if (html == null) {
              return html;
            }
            html = getDom(html);
            if (templateName === "option" || templateName === "option_create") {
              if (data[self2.settings.disabledField]) {
                setAttr(html, {
                  "aria-disabled": "true"
                });
              } else {
                setAttr(html, {
                  "data-selectable": ""
                });
              }
            } else if (templateName === "optgroup") {
              id = data.group[self2.settings.optgroupValueField];
              setAttr(html, {
                "data-group": id
              });
              if (data.group[self2.settings.disabledField]) {
                setAttr(html, {
                  "data-disabled": ""
                });
              }
            }
            if (templateName === "option" || templateName === "item") {
              setAttr(html, {
                "data-value": value
              });
              if (templateName === "item") {
                addClasses(html, self2.settings.itemClass);
                setAttr(html, {
                  "data-ts-item": ""
                });
              } else {
                addClasses(html, self2.settings.optionClass);
                setAttr(html, {
                  role: "option",
                  id: data.$id
                });
                self2.options[value].$div = html;
              }
            }
            return html;
          }
          clearCache() {
            iterate(this.options, (option, value) => {
              if (option.$div) {
                option.$div.remove();
                delete option.$div;
              }
            });
          }
          uncacheValue(value) {
            const option_el = this.getOption(value);
            if (option_el)
              option_el.remove();
          }
          canCreate(input) {
            return this.settings.create && input.length > 0 && this.settings.createFilter.call(this, input);
          }
          hook(when, method, new_fn) {
            var self2 = this;
            var orig_method = self2[method];
            self2[method] = function() {
              var result, result_new;
              if (when === "after") {
                result = orig_method.apply(self2, arguments);
              }
              result_new = new_fn.apply(self2, arguments);
              if (when === "instead") {
                return result_new;
              }
              if (when === "before") {
                result = orig_method.apply(self2, arguments);
              }
              return result;
            };
          }
        }
        function caret_position() {
          var self2 = this;
          self2.hook("instead", "setCaret", (new_pos) => {
            if (self2.settings.mode === "single" || !self2.control.contains(self2.control_input)) {
              new_pos = self2.items.length;
            } else {
              new_pos = Math.max(0, Math.min(self2.items.length, new_pos));
              if (new_pos != self2.caretPos && !self2.isPending) {
                self2.controlChildren().forEach((child, j) => {
                  if (j < new_pos) {
                    self2.control_input.insertAdjacentElement("beforebegin", child);
                  } else {
                    self2.control.appendChild(child);
                  }
                });
              }
            }
            self2.caretPos = new_pos;
          });
          self2.hook("instead", "moveCaret", (direction) => {
            if (!self2.isFocused)
              return;
            const last_active = self2.getLastActive(direction);
            if (last_active) {
              const idx = nodeIndex(last_active);
              self2.setCaret(direction > 0 ? idx + 1 : idx);
              self2.setActiveItem();
              removeClasses(last_active, "last-active");
            } else {
              self2.setCaret(self2.caretPos + direction);
            }
          });
        }
        function dropdown_input() {
          const self2 = this;
          self2.settings.shouldOpen = true;
          self2.hook("before", "setup", () => {
            self2.focus_node = self2.control;
            addClasses(self2.control_input, "dropdown-input");
            const div = getDom('<div class="dropdown-input-wrap">');
            div.append(self2.control_input);
            self2.dropdown.insertBefore(div, self2.dropdown.firstChild);
            const placeholder = getDom('<input class="items-placeholder" tabindex="-1" />');
            placeholder.placeholder = self2.settings.placeholder || "";
            self2.control.append(placeholder);
          });
          self2.on("initialize", () => {
            self2.control_input.addEventListener("keydown", (evt) => {
              switch (evt.keyCode) {
                case KEY_ESC:
                  if (self2.isOpen) {
                    preventDefault(evt, true);
                    self2.close();
                  }
                  self2.clearActiveItems();
                  return;
                case KEY_TAB:
                  self2.focus_node.tabIndex = -1;
                  break;
              }
              return self2.onKeyDown.call(self2, evt);
            });
            self2.on("blur", () => {
              self2.focus_node.tabIndex = self2.isDisabled ? -1 : self2.tabIndex;
            });
            self2.on("dropdown_open", () => {
              self2.control_input.focus();
            });
            const orig_onBlur = self2.onBlur;
            self2.hook("instead", "onBlur", (evt) => {
              if (evt && evt.relatedTarget == self2.control_input)
                return;
              return orig_onBlur.call(self2);
            });
            addEvent(self2.control_input, "blur", () => self2.onBlur());
            self2.hook("before", "close", () => {
              if (!self2.isOpen)
                return;
              self2.focus_node.focus({
                preventScroll: true
              });
            });
          });
        }
        function no_backspace_delete() {
          var self2 = this;
          var orig_deleteSelection = self2.deleteSelection;
          this.hook("instead", "deleteSelection", (evt) => {
            if (self2.activeItems.length) {
              return orig_deleteSelection.call(self2, evt);
            }
            return false;
          });
        }
        function remove_button(userOptions) {
          const options = Object.assign({
            label: "&times;",
            title: "Remove",
            className: "remove",
            append: true
          }, userOptions);
          var self2 = this;
          if (!options.append) {
            return;
          }
          var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + "</a>";
          self2.hook("after", "setupTemplates", () => {
            var orig_render_item = self2.settings.render.item;
            self2.settings.render.item = (data, escape) => {
              var item = getDom(orig_render_item.call(self2, data, escape));
              var close_button = getDom(html);
              item.appendChild(close_button);
              addEvent(close_button, "mousedown", (evt) => {
                preventDefault(evt, true);
              });
              addEvent(close_button, "click", (evt) => {
                preventDefault(evt, true);
                if (self2.isLocked)
                  return;
                if (!self2.shouldDelete([item], evt))
                  return;
                self2.removeItem(item);
                self2.refreshOptions(false);
                self2.inputState();
              });
              return item;
            };
          });
        }
        function restore_on_backspace(userOptions) {
          const self2 = this;
          const options = Object.assign({
            text: (option) => {
              return option[self2.settings.labelField];
            }
          }, userOptions);
          self2.on("item_remove", function(value) {
            if (!self2.isFocused) {
              return;
            }
            if (self2.control_input.value.trim() === "") {
              var option = self2.options[value];
              if (option) {
                self2.setTextboxValue(options.text.call(self2, option));
              }
            }
          });
        }
        TomSelect3.define("caret_position", caret_position);
        TomSelect3.define("dropdown_input", dropdown_input);
        TomSelect3.define("no_backspace_delete", no_backspace_delete);
        TomSelect3.define("remove_button", remove_button);
        TomSelect3.define("restore_on_backspace", restore_on_backspace);
        return TomSelect3;
      });
    }
  });

  // node_modules/bootstrap/dist/js/bootstrap.esm.js
  var Popper = __toESM(require_popper());
  var MAX_UID = 1e6;
  var MILLISECONDS_MULTIPLIER = 1e3;
  var TRANSITION_END = "transitionend";
  var toType = (obj) => {
    if (obj === null || obj === void 0) {
      return `${obj}`;
    }
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  var getUID = (prefix) => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  var getSelector = (element) => {
    let selector = element.getAttribute("data-bs-target");
    if (!selector || selector === "#") {
      let hrefAttr = element.getAttribute("href");
      if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
        return null;
      }
      if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
        hrefAttr = `#${hrefAttr.split("#")[1]}`;
      }
      selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
    }
    return selector;
  };
  var getSelectorFromElement = (element) => {
    const selector = getSelector(element);
    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }
    return null;
  };
  var getElementFromSelector = (element) => {
    const selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };
  var getTransitionDurationFromElement = (element) => {
    if (!element) {
      return 0;
    }
    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }
    transitionDuration = transitionDuration.split(",")[0];
    transitionDelay = transitionDelay.split(",")[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  var triggerTransitionEnd = (element) => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  var isElement = (obj) => {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    if (typeof obj.jquery !== "undefined") {
      obj = obj[0];
    }
    return typeof obj.nodeType !== "undefined";
  };
  var getElement = (obj) => {
    if (isElement(obj)) {
      return obj.jquery ? obj[0] : obj;
    }
    if (typeof obj === "string" && obj.length > 0) {
      return document.querySelector(obj);
    }
    return null;
  };
  var typeCheckConfig = (componentName, config, configTypes) => {
    Object.keys(configTypes).forEach((property) => {
      const expectedTypes = configTypes[property];
      const value = config[property];
      const valueType = value && isElement(value) ? "element" : toType(value);
      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
      }
    });
  };
  var isVisible = (element) => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }
    return getComputedStyle(element).getPropertyValue("visibility") === "visible";
  };
  var isDisabled = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains("disabled")) {
      return true;
    }
    if (typeof element.disabled !== "undefined") {
      return element.disabled;
    }
    return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
  };
  var findShadowRoot = (element) => {
    if (!document.documentElement.attachShadow) {
      return null;
    }
    if (typeof element.getRootNode === "function") {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }
    if (element instanceof ShadowRoot) {
      return element;
    }
    if (!element.parentNode) {
      return null;
    }
    return findShadowRoot(element.parentNode);
  };
  var noop = () => {
  };
  var reflow = (element) => {
    element.offsetHeight;
  };
  var getjQuery = () => {
    const {
      jQuery
    } = window;
    if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
      return jQuery;
    }
    return null;
  };
  var DOMContentLoadedCallbacks = [];
  var onDOMContentLoaded = (callback) => {
    if (document.readyState === "loading") {
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          DOMContentLoadedCallbacks.forEach((callback2) => callback2());
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  var isRTL = () => document.documentElement.dir === "rtl";
  var defineJQueryPlugin = (plugin) => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  var execute = (callback) => {
    if (typeof callback === "function") {
      callback();
    }
  };
  var executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  var getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    let index = list.indexOf(activeElement);
    if (index === -1) {
      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
    }
    const listLength = list.length;
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };
  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {};
  var uidEvent = 1;
  var customEvents = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  };
  var customEventsRegex = /^(mouseenter|mouseleave)/i;
  var nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
  function getUidEvent(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getEvent(element) {
    const uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (let i = domElements.length; i--; ) {
          if (domElements[i] === target) {
            event.delegateTarget = target;
            if (handler.oneOff) {
              EventHandler.off(element, event.type, selector, fn);
            }
            return fn.apply(target, [event]);
          }
        }
      }
      return null;
    };
  }
  function findHandler(events, handler, delegationSelector = null) {
    const uidEventList = Object.keys(events);
    for (let i = 0, len = uidEventList.length; i < len; i++) {
      const event = events[uidEventList[i]];
      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }
    return null;
  }
  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    const delegation = typeof handler === "string";
    const originalHandler = delegation ? delegationFn : handler;
    let typeEvent = getTypeEvent(originalTypeEvent);
    const isNative = nativeEvents.has(typeEvent);
    if (!isNative) {
      typeEvent = originalTypeEvent;
    }
    return [delegation, originalHandler, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    }
    if (customEventsRegex.test(originalTypeEvent)) {
      const wrapFn = (fn2) => {
        return function(event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn2.call(this, event);
          }
        };
      };
      if (delegationFn) {
        delegationFn = wrapFn(delegationFn);
      } else {
        handler = wrapFn(handler);
      }
    }
    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
    const events = getEvent(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }
    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ""));
    const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach((handlerKey) => {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }
  function getTypeEvent(event) {
    event = event.replace(stripNameRegex, "");
    return customEvents[event] || event;
  }
  var EventHandler = {
    on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },
    one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },
    off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== "string" || !element) {
        return;
      }
      const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getEvent(element);
      const isNamespace = originalTypeEvent.startsWith(".");
      if (typeof originalHandler !== "undefined") {
        if (!events || !events[typeEvent]) {
          return;
        }
        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }
      if (isNamespace) {
        Object.keys(events).forEach((elementEvent) => {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }
      const storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach((keyHandlers) => {
        const handlerKey = keyHandlers.replace(stripUidRegex, "");
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },
    trigger(element, event, args) {
      if (typeof event !== "string" || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      const isNative = nativeEvents.has(typeEvent);
      let jQueryEvent;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      let evt = null;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      if (isNative) {
        evt = document.createEvent("HTMLEvents");
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles,
          cancelable: true
        });
      }
      if (typeof args !== "undefined") {
        Object.keys(args).forEach((key) => {
          Object.defineProperty(evt, key, {
            get() {
              return args[key];
            }
          });
        });
      }
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && typeof jQueryEvent !== "undefined") {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  var elementMap = /* @__PURE__ */ new Map();
  var Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, /* @__PURE__ */ new Map());
      }
      const instanceMap = elementMap.get(element);
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };
  var VERSION = "5.1.3";
  var BaseComponent = class {
    constructor(element) {
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }
    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      Object.getOwnPropertyNames(this).forEach((propertyName) => {
        this[propertyName] = null;
      });
    }
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
  };
  var enableDismissTrigger = (component, method = "hide") => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
      if (["A", "AREA"].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      const target = getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target);
      instance[method]();
    });
  };
  var NAME$d = "alert";
  var DATA_KEY$c = "bs.alert";
  var EVENT_KEY$c = `.${DATA_KEY$c}`;
  var EVENT_CLOSE = `close${EVENT_KEY$c}`;
  var EVENT_CLOSED = `closed${EVENT_KEY$c}`;
  var CLASS_NAME_FADE$5 = "fade";
  var CLASS_NAME_SHOW$8 = "show";
  var Alert = class extends BaseComponent {
    static get NAME() {
      return NAME$d;
    }
    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (closeEvent.defaultPrevented) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOW$8);
      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    }
    _destroyElement() {
      this._element.remove();
      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    }
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Alert.getOrCreateInstance(this);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  };
  enableDismissTrigger(Alert, "close");
  defineJQueryPlugin(Alert);
  var NAME$c = "button";
  var DATA_KEY$b = "bs.button";
  var EVENT_KEY$b = `.${DATA_KEY$b}`;
  var DATA_API_KEY$7 = ".data-api";
  var CLASS_NAME_ACTIVE$3 = "active";
  var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  var EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$b}${DATA_API_KEY$7}`;
  var Button = class extends BaseComponent {
    static get NAME() {
      return NAME$c;
    }
    toggle() {
      this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    }
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Button.getOrCreateInstance(this);
        if (config === "toggle") {
          data[config]();
        }
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event) => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });
  defineJQueryPlugin(Button);
  function normalizeData(val) {
    if (val === "true") {
      return true;
    }
    if (val === "false") {
      return false;
    }
    if (val === Number(val).toString()) {
      return Number(val);
    }
    if (val === "" || val === "null") {
      return null;
    }
    return val;
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
  }
  var Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      Object.keys(element.dataset).filter((key) => key.startsWith("bs")).forEach((key) => {
        let pureKey = key.replace(/^bs/, "");
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      });
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    },
    offset(element) {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      };
    },
    position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    }
  };
  var NODE_TEXT = 3;
  var SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter((child) => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode;
      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) {
          parents.push(ancestor);
        }
        ancestor = ancestor.parentNode;
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(", ");
      return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
    }
  };
  var NAME$b = "carousel";
  var DATA_KEY$a = "bs.carousel";
  var EVENT_KEY$a = `.${DATA_KEY$a}`;
  var DATA_API_KEY$6 = ".data-api";
  var ARROW_LEFT_KEY = "ArrowLeft";
  var ARROW_RIGHT_KEY = "ArrowRight";
  var TOUCHEVENT_COMPAT_WAIT = 500;
  var SWIPE_THRESHOLD = 40;
  var Default$a = {
    interval: 5e3,
    keyboard: true,
    slide: false,
    pause: "hover",
    wrap: true,
    touch: true
  };
  var DefaultType$a = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    slide: "(boolean|string)",
    pause: "(string|boolean)",
    wrap: "boolean",
    touch: "boolean"
  };
  var ORDER_NEXT = "next";
  var ORDER_PREV = "prev";
  var DIRECTION_LEFT = "left";
  var DIRECTION_RIGHT = "right";
  var KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
  };
  var EVENT_SLIDE = `slide${EVENT_KEY$a}`;
  var EVENT_SLID = `slid${EVENT_KEY$a}`;
  var EVENT_KEYDOWN = `keydown${EVENT_KEY$a}`;
  var EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$a}`;
  var EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$a}`;
  var EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`;
  var EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`;
  var EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`;
  var EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`;
  var EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`;
  var EVENT_DRAG_START = `dragstart${EVENT_KEY$a}`;
  var EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$a}${DATA_API_KEY$6}`;
  var EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
  var CLASS_NAME_CAROUSEL = "carousel";
  var CLASS_NAME_ACTIVE$2 = "active";
  var CLASS_NAME_SLIDE = "slide";
  var CLASS_NAME_END = "carousel-item-end";
  var CLASS_NAME_START = "carousel-item-start";
  var CLASS_NAME_NEXT = "carousel-item-next";
  var CLASS_NAME_PREV = "carousel-item-prev";
  var CLASS_NAME_POINTER_EVENT = "pointer-event";
  var SELECTOR_ACTIVE$1 = ".active";
  var SELECTOR_ACTIVE_ITEM = ".active.carousel-item";
  var SELECTOR_ITEM = ".carousel-item";
  var SELECTOR_ITEM_IMG = ".carousel-item img";
  var SELECTOR_NEXT_PREV = ".carousel-item-next, .carousel-item-prev";
  var SELECTOR_INDICATORS = ".carousel-indicators";
  var SELECTOR_INDICATOR = "[data-bs-target]";
  var SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
  var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  var POINTER_TYPE_TOUCH = "touch";
  var POINTER_TYPE_PEN = "pen";
  var Carousel = class extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent);
      this._addEventListeners();
    }
    static get Default() {
      return Default$a;
    }
    static get NAME() {
      return NAME$b;
    }
    next() {
      this._slide(ORDER_NEXT);
    }
    nextWhenVisible() {
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
    prev() {
      this._slide(ORDER_PREV);
    }
    pause(event) {
      if (!event) {
        this._isPaused = true;
      }
      if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element);
        this.cycle(true);
      }
      clearInterval(this._interval);
      this._interval = null;
    }
    cycle(event) {
      if (!event) {
        this._isPaused = false;
      }
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
      if (this._config && this._config.interval && !this._isPaused) {
        this._updateInterval();
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    }
    to(index) {
      this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
      const activeIndex = this._getItemIndex(this._activeElement);
      if (index > this._items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }
      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }
      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
      this._slide(order, this._items[index]);
    }
    _getConfig(config) {
      config = {
        ...Default$a,
        ...Manipulator.getDataAttributes(this._element),
        ...typeof config === "object" ? config : {}
      };
      typeCheckConfig(NAME$b, config, DefaultType$a);
      return config;
    }
    _handleSwipe() {
      const absDeltax = Math.abs(this.touchDeltaX);
      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }
      const direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0;
      if (!direction) {
        return;
      }
      this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
    }
    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
      }
      if (this._config.pause === "hover") {
        EventHandler.on(this._element, EVENT_MOUSEENTER, (event) => this.pause(event));
        EventHandler.on(this._element, EVENT_MOUSELEAVE, (event) => this.cycle(event));
      }
      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners();
      }
    }
    _addTouchEventListeners() {
      const hasPointerPenTouch = (event) => {
        return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
      };
      const start3 = (event) => {
        if (hasPointerPenTouch(event)) {
          this.touchStartX = event.clientX;
        } else if (!this._pointerEvent) {
          this.touchStartX = event.touches[0].clientX;
        }
      };
      const move = (event) => {
        this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
      };
      const end = (event) => {
        if (hasPointerPenTouch(event)) {
          this.touchDeltaX = event.clientX - this.touchStartX;
        }
        this._handleSwipe();
        if (this._config.pause === "hover") {
          this.pause();
          if (this.touchTimeout) {
            clearTimeout(this.touchTimeout);
          }
          this.touchTimeout = setTimeout((event2) => this.cycle(event2), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
        }
      };
      SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach((itemImg) => {
        EventHandler.on(itemImg, EVENT_DRAG_START, (event) => event.preventDefault());
      });
      if (this._pointerEvent) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => start3(event));
        EventHandler.on(this._element, EVENT_POINTERUP, (event) => end(event));
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => start3(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, (event) => end(event));
      }
    }
    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        this._slide(direction);
      }
    }
    _getItemIndex(element) {
      this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
      return this._items.indexOf(element);
    }
    _getItemByOrder(order, activeElement) {
      const isNext = order === ORDER_NEXT;
      return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
    }
    _triggerSlideEvent(relatedTarget, eventDirectionName) {
      const targetIndex = this._getItemIndex(relatedTarget);
      const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));
      return EventHandler.trigger(this._element, EVENT_SLIDE, {
        relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
    }
    _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
        activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
        activeIndicator.removeAttribute("aria-current");
        const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);
        for (let i = 0; i < indicators.length; i++) {
          if (Number.parseInt(indicators[i].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(element)) {
            indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
            indicators[i].setAttribute("aria-current", "true");
            break;
          }
        }
      }
    }
    _updateInterval() {
      const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
      if (!element) {
        return;
      }
      const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = elementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    }
    _slide(directionOrOrder, element) {
      const order = this._directionToOrder(directionOrOrder);
      const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
      const activeElementIndex = this._getItemIndex(activeElement);
      const nextElement = element || this._getItemByOrder(order, activeElement);
      const nextElementIndex = this._getItemIndex(nextElement);
      const isCycling = Boolean(this._interval);
      const isNext = order === ORDER_NEXT;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      const eventDirectionName = this._orderToDirection(order);
      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
        this._isSliding = false;
        return;
      }
      if (this._isSliding) {
        return;
      }
      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        return;
      }
      this._isSliding = true;
      if (isCycling) {
        this.pause();
      }
      this._setActiveIndicatorElement(nextElement);
      this._activeElement = nextElement;
      const triggerSlidEvent = () => {
        EventHandler.trigger(this._element, EVENT_SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
      };
      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);
        const completeCallBack = () => {
          nextElement.classList.remove(directionalClassName, orderClassName);
          nextElement.classList.add(CLASS_NAME_ACTIVE$2);
          activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
          this._isSliding = false;
          setTimeout(triggerSlidEvent, 0);
        };
        this._queueCallback(completeCallBack, activeElement, true);
      } else {
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        this._isSliding = false;
        triggerSlidEvent();
      }
      if (isCycling) {
        this.cycle();
      }
    }
    _directionToOrder(direction) {
      if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
        return direction;
      }
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
    _orderToDirection(order) {
      if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
        return order;
      }
      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    }
    static carouselInterface(element, config) {
      const data = Carousel.getOrCreateInstance(element, config);
      let {
        _config
      } = data;
      if (typeof config === "object") {
        _config = {
          ..._config,
          ...config
        };
      }
      const action = typeof config === "string" ? config : _config.slide;
      if (typeof config === "number") {
        data.to(config);
      } else if (typeof action === "string") {
        if (typeof data[action] === "undefined") {
          throw new TypeError(`No method named "${action}"`);
        }
        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    }
    static jQueryInterface(config) {
      return this.each(function() {
        Carousel.carouselInterface(this, config);
      });
    }
    static dataApiClickHandler(event) {
      const target = getElementFromSelector(this);
      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return;
      }
      const config = {
        ...Manipulator.getDataAttributes(target),
        ...Manipulator.getDataAttributes(this)
      };
      const slideIndex = this.getAttribute("data-bs-slide-to");
      if (slideIndex) {
        config.interval = false;
      }
      Carousel.carouselInterface(target, config);
      if (slideIndex) {
        Carousel.getInstance(target).to(slideIndex);
      }
      event.preventDefault();
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (let i = 0, len = carousels.length; i < len; i++) {
      Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
    }
  });
  defineJQueryPlugin(Carousel);
  var NAME$a = "collapse";
  var DATA_KEY$9 = "bs.collapse";
  var EVENT_KEY$9 = `.${DATA_KEY$9}`;
  var DATA_API_KEY$5 = ".data-api";
  var Default$9 = {
    toggle: true,
    parent: null
  };
  var DefaultType$9 = {
    toggle: "boolean",
    parent: "(null|element)"
  };
  var EVENT_SHOW$5 = `show${EVENT_KEY$9}`;
  var EVENT_SHOWN$5 = `shown${EVENT_KEY$9}`;
  var EVENT_HIDE$5 = `hide${EVENT_KEY$9}`;
  var EVENT_HIDDEN$5 = `hidden${EVENT_KEY$9}`;
  var EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$9}${DATA_API_KEY$5}`;
  var CLASS_NAME_SHOW$7 = "show";
  var CLASS_NAME_COLLAPSE = "collapse";
  var CLASS_NAME_COLLAPSING = "collapsing";
  var CLASS_NAME_COLLAPSED = "collapsed";
  var CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  var CLASS_NAME_HORIZONTAL = "collapse-horizontal";
  var WIDTH = "width";
  var HEIGHT = "height";
  var SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
  var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  var Collapse = class extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._isTransitioning = false;
      this._config = this._getConfig(config);
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
      for (let i = 0, len = toggleList.length; i < len; i++) {
        const elem = toggleList[i];
        const selector = getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter((foundElem) => foundElem === this._element);
        if (selector !== null && filterElement.length) {
          this._selector = selector;
          this._triggerArray.push(elem);
        }
      }
      this._initializeChildren();
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }
    static get Default() {
      return Default$9;
    }
    static get NAME() {
      return NAME$a;
    }
    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      let actives = [];
      let activesData;
      if (this._config.parent) {
        const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter((elem) => !children.includes(elem));
      }
      const container = SelectorEngine.findOne(this._selector);
      if (actives.length) {
        const tempActiveData = actives.find((elem) => container !== elem);
        activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);
      if (startEvent.defaultPrevented) {
        return;
      }
      actives.forEach((elemActive) => {
        if (container !== elemActive) {
          Collapse.getOrCreateInstance(elemActive, {
            toggle: false
          }).hide();
        }
        if (!activesData) {
          Data.set(elemActive, DATA_KEY$9, null);
        }
      });
      const dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
        this._element.style[dimension] = "";
        EventHandler.trigger(this._element, EVENT_SHOWN$5);
      };
      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);
      if (startEvent.defaultPrevented) {
        return;
      }
      const dimension = this._getDimension();
      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      const triggerArrayLength = this._triggerArray.length;
      for (let i = 0; i < triggerArrayLength; i++) {
        const trigger = this._triggerArray[i];
        const elem = getElementFromSelector(trigger);
        if (elem && !this._isShown(elem)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(this._element, EVENT_HIDDEN$5);
      };
      this._element.style[dimension] = "";
      this._queueCallback(complete, this._element, true);
    }
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    }
    _getConfig(config) {
      config = {
        ...Default$9,
        ...Manipulator.getDataAttributes(this._element),
        ...config
      };
      config.toggle = Boolean(config.toggle);
      config.parent = getElement(config.parent);
      typeCheckConfig(NAME$a, config, DefaultType$9);
      return config;
    }
    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter((elem) => !children.includes(elem)).forEach((element) => {
        const selected = getElementFromSelector(element);
        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      });
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      triggerArray.forEach((elem) => {
        if (isOpen) {
          elem.classList.remove(CLASS_NAME_COLLAPSED);
        } else {
          elem.classList.add(CLASS_NAME_COLLAPSED);
        }
        elem.setAttribute("aria-expanded", isOpen);
      });
    }
    static jQueryInterface(config) {
      return this.each(function() {
        const _config = {};
        if (typeof config === "string" && /show|hide/.test(config)) {
          _config.toggle = false;
        }
        const data = Collapse.getOrCreateInstance(this, _config);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function(event) {
    if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
      event.preventDefault();
    }
    const selector = getSelectorFromElement(this);
    const selectorElements = SelectorEngine.find(selector);
    selectorElements.forEach((element) => {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    });
  });
  defineJQueryPlugin(Collapse);
  var NAME$9 = "dropdown";
  var DATA_KEY$8 = "bs.dropdown";
  var EVENT_KEY$8 = `.${DATA_KEY$8}`;
  var DATA_API_KEY$4 = ".data-api";
  var ESCAPE_KEY$2 = "Escape";
  var SPACE_KEY = "Space";
  var TAB_KEY$1 = "Tab";
  var ARROW_UP_KEY = "ArrowUp";
  var ARROW_DOWN_KEY = "ArrowDown";
  var RIGHT_MOUSE_BUTTON = 2;
  var REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
  var EVENT_HIDE$4 = `hide${EVENT_KEY$8}`;
  var EVENT_HIDDEN$4 = `hidden${EVENT_KEY$8}`;
  var EVENT_SHOW$4 = `show${EVENT_KEY$8}`;
  var EVENT_SHOWN$4 = `shown${EVENT_KEY$8}`;
  var EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$8}${DATA_API_KEY$4}`;
  var EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$8}${DATA_API_KEY$4}`;
  var EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$8}${DATA_API_KEY$4}`;
  var CLASS_NAME_SHOW$6 = "show";
  var CLASS_NAME_DROPUP = "dropup";
  var CLASS_NAME_DROPEND = "dropend";
  var CLASS_NAME_DROPSTART = "dropstart";
  var CLASS_NAME_NAVBAR = "navbar";
  var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
  var SELECTOR_MENU = ".dropdown-menu";
  var SELECTOR_NAVBAR_NAV = ".navbar-nav";
  var SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
  var PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
  var PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
  var PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
  var PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
  var PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
  var PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
  var Default$8 = {
    offset: [0, 2],
    boundary: "clippingParents",
    reference: "toggle",
    display: "dynamic",
    popperConfig: null,
    autoClose: true
  };
  var DefaultType$8 = {
    offset: "(array|string|function)",
    boundary: "(string|element)",
    reference: "(string|element|object)",
    display: "string",
    popperConfig: "(null|object|function)",
    autoClose: "(boolean|string)"
  };
  var Dropdown = class extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();
    }
    static get Default() {
      return Default$8;
    }
    static get DefaultType() {
      return DefaultType$8;
    }
    static get NAME() {
      return NAME$9;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (isDisabled(this._element) || this._isShown(this._menu)) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      const parent = Dropdown.getParentFromElement(this._element);
      if (this._inNavbar) {
        Manipulator.setDataAttribute(this._menu, "popper", "none");
      } else {
        this._createPopper(parent);
      }
      if ("ontouchstart" in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
        [].concat(...document.body.children).forEach((elem) => EventHandler.on(elem, "mouseover", noop));
      }
      this._element.focus();
      this._element.setAttribute("aria-expanded", true);
      this._menu.classList.add(CLASS_NAME_SHOW$6);
      this._element.classList.add(CLASS_NAME_SHOW$6);
      EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown(this._menu)) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }
    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }
      if ("ontouchstart" in document.documentElement) {
        [].concat(...document.body.children).forEach((elem) => EventHandler.off(elem, "mouseover", noop));
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW$6);
      this._element.classList.remove(CLASS_NAME_SHOW$6);
      this._element.setAttribute("aria-expanded", "false");
      Manipulator.removeDataAttribute(this._menu, "popper");
      EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
    }
    _getConfig(config) {
      config = {
        ...this.constructor.Default,
        ...Manipulator.getDataAttributes(this._element),
        ...config
      };
      typeCheckConfig(NAME$9, config, this.constructor.DefaultType);
      if (typeof config.reference === "object" && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
        throw new TypeError(`${NAME$9.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }
      return config;
    }
    _createPopper(parent) {
      if (typeof Popper === "undefined") {
        throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
      }
      let referenceElement = this._element;
      if (this._config.reference === "parent") {
        referenceElement = parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === "object") {
        referenceElement = this._config.reference;
      }
      const popperConfig = this._getPopperConfig();
      const isDisplayStatic = popperConfig.modifiers.find((modifier) => modifier.name === "applyStyles" && modifier.enabled === false);
      this._popper = Popper.createPopper(referenceElement, this._menu, popperConfig);
      if (isDisplayStatic) {
        Manipulator.setDataAttribute(this._menu, "popper", "static");
      }
    }
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$6);
    }
    _getMenuElement() {
      return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
    }
    _getPlacement() {
      const parentDropdown = this._element.parentNode;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
    _detectNavbar() {
      return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === "string") {
        return offset.split(",").map((val) => Number.parseInt(val, 10));
      }
      if (typeof offset === "function") {
        return (popperData) => offset(popperData, this._element);
      }
      return offset;
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }]
      };
      if (this._config.display === "static") {
        defaultBsPopperConfig.modifiers = [{
          name: "applyStyles",
          enabled: false
        }];
      }
      return {
        ...defaultBsPopperConfig,
        ...typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig
      };
    }
    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);
      if (!items.length) {
        return;
      }
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
    }
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
    static clearMenus(event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY$1)) {
        return;
      }
      const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);
      for (let i = 0, len = toggles.length; i < len; i++) {
        const context = Dropdown.getInstance(toggles[i]);
        if (!context || context._config.autoClose === false) {
          continue;
        }
        if (!context._isShown()) {
          continue;
        }
        const relatedTarget = {
          relatedTarget: context._element
        };
        if (event) {
          const composedPath = event.composedPath();
          const isMenuTarget = composedPath.includes(context._menu);
          if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
            continue;
          }
          if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
            continue;
          }
          if (event.type === "click") {
            relatedTarget.clickEvent = event;
          }
        }
        context._completeHide(relatedTarget);
      }
    }
    static getParentFromElement(element) {
      return getElementFromSelector(element) || element.parentNode;
    }
    static dataApiKeydownHandler(event) {
      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
        return;
      }
      const isActive = this.classList.contains(CLASS_NAME_SHOW$6);
      if (!isActive && event.key === ESCAPE_KEY$2) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (isDisabled(this)) {
        return;
      }
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
      const instance = Dropdown.getOrCreateInstance(getToggleButton);
      if (event.key === ESCAPE_KEY$2) {
        instance.hide();
        return;
      }
      if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
        if (!isActive) {
          instance.show();
        }
        instance._selectMenuItem(event);
        return;
      }
      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus();
      }
    }
  };
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function(event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });
  defineJQueryPlugin(Dropdown);
  var SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
  var SELECTOR_STICKY_CONTENT = ".sticky-top";
  var ScrollBarHelper = class {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
    hide() {
      const width = this.getWidth();
      this._disableOverFlow();
      this._setElementAttributes(this._element, "paddingRight", (calculatedValue) => calculatedValue + width);
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight", (calculatedValue) => calculatedValue + width);
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight", (calculatedValue) => calculatedValue - width);
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow");
      this._element.style.overflow = "hidden";
    }
    _setElementAttributes(selector, styleProp, callback) {
      const scrollbarWidth = this.getWidth();
      const manipulationCallBack = (element) => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        this._saveInitialAttribute(element, styleProp);
        const calculatedValue = window.getComputedStyle(element)[styleProp];
        element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow");
      this._resetElementAttributes(this._element, "paddingRight");
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight");
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight");
    }
    _saveInitialAttribute(element, styleProp) {
      const actualValue = element.style[styleProp];
      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProp, actualValue);
      }
    }
    _resetElementAttributes(selector, styleProp) {
      const manipulationCallBack = (element) => {
        const value = Manipulator.getDataAttribute(element, styleProp);
        if (typeof value === "undefined") {
          element.style.removeProperty(styleProp);
        } else {
          Manipulator.removeDataAttribute(element, styleProp);
          element.style[styleProp] = value;
        }
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
      } else {
        SelectorEngine.find(selector, this._element).forEach(callBack);
      }
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
  };
  var Default$7 = {
    className: "modal-backdrop",
    isVisible: true,
    isAnimated: false,
    rootElement: "body",
    clickCallback: null
  };
  var DefaultType$7 = {
    className: "string",
    isVisible: "boolean",
    isAnimated: "boolean",
    rootElement: "(element|string)",
    clickCallback: "(function|null)"
  };
  var NAME$8 = "backdrop";
  var CLASS_NAME_FADE$4 = "fade";
  var CLASS_NAME_SHOW$5 = "show";
  var EVENT_MOUSEDOWN = `mousedown.bs.${NAME$8}`;
  var Backdrop = class {
    constructor(config) {
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }
    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      if (this._config.isAnimated) {
        reflow(this._getElement());
      }
      this._getElement().classList.add(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        execute(callback);
      });
    }
    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement("div");
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }
        this._element = backdrop;
      }
      return this._element;
    }
    _getConfig(config) {
      config = {
        ...Default$7,
        ...typeof config === "object" ? config : {}
      };
      config.rootElement = getElement(config.rootElement);
      typeCheckConfig(NAME$8, config, DefaultType$7);
      return config;
    }
    _append() {
      if (this._isAppended) {
        return;
      }
      this._config.rootElement.append(this._getElement());
      EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }
    dispose() {
      if (!this._isAppended) {
        return;
      }
      EventHandler.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }
    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  };
  var Default$6 = {
    trapElement: null,
    autofocus: true
  };
  var DefaultType$6 = {
    trapElement: "element",
    autofocus: "boolean"
  };
  var NAME$7 = "focustrap";
  var DATA_KEY$7 = "bs.focustrap";
  var EVENT_KEY$7 = `.${DATA_KEY$7}`;
  var EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$7}`;
  var EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$7}`;
  var TAB_KEY = "Tab";
  var TAB_NAV_FORWARD = "forward";
  var TAB_NAV_BACKWARD = "backward";
  var FocusTrap = class {
    constructor(config) {
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }
    activate() {
      const {
        trapElement,
        autofocus
      } = this._config;
      if (this._isActive) {
        return;
      }
      if (autofocus) {
        trapElement.focus();
      }
      EventHandler.off(document, EVENT_KEY$7);
      EventHandler.on(document, EVENT_FOCUSIN$1, (event) => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
      this._isActive = true;
    }
    deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$7);
    }
    _handleFocusin(event) {
      const {
        target
      } = event;
      const {
        trapElement
      } = this._config;
      if (target === document || target === trapElement || trapElement.contains(target)) {
        return;
      }
      const elements = SelectorEngine.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
    _getConfig(config) {
      config = {
        ...Default$6,
        ...typeof config === "object" ? config : {}
      };
      typeCheckConfig(NAME$7, config, DefaultType$6);
      return config;
    }
  };
  var NAME$6 = "modal";
  var DATA_KEY$6 = "bs.modal";
  var EVENT_KEY$6 = `.${DATA_KEY$6}`;
  var DATA_API_KEY$3 = ".data-api";
  var ESCAPE_KEY$1 = "Escape";
  var Default$5 = {
    backdrop: true,
    keyboard: true,
    focus: true
  };
  var DefaultType$5 = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    focus: "boolean"
  };
  var EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
  var EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
  var EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
  var EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
  var EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
  var EVENT_RESIZE = `resize${EVENT_KEY$6}`;
  var EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$6}`;
  var EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
  var EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
  var EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
  var EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  var CLASS_NAME_OPEN = "modal-open";
  var CLASS_NAME_FADE$3 = "fade";
  var CLASS_NAME_SHOW$4 = "show";
  var CLASS_NAME_STATIC = "modal-static";
  var OPEN_SELECTOR$1 = ".modal.show";
  var SELECTOR_DIALOG = ".modal-dialog";
  var SELECTOR_MODAL_BODY = ".modal-body";
  var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  var Modal = class extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
    }
    static get Default() {
      return Default$5;
    }
    static get NAME() {
      return NAME$6;
    }
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      if (this._isAnimated()) {
        this._isTransitioning = true;
      }
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._setEscapeEvent();
      this._setResizeEvent();
      EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
        EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, (event) => {
          if (event.target === this._element) {
            this._ignoreBackdropClick = true;
          }
        });
      });
      this._showBackdrop(() => this._showElement(relatedTarget));
    }
    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      const isAnimated = this._isAnimated();
      if (isAnimated) {
        this._isTransitioning = true;
      }
      this._setEscapeEvent();
      this._setResizeEvent();
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW$4);
      EventHandler.off(this._element, EVENT_CLICK_DISMISS);
      EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
      this._queueCallback(() => this._hideModal(), this._element, isAnimated);
    }
    dispose() {
      [window, this._dialog].forEach((htmlElement) => EventHandler.off(htmlElement, EVENT_KEY$6));
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        isAnimated: this._isAnimated()
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _getConfig(config) {
      config = {
        ...Default$5,
        ...Manipulator.getDataAttributes(this._element),
        ...typeof config === "object" ? config : {}
      };
      typeCheckConfig(NAME$6, config, DefaultType$5);
      return config;
    }
    _showElement(relatedTarget) {
      const isAnimated = this._isAnimated();
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        document.body.append(this._element);
      }
      this._element.style.display = "block";
      this._element.removeAttribute("aria-hidden");
      this._element.setAttribute("aria-modal", true);
      this._element.setAttribute("role", "dialog");
      this._element.scrollTop = 0;
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      if (isAnimated) {
        reflow(this._element);
      }
      this._element.classList.add(CLASS_NAME_SHOW$4);
      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }
        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, isAnimated);
    }
    _setEscapeEvent() {
      if (this._isShown) {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
          if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
            event.preventDefault();
            this.hide();
          } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
            this._triggerBackdropTransition();
          }
        });
      } else {
        EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
      }
    }
    _setResizeEvent() {
      if (this._isShown) {
        EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
      } else {
        EventHandler.off(window, EVENT_RESIZE);
      }
    }
    _hideModal() {
      this._element.style.display = "none";
      this._element.setAttribute("aria-hidden", true);
      this._element.removeAttribute("aria-modal");
      this._element.removeAttribute("role");
      this._isTransitioning = false;
      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._scrollBar.reset();
        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      });
    }
    _showBackdrop(callback) {
      EventHandler.on(this._element, EVENT_CLICK_DISMISS, (event) => {
        if (this._ignoreBackdropClick) {
          this._ignoreBackdropClick = false;
          return;
        }
        if (event.target !== event.currentTarget) {
          return;
        }
        if (this._config.backdrop === true) {
          this.hide();
        } else if (this._config.backdrop === "static") {
          this._triggerBackdropTransition();
        }
      });
      this._backdrop.show(callback);
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }
    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const {
        classList,
        scrollHeight,
        style
      } = this._element;
      const isModalOverflowing = scrollHeight > document.documentElement.clientHeight;
      if (!isModalOverflowing && style.overflowY === "hidden" || classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        style.overflowY = "hidden";
      }
      classList.add(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        classList.remove(CLASS_NAME_STATIC);
        if (!isModalOverflowing) {
          this._queueCallback(() => {
            style.overflowY = "";
          }, this._dialog);
        }
      }, this._dialog);
      this._element.focus();
    }
    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const scrollbarWidth = this._scrollBar.getWidth();
      const isBodyOverflowing = scrollbarWidth > 0;
      if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
        this._element.style.paddingLeft = `${scrollbarWidth}px`;
      }
      if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
        this._element.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = "";
      this._element.style.paddingRight = "";
    }
    static jQueryInterface(config, relatedTarget) {
      return this.each(function() {
        const data = Modal.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](relatedTarget);
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function(event) {
    const target = getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    EventHandler.one(target, EVENT_SHOW$3, (showEvent) => {
      if (showEvent.defaultPrevented) {
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN$3, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    });
    const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
    if (allReadyOpen) {
      Modal.getInstance(allReadyOpen).hide();
    }
    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);
  defineJQueryPlugin(Modal);
  var NAME$5 = "offcanvas";
  var DATA_KEY$5 = "bs.offcanvas";
  var EVENT_KEY$5 = `.${DATA_KEY$5}`;
  var DATA_API_KEY$2 = ".data-api";
  var EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
  var ESCAPE_KEY = "Escape";
  var Default$4 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  var DefaultType$4 = {
    backdrop: "boolean",
    keyboard: "boolean",
    scroll: "boolean"
  };
  var CLASS_NAME_SHOW$3 = "show";
  var CLASS_NAME_BACKDROP = "offcanvas-backdrop";
  var OPEN_SELECTOR = ".offcanvas.show";
  var EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
  var EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
  var EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
  var EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
  var EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
  var EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
  var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  var Offcanvas = class extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._addEventListeners();
    }
    static get NAME() {
      return NAME$5;
    }
    static get Default() {
      return Default$4;
    }
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._element.style.visibility = "visible";
      this._backdrop.show();
      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }
      this._element.removeAttribute("aria-hidden");
      this._element.setAttribute("aria-modal", true);
      this._element.setAttribute("role", "dialog");
      this._element.classList.add(CLASS_NAME_SHOW$3);
      const completeCallBack = () => {
        if (!this._config.scroll) {
          this._focustrap.activate();
        }
        EventHandler.trigger(this._element, EVENT_SHOWN$2, {
          relatedTarget
        });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
    hide() {
      if (!this._isShown) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.remove(CLASS_NAME_SHOW$3);
      this._backdrop.hide();
      const completeCallback = () => {
        this._element.setAttribute("aria-hidden", true);
        this._element.removeAttribute("aria-modal");
        this._element.removeAttribute("role");
        this._element.style.visibility = "hidden";
        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }
        EventHandler.trigger(this._element, EVENT_HIDDEN$2);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
    dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    _getConfig(config) {
      config = {
        ...Default$4,
        ...Manipulator.getDataAttributes(this._element),
        ...typeof config === "object" ? config : {}
      };
      typeCheckConfig(NAME$5, config, DefaultType$4);
      return config;
    }
    _initializeBackDrop() {
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible: this._config.backdrop,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: () => this.hide()
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
        if (this._config.keyboard && event.key === ESCAPE_KEY) {
          this.hide();
        }
      });
    }
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function(event) {
    const target = getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$2, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
    const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (allReadyOpen && allReadyOpen !== target) {
      Offcanvas.getInstance(allReadyOpen).hide();
    }
    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => SelectorEngine.find(OPEN_SELECTOR).forEach((el) => Offcanvas.getOrCreateInstance(el).show()));
  enableDismissTrigger(Offcanvas);
  defineJQueryPlugin(Offcanvas);
  var uriAttributes = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
  var allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();
    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
      }
      return true;
    }
    const regExp = allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp);
    for (let i = 0, len = regExp.length; i < len; i++) {
      if (regExp[i].test(attributeName)) {
        return true;
      }
    }
    return false;
  };
  var DefaultAllowlist = {
    "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }
    if (sanitizeFn && typeof sanitizeFn === "function") {
      return sanitizeFn(unsafeHtml);
    }
    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
    const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
    for (let i = 0, len = elements.length; i < len; i++) {
      const element = elements[i];
      const elementName = element.nodeName.toLowerCase();
      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }
      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
      attributeList.forEach((attribute) => {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      });
    }
    return createdDocument.body.innerHTML;
  }
  var NAME$4 = "tooltip";
  var DATA_KEY$4 = "bs.tooltip";
  var EVENT_KEY$4 = `.${DATA_KEY$4}`;
  var CLASS_PREFIX$1 = "bs-tooltip";
  var DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]);
  var DefaultType$3 = {
    animation: "boolean",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
    delay: "(number|object)",
    html: "boolean",
    selector: "(string|boolean)",
    placement: "(string|function)",
    offset: "(array|string|function)",
    container: "(string|element|boolean)",
    fallbackPlacements: "array",
    boundary: "(string|element)",
    customClass: "(string|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    allowList: "object",
    popperConfig: "(null|object|function)"
  };
  var AttachmentMap = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: isRTL() ? "left" : "right",
    BOTTOM: "bottom",
    LEFT: isRTL() ? "right" : "left"
  };
  var Default$3 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: false,
    selector: false,
    placement: "top",
    offset: [0, 0],
    container: false,
    fallbackPlacements: ["top", "right", "bottom", "left"],
    boundary: "clippingParents",
    customClass: "",
    sanitize: true,
    sanitizeFn: null,
    allowList: DefaultAllowlist,
    popperConfig: null
  };
  var Event$2 = {
    HIDE: `hide${EVENT_KEY$4}`,
    HIDDEN: `hidden${EVENT_KEY$4}`,
    SHOW: `show${EVENT_KEY$4}`,
    SHOWN: `shown${EVENT_KEY$4}`,
    INSERTED: `inserted${EVENT_KEY$4}`,
    CLICK: `click${EVENT_KEY$4}`,
    FOCUSIN: `focusin${EVENT_KEY$4}`,
    FOCUSOUT: `focusout${EVENT_KEY$4}`,
    MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
    MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
  };
  var CLASS_NAME_FADE$2 = "fade";
  var CLASS_NAME_MODAL = "modal";
  var CLASS_NAME_SHOW$2 = "show";
  var HOVER_STATE_SHOW = "show";
  var HOVER_STATE_OUT = "out";
  var SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
  var SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  var EVENT_MODAL_HIDE = "hide.bs.modal";
  var TRIGGER_HOVER = "hover";
  var TRIGGER_FOCUS = "focus";
  var TRIGGER_CLICK = "click";
  var TRIGGER_MANUAL = "manual";
  var Tooltip = class extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper === "undefined") {
        throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
      }
      super(element);
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = "";
      this._activeTrigger = {};
      this._popper = null;
      this._config = this._getConfig(config);
      this.tip = null;
      this._setListeners();
    }
    static get Default() {
      return Default$3;
    }
    static get NAME() {
      return NAME$4;
    }
    static get Event() {
      return Event$2;
    }
    static get DefaultType() {
      return DefaultType$3;
    }
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle(event) {
      if (!this._isEnabled) {
        return;
      }
      if (event) {
        const context = this._initializeOnDelegatedTarget(event);
        context._activeTrigger.click = !context._activeTrigger.click;
        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$2)) {
          this._leave(null, this);
          return;
        }
        this._enter(null, this);
      }
    }
    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this.tip) {
        this.tip.remove();
      }
      this._disposePopper();
      super.dispose();
    }
    show() {
      if (this._element.style.display === "none") {
        throw new Error("Please use show on visible elements");
      }
      if (!(this.isWithContent() && this._isEnabled)) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }
      if (this.constructor.NAME === "tooltip" && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
        this._disposePopper();
        this.tip.remove();
        this.tip = null;
      }
      const tip = this.getTipElement();
      const tipId = getUID(this.constructor.NAME);
      tip.setAttribute("id", tipId);
      this._element.setAttribute("aria-describedby", tipId);
      if (this._config.animation) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }
      const placement = typeof this._config.placement === "function" ? this._config.placement.call(this, tip, this._element) : this._config.placement;
      const attachment = this._getAttachment(placement);
      this._addAttachmentClass(attachment);
      const {
        container
      } = this._config;
      Data.set(tip, this.constructor.DATA_KEY, this);
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
      }
      if (this._popper) {
        this._popper.update();
      } else {
        this._popper = Popper.createPopper(this._element, tip, this._getPopperConfig(attachment));
      }
      tip.classList.add(CLASS_NAME_SHOW$2);
      const customClass = this._resolvePossibleFunction(this._config.customClass);
      if (customClass) {
        tip.classList.add(...customClass.split(" "));
      }
      if ("ontouchstart" in document.documentElement) {
        [].concat(...document.body.children).forEach((element) => {
          EventHandler.on(element, "mouseover", noop);
        });
      }
      const complete = () => {
        const prevHoverState = this._hoverState;
        this._hoverState = null;
        EventHandler.trigger(this._element, this.constructor.Event.SHOWN);
        if (prevHoverState === HOVER_STATE_OUT) {
          this._leave(null, this);
        }
      };
      const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);
      this._queueCallback(complete, this.tip, isAnimated);
    }
    hide() {
      if (!this._popper) {
        return;
      }
      const tip = this.getTipElement();
      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }
        if (this._hoverState !== HOVER_STATE_SHOW) {
          tip.remove();
        }
        this._cleanTipClass();
        this._element.removeAttribute("aria-describedby");
        EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);
        this._disposePopper();
      };
      const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      tip.classList.remove(CLASS_NAME_SHOW$2);
      if ("ontouchstart" in document.documentElement) {
        [].concat(...document.body.children).forEach((element) => EventHandler.off(element, "mouseover", noop));
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);
      this._queueCallback(complete, this.tip, isAnimated);
      this._hoverState = "";
    }
    update() {
      if (this._popper !== null) {
        this._popper.update();
      }
    }
    isWithContent() {
      return Boolean(this.getTitle());
    }
    getTipElement() {
      if (this.tip) {
        return this.tip;
      }
      const element = document.createElement("div");
      element.innerHTML = this._config.template;
      const tip = element.children[0];
      this.setContent(tip);
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      this.tip = tip;
      return this.tip;
    }
    setContent(tip) {
      this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
    }
    _sanitizeAndSetContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);
      if (!content && templateElement) {
        templateElement.remove();
        return;
      }
      this.setElementContent(templateElement, content);
    }
    setElementContent(element, content) {
      if (element === null) {
        return;
      }
      if (isElement(content)) {
        content = getElement(content);
        if (this._config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = "";
            element.append(content);
          }
        } else {
          element.textContent = content.textContent;
        }
        return;
      }
      if (this._config.html) {
        if (this._config.sanitize) {
          content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
        }
        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    }
    getTitle() {
      const title = this._element.getAttribute("data-bs-original-title") || this._config.title;
      return this._resolvePossibleFunction(title);
    }
    updateAttachment(attachment) {
      if (attachment === "right") {
        return "end";
      }
      if (attachment === "left") {
        return "start";
      }
      return attachment;
    }
    _initializeOnDelegatedTarget(event, context) {
      return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === "string") {
        return offset.split(",").map((val) => Number.parseInt(val, 10));
      }
      if (typeof offset === "function") {
        return (popperData) => offset(popperData, this._element);
      }
      return offset;
    }
    _resolvePossibleFunction(content) {
      return typeof content === "function" ? content.call(this._element) : content;
    }
    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: "flip",
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }, {
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: "arrow",
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: "onChange",
          enabled: true,
          phase: "afterWrite",
          fn: (data) => this._handlePopperPlacementChange(data)
        }],
        onFirstUpdate: (data) => {
          if (data.options.placement !== data.placement) {
            this._handlePopperPlacementChange(data);
          }
        }
      };
      return {
        ...defaultBsPopperConfig,
        ...typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig
      };
    }
    _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
    }
    _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    }
    _setListeners() {
      const triggers = this._config.trigger.split(" ");
      triggers.forEach((trigger) => {
        if (trigger === "click") {
          EventHandler.on(this._element, this.constructor.Event.CLICK, this._config.selector, (event) => this.toggle(event));
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
          EventHandler.on(this._element, eventIn, this._config.selector, (event) => this._enter(event));
          EventHandler.on(this._element, eventOut, this._config.selector, (event) => this._leave(event));
        }
      });
      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };
      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._config.selector) {
        this._config = {
          ...this._config,
          trigger: "manual",
          selector: ""
        };
      } else {
        this._fixTitle();
      }
    }
    _fixTitle() {
      const title = this._element.getAttribute("title");
      const originalTitleType = typeof this._element.getAttribute("data-bs-original-title");
      if (title || originalTitleType !== "string") {
        this._element.setAttribute("data-bs-original-title", title || "");
        if (title && !this._element.getAttribute("aria-label") && !this._element.textContent) {
          this._element.setAttribute("aria-label", title);
        }
        this._element.setAttribute("title", "");
      }
    }
    _enter(event, context) {
      context = this._initializeOnDelegatedTarget(event, context);
      if (event) {
        context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }
      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$2) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }
      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;
      if (!context._config.delay || !context._config.delay.show) {
        context.show();
        return;
      }
      context._timeout = setTimeout(() => {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context._config.delay.show);
    }
    _leave(event, context) {
      context = this._initializeOnDelegatedTarget(event, context);
      if (event) {
        context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
      }
      if (context._isWithActiveTrigger()) {
        return;
      }
      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;
      if (!context._config.delay || !context._config.delay.hide) {
        context.hide();
        return;
      }
      context._timeout = setTimeout(() => {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context._config.delay.hide);
    }
    _isWithActiveTrigger() {
      for (const trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }
      return false;
    }
    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);
      Object.keys(dataAttributes).forEach((dataAttr) => {
        if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
          delete dataAttributes[dataAttr];
        }
      });
      config = {
        ...this.constructor.Default,
        ...dataAttributes,
        ...typeof config === "object" && config ? config : {}
      };
      config.container = config.container === false ? document.body : getElement(config.container);
      if (typeof config.delay === "number") {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === "number") {
        config.title = config.title.toString();
      }
      if (typeof config.content === "number") {
        config.content = config.content.toString();
      }
      typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
      }
      return config;
    }
    _getDelegateConfig() {
      const config = {};
      for (const key in this._config) {
        if (this.constructor.Default[key] !== this._config[key]) {
          config[key] = this._config[key];
        }
      }
      return config;
    }
    _cleanTipClass() {
      const tip = this.getTipElement();
      const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g");
      const tabClass = tip.getAttribute("class").match(basicClassPrefixRegex);
      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map((token) => token.trim()).forEach((tClass) => tip.classList.remove(tClass));
      }
    }
    _getBasicClassPrefix() {
      return CLASS_PREFIX$1;
    }
    _handlePopperPlacementChange(popperData) {
      const {
        state
      } = popperData;
      if (!state) {
        return;
      }
      this.tip = state.elements.popper;
      this._cleanTipClass();
      this._addAttachmentClass(this._getAttachment(state.placement));
    }
    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
    }
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Tooltip.getOrCreateInstance(this, config);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  };
  defineJQueryPlugin(Tooltip);
  var NAME$3 = "popover";
  var DATA_KEY$3 = "bs.popover";
  var EVENT_KEY$3 = `.${DATA_KEY$3}`;
  var CLASS_PREFIX = "bs-popover";
  var Default$2 = {
    ...Tooltip.Default,
    placement: "right",
    offset: [0, 8],
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  };
  var DefaultType$2 = {
    ...Tooltip.DefaultType,
    content: "(string|element|function)"
  };
  var Event$1 = {
    HIDE: `hide${EVENT_KEY$3}`,
    HIDDEN: `hidden${EVENT_KEY$3}`,
    SHOW: `show${EVENT_KEY$3}`,
    SHOWN: `shown${EVENT_KEY$3}`,
    INSERTED: `inserted${EVENT_KEY$3}`,
    CLICK: `click${EVENT_KEY$3}`,
    FOCUSIN: `focusin${EVENT_KEY$3}`,
    FOCUSOUT: `focusout${EVENT_KEY$3}`,
    MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
    MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
  };
  var SELECTOR_TITLE = ".popover-header";
  var SELECTOR_CONTENT = ".popover-body";
  var Popover = class extends Tooltip {
    static get Default() {
      return Default$2;
    }
    static get NAME() {
      return NAME$3;
    }
    static get Event() {
      return Event$1;
    }
    static get DefaultType() {
      return DefaultType$2;
    }
    isWithContent() {
      return this.getTitle() || this._getContent();
    }
    setContent(tip) {
      this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);
      this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    _getBasicClassPrefix() {
      return CLASS_PREFIX;
    }
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Popover.getOrCreateInstance(this, config);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  };
  defineJQueryPlugin(Popover);
  var NAME$2 = "scrollspy";
  var DATA_KEY$2 = "bs.scrollspy";
  var EVENT_KEY$2 = `.${DATA_KEY$2}`;
  var DATA_API_KEY$1 = ".data-api";
  var Default$1 = {
    offset: 10,
    method: "auto",
    target: ""
  };
  var DefaultType$1 = {
    offset: "number",
    method: "string",
    target: "(string|element)"
  };
  var EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  var EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
  var EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
  var CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
  var CLASS_NAME_ACTIVE$1 = "active";
  var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP$1 = ".nav, .list-group";
  var SELECTOR_NAV_LINKS = ".nav-link";
  var SELECTOR_NAV_ITEMS = ".nav-item";
  var SELECTOR_LIST_ITEMS = ".list-group-item";
  var SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
  var SELECTOR_DROPDOWN$1 = ".dropdown";
  var SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
  var METHOD_OFFSET = "offset";
  var METHOD_POSITION = "position";
  var ScrollSpy = class extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._scrollElement = this._element.tagName === "BODY" ? window : this._element;
      this._config = this._getConfig(config);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
      this.refresh();
      this._process();
    }
    static get Default() {
      return Default$1;
    }
    static get NAME() {
      return NAME$2;
    }
    refresh() {
      const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      const offsetMethod = this._config.method === "auto" ? autoMethod : this._config.method;
      const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      const targets = SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target);
      targets.map((element) => {
        const targetSelector = getSelectorFromElement(element);
        const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;
        if (target) {
          const targetBCR = target.getBoundingClientRect();
          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }
        return null;
      }).filter((item) => item).sort((a, b) => a[0] - b[0]).forEach((item) => {
        this._offsets.push(item[0]);
        this._targets.push(item[1]);
      });
    }
    dispose() {
      EventHandler.off(this._scrollElement, EVENT_KEY$2);
      super.dispose();
    }
    _getConfig(config) {
      config = {
        ...Default$1,
        ...Manipulator.getDataAttributes(this._element),
        ...typeof config === "object" && config ? config : {}
      };
      config.target = getElement(config.target) || document.documentElement;
      typeCheckConfig(NAME$2, config, DefaultType$1);
      return config;
    }
    _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }
    _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }
    _process() {
      const scrollTop = this._getScrollTop() + this._config.offset;
      const scrollHeight = this._getScrollHeight();
      const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }
      if (scrollTop >= maxScroll) {
        const target = this._targets[this._targets.length - 1];
        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }
      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }
      for (let i = this._offsets.length; i--; ) {
        const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === "undefined" || scrollTop < this._offsets[i + 1]);
        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    }
    _activate(target) {
      this._activeTarget = target;
      this._clear();
      const queries = SELECTOR_LINK_ITEMS.split(",").map((selector) => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
      const link = SelectorEngine.findOne(queries.join(","), this._config.target);
      link.classList.add(CLASS_NAME_ACTIVE$1);
      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
      } else {
        SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach((listGroup) => {
          SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach((item) => item.classList.add(CLASS_NAME_ACTIVE$1));
          SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach((navItem) => {
            SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach((item) => item.classList.add(CLASS_NAME_ACTIVE$1));
          });
        });
      }
      EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
    _clear() {
      SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target).filter((node) => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach((node) => node.classList.remove(CLASS_NAME_ACTIVE$1));
    }
    static jQueryInterface(config) {
      return this.each(function() {
        const data = ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  };
  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    SelectorEngine.find(SELECTOR_DATA_SPY).forEach((spy) => new ScrollSpy(spy));
  });
  defineJQueryPlugin(ScrollSpy);
  var NAME$1 = "tab";
  var DATA_KEY$1 = "bs.tab";
  var EVENT_KEY$1 = `.${DATA_KEY$1}`;
  var DATA_API_KEY = ".data-api";
  var EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  var EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  var EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  var EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  var EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
  var CLASS_NAME_DROPDOWN_MENU = "dropdown-menu";
  var CLASS_NAME_ACTIVE = "active";
  var CLASS_NAME_FADE$1 = "fade";
  var CLASS_NAME_SHOW$1 = "show";
  var SELECTOR_DROPDOWN = ".dropdown";
  var SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
  var SELECTOR_ACTIVE = ".active";
  var SELECTOR_ACTIVE_UL = ":scope > li > .active";
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = ":scope > .dropdown-menu .active";
  var Tab = class extends BaseComponent {
    static get NAME() {
      return NAME$1;
    }
    show() {
      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
        return;
      }
      let previous;
      const target = getElementFromSelector(this._element);
      const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);
      if (listElement) {
        const itemSelector = listElement.nodeName === "UL" || listElement.nodeName === "OL" ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = SelectorEngine.find(itemSelector, listElement);
        previous = previous[previous.length - 1];
      }
      const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
        relatedTarget: this._element
      }) : null;
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
        relatedTarget: previous
      });
      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }
      this._activate(this._element, listElement);
      const complete = () => {
        EventHandler.trigger(previous, EVENT_HIDDEN$1, {
          relatedTarget: this._element
        });
        EventHandler.trigger(this._element, EVENT_SHOWN$1, {
          relatedTarget: previous
        });
      };
      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    }
    _activate(element, container, callback) {
      const activeElements = container && (container.nodeName === "UL" || container.nodeName === "OL") ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
      const active = activeElements[0];
      const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);
      const complete = () => this._transitionComplete(element, active, callback);
      if (active && isTransitioning) {
        active.classList.remove(CLASS_NAME_SHOW$1);
        this._queueCallback(complete, element, true);
      } else {
        complete();
      }
    }
    _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE);
        const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);
        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
        }
        if (active.getAttribute("role") === "tab") {
          active.setAttribute("aria-selected", false);
        }
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      if (element.getAttribute("role") === "tab") {
        element.setAttribute("aria-selected", true);
      }
      reflow(element);
      if (element.classList.contains(CLASS_NAME_FADE$1)) {
        element.classList.add(CLASS_NAME_SHOW$1);
      }
      let parent = element.parentNode;
      if (parent && parent.nodeName === "LI") {
        parent = parent.parentNode;
      }
      if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        const dropdownElement = element.closest(SELECTOR_DROPDOWN);
        if (dropdownElement) {
          SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach((dropdown) => dropdown.classList.add(CLASS_NAME_ACTIVE));
        }
        element.setAttribute("aria-expanded", true);
      }
      if (callback) {
        callback();
      }
    }
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Tab.getOrCreateInstance(this);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    const data = Tab.getOrCreateInstance(this);
    data.show();
  });
  defineJQueryPlugin(Tab);
  var NAME = "toast";
  var DATA_KEY = "bs.toast";
  var EVENT_KEY = `.${DATA_KEY}`;
  var EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  var EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  var EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  var EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  var EVENT_HIDE = `hide${EVENT_KEY}`;
  var EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  var EVENT_SHOW = `show${EVENT_KEY}`;
  var EVENT_SHOWN = `shown${EVENT_KEY}`;
  var CLASS_NAME_FADE = "fade";
  var CLASS_NAME_HIDE = "hide";
  var CLASS_NAME_SHOW = "show";
  var CLASS_NAME_SHOWING = "showing";
  var DefaultType = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number"
  };
  var Default = {
    animation: true,
    autohide: true,
    delay: 5e3
  };
  var Toast = class extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;
      this._setListeners();
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get Default() {
      return Default;
    }
    static get NAME() {
      return NAME;
    }
    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }
      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(this._element, EVENT_SHOWN);
        this._maybeScheduleHide();
      };
      this._element.classList.remove(CLASS_NAME_HIDE);
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW);
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE);
        this._element.classList.remove(CLASS_NAME_SHOWING);
        this._element.classList.remove(CLASS_NAME_SHOW);
        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    dispose() {
      this._clearTimeout();
      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }
      super.dispose();
    }
    _getConfig(config) {
      config = {
        ...Default,
        ...Manipulator.getDataAttributes(this._element),
        ...typeof config === "object" && config ? config : {}
      };
      typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    }
    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }
      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }
      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }
    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = isInteracting;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = isInteracting;
          break;
      }
      if (isInteracting) {
        this._clearTimeout();
        return;
      }
      const nextElement = event.relatedTarget;
      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }
      this._maybeScheduleHide();
    }
    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Toast.getOrCreateInstance(this, config);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](this);
        }
      });
    }
  };
  enableDismissTrigger(Toast);
  defineJQueryPlugin(Toast);

  // node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js
  (function() {
    if (window.Reflect === void 0 || window.customElements === void 0 || window.customElements.polyfillWrapFlushCallback) {
      return;
    }
    const BuiltInHTMLElement = HTMLElement;
    const wrapperForTheName = {
      "HTMLElement": function HTMLElement2() {
        return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
      }
    };
    window.HTMLElement = wrapperForTheName["HTMLElement"];
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
  })();
  (function(prototype) {
    if (typeof prototype.requestSubmit == "function")
      return;
    prototype.requestSubmit = function(submitter) {
      if (submitter) {
        validateSubmitter(submitter, this);
        submitter.click();
      } else {
        submitter = document.createElement("input");
        submitter.type = "submit";
        submitter.hidden = true;
        this.appendChild(submitter);
        submitter.click();
        this.removeChild(submitter);
      }
    };
    function validateSubmitter(submitter, form) {
      submitter instanceof HTMLElement || raise(TypeError, "parameter 1 is not of type 'HTMLElement'");
      submitter.type == "submit" || raise(TypeError, "The specified element is not a submit button");
      submitter.form == form || raise(DOMException, "The specified element is not owned by this form element", "NotFoundError");
    }
    function raise(errorConstructor, message, name) {
      throw new errorConstructor("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + message + ".", name);
    }
  })(HTMLFormElement.prototype);
  var submittersByForm = /* @__PURE__ */ new WeakMap();
  function findSubmitterFromClickTarget(target) {
    const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
    const candidate = element ? element.closest("input, button") : null;
    return (candidate === null || candidate === void 0 ? void 0 : candidate.type) == "submit" ? candidate : null;
  }
  function clickCaptured(event) {
    const submitter = findSubmitterFromClickTarget(event.target);
    if (submitter && submitter.form) {
      submittersByForm.set(submitter.form, submitter);
    }
  }
  (function() {
    if ("submitter" in Event.prototype)
      return;
    let prototype;
    if ("SubmitEvent" in window && /Apple Computer/.test(navigator.vendor)) {
      prototype = window.SubmitEvent.prototype;
    } else if ("SubmitEvent" in window) {
      return;
    } else {
      prototype = window.Event.prototype;
    }
    addEventListener("click", clickCaptured, true);
    Object.defineProperty(prototype, "submitter", {
      get() {
        if (this.type == "submit" && this.target instanceof HTMLFormElement) {
          return submittersByForm.get(this.target);
        }
      }
    });
  })();
  var FrameLoadingStyle;
  (function(FrameLoadingStyle2) {
    FrameLoadingStyle2["eager"] = "eager";
    FrameLoadingStyle2["lazy"] = "lazy";
  })(FrameLoadingStyle || (FrameLoadingStyle = {}));
  var FrameElement = class extends HTMLElement {
    constructor() {
      super();
      this.loaded = Promise.resolve();
      this.delegate = new FrameElement.delegateConstructor(this);
    }
    static get observedAttributes() {
      return ["disabled", "loading", "src"];
    }
    connectedCallback() {
      this.delegate.connect();
    }
    disconnectedCallback() {
      this.delegate.disconnect();
    }
    reload() {
      const { src } = this;
      this.src = null;
      this.src = src;
    }
    attributeChangedCallback(name) {
      if (name == "loading") {
        this.delegate.loadingStyleChanged();
      } else if (name == "src") {
        this.delegate.sourceURLChanged();
      } else {
        this.delegate.disabledChanged();
      }
    }
    get src() {
      return this.getAttribute("src");
    }
    set src(value) {
      if (value) {
        this.setAttribute("src", value);
      } else {
        this.removeAttribute("src");
      }
    }
    get loading() {
      return frameLoadingStyleFromString(this.getAttribute("loading") || "");
    }
    set loading(value) {
      if (value) {
        this.setAttribute("loading", value);
      } else {
        this.removeAttribute("loading");
      }
    }
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }
    get autoscroll() {
      return this.hasAttribute("autoscroll");
    }
    set autoscroll(value) {
      if (value) {
        this.setAttribute("autoscroll", "");
      } else {
        this.removeAttribute("autoscroll");
      }
    }
    get complete() {
      return !this.delegate.isLoading;
    }
    get isActive() {
      return this.ownerDocument === document && !this.isPreview;
    }
    get isPreview() {
      var _a, _b;
      return (_b = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.documentElement) === null || _b === void 0 ? void 0 : _b.hasAttribute("data-turbo-preview");
    }
  };
  function frameLoadingStyleFromString(style) {
    switch (style.toLowerCase()) {
      case "lazy":
        return FrameLoadingStyle.lazy;
      default:
        return FrameLoadingStyle.eager;
    }
  }
  function expandURL(locatable) {
    return new URL(locatable.toString(), document.baseURI);
  }
  function getAnchor(url) {
    let anchorMatch;
    if (url.hash) {
      return url.hash.slice(1);
    } else if (anchorMatch = url.href.match(/#(.*)$/)) {
      return anchorMatch[1];
    }
  }
  function getAction(form, submitter) {
    const action = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formaction")) || form.getAttribute("action") || form.action;
    return expandURL(action);
  }
  function getExtension(url) {
    return (getLastPathComponent(url).match(/\.[^.]*$/) || [])[0] || "";
  }
  function isHTML(url) {
    return !!getExtension(url).match(/^(?:|\.(?:htm|html|xhtml))$/);
  }
  function isPrefixedBy(baseURL, url) {
    const prefix = getPrefix(url);
    return baseURL.href === expandURL(prefix).href || baseURL.href.startsWith(prefix);
  }
  function locationIsVisitable(location2, rootLocation) {
    return isPrefixedBy(location2, rootLocation) && isHTML(location2);
  }
  function getRequestURL(url) {
    const anchor = getAnchor(url);
    return anchor != null ? url.href.slice(0, -(anchor.length + 1)) : url.href;
  }
  function toCacheKey(url) {
    return getRequestURL(url);
  }
  function urlsAreEqual(left, right) {
    return expandURL(left).href == expandURL(right).href;
  }
  function getPathComponents(url) {
    return url.pathname.split("/").slice(1);
  }
  function getLastPathComponent(url) {
    return getPathComponents(url).slice(-1)[0];
  }
  function getPrefix(url) {
    return addTrailingSlash(url.origin + url.pathname);
  }
  function addTrailingSlash(value) {
    return value.endsWith("/") ? value : value + "/";
  }
  var FetchResponse = class {
    constructor(response) {
      this.response = response;
    }
    get succeeded() {
      return this.response.ok;
    }
    get failed() {
      return !this.succeeded;
    }
    get clientError() {
      return this.statusCode >= 400 && this.statusCode <= 499;
    }
    get serverError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
    get redirected() {
      return this.response.redirected;
    }
    get location() {
      return expandURL(this.response.url);
    }
    get isHTML() {
      return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/);
    }
    get statusCode() {
      return this.response.status;
    }
    get contentType() {
      return this.header("Content-Type");
    }
    get responseText() {
      return this.response.clone().text();
    }
    get responseHTML() {
      if (this.isHTML) {
        return this.response.clone().text();
      } else {
        return Promise.resolve(void 0);
      }
    }
    header(name) {
      return this.response.headers.get(name);
    }
  };
  function dispatch(eventName, { target, cancelable, detail } = {}) {
    const event = new CustomEvent(eventName, { cancelable, bubbles: true, detail });
    if (target && target.isConnected) {
      target.dispatchEvent(event);
    } else {
      document.documentElement.dispatchEvent(event);
    }
    return event;
  }
  function nextAnimationFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }
  function nextEventLoopTick() {
    return new Promise((resolve) => setTimeout(() => resolve(), 0));
  }
  function nextMicrotask() {
    return Promise.resolve();
  }
  function parseHTMLDocument(html = "") {
    return new DOMParser().parseFromString(html, "text/html");
  }
  function unindent(strings, ...values) {
    const lines = interpolate(strings, values).replace(/^\n/, "").split("\n");
    const match = lines[0].match(/^\s+/);
    const indent = match ? match[0].length : 0;
    return lines.map((line) => line.slice(indent)).join("\n");
  }
  function interpolate(strings, values) {
    return strings.reduce((result, string, i) => {
      const value = values[i] == void 0 ? "" : values[i];
      return result + string + value;
    }, "");
  }
  function uuid() {
    return Array.apply(null, { length: 36 }).map((_, i) => {
      if (i == 8 || i == 13 || i == 18 || i == 23) {
        return "-";
      } else if (i == 14) {
        return "4";
      } else if (i == 19) {
        return (Math.floor(Math.random() * 4) + 8).toString(16);
      } else {
        return Math.floor(Math.random() * 15).toString(16);
      }
    }).join("");
  }
  function getAttribute(attributeName, ...elements) {
    for (const value of elements.map((element) => element === null || element === void 0 ? void 0 : element.getAttribute(attributeName))) {
      if (typeof value == "string")
        return value;
    }
    return null;
  }
  function markAsBusy(...elements) {
    for (const element of elements) {
      if (element.localName == "turbo-frame") {
        element.setAttribute("busy", "");
      }
      element.setAttribute("aria-busy", "true");
    }
  }
  function clearBusyState(...elements) {
    for (const element of elements) {
      if (element.localName == "turbo-frame") {
        element.removeAttribute("busy");
      }
      element.removeAttribute("aria-busy");
    }
  }
  var FetchMethod;
  (function(FetchMethod2) {
    FetchMethod2[FetchMethod2["get"] = 0] = "get";
    FetchMethod2[FetchMethod2["post"] = 1] = "post";
    FetchMethod2[FetchMethod2["put"] = 2] = "put";
    FetchMethod2[FetchMethod2["patch"] = 3] = "patch";
    FetchMethod2[FetchMethod2["delete"] = 4] = "delete";
  })(FetchMethod || (FetchMethod = {}));
  function fetchMethodFromString(method) {
    switch (method.toLowerCase()) {
      case "get":
        return FetchMethod.get;
      case "post":
        return FetchMethod.post;
      case "put":
        return FetchMethod.put;
      case "patch":
        return FetchMethod.patch;
      case "delete":
        return FetchMethod.delete;
    }
  }
  var FetchRequest = class {
    constructor(delegate, method, location2, body = new URLSearchParams(), target = null) {
      this.abortController = new AbortController();
      this.resolveRequestPromise = (value) => {
      };
      this.delegate = delegate;
      this.method = method;
      this.headers = this.defaultHeaders;
      this.body = body;
      this.url = location2;
      this.target = target;
    }
    get location() {
      return this.url;
    }
    get params() {
      return this.url.searchParams;
    }
    get entries() {
      return this.body ? Array.from(this.body.entries()) : [];
    }
    cancel() {
      this.abortController.abort();
    }
    async perform() {
      var _a, _b;
      const { fetchOptions } = this;
      (_b = (_a = this.delegate).prepareHeadersForRequest) === null || _b === void 0 ? void 0 : _b.call(_a, this.headers, this);
      await this.allowRequestToBeIntercepted(fetchOptions);
      try {
        this.delegate.requestStarted(this);
        const response = await fetch(this.url.href, fetchOptions);
        return await this.receive(response);
      } catch (error) {
        if (error.name !== "AbortError") {
          this.delegate.requestErrored(this, error);
          throw error;
        }
      } finally {
        this.delegate.requestFinished(this);
      }
    }
    async receive(response) {
      const fetchResponse = new FetchResponse(response);
      const event = dispatch("turbo:before-fetch-response", { cancelable: true, detail: { fetchResponse }, target: this.target });
      if (event.defaultPrevented) {
        this.delegate.requestPreventedHandlingResponse(this, fetchResponse);
      } else if (fetchResponse.succeeded) {
        this.delegate.requestSucceededWithResponse(this, fetchResponse);
      } else {
        this.delegate.requestFailedWithResponse(this, fetchResponse);
      }
      return fetchResponse;
    }
    get fetchOptions() {
      var _a;
      return {
        method: FetchMethod[this.method].toUpperCase(),
        credentials: "same-origin",
        headers: this.headers,
        redirect: "follow",
        body: this.isIdempotent ? null : this.body,
        signal: this.abortSignal,
        referrer: (_a = this.delegate.referrer) === null || _a === void 0 ? void 0 : _a.href
      };
    }
    get defaultHeaders() {
      return {
        "Accept": "text/html, application/xhtml+xml"
      };
    }
    get isIdempotent() {
      return this.method == FetchMethod.get;
    }
    get abortSignal() {
      return this.abortController.signal;
    }
    async allowRequestToBeIntercepted(fetchOptions) {
      const requestInterception = new Promise((resolve) => this.resolveRequestPromise = resolve);
      const event = dispatch("turbo:before-fetch-request", {
        cancelable: true,
        detail: {
          fetchOptions,
          url: this.url,
          resume: this.resolveRequestPromise
        },
        target: this.target
      });
      if (event.defaultPrevented)
        await requestInterception;
    }
  };
  var AppearanceObserver = class {
    constructor(delegate, element) {
      this.started = false;
      this.intersect = (entries) => {
        const lastEntry = entries.slice(-1)[0];
        if (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.isIntersecting) {
          this.delegate.elementAppearedInViewport(this.element);
        }
      };
      this.delegate = delegate;
      this.element = element;
      this.intersectionObserver = new IntersectionObserver(this.intersect);
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.intersectionObserver.observe(this.element);
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        this.intersectionObserver.unobserve(this.element);
      }
    }
  };
  var StreamMessage = class {
    constructor(html) {
      this.templateElement = document.createElement("template");
      this.templateElement.innerHTML = html;
    }
    static wrap(message) {
      if (typeof message == "string") {
        return new this(message);
      } else {
        return message;
      }
    }
    get fragment() {
      const fragment = document.createDocumentFragment();
      for (const element of this.foreignElements) {
        fragment.appendChild(document.importNode(element, true));
      }
      return fragment;
    }
    get foreignElements() {
      return this.templateChildren.reduce((streamElements, child) => {
        if (child.tagName.toLowerCase() == "turbo-stream") {
          return [...streamElements, child];
        } else {
          return streamElements;
        }
      }, []);
    }
    get templateChildren() {
      return Array.from(this.templateElement.content.children);
    }
  };
  StreamMessage.contentType = "text/vnd.turbo-stream.html";
  var FormSubmissionState;
  (function(FormSubmissionState2) {
    FormSubmissionState2[FormSubmissionState2["initialized"] = 0] = "initialized";
    FormSubmissionState2[FormSubmissionState2["requesting"] = 1] = "requesting";
    FormSubmissionState2[FormSubmissionState2["waiting"] = 2] = "waiting";
    FormSubmissionState2[FormSubmissionState2["receiving"] = 3] = "receiving";
    FormSubmissionState2[FormSubmissionState2["stopping"] = 4] = "stopping";
    FormSubmissionState2[FormSubmissionState2["stopped"] = 5] = "stopped";
  })(FormSubmissionState || (FormSubmissionState = {}));
  var FormEnctype;
  (function(FormEnctype2) {
    FormEnctype2["urlEncoded"] = "application/x-www-form-urlencoded";
    FormEnctype2["multipart"] = "multipart/form-data";
    FormEnctype2["plain"] = "text/plain";
  })(FormEnctype || (FormEnctype = {}));
  function formEnctypeFromString(encoding) {
    switch (encoding.toLowerCase()) {
      case FormEnctype.multipart:
        return FormEnctype.multipart;
      case FormEnctype.plain:
        return FormEnctype.plain;
      default:
        return FormEnctype.urlEncoded;
    }
  }
  var FormSubmission = class {
    constructor(delegate, formElement, submitter, mustRedirect = false) {
      this.state = FormSubmissionState.initialized;
      this.delegate = delegate;
      this.formElement = formElement;
      this.submitter = submitter;
      this.formData = buildFormData(formElement, submitter);
      this.location = expandURL(this.action);
      if (this.method == FetchMethod.get) {
        mergeFormDataEntries(this.location, [...this.body.entries()]);
      }
      this.fetchRequest = new FetchRequest(this, this.method, this.location, this.body, this.formElement);
      this.mustRedirect = mustRedirect;
    }
    static confirmMethod(message, element) {
      return confirm(message);
    }
    get method() {
      var _a;
      const method = ((_a = this.submitter) === null || _a === void 0 ? void 0 : _a.getAttribute("formmethod")) || this.formElement.getAttribute("method") || "";
      return fetchMethodFromString(method.toLowerCase()) || FetchMethod.get;
    }
    get action() {
      var _a;
      const formElementAction = typeof this.formElement.action === "string" ? this.formElement.action : null;
      return ((_a = this.submitter) === null || _a === void 0 ? void 0 : _a.getAttribute("formaction")) || this.formElement.getAttribute("action") || formElementAction || "";
    }
    get body() {
      if (this.enctype == FormEnctype.urlEncoded || this.method == FetchMethod.get) {
        return new URLSearchParams(this.stringFormData);
      } else {
        return this.formData;
      }
    }
    get enctype() {
      var _a;
      return formEnctypeFromString(((_a = this.submitter) === null || _a === void 0 ? void 0 : _a.getAttribute("formenctype")) || this.formElement.enctype);
    }
    get isIdempotent() {
      return this.fetchRequest.isIdempotent;
    }
    get stringFormData() {
      return [...this.formData].reduce((entries, [name, value]) => {
        return entries.concat(typeof value == "string" ? [[name, value]] : []);
      }, []);
    }
    get confirmationMessage() {
      return this.formElement.getAttribute("data-turbo-confirm");
    }
    get needsConfirmation() {
      return this.confirmationMessage !== null;
    }
    async start() {
      const { initialized, requesting } = FormSubmissionState;
      if (this.needsConfirmation) {
        const answer = FormSubmission.confirmMethod(this.confirmationMessage, this.formElement);
        if (!answer) {
          return;
        }
      }
      if (this.state == initialized) {
        this.state = requesting;
        return this.fetchRequest.perform();
      }
    }
    stop() {
      const { stopping, stopped } = FormSubmissionState;
      if (this.state != stopping && this.state != stopped) {
        this.state = stopping;
        this.fetchRequest.cancel();
        return true;
      }
    }
    prepareHeadersForRequest(headers, request) {
      if (!request.isIdempotent) {
        const token = getCookieValue(getMetaContent("csrf-param")) || getMetaContent("csrf-token");
        if (token) {
          headers["X-CSRF-Token"] = token;
        }
        headers["Accept"] = [StreamMessage.contentType, headers["Accept"]].join(", ");
      }
    }
    requestStarted(request) {
      var _a;
      this.state = FormSubmissionState.waiting;
      (_a = this.submitter) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "");
      dispatch("turbo:submit-start", { target: this.formElement, detail: { formSubmission: this } });
      this.delegate.formSubmissionStarted(this);
    }
    requestPreventedHandlingResponse(request, response) {
      this.result = { success: response.succeeded, fetchResponse: response };
    }
    requestSucceededWithResponse(request, response) {
      if (response.clientError || response.serverError) {
        this.delegate.formSubmissionFailedWithResponse(this, response);
      } else if (this.requestMustRedirect(request) && responseSucceededWithoutRedirect(response)) {
        const error = new Error("Form responses must redirect to another location");
        this.delegate.formSubmissionErrored(this, error);
      } else {
        this.state = FormSubmissionState.receiving;
        this.result = { success: true, fetchResponse: response };
        this.delegate.formSubmissionSucceededWithResponse(this, response);
      }
    }
    requestFailedWithResponse(request, response) {
      this.result = { success: false, fetchResponse: response };
      this.delegate.formSubmissionFailedWithResponse(this, response);
    }
    requestErrored(request, error) {
      this.result = { success: false, error };
      this.delegate.formSubmissionErrored(this, error);
    }
    requestFinished(request) {
      var _a;
      this.state = FormSubmissionState.stopped;
      (_a = this.submitter) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
      dispatch("turbo:submit-end", { target: this.formElement, detail: Object.assign({ formSubmission: this }, this.result) });
      this.delegate.formSubmissionFinished(this);
    }
    requestMustRedirect(request) {
      return !request.isIdempotent && this.mustRedirect;
    }
  };
  function buildFormData(formElement, submitter) {
    const formData = new FormData(formElement);
    const name = submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("name");
    const value = submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("value");
    if (name && value != null && formData.get(name) != value) {
      formData.append(name, value);
    }
    return formData;
  }
  function getCookieValue(cookieName) {
    if (cookieName != null) {
      const cookies = document.cookie ? document.cookie.split("; ") : [];
      const cookie = cookies.find((cookie2) => cookie2.startsWith(cookieName));
      if (cookie) {
        const value = cookie.split("=").slice(1).join("=");
        return value ? decodeURIComponent(value) : void 0;
      }
    }
  }
  function getMetaContent(name) {
    const element = document.querySelector(`meta[name="${name}"]`);
    return element && element.content;
  }
  function responseSucceededWithoutRedirect(response) {
    return response.statusCode == 200 && !response.redirected;
  }
  function mergeFormDataEntries(url, entries) {
    const searchParams = new URLSearchParams();
    for (const [name, value] of entries) {
      if (value instanceof File)
        continue;
      searchParams.append(name, value);
    }
    url.search = searchParams.toString();
    return url;
  }
  var Snapshot = class {
    constructor(element) {
      this.element = element;
    }
    get children() {
      return [...this.element.children];
    }
    hasAnchor(anchor) {
      return this.getElementForAnchor(anchor) != null;
    }
    getElementForAnchor(anchor) {
      return anchor ? this.element.querySelector(`[id='${anchor}'], a[name='${anchor}']`) : null;
    }
    get isConnected() {
      return this.element.isConnected;
    }
    get firstAutofocusableElement() {
      return this.element.querySelector("[autofocus]");
    }
    get permanentElements() {
      return [...this.element.querySelectorAll("[id][data-turbo-permanent]")];
    }
    getPermanentElementById(id) {
      return this.element.querySelector(`#${id}[data-turbo-permanent]`);
    }
    getPermanentElementMapForSnapshot(snapshot) {
      const permanentElementMap = {};
      for (const currentPermanentElement of this.permanentElements) {
        const { id } = currentPermanentElement;
        const newPermanentElement = snapshot.getPermanentElementById(id);
        if (newPermanentElement) {
          permanentElementMap[id] = [currentPermanentElement, newPermanentElement];
        }
      }
      return permanentElementMap;
    }
  };
  var FormInterceptor = class {
    constructor(delegate, element) {
      this.submitBubbled = (event) => {
        const form = event.target;
        if (!event.defaultPrevented && form instanceof HTMLFormElement && form.closest("turbo-frame, html") == this.element) {
          const submitter = event.submitter || void 0;
          const method = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formmethod")) || form.method;
          if (method != "dialog" && this.delegate.shouldInterceptFormSubmission(form, submitter)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.delegate.formSubmissionIntercepted(form, submitter);
          }
        }
      };
      this.delegate = delegate;
      this.element = element;
    }
    start() {
      this.element.addEventListener("submit", this.submitBubbled);
    }
    stop() {
      this.element.removeEventListener("submit", this.submitBubbled);
    }
  };
  var View = class {
    constructor(delegate, element) {
      this.resolveRenderPromise = (value) => {
      };
      this.resolveInterceptionPromise = (value) => {
      };
      this.delegate = delegate;
      this.element = element;
    }
    scrollToAnchor(anchor) {
      const element = this.snapshot.getElementForAnchor(anchor);
      if (element) {
        this.scrollToElement(element);
        this.focusElement(element);
      } else {
        this.scrollToPosition({ x: 0, y: 0 });
      }
    }
    scrollToAnchorFromLocation(location2) {
      this.scrollToAnchor(getAnchor(location2));
    }
    scrollToElement(element) {
      element.scrollIntoView();
    }
    focusElement(element) {
      if (element instanceof HTMLElement) {
        if (element.hasAttribute("tabindex")) {
          element.focus();
        } else {
          element.setAttribute("tabindex", "-1");
          element.focus();
          element.removeAttribute("tabindex");
        }
      }
    }
    scrollToPosition({ x, y }) {
      this.scrollRoot.scrollTo(x, y);
    }
    scrollToTop() {
      this.scrollToPosition({ x: 0, y: 0 });
    }
    get scrollRoot() {
      return window;
    }
    async render(renderer) {
      const { isPreview, shouldRender, newSnapshot: snapshot } = renderer;
      if (shouldRender) {
        try {
          this.renderPromise = new Promise((resolve) => this.resolveRenderPromise = resolve);
          this.renderer = renderer;
          this.prepareToRenderSnapshot(renderer);
          const renderInterception = new Promise((resolve) => this.resolveInterceptionPromise = resolve);
          const immediateRender = this.delegate.allowsImmediateRender(snapshot, this.resolveInterceptionPromise);
          if (!immediateRender)
            await renderInterception;
          await this.renderSnapshot(renderer);
          this.delegate.viewRenderedSnapshot(snapshot, isPreview);
          this.finishRenderingSnapshot(renderer);
        } finally {
          delete this.renderer;
          this.resolveRenderPromise(void 0);
          delete this.renderPromise;
        }
      } else {
        this.invalidate();
      }
    }
    invalidate() {
      this.delegate.viewInvalidated();
    }
    prepareToRenderSnapshot(renderer) {
      this.markAsPreview(renderer.isPreview);
      renderer.prepareToRender();
    }
    markAsPreview(isPreview) {
      if (isPreview) {
        this.element.setAttribute("data-turbo-preview", "");
      } else {
        this.element.removeAttribute("data-turbo-preview");
      }
    }
    async renderSnapshot(renderer) {
      await renderer.render();
    }
    finishRenderingSnapshot(renderer) {
      renderer.finishRendering();
    }
  };
  var FrameView = class extends View {
    invalidate() {
      this.element.innerHTML = "";
    }
    get snapshot() {
      return new Snapshot(this.element);
    }
  };
  var LinkInterceptor = class {
    constructor(delegate, element) {
      this.clickBubbled = (event) => {
        if (this.respondsToEventTarget(event.target)) {
          this.clickEvent = event;
        } else {
          delete this.clickEvent;
        }
      };
      this.linkClicked = (event) => {
        if (this.clickEvent && this.respondsToEventTarget(event.target) && event.target instanceof Element) {
          if (this.delegate.shouldInterceptLinkClick(event.target, event.detail.url)) {
            this.clickEvent.preventDefault();
            event.preventDefault();
            this.delegate.linkClickIntercepted(event.target, event.detail.url);
          }
        }
        delete this.clickEvent;
      };
      this.willVisit = () => {
        delete this.clickEvent;
      };
      this.delegate = delegate;
      this.element = element;
    }
    start() {
      this.element.addEventListener("click", this.clickBubbled);
      document.addEventListener("turbo:click", this.linkClicked);
      document.addEventListener("turbo:before-visit", this.willVisit);
    }
    stop() {
      this.element.removeEventListener("click", this.clickBubbled);
      document.removeEventListener("turbo:click", this.linkClicked);
      document.removeEventListener("turbo:before-visit", this.willVisit);
    }
    respondsToEventTarget(target) {
      const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
      return element && element.closest("turbo-frame, html") == this.element;
    }
  };
  var Bardo = class {
    constructor(permanentElementMap) {
      this.permanentElementMap = permanentElementMap;
    }
    static preservingPermanentElements(permanentElementMap, callback) {
      const bardo = new this(permanentElementMap);
      bardo.enter();
      callback();
      bardo.leave();
    }
    enter() {
      for (const id in this.permanentElementMap) {
        const [, newPermanentElement] = this.permanentElementMap[id];
        this.replaceNewPermanentElementWithPlaceholder(newPermanentElement);
      }
    }
    leave() {
      for (const id in this.permanentElementMap) {
        const [currentPermanentElement] = this.permanentElementMap[id];
        this.replaceCurrentPermanentElementWithClone(currentPermanentElement);
        this.replacePlaceholderWithPermanentElement(currentPermanentElement);
      }
    }
    replaceNewPermanentElementWithPlaceholder(permanentElement) {
      const placeholder = createPlaceholderForPermanentElement(permanentElement);
      permanentElement.replaceWith(placeholder);
    }
    replaceCurrentPermanentElementWithClone(permanentElement) {
      const clone = permanentElement.cloneNode(true);
      permanentElement.replaceWith(clone);
    }
    replacePlaceholderWithPermanentElement(permanentElement) {
      const placeholder = this.getPlaceholderById(permanentElement.id);
      placeholder === null || placeholder === void 0 ? void 0 : placeholder.replaceWith(permanentElement);
    }
    getPlaceholderById(id) {
      return this.placeholders.find((element) => element.content == id);
    }
    get placeholders() {
      return [...document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]")];
    }
  };
  function createPlaceholderForPermanentElement(permanentElement) {
    const element = document.createElement("meta");
    element.setAttribute("name", "turbo-permanent-placeholder");
    element.setAttribute("content", permanentElement.id);
    return element;
  }
  var Renderer = class {
    constructor(currentSnapshot, newSnapshot, isPreview, willRender = true) {
      this.currentSnapshot = currentSnapshot;
      this.newSnapshot = newSnapshot;
      this.isPreview = isPreview;
      this.willRender = willRender;
      this.promise = new Promise((resolve, reject) => this.resolvingFunctions = { resolve, reject });
    }
    get shouldRender() {
      return true;
    }
    prepareToRender() {
      return;
    }
    finishRendering() {
      if (this.resolvingFunctions) {
        this.resolvingFunctions.resolve();
        delete this.resolvingFunctions;
      }
    }
    createScriptElement(element) {
      if (element.getAttribute("data-turbo-eval") == "false") {
        return element;
      } else {
        const createdScriptElement = document.createElement("script");
        if (this.cspNonce) {
          createdScriptElement.nonce = this.cspNonce;
        }
        createdScriptElement.textContent = element.textContent;
        createdScriptElement.async = false;
        copyElementAttributes(createdScriptElement, element);
        return createdScriptElement;
      }
    }
    preservingPermanentElements(callback) {
      Bardo.preservingPermanentElements(this.permanentElementMap, callback);
    }
    focusFirstAutofocusableElement() {
      const element = this.connectedSnapshot.firstAutofocusableElement;
      if (elementIsFocusable(element)) {
        element.focus();
      }
    }
    get connectedSnapshot() {
      return this.newSnapshot.isConnected ? this.newSnapshot : this.currentSnapshot;
    }
    get currentElement() {
      return this.currentSnapshot.element;
    }
    get newElement() {
      return this.newSnapshot.element;
    }
    get permanentElementMap() {
      return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot);
    }
    get cspNonce() {
      var _a;
      return (_a = document.head.querySelector('meta[name="csp-nonce"]')) === null || _a === void 0 ? void 0 : _a.getAttribute("content");
    }
  };
  function copyElementAttributes(destinationElement, sourceElement) {
    for (const { name, value } of [...sourceElement.attributes]) {
      destinationElement.setAttribute(name, value);
    }
  }
  function elementIsFocusable(element) {
    return element && typeof element.focus == "function";
  }
  var FrameRenderer = class extends Renderer {
    get shouldRender() {
      return true;
    }
    async render() {
      await nextAnimationFrame();
      this.preservingPermanentElements(() => {
        this.loadFrameElement();
      });
      this.scrollFrameIntoView();
      await nextAnimationFrame();
      this.focusFirstAutofocusableElement();
      await nextAnimationFrame();
      this.activateScriptElements();
    }
    loadFrameElement() {
      var _a;
      const destinationRange = document.createRange();
      destinationRange.selectNodeContents(this.currentElement);
      destinationRange.deleteContents();
      const frameElement = this.newElement;
      const sourceRange = (_a = frameElement.ownerDocument) === null || _a === void 0 ? void 0 : _a.createRange();
      if (sourceRange) {
        sourceRange.selectNodeContents(frameElement);
        this.currentElement.appendChild(sourceRange.extractContents());
      }
    }
    scrollFrameIntoView() {
      if (this.currentElement.autoscroll || this.newElement.autoscroll) {
        const element = this.currentElement.firstElementChild;
        const block = readScrollLogicalPosition(this.currentElement.getAttribute("data-autoscroll-block"), "end");
        if (element) {
          element.scrollIntoView({ block });
          return true;
        }
      }
      return false;
    }
    activateScriptElements() {
      for (const inertScriptElement of this.newScriptElements) {
        const activatedScriptElement = this.createScriptElement(inertScriptElement);
        inertScriptElement.replaceWith(activatedScriptElement);
      }
    }
    get newScriptElements() {
      return this.currentElement.querySelectorAll("script");
    }
  };
  function readScrollLogicalPosition(value, defaultValue) {
    if (value == "end" || value == "start" || value == "center" || value == "nearest") {
      return value;
    } else {
      return defaultValue;
    }
  }
  var ProgressBar = class {
    constructor() {
      this.hiding = false;
      this.value = 0;
      this.visible = false;
      this.trickle = () => {
        this.setValue(this.value + Math.random() / 100);
      };
      this.stylesheetElement = this.createStylesheetElement();
      this.progressElement = this.createProgressElement();
      this.installStylesheetElement();
      this.setValue(0);
    }
    static get defaultCSS() {
      return unindent`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 9999;
        transition:
          width ${ProgressBar.animationDuration}ms ease-out,
          opacity ${ProgressBar.animationDuration / 2}ms ${ProgressBar.animationDuration / 2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `;
    }
    show() {
      if (!this.visible) {
        this.visible = true;
        this.installProgressElement();
        this.startTrickling();
      }
    }
    hide() {
      if (this.visible && !this.hiding) {
        this.hiding = true;
        this.fadeProgressElement(() => {
          this.uninstallProgressElement();
          this.stopTrickling();
          this.visible = false;
          this.hiding = false;
        });
      }
    }
    setValue(value) {
      this.value = value;
      this.refresh();
    }
    installStylesheetElement() {
      document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
    }
    installProgressElement() {
      this.progressElement.style.width = "0";
      this.progressElement.style.opacity = "1";
      document.documentElement.insertBefore(this.progressElement, document.body);
      this.refresh();
    }
    fadeProgressElement(callback) {
      this.progressElement.style.opacity = "0";
      setTimeout(callback, ProgressBar.animationDuration * 1.5);
    }
    uninstallProgressElement() {
      if (this.progressElement.parentNode) {
        document.documentElement.removeChild(this.progressElement);
      }
    }
    startTrickling() {
      if (!this.trickleInterval) {
        this.trickleInterval = window.setInterval(this.trickle, ProgressBar.animationDuration);
      }
    }
    stopTrickling() {
      window.clearInterval(this.trickleInterval);
      delete this.trickleInterval;
    }
    refresh() {
      requestAnimationFrame(() => {
        this.progressElement.style.width = `${10 + this.value * 90}%`;
      });
    }
    createStylesheetElement() {
      const element = document.createElement("style");
      element.type = "text/css";
      element.textContent = ProgressBar.defaultCSS;
      return element;
    }
    createProgressElement() {
      const element = document.createElement("div");
      element.className = "turbo-progress-bar";
      return element;
    }
  };
  ProgressBar.animationDuration = 300;
  var HeadSnapshot = class extends Snapshot {
    constructor() {
      super(...arguments);
      this.detailsByOuterHTML = this.children.filter((element) => !elementIsNoscript(element)).map((element) => elementWithoutNonce(element)).reduce((result, element) => {
        const { outerHTML } = element;
        const details = outerHTML in result ? result[outerHTML] : {
          type: elementType(element),
          tracked: elementIsTracked(element),
          elements: []
        };
        return Object.assign(Object.assign({}, result), { [outerHTML]: Object.assign(Object.assign({}, details), { elements: [...details.elements, element] }) });
      }, {});
    }
    get trackedElementSignature() {
      return Object.keys(this.detailsByOuterHTML).filter((outerHTML) => this.detailsByOuterHTML[outerHTML].tracked).join("");
    }
    getScriptElementsNotInSnapshot(snapshot) {
      return this.getElementsMatchingTypeNotInSnapshot("script", snapshot);
    }
    getStylesheetElementsNotInSnapshot(snapshot) {
      return this.getElementsMatchingTypeNotInSnapshot("stylesheet", snapshot);
    }
    getElementsMatchingTypeNotInSnapshot(matchedType, snapshot) {
      return Object.keys(this.detailsByOuterHTML).filter((outerHTML) => !(outerHTML in snapshot.detailsByOuterHTML)).map((outerHTML) => this.detailsByOuterHTML[outerHTML]).filter(({ type }) => type == matchedType).map(({ elements: [element] }) => element);
    }
    get provisionalElements() {
      return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
        const { type, tracked, elements } = this.detailsByOuterHTML[outerHTML];
        if (type == null && !tracked) {
          return [...result, ...elements];
        } else if (elements.length > 1) {
          return [...result, ...elements.slice(1)];
        } else {
          return result;
        }
      }, []);
    }
    getMetaValue(name) {
      const element = this.findMetaElementByName(name);
      return element ? element.getAttribute("content") : null;
    }
    findMetaElementByName(name) {
      return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
        const { elements: [element] } = this.detailsByOuterHTML[outerHTML];
        return elementIsMetaElementWithName(element, name) ? element : result;
      }, void 0);
    }
  };
  function elementType(element) {
    if (elementIsScript(element)) {
      return "script";
    } else if (elementIsStylesheet(element)) {
      return "stylesheet";
    }
  }
  function elementIsTracked(element) {
    return element.getAttribute("data-turbo-track") == "reload";
  }
  function elementIsScript(element) {
    const tagName = element.tagName.toLowerCase();
    return tagName == "script";
  }
  function elementIsNoscript(element) {
    const tagName = element.tagName.toLowerCase();
    return tagName == "noscript";
  }
  function elementIsStylesheet(element) {
    const tagName = element.tagName.toLowerCase();
    return tagName == "style" || tagName == "link" && element.getAttribute("rel") == "stylesheet";
  }
  function elementIsMetaElementWithName(element, name) {
    const tagName = element.tagName.toLowerCase();
    return tagName == "meta" && element.getAttribute("name") == name;
  }
  function elementWithoutNonce(element) {
    if (element.hasAttribute("nonce")) {
      element.setAttribute("nonce", "");
    }
    return element;
  }
  var PageSnapshot = class extends Snapshot {
    constructor(element, headSnapshot) {
      super(element);
      this.headSnapshot = headSnapshot;
    }
    static fromHTMLString(html = "") {
      return this.fromDocument(parseHTMLDocument(html));
    }
    static fromElement(element) {
      return this.fromDocument(element.ownerDocument);
    }
    static fromDocument({ head, body }) {
      return new this(body, new HeadSnapshot(head));
    }
    clone() {
      return new PageSnapshot(this.element.cloneNode(true), this.headSnapshot);
    }
    get headElement() {
      return this.headSnapshot.element;
    }
    get rootLocation() {
      var _a;
      const root = (_a = this.getSetting("root")) !== null && _a !== void 0 ? _a : "/";
      return expandURL(root);
    }
    get cacheControlValue() {
      return this.getSetting("cache-control");
    }
    get isPreviewable() {
      return this.cacheControlValue != "no-preview";
    }
    get isCacheable() {
      return this.cacheControlValue != "no-cache";
    }
    get isVisitable() {
      return this.getSetting("visit-control") != "reload";
    }
    getSetting(name) {
      return this.headSnapshot.getMetaValue(`turbo-${name}`);
    }
  };
  var TimingMetric;
  (function(TimingMetric2) {
    TimingMetric2["visitStart"] = "visitStart";
    TimingMetric2["requestStart"] = "requestStart";
    TimingMetric2["requestEnd"] = "requestEnd";
    TimingMetric2["visitEnd"] = "visitEnd";
  })(TimingMetric || (TimingMetric = {}));
  var VisitState;
  (function(VisitState2) {
    VisitState2["initialized"] = "initialized";
    VisitState2["started"] = "started";
    VisitState2["canceled"] = "canceled";
    VisitState2["failed"] = "failed";
    VisitState2["completed"] = "completed";
  })(VisitState || (VisitState = {}));
  var defaultOptions = {
    action: "advance",
    historyChanged: false,
    visitCachedSnapshot: () => {
    },
    willRender: true
  };
  var SystemStatusCode;
  (function(SystemStatusCode2) {
    SystemStatusCode2[SystemStatusCode2["networkFailure"] = 0] = "networkFailure";
    SystemStatusCode2[SystemStatusCode2["timeoutFailure"] = -1] = "timeoutFailure";
    SystemStatusCode2[SystemStatusCode2["contentTypeMismatch"] = -2] = "contentTypeMismatch";
  })(SystemStatusCode || (SystemStatusCode = {}));
  var Visit = class {
    constructor(delegate, location2, restorationIdentifier, options = {}) {
      this.identifier = uuid();
      this.timingMetrics = {};
      this.followedRedirect = false;
      this.historyChanged = false;
      this.scrolled = false;
      this.snapshotCached = false;
      this.state = VisitState.initialized;
      this.delegate = delegate;
      this.location = location2;
      this.restorationIdentifier = restorationIdentifier || uuid();
      const { action, historyChanged, referrer, snapshotHTML, response, visitCachedSnapshot, willRender } = Object.assign(Object.assign({}, defaultOptions), options);
      this.action = action;
      this.historyChanged = historyChanged;
      this.referrer = referrer;
      this.snapshotHTML = snapshotHTML;
      this.response = response;
      this.isSamePage = this.delegate.locationWithActionIsSamePage(this.location, this.action);
      this.visitCachedSnapshot = visitCachedSnapshot;
      this.willRender = willRender;
      this.scrolled = !willRender;
    }
    get adapter() {
      return this.delegate.adapter;
    }
    get view() {
      return this.delegate.view;
    }
    get history() {
      return this.delegate.history;
    }
    get restorationData() {
      return this.history.getRestorationDataForIdentifier(this.restorationIdentifier);
    }
    get silent() {
      return this.isSamePage;
    }
    start() {
      if (this.state == VisitState.initialized) {
        this.recordTimingMetric(TimingMetric.visitStart);
        this.state = VisitState.started;
        this.adapter.visitStarted(this);
        this.delegate.visitStarted(this);
      }
    }
    cancel() {
      if (this.state == VisitState.started) {
        if (this.request) {
          this.request.cancel();
        }
        this.cancelRender();
        this.state = VisitState.canceled;
      }
    }
    complete() {
      if (this.state == VisitState.started) {
        this.recordTimingMetric(TimingMetric.visitEnd);
        this.state = VisitState.completed;
        this.adapter.visitCompleted(this);
        this.delegate.visitCompleted(this);
        this.followRedirect();
      }
    }
    fail() {
      if (this.state == VisitState.started) {
        this.state = VisitState.failed;
        this.adapter.visitFailed(this);
      }
    }
    changeHistory() {
      var _a;
      if (!this.historyChanged) {
        const actionForHistory = this.location.href === ((_a = this.referrer) === null || _a === void 0 ? void 0 : _a.href) ? "replace" : this.action;
        const method = this.getHistoryMethodForAction(actionForHistory);
        this.history.update(method, this.location, this.restorationIdentifier);
        this.historyChanged = true;
      }
    }
    issueRequest() {
      if (this.hasPreloadedResponse()) {
        this.simulateRequest();
      } else if (this.shouldIssueRequest() && !this.request) {
        this.request = new FetchRequest(this, FetchMethod.get, this.location);
        this.request.perform();
      }
    }
    simulateRequest() {
      if (this.response) {
        this.startRequest();
        this.recordResponse();
        this.finishRequest();
      }
    }
    startRequest() {
      this.recordTimingMetric(TimingMetric.requestStart);
      this.adapter.visitRequestStarted(this);
    }
    recordResponse(response = this.response) {
      this.response = response;
      if (response) {
        const { statusCode } = response;
        if (isSuccessful(statusCode)) {
          this.adapter.visitRequestCompleted(this);
        } else {
          this.adapter.visitRequestFailedWithStatusCode(this, statusCode);
        }
      }
    }
    finishRequest() {
      this.recordTimingMetric(TimingMetric.requestEnd);
      this.adapter.visitRequestFinished(this);
    }
    loadResponse() {
      if (this.response) {
        const { statusCode, responseHTML } = this.response;
        this.render(async () => {
          this.cacheSnapshot();
          if (this.view.renderPromise)
            await this.view.renderPromise;
          if (isSuccessful(statusCode) && responseHTML != null) {
            await this.view.renderPage(PageSnapshot.fromHTMLString(responseHTML), false, this.willRender);
            this.adapter.visitRendered(this);
            this.complete();
          } else {
            await this.view.renderError(PageSnapshot.fromHTMLString(responseHTML));
            this.adapter.visitRendered(this);
            this.fail();
          }
        });
      }
    }
    getCachedSnapshot() {
      const snapshot = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();
      if (snapshot && (!getAnchor(this.location) || snapshot.hasAnchor(getAnchor(this.location)))) {
        if (this.action == "restore" || snapshot.isPreviewable) {
          return snapshot;
        }
      }
    }
    getPreloadedSnapshot() {
      if (this.snapshotHTML) {
        return PageSnapshot.fromHTMLString(this.snapshotHTML);
      }
    }
    hasCachedSnapshot() {
      return this.getCachedSnapshot() != null;
    }
    loadCachedSnapshot() {
      const snapshot = this.getCachedSnapshot();
      if (snapshot) {
        const isPreview = this.shouldIssueRequest();
        this.render(async () => {
          this.cacheSnapshot();
          if (this.isSamePage) {
            this.adapter.visitRendered(this);
          } else {
            if (this.view.renderPromise)
              await this.view.renderPromise;
            await this.view.renderPage(snapshot, isPreview, this.willRender);
            this.adapter.visitRendered(this);
            if (!isPreview) {
              this.complete();
            }
          }
        });
      }
    }
    followRedirect() {
      var _a;
      if (this.redirectedToLocation && !this.followedRedirect && ((_a = this.response) === null || _a === void 0 ? void 0 : _a.redirected)) {
        this.adapter.visitProposedToLocation(this.redirectedToLocation, {
          action: "replace",
          response: this.response
        });
        this.followedRedirect = true;
      }
    }
    goToSamePageAnchor() {
      if (this.isSamePage) {
        this.render(async () => {
          this.cacheSnapshot();
          this.adapter.visitRendered(this);
        });
      }
    }
    requestStarted() {
      this.startRequest();
    }
    requestPreventedHandlingResponse(request, response) {
    }
    async requestSucceededWithResponse(request, response) {
      const responseHTML = await response.responseHTML;
      const { redirected, statusCode } = response;
      if (responseHTML == void 0) {
        this.recordResponse({ statusCode: SystemStatusCode.contentTypeMismatch, redirected });
      } else {
        this.redirectedToLocation = response.redirected ? response.location : void 0;
        this.recordResponse({ statusCode, responseHTML, redirected });
      }
    }
    async requestFailedWithResponse(request, response) {
      const responseHTML = await response.responseHTML;
      const { redirected, statusCode } = response;
      if (responseHTML == void 0) {
        this.recordResponse({ statusCode: SystemStatusCode.contentTypeMismatch, redirected });
      } else {
        this.recordResponse({ statusCode, responseHTML, redirected });
      }
    }
    requestErrored(request, error) {
      this.recordResponse({ statusCode: SystemStatusCode.networkFailure, redirected: false });
    }
    requestFinished() {
      this.finishRequest();
    }
    performScroll() {
      if (!this.scrolled) {
        if (this.action == "restore") {
          this.scrollToRestoredPosition() || this.scrollToAnchor() || this.view.scrollToTop();
        } else {
          this.scrollToAnchor() || this.view.scrollToTop();
        }
        if (this.isSamePage) {
          this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation, this.location);
        }
        this.scrolled = true;
      }
    }
    scrollToRestoredPosition() {
      const { scrollPosition } = this.restorationData;
      if (scrollPosition) {
        this.view.scrollToPosition(scrollPosition);
        return true;
      }
    }
    scrollToAnchor() {
      const anchor = getAnchor(this.location);
      if (anchor != null) {
        this.view.scrollToAnchor(anchor);
        return true;
      }
    }
    recordTimingMetric(metric) {
      this.timingMetrics[metric] = new Date().getTime();
    }
    getTimingMetrics() {
      return Object.assign({}, this.timingMetrics);
    }
    getHistoryMethodForAction(action) {
      switch (action) {
        case "replace":
          return history.replaceState;
        case "advance":
        case "restore":
          return history.pushState;
      }
    }
    hasPreloadedResponse() {
      return typeof this.response == "object";
    }
    shouldIssueRequest() {
      if (this.isSamePage) {
        return false;
      } else if (this.action == "restore") {
        return !this.hasCachedSnapshot();
      } else {
        return this.willRender;
      }
    }
    cacheSnapshot() {
      if (!this.snapshotCached) {
        this.view.cacheSnapshot().then((snapshot) => snapshot && this.visitCachedSnapshot(snapshot));
        this.snapshotCached = true;
      }
    }
    async render(callback) {
      this.cancelRender();
      await new Promise((resolve) => {
        this.frame = requestAnimationFrame(() => resolve());
      });
      await callback();
      delete this.frame;
      this.performScroll();
    }
    cancelRender() {
      if (this.frame) {
        cancelAnimationFrame(this.frame);
        delete this.frame;
      }
    }
  };
  function isSuccessful(statusCode) {
    return statusCode >= 200 && statusCode < 300;
  }
  var BrowserAdapter = class {
    constructor(session2) {
      this.progressBar = new ProgressBar();
      this.showProgressBar = () => {
        this.progressBar.show();
      };
      this.session = session2;
    }
    visitProposedToLocation(location2, options) {
      this.navigator.startVisit(location2, uuid(), options);
    }
    visitStarted(visit2) {
      visit2.loadCachedSnapshot();
      visit2.issueRequest();
      visit2.changeHistory();
      visit2.goToSamePageAnchor();
    }
    visitRequestStarted(visit2) {
      this.progressBar.setValue(0);
      if (visit2.hasCachedSnapshot() || visit2.action != "restore") {
        this.showVisitProgressBarAfterDelay();
      } else {
        this.showProgressBar();
      }
    }
    visitRequestCompleted(visit2) {
      visit2.loadResponse();
    }
    visitRequestFailedWithStatusCode(visit2, statusCode) {
      switch (statusCode) {
        case SystemStatusCode.networkFailure:
        case SystemStatusCode.timeoutFailure:
        case SystemStatusCode.contentTypeMismatch:
          return this.reload();
        default:
          return visit2.loadResponse();
      }
    }
    visitRequestFinished(visit2) {
      this.progressBar.setValue(1);
      this.hideVisitProgressBar();
    }
    visitCompleted(visit2) {
    }
    pageInvalidated() {
      this.reload();
    }
    visitFailed(visit2) {
    }
    visitRendered(visit2) {
    }
    formSubmissionStarted(formSubmission) {
      this.progressBar.setValue(0);
      this.showFormProgressBarAfterDelay();
    }
    formSubmissionFinished(formSubmission) {
      this.progressBar.setValue(1);
      this.hideFormProgressBar();
    }
    showVisitProgressBarAfterDelay() {
      this.visitProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
    }
    hideVisitProgressBar() {
      this.progressBar.hide();
      if (this.visitProgressBarTimeout != null) {
        window.clearTimeout(this.visitProgressBarTimeout);
        delete this.visitProgressBarTimeout;
      }
    }
    showFormProgressBarAfterDelay() {
      if (this.formProgressBarTimeout == null) {
        this.formProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
      }
    }
    hideFormProgressBar() {
      this.progressBar.hide();
      if (this.formProgressBarTimeout != null) {
        window.clearTimeout(this.formProgressBarTimeout);
        delete this.formProgressBarTimeout;
      }
    }
    reload() {
      window.location.reload();
    }
    get navigator() {
      return this.session.navigator;
    }
  };
  var CacheObserver = class {
    constructor() {
      this.started = false;
    }
    start() {
      if (!this.started) {
        this.started = true;
        addEventListener("turbo:before-cache", this.removeStaleElements, false);
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        removeEventListener("turbo:before-cache", this.removeStaleElements, false);
      }
    }
    removeStaleElements() {
      const staleElements = [...document.querySelectorAll('[data-turbo-cache="false"]')];
      for (const element of staleElements) {
        element.remove();
      }
    }
  };
  var FormSubmitObserver = class {
    constructor(delegate) {
      this.started = false;
      this.submitCaptured = () => {
        removeEventListener("submit", this.submitBubbled, false);
        addEventListener("submit", this.submitBubbled, false);
      };
      this.submitBubbled = (event) => {
        if (!event.defaultPrevented) {
          const form = event.target instanceof HTMLFormElement ? event.target : void 0;
          const submitter = event.submitter || void 0;
          if (form) {
            const method = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formmethod")) || form.getAttribute("method");
            if (method != "dialog" && this.delegate.willSubmitForm(form, submitter)) {
              event.preventDefault();
              this.delegate.formSubmitted(form, submitter);
            }
          }
        }
      };
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        addEventListener("submit", this.submitCaptured, true);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        removeEventListener("submit", this.submitCaptured, true);
        this.started = false;
      }
    }
  };
  var FrameRedirector = class {
    constructor(element) {
      this.element = element;
      this.linkInterceptor = new LinkInterceptor(this, element);
      this.formInterceptor = new FormInterceptor(this, element);
    }
    start() {
      this.linkInterceptor.start();
      this.formInterceptor.start();
    }
    stop() {
      this.linkInterceptor.stop();
      this.formInterceptor.stop();
    }
    shouldInterceptLinkClick(element, url) {
      return this.shouldRedirect(element);
    }
    linkClickIntercepted(element, url) {
      const frame = this.findFrameElement(element);
      if (frame) {
        frame.delegate.linkClickIntercepted(element, url);
      }
    }
    shouldInterceptFormSubmission(element, submitter) {
      return this.shouldSubmit(element, submitter);
    }
    formSubmissionIntercepted(element, submitter) {
      const frame = this.findFrameElement(element, submitter);
      if (frame) {
        frame.removeAttribute("reloadable");
        frame.delegate.formSubmissionIntercepted(element, submitter);
      }
    }
    shouldSubmit(form, submitter) {
      var _a;
      const action = getAction(form, submitter);
      const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
      const rootLocation = expandURL((_a = meta === null || meta === void 0 ? void 0 : meta.content) !== null && _a !== void 0 ? _a : "/");
      return this.shouldRedirect(form, submitter) && locationIsVisitable(action, rootLocation);
    }
    shouldRedirect(element, submitter) {
      const frame = this.findFrameElement(element, submitter);
      return frame ? frame != element.closest("turbo-frame") : false;
    }
    findFrameElement(element, submitter) {
      const id = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("data-turbo-frame")) || element.getAttribute("data-turbo-frame");
      if (id && id != "_top") {
        const frame = this.element.querySelector(`#${id}:not([disabled])`);
        if (frame instanceof FrameElement) {
          return frame;
        }
      }
    }
  };
  var History = class {
    constructor(delegate) {
      this.restorationIdentifier = uuid();
      this.restorationData = {};
      this.started = false;
      this.pageLoaded = false;
      this.onPopState = (event) => {
        if (this.shouldHandlePopState()) {
          const { turbo } = event.state || {};
          if (turbo) {
            this.location = new URL(window.location.href);
            const { restorationIdentifier } = turbo;
            this.restorationIdentifier = restorationIdentifier;
            this.delegate.historyPoppedToLocationWithRestorationIdentifier(this.location, restorationIdentifier);
          }
        }
      };
      this.onPageLoad = async (event) => {
        await nextMicrotask();
        this.pageLoaded = true;
      };
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        addEventListener("popstate", this.onPopState, false);
        addEventListener("load", this.onPageLoad, false);
        this.started = true;
        this.replace(new URL(window.location.href));
      }
    }
    stop() {
      if (this.started) {
        removeEventListener("popstate", this.onPopState, false);
        removeEventListener("load", this.onPageLoad, false);
        this.started = false;
      }
    }
    push(location2, restorationIdentifier) {
      this.update(history.pushState, location2, restorationIdentifier);
    }
    replace(location2, restorationIdentifier) {
      this.update(history.replaceState, location2, restorationIdentifier);
    }
    update(method, location2, restorationIdentifier = uuid()) {
      const state = { turbo: { restorationIdentifier } };
      method.call(history, state, "", location2.href);
      this.location = location2;
      this.restorationIdentifier = restorationIdentifier;
    }
    getRestorationDataForIdentifier(restorationIdentifier) {
      return this.restorationData[restorationIdentifier] || {};
    }
    updateRestorationData(additionalData) {
      const { restorationIdentifier } = this;
      const restorationData = this.restorationData[restorationIdentifier];
      this.restorationData[restorationIdentifier] = Object.assign(Object.assign({}, restorationData), additionalData);
    }
    assumeControlOfScrollRestoration() {
      var _a;
      if (!this.previousScrollRestoration) {
        this.previousScrollRestoration = (_a = history.scrollRestoration) !== null && _a !== void 0 ? _a : "auto";
        history.scrollRestoration = "manual";
      }
    }
    relinquishControlOfScrollRestoration() {
      if (this.previousScrollRestoration) {
        history.scrollRestoration = this.previousScrollRestoration;
        delete this.previousScrollRestoration;
      }
    }
    shouldHandlePopState() {
      return this.pageIsLoaded();
    }
    pageIsLoaded() {
      return this.pageLoaded || document.readyState == "complete";
    }
  };
  var LinkClickObserver = class {
    constructor(delegate) {
      this.started = false;
      this.clickCaptured = () => {
        removeEventListener("click", this.clickBubbled, false);
        addEventListener("click", this.clickBubbled, false);
      };
      this.clickBubbled = (event) => {
        if (this.clickEventIsSignificant(event)) {
          const target = event.composedPath && event.composedPath()[0] || event.target;
          const link = this.findLinkFromClickTarget(target);
          if (link) {
            const location2 = this.getLocationForLink(link);
            if (this.delegate.willFollowLinkToLocation(link, location2)) {
              event.preventDefault();
              this.delegate.followedLinkToLocation(link, location2);
            }
          }
        }
      };
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        addEventListener("click", this.clickCaptured, true);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        removeEventListener("click", this.clickCaptured, true);
        this.started = false;
      }
    }
    clickEventIsSignificant(event) {
      return !(event.target && event.target.isContentEditable || event.defaultPrevented || event.which > 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
    }
    findLinkFromClickTarget(target) {
      if (target instanceof Element) {
        return target.closest("a[href]:not([target^=_]):not([download])");
      }
    }
    getLocationForLink(link) {
      return expandURL(link.getAttribute("href") || "");
    }
  };
  function isAction(action) {
    return action == "advance" || action == "replace" || action == "restore";
  }
  var Navigator = class {
    constructor(delegate) {
      this.delegate = delegate;
    }
    proposeVisit(location2, options = {}) {
      if (this.delegate.allowsVisitingLocationWithAction(location2, options.action)) {
        if (locationIsVisitable(location2, this.view.snapshot.rootLocation)) {
          this.delegate.visitProposedToLocation(location2, options);
        } else {
          window.location.href = location2.toString();
        }
      }
    }
    startVisit(locatable, restorationIdentifier, options = {}) {
      this.stop();
      this.currentVisit = new Visit(this, expandURL(locatable), restorationIdentifier, Object.assign({ referrer: this.location }, options));
      this.currentVisit.start();
    }
    submitForm(form, submitter) {
      this.stop();
      this.formSubmission = new FormSubmission(this, form, submitter, true);
      this.formSubmission.start();
    }
    stop() {
      if (this.formSubmission) {
        this.formSubmission.stop();
        delete this.formSubmission;
      }
      if (this.currentVisit) {
        this.currentVisit.cancel();
        delete this.currentVisit;
      }
    }
    get adapter() {
      return this.delegate.adapter;
    }
    get view() {
      return this.delegate.view;
    }
    get history() {
      return this.delegate.history;
    }
    formSubmissionStarted(formSubmission) {
      if (typeof this.adapter.formSubmissionStarted === "function") {
        this.adapter.formSubmissionStarted(formSubmission);
      }
    }
    async formSubmissionSucceededWithResponse(formSubmission, fetchResponse) {
      if (formSubmission == this.formSubmission) {
        const responseHTML = await fetchResponse.responseHTML;
        if (responseHTML) {
          if (formSubmission.method != FetchMethod.get) {
            this.view.clearSnapshotCache();
          }
          const { statusCode, redirected } = fetchResponse;
          const action = this.getActionForFormSubmission(formSubmission);
          const visitOptions = { action, response: { statusCode, responseHTML, redirected } };
          this.proposeVisit(fetchResponse.location, visitOptions);
        }
      }
    }
    async formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
      const responseHTML = await fetchResponse.responseHTML;
      if (responseHTML) {
        const snapshot = PageSnapshot.fromHTMLString(responseHTML);
        if (fetchResponse.serverError) {
          await this.view.renderError(snapshot);
        } else {
          await this.view.renderPage(snapshot);
        }
        this.view.scrollToTop();
        this.view.clearSnapshotCache();
      }
    }
    formSubmissionErrored(formSubmission, error) {
      console.error(error);
    }
    formSubmissionFinished(formSubmission) {
      if (typeof this.adapter.formSubmissionFinished === "function") {
        this.adapter.formSubmissionFinished(formSubmission);
      }
    }
    visitStarted(visit2) {
      this.delegate.visitStarted(visit2);
    }
    visitCompleted(visit2) {
      this.delegate.visitCompleted(visit2);
    }
    locationWithActionIsSamePage(location2, action) {
      const anchor = getAnchor(location2);
      const currentAnchor = getAnchor(this.view.lastRenderedLocation);
      const isRestorationToTop = action === "restore" && typeof anchor === "undefined";
      return action !== "replace" && getRequestURL(location2) === getRequestURL(this.view.lastRenderedLocation) && (isRestorationToTop || anchor != null && anchor !== currentAnchor);
    }
    visitScrolledToSamePageLocation(oldURL, newURL) {
      this.delegate.visitScrolledToSamePageLocation(oldURL, newURL);
    }
    get location() {
      return this.history.location;
    }
    get restorationIdentifier() {
      return this.history.restorationIdentifier;
    }
    getActionForFormSubmission(formSubmission) {
      const { formElement, submitter } = formSubmission;
      const action = getAttribute("data-turbo-action", submitter, formElement);
      return isAction(action) ? action : "advance";
    }
  };
  var PageStage;
  (function(PageStage2) {
    PageStage2[PageStage2["initial"] = 0] = "initial";
    PageStage2[PageStage2["loading"] = 1] = "loading";
    PageStage2[PageStage2["interactive"] = 2] = "interactive";
    PageStage2[PageStage2["complete"] = 3] = "complete";
  })(PageStage || (PageStage = {}));
  var PageObserver = class {
    constructor(delegate) {
      this.stage = PageStage.initial;
      this.started = false;
      this.interpretReadyState = () => {
        const { readyState } = this;
        if (readyState == "interactive") {
          this.pageIsInteractive();
        } else if (readyState == "complete") {
          this.pageIsComplete();
        }
      };
      this.pageWillUnload = () => {
        this.delegate.pageWillUnload();
      };
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        if (this.stage == PageStage.initial) {
          this.stage = PageStage.loading;
        }
        document.addEventListener("readystatechange", this.interpretReadyState, false);
        addEventListener("pagehide", this.pageWillUnload, false);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        document.removeEventListener("readystatechange", this.interpretReadyState, false);
        removeEventListener("pagehide", this.pageWillUnload, false);
        this.started = false;
      }
    }
    pageIsInteractive() {
      if (this.stage == PageStage.loading) {
        this.stage = PageStage.interactive;
        this.delegate.pageBecameInteractive();
      }
    }
    pageIsComplete() {
      this.pageIsInteractive();
      if (this.stage == PageStage.interactive) {
        this.stage = PageStage.complete;
        this.delegate.pageLoaded();
      }
    }
    get readyState() {
      return document.readyState;
    }
  };
  var ScrollObserver = class {
    constructor(delegate) {
      this.started = false;
      this.onScroll = () => {
        this.updatePosition({ x: window.pageXOffset, y: window.pageYOffset });
      };
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        addEventListener("scroll", this.onScroll, false);
        this.onScroll();
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        removeEventListener("scroll", this.onScroll, false);
        this.started = false;
      }
    }
    updatePosition(position) {
      this.delegate.scrollPositionChanged(position);
    }
  };
  var StreamObserver = class {
    constructor(delegate) {
      this.sources = /* @__PURE__ */ new Set();
      this.started = false;
      this.inspectFetchResponse = (event) => {
        const response = fetchResponseFromEvent(event);
        if (response && fetchResponseIsStream(response)) {
          event.preventDefault();
          this.receiveMessageResponse(response);
        }
      };
      this.receiveMessageEvent = (event) => {
        if (this.started && typeof event.data == "string") {
          this.receiveMessageHTML(event.data);
        }
      };
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        this.started = true;
        addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
      }
    }
    connectStreamSource(source) {
      if (!this.streamSourceIsConnected(source)) {
        this.sources.add(source);
        source.addEventListener("message", this.receiveMessageEvent, false);
      }
    }
    disconnectStreamSource(source) {
      if (this.streamSourceIsConnected(source)) {
        this.sources.delete(source);
        source.removeEventListener("message", this.receiveMessageEvent, false);
      }
    }
    streamSourceIsConnected(source) {
      return this.sources.has(source);
    }
    async receiveMessageResponse(response) {
      const html = await response.responseHTML;
      if (html) {
        this.receiveMessageHTML(html);
      }
    }
    receiveMessageHTML(html) {
      this.delegate.receivedMessageFromStream(new StreamMessage(html));
    }
  };
  function fetchResponseFromEvent(event) {
    var _a;
    const fetchResponse = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.fetchResponse;
    if (fetchResponse instanceof FetchResponse) {
      return fetchResponse;
    }
  }
  function fetchResponseIsStream(response) {
    var _a;
    const contentType = (_a = response.contentType) !== null && _a !== void 0 ? _a : "";
    return contentType.startsWith(StreamMessage.contentType);
  }
  var ErrorRenderer = class extends Renderer {
    async render() {
      this.replaceHeadAndBody();
      this.activateScriptElements();
    }
    replaceHeadAndBody() {
      const { documentElement, head, body } = document;
      documentElement.replaceChild(this.newHead, head);
      documentElement.replaceChild(this.newElement, body);
    }
    activateScriptElements() {
      for (const replaceableElement of this.scriptElements) {
        const parentNode = replaceableElement.parentNode;
        if (parentNode) {
          const element = this.createScriptElement(replaceableElement);
          parentNode.replaceChild(element, replaceableElement);
        }
      }
    }
    get newHead() {
      return this.newSnapshot.headSnapshot.element;
    }
    get scriptElements() {
      return [...document.documentElement.querySelectorAll("script")];
    }
  };
  var PageRenderer = class extends Renderer {
    get shouldRender() {
      return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical;
    }
    prepareToRender() {
      this.mergeHead();
    }
    async render() {
      if (this.willRender) {
        this.replaceBody();
      }
    }
    finishRendering() {
      super.finishRendering();
      if (!this.isPreview) {
        this.focusFirstAutofocusableElement();
      }
    }
    get currentHeadSnapshot() {
      return this.currentSnapshot.headSnapshot;
    }
    get newHeadSnapshot() {
      return this.newSnapshot.headSnapshot;
    }
    get newElement() {
      return this.newSnapshot.element;
    }
    mergeHead() {
      this.copyNewHeadStylesheetElements();
      this.copyNewHeadScriptElements();
      this.removeCurrentHeadProvisionalElements();
      this.copyNewHeadProvisionalElements();
    }
    replaceBody() {
      this.preservingPermanentElements(() => {
        this.activateNewBody();
        this.assignNewBody();
      });
    }
    get trackedElementsAreIdentical() {
      return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature;
    }
    copyNewHeadStylesheetElements() {
      for (const element of this.newHeadStylesheetElements) {
        document.head.appendChild(element);
      }
    }
    copyNewHeadScriptElements() {
      for (const element of this.newHeadScriptElements) {
        document.head.appendChild(this.createScriptElement(element));
      }
    }
    removeCurrentHeadProvisionalElements() {
      for (const element of this.currentHeadProvisionalElements) {
        document.head.removeChild(element);
      }
    }
    copyNewHeadProvisionalElements() {
      for (const element of this.newHeadProvisionalElements) {
        document.head.appendChild(element);
      }
    }
    activateNewBody() {
      document.adoptNode(this.newElement);
      this.activateNewBodyScriptElements();
    }
    activateNewBodyScriptElements() {
      for (const inertScriptElement of this.newBodyScriptElements) {
        const activatedScriptElement = this.createScriptElement(inertScriptElement);
        inertScriptElement.replaceWith(activatedScriptElement);
      }
    }
    assignNewBody() {
      if (document.body && this.newElement instanceof HTMLBodyElement) {
        document.body.replaceWith(this.newElement);
      } else {
        document.documentElement.appendChild(this.newElement);
      }
    }
    get newHeadStylesheetElements() {
      return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot);
    }
    get newHeadScriptElements() {
      return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot);
    }
    get currentHeadProvisionalElements() {
      return this.currentHeadSnapshot.provisionalElements;
    }
    get newHeadProvisionalElements() {
      return this.newHeadSnapshot.provisionalElements;
    }
    get newBodyScriptElements() {
      return this.newElement.querySelectorAll("script");
    }
  };
  var SnapshotCache = class {
    constructor(size) {
      this.keys = [];
      this.snapshots = {};
      this.size = size;
    }
    has(location2) {
      return toCacheKey(location2) in this.snapshots;
    }
    get(location2) {
      if (this.has(location2)) {
        const snapshot = this.read(location2);
        this.touch(location2);
        return snapshot;
      }
    }
    put(location2, snapshot) {
      this.write(location2, snapshot);
      this.touch(location2);
      return snapshot;
    }
    clear() {
      this.snapshots = {};
    }
    read(location2) {
      return this.snapshots[toCacheKey(location2)];
    }
    write(location2, snapshot) {
      this.snapshots[toCacheKey(location2)] = snapshot;
    }
    touch(location2) {
      const key = toCacheKey(location2);
      const index = this.keys.indexOf(key);
      if (index > -1)
        this.keys.splice(index, 1);
      this.keys.unshift(key);
      this.trim();
    }
    trim() {
      for (const key of this.keys.splice(this.size)) {
        delete this.snapshots[key];
      }
    }
  };
  var PageView = class extends View {
    constructor() {
      super(...arguments);
      this.snapshotCache = new SnapshotCache(10);
      this.lastRenderedLocation = new URL(location.href);
    }
    renderPage(snapshot, isPreview = false, willRender = true) {
      const renderer = new PageRenderer(this.snapshot, snapshot, isPreview, willRender);
      return this.render(renderer);
    }
    renderError(snapshot) {
      const renderer = new ErrorRenderer(this.snapshot, snapshot, false);
      return this.render(renderer);
    }
    clearSnapshotCache() {
      this.snapshotCache.clear();
    }
    async cacheSnapshot() {
      if (this.shouldCacheSnapshot) {
        this.delegate.viewWillCacheSnapshot();
        const { snapshot, lastRenderedLocation: location2 } = this;
        await nextEventLoopTick();
        const cachedSnapshot = snapshot.clone();
        this.snapshotCache.put(location2, cachedSnapshot);
        return cachedSnapshot;
      }
    }
    getCachedSnapshotForLocation(location2) {
      return this.snapshotCache.get(location2);
    }
    get snapshot() {
      return PageSnapshot.fromElement(this.element);
    }
    get shouldCacheSnapshot() {
      return this.snapshot.isCacheable;
    }
  };
  var Session = class {
    constructor() {
      this.navigator = new Navigator(this);
      this.history = new History(this);
      this.view = new PageView(this, document.documentElement);
      this.adapter = new BrowserAdapter(this);
      this.pageObserver = new PageObserver(this);
      this.cacheObserver = new CacheObserver();
      this.linkClickObserver = new LinkClickObserver(this);
      this.formSubmitObserver = new FormSubmitObserver(this);
      this.scrollObserver = new ScrollObserver(this);
      this.streamObserver = new StreamObserver(this);
      this.frameRedirector = new FrameRedirector(document.documentElement);
      this.drive = true;
      this.enabled = true;
      this.progressBarDelay = 500;
      this.started = false;
    }
    start() {
      if (!this.started) {
        this.pageObserver.start();
        this.cacheObserver.start();
        this.linkClickObserver.start();
        this.formSubmitObserver.start();
        this.scrollObserver.start();
        this.streamObserver.start();
        this.frameRedirector.start();
        this.history.start();
        this.started = true;
        this.enabled = true;
      }
    }
    disable() {
      this.enabled = false;
    }
    stop() {
      if (this.started) {
        this.pageObserver.stop();
        this.cacheObserver.stop();
        this.linkClickObserver.stop();
        this.formSubmitObserver.stop();
        this.scrollObserver.stop();
        this.streamObserver.stop();
        this.frameRedirector.stop();
        this.history.stop();
        this.started = false;
      }
    }
    registerAdapter(adapter) {
      this.adapter = adapter;
    }
    visit(location2, options = {}) {
      this.navigator.proposeVisit(expandURL(location2), options);
    }
    connectStreamSource(source) {
      this.streamObserver.connectStreamSource(source);
    }
    disconnectStreamSource(source) {
      this.streamObserver.disconnectStreamSource(source);
    }
    renderStreamMessage(message) {
      document.documentElement.appendChild(StreamMessage.wrap(message).fragment);
    }
    clearCache() {
      this.view.clearSnapshotCache();
    }
    setProgressBarDelay(delay) {
      this.progressBarDelay = delay;
    }
    get location() {
      return this.history.location;
    }
    get restorationIdentifier() {
      return this.history.restorationIdentifier;
    }
    historyPoppedToLocationWithRestorationIdentifier(location2, restorationIdentifier) {
      if (this.enabled) {
        this.navigator.startVisit(location2, restorationIdentifier, { action: "restore", historyChanged: true });
      } else {
        this.adapter.pageInvalidated();
      }
    }
    scrollPositionChanged(position) {
      this.history.updateRestorationData({ scrollPosition: position });
    }
    willFollowLinkToLocation(link, location2) {
      return this.elementDriveEnabled(link) && locationIsVisitable(location2, this.snapshot.rootLocation) && this.applicationAllowsFollowingLinkToLocation(link, location2);
    }
    followedLinkToLocation(link, location2) {
      const action = this.getActionForLink(link);
      this.convertLinkWithMethodClickToFormSubmission(link) || this.visit(location2.href, { action });
    }
    convertLinkWithMethodClickToFormSubmission(link) {
      const linkMethod = link.getAttribute("data-turbo-method");
      if (linkMethod) {
        const form = document.createElement("form");
        form.method = linkMethod;
        form.action = link.getAttribute("href") || "undefined";
        form.hidden = true;
        if (link.hasAttribute("data-turbo-confirm")) {
          form.setAttribute("data-turbo-confirm", link.getAttribute("data-turbo-confirm"));
        }
        const frame = this.getTargetFrameForLink(link);
        if (frame) {
          form.setAttribute("data-turbo-frame", frame);
          form.addEventListener("turbo:submit-start", () => form.remove());
        } else {
          form.addEventListener("submit", () => form.remove());
        }
        document.body.appendChild(form);
        return dispatch("submit", { cancelable: true, target: form });
      } else {
        return false;
      }
    }
    allowsVisitingLocationWithAction(location2, action) {
      return this.locationWithActionIsSamePage(location2, action) || this.applicationAllowsVisitingLocation(location2);
    }
    visitProposedToLocation(location2, options) {
      extendURLWithDeprecatedProperties(location2);
      this.adapter.visitProposedToLocation(location2, options);
    }
    visitStarted(visit2) {
      extendURLWithDeprecatedProperties(visit2.location);
      if (!visit2.silent) {
        this.notifyApplicationAfterVisitingLocation(visit2.location, visit2.action);
      }
    }
    visitCompleted(visit2) {
      this.notifyApplicationAfterPageLoad(visit2.getTimingMetrics());
    }
    locationWithActionIsSamePage(location2, action) {
      return this.navigator.locationWithActionIsSamePage(location2, action);
    }
    visitScrolledToSamePageLocation(oldURL, newURL) {
      this.notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL);
    }
    willSubmitForm(form, submitter) {
      const action = getAction(form, submitter);
      return this.elementDriveEnabled(form) && (!submitter || this.elementDriveEnabled(submitter)) && locationIsVisitable(expandURL(action), this.snapshot.rootLocation);
    }
    formSubmitted(form, submitter) {
      this.navigator.submitForm(form, submitter);
    }
    pageBecameInteractive() {
      this.view.lastRenderedLocation = this.location;
      this.notifyApplicationAfterPageLoad();
    }
    pageLoaded() {
      this.history.assumeControlOfScrollRestoration();
    }
    pageWillUnload() {
      this.history.relinquishControlOfScrollRestoration();
    }
    receivedMessageFromStream(message) {
      this.renderStreamMessage(message);
    }
    viewWillCacheSnapshot() {
      var _a;
      if (!((_a = this.navigator.currentVisit) === null || _a === void 0 ? void 0 : _a.silent)) {
        this.notifyApplicationBeforeCachingSnapshot();
      }
    }
    allowsImmediateRender({ element }, resume) {
      const event = this.notifyApplicationBeforeRender(element, resume);
      return !event.defaultPrevented;
    }
    viewRenderedSnapshot(snapshot, isPreview) {
      this.view.lastRenderedLocation = this.history.location;
      this.notifyApplicationAfterRender();
    }
    viewInvalidated() {
      this.adapter.pageInvalidated();
    }
    frameLoaded(frame) {
      this.notifyApplicationAfterFrameLoad(frame);
    }
    frameRendered(fetchResponse, frame) {
      this.notifyApplicationAfterFrameRender(fetchResponse, frame);
    }
    applicationAllowsFollowingLinkToLocation(link, location2) {
      const event = this.notifyApplicationAfterClickingLinkToLocation(link, location2);
      return !event.defaultPrevented;
    }
    applicationAllowsVisitingLocation(location2) {
      const event = this.notifyApplicationBeforeVisitingLocation(location2);
      return !event.defaultPrevented;
    }
    notifyApplicationAfterClickingLinkToLocation(link, location2) {
      return dispatch("turbo:click", { target: link, detail: { url: location2.href }, cancelable: true });
    }
    notifyApplicationBeforeVisitingLocation(location2) {
      return dispatch("turbo:before-visit", { detail: { url: location2.href }, cancelable: true });
    }
    notifyApplicationAfterVisitingLocation(location2, action) {
      markAsBusy(document.documentElement);
      return dispatch("turbo:visit", { detail: { url: location2.href, action } });
    }
    notifyApplicationBeforeCachingSnapshot() {
      return dispatch("turbo:before-cache");
    }
    notifyApplicationBeforeRender(newBody, resume) {
      return dispatch("turbo:before-render", { detail: { newBody, resume }, cancelable: true });
    }
    notifyApplicationAfterRender() {
      return dispatch("turbo:render");
    }
    notifyApplicationAfterPageLoad(timing = {}) {
      clearBusyState(document.documentElement);
      return dispatch("turbo:load", { detail: { url: this.location.href, timing } });
    }
    notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL) {
      dispatchEvent(new HashChangeEvent("hashchange", { oldURL: oldURL.toString(), newURL: newURL.toString() }));
    }
    notifyApplicationAfterFrameLoad(frame) {
      return dispatch("turbo:frame-load", { target: frame });
    }
    notifyApplicationAfterFrameRender(fetchResponse, frame) {
      return dispatch("turbo:frame-render", { detail: { fetchResponse }, target: frame, cancelable: true });
    }
    elementDriveEnabled(element) {
      const container = element === null || element === void 0 ? void 0 : element.closest("[data-turbo]");
      if (this.drive) {
        if (container) {
          return container.getAttribute("data-turbo") != "false";
        } else {
          return true;
        }
      } else {
        if (container) {
          return container.getAttribute("data-turbo") == "true";
        } else {
          return false;
        }
      }
    }
    getActionForLink(link) {
      const action = link.getAttribute("data-turbo-action");
      return isAction(action) ? action : "advance";
    }
    getTargetFrameForLink(link) {
      const frame = link.getAttribute("data-turbo-frame");
      if (frame) {
        return frame;
      } else {
        const container = link.closest("turbo-frame");
        if (container) {
          return container.id;
        }
      }
    }
    get snapshot() {
      return this.view.snapshot;
    }
  };
  function extendURLWithDeprecatedProperties(url) {
    Object.defineProperties(url, deprecatedLocationPropertyDescriptors);
  }
  var deprecatedLocationPropertyDescriptors = {
    absoluteURL: {
      get() {
        return this.toString();
      }
    }
  };
  var session = new Session();
  var { navigator: navigator$1 } = session;
  function start() {
    session.start();
  }
  function registerAdapter(adapter) {
    session.registerAdapter(adapter);
  }
  function visit(location2, options) {
    session.visit(location2, options);
  }
  function connectStreamSource(source) {
    session.connectStreamSource(source);
  }
  function disconnectStreamSource(source) {
    session.disconnectStreamSource(source);
  }
  function renderStreamMessage(message) {
    session.renderStreamMessage(message);
  }
  function clearCache() {
    session.clearCache();
  }
  function setProgressBarDelay(delay) {
    session.setProgressBarDelay(delay);
  }
  function setConfirmMethod(confirmMethod) {
    FormSubmission.confirmMethod = confirmMethod;
  }
  var Turbo = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    navigator: navigator$1,
    session,
    PageRenderer,
    PageSnapshot,
    start,
    registerAdapter,
    visit,
    connectStreamSource,
    disconnectStreamSource,
    renderStreamMessage,
    clearCache,
    setProgressBarDelay,
    setConfirmMethod
  });
  var FrameController = class {
    constructor(element) {
      this.fetchResponseLoaded = (fetchResponse) => {
      };
      this.currentFetchRequest = null;
      this.resolveVisitPromise = () => {
      };
      this.connected = false;
      this.hasBeenLoaded = false;
      this.settingSourceURL = false;
      this.element = element;
      this.view = new FrameView(this, this.element);
      this.appearanceObserver = new AppearanceObserver(this, this.element);
      this.linkInterceptor = new LinkInterceptor(this, this.element);
      this.formInterceptor = new FormInterceptor(this, this.element);
    }
    connect() {
      if (!this.connected) {
        this.connected = true;
        this.reloadable = false;
        if (this.loadingStyle == FrameLoadingStyle.lazy) {
          this.appearanceObserver.start();
        }
        this.linkInterceptor.start();
        this.formInterceptor.start();
        this.sourceURLChanged();
      }
    }
    disconnect() {
      if (this.connected) {
        this.connected = false;
        this.appearanceObserver.stop();
        this.linkInterceptor.stop();
        this.formInterceptor.stop();
      }
    }
    disabledChanged() {
      if (this.loadingStyle == FrameLoadingStyle.eager) {
        this.loadSourceURL();
      }
    }
    sourceURLChanged() {
      if (this.loadingStyle == FrameLoadingStyle.eager || this.hasBeenLoaded) {
        this.loadSourceURL();
      }
    }
    loadingStyleChanged() {
      if (this.loadingStyle == FrameLoadingStyle.lazy) {
        this.appearanceObserver.start();
      } else {
        this.appearanceObserver.stop();
        this.loadSourceURL();
      }
    }
    async loadSourceURL() {
      if (!this.settingSourceURL && this.enabled && this.isActive && (this.reloadable || this.sourceURL != this.currentURL)) {
        const previousURL = this.currentURL;
        this.currentURL = this.sourceURL;
        if (this.sourceURL) {
          try {
            this.element.loaded = this.visit(expandURL(this.sourceURL));
            this.appearanceObserver.stop();
            await this.element.loaded;
            this.hasBeenLoaded = true;
          } catch (error) {
            this.currentURL = previousURL;
            throw error;
          }
        }
      }
    }
    async loadResponse(fetchResponse) {
      if (fetchResponse.redirected || fetchResponse.succeeded && fetchResponse.isHTML) {
        this.sourceURL = fetchResponse.response.url;
      }
      try {
        const html = await fetchResponse.responseHTML;
        if (html) {
          const { body } = parseHTMLDocument(html);
          const snapshot = new Snapshot(await this.extractForeignFrameElement(body));
          const renderer = new FrameRenderer(this.view.snapshot, snapshot, false, false);
          if (this.view.renderPromise)
            await this.view.renderPromise;
          await this.view.render(renderer);
          session.frameRendered(fetchResponse, this.element);
          session.frameLoaded(this.element);
          this.fetchResponseLoaded(fetchResponse);
        }
      } catch (error) {
        console.error(error);
        this.view.invalidate();
      } finally {
        this.fetchResponseLoaded = () => {
        };
      }
    }
    elementAppearedInViewport(element) {
      this.loadSourceURL();
    }
    shouldInterceptLinkClick(element, url) {
      if (element.hasAttribute("data-turbo-method")) {
        return false;
      } else {
        return this.shouldInterceptNavigation(element);
      }
    }
    linkClickIntercepted(element, url) {
      this.reloadable = true;
      this.navigateFrame(element, url);
    }
    shouldInterceptFormSubmission(element, submitter) {
      return this.shouldInterceptNavigation(element, submitter);
    }
    formSubmissionIntercepted(element, submitter) {
      if (this.formSubmission) {
        this.formSubmission.stop();
      }
      this.reloadable = false;
      this.formSubmission = new FormSubmission(this, element, submitter);
      const { fetchRequest } = this.formSubmission;
      this.prepareHeadersForRequest(fetchRequest.headers, fetchRequest);
      this.formSubmission.start();
    }
    prepareHeadersForRequest(headers, request) {
      headers["Turbo-Frame"] = this.id;
    }
    requestStarted(request) {
      markAsBusy(this.element);
    }
    requestPreventedHandlingResponse(request, response) {
      this.resolveVisitPromise();
    }
    async requestSucceededWithResponse(request, response) {
      await this.loadResponse(response);
      this.resolveVisitPromise();
    }
    requestFailedWithResponse(request, response) {
      console.error(response);
      this.resolveVisitPromise();
    }
    requestErrored(request, error) {
      console.error(error);
      this.resolveVisitPromise();
    }
    requestFinished(request) {
      clearBusyState(this.element);
    }
    formSubmissionStarted({ formElement }) {
      markAsBusy(formElement, this.findFrameElement(formElement));
    }
    formSubmissionSucceededWithResponse(formSubmission, response) {
      const frame = this.findFrameElement(formSubmission.formElement, formSubmission.submitter);
      this.proposeVisitIfNavigatedWithAction(frame, formSubmission.formElement, formSubmission.submitter);
      frame.delegate.loadResponse(response);
    }
    formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
      this.element.delegate.loadResponse(fetchResponse);
    }
    formSubmissionErrored(formSubmission, error) {
      console.error(error);
    }
    formSubmissionFinished({ formElement }) {
      clearBusyState(formElement, this.findFrameElement(formElement));
    }
    allowsImmediateRender(snapshot, resume) {
      return true;
    }
    viewRenderedSnapshot(snapshot, isPreview) {
    }
    viewInvalidated() {
    }
    async visit(url) {
      var _a;
      const request = new FetchRequest(this, FetchMethod.get, url, new URLSearchParams(), this.element);
      (_a = this.currentFetchRequest) === null || _a === void 0 ? void 0 : _a.cancel();
      this.currentFetchRequest = request;
      return new Promise((resolve) => {
        this.resolveVisitPromise = () => {
          this.resolveVisitPromise = () => {
          };
          this.currentFetchRequest = null;
          resolve();
        };
        request.perform();
      });
    }
    navigateFrame(element, url, submitter) {
      const frame = this.findFrameElement(element, submitter);
      this.proposeVisitIfNavigatedWithAction(frame, element, submitter);
      frame.setAttribute("reloadable", "");
      frame.src = url;
    }
    proposeVisitIfNavigatedWithAction(frame, element, submitter) {
      const action = getAttribute("data-turbo-action", submitter, element, frame);
      if (isAction(action)) {
        const { visitCachedSnapshot } = new SnapshotSubstitution(frame);
        frame.delegate.fetchResponseLoaded = (fetchResponse) => {
          if (frame.src) {
            const { statusCode, redirected } = fetchResponse;
            const responseHTML = frame.ownerDocument.documentElement.outerHTML;
            const response = { statusCode, redirected, responseHTML };
            session.visit(frame.src, { action, response, visitCachedSnapshot, willRender: false });
          }
        };
      }
    }
    findFrameElement(element, submitter) {
      var _a;
      const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
      return (_a = getFrameElementById(id)) !== null && _a !== void 0 ? _a : this.element;
    }
    async extractForeignFrameElement(container) {
      let element;
      const id = CSS.escape(this.id);
      try {
        if (element = activateElement(container.querySelector(`turbo-frame#${id}`), this.currentURL)) {
          return element;
        }
        if (element = activateElement(container.querySelector(`turbo-frame[src][recurse~=${id}]`), this.currentURL)) {
          await element.loaded;
          return await this.extractForeignFrameElement(element);
        }
        console.error(`Response has no matching <turbo-frame id="${id}"> element`);
      } catch (error) {
        console.error(error);
      }
      return new FrameElement();
    }
    formActionIsVisitable(form, submitter) {
      const action = getAction(form, submitter);
      return locationIsVisitable(expandURL(action), this.rootLocation);
    }
    shouldInterceptNavigation(element, submitter) {
      const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
      if (element instanceof HTMLFormElement && !this.formActionIsVisitable(element, submitter)) {
        return false;
      }
      if (!this.enabled || id == "_top") {
        return false;
      }
      if (id) {
        const frameElement = getFrameElementById(id);
        if (frameElement) {
          return !frameElement.disabled;
        }
      }
      if (!session.elementDriveEnabled(element)) {
        return false;
      }
      if (submitter && !session.elementDriveEnabled(submitter)) {
        return false;
      }
      return true;
    }
    get id() {
      return this.element.id;
    }
    get enabled() {
      return !this.element.disabled;
    }
    get sourceURL() {
      if (this.element.src) {
        return this.element.src;
      }
    }
    get reloadable() {
      const frame = this.findFrameElement(this.element);
      return frame.hasAttribute("reloadable");
    }
    set reloadable(value) {
      const frame = this.findFrameElement(this.element);
      if (value) {
        frame.setAttribute("reloadable", "");
      } else {
        frame.removeAttribute("reloadable");
      }
    }
    set sourceURL(sourceURL) {
      this.settingSourceURL = true;
      this.element.src = sourceURL !== null && sourceURL !== void 0 ? sourceURL : null;
      this.currentURL = this.element.src;
      this.settingSourceURL = false;
    }
    get loadingStyle() {
      return this.element.loading;
    }
    get isLoading() {
      return this.formSubmission !== void 0 || this.resolveVisitPromise() !== void 0;
    }
    get isActive() {
      return this.element.isActive && this.connected;
    }
    get rootLocation() {
      var _a;
      const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
      const root = (_a = meta === null || meta === void 0 ? void 0 : meta.content) !== null && _a !== void 0 ? _a : "/";
      return expandURL(root);
    }
  };
  var SnapshotSubstitution = class {
    constructor(element) {
      this.visitCachedSnapshot = ({ element: element2 }) => {
        var _a;
        const { id, clone } = this;
        (_a = element2.querySelector("#" + id)) === null || _a === void 0 ? void 0 : _a.replaceWith(clone);
      };
      this.clone = element.cloneNode(true);
      this.id = element.id;
    }
  };
  function getFrameElementById(id) {
    if (id != null) {
      const element = document.getElementById(id);
      if (element instanceof FrameElement) {
        return element;
      }
    }
  }
  function activateElement(element, currentURL) {
    if (element) {
      const src = element.getAttribute("src");
      if (src != null && currentURL != null && urlsAreEqual(src, currentURL)) {
        throw new Error(`Matching <turbo-frame id="${element.id}"> element has a source URL which references itself`);
      }
      if (element.ownerDocument !== document) {
        element = document.importNode(element, true);
      }
      if (element instanceof FrameElement) {
        element.connectedCallback();
        element.disconnectedCallback();
        return element;
      }
    }
  }
  var StreamActions = {
    after() {
      this.targetElements.forEach((e) => {
        var _a;
        return (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(this.templateContent, e.nextSibling);
      });
    },
    append() {
      this.removeDuplicateTargetChildren();
      this.targetElements.forEach((e) => e.append(this.templateContent));
    },
    before() {
      this.targetElements.forEach((e) => {
        var _a;
        return (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(this.templateContent, e);
      });
    },
    prepend() {
      this.removeDuplicateTargetChildren();
      this.targetElements.forEach((e) => e.prepend(this.templateContent));
    },
    remove() {
      this.targetElements.forEach((e) => e.remove());
    },
    replace() {
      this.targetElements.forEach((e) => e.replaceWith(this.templateContent));
    },
    update() {
      this.targetElements.forEach((e) => {
        e.innerHTML = "";
        e.append(this.templateContent);
      });
    }
  };
  var StreamElement = class extends HTMLElement {
    async connectedCallback() {
      try {
        await this.render();
      } catch (error) {
        console.error(error);
      } finally {
        this.disconnect();
      }
    }
    async render() {
      var _a;
      return (_a = this.renderPromise) !== null && _a !== void 0 ? _a : this.renderPromise = (async () => {
        if (this.dispatchEvent(this.beforeRenderEvent)) {
          await nextAnimationFrame();
          this.performAction();
        }
      })();
    }
    disconnect() {
      try {
        this.remove();
      } catch (_a) {
      }
    }
    removeDuplicateTargetChildren() {
      this.duplicateChildren.forEach((c) => c.remove());
    }
    get duplicateChildren() {
      var _a;
      const existingChildren = this.targetElements.flatMap((e) => [...e.children]).filter((c) => !!c.id);
      const newChildrenIds = [...(_a = this.templateContent) === null || _a === void 0 ? void 0 : _a.children].filter((c) => !!c.id).map((c) => c.id);
      return existingChildren.filter((c) => newChildrenIds.includes(c.id));
    }
    get performAction() {
      if (this.action) {
        const actionFunction = StreamActions[this.action];
        if (actionFunction) {
          return actionFunction;
        }
        this.raise("unknown action");
      }
      this.raise("action attribute is missing");
    }
    get targetElements() {
      if (this.target) {
        return this.targetElementsById;
      } else if (this.targets) {
        return this.targetElementsByQuery;
      } else {
        this.raise("target or targets attribute is missing");
      }
    }
    get templateContent() {
      return this.templateElement.content.cloneNode(true);
    }
    get templateElement() {
      if (this.firstElementChild instanceof HTMLTemplateElement) {
        return this.firstElementChild;
      }
      this.raise("first child element must be a <template> element");
    }
    get action() {
      return this.getAttribute("action");
    }
    get target() {
      return this.getAttribute("target");
    }
    get targets() {
      return this.getAttribute("targets");
    }
    raise(message) {
      throw new Error(`${this.description}: ${message}`);
    }
    get description() {
      var _a, _b;
      return (_b = ((_a = this.outerHTML.match(/<[^>]+>/)) !== null && _a !== void 0 ? _a : [])[0]) !== null && _b !== void 0 ? _b : "<turbo-stream>";
    }
    get beforeRenderEvent() {
      return new CustomEvent("turbo:before-stream-render", { bubbles: true, cancelable: true });
    }
    get targetElementsById() {
      var _a;
      const element = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.getElementById(this.target);
      if (element !== null) {
        return [element];
      } else {
        return [];
      }
    }
    get targetElementsByQuery() {
      var _a;
      const elements = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.querySelectorAll(this.targets);
      if (elements.length !== 0) {
        return Array.prototype.slice.call(elements);
      } else {
        return [];
      }
    }
  };
  FrameElement.delegateConstructor = FrameController;
  customElements.define("turbo-frame", FrameElement);
  customElements.define("turbo-stream", StreamElement);
  (() => {
    let element = document.currentScript;
    if (!element)
      return;
    if (element.hasAttribute("data-turbo-suppress-warning"))
      return;
    while (element = element.parentElement) {
      if (element == document.body) {
        return console.warn(unindent`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `, element.outerHTML);
      }
    }
  })();
  window.Turbo = Turbo;
  start();

  // node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable.js
  var consumer;
  async function getConsumer() {
    return consumer || setConsumer(createConsumer2().then(setConsumer));
  }
  function setConsumer(newConsumer) {
    return consumer = newConsumer;
  }
  async function createConsumer2() {
    const { createConsumer: createConsumer3 } = await Promise.resolve().then(() => (init_src(), src_exports));
    return createConsumer3();
  }
  async function subscribeTo(channel, mixin) {
    const { subscriptions } = await getConsumer();
    return subscriptions.create(channel, mixin);
  }

  // node_modules/@hotwired/turbo-rails/app/javascript/turbo/snakeize.js
  function walk(obj) {
    if (!obj || typeof obj !== "object")
      return obj;
    if (obj instanceof Date || obj instanceof RegExp)
      return obj;
    if (Array.isArray(obj))
      return obj.map(walk);
    return Object.keys(obj).reduce(function(acc, key) {
      var camel = key[0].toLowerCase() + key.slice(1).replace(/([A-Z]+)/g, function(m, x) {
        return "_" + x.toLowerCase();
      });
      acc[camel] = walk(obj[key]);
      return acc;
    }, {});
  }

  // node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable_stream_source_element.js
  var TurboCableStreamSourceElement = class extends HTMLElement {
    async connectedCallback() {
      connectStreamSource(this);
      this.subscription = await subscribeTo(this.channel, { received: this.dispatchMessageEvent.bind(this) });
    }
    disconnectedCallback() {
      disconnectStreamSource(this);
      if (this.subscription)
        this.subscription.unsubscribe();
    }
    dispatchMessageEvent(data) {
      const event = new MessageEvent("message", { data });
      return this.dispatchEvent(event);
    }
    get channel() {
      const channel = this.getAttribute("channel");
      const signed_stream_name = this.getAttribute("signed-stream-name");
      return { channel, signed_stream_name, ...walk({ ...this.dataset }) };
    }
  };
  customElements.define("turbo-cable-stream-source", TurboCableStreamSourceElement);

  // node_modules/@hotwired/turbo-rails/app/javascript/turbo/form_submissions.js
  function overrideMethodWithFormmethod({ detail: { formSubmission: { fetchRequest, submitter } } }) {
    if (submitter && submitter.formMethod && fetchRequest.body.has("_method")) {
      fetchRequest.body.set("_method", submitter.formMethod);
    }
  }

  // node_modules/@hotwired/turbo-rails/app/javascript/turbo/index.js
  addEventListener("turbo:submit-start", overrideMethodWithFormmethod);

  // app/javascript/application.js
  var ActiveStorage = __toESM(require_activestorage());
  var import_dropdown = __toESM(require_dropdown());
  var import_collapse = __toESM(require_collapse());

  // app/javascript/scripts/select.js
  var import_tom_select = __toESM(require_tom_select_popular());

  // app/javascript/scripts/i18n/select.json
  var select_default = {
    ru: {
      remove_button: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442",
      no_results: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0448\u043B\u043E\u0441\u044C"
    },
    en: {
      remove_button: "Remove element",
      no_results: "No results"
    }
  };

  // app/javascript/scripts/select.js
  var selects = [];
  document.addEventListener("turbo:before-cache", function() {
    selects.forEach((select) => {
      select.destroy();
    });
  });
  var rerender = function() {
    const i18n = select_default[document.querySelector("body").dataset.lang];
    document.querySelectorAll("select.js-multiple-select").forEach((element) => {
      if (!element.classList.contains("tomselected")) {
        let opts = {
          plugins: {
            "remove_button": {
              title: i18n["remove_button"]
            },
            "no_backspace_delete": {},
            "restore_on_backspace": {}
          },
          valueField: "id",
          labelField: "title",
          searchField: "title",
          create: false,
          load: function(query, callback) {
            const url = element.dataset.ajaxUrl + ".json?term=" + encodeURIComponent(query);
            fetch(url).then((response) => response.json()).then((json) => {
              callback(json);
            }).catch(() => {
              callback();
            });
          },
          render: {
            no_results: function(_data, _escape) {
              return '<div class="no-results">' + i18n["no_results"] + "</div>";
            }
          }
        };
        const el = new import_tom_select.default(element, opts);
        selects.push(el);
      }
    });
  };
  document.addEventListener("turbo:load", rerender);
  document.addEventListener("turbo:frame-render", rerender);
  document.addEventListener("turbo:render", rerender);

  // app/javascript/application.js
  ActiveStorage.start();
})();
/*!
  * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap collapse.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap dropdown.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
//# sourceMappingURL=assets/application.js.map
