import { useMemo } from "react";
import { useDispatch } from "react-redux";
import TurnedInNot from "@mui/icons-material/TurnedInNot";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ id, title = "", body, date, imageUrls = [] }) => {
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const dispatch = useDispatch();
  const onActiveNote = () => {
    dispatch(
      setActiveNote({
        id,
        title,
        body,
        date,
        imageUrls,
      })
    );
  };

  return (
    <ListItem disablePadding onClick={onActiveNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
