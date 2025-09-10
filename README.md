# React & Node.js Login System with SQLite

โปรเจคนี้เป็นเว็บแอปพลิเคชัน Full-Stack แบบง่ายๆ ที่สาธิตระบบการยืนยันตัวตนผู้ใช้ (User Authentication) ประกอบด้วยฝั่ง Frontend ที่สร้างด้วย React และฝั่ง Backend ที่สร้างด้วย Node.js, Express, และใช้ SQLite เป็นฐานข้อมูล

## คุณสมบัติ (Features)

-   **การลงทะเบียนผู้ใช้ (User Registration):** ผู้ใช้สามารถสร้างบัญชีใหม่ได้
-   **การเข้าสู่ระบบ (User Login):** ผู้ใช้สามารถเข้าสู่ระบบด้วยบัญชีที่มีอยู่
-   **การยืนยันตัวตนด้วย JWT:** ใช้ JSON Web Tokens (JWT) ในการจัดการ session ของผู้ใช้หลังจากการเข้าสู่ระบบ
-   **เส้นทางที่ถูกป้องกัน (Protected Routes):** หน้า Dashboard จะสามารถเข้าถึงได้เฉพาะผู้ใช้ที่เข้าสู่ระบบแล้วเท่านั้น
-   **Backend API:** มี API endpoints สำหรับการลงทะเบียน, เข้าสู่ระบบ, และการเข้าถึงข้อมูลในหน้า dashboard
-   **Frontend UI:** สร้างด้วย React และ Bootstrap เพื่อความสวยงามและตอบสนองต่อขนาดหน้าจอ

## เทคโนโลยีที่ใช้ (Tech Stack)

-   **Frontend:**
    -   [React](https://reactjs.org/)
    -   [Vite](https://vitejs.dev/)
    -   [React Router](https://reactrouter.com/)
    -   [Axios](https://axios-http.com/)
    -   [Bootstrap](https://getbootstrap.com/)
-   **Backend:**
    -   [Node.js](https://nodejs.org/)
    -   [Express](https://expressjs.com/)
    -   [SQLite3](https://www.sqlite.org/index.html)
    -   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
    -   [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
    -   [cors](https://github.com/expressjs/cors)

## โครงสร้างโปรเจค (Project Structure)

```
/
├── backend/        # โค้ดฝั่ง Server (Node.js, Express)
│   ├── .env        # ตัวแปรสภาพแวดล้อม (Environment variables)
│   ├── database.db # ไฟล์ฐานข้อมูล SQLite
│   ├── package.json
│   └── server.js   # ไฟล์หลักของ Server
└── frontend/       # โค้ดฝั่ง Client (React)
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## การติดตั้งและเริ่มใช้งาน (Installation and Setup)

### ข้อกำหนดเบื้องต้น (Prerequisites)

-   [Node.js](https://nodejs.org/en/) (แนะนำเวอร์ชัน 18.x ขึ้นไป)
-   npm (มาพร้อมกับ Node.js)

### 1. ตั้งค่า Backend

1.  เข้าไปที่ไดเรกทอรี `backend`:
    ```sh
    cd backend
    ```
2.  ติดตั้ง dependencies:
    ```sh
    npm install
    ```
3.  สร้างไฟล์ `.env` ในไดเรกทอรี `backend` และเพิ่มค่า `JWT_SECRET` ของคุณ:
    ````
    // filepath: backend/.env
    JWT_SECRET=your_super_secret_key_123
    ````
4.  เริ่มการทำงานของ server:
    ```sh
    node server.js
    ```
    Server จะทำงานที่ `http://localhost:3001`

### 2. ตั้งค่า Frontend

1.  เปิด terminal ใหม่และเข้าไปที่ไดเรกทอรี `frontend`:
    ```sh
    cd frontend
    ```
2.  ติดตั้ง dependencies:
    ```sh
    npm install
    ```
3.  เริ่มการทำงานของ development server:
    ```sh
    npm run dev
    ```
    แอปพลิเคชันจะเปิดขึ้นมาในเบราว์เซอร์ที่ `http://localhost:5173` (หรือ port อื่นที่ Vite กำหนด)

## API Endpoints

-   `POST /register`: สำหรับลงทะเบียนผู้ใช้ใหม่
    -   **Body:** `{ "username": "testuser", "password": "password123" }`
-   `POST /login`: สำหรับเข้าสู่ระบบ
    -   **Body:** `{ "username": "testuser", "password": "password123" }`
-   `GET /api/dashboard`: สำหรับเข้าถึงข้อมูลในหน้า dashboard (ต้องใช้ JWT)
    -   **Headers:** `Authorization: Bearer
