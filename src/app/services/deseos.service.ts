import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';


@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    // solo se ejecutara una vez al inicio
    // por eso lo colocamos en el constructor
    this.cargarStorage();

    const LISTA1 = new Lista('Elaborar carta de renuncia');
    const LISTA2 = new Lista('Inscribirse a la facultad');
    this.listas.push(LISTA1, LISTA2);
    // console.log('Servicio inicializado');
    // console.log(this.listas);
  }

    crearLista(titulo: string) {
      const nuevaLista = new Lista(titulo);
      this.listas.push( nuevaLista );
      this.guardarStorage();
    }

    guardarStorage() {

      localStorage.setItem('data', JSON.stringify(this.listas) );

    }

    // al abrir y cargar si hay info
    cargarStorage() {

      if ( localStorage.getItem('data')) {
        this.listas = JSON.parse(localStorage.getItem('data'));
      } else {
        // esta linea se puede obviar ya que inicializamos el objeto vacio antes
        this.listas = [];
      }

    }


}
