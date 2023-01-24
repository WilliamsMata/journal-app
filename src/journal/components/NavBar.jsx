import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";

export const NavBar = ({ drawerWidth = 240 }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap>
            Journal App
          </Typography>

          <IconButton color="error">
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
