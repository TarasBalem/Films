import React, {Component} from "react";

const initialData = {
  title: "",
  img: "",
  description: "",
  director: "",
  price: "",
  duration: "",
  featured: false,
};

class FilmForm extends Component {
  state = {
    data: initialData,
  };

  handleStringChange = e => {
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    });
  };

  handleNumberChange = e => {
    let value = parseFloat(e.target.value);
    value = isNaN(value) || value === 0 ? "" : Math.abs(value);
    this.setState({
      data: {...this.state.data, [e.target.name]: value},
    });
  };

  handleCheckboxChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.checked},
    });

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.data);
  };

  render() {
    const {data} = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="ui form">
        <div className="ui grid mb-3">
          <div className="two column row">
            <div className="ten wide column">
              <div className="field">
                <label htmlFor="title">Film title</label>
                <input
                  value={data.title}
                  onChange={this.handleStringChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="film title"
                />
              </div>
              <div className="field img-grid">
                <label htmlFor="img">Image</label>
                <input
                  name="img"
                  value={data.img}
                  onChange={this.handleStringChange}
                />
                <div className="inp-file">
                  <label htmlFor="photo">Photo</label>
                  <input type="file" id="photo" />
                </div>
              </div>
            </div>
            <div className="six wide column">
              <img
                alt="the fake pic"
                src="http://via.placeholder.com/250x250"
                className="ui image imgfit"
              />
            </div>
          </div>

          <div className="column row field">
            <label htmlFor="description">Film description</label>
            <textarea
              value={data.description}
              onChange={this.handleStringChange}
              name="description"
              id="description"
              placeholder="film description"
            ></textarea>
          </div>

          <div className="three column row">
            <div className="column field">
              <label htmlFor="director">Director</label>
              <input
                value={data.director}
                onChange={this.handleStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
            </div>
            <div className="column field">
              <label htmlFor="duration">Duration</label>
              <input
                value={data.duration}
                onChange={this.handleNumberChange}
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
              />
            </div>
            <div className="column field">
              <label htmlFor="price">Price</label>
              <input
                value={data.price}
                onChange={this.handleNumberChange}
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
            </div>
          </div>

          <div className="six wide column inline field">
            <label htmlFor="featured">Featured</label>
            <input
              value={data.featured}
              onChange={this.handleCheckboxChange}
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
          <span className="ui button">Hide form</span>
        </div>
      </form>
    );
  }
}

export default FilmForm;
