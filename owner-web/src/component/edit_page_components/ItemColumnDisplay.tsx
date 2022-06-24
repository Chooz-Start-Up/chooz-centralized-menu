import * as React from "react";
import { ItemColumnDisplayProps } from "./interface";
import {
  Box,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Fade } from "@mui/material";

const ItemColumnDisplay: React.FC<ItemColumnDisplayProps> = (
  props: ItemColumnDisplayProps
) => {
  const onDescriptionChange = (e: any): any => {
    props.item.description = e.target.value;
    props.checkItemUpdate(props.item);
  };
  const onPriceChange = (e: any): any => {
    props.item.price = e.target.value;
    props.checkItemUpdate(props.item);
  };
  const onIngredientsChange = (e: any): any => {
    props.item.ingredients = e.target.value;
    props.checkItemUpdate(props.item);
  };

  return (
    <Fade in={true} exit={false} mountOnEnter unmountOnExit timeout={275}>
      <Box>
        <Box>
          <Typography variant="h5" align="center">
            {props.item.name}
          </Typography>
        </Box>
        <Box marginTop={1}>
          <Typography variant="h6" align="left">
            Description
          </Typography>
          <TextField
            id="description"
            multiline
            fullWidth
            minRows={4}
            variant="outlined"
            value={props.item.description}
            onChange={onDescriptionChange}
            disabled={props.isPublished}
          />
        </Box>
        <Box marginTop={1}>
          <Typography variant="h6" align="left">
            Price
          </Typography>
          <Input
            id="price"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={props.item.price}
            onChange={onPriceChange}
            disabled={props.isPublished}
          />
        </Box>
        <Box marginTop={1}>
          <Typography variant="h6" align="left">
            Ingredients
          </Typography>
          <TextField
            id="ingredient"
            multiline
            fullWidth
            minRows={4}
            variant="outlined"
            value={props.item.ingredients}
            onChange={onIngredientsChange}
            disabled={props.isPublished}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default ItemColumnDisplay;
