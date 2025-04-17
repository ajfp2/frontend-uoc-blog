import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

  // post
  posts: PostDTO[];
  numLikes: number;
  numDislikes: number;
  arrayLikes: Array<number> = [];
  arrayDislikes: Array<number> = [];

  dataPie: ChartData<'pie'> = {
    datasets: []
  }

  barType: ChartType = 'bar';
  dataBar: ChartData<'bar'> = {
    labels: [],
    datasets: []
  }

  constructor(private store: Store<AppState>) {
    this.posts = new Array<PostDTO>();
    this.numLikes = 0;
    this.numDislikes = 0;
    this.dataBar.labels = [];
    this.arrayDislikes = [];
    this.arrayLikes = []
    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      this.numLikes = 0;
      this.numDislikes = 0;

      this.posts.forEach((post) => {
        this.numLikes = this.numLikes + post.num_likes;
        this.numDislikes = this.numDislikes + post.num_dislikes;
        
        console.log("title", post.title);
        
        this.dataBar.labels?.push(post.title);
        console.log("label",this.dataBar.labels);
        this.arrayDislikes.push(post.num_dislikes);
        this.arrayLikes.push(post.num_likes);       
      });

      console.log("Fin foreach");
      
      // en suscribe
      this.cargarDatos();
    });
  }

  ngOnInit(): void {
    this.loadPosts();
    
    
  }

  private cargarDatos(){
    this.dataPie = {
      labels: ['DisLikes', 'Likes'],
      datasets: [
        {
          label: 'Todos',
          data: [this.numDislikes, this.numLikes]
        }
      ]
    };
    this.dataBar.datasets = [
      {
        label: 'Dislikes',
        data: this.arrayDislikes
      },
      {
        label: 'Likes',
        data: this.arrayLikes
      }
    ];
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
}
