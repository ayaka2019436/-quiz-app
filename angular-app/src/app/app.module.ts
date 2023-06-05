import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './pages/top/top.component';
import { ButtonComponent } from './components/button/button.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { QuizStartComponent } from './pages/quiz-start/quiz-start.component';
import { QuizComponent } from './pages/quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    ButtonComponent,
    ToolbarComponent,
    QuizStartComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
