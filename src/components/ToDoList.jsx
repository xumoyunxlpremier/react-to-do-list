import React, { useState } from "react";
import addTodo from "./Functions/Add/AddTodo.jsx";
import {
    cancelDelete,
    confirmDelete,
    deleteTaskConfirmed,
} from "./Functions/Delete/Deleteconfirm.jsx";
import { moveDown, moveUp } from "./Functions/Move/Directions.jsx";
import { cancelEdit, saveEdit, startEdit } from "./Functions/Edit/Edittodo.jsx";
import {
    SunIcon,
    MoonIcon,
    Pencil2Icon,
    TrashIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    CheckIcon,
    Cross1Icon,
} from "@radix-ui/react-icons";

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved ? JSON.parse(saved) : true;
    });

    const [newTask, setNewTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    function toggleMode() {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", JSON.stringify(newMode));
    }

    return (
        <div className={`page ${darkMode ? "dark" : "light"}`}>
            <header>
                <h1>To-Do List</h1>
                <button className="mode-toggle" onClick={toggleMode}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </button>
            </header>

            <div className="input-row">
                <input
                    type="text"
                    placeholder="Add your todo..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                    onClick={() => addTodo({ newTask, setNewTask, tasks, setTasks })}
                >
                    Add
                </button>
            </div>

            <ul>
                {tasks.map((task, i) => (
                    <li key={i}>
                        {editingIndex === i ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                />
                                <div className="btns">
                                    <button
                                        onClick={() =>
                                            saveEdit({
                                                index: i,
                                                tasks,
                                                setTasks,
                                                editingText,
                                                setEditingText,
                                                setEditingIndex,
                                            })
                                        }
                                    >
                                        <CheckIcon />
                                    </button>
                                    <button onClick={() => cancelEdit(setEditingIndex, setEditingText)}>
                                        <Cross1Icon />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span>{task}</span>
                                <div className="btns">
                                    <button
                                        onClick={() => startEdit(i, tasks, setEditingIndex, setEditingText)}
                                    >
                                        <Pencil2Icon />
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(i, setTaskToDelete, setShowModal)}
                                    >
                                        <TrashIcon />
                                    </button>
                                    <button onClick={() => moveUp(i, tasks, setTasks)}>
                                        <ArrowUpIcon />
                                    </button>
                                    <button onClick={() => moveDown(i, tasks, setTasks)}>
                                        <ArrowDownIcon />
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Ushbu vazifani o‘chirmoqdasiz, ishonchingiz komilmi?</p>
                        <div className="modal-buttons">
                            <button
                                onClick={() =>
                                    deleteTaskConfirmed({
                                        tasks,
                                        setTasks,
                                        taskToDelete,
                                        setTaskToDelete,
                                        setShowModal,
                                    })
                                }
                            >
                                Ha, o‘chirish
                            </button>
                            <button onClick={() => cancelDelete(setShowModal, setTaskToDelete)}>
                                Yo‘q, bekor qilish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ToDoList;
