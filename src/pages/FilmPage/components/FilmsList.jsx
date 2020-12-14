import React from "react";
import FilmCard from "pages/FilmPage/components/FilmCard";

const FilmsList = ({films}) => {
  return (
    <div className="ui four cards">
      {films.map(film => (
        <FilmCard key={film._id} film={film} />
      ))}
    </div>
  );
};

FilmsList.defaultProps = {
  films: [],
};

export default FilmsList;
