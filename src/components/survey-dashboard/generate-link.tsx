'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import * as React from "react"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const formSchema = z.object({
    participant_email: z.string().email(),
  })

interface GenerateLinkProps {
    generateLinkDialogOpen: boolean;
    setGenerateLinkDialogOpen: (value: boolean) => void;
    survey_id: string;
    }

export function GenerateLink({generateLinkDialogOpen, setGenerateLinkDialogOpen, survey_id}: GenerateLinkProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          participant_email: "",
        },
      })
      
      const { reset } = form
      const router = useRouter()
      const { toast } = useToast()

      async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        reset()
        setGenerateLinkDialogOpen(false)

        const { participant_email } = values
        const res = await fetch('/api/participant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({participant_email, survey_id})
        })
        const data = await res.json()
      }

      return(
        <Dialog open={generateLinkDialogOpen} onOpenChange={(open) => {
            setGenerateLinkDialogOpen(open)
            if (!open) {
              reset(); // Reset form values when dialog closes
            }
          }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Create Link for Participant</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="participant_email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Participant Email</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is the email of the participant.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
				<div className="flex justify-between">
					<Button type="submit">Send Invite</Button>
					<Button variant={"outline"} className="flex items-center justify-center">
						<Icons.copy_link className="text-white" />
						<span className="ml-2">Copy Link</span>
					</Button>
				</div>
                </form>
            </Form>
            </DialogContent>        
        </Dialog>
      )
}