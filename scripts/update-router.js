const { Project, SyntaxKind } = require('ts-morph');

const path = require('path');

// Function to update the routes

export default function updateRoutes(newRoute) {

    // Initialize a project

    const project = new Project({
        tsConfigFilePath: path.join(__dirname, './tsconfig.json'),
    });

    // Path to the app.routing.ts file

    const routingFilePath = path.join(__dirname, './src/app/app.routing.ts');

    // Add the source file to the project

    const sourceFile = project.addSourceFileAtPath(routingFilePath);
    
    // Find the routes array

    const routesArray = sourceFile.getVariableDeclaration('APP_ROUTES')

        .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);



    // Add new route

    routesArray.addElement(newRoute);



    // Save the updated file

    sourceFile.saveSync();

}



