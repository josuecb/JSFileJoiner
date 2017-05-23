# FileJoiner
This Javascript class will let you add your library for back-end into one file according to your folder tree.

To use this FileJoiner class, you must create a config.json writing inside the key tree the value of tree will be your custom file hierarchical tree.

# How to use it

## Create config.json
Lets suppose we have our javascript folder and this is the tree of our library:

```
| js -
      | src - 
             * lib1
             * libs2
      * FileJoiner
      * main
```

So our config.json should be something like this:

```json
{
  "tree": {
    "js": {
      "src": [
        "lib1",
        "lib2"
      ],
      "": [
        "main"
      ]
    }
  }
}
```

You must put the key `tree` as parent root (only in the json file) and add the files that you want to import in the order you want,
you can create as many config.son file as you want.

## Use the FileJoiner class
```js
    var path = __dirname.split("test")[0];
    var f = require("./FileJoiner"); // call the class with require (nodejs)
    
    var al = new f(path + "test\\config.json", __dirname);
    al.load();                          // loads the config file
    al.write(__dirname + "\\test.js");  // creates the test.js file    
```

The construction have 2 arguments:

- First argument: is the absolute path for the json file.
- Second argument: is the absolute path of your javascript root path.

#### For example
Our host is localhost lets supose our javascript library is in 'js' folder

```
| root -
         | js -
               | folder
               * class.js
               * ...
```

our js folder is in main folder so our second argurment must be `/`

```
| localhost -
             | folder1 -
                        | folder2 -
                                   | js -
                                         | folder
                                         * class.js
                                         * ...
```                                         
Our js folder is in a sub direcotyr so our second argurment must be `/folder1/folder2/`
