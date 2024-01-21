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
import * as React from "react"
import { useToast } from "@/components/ui/use-toast"
import { v4 as uuidv4 } from 'uuid';

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
      const { toast } = useToast()

      async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        reset()
        setGenerateLinkDialogOpen(false)

        const participant_id = uuidv4()
        const link = `${process.env.NEXT_PUBLIC_ROOT_URL}/${participant_id}`
        navigator.clipboard.writeText(link)

        const { participant_email } = values
        const res = await fetch('/api/participant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({participant_email, survey_id, participant_id})
        })
        
        if (res.ok) {
            console.log("Participant created")
        } else {
            console.log("Participant not created")
        }
        const email_res = await fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({participant_email, link})
        })

        if (email_res) {
            toast({
                title: "Email sent",
                description: "Participant invite sent successfully",
              })
        } else {
            toast({
                title: "Something went wrong.",
                description: "Your email could not be sent.",
                variant: "destructive",
              })
        }
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
                            Link will be copied to clipboard
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
				<Button type="submit">Send Invite</Button>
                </form>
            </Form>
            </DialogContent>        
        </Dialog>
      )
}