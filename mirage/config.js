export default function() {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  this.urlPrefix = "http://localhost:3000";
  this.post("/signup", async (schema, request) => {
    let attrs = JSON.parse(request.requestBody);
    if (attrs.email === attrs.email_confirmation) {
      const user = await schema.users.create(attrs);
      //not mocking authentication token here, that's a server-side implementation detail
      return user;
    } else {
      return new Response(400, { errors: ["not the same email"] });
    }
  });
  this.post("auth/login", async (schema, request) => {
    let attrs = JSON.parse(request.requestBody).user;
    const user = await schema.users.findBy({ email: attrs.email });
    if (user.password === attrs.password && user !== undefined) {
      const token = "Bearer awesome-auth-token";
      this.token = token;
      return {
        token
      };
    } else {
      return new Response(400, { errors: ["wrong username or password"] });
    }
  });
}
