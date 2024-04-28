import axios from "axios";

const auth = axios.create({
  baseURL: "http://localhost:5164/api/Auth",
});

const tasks = axios.create({
  baseURL: "http://localhost:5164/api/Task",
});

const apis = {
  auth,
  tasks,
};

export default apis;
