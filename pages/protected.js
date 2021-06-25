import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import useSWR, { mutate, trigger } from "swr";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page({ fetchedData }) {
  const [session, loading] = useSession();
  const fetcher = (url) => fetch(url).then((r) => r.json());
  // Fetch content from protected route
  const { data: user } = useSWR("/api/fetchCurrentUser", fetcher);
  // const { data: user } = useSWR('/api/fetchUser', fetcher, { initialData: fetchedData});
  const { data: content } = useSWR("/api/examples/protected", fetcher);
  const { data: allUser } = useSWR(
    "/api/fetchAllUserExceptCurrentUser",
    fetcher
  );
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }
  async function onDelete(e) {
    mutate(
      "/api/fetchAllUserExceptCurrentUser",
      allUser.filter((user) => user.id !== e.target.id),
      false
    );
    await axios.delete(`/api/deleteUser/${e.target.id}`);
    trigger("/api/fetchAllUserExceptCurrentUser");
  }

  return (
    <Layout>
      {user?.map((row) => (
        <h1 key={row.id}>Protected Page For {row.name}</h1>
      ))}
      <p>
        <strong>{content?.content}</strong>
      </p>
      <Button style={{ marginBottom: "1rem" }} variant="primary">
        <Link href="/createNewUser">
          <a className="white__text" id="update">
            Add user
          </a>
        </Link>
      </Button>{" "}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th className = "image__center">Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {allUser?.map((user) => (
            <tr>
              <td className = "middle">{user.id}</td>
              <td className = "image__center middle">
                {user.image ? 
                  <img
                  src = {user.image}
                  style = {{borderRadius : "50%", objectFit: "fill"}}
                  width="100"
                  height="100"
                  alt="Cheetah!"
                />
                 : 
                  <img
                  style = {{borderRadius : "50%", objectFit: "fill"}}
                  width="100"
                  height="100"
                  alt="Cheetah!"
                />}
              </td>
              <td className = "middle">{user.name}</td>
              <td className = "middle">{user.email}</td>
              <td className = "middle">
                <Button style={{ width: "45%" }} variant="info">
                  <Link href={"/updateUser/" + user.id}>
                    <a className="white__text" id={user.id}>
                      <i className="fas fa-edit"></i>
                    </a>
                  </Link>
                </Button>{" "}
                <Button style={{ width: "45%" }} variant="danger">
                  <Link href="#" id={user.id}>
                    <a onClick={onDelete} className="white__text" id={user.id}>
                      <i className="fas fa-trash-alt"></i>
                    </a>
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
}

export async function getServerSideProps() {
  // const res = await fetch("http://localhost:3000/api/fetchCurrentUser");
  // const fetchedData = res.json();

  return {
    props: {
      fetchedData: {
        id: 1,
        name: "Bo",
      },
    },
  };
}
