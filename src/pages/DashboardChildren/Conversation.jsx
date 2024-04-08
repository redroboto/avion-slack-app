import React from "react";
import { useParams } from "react-router-dom";

export default function Conversation() {
  const params = useParams();

  return (
    <>
      <p>This is {params.user_id}</p>
    </>
  );
}
