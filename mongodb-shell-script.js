// To Run this script
// mongo --host <host list> --ssl --username <username>  --authenticationDatabase <auth database> mongo-shell-script.js
// mongo --host Cluster0-shard-0/cluster0-shard-00-00-qtakx.azure.mongodb.net:27017,cluster0-shard-00-01-qtakx.azure.mongodb.net:27017,cluster0-shard-00-02-qtakx.azure.mongodb.net:27017 --ssl --username divang  --authenticationDatabase admin mongo-shell-script.js
print('Script Started ...');
db = db.getSiblingDB('pics');
databaseName=db;
print('Current database name: ' + databaseName);
images = null;

//create the imageNames collection and add documents to it
db.imageNames.insert({'image' : 'cat image'});
db.imageNames.insert({'image' : 'dog image'});
db.imageNames.insert({'image' : 'rat image'});


images = db.imageNames.find();
while (images.hasNext()) {
   printjson(images.next());
}

db.imageNames.find().forEach( function(thisDoc) {
  if(thisDoc.image === 'cat image'){
    db.imageNames.update( { "_id" : thisDoc._id }, { "image": "pig image" } );
    print('Updated document: ' + thisDoc._id);
  }; 
});

images = db.imageNames.find();

db.imageNames.find().forEach( function(thisDoc) {
  if(thisDoc.image === 'dog image'){
    db.imageNames.remove({ "_id" : thisDoc._id });
    print('Removed document:');
    printjson(thisDoc);
  }; 
});

print('Final collection:');
images = db.imageNames.find();
while (images.hasNext()) {
   printjson(images.next());
}

//drop the database
//db.dropDatabase();

print('Script Finished');
