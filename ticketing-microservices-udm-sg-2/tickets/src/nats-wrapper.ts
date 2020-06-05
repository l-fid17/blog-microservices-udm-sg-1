import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  connect(clusteID: string, clientID: string, url: string) {
    this._client = nats.connect(clusteID, clientID, { url });

    return new Promise((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("connected to NATS");
        resolve();
      });
      this._client!.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
