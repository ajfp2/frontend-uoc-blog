import { CategoryDTO } from "src/app/Category/models/category.dto";

export interface PostCardDto {
      postId: string;
      title: string;
      description: string;
      num_likes: number;
      num_dislikes: number;
      publication_date: Date;
      categories: CategoryDTO[];
      userId: string;
      userAlias: string;
}