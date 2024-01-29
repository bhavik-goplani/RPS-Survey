import Link from 'next/link'
import { Session } from '@supabase/auth-helpers-nextjs'
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SurveyButtons({ session, userRole }: { session: Session | null, userRole: string | null }) {
	
  if (!session) return (<></>)
  else if (userRole == 'anon') return (<></>)
  else 
  return(
      <div className="">
        <Link href="/dashboard">
          <button className={cn(buttonVariants({variant: "ghost"}))}>
            View Surveys
          </button>
        </Link>
      </div>
  )
}