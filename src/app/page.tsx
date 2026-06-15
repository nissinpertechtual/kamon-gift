import KamonBackground from '@/components/KamonBackground';
import HeroSection from '@/components/top/HeroSection';
import StorySection from '@/components/top/StorySection';
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
      <SceneSection />
      <ProductGallery />
      <ReassuranceSection />
      <FinalCTA />
    </div>
  );
}
