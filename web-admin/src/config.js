const dev = {
  EndpointRestAPI: 'https://apiamt.seorangeksa.com/api',
  EndpointGraphql: 'https://apiamt.seorangeksa.com/graphql',
  // EndpointWebsocket: 'ws://35.197.140.110:3030/graphql',
}

// const prod = {
//   EndpointRestAPI: 'http://localhost:3030/api',
//   EndpointGraphql: 'http://localhost:3030/graphql',
//   EndpointWebsocket: 'ws://localhost:3030/graphql',
// }

// const pertamina = {
//   EndpointRestAPI: 'http://192.168.1.7:3030/api',
//   EndpointGraphql: 'http://192.168.1.7:3030/graphql',
//   EndpointWebsocket: 'ws://192.168.1.7:3030/graphql',
// }

export default dev

// export default {
//   ...(process.env.REACT_APP_STAGE === 'dev' ? dev : prod ? prod : pertamina), // Default to dev if not set
// }
