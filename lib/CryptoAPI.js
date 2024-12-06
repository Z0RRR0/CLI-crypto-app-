import axios from "axios";
import chalk from "chalk";
import colors from "colors";
import { KeyManager } from "./KeyManager.js";
import dotenv from "dotenv"
dotenv.config()

const keyManager = new KeyManager();

export class CryptoAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = process.env.BASE_URI;
    }

    async getPriceData(coinOption, curOption) {
        try {
            // Formatter for currency
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: curOption
            })

            const coinNames = {
                BTC: "Bitcoin", 
                ETH: "Ethereum",
                XRP: "Ripple"
            };

            if(keyManager.getKey() === process.env.API_KEY){
                const res = await axios.get(`${this.baseUrl}?fsyms=${coinOption}&tsyms=${curOption}`);

            const data = res.data;

            let output = '';
            for (const [coin, prices] of Object.entries(data)) {
                output += `\nCoin: ${coin.yellow} | ${coinNames[coin].cyan}\n`;
                for (const [currency, price] of Object.entries(prices)) {
                    output += `Price: ${formatter.format(price)}\n`.green;
                  }
            }

            return output;
            } else{
                const currentKey = keyManager.getKey() || 'undefined'
                const defaultKey = process.env.API_KEY || 'a63dd830-19c7-4468-8384-362be11a970a'
                console.log(chalk.cyanBright(`Either "${currentKey.red}" is wrong or not working properly... Or try default key: ${defaultKey.red}`))
            }

        } catch (error) {
            console.error(error);
        } 
    }
}