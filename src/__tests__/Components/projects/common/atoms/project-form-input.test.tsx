/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import {
    useForm,
    FormProvider,
    Control,
    FieldValues,
    Path,
} from 'react-hook-form';
import ProjectFormInput from '@/app/Components/projects/common/atoms/project-form-input';

describe('ProjectFormInput', () => {
    afterEach(() => {
        cleanup();
    });

    const renderWithFormProvider = (component: React.ReactElement) => {
        const Wrapper = ({ children }: { children: React.ReactNode }) => {
            const methods = useForm();
            return <FormProvider {...methods}>{children}</FormProvider>;
        };
        return render(<Wrapper>{component}</Wrapper>);
    };

    const TestComponent = <T extends FieldValues>({
        name,
        label,
        placeholder,
        className,
        type,
    }: {
        name: Path<T>;
        label: string;
        placeholder: string;
        className: string;
        type?: string;
    }) => {
        const { control } = useForm();
        return (
            <ProjectFormInput
                control={control as Control<T>}
                name={name}
                label={label}
                placeholder={placeholder}
                className={className}
                type={type}
            />
        );
    };

    test('renders the input field with label and placeholder and className', () => {
        renderWithFormProvider(
            <TestComponent
                name="projectName"
                label="Project Name"
                placeholder="Enter project name"
                className="mb-4"
            />
        );

        const inputElement = screen.getByPlaceholderText('Enter project name');
        expect(inputElement).not.toBeNull();

        const labelElement = screen.getByText('Project Name');
        expect(labelElement).not.toBeNull();

        const formItemElement = document.querySelector('.mb-4');
        expect(formItemElement).not.toBeNull();
    });

    test('renders without crashing', () => {
        renderWithFormProvider(
            <TestComponent
                name="projectName"
                label="Project Name"
                placeholder="Enter project name"
                className="mb-4"
            />
        );
    });

    test('renders number input when type is set to number', () => {
        renderWithFormProvider(
            <TestComponent
                name="amount"
                label="Amount"
                placeholder="Enter amount"
                className="mb-4"
                type="number"
            />
        );

        const inputElement = screen.getByPlaceholderText('Enter amount');
        expect(inputElement).not.toBeNull();
        expect(inputElement.getAttribute('type')).toBe('number');
    });

    test('displays error message when validation fails', async () => {
        const TestComponentWithError = () => {
            const { control, setError } = useForm();
            useEffect(() => {
                setError('projectName', {
                    type: 'manual',
                    message: 'This is an error message',
                });
            }, [setError]);

            return (
                <ProjectFormInput
                    control={control}
                    name="projectName"
                    label="Project Name"
                    placeholder="Enter project name"
                    className="mb-4"
                />
            );
        };

        renderWithFormProvider(<TestComponentWithError />);

        await waitFor(() => {
            const errorMessage = screen.getByText('This is an error message');
            expect(errorMessage).not.toBeNull();
        });
    });

    test('uses text as the default input type', () => {
        renderWithFormProvider(
            <TestComponent
                name="projectName"
                label="Project Name"
                placeholder="Enter unique project name"
                className="mb-4"
            />
        );

        const inputElements = screen.queryAllByPlaceholderText(
            'Enter unique project name'
        );
        const inputElement = inputElements[0];
        expect(inputElement).not.toBeNull();
        expect(inputElement.getAttribute('type')).toBe('text');
    });
});
