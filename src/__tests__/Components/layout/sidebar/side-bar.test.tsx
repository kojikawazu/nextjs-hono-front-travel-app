import { render, screen, cleanup } from '@testing-library/react';
import { describe, test, expect, afterEach  } from 'bun:test';
import SideBar from '@/app/Components/layout/sidebar/side-bar';

describe('SideBar', () => {
    afterEach(() => {
      cleanup();
    });
  
    test('renders SideBar with correct items', () => {
      render(<SideBar />);
      
      expect(screen.getByText('Projects')).toBeTruthy();
      expect(screen.getByText('Menu Item 2')).toBeTruthy();
      expect(screen.getByText('Menu Item 3')).toBeTruthy();
    });
  
    test('has the correct styles applied', () => {
        const { container } = render(<SideBar />);
        
        const firstChild = container.firstChild as HTMLElement;
        expect(firstChild).toBeTruthy();
        if (firstChild) {
          expect(firstChild.className.includes('bg-blue-300')).toBe(true);
          expect(firstChild.className.includes('h-screen')).toBe(true);
        }
    });
});