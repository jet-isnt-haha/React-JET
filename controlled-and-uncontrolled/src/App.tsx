import { ChangeEvent, useEffect, useRef, useState } from "react";
/* 
    前端开发经常会涉及表单的处理，或者其他一些用于输入的组件，比如日历组件。

    涉及到输入，就绕不开受控模式和非受控模式的概念。

    什么是受控，什么是非受控呢？

    想一下，改变表单值只有两种情况：



    用户去改变 value 或者代码去改变 value。

    如果不能通过代码改表单值 value，那就是非受控，也就是不受我们控制。

    但是代码可以给表单设置初始值 defaultValue。



    代码设置表单的初始 value，但是能改变 value 的只有用户，代码通过监听 onChange 来拿到最新的值，或者通过 ref 拿到 dom 之后读取 value。

    这种就是非受控模式。

    反过来，代码可以改变表单的 value，就是受控模式。



    注意，value 和 defaultValue 不一样：

    defaultValue 会作为 value 的初始值，后面用户改变的是 value。

    而一旦你给 input 设置了 value，那用户就不能修改它了，可以输入触发 onChange 事件，但是表单的值不会变。

    用户输入之后在 onChange 事件里拿到输入，然后通过代码去设置 value。

    这就是受控模式。

    其实绝大多数情况下，非受控就可以了，因为我们只是要拿到用户的输入，不需要手动去修改表单值。

    但有的时候，你需要根据用户的输入做一些处理，然后设置为表单的值，这种就需要受控模式。

    或者你想同步表单的值到另一个地方的时候，类似 Form 组件，也可以用受控模式。

    value 由用户控制就是非受控模式，由代码控制就是受控模式。
*/

/* function App() {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  return <input defaultValue={"jet"} onChange={onChange} />;
} */

//非受控组件模式也不一定通过onChange拿到最新value，通过ref也可以

/* function App() {
  //（引用DOM的ref初始化为null使其只读）
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      console.log(inputRef.current?.value);
    }, 2000);
  }, []);

  return <input defaultValue={"jet"} ref={inputRef} />;
} */

//受控组件
/* function App() {
  const [value, setValue] = useState("JET");

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    // setValue(event.target.value);
  }

  return <input value={value} onChange={onChange} />;
} */
/* 
    注释setValue可以看到，用户输入，onChange也可以拿到输入后的表单值，但是value并没有改变。

    把注释取消掉就可以了
    虽然功能上差不多，但是这种写法是不推荐的：
    因为每次set都会导致组件重新渲染
    这种受控模式每次都会导致组件重新渲染
    而非受控只会渲染一次
*/

//什么情况下使用受控模式呢？
//是需要对输入的值做处理之后设置到表单的时候，或者想实时同步状态到父组件时
//比如把用户输入改为大写:
/* function App() {
  const [value, setValue] = useState("JET");

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setValue(event.target.value.toUpperCase());
  }
  return <input value={value} onChange={onChange} />;
}function App() {
  const [value, setValue] = useState("JET");

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setValue(event.target.value.toUpperCase());
  }
  return <input value={value} onChange={onChange} />;
} */
/* 
    这种，需要把用户的输入修改一下再设置value的场景很少
    Form组件，用Form.item包裹的表单项都是受控组件：
    那是因为Form组件内有一个Store，会把表单值同步过去，然后集中管理和设置值：
        但也因为都是受控组件，随着用户的输入，表单重新渲染很多次，性能会不好。
        如果单独用的组件，比如Calendar，那就不需要使用受控模式了，使用defaultValue用非受控模式就可以了。
*/
/* 
除了原生表单元素外，组件也需要考虑受控和非受控的情况。

比如日历组件：



它的参数就要考虑是支持非受控模式的 defaultValue，还是用受控模式的 value + onChange。

如果这是一个业务组件，那基本就是用非受控模式的 defaultValue 了，调用方只要拿到用户的输入就行。

用受控模式的 value 还要 setValue 触发额外的渲染。

但是基础组件不能这样，你得都支持，让调用者自己去选择。

ant design 的 Calendar 组件就是这样的：


ColorPicker 组件也是：


它同时支持了受控组件和非受控组件。

首先写下非受控组件的写法：
*/

/* interface CalendarProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const { defaultValue = new Date(), onChange } = props;

  const [value, setValue] = useState(defaultValue);

  function changeValue(date: Date) {
    setValue(date);
    onChange?.(date);
  }

  return (
    <div>
      {value.toLocaleDateString()}
      <div
        onClick={() => {
          changeValue(new Date("2025-5-1"));
        }}
      >
        2024-5-1
      </div>
    </div>
  );
}

function App() {
  return (
    <Calendar
      defaultValue={new Date("2023-5-1")}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
} */
/* 
    这里Calendar组件传入defaultValue和onChange参数
    defaultValue会作为value的初始值，然后用户点击不同日期会修改value，然后onChange函数。
    这种情况，调用者只能设置defaultValue初始值，不能直接传入value来控制，所以是非受控组件
*/

