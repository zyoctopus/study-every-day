1. Object.assign ：浅复制
2. {...obj} ：解构，浅复制
3. JSON.parase(JSON.stringify()) ：深复制，但是不能有循环引用，也就是对象的原型链必须是有限的
4. "structured clone" ：深复制
```
class StructuredCloner {
  constructor() {
    this.pendingClones_ = new Map();
    this.nextKey_ = 0;

    const channel = new MessageChannel();
    this.inPort_ = channel.port1;
    this.outPort_ = channel.port2;

    this.outPort_.onmessage = ({data: {key, value}}) => {
      const resolve = this.pendingClones_.get(key);
      resolve(value);
      this.pendingClones_.delete(key);
    };
    this.outPort_.start();
  }

  cloneAsync(value) {
    return new Promise(resolve => {
      const key = this.nextKey_++;
      this.pendingClones_.set(key, resolve);
      this.inPort_.postMessage({key, value});
    });
  }
}

const structuredCloneAsync = window.structuredCloneAsync =
    StructuredCloner.prototype.cloneAsync.bind(new StructuredCloner);


const main = async () => {
  const original = { date: new Date(), number: Math.random() };
  original.self = original;

  const clone = await structuredCloneAsync(original);

  // different objects:
  console.assert(original !== clone);
  console.assert(original.date !== clone.date);

  // cyclical:
  console.assert(original.self === original);
  console.assert(clone.self === clone);

  // equivalent values:
  console.assert(original.number === clone.number);
  console.assert(Number(original.date) === Number(clone.date));

  console.log("Assertions complete.");
};

main();
```
5. history.pushState() 和 history.replaceState() ：深复制

这种方法性能很差，多次调用可能会导致浏览器无响应，不建议使用；
```
const structuredClone = obj => {
  const oldState = history.state;
  history.replaceState(obj, null);
  const clonedObj = history.state;
  history.replaceState(oldState, null);
  return clonedObj;
};
```

6. a deep clone method is able to use everywhere

```
function deepClone(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Function
  if (obj instanceof Function) {
    copy = function() {
      return obj.apply(this, arguments);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
}
```

[参考](https://smalldata.tech/blog/2018/11/01/copying-objects-in-javascript)