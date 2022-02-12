import { Geolocation } from "ol";
import { Control } from "ol/control";
import { fromLonLat } from "ol/proj";

export class RotateNorthControl extends Control {
    geoPosition;
    currentPosition?: number[];
    /**
     * @param {Object} [opt_options] Control options.
     */
    constructor(opt_options?: any) {
        const options = opt_options || {};

        const button = document.createElement('button');
        button.innerHTML = '<i class="fa-solid fa-crosshairs"></i>';

        const element = document.createElement('div');
        element.className = 'currentPosition ol-unselectable ol-control control-hidden';
        element.appendChild(button);

        super({
            element: element,
            target: options.target,
        });

        this.geoPosition = new Geolocation({
            trackingOptions: {
                enableHighAccuracy: true,
            },
            projection: this.getMap()?.getView().getProjection(),
        });
        this.geoPosition.setTracking(true)

        this.geoPosition.on("change:position", () => {
            this.currentPosition = this.geoPosition.getPosition()
            element.classList.remove("control-hidden");
        });



        button.addEventListener('click', this.handleMoveToMyPosition.bind(this), false);
    }

    handleMoveToMyPosition() {
        if (this.currentPosition !== undefined) {
            this?.getMap()?.getView()?.setCenter(fromLonLat(this.currentPosition));
            this?.getMap()?.getView().setZoom(15);
        }
    }
}
