const stylesheets = [
  'css-js/reset.css',

  'css-js/header.css',
  'css-js/main.css',
  'css-js/footer.css',
];


stylesheets.forEach((stylesheet) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = stylesheet;
  document.head.appendChild(link);
});