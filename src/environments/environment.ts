// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'Local Environment',
  // apiURL: 'https://lpuat.ujjivan.com/', //UAT
  /*   apiURL: 'http://172.30.2.106:9092/', */ //raghul
  // apiURL: 'http://172.30.3.174:9093/', //rajesh
  apiURL: 'http://172.30.1.116:9093/', //ganesh
  // apiURL: 'https://fpsit.ujjivan.com/', //SIT'
  pointLocal: true,
  VAPT: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
