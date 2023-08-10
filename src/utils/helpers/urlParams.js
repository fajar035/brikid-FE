export function encodeQueryData(params) {
  const ret = [];
  for (const d in params)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(params[d]));
  return ret.join("&");
}
