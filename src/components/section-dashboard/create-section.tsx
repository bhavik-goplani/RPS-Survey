'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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

const formSchema = z.object({
  rockProbability: z.number().min(0.00).max(1.00),
  paperProbability: z.number().min(0.00).max(1.00),
  scissorsProbability: z.number().min(0.00).max(1.00),
  trialNumber: z.number().min(1).max(100),
})

export function CreateSection( {survey_id} : {survey_id: string} ) {  
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rockProbability: 0.0,
      paperProbability: 0.0,
      scissorsProbability: 0.0,
      trialNumber: 1,
    },
    },
  )

  const [isOpen, setIsOpen] = React.useState(false)
  const { reset } = form
  const router = useRouter()
  const { toast } = useToast()
  
  async function onSubmit (values: z.infer<typeof formSchema>) {
    reset()
    setIsOpen(false)
    
    let sum = values.rockProbability + values.paperProbability + values.scissorsProbability;
    sum = Math.round((sum) * 1000) / 1000;
    if (sum != 1) {
      return toast({
        title: "Error",
        description: "Probabilities must sum to 1.",
        variant: "destructive",
      })
    }

    const res = await fetch('/api/section', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rockProbability: values.rockProbability,
        paperProbability: values.paperProbability,
        scissorsProbability: values.scissorsProbability,
        trialNumber: values.trialNumber,
        survey_id: survey_id,
      }),
    });
    if (res.ok) {
      router.refresh()
      return toast({
        title: "Section created.",
        description: "Your section has been created.",
      })
    } else {
      return toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      })
    }
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        reset(); // Reset form values when dialog closes
      }
    }}>
    <DialogTrigger asChild>
      <Button variant="outline">Create New Section</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create New Section</DialogTitle>
      </DialogHeader>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="rockProbability"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Probability of Rock</FormLabel>
                  <FormControl>
                      <Input 
                        type="number"
                        value={field.value}
                        step = "0.01"
                        onChange={event => field.onChange(event.target.value === "" ? null : Number(event.target.value))}
                      />
                  </FormControl>
                  <FormDescription>
                      This is the probability of rock out of 1.
                  </FormDescription>
                  <FormMessage />
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="paperProbability"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Probability of Paper</FormLabel>
                  <FormControl>
                      <Input 
                        type="number"
                        value={field.value}
                        step = "0.01"
                        onChange={event => field.onChange(event.target.value === "" ? null : Number(event.target.value))}
                      />
                  </FormControl>
                  <FormDescription>
                      This is the probability of paper out of 1.
                  </FormDescription>
                  <FormMessage />
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="scissorsProbability"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Probability of Scissor</FormLabel>
                  <FormControl>
                      <Input 
                          type="number"
                          value={field.value}
                          step = "0.01"
                          onChange={event => field.onChange(event.target.value === "" ? null : Number(event.target.value))}
                      />
                  </FormControl>
                  <FormDescription>
                      This is the probability of scissors out of 1.
                  </FormDescription>
                  <FormMessage />
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="trialNumber"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Trial Number</FormLabel>
                  <FormControl>
                      <Input 
                          type="number"
                          value={field.value} 
                          onChange={event => field.onChange(event.target.value === "" ? null : Number(event.target.value))}
                      />
                  </FormControl>
                  <FormDescription>
                      This is the number of trials.
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
  </>
  );
}
