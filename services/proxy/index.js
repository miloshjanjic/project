const config = require('../../config/index');
const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(config.get('path').auth, proxy(
    `http://localhost:${config.get('ports').auth}`,
    {
        proxyReqPathResolver: (req) => {
            return `http://localhost:${config.get('ports').auth}${config.get('path').auth}${req.url}`
        }
    }
));

app.use(config.get('path').users, proxy(
    `http://localhost:${config.get('ports').users}`,
    {
        proxyReqPathResolver: (req) => {
            return `http://localhost:${config.get('ports').users}${config.get('path').users}${req.url}`
        }
    }
));

app.use(config.get('path').recipes, proxy(
    `http://localhost:${config.get('ports').recipes}`,
    {
        proxyReqPathResolver: (req) => {
            return `http://localhost:${config.get('ports').recipes}${config.get('path').recipes}${req.url}`
        }
    }
));

app.use(config.get('path').storage, proxy(
    `http://localhost:${config.get('ports').storage}`,
    {
        proxyReqPathResolver: (req) => {
            return `http://localhost:${config.get('ports').storage}${config.get('path').storage}${req.url}`
        }
    }
));

app.use('/', express.static(`${__dirname}/../../public/`));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

const PORT = process.env.PORT || config.get('ports').proxy;

app.listen(PORT, err => {
    if (err) {
        return console.log('Could not start proxy service', err);
    }
    console.log(`Proxy service successfully started on port ${PORT}`);
});

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');

//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
//         return res.status(200).json({});
//     }
//     next();
// }); // mozebi da mozebi ne