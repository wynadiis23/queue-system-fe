"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters long'
    }).max(50),
    email: z.email(),
    division: z.enum(['hr', 'engineering', 'marketing'], {
        message: 'Please select a division'
    }),
    feedback: z.string().min(10, {
        message: 'Feedback must be at least 10 characters long'
    }).max(500)
})

type FormSchema = z.infer<typeof formSchema>;

function onSubmit(data: FormSchema) {
    console.log(data);
}

export function FeedbackForm() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            feedback: ''
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Feedback form
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormDescription className="text-sm text-muted-foreground">
                                    Please enter a unique name.
                                </FormDescription>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please enter a valid email address.
                                </FormDescription>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="division" render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="division">
                                    Division
                                </FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your division" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hr">HR</SelectItem>
                                            <SelectItem value="engineering">Engineering</SelectItem>
                                            <SelectItem value="marketing">Marketing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Please select your division.
                                </FormDescription>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="feedback" render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="feedback">
                                    Feedback
                                </FormLabel>
                                <FormControl>
                                    <textarea placeholder="Enter your feedback" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please enter your feedback.
                                </FormDescription>
                            </FormItem>
                        )} />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}