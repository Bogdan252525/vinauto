import { Banner, FeaturedProducts, SidebarMain } from '@/shared/components/shared';
import { Container } from '../shared/components/shared';

export default function Home() {
	
  return (
    <Container className='px-0'>
      <SidebarMain >
      	<Banner />
				<FeaturedProducts
					className='flex flex-wrap gap-4 mx-4 my-6'
				/>
			</SidebarMain>
    </Container>
  );
}
