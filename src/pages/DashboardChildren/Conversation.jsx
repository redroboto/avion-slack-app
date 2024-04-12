import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utilities/ConstList";
import { useState, useEffect } from "react";

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

  return (
    <>
      <p>This is {params.user_id}</p>
      <div>
        {conversation.map((message) => {
          return <p key={message.id}>{message.body}</p>;
        })}
      </div>
    </>
  );
}
