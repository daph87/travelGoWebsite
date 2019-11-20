const express = require("express");
const server = express();
const cors = require("cors");
const multer = require("multer");

const usersController = require("./controllers/user-controller");
const vacationsController = require("./controllers/vacations-controller");
const followsController = require("./controllers/follows-controller");

const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
const vacationsLogic = require("./bll/vacations-logic");

server.use(express.json());
server.use(cors());
server.use("/api/users", usersController);
server.use("/api/vacations", vacationsController);
server.use("/api/follows", followsController);

const storage = multer.diskStorage({
    destination: './assets/images',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

server.set('view engine', "ejs");
server.use(express.static('./assets/images'));

server.get('/', (request, response) => response.render('index'));

server.post('/upload', (request, response) => {
    upload(request, response, (err) => {
        console.log("upload function");
        if (err) {
            console.log("upload err 1 ");
            response.render('index', {
                msg: err
            });
        } else {
            if (request.file === undefined) {
                console.log("upload err 2 ");
                response.render('index', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                console.log("file updaeted err 1 ")

                response.render('index', {
                    msg: 'File Uploaded!',
                    file: `assets/images/${request.file.filename}`

                });
                console.log(request.file.filename)
                vacationsLogic.addVacation(JSON.parse(request.body.addedVacation), request.file.filename);
            }
        }
    });
});

const httpServer = http.createServer(server).listen(3002, () => console.log("socket"));
const socketServer = socketIO.listen(httpServer);
const allSockets = [];
server.use(express.static(__dirname));

socketServer.sockets.on("connection", async socket => {
    allSockets.push(socket);
    socket.on('admin-made-changes', async () => {
        socketServer.sockets.emit('admin-made-changes', await vacationsLogic.getAllVacations());
    })


    socket.on("disconnect", () => {
        const index = allSockets.indexOf(socket);
        allSockets.splice(index, 1);
    });

});

server.listen(3001, () => console.log("Listening..."));

