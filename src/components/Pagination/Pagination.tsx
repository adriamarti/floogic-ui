import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Pagination.stylex';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { IconButton } from '../IconButton';
import { mergeStyles } from '../../utils/mergeStyles';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** The current active page (1-indexed) */
  currentPage: number;
  /** The total number of pages */
  totalPages: number;
  /** Callback when a page is selected */
  onPageChange: (page: number) => void;
  /** The number of siblings to show on each side of the active page */
  siblingCount?: number;
  stylex?: stylex.StyleXStyles;
}

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

// Mathematical logic to generate the range of numbers and ellipsis
function usePagination({ currentPage, totalPages, siblingCount = 1 }: { currentPage: number, totalPages: number, siblingCount?: number }) {
  const paginationRange = React.useMemo(() => {
    // Total numbers to show is: siblingCount + firstPage + lastPage + currentPage + 2*ellipsis = siblingCount + 5
    const totalPageNumbers = siblingCount + 5;

    // If total pages is less than the page numbers we want to show, return the range [1..totalPages]
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate left and right sibling indices
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // We don't show ellipsis if there is only one page number to hide
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 1: No left dots, but right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    // Case 2: Left dots, but no right dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);
      return [firstPageIndex, '...', ...rightRange];
    }

    // Case 3: Both left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
    
    return [];
  }, [currentPage, totalPages, siblingCount]);

  return paginationRange;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, siblingCount = 1, stylex: stylexProp, className, style, 'aria-label': ariaLabel = "pagination", ...props }, ref) => {
    const isMobile = useMediaQuery('(max-width: 767px)');
    const paginationRange = usePagination({ currentPage, totalPages, siblingCount });

    const handlePrevious = () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    // Mobile View
    if (isMobile) {
      return (
        <nav 
          ref={ref} 
          aria-label={ariaLabel}
          {...props}
          {...mergeStyles(stylex.props(styles.container, stylexProp), className, style)}
        >
          <div {...stylex.props(styles.mobileContainer)}>
            <IconButton 
              type="button"
              variant="tertiary" 
              tone="neutral" 
              onClick={handlePrevious} 
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ArrowLeftIcon />
            </IconButton>
            
            <span {...stylex.props(styles.mobileText)}>
              {currentPage} of {totalPages}
            </span>
            
            <IconButton 
              type="button"
              variant="tertiary" 
              tone="neutral" 
              onClick={handleNext} 
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ArrowRightIcon />
            </IconButton>
          </div>
        </nav>
      );
    }

    // Desktop View
    return (
      <nav 
        ref={ref} 
        aria-label={ariaLabel}
        {...props}
        {...mergeStyles(stylex.props(styles.container, stylexProp), className, style)}
      >
        <div {...stylex.props(styles.desktopContainer)}>
          <button 
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            {...stylex.props(styles.navButton)}
          >
            <ArrowLeftIcon />
            Previous
          </button>

          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === '...') {
              return (
                <div key={`ellipsis-${index}`} {...stylex.props(styles.ellipsis)}>
                  &#8230;
                </div>
              );
            }

            const isCurrent = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => onPageChange(pageNumber as number)}
                aria-current={isCurrent ? 'page' : undefined}
                {...stylex.props(styles.pageItem, isCurrent && styles.pageItemActive)}
              >
                {pageNumber}
              </button>
            );
          })}

          <button 
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            {...stylex.props(styles.navButton)}
          >
            Next
            <ArrowRightIcon />
          </button>
        </div>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
