import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import Axios from "axios";

interface Xpath {
  key: string;
  value: number;
}
class Upload extends Component {
  gridApi: any;
  state = {
    file: '',
    fileType: "ACO",
    columnDefs: [
      {
        headerName: "XPath",
        field: "key",
        sortable: true,
        filter: true,
        resizable: true,
        width: 900
      },
      {
        headerName: "Value",
        field: "value",
        sortable: true,
        filter: true,
        resizable: true,
        width: 300
      }
    ],
    rowData: Array<Xpath>()
  };

  onChangeHandler(e: any) {
    this.setState({
      file: e.target.files[0]
    });
  }

  onFileTypeChange(e: any) {
    this.setState({
      fileType: e.target.value
    });
  }

  onBtExport = () => {
    this.gridApi.exportDataAsCsv();
  };
  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  async submitForm(e: any) {
    
    //code to refresh grid
    this.setState({
      rowData: Array<Xpath>()
    });
    //    let URL = "http://xpath-gen.cfapps.io/xpath";
    let URL = "http://localhost:8091/xpath";
    let formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("fileType", this.state.fileType);
    
    /*const response = await Axios({
      method: "post",
      url: URL,
      data: formData
    });
    console.log("Response Status" + response.status);
    console.log("The state**********" + response.data);
    alert(response.statusText);
    this.setState({
      rowData: response.data
    }); 
    
    
    */

    Axios({
      method: 'post',
      url: URL,
      data: formData
    })
     .then(response => {
      this.setState({
        rowData: response.data
      });
     })
     .catch(error => {
       alert("Error Occured"+error.toString());
     });

       
  }

  render() {
    const { columnDefs, rowData } = this.state;
    return (
      <main role="main" className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5" />
          <div className="alert alert-info my-alert" role="alert">
            Please Select Appropriate xml File To Get X-PATH
          </div>
          {/* <form> */}
          <div className="form-row">
            <div className="form-group col-md-4">
              <React.Fragment>File</React.Fragment>
              <input
                type="file"
                className="form-control form-control-file"
                id="exampleFormControlFile1"
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            <div className="form-group col-md-4">
              <React.Fragment>State</React.Fragment>
              <select
                id="inputState"
                className="form-control"
                onChange={e => this.onFileTypeChange(e)}
              >
                <option value="ACO">ACCORD</option>
                <option value="BOM">BOM</option>
                <option value="CDM">CDM</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label style={{ marginTop: "40px" }} />
              <button
                className="btn btn-primary"
                value="Generate"
                onClick={e => this.submitForm(e)}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div style={{ height: "300px" }} className="ag-theme-balham">
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              onGridReady={this.onGridReady.bind(this)}
            />

            <button
              className="btn btn-success" style={{marginTop:"10px"}}
              onClick={this.onBtExport.bind(this)}
            >
              Export
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Upload;
