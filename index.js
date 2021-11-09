const express = require('express');

const cors = require('cors');

const routes = require('./backendurls/urls');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});  
app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.get('/', (req, res) => {
    console.log(`Chet store api`);
    res.send(`Chet store api`)
  });

  app.use(routes);

  const PORT = process.env.PORT || 6000;
  
  app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
      app.emit("app running");
  });
  
  module.exports = app;