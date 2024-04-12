import { Input } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { RiChatNewLine } from "react-icons/ri";
import "../.././css/Messages.css";
import { BASE_URL } from "../../utilities/ConstList";
import { useState, useEffect } from "react";

async function fetchRecentDms(headers) {
  try {
    const data = await fetch(`${BASE_URL}/users/recent`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    const res = await data.json();
    if (res.errors) {
      throw res.errors.full_messages[0];
    } else {
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}

export default function Messages() {
  const headers = JSON.parse(localStorage.getItem("headers") || "{}");
  const [recentUsers, setRecentUsers] = useState([]);

  async function getRecentDms() {
    const data = await fetchRecentDms(headers);
    console.log(data);
    setRecentUsers(data.data);
  }

  useEffect(() => {
    if (headers) {
      getRecentDms();
    }
  }, []);

  return (
    <>
      <div className="messages-container">
        <div className="messsages-directory">
          <div className="message-directory-header">
            <h1>Direct Messages</h1>
            <Link to="create-message">
              <RiChatNewLine />
            </Link>
          </div>

          <Input
            type="text"
            placeholder="add searchbar functionality here"
          ></Input>
          <h1>Display messages here</h1>
          <div className="conversation-list">
            {recentUsers.map((user) => (
              <Link key={user.id} to={`${user.id}`}>
                {user.email}
              </Link>
            ))}
          </div>
        </div>

        <div className="conversation-display">
          <Outlet />
        </div>
      </div>
    </>
  );
}
