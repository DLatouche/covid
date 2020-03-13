class API {
    constructor() {
        if (!API.instance) {
            this.baseURL = "http://localhost:3000/"
            API.instance = this;
        }

        return API.instance;
    }

    request = (verbe, url, data) => {
        return fetch(this.baseURL + url, {
            method: verbe,
            body: data,
        })

    }

    getJson = async (file) => {
        try {
            let resolveData = await this.request("GET", "data/" + file)
            return resolveData.json()
        } catch (e) {
            console.log("%cAPI.js -> 25 ERROR: e", 'background: #FF0000; color:#FFFFFF', e)
        }
    }
}

const instance = new API();
Object.freeze(instance);

export default instance;