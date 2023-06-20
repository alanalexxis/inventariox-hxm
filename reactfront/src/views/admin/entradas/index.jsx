import TablaEntradas from "./components/TablaEntrada";

const TablaEntrada = () => {
  return (
    <div>
      <div className="xl-xgrid mt-5 h-full grid-cols-1 gap-5 xl:grid-cols-2">
        <TablaEntradas />
      </div>
    </div>
  );
};

export default TablaEntrada;
