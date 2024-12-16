import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// Syncfusion'un kullandığınız bileşen modülleri
import { DiagramModule, SymbolPaletteModule, BpmnDiagrams } from '@syncfusion/ej2-angular-diagrams';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DiagramModule,
    SymbolPaletteModule,
    DiagramModule,
    SymbolPaletteModule,
    ToolbarModule,
    SplitButtonModule,
    UploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent ]
})

export class AppModule { }
