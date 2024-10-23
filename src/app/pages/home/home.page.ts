import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  loginUser: string = "";
  loginPassword: string = "";
  usuarioLogueado: any = null;

  time: string;
  private intervalId: any;
  datosCiuadesOrigen: any[] = [];
  datosCiuadesDestino: any[] = [];
  datosAviones: any[] = [];
  numerosPasajeros: number[] = [];
  clasesAv: any[] = [];

  constructor(private router: Router, private usuarioService: UsuarioService) { 
    this.time = this.getTime();
  }

  ngOnInit() {
    // Your code here
    // Se actualiza cada segundo
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras.state){
      const {usuario,clave} = navigation?.extras.state;
      this.loginUser = usuario;
      this.loginPassword = clave;
    }
    this.updateTime();
    this.intervalId = setInterval(() => {
      this.time = this.getTime();
    }, 1000);

    // Obtener el usuario logueado desde localStorage
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      this.usuarioLogueado = JSON.parse(usuarioString); // Asigna a la propiedad de clase
      console.log('Usuario logueado:', this.usuarioLogueado);
    } else {
      console.log('No hay usuario logueado en localStorage');
    }

    console.log(this.loginUser);
    console.log(this.loginPassword);
    this.getOrigenes();
    this.getDestinos();
    this.getAviones();
    this.setNumerosPasajeros();
    this.getClases();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  //funcion que devuelve la hora actual y que este se actualice cada segundo
  
  getTime() {
    return new Date().toLocaleTimeString();
  }

  updateTime() {
    this.time = this.getTime();
  }

  //funcion que obtiene las ciudades de origen
  getOrigenes(){
    // Your code here
    console.log('Obteniendo ciudades de origen');
    this.usuarioService.getOrigenes().subscribe(data => {
      console.log('Ciudades de origen', data);
      this.datosCiuadesOrigen = data;
    }, error => {
      console.error('Error al obtener ciudades de origen', error);
    });
  }

  //funcion que obtiene las ciudades de destino
  getDestinos(){
    // Your code here
    console.log('Obteniendo ciudades de Destino');
    this.usuarioService.getDestino().subscribe(data => {
      console.log('Ciudades de Destino', data);
      this.datosCiuadesDestino = data;
    }, error => {
      console.error('Error al obtener ciudades de Destino', error);
    });
  }

  //funcion que obtiene los aviones
  getAviones(){
    // Your code here
    console.log('Obteniendo aviones');
    this.usuarioService.getNroPasajeros().subscribe(data => {
      console.log('Aviones', data);
      this.datosAviones = data;
    }, error => {
      console.error('Error al obtener aviones', error);
    });
  }

  setNumerosPasajeros() {
    this.numerosPasajeros = Array.from({ length: 10 }, (_, i) => i + 1);
  }

  //funcion que muestra las clases
  getClases(){
    // Your code here
    console.log('Obteniendo clases');
    this.usuarioService.getClases().subscribe(data => {
      console.log('Clases', data);
      this.clasesAv = data;
    }, error => {
      console.error('Error al obtener clases', error);
    });
  }
}
