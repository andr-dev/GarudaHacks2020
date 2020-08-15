import React from "react";
import { Link } from "react-router-dom";
import { Button, List } from "semantic-ui-react";

export default function NoteListItem(props) {
  const viewUrl = `/noteview/${props.id}`;
  const editUrl = `/noteedit/${props.id}`;

  var title = props.title;

  if (title == "") {
    title = "Recording #" + props.index;
  }

  return (
    <List.Item>
      <List.Content floated="right">
        <Link to={viewUrl}>
          <Button>View</Button>
        </Link>
        <Link to={editUrl}>
          <Button positive>Edit</Button>
        </Link>
      </List.Content>
      <List.Content>
        <List.Header as="a">{title}</List.Header>
        <List.Description as="a">{props.content}</List.Description>
      </List.Content>
    </List.Item>
  );
}
