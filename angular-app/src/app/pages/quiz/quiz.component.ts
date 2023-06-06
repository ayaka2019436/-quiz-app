import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  Questionscount: number = 1;
  quizQuestion: string = 'クイズの問題を表示させる';
  isOptionSelected: boolean[] = [false, false, false, false];
  //circle_cross:boolean=false;
  circle_cross: string[] = ['◯', '✖︎'];
  answer: string = 'クイズの回答';
  description: string = 'クイズの解説';

  handleOptionClick(optionIndex: number) {
    // ボタンがクリックされた時の処理を実装
    //boolean型に選択済みであればtrueを代入し、disabledで選択を無効化する
    if (this.isOptionSelected[optionIndex] == true) {
      console.log('選択肢', optionIndex + 1, 'は既に選択済みです。');
    } else {
      console.log('選択肢', optionIndex + 1, 'が選択されました');
      this.isOptionSelected[optionIndex] = true;
    }
  }
}
