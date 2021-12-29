import { Feature, GeoJsonObject } from "geojson";
import "leaflet-defaulticon-compatibility";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import React from "react";
import { GeoJSON as GeoJSONLayer, MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass
import csvdata from '../data/repeater.csv';

const csv2geojson = require('csv2geojson');

const Map = () => {

    const [geojson, setGeojson] = React.useState<GeoJsonObject | undefined>(undefined);
    React.useEffect(() => {
        if (csvdata) {
            csv2geojson.csv2geojson(csvdata, function (err: any, data: any) {

                if (err) console.error(err)
                setGeojson(data);
            });
        }
    }, [csvdata])



    const style = (feature: any) => {
        return {
            fillColor: '#ff0000',
            weight: 20,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,

        };
    }

    const BindPopup = (feature: Feature) => {
        const { properties } = feature;
        const keys = Object.keys(properties);
        const htmltrs = keys.map(key => properties[key] ? `<tr><td>${key}</td><td>${properties[key]}</td></tr>` : undefined);
        return `<table>${htmltrs.join('')}</table>`
    }

    return (
        <MapContainer center={[37.4355672, 126.9388092]} zoom={14} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
                {geojson && <GeoJSONLayer data={geojson} style={style} onEachFeature={(feature, layer) => layer.bindPopup(BindPopup(feature))} />}
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default Map

