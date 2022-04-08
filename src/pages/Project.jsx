import { Container, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "..";

export default function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const getRecords = async () => {
      const projectRef = doc(db, "projects", projectId);
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists) {
        setProject(projectSnap.data());
      }

      const ref = collection(db, "records");
      const w = where("project", "==", projectRef);
      const q = query(ref, w);
      const snap = await getDocs(q);
      if (!snap.empty) {
        const records = snap.docs.map((doc) => doc.data());
        console.log(records);
        setRecords(records);
      }
    };
    getRecords();
  }, [projectId]);

  console.log({ project, records });

  let columns = [];
  let rows = [];
  if (project) {
    columns = project.fields.map(({ name, type }) => ({
      field: name,
      headerName: name,
      width: 200,
      type,
    }));
  }
  if (records) {
    rows = records.map(({ fields }, i) => {
      const data = {};
      fields.forEach((val, j) => {
        console.log(columns[j].type);
        if (columns[j].type === "DATETIME") {
          data[columns[j].field] = new Date(val.seconds * 1000);
        } else if (columns[j].type === "LOCATION") {
          data[columns[j].field] = val.latitude + "," + val.longitude;
        } else {
          data[columns[j].field] = val;
        }
      });
      return {
        id: i,
        ...data,
      };
    });
  }

  console.log(rows);

  return (
    <Container maxWidth="lg" sx={{ height: 700 }}>
      <Typography variant="h5" align="center" fontWeight="bold" mb={4}>
        Project: {project ? project.name : "..."}
      </Typography>
      {project && records && (
        <DataGrid
          columns={columns}
          rows={rows}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </Container>
  );
}
