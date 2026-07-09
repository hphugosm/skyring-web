import Hero from '@/components/Hero';
import FeatureScroll from '@/components/FeatureScroll';
import SpecsTable from '@/components/SpecsTable';
import Gallery from '@/components/Gallery';
import VideoSection from '@/components/VideoSection';
import Reviews from '@/components/Reviews';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureScroll />
      <SpecsTable />
      <Gallery />
      <VideoSection />
      <Reviews />
      <FinalCTA />
    </main>
  );
}
