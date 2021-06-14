import React from "react";
import Layout from "../../components/layout";
import axios from "axios";
import UpdateUserComponent from "../../components/update-user";
import { useRouter } from 'next/router'

// import { fetchAllUser } from "../api/fetchAllUser"

export const getStaticPaths = async () => {
  const res = await axios.get("http://localhost:3000/api/fetchAllUser");
    const paths = res.data.map((user) => {
      return {
        params: { id: user.id.toString(), name : user.name.toString()},
      };
    });
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:3000/api/findUserById/" + id);
  const data = await res.json();
  
  return {
    props: { user: data[0] },
  };
};

const UpdateUser = ({ user }) => {
  const router = useRouter()
  const object = router.query
  console.log(object)
  return (
    <Layout>
      <UpdateUserComponent user={user}></UpdateUserComponent>
    </Layout>
  );
};

export default UpdateUser;
