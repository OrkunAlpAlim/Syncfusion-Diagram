import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { ConnectorConstraints, DiagramComponent, DiagramTools, IExportOptions, IHistoryChangeArgs, ISelectionChangeEventArgs, NodeConstraints, ZoomOptions, SymbolPaletteModule, DiagramModule, SnappingService, SnapConstraints, SymbolPreviewModel, SnapSettingsModel } from '@syncfusion/ej2-angular-diagrams';
import { ToolbarComponent, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ClickEventArgs, ItemModel, MenuEventArgs, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Connector, FlowShapeModel,
  SymbolInfo, IDragEnterEventArgs, MarginModel, TextStyleModel, StrokeStyleModel,
  OrthogonalSegmentModel, Node, PaletteModel 
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from '../script/diagram-common';
import { AsyncSettingsModel } from '@syncfusion/ej2-inputs';

import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

Diagram.Inject(UndoRedo);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SnappingService]
})
export class AppComponent {
  
  title = 'syncfusion-diagram-component';

  @ViewChild('diagram', { static: false }) diagram!: DiagramComponent;
  @ViewChild('toolbar', { static: false }) toolbar!: ToolbarComponent;

  constructor() {}

  public terminator: FlowShapeModel = { type: 'Flow', shape: 'Terminator' };
  public process: FlowShapeModel = { type: 'Flow', shape: 'Process' };
  public decision: FlowShapeModel = { type: 'Flow', shape: 'Decision' };
  public data: FlowShapeModel = { type: 'Flow', shape: 'Data' };
  public directdata: FlowShapeModel = { type: 'Flow', shape: 'DirectData' };

  public margin: MarginModel = { left: 25, right: 25 };
  public connAnnotStyle: TextStyleModel = { fill: 'white' };
  public strokeStyle: StrokeStyleModel = { strokeDashArray: '2,2' };

