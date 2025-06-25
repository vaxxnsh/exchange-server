import { Client } from 'pg';
import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { Request,Response } from 'express';

const pgClient = new Client({
    user: 'your_user',
    host: 'localhost',
    database: 'my_database',
    password: 'your_password',
    port: 5432,
});
pgClient.connect();

export const klineRouter = Router();

klineRouter.get("/", async (req, res): Promise<any> => {
    const { market, interval, startTime, endTime } = req.query;

    if (!market || !interval || !startTime || !endTime) {
        return res.status(400).send("Missing required query parameters");
    }

    let query;
    let values;

    switch (interval) {
        case '1m':
            query = `SELECT * FROM klines_1m WHERE bucket >= $1 AND bucket <= $2 AND currency_code = $3`;
            break;
        case '1h':
            query = `SELECT * FROM klines_1h WHERE bucket >= $1 AND bucket <= $2 AND currency_code = $3`;
            break;
        case '1w':
            query = `SELECT * FROM klines_1w WHERE bucket >= $1 AND bucket <= $2 AND currency_code = $3`;
            break;
        default:
            return res.status(400).send('Invalid interval');
    }

    try {
        const start = new Date(Number(startTime));
        const end = new Date(Number(endTime));
        values = [start, end, market];

        const result = await pgClient.query(query, values);
        res.json(result.rows.map(x => ({
            open: x.open,
            high: x.high,
            low: x.low,
            close: x.close,
            volume: x.volume,
            start: x.bucket,
            end: new Date(new Date(x.bucket).getTime() + getIntervalMs(interval)),
            currency: x.currency_code,
        })));
    } catch (err) {
        console.error("Error querying klines:", err);
        res.status(500).send(err);
    }
});


function getIntervalMs(interval: string): number {
    switch (interval) {
        case '1m': return 60 * 1000;
        case '1h': return 60 * 60 * 1000;
        case '1w': return 7 * 24 * 60 * 60 * 1000;
        default: return 0;
    }
}