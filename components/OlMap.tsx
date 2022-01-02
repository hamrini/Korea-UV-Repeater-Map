import csvToGeojson from 'csv-geojson-conv';
import { GeoJsonObject } from "geojson";
import "leaflet-defaulticon-compatibility";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import * as ol from 'ol';
import Feature from 'ol/Feature';
import GeoJSON from "ol/format/GeoJSON";
import { Geometry, Point, Polygon } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import Tile from 'ol/layer/Tile';
import VectorLayer from "ol/layer/Vector";
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import RenderFeature from 'ol/render/Feature';
import { Cluster, XYZ } from 'ol/source';
import OSM from 'ol/source/OSM';
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";
import React from "react";
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass
import Geolocation from 'ol/Geolocation';
import CircleStyle from 'ol/style/Circle';



const PointStyle = (feature: RenderFeature | Feature<Geometry>, resolution: number): Style => {
    if (feature !== null && resolution) {

        const size = feature.get('features').length;
        const { Name } = size > 0 ? feature.get('features')[0].getProperties() : "";
        return new Style({
            image: (resolution > 300) ?
                new Circle({
                    radius: 14,
                    fill: new Fill({ color: '#ffcc3380' }),
                    stroke: new Stroke({ color: '#fff', width: 1 })
                }) :
                new Circle({
                    radius: 5,
                    fill: new Fill({ color: '#ff3333' }),
                    stroke: new Stroke({ color: '#fff', width: 1 })
                })
            , text: (resolution > 300) ?
                new Text({
                    text: `${size.toString()}`,
                    fill: new Fill({ color: '#fff' }),
                    stroke: new Stroke({ color: '#000', width: 2 }),

                    font: 'bold 14px Arial',
                    textAlign: 'center',
                    textBaseline: 'middle',

                }) :
                new Text({
                    text: Name ? Name : "",
                    fill: new Fill({ color: '#ffcc33' }),
                    stroke: new Stroke({ color: '#000', width: 3 }),
                    offsetY: -15,
                    font: 'bold 14px "Malgun Gothic", "Apple Gothic", sans-serif',
                    textAlign: 'center',
                    textBaseline: 'middle',

                })
            ,

        })
    } else {
        return new Style()
    }
}

const OlMap = () => {
    const [map, setMap] = React.useState<ol.Map>();
    const [geojson, setGeojson] = React.useState<GeoJsonObject | undefined>(undefined);
    React.useEffect(() => {
        const view = new ol.View({
            center: fromLonLat([126.9388092, 37.4355672]),
            zoom: 6,
            maxZoom: 19
        })
        const geolocation = new Geolocation({
            // enableHighAccuracy must be set to true to have the heading value.
            trackingOptions: {
                enableHighAccuracy: true,
            },
            projection: view.getProjection(),
        });
        geolocation.setTracking(true)
        const accuracyFeature = new Feature<Polygon>();
        geolocation.on('change:accuracyGeometry', function () {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry() || undefined);
        });

        const positionFeature = new Feature<Geometry>();
        positionFeature.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 6,
                    fill: new Fill({
                        color: '#3399CC',
                    }),
                    stroke: new Stroke({
                        color: '#fff',
                        width: 2,
                    }),
                }),
            })
        );

        geolocation.on('change:position', function () {
            const coordinates = geolocation.getPosition();
            positionFeature.setGeometry(coordinates ? new Point(coordinates) : undefined);
        });

        var olmap: ol.Map = new ol.Map({
            target: 'map',

            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                new TileLayer({
                    source: new XYZ({
                        url: 'https://tile.osmand.net/hd/{z}/{x}/{y}.png',
                        crossOrigin: null,
                        tilePixelRatio: 2,
                        maxZoom: 19,
                        tileSize: 256,

                        attributionsCollapsible: false
                    })
                }),
                new VectorLayer({
                    source: new VectorSource({
                        features: [accuracyFeature, positionFeature],
                    }),
                    zIndex: 1000
                })
            ],
            view
        });

        setMap(olmap)

        fetch('data/repeater.csv').then(async res => {
            const csvdata = await res.text();
            if (csvdata) {
                const geojson = csvToGeojson(csvdata)
                setGeojson(geojson);
            }
        });

    }, [])

    React.useEffect(() => {
        if (map && geojson) {
            const layer = new VectorLayer({
                source: new Cluster({
                    source:
                        new VectorSource({
                            features: new GeoJSON({ dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).readFeatures(geojson)
                        }),

                }),
                style: PointStyle
            })
            map.addLayer(layer)
        }
    }, [map, geojson])

    return (
        <div id="map" style={{ width: '100%', height: '100%' }}>
        </div>

    )

}

export default OlMap
