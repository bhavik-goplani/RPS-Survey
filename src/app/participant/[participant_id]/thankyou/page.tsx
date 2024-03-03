'use client'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import * as React from 'react'

export const dynamic = 'force-dynamic'

export default function ThankYou() {

  const params = useParams()
  const router = useRouter()
 
  const participant_id = params.participant_id
  console.log(participant_id)
  React.useEffect(() => {
    async function deleteParticipant() {
    const res = await fetch(`/api/participant?participant_id=${participant_id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      })
      if (res.ok) {
          console.log('Participant Deleted')
          router.refresh()
          const res = await fetch('/auth/signout',
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'same-origin',
          }
          )
          router.push('/')
          router.refresh()
      }
      else {
          console.log(res)
      }
    }

    const timeoutId = setTimeout(deleteParticipant, 5000);
    return () => clearTimeout(timeoutId);

  }, [participant_id])
  
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