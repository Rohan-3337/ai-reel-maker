import { pgTable, serial,json, varchar } from "drizzle-orm/pg-core";


export const Users = pgTable("users",{
    id:serial("id").primaryKey(),
    name:varchar("name").notNull(),
    email:varchar("email").notNull(),
    imageUrl:varchar("imageUrl"),

});

export const VideoData = pgTable("videoData",{
    id:serial("id").primaryKey(),
    script:json("script"),
    audioFileUrl:varchar("audioFileUrl").notNull(),
    captions:json("captions").notNull(),
    imageList:varchar("imageList").array(),
    createdBy:varchar("createdBy").notNull(),

});