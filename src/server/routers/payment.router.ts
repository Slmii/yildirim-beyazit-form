import { protectedProcedure, router } from 'server/trpc';
import { z } from 'zod';

export const paymentsRouter = router({
	getById: protectedProcedure.input(z.object({ memberId: z.number() })).query(({ ctx, input }) => {
		return ctx.prisma.payment.findMany({
			where: {
				memberId: input.memberId
			}
		});
	})
});
