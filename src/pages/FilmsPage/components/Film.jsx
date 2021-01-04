import React, {useReducer, useEffect} from "react";
import {useParams} from "react-router-dom";
import Spinner from "components/Spinner";
import api from "api";

const initState = {loading: false, film: {}};

const reducer = (state, action) => {
  switch (action.type) {
    case "filmLoaded":
      return {...state, film: action.film, loading: false};
    case "startLoaded":
      return {...state, loading: true};
    default:
      throw Error("no cases found");
  }
};

const Film = () => {
  const [{film, loading}, dispatch] = useReducer(reducer, initState);
  const {id} = useParams();

  useEffect(() => {
    dispatch({type: "startLoaded"});
    api.films.fetchById(id).then(film => {
      dispatch({type: "filmLoaded", film});
    });
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <>
      <h1 className="ui center aligned dividing header">{film.title}</h1>
      <div className="ui grid">
        <div className="four wide column">
          <img src={film.img} alt={film.title} className="ui grid image" />
        </div>
        <div className="six wide column">
          <p>{film.description}</p>
          <p>Director: {film.director}</p>
          <p>Description: {film.description}</p>
          <p>Duration: {film.duration}min</p>
          <p>Price: {film.price}$</p>
        </div>
      </div>
    </>
  );
};

export default Film;
