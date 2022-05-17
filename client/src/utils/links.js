import { HiOutlineClipboardList } from 'react-icons/hi';
import { GiHealthPotion } from 'react-icons/gi';
import { GiPotionBall, GiBookmark } from 'react-icons/gi';
import { BiEditAlt } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';

const links = [
   {
      id: 1,
      text: 'Principal',
      path: '/',
      icon: <HiOutlineClipboardList />,
   },
   {
      id: 2,
      text: 'las recetitas',
      path: 'all-recipes',
      icon: <GiHealthPotion />,
   },
   {
      id: 3,
      text: 'añadir recetita',
      path: 'add-recipe',
      icon: <GiPotionBall />,
   },
   {
      id: 4,
      text: 'los blogs',
      path: 'all-blogs',
      icon: <GiBookmark />,
   },
   {
      id: 5,
      text: 'añadir blog',
      path: 'add-blog',
      icon: <BiEditAlt />,
   },
   {
      id: 6,
      text: 'perfil',
      path: 'profile',
      icon: <ImProfile />,
   },
];

export default links;

/* BiEditAlt */
/* GiBookmark */
