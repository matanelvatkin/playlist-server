require('dotenv').config();
require('./DL/db').connect();
const mainRouter = require('./Router');
const express = require('express');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions ={
    origin:'https://playlist-client.onrender.com', 
    credentials:true,
    optionSuccessStatus:200
}

app.use(express.json());
app.use(cors(corsOptions));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.2.0",
      title: "myPlaylist",
      description: "music app",
      contact: {
        name: "matanel vatkin",
        email: "matanelvatkin@gmail.com"
      },
      servers: ["https://playlist-rif9.onrender.com"]
    }
  },
  apis: ["index.js",'./Router/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use('/',express.static('avatar_image'))
app.use('/api', mainRouter);

app.listen(PORT, () => {
  // console.log('server listen to ' +PORT);
});
