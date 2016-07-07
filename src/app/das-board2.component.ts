import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {PuntoDetalleService} from './punto-detalle.service';

declare var google: any;
declare var jQuery: any;
declare var firebase: any;
declare var swal: any;
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
  infoMArker: any;
  name: string;
  description: string;

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
    if (this.infoMArker == null) {
      swal("Error", "No selected place", "error")
    }
    else {
      let imconpleteFill = "";
      let file = jQuery('#file').get(0).files[0];
      imconpleteFill = validador(this.name, imconpleteFill, 'name')
      imconpleteFill = validador(this.description, imconpleteFill, 'description')
      imconpleteFill = validador(file, imconpleteFill, 'image file')

      if (imconpleteFill != "") {

        swal({
          title: "Warning",
          text: "The following fields are empty: " + imconpleteFill + ". Are you sure to save place?",
          type: "warning",
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonText: "Yes"
        }, () => {
          if (file != null) {
            let storageRef = firebase.storage().ref();
            let uploadTask = storageRef.child('images/' + file.name).put(file);
            uploadTask.on('state_changed', function(snapshot) {
              // Observe state change events such as progress, pause, and resume
              // See below for more detail
            }, function(error) {
              console.log(error)
              // Handle unsuccessful uploads
            }, () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              var downloadURL = uploadTask.snapshot.downloadURL;
              this.savePlace(downloadURL, uploadTask.snapshot.a.fullPath)
            });
          }
          else {
            this.savePlace("", "")
          }
        });
      }
      else {
        let storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child('images/' + file.name).put(file);
        uploadTask.on('state_changed', function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, function(error) {
          console.log(error)
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          var downloadURL = uploadTask.snapshot.downloadURL;
          this.savePlace(downloadURL, uploadTask.snapshot.a.fullPath)
        });
      }
    }
  }


  savePlace(url: string, path: string) {
    let obejct = {
      'description': this.description + "",
      'localitation': this.infoMArker,
      'imgurl': url,
      'path': path
    };

    firebase.database().ref('points/' + this.name).set(obejct);
    this.marker.setMap(null);
    this.marker = null;
    this.name = null;
    this.description = null;
    this.infoMArker = null;
    swal("Success", "The place was saved", "success")


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
            mapas['place_id'] = result[0].place_id;
            this.infoMArker = mapas;
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

function validador(variable, mensaje, dato) {
  if (mensaje == "" && variable == null)
    mensaje = dato;
  else if (variable == null)
    mensaje += ", " + dato;
  return mensaje
}
