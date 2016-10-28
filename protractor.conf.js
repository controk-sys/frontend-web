var PORT = process.env.PORT;
PORT = typeof(PORT) != "undefined" && PORT != "" ? PORT : 8888;

exports.config = {
    baseUrl: "http://localhost:" + PORT + "/",
    rootElement: ".controk", // http://stackoverflow.com/a/22518925
    directConnect: true,
    specs: ["tests/*-spec.js"]
};