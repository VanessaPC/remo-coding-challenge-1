import * as React from "react";
import "./Theater.scss";
import MapImage from "../assets/conference-map.svg";
import TableConfig from "./tableConfig.json";
import { useTableQueue } from "../hooks/useTableQueue";

const Theater: React.FC = () => {
  const [userId, setUserId] = React.useState("");
  const { tableActions } = useTableQueue();

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
