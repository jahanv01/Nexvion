import logo from '../assets/logo.png'; // adjust the path based on your project structure

const Header = () => {
  return (
    <header className="bg-black shadow-md px-4 py-2 flex items-center h-22">
      <img 
        src={logo} 
        alt="Logo" 
        className="h-full object-contain" 
      />
    </header>
  );
};

export default Header;