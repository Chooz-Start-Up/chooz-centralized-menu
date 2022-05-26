import React from "react";
import { Column } from "./component/column/Column";
import "./App.css";
import VerticalTabs from "./component/column/TabTest";

class App extends React.Component {
  render() {
    return (
      <>
        {/* <Column title="Menu" /> */}
        <VerticalTabs />
      </>
    );
  }
}

export default App;
