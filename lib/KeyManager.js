import Configstore from "configstore";
import { read, readFileSync } from 'fs';   

const pkg = JSON.parse(readFileSync('./package.json'));

export class KeyManager {
    constructor() {
        this.config = new Configstore(pkg.name)
    }

    setKey(key) {
        this.config.set('apiKey', key);
        return key;
    }

    getKey() {
        const key = this.config.get('apiKey');

        if(!key) {
            throw new Error('No API Key Found - Get a key at https://nomics.com');
        }

        return key;
    }

    deleteKey() {
        const key = this.config.get('apiKey');

        if(!key) {
            throw new Error('No API Key Found - Get a key at https://nomics.com');
        }

        this.config.delete('apiKey');

        return;
    }
}

