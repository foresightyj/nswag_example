
# Ag-grid 区分两种Update

1. programmatically 修改数据叫 **Updates**
2. 用户通过界面操作带来的改动叫做 **Edit**.

# 不过昨天晚上有一个我猜错了，就是ag-grid确实允许你继续mutate你传给他的数据

在这里提到: [Angular Data Grid: Updating Data]( https://www.ag-grid.com/angular-data-grid/data-update/ )

> The grid's data is updated from elsewhere in your application. This can happen if you pass data to the grid and then subsequently change that data outside of the grid. This leaves the grid's view out of sync with the data that it has. In this instance what you want to do is View Refresh to have the grid's UI redraw to display the data changes.

在这里提到 [Angular Data Grid: View Refresh]( https://www.ag-grid.com/angular-data-grid/view-refresh/ )

## 注意这里说的，假如你通过ag-grid的public api改变，就无需调用refreshCells

> The grid has change detection. So as long as you are updating the data via the grid's API, the values displayed should be the most recent up to date values.

## 注意这里谈到了，你跳过ag-grid的public api去改变数据，此时ag-grid就不知道你改了啥了,此时就需要调用refreshCells或者redrawRows来刷新，让UI与数据同步

> However sometimes you may be updating the data outside of the grids control. When you give data to the grid, the grid **will not make a copy**. Thus if you change the value of the data outside of the grid, the grid will also be impacted by that data change.

既然ag-grid也没有说这种跳过public api的方式mutate数据不可以，而且明显还是支持的。 **当然我仍然觉得，还是public api比较explicit，可读性比较强**. 另外，**你们代码里面，最好划分一下什么场景使用什么方法。譬如可以说，新增一行的时候，通过api，后来的update，可以这么直接mutate，然后refreshcells**.

# 当然昨天晚上的那个问题，是不是还是异步哪里有问题。 我推荐一些做法，(promise还是observerable都适用)

我以observerable为例，举例一个异步场景，就是你下单了food，收到之后还要微波炉加热一下，然后开始吃饭. 可能很多人写异步代码的时候可能是这么写的

```ts
    interface Food {
        name: string,
        temperature: number,
    }
    class EatComponent {
        private food: Food;

        ngOnInit(){
            this.orderFood().subscribe(()=> {
                this.heatFood();
                this.startEat();
            });
        }

        orderFood(){
            return httpClient.get("...").pipe(tap(food => {
                this.food = food;
            }))
        }

        heatFood(){
            //simulating heating with microwave for 5 minutes and food came out with increased 50 celcius
            timer(5*60*1000).pipe(tap(()=> {
                this.food.temperature+=50;
            }))
        }

        startEat(){
            console.log("eating with:", this.food.name, "with temperature:", this.food.temperature);
        }
    }
```

直接看上面的这个代码，就ngOnit里面来看，好像是对的，一看确实是，下单了food，然后热了一下，然后才开始吃的。 但是事实是错误的，因为吃的饭是冷的，因为没有等待微波炉热结束就开始吃了。

## 我建议所有的方法，你们参数不标记类型就算了，但是返回类型最好标记一下

上面我的例子比较短，假设实际项目中真正的`heatFood`方法洋洋洒洒有80行，因为打开微波炉，设置温度和时间步骤还比较多。里面同步异步回调都有，就不容易一时半会看清楚这个方法在干什么。 按照上面的代码，加上类型，应该是:

```ts
        heatFood():void{
            timer(5*60*1000).pipe(tap(()=> {
                this.food.temperature+=50;
            }))
        }
```

因为这个方法里面用了一个timer，但是没有return这个observerable，所以事实他的返回类型是`void`. 看到这个返回值，然后你知道里面还有异步过程，就会一下子就知道，这个方法fire了异步，但是没有等待。也叫fire & forget (**大部分时候，fire & forget是不对的**)，所以我们调整一下:

```ts
        heatFood(food):Observable<void>{
            return timer(5*60*1000).pipe(tap(()=> {
                this.food.temperature+=50;
            }))
        }
```

加了一个`return`,此时typescript提示你实际返回类型与之前的`void`不匹配，调整一下，`Observable<void>`。此时假如你在ngOnInit里面hover `heatFood`这个方法，你就发现一个方法调用返回了Observable，但是返回值没有被subscribe或者参与到其他rxjs operator，就说明这还是被**fire & forget**掉了。。 假如是Promise，以前typescript-eslint有一个配置，叫`no-floating-promises`，专门提醒这种**fire & forget**的情况，因为大部分时候，这个代表着一种不负责任的调用。。

[typescript-eslint/no-floating-promises.md at main · typescript-eslint/typescript-eslint]( https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-floating-promises.md )

当然rxjs不一定有类似的东西，但是我们看着类型，也可以人工发现这个问题点。此时修改ngOnInit代码为:

```ts
            this.orderFood().subscribe(()=> {
                this.heatFood().subscribe(() => {
                    //now we are sure that `this.food` is heated
                    this.startEat();
                });
            })
```

or better (就是用rxjs pipe operator定义好整个异步的管道流，然后统一在最后进行subscription):

```ts
            this.orderFood()
            .pipe(switchMap(()=>this.heatFood()))
            .subscribe(()=>{
                //now we are sure that `this.food` is heated
                this.startEat();
            })
```

