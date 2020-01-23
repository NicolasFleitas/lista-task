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

    // const LISTA1 = new Lista('Elaborar carta de renuncia');
    // const LISTA2 = new Lista('Inscribirse a la facultad');
    // this.listas.push(LISTA1, LISTA2);
    // console.log('Servicio inicializado');
  }

    crearLista(titulo: string) {
      const NUEVALISTA = new Lista(titulo);
      this.listas.push( NUEVALISTA );
      this.guardarStorage();

      return NUEVALISTA.id; // id para moverme a la pagina de agregar
    }


    modificarLista(titulo: string) {
      const LISTAMODIFICADA = new Lista(titulo);
      this.listas.push( LISTAMODIFICADA );
      this.guardarStorage();

      return LISTAMODIFICADA.id; // id para moverme a la pagina de agregar
    }

    // filtramos todo el arreglo donde no coincida el id
    borrarLista(lista: Lista) {
      this.listas = this.listas.filter(listaData => {
        return  listaData.id !== lista.id;
      });
      this.guardarStorage();
    }

    obtenerLista(id: string | number) {
      // Aseguramos que siempre sea un número
      id = Number(id);

      return this.listas.find(listaData => listaData.id === id );
    }



    // Método que guarda en el localstorage
    guardarStorage() {
      // usamos JSON.stringify para guardar ya que el localStorage solo guarda String
      // Convertimos un JSON a un String
      localStorage.setItem('data', JSON.stringify(this.listas) );
    }



    // al abrir y cargar si hay info
    cargarStorage() {
      // Si no hay nada en el localStorage, va a regresar un NULL
      // Y el método JSON.parse dará error
      // Comprobamos si existe la data antes de mostrar;
      if ( localStorage.getItem('data')) {
        // Se debe hacer un parse de String a JSON
        this.listas = JSON.parse(localStorage.getItem('data'));
      } else {
        // esta linea se puede obviar ya que inicializamos el objeto <listas> vacio antes
        this.listas = [];
      }

    }


}
