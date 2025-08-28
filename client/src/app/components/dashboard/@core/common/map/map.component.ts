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
import { StorageService } from "app/services/storage.service";

useGeographic();

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  @Input() longitude: number;
  @Input() latitude: number;
  @Input() manual: boolean = false;
  @Input() mapMarkers: any = [];
  @Input() predators: any;
  @Input() filterFlag: number;
  @Input() mapSmall: boolean;
  @Output() submit = new EventEmitter<any>();
  @Output() showFilterModel = new EventEmitter<any>();
  @ViewChild("map") public map!: Map;
  @ViewChild("modal") modal: TemplateRef<any>;
  public modalDialog: any;

  public loader = true;
  public data: any;
  public allPredators: any;

  constructor(
    private _helpService: HelpService,
    private _storageService: StorageService
  ) {}

  async ngOnInit() {
    setTimeout(async () => {
      this.initializeMap(this.predators);

      this.map.on("click", (e) => {
        if (this.manual) {
          this.map.on("singleclick", (evt) => {
            const coordinate = evt.coordinate;
            // coordinate[1] += 0.00011;
            const view = this.map.getView();
            if (view["values_"] && view["values_"].zoom) {
              if (view["values_"].zoom / 10000 > 0.0017) {
                coordinate[1] += view["values_"].zoom / 10000 - 0.0017;
              } else {
                const difference = view["values_"].zoom / 10000 - 0.00025;
                coordinate[1] += view["values_"].zoom / 10000 - difference;
              }
            } else {
              coordinate[1] += 0.00011;
            }
            this.predators[0].longitude = coordinate[0];
            this.predators[0].latitude = coordinate[1];
            this.setPoint(this.predators, evt.map);
            this._storageService.setLocalStorage("coordination", {
              log: coordinate[0],
              lat: coordinate[1],
            });
          });
        } else {
          var feature = e.map.forEachFeatureAtPixel(e.pixel, (feature) => {
            return feature;
          }) as Feature;
          if (feature) {
            const value = feature.getProperties().population;
            this.submit.emit(value);
          }
        }
      });
    }, 10);
  }

  async initializeMap(data: any) {
    this.setPoint(data);
  }

  setPoint(data: any, map?: any) {
    if (map) {
      this.map = map;
    } else {
      this.map = new Map({});
    }
    if (!data) {
      data = this.predators;
    }
    const long = 13.421735;
    const lat = 47.537312;

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

    for (var i = 0; i < data.length; i++) {
      const iconFeature = new Feature({
        geometry: new Point([data[i].longitude, data[i].latitude]),
        population: data[i].id,
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
            data[i].id_predator +
            (data[i].visible === 0 ? "_no_visible" : "") +
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
    const view = this.map.getView();
    this.map.setView(
      new View({
        center: [
          data.length ? data[0].longitude : long,
          data.length ? data[0].latitude : lat,
        ],
        zoom: view && view["values_"].zoom ? view["values_"].zoom : 7,
        maxZoom: 18,
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
