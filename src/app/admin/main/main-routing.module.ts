import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'course-category', loadChildren: () => import('./course-category/course-category.module').then(m => m.CourseCategoryModule) },
  { path: 'course-faq', loadChildren: () => import('./course-faq/course-faq.module').then(m => m.CourseFaqModule) },
  { path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule) },
  { path: 'course-attachment', loadChildren: () => import('./course-attachment/course-attachment.module').then(m => m.CourseAttachmentModule) },
  { path: 'course-section', loadChildren: () => import('./course-section/course-section.module').then(m => m.CourseSectionModule) },
  { path: 'course-lecture', loadChildren: () => import('./course-lecture/course-lecture.module').then(m => m.CourseLectureModule) },
  { path: 'blog-category', loadChildren: () => import('./blog-category/blog-category.module').then(m => m.BlogCategoryModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  { path: 'book-category', loadChildren: () => import('./book-category/book-category.module').then(m => m.BookCategoryModule) },
  { path: 'quiz', loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule) },
  { path: 'systems', loadChildren: () => import('./systems/systems.module').then(m => m.SystemsModule) },
  { path: 'chat-bot', loadChildren: () => import('./chat-bot/chat-bot.module').then(m => m.ChatBotModule) },
  { path: 'forum-category', loadChildren: () => import('./forum-category/forum-category.module').then(m => m.ForumCategoryModule) },
  { path: 'forum', loadChildren: () => import('./forum/forum.module').then(m => m.ForumModule) },
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
