# hooks

## useState

> 直接`替换`老状态返回新状态；

1. react 怎么保证多个 useState 相互独立？

答：react 按照 useState 出现顺序来定，这就是为什么 useState 不能写在 ifelse 里，会造成执行顺序错乱；

2. 多个useState的值会类似与链表一样存储在fiber上，memoizedState用来存储对应的state，next指向下一个useState创建的state；

## useEffect

1. 一个函数组件可以有多个副作用，而且这些副作用是异步的，不会阻碍浏览器更新视图；（如果要在更新视图之前执行副作用，可以使用 useLoyoutEffect）
2. 相当于 componentDidMount、componentDidUpdate、componentWillUnmount 的集合，但是不完全正确；react 首次渲染和之后每次渲染都会调用一次，React 会等待浏览器`完成画面渲染`之后才会延迟调用 useEffect；
3. useEffect 中可以返回一个函数，这个函数会在每次下一次渲染之后执行，相当于每次更新都会执行一次；
4. 第二个参数（数组）来告诉 react 只有当这个参数的值发生改变时，才执行我们传的副作用函数（第一个参数）。

## useContent

1. 同一个父组件的后台组件之间的全局数据共享;
2. 接收 React.createContext()的返回值作为参数，即 context 对象，并返回最近的 context。当最近的 context 更新时，使用该 context 的 Hooks 将会重新渲染；

## useReducer

1. useState 的增强体，用于处理复杂的状态管理，灵感来源于 Redux 的 reducer；

```(JavaScript)
// 对比：
const [state, setState] = useState(initState)

const [state, dispatch] = useReducer(reducer, initState, initAction)
```

2. 具体用法：

```(JavaScript)
import { useReducer } from 'react'
const initState = { count: 0 }
const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            return { count: state.count+1 }
        case 'DEL':
            return { count: state.count-1 }
        case 'RESET':
            return initState
        default:
            return state
    }
}
export default function UserCompt() {
    const [state, dispatch] = useReducer(reducer, initState)
    return (<div>
        <p>{state.count}</p>
        <div>
            <button onClick={() => dispatch({type: 'ADD'})}>增加</button>
            <button onClick={() => dispatch({type: 'DEL'})}>减少</button>
            <button onClick={() => dispatch({type: 'RESET'})}>重置</button>
        </div>
    </div>)
}
```

> 因为函数组件的每次更新，在 return 之前的代码都会重新执行，父组件传递一个函数给子组件的时候，由于父组件的更新会导致该函数/对象重新生成从而传递给子组件的函数/对象引用发生了变化，这就会导致子组件也会更新，而很多时候子组件的更新是没必要的，这样对性能开销产生浪费，为了避免一些非必要计算，所以有了一系列性能优化的 hooks，如下：

## useMemo(callback, array)

1. 性能优化————通过记忆值来`避免在每个渲染上`都执行高开销的计算；适用于复杂的计算场景，如复杂的列表渲染，对象深拷贝...（用来控制只有在某些变化下，才重新进行复杂计算操作）；
2. 不能在 useMemo() 中处理副作用逻辑，而是把副作用处理逻辑放在 useEffect()；

## useCallback(callback, array)

1. 性能优化————与 useMemo()不同的是，返回值是 callback 本身；
2. 类似于 useMemo 返回一个函数；
3. useCallback 的真正目的还是在于缓存了每次渲染时 inline callback 的实例，这样方便配合上子组件的 shouldComponentUpdate 或者 React.memo 起到减少不必要的渲染的作用。因为 callback 的引用不变，对应的子组件在 diff 算法时就不会进入更新队列重新渲染；

## useRef()

1. 方便访问操作 DOM；

```
const RefCompt = ()=>{
    //创建ref
    const inputRef = useRef()
    const getValue = ()=>{
        //访问ref
        const inpt = inputRef.current;  // input的DOM对象
        console.log(inpt.value)  // input输入框的值
    }
    //挂载
    return (<div>
        <input ref={inputRef} type="text" />
        <button onClick={ getValue }>获取值</button>
    </div>)
}
```

2. 利用 useRef 创造一个在多次 render 时一般不会变化的 ref, 再将需要访问的值更新到这个 ref 中，来实现”穿透“闭包的功能。

```
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useLayoutEffect(() => {
    textRef.current = text; // 将 text 写入到 ref
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // 从 ref 中读取 text
    alert(currentText);
  }, [textRef]); // handleSubmit 只会依赖 textRef 的变化。不会在 text 改变时更新

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```
