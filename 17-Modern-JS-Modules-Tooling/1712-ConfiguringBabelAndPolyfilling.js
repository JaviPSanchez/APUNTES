import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import add, { cart } from './1705-shoppingCart.js';

add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

/*
Now that we activated bundling it's time to configure Babel to transpile our super modern code back to ES5 code. And this is still important right now even many years after the new ES6 standard has been introduced. And the reason for that is simply that there are still many people out there who are stuck on like a windows XP or windows 7 computer!!! and they cannot upgrade their old internet explorers but we want our applications to work for everyone. And so we need to keep everyone in mind.

Now, the good news is that parcel actually automatically uses Babel to transpile or code. And we can configure Babel a lot if we want to for example defining exactly what browsers should be supported but as always, that's a ton of work.
And so we don't want that. And instead parcel makes some very good default decisions for us. And so we will simply mainly just go with these defaults.

Now just so you get a very broad and very general overview of how Babel works.
Let's just take a look at their website. So that's Babeljs.io and then here in the documentation let's take a look here at plugins. Okay. So basically Babel works with plugins and presets that can both be configured. Now a plugin is basically a specific JavaScript feature that we want to transpile. So to convert.
So for example let's say we only wanted to convert arrow functions back to ES5
but leave everything else in ES6 for example, const and var declarations.
Now usually that doesn't make a lot of sense because basically we will want to transpile everything at the same time.

And so usually instead of using single plugins for each of these features, Babel actually uses presets. And so a preset is basically a bunch of plugins bundled together. And its by default parcel is going to use this preset here.

@babel/preset-env

And this preset will automatically select which JavaScript features should be compiled based on browser support. And again that will all happen automatically
and out of the box Babel will convert all features So only browsers that are barely used anymore with the market share of less than 0.25% are not going to be supported by the transpiling with this preset here.

So, that's a very brief overview and we will come back here in a second but for now let's start on npm run start script again:

👉 npm run start

just so we can take a look again at our final output.

And so now the script it ads:

<script defer="" src="/index.f8345a9e.js"></script>

So this one and we can see right away that ES6 is no longer there. So here we have var instead of const that we had before. Let's see if we have something else.
There are not template literal either. So everything that we used from ES6 is now gone. But now let me show you something important.

So let's write some code here which is basically not part of this preset here:

@babel/preset-env

because this preset-env does actually only include final features. So features that are already part of the language after passing the four stages of the AGMA process.

However, previously we used class fields which at the time of recording are only at stage three. And so let me show you how we could transpile a class fields as well. So let's just write a simple example here:
*/
class Person {
  //We make this private with #:
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const javi = new Person('Javi'); //Hey, Javi
/*
Podemos ver como lo convierte en ES5:




Now there's still two more things that I need to show you here still. And so let's write some more code here. So what I will do now is to use the ES6 find method to find products in a cart that are edit more than twice:
*/
console.log(cart.find(el => el.quantity >= 2));
/*
Remember this is an ES6 method so the arrow function that we had is gone and it was replaced by this regular function. However, the ES6 method find is still here. So it has not been converted to ES5.

Now the same is too for other things for example, let's try promises:
*/
Promise.resolve('TEST').then(x => console.log(x));
/*
So we're creating an immediately resolved promise to make this really a quick example  then promise is also not converted to ES5. So remember promise is an ES6 feature but again, it was not converted back to ES5 and the reason for that is that Babel can actually only transpile ES6 Syntax. So data things like arrow functions, classes, const, or the spread operator. So these are basically things
that have an equivalent way of writing them in ES5. But the same is not true for real new features that were added to the language like find and promise.

So these new additions to the language so these new features, they can simply not be transpiled. It's simply not possible. Only syntax is easy to convert, so easy to compile. However, all hope is not lost.

So for these added features such as promises or all the array methods like finds and really a bunch of other stuff, we can polyfill them. And so that's why since the beginning I've always been saying transpiling and polyfilling.

So these new features, we have to polyfill them. Now Babel used to do polyfilling
out of the box some time ago but recently they started to simply recommending another library. And so we now have to manually import data as well:
*/
import 'core-js/stable';
/*
So import core-js so that's the name of the library. And then we usually only want to import a part of that library and that's called "stable". Now usually we have to install all of the packages first but fortunately parcel is smart enough to install this automatically.

But anyway, let's go back to our code but you will notice that's the code we had before is actually still there. So it's still the same and promise and find have not been replaced. And that's because that's simply not the way it's supposed to work. So instead what polyfilling does is to basically recreate defined function
and to make it available in this bundle so that the codes can then use it.

So let's search for array.prototype which remember, is where all the array methods are put.  So Babel then uses this weird create methods. But what matters here is that this will basically implement array prototype find and the same for find index, every, some, filter, map, and also for each, even though these less ones here are not ES6 but for some reason they are still polyfilled here.



However, as you just saw before the polyfilling is going to polyfill everything
even if we don't need it. And so if we wanted we could cherry pick basically just the features that we actually want to polyfill. Now that of course is a lot of work but it will also greatly reduce the bundle size. And so it might be worth it
if that's really a concern.

So instead of basically importing everything we can do:
*/
import 'core-js/stable/array/find';
import 'core-js/stable/promise';
/*
And so probably only this one was not polyfilled and the same you could do for a promise. So that's going to be a lot of work which we usually don't do but it is possible again if you are really worried about your bundle size.

Finally, just to finish there is still one feature that is not polyfilled by this one here:

import 'core-js/stable';

And so we always need to install just one more package which is called NPM install regenerator-runtime:

👉 npm i regenerator-runtime

So let's see, let's already include it here:
*/
import 'regenerator-runtime/runtime';
/*
So this here is for polyfilling async functions. So again, it probably looks a bit confusing that we have to do all of this, but yeah, don't worry. It's just a recipe that you have to follow. Okay. And usually you would put these imports here right at the top of your file but in this case, we can just leave them here
because they will be hosted anyway, right? Also keep in mind that all of this might change. And so if you're watching this video like in two years from now,
then things might be different and things might not work the same. And so once again make sure that you then install exactly the same versions as I have here
especially this core-js and regenerator-runtime.

And of course, also parcel. So just as I told you in the last video. And with this, we're actually done with this video and also with learning about Modern JavaScript Development. So basically with learning about Tooling, such as parcel and babel and also about modules. Now in the remainder of this section,
so the next two videos we will just quickly also talk about modern JavaScript coding.

And so there we will learn or actually more review how to write clean and modern JavaScript code.
*/
