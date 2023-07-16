import { router } from 'server/trpc';
import { membersRouter } from './member.router';
import { paymentsRouter } from './payment.router';

export const appRouter = router({
	members: membersRouter,
	payments: paymentsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
