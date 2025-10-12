const apiClient = require("../utils/apiClient");
const CONFIG_URL = process.env.CONFIG_URL;

// GET /configs/:droneId
exports.getConfig = async (req, res) => {
  try {
    const { droneId } = req.params;
    const response = await apiClient.get(CONFIG_URL);

    const data = response.data.data; //ใช้ .data ข้างใน
    const config = data.find((c) => c.drone_id == droneId);

    if (!config) {
      return res.status(404).json({ error: "Drone not found" });
    }

    const { drone_id, drone_name, light, country, weight } = config;
    res.json({ drone_id, drone_name, light, country, weight });
  } catch (err) {
    console.error("Error fetching config:", err.message);
    res.status(500).json({ error: "Failed to fetch config" });
  }
};
