/**
 * GitHub OAuth worker for Sveltia / Decap CMS on Cloudflare.
 *
 * Implements the Netlify/Decap-compatible popup handshake, which Sveltia CMS
 * also understands. The CMS opens this worker's /auth endpoint in a popup;
 * after the user authorizes on GitHub, /callback exchanges the code for a
 * token and postMessages it back to the CMS window.
 *
 * Required secrets (set with `wrangler secret put ...`):
 *   GITHUB_CLIENT_ID      - from your GitHub OAuth App
 *   GITHUB_CLIENT_SECRET  - from your GitHub OAuth App
 *
 * The GitHub OAuth App's "Authorization callback URL" must be:
 *   https://<this-worker-subdomain>.workers.dev/callback
 */

const GITHUB_AUTHORIZE = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope: "repo,user",
        // A random state value mitigates CSRF.
        state: crypto.randomUUID(),
      });
      return Response.redirect(`${GITHUB_AUTHORIZE}?${params.toString()}`, 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Missing ?code", { status: 400 });
      }

      const tokenRes = await fetch(GITHUB_TOKEN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "sveltia-cms-auth-worker",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const data = await tokenRes.json();
      const status = data.access_token ? "success" : "error";
      const payload = data.access_token
        ? { token: data.access_token, provider: "github" }
        : data;

      const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:${status}:' + ${JSON.stringify(JSON.stringify(payload))},
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
<p>Completing sign-in&hellip; you can close this window.</p>
</body></html>`;

      return new Response(html, {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    return new Response("Top Gear Decide CMS auth worker. Use /auth.", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
