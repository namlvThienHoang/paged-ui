import { HeroSection } from "@/components/customer/HeroSection"
import { SearchFilters } from "@/components/customer/SearchFilters"
import { CarListing } from "@/components/customer/CarListing"
import { Testimonials } from "@/components/customer/Testimonials"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SearchFilters />
      <CarListing />
      <Testimonials />
    </div>
  )
}

