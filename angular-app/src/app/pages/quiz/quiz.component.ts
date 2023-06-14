import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  Questionscount: number = 1;
  quizQuestion: string =
    '猫精神医学によると猫を飼っている人は〇〇による死亡リスクが低減する。○に入るものはどれか？';
  //isOptionSelected: boolean[] = [false, false, false, false];
  circle_cross: string = '';
  answer_num: number = 2;
  answer: string = 'クイズの回答';
  description: string = 'クイズの解説';
  selectedOptionIndex: number = -1;

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

    if (this.answer_num === optionIndex + 1) {
      this.circle_cross = '◯';
    } else {
      this.circle_cross = '✖︎';
    }
  }
}
