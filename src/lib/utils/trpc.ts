import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from 'server/routers/_app';

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
	config(opts) {
		return {
			queryClientConfig: {
				defaultOptions: {
					queries: {
						retry: false,
						refetchOnWindowFocus: false,
						staleTime: 1000 * 60 * 60 * 1 // 1 hour
					},
					mutations: {
						retry: false
					}
				}
			},
			links: [
				httpBatchLink({
					/**
					 * If you want to use SSR, you need to use the server's full URL
					 * @link https://trpc.io/docs/ssr
					 **/
					url: `${getBaseUrl()}/api/trpc`,

					// You can pass any HTTP headers you wish here
					async headers() {
						return {
							// authorization: getAuthCookie(),
						};
					}
				})
			]
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 **/
	ssr: false
});
