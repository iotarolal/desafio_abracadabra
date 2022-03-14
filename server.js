const express = require('express');
const app = express();


//  hacer publicas las carpetas
app.use(express.static('static'))
app.use(express.static('assets'))


// Arreglo de usuarios
const arrayusuarios  = ['juan', 'Paulina','xime', 'ivan', 'franco', 'valentin', 'sofia']   

// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de
// la ruta /abracadabra/usuarios.

app.get('/abracadabra/usuarios', async (req, res) => {
    return res.json(arrayusuarios)
})

// tengo dudas de este requerimiento
app.get('/abracadabra/juego/:usuario', (req,res) => {
    res.send(`Hola, como estás ${req.params.usuario}`);
})
    

// 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
// usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado
// en el servidor.
// En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario
// devolver la imagen “who.jpeg”.

// Middleware
app.use("/abracadabra/juego/:usuario", (req, res, next) => {

    if (arrayusuarios.includes(req.params.usuario)) {
        next()
        return
    } else {
        res.redirect('who.jpeg');
    }
});


// 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el
// número generado de forma aleatoria.
// En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la
// imagen de Voldemort.

app.get("/abracadabra/conejo/:n", (req, res) => {
    
    // obtengo numero al azar
    const numerorandom  = Math.floor(Math.random() * (4 - 1)) + 1;
    // obtengo numero parametro
    const numeroparameter = req.params.numero;
    
    // comparo
    if (numerorandom == numeroparameter) {
        // muestro el conejo
        return res.redirect('conejito.jpg');
    } else {
        res.redirect('/voldemort.jpg');
    }
    
});



// 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...”
// al consultar una ruta que no esté definida en el servidor.

app.get('*', (req, res) => {
    res.send('ruta no existe')
});

//res.redirect("https://desafiolatam.com/");

// servidor express
app.listen(3000, () => {console.log('El servidor está inicializado en el puerto 3000')})

