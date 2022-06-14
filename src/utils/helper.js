//I keep the function here for the sake of running tests.

export const onCheckWinner = (table, round) => {
    const diagonals = checkDiagonals(table, round);
    const winer = checkVerticalsAndHorizontals(table, round);

    if (diagonals !== -1) {
        return diagonals;
    }

    if (winer !== -1) {
        return winer;
    }

    if (checkNoOneWin(table)) {
        return 2;
    }
    return -1
};


const checkDiagonals = (table, round) => {
    if (
        (table[0][0] === round && table[1][1] === round && table[2][2] === round) ||
        (table[0][2] === round && table[1][1] === round && table[2][0] === round)
    ) {
        return round;
    }
    return -1;
};

const checkNoOneWin = (table) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (table[i][j] === -1) {
                return false;
            }
        }
    }
    return true;
};

const checkVerticalsAndHorizontals = (table, round) => {
    for (let i = 0; i <= 2; i++) {
        if (
            (table[0][i] === round && table[1][i] === round && table[2][i] === round) ||
            (table[i][0] === round && table[i][1] === round && table[i][2] === round)
        ) {
            return round;
        }
    }
    return -1;
};
