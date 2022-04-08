import {
  Chip,
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "..";

function ProjectCard({ project }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        cursor: "pointer",
        px: 4,
        py: 2,
      }}
      onClick={() => navigate(`/projects/${project._id}`)}
    >
      <Stack spacing={1}>
        <Typography variant="h5" fontWeight="bold">
          {project.name}
        </Typography>
        <Typography variant="body1">{project.description}</Typography>
        <Stack direction="row" spacing={2}>
          {project.isPrivate && (
            <Chip label="Private" color="error" variant="outlined" />
          )}
          {!project.isPrivate && (
            <Chip label="Public" color="success" variant="outlined" />
          )}
          {project.isPublished && (
            <Chip label="Published" color="info" variant="outlined" />
          )}
          {!project.isPublished && (
            <Chip label="Draft" color="info" variant="outlined" />
          )}
        </Stack>
      </Stack>
    </Card>
  );
}

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const auth = getAuth();

  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const getProjects = async () => {
      const userRef = getDoc(doc(db, "users", auth.currentUser.uid));
      const ref = collection(db, "projects");
      const w = where("isPublished", "==", true);
      const q = query(ref, w);
      const snap = await getDocs(q);
      if (!snap.empty) {
        const projects = snap.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        console.log(projects);
        setProjects(projects);
      }
    };

    getProjects();
  }, [auth.currentUser.uid]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Button variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
        <Stack direction="column" spacing={2}>
          <Typography variant="h3" align="center">
            Projects
          </Typography>

          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
