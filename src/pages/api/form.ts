// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface ExtendedNextApiRequest extends NextApiRequest {
	body: {
		name: string;
		birthday: string;
		address: string;
		zip: string;
		city: string;
		email: string;
		phone: string;
		bank: string;
		amount: string;
	};
}

type Data = {
	message: string;
};

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<Data>) {
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

	const response = await transporter.sendMail({
		from: `Yıldırım Beyazıt Cami <${process.env.EMAIL_USERNAME}>`,
		to: `${process.env.EMAIL_USERNAME}`,
		subject: 'Yıldırım Beyazıt Cami Üyelik Başvuru Formu',
		text: 'Yıldırım Beyazıt Cami Üyelik Başvuru Formu',
		html: `
			<h1>Yıldırım Beyazıt Cami Üyelik Başvuru Formu</h1>
			<p><b>Ad ve Soyad:</b> ${req.body.name}</p>
			<p><b>Doğum Tarihi:</b> ${new Date(req.body.birthday).toLocaleDateString('nl-NL', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}</p>
			<p><b>Adres:</b> ${req.body.address}</p>
			<p><b>Posta Kodu:</b> ${req.body.zip}</p>
			<p><b>Şehir:</b> ${req.body.city}</p>
			<p><b>E-posta:</b> ${req.body.email}</p>
			<p><b>Telefon:</b> ${req.body.phone}</p>
			<p><b>Banka:</b> ${req.body.bank}</p>
			<p><b>Aidat Miktarı:</b> ${req.body.amount}</p>
		`
	});

	console.log(response);

	res.status(200).json({ message: '' });
}
