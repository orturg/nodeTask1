import { randomUUID } from "crypto";
import type { User } from "../types/user";
import type { CreateUserDto } from "../schemas/user.schema";
import { USERS, persistUsers } from "../storage";

export function findAll(): User[] {
    return USERS;
}

export function findById(id: string): User | undefined {
    return USERS.find((user) => user.id === id);
}

export function create(dto: CreateUserDto): User {
    const existing = USERS.find((u) => u.email === dto.email);
    if (existing) {
        throw { status: 409, message: "User with this email already exists" };
    }

    const user: User = { id: randomUUID(), ...dto };
    USERS.push(user);
    persistUsers();
    return user;
}