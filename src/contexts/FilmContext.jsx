import React, {createContext, useContext, useReducer} from "react";
import {prop, sortWith, ascend, descend} from "ramda";
import api from "api";

const FilmContext = createContext();

const sortFilms = films =>
  sortWith([descend(prop("featured")), ascend(prop("title"))], films);

const initState = {
  films: [],
  loading: false,
  error: null,
};

const filmsReducer = (state, action) => {
  let newFilms;
  let idx;

  switch (action.type) {
    case "loadFilms":
      return {...state, films: sortFilms(action.films)};
    case "addFilm":
      newFilms = [...state.films];
      newFilms.push(action.film);
      return {...state, films: sortFilms(newFilms)};
    case "updateFilm":
      newFilms = [...state.films];
      idx = state.films.findIndex(film => film._id === action.film._id);
      newFilms[idx] = action.film;
      return {...state, films: sortFilms(newFilms)};
    case "deleteFilm":
      newFilms = state.films.filter(f => f._id !== action.film._id);
      return {...state, films: sortFilms(newFilms)};
    case "setError":
      return {...state, error: action.error};
    case "setLoading":
      return {...state, loading: action.loading};
    default:
      throw Error("no found cases");
  }
};

export function FilmsProvider(props) {
  const [state, dispatch] = useReducer(filmsReducer, initState);
  const value = [state, dispatch];

  return <FilmContext.Provider value={value} {...props} />;
}

export function useFilms() {
  const context = useContext(FilmContext);
  if (!context) throw Error("useFilms must be render within FilmContext");
  return context;
}

export const loadFilms = dispatch => {
  api.films.fetchAll().then(films => dispatch({type: "loadFilms", films}));
};

export const addFilm = (dispatch, filmData) => {
  return api.films
    .create(filmData)
    .then(film => dispatch({type: "addFilm", film}));
};

export const updateFilm = (dispatch, filmData) => {
  return api.films
    .update(filmData)
    .then(film => dispatch({type: "updateFilm", film}));
};

export const saveFilm = (dispatch, film) => {
  return film._id ? updateFilm(dispatch, film) : addFilm(dispatch, film);
};

export const deleteFilm = (dispatch, film) => {
  api.films.delete(film).then(() => dispatch({type: "deleteFilm", film}));
};

export const toggleFeatured = (state, dispatch, id) => {
  const film = state.films.find(f => f._id === id);
  film["featured"] = !film["featured"];
  updateFilm(dispatch, film);
};
export default FilmContext;
