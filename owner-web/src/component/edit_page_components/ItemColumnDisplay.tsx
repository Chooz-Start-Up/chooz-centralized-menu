import * as React from "react";
import { ItemColumnDisplayProps } from "./interface";
import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  useFormControl,
} from "@material-ui/core";

const ItemColumnDisplay: React.FC<ItemColumnDisplayProps> = (
  props: ItemColumnDisplayProps
) => {
  const onDescriptionChange = (e: any): any => {
    props.item.description = e.target.value;
    props.checkItemUpdate(props.item);
    console.log("Description has updated: ", props.item.description);
  };
  const onPriceChange = (e: any): any => {
    props.item.price = e.target.value;
    props.checkItemUpdate(props.item);
    console.log("Price has updated: ", props.item.price);
  };
  const onIngredientsChange = (e: any): any => {
    props.item.ingredients = e.target.value;
    props.checkItemUpdate(props.item);
    console.log("Ingredients has updated: ", props.item.ingredients);
  };

  console.log(
    "Current Data: ",
    props.item.description,
    " ",
    props.item.price,
    " ",
    props.item.ingredients
  );

  return (
    <>
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
    </>
  );
};

export default ItemColumnDisplay;
