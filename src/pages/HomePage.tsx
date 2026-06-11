import { ContactSection } from '../features/home/sections/ContactSection'
import { HeroSection } from '../features/home/sections/HeroSection'
import { ProductPreviewSection } from '../features/home/sections/ProductPreviewSection'
import { ServicesSection } from '../features/home/sections/ServicesSection'
import { MarketingLayout } from '../layouts/marketing/MarketingLayout'

export default function HomePage() {
  return (
    <MarketingLayout>
      <HeroSection />
      <ServicesSection />
      <ProductPreviewSection />
      <ContactSection />
    </MarketingLayout>
  )
}
