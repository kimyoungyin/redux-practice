# vanilla-redux 정리 : pure redux

## 1. counter

store: data를 넣는 곳, 즉 state. data를 넣을 수 있는 장소를 생성함
state: application 내에서 변하는 데이터

createStore: store를 생성. reducer 함수가 인자로 필요함
createStore.getState() : 데이터를 받음

reducer: 데이터를 변경하는 함수. 오직 이 곳에서만 데이터를 변경할 수 있음. return 값이 application의 데이터가 됨. reducer에서 state를 초기화할 수 있음.
-> 매개변수 : currentState, action

Action: reducer에서 어떤 걸 보고 state를 변경할까? action! reducer의 두 번쨰 매개변수. 객체여야 한다(type key를 가져야 함).
-> action 전달하여 reducer 실행시키기 : store.dispatch(action)

subscribe: store 안에 있는 변화들을 알 수 있게 해줌
정리

1. 데이터를 저장할 store를 state를 변경하는 곳인 reducer
2. 이를 인자로 한 createStore(reducer) 즉, "store"를 받아 저장
3. store.dispatch(action) 메서드를 호출하면 reducer에서 매개변수로 받은 이 action 내용에 따라 state 변경
4. store에 저장된 state가 변경될 때마다 store.subscribe(함수)에 함수가 실행됨.

## 2. ToDoList

-   다른 곳에 갔다가 돌아와도 데이터가 유지되길 바람.

1.  action 객체에 들어갈 프로퍼티는 type 뿐만 아니라 다른 것도 추가 가능함. 사용할 데이터를 넣을 수 있음
2.  mutate(변형) state 절대 쓰지 말자: [이유](https://redux.js.org/basics/reducers)
    -> 상태를 수정하는 게 아니라, 새로운 객체 state를 return해야 함.

    ```js
    // reducer 내부
    // add
    state.push(action.text); // X
    return [...state, { text: action.text }]; // O
    // delete
    return state.filter((toDo) => action.id !== toDo.id);
    ```

# React-Redux 정리

## React에서 Redux 시작하기

1. 설치

```sh
npm i react-redux
```

2.  시작하기

    -   store, reducer: store 파일 내부에 작성(단 `export default store;` 해주자)
    -   준비: 구독할 컴포넌트를 등록하기 위해 최상단 index.js에 App을 감싸는 Provider 등록. store를 provider 속성으로 import

    ```js
    import ReactDOM from "react-dom";
    import { Provider } from "react-redux";
    import App from "./components/App";
    import store from "./store";
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );
    ```

    -   mapStateToProps(getState 개념): state를 사용하고 싶은 컴포넌트에서 `export default connect(mapStateToProps)(컴포넌트)`
        -   함수(문서 상 이름은 mapStateToProps): redux state, 해당 텀포넌트 props를 가져옴. return 값(꼭 state 자체일 필요는 없음)은 해당 컴포넌트의 prop이 됨

    ```js
    function mapStateToProps(state, ownProps) {
        // store의 state, 컴포넌트 내부 props
        return { toDos: state };
    }
    export default connect(getCurrentState)(Home);
    ```

    -   mapDispatchToProps(dispatch(action) 개념): dispatch를 사용하고 싶은 컴포넌트에서 `export default connect(null,mapDispatchToProps)(컴포넌트)`
        -   함수(문서 상 이름은 mapDispatchToProps): dispatch 함수, 해당 텀포넌트 props를 가져옴. return 값(꼭 dispatch 자체일 필요는 없음)은 해당 컴포넌트의 prop이 됨
        -   컴포넌트 내부에서 dispatch를 쓰는 것을 피하는 게 깔끔하다고 함.
        -   deletToDo도 마찬가지

    ```js
    // store.js
    export const actionCreator = {
        addToDo,
        deleteToDo,
    };
    // Home.js
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            addToDo: (text) => dispatch(actionCreator.addToDo(text)),
        };
    }
    // Home 컴포넌트
    function Home({ toDos, addToDo }) {...}
    // mapStateToProps, mapDispatchToProps 둘 다 필요한 경우 export
    export default connect(mapStateToProps, mapDispatchToProps)(컴포넌트);

    // deleteToDo
    // ToDo,js
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            onBtnClick: () => dispatch(actionCreator.deleteToDo(ownProps.id)),
        };
    }
    ```

## Redux toolkit 시작하기

-   기존 react-redux의 문제점: 코드가 너무 길다..
-   적은 양의 코드만으로 redux 기능을 사용할 수 없을까?

1. redux-toolkit 설치

```sh
npm i @reduxjs/toolkit
```

2. createAction: action을 정의하지 않아도 된다.

    - 대신 reducer에 전달된 action에는 type과 payload(데이터)만 있다.

    ```js
    // store.js
    import { createAction } from "@reduxjs/toolkit";

    const addToDo = createAction("ADD"); // addToDo.type === "ADD"
    const deleteToDo = createAction("DELETE"); // deleteToDo === "DELETE"
    // 아래는 전과 동일
    export const actionCreator = {
        addToDo,
        deleteToDo,
    };

    // home.js
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            addToDo: (text) => dispatch(actionCreator.addToDo(text)),
            // reducer에서 action.payload === text
        };
    }
    ```
