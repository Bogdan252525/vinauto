import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import { Button } from '../ui';
import { ModalRegister } from './modal-register';
import { DropdownHeader } from './dropdown-header';
import { ShoppingCart } from 'lucide-react';
import { SearchInput } from './search-input';
import { SearchResultsOverlay } from './search-results-overlay';
import { HeaderLogo } from './header-logo';
interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {

  return (
    <header className={cn('border-b bg-primary', className)}>
      <Container className="flex items-center justify-between py-1">
				<HeaderLogo className='mr-3' />
				<SearchInput />
				<SearchResultsOverlay />
        <div className="flex items-center">
					<ModalRegister />
					<DropdownHeader />
					<Button
						variant="link"
						className="text-background text-lg py-0"
					>
						<div
							className="w-6 h-6 flex items-center [&_svg]:size-6"
						>
							<ShoppingCart />				
						</div>
						Кошик	
					</Button>
				</div>
      </Container>
    </header>
  );
};