//受控模式
/* interface CalendarProps {
  value: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const { value, onChange } = props;

  function changeValue(date: Date) {
    onChange?.(date);
  }

  return (
    <div>
      {value.toLocaleDateString()}
      <div
        onClick={() => {
          changeValue(new Date("2025-5-1"));
        }}
      >
        2024-5-1
      </div>
    </div>
  );
}
function App() {
  const [value, setValue] = useState(new Date("2023-5-1"));

  return (
    <Calendar
      value={value}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
        setValue(date);
      }}
    />
  );
} */
/* 
    直接用props传入的value，然后切换日期的时候回调onChange函数
    value的值的维护在调用方。这就是受控组件的写法
*/

//受控模式和非受控模式都支持的组件库
/* interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const { value: propsValue, defaultValue, onChange } = props;

  const [value, setValue] = useState(() => {
    if (propsValue !== undefined) {
      return propsValue;
    } else {
      return defaultValue;
    }
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      console.log("aaa");
      setValue(propsValue);
    }
    isFirstRender.current = false;
  }, [propsValue]);

  const mergedValue = propsValue === undefined ? value : propsValue;

  function changeValue(date: Date) {
    if (propsValue === undefined) {
      setValue(date);
    }
    onChange?.(date);
  }

  return (
    <div>
      {mergedValue?.toLocaleDateString()}
      <div
        onClick={() => {
          changeValue(new Date("2025-5-1"));
        }}
      >
        2023-5-1
      </div>
    </div>
  );
}

function App() {
  return (
    <Calendar
      defaultValue={new Date("2024-5-1")}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
} */
/* function App() {
  const [date, setDate] = useState(new Date("2024-5-1"));

  return (
    <Calendar
      value={date}
      onChange={(date) => {
        setDate(date);
        console.log(date.toLocaleDateString());
      }}
    />
  );
} */
/* 
    参数同时支持 value 和 defaultValue，通过判断 value 是不是 undefined 来区分受控模式和非受控模式。



如果是受控模式，useState 的初始值设置 props.value，然后渲染用 props.value。

如果是非受控模式，那渲染用内部 state 的 value，然后 changeValue 里 setValue。

当不是首次渲染，但 value 变为 undefined 的情况，也就是从受控模式切换到了非受控模式，要同步设置 state 为 propsValue。

这样，组件就同时支持了受控和非受控模式。
*/

//封装hook

function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T;
    value?: T;
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { defaultValue, value: propsValue } = props || {};

  const isFirstRender = useRef(true);

  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      return propsValue!;
    } else if (defaultValue !== undefined) {
      return defaultValue!;
    } else {
      return defaultStateValue;
    }
  });

  useEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }
    isFirstRender.current = false;
  }, [propsValue]);

  const mergedValue = propsValue === undefined ? stateValue : propsValue;

  return [mergedValue, setStateValue];
}
interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const { value: propsValue, defaultValue, onChange } = props;

  const [mergedValue, setValue] = useMergeState(new Date(), {
    value: propsValue,
    defaultValue,
  });

  function changeValue(date: Date) {
    if (propsValue === undefined) {
      setValue(date);
    }
    onChange?.(date);
  }

  return (
    <div>
      {mergedValue?.toLocaleDateString()}
      <div
        onClick={() => {
          changeValue(new Date("2024-5-1"));
        }}
      >
        2023-5-1
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-2"));
        }}
      >
        2023-5-2
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-3"));
        }}
      >
        2023-5-3
      </div>
    </div>
  );
}

/* function App() {
  return (
    <Calendar
      defaultValue={new Date("2024-5-1")}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
} */
function App() {
  const [date, setDate] = useState(new Date("2024-5-1"));

  return (
    <Calendar
      value={date}
      onChange={(date) => {
        setDate(date);
        console.log(date.toLocaleDateString());
      }}
    />
  );
}
export default App;

/* 涉及到用户输入的组件都要考虑用受控模式还是非受控模式。

value 由用户控制就是非受控模式，由代码控制就是受控模式。

非受控模式就是完全用户自己修改 value，我们只是设置个 defaultValue，可以通过 onChange 或者 ref 拿到表单值。

受控模式是代码来控制 value，用户输入之后通过 onChange 拿到值然后 setValue，触发重新渲染。

单独用的组件，绝大多数情况下，用非受控模式就好了，因为你只是想获取到用户的输入。

受控模式只在需要对用户的输入做一些修改然后再设置到 value 的情况用，再就是实时同步表单值到父组件的时候，比如 Form。

如果需要结合 Form 表单用，那是要支持受控模式，因为 Form 会通过 Store 来统一管理所有表单项。

封装业务组件的话，用非受控模式或者受控都行。

有的团队就要求组件一定是受控的，然后在父组件里维护状态并同步到状态管理库，这样组件重新渲染也不会丢失数据。

但是基础组件还是都要支持，也就是支持 defaultValue 和 value + onChange 两种参数，内部通过判断 value 是不是 undefined 来区分。

写组件想同时支持受控和非受控，可以直接用 ahooks 的 useControllableValue，也可以自己实现。

arco design、ant design 等组件库都是这么做的，并且不约而同封装了 useMergedValue 的 hook，我们也封装了一个。

理清受控模式和非受控模式的区别，在写组件的时候灵活选用或者都支持。 */
