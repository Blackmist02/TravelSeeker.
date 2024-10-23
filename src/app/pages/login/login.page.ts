import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  constructor(private usuarioService: UsuarioService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  login() {
    this.usuarioService.login(this.loginUser, this.loginPassword).subscribe(data => {
      console.log('Usuario logueado', data);
      //Funcion para almacenar el usuario en el localStorage

      localStorage.setItem('usuario', JSON.stringify(data));
      // redireccionar a pagina tabs/home
      // You can use the router to navigate to the tabs/home page
      this.router.navigate(['/tabs/home']);

    }, error => {
      console.error('Error al loguear usuario', error);
      this.showErrorAlert();
    });  
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