
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async loginCustom(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('usuarios') // Tu tabla personalizada
      .select('*')
      .eq('email', email)
      .eq('password', password) // Asegúrate de guardar las contraseñas de forma segura (hash)
      .single(); // Obtiene un único registro
  
    if (error) {
      throw new Error('Credenciales inválidas');
    }
  
    return data; // Devuelve los datos del usuario autenticado
  }

  async cambiarContrasenia(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('usuarios') // Tu tabla personalizada
      .update({ password }) // Objeto con los campos a actualizar
      .eq('email', email); // Filtro para seleccionar el registro
  
    if (error) {
      throw new Error('Error al cambiar la contraseña: ' + error.message);
    }
  
    return data; // Devuelve los datos actualizados
  }
  

  async getOrigenes(): Promise<any> {
    const { data, error } = await this.supabase.from('origen').select('*');
    if (error) {
      throw new Error('Error al obtener los origenes: ' + error.message);
    }
    return data;
  }

  async getDestinos(): Promise<any> {
    const { data, error } = await this.supabase.from('destinos').select('*');
    if (error) {
      throw new Error('Error al obtener los destinos: ' + error.message);
    }
    return data;
  }

  async getAviones(): Promise<any> {
    const { data, error } = await this.supabase.from('aviones').select('*');
    if (error) {
      throw new Error('Error al obtener los aviones: ' + error.message);
    }
    return data;
  }

  async getNroPasajeros(): Promise<any> {
    const { data, error } = await this.supabase.from('aviones').select('nro_pasajeros');
    if (error) {
      throw new Error('Error al obtener el número de pasajeros: ' + error.message);
    }
    return data;
  }

  async getClases(): Promise<any> {
    const { data, error } = await this.supabase.from('clases').select('*');
    if (error) {
      throw new Error('Error al obtener las clases: ' + error.message);
    }
    return data;
  } 

}
