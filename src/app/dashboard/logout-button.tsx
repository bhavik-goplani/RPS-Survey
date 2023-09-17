import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LogoutButton({ session }: { session: Session | null }) {  
  return (
    <div className="form-widget">
      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}