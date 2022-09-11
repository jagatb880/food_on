import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash-login',
    loadChildren: () => import('./pages/splash-login/splash-login.module').then(m => m.SplashLoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsPageModule)
  },
  {
    path: 'production-lot',
    loadChildren: () => import('./pages/production-lot/production-lot.module').then(m => m.ProductionLotPageModule)
  },
  {
    path: 'view-details',
    loadChildren: () => import('./pages/view-details/view-details.module').then(m => m.ViewDetailsPageModule)
  },
  {
    path: 'my-qr-code',
    loadChildren: () => import('./pages/my-qr-code/my-qr-code.module').then(m => m.MyQrCodePageModule)
  },
  {
    path: 'view-trace',
    loadChildren: () => import('./pages/view-trace/view-trace.module').then(m => m.ViewTracePageModule)
  },
  {
    path: 'view-geographical-journey',
    loadChildren: () => import('./pages/view-geographical-journey/view-geographical-journey.module').then(m => m.ViewGeographicalJourneyPageModule)
  },
  {
    path: 'my-distributor',
    loadChildren: () => import('./pages/my-distributor/my-distributor.module').then(m => m.MyDistributorPageModule)
  },
  {
    path: 'send-invitation',
    loadChildren: () => import('./pages/send-invitation/send-invitation.module').then(m => m.SendInvitationPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'producer-products',
    loadChildren: () => import('./pages/producer-products/producer-products.module').then( m => m.ProducerProductsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
