import UserRoutes from "./Users/routes.js";
import db from "./Database/index.js";
export default function Kambaz(app) {
  UserRoutes(app, db);
}
