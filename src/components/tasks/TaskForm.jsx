import { useState, useEffect } from "react";

export default function TaskForm({ onSave, initial }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(initial?.title || "");
    setDescription(initial?.description || "");
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      completed: !!initial?.completed,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={submit} className="row g-2">
      <div className="col-12 col-md-4">
        <input
          className="form-control"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-6">
        <input
          className="form-control"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-2 d-grid">
        <button className="btn btn-success" type="submit">
          {initial ? "Guardar" : "Crear"}
        </button>
      </div>
    </form>
  );
}