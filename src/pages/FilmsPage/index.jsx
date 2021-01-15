import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {Route} from "react-router-dom";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import {useFilms, loadFilms} from "contexts/FilmContext";
import Spinner from "components/Spinner";

const FilmsPage = () => {
  const [{films, loading}, dispatch] = useFilms();
  const location = useLocation();

  useEffect(() => {
    loadFilms(dispatch);
  }, [dispatch]);

  const cols = location.pathname === "/films" ? "sixteen" : "ten";

  return (
    <div className="ui stackable grid">
      <div className="six wide column">
        <Route path="/films/new">
          <FilmForm />
        </Route>

        <Route path="/films/edit/:_id">
          <FilmForm />
        </Route>
      </div>

      <div className={`${cols} wide column`}>
        {loading ? <Spinner /> : <FilmsList films={films} />}
      </div>
    </div>
  );
};

export default FilmsPage;
