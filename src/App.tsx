import { ModeToggle } from "./components/mode-toggle"
import { ProfileCard } from "./components/profile-card"
import { ThemeProvider } from "./components/theme-provider"

import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"

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
          <CardContent>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" placeholder="your name here" />
            </div>
            <div>
              <Label htmlFor="feedback">Feedback</Label>
              <textarea className="resize-none border border-input bg-transparent px-3 py-2" rows={4} placeholder="Type your feedback here..." />
              <Button type="submit">Submit Feedback</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="fixed bottom-4 right-4 text-sm text-muted-foreground">
        <p>Made with ❤️ by Your Name</p>
        <p>Powered by Vite</p>
      </div>
    </ThemeProvider>
  )
}

export default App