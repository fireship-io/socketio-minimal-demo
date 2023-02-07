# Basic Socket.io Demo

A bare minimum Socket.io implementation. Learn about [Websockets & Socket.io](https://youtu.be/1BfCnjr_Vjg) on Youtube. 

## Run it

```
cd server
npm install
npm start
```

Open the `app/index.html` file in a browser. 


when using with react it should be inside an `useEffect` hook, and the clean up should 
disconnect the last socket

```js
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (socketAttributes.ip && socketAttributes.port) {
      const newSocket = io(BASE_URL, {
        extraHeaders: {
          "x-ip": socketAttributes.ip,
          "x-port": socketAttributes.port,
          "x-instance-id": instanceId,
        },
      });
      setSocket(newSocket);
      return () => socket?.close();
    }
  }, [socketAttributes.ip, socketAttributes.port]);

  socket?.on("connection-error", (err) => {
    setConnectionError({ hasErr: true, err });
  });
  socket?.on("connect", () => {
    setIsMainConnected(true);
  });
  socket?.on("disconnect", () => {
    setIsMainConnected(false);
  });
```
