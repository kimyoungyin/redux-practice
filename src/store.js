import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
    return {
        type: ADD,
        text,
    };
};

const deleteToDo = (id) => {
    return {
        type: DELETE,
        id: parseInt(id),
    };
};

const getLocalToDos = JSON.parse(localStorage.getItem("toDos"));

const reducer = (state = getLocalToDos || [], action) => {
    console.log(state);
    switch (action.type) {
        case ADD:
            const addedToDos = [
                { text: action.text, id: Date.now() },
                ...state,
            ];
            localStorage.setItem("toDos", JSON.stringify(addedToDos));
            return addedToDos;
        case DELETE:
            const filteredToDos = state.filter((toDo) => toDo.id !== action.id);
            localStorage.setItem("toDos", JSON.stringify(filteredToDos));
            return filteredToDos;
        default:
            return state;
    }
};

const store = createStore(reducer);

export const actionCreator = {
    addToDo,
    deleteToDo,
};

export default store;
