import express from "express";
import cors from "cors";
import mysqldump from "mysqldump";

import path from "path";
import multer from "multer";
//importamos la conexion a la bd
import db from "./database/db.js";
import sharp from "sharp";
//importamos nuestro enrutador
import UsuarioRoutes from "./routes/routesUsuario.js";
import TutorRoutes from "./routes/routesTutor.js";
import CarreraRoutes from "./routes/routesCarrera.js";
import PeriodoRoutes from "./routes/routesPeriodo.js";
import AlumnoRoutes from "./routes/routesAlumno.js";
import GrupoRoutes from "./routes/routesGrupo.js";
import AlumnoGrupoRoutes from "./routes/routesAlumnoGrupo.js";
import PermisoRoutes from "./routes/routesPermiso.js";
import DirectorRoutes from "./routes/routesDirector.js";
import ProductoRoutes from "./routes/routesProducto.js";
import EntradaRoutes from "./routes/routesEntrada.js";
import ProveedorRoutes from "./routes/routesProveedor.js";
import AreaRoutes from "./routes/routesArea.js";
import SalidaRoutes from "./routes/routesSalida.js";
import UbicacionRoutes from "./routes/routesUbicacion.js";
import usuarioModel from "./models/UsuarioModel.js";
import alumnoModel from "./models/AlumnoModel.js";
import tutorModel from "./models/TutorModel.js";
import directorModel from "./models/DirectorModel.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/usuarios", UsuarioRoutes);
app.use("/tutores", TutorRoutes);
app.use("/carreras", CarreraRoutes);
app.use("/periodos", PeriodoRoutes);
app.use("/alumnos", AlumnoRoutes);
app.use("/grupos", GrupoRoutes);
app.use("/alumnosgrupos", AlumnoGrupoRoutes);
app.use("/permisos", PermisoRoutes);
app.use("/directores", DirectorRoutes);
app.use("/productos", ProductoRoutes);
app.use("/entradas", EntradaRoutes);
app.use("/proveedors", ProveedorRoutes);
app.use("/areas", AreaRoutes);
app.use("/salidas", SalidaRoutes);
app.use("/ubicacions", UbicacionRoutes); 
try {
  await db.authenticate();
  console.log("Base de datos conectada");
} catch (error) {
  console.log(`El error de conexión es:${error}`);
}

app.post("/api/login", (req, res) => {
  const { correo, contrasena } = req.body;
  usuarioModel
    .findOne({
      where: {
        correo: correo,
      },
    })
    .then((usuario) => {
      if (usuario) {
        // Si el correo existe, pero la contraseña es incorrecta, devuelve un mensaje de error
        if (usuario.contrasena !== contrasena) {
          res.status(400).send("Contraseña incorrecta");
        } else {
          // Si el usuario se encuentra, busca el alumno asociado
          alumnoModel
            .findOne({
              where: {
                idusuarios: usuario.idusuarios,
              },
            })
            .then((alumno) => {
              if (alumno) {
                const response = {
                  alumno: alumno,
                  usuario: usuario,
                };
                res.status(200).send(response);
              } else {
                // Si no encuentra al alumno, busca el tutor asociado
                tutorModel
                  .findOne({
                    where: {
                      idusuarios: usuario.idusuarios,
                    },
                  })
                  .then((tutor) => {
                    if (tutor) {
                      const response = {
                        tutor: tutor,
                        usuario: usuario,
                      };
                      res.status(200).send(response);
                    } else {
                      // Si no encuentra al tutor, busca el director asociado
                      directorModel
                        .findOne({
                          where: {
                            idusuarios: usuario.idusuarios,
                          },
                        })
                        .then((director) => {
                          if (director) {
                            const response = {
                              director: director,
                              usuario: usuario,
                            };
                            res.status(200).send(response);
                          } else {
                            res.status(404).send("Director no encontrado");
                          }
                        })
                        .catch((err) => {
                          res.status(500).send(err);
                        });
                    }
                  })
                  .catch((err) => {
                    res.status(500).send(err);
                  });
              }
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      } else {
        // Si el correo no existe, devuelve un mensaje de error
        res.status(400).send("El usuario no existe");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file);
    const image = req.file.filename;
    const idusuarios = req.body.idusuarios; // Agrega el idusuarios del cuerpo de la solicitud
    const usuario = await usuarioModel.findOne({
      where: { idusuarios: idusuarios },
    });

    // Redimensionar la imagen a 800x800 y recortar lo que sobra
    const imageBuffer = await sharp(req.file.path)
      .resize({
        width: 800,
        height: 800,
        fit: "cover",
        position: "center",
      })
      .toBuffer();
    await sharp(imageBuffer).toFile(req.file.path);

    usuario.image = image;
    await usuario.save();
    return res.json({ Status: "Success" });
  } catch (error) {
    console.error(error);
    return res.json({ Message: "Error" });
  }
});
app.get("/", async (req, res) => {
  try {
    const usuarios = await usuarioModel.findAll(); // Busca todos los usuarios
    return res.json(usuarios);
  } catch (error) {
    console.error(error);
    return res.json({ Message: "Error" });
  }
});
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "bdPermisos",
};

// Generar el respaldo de la base de datos
app.get("/backup", (req, res) => {
  mysqldump({
    connection: dbConfig,
    dumpToFile: "backup.sql",
  })
    .then(() => {
      console.log("Respaldo de la base de datos generado con éxito");

      // Devolver el archivo SQL como un recurso descargable
      res.download("backup.sql", (err) => {
        if (err) {
          console.error("Error al descargar el archivo", err);
          res.status(500).json({ message: "Error al descargar el archivo" });
        }
      });
    })
    .catch((err) => {
      console.error("Error al generar el respaldo de la base de datos", err);
      res
        .status(500)
        .json({ message: "Error al generar el respaldo de la base de datos" });
    });
});
app.get("/api/pokemon/random", async (req, res) => {
  try {
    // Hace una solicitud a la API de Pokemon para obtener un Pokemon aleatorio
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    const data = await response.json();
    const pokemonList = data.results;
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    const randomPokemon = pokemonList[randomIndex];

    // Hace una solicitud a la API de Pokemon para obtener los datos del Pokemon aleatorio
    const pokemonResponse = await fetch(randomPokemon.url);
    const pokemonData = await pokemonResponse.json();
    const pokemonDetails = {
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
      attack: pokemonData.stats.find((stat) => stat.stat.name === "attack")
        .base_stat,
      defense: pokemonData.stats.find((stat) => stat.stat.name === "defense")
        .base_stat,
      types: pokemonData.types.map((type) => spanishTypeNames[type.type.name]),
      experience: pokemonData.base_experience, // Obtener la experiencia
    };

    res.json(pokemonDetails); // Envía los datos del Pokemon aleatorio como respuesta en formato JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el Pokemon aleatorio" });
  }
});

//conexion local
app.listen(8000, () => {
  console.log("Listening on port 8000");
});

//conexion remota
// app.listen(process.env.PORT || 8000, () => {
//   console.log("Listening on port 8000");
// });
