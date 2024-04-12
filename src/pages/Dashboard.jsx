import { Link, Outlet } from "react-router-dom";
import ".././css/Dashboard.css";
import { FaSlack, FaSlackHash } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { headers } from "../utilities/ConstList";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="navbar">
          <FaSlack className="nav-icon" />

          <div className="nav-channels-container">
            <Link to="channels">
              <FaSlackHash className="nav-icon" />
            </Link>
            <span>Channels</span>
          </div>

          <div className="nav-messages-container">
            <Link to="messages">
              <HiOutlineChatBubbleLeftRight className="nav-icon" />
            </Link>
            <span>Messages</span>
          </div>
        </div>

        <div className="dashboard-directory">
          <h1>You are currently logged in as: {headers.uid}</h1>

          <Outlet />
        </div>
      </div>
    </>
  );
}
