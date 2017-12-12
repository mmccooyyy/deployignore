#!/usr/bin/env node
const Liftoff = require('liftoff');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const argv = require('minimist')(process.argv.slice(2));

const Deployignore = new Liftoff({
  name: 'deployignore',
  configName: 'deployignore',
  v8flags: ['--harmony']
});

Deployignore.launch({
  cwd: argv.cwd,
  configPath: argv.deployignore,
  completion: argv.completion,
  verbose: argv.verbose
}, invoke);

function invoke (env) {

  if (argv.verbose) {
    console.log('LIFTOFF SETTINGS:', this);
    console.log('CLI OPTIONS:', argv);
    console.log('CWD:', env.cwd);
    console.log('SEARCHING FOR:', env.configNameRegex);
    console.log('FOUND CONFIG AT:',  env.configPath);
    console.log('CONFIG BASE DIR:', env.configBase);
    console.log('YOUR LOCAL MODULE IS LOCATED:', env.modulePath);
    console.log('LOCAL PACKAGE.JSON:', env.modulePackage);
    console.log('CLI PACKAGE.JSON', require('../package'));
  }

  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    console.log('Working directory changed to '+env.cwd);
  }

  if (!env.modulePath) {
    console.log('Local '+Deployignore.moduleName+' module not found in: '+env.cwd);
    process.exit(1);
  }

  if(env.configPath){
    try{
      var deployignorefiles = require(env.configPath);
      if(Array.isArray(deployignorefiles)){
        deployignorefiles.forEach(function(file){
          var filepath = path.resolve(env.cwd, file);
          fs.access(filepath, fs.constants.W_OK, (err) => {
            if(!err){
              if(fs.lstatSync(filepath).isDirectory()){
                rimraf(filepath, function(error){
                  if(error){
                    console.error(error);
                    process.exit(5);
                  }
                });
              }else{
                fs.unlink(filepath, function(error){
                  if(error){
                    console.error(error);
                    process.exit(5);
                  }
                });
              }
            }
          });
        });
      }else{
        console.error('Error: Malformed '+Deployignore.configName+'.  Must be in format ["file1.txt", "file2.txt", ... ]');
        process.exit(4);
      }
    }catch(error){
      console.error('Error: Malformed '+Deployignore.configName+'.  Must be in format ["file1.txt", "file2.txt", ... ]');
      process.exit(3);
    }
  }else{
    console.error('No '+Deployignore.configName+' file found.');
    process.exit(2);
  }
}