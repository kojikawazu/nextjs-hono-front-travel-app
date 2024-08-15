import React from 'react';
import * as z from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { Form } from '@/components/ui/form';

import { projectUpdateSchema } from '@/app/schema/project-schema';
import ProjectFormInput from '@/app/Components/projects/common/atoms/project-form-input';
import ProjectFormBtn from '@/app/Components/projects/common/atoms/project-form-btn';

interface ProjectUpdateFormProps {
    formUpdate: UseFormReturn<z.infer<typeof projectUpdateSchema>>;
    onUpdateSubmit: (
        values: z.infer<typeof projectUpdateSchema>
    ) => Promise<void>;
}

/**
 * プロジェクト更新フォーム
 * @param formUpdate
 * @param onUpdateSubmit
 * @returns JSX
 */
const ProjectUpdateForm = ({
    formUpdate,
    onUpdateSubmit,
}: ProjectUpdateFormProps) => {
    return (
        <div>
            <Form {...formUpdate}>
                <form onSubmit={formUpdate.handleSubmit(onUpdateSubmit)}>
                    <ProjectFormInput
                        control={formUpdate.control}
                        name="name"
                        label="プロジェクト名"
                        placeholder="プロジェクト名を入力"
                        className="mb-4"
                    />

                    <ProjectFormInput
                        control={formUpdate.control}
                        name="description"
                        label="説明"
                        placeholder="説明を入力"
                        className="mb-4"
                    />

                    <ProjectFormBtn
                        label="プロジェクト更新"
                        type="submit"
                        className=""
                    />
                </form>
            </Form>
        </div>
    );
};

export default ProjectUpdateForm;
