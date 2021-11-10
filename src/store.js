import { createStore } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const getLocalToDos = JSON.parse(localStorage.getItem("toDos"));

const reducer = createReducer(getLocalToDos || [], {
    [addToDo]: (state, action) => {
        const newToDo = { text: action.payload, id: Date.now() };
        state.push(newToDo);
        localStorage.setItem("toDos", JSON.stringify(state));
    },
    [deleteToDo]: (state, action) => {
        const filteredToDos = state.filter(
            (toDo) => toDo.id !== action.payload
        );
        localStorage.setItem("toDos", JSON.stringify(filteredToDos));
        return filteredToDos;
    },
});

const store = createStore(reducer);

export const actionCreator = {
    addToDo,
    deleteToDo,
};

export default store;
