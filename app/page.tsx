import { Banner, SidebarMain } from '@/components/shared';
import { Container } from '../components/shared';

export default function Home() {
  const menuItems = [
    { title: 'Акція', url: '#' },
    { title: 'Автоелектроніка', url: '#' },
    { title: 'Універсальні аксесуари', url: '#' },
    { title: 'Вітровки та мухобойки', url: '#' },
    { title: 'Атосвітло', url: '#' },
    { title: 'Автохімія та автокосметика', url: '#' },
    { title: 'Лакофарбова продукція', url: '#' },
    { title: 'Ковпаки колісні', url: '#' },
    { title: 'Бризговики модельні', url: '#' },
  ];
	
  return (
    <Container className='px-0'>
      <SidebarMain items={menuItems}>
      	<Banner />
			</SidebarMain>
    </Container>
  );
}
