import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PodListComponent } from './podList/podList.component';
import { PodDetailsComponent } from './podDetails/podDetails.component';
import { NamespaceComponent } from './namespace/namespace.component';
import { DeploymentListComponent } from './deploymentList/deploymentList.component';
import { DeploymentDetailComponent } from './deploymentDetail/deploymentDetail.component';
import { ServiceListComponent } from './serviceList/serviceList.component';
import { NgxElectronModule } from 'ngx-electron';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';

@NgModule({
   declarations: [
      AppComponent,
      PodListComponent,
      PodDetailsComponent,
      NamespaceComponent,
      DeploymentListComponent,
      DeploymentDetailComponent,
      ServiceListComponent,
      PageNotFoundComponent
   ],
   imports: [
      AppRoutingModule,
      MaterialModule,
      NoopAnimationsModule,
      FlexLayoutModule,
      BrowserModule,
      RouterModule,
      NgxElectronModule
   ],
   entryComponents: [
      AppComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule {}
