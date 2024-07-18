import React from 'react';
import { Button } from '@/components/ui/button';

interface ProjectCreateButtonProps {
    label: string;
    type: 'submit' | 'button';
};

/**
 * プロジェクト生成ボタン
 * @param label
 * @param type
 * @returns JSX
 */
const ProjectCreateButton = ({
    label,
    type,
}: ProjectCreateButtonProps) => {
    return (
        <Button
            type={type}
        >
            {label}
        </Button>
    )
}

export default ProjectCreateButton;