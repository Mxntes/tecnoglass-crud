export default function TaskFilters({ value, onChange }) {
  return (
    <div className="btn-group">
      <button
        className={`btn btn-outline-secondary ${
          value === "all" ? "active" : ""
        }`}
        onClick={() => onChange("all")}
      >
        Todas
      </button>
      <button
        className={`btn btn-outline-secondary ${
          value === "done" ? "active" : ""
        }`}
        onClick={() => onChange("done")}
      >
        Completadas
      </button>
      <button
        className={`btn btn-outline-secondary ${
          value === "todo" ? "active" : ""
        }`}
        onClick={() => onChange("todo")}
      >
        Pendientes
      </button>
    </div>
  );
}