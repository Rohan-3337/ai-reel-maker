import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import {db} from '@/config/db';
import { Users } from '@/config/Schema';
import { eq } from 'drizzle-orm';

export const isnewUser = async (user) => {
    if (!user?.primaryEmailAddress?.emailAddress) {
        throw new Error("User email address is undefined");
    }

    const email = user.primaryEmailAddress.emailAddress;

    const result = await db.select().from(Users).where(eq(Users.email, email));

    if (!result.length) {
        await db.insert(Users).values({
            name: user.fullName,
            email: email,
            imageUrl: user?.imageUrl,  // Provide a fallback value if undefined
        });
        return true;  // Indicate that a new user was added
    }

    return false; // User already exists
};

