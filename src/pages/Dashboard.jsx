import { Link, Outlet } from "react-router-dom";
import ".././css/Dashboard.css";
import { FaSlack, FaSlackHash } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="navbar">
          <Link to="dashboard">
            <FaSlack />
          </Link>
          <Link to="channels">
            <FaSlackHash />
          </Link>
          <Link to="messages">
            <HiOutlineChatBubbleLeftRight />
          </Link>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
