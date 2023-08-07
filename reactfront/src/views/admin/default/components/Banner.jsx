import nft1 from "assets/img/banner/banner.png";
import { BsCloudDownload } from "react-icons/bs";
const Banner1 = () => {
  return (
    <div
      className="flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]"
      style={{ backgroundImage: `url(${nft1})` }}
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Controla, registra y administra tu inventario de productos.
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#ffffff] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
          ¡Administra tus productos de manera eficiente con nuestra aplicación !
          ¡Agrega, actualiza y gestiona los productos de forma rápida y
          sencilla!
        </p>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <button className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70">
            <BsCloudDownload className="mr-2 inline-block text-lg" /> Descargar
            ahora
          </button>
          <button
            href=" "
            className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2"
          >
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner1;
