// تحديث src/views/homepage/Homepage.tsx لاستخدام الهيدر الجديد
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PageContainer from 'src/components/container/PageContainer';
import HomepageHeader from './components/HomepageHeader';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';

const Homepage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t('homepage.title')} description={t('homepage.description')}>
      <Box sx={{ minHeight: '100vh' }}>
        {/* Homepage Header */}
        <HomepageHeader />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* Final CTA Section */}
        <CTASection />
      </Box>
    </PageContainer>
  );
};

export default Homepage;
