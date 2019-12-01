# GeekTrust Test for LEXICON
#### *Applicant: Reynaldo Rojas*

### Requisites
The test requires [Node.js](https://nodejs.org/) in order to run.
No particular dependencies were used in the implementation.

### Steps to test
Once the project folder has been unzipped, open a console, and navigate to the root of the projects folder. The structure of the project should be like the following:
```sh
├── default-input.txt
├── init.js
├── main.js
├── person.js
├── README.md
├── tree.js
└── treeOperation.js
```
In order to execute the application, run  the following command:
```sh
node main.js filePath
```
Where `filePath` is the path of the file to be tested. If the parameter `filePath` is not provided, the application will be run using the file `default-input.txt`

### Improvements to implement

  - Implement ESLINT linter.
  - Sanitise operation entries.
  - Integrate app with unit test engine. Also implement unit tests.
  - Typecast parameters on classes constructors.
  - More dependency injection where applicable.
  - Throw errors where applicable, and wrap executions on try-catch.
  - Override Person.gender set method, so the value of gender cannot be hijacked (This applies to the rest of the classes properties).
  - Improve input file validation.

