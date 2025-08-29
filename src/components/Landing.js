function Landing() {
  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem' }}>AI-based Drop-out Prediction & Counseling System</h1>
      <p style={{ maxWidth: 600, textAlign: 'center', margin: '20px 0' }}>
        Welcome to the SIH 2025 prototype. Our system uses AI to predict student drop-out risk and provide personalized counseling.
      </p>
      <a href="/login">
        <button className="btn" style={{ fontSize: '1.2rem' }}>Get Started</button>
      </a>
    </div>
  );
}
export default Landing;
