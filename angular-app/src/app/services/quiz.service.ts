import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as _ from 'lodash';
import * as qs from 'qs';

// 出題する問題数
const QUIZ_LENGTH = 20;
const type = [
  '保護猫について',
  '猫の基礎知識',
  '豆知識',
  '猫と人間の関係性',
  '保護猫の福祉とケア',
];

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  // 出題するクイズを格納
  quizzes: any;
  // 現在出題している問題数
  currentQuizCount = 1;
  correctCount: number = 0;

  constructor(private apiSvc: ApiService) {}

  // クイズがスタートした時に呼び出したい
  public getQuizzes() {
    this.currentQuizCount = 1;

    // 出題する問題を取得する(20問)
    // const query: any = { populate: ['choices'] };

    const query = {
      pagination: {
        pageSize: 200,
      },
      filters: {
        category: {
          category: {
            $eq: '保護猫について',
          },
        },
      },
      populate: '*',
    };
    this.apiSvc.getQuizzes(query).subscribe(
      (quizzes) => {
        // this.quizzes = quizzes.data;
        this.quizzes = this.randomSelectQuizzes(quizzes.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // 各type4問ずつランダムに抜き出す
  public randomSelectQuizzes(quizzes: any) {
    let incrementRandomRange: number = 0;
    let typeCounts: any = {};

    let shuffledQuizzes = _.shuffle(quizzes);
    const _quizzes: any = [];
    shuffledQuizzes.forEach((quiz) => {
      const typeId = quiz.attributes.type.data.id;
      if (typeCounts[typeId] < 4 || !typeCounts[typeId]) {
        typeCounts[typeId] = typeCounts[typeId] ? typeCounts[typeId] + 1 : 1;
        _quizzes.push(quiz);
      }
    });
    console.log(_quizzes);
    return _quizzes;

    // 保護猫についての問題を４問randomに取得する
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < 4; i++) {
        let num =
          Math.floor(
            Math.random() *
              (16 + incrementRandomRange + 1 - (7 + incrementRandomRange))
          ) +
          (7 + incrementRandomRange); // randomを使うと同じidをとってくることが多々あるからそれをどうするか、、、、

        // const filteredQuizzes = this.quizzes.filter(
        //   (quiz: any) =>
        //     this.quizzes.attributes.category.type === type[j] &&
        //     this.quizzes.attributes.category.id === num
        // );
        // quizSaveSpace[j * 4 + i] = filteredQuizzes;

        // quizzesに入っている問題データからフィルターをかけて持ってくる。
        // const selectQuizType = {
        //   filters: {
        //     category: {
        //       id: {
        //         $eq: num,
        //       },
        //       type: {
        //         $eq: type[j],
        //       },
        //     },
        //   },
        // };

        // console.log(num);
        // console.log('問題の取得' + selectQuizType);
        // quizSaveSpace[j] = selectQuizType;
      }
      incrementRandomRange += 10;
    }

    //   // 猫の基礎知識の問題を４問randomに取得する
    //   for (let i = 4; i < 8; i++) {
    //     let num = Math.floor(Math.random() * (26 + 1 - 17)) + 17;
    //     const selectQuizType2 = {
    //       filters: {
    //         category: {
    //           id: {
    //             $eq: num,
    //           },
    //           type: {
    //             $eq: '猫の基礎知識',
    //           },
    //         },
    //       },
    //       populate: '*',
    //     };
    //     quizSaveSpace[i] = selectQuizType2;
    //   }
    //   // 豆知識の問題を４問randomに取得する
    //   for (let i = 8; i < 12; i++) {
    //     let num = Math.floor(Math.random() * (36 + 1 - 27)) + 27;
    //     const selectQuizType3 = {
    //       filters: {
    //         category: {
    //           id: {
    //             $eq: num,
    //           },
    //           type: {
    //             $eq: '豆知識',
    //           },
    //         },
    //       },
    //       populate: '*',
    //     };
    //     quizSaveSpace[i] = selectQuizType3;
    //   }
    //   // 猫と人間の関係性の問題を４問randomに取得する
    //   for (let i = 12; i < 16; i++) {
    //     let num = Math.floor(Math.random() * (46 + 1 - 37)) + 37;
    //     const selectQuizType4 = {
    //       filters: {
    //         category: {
    //           id: {
    //             $eq: num,
    //           },
    //           type: {
    //             $eq: '猫と人間の関係性',
    //           },
    //         },
    //       },
    //       populate: '*',
    //     };
    //     quizSaveSpace[i] = selectQuizType4;
    //   }
    //   // 保護猫の福祉とケアの問題を４問randomに取得する
    //   for (let i = 16; i < 20; i++) {
    //     let num = Math.floor(Math.random() * (56 + 1 - 47)) + 47;
    //     const selectQuizType5 = {
    //       filters: {
    //         category: {
    //           id: {
    //             $eq: num,
    //           },
    //           type: {
    //             $eq: '保護猫の福祉とケア',
    //           },
    //         },
    //       },
    //       populate: '*',
    //     };
    //     quizSaveSpace[i] = selectQuizType5;
    //   }
    // }
    // 出題する問題1問を取得(返却)する
  }
  public getCurrentQuiz() {
    return this.quizzes[this.currentQuizCount - 1].attributes;
  }

  public returnQuizCount() {
    return this.currentQuizCount;
  }

  public incrementQuizCount() {
    return this.currentQuizCount++;
  }

  public calcRemainingQuizCount(): number {
    return this.quizzes.length - this.currentQuizCount;
  }

  public hasNextQuiz(): boolean {
    return this.currentQuizCount - 1 < this.quizzes.length;
  }

  public countCorrectAnswer() {
    this.correctCount++;
    return;
  }
  public quizCorrectCountInit() {
    if (this.currentQuizCount == 1) {
      this.correctCount = 0;
    }
  }
}
