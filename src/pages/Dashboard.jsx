import { Link, Outlet } from "react-router-dom";
import ".././css/Dashboard.css";
import { FaSlack, FaSlackHash } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const headers = JSON.parse(localStorage.getItem("headers") || "{}");

  function handleLogout() {
    navigate("/");
  }

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
          <div className="dashboard-status-bar-top">
            <h1>You are currently logged in as: {headers.uid}</h1>
            <div className="log-out-button-container" onClick={handleLogout}>
              <MdLogout />
              <span>Log out</span>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
}
