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

  constructor( public deseosService: DeseosService, private router: Router, private alertCtrl: AlertController ) {
  }

  // navegar a la pantalla para navegar
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
          role: 'cancel' ,
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
            this.deseosService.crearLista( data.titulo );
            // Tengo que crear la lista
          }
        }
      ]
    });

    ALERT.present();

  }

}
