import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilmContext, * as filmsFuncs from "contexts/FilmContext";
import Featured from "components/Featured";

const mockState = {films: [{_id: 1, featured: false}]};
const mockDispatch = jest.fn();
const mockContext = [mockState, mockDispatch];

jest.spyOn(filmsFuncs, "toggleFeatured");
filmsFuncs.toggleFeatured.mockImplementation(() => jest.fn());

const propsData = {id: "1", featured: true};

const RenderComponent = props => {
  return (
    <FilmContext.Provider value={mockContext}>
      <Featured {...props} />
    </FilmContext.Provider>
  );
};

test("should render correct", () => {
  const {container, rerender} = render(<RenderComponent {...propsData} />);

  const spanEl = container.querySelector("span");
  const iconEl = container.querySelector("i");

  expect(iconEl).toHaveClass("yellow");
  expect(iconEl).not.toHaveClass("empty");

  userEvent.click(spanEl);
  expect(filmsFuncs.toggleFeatured).toHaveBeenCalledTimes(1);
  expect(filmsFuncs.toggleFeatured).toHaveBeenCalledWith(
    mockState,
    mockDispatch,
    "1",
  );

  propsData["featured"] = false;
  rerender(<RenderComponent {...propsData} />);

  expect(iconEl).toHaveClass("empty");
  // screen.debug();
});
