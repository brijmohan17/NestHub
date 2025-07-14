# NestHub : Property listing Application 🏡

**NestHub** is a modern and intuitive property listing platform built with the MERN stack. Whether you're looking to rent, buy, or manage properties, NestHub simplifies the process with a seamless user experience. It supports secure authentication, role-based access, and real-time property listing operations—all in a clean, responsive UI.


---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](https://github.com/brijmohan17/Images/blob/main/nesthubhomepage.png)

---

### ➕ Particular Listing
![Listing](https://github.com/brijmohan17/Images/blob/main/nesthubonelisting.png)

---




## 🚀 Key Features

- 🔐 **JWT Authentication:** Secure signup, login, and logout functionality  
- ⏳ **Session Handling:** Auto-logout on token expiration to maintain security  
- 👤 **Role-Based Access:** Only property owners can modify or delete their listings  
- 🏘️ **Property Listings:** Add, view, update, and delete listings with ease  
- 🔒 **Protected Routes:** Frontend and backend route protection using token verification  
- 🧾 **User Feedback:** Toast notifications and clear error messages for all actions  
- 🖥️ **Responsive UI:** Tailwind CSS for a sleek, mobile-friendly interface  
- ⚙️ **RESTful Backend:** Fully integrated API using Express.js and MongoDB  

---

## 🖼️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router DOM  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (with Mongoose)  
- **Authentication:** JWT, LocalStorage  


---

## 🚀 Deployment Links

- **Frontend**: [NestHub Frontend](https://nesthub-app.vercel.app/)
- **Backend**: [NestHub Backend API](https://nest-hub-backend.vercel.app/)


---

## ✅ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/brijmohan17/NestHub.git
```

### 2. Backend Setup

```bash
cd backend
npm install
nodemon app.js
```

Make sure to create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Ensure the frontend is connected to the correct backend API URL (via `.env` or directly in the code).

---

## 🔮 Future Enhancements

- 📷 Add image upload functionality via Cloudinary or Firebase  
- 🗺️ Enable search filtering by city, state, or locality  
- ⭐ Implement user reviews and property ratings  
- 🔔 Add toast notifications for actions like success/failure  
- 📲 Introduce PWA support for mobile users and offline access 
