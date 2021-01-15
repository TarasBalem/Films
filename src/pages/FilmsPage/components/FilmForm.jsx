import React, {useState, useEffect, useRef} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import _find from "lodash/find";
import ImageLoader from "components/ImageLoader";
import FormMessage from "components/FormMessage";
import setFormObj from "components/FormUtils";
import {saveFilm, useFilms} from "contexts/FilmContext";

const initialData = {
  _id: null,
  title: "",
  img: "",
  description: "",
  director: "",
  price: "",
  duration: "",
  featured: false,
};

const FilmForm = () => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useFilms();
  const history = useHistory();
  const photoRef = useRef();
  const {_id} = useParams();

  console.log(_id);

  useEffect(() => {
    const film = _find(state.films, {_id}) || {};
    if (film._id && _id !== data._id) {
      setData(film);
    }
    if (!film._id && data._id) {
      setData(initialData);
    }
  }, [_id, data._id, state]);

  const updatePhoto = e => {
    const file = photoRef.current.files && photoRef.current.files[0];
    if (file) {
      const img = "/img/" + file.name;
      setData(data => ({...data, img}));
    }
  };

  const validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Title cannot be a blank";
    if (!data.img) errors.img = "Image cannot be a blank";
    if (!data.description) errors.description = "Description cannot be a blank";
    if (!data.director) errors.director = "Director cannot be a blank";
    if (!data.duration) errors.duration = "Duration cannot be a blank";
    if (!data.price) errors.price = "Price cannot be a blank";

    if (parseInt(data.duration) < 0)
      errors.duration = "Duration cannot be a negative";
    if (parseInt(data.price) < 0) errors.price = "Price cannot be a negative";

    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      saveFilm(dispatch, data)
        .then(() => {
          history.push("/films");
        })
        .catch(err => {
          setErrors(err.response.data.errors);
          setLoading(false);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`ui form ${loading ? "loading" : ""}`}
    >
      <div className="ui grid mb-3">
        <div className="two column row">
          <div className="ten wide column">
            <div className={`field ${errors.title ? "error" : ""}`}>
              <label htmlFor="title">Film title</label>
              <input
                value={data.title}
                onChange={setFormObj(data, setData)}
                type="text"
                name="title"
                id="title"
                placeholder="film title"
              />
              {errors.title && <FormMessage>{errors.title}</FormMessage>}
            </div>

            <div className={`field ${errors.img ? "error" : ""} img-grid`}>
              <label htmlFor="img">Image</label>
              <input
                name="img"
                value={data.img}
                onChange={setFormObj(data, setData)}
              />
              <div className="inp-file">
                <label htmlFor="photo">Photo</label>
                <input
                  ref={photoRef}
                  onChange={updatePhoto}
                  type="file"
                  id="photo"
                />
              </div>
              {errors.img && <FormMessage>{errors.img}</FormMessage>}
            </div>
          </div>
          <div className="six wide column">
            <ImageLoader
              src={data.img}
              fallbackImg="http://via.placeholder.com/250x250"
              className="ui image imgfit"
              alt={data.title}
            />
          </div>
        </div>

        <div
          className={`column row field ${errors.description ? "error" : ""}`}
        >
          <label htmlFor="description">Film description</label>
          <textarea
            value={data.description}
            onChange={setFormObj(data, setData)}
            name="description"
            id="description"
            placeholder="film description"
          ></textarea>
          {errors.description && (
            <FormMessage>{errors.description}</FormMessage>
          )}
        </div>

        <div className="three column row">
          <div className={`column field ${errors.director ? "error" : ""}`}>
            <label htmlFor="director">Director</label>
            <input
              value={data.director}
              onChange={setFormObj(data, setData)}
              type="text"
              name="director"
              id="director"
              placeholder="film director"
            />
            {errors.director && <FormMessage>{errors.director}</FormMessage>}
          </div>
          <div className={`column field ${errors.duration ? "error" : ""}`}>
            <label htmlFor="duration">Duration</label>
            <input
              value={data.duration}
              onChange={setFormObj(data, setData)}
              type="number"
              name="duration"
              id="duration"
              placeholder="Duration"
            />
            {errors.duration && <FormMessage>{errors.duration}</FormMessage>}
          </div>
          <div className={`column field ${errors.price ? "error" : ""}`}>
            <label htmlFor="price">Price</label>
            <input
              value={data.price}
              onChange={setFormObj(data, setData)}
              type="number"
              name="price"
              id="price"
              placeholder="price"
            />
            {errors.price && <FormMessage>{errors.price}</FormMessage>}
          </div>
        </div>

        <div className="six wide column inline field">
          <label htmlFor="featured">Featured</label>
          <input
            value={data.featured}
            onChange={setFormObj(data, setData)}
            type="checkbox"
            name="featured"
            id="featured"
          />
        </div>
      </div>

      <div className="ui fluid buttons">
        <button className="ui button primary" type="submit">
          Save
        </button>
        <div className="or"></div>
        <Link to="/films" className="ui button">
          Hide form
        </Link>
      </div>
    </form>
  );
};

export default FilmForm;
