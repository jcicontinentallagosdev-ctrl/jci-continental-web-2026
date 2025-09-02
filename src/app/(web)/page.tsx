import { Hero } from '@/container/Home/Hero';
import { TechnologySection } from '@/container/Home/TechnologySection';
import { SectorsSection } from '@/container/Home/SectorsSection';
import { AreasOfOpportunities } from '@/container/Home/AreasOfOpportunities';
import { PresidentialTheme } from '@/container/Home/PresidentialTheme';
import { BorderlessDesign } from '@/container/Home/BorderlessDesign';
import { LifeSkillSeries } from '@/container/Home/LifeSkillSeries';
import { JoinJCI } from '@/container/Home/JoinJCI';
import { JCIActivities } from '@/container/Home/JCIActivities';
import { WordsThatDescribeUs } from '@/container/Home/WordsThatDescribeUs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <TechnologySection />
      <SectorsSection />
      <AreasOfOpportunities />
      <PresidentialTheme />
      <BorderlessDesign />
      <LifeSkillSeries />
      <JoinJCI />
      <JCIActivities />
      <WordsThatDescribeUs />
    </main>
  );
}
