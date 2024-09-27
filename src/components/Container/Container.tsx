import { Box } from "@mui/material";
import SideDrawer from "../SideDrawer/SideDrawer";
const Container: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return (
    <Box sx={{ backgroundColor: "rgb(245, 245, 245)" }}>
      <SideDrawer />
      <Box sx={{ padding: "5%" }}>{children}</Box>
    </Box>
  );
};

export default Container;
