


function Footer() {
    return (
        <footer style={{
            background: 'var(--color-primary)',
            color: 'var(--color-background)',
            textAlign: 'center',
            padding: '18px 0 12px 0',
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: '0.5px',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100vw',
            zIndex: 100
        }}>
            <div style={{ color: 'var(--color-background)', fontSize: 14 }}>
                &copy; {new Date().getFullYear()} GradGrove. All rights reserved.
            </div>
        </footer>
    );
}
export default Footer;
