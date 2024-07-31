import * as z from 'zod';

/**
 * 日付形式をチェックするカスタムバリデーション
 */
const dateValidation = z.string().refine((date) => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate) && /^\d{4}-\d{2}-\d{2}$/.test(date);
}, {
    message: '有効な日付を入力してください（形式: YYYY-MM-DD）。'
});

/**
 * 旅行作成のバリデーションスキーマ
 */
export const travelCreateSchema = z.object({
    name: z.string().min(1, '遠征名を入力してください。'),
    description: z.string().min(1, '遠征の概要を入力してください。'),
    amount: z.number().min(1, '金額を入力してください。'),
    date: dateValidation,
    category: z.string().min(1, 'カテゴリーを入力してください。'),
});