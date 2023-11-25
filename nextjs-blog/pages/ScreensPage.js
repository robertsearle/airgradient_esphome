// pages/ScreensPage.js
import Link from 'next/link';
import ScreensPageComponent from '../components/ScreensPageComponent';

const ScreensPage = () => (
  <div>
    <h2>Screens Page</h2>
    <ScreensPageComponent />
    <Link href="/Substitutions">
      Next
    </Link>
  </div>
);

export default ScreensPage;
