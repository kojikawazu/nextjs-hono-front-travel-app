import React, { ReactNode, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleSectionProps {
    label: string;
    icon: ReactNode;
    children: ReactNode;
}

/**
 * セクションを開閉するコンポーネント
 * @param label
 * @param icon
 * @param children
 * @returns JSX
 */
const CollapsibleSection = ({
    label,
    icon,
    children,
}: CollapsibleSectionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <div
                className="flex items-center justify-between p-2 hover:bg-blue-400 cursor-pointer transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center space-x-2">
                    {icon}
                    <span className="font-semibold">{label}</span>
                </div>
                {isOpen ? (
                    <ChevronDown size={20} />
                ) : (
                    <ChevronRight size={20} />
                )}
            </div>
            <div
                className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                {children}
            </div>
        </div>
    );
};

export default CollapsibleSection;
