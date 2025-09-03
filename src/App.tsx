import { Route, Routes } from "react-router-dom"
import Live from "./pages/Live"
import { ModeToggle } from "./components/mode-toggle"
import { ThemeProvider } from "./components/theme-provider"
import Dashboard from "./pages/Dashboard"
import { Example } from "./pages/Example"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="queue-system-app">
      <div className="fixed top-4 right-4">
        <ModeToggle></ModeToggle>
      </div>

      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App