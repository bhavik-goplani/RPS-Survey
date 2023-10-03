import { Session } from '@supabase/auth-helpers-nextjs'
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function LogoutButton({ session }: { session: Session | null }) {  

  if (!session) return (<></>)
  return (
    <div className="form-widget">
      <div>
        <form action="/auth/signout" method="post">
          <button className={cn(buttonVariants())} type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}