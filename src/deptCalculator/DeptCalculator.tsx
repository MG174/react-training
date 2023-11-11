import { Box, Button, Container, Divider, List, ListItem, ListItemText, TextField } from '@mui/material';
import * as React from 'react';

export default function DeptCalulator() {
    const [name, setName] = React.useState("");
    const [personEditingValue, setPersonEditingValue] = React.useState("");
    const [editModeIndex, setEditMode] = React.useState<number | null>();
    const [people, setPeople] = React.useState<string[]>([]);

    const handleAddPerson = (e: any) => {
        e.preventDefault();
        if (!name) return;
        people.push(name);
        setPeople(people);
        setName("");
    }

    const switchEditMode = (i: number, person: string) => {
        setPersonEditingValue(person);
        setEditMode(i);
    }

    const handleDeletePerson = (i: number) => {
        people.splice(i, 1);
        setPeople([...people]);
    }

    const handleCancelEdit = () => {
        setEditMode(null);
    }

    const handleEditPerson = (e: any, i: number) => {
        e.preventDefault();
        if (!personEditingValue) return;
        people.splice(i, 1);
        people.splice(i, 0, personEditingValue);
        setPeople([...people]);
        setPersonEditingValue("");
        setEditMode(null);
    }

    const mystyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <>
            <h1>Add meeting members</h1>
            <div style={mystyle}>
                <form onSubmit={(e) => handleAddPerson(e)}>
                    <TextField
                        size="small"
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }} />
                    <Button
                        sx={{ marginLeft: '10px' }}
                        variant="contained"
                        type='submit'>Add member</Button>
                </form>
            </div>

            <Container maxWidth="sm">
                <List aria-label="mailbox folders">
                    {people.map((person, i) => {
                        return <ListItem divider>
                            {editModeIndex === i ? <form onSubmit={(e) => handleEditPerson(e, i)}>
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    value={personEditingValue}
                                    onChange={(e) => { setPersonEditingValue(e.target.value) }}
                                />
                                <Button
                                    sx={{ marginLeft: '10px' }}
                                    variant="contained"
                                    type='submit'>Confirm edit</Button>
                                <Button
                                    sx={{ marginLeft: '10px', backgroundColor: '#d11f1f' }}
                                    variant="contained"
                                    type='button'
                                    onClick={() => handleCancelEdit()}>Cancel edit</Button>
                            </form> :
                                <>
                                    <ListItemText primary={person} />
                                    <Button
                                        sx={{ marginLeft: '10px', backgroundColor: 'grey' }}
                                        variant="contained"
                                        onClick={() => switchEditMode(i, person)}>Edit</Button>
                                    <Button
                                        sx={{ marginLeft: '10px', backgroundColor: '#d11f1f' }}
                                        variant="contained"
                                        type='button'
                                        onClick={() => handleDeletePerson(i)}>Delete</Button>
                                </>
                            }
                            <Divider light />
                        </ListItem>;
                    })}
                </List>
            </Container>
        </>
    );
}
