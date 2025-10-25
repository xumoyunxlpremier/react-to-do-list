function moveUp(index, tasks, setTasks) {
    if (index === 0) return;
    const updated = [...tasks];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
}

function moveDown(index, tasks, setTasks) {
    if (index === tasks.length - 1) return;
    const updated = [...tasks];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
}

export { moveDown, moveUp };
