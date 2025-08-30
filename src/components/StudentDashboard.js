import StudentQuestionnaire from './StudentForm';

function StudentDashboard() {
  const handleFormSubmit = (data) => {
    console.log("Student data submitted:", data);
  };

  return (
    <div>
      <h1 style={{ color: 'var(--color-primary)' }}>Student Dashboard</h1>
  <StudentQuestionnaire onSubmit={handleFormSubmit}/>
    </div>
  );
}

export default StudentDashboard;
