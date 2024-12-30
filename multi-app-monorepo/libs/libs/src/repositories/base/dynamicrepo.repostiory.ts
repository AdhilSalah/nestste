import { User } from "../../Entities/user.entity";
import { MongoDBRepository } from "./mongo.repository";
import { BaseRepository } from "../../repository.interface";
import { SQLiteRepository } from "./sql.repository";
export const switcher = {
    "Mongo":MongoDBRepository,
    "SQL":SQLiteRepository
}

//here pass the env var
export const Repository = switcher["SQL"]

