import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
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
        this.quizzes = quizzes.data;
        console.log(quizzes);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // 各type４問ずつランダムに抜き出す
  public selectQuizzes() {
    const selectQuiz = {
      filters: {
        category: {
          category: {
            $eq: '保護猫について',
          },
        },
      },
      populate: '*',
    };
  }
  // 出題する問題1問を取得(返却)する
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
