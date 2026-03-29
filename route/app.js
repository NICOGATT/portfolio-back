const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/database.js'); 

const { logger, morganLogger } = require('../middleware/logger');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validacion, schemas } = require('../middleware/validacion');

const authController = require('../controllers/auth.controller');
const contactoController = require('../controllers/contacto.controller');
const proyectoController = require('../controllers/proyecto.controllers');


dotenv.config();

//Conectar a mongodb 
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(morganLogger);

//Ruta de prueba 

app.get('/', (req, res) => {
  res.json({
    mensaje : 'API Portfolio MongoDB', 
    status : 'online', 
    database : process.env.MONGODB_URI ? 'configurada' : 'no configurada'
  })
})

//Rutas
app.post('/auth/login', authController.login);
app.post('/auth/register', authController.register);
app.post('/contacto', validacion(schemas.contactoSchema), contactoController.crearContacto);
app.get('/admin/contacto', authenticateToken, authorizeRoles('admin'), contactoController.leerContacto);
app.patch('/admin/contacto/:id', authenticateToken, authorizeRoles('admin'), validacion(schemas.contactoSchema), contactoController.actualizarContacto);
app.delete('/admin/contacto/:id', authenticateToken, authorizeRoles('admin'), contactoController.eliminarContacto);

app.post('/admin/proyecto', authenticateToken, authorizeRoles('admin', 'editor'), validacion(schemas.proyectoSchema), proyectoController.crearProyecto);
app.get('/proyecto', proyectoController.listarProyecto);
app.patch('/admin/proyecto/:id', authenticateToken, authorizeRoles('admin', 'editor'), validacion(schemas.proyectoSchema), proyectoController.actualizarProyecto);
app.delete('/admin/proyecto/:id', authenticateToken, authorizeRoles('admin', 'editor'), proyectoController.eliminarProyecto);

app.post('/admin/tecnologia', authenticateToken, authorizeRoles("admin", "editor"), validacion(schemas.tecnologiaSchema), proyectoController.crearTecnologia); 
app.get('/tecnologia', proyectoController.leerTecnologia); 
app.put('/admin/tecnologia/:id', authenticateToken, authorizeRoles("admin", "editor"),validacion(schemas.tecnologiaSchema), proyectoController.actualizarTecnologia); 
app.delete('/admin/tecnologia/:id', authenticateToken, authorizeRoles("admin", "editor"), proyectoController.eliminarTecnologia); 

app.post('/admin/funcionalidad', authenticateToken, authorizeRoles("admin", "editor"), validacion(schemas.funcionalidadesSchema), proyectoController.crearFuncionalidad); 
app.get('/funcionalidad', proyectoController.listarFuncionalidad); 
app.put('/admin/funcionalidad/:id', authenticateToken, authorizeRoles("admin", "editor"),validacion(schemas.funcionalidadesSchema), proyectoController.actualizarFuncionalidad); 
app.delete('/admin/funcionalidad/:id', authenticateToken, authorizeRoles("admin", "editor"), proyectoController.eliminarFuncionalidad); 




app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: "Ruta no encontrada"
    });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    ok: false,
    message: err.message || "Error interno"
  });
});

app.listen(PORT, () => {
    console.log(`
    =================================
    🚀 Servidor profesional iniciado
    📡 Puerto: ${PORT}
    ⏰ ${new Date().toLocaleString()}
    =================================
    🔧 Middleware activo: 
        - Logger profesional
        - Validación Joi
        - CORS habilitado
        - Manejo de errores
    =================================
    `);
});