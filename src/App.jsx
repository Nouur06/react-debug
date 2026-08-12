import { useMemo, useState } from "react";
import "./App.css";

function Counter({ value, onIncrement, onDecrement }) {
  return (
    <section className="card">
      <h2>Counter</h2>
      <div className="counter" aria-live="polite">
        {value}
      </div>
      <div className="button-row">
        <button type="button" onClick={onDecrement}>
          −
        </button>
        <button type="button" onClick={onIncrement}>
          +
        </button>
      </div>
    </section>
  );
}

function TodoList({ items, onToggleComplete, onAddItem }) {
  const [draft, setDraft] = useState("");
  const openCount = items.filter((item) => !item.completed).length;

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAddItem(trimmed);
    setDraft("");
  }

  return (
    <section className="card">
      <h2>Todo List</h2>
      <p className="subtitle">Open tasks: {openCount}</p>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a task"
          aria-label="New todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {items.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggleComplete(item.id)}
              />
              <span>{item.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Summary({ count, todos }) {
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  const taskMessage = useMemo(() => {
    if (totalCount === 0) return "No tasks yet.";
    return `${completedCount} of ${totalCount} tasks completed.`;
  }, [completedCount, totalCount]);

  return (
    <section className="card summary-card">
      <h2>Summary</h2>
      <p>{taskMessage}</p>
      <p>Counter value: {count}</p>
    </section>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([
    { id: 1, text: "Inspect React DevTools tree", completed: false },
    { id: 2, text: "Verify props and state", completed: true },
  ]);

  function handleIncrement() {
    setCount((current) => current + 1);
  }

  function handleDecrement() {
    setCount((current) => current - 1);
  }

  function handleToggleItem(id) {
    setTodos((current) =>
      current.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function handleAddItem(text) {
    setTodos((current) => [
      ...current,
      { id: Date.now(), text, completed: false },
    ]);
  }

  return (
    <main id="center">
      <h1>React Debug Sample</h1>
      <div className="layout">
        <Counter
          value={count}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <TodoList
          items={todos}
          onToggleComplete={handleToggleItem}
          onAddItem={handleAddItem}
        />
      </div>
      <Summary count={count} todos={todos} />
    </main>
  );
}
