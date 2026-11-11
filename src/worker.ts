import server from "@astrojs/cloudflare/entrypoints/server";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (url.hostname === "www.cgpacalculatorai.com") {
      url.hostname = "cgpacalculatorai.com";
      return Response.redirect(url.toString(), 301);
    }
    return server.fetch(request, env, ctx);
  },
};
