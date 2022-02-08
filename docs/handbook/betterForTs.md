---
title: 怎样在项目中用好TS
author: 小何尖尖角
date: '2021-02-08'
---

# 善用

## 1. 善用类型注释

```ts
/** person form submit information */
export interface Form {
  age: number
  name: string
}
```

- 根据上述代码，我们使用/\*\* \*/来对 ts 接口进行注释

## 2. 善用类型扩展

### 2.1 interface & type

```ts
/** student info */
export interface Point {
  nNumber: number
  genders: string
}

export interface SetPoint {
  (nNumber: number, genders: string): void
}

export type typePoint = {
  nNumber: number
  genders: string
  age: number
}

export type setTypePoint = (nNumber: number, genders: string) => void
```

### 2.2 interface extends interface

```ts
// interface extends interface
export interface PartialPointX {
  nNumber: number
}

export interface Point extends PartialPointX {
  age: number
  name: string
}
```

### 2.3 Type alias extends type alias

```ts
// Type alias extends type alias
export type myTypePartialPoint = {
  nNumber: number
}

export type myTypePoint = myTypePartialPoint & { name: string }
```

### 2.4 Interface extends type alias

```ts
export type TypePartialPoint = {
  nNumber: number
}

interface myExtendsTypePoint extends TypePartialPoint {
  name: string
}
```

### 2.5 Type alias extends interface

```ts
interface myInterfacePointX {
  nNumber: number
}

export type myTypeExtendsPoint = myInterfacePointX & {
  name: string
  age: number
  gender: string
}
```

### 2.6 接口和类型别名选用时机

[参考 stackOverflow](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript)

- 在定义公共 API（如编辑一个库）时使用 interface，这样可以方便使用者继承接口；
- 在定义组件属性（Props）和状态（State）时，建议使用 type，因为 type 的约束性更强；
- type 类型不能二次编辑，而 interface 可以随时扩展。

## 3. 善用声明文件

### 3.1 第三方声明文件

