import { logger } from "@/utils/logger";
import mongoose from "mongoose";

export const connect = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    logger.info("MongoDB connection successful");
  });

  mongoose.connection.on("error", (err) => {
    logger.error("MongoDB connection error: %s", err);
    console.error(err);
    // process.exit(1);
  });

  mongoose.connection.on("disconnected", (res) => {
    logger.warn("MongoDB disconnected: %s", res);
  });

  // Enable query logging
  mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });
};
