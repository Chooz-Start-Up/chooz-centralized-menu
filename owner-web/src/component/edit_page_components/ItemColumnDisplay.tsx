import * as React from "react";
import { ItemColumnDisplayProps } from "./interface";
import {
  Fade,
  Box,
  Input,
  InputAdornment,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { set } from "firebase/database";

const ItemColumnDisplay: React.FC<ItemColumnDisplayProps> = (
  props: ItemColumnDisplayProps
) => {
  const [isPriceFocused, setIsPriceFocused] = useState(false);
  const [localPriceField, setLocalPriceField] = useState("");

  useEffect(() => {
    setLocalPriceField(props.item.price.toString());
  }, [props.menuIndex, props.categoryIndex, props.item.id]);

  const onDescriptionChange = (e: any): any => {
    props.item.description = e.target.value;
    props.checkItemUpdate(props.item);
  };

  const onPriceChange = (e: any): any => {
    let str: string = e.target.value;
    if (
      e.target.value.indexOf(".") !== -1 &&
      e.target.value.indexOf(".") + 3 <= e.target.value.length
    ) {
      str = e.target.value.substring(0, e.target.value.indexOf(".") + 3);
    }

    setLocalPriceField(str);
    if (str !== "") {
      props.item.price = Number(parseFloat(str));
    } else {
      props.item.price = Number();
    }
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
            Price
          </Typography>
          <Input
            id="price"
            autoFocus
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type="number"
            value={
              localPriceField !== "0"
                ? props.item.price.toString()
                : isPriceFocused
                ? ""
                : "0"
            }
            onChange={onPriceChange}
            disabled={props.isPublished}
            onFocus={(event) => {
              setIsPriceFocused(true);
              if (localPriceField === "0") {
                setLocalPriceField("");
              }
            }}
            onBlur={(event) => {
              setIsPriceFocused(false);
              if (localPriceField === "") {
                setLocalPriceField("0");
              } else {
                setLocalPriceField(parseFloat(event.target.value).toFixed(2));
              }
            }}
          />
        </Box>
        <Box marginTop={1}>
          <Box display="flex">
            <Typography variant="h6" align="left">
              Description
            </Typography>
            <Box marginTop={1} marginLeft={1}>
              <Tooltip title="If this field is empty, the description section will not be visible to the customers.">
                <Typography sx={{ fontSize: 10, color: "grey.500" }}>
                  (Optional)
                </Typography>
              </Tooltip>
            </Box>
          </Box>
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
          <Box display="flex">
            <Typography variant="h6" align="left">
              Ingredients
            </Typography>
            <Box marginTop={1} marginLeft={1}>
              <Tooltip title="If this field is empty, the ingredients section will not be visible to the customers.">
                <Typography sx={{ fontSize: 10, color: "grey.500" }}>
                  (Optional)
                </Typography>
              </Tooltip>
            </Box>
          </Box>
          <TextField
            id="ingredient"
            multiline
            fullWidth
            minRows={4}
            variant="outlined"
            value={props.item.ingredients}
            onChange={onIngredientsChange}
            disabled={props.isPublished}
            onBlur={() => {
              console.log("Blurred");
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default ItemColumnDisplay;
