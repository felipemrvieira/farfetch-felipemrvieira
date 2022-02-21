import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/index";

describe("Home", () => {
  it("renders homepage with a anchor to my linkedin", () => {
    render(<Home />);

    expect(screen.getByText("@felipemrvieira")).toBeInTheDocument();
    expect(screen.getByText("@felipemrvieira").closest("a")).toHaveAttribute(
      "href",
      "https://github.com/felipemrvieira"
    );
  });
});
