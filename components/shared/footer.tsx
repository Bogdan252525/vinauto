import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn('h-[68px] bg-primary', className)}>
      <Container>
        <div className="text-center py-5 text-white">

          &copy; 2025 vinauto | Розроблено vinauto
        </div>
      </Container>
    </footer>
  );
};