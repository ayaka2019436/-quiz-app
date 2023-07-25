import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

// 出題する問題数
const QUIZ_LENGTH = 20;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  // 出題するクイズを格納
  quizzes: any;
  // 現在出題している問題数
  currentQuizCount = 1;
  constructor(private apiSvc: ApiService) {}

  // クイズがスタートした時に呼び出したい
  public getQuizzes() {
    // 出題する問題を取得する(20問)
    // this.quizzes = ??

    const query: any = { populate: ['choices'] };
    const quiz = new Promise((resolve, reject) => {
      this.apiSvc.getQuizzes(query).subscribe(
        (quizzes) => {
          this.quizzes = quizzes.data;

          // 出題する問題1問を取得(返却)する
          resolve(this.quizzes[this.currentQuizCount - 1].attributes);
        },
        (error) => {
          reject(error);
        }
      );
    });

    return quiz;
  }
  public returnQuizCount() {
    return this.currentQuizCount;
  }
  public incrementQuizCount() {
    return this.currentQuizCount++;
  }
}
