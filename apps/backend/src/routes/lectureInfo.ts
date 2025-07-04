import { Hono } from "hono";
import type { Env } from '~/types/Env';
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import { courseTable } from "~/schemas/courseTable";
import { lectureTable } from "~/schemas/lectureTable";
import { db } from "~/utils/db";
import { eq, and } from "drizzle-orm";

const app = new Hono<Env>()

    .post(
        '/', 
        zValidator('json', z.object({inputLectureId: z.number()})), 
        async (c) => {
            const data = c.req.valid('json');
            const res = await db
            .select({
                courseTitle: courseTable.title,
                lectureTitle: lectureTable.title,
                lectureId: lectureTable.lectureId,
                url: lectureTable.videoUrl,
                memo: lectureTable.memo,
            })
            .from(lectureTable)
            .innerJoin(courseTable, eq(courseTable.courseId, lectureTable.courseId))
            .where(eq(lectureTable.lectureId, data.inputLectureId))
            return c.json(res);
        } 
    );

export default app;
