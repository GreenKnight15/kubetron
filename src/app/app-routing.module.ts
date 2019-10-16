import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PodListComponent } from './PodList/PodList.component';
import { PodDetailsComponent } from './PodDetails/PodDetails.component';
import { NamespaceComponent } from './namespace/namespace.component';
import { DeploymentListComponent } from './deploymentList/deploymentList.component';
import { DeploymentDetailComponent } from './deploymentDetail/deploymentDetail.component';

const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full' },
  { path: ':namespace', component: NamespaceComponent },
  { path: ':namespace/list/deployment', component: DeploymentListComponent},
  { path: ':namespace/list/deployment/:name', component: DeploymentDetailComponent},
  { path: ':namespace/list/pod', component: PodListComponent},
  { path: ':namespace/list/pod/:uid', component: PodDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
