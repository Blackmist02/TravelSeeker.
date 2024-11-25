import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SupabaseService } from 'src/app/supabase.service'


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

  constructor(private router: Router, private usuarioService: UsuarioService, private supabaseService: SupabaseService) { 
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
  async getOrigenes() {
    console.log('Obteniendo ciudades de origen');
    try {
      const data = await this.supabaseService.getOrigenes();
      console.log('Ciudades de origen:', data);
      this.datosCiuadesOrigen = data; // Asigna los datos al array en tu componente
    } catch (error) {
      console.error('Error al obtener ciudades de origen:', error);
    }
  }
  

  //funcion que obtiene las ciudades de destino
  async getDestinos(){
    try{
      const data = await this.supabaseService.getDestinos();
      this.datosCiuadesDestino = data;
    }catch(error){
      console.error('Error al obtener ciudades de destino:', error);
    }
  }

  //funcion que obtiene los aviones
  async getAviones(){
    try{
      const data = await this.supabaseService.getAviones();
      this.datosAviones = data;
    }catch(error){
      console.error('Error al obtener aviones:', error);
    }
  }

  setNumerosPasajeros() {
    this.numerosPasajeros = Array.from({ length: 10 }, (_, i) => i + 1);
  }

  //funcion que muestra las clases
  async getClases(){
    try{
      const data = await this.supabaseService.getClases();
      this.clasesAv = data;
    }catch(error){
      console.error('Error al obtener clases:', error);
    }
  }
}
