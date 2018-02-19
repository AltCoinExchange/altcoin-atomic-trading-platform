// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  reducerLogger: false,
  console: true,
  encryptData: false,
  url: 'localhost:4200',
  apihost: "http://34.215.58.192:9984/api/v1/",
  wshost: "ws://34.215.58.192:9985/api/v1/streams/valid_transactions",
  appid: "DLiUBJ8NGMh6ojuFjwAqhF4L8D2hUsSH5CCcH1X648Fe",
  appkey: "GgZtjS6WPDNAePNM43ZdPoJ1Ap61RU3jnsgjHqELxgHX",
  orderApi: "http://localhost:3000",
  wsOrderApi: "ws://localhost:3002"
};
