import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [
  { id: 1, name: "Nguyễn Văn A", content: "Tôi rất hài lòng với chiếc xe mới của mình. Dịch vụ tuyệt vời!" },
  { id: 2, name: "Trần Thị B", content: "Đội ngũ bán hàng rất chuyên nghiệp và tận tâm. Cảm ơn AutoLux!" },
  { id: 3, name: "Lê Văn C", content: "Giá cả hợp lý và chất lượng xe tuyệt vời. Tôi sẽ giới thiệu cho bạn bè." },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Khách hàng nói gì về chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

