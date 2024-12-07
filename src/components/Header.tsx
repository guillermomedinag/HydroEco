import { Map } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-river-600 to-nature-600 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Map className="h-8 w-8" />
          <h1 className="text-2xl font-bold">HidorEco Chile</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-river-200 transition-colors">
                Quienes Somos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-river-200 transition-colors">
                Nuestro Servicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-river-200 transition-colors">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;