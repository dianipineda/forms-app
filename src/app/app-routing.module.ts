import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'reactive', // esto me va a redirigir a un path vacio '', lo configuro dentro de reactive-routing.module.ts
    loadChildren: () =>
      import('./reactive/reactive.module').then((m) => m.ReactiveModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
