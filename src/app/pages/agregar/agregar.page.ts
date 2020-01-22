import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute) {
    // al iniciar el agregarPage hay que leer el id

    // para no crear un observable se utiliza este código
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista(listaId);
   }

  ngOnInit() {
  }

  agregarItem() {
    if ( this.nombreItem.length === 0) {
      return;
    }

    const NUEVOITEM = new ListaItem(this.nombreItem);
    this.lista.items.push(NUEVOITEM);
    // limpiamos nuevamente el nombreItem
    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck(item: ListaItem) {
    // filter: metodo que regresa una coleccion de elementos que cumplan
    // cierta condición

    // retornar todos los itemData que completado sea false
    const PENDIENTES = this.lista.items
                    .filter( itemData => !itemData.completado )
                    .length;

    if ( PENDIENTES === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    // console.log({PENDIENTES});
    console.log({PENDIENTES});
    this.deseosService.guardarStorage();
    console.log(this.deseosService.listas);
    }

}
