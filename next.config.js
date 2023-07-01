/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['diyanet.nl', 'upload.wikimedia.org']
	}
};

module.exports = nextConfig;
