/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/component.js":
/*!*****************************!*\
  !*** ./src/js/component.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var virtual_dom_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! virtual-dom-library */ \"./node_modules/virtual-dom-library/index.js\");\n\n\nfunction createDom(el, props, ...children) {\n  return (0,virtual_dom_library__WEBPACK_IMPORTED_MODULE_0__.h)(el, props, children);\n}\n\nclass DivButton {\n  active = false;\n  element;\n  jsx;\n\n  constructor() {\n    //Находим элемент\n    this.element = document.querySelector('[data-divbutton=\"1\"]');\n  }\n\n  handleClick = () => {\n    //Меняем состояние active\n    this.active = !this.active; //И ререндеримся\n\n    this.render();\n  };\n\n  getJsx() {\n    //Шаблон компонента\n    return createDom(\"div\", null, \"MyDiv - \", this.active ? 'active' : 'not active', createDom(\"button\", {\n      events: {\n        click: () => this.handleClick()\n      }\n    }, \"Change State\"));\n  }\n\n  render() {\n    //Получаем шаблон компонента\n    const newJsx = this.getJsx(); //Если это первый рендерер\n\n    if (this.jsx === undefined) {\n      //Сохраняем его\n      this.jsx = newJsx; //Рендерим компонент в HTML\n\n      (0,virtual_dom_library__WEBPACK_IMPORTED_MODULE_0__.mount)(this.jsx, this.element); //Выходим\n\n      return;\n    } //Если это второй или далее рендерер\n    //Находим разницу между старым и новым JSX и патчим HTML DOM\n\n\n    (0,virtual_dom_library__WEBPACK_IMPORTED_MODULE_0__.patch)(this.jsx, newJsx); //Сохраняем новый JSX в переменную\n\n    this.jsx = newJsx;\n  }\n\n} //Экспортируем компонент\n\n\nwindow.DivButton = DivButton;\n\n//# sourceURL=webpack://virualdom1/./src/js/component.js?");

/***/ }),

