import { useEffect, useMemo, useState } from "react";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../api/task-clean";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import useAuth from "../hooks/useAuth";

export default function Tasks() {
  const { logout } = useAuth();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all"); // all | done | todo
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await listTasks();
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setErr("No fue posible cargar las tareas");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "done") return items.filter((t) => !!t.completed);
    if (filter === "todo") return items.filter((t) => !t.completed);
    return items;
  }, [items, filter]);

  const handleCreate = async (payload) => {
    try {
      setSaving(true);
      const created = await createTask({ ...payload, completed: false });
      setItems((prev) => [created, ...prev]);
    } catch {
      alert("Error creando tarea");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = await toggleTask(task.id, !task.completed);
      setItems((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch {
      alert("Error cambiando estado");
    }
  };

  const handleDelete = async (task) => {
    const ok = confirm("¿Eliminar esta tarea?");
    if (!ok) return;
    try {
      await deleteTask(task.id);
      setItems((prev) => prev.filter((t) => t.id !== task.id));
    } catch {
      alert("Error eliminando tarea");
    }
  };

  const handleUpdate = async (task, payload) => {
    try {
      const updated = await updateTask(task.id, { ...task, ...payload });
      setItems((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch {
      alert("Error actualizando tarea");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 mb-0">Tareas</h1>
        <div className="d-flex gap-2">
          <TaskFilters value={filter} onChange={setFilter} />
          <button className="btn btn-outline-secondary" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {loading && <div className="alert alert-info">Cargando…</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      {!loading && !err && (
        <>
          <div className="mb-3">
            <TaskForm onSave={handleCreate} />
            {saving && <div className="form-text">Guardando…</div>}
          </div>
          <TaskList
            items={filtered}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </>
      )}
    </div>
  );
}