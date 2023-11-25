// pages/index.js
import Link from 'next/link';

const IndexPage = () => (
  <div>
    <h1>Wizard</h1>
    <Link href="/ScreensPage">
      Start Wizard
    </Link>
  </div>
);

export default IndexPage;
