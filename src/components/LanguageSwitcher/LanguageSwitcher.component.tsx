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
					onClick={() => handleChange(language.code)}
					startImage={language.icon}
				>
					{language.name}
				</Button>
			))}
		</ButtonsGroup>
	);
};
