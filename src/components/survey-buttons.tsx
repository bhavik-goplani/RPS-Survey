import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SurveyButtons() {
	return(
    <div>
      <div className="h-full flex items-center justify-center">
        <Link href="/dashboard/survey-view">
          <button className={cn(buttonVariants())}>
            View Surveys
          </button>
        </Link>
        <Link href="/dashboard/survey-create">
          <button className={cn(buttonVariants())}>
            Create new Survey
          </button>
        </Link>
      </div>
    </div>
  )
}