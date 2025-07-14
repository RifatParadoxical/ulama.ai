const NotFound = () => {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '4em', color: '#d9534f', marginBottom: '10px' }}>404 - Not Found</h1>
            <p style={{ fontSize: '1.2em', color: '#666', marginBottom: '20px' }}>
                The page you are looking for does not exist. <br /> May Allah (SWT) guide us to the right path.
            </p>
            <a href="/" style={{
                padding: '12px 24px',
                backgroundColor: '#5bc0de',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                transition: 'background-color 0.3s ease'
            }}>
                Go back to home
            </a>
        </div>
    );
};

export default NotFound;