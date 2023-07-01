import { Button, ButtonsGroup } from 'components/Button';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const handleChange = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	return (
		<ButtonsGroup spacing={2}>
			<Button
				variant="outlined"
				onClick={() => handleChange('nl')}
				startImage="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/510px-Flag_of_the_Netherlands.svg.png"
			>
				Nederlands
			</Button>
			<Button
				variant="outlined"
				onClick={() => handleChange('tr')}
				startImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/440px-Flag_of_Turkey.svg.png"
			>
				Türkçe
			</Button>
			<Button
				variant="outlined"
				onClick={() => handleChange('ar')}
				startImage="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/1280px-Flag_of_Saudi_Arabia.svg.png"
			>
				العربية
			</Button>
		</ButtonsGroup>
	);
};
