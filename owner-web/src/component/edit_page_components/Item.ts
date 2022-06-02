import { Paper, styled } from "@mui/material/";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffebee",
  width: 180,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default Item;
