import TablaPermisosAlumnos from "./components/TablaPermisos";

const TablePermisoAlumno = () => {
  return (
    <div>
      <div className="xl-xgrid mt-5 h-full grid-cols-1 gap-5 xl:grid-cols-2">
        <TablaPermisosAlumnos />
      </div>
    </div>
  );
};

export default TablePermisoAlumno;
