const origin = "https://website-production-06fcfdfd.up.railway.app";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.protocol !== "https:" || ["unitzero.ai", "www.unitzero.ai", "www.unitzero.com"].includes(url.hostname)) {
      return Response.redirect("https://unitzero.com" + url.pathname + url.search, 301);
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {status: 405, headers: {Allow: "GET, HEAD"}});
    }
    return fetch(origin + url.pathname + url.search, {
      method: request.method,
      redirect: "manual",
      cf: {cacheEverything: true, cacheTtl: 60}
    });
  }
};
