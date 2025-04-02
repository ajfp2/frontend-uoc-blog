import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { PostDTO } from 'src/app/Models/post.dto';
import { PostService } from 'src/app/Services/post.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts!: PostDTO[];
  userId: string = '';
  constructor(
    private postService: PostService,
    private router: Router,
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {

    this.store.select('authApp').subscribe((auth) => {
      this.userId = auth.credentials.user_id;
      this.loadPosts();
    });
  }

  private loadPosts(): void {
    let errorResponse: any;
    if (this.userId !== '') {      
      this.postService.getPostsByUserId(this.userId).subscribe((resp: PostDTO[]) => {
        this.posts = resp;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      });      
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string): void {
    let errorResponse: any;
    // show confirmation popup
    let result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      this.postService.deletePost(postId).subscribe( resp => {
        const rowsAffected = resp;
        if (rowsAffected.affected > 0) {
          this.loadPosts();
        }
      },
      (err: HttpErrorResponse) => {
        errorResponse = err.error;
        this.sharedService.errorLog(errorResponse);
      });
    }
  }
}
