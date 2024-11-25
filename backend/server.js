const express = require('express');
const { Client } = require('pg'); // Importamos el cliente de PostgreSQL
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());

// URL de conexión a PostgreSQL (reemplaza [YOUR-PASSWORD] con tu contraseña)
const connectionString = 'postgresql://postgres.pqwgwxhduwnowkqiawec:Blakcmist.8824@aws-0-sa-east-1.pooler.supabase.com:6543/postgres';

// Conexión a Supabase
const db = new Client({
    connectionString: connectionString,
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err.stack);
    } else {
        console.log('Conectado a la base de datos en Supabase');
    }
});

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    res.json(results);
    }); 
});

// Agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    db.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...nuevoUsuario });
    });
});


//Login
app.post('/usuarios/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
    return res.status(400).json({ message: 'Se requiere email y contraseña' });
    }

  // Consulta en la base de datos para verificar las credenciales
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      // Si no se encuentra el usuario
        return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const usuario = results[0];

    // Comprobar si la contraseña es correcta
    if (usuario.password !== password) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas, devolver todos los datos del usuario
    res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        run: usuario.run
    });
    });
});

//obtener origen
app.get('/origen', (req, res) => {
    db.query('SELECT * FROM origen', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//obtener destino
app.get('/destinos', (req, res) => {
    db.query('SELECT * FROM destinos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//obtener aviones
app.get('/aviones', (req, res) => {
    db.query('SELECT * FROM aviones', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//obtener clases
app.get('/clases', (req, res) => {
    db.query('SELECT * FROM clases', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//cambiar contraseña
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    console.log('ID recibido:', id);
    db.query('UPDATE usuarios SET password = ? WHERE email = ?', [password, id], (err, result) => {
        if (err) throw err;
        console.log('Usuario actualizado:', result);
        // Mostrar algún dato de la base de datos
      db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) throw err;
        console.log(results);
    });
        res.json(result);
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});