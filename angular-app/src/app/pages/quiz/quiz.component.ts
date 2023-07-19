import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  questionsCount: number = 1;
  quizQuestion: string = '';
  //isOptionSelected: boolean[] = [false, false, false, false];
  circle_cross: string = '';
  answer_num: number = 0;
  answer: string = 'クイズの回答';
  description: string = 'クイズの解説';
  selectedOptionIndex: number = -1;
  quizChoice: string[] = [' ', ' ', ' ', ' '];

  constructor(private apiSvc: ApiService) {
    const query: any = { populate: ['choices'] };
    this.apiSvc.getQuizzes(query).subscribe((quizzes) => {
      // 確認用後で消しときます
      console.log(quizzes);
      this.quizQuestion =
        quizzes.data[this.questionsCount - 1].attributes.question;
      for (let index in this.quizChoice) {
        this.quizChoice[index] =
          quizzes.data[this.questionsCount - 1].attributes.choices[index].text;
        if (
          true ===
          quizzes.data[this.questionsCount - 1].attributes.choices[index]
            .is_correct
        ) {
          this.answer_num =
            quizzes.data[this.questionsCount - 1].attributes.choices[index].id;
        }
      }
    });
  }

  handleOptionClick(optionIndex: number) {
    // ボタンがクリックされた時の処理を実装
    //boolean型に選択済みであればtrueを代入し、disabledで選択を無効化する
    if (this.selectedOptionIndex != -1) {
      console.log('既に選択済みの選択肢があります。');
      return;
    } else {
      console.log('選択肢', optionIndex + 1, 'が選択されました');
      this.selectedOptionIndex = 1;
    }

    const query: any = { populate: ['choices'] };
    this.apiSvc.getQuizzes(query).subscribe((quizzes) => {
      this.description =
        quizzes.data[this.questionsCount - 1].attributes.explanation;
      this.answer =
        quizzes.data[this.questionsCount - 1].attributes.choices[
          this.answer_num - 1
        ].text;
      if (
        this.answer_num ===
        quizzes.data[this.questionsCount - 1].attributes.choices[optionIndex].id
      ) {
        this.circle_cross = '◯';
      } else {
        this.circle_cross = '✖︎';
      }
    });
  }
}
