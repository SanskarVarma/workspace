import React, { useState } from "react";

const TaskBoard = () => {
    // State to store the form inputs
    const [taskName, setTaskName] = useState("");
    const [status, setStatus] = useState("in-progress"); // Default status is "in-progress"
    const [issues, setIssues] = useState("None");
    const [tasks, setTasks] = useState([]); // Array to hold the tasks
    const [isEditing, setIsEditing] = useState(false);
    const [index, setIndex] = useState(null);
    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Creating new task object
        const newTask = {
            taskName,
            status,
            issues,
        };
        if (isEditing) {
            const editedTask = [...tasks]
            editedTask[index] = newTask
            setTasks(editedTask)
            setIsEditing(false)
            setIndex(null)
        }
        else {
            // Update the tasks array with the new task
            setTasks([...tasks, newTask]);
        }

        // Clear the form after submission
        setTaskName("");
        setStatus("in-progress");
        setIssues("None");
    };
    const handleEdit = (index) => {
        const editedTask = tasks[index]
        setTaskName(editedTask.taskName)
        setStatus(editedTask.status)
        setIssues(editedTask.issues)
        setIsEditing(true);
        setIndex(index);
    }
    const handleRemove = (index) => {
        const editedTask = tasks.filter((task, i) => i !== index)
        setTasks(editedTask)
    }
    return (
        <div>
            <div className="max-w-md h mx-auto my-2 bg-slate-950 p-5 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-slate-400 text-center">Add New Task</h2>
                {/* Task Form */}
                <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-slate-400">Task Name</label>
                        <input
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="Enter task"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400">Status</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="inProgress"
                                name="status"
                                checked={status === "in-progress"}
                                onChange={() => setStatus("in-progress")}
                                className="mr-2"
                                style={{ accentColor: 'black' }} // Change this to your desired color
                            />
                            <label htmlFor="inProgress" className="text-slate-300">In Progress</label>
                            <input
                                type="radio"
                                id="done"
                                name="status"
                                checked={status === "done"}
                                onChange={() => setStatus("done")}
                                className="ml-4 mr-2"
                                style={{ accentColor: 'black' }} // Change this to your desired color
                            />
                            <label htmlFor="done" className="text-slate-300">Done</label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-slate-400">Issues (optional)</label>
                        <input
                            type="text"
                            value={issues}
                            onChange={(e) => setIssues(e.target.value)}
                            placeholder="None"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-slate-400 text-white px-4 py-2 rounded-md hover:bg-slate-500"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                    <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Isuues
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {tasks.length > 0 ? tasks.map((task, index) => (
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.taskName}
                                </th>
                                <td className="px-6 py-4">
                                    {task.status}
                                </td>
                                <td className="px-6 py-4">
                                    {task.issues}
                                </td>
                                <td className="flex items-center px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => { handleEdit(index) }}>Edit</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                        onClick={() => { handleRemove(index) }}>Remove</a>
                                </td>
                            </tr>

                        </tbody>
                    )) : (
                        <p className="text-gray-500">No tasks added yet.</p>
                    )}
                </table>
            </div>
        </div>
    );
};

export default TaskBoard;
