import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PodListComponent } from './podList/podList.component';
import { PodDetailsComponent } from './podDetails/podDetails.component';
import { NamespaceComponent } from './namespace/namespace.component';
import { DeploymentListComponent } from './deploymentList/deploymentList.component';
import { DeploymentDetailComponent } from './deploymentDetail/deploymentDetail.component';
import { ServiceListComponent } from './serviceList/serviceList.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';

const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full' },
  { path: ':namespace', component: NamespaceComponent },
  { path: ':namespace/list/deployment', component: DeploymentListComponent},
  { path: ':namespace/list/deployment/:name', component: DeploymentDetailComponent},
  { path: ':namespace/list/pod', component: PodListComponent},
  { path: ':namespace/list/pod/:uid', component: PodDetailsComponent },
  { path: ':namespace/list/service', component: ServiceListComponent}

];

const routes2: Routes = [
  { path: '', component: PodListComponent },
  { path: 'list/deployment', component: DeploymentListComponent,
    children: [
      { path: ':name', component: DeploymentDetailComponent},
    ]
  },
  { path: 'list/pod', component: PodListComponent,
    children: [
      { path: ':uid', component: PodDetailsComponent }
    ]
  },
  { path: 'list/service', children: [
      { path: '', component: ServiceListComponent }
    ]
  },
  { path: '**', component: PodListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes2, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
