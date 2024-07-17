import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { 
    FormControl, 
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

interface ProjectCreateInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
};

/**
 * プロジェクト生成フォームのinput
 * @param control
 * @param name
 * @param label
 * @param placeholder
 * @returns JSX
 */
function ProjectCreateInput<T extends FieldValues> ({
        control,
        name,
        label,
        placeholder,
}: ProjectCreateInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
            <FormItem
                className="mb-4"
            >
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
    );
}

export default ProjectCreateInput;