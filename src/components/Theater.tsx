import React, { useState } from "react";
import "./Theater.scss";
import MapImage from "../assets/conference-map.svg";
import TableConfig from "./tableConfig.json";
import { users as mockUsers } from "../mock-server/users";
import { useTableQueue } from "../hooks/useTableQueue";

const ROOM = [
  { users: [], TABLE: 1, _id: "first-table" },
  { users: [], TABLE: 2, _id: "second-table" },
  { users: [], TABLE: 3, _id: "third-table" },
  { users: [], TABLE: 4, _id: "fourth-table" },
  { users: [], TABLE: 5, _id: "fifth-table" },
  { users: [], TABLE: 6, _id: "sixth-table" },
  { users: [], TABLE: 7, _id: "seventh-table" },
  { users: [], TABLE: 8, _id: "eighth-table" },
  { users: [], TABLE: 9, _id: "ninth-table" },
  { users: [], TABLE: 10, _id: "tenth-table" },
  { users: [], TABLE: 11, _id: "eleventh-table" },
  { users: [], TABLE: 12, _id: "twelfth-table" },
  { users: [], TABLE: 13, _id: "thirteenth-table" },
  { users: [], TABLE: 14, _id: "fourteenth-table" },
  { users: [], TABLE: 15, _id: "fifteenth-table" },
  { users: [], TABLE: 16, _id: "left-top-table" },
  { users: [], TABLE: 17, _id: "right-top-table" },
  { users: [], TABLE: 18, _id: "left-bottom-table" },
  { users: [], TABLE: 19, _id: "right-bottom-table" },
];

interface User {
  _id: string;
  picture: string;
  age: number;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  table: number | null;
}

const getTable = (tableId: string, tables: any[]) => {
  return tables.find((table) => table._id === tableId);
};

const getUser = (userId: string, users: User[]) =>
  users.find((user) => user._id === userId) || { email: "" };

const Theater: React.FC = () => {
  // const [userId, setUserId] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [currentUser, setCurrentUser] = useState<any>(users[0]);
  const [room, setRoom] = useState(ROOM);
  const { tableActions } = useTableQueue(room);

  return (
    <div
      className="remo-theater"
      style={{ width: TableConfig.width, height: TableConfig.height }}
    >
      <div className="rt-app-bar">
        {/**
         * Show user profile pic/name after login
         */}
        <a href="javascript:;">Logout</a>
        <div>
          <div>
            <img
              src={`https://api.adorable.io/avatars/25/${currentUser.email}`}
              alt="Profile avatar"
            />
            {currentUser.name.first} {currentUser.name.last}
          </div>
          <div>Table: {currentUser.table ? currentUser.table : "None"}</div>
          <select
            onChange={(e) =>
              setCurrentUser(users.find((user) => user._id === e.target.value))
            }
          >
            {users.map((user) => (
              <option value={user._id}>
                {user.name.first} {user.name.last} - Table:{" "}
                {user.table ? user.table : "None"}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              const { tableId, room } = tableActions(currentUser._id, "add");
              setRoom(room);

              setCurrentUser(
                users.find(
                  (user) => !user.table && user._id !== currentUser._id
                ) || users[0]
              );

              setUsers(
                users.map((user) => {
                  if (user._id === currentUser._id) {
                    user.table = tableId;
                  }

                  return user;
                })
              );
            }}
          >
            Join
          </button>
        </div>
      </div>
      <div className="rt-rooms">
        {/**
         * Create rooms here as in the requirement and make sure it is aligned with background
         */}
        {TableConfig.tables.map((table) => (
          <div
            className="rt-room"
            style={{
              width: table.width,
              height: table.height,
              top: table.y,
              left: table.x,
            }}
          >
            {getTable(table.id, room).users.map((user: any, index: number) => (
              <span
                style={{
                  position: "absolute",
                  width: "40px",
                  height: "40px",
                  top: table.seats[index].y,
                  left: table.seats[index].x,
                  borderRadius: "35px",
                  border: "2px solid orange",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`https://api.adorable.io/avatars/25/${
                    getUser(user, users).email
                  }`}
                  alt="Profile avatar"
                />
              </span>
            ))}
            <div className="rt-room-name">{table.id}</div>
          </div>
        ))}
      </div>
      <div className="rt-background">
        <img src={MapImage} alt="Conference background" />
      </div>
    </div>
  );
};

export default Theater;
