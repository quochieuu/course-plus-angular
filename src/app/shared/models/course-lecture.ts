export class CourseLecture {
    id!: string;
    sectionId!: string;
    name!: string;
    slug!: string;
    content!: string;
    duration!: string;
    urlPreview!: string;
    urlYoutubePreview!: string;
    urlVideo!: string;
    urlYoutubeVideo!: string;
    lectureType!: number;
    sortOrder!: number;
    viewCount!: number;
    isActive?: boolean;
}