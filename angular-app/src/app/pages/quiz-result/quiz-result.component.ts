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
          value: this.quizService.typeCount[0],
        },
        {
          name: '猫の基礎知識',
          value: this.quizService.typeCount[1],
        },
        {
          name: '豆知識',
          value: this.quizService.typeCount[2],
        },
        {
          name: '猫と人間の関係性',
          value: this.quizService.typeCount[3],
        },
        {
          name: '保護猫の福祉とケア',
          value: this.quizService.typeCount[4],
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
    this.correctAnswerRate =
      (this.correctAnswerCount / this.quizService.quizzes.length) * 100;
    console.log('クイズの正解率' + this.correctAnswerRate);
  }

  handleButtonClick() {
    this.calcCorrectAnswerRate();
    // コメントの使用を問題数の何割などにして２０問じゃない時に備えた方がいい。
    this.isVisibleResult = true;
    if (this.correctAnswerCount >= this.quizService.quizzes.length * 0.8) {
      this.message = [this.message[2]];
    } else if (
      this.correctAnswerCount >=
      this.quizService.quizzes.length * 0.5
    ) {
      this.message = [this.message[1]];
    } else {
      this.message = [this.message[0]];
    }
    // console.log(
    //   'カテゴリ別のカウント' + this.quizService.typeCount[0],
    //   this.quizService.typeCount[1],
    //   this.quizService.typeCount[2],
    //   this.quizService.typeCount[3],
    //   this.quizService.typeCount[4]
    // );
  }
}
