import Logo from './Logo';
import Search from './Search';
import HeaderInfo from './HeaderInfo';
import ListMenu from './ListMenu';

const Header = () => {
  return (
    <header>
      <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
        <Logo />
        <Search />
        <HeaderInfo />
      </div>

      <ListMenu />
    </header>
  );
};

export default Header;
