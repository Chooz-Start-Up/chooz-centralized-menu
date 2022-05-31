import * as React from "react";
import { Box, TextField } from "@material-ui/core";

interface TestProp {}

interface TestState {
  text: string;
}

class Test extends React.Component<TestProp, TestState> {
  constructor(props: TestProp) {
    super(props);
    this.state = { text: "" };
  }

  onChange = (e: any): any => {
    this.setState({ text: e.target.value });
  };

  render() {
    console.log("Current text: ", this.state.text);
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          height: "100%",
        }}
      >
        <TextField
          id="description"
          variant="outlined"
          defaultValue={this.state.text}
          onChange={this.onChange}
        />

        <TextField id="ingredient" variant="outlined" value={this.state.text} />
      </Box>
    );
  }
}
