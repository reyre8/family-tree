# GeekTrust Test for LEXICON
#### *Applicant: Reynaldo Rojas*

### Requisites
The test requires [Node.js](https://nodejs.org/) in order to run.
No particular dependencies were used in the implementation.

### Steps to test
Once the project folder has been unzipped, open a console, and navigate to the root of the projects folder. The structure of the project should be like the following:
```sh
lx
├── .eslintrc.json
├── README.md
├── config.js
├── data
│   ├── default-input.txt
│   ├── initial-input.txt
│   └── root-node.js
├── geektrust.js
├── package-lock.json
├── package.json
├── src
│   ├── app.js
│   ├── entities
│   │   ├── family-node.js
│   │   ├── family-tree
│   │   │   ├── family-tree.js
│   │   │   └── relationship-matrix.js
│   │   ├── family-tree-instruction.js
│   │   ├── family-tree-operation.js
│   │   └── person.js
│   ├── factories
│   │   ├── family-node-factory.js
│   │   ├── family-tree-factory.js
│   │   ├── family-tree-instruction-factory.js
│   │   ├── family-tree-operation-factory.js
│   │   └── person-factory.js
│   ├── init-family-tree.js
│   └── libs
│       └── message
│           ├── index.js
│           └── lang.js
└── tests
    ├── entities
    │   ├── family-node.test.js
    │   ├── family-tree-instruction.test.js
    │   ├── family-tree-operation.test.js
    │   ├── family-tree.test.js
    │   ├── person.test.js
    │   └── provider
    │       ├── data
    │       │   └── test-input.txt
    │       ├── family-node-provider.js
    │       ├── family-tree-instruction-provider.js
    │       ├── family-tree-operation-provider.js
    │       └── family-tree-provider.js
    └── factories
        ├── family-node-factory.test.js
        ├── family-tree-factory.test.js
        ├── family-tree-instruction-factory.test.js
        ├── family-tree-operation-factory.test.js
        ├── person-factory.test.js
        └── provider
            ├── family-node-factory-provider.js
            ├── family-tree-factory-provider.js
            ├── family-tree-instruction-factory-provider.js
            ├── family-tree-operation-factory-provider.js
            └── person-factory-provider.js
```

In order to install the application, run the following command:
```sh
npm install --silent
```

In order to execute the application, run  the following command:
```sh
npm start --silent [-- filePath]
```
Where `-- filePath` is the path of the file to be tested. If the parameter `filePath` is not provided, the application will be run using the file `data/default-input.txt`. This parameter can be found in the file `config.js`

In order to test the application, run the following command:
```sh
npm test
```
