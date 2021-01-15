import React from "react";
import PropTypes from "prop-types";
import {useFilms, toggleFeatured} from "contexts/FilmContext";

const Featured = ({featured, id}) => {
  const [state, dispatch] = useFilms();

  const cls = featured ? "yellow" : "empty";
  return (
    <span
      onClick={() => toggleFeatured(state, dispatch, id)}
      className="ui right corner label"
    >
      <i className={`${cls} star icon`}></i>
    </span>
  );
};

Featured.propTypes = {
  featured: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default Featured;
