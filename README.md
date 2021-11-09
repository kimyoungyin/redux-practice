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
        state.push(action.text) // X
        return [...state, {text: action.text}] // O

        // delete
        return state.filter((toDo) => action.id !== toDo.id);
        ```
