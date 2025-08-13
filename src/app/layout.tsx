import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import Navigation from "./components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Salary Management System",
    description: " Talents2germany Salary Management System",    
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} bg-gray-50 min-h-screen`}
            >
                <Navigation />
                <main className="py-8 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: "#363636",
                            color: "#fff"
                        }
                    }}
                />
            </body>
        </html>
    )
}
