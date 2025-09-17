
# GradGrove

Comprehensive platform for AI-based student drop-out prediction and counseling (SIH 2025 Problem Statement 25102).

## Table of Contents

- [About](#about)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## About

GradGrove is an AI-powered web application supporting students, mentors, counsellors, and administrators. It combines a Node.js/Express backend (with ML integration) and a React frontend to deliver predictive analytics and personalized support.

## Features

- Role-based dashboards (Student, Mentor, Counsellor, Admin)
- AI-driven drop-out risk prediction
- Student surveys and forms
- Secure authentication
- Responsive, modern UI
- Admin analytics and user management

## Setup

### Backend

1. Navigate to `backend/`
2. Install dependencies:

   ```powershell
   npm install
   ```

3. Configure environment variables in `backend/.env`
4. Start backend server:

   ```powershell
   npm start
   ```

### Frontend

1. Navigate to `frontend/`
2. Install dependencies:
  
   ```powershell
   npm install
   ```

3. Start Next.js app:

   ```powershell
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`

## Usage

- Use dashboards according to your role
- Admins: manage users, view analytics
- Mentors/Counsellors: support students, view risk predictions
- Students: fill surveys, access resources

## Project Structure

```text
GradGrove/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── scripts/
│   └── ...
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   ├── admin/
│   │   ├── student/
│   │   └── ...
│   └── public/
└── README.md
```

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss your proposal.

## License

Proprietary for GradGrove hackathon team. Do not copy, modify, or distribute without permission.
