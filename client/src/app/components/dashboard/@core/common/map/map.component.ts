import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
  @Output() submit = new EventEmitter<any>();
  @ViewChild("map") public map!: Map;

  public loader = true;
  public data: any;

  constructor() {}

  async ngOnInit() {
    setTimeout(async () => {
      this.initializeMap();

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

  async initializeMap() {
    this.setPoint();
  }

  setPoint() {
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
}
