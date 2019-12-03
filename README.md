# GeekTrust Test for LEXICON
#### *Applicant: Reynaldo Rojas*

### Requisites
The test requires [Node.js](https://nodejs.org/) in order to run.
No particular dependencies were used in the implementation.

### Steps to test
Once the project folder has been unzipped, open a console, and navigate to the root of the projects folder. The structure of the project should be like the following:
```sh
lx
├── README.md
├── data
│   └── default-input.txt
├── geektrust.js
├── init.js
├── package-lock.json
├── package.json
├── src
│   ├── family-node.js
│   ├── family-tree-operation.js
│   ├── family-tree.js
│   ├── person.js
│   └── relationship-matrix.js
└── tests
    ├── family-node.test.js
    ├── family-tree.test.js
    └── person.test.js
```

In order to install the application, run the following command:
```sh
npm install
```

In order to execute the application, run  the following command:
```sh
npm start [-- filePath]
```
Where `-- filePath` is the path of the file to be tested. If the parameter `filePath` is not provided, the application will be run using the file `data/default-input.txt`

In order to test the application, run the following command:
```sh
npm test
```

### Assumptions

  - 


### Improvements to implement

  - Implement ESLINT linter.
  - Sanitise operation entries.
  - Typecast parameters on classes constructors.
  - More dependency injection where applicable.
  - Override Person.gender set method, so the value of gender cannot be hijacked (This applies to the rest of the classes properties).
  - Improve input file validation.

