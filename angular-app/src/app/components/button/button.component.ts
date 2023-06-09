import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() color: string = 'primary';

  handleButtonClick() {
    console.log('ボタンがクリックされました');
    // ここに追加の処理を書く
    if (this.color === 'primary' || this.color === 'primary_click ') {
      //ボタンの元の色によって選択後の色を分岐させる
      this.color = 'primary_click ';
    } else {
      this.color = 'secondary_click';
    }
  }

  ngOnInit(): void {}
}
