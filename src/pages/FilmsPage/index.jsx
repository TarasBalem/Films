import React, {Component} from "react";
import {prop, sortWith, ascend, descend} from "ramda";
import {Route, withRouter, Redirect} from "react-router-dom";
import _find from "lodash/find";
import FilmContext from "contexts/FilmContext";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import api from "api";
import Spinner from "components/Spinner";
import UserContext from "contexts/UserContrext";

class FilmsPage extends Component {
  componentDidMount() {
    api.films
      .fetchAll()
      .then(films =>
        this.setState({films: this.sortFilms(films), loading: false}),
      );
  }

  sortFilms = films =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  toggleFeatured = _id => {
    const film = _find(this.state.films, {_id});
    return this.updateFilm({...film, featured: !film.featured});
  };

  addFilm = filmData =>
    api.films.create(filmData).then(film =>
      this.setState(({films}) => ({
        films: this.sortFilms([...films, film]),
      })),
    );

  updateFilm = filmData =>
    api.films.update(filmData).then(film =>
      this.setState(({films}) => ({
        films: this.sortFilms(films.map(f => (f._id === film._id ? film : f))),
      })),
    );

  saveFilm = film => (film._id ? this.updateFilm(film) : this.addFilm(film));

  deleteFilm = film =>
    api.films.delete(film).then(() =>
      this.setState(({films}) => ({
        films: this.sortFilms(films.filter(f => f._id !== film._id)),
      })),
    );

  state = {
    films: [],
    loading: true,
    toggleFeatured: this.toggleFeatured,
    deleteFilm: this.deleteFilm,
  };

  render() {
    const {films, loading} = this.state;
    const cols = this.props.location.pathname === "/films" ? "sixteen" : "ten";

    return (
      <FilmContext.Provider value={this.state}>
        <div className="ui stackable grid">
          <UserContext.Consumer>
            {({user}) =>
              user.toke && user.role === "admin" ? (
                <div className="six wide column">
                  <Route path="/films/new">
                    <FilmForm film={{}} saveFilm={this.saveFilm} />
                  </Route>
                  <Route
                    path="/films/edit/:_id"
                    render={({match}) => (
                      <FilmForm
                        saveFilm={this.saveFilm}
                        film={_find(films, {_id: match.params._id}) || {}}
                      />
                    )}
                  />
                </div>
              ) : (
                <Redirect to="/films" />
              )
            }
          </UserContext.Consumer>
          <div className={`${cols} wide column`}>
            {loading ? <Spinner /> : <FilmsList films={films} />}
          </div>
        </div>
      </FilmContext.Provider>
    );
  }
}

export default withRouter(FilmsPage);
