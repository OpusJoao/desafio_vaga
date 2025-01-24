"use client"
import { Provider } from "@/components/ui/provider"
import { Toaster } from "../components/ui/toaster"
export default function RootLayout(props: { children: React.ReactNode,  }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
            {children}
            <Toaster />
        </Provider>
      </body>
    </html>
  )
}