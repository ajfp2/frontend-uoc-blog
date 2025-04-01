import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthDTO } from 'src/app/auth/models/auth.dto';
import { AuthState } from 'src/app/auth/reducers';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService } from 'src/app/Services/category.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent {
  categories!: CategoryDTO[];
  userId: string = "";
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {
    
    this.store.select('authApp').subscribe((auth) => {
      this.userId = auth.credentials.user_id;
      console.log("AUT", auth);
      this.loadCategories();
    });
  }

  private  loadCategories(): void {
    let errorResponse: any;
    //const auth:AuthDTO = this.store.select('credentials');
   // const userId = auth.user_id;
    if (this.userId) {
      this.categoryService.getCategoriesByUserId(this.userId)
      .subscribe(
        (resp: CategoryDTO[]) => {this.categories = resp;}, 
        (err: HttpErrorResponse) => {
          errorResponse = err.error;
          this.sharedService.errorLog(errorResponse);
      });
     
    }
  }

  createCategory(): void {
    this.router.navigateByUrl('/user/category/');
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl('/user/category/' + categoryId);
  }

  deleteCategory(categoryId: string):void {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm('Confirm delete category with id: ' + categoryId + ' .');
    if (result) {
      this.categoryService.deleteCategory(categoryId).subscribe( res => {
        const rowsAffected = res;
        if (rowsAffected.affected > 0) {
          this.loadCategories();
        }
      }, (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      });
    }
  }
}
