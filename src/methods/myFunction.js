export function takeoutToken() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
}

export function clearCookie() {
  document.cookie = 'hexToken=;expires=;';
}

export function setCookie(token, expired) {
  document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
}

export function currency(num) {
  const n = parseInt(num, 10);
  return `${n
    .toFixed(0)
    .replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}
