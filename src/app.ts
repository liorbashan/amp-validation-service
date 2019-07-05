import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';

(async () => {
    const baseDir = __dirname;
    const app = createExpressServer({
        controllers: [baseDir + '//controllers/*{.js,.ts}'],
        // middlewares: [baseDir + "/modules/**/middlewares/*{.js,.ts}"]
    });
    const port: number = Number(process.env.PORT) || 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
})();
