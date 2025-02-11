import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[600px] bg-gray-900 text-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start">
        <h1 className="text-5xl font-bold mb-4">Khám phá đẳng cấp xe hơi</h1>
        <p className="text-xl mb-8">Trải nghiệm lái xe tuyệt vời với bộ sưu tập xe sang trọng của chúng tôi</p>
        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
          Khám phá ngay
        </Button>
      </div>
    </section>
  )
}

