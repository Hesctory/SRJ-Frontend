import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// 🔥 IMPORTANTE: middleware para exponer X-Total-Count
server.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  next();
});

// ⚠️ usa el router DESPUÉS del middleware
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server running on port 3000");
});