import Link from 'next/link'
import { Session } from '@supabase/auth-helpers-nextjs'
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SurveyButtons({ session, userRole }: { session: Session | null, userRole: string | null }) {
  
  if (!session) return (<></>)
  else if (userRole == 'participant') return (<></>)
  else 
	return(
      <div className="">
        <Link href="/dashboard/view-response">
          <button className={cn(buttonVariants({variant: "ghost"}))}>
            View Responses
          </button>
        </Link>
      </div>
  )
}