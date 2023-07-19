import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  questionsCount: number = 1;
  // 出題するクイズのデータが入る
  quiz: any;

  // 選択肢が選択されたかどうか
  selectedAnswer = false;

  // 選択した選択肢が正解かどうか
  isCorrect = false;

  constructor(private apiSvc: ApiService) {
    const query: any = { populate: ['choices'] };
    this.apiSvc.getQuizzes(query).subscribe((quizzes) => {
      this.quiz = quizzes.data[this.questionsCount - 1].attributes;
    });
  }

  public clickAnswer(choice: any) {
    // ボタンがクリックされた時の処理を実装
    //boolean型に選択済みであればtrueを代入し、disabledで選択を無効化する
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
