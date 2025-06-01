const fs = require("fs");
const path = require("path");

const db = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json"), "utf-8"));

function toCSV(arr, type) {
    if (!arr || !arr.length) return "";
    const keys = Object.keys(arr[0]);
    const rows = arr.map(obj =>
        keys.map(k => {
            let val = obj[k];
            if (Array.isArray(val)) val = `"${val.join(";")}"`;
            if (typeof val === "object" && val !== null) val = `"${JSON.stringify(val)}"`;
            return val ?? "";
        }).join(",")
    );
    return [`type,${keys.join(",")}`, ...rows.map(r => `${type},${r}`)].join("\n");
}

const collections = ["users", "restaurants", "meals", "subscriptions", "orders"];
let allCSV = "";

collections.forEach(col => {
    if (db[col]) {
        allCSV += toCSV(db[col], col) + "\n\n";
    }
});

fs.writeFileSync(path.join(__dirname, "all_data.csv"), allCSV, "utf-8");
console.log("Exported all data to all_data.csv");