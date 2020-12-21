import React, {useContext} from "react";
import FilmContext from "contexts/FilmContext";

const SelectButton = ({film}) => {
  const {selectedFilmForEdit} = useContext(FilmContext);
  return (
    <span
      onClick={() => selectedFilmForEdit(film)}
      className="ui green basic button"
    >
      <i className="ui icon edit"></i>
    </span>
  );
};

const FilmCardButtons = ({film}) => {
  return (
    <div className="extra content">
      <div className="ui two buttons">
        <SelectButton film={film} />
        <span className="ui red basic button">
          <i className="ui icon trash"></i>
        </span>
      </div>
    </div>
  );
};

export default FilmCardButtons;
