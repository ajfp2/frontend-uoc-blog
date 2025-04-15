import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent{

  showSpinner = false;

  constructor(private store: Store<AppState>) {

    this.store.select('auth').subscribe((auth) => {
      if(auth.loading == true && auth.loaded == false) this.showSpinner = true;
      if(auth.loaded == true && auth.loading == false) this.showSpinner = false;      
    });

    this.store.select('posts').subscribe((posts) => {
      if(posts.loading == true && posts.loaded == false) this.showSpinner = true;
      if(posts.loaded == true && posts.loading == false) this.showSpinner = false;      
    });

    this.store.select('user').subscribe((user) => {
      if(user.loading == true && user.loaded == false) this.showSpinner = true;
      if(user.loaded == true && user.loading == false) this.showSpinner = false;      
    });

    this.store.select('categories').subscribe((cats) => {
      if(cats.loading == true && cats.loaded == false) this.showSpinner = true;
      if(cats.loaded == true && cats.loading == false) this.showSpinner = false;      
    });
  }

/*
Hola Alex,

Aprovecho un mensaje que compartí con otro compañero vía correo donde comentábamos esto mismo:

Podríamos plantear el caso del spinner de varias maneras.
Podríamos decir que no tiene mucho sentido implementar el mismo código de control de un spinner en cada componente.
Para un caso general como este, tendría más sentido hacer algo más "transversal" y por lo tanto, más reusable.
Podríamos plantear la solución des del interceptor, o se podría hacer un servicio transversal, ... tenemos varias opciones.

Por ejemplo, que podríamos hacer?


1) Hacer un componente spinner y lo ponemos dentro de shared.
2) En la vista, el componente spinner muestra el spinner a toda la pantalla inhabilitando la pantalla y en el typescript lo que haría es consultar de todos
los estados que valor tienen las propiedades loading y loaded. En función del valor se muestra o no el spinner.
3) Y luego este componente spinner se llamaría directamente en el html del app.component.

Por poner un ejemplo. Opciones tenemos varias.

¿Cómo veis esta propuesta?

Un saludo!
*/
}
