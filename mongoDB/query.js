//* #### Comparison Operator ####
/*
eq (Equals)
ne (not equal)
gt (Greater than)
gte (Greater than or equal to)
lt (less than)
lte (less than or equal to)
in  (include)
nin (not include)
*/

async function getAllCourses() {
  const result = await Course.find({ isPublished: true })
    // .find({price: 10})
    // .find({price: {$gte: 10, $lte: 20}})
    // .find({price: { $in: [10, 15, 20]}})
    .limit(10)
    .sort({ name: 1 }) // sort by name ASC === 1 and DESC === -1
    .select({ name: 1, tags: 1 }); // only specify fields needed

  if (result) {
    console.log('All courses:', result);
  }
}

//* #### Logical query operator ####
/*
or 
and
*/

// .find().or([{},{}]) // Array which contain filter objects
// .find().and([{},{}]) // Array which contain filter objects

//* #### Regular Expression ####
// starts with some text like Zaheer ----
// .find({name: /^Zaheer/})

// Ends with ----
// .find({name: /Zaheer$/}) // for case insensitive use i as /Zaheer$/i

// Contains ----
// .find({name: /.*Zaheer.*/})

//* Updating data
/*
Approach -1 
    Query the data findById()
    Modified the data
    save() the data

Approach -2 
    Update first 
    Update directly
    get the updated data

    Course.update({filter}, {update data})
    Course.update({isPublished: true}, {$set: {
        price: 100
    }})

    //*update operator 
*/
