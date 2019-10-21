import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class WeatherCard extends Component {
  @tracked latitude = this.position.latitude;
  @tracked longitude = this.position.longitude;

  get position() {
    console.log('getting position')
    return new Promise(function (resolve, reject) {
      console.log('promise')
      if (navigator) {
        console.log('nav')
        navigator.geolocation.getCurrentPosition(p => {
          console.log('got position')
          resolve({
            latitude: p.coords.latitude,
            longitude: p.coords.longitude
          });
        });
      } else {
        reject();
      }
    });
  }
}
