function onLoad(fn: () => void) {
  if (["complete", "interactive"].indexOf(document.readyState) >= 0) {
    fn();
  } else {
    document.addEventListener("load", fn);
  }
}

class Board {
  private cells: string[] = [];
  private selected: number = -1;
  private nextSide: "B" | "W" = "W";

  constructor(cells) {
    this.cells = cells;
  }

  fireClick(index: number, targetValue: string = "") {
    if (this.selected >= 0) {
      const side = this.cells[this.selected];
      console.log(side, this.nextSide);
      if (side !== this.nextSide) {
        throw new Error(`${side} can not play again`);
      }
      this.nextSide = side === "B" ? "W" : "B";

      const selectedValue = this.cells[this.selected];

      let validTargetIndex = this.selected + 8;
      if (selectedValue === "W") {
        validTargetIndex = this.selected - 8;
      }

      if (validTargetIndex !== index) {
        throw new Error(`Only ${validTargetIndex} is possible`);
      }
      this.cells[index] = selectedValue;
      this.cells[this.selected] = targetValue;

      this.selected = -1;
    } else {
      this.selected = index;
    }
  }

  updateCells(elements: Array<HTMLDivElement>) {
    elements.forEach((el, i) => {
      el.innerText = this.cells[i];
    });
  }
}

onLoad(() => {
  const cells: HTMLDivElement[] = Array.from(document.querySelectorAll(".cell"));
  const initialBoardValues = cells.map((cell) => cell.innerText);

  const board = new Board(initialBoardValues);

  console.log(board);

  document.querySelectorAll(".cell").forEach((cell, i) => {
    cell.addEventListener("click", () => {
      board.fireClick(i, cell.innerText);
      board.updateCells(cells);
    });
  });
});
