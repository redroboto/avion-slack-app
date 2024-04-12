import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utilities/ConstList";
import { useState, useEffect } from "react";
import { Textarea, Button, FormLabel } from "@chakra-ui/react";
import { LuSendHorizonal } from "react-icons/lu";

async function fetchRecentConversation(headers, user_id) {
  try {
    const data = await fetch(
      `${BASE_URL}/messages?receiver_id=${user_id}&receiver_class=User`,
      {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      }
    );

    const res = await data.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export default function Conversation() {
  const params = useParams();
  const headers = JSON.parse(localStorage.getItem("headers") || "{}");
  const [conversation, setConversation] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  async function getRecentConversation() {
    const data = await fetchRecentConversation(headers, params.user_id);
    console.log(data);
    setConversation(data.data);
  }

  useEffect(() => {
    if (headers && params.user_id) {
      getRecentConversation();
    }
  }, [params.user_id]);

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
      receiver_id: params.user_id,
      receiver_class: "User",
      body: newMessage,
    });
    setNewMessage("");
    getRecentConversation();
  }

  return (
    <>
      <div>
        {conversation.map((message) => {
          return <p key={message.id}>{message.body}</p>;
        })}
      </div>
      <div>
        <form onSubmit={handleSendMessage}>
          <Textarea
            type="text"
            onChange={handleMessageChange}
            value={newMessage}
          ></Textarea>
          <Button type="submit">
            <LuSendHorizonal />
          </Button>
        </form>
      </div>
    </>
  );
}
