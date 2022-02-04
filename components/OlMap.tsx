import csvToGeojson from 'csv-geojson-conv';
import { GeoJsonObject } from "geojson";
import * as ol from 'ol';
import LayerSwitcher, {
    BaseLayerOptions,
    GroupLayerOptions, GroupSelectStyle, Options as LsOptions
} from "ol-layerswitcher";
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import * as OLControls from 'ol/control';
import { click } from 'ol/events/condition';
import Feature from 'ol/Feature';
import GeoJSON from "ol/format/GeoJSON";
import Geolocation from 'ol/Geolocation';
import { Geometry, Point, Polygon } from 'ol/geom';
import Select, { SelectEvent } from 'ol/interaction/Select';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from "ol/layer/Vector";
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import { Cluster, XYZ } from 'ol/source';
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from 'ol/style/Circle';
import React from "react";
import { DucplatedFeatureContextMenu, DuplicatedFeaturesContextData } from './DuplicatedFeaturesContextMenu';
import { PointStyle, selectStyle } from './OlStyles';




const OlMap = () => {
    const [map, setMap] = React.useState<ol.Map>();
    const [geojson, setGeojson] = React.useState<GeoJsonObject | undefined>(undefined);
    const [contextMenuFeaturesData, setContextMenuFeaturesData] = React.useState<DuplicatedFeaturesContextData[]>([]);
    const [contextMenu, setContextMenu] = React.useState<{ mouseX: number; mouseY: number } | null>(null);
    const [layerGroupRepeater, setLayerGroupRepeater] = React.useState<LayerGroup>();
    React.useEffect(() => {
        const view = new ol.View({
            center: fromLonLat([126.9388092, 37.4355672]),
            zoom: 6,
            maxZoom: 19,
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

        const positionLayer = new VectorLayer({
            source: new VectorSource({
                features: [accuracyFeature, positionFeature],
            }),
            zIndex: 1000
        })
        const LGRepeater = new LayerGroup({
            'title': '중계기',
            layers: [

            ]
        } as GroupLayerOptions)
        setLayerGroupRepeater(LGRepeater);

        var olmap: ol.Map = new ol.Map({
            target: 'map',

            layers: [
                new LayerGroup({
                    'title': 'Base maps',
                    layers: [
                        new LayerGroup({
                            title: 'OSM',
                            type: 'base',
                            combine: true,
                            visible: true,
                            layers: [
                                new TileLayer({
                                    source: new XYZ({
                                        url: 'https://tile.osmand.net/hd/{z}/{x}/{y}.png',
                                        crossOrigin: null,
                                        tilePixelRatio: 2,
                                        maxZoom: 19,
                                        tileSize: 256,

                                        attributionsCollapsible: false
                                    })
                                })]
                        } as GroupLayerOptions),
                    ]
                } as BaseLayerOptions),
                new LayerGroup({
                    'title': 'GPS 본인 위치',
                    layers: [
                        positionLayer
                    ]
                } as GroupLayerOptions),
                LGRepeater

            ], view
        });
        olmap.addControl(new OLControls.ScaleLine({ units: 'metric' }));
        const groupStyle: GroupSelectStyle = 'children';
        const opts: LsOptions = {
            reverse: true,
            groupSelectStyle: groupStyle,
            startActive: true,
            activationMode: 'click'
        };
        const layerSwitcher = new LayerSwitcher(opts);

        olmap.addControl(layerSwitcher);

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
            const vectorLayerRepeater = new VectorLayer({
                source: new Cluster({
                    source:
                        new VectorSource({
                            features: new GeoJSON({ dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).readFeatures(geojson)
                        }),

                }),
                style: PointStyle
            })

            if (layerGroupRepeater)
                layerGroupRepeater.getLayers().push(vectorLayerRepeater);

            // select interaction working on "click"
            const selectClick = new Select({
                condition: click,
                layers: [vectorLayerRepeater],
                multi: true,
                style: selectStyle,
            });
            map.addInteraction(selectClick);
            const callbackSelectHandler = (e: SelectEvent) => {

                if (e.selected.length > 0) {
                    const [mouseX, mouseY] = e.mapBrowserEvent.pixel;
                    const arr: DuplicatedFeaturesContextData[] = [];
                    const featuresData = e.selected.forEach((selectedFeature) => {
                        arr.push(...selectedFeature.getProperties().features.map((feature: any) => feature.getProperties()))

                    });
                    setContextMenuFeaturesData(arr);
                    setContextMenu(
                        contextMenu === null
                            ? {
                                mouseX,
                                mouseY
                            }
                            : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                            // Other native context menus might behave different.
                            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                            null
                    );
                    // innoMap?.getInteraction()?.getFeatures().clear();
                }
            };

            selectClick.on('select', callbackSelectHandler);

        }
    }, [map, geojson])

    return (
        <div id="map" style={{ width: '100%', height: '100%' }}>
            <DucplatedFeatureContextMenu contextMenu={contextMenu} setContextMenu={setContextMenu} contextMenuFeaturesData={contextMenuFeaturesData} />

        </div>

    )

}

export default OlMap
