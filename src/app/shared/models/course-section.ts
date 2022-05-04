import { CourseLecture } from 'src/app/shared/models/course-lecture';
export class CourseSection {
    id!: string;
    courseId!: string;
    name!: string;
    description!: string;
    sortOrder!: number;
    isActive?: boolean;
    courseLectures!: [CourseLecture];
}
