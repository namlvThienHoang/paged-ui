import Image from "next/image"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CarDetail({ params }: { params: { id: string } }) {
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={`/placeholder.svg?height=400&width=600`}
                alt="Car"
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((img) => (
                <div key={img} className="bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=100&width=100`}
                    alt="Car thumbnail"
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">Car Model {params.id}</h1>
            <p className="text-2xl font-semibold text-gray-700 mb-6">$25,000</p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-gray-600">Brand:</span>
                <span className="font-semibold">Toyota</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Model:</span>
                <span className="font-semibold">Camry</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year:</span>
                <span className="font-semibold">2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Type:</span>
                <span className="font-semibold">Petrol</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mileage:</span>
                <span className="font-semibold">15,000 km</span>
              </div>
            </div>

            <Button size="lg" className="w-full mb-4">
              <Phone className="mr-2 h-4 w-4" /> Contact Seller
            </Button>

            <Button variant="outline" size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
            erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
            Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut
            dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci.
            Etiam at risus et justo dignissim congue.
          </p>
        </div>
      </div>
  )
}

