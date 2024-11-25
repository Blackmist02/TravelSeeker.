import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Para mostrar alertas
import { SupabaseService } from 'src/app/supabase.service'

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {

  loginusuario: string = '';  // Para almacenar el identificador del usuario
  logincontrasenia: string = '';  // Para almacenar la nueva contraseña
  loginVerificarContrasenia: string = '';  // Para confirmar la nueva contraseña
  usuarios: any[] = [];  // Almacena los usuarios del JSON

  constructor(private http: HttpClient, private alertController: AlertController, private router: Router, private usuarioService: SupabaseService ) { }

  ngOnInit() {
  }




  async cambiarContra() {
    if (this.logincontrasenia !== this.loginVerificarContrasenia) {
      this.mostrarAlerta('Error', 'Las contraseñas no coinciden');
      return
    }
    try {
      const resultado = await this.usuarioService.cambiarContrasenia(
        this.loginusuario,
        this.logincontrasenia
      );
      this.mostrarAlerta('Contraseña cambiada', 'La contraseña se ha cambiado correctamente');
      this.router.navigate(['/login']);

    } catch (error: any) {
      console.error('Error:', error.message);
      this.mostrarAlerta('Error', 'No se ha podido cambiar la contraseña');
    }
  }
  
  // Función para mostrar alertas al usuario
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
