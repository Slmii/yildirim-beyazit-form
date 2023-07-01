import { router } from 'server/trpc';
import { memberRouter } from './member.router';

export const appRouter = router({
	member: memberRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
