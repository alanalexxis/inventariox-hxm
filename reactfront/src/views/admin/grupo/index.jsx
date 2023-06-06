import TablaGrupos from "./components/TablaGrupo";
import TablaCarreras from "./components/TablaCarrera";
import TablaPeriodos from "./components/TablaPeriodo";

const TableGrupo = () => {
  return (
    <div className="min-h-screen pb-[60px]">
      <div className="xl-xgrid mt-5 h-full grid-cols-1 gap-5 xl:grid-cols-2">
        <TablaGrupos />
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TablaCarreras></TablaCarreras>
          <TablaPeriodos></TablaPeriodos>
        </div>
      </div>
    </div>
  );
};

export default TableGrupo;
