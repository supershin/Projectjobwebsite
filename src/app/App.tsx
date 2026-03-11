import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Redirect to public static site
    const publicIndexPath = '/public/index.html';
    
    // Only redirect if we're not already there
    if (!window.location.pathname.includes('/public/')) {
      window.location.replace(publicIndexPath);
    }
  }, []);

  // Show loading state while redirecting
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff6b35 0%, #ff9800 50%, #ffa726 100%)',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Thai", sans-serif',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <div style={{ 
          fontSize: '64px', 
          marginBottom: '24px',
          animation: 'bounce 2s ease-in-out infinite'
        }}>
          💼
        </div>
        
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '700', 
          marginBottom: '16px',
          letterSpacing: '-0.02em'
        }}>
          JobHub
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          opacity: 0.9,
          marginBottom: '32px'
        }}>
          กำลังเข้าสู่ระบบ...
        </p>
        
        <div style={{
          width: '60px',
          height: '60px',
          border: '6px solid rgba(255, 255, 255, 0.3)',
          borderTopColor: '#ffffff',
          borderRadius: '50%',
          margin: '0 auto',
          animation: 'spin 0.8s linear infinite'
        }}></div>
        
        <div style={{
          marginTop: '40px',
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ 
            fontSize: '14px', 
            marginBottom: '12px',
            opacity: 0.8
          }}>
            หากไม่ถูก redirect อัตโนมัติ
          </p>
          <a 
            href="/public/index.html"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            คลิกที่นี่เพื่อเข้าสู่ JobHub →
          </a>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
