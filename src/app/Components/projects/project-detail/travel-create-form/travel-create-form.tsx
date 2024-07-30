import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { travelCreateSchema } from '@/app/schema/travel-create-schema';
import ProjectFormInput from '@/app/Components/projects/common/atoms/project-form-input';
import ProjectFormBtn from '@/app/Components/projects/common/atoms/project-form-btn';

interface MoneyCreateFormProps {
  form: UseFormReturn<z.infer<typeof travelCreateSchema>>;
  onCreateSubmit: (values: z.infer<typeof travelCreateSchema>) => Promise<void>;
};

/**
 * 旅行作成フォーム
 * @param form
 * @param onCreateSubmit
 * @returns JSX
 */
const TravelCreateForm = ({
  form,
  onCreateSubmit,
}: MoneyCreateFormProps) => {
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCreateSubmit)}>
          <ProjectFormInput
            control={form.control}
            name="name"
            label="遠征名"
            placeholder="遠征名を入力"
            className="mb-4"
          />

          <ProjectFormInput
            control={form.control}
            name="description"
            label="説明"
            placeholder="説明を入力"
            className="mb-4"
          />

          <ProjectFormInput
            control={form.control}
            name="amount"
            label="金額"
            placeholder="金額を入力"
            className="mb-4"
            type="number"
          />

          <ProjectFormInput
            control={form.control}
            name="date"
            label="日付"
            placeholder="日付を入力"
            className="mb-4"
          />

          <ProjectFormInput
            control={form.control}
            name="category"
            label="カテゴリー"
            placeholder="カテゴリーを入力"
            className="mb-4"
          />

          <ProjectFormBtn
            label="遠征作成"
            type="submit"
            className=""
          />
        </form>
      </Form>
    </div>
  )
}

export default TravelCreateForm;