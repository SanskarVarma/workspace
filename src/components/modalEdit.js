// src/components/TaskEditModal.js
import React, { useState, useEffect } from "react";

const TaskEditModal = ({ isOpen, task, onClose, onSave }) => {
    // Initialize state based on whether we're adding or editing
    const [taskName, setTaskName] = useState("");
    const [status, setStatus] = useState("in-progress");
    const [issues, setIssues] = useState("None");

    useEffect(() => {
        if (task) {
            setTaskName(task.taskName);
            setStatus(task.status);
            setIssues(task.issues);
        } else {
            // Reset fields if adding a new task
            setTaskName("");
            setStatus("in-progress");
            setIssues("None");
        }
    }, [task]);
    if (!isOpen) return null; // If modal is not open, render nothing
    const handleSave = () => {
        // Create the updated or new task object
        const updatedTask = {
            taskName,
            status,
            issues,
        };
        onSave(updatedTask); // Pass the task back to the parent
        onClose(); // Close the modal
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full">
                <h3 className="text-2xl font-bold mb-4">
                    {task ? "Edit Task" : "Add New Task"}
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Task Name</label>
                        <input
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter task name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Status</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="inProgressEdit"
                                name="status"
                                checked={status === "in-progress"}
                                onChange={() => setStatus("in-progress")}
                                className="mr-2"
                            />
                            <label htmlFor="inProgressEdit" className="text-gray-600">
                                In Progress
                            </label>
                            <input
                                type="radio"
                                id="doneEdit"
                                name="status"
                                checked={status === "done"}
                                onChange={() => setStatus("done")}
                                className="ml-4 mr-2"
                            />
                            <label htmlFor="doneEdit" className="text-gray-600">
                                Done
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700">Issues (optional)</label>
                        <input
                            type="text"
                            value={issues}
                            onChange={(e) => setIssues(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter issues"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            {task ? "Save Changes" : "Add Task"}
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskEditModal;
