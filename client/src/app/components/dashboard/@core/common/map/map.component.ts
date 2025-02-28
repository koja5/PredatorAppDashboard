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

  constructor() {}

  async ngOnInit() {
    setTimeout(async () => {
      this.initializeMap();

      if (this.manual) {
        this.map.on("singleclick", function (this: MapComponent, evt) {
          const coordinate = evt.coordinate;
          coordinate[1] -= 0.00007;
          const iconFeature = new Feature({
            geometry: new Point([coordinate[0], coordinate[1]]),
            population: 4000,
            rainfall: 500,
          });

          const iconStyle = new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: "assets/icon/map-marker.png",
              width: 40,
              height: 40,
            }),
          });

          iconFeature.setStyle(iconStyle);

          const vectorSource = new VectorSource({
            features: [iconFeature],
          });

          const vectorLayer = new VectorLayer({
            source: vectorSource,
          });

          evt.map.setLayers([
            new TileLayer({
              source: new OSM(),
            }),
            vectorLayer,
          ]);
          evt.map.setView(
            new View({
              center: [coordinate[0], coordinate[1]],
              zoom: 80,
              maxZoom: 18,
            })
          );
          localStorage.setItem(
            "coordination",
            JSON.stringify({ log: coordinate[0], lat: coordinate[1] })
          );
        });
      }
    }, 10);
  }

  async initializeMap() {
    this.setPoint();
    // if (!this.longitude && !this.latitude) {
    //   const geolocation = await Geolocation.getCurrentPosition();
    //   this.setPoint(geolocation.coords.longitude, geolocation.coords.latitude);
    // } else {
    //   this.setPoint(this.longitude, this.latitude);
    // }
  }

  setPoint() {
    this.map = new Map({});
    const long = 20.85523;
    const lat = 44.031441;
    const iconFeature = new Feature({
      geometry: new Point([long, lat]),
      population: 4000,
      rainfall: 500,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "assets/images/icons/map-marker.png",
        width: 40,
        height: 40,
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    for (var i = 0; i < this.predators.length; i++) {
      // var element = document.getElementById("marker" + i);
      // var marker = new Overlay({
      //   position: [this.predators[i].longitude, this.predators[i].latitude],
      //   positioning: "center-center",
      //   element: element!,
      //   stopEvent: false,
      // });
      // this.map.addOverlay(marker);

      const iconFeature = new Feature({
        geometry: new Point([
          this.predators[i].longitude,
          this.predators[i].latitude,
        ]),
        population: 4000,
        rainfall: 500,
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: "assets/images/icons/map-marker.png",
          width: 40,
          height: 40,
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
    console.log(item);
  }

  async getMyLocation() {
    // const geolocation = await Geolocation.getCurrentPosition();
    // this.longitude = geolocation.coords.longitude;
    // this.latitude = geolocation.coords.latitude;
    // localStorage.setItem(
    //   "coordination",
    //   JSON.stringify({
    //     log: this.longitude,
    //     lat: this.latitude,
    //   })
    // );
    // this.loader = false;
    // setTimeout(() => {
    //   this.loader = true;
    //   this.ngOnInit();
    // }, 100);
  }
}
