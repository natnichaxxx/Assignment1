# Assignment 1
Backend API Server ทำหน้าที่เป็นตัวกลาง (Middleware) ในการรับคำสั่งจาก Frontend เพื่อไปดึงข้อมูลหรือส่งข้อมูลไปยัง Server หลัก

## Tech Stack
- Runtime: Node.js
- Framework: Express.js
- Libraries: axios, cors, dotenv

## Features
- GET /configs/:droneId → ดึงข้อมูล Config ของ Drone
- GET /status/:droneId → ดึง Condition ของ Drone
- GET /logs/:droneId → ดึง Logs (pagination หน้าละ 12 รายการ)
- POST /logs → บันทึก Log ใหม่

## Setup
```bash
git clone <https://github.com/natnichaxxx/Assignment1.git>
npm install
```

## Environment Setup
สร้างไฟล์ .env
```.env
PORT = 3001

CONFIG_URL = https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjoKctFpZupWuNugTkVPjKAc7p2AZM8tb_smWRSFVHCz1Vw-Nibl5fbAooZdue27VIcEkSKpRqlx7jpnZeUNoIBpG5AoBtb7u8ecdgQG9ur0rS-9pECtSHMcwjXslEcPipzSaCqRztAMQgRGC7O8SoX0-JvPVEEzxP0x11J4oHP4ZhgqmyO6n2Z68_4CyWUUnsxRQ9EpOEq-KMiplI0H9kmyBKdeFB6pP_nMSehyX302Pzb15Tl95gMSWTZqetY2dEuRI1kgy3S41zEL9NrE_cIXLOafxJv1Dua9DOS&lib=M9_yccKOaZVEQaYjEvK1gClQlFAuFWsxN
LOG_URL = https://app-tracking.pockethost.io/api/collections/drone_logs/records
LOG_API_TOKEN = 20250901efx
```

## Run
```bash
npm start
```

## Test
- GET /configs/:droneId → `
curl -X GET https://assignment1-tbdw.onrender.com/configs/66010233`
- GET /status/:droneId → `
curl -X GET https://assignment1-tbdw.onrender.com/status/66010233`
- GET /logs/:droneId → `
curl -X GET https://assignment1-tbdw.onrender.com/logs/66010233`
- POST /logs → `
curl -X POST https://assignment1-tbdw.onrender.com/logs -H "Content-Type: application/json" -d '{"drone_id":66010233,"drone_name":"Test","country":"TH","celsius":34}'`

#### หมายเหตุ
- server นี้ใช้ Free Tier ของ Render ซึ่งอาจ Spin Down หากไม่มีการใช้งาน 15-30 นาที
- หากเข้าใช้งานครั้งแรกแล้วเจอ 502 Bad Gateway ให้รอสักครู่แล้ว Refresh (เป็นการ Cold Start)