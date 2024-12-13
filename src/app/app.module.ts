import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { DiagramModule, SymbolPaletteModule } from '@syncfusion/ej2-angular-diagrams';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DiagramModule,
    SymbolPaletteModule
  ],
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }
