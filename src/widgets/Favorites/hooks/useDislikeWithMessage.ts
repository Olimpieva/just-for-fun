import { useState } from "react";

import { useDislikeCutie } from "store/favorites";

import { messages } from "../Favorites.config";

export const useDislikeWithMessage = () => {
  const dislikeCutie = useDislikeCutie();
  const [message, setMessage] = useState("");

  const closeMessage = () => {
    setMessage("");
  };

  const dislike = (id: string) => {
    dislikeCutie(id);

    if (!message) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  return { message, dislike, closeMessage };
};
