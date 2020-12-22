import axios from "axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  films: {
    fetchAll: () => axios.get("/api/films").then(res => res.data.films),
    create: film => axios.post("/api/films", {film}).then(res => res.data.film),
  },
};
