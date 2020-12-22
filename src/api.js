import axios from "axios";
import {sleep} from "utils";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  films: {
    fetchAll: () => axios.get("/api/films").then(res => res.data.films),
    create: film =>
      axios
        .post("/api/films", {film})
        .then(async res => {
          await sleep();
          return res;
        })
        .then(res => res.data.film),
  },
};
