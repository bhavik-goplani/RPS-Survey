'use client'
import Link from 'next/link'
import { Session } from '@supabase/auth-helpers-nextjs'

export default function SurveyButtons({ session }: { session: Session | null }) {
	return(
    <div>
      <h1>Survey Buttons</h1>
      <div className="h-full flex items-center justify-center">
        <Link href="/dashboard/survey-view" className="bg-gradient-to-r from-red-500 to-pink-500 p-20 rounded-lg mx-4">
          View Surveys
        </Link>
        <Link href="/dashboard/survey-create" className="bg-gradient-to-l from-blue-500 to-teal-500 p-20 rounded-lg mx-4">
          Create new Survey
        </Link>
      </div>
    </div>
  )
}