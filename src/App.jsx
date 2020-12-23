import React, {Component} from "react";
import {prop, sortWith, ascend, descend} from "ramda";
import _find from "lodash/find";
import FilmContext from "contexts/FilmContext";
import FilmsList from "pages/FilmPage/components/FilmsList";
import FilmForm from "pages/FilmPage/components/FilmForm";
import TopNavigation from "components/TopNavigation";
import api from "api";
// import {films} from "data";

class App extends Component {
  componentDidMount() {
    api.films
      .fetchAll()
      .then(films => this.setState({films: this.sortFilms(films)}));
  }

  sortFilms = films =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  toggleFeatured = _id => {
    const film = _find(this.state.films, {_id});
    return this.updateFilm({...film, featured: !film.featured});
  };

  showForm = () => this.setState({showAddForm: true, selectedFilm: {}});
  hideForm = () => this.setState({showAddForm: false, selectedFilm: {}});

  addFilm = filmData =>
    api.films.create(filmData).then(film =>
      this.setState(({films, showAddForm, selectedFilm}) => ({
        films: this.sortFilms([...films, film]),
        showAddForm: false,
        selectedFilm: {},
      })),
    );

  updateFilm = filmData =>
    api.films.update(filmData).then(film =>
      this.setState(({films, showAddForm, selectedFilm}) => ({
        films: this.sortFilms(films.map(f => (f._id === film._id ? film : f))),
        showAddForm: false,
        selectedFilm: {},
      })),
    );

  saveFilm = film => (film._id ? this.updateFilm(film) : this.addFilm(film));

  selectedFilmForEdit = selectedFilm =>
    this.setState({
      selectedFilm,
      showAddForm: true,
    });

  deleteFilm = film =>
    api.films.delete(film).then(() =>
      this.setState(({films, selectedFilm, showAddForm}) => ({
        films: this.sortFilms(films.filter(f => f._id !== film._id)),
        selectedFilm: {},
        showAddForm: false,
      })),
    );

  state = {
    films: [],
    toggleFeatured: this.toggleFeatured,
    showAddForm: false,
    selectedFilm: {},
    selectedFilmForEdit: this.selectedFilmForEdit,
    deleteFilm: this.deleteFilm,
  };

  render() {
    const {films, showAddForm, selectedFilm} = this.state;
    const cols = showAddForm ? "ten" : "sixteen";

    return (
      <FilmContext.Provider value={this.state}>
        <div className="ui container mt-3">
          <TopNavigation showForm={this.showForm} />
          <div className="ui stackable grid">
            {showAddForm && (
              <div className="six wide column">
                <FilmForm
                  film={selectedFilm}
                  saveFilm={this.saveFilm}
                  hideForm={this.hideForm}
                />
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
