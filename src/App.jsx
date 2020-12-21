import React, {Component} from "react";
import {prop, sortWith, ascend, descend} from "ramda";
import FilmContext from "contexts/FilmContext";
import FilmsList from "pages/FilmPage/components/FilmsList";
import FilmForm from "pages/FilmPage/components/FilmForm";
import TopNavigation from "components/TopNavigation";
import {films} from "data";

class App extends Component {
  componentDidMount() {
    this.setState({films: this.sortFilms(films)});
  }

  sortFilms = films =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  toggleFeatured = id =>
    this.setState(({films}) => ({
      films: this.sortFilms(
        films.map(f => (f._id === id ? {...f, featured: !f.featured} : f)),
      ),
    }));

  showForm = () => this.setState({showAddForm: true});
  hideForm = () => this.setState({showAddForm: false});

  state = {
    films: [],
    toggleFeatured: this.toggleFeatured,
    showAddForm: false,
  };

  render() {
    const {films, showAddForm} = this.state;
    const cols = showAddForm ? "ten" : "sixteen";

    return (
      <FilmContext.Provider value={this.state}>
        <div className="ui container mt-3">
          <TopNavigation showForm={this.showForm} />
          <div className="ui stackable grid">
            {showAddForm && (
              <div className="six wide column">
                <FilmForm hideForm={this.hideForm} />
              </div>
            )}
            <div className={`${cols} wide column`}>
              <FilmsList films={films} />
            </div>
          </div>
        </div>
      </FilmContext.Provider>
    );
  }
}

export default App;
