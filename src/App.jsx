import React, {Component} from "react";
// import _sortBy from "lodash/sortBy";
import {prop, sortBy} from "ramda";
import FilmsList from "pages/FilmPage/components/FilmsList";
import {films} from "data";

class App extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.setState({films: this.sortFilms(films)});
  }

  // lodash
  // sortFilms = films => _sortBy(films, ["title"]);

  // ramda
  sortFilms = films => sortBy(prop("title"), films);

  render() {
    const {films} = this.state;

    return (
      <div className="ui container mt-3">
        <FilmsList films={films} />
      </div>
    );
  }
}

export default App;
