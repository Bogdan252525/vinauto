"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  className,
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    router.push(`?page=${page}`);
  };

  const generatePageNumbers = () => {
    const pages: number[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, currentPage - 1, currentPage, currentPage + 1, totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>

          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Go to previous page"
              />
            </PaginationItem>
          )}

          {generatePageNumbers().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={page === currentPage}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage < totalPages - 2 && (
            <PaginationEllipsis aria-hidden="true" />
          )}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Go to next page"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
