export function getSessionCookieOptions(_req: any) {
  return {
    path: '/',
    httpOnly: true,
    secure: false,
  } as const;
}
