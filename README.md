# A list of good examples of rx.js in Angular

## 第一个

下面这个我刚刚看了一下product list页面的写法，写得很不错。什么时候看看能不能找到这个pluralsight的course下来看看。

这里也看到angular 里面service的作用，本质是上剥离UI和逻辑。。。 也就是services里面的addProduct, selectedProduct$等方法或者变量，是完全可以脱离于UI的，你可以把这些代码原封不动的拿走去写一个react或者vue的UI。当然也代表这这个service可以单独的测试，不涉及到任何的UI或者DOM的mocking。。 这就是component 与service在angular下面的分工不同。。

当然从这个角度来说，用service做state management也是可以的。 但是一般用了rxjs之后，service里面的一般state都是以observerable或者subject的方式存在的，不会以普通的变量。。。更不能用普通的变量做多个component之间的通信的方式。。

[DeborahK/Angular-RxJS: Sample Angular application that uses RxJS for reactive development. Find the associated Pluralsight course here: https://app.pluralsight.com/library/courses/rxjs-angular-reactive-development]( https://github.com/DeborahK/Angular-RxJS )

## 第二个

这个作者的blog感觉还挺值得一看的。

[Practical Angular: The Most Impactful RxJs Best Practice Of All Time | by Tomas Trajan | Medium]( https://tomastrajan.medium.com/practical-angular-the-most-impactful-rxjs-best-practice-tip-of-all-time-c5d717ec8c4b )

## 第三个

以前我推荐过的:

https://github.com/trungk18/jira-clone-angular
[Angular Jira Clone with Akita and TailwindCSS - by trungk18]( https://jira.trungk18.com/project/board )

当然了，这个里面使用了一个第三方的state management库维护状态，也可以不看。。我感觉你理解了上面第一个项目的例子应该够可以了。


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

