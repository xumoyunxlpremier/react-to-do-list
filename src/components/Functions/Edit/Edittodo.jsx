function startEdit(index, tasks, setEditingIndex, setEditingText) {
    setEditingIndex(index);
    setEditingText(tasks[index]);
}

function saveEdit({
    index,
    tasks,
    setTasks,
    editingText,
    setEditingText,
    setEditingIndex,
}) {
    if (!editingText.trim()) return;
    const updated = [...tasks];
    updated[index] = editingText;
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setEditingIndex(null);
    setEditingText("");
}

function cancelEdit(setEditingIndex, setEditingText) {
    setEditingIndex(null);
    setEditingText("");
}

export { startEdit, saveEdit, cancelEdit };
