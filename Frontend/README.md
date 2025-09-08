
# GradGrove Frontend

This folder contains the React-based frontend for GradGrove.

## Features

- Modern, responsive UI
- Role-based dashboards (Student, Mentor, Counsellor, Admin)
- Secure login and registration
- Student surveys and forms

## Setup

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Start the development server:

   ```powershell
   npm start
   ```

3. Open your browser at `http://localhost:3000`

## Project Structure

```text
Frontend/
├── src/
│   ├── components/
│   │   ├── Admin.js
│   │   ├── Counsellor.js
│   │   ├── Landing.js
│   │   ├── Login.js
│   │   ├── MentorDashboard.js
│   │   ├── Navbar.js
│   │   ├── StudentDashboard.js
│   │   ├── StudentForm.js
│   │   └── UserSurvey.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── public/
    └── index.html
```

## Usage

- Use the navigation bar to access dashboards and features
- Students: fill surveys, view dashboard
- Mentors/Counsellors: view student data, support students
- Admins: manage users, view analytics

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss your proposal.

## License

Proprietary for GradGrove hackathon team. Do not copy, modify, or distribute without permission.
