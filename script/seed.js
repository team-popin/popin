const { green, red } = require("chalk");
const { db } = require("../server/db");
const {
  models: { User, Product, ProductTimeSlot, Category, Order },
} = require("../server/db");

//Require data from seedData.js
const {
  users,
  products,
  productTimeSlots,
  categories,
  orders,
} = require("../seedData.js");

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log("seeding...");

    //Empty arrays so we can add instances in order to create associations between the instances later.
    const userInstances = [];
    const productInstances = [];
    const productTimeSlotInstances = [];
    const categoryInstances = [];
    const orderInstances = [];

    //CREATE INSTANCES BELOW HERE

    // create user instances:
    for (const userInstance of users) {
      try {
        const newUserInstance = await User.create(userInstance);
        userInstances.push(newUserInstance);
      } catch (err) {
        console.log(err);
      }
    }

    // create product instances:
    for (const productInstance of products) {
      try {
        const newProductInstance = await Product.create(productInstance);
        productInstances.push(newProductInstance);

        //creating timeslots instances for each product

        // create productTimeSlot instances
        for (const productTimeSlotInstance of productTimeSlots) {
          try {
            const newProductTimeSlotInstance = await ProductTimeSlot.create(
              productTimeSlotInstance
            );
            productTimeSlotInstances.push(newProductTimeSlotInstance);
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    // create category instances
    for (const categoryInstance of categories) {
      try {
        const newCategoryInstance = await Category.create(categoryInstance);
        categoryInstances.push(newCategoryInstance);
      } catch (err) {
        console.log(err);
      }
    }

    // create order instances
    for (const orderInstance of orders) {
      try {
        const newOrderInstance = await Order.create(orderInstance);
        orderInstances.push(newOrderInstance);
      } catch (err) {
        console.log(err);
      }
    }

    // set instance associations
    try {
      //user <-> setProducts
      await userInstances[0].setProducts([
        productInstances[0],
        productInstances[11],
      ]);
      await userInstances[1].setProducts([productInstances[1]]);
      await userInstances[2].setProducts([productInstances[2]]);
      await userInstances[3].setProducts([productInstances[3]]);
      await userInstances[4].setProducts([productInstances[4]]);
      await userInstances[5].setProducts([productInstances[5]]);
      await userInstances[6].setProducts([productInstances[6]]);
      await userInstances[7].setProducts([productInstances[7]]);
      await userInstances[8].setProducts([productInstances[8]]);
      await userInstances[9].setProducts([productInstances[9]]);
      await userInstances[10].setProducts([productInstances[10]]);

      //product <-> setProductTimeSlots

      for (let i = 0; i < productInstances.length; i++) {
        let start = i * productTimeSlots.length;
        let end = start + 20;

        await productInstances[i].setProductTimeSlots(
          productTimeSlotInstances.slice(start, end)
        );
      }
    } catch (err) {
      console.log(err);
    }

    try {
      await userInstances[1].setOrders([
        orderInstances[0],
        orderInstances[1],
        orderInstances[2],
      ]);
      await userInstances[2].setOrders([orderInstances[3]]);
      await userInstances[3].setOrders([orderInstances[4]]);
      await userInstances[4].setOrders([orderInstances[5]]);
      await userInstances[5].setOrders([orderInstances[6]]);
      await userInstances[6].setOrders([orderInstances[7]]);
      await userInstances[7].setOrders([
        orderInstances[8],
        orderInstances[9],
        orderInstances[10],
      ]);
      await userInstances[8].setOrders([orderInstances[11]]);
      await userInstances[9].setOrders([orderInstances[12]]);
    } catch (err) {
      console.log(err);
    }

    // category <-> product
    try {
      await categoryInstances[0].setProducts([
        productInstances[0],
        productInstances[1],
        productInstances[2],
        productInstances[11],
      ]);
      await categoryInstances[1].setProducts([productInstances[5]]);
      await categoryInstances[2].setProducts([productInstances[6]]);
      await categoryInstances[3].setProducts([productInstances[4]]);
      await categoryInstances[4].setProducts([productInstances[7]]);
      await categoryInstances[5].setProducts([
        productInstances[8],
        productInstances[9],
      ]);
      await categoryInstances[6].setProducts([productInstances[3]]);
      await categoryInstances[7].setProducts([productInstances[10]]);
    } catch (err) {
      console.log(err);
    }

    // order <-> productTimeSlots
    try {
      await orderInstances[0].setProductTimeSlots([
        productTimeSlotInstances[0],
        productTimeSlotInstances[5],
        productTimeSlotInstances[12],
      ]);
      await orderInstances[1].setProductTimeSlots([
        productTimeSlotInstances[22],
        productTimeSlotInstances[43],
        productTimeSlotInstances[45],
      ]);
      await orderInstances[2].setProductTimeSlots([
        productTimeSlotInstances[50],
      ]);
      await orderInstances[3].setProductTimeSlots([
        productTimeSlotInstances[52],
      ]);
      await orderInstances[4].setProductTimeSlots([
        productTimeSlotInstances[59],
      ]);
      await orderInstances[5].setProductTimeSlots([
        productTimeSlotInstances[70],
      ]);
      await orderInstances[6].setProductTimeSlots([
        productTimeSlotInstances[79],
      ]);
      await orderInstances[7].setProductTimeSlots([
        productTimeSlotInstances[80],
        productTimeSlotInstances[86],
        productTimeSlotInstances[99],
      ]);
      await orderInstances[8].setProductTimeSlots([
        productTimeSlotInstances[89],
      ]);
      await orderInstances[9].setProductTimeSlots([
        productTimeSlotInstances[55],
      ]);
      await orderInstances[10].setProductTimeSlots([
        productTimeSlotInstances[11],
      ]);
      await orderInstances[11].setProductTimeSlots([
        productTimeSlotInstances[8],
      ]);
      await orderInstances[12].setProductTimeSlots([
        productTimeSlotInstances[190],
      ]);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
