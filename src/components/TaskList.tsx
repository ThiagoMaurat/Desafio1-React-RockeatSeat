import { useEffect, useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  function handleCreateNewTask() {
    const newTask: Task = {
      id: tasks.length + 1,
      title: newTaskTitle,
      isComplete: false,
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    if (newTaskTitle === "") {
      alert("Please enter a task");
      setTasks([]);
    }
  }

  // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

  function handleToggleTaskCompletion(id: number) {
    tasks.filter((conteudo) => {
      if (id == conteudo.id) {
        setIsComplete((conteudo.isComplete = !conteudo.isComplete));
      } 
    });
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {
    tasks.filter((conteudo) => {
      if (id == conteudo.id) {
        setTasks(tasks.filter((conteudo) => conteudo.id !== id));
        // Remova uma task da listagem pelo ID
      }
    });
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
