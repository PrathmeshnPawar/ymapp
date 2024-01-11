import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import PublicSharpIcon from '@mui/icons-material/PublicSharp';
import SettingsInputCompositeSharpIcon from '@mui/icons-material/SettingsInputCompositeSharp';



export const mainNavbarItems = [
    {
        id: 0,
        icon: <PeopleAltIcon />,
        label: 'Authentication',
        route: 'authentication',
    },
    {
        id: 1,
        icon: <StorageIcon />,
        label: 'Database',
        route: 'Database',
    },
    {
        id: 2,
        icon: <SettingsEthernetIcon />,
        label: 'Functions',
        route: 'Functions',
    },
    {
        id: 3,
        icon: <PublicSharpIcon />,
        label: 'Hosting',
        route: 'Hosting',
    },
    {
        id: 4,
        icon: <SettingsInputCompositeSharpIcon />,
        label: 'MachineLearning',
        route: 'machineLearning',
    }
]