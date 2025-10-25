function addTodo({ newTask, setNewTask, tasks, setTasks }) {
    if (!newTask.trim()) return;
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setNewTask("");
}

export default addTodo;
