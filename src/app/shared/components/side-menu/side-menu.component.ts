import { Component, OnInit } from '@angular/core';

// interface que es a la url a la que vamos a navegar
interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [],
})
export class SideMenuComponent implements OnInit {
  public reactiveMenu: MenuItem[] = [
    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth/sign-up' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
