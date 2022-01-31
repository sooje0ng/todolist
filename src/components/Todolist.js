import React, { useState } from "react";
import "../styles/Todolist.scss";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { BsCheck2 } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";

function Todolist() {
    //1. 예쁘게 꾸미기
    //2. 삭제
    //3. 수정
    //4. 완료한 일정 체크

    const [text, setText] = useState("");
    const [todolist, setTodolist] = useState([]);
    const [count, setCount] = useState(0);
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState("");

    const textValue = (input) => {
        if (input.key === "Enter") {
            addTodo();
            return;
        }
        setText(input.target.value);
    };

    const addTodo = () => {
        if (text === "") return;
        const newTodolist = [];
        for (let i = 0; i < todolist.length; i++) {
            newTodolist[i] = todolist[i];
        }
        newTodolist[count] = {
            todo: text,
            complete: false,
        };
        setCount(count + 1);
        setTodolist(newTodolist);
        setText("");
        setEditIndex(-1);
        setEditText("");
    };

    const removeTodo = (index) => {
        const newTodolist = [];
        let j = 0;
        for (let i = 0; i < todolist.length; i++) {
            if (i === index) continue;
            newTodolist[j] = todolist[i];
            j++;
        }
        setCount(count - 1);
        setTodolist(newTodolist);
        setEditIndex(-1);
        setEditText("");
    };

    const tryEdit = (index) => {
        setEditIndex(index);
        setEditText(todolist[index]);
    };
    const editValue = (input, index) => {
        if (input.key === "Enter") {
            editTodo(index);
            return;
        }
        setEditText(input.target.value);
    };

    const editTodo = (index) => {
        const newTodolist = [];
        for (let i = 0; i < todolist.length; i++) {
            if (i === index) {
                newTodolist[i] = {
                    todo: editText,
                    complete: todolist[i].complete,
                };
                continue;
            }
            newTodolist[i] = todolist[i];
        }
        setTodolist(newTodolist);
        setEditIndex(-1);
        setEditText("");
    };

    const completeTodo = (index) => {
        const newTodolist = [];
        for (let i = 0; i < todolist.length; i++) {
            if (i === index) {
                newTodolist[i] = {
                    todo: todolist[i].todo,
                    complete: !todolist[i].complete,
                };
                continue;
            }
            newTodolist[i] = todolist[i];
        }
        setTodolist(newTodolist);
    };
    return (
        <div className="Todolist">
            <div className="Header">
                <input
                    type="text"
                    onKeyUp={textValue}
                    placeholder="What do you have to do?"
                />
                <IoIosAddCircleOutline
                    size={70}
                    color="white"
                    onClick={addTodo}
                />
            </div>
            <div className="Body">
                {todolist.map((value, index) => (
                    <div className="todo" key={index}>
                        {index === editIndex ? (
                            <input
                                className="editInput"
                                onKeyUp={(input) => editValue(input, index)}
                                defaultValue={value.todo}
                            />
                        ) : (
                            <div className="todoInner">
                                <FcCheckmark
                                    onClick={() => completeTodo(index)}
                                    style={{ marginRight: 10 }}
                                />
                                <p
                                    style={
                                        value.complete
                                            ? {
                                                  textDecorationLine:
                                                      "line-through",
                                              }
                                            : {}
                                    }
                                >
                                    {value.todo}
                                </p>
                            </div>
                        )}
                        <div className="icons">
                            {index === editIndex ? (
                                <BsCheck2 onClick={() => editTodo(index)} />
                            ) : (
                                <BsPencilSquare
                                    onClick={() => tryEdit(index)}
                                />
                            )}
                            <BiTrash onClick={() => removeTodo(index)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todolist;
