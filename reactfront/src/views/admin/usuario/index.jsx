import ColumnsTable from "./components/TablaUsuarios";

const Tables = () => {
  return (
    <div className="min-h-screen pb-[60px]">
      <div className="xl-xgrid mt-5 h-full grid-cols-1 gap-5 xl:grid-cols-2">
        <ColumnsTable />

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2"></div>
      </div>
    </div>
  );
};

export default Tables;
