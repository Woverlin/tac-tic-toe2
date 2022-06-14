import { render, screen } from "@testing-library/react";
import HomeView from "./pages/Home/HomeView";

test("O win", () => {
    const table = [
        [0, 1, 0],
        [1, 0, 1],
        [1, 1, 0],
    ];
    const props = {
        table: table,
        round: 0,
        winner: 0,
    };
    render(<HomeView {...props} />);
    expect(screen.getByText(/O win/)).toBeInTheDocument();
});

test("X win", () => {
    const table = [
        [1, 0, 0],
        [0, 1, 1],
        [1, 0, 1],
    ];
    const props = {
        table: table,
        round: 1,
        winner: 1,
    };
    render(<HomeView {...props} />);
    expect(screen.getByText(/X win/)).toBeInTheDocument();
});

test("no one win", () => {
    const table = [
        [1, 1, 0],
        [0, 0, 1],
        [1, 0, 1],
    ];
    const props = {
        table: table,
        round: 1,
        winner: 2,
    };
    render(<HomeView {...props} />);
    expect(screen.getByText(/No one win/)).toBeInTheDocument();
});
