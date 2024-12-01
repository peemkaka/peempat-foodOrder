const { gql, default: request, GraphQLClient } = require("graphql-request");

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const APT_TOKEN = process.env.NEXT_PUBLIC_BACKEND_API_URL_TOKEN;
// Used to make get Category API request

const client = new GraphQLClient(MASTER_URL, {
  headers: {
    Authorization: `Bearer ${APT_TOKEN}`,
  },
});

const GetCategory = async () => {
  const query = gql`
    query MyQuery {
        categories(first: 50) {
            id
            name
            slug
            icon {
                url
            }
        }
    }
    `
  const result = await request(MASTER_URL, query);
  return result;
}

const GetBusiness = async (category) => {
  const query = gql`
   query GetBusiness {
  restaurants(where: {categories_some: {slug: "`+ category + `"}}) {
    aboutUs
    address
    categories {
      name
    }
    id
    name
    restroType
    slug
    workingHours
    banner {
      url
    }
    review {
    star
    }
  }
}
    `
  const result = await request(MASTER_URL, query);
  return result;
}

const GetBusinessDetail = async (businessSlug) => {
  const query = gql`
  query RestaurantDetail {
  restaurant(where: {slug: "`+ businessSlug + `"}) {
    aboutUs
    address
    banner {
      url
    }
    categories {
      name
    }
    id
    name
    restroType
    slug
    workingHours
    menu {
      ... on Menu {
        id
        category
        menuItem {
          ... on MenuItem {
            id
            name
            description
            price
            productImage {
              url
            }
          }
        }
      }
    }
    review {
    star
    }
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const AddToCart = async (data) => {
  const query = gql`
  mutation AddToCart {
  createUserCart(
    data: {email: "`+ data?.email + `", price: ` + data?.price + `, productDescription: "` + data?.productDescription + `", productImage: "` + data?.productImage + `", productName: "` + data?.productName + `" ,
    restaurant: {connect: {slug: "`+ data.restaurantSlug + `"}}}
  ) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}
  `
  // console.log(query)
  const result = await request(MASTER_URL, query);
  return result;
}

const GetUserCart = async (userEmail) => {
  const query = gql`
    query GetUserCart {
  userCarts(where: {email: "`+ userEmail + `"}) {
    id
    price
    productDescription
    productImage
    productName
    restaurant {
      name
      banner {
        url
      }
      slug
    }
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const DisconnectRestroFromUserCartItem = async (id) => {
  const query = gql`
  mutation DisconnectMutationFromCartItem {
  updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+ id + `"}) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}
  `
  const result = await client.request(query);
  return result;
}

const DeleteItemFromCart = async (id) => {
  const query = gql`
  mutation DeleteCartItem {
  deleteUserCart(where: {id: "`+ id + `"}) {
    id
  }
}
  `
  const result = await client.request(query);
  return result;
}

const AddNewReview = async (data) => {
  const query = gql`
  mutation AddNewReview {
  createReview(
    data: {email: "`+ data.email + `", 
      profileImage: "`+ data.profileImage + `", 
      reviewText: "`+ data.reviewText + `", 
      star: `+ data.star + `, 
      userName: "`+ data.userName + `", 
      restaurant: {connect: {slug: "`+ data.RestroSlug + `"}}}
  ) {
    id
  }
    publishManyReviews(to: PUBLISHED) {
      count
  }
}
  `
  // console.log(query)
  const result = await request(MASTER_URL, query);
  return result;
}

const GetRestaurantReviews = async (slug) => {
  const query = gql`
    query RestaurantReview {
    reviews(where: {restaurant: {slug: "`+slug+`"}}, orderBy: publishedAt_DESC) {
    email
    id
    profileImage
    publishedAt
    userName
    star
    reviewText
  }
}
  `
  // console.log(query)
  const result = await request(MASTER_URL, query);
  return result;
}

const CreateNewOrder = async (data) => {
  const query = gql`
  mutation CreateNewOrder {
  createOrder(
    data: {
      email: "`+ data.email + `", 
      orderAmount: `+ data.orderAmount + `, 
      restaurantName: "`+ data.restaurantName + `", 
      userName: "`+ data.userName + `", 
      phone: "`+ data.phone + `", 
      address: "`+ data.address + `", 
      zipCode: "`+ data.zipCode + `"}
  ) {
    id
  }
}
  `
  // console.log(query)
  const result = await request(MASTER_URL, query);
  return result;
}

const UpdateOrderToAddOrderItems = async (name, price, id,email) => {
  const query = gql`
  mutation UpdateOrderWithDetail {
  updateOrder(
    data: {orderDetail: {create: {OrderItem: {
      data: {name: "`+ name + `", price: ` + price + `}}}}}
    where: {id: "`+ id + `"}
  ) {
    id
  }
    publishManyOrders(to: PUBLISHED) {
    count
  }
    deleteManyUserCarts(where: {email: "`+email+`"}) {
    count
}
}
  `
  const result = await client.request(query);
  return result;
}

const DeleteCartAfterPayment = async (email) => {
  const query = gql`
    mutation DeleteCart {
      deleteManyUserCarts(where: { email: "` + email + `" }) {
        count
      }
    }
  `;
  const result = await client.request(query);
  return result;
};

const GetUserOrders= async(email)=>{
  const query = gql`
  query UserOrders {
  orders(where: {email: "`+email+`"}) {
    address
    createdAt
    email
    id
    orderAmount
    orderDetail {
      ... on OrderItem {
        id
        name
        price
      }
    }
    phone
    restaurantName
    userName
    zipCode
  }
}
  `
  const result = await client.request(query);
  return result;
}


export default {
  GetCategory,
  GetBusiness,
  GetBusinessDetail,
  AddToCart,
  GetUserCart,
  DisconnectRestroFromUserCartItem,
  DeleteItemFromCart,
  AddNewReview,
  GetRestaurantReviews,
  CreateNewOrder,
  UpdateOrderToAddOrderItems,
  DeleteCartAfterPayment,
  GetUserOrders
}