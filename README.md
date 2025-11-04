# Drone API Server

## Features

- GET /configs/:droneId → ดึงข้อมูล Config ของ Drone
- GET /status/:droneId → ดึง Condition ของ Drone
- GET /logs/:droneId → ดึง Logs (pagination หน้าละ 12 รายการ)
- POST /logs → บันทึก Log ใหม่

## Setup

```bash
git clone <your-repo>
npm install
```

## Run
```bash
npm start
```

## Test

- GET /configs/:droneId → `
curl -X GET https://assignment1-1-imgr.onrender.com/configs/66010233`
- GET /status/:droneId → `
curl -X GET https://assignment1-1-imgr.onrender.com/status/66010233`
- GET /logs/:droneId → `
curl -X GET https://assignment1-1-imgr.onrender.com/logs/66010233`
- POST /logs → `
curl -X POST https://assignment1-1-imgr.onrender.com/logs -H "Content-Type: application/json" -d '{"drone_id":66010233,"drone_name":"Test","country":"TH","celsius":34}'`