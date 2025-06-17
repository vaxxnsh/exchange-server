import express from "express";
import cors from "cors";
import { tickersRouter } from "./routes/ticker";
import { klineRouter } from "./routes/kline";
import { tradesRouter } from "./routes/trades";
import { orderRouter } from "./routes/order";
import { depthRouter } from "./routes/depth";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/order", orderRouter);
app.use("/api/v1/depth", depthRouter);
app.use("/api/v1/trades", tradesRouter);
app.use("/api/v1/klines", klineRouter);
app.use("/api/v1/tickers", tickersRouter);

app.listen(8080, () => {
    console.log("Server is running on port 3000");
});