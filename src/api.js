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
  },
};
