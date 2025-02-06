import { DataAPIClient } from "@datastax/astra-db-ts";

const { NEXT_PUBLIC_DATASTAX_TOKEN, NEXT_PUBLIC_DATASTAX_URL } = process.env;

if (!NEXT_PUBLIC_DATASTAX_TOKEN || !NEXT_PUBLIC_DATASTAX_URL) {
    throw new Error("Missing Astra credentials");
}

// Initialize the client and get a "Db" object
const client = new DataAPIClient(NEXT_PUBLIC_DATASTAX_TOKEN, {
    httpOptions: {
        client: "fetch",
    },
});

const db = client.db(NEXT_PUBLIC_DATASTAX_URL);

// console.log(`* Connected to DB ${db.id}`);

export default db;