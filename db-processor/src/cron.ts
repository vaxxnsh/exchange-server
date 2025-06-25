import { Client } from 'pg';

const client = new Client({
  user: 'your_user',
  host: 'localhost',
  database: 'my_database',
  password: 'your_password',
  port: 5432,
});

async function refreshViews() {
  await client.query('REFRESH MATERIALIZED VIEW klines_1m');
  await client.query('REFRESH MATERIALIZED VIEW klines_1h');
  await client.query('REFRESH MATERIALIZED VIEW klines_1w');
  console.log("🔁 Refreshed at", new Date().toISOString());
}

export async function startCronJob() {
  await client.connect();
  console.log("✅ Connected to PostgreSQL for cron job");

  await refreshViews();

  setInterval(async () => {
    try {
      await refreshViews();
    } catch (err) {
      console.error("❌ Error refreshing views:", err);
    }
  }, 10000);
}
