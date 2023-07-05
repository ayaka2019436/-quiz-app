import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './pages/top/top.component';
import { QuizStartComponent } from './pages/quiz-start/quiz-start.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizResultComponent } from './pages/quiz-result/quiz-result.component';

const routes: Routes = [
  { path: 'top', component: TopComponent },
  { path: 'quiz-start', component: QuizStartComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz-result', component: QuizResultComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
