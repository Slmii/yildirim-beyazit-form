import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from 'server/routers/_app';
import superjson from 'superjson';

function getBaseUrl() {
	if (typeof window !== 'undefined') {
		// browser should use relative path
		return '';
	}

	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			/**
			 * Transformer used for data de-serialization from the server
			 * @see https://trpc.io/docs/data-transformers
			 **/
			transformer: superjson,

			queryClientConfig: {
				defaultOptions: {
					queries: {
						retry: false,
						staleTime: 1000 * 60 * 60 * 1 // 1 hour
					},
					mutations: {
						retry: false
					}
				}
			},

			/**
			 * Links used to determine request flow from client to server
			 * @see https://trpc.io/docs/links
			 * */
			links: [
				httpBatchLink({
					/**
					 * If you want to use SSR, you need to use the server's full URL
					 * @link https://trpc.io/docs/ssr
					 **/
					url: `${getBaseUrl()}/api/trpc`
				})
			]
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 **/
	ssr: false
});
