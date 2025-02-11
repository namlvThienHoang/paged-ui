import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function SearchFilters() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Tìm kiếm xe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select>
            <option value="">Chọn hãng xe</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="ford">Ford</option>
          </Select>
          <Select>
            <option value="">Chọn mẫu xe</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
          </Select>
          <Input type="number" placeholder="Giá từ" />
          <Input type="number" placeholder="Giá đến" />
        </div>
        <Button className="mt-4">Tìm kiếm</Button>
      </div>
    </section>
  )
}

