# deployignore

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]


## What is deployignore?

Deployignore is a package that uses one command, `deployignore`, to delete a list of files or folders that you specify in a file called `deployignore.json`.  Keep `deployignore.json` at the root of your project and commit it to source control.  When you're ready to deploy your project, simply run the `deployignore` command in your project directory as part of your CI or other deployment script.  This will delete the files and folders in your `deployignore.json` file.

## Getting Started 

To install Deployignore:

[Install Node and npm if you haven't already.](https://www.npmjs.com/get-npm)

Install Deployignore via npm:
`npm install -g deployignore`

Create a deployignore.json file:
`touch deployignore.json`

See the example `deployignore.json` file below to see what goes in that file.

Running `deployignore` in your project directory with an empty `deployignore.json` file should return an exit code of 0.

## Documentation

Here's an example `deployignore.json` file:

```js 
[
"file1.txt",
"subdir/subsubdir/file2.txt",
"file3.txt"
]
```

You can run Deployignore anywhere in your project:

`~/my-project $ deployignore`
`~/my-project/bin/models $ deployignore`
(both of these work)

Verbose mode gives extra information:
`~/my-project $ deployignore --verbose`

