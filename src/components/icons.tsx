import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaymentIcon from '@mui/icons-material/Payment';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckIcon from '@mui/icons-material/Check';
import AddCardIcon from '@mui/icons-material/AddCard';

const icons = {
	close: CloseIcon,
	menu: MenuIcon,
	pinned: PushPinIcon,
	euro: EuroSymbolIcon,
	unpinned: PushPinOutlinedIcon,
	delete: DeleteIcon,
	add: AddIcon,
	edit: EditIcon,
	expandLess: ExpandLessIcon,
	expandMore: ExpandMoreIcon,
	payment: PaymentIcon,
	language: TranslateIcon,
	check: CheckIcon,
	pay: AddCardIcon
};

export type Icons = keyof typeof icons;
export { icons };
