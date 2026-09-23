import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Cell as CellState } from "../Minesweeper.types";
import Cell from "./Cell";

const hiddenCell: CellState = {
  isMine: false,
  adjacentMines: 0,
  status: "hidden",
};

const renderCell = (cell: CellState = hiddenCell) => {
  const onReveal = jest.fn();
  const onToggleFlag = jest.fn();

  render(
    <Cell
      index={7}
      cell={cell}
      isExploded={false}
      onReveal={onReveal}
      onToggleFlag={onToggleFlag}
    />,
  );

  return { button: screen.getByRole("button"), onReveal, onToggleFlag };
};

describe("Cell", () => {
  it("reveals itself on click", async () => {
    const { button, onReveal } = renderCell();

    await userEvent.click(button);

    expect(onReveal).toHaveBeenCalledWith(7);
  });

  it("toggles a flag on right click", () => {
    const { button, onToggleFlag } = renderCell();

    fireEvent.contextMenu(button);

    expect(onToggleFlag).toHaveBeenCalledWith(7);
  });

  it("can be played from the keyboard", async () => {
    const { button, onReveal, onToggleFlag } = renderCell();

    button.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("f");

    expect(onReveal).toHaveBeenCalledWith(7);
    expect(onToggleFlag).toHaveBeenCalledWith(7);
  });

  it("describes its state for screen readers", () => {
    renderCell({ ...hiddenCell, status: "revealed", adjacentMines: 3 });

    expect(screen.getByRole("button")).toHaveAccessibleName("Бомб рядом: 3");
    expect(screen.getByRole("button")).toHaveTextContent("3");
  });

  it("shows zero for a revealed cell without neighbouring mines", () => {
    renderCell({ ...hiddenCell, status: "revealed" });

    expect(screen.getByRole("button")).toHaveAccessibleName("Бомб рядом: 0");
    expect(screen.getByRole("button")).toHaveTextContent("0");
  });
});
