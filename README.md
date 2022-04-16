# express-netology

https://awsicker-ejs.herokuapp.com/

await db.collection('books').insertMany([
 {
  title: 'title1',
  description: 'desc1',
  authors: 'author1'
 },
 {
  title: 'title2',
  description: 'desc2',
  authors: 'author2'
 }
]); // add


await db.collection('books').find({ title: bookTitle }); // find


await db.collection('books')
               .updateOne(
                  { "_id": id}, // Filter
                  {$set: {authors: author, description: desc}})  // Update
