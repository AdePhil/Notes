export const strip = htmlString => htmlString.replace(/<[^>]+>/g, "");
// export const debounce = (a, b, c) => {
//   var d, e;
//   return function() {
//     function h() {
//       d = null;
//       c || (e = a.apply(f, g));
//     }
//     var f = this,
//       g = arguments;
//     return (
//       clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
//     );
//   };
// };

export const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};
