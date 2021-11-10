import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const getLocalToDos = JSON.parse(localStorage.getItem("toDos"));

const reducer = (state = getLocalToDos || [], action) => {
    switch (action.type) {
        case addToDo.type:
            const addedToDos = [
                { text: action.payload, id: Date.now() },
                ...state,
            ];
            localStorage.setItem("toDos", JSON.stringify(addedToDos));
            return addedToDos;
        case deleteToDo.type:
            const filteredToDos = state.filter(
                (toDo) => toDo.id !== action.payload
            );
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
