'use client'
import Link from 'next/link'
import { Session } from '@supabase/auth-helpers-nextjs'

import { ModeToggle } from "@/components/navbar/mode-toggle"
import LogoutButton from '@/components/navbar/logout-button'
import ViewResponseButton from '@/components/navbar/view-response-button'
import ViewSurveyButton from '@/components/navbar/view-survey-button'

export function NavBar( { session, userRole }: { session: Session | null, userRole: string | null }) {
    return (
        <div className="flex justify-between p-6">
            <div className="relative z-20 flex items-center text-lg font-medium">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-6 w-6"
                >
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <Link href='/dashboard'> 
                    RPS Survey App 
                </Link>
            </div>
            <div className="flex">
                <div className="pr-4"> {/* Add padding-right for spacing */}
                    <ViewSurveyButton session={session} userRole={userRole}/>
                </div>
                <div className="pr-4"> {/* Add padding-right for spacing */}
                    <LogoutButton session={session} />
                </div>
                <div className="ml-4"> {/* Add margin-left for spacing */}
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}