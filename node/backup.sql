/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: areas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `areas` (
  `idareas` int(11) NOT NULL AUTO_INCREMENT,
  `nomArea` varchar(100) NOT NULL,
  PRIMARY KEY (`idareas`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categorias
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categorias` (
  `idcategorias` int(11) NOT NULL AUTO_INCREMENT,
  `nomCategorias` varchar(100) NOT NULL,
  PRIMARY KEY (`idcategorias`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: entradas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `entradas` (
  `identradas` int(11) NOT NULL AUTO_INCREMENT,
  `idproductos` int(11) DEFAULT NULL,
  `numEntradas` int(11) DEFAULT NULL,
  `costoTotal` float(10, 2) DEFAULT NULL,
  `fechaEntrada` datetime DEFAULT NULL,
  `numFactura` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `idproveedors` int(11) DEFAULT NULL,
  PRIMARY KEY (`identradas`),
  KEY `fk_entradas_productos1_idx` (`idproductos`),
  KEY `fk_entradas_proveedors1_idx` (`idproveedors`),
  CONSTRAINT `fk_entradas_productos1` FOREIGN KEY (`idproductos`) REFERENCES `productos` (`idproductos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_entradas_proveedors1` FOREIGN KEY (`idproveedors`) REFERENCES `proveedors` (`idproveedors`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 68 DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: productos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `productos` (
  `idproductos` int(11) NOT NULL AUTO_INCREMENT,
  `codBarras` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `totalEntradas` int(11) NOT NULL,
  `totalSalidas` int(11) NOT NULL,
  `totalProductos` int(11) NOT NULL,
  `costoUnitario` float(10, 2) NOT NULL,
  `costoTotal` float(10, 2) NOT NULL,
  `idcategorias` int(11) NOT NULL,
  `idubicacions` int(11) NOT NULL,
  PRIMARY KEY (`idproductos`),
  KEY `fk_productos_categorias_idx` (`idcategorias`),
  KEY `fk_productos_ubicacions1_idx` (`idubicacions`),
  CONSTRAINT `fk_productos_categorias` FOREIGN KEY (`idcategorias`) REFERENCES `categorias` (`idcategorias`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_ubicacions1` FOREIGN KEY (`idubicacions`) REFERENCES `ubicacions` (`idubicacions`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 202 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: proveedors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `proveedors` (
  `idproveedors` int(11) NOT NULL AUTO_INCREMENT,
  `nomProveedor` varchar(100) NOT NULL,
  PRIMARY KEY (`idproveedors`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rangos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `rangos` (
  `idrangos` int(11) NOT NULL,
  `nomRangos` varchar(45) NOT NULL,
  PRIMARY KEY (`idrangos`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: salidas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `salidas` (
  `idsalidas` int(11) NOT NULL AUTO_INCREMENT,
  `idproductos` int(11) NOT NULL,
  `numSalidas` int(11) NOT NULL,
  `numSap` varchar(45) NOT NULL,
  `nomTecnico` varchar(100) NOT NULL,
  `idareas` int(11) NOT NULL,
  `costoTotal` float(10, 2) NOT NULL,
  `fechaSalida` datetime NOT NULL,
  PRIMARY KEY (`idsalidas`),
  KEY `fk_salidas_productos1_idx` (`idproductos`),
  KEY `fk_salidas_areas1_idx` (`idareas`),
  CONSTRAINT `fk_salidas_areas1` FOREIGN KEY (`idareas`) REFERENCES `areas` (`idareas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_salidas_productos1` FOREIGN KEY (`idproductos`) REFERENCES `productos` (`idproductos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ubicacions
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ubicacions` (
  `idubicacions` int(11) NOT NULL,
  `nomUbicacions` varchar(45) NOT NULL,
  PRIMARY KEY (`idubicacions`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuarios` (
  `idusuarios` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `image` varchar(45) DEFAULT NULL,
  `correo` varchar(45) NOT NULL,
  `contrasena` varchar(45) NOT NULL,
  `idrangos` int(11) NOT NULL,
  PRIMARY KEY (`idusuarios`),
  KEY `fk_usuarios_rangos1_idx` (`idrangos`),
  CONSTRAINT `fk_usuarios_rangos1` FOREIGN KEY (`idrangos`) REFERENCES `rangos` (`idrangos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: areas
# ------------------------------------------------------------

INSERT INTO
  `areas` (`idareas`, `nomArea`)
VALUES
  (1, 'Habitaciones');
INSERT INTO
  `areas` (`idareas`, `nomArea`)
VALUES
  (2, 'Recepcion');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categorias
# ------------------------------------------------------------

INSERT INTO
  `categorias` (`idcategorias`, `nomCategorias`)
VALUES
  (1, 'A');
INSERT INTO
  `categorias` (`idcategorias`, `nomCategorias`)
VALUES
  (2, 'B');
INSERT INTO
  `categorias` (`idcategorias`, `nomCategorias`)
VALUES
  (3, 'C');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: entradas
# ------------------------------------------------------------

INSERT INTO
  `entradas` (
    `identradas`,
    `idproductos`,
    `numEntradas`,
    `costoTotal`,
    `fechaEntrada`,
    `numFactura`,
    `idproveedors`
  )
VALUES
  (65, 199, 10, 105.00, '2023-08-01 17:03:56', '98', 1);
INSERT INTO
  `entradas` (
    `identradas`,
    `idproductos`,
    `numEntradas`,
    `costoTotal`,
    `fechaEntrada`,
    `numFactura`,
    `idproveedors`
  )
VALUES
  (66, 200, 3, 30.00, '2023-08-02 21:27:29', '78', 7);
INSERT INTO
  `entradas` (
    `identradas`,
    `idproductos`,
    `numEntradas`,
    `costoTotal`,
    `fechaEntrada`,
    `numFactura`,
    `idproveedors`
  )
VALUES
  (67, 199, 9, 94.50, '2023-08-07 15:38:40', '98', 2);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: productos
# ------------------------------------------------------------

INSERT INTO
  `productos` (
    `idproductos`,
    `codBarras`,
    `descripcion`,
    `totalEntradas`,
    `totalSalidas`,
    `totalProductos`,
    `costoUnitario`,
    `costoTotal`,
    `idcategorias`,
    `idubicacions`
  )
VALUES
  (
    199,
    'HXM89JKJSAS',
    'Tornillos',
    19,
    7,
    12,
    10.50,
    126.00,
    2,
    1
  );
INSERT INTO
  `productos` (
    `idproductos`,
    `codBarras`,
    `descripcion`,
    `totalEntradas`,
    `totalSalidas`,
    `totalProductos`,
    `costoUnitario`,
    `costoTotal`,
    `idcategorias`,
    `idubicacions`
  )
VALUES
  (
    200,
    'HXM9910912313D',
    'Tornasol',
    3,
    0,
    3,
    10.00,
    30.00,
    2,
    1
  );
INSERT INTO
  `productos` (
    `idproductos`,
    `codBarras`,
    `descripcion`,
    `totalEntradas`,
    `totalSalidas`,
    `totalProductos`,
    `costoUnitario`,
    `costoTotal`,
    `idcategorias`,
    `idubicacions`
  )
VALUES
  (201, 'HMXIK2KOMK23', 'Clavos', 0, 0, 0, 12.00, 0.00, 2, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: proveedors
# ------------------------------------------------------------

INSERT INTO
  `proveedors` (`idproveedors`, `nomProveedor`)
VALUES
  (1, 'Manto');
INSERT INTO
  `proveedors` (`idproveedors`, `nomProveedor`)
VALUES
  (2, 'Mapax');
INSERT INTO
  `proveedors` (`idproveedors`, `nomProveedor`)
VALUES
  (3, 'Saturno');
INSERT INTO
  `proveedors` (`idproveedors`, `nomProveedor`)
VALUES
  (4, 'Sap');
INSERT INTO
  `proveedors` (`idproveedors`, `nomProveedor`)
VALUES
  (5, 'Luxa');
INSERT INTO
  `proveedors` (`idproveedors`, `nomProveedor`)
VALUES
  (6, 'Trainer');
INSERT INTO
  `proveedors` (`idproveedors`, `nomProveedor`)
VALUES
  (7, 'Mamey');
INSERT INTO
  `proveedors` (`idproveedors`, `nomProveedor`)
VALUES
  (8, 'Manzx');
INSERT INTO
  `proveedors` (`idproveedors`, `nomProveedor`)
VALUES
  (9, 'Matriz');
INSERT INTO
  `proveedors` (`idproveedors`, `nomProveedor`)
VALUES
  (10, 'Mzx');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rangos
# ------------------------------------------------------------

INSERT INTO
  `rangos` (`idrangos`, `nomRangos`)
VALUES
  (1, 'Administrador');
INSERT INTO
  `rangos` (`idrangos`, `nomRangos`)
VALUES
  (2, 'Usuario');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: salidas
# ------------------------------------------------------------

INSERT INTO
  `salidas` (
    `idsalidas`,
    `idproductos`,
    `numSalidas`,
    `numSap`,
    `nomTecnico`,
    `idareas`,
    `costoTotal`,
    `fechaSalida`
  )
VALUES
  (
    3,
    199,
    5,
    '98',
    'Luis Guerra',
    1,
    52.50,
    '2023-08-04 03:16:39'
  );
INSERT INTO
  `salidas` (
    `idsalidas`,
    `idproductos`,
    `numSalidas`,
    `numSap`,
    `nomTecnico`,
    `idareas`,
    `costoTotal`,
    `fechaSalida`
  )
VALUES
  (
    4,
    199,
    2,
    '9',
    'maroo',
    1,
    21.00,
    '2023-08-07 15:57:42'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ubicacions
# ------------------------------------------------------------

INSERT INTO
  `ubicacions` (`idubicacions`, `nomUbicacions`)
VALUES
  (1, 'Y2K');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

INSERT INTO
  `usuarios` (
    `idusuarios`,
    `nombre`,
    `image`,
    `correo`,
    `contrasena`,
    `idrangos`
  )
VALUES
  (
    1,
    'Admin',
    'image_1691206124041.jpg',
    'admin@hxm.com',
    '123',
    1
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
