import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import WorkflowSection from '@/components/landing/WorkflowSection';
import FeatureCards from '@/components/landing/FeatureCards';
import ImpactStrip from '@/components/landing/ImpactStrip';
import DemoAccountsCard from '@/components/landing/DemoAccountsCard';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <WorkflowSection />
      <FeatureCards />
      <ImpactStrip />
      <DemoAccountsCard />
    </div>
  );
}
