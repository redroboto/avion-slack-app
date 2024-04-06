import { Input } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { RiChatNewLine } from "react-icons/ri";
import "../.././css/Messages.css";

export default function Messages() {
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

          <Input type="text"></Input>
          <h1>Display messages here</h1>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
