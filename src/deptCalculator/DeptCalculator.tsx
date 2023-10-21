import { Box, Button, Container, Divider, List, ListItem, ListItemText, TextField } from '@mui/material';
import * as React from 'react';

export default function DeptCalulator() {
    const [name, setName] = React.useState("");
    const [people, setPeople] = React.useState<string[]>([]);

    const handleClick = () => {
        if (!name) return;
        people.push(name);
        setPeople(people);
        setName("");
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
                <TextField
                    size="small"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={name} onChange={(e) => { setName(e.target.value) }} />
                <Button
                    sx={{ marginLeft: '10px' }}
                    variant="contained"
                    onClick={() => handleClick()}>Add member</Button>
            </div>

            <Container maxWidth="sm">
                <List aria-label="mailbox folders">
                    {people.map((person) => {
                        return <ListItem divider>
                            <ListItemText primary={person} />
                            <Divider light />
                        </ListItem>;
                    })}
                </List>
            </Container>
        </>
    );
}

