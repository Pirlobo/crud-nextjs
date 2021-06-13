import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import useSWR, { mutate, trigger } from "swr";
import { Table, Button } from 'react-bootstrap'
import axios from 'axios';
import Link from 'next/link'

export default function Page({ fetchedData }) {
  const [session, loading] = useSession();
  const fetcher = url => fetch(url).then(r => r.json())
  // Fetch content from protected route
  const { data: user } = useSWR('/api/fetchCurrentUser', fetcher);
  // const { data: user } = useSWR('/api/fetchUser', fetcher, { initialData: fetchedData});
  const { data: content } = useSWR('/api/examples/protected', fetcher);
  const { data: allUser } = useSWR('/api/fetchAllUserExceptCurrentUser', fetcher);

  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }
  async function onDelete (e) {
    mutate('/api/fetchAllUserExceptCurrentUser', allUser.filter(user => user.id !== e.target.id), false);
    await axios.delete(`/api/deleteUser/${e.target.id}`);
    trigger('/api/fetchAllUserExceptCurrentUser')
  }

  // async function onUpdate (e) {
  //   await axios.put('/api/updateUser/' + e.target.id, user);
  //   router.push('http://localhost:3000/updateUser')
  // }

  // If session exists, display content
  return (
    <Layout>
       {user?.map(row => ( 
        <h1  key = {row.id} >Protected Page For {row.name}</h1>
       )) }
      <p>
        <strong>{content?.content}</strong>
      </p>
      <Button style = {{marginBottom: "1rem"}} variant="primary">
      <Link href="/createNewUser">
          <a className = "white__text" id = "update">Add user</a>
        </Link>
      </Button>{' '}
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Operations</th>
    </tr>
  </thead>
  <tbody>
  {allUser?.map(user => (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
      <Button style={{ width: "45%"}} variant="warning">
      <Link href={'/updateUser/' + user.id}>
          <a className = "white__text" id = {user.id}>Update</a>
        </Link>
      </Button>{' '}
      <Button style={{ width: "45%"}} variant="danger">
      <Link  href='#'>
          <a onClick = {onDelete} className = "white__text" id = {user.id}>Delete</a>
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
      fetchedData : {
         id : 1 ,
         name : 'Bo'
      }
    },
  };  
}
