import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './layouts/error/error.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import HomeComponent from './home/home.component';
import NavbarComponent from './layouts/navbar/navbar.component';
import { loadEntityModule } from './core/microfrontend';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent,
          title: 'home.title',
        },
        {
          path: '',
          component: NavbarComponent,
          outlet: 'navbar',
        },
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module'),
        },
        {
          path: '',
          loadChildren: () => import(`./entities/entity-routing.module`).then(({ EntityRoutingModule }) => EntityRoutingModule),
        },
        {
          path: 'webapp',
          loadChildren: () => loadEntityModule('webapp'),
        },
        {
          path: 'iosapp',
          loadChildren: () => loadEntityModule('iosapp'),
        },
        {
          path: 'androidapp',
          loadChildren: () => loadEntityModule('androidapp'),
        },
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED, bindToComponentInputs: true }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
