import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { SortTH } from "components";
import { ReactNode } from "react";
import { userEvent } from "@testing-library/user-event";

describe("SortTH", () => {
  const Fixture = ({ children }: { children: ReactNode }) => (
    <table>
      <thead>
        <tr>{children}</tr>
      </thead>
    </table>
  );
  it("should match snapshot as sorted", () => {
    const { container } = render(
      <Fixture>
        <SortTH
          id={"test1"}
          sortBy={"test1"}
          sortDirection={"asc"}
          header={"Test the first"}
          onClick={vi.fn()}
        />
      </Fixture>,
    );

    expect(screen.getByTestId("sort-direction-test1")).toHaveTextContent("↑");
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot as sorted descending", () => {
    const { container } = render(
      <Fixture>
        <SortTH
          id={"test1"}
          sortBy={"test1"}
          sortDirection={"desc"}
          header={"Test the first"}
          onClick={vi.fn()}
        />
      </Fixture>,
    );

    expect(screen.getByTestId("sort-direction-test1")).toHaveTextContent("↓");
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot as unsorted", () => {
    const { container } = render(
      <Fixture>
        <SortTH
          id={"test1"}
          sortBy={"test2"}
          sortDirection={"desc"}
          header={"Test the first"}
          onClick={vi.fn()}
        />
      </Fixture>,
    );

    expect(screen.getByTestId("sort-direction-test1")).toHaveClass("opacity-0");
    expect(container).toMatchSnapshot();
  });

  it("should handle being clicked", async () => {
    const mockOnClick = vi.fn();

    render(
      <Fixture>
        <SortTH
          id={"test1"}
          sortBy={"test2"}
          sortDirection={"desc"}
          header={"Test the first"}
          onClick={mockOnClick}
        />
      </Fixture>,
    );

    await userEvent.click(screen.getByTestId("sort-direction-test1"));

    expect(mockOnClick).toHaveBeenCalledWith("test1");
  });
});
