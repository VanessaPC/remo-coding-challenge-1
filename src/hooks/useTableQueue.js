import { useState } from "react";

const TABLE = {
  ADD: "add",
  MOVE: "move",
};

const MAX_TABLE_SIZE = 6;

// good to have
// create a room at start

const ROOM = [
  { users: [], TABLE: 1 },
  { users: [], TABLE: 2 },
  { users: [], TABLE: 3 },
  { users: [], TABLE: 4 },
  { users: [], TABLE: 5 },
  { users: [], TABLE: 6 },
  { users: [], TABLE: 7 },
  { users: [], TABLE: 8 },
  { users: [], TABLE: 9 },
  { users: [], TABLE: 10 },
];

// if first table isn't empty, re set the room and find emptiest
const getNextTable = (tables) => tables.shift();

// find first empty seat,
// start countint from there
// if it's the first one, use it
// if the seat is odd, the next odd
// if its even then the even one
// if there's non available then we spill onto evens as well

export const useTableQueue = () => {
  const [room, setRoom] = useState(ROOM);

  const assignSeat = (userId, table) => {
    if (table.users.length === MAX_TABLE_SIZE) {
      throw new Error("Table is full");
    }

    table.users.push(userId);

    if (table.users.length >= 2) {
      setRoom([...room, table]);
    } else {
      setRoom([table, ...room]);
    }
  };

  const sortTables = () => {
    const sortedRoom = room.sort((a, b) => {
      if (a.users.length < 2) {
        return 1;
      }
      if (b.users.length < 2) {
        return 1;
      }

      if (a.users.length < b.users.length) {
        return -1;
      }

      if (a.users.length === b.users.length) {
        return a.TABLE > b.TABLE ? 1 : -1;
      }

      return 1;
    });

    setRoom(sortedRoom);
  };

  const moveUser = (userId, tableId, newTableId) => {
    const table = room.find((table) => table.TABLE === tableId);
    const newTable = room.find((table) => table.TABLE === newTableId);

    if (newTable.users.length === MAX_TABLE_SIZE) {
      throw new Error("Table is already full");
    }

    table.users = table.users.filter((user) => user !== userId);
    newTable.users.push(userId);

    sortTables();
  };

  const tableActions = (userID, action, tableId, newTableId) => {
    switch (action) {
      case TABLE.ADD:
        const table = getNextTable(room);
        assignSeat(userID, table);
        break;

      case TABLE.MOVE:
        moveUser(parseFloat(userID), tableId, newTableId);
        break;

      default:
        return null;
    }
  };
  return { tableActions };
};
