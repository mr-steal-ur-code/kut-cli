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
const reactComponent = "react-component";

const promptUser = async () => {
	const answers = await inquirer.prompt([
		{
			type: "list",
			name: "routeType",
			message: "What type of route do you want to create?",
			choices: [astroPageRoute, expressRouter, reactComponent],
		},
		{
			type: "input",
			name: "name",
			message: "What is the name of the route?",
		},
		{
			type: "confirm",
			name: "isPageComponent",
			message: "Is this a page component?",
			default: false,
			when: (answers) => answers.routeType === reactComponent,
		},
	]);

	return answers;
};

const createRoute = async ({ routeType, name, isPageComponent }) => {
	const templatesDir = path.join(__dirname, "templates");
	let destination;
	let templateFile;

	if (routeType === astroPageRoute) {
		destination = `src/pages/${name}/index.astro`;
		templateFile = path.join(templatesDir, "astro-page-route.hbs");
	} else if (routeType === expressRouter) {
		destination = `functions/src/routes/${name}/${name}.ts`;
		templateFile = path.join(templatesDir, "express-router.hbs");
	} else if (routeType === reactComponent) {
		destination = isPageComponent
			? `src/pages/${name}/${name}.tsx`
			: `src/components/${name}/${name}.tsx`;
		templateFile = path.join(templatesDir, "react-component.hbs");
	}

	const templateContent = await fs.readFile(templateFile, "utf8");
	const template = handlebars.compile(templateContent);

	const output = template({ name });

	await fs.outputFile(destination, output);
	console.log(`${routeType} created: ${destination}`);
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
