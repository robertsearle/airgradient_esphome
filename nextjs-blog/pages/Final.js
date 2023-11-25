// pages/Final.js
import Link from 'next/link';

const Final = () => (
  <div>
    <h2>Final Page</h2>
    <p>Congratulations! You've completed the wizard.</p>
    <Link href="/ScreensPage">
      <a>Start Over</a>
    </Link>
  </div>
);

export default Final;

