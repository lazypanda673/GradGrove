# 🎓 GradGrove - Student Risk Management System

A comprehensive web application for educational institutions to manage student risk assessment, counselor assignments, and data-driven interventions to improve student success rates.

## 🌟 Features

### 📊 Admin Dashboard

- **Overview Analytics**: Real-time risk distribution, department-wise analysis, and predictive insights
- **Student Management**: Track at-risk students with detailed profiles and risk scoring
- **Counselor Management**: Monitor counselor workloads and performance metrics
- **Interactive Mapping**: Visual counselor-student assignment interface
- **Communication Tools**: Send targeted alerts and notifications
- **Comprehensive Reports**: Generate and schedule automated reports

### 📂 Data Management System

Our newly implemented **Data Management** section provides:

#### 🔄 General Data Import (Server-Side)

- **Student Data Import**: Fetch student records from system databases
- **Counselor Data Import**: Import counselor profiles and assignments
- **Historical Data Import**: Retrieve past assessment and intervention records
- *Note: Simulates connection to institutional databases*

#### 📁 Specialized Student Data Upload (File-Based)

- **📝 Test Score Data**: Upload Excel files with student exam results
  - Format: `Student_ID, Test_Name, Subject, Score, Max_Score, Date`
- **💰 Financial Data**: Upload student fee and payment information
  - Format: `Student_ID, Fee_Type, Amount, Due_Date, Payment_Status, Semester`
- **📅 Attendance Data**: Upload student attendance records
  - Format: `Student_ID, Subject, Date, Status, Class_Hours, Semester`

#### ✨ Upload Features

- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **Real-time Progress**: Loading indicators and success confirmations
- **File Validation**: Supports CSV, Excel (.xlsx), and JSON formats
- **Upload History**: Track recent uploads with status indicators

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lazypanda673/GradGrove.git
   cd GradGrove/Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

``` bash
Frontend/
├── app/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── common/        # Shared components (Navbar, Footer, etc.)
│   │   ├── dashboard/     # Dashboard components
│   │   │   ├── AdminDashboard.tsx    # Main admin interface
│   │   │   ├── StudentDashboard.tsx  # Student portal
│   │   │   └── CounsellorDashboard.tsx # Counselor interface
│   │   └── pages/         # Page-specific components
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── public/               # Static assets
└── README.md            # This file
```

## 📖 User Guide

### For Administrators

1. **Access the Admin Dashboard**
   - Navigate to `/admin` after login
   - View the comprehensive overview with key metrics

2. **Manage Student Data**
   - Go to "Data Management" in the sidebar
   - Use **Import** buttons (left side) to fetch data from institutional systems
   - Use **Upload** buttons (right side) to upload Excel files with specific student data

3. **Monitor Risk Levels**
   - Check the Overview page for risk distribution
   - Review high-risk students in the Students section
   - Assign counselors through the Mapping interface

4. **Generate Reports**
   - Access the Reports section
   - Configure report parameters
   - Schedule recurring reports or generate on-demand

### For Counselors

1. **Access Counselor Dashboard**
   - Login and navigate to `/counsellor`
   - View assigned students and their risk levels

2. **Student Management**
   - Review student profiles and intervention history
   - Update student assessments
   - Schedule counseling sessions

### For Students

1. **Student Portal**
   - Access personal dashboard at `/student`
   - View academic progress and recommendations
   - Connect with assigned counselors

## 🔧 Development

### Building for Production

```bash
npm run build
npm run start
```

### Code Structure Guidelines

- **Components**: Reusable UI components in `/components`
- **Pages**: Route-based page components in `/app`
- **Styles**: Tailwind CSS for styling
- **State**: React hooks for local state management

### Key Technologies

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Emoji-based icons for simplicity
- **TypeScript**: Full TypeScript support

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Charts**: Real-time data visualization
- **Color-Coded Systems**: 
  - 🔴 High Risk (Red)
  - 🟡 Medium Risk (Yellow)
  - 🟢 Low Risk (Green)
- **Intuitive Navigation**: Clear sidebar navigation with visual indicators

## 📊 Data Management Workflow

1. **Import System Data**: Use import buttons to fetch institutional data
2. **Upload Specialized Files**: Upload Excel files for detailed analysis
3. **Data Validation**: System validates file formats and data integrity
4. **Processing**: Data is processed and integrated into the system
5. **Visualization**: Updated data appears in dashboards and reports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Contact the development team
- Check the documentation in the `/docs` folder

## 🔮 Future Enhancements

- **API Integration**: Connect to real institutional databases
- **Advanced Analytics**: Machine learning-based risk prediction
- **Mobile App**: Native mobile application
- **Integration**: LMS and SIS system integrations
- **Automated Interventions**: AI-powered intervention recommendations

---

## Built with ❤️ for educational institutions to help every student succeed
