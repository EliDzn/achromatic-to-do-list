import React from "react";

import "./App.css";
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Info,
  Pencil,
  Delete,
  ChevronLeft,
  ChevronDown
} from "lucide-react";

function App() {
  // Tasks
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskIndex, setTaskIndex] = useState(null);
  const [currentTask, setCurrentTask] = useState("");

  // Notes
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [currentNoteDescription, setCurrentNoteDescription] = useState("");
  const [noteIndex, setNoteIndex] = useState("");

  useEffect(() => {
    console.log(
      "Created on Wednesday, April 16, 2025 and finished on April 19, 2025 by Eli Dizon "
    );
  }, []);

  // For modals
  const taskDialogRef = useRef(null);
  const noteDialogRef = useRef(null);

  const openEditTaskDialog = (index) => {
    setTaskIndex(index);
    setCurrentTask(tasks[index]);
    taskDialogRef.current?.showModal();
  };

  const openEditNoteDialog = (index) => {
    setNoteIndex(index);
    setCurrentNoteTitle(notes[index].title);
    setCurrentNoteDescription(notes[index].description);
    noteDialogRef.current?.showModal();
  };

  const closeTaskDialog = () => {
    taskDialogRef.current?.close();
  };

  const closeNoteDialog = () => {
    noteDialogRef.current?.close();
  };

  // Data management for tasks
  const addTask = () => {
    if (taskDescription != "") {
      setTasks([...tasks, taskDescription.trim()]);
      console.log(tasks);
      setTaskDescription("");
    } else {
      alert("No task was typed");
    }
  };

  const editTask = () => {
    if (currentTask.trim() != "") {
      setTasks((prev) =>
        prev.map((task, i) => (i === taskIndex ? currentTask.trim() : task))
      );
      setCurrentTask("");
      closeTaskDialog();
    } else {
      alert("Task cannot be empty");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  // Data management for notes
  const addNote = () => {
    if (noteTitle != "" && noteDescription != "") {
      setNotes((prev) => [
        ...prev,
        { title: noteTitle.trim(), description: noteDescription.trim() }
      ]);
    } else {
      alert("Note title/description cannot be empty");
    }
  };

  const editNote = () => {
    if (currentNoteTitle.trim() != "" && currentNoteDescription.trim() != "") {
      setNotes((prev) =>
        prev.map((note, i) =>
          i === noteIndex
            ? {
                title: currentNoteTitle.trim(),
                description: currentNoteDescription.trim()
              }
            : note
        )
      );
      setCurrentNoteTitle("");
      setCurrentNoteDescription("");
      closeNoteDialog();
    } else {
      alert("Note title/description cannot be empty");
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((note, i) => i != index));
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    addNote();
    setNoteTitle("");
    setNoteDescription("");
  };

  const handleNoteEditSubmit = (e) => {
    e.preventDefault();
    editNote();
    closeNoteDialog();
  };

  return (
    <div
      id="page-container"
      className="min-h-screen bg-neutral-950 text-neutral-50 font-martianmono flex flex-col items-center justify-center transition-all"
    >
      <div className="w-[80%] flex flex-col gap-4 items-center mb-12">
        <section className="text-left w-full py-6">
          <h1 className="text-3xl font-semibold py-2 flex flex-row items-center gap-2">
            React To Do List Web Application
          </h1>
          <p>For studying useState & React forms.</p>
        </section>
        <section className="w-full flex flex-col gap-4">
          <h2 className="text-left text-2xl py-2">
            TASKS (without form submission handling)
          </h2>

          <div className="border-2 border-neutral-100 min-w-full p-4">
            <h3 className="underline mb-2 text-xl">CURRENT TASKS:</h3>
            {tasks.length === 0 ? (
              <p className="text-center py-4">No current tasks to do</p>
            ) : (
              <div className="flex flex-col gap-4">
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="w-full bg-neutral-100 text-neutral-950 flex flex-row px-4 py-2 items-center justify-between "
                  >
                    <div className="flex flex-row gap-2 flex-nowrap overflow-hidden min-w-0">
                      <Info color="#000000" className="mr-2 shrink-0" />
                      <span className="truncate">{task}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <button
                        className="relative flex flex-row gap-1 p-1 border-2 border-transparent hover:border-neutral-950 hover:bg-neutral-950 hover:text-neutral-100 transition-colors cursor-pointer"
                        onClick={() => openEditTaskDialog(index)}
                      >
                        <Pencil color="currentColor" />
                      </button>

                      <button
                        className="relative flex flex-row gap-1 p-1 border-2 border-transparent hover:border-neutral-950 hover:bg-neutral-950 hover:text-neutral-100 transition-colors cursor-pointer"
                        type="button"
                        onClick={() => deleteTask(index)}
                      >
                        <Delete color="currentColor" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full justify-end flex gap-2">
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="border-2 border-neutral-100 p-4 outline-none w-full"
              placeholder="Input task"
            />
            <button
              className="flex flex-row items-center whitespace-nowrap gap-2 bg-neutral-100 text-neutral-950 border-2 border-neutral-100 p-4 cursor-pointer outline-none"
              onClick={addTask}
            >
              <Plus />
              ADD TASK
            </button>
          </div>
        </section>
        <section className="w-full flex flex-col gap-4 mb-10">
          <h2 className="text-left text-2xl py-2">
            NOTES (with form submission handling)
          </h2>
          {notes.map((note, index) => (
            <details
              className="p-4 transition-all border-2 border-neutral-100 outline-none group"
              key={index}
            >
              <summary className="p-1 py-2 group-open:pt-0 group-open:pb-2 flex flex-row items-center justify-between cursor-pointer ">
                <div className="flex flex-row items-center gap-2 transition-transform duration-200 group-open:[&>svg]:rotate-180 [&>svg]:shrink-0 overflow-x-auto">
                  <ChevronDown />
                  {note.title}
                </div>
                <div className="flex flex-row items-center justify-end gap-2">
                  <button
                    className="flex flex-row gap-1 p-1 border-2 border-transparent hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 hover: transition-colors cursor-pointer"
                    onClick={() => openEditNoteDialog(index)}
                  >
                    <Pencil color="currentColor" />
                  </button>
                  <button
                    className="flex flex-row gap-1 p-1 border-2 border-transparent hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 hover: transition-colors cursor-pointer"
                    onClick={() => deleteNote(index)}
                  >
                    <Delete color="currentColor" />
                  </button>
                </div>
              </summary>
              <p className="p-2 border-t bg-neutral-100 text-neutral-950 overflow-auto overflow-y-hidden">
                {note.description}
              </p>
            </details>
          ))}

          <form className="flex flex-col gap-4" onSubmit={handleNoteSubmit}>
            <div className="flex flex-col items-center border-2 border-neutral-100">
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="p-4 outline-none w-full"
                placeholder="Note title"
              />
              <hr className="sm:w-[98%] w-[93%] outline-none" />
              <textarea
                value={noteDescription}
                onChange={(e) => setNoteDescription(e.target.value)}
                rows={3}
                className="p-4 rounded-none w-full outline-none resize-none overflow-auto overflow-x-hidden"
                placeholder="Note description"
              />
            </div>
            <div className="w-full flex flex-row justify-end">
              <button
                className="flex flex-row items-center whitespace-nowrap gap-2 border-2 border-neutral-100 bg-neutral-100 text-neutral-950 p-4 cursor-pointer outline-none"
                type="submit"
              >
                <Plus />
                ADD NOTE
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Dialogs */}
      <dialog
        ref={taskDialogRef}
        id="edit-task-dialog"
        className="bg-neutral-950 text-neutral-100 border-2 border-neutral-100 outline-none fixed top-[50%] left-[50%] translate-[-50%] min-w-1/3 p-4"
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">EDIT TASK</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              className="border-2 border-neutral-100 p-4 outline-none w-full"
            />
            <div className="flex flex-row flex-1 gap-2">
              <button
                className="flex flex-row items-center justify-center whitespace-nowrap gap-2  border-2 border-neutral-100 p-4 cursor-pointer outline-none flex-1"
                onClick={closeTaskDialog}
              >
                <ChevronLeft />
                RETURN
              </button>
              <button
                className="flex flex-row items-center justify-center whitespace-nowrap gap-2 bg-neutral-100 text-neutral-950 border-2 border-neutral-100 p-4 cursor-pointer outline-none flex-1"
                onClick={editTask}
              >
                <Pencil />
                EDIT TASK
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog
        ref={noteDialogRef}
        id="edit-note-dialog"
        className="bg-neutral-950 text-neutral-100 border-2 border-neutral-100 outline-none fixed top-[50%] left-[50%] translate-[-50%] min-w-1/3 p-4"
      >
        <form className="flex flex-col gap-4" onSubmit={handleNoteEditSubmit}>
          <h3 className="text-xl">EDIT NOTE</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center border-2 border-neutral-100">
              <input
                type="text"
                value={currentNoteTitle}
                onChange={(e) => setCurrentNoteTitle(e.target.value)}
                className="p-4 outline-none w-full"
              />
              <hr className="w-[95%] outline-none" />
              <textarea
                value={currentNoteDescription}
                onChange={(e) => setCurrentNoteDescription(e.target.value)}
                rows={3}
                className="p-4 rounded-none w-full outline-none resize-none overflow-auto overflow-x-hidden"
              />
            </div>
            <div className="flex flex-row flex-1 gap-2">
              <button
                className="flex flex-row items-center justify-center whitespace-nowrap gap-2  border-2 border-neutral-100 p-4 cursor-pointer outline-none flex-1"
                onClick={closeNoteDialog}
              >
                <ChevronLeft />
                RETURN
              </button>
              <button
                className="flex flex-row items-center justify-center whitespace-nowrap gap-2 bg-neutral-100 text-neutral-950 border-2 border-neutral-100 p-4 cursor-pointer outline-none flex-1"
                type="submit"
              >
                <Pencil />
                EDIT NOTE
              </button>
            </div>
          </div>
        </form>
      </dialog>
      <footer className="fixed bottom-0 w-full bg-neutral-950 border-t border-t-neutral-100 text-center p-6 z-50">
        Created by Eli Aleandro M. Dizon
      </footer>
    </div>
  );
}

export default App;
