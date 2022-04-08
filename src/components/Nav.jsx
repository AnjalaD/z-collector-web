import { Button, Container, Stack, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "..";

export default function Nav() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());
    };
    getUser();
  }, [auth.currentUser.uid]);

  const logout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <Container maxWidth="lg">
      <Stack direction="row" justifyContent="end" alignItems="center" py={2}>
        <Typography fontWeight="bold" mr={2}>
          {user ? user.name : "..."}
        </Typography>
        <Button variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
      </Stack>
    </Container>
  );
}
