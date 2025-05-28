import app from "./app";
import client from "./db/connectToDb";

const listeningPort = process.env.PORT;

client
  .$connect()
  .then(() => {
    console.log(`Connection with the db client has been established`);
    app.listen(listeningPort, () => {
      console.log("App is listening on port ", listeningPort);
    });
  })
  .catch((error) => {
    console.log(`Error occured while connecting with the client ${error}`);
  });
