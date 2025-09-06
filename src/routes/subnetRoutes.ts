import express from "express";
import { mainCalculate } from "../utils/result";

const router = express.Router();

router.get("/", (req, res) => {
  const { ip, subnets, hosts, cidr } = req.query as {
    ip: string;
    subnets?: string;
    hosts?: string;
    cidr?: string;
  };

  if (!ip) {
    return res
      .status(400)
      .json({ error: "Missing required parameter: IP Address" });
  }

  const provided = [subnets, hosts, cidr].filter(Boolean);

  if (provided.length !== 1) {
    return res.status(400).json({
      error:
        "Provided multiple parameters. Provide either CIDR, # of Subnets, or # of Hosts.",
    });
  }
  if (provided.length > 1) {
    return res.status(400).json({
      error:
        "Provided multiple parameters. Provide either CIDR, # of Subnets, or # of Hosts.",
    });
  }

  try {
    const result = mainCalculate(ip, { subnets, hosts, cidr });
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
