import React, {memo, useState, useContext} from "react";
import PropTypes from "prop-types";
import Featured from "components/Featured";
import FilmContext from "contexts/FilmContext";

const FilmCard = ({film}) => {
  const [showDescription, setShowDescription] = useState(false);
  const {selectedFilmForEdit} = useContext(FilmContext);

  const cls = showDescription ? "slash" : "";

  const toggleDescription = () => {
    setShowDescription(x => !x);
  };

  return (
    <div className="ui card">
      <Featured featured={film.featured} id={film._id} />
      {showDescription ? (
        <div className="content">
          <p>{film.description}</p>
        </div>
      ) : (
        <div className="image">
          <span className="ui green label ribbon">$ {film.price} </span>
          <img src={film.img} alt={film.title} />
        </div>
      )}

      <div className="content">
        <span href="#" className="header">
          {film.title}
        </span>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration} min
          </span>
        </div>
        <i onClick={toggleDescription} className={`icon eye ${cls} link`}></i>
      </div>

      <div className="extra content">
        <div className="ui two buttons">
          <span
            onClick={() => selectedFilmForEdit(film)}
            className="ui green basic button"
          >
            <i className="ui icon edit"></i>
          </span>
          <span className="ui red basic button">
            <i className="ui icon trash"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

FilmCard.defaultProps = {
  film: {},
};

export default memo(FilmCard);
