import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({ shape }) {
		return shape;
	}
});

// Check if the user is signed in, otherwise throw a UNAUTHORIZED CODE
const isAuthed = t.middleware(({ next, ctx }) => {
	if (!ctx.auth.userId) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx: {
			auth: ctx.auth
		}
	});
});

// Base router, procedure helpers and middleware
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
