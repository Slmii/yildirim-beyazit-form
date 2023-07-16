import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		// debug: true,
		fallbackLng: 'nl',
		interpolation: {
			escapeValue: false // not needed for react as it escapes by default
		},
		resources: {
			nl: {
				translation: {
					title: 'Yıldırım Beyazıt Moskee Lidmaatschapformulier',
					subTitle: 'Om lid te worden van de Yıldırım Beyazıt Moskee, vul het onderstaande formulier in.',
					form: {
						name: 'Naam en achternaam',
						birthday: 'Geboortedatum',
						address: 'Adres',
						zip: 'Postcode',
						city: 'Woonplaats',
						email: 'E-mailadres',
						phone: 'Telefoonnummer',
						bank: 'IBAN nummer',
						amount: 'Maandelijkse contributie',
						submit: 'Versturen',
						add: 'Toevoegen',
						update: 'Bijwerken',
						cancel: 'Annuleren',
						success: 'Bedankt voor uw aanmelding!'
					},
					agreement: {
						title: 'Akkoordverklaring',
						text: '{{name}} verleent hierbij tot wederopzegging machtiging aan ISN Yildirim Beyazit Moskee, gevestigd aan de Peyserhof 20 te Emmen om van zijn/haar bovenstaande bankrekening maandelijks een bedrag van {{amount}} af te schrijven wegens contributie.'
					},
					date: 'Datum',
					schema: {
						provideValue: 'Vul een waarde in',
						minAmount: 'Minimaal {{amount}} euro',
						provideValidEmail: 'Vul een geldig e-mailadres in',
						provideValidIBAN: 'Vul een geldig IBAN nummer in'
					},
					admin: {
						title: 'Yildirim Beyazit Moskee Administratie',
						search: 'Zoeken',
						add: 'Toevoegen',
						delete: 'Verwijderen',
						update: 'Bijwerken',
						columns: {
							name: 'Naam',
							amount: 'Maandelijkse contributie',
							memberDate: 'Inschrijfdatum',
							actions: 'Acties',
							year: 'Jaar'
						},
						tooltips: {
							edit: 'Bewerken',
							payments: 'Betalingsgeschiedenis'
						}
					}
				}
			},
			tr: {
				translation: {
					title: 'Yıldırım Beyazıt Cami Üyelik Başvuru Formu',
					subTitle: 'Yıldırım Beyazıt Cami üyesi olmak için aşağıdaki formu doldurunuz.',
					form: {
						name: 'Ad ve Soyad',
						birthday: 'Doğum Tarihi',
						address: 'Adres',
						zip: 'Posta Kodu',
						city: 'Şehir',
						email: 'E-posta Adresi',
						phone: 'Telefon Numarası',
						bank: 'IBAN numarası',
						amount: 'Aylık Aidat Miktarı',
						submit: 'Gönder',
						add: 'Ekle',
						update: 'Güncelle',
						cancel: 'İptal',
						success: 'Başvurunuz için teşekkür ederiz!'
					},
					agreement: {
						title: 'Sözleşme',
						text: '{{name}} yukarıda belirtilen banka hesabından aylık {{amount}} aidat çekilmesi için ISN Yıldırım Beyazıt Cami’ye süresiz yetki vermektedir.'
					},
					date: 'Tarih',
					schema: {
						provideValue: 'Bir değer giriniz',
						minAmount: 'En az {{amount}} euro',
						provideValidEmail: 'Geçerli bir e-posta adresi giriniz',
						provideValidIBAN: 'Geçerli bir IBAN numarası giriniz'
					},
					admin: {
						title: 'Yildirim Beyazit Cami Yönetim',
						search: 'Arama',
						add: 'Ekle',
						delete: 'Sil',
						update: 'Güncelle',
						columns: {
							name: 'Ad',
							amount: 'Aylık Aidat Miktarı',
							memberDate: 'Kayıt Tarihi',
							actions: 'İşlemler',
							year: 'Yıl'
						},
						tooltips: {
							edit: 'Düzenle',
							payments: 'Ödeme Geçmişi'
						}
					}
				}
			},
			ar: {
				translation: {
					title: 'نموذج طلب عضوية مسجد يلديرم بيازيد',
					subTitle: 'للحصول على عضوية مسجد يلديرم بيازيد، يرجى ملء النموذج أدناه.',
					form: {
						name: 'الاسم واللقب',
						birthday: 'تاريخ الميلاد',
						address: 'العنوان',
						zip: 'الرمز البريدي',
						city: 'المدينة',
						email: 'البريد الإلكتروني',
						phone: 'رقم الهاتف',
						bank: 'رقم الحساب البنكي',
						amount: 'مبلغ الاشتراك الشهري',
						submit: 'إرسال',
						add: 'إضافة',
						update: 'تحديث',
						cancel: 'إلغاء',
						success: 'شكرا لتقديم طلبك!'
					},
					agreement: {
						title: 'اتفاقية',
						text: 'يمنح {{name}} إذنًا غير محدد المدة لمسجد يلديرم بيازيد، المقر في Peyserhof 20 في Emmen، بسحب مبلغ {{amount}} شهريًا من حسابه المصرفي أعلاه لأسباب الاشتراك.'
					},
					date: 'تاريخ',
					schema: {
						provideValue: 'يرجى إدخال قيمة',
						minAmount: 'الحد الأدنى {{amount}} يورو',
						provideValidEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح',
						provideValidIBAN: 'يرجى إدخال رقم IBAN صالح'
					},
					admin: {
						title: 'إدارة مسجد يلديرم بيازيد',
						search: 'بحث',
						add: 'إضافة',
						delete: 'حذف',
						update: 'تحديث',
						columns: {
							name: 'الاسم',
							amount: 'مبلغ الاشتراك الشهري',
							memberDate: 'تاريخ التسجيل',
							actions: 'الإجراءات',
							year: 'السنة'
						},
						tooltips: {
							edit: 'تحرير',
							payments: 'سجل الدفعات'
						}
					}
				}
			}
		}
	});

export default i18n;
