import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import { ModalRegister } from './modal-register';
import { DropdownHeader } from './dropdown-header';
import { SearchInput } from './search-input';
import { SearchResultsOverlay } from './search-results-overlay';
import { HeaderLogo } from './header-logo';
import { CartButton } from './cart-button';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border-b bg-primary', className)}>
      <Container className="flex items-center justify-between py-1">
        <HeaderLogo className="mr-3" />
        <SearchInput />
        <SearchResultsOverlay />
        <div className="flex items-center">
          <ModalRegister />
          <DropdownHeader />

					<CartButton/>
        </div>
      </Container>
    </header>
  );
};
