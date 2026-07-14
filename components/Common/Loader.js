import dynamic from 'next/dynamic';

const Loader = dynamic(
  () => import('./DynamicSpinnerInner'),
  { ssr: false }
);

export default Loader;
