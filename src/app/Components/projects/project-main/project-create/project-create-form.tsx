'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { projectCreateSchema } from '@/app/schema/project-create-schema';
import ProjectFormInput from '@/app/Components/projects/common/atoms/project-form-input';
import ProjectFormBtn from '@/app/Components/projects/common/atoms/project-form-btn';

interface ProjectCreateFormProps {
    form: UseFormReturn<
        {
            name: string;
            description: string;
        },
        any,
        undefined
    >;
    onCreateSubmit: (
        values: z.infer<typeof projectCreateSchema>
    ) => Promise<void>;
}

/**
 * プロジェクト生成フォーム
 * @param form
 * @param onCreateSubmit
 * @returns JSX
 */
const ProjectCreateForm = ({
    form,
    onCreateSubmit,
}: ProjectCreateFormProps) => {
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onCreateSubmit)}>
                    <ProjectFormInput
                        control={form.control}
                        name="name"
                        label="プロジェクト名"
                        placeholder="プロジェクト名を入力"
                        className="mb-4"
                    />

                    <ProjectFormInput
                        control={form.control}
                        name="description"
                        label="説明"
                        placeholder="説明を入力"
                        className="mb-4"
                    />

                    <ProjectFormBtn
                        label="プロジェクト作成"
                        type="submit"
                        className=""
                    />
                </form>
            </Form>
        </div>
    );
};

export default ProjectCreateForm;
