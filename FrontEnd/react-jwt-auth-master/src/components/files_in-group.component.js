import React, { Component } from "react";
import fileService from "../services/file.service";
class fileInGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
    this.deleteFileFromGroup = this.deleteFileFromGroup.bind(this);
  }
  deleteFileFromGroup(fileId){
    fileService.deleteFileFromGroup(fileId,JSON.parse(localStorage.getItem('group'))).then((res) => {
      this.setState({
        files: this.state.files.filter((file) => file.id !== fileId),
      });
    });

  }
  componentDidMount() {
    fileService.getAllFilesInGroup(JSON.parse(localStorage.getItem('group'))).then((res) => {
      this.setState({ files: res.data });
    });
  }
  render() {
    return (
      <div>
        <h2 className="text-center">Files List</h2>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> ID</th>
                <th> File Name</th>
                <th> Owner Username</th>
                <th> Locked</th>
                <th> Locked By</th>
                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              {this.state.files.map((file) => (
                <tr key={file.id}>
                  <td> {file.id} </td>
                  <td> {file.fileName} </td>
                  <td> {file.username}</td>
                  <td> {file.lock.toString()}</td>
                  <td> {file.lockedBy}</td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteFileFromGroup(file.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default fileInGroup;
