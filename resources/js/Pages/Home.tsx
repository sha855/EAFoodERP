import Banner from '@/Components/Banner/Index';
import CounterArea from '@/Components/CounterArea/Index';
import CustomerSupport from '@/Components/CustomerSupport/Index';
import DashboardTracking from '@/Components/DashboardTracking/Index';
import Feature from '@/Components/Feature/Index';
import Footer from '@/Components/footer';
import Header from '@/Components/Header/Header';
import Integrations from '@/Components/integrations';
import Newsfeed from '@/Components/NewsFeeds/Newsfeed';
import Pricing from '@/Components/Pricing/Index';
import Testimonial from '@/Components/Testimonial/Index';
import 'flowbite';
import ComplianceSoftware from '@/Components/ComplianceSoftware/Index';
import FoodSafety from '@/Components/ComplianceSoftware/FoodSafety/Index';
export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Feature />
      <ComplianceSoftware />
      <FoodSafety />
      <DashboardTracking />
      <CounterArea />
      <Testimonial />
      <Pricing />
      <CustomerSupport />
      <Newsfeed />
      <Integrations />
      <Footer />
    </>
  );
}
