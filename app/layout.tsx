import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuthProvider } from "@/lib/auth"
import { NavigationEvents } from "@/components/navigation-events"
import RouteLoadingIndicator from "@/components/route-loading-indicator"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "HealthApp",
  description: "A healthcare web application",
  generator: "minhhuy",
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/icons/icon.png", type: "image/png", sizes: "32x32" }
    ],
    apple: [{ url: "/icons/apple-icon.png", sizes: "180x180" }]
  },
  manifest: "/manifest.json"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Suspense>
            <RouteLoadingIndicator />
            <NavigationEvents />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
