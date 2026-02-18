import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir(): void {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function getFilePath(collection: string): string {
    return path.join(DATA_DIR, `${collection}.json`);
}

export function loadCollection<T>(collection: string): T[] {
    ensureDataDir();
    const filePath = getFilePath(collection);

    if (!fs.existsSync(filePath)) {
        return [];
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T[];
}

export function saveCollection<T>(collection: string, data: T[]): void {
    ensureDataDir();
    const filePath = getFilePath(collection);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}