/***/ "./node_modules/virtual-dom-library/index.js":
/*!***************************************************!*\
  !*** ./node_modules/virtual-dom-library/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createHtmlElementFromVNode\": () => (/* binding */ createHtmlElementFromVNode),\n/* harmony export */   \"h\": () => (/* binding */ h),\n/* harmony export */   \"mount\": () => (/* binding */ mount),\n/* harmony export */   \"patch\": () => (/* binding */ patch)\n/* harmony export */ });\n// H\r\n\r\nfunction transformSimpleAttrsForVNode(simpleAttributes = {}) {\r\n  return new Map(Object.entries(simpleAttributes));\r\n}\r\n\r\nfunction transformClassesForVNode(classes = []) {\r\n  return new Set(classes);\r\n}\r\n\r\nfunction transformEventsForVNode(events = {}) {\r\n  const transformEvents = new Map();\r\n  const keys = Object.keys(events);\r\n  keys.forEach((key) => transformEvents.set(key, events[key]));\r\n  return transformEvents;\r\n}\r\n\r\nfunction transformStylesForVNode(styles = {}) {\r\n  const transformStyles = new Map();\r\n  const keys = Object.keys(styles);\r\n  keys.forEach((key) => {\r\n    if (typeof styles[key] === \"string\") {\r\n      transformStyles.set(key, styles[key]);\r\n    }\r\n  });\r\n  return transformStyles;\r\n}\r\n\r\nfunction transformChildrenForVNode(children) {\r\n  let transformChildren;\r\n  if (Array.isArray(children)) {\r\n    transformChildren = children.map((child) => {\r\n      if (typeof child === \"string\") return document.createTextNode(child);\r\n      return child;\r\n    });\r\n  } else if (typeof children === \"string\") transformChildren = children;\r\n  else if (children !== null) transformChildren = children;\r\n  else transformChildren = \"\";\r\n  return transformChildren;\r\n}\r\n\r\nfunction h(tag, props, children) {\r\n  const simpleAttrs = transformSimpleAttrsForVNode(\r\n    props === null || props === void 0 ? void 0 : props.simpleAttrs\r\n  );\r\n  const classes = transformClassesForVNode(\r\n    props === null || props === void 0 ? void 0 : props.classes\r\n  );\r\n  const events = transformEventsForVNode(\r\n    props === null || props === void 0 ? void 0 : props.events\r\n  );\r\n  const styles = transformStylesForVNode(\r\n    props === null || props === void 0 ? void 0 : props.styles\r\n  );\r\n  const tChildren = transformChildrenForVNode(children || \"\");\r\n  return {\r\n    tag,\r\n    props: {\r\n      simpleAttrs,\r\n      classes,\r\n      events,\r\n      styles,\r\n    },\r\n    children: tChildren,\r\n  };\r\n}\r\n\r\n// H //\r\n\r\n// Mount\r\n\r\nfunction mount(vNode, container) {\r\n  const htmlElement = createHtmlElementFromVNode(vNode);\r\n  container.append(htmlElement);\r\n  vNode.$el = htmlElement;\r\n}\r\n\r\nfunction createHtmlElementFromVNode(vNode) {\r\n  const el = document.createElement(vNode.tag);\r\n  vNode.props.events.forEach((eventHandler, eventName) => {\r\n    el.addEventListener(eventName, eventHandler);\r\n  });\r\n  vNode.props.styles.forEach((value, property) => {\r\n    if (property !== \"length\" && property !== \"parentRule\") {\r\n      el.style[property] = value;\r\n    }\r\n  });\r\n  vNode.props.simpleAttrs.forEach((attrValue, attrName) => {\r\n    el.setAttribute(attrName, attrValue);\r\n  });\r\n  vNode.props.classes.forEach((className) => el.classList.add(className));\r\n  if (typeof vNode.children === \"string\") el.textContent = vNode.children;\r\n  else if (Array.isArray(vNode.children)) {\r\n    vNode.children.forEach((child) => {\r\n      if (child instanceof Text) el.append(child);\r\n      else mount(child, el);\r\n    });\r\n  } else mount(vNode.children, el);\r\n  return el;\r\n}\r\n\r\n// Mount //\r\n\r\n// Patch\r\n\r\nfunction optimizationForEvents(currentVNode, newVNode) {\r\n  if (currentVNode.$el === undefined) {\r\n    throw new Error(\r\n      \"First insert the virtual node into the dom using the mount function and then use this function\"\r\n    );\r\n  }\r\n  newVNode.$el = currentVNode.$el;\r\n  currentVNode.props.events.forEach((currentEventHandler, eventName) => {\r\n    var _a, _b, _c;\r\n    const newEventHandler = newVNode.props.events.get(eventName);\r\n    if (newEventHandler) {\r\n      if (newEventHandler.toString() !== currentEventHandler.toString()) {\r\n        (_a = newVNode.$el) === null || _a === void 0\r\n          ? void 0\r\n          : _a.removeEventListener(eventName, currentEventHandler);\r\n        (_b = newVNode.$el) === null || _b === void 0\r\n          ? void 0\r\n          : _b.addEventListener(eventName, newEventHandler);\r\n      }\r\n    } else\r\n      (_c = newVNode.$el) === null || _c === void 0\r\n        ? void 0\r\n        : _c.removeEventListener(eventName, currentEventHandler);\r\n  });\r\n  newVNode.props.events.forEach((eventHandler, eventName) => {\r\n    var _a;\r\n    if (!currentVNode.props.events.has(eventName)) {\r\n      (_a = newVNode.$el) === null || _a === void 0\r\n        ? void 0\r\n        : _a.addEventListener(eventName, eventHandler);\r\n    }\r\n  });\r\n}\r\n\r\nfunction optimizationForSimpleAttributes(currentVNode, newVNode) {\r\n  if (currentVNode.$el === undefined) {\r\n    throw new Error(\r\n      \"First insert the virtual node into the dom using the mount function and then use this function\"\r\n    );\r\n  }\r\n  newVNode.$el = currentVNode.$el;\r\n  currentVNode.props.simpleAttrs.forEach((currentAttrValue, attrName) => {\r\n    var _a, _b;\r\n    const newAttributeValue = newVNode.props.simpleAttrs.get(attrName);\r\n    if (newAttributeValue) {\r\n      if (newAttributeValue !== currentAttrValue) {\r\n        (_a = newVNode.$el) === null || _a === void 0\r\n          ? void 0\r\n          : _a.setAttribute(attrName, newAttributeValue);\r\n      }\r\n    } else\r\n      (_b = newVNode.$el) === null || _b === void 0\r\n        ? void 0\r\n        : _b.removeAttribute(attrName);\r\n  });\r\n  newVNode.props.simpleAttrs.forEach((attrValue, attrName) => {\r\n    var _a;\r\n    if (!currentVNode.props.simpleAttrs.has(attrName)) {\r\n      (_a = newVNode.$el) === null || _a === void 0\r\n        ? void 0\r\n        : _a.setAttribute(attrName, attrValue);\r\n    }\r\n  });\r\n}\r\n\r\nfunction optimizationForStyles(currentVNode, newVNode) {\r\n  if (currentVNode.$el === undefined) {\r\n    throw new Error(\r\n      \"First insert the virtual node into the dom using the mount function and then use this function\"\r\n    );\r\n  }\r\n  newVNode.$el = currentVNode.$el;\r\n  currentVNode.props.styles.forEach((value, property) => {\r\n    if (property !== \"length\" && property !== \"parentRule\") {\r\n      const newValue = newVNode.props.styles.get(property);\r\n      if (newValue) {\r\n        if (newValue !== value) {\r\n          currentVNode.$el.style[property] = newValue;\r\n        }\r\n      } else currentVNode.$el.style[property] = \"\";\r\n    }\r\n  });\r\n  newVNode.props.styles.forEach((value, property) => {\r\n    if (!currentVNode.props.styles.has(property)) {\r\n      if (property !== \"length\" && property !== \"parentRule\") {\r\n        currentVNode.$el.style[property] = value;\r\n      }\r\n    }\r\n  });\r\n}\r\n\r\nfunction optimizationForClasses(currentVNode, newVNode) {\r\n  if (currentVNode.$el === undefined) {\r\n    throw new Error(\r\n      \"First insert the virtual node into the dom using the mount function and then use this function\"\r\n    );\r\n  }\r\n  newVNode.$el = currentVNode.$el;\r\n  currentVNode.props.classes.forEach((className) => {\r\n    var _a;\r\n    if (!newVNode.props.classes.has(className)) {\r\n      (_a = newVNode.$el) === null || _a === void 0\r\n        ? void 0\r\n        : _a.classList.remove(className);\r\n    }\r\n  });\r\n  newVNode.props.classes.forEach((className) => {\r\n    var _a;\r\n    if (!currentVNode.props.classes.has(className)) {\r\n      (_a = newVNode.$el) === null || _a === void 0\r\n        ? void 0\r\n        : _a.classList.add(className);\r\n    }\r\n  });\r\n}\r\nfunction patch(currentVNode, newVNode) {\r\n  var _a;\r\n  if (currentVNode.$el === undefined) {\r\n    throw new Error(\r\n      \"First insert the virtual node into the dom using the mount function and then use this function\"\r\n    );\r\n  }\r\n  newVNode.$el = currentVNode.$el;\r\n  const currentChildren = currentVNode.children;\r\n  const newChildren = newVNode.children;\r\n  if (typeof currentChildren === \"string\" && typeof newChildren === \"string\") {\r\n    if (currentChildren !== newChildren) newVNode.$el.textContent = newChildren;\r\n  } else if (Array.isArray(currentChildren) && Array.isArray(newChildren)) {\r\n    [...currentVNode.$el.childNodes]\r\n      .splice(newChildren.length)\r\n      .forEach((child) => child.remove());\r\n    newChildren.forEach((newChild, index) => {\r\n      var _a, _b;\r\n      const currentChild =\r\n        (_a = currentVNode.$el) === null || _a === void 0\r\n          ? void 0\r\n          : _a.childNodes[index];\r\n      if (currentChild) {\r\n        if (newChild instanceof Text) {\r\n          if (currentChild instanceof Text) {\r\n            if (currentChild.textContent !== newChild.textContent) {\r\n              currentChild.replaceWith(newChild);\r\n            }\r\n          } else currentChild.replaceWith(newChild);\r\n        } else if (currentChild instanceof Text) {\r\n          const newHtmlElement = createHtmlElementFromVNode(newChild);\r\n          currentChild.replaceWith(newHtmlElement);\r\n        } else patch(currentChildren[index], newChild);\r\n      } else if (newChild instanceof Text)\r\n        (_b = newVNode.$el) === null || _b === void 0\r\n          ? void 0\r\n          : _b.append(newChild);\r\n      else mount(newChild, newVNode.$el);\r\n    });\r\n  } else if (\r\n    Array.isArray(currentChildren) &&\r\n    typeof newChildren === \"string\"\r\n  ) {\r\n    newVNode.$el.textContent = newChildren;\r\n  } else if (\r\n    typeof currentChildren === \"string\" &&\r\n    Array.isArray(newChildren)\r\n  ) {\r\n    newVNode.$el.textContent = \"\";\r\n    newChildren.forEach((child) => {\r\n      var _a;\r\n      if (child instanceof Text)\r\n        (_a = newVNode.$el) === null || _a === void 0\r\n          ? void 0\r\n          : _a.append(child);\r\n      else mount(child, newVNode.$el);\r\n    });\r\n  } else if (\r\n    typeof currentChildren === \"object\" &&\r\n    Array.isArray(newChildren)\r\n  ) {\r\n    (_a = currentChildren.$el) === null || _a === void 0 ? void 0 : _a.remove();\r\n    newChildren.forEach((child) => {\r\n      var _a;\r\n      if (child instanceof Text)\r\n        (_a = newVNode.$el) === null || _a === void 0\r\n          ? void 0\r\n          : _a.append(child);\r\n      else mount(child, newVNode.$el);\r\n    });\r\n  } else if (\r\n    Array.isArray(currentChildren) &&\r\n    typeof newChildren === \"object\"\r\n  ) {\r\n    currentVNode.$el.textContent = \"\";\r\n    mount(newChildren, currentVNode.$el);\r\n  } else if (\r\n    typeof currentChildren === \"string\" &&\r\n    typeof newChildren === \"object\"\r\n  ) {\r\n    currentVNode.$el.textContent = \"\";\r\n    mount(newChildren, currentVNode.$el);\r\n  } else if (\r\n    typeof currentChildren === \"object\" &&\r\n    typeof newChildren === \"string\"\r\n  ) {\r\n    currentVNode.$el.textContent = newChildren;\r\n  }\r\n  optimizationForSimpleAttributes(currentVNode, newVNode);\r\n  optimizationForClasses(currentVNode, newVNode);\r\n  optimizationForEvents(currentVNode, newVNode);\r\n  optimizationForStyles(currentVNode, newVNode);\r\n}\r\n\r\n// patch //\r\n\n\n//# sourceURL=webpack://virualdom1/./node_modules/virtual-dom-library/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/component.js");
/******/ 	
/******/ })()
;