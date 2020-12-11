import React, {memo} from "react";
import PropTypes from "prop-types";
import FilmCard from "pages/FilmsPage/components/FilmCard";
import Messages from "components/Messages";

const FilmsList = ({films}) => {
  return (
    <div className="ui four cards">
      {films.length === 0 ? (
        <Messages type="info" color="red">
          No fims yet in our database
        </Messages>
      ) : (
        films.map(film => <FilmCard key={film._id} film={film} />)
      )}
    </div>
  );
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FilmsList.defaultProps = {
  films: [],
};

export default memo(FilmsList);
