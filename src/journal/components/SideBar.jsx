import { Drawer, Box, Toolbar, Typography, Divider, List } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNavbar } from "../../store/navbar";

import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  const { isOpen } = useSelector((state) => state.navbar);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addListener((e) => setIsSmallScreen(e.matches));
  }, []);

  const dispatch = useDispatch();

  const onCloseNavbar = () => dispatch(closeNavbar());

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      <Drawer
        onClick={onCloseNavbar}
        variant={isSmallScreen ? "permanent" : "temporary"}
        open={isOpen}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            {displayName}
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
