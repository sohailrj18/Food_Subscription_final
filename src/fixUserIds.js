import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "data", "db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

const oldToNewId = {};
let nextId = 1;

// Update user IDs and build mapping
db.users.forEach((user) => {
    const oldId = user.id;
    const newId = String(nextId++);
    oldToNewId[oldId] = newId;
    user.id = newId;
});

// Update userId references in orders
if (db.orders) {
    db.orders.forEach((order) => {
        if (order.userId && oldToNewId[order.userId]) {
            order.userId = oldToNewId[order.userId];
        }
    });
}

// Update users references in subscriptions (if any)
if (db.subscriptions) {
    db.subscriptions.forEach((sub) => {
        if (Array.isArray(sub.users)) {
            sub.users = sub.users.map((uid) => oldToNewId[uid] || uid);
        }
    });
}

// Write back to file
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
console.log("User IDs have been updated to be sequential!");