import { Link, Outlet } from "react-router-dom";
import ".././css/Dashboard.css";
import { FaSlack, FaSlackHash } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="navbar">
          <FaSlack className="nav-icon" />

          <Link to="channels">
            <FaSlackHash className="nav-icon" />
          </Link>
          <Link to="messages">
            <HiOutlineChatBubbleLeftRight className="nav-icon" />
          </Link>
        </div>

        <div className="dashboard-directory">
          <Outlet />
        </div>
      </div>
    </>
  );
}
