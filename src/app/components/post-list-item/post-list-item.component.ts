import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Subscription } from 'rxjs/Subscription';
import { PostItemService } from '../../services/post-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  constructor(private postService: PostItemService, private router: Router) { }


  posts: Post[];
  postSubscription: Subscription;

  like(index: number) {
    this.postService.like(index);
  }

  unlike(index: number) {
    this.postService.unlike(index);
  }

  viewSinglePost(id: number) {
    this.router.navigate(['/post', id]);
  }

  onDeletePost(title: string, id: number) {
    if (confirm( 'Voulez-vous supprimer le post : ' + title + '?' ) ) {
      this.postService.deletePost(id);
    }
  }

  ngOnInit() {
    // tableau de posts vide
    this.postSubscription = this.postService.postItemSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.viewPosts();
    this.postService.emitPost();
  }


}
