# Travel Agency Application

## Overview

This is a simple Travel Agency application that allows customers to view available tour packages, book them, and receive an invoice. The application also includes a basic admin panel to manage tour packages and view customer bookings.

### Features:
1. **Tour Packages Page**: Displays a list of available tour packages.
2. **Package Booking**: Customers can book a tour package and receive an invoice.
3. **Admin Panel**: Admins can add, update, delete tour packages, and view customer bookings.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: No authentication implemented for simplicity (can be added later)
- **Invoice Generation**: Basic invoice with package and customer details.

---

## Deployement Link
- **Vercel**: [React.js](https://travel-booking-flax.vercel.app/)

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (MongoDB Atlas or local MongoDB instance)
- A code editor like [VS Code](https://code.visualstudio.com/)

---

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/travel-agency.git
cd travel-agency
2. Install Dependencies
Install client-side dependencies:
bash
Copy code
cd client
npm install
Install server-side dependencies:
bash
Copy code
cd server
npm install
3. Setup MongoDB
If using MongoDB locally, ensure your MongoDB server is running.
If using MongoDB Atlas, set up your MongoDB cluster and replace the database connection URL in the server/config/db.js file.
4. Running the Application
Start the backend (Node.js/Express server):
bash
Copy code
cd server
npm start
The backend will run on http://localhost:5000.

Start the frontend (React application):
bash
Copy code
cd client
npm run dev
