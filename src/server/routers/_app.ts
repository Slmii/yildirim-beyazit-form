import { router } from 'server/trpc';
import { formRouter } from './form';

export const appRouter = router({
	form: formRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
