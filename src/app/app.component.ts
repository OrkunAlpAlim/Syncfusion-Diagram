import { Component } from '@angular/core';
import { NodeModel, PaletteModel, ConnectorModel, SymbolPreviewModel, SnapSettingsModel, SnapConstraints, SnappingService } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SnappingService]
})

export class AppComponent {
  title = 'syncfusion-diagram-component';

  public symbolPalette: PaletteModel[] = [
    {
      id: 'basic',
      symbols: this.getBasicShapes(),
      title: 'Basic Shapes',
      iconCss: 'e-ddb-icons e-basic'
    },
    {
      id: 'flow',
      symbols: this.getFlowShapes(),
      title: 'Flow Shapes',
      iconCss: 'e-ddb-icons e-flow'
    },
    {
      id: 'connectors',
      symbols: this.getConnectors(),
      title: 'Connectors',
      iconCss: 'e-ddb-icons e-connector'
    }
  ];

  getBasicShapes(): NodeModel[] {
    let getBasicShapes: NodeModel[] = [
      { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
      { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
      { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
      { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' } },
      { id: 'Star', shape: { type: 'Basic', shape: 'Star' } },
      { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
      { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' } },
      { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' } },
      { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' } },
      { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' } },
      { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' } },
      { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
    ];
    return getBasicShapes;
  }

  getFlowShapes(): NodeModel[] {
    let getFlowShapes: NodeModel[] = [
      { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
      { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
      { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' } },
      { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
      { id: 'PreDefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
      { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' } },
      { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
      { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' } },
      { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
      { id: 'MultiDocument', shape: { type: 'Flow', shape: 'MultiDocument' } },
      { id: 'Collate', shape: { type: 'Flow', shape: 'Collate' } },
      { id: 'SummingJunction', shape: { type: 'Flow', shape: 'SummingJunction' } },
      { id: 'Or', shape: { type: 'Flow', shape: 'Or' } },
      { id: 'InternalStorage', shape: { type: 'Flow', shape: 'InternalStorage' } },
      { id: 'Extract', shape: { type: 'Flow', shape: 'Extract' } },
      { id: 'ManualOperation', shape: { type: 'Flow', shape: 'ManualOperation' } },
      { id: 'Merge', shape: { type: 'Flow', shape: 'Merge' } },
      { id: 'OffPageReference', shape: { type: 'Flow', shape: 'OffPageReference' } },
      { id: 'SequentialAccessStorage', shape: { type: 'Flow', shape: 'SequentialAccessStorage' } },
      { id: 'Data', shape: { type: 'Flow', shape: 'Data' } },
      { id: 'Card', shape: { type: 'Flow', shape: 'Card' } },
    ];
    return getFlowShapes;
  }

  public getConnectors(): ConnectorModel[] {
    let connectorSymbols: ConnectorModel[] = [
      { id: 'orthogonal', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, },
      { id: 'orthogonaldashed', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, style: { strokeDashArray: '4 4' }, },
      { id: 'straight', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, },
      { id: 'straightdashed', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, style: { strokeDashArray: '4 4' }, },
    ];
    return connectorSymbols;
  };

  public symbolPreviewSettings: SymbolPreviewModel = {
    height: 100,
    width: 100,
    offset: { x: 0.5, y: 0.5 }
  }

  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.SnapToObject | SnapConstraints.SnapToLines | SnapConstraints.ShowLines,
    snapObjectDistance: 10,
    snapAngle: 10,
    snapLineColor: 'red',
  };
}