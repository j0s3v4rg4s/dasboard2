import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {PuntoDetalleService} from './punto-detalle.service';

declare var google: any;
declare var jQuery: any;
declare var firebase: any;
var infoMArker;

@Component({
    moduleId: module.id,
    selector: 'das-board2-app',
    templateUrl: 'das-board2.component.html',
    styleUrls: ['das-board2.component.css'],
    providers: [PuntoDetalleService]
})

export class DasBoard2AppComponent {
    title = 'das-board2 works!';
    items: FirebaseListObservable<any[]>;
    map: any;
    marker: any;

    constructor(af: AngularFire, private _detalleService: PuntoDetalleService) {
        this.items = af.database.list('/points');
    }

    ngOnInit() {
        this.loadMap();
        this.miEvento();
    }

    loadMap() {
        let bogota = new google.maps.LatLng(4.710988599999999, -74.072092);
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: bogota,
            zoom: 4
        });
    }


    save() {
        var storageRef = firebase.storage().ref();
        var file = jQuery('#file').get(0).files[0];
        var uploadTask = storageRef.child('images/' + file.name).put(file);
        uploadTask.on('state_changed', function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // See below for more detail
        }, function(error) {
            console.log(error)
            // Handle unsuccessful uploads
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            var downloadURL = uploadTask.snapshot;
            console.log(downloadURL)
        });
    }


    miEvento() {
        this.map.addListener('click', (event) => {
            let localitation = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
            if (this.marker == null) {
                this.marker = new google.maps.Marker({
                    position: localitation,
                    map: this.map,
                    title: 'Hello World!'
                });
            }
            else {
                this.marker.setPosition(localitation);
            }

            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'location': localitation }, (result, status) => {
                if (status === google.maps.GeocoderStatus.OK) {

                    this._detalleService.getMap(result[0].address_components).then(mapas => {
                        mapas['lat'] = result[0].geometry.location.lat();
                        mapas['lng'] = result[0].geometry.location.lng();
                        mapas['addres'] = result[0].formatted_address;
                        infoMArker = mapas;
                    });
                }
            });
        });
    }


    centerPoint(lat, lng) {
        let localitation = new google.maps.LatLng(lat, lng);
        this.map.setCenter(localitation);
        this.map.setZoom(16);
    }
}
