import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAuthGuard } from 'src/app/shared/guard/client-auth.guard';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule)  },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)  },
  { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule)  },
  { path: 'chat', canActivate: [ClientAuthGuard], loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)  },
  { path: 'profile', canActivate: [ClientAuthGuard], loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)  },
  { path: 'order', canActivate: [ClientAuthGuard], loadChildren: () => import('./order/order.module').then(m => m.OrderModule)  },
  { path: 'meeting', canActivate: [ClientAuthGuard], loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingModule)  },
  { path: 'payment', canActivate: [ClientAuthGuard], loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)  },
  { path: 'quiz', canActivate: [ClientAuthGuard], loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)  },
  { path: 'chat-bot',  canActivate: [ClientAuthGuard], loadChildren: () => import('./chat-bot/chat-bot.module').then(m => m.ChatBotModule)  },
  { path: 'forum', loadChildren: () => import('./forum/forum.module').then(m => m.ForumModule)  },
  { path: 'error', loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)  },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
