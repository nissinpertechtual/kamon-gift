import KamonBackground from '@/components/KamonBackground';
import HeroSection from '@/components/top/HeroSection';
import StorySection from '@/components/top/StorySection';
import { CinematicBand } from '@/components/top/CinematicBand';
import { ProductShowcase } from '@/components/top/ProductShowcase';
import SceneSection from '@/components/top/SceneSection';
import ProductGallery from '@/components/top/ProductGallery';
import ReassuranceSection from '@/components/top/ReassuranceSection';
import FinalCTA from '@/components/top/FinalCTA';

export default function HomePage() {
  return (
    <div style={{ position: 'relative', background: '#0b0c0e' }}>
      <KamonBackground />
      <HeroSection />
      <StorySection />
      <CinematicBand
        eyebrow="Femtosecond Laser"
        caption={'光で、家紋を刻む。'}
        sub="フェムト秒レーザーが、家紋の繊細な線を、そのままの精度で刻みます。"
      />
      <ProductShowcase />
      <SceneSection />
      <ProductGallery />
      <ReassuranceSection />
      <FinalCTA />
    </div>
  );
}
