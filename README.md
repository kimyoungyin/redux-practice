# vanilla-redux 정리 : counter

## 1. pure redux

vanilla에서 redux를 사용하면? : html에 뭔가 바뀌었다고 알려주기 위해 필요한 추기적인 과정(함수, innerText 등)을 축약할 수 있음.

store: data를 넣는 곳, 즉 state. data를 넣을 수 있는 장소를 생성함
state: application 내에서 변하는 데이터

createStore: store를 생성. reducer 함수가 인자로 필요함
createStore.getState() : 데이터를 받음

reducer: 데이터를 변경하는 함수. 오직 이 곳에서만 데이터를 변경할 수 있음.return 값이 application의 데이터가 됨. reducer에서 state를 초기화할 수 있음.
-> 매개변수 : currentState, action

Action: reducer에서 어떤 걸 보고 state를 변경할까? action! reducer의 두 번쨰 매개변수. 객체여야 한다.
-> action 전달하여 reducer 실행시키기 : store.dispatch(action)

정리

1. 데이터를 저장할 store를 state를 변경하는 곳인 reducer
2. 이를 인자로 한 createStore(reducer)가 return하는 store를 받아 저장
3. store.dispatch(action) 메서드를 호출하면 reducer에서 매개변수로 받은 이 action 내용에 따라 state 변경
