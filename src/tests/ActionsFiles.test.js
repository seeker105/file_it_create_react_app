import {setFilesData} from "../actions/files";

test('should generate a setFilesData action', () => {
  const filesData = {
    name: "name",
    id: "123"
  };
  const action = setFilesData(filesData);
  expect(action).toEqual({
    type: 'SET_FILES_DATA',
    filesData
  })
});
