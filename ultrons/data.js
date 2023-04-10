/**
 * Title: File Systems
 * Description: Application file storing
 * Author: Md. Moniruzzaman
 * Date: 26-03-2023
 */

//Dependencies
const fs = require('fs');
const path = require('path');

const lib = {};

// Base directory 
lib.basedir = path.join(__dirname, '/../.data/')

// write file to base folder
lib.create = function(dir, file, data, callback) {
    fs.open(lib.basedir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor){
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if (err){
                    console.log("SOmething went wrong with error "+err);
                } else {
                    fs.close(fileDescriptor, (err)=> {
                        if(!err) {
                            callback(false);
                        } else {
                            console.log("Error raised "+ err);
                        }
                    })
                }
            });
            console.log('SUccess');
        } else {
            callback("File may already exists");
        }
    });
};

// Read a file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.basedir+dir+'/'+file+'.json', 'utf8', (err, data)=> {
        callback(err, data);
    });
};

// Update/Overwrite a file
lib.update = (dir, file, data, callback) => {
    // File open for overwrite
    fs.open(lib.basedir+dir+'/'+file+'.json', 'r+', (err, fileDescriptor) => {
        if(!err & fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err) => {
                if(!err) {
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if (err){
                            console.log("SOmething went wrong with error "+err);
                        } else {
                            fs.close(fileDescriptor, (err)=> {
                                if(!err) {
                                    callback(false);
                                } else {
                                    console.log("Error raised "+ err);
                                }
                            })
                        }
                    });
                } else {
                    console.log("Error truncating data");
                }
            })

        } else {
            console.log("Error updating file may not exists");
        }
    });
};

// Delete a file
lib.delete = (dir, file, callback) => {
    fs.unlink(lib.basedir+dir+'/'+file+'.json', (err)=> {
        if(!err) {
            callback(false);
        } else {
            callback("error deleting file");
        }
    });
};


module.exports = lib
