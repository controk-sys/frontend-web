exports.config = {
  baseUrl: "http://localhost:" + (process.env.PORT || 8888) + "/",
  rootElement: ".controk", // http://stackoverflow.com/a/22518925
  directConnect: true,
  specs: ["tests/*-spec.js"]
}
