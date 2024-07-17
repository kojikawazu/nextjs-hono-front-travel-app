'use client';

import React from 'react';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import { useProjectForm } from '@/app/hooks/useProjectForm';
import { projectCreateSchema } from "@/app/Components/schema/project-create-schema";
import ProjectCreateInput from '@/app/Components/projects/project-create/atoms/project-create-input';
import ProjectCreateButton from '@/app/Components/projects/project-create/atoms/project-create-button';
import { UseFormReturn } from 'react-hook-form';

interface ProjectCreateFormProps {
    form: UseFormReturn<{
        name: string;
        description: string;
    }, any, undefined>,
    onCreateSubmit: (values: z.infer<typeof projectCreateSchema>) => Promise<void>,
};

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
                    <ProjectCreateInput
                        control={form.control}
                        name="name"
                        label="プロジェクト名"
                        placeholder="プロジェクト名を入力"
                    />

                    <ProjectCreateInput
                        control={form.control}
                        name="description"
                        label="説明"
                        placeholder="説明を入力"
                    />

                    <ProjectCreateButton 
                        label="プロジェクト作成"
                        type="submit"
                    />
                </form>
            </Form>
        </div>
    );
}

export default ProjectCreateForm;