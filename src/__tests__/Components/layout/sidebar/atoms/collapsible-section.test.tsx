/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChevronRight } from 'lucide-react';
import '@testing-library/jest-dom';

import CollapsibleSection from '@/app/Components/layout/sidebar/atoms/collapsible-section';

describe('CollapsibleSection', () => {
    it('should render the section label and icon', () => {
        render(
            <CollapsibleSection label="Test Label" icon={<ChevronRight />}>
                <div>Section Content</div>
            </CollapsibleSection>
        );

        // ラベルが表示されていることを確認
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        // 閉じた状態のアイコンが表示されていることを確認
        expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
    });

    it('should toggle content visibility when clicked', () => {
        render(
            <CollapsibleSection label="Test Label" icon={<ChevronRight />}>
                <div>Section Content</div>
            </CollapsibleSection>
        );

        // コンテンツが表示されることを確認
        expect(screen.getByText('Section Content')).toBeVisible();

        const sectionHeader = screen.getByText('Test Label').closest('div');
        const contentContainer =
            screen.getByText('Section Content').parentElement;

        // 初期状態では max-h-0 クラスが適用されていることを確認
        expect(contentContainer).toHaveClass('max-h-0');

        // ラベルをクリックしてセクションを開く
        fireEvent.click(sectionHeader!);

        // クリック後に max-h-96 クラスが適用されていることを確認
        expect(contentContainer).toHaveClass('max-h-96');

        // 再度クリックして閉じる
        fireEvent.click(sectionHeader!);

        // クリック後に max-h-0 クラスが再び適用されていることを確認
        expect(contentContainer).toHaveClass('max-h-0');
    });
});
