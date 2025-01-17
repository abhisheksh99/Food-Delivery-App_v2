const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-gray-800 text-center text-gray-300 py-8 px-4">
        <p className="text-sm">
          Copyright &copy; {currentYear} Flavor Fiesta. All rights reserved.
        </p>
      </footer>
    );
  };
  
  export default Footer;