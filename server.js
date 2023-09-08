const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev: false }); // Use the production build

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/login') {
      app.render(req, res, '/login', query);
    } else if (pathname === '/Timesheets/Approve') {
      app.render(req, res, '/Timesheets/Approve', query);
    } else if (pathname === '/Timesheets/Submit') {
      app.render(req, res, '/Timesheets/Submit', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
