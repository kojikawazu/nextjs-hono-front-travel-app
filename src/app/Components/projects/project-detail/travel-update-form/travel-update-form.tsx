import React, { useEffect } from 'react';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import Modal from 'react-modal';
import { UseFormReturn } from 'react-hook-form';
import { travelUpdateSchema } from '@/app/schema/travel-schema';

import ProjectFormInput from '@/app/Components/projects/common/atoms/project-form-input';
import ProjectFormBtn from '@/app/Components/projects/common/atoms/project-form-btn';

interface TravelUpdateFormProps {
    formUpdate: UseFormReturn<z.infer<typeof travelUpdateSchema>>;
    onUpdateSubmit: (values: z.infer<typeof travelUpdateSchema>) => Promise<void>;
    travel: {
        name: string;
        description: string;
        amount: number;
        date: string;
        category: string;
        travelId: string;
    };
};

Modal.setAppElement('body');

/**
  * 旅行更新フォーム
  * @param formUpdate
  * @param onUpdateSubmit
  * @param travel
  * @returns JSX
  */
const TravelUpdateForm = ({
    formUpdate,
    onUpdateSubmit,
    travel,
}: TravelUpdateFormProps) => {

    useEffect(() => {
        formUpdate.reset(travel);
    }, []);

    return (
        <div>
            <Form {...formUpdate}>
                <form onSubmit={formUpdate.handleSubmit(onUpdateSubmit)}>
                    <ProjectFormInput
                        control={formUpdate.control}
                        name="name"
                        label="遠征名"
                        placeholder="遠征名を入力"
                        className="mb-4"
                    />

                    <ProjectFormInput
                        control={formUpdate.control}
                        name="description"
                        label="説明"
                        placeholder="説明を入力"
                        className="mb-4"
                    />

                    <ProjectFormInput
                        control={formUpdate.control}
                        name="amount"
                        label="金額"
                        placeholder="金額を入力"
                        className="mb-4"
                        type="number"
                    />

                    <ProjectFormInput
                        control={formUpdate.control}
                        name="date"
                        label="日付"
                        placeholder="日付を入力"
                        className="mb-4"
                    />

                    <ProjectFormInput
                        control={formUpdate.control}
                        name="category"
                        label="カテゴリー"
                        placeholder="カテゴリーを入力"
                        className="mb-4"
                    />

                    <ProjectFormBtn
                        label="遠征更新"
                        type="submit"
                        className=""
                    />
                </form>
            </Form>
        </div>
    );
}

export default TravelUpdateForm;