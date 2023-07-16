import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs';
import { prisma } from './prisma';

export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
	const { req } = opts;
	const session = getAuth(req);

	const userId = session.userId;
	const user = userId ? await clerkClient.users.getUser(userId) : null;

	return { user, prisma };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
