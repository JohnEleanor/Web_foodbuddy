
import { Toaster } from "@/components/ui/toaster"
// import { Toaster } from 'sonner'

export default function RegisterLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
         <Toaster />
        {children}
        </>
    )
  }