import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Waitlist from "./pages/Waitlist";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}