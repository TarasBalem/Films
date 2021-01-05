import axios from "axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  films: {
    fetchAll: () => axios.get("/api/films").then(res => res.data.films),
    create: film => axios.post("/api/films", {film}).then(res => res.data.film),
    update: film =>
      axios.put(`/api/films/${film._id}`, {film}).then(res => res.data.film),
    delete: film => axios.delete(`/api/films/${film._id}`),
    fetchById: id => axios.get(`/api/films/${id}`).then(res => res.data.film),
  },
  users: {
    create: user => axios.post("/api/users/", {user}),
    login: credentials =>
      axios.post("/api/auth/", {credentials}).then(res => res.data.token),
  },
};

export const setAuthorizationHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
