'use client';

import { cn } from '@/lib/utils';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
  items: { title: string; url: string }[];
  children: React.ReactNode;
}

export const SidebarMain: React.FC<Props> = ({
  className,
  items,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  return (
    <div className={cn('relative', className)}>
      <div
        className={`absolute top-0 transition-all duration-300 transform ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        } h-full w-64 bg-[#c9e9ff] text-black border-2 border-primary rounded-md`}
      >
				<h3
					className='text-lg font-medium text-center mt-4 mb-0 pb-0'
				>
					Категорії
				</h3>
        <ul className="p-4 pt-0">
          {items.map((item) => (
            <li
              key={item.title}
              className="py-2 border-b border-primary last:border-b-0"
            >
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div
          className={`transition-all duration-300 ${
            isOpen ? 'ml-64' : 'ml-0'
          } flex-1`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute"
          >
            {isOpen ? (
              <PanelLeftClose
                className="text-primary"
                size={28}
              />
            ) : (
              <PanelLeftOpen
                className="text-primary"
                size={28}
              />
            )}
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};
