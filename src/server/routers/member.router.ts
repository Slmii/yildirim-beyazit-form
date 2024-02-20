import { protectedProcedure, publicProcedure, router } from 'server/trpc';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const membersRouter = router({
	create: publicProcedure
		.input(
			z.object({
				name: z.string(),
				birthday: z.string(),
				address: z.string(),
				zip: z.string(),
				city: z.string(),
				email: z.string(),
				phone: z.string(),
				bank: z.string(),
				amount: z.number().min(1)
			})
		)
		.mutation(async ({ input }) => {
			const transporter = nodemailer.createTransport({
				host: 'smtp.office365.com',
				auth: {
					user: `${process.env.EMAIL_USERNAME}`,
					pass: `${process.env.EMAIL_PASSWORD}`
				},
				port: 587,
				tls: {
					ciphers: 'SSLv3'
				},
				requireTLS: true
			});

			await transporter.sendMail({
				from: `Yıldırım Beyazıt Cami <${process.env.EMAIL_USERNAME}>`,
				to: `${process.env.EMAIL_USERNAME}`,
				subject: 'Yıldırım Beyazıt Cami Üyelik Başvuru Formu',
				text: 'Yıldırım Beyazıt Cami Üyelik Başvuru Formu',
				html: `
					<h1>Yıldırım Beyazıt Cami Üyelik Başvuru Formu</h1>
					<p><b>Ad ve Soyad:</b> ${input.name}</p>
					<p><b>Doğum Tarihi:</b> ${new Date(input.birthday).toLocaleDateString('nl-NL', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}</p>
					<p><b>Adres:</b> ${input.address}</p>
					<p><b>Posta Kodu:</b> ${input.zip}</p>
					<p><b>Şehir:</b> ${input.city}</p>
					<p><b>E-posta:</b> ${input.email}</p>
					<p><b>Telefon:</b> ${input.phone}</p>
					<p><b>Banka:</b> ${input.bank}</p>
					<p><b>Aidat Miktarı:</b> ${input.amount}</p>
				`
			});
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const members = await ctx.prisma.member.findMany();

		return members.map(member => ({
			...member,
			address: `${member.address}, ${member.zip} ${member.city}`
		}));
	}),

	deleteMany: protectedProcedure.input(z.array(z.number()).min(1)).mutation(async ({ input, ctx }) => {
		const member = await ctx.prisma.member.deleteMany({
			where: {
				id: {
					in: input
				}
			}
		});

		return member;
	}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.number(),
				name: z.string(),
				birthday: z.string(),
				address: z.string(),
				zip: z.string(),
				city: z.string(),
				email: z.string(),
				phone: z.string(),
				bank: z.string(),
				amount: z.number().min(1)
			})
		)
		.mutation(async ({ input, ctx }) => {
			const member = await ctx.prisma.member.update({
				where: {
					id: input.id
				},
				data: {
					name: input.name,
					birthday: new Date(input.birthday),
					address: input.address,
					zip: input.zip,
					city: input.city,
					email: input.email,
					phone: input.phone,
					bank: input.bank,
					amount: input.amount
				}
			});

			return member;
		})
});
