import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import { OGCMapTile, OSM, TileDebug } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { Feature, Overlay } from "ol";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat, useGeographic } from "ol/proj";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HelpService } from "app/services/help.service";

useGeographic();

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  @Input() longitude: number;
  @Input() latitude: number;
  @Input() manual: boolean = true;
  @Input() mapMarkers: any = [];
  @Input() predators: any;
  @Input() filterFlag: number;
  @Output() submit = new EventEmitter<any>();
  @Output() showFilterModel = new EventEmitter<any>();
  @ViewChild("map") public map!: Map;
  @ViewChild("modal") modal: TemplateRef<any>;
  public modalDialog: any;

  public loader = true;
  public data: any;
  public allPredators: any;

  constructor(private _helpService: HelpService) {}

  async ngOnInit() {
    setTimeout(async () => {
      this.initializeMap(this.predators);

      this.map.on("click", (e) => {
        var feature = e.map.forEachFeatureAtPixel(e.pixel, (feature) => {
          return feature;
        }) as Feature;
        if (feature) {
          const value = feature.getProperties().population;
          this.submit.emit(value);
        }
      });
    }, 10);
  }

  async initializeMap(data: any) {
    this.setPoint(data);
  }

  setPoint(data: any) {
    this.map = new Map({});
    const long = 20.85523;
    const lat = 44.031441;
    const iconFeature = new Feature({});

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "assets/images/icons/map-marker.png",
        width: 32,
        height: 32,
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    for (var i = 0; i < this.predators.length; i++) {
      const iconFeature = new Feature({
        geometry: new Point([
          this.predators[i].longitude,
          this.predators[i].latitude,
        ]),
        population: this.predators[i].id,
        rainfall: 500,
        class: "map-pointer",
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src:
            "assets/images/icons/map-marker_" +
            this.predators[i].id_predator +
            (this.predators[i].visible === 0 ? "_no_visible" : "") +
            ".png",
          width: 32,
          height: 32,
        }),
      });

      iconFeature.setStyle(iconStyle);

      vectorSource.addFeature(iconFeature);
    }

    let vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.map.setLayers([
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ]);

    this.map.setTarget("map");
    this.map.setView(
      new View({
        center: [long, lat],
        zoom: 80,
        maxZoom: 15,
      })
    );
  }

  createMarker(lng, lat, id) {
    return new Feature({
      geometry: new Point(fromLonLat([parseFloat(lng), parseFloat(lat)])),
      id: id,
    });
  }

  clickMap(item: any) {
    return true;
  }

  filter() {
    this.showFilterModel.emit();
  }
}
