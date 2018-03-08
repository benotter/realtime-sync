export namespace DEFAULTS
{
    export const PORT = 8117;
    export const SERVER = {
        HOST: ''
    };
    export const CLIENT = {

    };
}

export namespace NETWORK 
{
    export const DEFAULT_PORT: number = 8117;
}

export namespace USER 
{
    export const DEFAULT_USERNAME = "";
}

export namespace FILE 
{
    export const DEFAULT_FILENAME: string = "";
}

export namespace LOG 
{
    export const SERVER_START: string = "RS Server Started Up";
    export const SERVER_STOP = "";
    export const SERVER_ERROR = "";
}

export namespace STRING 
{
    export const ERROR = {
        JOIN_USER_ID_EXISTS: "",
        USERID_ID_DOESNT_MATCH: "",

        USERCLIENT_ALREADY_CONNECTED: "",
    };
}

export namespace PROG 
{
    export const ARGS = {
        PORT: "--port",

        SERVER_MODE: "server",
        SERVER_HOST: "--host",

        CLIENT_MODE: "client",
        CLIENT_USERNAME: "--username",
        CLIENT_ID: "--userID"
    };
}