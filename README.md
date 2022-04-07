# a list of useful stackblitz demos

## ng formly

https://stackblitz.com/edit/ngx-formly-custom-template-xiphz4

# json to zod

https://stackblitz.com/edit/typescript-yxh8cw?file=index.ts

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

