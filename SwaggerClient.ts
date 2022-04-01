import { Injectable } from "@angular/core";
import { Client } from "src/api";

export function jsonReviver(key: string, value: any) {
    if (typeof value === 'string') {
        if (value.startsWith("20") && /^\d{4}-\d{2}-\d{2}/.test(value)) {
            const d = new Date(value);
            return d;
        }
    }
    return value;
}


@Injectable()
export class SwaggerClient extends Client {
    protected override jsonParseReviver = jsonReviver;
}