export const onRequest = async (context, next) => {
  const url = new URL(context.request.url);
  if (url.hostname === 'www.cgpacalculatorai.com') {
    url.hostname = 'cgpacalculatorai.com';
    return Response.redirect(url.toString(), 301);
  }
  return next();
};
