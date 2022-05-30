const hostname = 'http://localhost:5000/';

function getDefaultHeaders() {
  const headers = new Headers();
  headers.append('Authorization', localStorage.getItem('bearerToken'));
  return headers;
}

function get(endpoint, query) {
  if (query != null) {
    endpoint += '?' + new URLSearchParams(query);
  }
  const request = new Request(
    endpoint,
    {
      method: 'GET',
      headers: getDefaultHeaders()
    }
  );
  return fetch(request);
}

function post(endpoint, data) {
  const headers = getDefaultHeaders();
  headers.append('Content-Type', 'application/json');
  const request = new Request(
    endpoint,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    }
  );
  return fetch(request);
}

const requests = {
  authentication: {
    endpoint: hostname + 'authentication/',
    post: function(data) { return post(this.endpoint, data) },
  },
  user: {
    endpoint: hostname + 'users/',
    getById: function(id) { return get(this.endpoint + id) },
    post: function(data) { return post(this.endpoint, data) },
    getLoggedUser: function() { return get(this.endpoint + 'me') },
  },
  jobOffers: {
    endpoint: hostname + 'job-offers/',
    get: function(query) { return get(this.endpoint, query) },
    getById: function(id) { return get(this.endpoint + id) },
    post: function(data) { return post(this.endpoint, data) },
    getResponsesById: function(id) { return get(this.endpoint + id + '/responses') },
  },
  jobOfferResponses: {
    endpoint: hostname + 'job-offer-responses/',
    post: function(data) { return post(this.endpoint, data) },
  }
}

export default requests;
