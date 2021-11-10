import { configureStore, createSlice } from "@reduxjs/toolkit";

const getLocalToDos = JSON.parse(localStorage.getItem("toDos"));

const toDos = createSlice({
    name: "toDosReducer",
    initialState: getLocalToDos || [],
    reducers: {
        add: (state, action) => {
            const newToDo = { text: action.payload, id: Date.now() };
            state.push(newToDo);
            localStorage.setItem("toDos", JSON.stringify(state));
        },
        remove: (state, action) => {
            const filteredToDos = state.filter(
                (toDo) => toDo.id !== action.payload
            );
            localStorage.setItem("toDos", JSON.stringify(filteredToDos));
            return filteredToDos;
        },
    },
});

export const { add, remove } = toDos.actions;

export default configureStore({ reducer: toDos.reducer });
