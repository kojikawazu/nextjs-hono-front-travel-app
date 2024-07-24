import { Button } from '@/components/ui/button';

interface ProjectFormBtnProps {
    label: string;
    type: 'submit' | 'button';
    className: string;
};

/**
 * プロジェクト用のフォームボタン
 * @param label ボタンのラベル
 * @param type ボタンのタイプ
 * @param className ボタンのクラス名
 * @returns JSX
 */
const ProjectFormBtn = ({
    label,
    type,
    className,
}: ProjectFormBtnProps) => {
    return (
        <Button
            type={type}
            className={className}
        >
            {label}
        </Button>
    );
}

export default ProjectFormBtn;