import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';

//charts
import {  ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Pie
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Dislikes', 'Likes'],
    datasets: [
      {
        data: [2, 1],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  //Bars
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Dislikes' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Likes' }
    ]
  };


  // post
  posts: PostDTO[];
  numLikes: number;
  numDislikes: number;

  constructor(private store: Store<AppState>) {
    this.posts = new Array<PostDTO>();
    this.numLikes = 0;
    this.numDislikes = 0;

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      this.numLikes = 0;
      this.numDislikes = 0;
      this.posts.forEach((post) => {
        this.numLikes = this.numLikes + post.num_likes;
        this.numDislikes = this.numDislikes + post.num_dislikes;
      });
    });
    // this.datasets = [ this.numDislikes, this.numLikes];

  }

  ngOnInit(): void {
    this.loadPosts();
    this.updateCharts();
  }

  private updateCharts() {
    this.pieChartData.datasets[0].data.push(this.numDislikes);
    this.pieChartData.datasets[1].data.push(this.numLikes);

    this.chart?.update();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
}
