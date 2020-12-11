import {renderHook, act} from "@testing-library/react-hooks";
import useCounter from "counter/useCounter";
import cases from "jest-in-case";

/*
cases(
  "title",
  ({arg1, arg2, arg3....})=> {code test},
  {
    case1:{},
    case2:{}
  }
)
*/

cases(
  "useCounter",
  ({initialCount, step, postIncrement, postDecrement}) => {
    const {result} = renderHook(useCounter, {
      initialProps: {initialCount, step},
    });

    act(() => result.current.increment());
    expect(result.current.count).toBe(postIncrement);

    act(() => result.current.decrement());
    expect(result.current.count).toBe(postDecrement);
  },
  {
    basic: {
      postIncrement: 1,
      postDecrement: 0,
    },
    initCount: {
      initialCount: 2,
      postIncrement: 3,
      postDecrement: 2,
    },
    step: {
      step: 10,
      postIncrement: 10,
      postDecrement: 0,
    },
    "init count and step": {
      initialCount: 5,
      step: 2,
      postIncrement: 7,
      postDecrement: 5,
    },
  },
);
