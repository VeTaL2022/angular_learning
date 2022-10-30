import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";

import {
  HeaderComponent,
  PostComponent, PostDetailsComponent,
  PostsComponent,
  UserComponent,
  UserDetailsComponent,
  UsersComponent
} from "./components";
import {HomePageComponent, PostPageComponent, UserPageComponent} from "./pages";
import {MainLayoutComponent} from './layouts';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomePageComponent},
      {path: 'users', component: UserPageComponent},
      {path: 'users/:id', component: UserDetailsComponent},
      {
        path: 'posts', component: PostPageComponent, children: [
          {path: ':id', component: PostDetailsComponent}
        ]
      }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    UserDetailsComponent,
    HomePageComponent,
    UserPageComponent,
    PostPageComponent,
    MainLayoutComponent,
    HeaderComponent,
    PostsComponent,
    PostComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
