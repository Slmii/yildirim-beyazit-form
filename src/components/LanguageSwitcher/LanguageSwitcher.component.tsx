import { Button, ButtonsGroup } from 'components/Button';
import { LANGUAGES } from 'lib/constants/languages';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const handleChange = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	return (
		<ButtonsGroup spacing={2}>
			{LANGUAGES.map(language => (
				<Button
					key={language.code}
					variant="outlined"
					onClick={() => handleChange('nl')}
					startImage="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/510px-Flag_of_the_Netherlands.svg.png"
				>
					Nederlands
				</Button>
			))}
		</ButtonsGroup>
	);
};
