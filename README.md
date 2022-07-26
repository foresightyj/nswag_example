# a list of useful stackblitz demos

* [Learn Ngx Formly - StackBlitz]( https://stackblitz.com/edit/ngx-formly-custom-template-xiphz4 )
* [Rxjs Concurrent Ajax Requests - StackBlitz]( https://stackblitz.com/edit/rxjs-r7uce1?devtoolsheight=60&file=index.ts )
* [learn zod - StackBlitz]( https://stackblitz.com/edit/typescript-yxh8cw?file=index.ts )

# useful references

[javascript - @nestjs/swagger: How to add schema without @ApiOkResponse decorator? - Stack Overflow]( https://stackoverflow.com/questions/69011886/nestjs-swagger-how-to-add-schema-without-apiokresponse-decorator )

[[next] Major release notes & plans · Issue #191 · nestjs/swagger]( https://github.com/nestjs/swagger/issues/191 )
[lukeautry/tsoa: Build OpenAPI-compliant REST APIs using TypeScript and Node]( https://github.com/lukeautry/tsoa )

[cdimascio/express-openapi-validator: 🦋 Auto-validates api requests, responses, and securities using ExpressJS and an OpenAPI 3.x specification]( https://github.com/cdimascio/express-openapi-validator )

# how to setup automatic upgrade of local lib

```
c://working/lib:
{
    script: {
        "prepub": "rimraf *.gz",
        "pub": "npm version patch && npm run build",
        "postpub": "npm --prefix C://working/app run uplib"
    }
}

c://working/app:
{
    scripts: {
        "preuplib": "rimraf *.gz && cp C://Working/app/*.gz .",
        "uplib": "node upgrade_lib.js",
    }
}
```
then in ~/.bashrc:

```
alias u="npm --prefix C://working/lib run pub"
```

export const localStorage = (() => {
    if (IS_DEV) {
        const localStorageVersion = {
            getItem(key: string): Promise<string | undefined> {
                return Promise.resolve(localStorage.getItem(key) || undefined);
            },
            setItem(key: string, value: string): Promise<string> {
                localStorage.setItem(key, value);
                return Promise.resolve(value);
            },
            removeItem(key: string): Promise<void> {
                return Promise.resolve(localStorage.removeItem(key));
            },
        };
        return localStorageVersion;
    } 
})();



# how to do git rebase?

https://app.pluralsight.com/course-player?clipId=0a583d6d-c0ef-4b06-a878-39a25d0c385e

