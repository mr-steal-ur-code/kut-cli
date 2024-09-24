#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs-extra";
import handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const astroPageRoute = "Astro-Page-Route";
const expressRouter = "Express-Router";

const promptUser = async () => {
	const answers = await inquirer.prompt([
		{
			type: "list",
			name: "routeType",
			message: "What type of route do you want to create?",
			choices: [astroPageRoute, expressRouter],
		},
		{
			type: "input",
			name: "name",
			message: "What is the name of the route?",
		},
	]);

	return answers;
};

const createRoute = async ({ routeType, name }) => {
	const templatesDir = path.join(__dirname, "templates");
	const destination =
		routeType === astroPageRoute
			? `src/pages/${name}/index.astro`
			: `functions/src/routes/${name}/${name}.ts`;

	const templateFile = path.join(
		templatesDir,
		routeType === astroPageRoute ? "astro-page-route.hbs" : "express-router.hbs"
	);

	const templateContent = await fs.readFile(templateFile, "utf8");
	const template = handlebars.compile(templateContent);

	const output = template({ name });

	await fs.outputFile(destination, output);
	console.log(`${routeType} route created: ${destination}`);
};

const run = async () => {
	try {
		const answers = await promptUser();
		await createRoute(answers);
	} catch (error) {
		console.error("Error creating route:", error);
	}
};

run();
