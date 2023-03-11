const path = require('path');

const featuresDir = path.join(process.cwd(), 'src/features');

/**
 * 
 * @type {import('plop').PlopGenerator}
 */
module.exports = {
  description: 'Feature Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'feature name',
    },
  ],
  actions: () => {
    return [
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/index.ts',
        templateFile: 'generators/feature/index.ts.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/api/create{{ properCase name }}.ts',
        templateFile: 'generators/feature/api/createFeature.ts.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/api/delete{{ properCase name }}.ts',
        templateFile: 'generators/feature/api/deleteFeature.ts.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/api/get{{ properCase name }}.ts',
        templateFile: 'generators/feature/api/getFeature.ts.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/api/get{{ properCase name }}s.ts',
        templateFile: 'generators/feature/api/getFeatures.ts.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/api/update{{ properCase name }}.ts',
        templateFile: 'generators/feature/api/updateFeature.ts.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/components/Create{{ properCase name }}.tsx',
        templateFile: 'generators/feature/components/CreateFeature.tsx.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/components/Delete{{ properCase name }}.tsx',
        templateFile: 'generators/feature/components/DeleteFeature.tsx.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/components/{{ properCase name }}ListItem.tsx',
        templateFile: 'generators/feature/components/FeatureListItem.tsx.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/components/{{ properCase name }}List.tsx',
        templateFile: 'generators/feature/components/FeatureList.tsx.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/components/Update{{ properCase name }}.tsx',
        templateFile: 'generators/feature/components/UpdateFeature.tsx.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/routes/{{ properCase name }}.tsx',
        templateFile: 'generators/feature/routes/Feature.tsx.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/routes/{{ properCase name }}s.tsx',
        templateFile: 'generators/feature/routes/Features.tsx.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/routes/index.tsx',
        templateFile: 'generators/feature/routes/index.tsx.hbs',
      },
      {
        type: 'add',
        path: featuresDir + '/{{camelCase name}}/types/index.ts',
        templateFile: 'generators/feature/types/index.ts.hbs',
      },
    ];
  },
};
