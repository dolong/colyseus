import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate (options: any) {
    this.setState(new MyRoomState());

      //when a message is received of type "message," broadcast it with the type "server-message" to all clients
      this.onMessage("message", (client, message) => {
        console.log("Game Room received message from", client.sessionId, ":", message);
        this.broadcast("server-message", `(${client.sessionId} ${message}`);
    });


    //when a message is received of type "game-message," broadcast it with the type "game-message" to all clients except for the one that sent it
    this.onMessage("game-message", (client, message) => {
        this.broadcast("game-message", message, { except: client });
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
