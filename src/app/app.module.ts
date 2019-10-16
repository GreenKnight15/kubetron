import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Top of screen
import { PodListComponent } from './PodList/PodList.component';
import { PodDetailsComponent } from './PodDetails/PodDetails.component';
import { NamespaceComponent } from './namespace/namespace.component';
import { DeploymentListComponent } from './deploymentList/deploymentList.component';
import { DeploymentDetailComponent } from './deploymentDetail/deploymentDetail.component';

@NgModule({
   declarations: [
      AppComponent,
      PodListComponent,
      PodDetailsComponent,
      NamespaceComponent,
      DeploymentListComponent,
      DeploymentDetailComponent
   ],
   imports: [
      AppRoutingModule,
      MaterialModule,
      NoopAnimationsModule,
      FlexLayoutModule,
      BrowserModule,
      RouterModule,
      HttpClientModule
   ],
   entryComponents: [
      AppComponent
   ],
   providers: [
      HttpClientModule
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule {}
