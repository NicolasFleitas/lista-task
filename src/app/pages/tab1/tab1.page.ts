import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: any[] = [];

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) {
  }

  // con " async " transformamos el método en una promesa
  async agregarLista() {
  // this.router.navigateByUrl('/tabs/tab1/agregar');

  const ALERT = await  this.alertCtrl.create({
    header: 'Nueva lista',
    inputs: [
      {
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }
    ],
    buttons: [
      {
        text: 'Cancelar' ,
        role: 'cancel' , // role por defecto para cerrar
        // función " handler " que se ejecuta cuando se cierre la alerta
        // o se toque el botón
        handler: () => {
          console.log('Cancelar');
        }
      },
      {
        text: 'Crear',
        handler: ( data ) => {
          console.log(data);
          // Si viene vacio que no haga nada
          if ( data.titulo.lenght === 0) {
            return;
          }
          // Tengo que crear la lista
          this.deseosService.crearLista( data.titulo );
        }
      }
    ]
  });

  ALERT.present();

  }

}
