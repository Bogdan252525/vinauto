import { Banner, ProductsGroup, SidebarMain } from '@/components/shared';
import { Container } from '../components/shared';

export default function Home() {
	
  return (
    <Container className='px-0'>
      <SidebarMain >
      	<Banner />
				<ProductsGroup />
			</SidebarMain>
    </Container>
  );
}
