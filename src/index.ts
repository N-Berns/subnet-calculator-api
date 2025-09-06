import "dotenv/config";
import express from "express";
import subnetRoutes from "./routes/subnetRoutes";
import bodyParser from "body-parser";
import { rateLimit } from "./middleware/rateLimit";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(rateLimit);
app.use("/subnet", subnetRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
