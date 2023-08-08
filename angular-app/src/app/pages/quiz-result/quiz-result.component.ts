import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent {
  isVisibleResult: boolean = false;
  correctAnswerCount: number = 1;
  correctAnswerRate: number = 0;
  message: string[] = [
    'もう少しいけるんちゃうか',
    'なかなかやるやんけ',
    '恐れ入りました。。。',
  ];
  multi = [
    {
      name: 'max',
      series: [
        {
          name: '保護猫について',
          value: 5,
        },
        {
          name: '猫の基礎知識',
          value: 5,
        },
        {
          name: '豆知識',
          value: 5,
        },
        {
          name: '猫と人間の関係性',
          value: 5,
        },
        {
          name: '保護猫の福祉とケア',
          value: 5,
        },
      ],
    },
    {
      name: 'user',
      series: [
        {
          name: '保護猫について',
          value: 3,
        },
        {
          name: '猫の基礎知識',
          value: 4,
        },
        {
          name: '豆知識',
          value: 5,
        },
        {
          name: '猫と人間の関係性',
          value: 2,
        },
        {
          name: '保護猫の福祉とケア',
          value: 1,
        },
      ],
    },
  ];
  view: [number, number] = [350, 200];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = false;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'カテゴリ';
  yAxisLabel: string = '得点';
  maxYAxisTickLength: number = 5;

  colorScheme: Color = {
    domain: ['#ffffff', '#00a1e9'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.correctAnswerCount = this.quizService.correctCount;
  }

  onSelect(event: any) {
    console.log(event);
  }

  calcCorrectAnswerRate() {
    // console.log('クイズの正解数' + this.quiz.correctAnswerCount);
    // console.log('クイズの総数' + this.quizService.quizzes.length);
    // // this.correctAnswerRate = (5 / 2) * 100;
    this.correctAnswerRate =
      (this.correctAnswerCount / this.quizService.quizzes.length) * 100;
    return this.correctAnswerRate;

    // console.log('クイズの正解率' + this.correctAnswerRate);
  }

  handleButtonClick() {
    this.isVisibleResult = true;
    if (this.correctAnswerCount >= 15) {
      this.message = [this.message[2]];
    } else if (this.correctAnswerCount >= 10) {
      this.message = [this.message[1]];
    } else {
      this.message = [this.message[0]];
    }
  }
}
