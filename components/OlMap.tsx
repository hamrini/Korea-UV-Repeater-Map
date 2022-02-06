import csvToGeojson from 'csv-geojson-conv';
import { GeoJsonObject, Point as GeoPoint, LineString as GeoPolyline, FeatureCollection } from "geojson";
import * as ol from 'ol';
import LayerSwitcher, {
    BaseLayerOptions,
    GroupLayerOptions, GroupSelectStyle, Options as LsOptions
} from "ol-layerswitcher";
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import * as OLControls from 'ol/control';
import { click } from 'ol/events/condition';
import Feature from 'ol/Feature';
import GeoJSON, { GeoJSONFeatureCollection } from "ol/format/GeoJSON";
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
import { DucplatedFeatureContextMenu, RepeaterInfoData } from './DuplicatedFeaturesContextMenu';
import { PointStyle, PointWAStyle, selectStyle } from './OlStyles';
import RepeaterDialog from './RepeaterDialog';




const OlMap = () => {
    const [dialogInfo, setDialogInfo] = React.useState<{ open: boolean, repeaterInfo?: RepeaterInfoData }>({ open: false, repeaterInfo: undefined });
    const [map, setMap] = React.useState<ol.Map>();
    const [pointGeojson, setPointGeojson] = React.useState<FeatureCollection<GeoPoint> | undefined>(undefined);
    const [polylineGeojson, setPolylineGeojson] = React.useState<FeatureCollection<GeoPolyline> | undefined>(undefined);

    const [contextMenuFeaturesData, setContextMenuFeaturesData] = React.useState<RepeaterInfoData[]>([]);
    const [contextMenu, setContextMenu] = React.useState<{ mouseX: number; mouseY: number } | null>(null);
    const [layerGroupRepeater, setLayerGroupRepeater] = React.useState<LayerGroup>();
    const [layerGroupRepeaterWideArea, setLayerGroupRepeaterWideArea] = React.useState<LayerGroup>();


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
            'title': '지역망 중계기',
            layers: [

            ]
        } as GroupLayerOptions)
        const LGRepeaterWideArea = new LayerGroup({
            'title': '광역망 중계기',
            layers: [

            ]
        } as GroupLayerOptions)
        setLayerGroupRepeater(LGRepeater);
        setLayerGroupRepeaterWideArea(LGRepeaterWideArea);


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
                new LayerGroup({
                    'title': '중계기',
                    layers: [
                        LGRepeater,
                        LGRepeaterWideArea
                    ]
                } as GroupLayerOptions),

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
                const geojson: FeatureCollection<GeoPoint> = csvToGeojson(csvdata) as FeatureCollection<GeoPoint>
                setPointGeojson(geojson);
            }
        });
        fetch('data/wa_link.json').then(async res => {
            const jsondata = await res.json();
            if (jsondata) {
                setPolylineGeojson(jsondata)

            }

        })

    }, [])

    React.useEffect(() => {
        if (map && polylineGeojson && polylineGeojson.features) {
            const source = new VectorSource({
                features: new GeoJSON({ dataProjection: 'EPSG:4326', featureProjection: "EPSG:3857" }).readFeatures(polylineGeojson)
            });
            const layer = new VectorLayer({
                source: source,
                style: new Style({
                    stroke: new Stroke({
                        color: '#ff3333',
                        width: 3,
                    }),
                })
            });
            if (layerGroupRepeaterWideArea) {
                layerGroupRepeaterWideArea.getLayers().push(layer);
            }
        }
    });
    React.useEffect(() => {
        if (map && pointGeojson) {
            const newGeojson = { ...pointGeojson };
            const newGeojsonWideArea = { ...pointGeojson };

            if (newGeojson.features !== undefined) {
                newGeojson.features = newGeojson.features.filter(feature => (feature?.properties?.Type !== '광역망'));
            }
            if (newGeojsonWideArea.features !== undefined) {
                newGeojsonWideArea.features = newGeojsonWideArea.features.filter(feature => (feature?.properties?.Type === '광역망'));
            }


            const vectorLayerRepeater = new VectorLayer({
                source: new Cluster({
                    source:
                        new VectorSource({
                            features: new GeoJSON({ dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).readFeatures(newGeojson)
                        }),

                }),
                style: PointStyle
            })
            const vectorLayerRepeaterWideArea = new VectorLayer({

                source:
                    new VectorSource({
                        features: new GeoJSON({ dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }).readFeatures(newGeojsonWideArea)
                    }),

                style: PointWAStyle
            })

            if (layerGroupRepeater) {
                layerGroupRepeater.getLayers().push(vectorLayerRepeater);
            }

            if (layerGroupRepeaterWideArea) {
                layerGroupRepeaterWideArea.getLayers().push(vectorLayerRepeaterWideArea);
            }


            // select interaction working on "click"
            const selectClick = new Select({
                condition: click,
                layers: [vectorLayerRepeater, vectorLayerRepeaterWideArea],
                multi: true,
                hitTolerance: 10,
                style: selectStyle,
            });
            map.addInteraction(selectClick);
            const callbackSelectHandler = (e: SelectEvent) => {

                if (e.selected.length > 0) {
                    const [mouseX, mouseY] = e.mapBrowserEvent.pixel;
                    const arr: RepeaterInfoData[] = [];
                    const featuresData = e.selected.forEach((selectedFeature) => {
                        if (selectedFeature.getProperties().features !== undefined) {
                            arr.push(...selectedFeature.getProperties().features.map((feature: any) => feature.getProperties()))
                        } else {
                            if (selectedFeature.length > 0) {
                                arr.push(...selectedFeature.map((feature: any) => feature.getProperties()))
                            } else {
                                arr.push(selectedFeature.getProperties())
                            }

                        }

                    }); debugger
                    e.preventDefault();
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
                    selectClick.getFeatures().clear();
                }
            };

            selectClick.on('select', callbackSelectHandler);

        }
    }, [map, pointGeojson])

    const setRepeaterInfo = (repeaterInfo: RepeaterInfoData) => {
        setDialogInfo({ open: true, repeaterInfo })
    }
    const handlerClose = () => setDialogInfo({ ...dialogInfo, open: false })
    return (
        <div id="map" style={{ width: '100%', height: '100%' }}>
            <DucplatedFeatureContextMenu contextMenu={contextMenu} setContextMenu={setContextMenu} contextMenuFeaturesData={contextMenuFeaturesData} setRepeaterInfo={setRepeaterInfo} />
            <RepeaterDialog open={dialogInfo.open} onClose={handlerClose} repeaterInfo={dialogInfo.repeaterInfo} />
        </div>

    )

}

export default OlMap
