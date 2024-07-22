import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from "bun:test";
import { useForm, FormProvider, Control, FieldValues, Path } from 'react-hook-form';
import ProjectCreateInput from '@/app/Components/projects/project-main/project-create/atoms/project-create-input';

describe('ProjectCreateInput', () => {
    const renderWithFormProvider = (component: React.ReactElement) => {
        const Wrapper = ({ children }: { children: React.ReactNode }) => {
            const methods = useForm();
            return <FormProvider {...methods}>{children}</FormProvider>;
        };
        return render(<Wrapper>{component}</Wrapper>);
    };

    const TestComponent = <T extends FieldValues>({ name, label, placeholder }: { name: Path<T>; label: string; placeholder: string; }) => {
        const { control } = useForm();
        return <ProjectCreateInput control={control as Control<T>} name={name} label={label} placeholder={placeholder} />;
    };

    test('renders the input field with label and placeholder', () => {
        renderWithFormProvider(
            <TestComponent name="projectName" label="Project Name" placeholder="Enter project name" />
        );

        const inputElement = screen.getByPlaceholderText('Enter project name');
        expect(inputElement).not.toBeNull();

        const labelElement = screen.getByText('Project Name');
        expect(labelElement).not.toBeNull();
    });

    test('renders without crashing', () => {
        renderWithFormProvider(
            <TestComponent name="projectName" label="Project Name" placeholder="Enter project name" />
        );
    });
});
