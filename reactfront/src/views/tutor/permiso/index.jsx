import TablaPermisos from "./components/TablaPermisos";

const TablePermiso = () => {
  return (
    <div>
      <div className="xl-xgrid mt-5 h-full grid-cols-1 gap-5 xl:grid-cols-2">
        <TablaPermisos />
      </div>
    </div>
  );
};

export default TablePermiso;
