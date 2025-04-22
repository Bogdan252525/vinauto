'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { SidebarCategories } from './sidebar-categories';
import { SidebarTrigger } from './sidebar-trigger';
import { SidebarFilters } from './sidebar-filters';
import { Category } from '@prisma/client';

interface Props {
  className?: string;
  children?: React.ReactNode;
  categories: Category[];
}

export const SidebarMain: React.FC<Props> = ({
  className,
  children,
  categories,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [pageMinHeight, setPageMinHeight] = useState<string>('100vh');

  useEffect(() => {
    const updateHeight = () => {
      if (sidebarRef.current) {
        const sidebarHeight = sidebarRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        setPageMinHeight(`${Math.max(sidebarHeight, viewportHeight)}px`);
      }
    };

    updateHeight();
    const observer = new MutationObserver(() => {
      updateHeight();
    });

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current, {
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className={cn('relative mb-[1px]', className)}>
      <div
        ref={sidebarRef}
        className={`absolute top-0 transition-all duration-300 transform ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        } py-4 w-64 min-h-screen bg-accent text-foreground border-2 border-primary rounded-md rounded-tr-none`}
      >
        <h3 className="text-lg font-medium text-center mb-0 border-b border-primary pb-2">
          Категорії
        </h3>

        <SidebarCategories categories={categories} />
        <SidebarFilters />
      </div>
      
      <div>
        <div
          className={`transition-all duration-300 ${
            isOpen ? 'ml-64' : 'ml-0'
          } flex-1`}
        >
          <SidebarTrigger isOpen={isOpen} setIsOpen={setIsOpen} />
          <div style={{ minHeight: pageMinHeight }}>{children}</div>
        </div>
      </div>
    </div>
  );
};
