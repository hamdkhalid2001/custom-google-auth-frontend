import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

function Index({ store }) {
//   console.log(toJS(store?.currentUserData));
//   console.log(toJS(store?.jwtToken));

  const userData = toJS(store?.currentUserData).data;
  console.log(userData);
  return (
    <div className="self-start p-8">
      <p>{userData?.email}</p>
      <section className="w-full  grid place-items-center mt-12">
        <h1 className="text-5xl">Products</h1>
        <section className="w-[70%] h-full bg-black"></section>
      </section>
    </div>
  );
}

export default inject("store")(observer(Index));
