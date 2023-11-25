// pages/Substitutions.js
import Link from 'next/link';
import SubstitutionsComponent from '../components/SubstitutionsComponent';

const Substitutions = () => (
  <div>
    <h2>Substitutions Page</h2>
    <SubstitutionsComponent />
    <Link href="/Final">
      <a>Next</a>
    </Link>
    <Link href="/ScreensPage">
      <a>Previous</a>
    </Link>
  </div>
);

export default Substitutions;

