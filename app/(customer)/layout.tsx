import { Footer } from "@/components/customer/Footer"
import { Header } from "@/components/customer/Header"
import type React from "react" // Import React


export const metadata = {
  title: "AutoLux - Đẳng cấp xe hơi",
  description: "Khám phá và mua xe hơi sang trọng tại AutoLux",
}

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )

}

