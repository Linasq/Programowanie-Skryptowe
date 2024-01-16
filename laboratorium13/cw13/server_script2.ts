import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import logger from "https://deno.land/x/oak_logger/mod.ts";
import {
  dejsEngine,
  oakAdapter,
  viewEngine,
} from "https://deno.land/x/view_engine/mod.ts";
import { MongoClient } from 'mongodb';

// Initiate app
const app: Application = new Application();
const router: Router = new Router({
  // prefix: "/admin",
});
let reqBodyValue: URLSearchParams;


app.use(async (ctx, next) => {
  // Allowing Static file to fetch from server
  /*
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
  });
  */
  
  reqBodyValue = await ctx.request.body().value;
  next();
});


app.use(logger.logger);
app.use(logger.responseTime);

// Passing view-engine as middleware
app.use(viewEngine(oakAdapter, dejsEngine, { viewRoot: "./views" }));

const client = new MongoClient('mongodb://127.0.0.1:27017');
await client.connect();
const db = client.db('ksiega_gosci');
const collection = db.collection('wpis');

// async function test(wpisy) {
//   const x = await wpisy.toArray();
//   return x; 
// }
  /* ******** */
  /* "Routes" */
  /* ******** */
  
  /* ---------------- */
  /* Route "GET('/')" */
  /* ---------------- */
router.get('/', async (ctx) => {
	const wpisy = collection.find();
	// console.log(wpisy);
	// console.log(test(wpisy));
	
	wpisy.toArray().then( async (res) => {
	  console.log(res);
	  await ctx.render("server.ejs", {
		data: { wpis:res },
	  });
	}).catch((e) => {
	  console.log(e);
	});

	// await ctx.render("index.ejs", {
		// data: { title: "First Oak application in Deno" },
	// });
	await ctx.render("server.ejs", {
	  data: { wpis:wpisy },
	});

});
  /* ------------------ */
  /* Route "POST('/')" */
  /* ---------------- */
router.post('/', async (ctx) => {
	// collect input from form
	const name: string = reqBodyValue.get("name") || '';
	const wpis: string = reqBodyValue.get("area") || '';

	await collection.insertOne({name:name, area:wpis});

	// Creating an answer header — we inform the browser that the returned data is plain text
	ctx.response.redirect('/');
});

// Adding middleware to require our router
app.use(router.routes());
app.use(router.allowedMethods());

// Making app to listen to port
console.log("App is listening to port: 8000");
await app.listen({ port: 8000 });
