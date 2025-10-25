function confirmDelete(index, setTaskToDelete, setShowModal) {
    setTaskToDelete(index);
    setShowModal(true);
}

function deleteTaskConfirmed({
    tasks,
    setTasks,
    taskToDelete,
    setTaskToDelete,
    setShowModal,
}) {
    const updated = tasks.filter((_, i) => i !== taskToDelete);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setShowModal(false);
    setTaskToDelete(null);
}

function cancelDelete(setShowModal, setTaskToDelete) {
    setShowModal(false);
    setTaskToDelete(null);
}

export { confirmDelete, deleteTaskConfirmed, cancelDelete };
