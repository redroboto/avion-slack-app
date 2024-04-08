import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utilities/ConstList";

export default function Conversation() {
  const params = useParams();

  return (
    <>
      <p>This is {params.user_id}</p>
    </>
  );
}
