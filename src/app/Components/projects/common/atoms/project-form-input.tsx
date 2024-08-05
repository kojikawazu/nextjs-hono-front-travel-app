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

interface ProjectFormInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    className: string;
    type?: string;
}

/**
 * プロジェクトフォームのinput
 * @param control
 * @param name
 * @param label
 * @param placeholder
 * @param className
 * @param type
 * @returns JSX
 */
function ProjectFormInput<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    className,
    type = 'text',
}: ProjectFormInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            type={type}
                            value={
                                type === 'number'
                                    ? field.value || ''
                                    : field.value
                            }
                            onChange={(e) => {
                                const value =
                                    type === 'number'
                                        ? parseFloat(e.target.value)
                                        : e.target.value;
                                field.onChange(value);
                            }}
                        />
                    </FormControl>
                    {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
            )}
        />
    );
}

export default ProjectFormInput;
