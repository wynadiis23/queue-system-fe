import { FeedbackForm } from "./components/example-form"
import { ModeToggle } from "./components/mode-toggle"
import { ProfileCard } from "./components/profile-card"
import { ThemeProvider } from "./components/theme-provider"

import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"

function App() {
  return (
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
              Feedback Form
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" placeholder="your name here" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="your email here" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="division">Division</Label>
              <Select name="division">
                <SelectTrigger>
                  <SelectValue placeholder="Select your division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="feedback">Feedback</Label>
              <textarea name="feedback" id="feedback" rows={4} placeholder="Type your feedback here..." />
            </div>
            <Button>Submit</Button>
          </CardContent>
        </Card>
        <FeedbackForm></FeedbackForm>
      </div>
      <div className="fixed bottom-4 right-4 text-sm text-muted-foreground">
        <p>Made with ❤️ by Your Name</p>
        <p>Powered by Vite</p>
      </div>
    </ThemeProvider>
  )
}

export default App