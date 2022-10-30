import {Component, OnInit} from '@angular/core';
import {IPost} from "../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../services";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: IPost;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.activatedRoute.params.subscribe(({id}) => {
      this.post = this.router.getCurrentNavigation()?.extras.state?.["post"];

      if (!this.post) {
        this.postService.getById(id).subscribe(value => this.post = value);
      }

    })
  }

  ngOnInit(): void {
  }
}
