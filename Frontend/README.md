
# GradGrove

Prototype for SIH 2025 Problem Statement 25102: AI-based drop-out prediction and counseling system.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## About

GradGrove is an AI-powered platform designed to predict student drop-outs and provide personalized counseling. Built for SIH 2025, it leverages modern web technologies and machine learning to support students, mentors, and administrators.

## Features

- Student, Mentor, Counsellor, and Admin dashboards
- AI-based drop-out prediction
- User survey and student form
- Secure login system
- Responsive UI

## Setup

After cloning the repository, follow these steps:

1. **Install dependencies**

```powershell
npm install
```

1. **Start the development server**

```powershell
npm start
```

1. Open your browser and navigate to `http://localhost:3000`

## Usage

- Use the navigation bar to access different dashboards and features.
- Admins can manage users and view analytics.
- Mentors and counsellors can view student data and provide support.
- Students can fill out surveys and access resources.

## Project Structure

```text
src/
  App.js
  index.js
  index.css
  components/
    Admin.js
    Counsellor.js
    Landing.js
    Login.js
    MentorDashboard.js
    Navbar.js
    StudentDashboard.js
    StudentForm.js
    UserSurvey.js
public/
  index.html
  ...
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This code is proprietary and intended only for use by the GradGrove hackathon team. Do not copy, modify, or distribute without permission.
