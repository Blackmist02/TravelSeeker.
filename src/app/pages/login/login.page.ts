import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser: string = '';
  loginPassword: string = '';
  errorMessage: string = 'Error al ingresar credenciales. Por favor, verifique sus datos.';
  constructor(private usuarioService: SupabaseService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async login() {
    try {
      const usuario = await this.usuarioService.loginCustom(this.loginUser, this.loginPassword);
      console.log('Usuario autenticado:', usuario);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.router.navigate(['/tabs/home']);
      // Aquí puedes guardar el usuario en el almacenamiento local o redirigirlo
    } catch (error: any) {
      this.errorMessage = 'Error de autenticación: ' + error.message;
      this.showErrorAlert();
    }
  }

  // Función para mostrar el popup de error
  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Inicio de sesión fallido',
      message: 'Por favor, verifica tus credenciales.',
      buttons: ['OK'] // Botón para cerrar el popup
    });
    await alert.present();
  }

  recuperarContrasenia() {
    this.router.navigate(['/recuperar-contrasenia']);
}
}