import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const icons = {
	close: CloseIcon,
	menu: MenuIcon,
	pinned: PushPinIcon,
	euro: EuroSymbolIcon,
	unpinned: PushPinOutlinedIcon,
	delete: DeleteIcon,
	add: AddIcon
};

export type Icons = keyof typeof icons;
export { icons };
