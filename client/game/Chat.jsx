import React from "react";
import { Chat } from "../components/Chat";

export function ChatView({ game, player }) {
  return (
    <div className="h-full w-full absolute bottom-0 left-0 pointer-events-none">
      <div className="pr-20 h-full ">
        <Chat
          messages={game.get("messages") || []}
          avatar={player.get("avatar")}
          onNewMessage={(text) => {
            game.set("messages", [
              ...(game.get("messages") || []),
              {
                text,
                avatar: player.get("avatar"),
                playerId: player._id,
                id: randID(),
                timestamp: Date.now(),
              },
            ]);
          }}
        />
      </div>
    </div>
  );
}

function randID() {
  return Math.random().toString(16).slice(8);
}