const http = require('./src/http');
const mongo = require('./src/mongo');

try {
    (async () => {
        await mongo.init();
        await http.init();
    })();
} catch(e) {
    console.error(`Application can't start correct ${e.stack}`);
    process.exit(1);
}
