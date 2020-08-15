import React from "react";
import { Button, List } from "semantic-ui-react";

export default function NoteListItem(props) {
  return (
    <List.Item>
      <List.Content floated="right">
        <Button>View</Button>
        <Button>Delete</Button>
      </List.Content>
      <List.Content>
        <List.Header as="a">{props.title}</List.Header>
        <List.Description as="a">{props.content}</List.Description>
      </List.Content>
    </List.Item>
  );
}

//We can def use the class, but wanted to check if functional components work since its simpler
// class NoteListItem extends React.Component {
//   constructor() {
//     super();
//     console.log("creating");
//     console.log(this.props);
//   }

//   render() {
//     return (
//       <List.Item>
//         <List.Content floated="right">
//           <Button>View</Button>
//           <Button>Delete</Button>
//         </List.Content>
//         <List.Content>
//           <List.Header as="a">{this.props.title}</List.Header>
//           <List.Description as="a">{this.props.content}</List.Description>
//         </List.Content>
//       </List.Item>
//     );
//   }
// }
//export default NoteListItem;
