import React, { Component } from "react";
import { Formik } from "formik";
import { file } from "@babel/types";
let initialValues = {
  file: File,
  fileType: "ACCORD"
};

class Upload1 extends Component {
  onSubmit = (data: any) => {
    alert(data.fileType);
    // here you handle the data to be submitted
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        // validationSchema={this.getSchema}
        onSubmit={this.onSubmit}
        render={() => (
          <form>
            <input name="file" type="file" required />
            <input type="text" name="fileType" />
            <input type="button" value="Save FIle" />
          </form>
        )}
      />
    );
  }
}
export default Upload1;
