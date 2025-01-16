import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-custom-gray text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-around gap-8">
          {/* Coluna 1 */}
          <div className="w-full sm:w-auto text-center">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#portfolio" className="hover:text-gray-300">Sobre nós</a>
              </li>
              <li>
                <a href="#Blog" className="hover:text-gray-300">Conheça nosso blog</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-300">Fale conosco</a>
              </li>
              <li>
                <a href="documentos/gugutalkshow - documento.pdf" className="hover:text-gray-300">Leia a documentação</a>
              </li>
            </ul>
          </div>

          {/* Coluna 2 */}
          <div className="w-full sm:w-auto text-center">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">Nos ajude</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.instagram.com/gugu.talk.show/" className="hover:text-gray-300">Nos siga</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-300">Feedback's</a>
              </li>
              <li>
                <a href="https://link.mercadopago.com.br/deckcs" className="hover:text-gray-300">Faça uma doação</a>
              </li>
              <li>
                <a href="https://wa.me/5511999832007?text=Trabalhe%20conosco" className="hover:text-gray-300">Trabalhe conosco</a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 */}
          <div className="w-full sm:w-auto text-center">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">Social</h4>
            <div className="flex justify-center gap-4 mt-4">
              <a href="https://github.com/derickcsantos" className="h-10 w-10 bg-white text-custom-gray rounded-full flex items-center justify-center hover:bg-yellow-400">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://www.linkedin.com/in/derick-campos-santos/" className="h-10 w-10 bg-white text-custom-gray rounded-full flex items-center justify-center hover:bg-yellow-400">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://wa.me/5511986261007?text=Fale%20conosco" className="h-10 w-10 bg-white text-custom-gray rounded-full flex items-center justify-center hover:bg-yellow-400">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a href="https://www.instagram.com/derick_profissional" className="h-10 w-10 bg-white text-custom-gray rounded-full flex items-center justify-center hover:bg-yellow-400">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Full stack ecommerce <br />
            Todos os direitos reservados. <br /> Desenvolvido por{' '}
            <a
              href="https://github.com/Derickcsantos/Derickcsantos"
              className="underline text-yellow-400 hover:text-yellow-300"
            >
              Derick Campos Santos
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
