import LandingHeader from '../components/landing/LandingHeader'
import HeroSection from '../components/landing/HeroSection'
import StatsBar from '../components/landing/StatsBar'
import ReferenceEngineSection from '../components/landing/ReferenceEngineSection'
import ThesisSection from '../components/landing/ThesisSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import WorkflowSection from '../components/landing/WorkflowSection'
import IntegrationsSection from '../components/landing/IntegrationsSection'
import PrinciplesSection from '../components/landing/PrinciplesSection'
import FaqSection from '../components/landing/FaqSection'
import CtaSection from '../components/landing/CtaSection'
import LandingFooter from '../components/landing/LandingFooter'

export default function Home() {
  return (
    <div className="landing">
      <LandingHeader />
      <main>
        <HeroSection />
        <StatsBar />
        <ReferenceEngineSection />
        <ThesisSection />
        <FeaturesSection />
        <WorkflowSection />
        <IntegrationsSection />
        <PrinciplesSection />
        <FaqSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}
