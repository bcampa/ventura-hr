const hostname = 'http://localhost:5000/';

function getDefaultHeaders() {
  const headers = new Headers();
  headers.append('Authorization', localStorage.getItem('bearerToken'));
  return headers;
}

function get(endpoint) {
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
    post: function(data) { return post(this.endpoint, data) }
  },
  user: {
    endpoint: hostname + 'users/',
    getById: function(id) { return get(this.endpoint + id) },
    post: function(data) { return post(this.endpoint, data) },
    getLoggedUser: function() { return get(this.endpoint + 'me') },
  }
}

export default requests;
