// src/components/TaskBoard.js
import React, { useState } from "react";
import TaskEditModal from "./modalEdit"; // Ensure the correct path and filename

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // Handler to open the modal for adding a task
    const handleAdd = () => {
        setTaskToEdit(null); // Indicate that we're adding a new task, not editing
        setIsModalOpen(true);
    };

    // Handler to open the modal for editing a task
    const handleEdit = (index) => {
        setTaskToEdit({ ...tasks[index], index });
        setIsModalOpen(true);
    };

    // Handler to save the edited or newly added task from the modal
    const handleSaveEdit = (updatedTask) => {
        if (taskToEdit !== null && taskToEdit.index !== undefined) {
            // Editing an existing task
            const updatedTasks = tasks.map((task, index) =>
                index === taskToEdit.index ? updatedTask : task
            );
            setTasks(updatedTasks);
        } else {
            // Adding a new task via the modal
            setTasks([...tasks, updatedTask]);
        }
        setIsModalOpen(false); // Close the modal
    };

    // Handler to remove a task
    const handleRemove = (index) => {
        const filteredTasks = tasks.filter((_, i) => i !== index);
        setTasks(filteredTasks);
    };

    return (
        <div className="p-4">
            {/* Top "Add Task" Button */}
            <div className="flex mb-4 justify-center">
                <button
                    className="px-4 py-2 bg-slate-700 text-white rounded-md shadow-md hover:bg-slate-800 "
                    onClick={handleAdd}
                >
                    Add Task
                </button>
            </div>

            {/* Task List */}
            {(tasks.length > 0) ?
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="w-4/12 px-6 py-3">
                                    Task
                                </th>
                                <th scope="col" className="w-2/12 px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="w-4/12 px-6 py-3">
                                    Isuues
                                </th>
                                <th scope="col" className="w-2/12 px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length > 0 ? (
                                tasks.map((task, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {task.taskName}
                                        </td>
                                        <td className="px-6 py-4">{task.status}</td>
                                        <td className="px-6 py-4">{task.issues}</td>
                                        <td className="px-6 py-4 flex space-x-4">
                                            <button
                                                className="text-blue-600 hover:underline"
                                                onClick={() => handleEdit(index)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => handleRemove(index)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No tasks available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div> :
                <div className="justify-center mx-4 my-5 text-center">
                    <h1 className="text-3xl">Get your tasks rollin!!</h1>
                    <h2>Click on the Add task button to add you tasks</h2>
                </div>
            }
            {/* Modal for Adding or Editing Tasks */}
            {isModalOpen && (
                <TaskEditModal
                    isOpen={isModalOpen}
                    task={taskToEdit}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
};

export default TaskBoard;
