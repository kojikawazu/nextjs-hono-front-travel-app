import * as z from 'zod';

/**
 * プロジェクト作成のバリデーションスキーマ
 */
export const projectCreateSchema = z.object({
    name: z.string().min(1, 'プロジェクト名を入力してください。'),
    description: z.string().min(1, 'プロジェクトの説明分を入力してください。'),
});

/**
 * プロジェクト更新のバリデーションスキーマ
 */
export const projectUpdateSchema = z.object({
    projectId: z.string().min(1, 'IDを入力してください。'),
    name: z.string().min(1, 'プロジェクト名を入力してください。'),
    description: z.string().min(1, 'プロジェクトの説明分を入力してください。'),
});
