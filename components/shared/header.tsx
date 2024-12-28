import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import { Container } from './container';
import { Button, Input } from '../ui';
import { ModalRegister } from './modal-register';
import { DropdownHeader } from './dropdown-header';
import { ShoppingCart } from 'lucide-react';
import { Dancing_Script } from 'next/font/google'

const dancingScript = Dancing_Script({
	weight: "700",
	subsets: ["latin"]
});

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border-b bg-primary shadow-lg', className)}>
      <Container className="flex items-center justify-between py-1">
        <div className="flex flex-col justify-center items-center cursor-pointer mr-3">
          <p className={`${dancingScript.className} uppercase text-background text-xl`}>vinauto</p>
          <Image
            src="/assets/img/logo.png"
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="w-[100px] h-auto"
          />
        </div>
        <Input
					className="focus-visible:bg-background max-w-80 w-full md:text-base placeholder:text-background"
					type="search"
					placeholder="Пошук"
				/>
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
