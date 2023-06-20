import TablaProductos from "./components/TablaEntrada";

const TablaProducto = () => {
  return (
    <div>
      <div className="xl-xgrid mt-5 h-full grid-cols-1 gap-5 xl:grid-cols-2">
        <TablaProductos />
      </div>
    </div>
  );
};

export default TablaProducto;
