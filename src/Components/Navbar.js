import React, { Fragment } from 'react';
import { AppBar, Button, CssBaseline, Stack } from "@mui/material";
import {Link} from 'react-router-dom';

function Navbar({deleteAll, logout1}) {
  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          background: "lightgreen",
          position: { xs: "absolute", lg: "fixed" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Link
            to="/create"
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Button
              sx={{
                width: { xs: "120px", sm: "140px", md: "180px", lg: "200px" },
                borderRadius: "8px",
                background: "black",
                color: "white",
                "&:hover": { background: "black" },
              }}
              type="button"
            >
              Create QA
            </Button>
          </Link>

          <Button
            sx={{
              width: { xs: "120px", sm: "140px", md: "180px", lg: "200px" },
              borderRadius: "8px",
              background: "black",
              color: "white",
              "&:hover": { background: "black" },
            }}
            type="button"
            onClick={deleteAll}
          >
            Delete All
          </Button>

          <Button
            sx={{
              width: { xs: "120px", sm: "140px", md: "180px", lg: "200px" },
              borderRadius: "8px",
              background: "black",
              color: "white",
              "&:hover": { background: "black" },
            }}
            type="button"
            onClick={() => logout1()}
          >
            Logout
          </Button>
        </Stack>
      </AppBar>
    </Fragment>
  );
}

export default Navbar