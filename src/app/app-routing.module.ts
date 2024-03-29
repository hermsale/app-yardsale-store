import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


///// routes
import { NotFoundComponent } from './not-found/not-found.component';
// import { CustomPreloadService } from './services/custom-preload.service';


import { QuicklinkStrategy } from 'ngx-quicklink';

import {AdminGuard} from './guards/admin.guard'

// rutas de cada component
const routes: Routes = [
  {
    path: '', // por defecto activamos este modulo 
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data:{
      preload:true,
    }
  },
  { // aplicamos el guardian directamente al modulo
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),

  },
  {
    path: '**' , component:NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
