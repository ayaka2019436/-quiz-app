import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent {
  selectedOptionIndex: number = -1;
  correct_answer_count: number = 0;
  correct_answer_rate: number = 0;
  message: string[] = [
    'もう少しいけるんちゃうか',
    'なかなかやるやんけ',
    '恐れ入りました。。。',
  ];
  handleButtonClick(selectedOptionIndex: number, correct_answer_count: number) {
    console.log('ボタンがクリックされました');
    this.selectedOptionIndex = 1;
    if (correct_answer_count >= 15) {
      this.message = [this.message[2]];
    } else if (correct_answer_count >= 10) {
      this.message = [this.message[1]];
    } else {
      this.message = [this.message[0]];
    }
  }
}
