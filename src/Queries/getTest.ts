import axios from "axios";

const getSomething = () => {
  // fetch("", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     query: `
  //       query GetUsers {
  //           users {
  //             _id
  //             firstname
  //             lastname
  //             email
  //           }
  //         }`,
  //   }),
  //   headers: {
  //     "content-type": "application/json",
  //   },
  // }).then(async (data) => {
  //   // Console log our return data
  //   console.log("got response");
  //   console.log(await data.json());
  // });

  

  axios({
    method: "post",
    url: "",
    data: {
      query: `
        query GetUsers {
            users {
              _id
              firstname
              lastname
              email
            }
          }`,
    },
  })
  .then((response) => {
    console.log(response.data.data)
  }, (error) => {
    console.log(error);
  })
};

export default getSomething;
