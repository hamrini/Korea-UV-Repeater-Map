import Feature from 'ol/Feature';
import { Geometry } from 'ol/geom';
import 'ol/ol.css';
import RenderFeature from 'ol/render/Feature';
import { Circle, Fill, RegularShape, Stroke, Style, Text } from "ol/style";
import OlMap from './OlMap';


export const PointStyle = (feature: RenderFeature | Feature<Geometry>, resolution: number): Style => {
    if (feature !== null && resolution) {

        const size = feature.get('features').length;
        const { Callsign } = size > 0 ? feature.get('features')[0].getProperties() : "";

        return new Style({
            image: (resolution > 300) ?
                new Circle({
                    radius: 14,
                    fill: new Fill({ color: size > 30 ? '#ff3333D0' : size > 10 ? '#ffcc33D0' : '#33cc33D0' }),
                    stroke: new Stroke({ color: '#fff', width: 1 })
                }) :
                new RegularShape({
                    points: 3,
                    radius: 12,
                    fill: new Fill({ color: '#33cc33D0' }),
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
                    text: Callsign ? Callsign : "",
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

export const PointWAStyle = (feature: RenderFeature | Feature<Geometry>, resolution: number): Style | Style[] => {

    const { Name, Callsign } = feature.getProperties();
    if (feature !== null && resolution) {

        return [new Style({
            image:
                new RegularShape({
                    points: 6,
                    radius: 12,
                    fill: new Fill({ color: '#ff3333' }),
                    stroke: new Stroke({ color: '#fff', width: 1 })
                })
            , text:
                new Text({
                    text: "광",
                    fill: new Fill({ color: '#FFFFFF' }),
                    stroke: new Stroke({ color: '#000', width: 3 }),
                    offsetY: 1,
                    font: 'bold 14px "Apple Gothic", "Malgun Gothic",  sans-serif',
                    textAlign: 'center',
                    textBaseline: 'middle',

                })

        }), new Style({
            text:
                new Text({
                    text: Name ? `${Name}` : "",
                    fill: new Fill({ color: '#ff6666' }),
                    stroke: new Stroke({ color: '#000', width: 3 }),
                    offsetY: 22,
                    font: 'bold 14px "Apple Gothic", "Malgun Gothic",  sans-serif',
                    textAlign: 'center',
                    textBaseline: 'middle',

                })
        })]

    } else {
        return new Style()
    }
}
const selectedStyle = (feature: RenderFeature | Feature<Geometry>, resolution: number): Style => {
    const { Name } = feature.get('features')[0].getProperties();

    return new Style({
        image: new Circle({
            radius: 10,
            fill: new Fill({ color: '#00ff00a0' }),
            stroke: new Stroke({ color: '#ff0000', width: 2 })
        }),
        text: new Text({
            text: Name ? Name : "",
            fill: new Fill({ color: '#00ff00' }),
            stroke: new Stroke({ color: '#ff0000', width: 3 }),
            offsetY: -20,
            font: 'bold 20px "Malgun Gothic", "Apple Gothic", sans-serif',
            textAlign: 'center',
            textBaseline: 'middle',

        }),
        fill: new Fill({
            color: '#eeeeee',
        }),
        stroke: new Stroke({
            color: 'rgba(255, 255, 255, 0.7)',
            width: 2,
        }),
    });
}

export const selectStyle = (feature: RenderFeature | Feature<Geometry>, resolution: number): Style => {
    const color = feature.get('COLOR') || '#eeeeee';
    const selected = selectedStyle(feature, resolution);
    selected.getFill().setColor(color);
    return selected;
}