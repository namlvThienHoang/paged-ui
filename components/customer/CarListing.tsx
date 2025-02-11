import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const cars = [
  { id: 1, name: "Luxury Sedan", price: "1.500.000.000 VND", image: "/placeholder.svg" },
  { id: 2, name: "Sports Car", price: "2.000.000.000 VND", image: "/placeholder.svg" },
  { id: 3, name: "Electric SUV", price: "1.800.000.000 VND", image: "/placeholder.svg" },
]

export function CarListing() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Danh sách xe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>{car.name}</CardTitle>
                <p className="text-gray-600">{car.price}</p>
              </CardContent>
              <CardFooter className="p-4 flex justify-between">
                <Button variant="outline">Xem chi tiết</Button>
                <Button>Mua ngay</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

