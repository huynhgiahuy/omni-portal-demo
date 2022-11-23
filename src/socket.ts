import io from "socket.io-client";
// const access_token = localStorage.getItem('access_token');
// export const socket = io('http://172.27.228.201:9003', {
//     path: '/ws/socket.io',
//     auth: {
//         token: access_token,
//     },
// });

// socket.on("connect", () => {
//     console.log("socket connected");
// });

//const access_token = localStorage.getItem('access_token');
// export const socket = io('http://172.27.228.201:9003', {
//     path: '/ws/socket.io',
//     auth: {
//         token: access_token,
//     },
// });

// socket.on("connect", () => {
//     console.log("socket connected");
// });

// const omni_channel = "http://gateway.dev.omni.scc";
// export const socket = io(omni_channel, {
//     path: "/voip-service/ws/socket.io",
//     transports: ['websocket'],
//     query: {
//         'Authorization': access_token
//     }
// })
let ringingCallStatus

const socket = io("http://localhost:3000");
    socket.on('ringing_call', (data) => {
        console.log({data});
       if (data === true) {
          ringingCallStatus = true
       }
       console.log({data});
    });

export let allStatusCall = {
    ringingCall: ringingCallStatus
}