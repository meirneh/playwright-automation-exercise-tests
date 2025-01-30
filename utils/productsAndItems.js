const quantityProducts1 = 34;
const quantityProducts2 = 2;
const productsList1 = [
  "Blue Top",
  "Men Tshirt",
  "Sleeveless Dress",
  "Stylish Dress",
  "Winter Top",
  "Summer White Top",
  "Madame Top For Women",
  "Fancy Green Top",
  "Sleeves Printed Top - White",
  "Half Sleeves Top Schiffli Detailing - Pink",
  "Frozen Tops For Kids",
  "Full Sleeves Top Cherry - Pink",
  "Printed Off Shoulder Top - White",
  "Sleeves Top and Short - Blue & Pink",
  "Little Girls Mr. Panda Shirt",
  "Sleeveless Unicorn Patch Gown - Pink",
  "Cotton Mull Embroidered Dress",
  "Blue Cotton Indie Mickey Dress",
  "Long Maxi Tulle Fancy Dress Up Outfits -Pink",
  "Sleeveless Unicorn Print Fit & Flare Net Dress - Multi",
  "Colour Blocked Shirt – Sky Blue",
  "Pure Cotton V-Neck T-Shirt",
  "Green Side Placket Detail T-Shirt",
  "Premium Polo T-Shirts",
  "Pure Cotton Neon Green Tshirt",
  "Soft Stretch Jeans",
  "Regular Fit Straight Jeans",
  "Grunt Blue Slim Fit Jeans",
  "Rose Pink Embroidered Maxi Dress",
  "Cotton Silk Hand Block Print Saree",
  "Rust Red Linen Saree",
  "Beautiful Peacock Blue Cotton Linen Saree",
  "Lace Top For Women",
  "GRAPHIC DESIGN MEN T SHIRT - BLUE",
];

const productsList2 = ["Madame Top For Women", "Lace Top For Women"];

const productInfo1 = {
  name: productsList1[0],
  details: "Category: Women > Tops",
  availability: "Availability: In Stock",
  condition: "Condition: New",
  brand: "Brand: Polo",
};


const productItem = "Women";

const quantityProductsInCart = 2;
const productsInCart = ["Blue Top", "Summer White Top"];
const prod0 = {
  productName: productsInCart[0],
  expectedDescription: "Women > Tops",
  expectedPrice: "Rs. 500",
  expectedQuantity: "1",
  expectedTotalPrice: "Rs. 500",
};
const prod1 = {
  productName: productsInCart[1],
  expectedDescription: "Women > Tops",
  expectedPrice: "Rs. 400",
  expectedQuantity: "1",
  expectedTotalPrice: "Rs. 400",
};

const prod2 = {
  productName: productsList1[3],
  expectedDescription: "Women > Dress",
  expectedPrice: "Rs. 1500",
  expectedQuantity: "4",
  expectedTotalPrice: "Rs. 6000",
};

const prod3 = {
  productName: productsList1[22],
  expectedDescription: "Men > Tshirts",
  expectedPrice: "Rs. 1000",
  expectedQuantity: "1",
  expectedTotalPrice: "Rs. 1000",
};

const prod4 = {
  productName: productsList1[24],
  expectedDescription: "Men > Tshirts",
  expectedPrice: "Rs. 850",
  expectedQuantity: "1",
  expectedTotalPrice: "Rs. 850",
};

const productInfo3 = {
  name: productsList1[3],
  details: "Category: Women > Dress",
  availability: "Availability: In Stock",
  condition: "Condition: New",
  brand: "Brand: Madame",
};

const productInfo4 = {
  name: productsList1[22],
  details: "Category: Men > Tshirts",
  availability: "Availability: In Stock",
  condition: "Condition: New",
  brand: "Brand: Polo",
};

const productInfo5 = {
  name: productsList1[24],
  details: "Category: Men > Tshirts",
  availability: "Availability: In Stock",
  condition: "Condition: New",
  brand: "Brand: H&M",
};
export {
  quantityProducts1,
  quantityProducts2,
  productsList1,
  productsList2,
  productItem,
  quantityProductsInCart,
  productsInCart,
  prod0,
  prod1,
  prod2,
  prod3,
  prod4,
  productInfo1,
  productInfo3,
  productInfo4,
  productInfo5
};