  public segments: OrthogonalSegmentModel = [{ type: 'Orthogonal', direction: 'Top', length: 120 }];
  public segments1: OrthogonalSegmentModel = [
    { type: 'Orthogonal', direction: 'Right', length: 100 }
  ];
  public drawingObject: any;
  public asyncSettings: AsyncSettingsModel = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
  };

  private getPorts(node: NodeModel): PointPortModel[] {
    return [];
  }
  
  //Sets the default values of a node
  public nodeDefaults = (node: NodeModel): NodeModel => {
    node.ports = this.getPorts(node);
  
    if (node.width === undefined) {
      node.width = 145;
    }
  
    node.style = { fill: '#357BD2', strokeColor: 'white' };
  
    if (node.annotations) {
      for (let i = 0; i < node.annotations.length; i++) {
        node.annotations[i].style = {
          color: 'white',
          fill: 'transparent',
        };
      }
    }
  
    return node;
  };
  

  //Sets the default values of a connector
  public connectorDefaults(obj: Connector): void {
    if (obj.id && obj.id.indexOf('connector') !== -1) {
      obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
    }
  }

  public created(): void {
    this.diagram?.fitToPage();
  }

  public interval: number[] = [
    1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,
    9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
  ];

  public snapSettings: SnapSettingsModel = {
   /* horizontalGridlines: { lineColor: '#e0e0e0', lineIntervals: this.interval },
    verticalGridlines: { lineColor: '#e0e0e0', lineIntervals: this.interval }*/
    constraints: SnapConstraints.SnapToObject | SnapConstraints.SnapToLines | SnapConstraints.ShowLines,
    snapObjectDistance: 10,
    snapAngle: 10,
    snapLineColor: 'red',
  };

  //Sets the Node style for DragEnter element.
  public dragEnter(args: IDragEnterEventArgs): void {
    let obj = args.element as NodeModel;
    if (obj && obj.width && obj.height && obj.offsetX !== undefined && obj.offsetY !== undefined) {
      let objWidth: number = obj.width;
      let objHeight: number = obj.height;
      let ratio: number = 100 / obj.width;
      obj.width = 100;
      obj.height = obj.height * ratio;
      obj.offsetX = obj.offsetX + (obj.width - objWidth) / 2;
      obj.offsetY = obj.offsetY + (obj.height - objHeight) / 2;
      obj.style = { fill: '#357BD2', strokeColor: 'white' };
    }
  }

  public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };
  public expandMode: ExpandMode = 'Multiple';

  public getFlowShape(id: string, shapeType: any): NodeModel {
    let flowshape: NodeModel = { id: id, shape: { type: 'Flow', shape: shapeType } };
    return flowshape;
  }

  private flowshapes: NodeModel[] = [
    this.getFlowShape('Terminator', 'Terminator'),
    this.getFlowShape('Process', 'Process'),
    this.getFlowShape('Decision', 'Decision'),
    this.getFlowShape('Document', 'Document'),
    this.getFlowShape('PreDefinedProcess', 'PreDefinedProcess'),
    this.getFlowShape('PaperTap', 'PaperTap'),
    this.getFlowShape('DirectData', 'DirectData'),
    this.getFlowShape('SequentialData', 'SequentialData'),
    this.getFlowShape('Sort', 'Sort'),
    this.getFlowShape('MultiDocument', 'MultiDocument'),
    this.getFlowShape('Collate', 'Collate'),
    this.getFlowShape('Or', 'Or'),
    this.getFlowShape('Extract', 'Extract'),
    this.getFlowShape('Merge', 'Merge'),
    this.getFlowShape('OffPageReference', 'OffPageReference'),
    this.getFlowShape('SequentialAccessStorage', 'SequentialAccessStorage'),
    this.getFlowShape('Annotation', 'Annotation'),
    this.getFlowShape('Annotation2', 'Annotation2'),
    this.getFlowShape('Data', 'Data'),
    this.getFlowShape('Card', 'Card'),
    this.getFlowShape('Delay', 'Delay'),
  ];

  private createConnectorSymbol(id: string, type: any, targetDecoratorShape: any, strokeColor: string = '#757575'): ConnectorModel {
    return {
      id: id,
      type: type,
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: strokeColor },
      targetDecorator: { shape: targetDecoratorShape, style: { strokeColor: strokeColor, fill: strokeColor } }
    };
  }

  private connectorSymbols: ConnectorModel[] = [
    this.createConnectorSymbol('Link1', 'Orthogonal', 'Arrow'),
    this.createConnectorSymbol('Link2', 'Orthogonal', 'None'),
    this.createConnectorSymbol('Link3', 'Straight', 'Arrow'),
    this.createConnectorSymbol('Link4', 'Straight', 'None'),
    this.createConnectorSymbol('Link5', 'Bezier', 'None')
  ];

  public palettes: PaletteModel[] = [
    {
      id: 'flow',
      expanded: true,
      symbols: this.flowshapes,
      iconCss: 'shapes',
      title: 'Flow Shapes'
    },
    {
      id: 'connectors',
      expanded: true,
      symbols: this.connectorSymbols,
      iconCss: 'shapes',
      title: 'Connectors'
    }
  ];

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  }

  public getSymbolDefaults(symbol: NodeModel): void {
    if (!symbol.style) {
      symbol.style = {};
    }
    symbol.style.strokeColor = '#757575';
    if (symbol.id === 'Terminator' || symbol.id === 'Process') {
      symbol.width = 80;
      symbol.height = 40;
    } else if (
      symbol.id === 'Decision' ||
      symbol.id === 'Document' ||
      symbol.id === 'PreDefinedProcess' ||
      symbol.id === 'PaperTap' ||
      symbol.id === 'DirectData' ||
      symbol.id === 'MultiDocument' ||
      symbol.id === 'Data'
    ) {
      symbol.width = 50;
      symbol.height = 40;
    } else {
      symbol.width = 50;
      symbol.height = 50;
    }
  }

  public selectionChange(args: ISelectionChangeEventArgs): void {
    if (!args || !this.diagram || !this.toolbar) return;
    if (args.state === 'Changed') {
      let selectedNodes = this.diagram.selectedItems?.nodes || [];
      let selectedConnectors = (this.diagram.selectedItems?.connectors as any) || [];
      let selectedItems = selectedNodes.concat(selectedConnectors);

      if (selectedItems.length === 0) {
        const itemIds = ['Cut', 'Copy', 'Lock', 'Delete', 'Order', 'Rotate', 'Flip'];
        itemIds.forEach(itemId => {
          const item = this.toolbar?.items?.find(item => item.id === itemId);
          if (item) {
            item.disabled = true;
          }
        });
        this.disableMultiselectedItems();
      }
      else if (selectedItems.length === 1) {
        this.enableItems();
        this.disableMultiselectedItems();

        if (selectedItems[0]?.children !== undefined && selectedItems[0].children.length > 0) {
          var Index = this.toolbar?.items?.findIndex(item => item.id === 'Group');
          if (Index !== undefined && Index !== -1) {
            this.toolbar.items[Index].disabled = false;
          }
        }
        else {
          var Index = this.toolbar?.items?.findIndex(item => item.id === 'Group');
          if (Index !== undefined && Index !== -1) {
            this.toolbar.items[Index].disabled = true;
          }
        }

      }
      else if (selectedItems.length > 1) {
        this.enableItems();
        const itemIds = ['Align_objects', 'Group'];
        itemIds.forEach(itemId => {
          const item = this.toolbar?.items?.find(item => item.id === itemId);
          if (item) {
            item.disabled = false;
          }
        });
        //To enable distribute objects when selected items length is greater than 2
        var distIndex = this.toolbar?.items?.findIndex(item => item.id === 'Distribute_objects');
        if (distIndex !== undefined && distIndex !== -1) {
          this.toolbar.items[distIndex].disabled = selectedItems.length > 2 ? false : true;
        }
      }

    }
  }

  public historyChange(args: IHistoryChangeArgs): void {
    if (!this.diagram || !this.toolbar) return;
    const undoItem = this.toolbar.items.find(item => item.id === 'Undo');
    if (undoItem) {
      undoItem.disabled = (this.diagram.historyManager?.undoStack?.length ?? 0) > 0 ? false : true;
    }
    const redoItem = this.toolbar.items.find(item => item.id === 'Redo');
    if (redoItem) {
      redoItem.disabled = (this.diagram.historyManager?.redoStack?.length ?? 0) > 0 ? false : true;
    }
  }

  public updateToolbarState(isLocked: boolean) {
    if (!this.toolbar) return;
    const itemIds = ['Cut', 'Copy', 'Delete', 'Order', 'Rotate', 'Flip'];
    itemIds.forEach(itemId => {
      const item = this.toolbar.items.find(item => item.id === itemId);
      if (item) {
        item.disabled = isLocked;
      }
    });
    var Index = this.toolbar.items.findIndex(item => item.id === 'Lock');
    if (Index !== -1) {
      this.toolbar.items[Index].disabled = false;
    }
  }

  public enableItems() {
    if (!this.toolbar) return;
    const itemIds = ['Cut', 'Copy', 'Lock', 'Delete', 'Order', 'Rotate', 'Flip'];
    itemIds.forEach(itemId => {
      const item = this.toolbar.items.find(item => item.id === itemId);
      if (item) {
        item.disabled = false;
      }
    });
  }

  public disableMultiselectedItems() {
    if (!this.toolbar) return;
    const itemIds = ['Align_objects', 'Distribute_objects', 'Group'];
    itemIds.forEach(itemId => {
      const item = this.toolbar.items.find(item => item.id === itemId);
      if (item) {
        item.disabled = true;
      }
    });
  }

  public clicked(args: ClickEventArgs) {
    if (!args || !this.diagram || !this.toolbar) return;
    var item = (args as any).item.tooltipText;
    switch (item) {
      case 'Undo':
        this.diagram.undo();
        break;
      case 'Redo':
        this.diagram.redo();
        break;
      case 'Lock':
        this.lockObject();
        break;
      case 'Cut':
        this.diagram.cut();
        var pasteIndex = this.toolbar.items.findIndex(item => item.id === 'Paste');
        if (pasteIndex !== -1) {
          this.toolbar.items[pasteIndex].disabled = false;
        }
        break;
      case 'Copy':
        this.diagram.copy();
        var pasteIndex1 = this.toolbar.items.findIndex(item => item.id === 'Paste');
        if (pasteIndex1 !== -1) {
          this.toolbar.items[pasteIndex1].disabled = false;
        }
        break;
      case 'Paste':
        this.diagram.paste();
        break;
      case 'Delete':
        this.diagram.remove();
        break;
      case 'Select Tool':
        this.diagram.clearSelection();
        this.diagram.tool = DiagramTools.Default;
        break;
      case 'Text Tool':
        this.diagram.clearSelection();
        if (this.diagram.selectedItems) {
          this.diagram.selectedItems.userHandles = [];
        }
        this.diagram.drawingObject = { shape: { type: 'Text' }, };
        this.diagram.tool = DiagramTools.ContinuousDraw;
        break;
      case 'Pan Tool':
        this.diagram.clearSelection();
        this.diagram.tool = DiagramTools.ZoomPan;
        break;
      case 'New Diagram':
        this.diagram.clear();
        this.historyChange({} as any);
        break;
      case 'Print Diagram':
        this.printDiagram(args);
        break;
      case 'Save Diagram':
        this.download(this.diagram.saveDiagram());
        break;
      case 'Open Diagram':
        let fileSelectBtn = document.getElementsByClassName('e-file-select-wrap')[0]?.querySelector('button');
        if (fileSelectBtn) { fileSelectBtn.click(); }
        break;
    }
    this.diagram.dataBind();
  }

  public zoomMenuItems = [
    { text: 'Zoom In' },
    { text: 'Zoom Out' }, { text: 'Zoom to Fit' },
    { text: 'Zoom to 50%' },
    { text: 'Zoom to 100%' },
    { text: 'Zoom to 200%' },
  ]

  public zoomChange(args: any) {
    if (!this.diagram) return;
    var currentZoom = this.diagram.scrollSettings.currentZoom ?? 1;
    var zoom: ZoomOptions = {};
    switch (args.item.text) {
      case 'Zoom In':
        this.diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        break;
      case 'Zoom Out':
        this.diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        break;
      case 'Zoom to Fit':
        zoom.zoomFactor = 1 / currentZoom - 1;
        this.diagram.zoomTo(zoom);
        break;
      case 'Zoom to 50%':
        zoom.zoomFactor = (0.5 / currentZoom) - 1;
        this.diagram.zoomTo(zoom);
        break;

      case 'Zoom to 100%':
        zoom.zoomFactor = (1 / currentZoom) - 1;
        this.diagram.zoomTo(zoom);
        break;
      case 'Zoom to 200%':
        zoom.zoomFactor = (2 / currentZoom) - 1;
        this.diagram.zoomTo(zoom);
        break;
    }
  }

  public onConnectorSelect(args: any) {
    if (!this.diagram) return;
    this.diagram.clearSelection();
    this.diagram.drawingObject = { type: args.item.text };
    this.diagram.tool = DiagramTools.ContinuousDraw;
    if (this.diagram.selectedItems) {
      this.diagram.selectedItems.userHandles = [];
    }
    this.diagram.dataBind();
  }

  public conTypeItems = [
    { text: 'Straight', iconCss: 'e-icons e-line' },
    { text: 'Orthogonal', iconCss: 'sf-icon-orthogonal' },
    { text: 'Bezier', iconCss: 'sf-icon-bezier' }
  ];

  public shapesItems = [
    { text: 'Rectangle', iconCss: 'e-rectangle e-icons' },
    { text: 'Ellipse', iconCss: ' e-circle e-icons' },
    { text: 'Polygon', iconCss: 'e-line e-icons' }
  ];

  public onShapesSelect(args: any) {
    if (!this.diagram) return;
    this.diagram.clearSelection();
    this.diagram.drawingObject = { shape: { shape: args.item.text } };
    this.diagram.tool = DiagramTools.ContinuousDraw;
    if (this.diagram.selectedItems) {
      this.diagram.selectedItems.userHandles = [];
    }
    this.diagram.dataBind();
  }

  public groupItems = [
    { text: 'Group', iconCss: 'e-icons e-group-1' },
    { text: 'Ungroup', iconCss: 'e-icons e-ungroup-1' }
  ];

  public onSelectGroup(args: any) {
    if (!this.diagram) return;
    if (args.item.text === 'Group') {
      this.diagram.group();
    }
    else if (args.item.text === 'Ungroup') {
      this.diagram.unGroup();
    }
  }

  public alignItems = [
    { iconCss: 'sf-icon-align-left-1', text: 'Align Left' },
    { iconCss: 'sf-icon-align-center-1', text: 'Align Center' },
    { iconCss: 'sf-icon-align-right-1', text: 'Align Right' },
    { iconCss: 'sf-icon-align-top-1', text: 'Align Top' },
    { iconCss: 'sf-icon-align-middle-1', text: 'Align Middle' },
    { iconCss: 'sf-icon-align-bottom-1', text: 'Align Bottom' },
  ];

  public onSelectAlignObjects(args: any) {
    if (!this.diagram) return;
    var item = args.item.text;
    var alignType = item.replace('Align', '').trim();
    let capitalized = alignType.charAt(0).toUpperCase() + alignType.slice(1);
    this.diagram.align(capitalized as any);
  }

  public distributeItems = [
    { iconCss: 'sf-icon-distribute-vertical', text: 'Distribute Objects Vertically' },
    { iconCss: 'sf-icon-distribute-horizontal', text: 'Distribute Objects Horizontally' }
  ];

  public onSelectDistributeObjects(args: any) {
    if (!this.diagram) return;
    this.diagram.distribute(args.item.text === 'Distribute Objects Vertically' ? 'BottomToTop' : 'RightToLeft');
  }

  public orderItems = [
    { iconCss: 'e-icons e-bring-forward', text: 'Bring Forward' },
    { iconCss: 'e-icons e-bring-to-front', text: 'Bring To Front' },
    { iconCss: 'e-icons e-send-backward', text: 'Send Backward' },
    { iconCss: 'e-icons e-send-to-back', text: 'Send To Back' }
  ];

  public onSelectOrder(args: any) {
    if (!this.diagram) return;
    switch (args.item.text) {
      case 'Bring Forward':
        this.diagram.moveForward();
        break;
      case 'Bring To Front':
        this.diagram.bringToFront();
        break;
      case 'Send Backward':
        this.diagram.sendBackward();
        break;
      case 'Send To Back':
        this.diagram.sendToBack();
        break;
    }
  }

  public rotateItems = [
    { iconCss: 'e-icons e-transform-right', text: 'Rotate Clockwise' },
    { iconCss: 'e-icons e-transform-left', text: 'Rotate Counter-Clockwise' }
  ];

  public onSelectRotate(args: any) {
    if (!this.diagram) return;
    this.diagram.rotate(this.diagram.selectedItems, args.item.text === 'Rotate Clockwise' ? 90 : -90);
  }

  public flipItems = [
    { iconCss: 'e-icons e-flip-horizontal', text: 'Flip Horizontal' },
    { iconCss: 'e-icons e-flip-vertical', text: 'Flip Vertical' }
  ];

  public onSelectFlip(args: any) {
    this.flipObjects(args.item.text);
  }

  public flipObjects(flipType: string) {
    if (!this.diagram) return;
    var selectedObjects = this.diagram.selectedItems?.nodes?.concat(this.diagram.selectedItems?.connectors as any) || [];
    for (let i: number = 0; i < selectedObjects.length; i++) {
      selectedObjects[i].flip = flipType === 'Flip Horizontal' ? 'Horizontal' : 'Vertical';
    }
    this.diagram.dataBind();
  }

  public lockObject() {
    if (!this.diagram) return;
    let isChecked = false;
    // Kilitlenebilir nesneler
    const nodes = this.diagram.selectedItems?.nodes ?? [];
    const connectors = this.diagram.selectedItems?.connectors ?? [];

    for (let i: number = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let constraints = node.constraints ?? NodeConstraints.Default;
      if (constraints & NodeConstraints.Drag) {
        node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select | NodeConstraints.ReadOnly;
        isChecked = true;
      } else {
        node.constraints = NodeConstraints.Default;
        isChecked = false;
      }
    }

    for (let j: number = 0; j < connectors.length; j++) {
      let connector = connectors[j];
      let cconstraints = connector.constraints ?? ConnectorConstraints.Default;
      if (cconstraints & ConnectorConstraints.Drag) {
        connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select | ConnectorConstraints.ReadOnly;
        isChecked = true;
      } else {
        connector.constraints = ConnectorConstraints.Default;
        isChecked = false;
      }
    }

    this.updateToolbarState(isChecked);
    this.diagram.dataBind();
  }

  public zoomContent() {
    if (!this.diagram) return '100 %';
    return Math.round((this.diagram.scrollSettings.currentZoom ?? 1) * 100) + ' %'
  }

  public printDiagram(args: any) {
    if (!this.diagram) return;
    var options: IExportOptions = {};
    options.mode = 'Download';
    options.region = 'Content';
    options.multiplePage = this.diagram.pageSettings.multiplePage;
    options.pageHeight = this.diagram.pageSettings.height;
    options.pageWidth = this.diagram.pageSettings.width;
    this.diagram.print(options);
  }

  public onselectExport(args: any) {
    if (!this.diagram) return;
    var exportOptions: IExportOptions = {};
    exportOptions.format = args.item.text;
    exportOptions.mode = 'Download';
    exportOptions.region = 'PageSettings';
    exportOptions.fileName = 'Export';
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    this.diagram.exportDiagram(exportOptions);
  }

  public download(data: string): void {
    if ((window.navigator as any).msSaveBlob) {
      let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
    } else {
      let dataStr: string = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      let a: HTMLAnchorElement = document.createElement('a');
      a.href = dataStr;
      a.download = 'Diagram.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }

  public onUploadSuccess(args: { [key: string]: Object }): void {
    let file1 = args['file'] as { [key: string]: Object };
    let file: Blob = file1['rawFile'] as Blob;
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = this.loadDiagram.bind(this);
  }

  public loadDiagram(event: ProgressEvent<FileReader>): void {
    if (!this.diagram) return;
    const result = event.target?.result;
    if (typeof result === 'string') {
      this.diagram.loadDiagram(result);
    }
  }

  public items: ItemModel[] = [
    { text: 'JPG' }, { text: 'PNG' }, { text: 'SVG' }
  ];

  public addDisabled(args: MenuEventArgs) {
    this.onselectExport(args);
  }

  public diagramCreate(args: Object): void {
    paletteIconClick();
  }

}
