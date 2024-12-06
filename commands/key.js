import inquirer from "inquirer"
import colors from "colors"
import { KeyManager } from "../lib/KeyManager.js"
import { isRequired } from "../utils/validation.js"

export const key = {
    async set() {
        const keyManager = new KeyManager();
        const input = await inquirer.prompt([
            {
                type: 'input',
                name: 'key',
                message: 'Enter API Key '.green + 'https://nomics.com',
                validate: isRequired
            }
        ]);

        const key = keyManager.setKey(input.key)

        if(key) {
            console.log('API Key Set'.blue);
        }
    },

    show() {
        try {
            const keyManager = new KeyManager();
            const key = keyManager.getKey();

            console.log('Current API Key: ', key.yellow);

            return key;
        } catch (error) {
            console.log(error.message.red)
        }
    },

    remove() {
        try {
            const keyManager = new KeyManager();
            keyManager.deleteKey();

            console.log('Key Removed'.blue);

            return;
        } catch (error) {
            console.log(error.message.red)
        }
    }
}

