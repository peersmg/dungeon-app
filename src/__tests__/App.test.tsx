import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("contains child component", () => {
  const { container } = render(<App />);
  expect(container.firstChild).toBeInTheDocument();
});
