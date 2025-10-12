const apiClient = require("../utils/apiClient");
const CONFIG_URL = process.env.CONFIG_URL;

// GET /status/:droneId
exports.getStatus = async (req, res) => {
  try {
    const { droneId } = req.params;
    const response = await apiClient.get(CONFIG_URL);

    console.log("Drone Config Response:", response.data); // Debug

    const data = response.data.data; // เข้าถึง array ใน key "data"
    const config = data.find((c) => c.drone_id == droneId);

    if (!config) {
      return res.status(404).json({ error: "Drone not found" });
    }

    res.json({ condition: config.condition });
  } catch (err) {
    console.error("Error fetching status:", err.message);
    res.status(500).json({ error: "Failed to fetch status" });
  }
};
