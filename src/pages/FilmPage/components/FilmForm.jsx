import React, {Component} from "react";
import {genres, tags as tagsList} from "data";

class FilmForm extends Component {
  state = {
    tags: [],
    genre: "",
    sel: "",
    multipleSelect: [],
  };

  handleTagsChange = () => {};

  handleGenreChange = () => {};

  handleSelectChange = () => {};

  handleMultiSelect = () => {};

  render() {
    return (
      <form className="ui form">
        <div className="ui grid">
          <div className="four wide column">TASK 1</div>

          <div className="four wide column">TASK 2</div>

          <div className="four wide column">TASK 3</div>
          <div className="four wide column">TASK 4</div>
        </div>
        {/* ====================================================== */}
      </form>
    );
  }
}

export default FilmForm;
