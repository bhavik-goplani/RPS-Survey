import { Metadata } from "next"
import Link from "next/link"
import { AuthForm } from "@/components/auth-form"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "RPS Survey App",
  description: "Applied Behavioral Science Research: Automated survey generator",
}

export default function Home() {
  return (
    <>
      <div className="min-h-[100%] items-center justify-center flex flex-1 lg:px-0 px-6">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to view your dashboard!
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to sign in.
              </p>
            </div>
            <AuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="https://youtu.be/dQw4w9WgXcQ?si=RnnW_mAmIeXd_lTP"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="https://youtu.be/dQw4w9WgXcQ?si=RnnW_mAmIeXd_lTP"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      </>
  )
}