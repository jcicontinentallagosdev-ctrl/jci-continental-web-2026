import { Hero } from '@/container/Home/Hero';
import { TechnologySection } from '@/container/Home/TechnologySection';
import { SectorsSection } from '@/container/Home/SectorsSection';
import { AreasOfOpportunities } from '@/container/Home/AreasOfOpportunities';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <TechnologySection />
      <SectorsSection />
      <AreasOfOpportunities />
    </main>
  );
}
