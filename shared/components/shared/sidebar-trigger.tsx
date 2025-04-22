import { cn } from '@/shared/lib/utils';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  iconSize?: number;
}

export const SidebarTrigger: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  className,
  iconSize = 22,
}) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      onClick={toggleSidebar}
      className={cn("absolute bg-accent p-0.5 border-2 border-primary border-l-0 rounded-r-md", className)}
      aria-label={isOpen ? 'Закрити сайдбар' : 'Відкрити сайдбар'}
    >
      {isOpen ? (
        <PanelLeftClose
          className="text-primary transition-transform duration-200"
          size={iconSize}
        />
      ) : (
        <PanelLeftOpen
          className="text-primary transition-transform duration-200"
          size={iconSize}
        />
      )}
    </button>
  );
};
