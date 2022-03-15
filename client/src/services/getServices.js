// const getData = async (url, data, isHeader) => {
// 	let token = localStorage.getItem("Token").replace(/["]+/g, "");
//   if (isHeader == 0) {
//     let httpOptions
// 	httpOptions = {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         token: `Bearer ${token}`,
//       }

// 	  const res = await fetch(url, data, httpOptions,)
// 	  return res.jon
//     };
//   }
// };

// const getData = async () => {
//     if (localStorage.getItem("Token")) {
//       let token = localStorage.getItem("Token").replace(/["]+/g, "");
//       try {
//         // const res = await
//         const res = await fetch(URL_One, {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             token: `Bearer ${token}`,
//           },
//         });
//         const listItems = await res.json();
//         setUser(listItems);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };


export const getDatas = async (url) =>{
	let token = localStorage.getItem("Token").replace(/["]+/g, "")
	const httpOptions = {
		method: "GET",
        headers: {
            Accept: "application/json",
            token: `Bearer ${token}`,
          }
	}
	const res = fetch(url, httpOptions)
	return res

}
