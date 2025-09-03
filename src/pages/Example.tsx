"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { ThemeProvider } from "../components/theme-provider";
import { ModeToggle } from "../components/mode-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { ProfileCard } from "../components/profile-card";

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

export function Example() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            feedback: ''
        }
    })

    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="queue-system-app">
                <div className="fixed top-4 right-4">
                    <ModeToggle></ModeToggle>
                </div>
                <div className="flex min-h-svh flex-col items-center justify-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Actions
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Update</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ProfileCard></ProfileCard>


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
                </div>

                <div className="fixed bottom-4 right-4 text-sm text-muted-foreground">
                    <p>Made with ❤️ by Your Name</p>
                    <p>Powered by Vite</p>
                </div>
            </ThemeProvider>
        </>

    )
}