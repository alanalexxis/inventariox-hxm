const Footer = () => {
  return (
    <div class="relative z-50">
      <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
        <h5 className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
          <p className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
            ©{1900 + new Date().getYear()} Experiencias Xcaret Web S.A.P.I. de
            C.V.
          </p>
        </h5>
        <div>
          <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
            <li>
              <a
                target="blank"
                href="https://www.hotelxcaretmexico.com/es/aviso-de-privacidad/"
                className="text-base font-medium text-gray-600 hover:text-gray-600"
              >
                Aviso de privacidad
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/hotelxcaretmexico"
                class="text-base font-medium text-gray-600 hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/hotelxcaretmx"
                class="text-base font-medium text-gray-600 hover:text-gray-600"
              >
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/hotelxcaretmexico"
                class="text-base font-medium text-gray-600 hover:text-gray-600"
              >
                <i class="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
