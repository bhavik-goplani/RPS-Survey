'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
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
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import * as React from "react"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(500).optional(),
    section_count: z.number().min(0).max(100),
  })

export function CreateSurvey() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
          section_count: 0,
        },
      })
      
      const [isOpen, setIsOpen] = React.useState(false)
      const { reset } = form
      const router = useRouter()
      const { toast } = useToast()

      async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        reset()
        setIsOpen(false)

        const res = await fetch('/api/survey', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: values.name,
              description: values.description,
              section_count: values.section_count,
            }),
          });
        if (res.ok) {
            router.refresh()
            return toast({
                title: "Success!",
                description: "Survey has been added to the table.",
              })
        }
        else {
            return toast({
                title: "Something went wrong.",
                description: "Your survey could not be added to the table.",
                variant: "destructive",
              })
        }
      }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              reset(); // Reset form values when dialog closes
            }
          }}>
          <DialogTrigger asChild>
            <Button variant="outline">Create New Survey</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Survey</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is the name of the survey.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is the description of the survey.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="section_count"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Section Count</FormLabel>
                        <FormControl>
                            <Input 
                                type="number"
                                value={field.value} 
                                onChange={event => field.onChange(event.target.value === "" ? null : Number(event.target.value))}
                            />
                        </FormControl>
                        <FormDescription>
                            This is the number of sections in the survey.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
                </form>
            </Form>
          </DialogContent>
        </Dialog>
    )
}