const createVNode = (tagName, props = {}, ...children) => {
  console.log(children);

  if (typeof tagName === 'function') {
    return tagName(props, children);
  }

  return {
    tagName,
    props,
    children
  };
};

const createDOMNode = vNode => {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  const {
    tagName,
    props,
    children
  } = vNode;
  const node = document.createElement(tagName);
  patchProps(node, {}, props);
  children.forEach(child => {
    node.appendChild(createDOMNode(child));
  });
  return node;
};

const mount = (node, target) => {
  target.replaceWith(node);
  return node;
};

const createVApp = store => {
  const {
    count
  } = store.state;

  const decrement = () => store.setState({
    count: store.state.count - 1
  });

  const increment = () => store.setState({
    count: store.state.count + 1
  });

  return createVNode("div", {
    id: "app",
    class: "container",
    "data-count": String(count)
  }, createVNode("h1", null, "Hello, Virtual DOM"), createVNode("div", null, "Count: ", String(count)), "Text node without tags", createVNode("img", {
    src: "https://i.ibb.co/M6LdN5m/2.png",
    width: "200"
  }), createVNode("button", {
    onclick: decrement
  }, "-1"), createVNode("button", {
    onclick: increment
  }, "+1"));
};

const patchNode = (node, vNode, nextVNode) => {
  if (nextVNode === undefined) {
    node.remove();
    return;
  }

  if (typeof vNode === "string" || typeof nextVNode === "string") {
    if (vNode != nextVNode) {
      const nextNode = createDOMNode(nextVNode);
      node.replaceWith(nextNode);
      return nextNode;
    }

    return;
  }

  if (vNode.tagName != nextVNode.tagName) {
    const nextNode = createDOMNode(nextVNode);
    node.replaceWith(nextNode);
    return nextNode;
  }

  patchProps(node, vNode.props, nextVNode.props);
  patchChildren(node, vNode.children, nextVNode.children);
  return node;
};

const patchProp = (node, key, value, nextValue) => {
  if (key.startsWith("on")) {
    const eventName = key.slice(2);
    node[eventName] = nextValue;

    if (!nextValue) {
      node.removeEventListener(eventName, listener);
    } else if (!value) {
      node.addEventListener(eventName, listener);
    }

    return;
  }

  if (nextValue == null || nextValue === false) {
    node.removeAttribute(key);
    return;
  }

  node.setAttribute(key, nextValue);
};

const patchProps = (node, props, nextProps) => {
  const mergedProps = { ...props,
    ...nextProps
  };
  Object.keys(mergedProps).forEach(key => {
    if (props[key] !== nextProps[key]) {
      patchProp(node, key, props[key], nextProps[key]);
    }
  });
};

const patchChildren = (parent, vChildren, nextVChildren) => {
  parent.childNodes.forEach((childNode, i) => {
    patchNode(childNode, vChildren[i], nextVChildren[i]);
  });
  nextVChildren.slice(vChildren.length).forEach(vChild => {
    parent.appendChild(createDOMNode(vChild));
  });
};

const patch = (nextVNode, node) => {
  const vNode = node.v || recycleNode(node);
  node = patchNode(node, vNode, nextVNode);
  node.v = nextVNode;
  return node;
};

const recycleNode = node => {
  if (node.nodeType === 3) {
    return node.nodeValue;
  }

  const tagName = node.nodeName.toLowerCase();
  const children = [].map.call(node.childNodes, recycleNode);
  return createVNode(tagName, {}, children);
};

const createVButton = props => {
  const {
    text,
    onclick
  } = props;
  return createVNode("button", {
    onclick
  }, [text]);
};

function listener(event) {
  return this[event.type](event);
}

const store = {
  state: {
    count: 0
  },
  onStateChanged: () => {},

  setState(nextState) {
    this.state = nextState;
    this.onStateChanged();
  }

};
let vApp = createVApp(store);
let app = patch(vApp, document.getElementById('app'));

store.onStateChanged = () => {
  app = patch(createVApp(store), app);
};

setInterval(() => {
  store.setState({
    count: store.state.count + 1
  });
}, 1000);