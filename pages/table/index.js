// import Head from "next/head";
// import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
// import styles from "../styles/Home.module.css";
import axios from "axios";
import data from "..//../jsd.js";
import { useState } from "react";
import Link from "next/link.js";
import { useRouter } from "next/router.js";

function Home({ posts }) {
  const [product, setProduct] = useState("");
  const [probj, setProbj] = useState({});
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [tabledata, setTabledata] = useState([]);

  const router = useRouter();

  function chooseProduct(post) {
    setProbj(post);
    setProduct(post.name);
  }

  function additem() {
    if (
      product.length == 0 ||
      quantity == 0 ||
      price.length == 0 ||
      probj == {}
    ) {
      alert("ma'lumotni to'liq kiriting");
    } else {
      setTabledata([
        ...tabledata,
        {
          id: probj.id,
          name: probj.name,
          code: probj.code,
          quantity: quantity,
          price: price,
        },
      ]);
      setProduct("");
      setQuantity("");
      setPrice("");
      setProbj({});
    }
  }

  function removeItem(item) {
    const exist = tabledata.find((x) => x.id === item.id);
    if (exist) {
      setTabledata(tabledata.filter((x) => x.id !== item.id));
    }
  }

  function hideClass() {
    document.getElementById("b").classList.add("d-none");
    document.getElementById("c").classList.add("d-none");
    document.getElementById("d").classList.add("d-none");
    window.print();
    setTimeout(function () {
      document.getElementById("b").classList.remove("d-none");
      document.getElementById("c").classList.remove("d-none");
      document.getElementById("d").classList.remove("d-none");
    }, 1);
  }
  const handleLogOut = async () => {
    const user = await axios.post("/api/auth/logout");
    router.push("/login");
    console.log(user);
  };
  return (
    <>
      <nav
        id="d"
        className="navbar navbar-expand navbar-dark bg-dark"
        aria-label="Second navbar example"
      >
        <div className="container-fluid">
          <Link href={"/"}>
            <div className="navbar-brand cursor">Ikrom Cargo</div>
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <div className="nav-link cursor" onClick={handleLogOut}>
                Logout
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container py-2">
        <div>
          <div id="c" className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name..."
              aria-label="Product"
              value={product}
              aria-describedby="basic-addon1"
              onChange={(e) => setProduct(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="quantity..."
              aria-label="Quantity"
              value={quantity}
              aria-describedby="basic-addon1"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type="price"
              className="form-control"
              placeholder="price..."
              aria-label="Price"
              value={price}
              aria-describedby="basic-addon1"
              onChange={(e) => setPrice(e.target.value)}
            />
            <button
              type="button"
              className="form-control btn btn-primary"
              placeholder="add"
              aria-label="add"
              value="add"
              aria-describedby="basic-addon1"
              onClick={additem}
            >
              add
            </button>
            <button id="b" className="btn btn-danger" onClick={hideClass}>
              print
            </button>
          </div>

          {product
            ? posts
                .filter(
                  (post) =>
                    post.name.toLowerCase().includes(product) ||
                    post.lotin.toLowerCase().includes(product)
                )
                .map((post) => {
                  return (
                    <div key={post.id} onClick={() => chooseProduct(post)}>
                      {post.id} {post.name}
                    </div>
                  );
                })
            : null}
        </div>
        <div className=" d-flex flex-row align-items-start">
          <table className="">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>code</th>
                <th>quantity</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {tabledata
                ? tabledata
                    .slice(0, Math.ceil(tabledata.length / 2))
                    .map((item, n) => {
                      return (
                        <tr key={n}>
                          <td>{n + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.code}</td>
                          <td>{item.quantity}</td>
                          <td
                            id="d"
                            className="cursor"
                            onClick={() => removeItem(item)}
                          >
                            {item.price}
                          </td>
                        </tr>
                      );
                    })
                : null}
            </tbody>
          </table>

          <table className="mx-3">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>code</th>
                <th>quantity</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {tabledata
                ? tabledata
                    .slice(Math.ceil(tabledata.length / 2))
                    .map((item, n) => {
                      n += Math.ceil(tabledata.length / 2);
                      return (
                        <tr key={n}>
                          <td>{n + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.code}</td>
                          <td>{item.quantity}</td>
                          <td
                            id="d"
                            className="cursor"
                            onClick={() => removeItem(item)}
                          >
                            {item.price}
                          </td>
                        </tr>
                      );
                    })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Home;

export async function getServerSideProps() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const posts = await res.json();
  // console.log(data);

  return {
    props: {
      posts: data,
    },
  };
}
