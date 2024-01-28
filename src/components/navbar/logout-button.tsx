import { Session } from '@supabase/auth-helpers-nextjs'
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function LogoutButton({ session }: { session: Session | null }) {  

  if (!session) return (<></>)
  return (
    <div className="form-widget">
        <form action="/auth/signout" method="post">
          <button className={cn(buttonVariants({variant: "ghost"}))} type="submit">
            Sign out
          </button>
        </form>
    </div>
  )
}