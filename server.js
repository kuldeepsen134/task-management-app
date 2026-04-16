import dotenv from 'dotenv'
import app from "./app/app.js";
import connectDB from "./app/config/db.js";
import logger from "./app/utils/logger.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  logger.info(`Server running on port http://localhost:${PORT}/api`);
});