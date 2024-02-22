'use client'
export const dynamic = 'force-dynamic'

export default function ThankYou() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        height: '100vh'
      }}>
        <h1 style={{
          fontSize: '2rem',
          animation: 'fadeInMoveUp 2s ease-out forwards',
          opacity: 0,
          position: 'relative',
          top: '30px'
        }}>Thank You for participating in the survey!</h1>
        <style jsx>{`
          @keyframes fadeInMoveUp {
            0% {
              opacity: 0;
              top: 30px;
            }
            100% {
              opacity: 1;
              top: 0;
            }
          }
        `}</style>
      </div>
    )
  }