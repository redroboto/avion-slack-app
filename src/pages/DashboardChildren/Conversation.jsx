import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utilities/ConstList";
import { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import { LuSendHorizonal } from "react-icons/lu";
import "../.././css/Conversation.css";

async function fetchRecentConversation(headers, id, receiver_class) {
  try {
    const data = await fetch(
      `${BASE_URL}/messages?receiver_id=${id}&receiver_class=${receiver_class}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      }
    );

    const res = await data.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export default function Conversation({ receiver_class }) {
  const params = useParams();
  const headers = JSON.parse(localStorage.getItem("headers") || "{}");
  const [conversation, setConversation] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

  async function getRecentConversation() {
    const data = await fetchRecentConversation(
      headers,
      params.id,
      receiver_class
    );
    console.log(data.data);
    console.log(currentUser.id);
    setConversation(data.data);
  }

  useEffect(() => {
    if (headers && params.id) {
      getRecentConversation();
    }
  }, [params.id]);

  async function sendMessage(headers, body) {
    try {
      const data = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });
      const res = await data.json();
      console.log(res);
    } catch (error) {}
  }

  const handleMessageChange = (e) => setNewMessage(e.target.value);

  async function handleSendMessage(e) {
    e.preventDefault();
    const data = await sendMessage(headers, {
      receiver_id: params.id,
      receiver_class: receiver_class,
      body: newMessage,
    });
    setNewMessage("");
    getRecentConversation();
  }

  return (
    <>
      <div className="conversation-header-container">
        <h1>Current conversation with: </h1>
        <div>
          {typeof receiver_id !== "number" ? <button>Add Users</button> : ""}
        </div>
      </div>
      <div className="conversation-display-container">
        {conversation.map((message) => {
          return (
            <div
              className={
                message.sender.id === currentUser.id
                  ? "conversation-line-sender"
                  : "conversation-line-receiver"
              }
            >
              <div
                className={
                  message.sender.id === currentUser.id
                    ? "conversation-bubble-sender"
                    : "conversation-bubble-receiver"
                }
              >
                <p key={message.id}>
                  <span id="message-sender-uid">{message.sender.uid}</span>
                  <br></br>
                  {message.body}
                  <br></br>
                  <span>sent on: </span>
                  {message.created_at}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="conversation-new-message-container">
        <form onSubmit={handleSendMessage}>
          <InputGroup>
            <Input
              type="text"
              onChange={handleMessageChange}
              value={newMessage}
            />
            <InputRightAddon>
              <button type="submit">
                <LuSendHorizonal />
              </button>
            </InputRightAddon>
          </InputGroup>
        </form>
      </div>
    </>
  );
}
