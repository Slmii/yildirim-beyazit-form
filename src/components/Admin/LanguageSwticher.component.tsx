import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { LANGUAGES } from 'lib/constants/languages';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const handleChange = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const currentLanguage = LANGUAGES.find(language => language.code === i18n.language);

	return (
		<Menu
			id="language-switcher"
			label={
				<Button color="inherit" startImage={currentLanguage?.icon}>
					{currentLanguage?.name}
				</Button>
			}
			menu={LANGUAGES.map(language => ({
				label: language.name,
				id: language.code,
				action: () => handleChange(language.code),
				image: language.icon
			}))}
		/>
	);
};
