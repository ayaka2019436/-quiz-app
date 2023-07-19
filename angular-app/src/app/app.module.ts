import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './pages/top/top.component';
import { ButtonComponent } from './components/button/button.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { QuizStartComponent } from './pages/quiz-start/quiz-start.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { SubButtonComponent } from './components/sub-button/sub-button.component';
import { QuizResultComponent } from './pages/quiz-result/quiz-result.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    ButtonComponent,
    ToolbarComponent,
    QuizStartComponent,
    QuizComponent,
    SubButtonComponent,
    QuizResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
