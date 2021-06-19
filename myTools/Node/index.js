import { Server } from "./app"

const init = ()=>{
    const server = new Server(4000);
     server.listen();
}

init();