import { Container, Footer, Header } from '@/shared/components/shared';
import SidebarServer from '@/shared/components/server-components/SidebarServer';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Container className='flex-1'>
        <SidebarServer>
          <main className="min-h-screen" role="main">
            {children ?? <p>Вміст відсутній</p>}
          </main>
        </SidebarServer>
      </Container>
      <Footer />
    </div>
  );
}
