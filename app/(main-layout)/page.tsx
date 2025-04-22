import { Banner, FeaturedProducts } from '@/shared/components/shared';

export default function Home() {
	
  return (
    <>
      <Banner />
      <FeaturedProducts
        className='flex flex-wrap gap-4 mx-4 my-6'
      />	
    </>
  );
}
