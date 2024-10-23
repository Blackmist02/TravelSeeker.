import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e404',
  templateUrl: './e404.page.html',
  styleUrls: ['./e404.page.scss'],
})
export class E404Page implements OnInit {
  activador = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuarioLogueado = JSON.parse(usuarioString);
      this.activador = true;
      console.log('Usuario logueado:', usuarioLogueado);
    } else {
      console.log('No hay usuario logueado en localStorage');
    }
  }


  volver() {
    if (this.activador === true) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
