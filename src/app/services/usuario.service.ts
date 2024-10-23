import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios';
  private apiUrlLog = 'http://localhost:3000/api/usuarios/login';
  private apiUrlOrigen = 'http://localhost:3000/api/origen';
  private apiUrlDestino = 'http://localhost:3000/api/destinos';
  private apiUrlNroPasajeros = 'http://localhost:3000/api/aviones';
  private apiUrlClase = 'http://localhost:3000/api/clases';
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
  login(email: string, password: string): Observable<any> {
    const usuario = { email, password };
    return this.http.post(`${this.apiUrlLog}`, usuario);
  }

  getOrigenes(): Observable<any> {
    return this.http.get(this.apiUrlOrigen);
  }
  
  getDestino(): Observable<any> {
    return this.http.get(this.apiUrlDestino);
  }

  getNroPasajeros(): Observable<any> {
    return this.http.get(this.apiUrlNroPasajeros);
  }

  getClases(): Observable<any> {
    return this.http.get(this.apiUrlClase);
  }

  //funcion para cambiar la contraseña
  cambiarContrasenia(usuario: string, password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${usuario}`, { password });
  }
}