import KamonBackground from '@/components/KamonBackground';
import HeroSection from '@/components/top/HeroSection';
import StorySection from '@/components/top/StorySection';

export default function HomePage() {
  return (
    <div style={{ position: 'relative', background: '#0a0a0a' }}>
      <KamonBackground />
      <HeroSection />
      <StorySection />
    </div>
  );
}
