import express from 'express';
import Server from './Server';
import 'dotenv/config';

const app = express();
new Server(app);

const PORT = process.env.PORT || 3105;

app
    .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    })
    .on("error", (err: any) => {
        err.code === "EADDRINUSE"
            ? console.log("Error: address already in use")
            : console.log(err);
    });

export default app;
