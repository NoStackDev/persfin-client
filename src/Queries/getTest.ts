const getSomething = () => {
  fetch("http://localhost:4000/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: `
        query GetUsers {
            users {
              _id
              firstname
              lastname
              email
            }
          }`,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then(async (data) => {
    // Console log our return data
    console.log("got response");
    console.log(await data.json());
  });
};

export default getSomething;
