import axios from "axios";

export const tasksApi = axios.create({
  baseURL: import.meta.env.VITE_TASKS_API_BASE,
  timeout: 10000,
});

export const listTasks = async () => {
  const { data } = await tasksApi.get("/Tarea");
  return data;
};

export const task = async (id) => {
  const { data } = await tasksApi.get(`/Tarea/${id}`);
  return data;
};

export const createTask = async (payload) => {
  const { data } = await tasksApi.post("/Tarea", payload);
  return data;
};

export const updateTask = async (id, payload) => {
  const { data } = await tasksApi.put(`/Tarea/${id}`, payload);
  return data;
};

export const deleteTask = async (id) => {
  await tasksApi.delete(`/Tarea/${id}`);
};

export const toggleTask = async (id, completed) => {
  const { data } = await tasksApi.put(`/Tarea/${id}`, { completed });
  return data;
};