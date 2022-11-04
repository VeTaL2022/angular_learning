import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {LoginFormComponent} from "../login-form/login-form.component";

@Component({
  selector: 'app-login',
  template: ''
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dialog.open(LoginFormComponent, {
      disableClose: true,
      enterAnimationDuration: '0.6s',
      exitAnimationDuration: '0.6s'
    })
  }

}
