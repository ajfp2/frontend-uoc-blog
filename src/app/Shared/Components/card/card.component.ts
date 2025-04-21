import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostCardDto } from '../../Models/post-card.dto';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('hoverState', [
      state('default', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.1)' })),
      transition('default <=> hovered', animate('300ms ease-in-out'))
    ])
  ]

})
export class CardComponent {
  hover = false;
  @Input() item: PostCardDto = {
      postId: '',
      title: '',
      description: '',
      num_likes: 0,
      num_dislikes: 0,
      publication_date: new Date(),
      categories: [],
      userId: '',
      userAlias: ''
  }
  @Input() img: number = 0;
  @Input('showButtons') showButtons: boolean = false;
  @Output() like = new EventEmitter<string>();
  @Output() dislike = new EventEmitter<string>();

  like_click(postId: string): void {
    this.like.emit(postId)
  }

  dislike_click(postId: string): void {
    this.dislike.emit(postId)
  }

}