[搜索 TS 支持的第三方声明文件](https://www.typescriptlang.org/dt/search?search=)

### 3.2 自定义声明文件

- 在目录下新建.d.ts 文件(具体还需要细致学习) [TS 声明文件](http://ts.xcatliu.com/basics/declaration-files.html)

## 4. 善用 TypeScript 支持的 JS 新特性

### 4.1 可选链

- 如下代码，当我们没有使用 TS 新特性的时候，为了保证安全，我们需要这么写代码。

```ts
type Change = user && user.info && user.info.getAge()
```

- 如下代码，我们选择可选链修改上方代码。
- 可选链是一种先检查属性是否存在，再尝试访问该属性的运算符。TypeScript 在尝试访问  `user.info`  前，会先尝试访问 `user` ，只有当 `user`  既不是  `null ` 也不是  `undefined`  才会继续往下访问，如果 `user` 是 `null` 或者  `undefined`，则表达式直接返回  `undefined`。

```ts
type Change = user?.info?.getAge?.()
```

### 4.2 空值合并运算符

- 空值合并运算符 ?? 是`ES12(ES2021)`新增的特性，`TypeScript 3.7 `支持了这个特性。当左侧的操作数为 `null` 或者 `undefined` 时，返回其右侧操作数，否则返回左侧操作数。

```ts
const user = {
  level: 0,
  other_level: null
}

export const level = user.level ?? '暂无等级' // 0
export const level1 = user.other_level ?? '暂无等级' // 暂无等级
```

## 5. 善用访问限定修饰符

- TypeScript 的类定义允许使用  private、protected  和  public  这三种访问修饰符声明成员访问限制，并在编译期进行检查：

- public : 公有类型，在类里面、子类、类外面都可以访问到，如果不加任何修饰符，默认为此访问级别；
- protected : 保护类型，在类里面、子类里面可以访问，在类外部不能访问；
- private : 私有类型，只能在当前类内部访问。

- 如果不加任何修饰符，默认为  public  访问级别：

```ts
export class Person {
  private name: string
  private age: number
  // static 关键字，可以将类里面的属性和方法定义为类的静态属性和方法
  public static sex: string = 'male'

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  public run(): void {
    console.log(this.name + '在跑步')
  }

  public setName(name: string): void {
    this.name = name
    console.log(this.name + '在改名')
  }
}
```

## 6. 善用类型收窄

### 6.1 类型断言

```ts
// 类型断言
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true
  }
  return false
}
```

### 6.2 类型守卫

:::tip
typeof
:::

- typeof 实现类型收窄和 never 类型的特性做全面性检查
- 此时不安全，因为后期同事可能修改 Foo 的类型，比如新增一个 boolean

```ts
type Foo = string | number
function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === 'string') {
    // 收窄为string
  } else if (typeof foo === 'number') {
    // 收窄为number
  } else {
    // foo此时为never
    const check: never = foo
  }
}
```

:::tip
instanceof
:::

- 使用 instanceof 来收窄变量类型

```ts
class Man {
  handsome = 'handsome'
}

class Woman {
  beautiful = 'beautiful'
}

function Human(arg: Man | Woman) {
  if (arg instanceof Man) {
    console.log(arg.handsome)
    // console.log(arg.beautiful)
  } else {
    console.log(arg.beautiful)
  }
}

interface A {
  a: string
}

interface B {
  b: string
}
```

:::tip
in
:::

- 使用 in 做属性检查

```ts
// in属性检查
function foo(x: A | B) {
  if ('a' in x) {
    return x.a
  }
  return x.b
}
```

### 6.3 双重断言

- 如非必要，请谨慎使用

```ts
// 双重断言
function handler(event: Event) {
  const element = event as any as HTMLElement
}
```

### 6.3 联合类型

- 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法。

```ts
// 联合类型
interface Cat {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}

function getName(animal: Cat | Fish) {
  return animal.name
}
```

## 7. 善用常量枚举

- 常数枚举与普通枚举的区别是，前者会在编译阶段被移除，并且不能包含计算成员（即常量枚举成员初始值设定项只能包含文字值和其他计算的枚举值）。

```ts
// 善用常量枚举
const enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}
```

- 当我们不需要一个对象，而需要对象的值，就可以使用常数枚举，这样就可以避免在编译时生成多余的代码和间接引用。

```ts
enum Char {
  // 常量枚举成员
  a,
  b = Char.a,
  c = 1 + 3,
  // 非常亮每句成语
  d = Math.random(),
  e = 'hello'.length
}
```

## 8. 善用高级类型

### 8.1 类型索引(keyof)

- keyof 类似于 Object.keys ，用于获取一个接口中 Key 的联合类型：

```ts
interface Button {
  type: string
  text: string
}

// 类型索引（keyof）
type ButtonKeys = keyof Button
// 等效于
type ButtonKeysEqual = 'type' | 'text'
```

### 8.2 类型约束(extends)

- extends 经常与 keyof 一起使用，例如我们有一个 getValue 方法专门用来获取对象的值，但是这个对象并不确定，我们就可以使用 extends 和 keyof 进行约束：

```ts
function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const obj = { b: 1 }
// const aa = getValue(obj, 'a')
// 当传入对象没有的 key 时，编辑器则会报错。
const aaa = getValue(obj, 'b')
```

### 8.3 类型映射(in)

- in 关键词的作用主要是做类型的映射，遍历已有接口的 key 或者是遍历联合类型。以内置的泛型接口 Readonly 为例，它的实现如下：

```ts
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P]
}

interface Obj {
  a: string
  b: string
}

type ReadOnlyObj = ReadOnly<Obj>

interface Obj1 {
  readonly a: string
  readonly b: string
}
```

### 8.4 条件类型(U ? X : Y)

- 上面的意思就是，如果 T 是 U 的子集，就是类型 X，否则为类型 Y。以内置的泛型接口 Extract 为例，它的实现如下：

```ts
// T extends U ? X : Y
// T是U的子集返回类型x
type Extract<T, U> = T extends U ? T : never
```

- TypeScript 将使用 never 类型来表示不应该存在的状态。上面的意思是，如果 T 中的类型在 U 存在，则返回，否则抛弃。
- 假设我们两个类，有三个公共的属性，可以通过 Extract 提取这三个公共属性：

```ts
interface Worker {
  name: string
  age: number
  email: string
  salary: number
}

interface Student {
  name: string
  age: number
  email: string
  grade: number
}

type CommonKeys = Extract<keyof Worker, keyof Student>
```

## 9 工具泛型

### 9.1 Exclude & Extract

- Exclude 的作用与之前介绍过的 Extract 刚好相反，如果 T 中的类型在 U 不存在，则返回，否则抛弃。

```ts
interface Worker {
  name: string
  age: number
  email: string
  salary: number
}

interface Student {
  name: string
  age: number
  email: string
  grade: number
}

type ExcludeKeys = Exclude<keyof Worker, keyof Student>
```

### 9.2 Partial & Required

- Partial 用于将一个接口的所有属性设置为可选状态
- Required 的作用刚好与 Partial 相反，就是将接口中所有可选的属性改为必须的

```ts
type newPerson = {
  name?: string
  sex?: string
}

type RequiredPerson = Required<newPerson>
```

### 9.3 Pick & Omit

- Pick 主要用于提取接口的某几个属性

```ts
interface Todo {
  title: string
  completed: boolean
  directions: string
}

type TodoPreview = Pick<Todo, 'title' | 'directions'>
```

- Omit 的作用刚好和 Pick 相反，主要用于剔除接口的某几个属性：

```ts
interface newTodo {
  title: string
  completed: boolean
  directions: string
}

type TodoPreviewTest = Omit<newTodo, 'title'>

type newTodoPreview = Pick<Partial<Omit<Todo, 'directions'>>, 'title'>
```
