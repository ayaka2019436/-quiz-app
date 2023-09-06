import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  questionsCount: number = 1;
  quiz: any;
  selectedAnswer = false;
  isCorrect = false;
  correctAnswer: string = '';
  @ViewChild('nextButton', { static: false }) nextButton:
    | ElementRef
    | undefined;

  constructor(
    private apiSvc: ApiService,
    public quizService: QuizService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.questionsCount = this.quizService.returnQuizCount();
    console.log('今の問題数' + this.questionsCount);
    // クイズデータを取得する
    this.quiz = this.quizService.getCurrentQuiz();

    console.log('クイズの中身', this.quiz);
  }

  public clickAnswer(choice: any) {
    if (this.selectedAnswer) {
      // console.log('既に選択済みの選択肢があります。');
      return;
    }
    this.scrollEvent();
    console.log('選択肢が選択されました', choice);
    this.selectedAnswer = true;
    this.isCorrect = choice.is_correct;
    this.correctAnswer = this.getCorrectAnswer();
    this.quizService.quizCorrectCountInit();
    if (this.isCorrect) {
      this.quizService.countCorrectAnswer();
      const typeId: number = this.quiz.type.data.id;
      this.quizService.quizTypeCount(typeId);
    }
  }

  public getCorrectAnswer(): string {
    const correctAnswer = this.quiz.choices.find(
      (choice: any) => choice.is_correct
    );
    return correctAnswer?.text;
  }
  public nextPage() {
    this.quizService.incrementQuizCount();
    this.selectedAnswer = false;
    if (this.quizService.hasNextQuiz()) {
      this.ngOnInit();
    } else {
      this.router.navigateByUrl('/quiz-result');
    }
  }
  public scrollEvent() {
    console.log('スクロール'); // ここには処理は通っている
    // window.scrollTo(0, 300);
    // const element = this.el.nativeElement;
    // element.scrollIntoView({ behavior: 'smooth', block: 'end' }); // ページの一番下にスクロール
    if (this.nextButton && this.nextButton.nativeElement) {
      this.nextButton.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
