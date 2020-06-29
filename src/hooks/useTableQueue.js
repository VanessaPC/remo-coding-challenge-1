import { useState } from "react";

const TABLE = {
  ADD: "add",
  MOVE: "move",
};

const MAX_TABLE_SIZE = 6;

const getNextTable = (tables) => tables.shift();

export const useTableQueue = (initialRoom) => {
  const [room, setRoom] = useState(initialRoom);

  const assignSeat = (userId, table) => {
    if (table.users.length === MAX_TABLE_SIZE) {
      throw new Error("Table is full");
    }

    table.users.push(userId);

    if (table.users.length >= 2) {
      setRoom([...room, table]);

      return [...room, table];
    } else {
      setRoom([table, ...room]);

      return [table, ...room];
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
        const updatedRoom = assignSeat(userID, table);

        return {
          tableId: table.TABLE,
          room: updatedRoom,
        };

      case TABLE.MOVE:
        moveUser(parseFloat(userID), tableId, newTableId);
        return {
          tableId: table.TABLE,
          room,
        };

      default:
        return {
          tableId: table.TABLE,
          room,
        };
    }
  };
  return { tableActions };
};
