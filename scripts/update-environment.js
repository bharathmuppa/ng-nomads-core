const { Project, SyntaxKind } = require('ts-morph');

const path = require('path');

// Function to update the routes
export default function updateEnvironments(newRoute, entityName) {

    // Initialize a project
    const project = new Project({
        tsConfigFilePath: path.join(__dirname, './tsconfig.json'),
    });

    // Path to the environment files
    const environmentInterfacePath = path.join(__dirname, './environments/environment.interface.ts');
    const environmentDevPath = path.join(__dirname, './environments/environment.development.ts');
    const environmentPath = path.join(__dirname, './environments/environment.ts');

    // Add the source file to the project
    const sourceFileEnvironmentInterfacePath = project.addSourceFileAtPath(environmentInterfacePath);
    const sourceFileEnvironmentDevPath = project.addSourceFileAtPath(environmentDevPath);
    const sourceFileEnvironmentPath = project.addSourceFileAtPath(environmentPath);

    // Find the routes array
    const interfaceDeclaration = sourceFileEnvironmentInterfacePath.getInterface()
        .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
    const environmentDevObj = sourceFileEnvironmentDevPath.getVariableDeclaration('environment')
        .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
    const environmentObj = sourceFileEnvironmentPath.getVariableDeclaration('environment')
    .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
  
    // Add new route
    interfaceDeclaration.addProperty(entityName+'sURL');
    environmentDevObj.addProperty(entityName+'sURL');
    environmentObj.addProperty(entityName+'sURL');

    

    // Save the updated file
    sourceFileEnvironmentInterfacePath.saveSync();
    sourceFileEnvironmentDevPath.saveSync();
    sourceFileEnvironmentPath.saveSync();

}
