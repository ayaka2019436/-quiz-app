import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  questionsCount: number = 1;
  quiz: any;
  selectedAnswer = false;
  isCorrect = false;

  constructor(private apiSvc: ApiService, private quizService: QuizService) {}

  ngOnInit() {
    // クイズデータを取得する
    this.quizService.getQuizzes();
    // 最初の問題を表示するためにgetCurrentQuiz()を呼び出す
    this.quiz = this.quizService.getCurrentQuiz();
  }

  public clickAnswer(choice: any) {
    if (this.selectedAnswer) {
      console.log('既に選択済みの選択肢があります。');
      return;
    }

    console.log('選択肢が選択されました', choice);
    this.selectedAnswer = true;
    this.isCorrect = choice.is_correct;
  }

  public getCorrectAnswer(): string {
    const correctAnswer = this.quiz.choices.find(
      (choice: any) => choice.is_correct
    );
    return correctAnswer?.text;
  }
}
