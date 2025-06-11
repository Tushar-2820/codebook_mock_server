const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('data/db.json'); // <-- Your path

app.db = router.db; // Needed for json-server-auth

app.use(cors());
app.use(jsonServer.bodyParser);

// Optional: Role-based rules
const rules = auth.rewriter({
  "/products*" : "/444/*",
  "/featured_products*" : "/444/",
  "/users*" : "/600/",
  "/orders*" : "/660/"
});

app.use(rules);

app.use(auth);    // Add auth middleware
app.use(router);  // Add the router

app.listen(8000, () => {
  console.log('✅ JSON Server Auth running at http://localhost:8000');
});
