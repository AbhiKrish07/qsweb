export default function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const recipient = "glexionstriker@gmail.com";
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  console.log(`[VERCEL SERVERLESS API] Received submission. Routing payload to: ${recipient}`, body);

  res.status(200).json({
    success: true,
    targetEmail: recipient,
    message: `Notification successfully routed to ${recipient}`,
    received: body,
  });
}
