import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreator } from "../store";
import ToDo from "../components/ToDo";

function Home({ toDos, addToDo }) {
    const [text, setText] = useState("");
    function onChange(e) {
        setText(e.target.value);
    }
    function onSubmit(e) {
        e.preventDefault();
        setText("");
        addToDo(text);
    }
    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((toDo) => (
                    <ToDo {...toDo} key={toDo.id} />
                ))}
            </ul>
        </>
    );
}

function mapStateToProps(state, ownProps) {
    return { toDos: state };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addToDo: (text) => dispatch(actionCreator.addToDo(text)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
