const apiClient = require("../utils/apiClient");
const LOG_URL = process.env.LOG_URL;
const LOG_API_TOKEN = process.env.LOG_API_TOKEN;

// GET /logs/:droneId
exports.getLogs = async (req, res) => {
  try {
    const { droneId } = req.params;

    const page = req.query.page || 1;
    const perPage = req.query.perPage || 12;

    const getUrl = `${LOG_URL}?filter=(drone_id='${droneId}')&sort=-created&page=${page}&perPage=${perPage}`;
    const response = await apiClient.get(getUrl, {
      headers: {
        'Authorization': `Bearer ${LOG_API_TOKEN}`
      }
    });
    
    const items = response.data.items || [];
    const { totalItems, totalPages } = response.data;

    if (items.length === 0) {
      return res.status(404).json({ error: "No logs found for this drone" });
    }

    // แปลงข้อมูล
    const logs = items
      .map((log) => ({
        drone_id: log.drone_id,
        drone_name: log.drone_name,
        created: log.created,
        country: log.country,
        celsius: log.celsius
      }));

    const result = {
      items: logs,
      page: page,
      perPage: perPage,
      totalItems: totalItems,
      totalPages: totalPages
    };

    console.log("Get record:", result);
    res.json(result);

  } catch (err) {
    console.error("Error fetching logs:", err.message);
    if (err.response) {
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
    }
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

// POST /logs
exports.createLog = async (req, res) => {
  try {
    const { drone_id, drone_name, country, celsius } = req.body;
    const LOG_API_TOKEN = process.env.LOG_API_TOKEN;
    const pUrl = `${LOG_URL}`;
    
    const response = await apiClient.post(
      pUrl,
      { 
        drone_id, 
        drone_name, 
        country, 
        celsius 
      },
      { 
        headers: {
          'Authorization': `Bearer ${LOG_API_TOKEN}`
        }
      }
    );

    const createdRecord = {
      drone_id: response.data.drone_id,
      drone_name: response.data.drone_name,
      country: response.data.country,
      celsius: response.data.celsius,
    };

    console.log("Created record:", createdRecord);
    res.status(201).json(createdRecord);

  } catch (err) {
    console.error("Error creating log:", err.message);
    if (err.response) {
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
    }
    res.status(500).json({ error: "Failed to create log" });
  }
};