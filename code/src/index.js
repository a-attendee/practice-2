"use strict";
// console.log("Hello world") //
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("express");
const repository_1 = require("./repository");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = e.default();
        const db = repository_1.default;
        try {
            yield db.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        const port = 3000;
        app.get('/', (req, res) => {
            req.body;
            res.send('Hello World!');
        });
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    });
}
main();
