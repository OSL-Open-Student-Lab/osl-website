import { Container } from 'react-bootstrap'
import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import 'react-multi-carousel/lib/styles.css';
import { IconButton } from 'components/public/Buttons';
import MainSection from 'components/BaseLayout/MainSection';
import FacilitiesSection from 'components/BaseLayout/FacilitiesSection';
import OurProjects from 'components/BaseLayout/OurProjects';

export default function HomePage() {
  return (
    <BasicLayout>
      <MainSection />
      <FacilitiesSection />
      <OurProjects />
    </BasicLayout>
  )
}
