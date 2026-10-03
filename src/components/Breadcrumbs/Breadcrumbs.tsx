import React, { forwardRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Breadcrumbs.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

// ==========================================
// Breadcrumbs.Item
// ==========================================

export interface BreadcrumbsItemProps extends React.ComponentPropsWithoutRef<'a'> {
  stylex?: stylex.StyleXStyles;
  as?: React.ElementType;
  isCurrent?: boolean;
}

const BreadcrumbsItem = forwardRef<HTMLElement, BreadcrumbsItemProps>(
  ({ as: Component = 'a', isCurrent, stylex: stylexProp, className, style, ...props }, ref) => {
    // If it's current, we might want to remove href if it's an anchor.
    const resolvedProps = isCurrent && Component === 'a' ? { ...props, href: undefined } : props;
    
    // When isCurrent is true, the default element should ideally be a span, 
    // or we can just render the provided Component but styled as current.
    const FinalComponent = isCurrent && Component === 'a' ? 'span' : Component;

    return (
      <FinalComponent
        ref={ref}
        aria-current={isCurrent ? 'page' : undefined}
        {...resolvedProps}
        {...mergeStyles(stylex.props(isCurrent ? styles.current : styles.link, stylexProp), className, style)}
      />
    );
  }
);
BreadcrumbsItem.displayName = 'Breadcrumbs.Item';

// ==========================================
// Breadcrumbs
// ==========================================

export interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<'nav'> {
  stylex?: stylex.StyleXStyles;
  itemsBeforeCollapse?: number;
  separator?: React.ReactNode;
}

const BreadcrumbsRoot = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ itemsBeforeCollapse = 3, separator = '/', stylex: stylexProp, className, style, children, 'aria-label': ariaLabel = 'Breadcrumb', ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Filter out falsy children
    const validChildren = React.Children.toArray(children).filter(Boolean);
    const totalItems = validChildren.length;

    const needsCollapse = totalItems > itemsBeforeCollapse && !isExpanded;

    const renderSeparator = (key: string) => (
      <li aria-hidden="true" {...stylex.props(styles.itemRoot, styles.separator)} key={key}>
        {separator}
      </li>
    );

    let itemsToRender: React.ReactNode[] = [];

    if (needsCollapse) {
      itemsToRender = [
        <li {...stylex.props(styles.itemRoot)} key="first">
          {validChildren[0]}
        </li>,
        renderSeparator('sep-first'),
        <li {...stylex.props(styles.itemRoot)} key="ellipsis">
          <button 
            type="button" 
            aria-label="Show path" 
            onClick={() => setIsExpanded(true)}
            {...stylex.props(styles.ellipsis)}
          >
            ...
          </button>
        </li>,
        renderSeparator('sep-ellipsis'),
        <li {...stylex.props(styles.itemRoot)} key="last">
          {/* Automatically inject isCurrent to the last item */}
          {React.isValidElement(validChildren[totalItems - 1]) 
            ? React.cloneElement(validChildren[totalItems - 1] as React.ReactElement<any>, { isCurrent: true }) 
            : validChildren[totalItems - 1]
          }
        </li>
      ];
    } else {
      validChildren.forEach((child, index) => {
        const isLast = index === totalItems - 1;
        
        const childProps = isLast && React.isValidElement(child) ? { isCurrent: true } : {};
        const clonedChild = React.isValidElement(child) ? React.cloneElement(child, childProps as any) : child;

        itemsToRender.push(
          <li {...stylex.props(styles.itemRoot)} key={`item-${index}`}>
            {clonedChild}
          </li>
        );

        if (!isLast) {
          itemsToRender.push(renderSeparator(`sep-${index}`));
        }
      });
    }

    return (
      <nav 
        ref={ref} 
        aria-label={ariaLabel}
        {...props}
        {...mergeStyles(stylex.props(styles.nav, stylexProp), className, style)}
      >
        <ol {...stylex.props(styles.list)}>
          {itemsToRender}
        </ol>
      </nav>
    );
  }
);
BreadcrumbsRoot.displayName = 'Breadcrumbs';

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Item: BreadcrumbsItem,
});
