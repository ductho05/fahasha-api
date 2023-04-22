const mongoose = require("./getDB");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    published_date: String,
    publisher: String,
    price: Number,
    isbn: String,
    sold: Number,
    category: String,
    pages: Number,
  },
  { collection: "Book" }
);
bookSchema.statics.findBytitle = function (title) {
  // tìm theo kí tự có chứa trong title
  return this.find({ title: new RegExp(title, "i") });
};

const bookmodel = mongoose.model("Book", bookSchema);
// bookmodel.create(
//   {
//     title: "The Old Man and the Sea",
//     author: "Ernest Hemingway",
//     published_date: "1952-09-01",
//     publisher: "Charles Scribner's Sons",
//     price: 7.99,
//     category: "Fiction",
//     pages: 128,
//     sold: 122,
//   },
//   {
//     title: "1984",
//     author: "George Orwell",
//     published_date: "1949-06-08",
//     publisher: "Secker & Warburg",
//     price: 9.99,
//     category: "Fiction",
//     pages: 328,
//     sold: 233,
//   },
//   {
//     title: "Pride and Prejudice",
//     author: "Jane Austen",
//     published_date: "1813-01-28",
//     publisher: "T. Egerton",
//     price: 5.99,
//     category: "Fiction",
//     pages: 279,
//     sold: 532,
//   },
//   {
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     published_date: "1960-07-11",
//     publisher: "J. B. Lippincott & Co.",
//     price: 8.99,
//     category: "Fiction",
//     pages: 281,
//     sold: 410,
//   },
//   {
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     published_date: "1951-07-16",
//     publisher: "Little, Brown and Company",
//     price: 6.99,
//     category: "Fiction",
//     pages: 277,
//     sold: 289,
//   },
//   {
//     title: "Brave New World",
//     author: "Aldous Huxley",
//     published_date: "1932-10-27",
//     publisher: "Chatto & Windus",
//     price: 7.99,
//     category: "Fiction",
//     pages: 288,
//     sold: 198,
//   },
//   {
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     published_date: "1925-04-10",
//     publisher: "Charles Scribner's Sons",
//     price: 6.99,
//     category: "Fiction",
//     pages: 180,
//     sold: 365,
//   },
//   {
//     title: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     published_date: "1937-09-21",
//     publisher: "George Allen & Unwin",
//     price: 9.99,
//     category: "Fiction",
//     pages: 310,
//     sold: 554,
//   },
//   {
//     title: "Lord of the Flies",
//     author: "William Golding",
//     published_date: "1954-09-17",
//     publisher: "Faber and Faber",
//     price: 7.99,
//     category: "Fiction",
//     pages: 224,
//     sold: 175,
//   }
// );

module.exports = bookmodel;
