import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.scss'],
})
export class QuizStartComponent {
  constructor(private quizService: QuizService) {
    quizService.getQuizzes();
    quizService.quizTypeCountInit();
  }
}
