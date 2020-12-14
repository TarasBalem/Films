import React, {Component} from "react";
import FilmsList from "pages/FilmPage/components/FilmsList";
import {films} from "data";

class App extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.setState({films});
  }

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
